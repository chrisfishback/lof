package fish.see.lof.teams;

import fish.see.lof.players.PlayerEntity;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teams")
@Getter
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int wins;
    private int losses;
    private int ties;

    @OneToMany(mappedBy = "team", fetch = FetchType.EAGER)
    private List<PlayerEntity> players = new ArrayList<>();
}
