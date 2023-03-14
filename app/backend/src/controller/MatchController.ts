import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class ControllerMatch {
  private service: MatchService;

  constructor() {
    this.service = new MatchService();
  }

  public getAllMatches = async (req: Request, res: Response) => {
    try {
      const { inProgress } = req.query;
      const result = await this.service.getAll(inProgress as string || null);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while trying to get matches' });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.update(id, req.body);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while trying to update a match' });
    }
  };

  public setFinish = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.setFinished(id);
      return res.status(200).json({ message: 'Finished' });
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while trying to update a match' });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      if (req.body.homeTeamId === req.body.awayTeamId) {
        return res.status(422).json(
          { message: 'It is not possible to create a match with two equal teams' },
        );
      }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const result: any = await this.service.create(req.body);
      if (result?.error) return res.status(404).json({ message: result.message });
      return res.status(201).json(result);
    } catch (error) {
      return res.status(500).json({ message: 'An error occurred while trying to create a match' });
    }
  };
}
