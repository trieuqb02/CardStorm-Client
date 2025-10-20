import { Card } from "../../features/CardComponent";

export type EventMap = {
    SELECT_CARD: Card,
    LIMIT_CARD: boolean,
};

export enum EventKey {
    SELECT_CARD = "SELECT_CARD",
    LIMIT_CARD = "LIMIT_CARD"
}