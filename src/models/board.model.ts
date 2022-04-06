import { Card } from "./card";
import { Pile } from "./pile";

export interface Board {
    piles: Pile[];
    cards: Card[];
    // constructor() {
    //     this.generateAllCards();
    //     this.generateAllPiles();
    // }



    // giveHand() {
    //     const hand:any[] = [];
    //     for (let i = 0; i < 5; i++) {
    //         const cardsNotUsed = this.cards.filter(card => !card.isUsed());
    //         console.error(cardsNotUsed)
    //         if (cardsNotUsed.length > 0) {
    //             const nextCard = this.cards[Math.floor(Math.random() * cardsNotUsed.length)];
    //             hand.push(nextCard);
    //             nextCard.play();
    //         }
    //     }
    //     return hand;
    // }
}