import { useContext, useState } from "react";

import { TeamContext } from "../../lib/TeamContext.tsx"
import { Player } from "../types/Player.ts";
import PlayerInput from "./PlayerInput";
import { Accordion, AccordionDetails, AccordionSummary, Box, IconButton, Stack, TextField, Typography } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';

export const EditTeams = () => {

    const { teams, loading, error, addTeam, addPlayerToTeam, removePlayerFromTeam } = useContext(TeamContext);
    const [expanded, setExpanded] = useState<number | false>(false);

    const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
    const [editedPlayerName, setEditedPlayerName] = useState<string>('');

    const handleEdit = (player: Player) => {
        setEditingPlayerId(player.name);
        setEditedPlayerName(player.name);
    };

    const handleSave = (teamId: string, playerId: string) => {
        //just a setup
        console.log(`Saving player ${playerId} in team ${teamId} with new name: ${editedPlayerName}`);
        setEditingPlayerId(null);
    };

    const handlePlayerNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditedPlayerName(e.target.value);
    };

    return (
        <Box>
            <Stack direction={'column'} padding={2}>
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
                                        <IconButton onClick={() => handleSave(team.name, player.name)}>
                                            <SaveIcon />
                                        </IconButton>
                                    ) : (
                                        <IconButton onClick={() => handleEdit(player)}>
                                            <EditIcon />
                                        </IconButton>
                                    )}
                                </Stack>
                            ))}
                            <IconButton>
                                <AddCircleOutlineRoundedIcon />
                            </IconButton>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Stack>
        </Box>
    )
}