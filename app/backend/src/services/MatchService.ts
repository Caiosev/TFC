import MatchModel from '../database/models/Matches';
import TeamsModel from '../database/models/Team';

export default class TeamService {
  private matchModel = MatchModel;

  public async getAll(isInProgress: boolean | null): Promise<MatchModel[]> {
    if (isInProgress === null) {
      return this.matchModel.findAll({ include: [
        { model: TeamsModel, as: 'homeTeam' },
        { model: TeamsModel, as: 'awayTeam' },
      ] });
    }
    return this.matchModel.findAll(
      {
        where: { inProgress: isInProgress },
        include: [
          { model: TeamsModel, as: 'homeTeam' },
          { model: TeamsModel, as: 'awayTeam' },
        ],
      },
    );
  }

  public async setFinished(id: string) {
    const match = await this.matchModel.findByPk(id);
    if (match) {
      await this.matchModel.update({ inProgress: false }, { where: { id } });
    }
  }
}
