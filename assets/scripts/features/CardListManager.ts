import { _decorator, Component, Node } from 'cc';
import { Card } from '../core/data/GameData';
import { ConfigGame } from '../core/config/ConfigGame';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
const { ccclass, property } = _decorator;

@ccclass('CardListManager')
export class CardListManager extends Component {
    @property([Node])
    slots: Node[] = [];

    private _cards!: Card[];

    private _isSortByDefault!: boolean;

    private _configGame!: ConfigGame

    protected start(): void {
        this._isSortByDefault = true;
        this._configGame = ServiceLocator.get(ServiceKey.CONFIG_GAME);
    }

    public updateData(cards: Card[]): void {
        if (this._isSortByDefault) {
            this._cards = this.sortByDefault(cards);
        } else {
            this._cards = this.sortBySuit(cards);
        }
    }

    private sortByDefault(cards: Card[]): Card[] {
        const valueOrder = this._configGame.config.VALUE_ORDER as string[];
        const suitOrder = this._configGame.config.SUIT_ORDER as string[];
        for (let i = 1; i < cards.length; ++i) {
            const tempCard = cards[i];
            let j = i - 1;
            let index = i;
            while (j >= 0) {
                const valueResult: number = valueOrder.indexOf(cards[j].value) - valueOrder.indexOf(tempCard.value);
                const suitResult: number = suitOrder.indexOf(cards[j].suit) - suitOrder.indexOf(tempCard.suit);
                if (valueResult > 0 || (valueResult === 0 && suitResult > 0)) {
                    cards[index] = cards[j];
                    cards[j] = tempCard;
                    --j;
                    --index;
                } else {
                    break;
                }
            }
        }
        return cards;
    }

    private sortBySuit(cards: Card[]): Card[] {
        const suitOrder = this._configGame.config.SUIT_ORDER as string[];

        const suitMap = new Map<string, Card[]>();
        for (const suit of suitOrder) {
            suitMap.set(suit, []);
        }

        for (const card of cards) {
            suitMap.get(card.suit)?.push(card);
        }

        const sorted: Card[] = [];
        for (const suit of suitOrder) {
            const group = suitMap.get(suit)!;
            if (group.length > 1) {
                sorted.push(...this.sortByDefault(group));
            } else {
                sorted.push(...group);
            }
        }

        return sorted;
    }


}


