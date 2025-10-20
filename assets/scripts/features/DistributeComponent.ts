import { _decorator, Component, Node, tween, UITransform, Vec3 } from 'cc';
import { PoolFactory } from '../core/pool/PoolFactory';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
import { Card, CardComponent } from './CardComponent';
import { KeyObject } from '../core/pool/KeyObject';
import { BattleComponent } from './BattleComponent';
import { CardListComponent } from './CardListComponent';
import { ConfigGame } from '../core/config/ConfigGame';
const { ccclass, property } = _decorator;

@ccclass('DistributeComponent')
export class DistributeComponent extends Component {
    private poolFactory!: PoolFactory;
    private battleManager!: BattleComponent;
    private configGame!: ConfigGame;

    private cardPosList: Node[] = [];

    protected onLoad(): void {
        this.poolFactory = ServiceLocator.get(ServiceKey.POOL_FACTORY);
        this.battleManager = ServiceLocator.get(ServiceKey.BATTLE_MANAGER);
        this.configGame = ServiceLocator.get(ServiceKey.CONFIG_GAME);
        this.setup();
    }

    private setup() {
        const player = this.battleManager.getPlayer();
        const opponent = this.battleManager.getOpponent();

        const cellsOfPlayer = player.getComponent(CardListComponent).getCells();
        cellsOfPlayer.forEach((cell: Node) => {
            this.cardPosList.push(cell);
        })

        const cellsOfOpponent = opponent.getComponent(CardListComponent).getCells();
        cellsOfOpponent.forEach((cell: Node) => {
            this.cardPosList.push(cell);
        })
    }

    public distributeCard(data: Card[]): void {
        const timeFly = this.configGame.config.TIME_FLY;
        data.forEach((card: Card, index: number) => {
            const node = this.poolFactory.getObject(KeyObject.CARD);
            const isPlayer = index < 8 ? true : false;
            node.getComponent(CardComponent)?.init(card, isPlayer);

            node.parent = this.node;
            node.position = Vec3.ZERO;
            const delayTime = 0.2 * index;

            const worldPos = this.cardPosList[index].getWorldPosition();

            const localPos = this.node.getComponent(UITransform)?.convertToNodeSpaceAR(worldPos);
            if (!localPos) return;

            tween(node)
                .delay(delayTime)
                .to(timeFly, { position: localPos }, { easing: 'quadOut' })
                .call(() => {
                    node.setParent(this.cardPosList[index]);
                    node.setPosition(Vec3.ZERO);
                })
                .start();
        })
    }

    private exchangeCard(data: string[]): void {

    }
}


