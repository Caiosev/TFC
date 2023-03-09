import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class ControllerTeams {
  private _service: MatchService;

  constructor(service: MatchService) {
    this._service = service;
  }

  async getAllMatches(req: Request, res: Response) {
    const { inProgress } = req.query;
    const result = await this._service.getAll(!!inProgress || null);
    return res.status(200).json(result);
  }
}
