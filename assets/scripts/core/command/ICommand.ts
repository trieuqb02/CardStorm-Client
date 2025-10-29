import { tween } from "cc";
import { Player } from "../data/GameData";

export interface ICommand {
    execute(): Promise<void>;
}

export class DealToPlayers implements ICommand {

    private data!: Player[];

    constructor(data: Player[]) {
        this.data = data;
    }

    execute(): Promise<void> {
        console.log(this.data);
        return Promise.resolve();
    }
}

export class SelectRandomPlayer implements ICommand {

    private playerId!: string;

    constructor(data: string) {
        this.playerId = data;
    }

    execute(): Promise<void> {
        console.log(this.playerId);
        return Promise.resolve();
    }
}