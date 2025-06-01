import { useContext, useEffect, useState } from "react";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
    Chip,
    Stack
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Team } from "../../components/types/Team.ts";
import { TeamContext } from "../../lib/TeamContext.tsx";
import { Player } from "../types/Player.ts";
import TournamentBracket from "./TournamentBracket.tsx";

const Content = () => {
    const teamsContext = useContext(TeamContext)
    const [expanded, setExpanded] = useState<number | false>(false);
    const [teams, setTeams] = useState<Team[]>([])

    const handleExpand = (id: number) => {
        setExpanded(expanded === id ? false : id);
    };

    const rankedTeams = [...teams].sort((a, b) => {
        const pointsA = (a.wins * 2) + a.ties;
        const pointsB = (b.wins * 2) + b.ties;
        return pointsB - pointsA;
    });

    useEffect(() => {
        setTeams(teamsContext.teams)
    }, [teamsContext.loading]);

    const teamReportLink = (players: Player[]): string => {
        if (!players || players.length === 0) {
            return "";
        }

        // Clean player names by removing anything after '#' and encode for URL
        const cleanedNames = players.map(player => {
            const cleanName = player.name.split('#')[0];
            return encodeURIComponent(cleanName);
        });

        const summonersParam = cleanedNames.join('%2C');

        return `https://op.gg/lol/multisearch/na?summoners=${summonersParam}`;
    }

    return (
        <>
            <Box
                sx={{
                    width: "80%",
                    margin: "auto",
                    mt: 4,
                    p: 3,
                    backgroundColor: "#111827",
                    borderRadius: 2,
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    gutterBottom
                    sx={{ color: "#c9aa71", fontWeight: "bold", mb: 3 }}
                >
                    League of Friendship
                </Typography>

                {rankedTeams && rankedTeams.map((team, index) => (
                    <Accordion
                        key={team.name + index}
                        expanded={expanded === index}
                        onChange={() => handleExpand(index)}
                        sx={{
                            backgroundColor: "#1b3554",
                            color: "#e5e5e5",
                            mt: 1,
                            borderRadius: expanded === index ? "8px" : "8px !important",
                            '&:before': {
                                display: 'none',
                            },
                        }}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: "#c9aa71" }} />}
                            sx={{
                                '& .MuiAccordionSummary-content': {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: '100%',
                                }
                            }}
                        >
                            <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center' }}>
                                <span style={{ color: "#c9aa71", marginRight: "8px" }}>
                                    {index + 1}
                                </span>
                                <span style={{ color: "#c9aa71", margin: "0 8px" }}>|</span>
                                {team.name}
                                <a
                                    href={teamReportLink(team.players)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        marginLeft: '10px',
                                        color: '#4dabf5',
                                        textDecoration: 'none',
                                        cursor: 'pointer',
                                        fontSize: '10px'
                                    }}
                                >Scouting Report →
                                </a>
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mr: 2 }}>
                                <Chip
                                    label={`W: ${team.wins}`}
                                    sx={{
                                        backgroundColor: '#065f46',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        minWidth: '70px'
                                    }}
                                />
                                <Chip
                                    label={`L: ${team.losses}`}
                                    sx={{
                                        backgroundColor: '#991b1b',
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        minWidth: '70px'
                                    }}
                                />
                            </Stack>
                        </AccordionSummary>

                        <AccordionDetails
                            sx={{
                                backgroundColor: "#0a0f1b",
                                borderRadius: "0 0 8px 8px",
                                pt: 2,
                                pb: 2
                            }}
                        >
                            {team.players && team.players.map((player) => (
                                <Typography
                                    key={player.name}
                                    sx={{
                                        color: "#c9aa71",
                                        py: 0.5,
                                        px: 2,
                                        '&:hover': {
                                            backgroundColor: 'rgba(201, 170, 113, 0.1)',
                                            borderRadius: '4px'
                                        }
                                    }}
                                >
                                    {player.name}
                                </Typography>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
            <TournamentBracket />
        </>
    );
};

export default Content;