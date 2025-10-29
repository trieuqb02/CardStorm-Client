import { _decorator, Component, Node } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('TableAreaManager')
export class TableAreaManager extends Component {
    @property(Node)
    playerNode: Node = null;

    @property(Node)
    opponentNode: Node = null;

    @property(Node)
    centerNode: Node = null;

    @property(Node)
    deckNode: Node = null;


    protected onLoad(): void {

    }

    protected onDestroy(): void {

    }
}


