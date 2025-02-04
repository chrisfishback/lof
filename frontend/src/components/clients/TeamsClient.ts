import axios from "axios";
import {Team} from "../types/Team.ts";

export const getAllTeams = (): Promise<Team[]> =>
    axios.get('/teams')
        .then(response => response.data)
        .catch(error => console.log(`Error retrieving all teams: ${error}`))