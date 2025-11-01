import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
import { Player } from '../core/data/GameData';
import { PlayerManager } from './PlayerManager';
const { ccclass, property } = _decorator;

@ccclass('TableAreaManager')
export class TableAreaManager extends Component {
    @property(PlayerManager)
    playerMgr: PlayerManager = null;

    @property(PlayerManager)
    opponentMgr: PlayerManager = null;

    @property(Node)
    centerNode: Node = null;

    @property(Node)
    deckNode: Node = null;

    private playerId: string = "p1";

    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.TABLE_AREA, this);
    }

    protected start(): void {

    }

    public async initPlayers(data: Player[]): Promise<void> {
        data.forEach((player: Player) => {
            if (this.playerId === player.id) {
                this.playerMgr.updateData(player);
            } else {
                this.opponentMgr.updateData(player);
            }
        })
        return;
    }

    public async dealToPlayers(): Promise<void> {



        return;
    }

    public async dealToPlayer(): Promise<void> {

    }

    protected onDestroy(): void {

    }
}


