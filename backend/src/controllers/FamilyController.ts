import { Request, Response } from 'express';
import FamilyMember, { IFamilyMember } from '../models/family-member';

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
    res.status(201).send();
  },
};

export default FamilyController;
