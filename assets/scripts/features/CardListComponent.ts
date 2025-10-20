import { _decorator, Component, Node, tween, UITransform, Vec3 } from 'cc';
import { EventListener } from '../core/event/EventListener';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
import { EventKey } from '../core/event/EventMap';
import { Card, CardComponent } from './CardComponent';
import { ConfigGame } from '../core/config/ConfigGame';
import { BattleComponent } from './BattleComponent';
const { ccclass, property } = _decorator;

@ccclass('CardListComponent')
export class CardListComponent extends Component {

    @property([Node])
    private cells: Node[] = [];

    private selectedCard: Map<string, string> = new Map<string, string>();

    private eventManager!: EventListener;
    private configGame!: ConfigGame;
    private battleManager!: BattleComponent;
    private data!: Card[];
    private orderCard: { cell: number, data: Card }[] = [];

    protected onLoad(): void {
        this.eventManager = ServiceLocator.get(ServiceKey.EVENT_MANAGER);
        this.configGame = ServiceLocator.get(ServiceKey.CONFIG_GAME);
        this.battleManager = ServiceLocator.get(ServiceKey.BATTLE_MANAGER);
    }

    public setCardList(data: Card[]): void {
        this.data = data;
        this.data.forEach((card: Card, index: number) => {
            this.orderCard.push({ cell: index, data: card });
        });
        this.insertionSort(this.orderCard);
    }

    private insertionSort(arr: { cell: number, data: Card }[]): void {
        let i: number, j: number, last: { cell: number, data: Card };
        for (let i = 1; i < arr.length; i++) {
            last = arr[i];
            j = i;
            while ((j > 0) && (arr[j - 1].data.value > last.data.value)) {
                arr[j] = arr[j - 1];
                j = j - 1;
            }
            arr[j] = last;
        }
    }

    public setEvent(isPlayer: boolean): void {
        if (isPlayer) {
            this.eventManager.register(EventKey.SELECT_CARD, this.selectCard, this);
        }
    }

    public getCells(): Node[] {
        return this.cells;
    }

    public getCellAt(index: number): Node | undefined {
        return this.cells[index] || undefined;
    }

    public sortByValue(): void {
        let direction = 1;
        this.orderCard.forEach((ele: { cell: number; data: Card }, index: number) => {
            if (index !== ele.cell) {
                direction *= -1;
                ele.cell = index;
                const startNode = this.cells[ele.cell].children[0];
                const endNode = this.cells[index].children[0];

                const startPos = startNode.getWorldPosition();
                const endPos = endNode.getWorldPosition();
                const midPos = new Vec3(
                    (startPos.x + endPos.x) / 2,
                    Math.max(startPos.y, endPos.y) + (120 * direction),
                    (startPos.z + endPos.z) / 2
                );

                const tParam = { t: 0 };
                tween(tParam)
                    .to(0.5, { t: 1 }, {
                        onUpdate: ({ t }) => {
                            const x = (1 - t) * (1 - t) * startPos.x + 2 * (1 - t) * t * midPos.x + t * t * endPos.x;
                            const y = (1 - t) * (1 - t) * startPos.y + 2 * (1 - t) * t * midPos.y + t * t * endPos.y;
                            const z = (1 - t) * (1 - t) * startPos.z + 2 * (1 - t) * t * midPos.z + t * t * endPos.z;
                            startNode.setWorldPosition(x, y, z);
                        },
                        easing: 'quadOut',
                    })
                    .call(() => {
                        const worldPos = startNode.getWorldPosition();
                        startNode.setParent(this.cells[index]);
                        startNode.setWorldPosition(worldPos);
                    })
                    .start();
            }
        });
    }

    private playCards(): void {
        const board = this.battleManager.getBoard();
        const n = this.selectedCard.size;
        const spacing = 100;
        let index = 0;

        for (const [key, value] of this.selectedCard) {
            const data = this.orderCard.find(ele => ele.data.id === key && ele.data.value === value);
            const cell = this.cells[data.cell];
            const node = cell.children[0];
            const worldPos = node.worldPosition;
            node.setParent(board);
            node.worldPosition = worldPos;

            const targetPos = new Vec3((index - (n - 1) / 2) * spacing, 0, 0);
            tween(node)
                .to(0.5, { position: targetPos }, { easing: "quadOut" })
                .call(() => {
                    node.getComponent(CardComponent).cancelAllEvent();
                })
                .start();

            index++;
        }
        this.selectedCard.clear();
    }

    private selectCard = (data: Card): void => {
        if (this.selectedCard.has(data.id)) {
            this.selectedCard.delete(data.id);
        } else {
            this.selectedCard.set(data.id, data.value);
        }
        const limitCard = this.configGame.config.LIMIT_CARD;
        if (this.selectedCard.size >= limitCard) {
            this.eventManager.notify(EventKey.LIMIT_CARD, true);
        } else {
            this.eventManager.notify(EventKey.LIMIT_CARD, false);
        }
    }

    public getSelectedCards(): Map<string, string> {
        return this.selectedCard;
    }

    protected onDestroy(): void {
        this.eventManager.unregister(EventKey.SELECT_CARD, this.selectCard, this);
    }
}


