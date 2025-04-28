import {Player} from "./Player.ts";

export type Team = {
    id: string,
    name: string,
    wins: number,
    losses: number,
    ties: number,
    players: Player[]
}