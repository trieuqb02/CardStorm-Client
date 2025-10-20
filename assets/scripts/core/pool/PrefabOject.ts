import { _decorator, CCInteger, CCString, Prefab } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('PrefabOject')
export class PrefabOject {
    @property(CCString)
    public id: string = '';

    @property(CCInteger)
    public quantity: number = 0;

    @property(Prefab)
    public prefab: Prefab = null;
}


