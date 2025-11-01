export class Player {
    public id: string;
    public displayName: string;
    public hp: number;
    public cards: Card[];
    public buffs: string[];
    public isDisconnected: boolean;
}

export type Suit = "Spades" | "Hearts" | "Diamonds" | "Clubs";
export type Value = "A" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K";
export class Card {
    suit: Suit;
    value: Value;
}

export class Room {
    public id: string;
    public maxPlayers: number
}

export class Turn {
    public currentTurn: number;
    public totalTurns: number;
    public currentPlayerId: string;
    public remainingTime: number
}

export class Data {
    public room: Room;
    public turn: Turn;
    public players: Player[];
}

export class GameData {
    event: string;
    timestamp: string;
    data: Data
}