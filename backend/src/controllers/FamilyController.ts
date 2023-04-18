import { Request, Response } from 'express';
import FamilyMember, { IFamilyMember } from '../models/family-member';
import User from '../models/user';
import { generateToken } from './TokenController';

interface IFamilyController {
  Create: (req: Request, res: Response) => void;
}

const FamilyController: IFamilyController = {
  Create: async function (req, res) {
    try {
      const newMember: IFamilyMember = new FamilyMember({
        name: req.body.name,
        birthYear: req.body.birthYear,
      });
      await newMember.save();
      switch (req.body.relationshipType) {
        case 'root':
          await User.findByIdAndUpdate(req.body.userID, {
            rootID: newMember._id,
          });
          break;
        case 'child':
          await FamilyMember.findByIdAndUpdate(req.body.parentID, {
            $push: { children: newMember._id },
          });
      }
      res
        .status(201)
        .json({ token: generateToken(req.body.userID), message: 'OK' });
    } catch (error) {
      res.status(500).json({ message: 'could not create' });
    }
  },
};

export default FamilyController;
