package fish.see.lof.teams;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/api/teams")
public class TeamsController {

    private final TeamsService teamsService;

    @GetMapping("/all")
    public List<TeamsDTO> getAllTeams() {
        return teamsService.getAllTeams();
    }
}