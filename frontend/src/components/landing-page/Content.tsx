import { useState } from "react";
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

const teams = [
    {
        id: 1,
        name: "Demacia Lions",
        wins: 5,
        losses: 1,
        ties: 0,
        players: ["Garen", "Lux", "Jarvan IV", "Fiora", "Xin Zhao"],
    },
    {
        id: 2,
        name: "Noxian Reapers",
        wins: 4,
        losses: 2,
        ties: 0,
        players: ["Darius", "Katarina", "Swain", "Draven", "Talon"],
    },
    {
        id: 3,
        name: "Piltover Enforcers",
        wins: 3,
        losses: 3,
        ties: 0,
        players: ["Vi", "Caitlyn", "Ezreal", "Jayce", "Heimerdinger"],
    },
    {
        id: 4,
        name: "Shadow Isles Phantoms",
        wins: 2,
        losses: 3,
        ties: 1,
        players: ["Thresh", "Elise", "Hecarim", "Kalista", "Yorick"],
    },
    {
        id: 5,
        name: "Ionia Spirits",
        wins: 4,
        losses: 1,
        ties: 1,
        players: ["Shen", "Irelia", "Kennen", "Zed", "Akali"],
    },
    {
        id: 6,
        name: "Freljord Frostborn",
        wins: 2,
        losses: 4,
        ties: 0,
        players: ["Ashe", "Sejuani", "Tryndamere", "Lissandra", "Braum"],
    },
];

const Content = () => {
    const [expanded, setExpanded] = useState<number | false>(false);

    const handleExpand = (id: number) => {
        setExpanded(expanded === id ? false : id);
    };

    const rankedTeams = [...teams].sort((a, b) => {
        const pointsA = (a.wins * 2) + a.ties;
        const pointsB = (b.wins * 2) + b.ties;
        return pointsB - pointsA;
    });

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

            {rankedTeams.map((team, index) => (
                <Accordion
                    key={team.id}
                    expanded={expanded === team.id}
                    onChange={() => handleExpand(team.id)}
                    sx={{
                        backgroundColor: "#1b3554",
                        color: "#e5e5e5",
                        mt: 1,
                        borderRadius: expanded === team.id ? "8px" : "8px !important",
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
                        {team.players.map((player, index) => (
                            <Typography
                                key={index}
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
                                {player}
                            </Typography>
                        ))}
                    </AccordionDetails>
                </Accordion>
            ))}
        </Box>
    );
};

export default Content;