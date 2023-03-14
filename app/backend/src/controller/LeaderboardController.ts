import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class UserController {
  private service: LeaderboardService;

  constructor() {
    this.service = new LeaderboardService();
  }

  public home = async (req: Request, res: Response) => {
    try {
      const leaderboard = await this.service.rank();
      return res.status(200).json(Object.values(leaderboard));
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  };
}
