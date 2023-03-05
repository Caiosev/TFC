import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  private _service: TeamService = new TeamService();

  async getAll(_req: Request, res: Response) {
    const teams = await this._service.getAll();
    return res.status(200).json(teams);
  }

  async get(req: Request, res: Response) {
    const id = parseInt(req.params.id, 10);
    const team = await this._service.get(id);
    if (team) {
      return res.status(200).json(team);
    }
    return res.status(404).json({ message: 'Team not found' });
  }
}
