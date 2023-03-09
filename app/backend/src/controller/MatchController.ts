import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class ControllerMatch {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    console.log(`query ${inProgress}`);
    const result = await this.service.getAll(inProgress as string || null);
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.setFinished(id);
    return res.status(200).json({ message: 'Finished' });
  };
}
