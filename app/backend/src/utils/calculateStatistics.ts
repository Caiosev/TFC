/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
interface Statistic {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

function calculateStatistics(matches: any[]): Statistic[] {
  const teams: { [key: number]: Statistic } = {};

  matches.forEach((match) => {
    console.log(match);
    const homeTeam = teams[match.homeTeamId] || { name: match.homeTeam.teamName, totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };
    const awayTeam = teams[match.awayTeamId] || { name: match.awayTeam.teamName, totalPoints: 0, totalGames: 0, totalVictories: 0, totalDraws: 0, totalLosses: 0, goalsFavor: 0, goalsOwn: 0 };

    homeTeam.totalGames += 1;
    homeTeam.goalsFavor += match.homeTeamGoals;
    homeTeam.goalsOwn += match.awayTeamGoals;
    awayTeam.totalGames += 1;
    awayTeam.goalsFavor += match.awayTeamGoals;
    awayTeam.goalsOwn += match.homeTeamGoals;

    if (match.homeTeamGoals > match.awayTeamGoals) {
      homeTeam.totalPoints += 3;
      homeTeam.totalVictories += 1;
      awayTeam.totalLosses += 1;
    } else if (match.homeTeamGoals < match.awayTeamGoals) {
      awayTeam.totalPoints += 3;
      awayTeam.totalVictories += 1;
      homeTeam.totalLosses += 1;
    } else {
      homeTeam.totalPoints += 1;
      homeTeam.totalDraws += 1;
      awayTeam.totalPoints += 1;
      awayTeam.totalDraws += 1;
    }

    teams[match.homeTeamId] = homeTeam;
    teams[match.awayTeamId] = awayTeam;
  });

  const output: Statistic[] = Object.values(teams).map((team) => ({
    name: team.name,
    totalPoints: team.totalPoints,
    totalGames: team.totalGames,
    totalVictories: team.totalVictories,
    totalDraws: team.totalDraws,
    totalLosses: team.totalLosses,
    goalsFavor: team.goalsFavor,
    goalsOwn: team.goalsOwn,
  }));

  return output;
}

export default calculateStatistics;
