import { Card } from "./card";

export interface Player {
    id: string;
    name: string;
    cards: Card[];
    // constructor(id: string, name: string, cards: Card[]) {
    //     this.id = id;
    //     this.name = name;
    //     this.cards = cards;
    // }

    // drawHand() {
    //     this.cards.forEach(card => {
    //         // console.log(this.id);
    //         // console.log(document.getElementById("p1"));
    //         // const node = document.createElement("p");
    //         // node.classList.add("cardInHand");
    //         // const textnode = document.createTextNode(`${card.value}`);
    //         // node.appendChild(textnode);
    //         // document.getElementById(`${this.id}`).appendChild(node);
    //     })
    // }
}