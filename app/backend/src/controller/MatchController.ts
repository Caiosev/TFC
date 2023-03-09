import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class ControllerMatch {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const result = await this.service.getAll(!!inProgress || null);
    return res.status(200).json(result);
  };
}
