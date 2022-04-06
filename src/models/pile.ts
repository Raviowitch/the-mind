import { Card } from "./card";

export interface Pile {
    cards: Card[];
    direction: 'UP' | 'DOWN';
    // constructor(direction: 'UP' | 'DOWN') {
    //     this.direction = direction;
    // }
}
