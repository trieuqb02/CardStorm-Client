import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
import { DistributeComponent } from './DistributeComponent';
import { Card } from './CardComponent';
import { CardListComponent } from './CardListComponent';
const { ccclass, property } = _decorator;

@ccclass('BattleComponent')
export class BattleComponent extends Component {
    @property(Node)
    private player!: Node;

    @property(Node)
    private opponent!: Node;

    @property(Node)
    private deck!: Node;

    @property(Node)
    private board!: Node;

    private cardsPlayer: Card[] = [
        { id: "4", value: "4" },
        { id: "1", value: "1" },
        { id: "7", value: "7" },
        { id: "3", value: "3" },
        { id: "6", value: "6" },
        { id: "8", value: "8" },
        { id: "2", value: "2" },
        { id: "5", value: "5" },
    ];

    private cardsOpponent: Card[] = [
        { id: "14", value: "14" },
        { id: "11", value: "11" },
        { id: "9", value: "9" },
        { id: "10", value: "10" },
        { id: "12", value: "12" },
        { id: "15", value: "15" },
        { id: "16", value: "16" },
        { id: "13", value: "13" },
    ];

    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.BATTLE_MANAGER, this);
    }

    protected start(): void {
        this.deck.getComponent(DistributeComponent).distributeCard([...this.cardsPlayer, ...this.cardsOpponent]);
        const cardListOfPlayer = this.player.getComponent(CardListComponent);
        cardListOfPlayer.setEvent(true);
        cardListOfPlayer.setCardList(this.cardsPlayer);

        const cardListOfOpponent = this.opponent.getComponent(CardListComponent);
        cardListOfOpponent.setCardList(this.cardsOpponent)
    }

    public getPlayer(): Node {
        return this.player;
    }

    public getOpponent(): Node {
        return this.opponent;
    }

    public getBoard(): Node {
        return this.board;
    }

    protected onDestroy(): void {
        ServiceLocator.unregister(ServiceKey.BATTLE_MANAGER);
    }
}


