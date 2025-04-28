import { Team } from "../types/Team.ts";
import { Player } from "../types/Player.ts";
import { databases, DATABASE_ID, COLLECTION_ID } from "../../lib/appwrite.ts";

export const getAllTeams = async (): Promise<Team[]> => {
    if (DATABASE_ID && COLLECTION_ID) {
        try {
            const response = await databases.listDocuments(
                DATABASE_ID,
                COLLECTION_ID,
            );
            console.log("from aw ", response)
            const teams: Team[] = response.documents.map((doc: any) => ({
                id: doc.$id,
                name: doc.name,
                wins: doc.wins,
                losses: doc.losses,
                ties: doc.ties,
                players: doc.players.map((player: any) => ({
                    name: player.name
                } as Player))
            } as Team));

            return teams;
        } catch (error) {
            console.error("Error fetching teams:", error);
            return [];
        }
    }
    return [] as Team[];
};

export const saveTeam = async (team: Team): Promise<boolean> => {
    if (team && DATABASE_ID && COLLECTION_ID) {
        try {
            const response = await databases.createDocument(
                DATABASE_ID,
                COLLECTION_ID,
                "unique()",  // Appwrite will generate a unique ID
                {
                    name: team.name,
                    wins: team.wins || 0,
                    losses: team.losses || 0,
                    ties: team.ties || 0,
                    players: team.players || []
                }
            );
            console.log("Team created successfully:", response);
            return true;
        } catch (error) {
            console.error("Error saving team:", error);
        }
    }
    return false;
};

export const savePlayerToTeam = async (teamId: string, player: Player): Promise<boolean> => {
    if (!teamId || !player || !DATABASE_ID || !COLLECTION_ID) {
        return false;
    }

    try {
        const teamDoc = await databases.getDocument(
            DATABASE_ID,
            COLLECTION_ID,
            teamId
        );

        if (!teamDoc) {
            console.error("Team not found");
            return false;
        }

        let players: Player[] = teamDoc.players || [];
        
        const existingPlayerIndex = players.findIndex(p => p.name === player.name);
        
        if (existingPlayerIndex >= 0) {
            players[existingPlayerIndex] = player;
        } else {
            players.push(player);
        }

        const response = await databases.updateDocument(
            DATABASE_ID,
            COLLECTION_ID,
            teamId,
            {
                players: players
            }
        );

        console.log("Player saved to team successfully:", response);
        return true;
    } catch (error) {
        console.error("Error saving player to team:", error);
        return false;
    }
};
