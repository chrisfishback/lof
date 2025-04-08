import {useEffect, useState} from "react";
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
import {Team} from "@/components/types/Team.ts";
import {getAllTeams} from "../clients/TeamsClient.ts";

const Content = () => {
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
        getAllTeams().then(retrievedTeams => {
            setTeams(retrievedTeams)
            console.log("grabbed teams: ", retrievedTeams)
        })
    }, []);

    return (
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
                            <Chip
                                label={`T: ${team.ties}`}
                                sx={{
                                    backgroundColor: '#1e40af',
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
    );
};

export default Content;