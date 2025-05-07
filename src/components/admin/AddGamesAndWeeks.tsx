import React, { useContext, useState } from 'react';
import {
    Box,
    Stack,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Typography,
    Divider,
    Paper
} from '@mui/material';
import {
    Add as AddIcon,
    Save as SaveIcon,
    Edit as EditIcon,
    Close as CloseIcon,
    Check as CheckIcon,
    AddCircleOutline as AddCircleOutlineIcon,
EmojiEvents as TrophyIcon,
Expand,
ExpandMore
} from '@mui/icons-material';
import { TeamContext } from "../../lib/TeamContext.tsx"

interface Team {
    id: string;
    name: string;
}

interface Match {
    id: string;
    winner: string | null;
}

interface Game {
    id: string;
    teamA: string;
    teamB: string;
    matches: Match[];
    winner: string | null;
}

interface Week {
    id: string;
    name: string;
    games: Game[];
}


export const AddGamesAndWeeks = () => {
    //teams / onSave / initalWeeks
    const { teams } = useContext(TeamContext)


    const [weeks, setWeeks] = useState<Week[]>(sampleWeeks);
    const [expandedWeek, setExpandedWeek] = useState<number | false>(false);
    const [expandedGame, setExpandedGame] = useState<string | false>(false);

    // New week state
    const [isAddingWeek, setIsAddingWeek] = useState<boolean>(false);
    const [newWeekName, setNewWeekName] = useState<string>('');

    // New game state
    const [isAddingGame, setIsAddingGame] = useState<string | false>(false);
    const [newGameId, setNewGameId] = useState<string>('');
    const [newGameTeamA, setNewGameTeamA] = useState<string>('');
    const [newGameTeamB, setNewGameTeamB] = useState<string>('');

    // Editing state
    const [editingGameId, setEditingGameId] = useState<string | null>(null);
    const [editedGameId, setEditedGameId] = useState<string>('');

    // Handle week expansion
    const handleWeekExpand = (weekIndex: number) => {
        setExpandedWeek(expandedWeek === weekIndex ? false : weekIndex);
    };

    // Handle game expansion
    const handleGameExpand = (gameId: string) => {
        setExpandedGame(expandedGame === gameId ? false : gameId);
    };

    // Add new week
    const handleAddWeekClick = () => {
        setIsAddingWeek(true);
    };

    const handleNewWeekNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewWeekName(e.target.value);
    };

    const handleAddWeek = () => {
        if (newWeekName.trim()) {
            const newWeek: Week = {
                id: `week-${Date.now()}`,
                name: newWeekName.trim(),
                games: []
            };

            setWeeks([...weeks, newWeek]);
            setNewWeekName('');
            setIsAddingWeek(false);
            setExpandedWeek(weeks.length); // Expand the newly added week
        }
    };

    const handleCancelAddWeek = () => {
        setIsAddingWeek(false);
        setNewWeekName('');
    };

    // Add new game to a week
    const handleAddGameClick = (weekId: string) => {
        setIsAddingGame(weekId);
        setNewGameId('');
        setNewGameTeamA('');
        setNewGameTeamB('');
    };

    const handleNewGameIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewGameId(e.target.value);
    };

    const handleTeamAChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setNewGameTeamA(e.target.value as string);
    };

    const handleTeamBChange = (e: React.ChangeEvent<{ value: unknown }>) => {
        setNewGameTeamB(e.target.value as string);
    };

    const handleAddGame = (weekId: string) => {
        if (newGameId.trim() && newGameTeamA && newGameTeamB && newGameTeamA !== newGameTeamB) {
            const updatedWeeks = weeks.map(week => {
                if (week.id === weekId && newGameId) {
                    const newGame: Game = {
                        id: newGameId.trim(),
                        teamA: newGameTeamA,
                        teamB: newGameTeamB,
                        matches: [
                            { id: `${newGameId}-match-1`, winner: null },
                            { id: `${newGameId}-match-2`, winner: null },
                            { id: `${newGameId}-match-3`, winner: null }
                        ],
                        winner: null
                    };

                    return {
                        ...week,
                        games: [...week.games, newGame]
                    };
                }
                return week;
            });

            setWeeks(updatedWeeks);
            setIsAddingGame(false);
            setNewGameId('');
            setNewGameTeamA('');
            setNewGameTeamB('');

            // Expand the new game
            const newGameId = updatedWeeks
                .find(w => w.id === weekId)?.games
                .slice(-1)[0]?.id;

            if (newGameId) {
                setExpandedGame(newGameId);
            }
        }
    };

    const handleCancelAddGame = () => {
        setIsAddingGame(false);
        setNewGameId('');
        setNewGameTeamA('');
        setNewGameTeamB('');
    };

    // Edit game ID
    const handleEditGame = (gameId: string, currentId: string) => {
        setEditingGameId(gameId);
        setEditedGameId(currentId);
    };

    const handleGameIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedGameId(e.target.value);
    };

    const handleSaveGame = (weekId: string, gameId: string) => {
        if (editedGameId.trim()) {
            const updatedWeeks = weeks.map(week => {
                if (week.id === weekId) {
                    const updatedGames = week.games.map(game => {
                        if (game.id === gameId) {
                            return {
                                ...game,
                                id: editedGameId.trim()
                            };
                        }
                        return game;
                    });

                    return {
                        ...week,
                        games: updatedGames
                    };
                }
                return week;
            });

            setWeeks(updatedWeeks);
            setEditingGameId(null);
            setEditedGameId('');
        }
    };

    // Set match winner
    const handleSetMatchWinner = (weekId: string, gameId: string, matchId: string, winner: string) => {
        const updatedWeeks = weeks.map(week => {
            if (week.id === weekId) {
                const updatedGames = week.games.map(game => {
                    if (game.id === gameId) {
                        const updatedMatches = game.matches.map(match => {
                            if (match.id === matchId) {
                                return {
                                    ...match,
                                    winner
                                };
                            }
                            return match;
                        });

                        // Determine game winner based on matches (best of 3)
                        const teamAWins = updatedMatches.filter(m => m.winner === game.teamA).length;
                        const teamBWins = updatedMatches.filter(m => m.winner === game.teamB).length;

                        let gameWinner = null;
                        if (teamAWins >= 2) {
                            gameWinner = game.teamA;
                        } else if (teamBWins >= 2) {
                            gameWinner = game.teamB;
                        }

                        return {
                            ...game,
                            matches: updatedMatches,
                            winner: gameWinner
                        };
                    }
                    return game;
                });

                return {
                    ...week,
                    games: updatedGames
                };
            }
            return week;
        });

        setWeeks(updatedWeeks);
        //onSave(updatedWeeks);
    };

    const handleSaveAll = () => {
        //onSave(weeks);
    };

    const getTeamNameById = (teamId: string): string => {
        const team = teams.find(t => t.id === teamId);
        return team ? team.name : 'Unknown Team';
    };

    return (
        <Box>
            <Stack direction="column" spacing={2} padding={2}>
                <Typography variant="h5" gutterBottom>
                    Add Games
                </Typography>

                {weeks.map((week, weekIndex) => (
                    <Accordion
                        key={week.id}
                        expanded={expandedWeek === weekIndex}
                        onChange={() => handleWeekExpand(weekIndex)}
                    >
                        <AccordionSummary expandIcon={<ExpandMore />}>
                            <Typography fontWeight="bold">{week.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="column" spacing={2}>
                                {week.games.map((game) => (
                                    <Paper key={game.id} elevation={2} sx={{ p: 2 }}>
                                        <Accordion
                                            expanded={expandedGame === game.id}
                                            onChange={() => handleGameExpand(game.id)}
                                        >
                                            <AccordionSummary expandIcon={<EditIcon />}>
                                                <Stack direction="row" spacing={2} alignItems="center" width="100%">
                                                    {editingGameId === game.id ? (
                                                        <>
                                                            <TextField
                                                                value={editedGameId}
                                                                onChange={handleGameIdChange}
                                                                size="small"
                                                                label="Game ID"
                                                            />
                                                            <IconButton onClick={() => handleSaveGame(week.id, game.id)} color="primary">
                                                                <SaveIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => setEditingGameId(null)}>
                                                                <CloseIcon />
                                                            </IconButton>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <Typography>Game: {game.id}</Typography>
                                                            <Divider orientation="vertical" flexItem />
                                                            <Typography>
                                                                {getTeamNameById(game.teamA)} vs {getTeamNameById(game.teamB)}
                                                            </Typography>
                                                            <Box flexGrow={1} />
                                                            {game.winner && (
                                                                <Stack direction="row" alignItems="center" spacing={1}>
                                                                    <TrophyIcon color="primary" />
                                                                    <Typography color="primary">
                                                                        Winner: {getTeamNameById(game.winner)}
                                                                    </Typography>
                                                                </Stack>
                                                            )}
                                                            <IconButton
                                                                size="small"
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    handleEditGame(game.id, game.id);
                                                                }}
                                                            >
                                                                <EditIcon fontSize="small" />
                                                            </IconButton>
                                                        </>
                                                    )}
                                                </Stack>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <Stack direction="column" spacing={2}>
                                                    <Typography variant="subtitle1">Matches (Best of 3)</Typography>
                                                    {game.matches.map((match, matchIndex) => (
                                                        <Paper key={match.id} elevation={1} sx={{ p: 2 }}>
                                                            <Stack direction="row" spacing={2} alignItems="center">
                                                                <Typography>Match {matchIndex + 1}</Typography>
                                                                <FormControl fullWidth size="small">
                                                                    <InputLabel>Winner</InputLabel>
                                                                    <Select
                                                                        value={match.winner || ''}
                                                                        label="Winner"
                                                                        onChange={(e) => handleSetMatchWinner(
                                                                            week.id,
                                                                            game.id,
                                                                            match.id,
                                                                            e.target.value as string
                                                                        )}
                                                                    >
                                                                        <MenuItem value="">
                                                                            <em>Not played</em>
                                                                        </MenuItem>
                                                                        <MenuItem value={game.teamA}>{getTeamNameById(game.teamA)}</MenuItem>
                                                                        <MenuItem value={game.teamB}>{getTeamNameById(game.teamB)}</MenuItem>
                                                                    </Select>
                                                                </FormControl>
                                                            </Stack>
                                                        </Paper>
                                                    ))}
                                                </Stack>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Paper>
                                ))}

                                {isAddingGame === week.id ? (
                                    <Paper elevation={2} sx={{ p: 2 }}>
                                        <Stack direction="column" spacing={2}>
                                            <Typography variant="subtitle1">Add New Game</Typography>
                                            <TextField
                                                label="Game ID"
                                                value={newGameId}
                                                onChange={handleNewGameIdChange}
                                                fullWidth
                                                size="small"
                                            />
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Team A</InputLabel>
                                                <Select
                                                    value={newGameTeamA}
                                                    label="Team A"
                                                    onChange={() => handleTeamAChange}
                                                >
                                                    {teams.map(team => (
                                                        <MenuItem key={`teamA-${team.id}`} value={team.id}>
                                                            {team.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl fullWidth size="small">
                                                <InputLabel>Team B</InputLabel>
                                                <Select
                                                    value={newGameTeamB}
                                                    label="Team B"
                                                    onChange={() => handleTeamBChange}
                                                >
                                                    {teams.map(team => (
                                                        <MenuItem key={`teamB-${team.id}`} value={team.id}>
                                                            {team.name}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                                <Button
                                                    variant="contained"
                                                    startIcon={<CheckIcon />}
                                                    onClick={() => handleAddGame(week.id)}
                                                    disabled={!newGameId.trim() || !newGameTeamA || !newGameTeamB || newGameTeamA === newGameTeamB}
                                                >
                                                    Add Game
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    startIcon={<CloseIcon />}
                                                    onClick={handleCancelAddGame}
                                                >
                                                    Cancel
                                                </Button>
                                            </Stack>
                                        </Stack>
                                    </Paper>
                                ) : (
                                    <Button
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => handleAddGameClick(week.id)}
                                    >
                                        Add Game
                                    </Button>
                                )}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                ))}

                {isAddingWeek ? (
                    <Paper elevation={2} sx={{ p: 2 }}>
                        <Stack direction="column" spacing={2}>
                            <Typography variant="subtitle1">Add New Week</Typography>
                            <TextField
                                label="Week Name"
                                value={newWeekName}
                                onChange={handleNewWeekNameChange}
                                fullWidth
                                size="small"
                                placeholder="e.g. Week 1"
                                autoFocus
                            />
                            <Stack direction="row" spacing={1} justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    startIcon={<CheckIcon />}
                                    onClick={handleAddWeek}
                                    disabled={!newWeekName.trim()}
                                >
                                    Add Week
                                </Button>
                                <Button
                                    variant="outlined"
                                    startIcon={<CloseIcon />}
                                    onClick={handleCancelAddWeek}
                                >
                                    Cancel
                                </Button>
                            </Stack>
                        </Stack>
                    </Paper>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineIcon />}
                        onClick={handleAddWeekClick}
                    >
                        Add Week
                    </Button>
                )}

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveAll}
                    sx={{ mt: 2 }}
                >
                    Save All Changes
                </Button>
            </Stack>
        </Box>
    );
};

const sampleWeeks: Week[] = [
    {
        id: 'week1',
        name: 'Week 1',
        games: [
            {
                id: 'game-101',
                teamA: 'Feet Finders',
                teamB: 'Tanner Time',
                matches: [
                    { id: 'game-101-match-1', winner: 'Feet Finders' },
                    { id: 'game-101-match-2', winner: 'Tanner Time' },
                    { id: 'game-101-match-3', winner: 'Feet Finers' },
                ],
                winner: 'team1'
            },
            {
                id: 'game-102',
                teamA: 'Cucks Anonymous',
                teamB: 'Facecheck My Zipper',
                matches: [
                    { id: 'game-102-match-1', winner: 'Cucks Anonymous' },
                    { id: 'game-102-match-2', winner: 'Cucks Anonymous' },
                    { id: 'game-102-match-3', winner: null },
                ],
                winner: 'team3'
            }
        ]
    },
    {
        id: 'week2',
        name: 'Week 2',
        games: [
            {
                id: 'game-201',
                teamA: 'team5',
                teamB: 'team6',
                matches: [
                    { id: 'game-201-match-1', winner: 'team6' },
                    { id: 'game-201-match-2', winner: 'team5' },
                    { id: 'game-201-match-3', winner: null },
                ],
                winner: null
            },
            {
                id: 'game-202',
                teamA: 'team1',
                teamB: 'team3',
                matches: [
                    { id: 'game-202-match-1', winner: null },
                    { id: 'game-202-match-2', winner: null },
                    { id: 'game-202-match-3', winner: null },
                ],
                winner: null
            },
            {
                id: 'game-203',
                teamA: 'team2',
                teamB: 'team4',
                matches: [
                    { id: 'game-203-match-1', winner: 'team2' },
                    { id: 'game-203-match-2', winner: 'team4' },
                    { id: 'game-203-match-3', winner: 'team2' },
                ],
                winner: 'team2'
            }
        ]
    }
];