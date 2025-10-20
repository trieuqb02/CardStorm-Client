import { _decorator, Component, Node } from 'cc';
import { ServiceLocator } from '../locator/ServiceLocator';
import { ServiceKey } from '../locator/ServiceKey';
const { ccclass, property } = _decorator;

@ccclass('SoundManager')
export class SoundManager extends Component {
    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.SOUND_MANANGER, this);
    }

    protected onDestroy(): void {
        ServiceLocator.unregister(ServiceKey.SOUND_MANANGER);
    }
}


