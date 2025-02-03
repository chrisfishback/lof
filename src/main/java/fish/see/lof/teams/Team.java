package fish.see.lof.teams;

import fish.see.lof.players.Player;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class Team {
    private String name;
    private int wins;
    private int losses;
    private int ties;
    private List<Player> players;

    public static List<Team> teamEntityToTeam(List<TeamEntity> teams) {
        return teams.stream()
                .map(teamEntity -> Team.builder()
                        .name(teamEntity.getName())
                        .wins(teamEntity.getWins())
                        .losses(teamEntity.getLosses())
                        .ties(teamEntity.getTies())
                        .players(teamEntity.getPlayers().stream()
                                .map(playerEntity -> Player.builder()
                                        .name(playerEntity.getName())
                                        .build())
                                .collect(Collectors.toList())) // Explicitly collect as List<Player>
                        .build())
                .collect(Collectors.toList()); // Explicitly collect as List<Team>
    }
}
