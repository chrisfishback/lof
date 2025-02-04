import {Player} from "./Player.ts";

export type Team = {
    id: number,
    name: string,
    wins: number,
    losses: number,
    ties: number,
    players: Player[]
}