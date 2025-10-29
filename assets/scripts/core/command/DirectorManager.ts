import { _decorator, Component, Node, tween } from 'cc';
import { Command } from './WriterManager';
const { ccclass, property } = _decorator;

@ccclass('DirectorManager')
export class DirectorManager extends Component {

    private commands: Command[] = []

    protected onLoad(): void {

    }

    public async runCommands(commands: Command[]): Promise<void> {
        this.commands = commands;
        for (const command of this.commands) {
            await command.action.execute();
        }
    }

    protected onDestroy(): void {

    }
}


