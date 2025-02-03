package fish.see.lof.teams;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TeamsService {

    private final TeamsRepository teamsRepository;

    public TeamsService(TeamsRepository teamsRepository) {
        this.teamsRepository = teamsRepository;
    }

    public List<Team> getAllTeams() {
        List<TeamEntity> teamEntityList = teamsRepository.findAll();
        return Team.teamEntityToTeam(teamEntityList);
    }
}
