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

            const teams: Team[] = response.documents.map((doc: any) => ({
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
