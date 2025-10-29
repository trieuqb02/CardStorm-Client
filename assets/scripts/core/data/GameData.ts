export class Player {
    public playerId: string;
    public hp: number;
    public cards: string[];
    public buffs: string[];
}

export class GameData {
    public roomId: string;
    public turnPlayerId: string;
    public turnTotal: number;
    public turn: number;
    public timer: number;
    public players: Player[];
    public buffs: [];
}