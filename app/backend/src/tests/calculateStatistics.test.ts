import calculateTeamStats from '../utils/calculateStatistics';
import * as chai from 'chai';
const { expect } = chai;

describe('calculateTeamStats', () => {
  it('calculates team stats correctly when given valid matches', () => {
    const matches = [
      {
        homeTeamId: 1,
        homeTeamGoals: 2,
        awayTeamId: 2,
        awayTeamGoals: 1,
        homeTeam: { dataValues: { teamName: 'Team A' } },
        awayTeam: { dataValues: { teamName: 'Team B' } },
      },
      {
        homeTeamId: 2,
        homeTeamGoals: 3,
        awayTeamId: 1,
        awayTeamGoals: 3,
        homeTeam: { dataValues: { teamName: 'Team B' } },
        awayTeam: { dataValues: { teamName: 'Team A' } },
      },
      {
        homeTeamId: 1,
        homeTeamGoals: 4,
        awayTeamId: 3,
        awayTeamGoals: 0,
        homeTeam: { dataValues: { teamName: 'Team A' } },
        awayTeam: { dataValues: { teamName: 'Team C' } },
      },
    ];

    const expectedTeamStats = 
    [
      {
        name: 'Team A',
        totalPoints: 7,
        totalGames: 3,
        totalVictories: 2,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 9,
        goalsOwn: 4
      },
      {
        name: 'Team B',
        totalPoints: 1,
        totalGames: 2,
        totalVictories: 0,
        totalDraws: 1,
        totalLosses: 1,
        goalsFavor: 4,
        goalsOwn: 5
      },
      {
        name: 'Team C',
        totalPoints: 0,
        totalGames: 1,
        totalVictories: 0,
        totalDraws: 0,
        totalLosses: 1,
        goalsFavor: 0,
        goalsOwn: 4
      }
    ]
     expect(calculateTeamStats(matches)).to.deep.be.equal(expectedTeamStats);
  });

  it('returns an empty array when given an empty array of matches', () => {
    expect(calculateTeamStats([])).to.deep.be.equal([]);
  });
});
