interface TeamStats {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

interface UpdateTeamStatsParams {
  teamId: number;
  goalsFor: number;
  goalsAgainst: number;
  teamName: string;
  teams: Record<number, TeamStats>;
}

function createNewTeamStats(teamName: string): TeamStats {
  return {
    name: teamName,
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
  };
}

function updateTeamStats(params: UpdateTeamStatsParams): void {
  const { teamId, goalsFor, goalsAgainst, teamName, teams } = params;
  const team = teams[teamId] ?? createNewTeamStats(teamName);
  team.totalGames += 1;
  team.goalsFavor += goalsFor;
  team.goalsOwn += goalsAgainst;
  team.name = teamName;

  if (goalsFor > goalsAgainst) {
    team.totalVictories += 1;
    team.totalPoints += 3;
  } else if (goalsFor < goalsAgainst) {
    team.totalLosses += 1;
  } else {
    team.totalDraws += 1;
    team.totalPoints += 1;
  }
  teams[teamId] = { ...team };
}

export default function calculateTeamStats(matches: any[]): TeamStats[] {
  const teams: Record<number, TeamStats> = {};
  matches.forEach((match) => {
    updateTeamStats({
      teamId: match.homeTeamId,
      goalsFor: match.homeTeamGoals,
      goalsAgainst: match.awayTeamGoals,
      teamName: match.homeTeam.dataValues.teamName,
      teams,
    });
    updateTeamStats({
      teamId: match.awayTeamId,
      goalsFor: match.awayTeamGoals,
      goalsAgainst: match.homeTeamGoals,
      teamName: match.awayTeam.dataValues.teamName,
      teams,
    });
  });

  return Object.values(teams);
}
