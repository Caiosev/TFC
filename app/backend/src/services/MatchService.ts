import MatchModel from '../database/models/Matches';
import TeamsModel from '../database/models/Team';
import TeamService from './TeamService';

export default class MatchService {
  private matchModel = MatchModel;
  private teamModel = TeamsModel;
  private teamService = new TeamService();

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
  public async update(id: string, data: MatchModel) {
    const match = await this.matchModel.findByPk(id);
    if (match) {
      await this.matchModel.update({ ...data }, { where: { id } });
    }
  }

  public async create(data: MatchModel) {
    if (data) {
      try {
        const team1 = await this.teamService.get(Number(data?.homeTeamId));
        const team2 = await this.teamService.get(Number(data?.awayTeamId));
        if (!team1 || !team2) {
          return { message: 'There is no team with such id!', error: true };
        }
      } catch (e) {
        return { message: 'There is no team with such id!', error: true };
      }
      const match = await this.matchModel.create({ ...data, inProgress: true });
      return match;
    }
  }
}
