import { _decorator, Component, Node, tween } from 'cc';
import { Command } from './WriterManager';
import { ServiceLocator } from '../locator/ServiceLocator';
const { ccclass, property } = _decorator;

@ccclass('DirectorManager')
export class DirectorManager extends Component {

    private commands: Command[] = []

    public async runCommands(commands: Command[]): Promise<void> {
        this.commands = commands;
        for (const command of this.commands) {
            await command.action.execute(command.data);
        }
    }
}


