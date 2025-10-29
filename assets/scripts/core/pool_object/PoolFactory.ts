import { _decorator, Component, instantiate, Node, Prefab } from 'cc';
import { PrefabOject } from './PrefabOject';
import { ServiceLocator } from '../locator/ServiceLocator';
import { ServiceKey } from '../locator/ServiceKey';
const { ccclass, property } = _decorator;

@ccclass('PoolFactory')
export class PoolFactory extends Component {
    @property([PrefabOject])
    public prefabs: PrefabOject[] = [];

    private _pools: Object = {};

    protected onLoad(): void {
        ServiceLocator.register(ServiceKey.POOL_FACTORY, this);
        this.setup();
    }

    private setup(): void {
        this.prefabs.forEach(data => {
            const id = data.id;
            const quantity = data.quantity;
            this._pools[id] = [];
            for (let i = 0; i < quantity; i++) {
                const node = this.createPrefab(id, data.prefab);
                node.active = false;
                this._pools[id].push(node);
            }
        });
    }

    private createPrefab(id: string, prefab?: Prefab): Node {
        let node = undefined;
        if (prefab) {
            node = instantiate(prefab);
        } else {
            const data = this.prefabs.find(data => id == data.id);
            node = instantiate(data.prefab);
        }
        return node;
    }

    public getObject(id: string): Node {
        const lenght = this._pools[id].lenght;
        if (!lenght) {
            const node = this.createPrefab(id);
            this._pools[id].push(node);
        }
        const node = this._pools[id].pop();
        node.active = true;
        return node;
    }

    public putObject(id: string, node: Node): void {
        node.active = false;
        return this._pools[id].push(node);
    }

    protected onDestroy(): void {
        ServiceLocator.unregister(ServiceKey.POOL_FACTORY);
    }
}


