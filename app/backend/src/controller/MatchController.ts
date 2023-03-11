import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class ControllerMatch {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    const result = await this.service.getAll(inProgress as string || null);
    return res.status(200).json(result);
  };

  public update = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.setFinished(id);
    return res.status(200).json({ message: 'Finished' });
  };

  public setFinish = async (req: Request, res: Response) => {
    const { id } = req.params;
    await this.service.update(id, req.body);
    return res.status(200).json({ message: 'Finished' });
  };

  public create = async (req: Request, res: Response) => {
    if (req.body.homeTeamId === req.body.awayTeamId) {
      return res.status(422).json(
        { message: 'It is not possible to create a match with two equal teams' },
      );
    }

    const result = await this.service.create(req.body);
    return res.status(200).json(result);
  };
}
