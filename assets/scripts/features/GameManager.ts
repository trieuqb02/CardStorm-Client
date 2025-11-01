import { _decorator, Component, error, JsonAsset, Node, resources } from 'cc';
import { NetworkManager } from '../core/network/NetworkManager';
import { WriterManager } from '../core/command/WriterManager';
import { GameData } from '../core/data/GameData';
import { DirectorManager } from '../core/command/DirectorManager';
const { ccclass, property } = _decorator;

@ccclass('GameManager')
export class GameManager extends Component {

    private _writer!: WriterManager;
    private _director!: DirectorManager;

    protected onLoad(): void {

    }

    protected start(): void {
        this._writer = this.node.getComponent(WriterManager);
        this._director = this.node.getComponent(DirectorManager);

        resources.load("StartGame", JsonAsset, (error, JsonAsset) => {
            if (error) {
                console.log("Load Json Fail!");
                return;
            }

            const data = JsonAsset.json;
            const dataStore: GameData = data as GameData;
            const commands = this._writer.initGame(dataStore.data);
            this._director.runCommands(commands);
        })
    }

    protected onDestroy(): void {

    }
}


