import { _decorator, Component, easing, input, Label, Node, Tween, tween, Vec3 } from 'cc';
import { EventListener } from '../core/event/EventListener';
import { ServiceLocator } from '../core/locator/ServiceLocator';
import { ServiceKey } from '../core/locator/ServiceKey';
import { EventKey } from '../core/event/EventMap';
import { ConfigGame } from '../core/config/ConfigGame';
const { ccclass, property } = _decorator;

export class Card {
    id: string;
    value: string;
}

@ccclass('CardComponent')
export class CardComponent extends Component {
    @property(Label)
    private label!: Label;

    private isSelected: boolean = false;
    private configGame!: ConfigGame;
    private eventManager!: EventListener;
    private isLimit!: boolean;
    private data!: Card;

    private tweenMargin!: Tween;

    protected onEnable(): void {
        this.configGame = ServiceLocator.get(ServiceKey.CONFIG_GAME);
        this.eventManager = ServiceLocator.get(ServiceKey.EVENT_MANAGER);
        this.eventManager.register(EventKey.LIMIT_CARD, this.setLimitSelect, this);
    }

    public init(data: Card, isPlayer: boolean): void {
        this.label.string = data.value;
        this.isSelected = false;
        if (isPlayer) {
            this.node.on(Node.EventType.TOUCH_START, this.onSelectCard);
        }
        this.data = data;
    }

    private setLimitSelect(isLimit: boolean): void {
        this.isLimit = isLimit;
    }

    private onSelectCard = (): void => {
        if (this.isLimit && !this.isSelected) return;
        if (this.tweenMargin) return;

        this.isSelected = !this.isSelected;
        let newPos = new Vec3(0, 0, 0);
        const marginY = this.configGame.config.MARGIN_Y;
        if (this.isSelected) {
            newPos.add(new Vec3(0, marginY, 0));
        } else {
            newPos.add(new Vec3(0, -marginY, 0));
        }
        this.tweenMargin = tween(this.node)
            .by(0.2, { position: newPos }, { easing: "quadInOut" })
            .call(() => {
                this.eventManager.notify(EventKey.SELECT_CARD, this.data);
                this.tweenMargin = null;
            })
        this.tweenMargin.start();
    }

    public cancelAllEvent(): void {
        this.node.off(Node.EventType.TOUCH_START, this.onSelectCard);
        this.eventManager.unregister(EventKey.LIMIT_CARD, this.setLimitSelect, this);
    }

    protected onDisable(): void {
        this.eventManager.unregister(EventKey.LIMIT_CARD, this.setLimitSelect, this);
    }
}


