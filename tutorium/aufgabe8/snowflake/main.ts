/// <reference path="Snowflake.ts"/>
/// <reference path="DrawableObject.ts"/>

namespace snowflake_a8 {
    window.addEventListener("load", init);

    // Variable für den Canvascontext die exportiert wird, so dass sie in allen
    // Dateien im selben Namespace verwendet werden
    export let context: CanvasRenderingContext2D;

    let background: ImageData;
    // Anzahl der Schneeflocken, die beim Click auf das Canvas erstellt werden
    let clickAmount: number = 20;

    // Array bestehend aus Snowflake Objekten
    // Für Erklärung Snowflake Objekt siehe Snowflake.ts
    let snowflakes: Snowflake[] = [];
    let stars: Star[] = [];

    // In der init Funktion sollen alle Schritte abgearbeitet werden, die nötig
    // sind um unser Bild vorzubereiten, aber nur einmal ausgeführt werden müssen:
    // Canvas und Context initialisieren ... die Schneeflocken erstellen ... und
    // sobald du recherchiert hast wie es geht, soll hier auch der (statische) Hintergrund einmal
    // gezeichnet und dann zwischengespeichert werden.
    function init(): void {
        let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];

        // Verschiebe den Canvas um 200px nach rechts
        // Damit haben wir den Unterschied zwischen clientX/Y und offsetX/Y im Event Objekt verdeutlicht
        canvas.style.marginLeft = "200px";
        context = canvas.getContext("2d");

        canvas.addEventListener("click", addSnowflakes);


        context.fillStyle = "#3f3f3f";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        // Zeichne zwanzig statische Schneeflocken/Sterne die einmal auf den Hintergrund gezeichnet
        // und von denen nur die ersten 10 gespeichert werden
        for (let i: number = 0; i < 20; i++) {
            let star: Star = new Star(Math.random() * canvas.width, Math.random() * canvas.height, "#bfcf00", Math.random() * (10 - 5) + 5);
            star.draw();

            if (i < 10)
                stars.push(star);
        }

        background = context.getImageData(0, 0, canvas.width, canvas.height);

        // Erstelle 20 Schneeflocken an zufälligen Positionen
        createSnowflakes(20);

        // Zeichne zwanzig weitere zielsuchende Schneeflocken
        for (let i: number = 0; i < 20; i++) {
            // Wähle aus allen Sternen zufällig einen aus ...
            let target: Star = stars[Math.round(Math.random() * (stars.length - 1))];

            // ... dessen Position an die neue zielsuchende Schneeflocke übergeben wird.
            // Aufgrund der Tatsache, dass TargetingSnowflake eine Subclasse von Snowflake ist
            // Können Objekte beider Klassen im selben Array untergebracht werden.
            snowflakes.push(new TargetingSnowflake(Math.random() * canvas.width, Math.random() * canvas.height, "#ffffff", target.position.x, target.position.y));
        }

        // Alle Vorbereitungen abgeschlossen, los gehts mit der Animation
        animate();
    }

    // Hier werden alle Aufgaben untergebracht die einmal pro Frame ausgeführt werden müssen ...
    function animate(): void {
        // ... das alte Bild muss übermalt werden, damit keine Schlieren entstehen ...
        drawBackground();

        // Alle Schneeflocken auf den neusten Stand bringen
        updateSnowflakes();

        // Wenn das alles erledigt ist, warten wir 20millisekunden und rufen die Funktion erneut auf
        setTimeout(animate, 20);
    }

    // Zeichne alle Schneeflocken
    function updateSnowflakes(): void {
        // Laufe durch das komplette Array der Schneeflocken...
        for (let i: number = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
        }
    }



    // Zeichne den Hintergrund
    function drawBackground(): void {
        context.putImageData(background, 0, 0);
    }

    // Erstelle eine definierte Anzahl von Schneeflocken mit zufälliger Position
    function createSnowflakes(_amount: number): void {
        for (let i: number = 0; i < _amount; i++) {
            let x: number = random(0, context.canvas.width);
            let y: number = random(0, context.canvas.height);

            createSnowflake(x, y, "#ffffff");
        }
    }

    // Erstelle eine definierte Anzahl von Schneeflockem um die Position an die geklickt wurde
    function addSnowflakes(_event: MouseEvent): void {
        for (let i: number = 0; i < clickAmount; i++) {
            let x: number = random(_event.offsetX - 100, _event.offsetX + 100);
            let y: number = random(_event.offsetY - 100, _event.offsetY + 100);

            createSnowflake(x, y, "#ffffff");
        }
    }

    // Erstelle eine Schneeflocke an einer definierten Position
    // Hier zeigt sich auch sehr schön wie sinnvoll die Kapselung von einzelnen Schritten in eigene
    // Funktionen sein kann: sowohl in "createSnowflakes" als auch "addSnowflakes" erstelle ich eine
    // Anzahl von Schneeflocken. In beiden Fällen bekommt die Schneeflocke jeweils eine Wert für x, y und color.
    // Unterschiedlich ist lediglich wie ich an die Werte von x und y komme. Den gemeinsamen Schritt "erstelle
    // eine Schneeflocke mit folgenden Werten" habe ich in die Funktion "createSnowflake" ausgelagert und rufe
    // diese Funktion in den beiden anderen Funktionen auf und übergebe die Werte, die die Funktion zum arbeiten
    // braucht. Vorteile sind: Weniger Code den man verändern muss, wenn sich z.B. die Art und Weise ändert wie
    // ein Schneeflocken Objekt erstellt wird. Weniger Code bei dem man Fehler machen kann, wenn man z.B. vergisst
    // eine Änderung an allen kopierten Stellen einzutragen.
    function createSnowflake(_x: number, _y: number, _color: string): void {
        let snowflake: Snowflake = new Snowflake(_x, _y, _color);

        snowflakes.push(snowflake);
    }

    // Gleicher Grund für diese Funktion: Wir brauchen immer wieder Zufallszahlen in bestimmten Bereichen.
    // Wenn ich jedes mal Code reinkopiere und dann abändere, werden sich unweigerlich Fehler einschleichen und
    // in größeren Projekten eine einzelne Fehlerquelle auszumachen ist nervenaufreibend. Deswegen: Einmal die
    // Funktion definiert, geprüft, dass sie tut was man verlangt und dann kann man sie immer wieder verwenden.
    function random(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }

    // Funktion die entweder 1 oder -1 zurückgibt je nach dem ob der Input positiv oder negativ ist
    // 0 wird als positiv angesehen
    // Anmerkung: Im Tut selbst habe ich euch die Math.sign() Funktion gezeigt. Da diese aber noch experimentell ist
    // erkennt der TypeScript Compiler sie nicht als validen Code an und wirft einen Fehler. Deswegen habe ich mir
    // diese Hilfsfunktion geschrieben
    export function signum(_value: number): number {
        return _value >= 0 ? 1 : -1;
    }
}
