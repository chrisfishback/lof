import {Team} from "../types/Team.ts";
import {Player} from "../types/Player.ts";
import { Client, Databases} from "appwrite"

export const DATABASE_ID = "67cc7d69001be23d37c5";
export const COLLECTION_ID = "67cc7e000032407612e9";
export const PROJECT_ID = "67cc78df0039c5fd5d2e"

export const getAllTeams = async (): Promise<Team[]> => {
    const client = new Client()
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(PROJECT_ID);

    const databases = new Databases(client);

    const response = await databases.listDocuments(
        DATABASE_ID,
        COLLECTION_ID,
    );

    console.log("response")
    console.log(response)

    const teams: Team[] = response.documents.map((doc) => ({
        name: doc.name,
        wins: doc.wins,
        losses: doc.losses,
        ties: doc.ties,
        players: doc.players.map((player: any) => ({
            name: player.name
        } as Player))
    } as Team));

    console.log("teams")
    console.log(teams)
    
    return teams;
}
