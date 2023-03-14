import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAll = async (_req: Request, res: Response) => {
    try {
      const teams = await this.service.getAll();
      return res.status(200).json(teams);
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected error' });
    }
  };

  public get = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    if (Number.isNaN(id)) {
      return res.status(400).json({ message: 'Bad request' });
    }

    try {
      const team = await this.service.get(id);
      if (team) {
        return res.status(200).json(team);
      }
      return res.status(404).json({ message: 'Team not found' });
    } catch (error) {
      return res.status(500).json({ message: 'Unexpected error' });
    }
  };
}
