import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class UserController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public home = async (req: Request, res: Response) => {
    const leaderboard = await this.service.rank();
    return res.status(200).json(Object.values(leaderboard));
  };
}
