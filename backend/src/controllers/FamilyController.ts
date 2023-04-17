import { Request, Response } from 'express';
import FamilyMember, { IFamilyMember } from '../models/family-member';
import User from '../models/user';
import tokenGenerator, { generateToken } from './TokenController';
import JWT from 'jsonwebtoken';

interface IFamilyController {
  Create: (req: Request, res: Response) => void;
}

const FamilyController: IFamilyController = {
  Create: async function (req, res) {
    const newMember: IFamilyMember = new FamilyMember({
      name: req.body.name,
      birthYear: req.body.birthYear,
    });
    console.log(req.body.userID);
    await newMember.save();
    await User.findByIdAndUpdate(req.body.userID, { rootID: newMember._id });
    res
      .status(201)
      .json({ token: generateToken(req.body.userID), message: 'OK' });
  },
};

export default FamilyController;
