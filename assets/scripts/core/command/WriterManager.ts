import { _decorator, Component, Node } from 'cc';
import { Data, GameData } from '../data/GameData';
import { DealToPlayers, UpdatePlayers, ICommand } from './ICommand';
import { TableAreaManager } from '../../features/TableAreaManager';
import { ServiceLocator } from '../locator/ServiceLocator';
import { ServiceKey } from '../locator/ServiceKey';
const { ccclass, property } = _decorator;

export class Command {
    public data?: any;
    public action: ICommand;
}

@ccclass('WriterManager')
export class WriterManager extends Component {

    private tableAreaMgr!: TableAreaManager;

    protected onLoad(): void {

    }

    protected start(): void {
        this.tableAreaMgr = ServiceLocator.get(ServiceKey.TABLE_AREA);
    }

    public initGame(data: Data): Command[] {
        const commands: Command[] = [];

        commands.push({
            data: data.players,
            action: new UpdatePlayers(this.tableAreaMgr)
        })

        commands.push({
            action: new DealToPlayers(this.tableAreaMgr)
        })

        return commands;
    }

    public startGame(data: any): Command[] {
        return [];
    }

    public resumeGame(data: any): Command[] {
        return [];
    }

    public resultGame(data: any): Command[] {
        return [];
    }

    public endGame(data: any): Command[] {
        return [];
    }


    protected onDestroy(): void {

    }
}


