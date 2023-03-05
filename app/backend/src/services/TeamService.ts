import TeamModel from '../database/models/Team';

export default class TeamService {
  private teamModel = TeamModel;

  public async get(id: number): Promise<TeamModel | null> {
    return this.teamModel.findByPk(id).then((team) => team?.dataValues);
  }

  public async getAll(): Promise<TeamModel[]> {
    return this.teamModel.findAll().then((teams) => teams.map((team) => team.dataValues));
  }
}
