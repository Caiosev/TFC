import { DataTypes, Model } from 'sequelize';
import db from '.';
import Team from './Team';
// import OtherModel from './OtherModel';

class Match extends Model {
  declare id: number;
  declare username: string;
  declare password: string;
  declare email: string;
  declare role: string;
  declare inProgress: boolean;
}

Match.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  homeTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeamGoals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  sequelize: db,
  modelName: 'Match',
  tableName: 'matches',
  timestamps: false,
  underscored: true,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Match, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Match, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Match.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Match.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

Match.belongsTo(Team, {
  as: 'homeTeam',
  foreignKey: 'homeTeamId',
});

Match.belongsTo(Team, {
  as: 'awayTeam',
  foreignKey: 'awayTeamId',
});

export default Match;
