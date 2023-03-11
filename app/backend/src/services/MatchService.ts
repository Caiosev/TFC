import MatchModel from '../database/models/Matches';
import TeamsModel from '../database/models/Team';

export default class TeamService {
  private matchModel = MatchModel;

  public async getAll(isInProgress: string | null): Promise<MatchModel[] | undefined> {
    const m = await this.matchModel.findAll(
      {
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async update(id: string, data: any) {
    const match = await this.matchModel.findByPk(id);
    if (match) {
      await this.matchModel.update({ ...data }, { where: { id } });
    }
  }

  public async create(data: MatchModel) {
    if (data) {
      try {
        const team1 = await this.matchModel.findByPk(data?.homeTeamId);
        const team2 = await this.matchModel.findByPk(data?.awayTeamId);
        if (!team1 || !team2) {
          return { message: 'There is no team with such id!' };
        }
      } catch (e) {
        return { message: 'There is no team with such id!' };
      }
      const match = await this.matchModel.create({ ...data });
      return match;
    }
  }
}
