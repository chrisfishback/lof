import { createContext, FC, ReactNode, useEffect, useState } from "react";
import { Player } from "../components/types/Player";
import { Team } from "../components/types/Team";
import { getAllTeams } from "../components/clients/TeamsClient";

interface TeamContextType {
    teams: Team[];
    loading: boolean;
    error: string | null;
    addTeam: (team: Team) => void;
    addPlayerToTeam: (teamName: string, player: Player) => void;
    removePlayerFromTeam: (teamName: string, playerName: string) => void;
}

const defaultContextValue: TeamContextType = {
    teams: [],
    loading: false,
    error: null,
    addTeam: () => {},
    addPlayerToTeam: () => {},
    removePlayerFromTeam: () => {}
  };

export const TeamContext = createContext<TeamContextType>(defaultContextValue);

export const TeamProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [teams, setTeams] = useState<Team[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      const loadTeams = async () => {
        try {
          setLoading(true);
          
          const teamsData = await getAllTeams();
          
          setTeams(teamsData);
          setError(null);
        } catch (err) {
          
            setError('Failed to load teams');
            console.error(err);

        } finally {
            setLoading(false);
        }
      };
  
      loadTeams();
    }, []);


  const addTeam = (team: Team) => {
    setTeams(prevTeams => [...prevTeams, team]);
  };

  const addPlayerToTeam = (teamName: string, player: Player) => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.name === teamName) {
          return {
            ...team,
            players: [...team.players, player]
          };
        }
        return team;
      })
    );
  };

  const removePlayerFromTeam = (teamName: string, playerName: string) => {
    setTeams(prevTeams => 
      prevTeams.map(team => {
        if (team.name === teamName) {
          return {
            ...team,
            players: team.players.filter(player => 
              player.name !== playerName
            )
          };
        }
        return team;
      })
    );
  };

  return <TeamContext.Provider value={
        {
            teams,
            loading,
            error,
            addTeam,
            addPlayerToTeam,
            removePlayerFromTeam
        }
    }>{children}</TeamContext.Provider>;
};