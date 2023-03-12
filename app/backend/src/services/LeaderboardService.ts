/* eslint-disable @typescript-eslint/no-explicit-any */
import calculateStatistics from '../utils/calculateStatistics';
import MatchModel from '../database/models/Matches';
import TeamModel from '../database/models/Team';

export default class LeaderboardService {
  private matcheModel = MatchModel;

  async rank() {
    const res = await this.matcheModel.findAll({
      include: [
        { model: TeamModel, as: 'homeTeam' },
        { model: TeamModel, as: 'awayTeam' },
      ],
      where: { inProgress: false } });
    const matches = res.map((e) => e.dataValues);
    return calculateStatistics(matches);
  }
}
