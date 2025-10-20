import { _decorator, Component } from 'cc';
import { ServiceLocator } from '../locator/ServiceLocator';
import { ServiceKey } from '../locator/ServiceKey';
import { EventMap } from './EventMap';
const { ccclass, property } = _decorator;

type EventKey = keyof EventMap;

type Handler<K extends EventKey> = {
    method: (data: EventMap[K]) => void;
    target: unknown
}

@ccclass('EventListener')
export class EventListener extends Component {

    private events: Map<EventKey, Handler<EventKey>[]> = new Map<EventKey, Handler<EventKey>[]>();

    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.EVENT_MANAGER, this);
    }

    public register<K extends EventKey>(key: EventKey, method: (data: EventMap[K]) => void, target: unknown): void {
        if (!this.events.has(key)) {
            this.events.set(key, []);
        }
        this.events.get(key)!.push({ method, target });
    }

    public notify<K extends EventKey>(key: K, data: EventMap[K]): void {
        const handlers = this.events.get(key);
        if (!handlers) return;
        for (const h of handlers) {
            h.method.call(h.target, data);
        }
    }

    public unregister<K extends EventKey>(key: EventKey, method: (data: EventMap[K]) => void, target: unknown): void {
        if (!this.events.has(key)) return;

        const handlers = this.events.get(key);
        const filtered = handlers.filter(
            (h) => h.method !== method || h.target !== target
        );

        if (filtered.length > 0) {
            this.events.set(key, filtered);
        } else {
            this.events.delete(key);
        }
    }

    protected onDestroy(): void {
        ServiceLocator.unregister(ServiceKey.EVENT_MANAGER);
        this.events.clear();
    }
}


