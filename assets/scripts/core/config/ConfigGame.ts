import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../locator/ServiceLocator';
import { ServiceKey } from '../locator/ServiceKey';
const { ccclass, property } = _decorator;

@ccclass('ConfigGame')
export class ConfigGame extends Component {

    public config!: any;

    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.CONFIG_GAME, this);
        this.config = {
            MARGIN_Y: 12,
            TIME_FLY: 0.5,
            LIMIT_CARD: 5,
        }
    }

    protected onDestroy(): void {
        ServiceLocator.unregister(ServiceKey.CONFIG_GAME);
    }
}


