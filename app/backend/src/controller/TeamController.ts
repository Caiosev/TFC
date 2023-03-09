import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private service: TeamService;

  constructor() {
    this.service = new TeamService();
  }

  public getAll = async (_req: Request, res: Response) => {
    const teams = await this.service.getAll();
    return res.status(200).json(teams);
  };

  public get = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id, 10);
    const team = await this.service.get(id);
    if (team) {
      return res.status(200).json(team);
    }
    return res.status(404).json({ message: 'Team not found' });
  };
}
