import MatchModel from '../database/models/Matches';
import TeamsModel from '../database/models/Team';

export default class TeamService {
  private matchModel = MatchModel;

  public async getAll(isInProgress: string | null): Promise<MatchModel[] | undefined> {
    const m = await this.matchModel.findAll(
      {
        where: { inProgress: !!isInProgress },
        include: [
          { model: TeamsModel, as: 'homeTeam' },
          { model: TeamsModel, as: 'awayTeam' },
        ],
      },
    );
    if (!isInProgress) return m;
    if (isInProgress === 'true') {
      return m.filter((e) => e.inProgress === true);
    }
    if (isInProgress === 'false') {
      return m.filter((e) => e.inProgress === false);
    }
  }

  public async setFinished(id: string) {
    const match = await this.matchModel.findByPk(id);
    if (match) {
      await this.matchModel.update({ inProgress: false }, { where: { id } });
    }
  }
}
