import { TableAreaManager } from "../../features/TableAreaManager";
import { Player } from "../data/GameData";

export interface ICommand {
    execute(data?: any): Promise<void>;
}

export class DealToPlayers implements ICommand {

    private tableAreaMgr!: TableAreaManager;

    constructor(tableAreaMgr: TableAreaManager) {
        this.tableAreaMgr = tableAreaMgr;
    }

    execute(): Promise<void> {
        return this.tableAreaMgr.dealToPlayers();
    }
}

export class UpdatePlayers implements ICommand {

    private tableAreaMgr!: TableAreaManager;

    constructor(tableAreaMgr: TableAreaManager) {
        this.tableAreaMgr = tableAreaMgr;
    }

    execute(data: Player[]): Promise<void> {
        return this.tableAreaMgr.initPlayers(data);
    }

}