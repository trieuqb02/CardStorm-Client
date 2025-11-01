import { _decorator, Component, Node } from 'cc';
import { Player } from '../core/data/GameData';
import { CardListManager } from './CardListManager';

const { ccclass, property } = _decorator;

@ccclass('PlayerManager')
export class PlayerManager extends Component {

    @property(CardListManager)
    cardListMgr: CardListManager = null;

    public isSortByRage: boolean = false;

    public data!: Player;

    protected onLoad(): void {
        this.isSortByRage = false;
    }

    public updateData(data: Player): void {
        this.data = data;
        this.cardListMgr.updateData(this.data.cards);
    }

    protected onDestroy(): void {

    }
}


