import { Request, Response } from 'express';
import FamilyMember, { IFamilyMember } from '../models/family-member';
import User, { IUser } from '../models/user';

interface IFamilyController {
  Create: (req: Request, res: Response) => void;
}

const FamilyController: IFamilyController = {
  Create: async function (req, res) {
    const newMember: IFamilyMember = new FamilyMember({
      name: req.body.name,
      birthYear: req.body.birthYear,
    });
    await newMember.save();
    await User.findByIdAndUpdate(req.body.userID, { rootID: newMember._id });
    res.status(201).send();
  },
};

export default FamilyController;
