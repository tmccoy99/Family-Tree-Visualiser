import { Request, Response } from 'express';

interface IFamilyController {
  Create: (req: Request, res: Response) => void;
}

const FamilyController: IFamilyController = {
  Create: async function (req, res) {
    res.status(201).send();
  },
};

export default FamilyController;
