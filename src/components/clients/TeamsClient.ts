import {Team} from "../types/Team.ts";
import {Player} from "../types/Player.ts";
import { Client, Databases } from "appwrite"

export const PROJECT_ID = import.meta.env.VITE_APPWRITE_LOF_PROJECT_ID;
export const DATABASE_ID = import.meta.env.VITE_APPWRITE_LOF_DB_ID;
export const COLLECTION_ID = import.meta.env.VITE_APPWRITE_TEAM_COLLECTION_ID;

export const getAllTeams = async (): Promise<Team[]> => {

    if(DATABASE_ID && COLLECTION_ID && PROJECT_ID) {
        const client = new Client()
            .setEndpoint('https://cloud.appwrite.io/v1')
            .setProject(PROJECT_ID);

        const databases = new Databases(client);

        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
        );

        // console.log("response")
        // console.log(response)

        const teams: Team[] = response.documents.map((doc) => ({
            name: doc.name,
            wins: doc.wins,
            losses: doc.losses,
            ties: doc.ties,
            players: doc.players.map((player: any) => ({
                name: player.name
            } as Player))
        } as Team));

        // console.log("teams")
        // console.log(teams)
        
        return teams;
    }
    return [] as Team[];
}
