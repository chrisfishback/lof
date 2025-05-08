import { useContext, useState } from "react";

import { TeamContext } from "../../lib/TeamContext.tsx"
import { Player } from "../types/Player.ts";
import { Accordion, AccordionDetails, AccordionSummary, Box, Button, IconButton, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';
import { Team } from "../types/Team.ts";

export const EditTeams = () => {

    const { teams, addTeam, addPlayerToTeam } = useContext(TeamContext);
    const [expanded, setExpanded] = useState<number | false>(false);

    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [editedPlayerName, setEditedPlayerName] = useState<string>('');

    const [newPlayerName, setNewPlayerName] = useState<string>('');
    const [isAddingPlayer, setIsAddingPlayer] = useState<string | null>(null);

    const [newTeamName, setNewTeamName] = useState<string>('');
    const [isAddingTeam, setIsAddingTeam] = useState<boolean>(false);

    const handleEditPlayer = (player: Player) => {
        setEditingPlayerId(player.name);
        setEditedPlayerName(player.name);
    };

    const handleSavePlayer = (teamId: string, playerId: string) => {
        console.log(`Saving player ${playerId} in team ${teamId} with new name: ${editedPlayerName}`);
        setEditingPlayerId(null);
    };

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPlayerName(e.target.value);
    };

    const handleNewPlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewPlayerName(e.target.value);
    };

    const handleNewTeamNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTeamName(e.target.value);
    };

    const handleAddNewPlayerButtonClick = (teamName: string) => {
        setIsAddingPlayer(teamName);
        setNewPlayerName('');
    };

    const handleSaveNewPlayer = (teamId: string) => {
        if (newPlayerName.trim() !== '') {
            addPlayerToTeam(teamId, { name: newPlayerName });
            setNewPlayerName('');
            setIsAddingPlayer(null);
        }
    };

    const handleCancelAddPlayer = () => {
        setIsAddingPlayer(null);
        setNewPlayerName('');
    };

    const handleAddTeamClick = () => {
        setIsAddingTeam(true);
        setNewTeamName('');
    };

    const handleAddTeam = () => {
        if (newTeamName.trim() !== '') {
            addTeam({
                name: newTeamName,
                wins: 0,
                losses: 0,
                ties: 0,
                players: [] as Player[]
            } as Team);
            setNewTeamName('');
            setIsAddingTeam(false);
        }
    };

    const handleCancelAddTeam = () => {
        setIsAddingTeam(false);
        setNewTeamName('');
    };

    return (
        <Box>
            <Stack direction={'column'} padding={2}>
                <Typography variant="h5" gutterBottom>
                    Edit Teams
                </Typography>
                {teams && teams.map((team, index) => (
                    <Accordion
                        key={index}
                        expanded={expanded === index}
                        onChange={() => setExpanded(expanded === index ? false : index)}
                    >
                        <AccordionSummary>
                            {team.name}
                        </AccordionSummary>
                        <AccordionDetails>
                            {team.players && team.players.map((player, index) => (
                                <Stack direction={'row'} key={index}>
                                    <TextField
                                        id={`player-${player.name}`}
                                        value={editingPlayerId === player.name ? editedPlayerName : player.name}
                                        disabled={editingPlayerId !== player.name}
                                        onChange={handlePlayerNameChange}
                                    />
                                    {editingPlayerId === player.name ? (
                                        <IconButton onClick={() => handleSavePlayer(team.name, player.name)}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEditPlayer(player)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </Stack>
                            ))}

                            {isAddingPlayer === team.name ? (
                                <Stack direction={'row'} spacing={1} marginTop={1}>
                                    <TextField
                                        id={`new-player-${team.name}`}
                                        value={newPlayerName}
                                        onChange={handleNewPlayerNameChange}
                                        placeholder="New player name"
                                        size="small"
                                        autoFocus
                                    />
                                    <IconButton onClick={() => handleSaveNewPlayer(team.id)} color="primary">
                                        <CheckIcon />
                                    </IconButton>
                                    <IconButton onClick={handleCancelAddPlayer}>
                                        <CloseIcon />
                                    </IconButton>
                                </Stack>
                            ) : (
                                <IconButton onClick={() => handleAddNewPlayerButtonClick(team.name)}>
                                    <AddCircleOutlineRoundedIcon />
                                </IconButton>
                            )}
                        </AccordionDetails>
                    </Accordion>
                ))}

                {isAddingTeam ? (
                    <Stack direction={'row'} spacing={1} marginTop={2}>
                        <TextField
                            value={newTeamName}
                            onChange={handleNewTeamNameChange}
                            placeholder="New team name"
                            size="small"
                            autoFocus
                        />
                        <IconButton onClick={handleAddTeam} color="primary">
                            <CheckIcon />
                        </IconButton>
                        <IconButton onClick={handleCancelAddTeam}>
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                ) : (
                    <Button
                        variant="outlined"
                        startIcon={<AddCircleOutlineRoundedIcon />}
                        onClick={handleAddTeamClick}
                        sx={{ mt: 2 }}
                    >
                        Add Team
                    </Button>
                )}
            </Stack>
        </Box>
    )
}