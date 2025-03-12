import {Player} from "./Player.ts";

export type Team = {
    name: string,
    wins: number,
    losses: number,
    ties: number,
    players: Player[]
}