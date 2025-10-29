import { _decorator, Component, Node } from 'cc';
import { GameData } from '../data/GameData';
import { DealToPlayers, ICommand, SelectRandomPlayer } from './ICommand';
const { ccclass, property } = _decorator;

export class Command {
    public isSync: boolean;
    public action: ICommand;
}

@ccclass('WriterManager')
export class WriterManager extends Component {

    protected onLoad(): void {

    }

    public initGame(data: GameData): Command[] {
        const commands: Command[] = [];

        commands.push({
            isSync: true,
            action: new DealToPlayers(data.players)
        })

        commands.push({
            isSync: true,
            action: new SelectRandomPlayer(data.turnPlayerId)
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


