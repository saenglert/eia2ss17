
namespace maumau {
    let deck: string[] = [];
    let hand: string[] = [];
    let discard: string[] = [];

    window.onload = init;

    function init(): void {
        createDeck();
        //console.log(deck);

        document.getElementById("deck").addEventListener("click", drawCard);
    }

    function createDeck(): void {
        let colors: string[] = ["Schelle", "Herz", "Blatt", "Eichel"];
        let values: string[] = ["7", "8", "9", "10", "Unter", "Ober", "König", "Ass"];

        for (let i: number = 0; i < colors.length; i++) {
            for (let j: number = 0; j < values.length; j++) {
                deck.push(colors[i] + " " + values[j]);
            }
        }
    }

    function drawCard(): void {
        if (hand.length < 5) {
            let min: number = 0;
            let max: number = deck.length - 1;
            let random: number = Math.round(Math.random() * (max - min) + min);

            let returnvalue: string[] = deck.splice(random, 1);
            let card: string = returnvalue[0];
            hand.push(card);

            console.log(hand);
        }

        updateVisuals();
    }

    function updateVisuals(): void {
        if (deck.length == 0) {
            let deckDiv: HTMLElement = document.getElementById("deck");
            deckDiv.parentNode.removeChild(deckDiv);
        }

        let handDiv: HTMLElement = document.getElementById("hand");
        handDiv.innerHTML = "";
        for (let i: number = 0; i < hand.length; i++) {
            let div: HTMLElement = document.createElement("div");
            div.textContent = hand[i];
            div.addEventListener("click", removeCard);
            handDiv.appendChild(div);
        }

        console.log(discard);
        if (discard.length > 0) {
            document.getElementById("discard").textContent = discard[discard.length - 1];
        }
    }

    function removeCard(_event: MouseEvent): void {
        let target: HTMLElement = <HTMLElement>_event.target;
        let card: string = target.textContent;
        hand.splice(hand.indexOf(card), 1);
        discard.push(card);

        updateVisuals();
    }
}