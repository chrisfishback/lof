package fish.see.lof.teams;

import jakarta.persistence.*;

@Entity
@Table(name = "teams")
public class TeamEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private int wins;
    private int losses;
    private int ties;
}
