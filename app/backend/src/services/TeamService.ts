import TeamModel from "../database/models/Team";

export default class TeamService {
    private teamModel = TeamModel;

    public async get(id: number): Promise<TeamModel | null> {
        return this.teamModel.findByPk(id).then((team) => {
            if (team) {
                return team.dataValues;
            } else {
                return null;
            }
        });
    }

    public async getAll(): Promise<TeamModel[]> {
        return this.teamModel.findAll().then((teams) => {
            return teams.map((team) => team.dataValues);
        });
    }
}