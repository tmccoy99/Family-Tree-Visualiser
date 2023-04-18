import { Request, Response } from 'express';
import FamilyMember, { IFamilyMember } from '../models/family-member';
import User from '../models/user';
import { generateToken } from './TokenController';
import mongoose from 'mongoose';

interface IFamilyController {
  Create: (req: Request, res: Response) => void;
}

enum memberAdditionTypes {
  Root = 'root',
  Spouse = 'spouse',
  Child = 'child',
}

async function updateRelationsAfterCreation(
  req: Request,
  newMemberID: mongoose.Types.ObjectId
): Promise<void> {
  switch (req.body.additionType as memberAdditionTypes) {
    case memberAdditionTypes.Root:
      await User.findByIdAndUpdate(req.body.userID, {
        rootID: newMemberID,
      });
    case memberAdditionTypes.Child:
      await FamilyMember.findByIdAndUpdate(req.body.parentID, {
        $push: { children: newMemberID },
      });
    case memberAdditionTypes.Spouse:
      await FamilyMember.findByIdAndUpdate(req.body.spouseID, {
        spouse: newMemberID,
      });
  }
}

const FamilyController: IFamilyController = {
  Create: async function (req, res) {
    try {
      const newMember: IFamilyMember = new FamilyMember({
        name: req.body.name,
        birthYear: req.body.birthYear,
      });
      await newMember.save();
      await updateRelationsAfterCreation(req, newMember._id);
      res
        .status(201)
        .json({ token: generateToken(req.body.userID), message: 'OK' });
    } catch (error) {
      res.status(500).json({ message: 'could not create' });
    }
  },
};

export default FamilyController;
