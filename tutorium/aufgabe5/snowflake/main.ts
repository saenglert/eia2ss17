/// <reference path="Snowflake.ts"/>

namespace transformations {
    window.addEventListener("load", init);

    let context: CanvasRenderingContext2D;

    // Fester Radius für alle Schneeflocken
    let radius: number = 10;
    // Anzahl der Schneeflocken, die beim Click auf das Canvas erstellt werden
    let clickAmount: number = 20;

    // Array bestehend aus Snowflake Objekten
    // Für Erklärung Snowflake Objekt siehe Snowflake.ts
    let snowflakes: Snowflake[] = [];

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

        // Erstelle 200 Schneeflocken an zufälligen Positionen
        createSnowflakes(200);

        // Alle Vorbereitungen abgeschlossen, los gehts mit der Animation
        animate();
    }

    // Hier werden alle Aufgaben untergebracht die einmal pro Frame ausgeführt werden müssen ...
    function animate(): void {
        // ... das alte Bild muss übermalt werden, damit keine Schlieren entstehen ...
        drawBackground();

        // ... die Schneeflocken müssen den Hintergrund gemalt werden ...
        drawSnowflakes();

        // ... und damit der Bewegungseffekt ensteht müssen die Schneeflocken
        // natürlich  ein Stückchen verschoben werden.
        updateSnowflakes();

        // Wenn das alles erledigt ist, warten wir 20millisekunden und rufen die Funktion erneut auf
        setTimeout(animate, 20);
    }

    // Zeichne alle Schneeflocken
    function drawSnowflakes(): void {
        // Laufe durch das komplette Array der Schneeflocken...
        for (let i: number = 0; i < snowflakes.length; i++) {
            // ... und zeichne bei jedem Durchlauf die Schneeflocke, die du an der Stelle findest
            drawSnowflake(snowflakes[i].x, snowflakes[i].y);
        }
    }

    // Zeichne eine einzelne Schneeflocke
    // Das wir die Funktionalität "Zeichne eine Schneeflocke" von "Zeichne alle Schneeflocken" abtrennen,
    // in dem wir eine eigene Funktion für "Zeichne eine Schneeflocke" einführen, die dann in "Zeichne
    // alle Schneeflocken" aufgerufen wird, ist deshalb sinnvoll, da wir jetzt auch zu jederzeit eine
    // einzelne Schneeflocke an einer bestimmten Stelle zeichnen können, ohne Code kopieren zu müssen.
    // Angewand auf die Aufgabe: Stell dir vor dein Bienenstock hat eine Wächterbiene, die immer am
    // Eingang sitzt, Wache schiebt und ihre Position nicht ändern muss.
    function drawSnowflake(_x: number, _y: number): void {
        context.beginPath();
        context.arc(_x, _y, 10, 0, 2 * Math.PI);
        context.closePath();
        context.fillStyle = "#ffffff";
        context.fill();
        context.stroke();
    }

    // Update die Position aller Schneeflocken
    function updateSnowflakes(): void {
        for (let i: number = 0; i < snowflakes.length; i++) {
            // Die Schneeflocken fallen von oben nach unten, also muss der Y-Wert steigen
            snowflakes[i].y++;

            // Die Position unserer Schneeflocke definiert gleichzeitig den Mittelpunkt unseres Kreises
            // der die Schneeflocke graphisch dastellt. Würden wir also nur testen ob (y > height), dann
            // würde die Schneeflocke am unteren Rand verschwinden, wenn sie noch halb im Bild ist ...
            if (snowflakes[i].y > context.canvas.height + radius) {
                // ... und umgekehrt würde sie am oberen Bildrand mit einem Schlag halbgemalt auftauchen,
                // würden wir (y = 0) setzen. So werden die Schneeflocken erst nach oben verschoben, wenn
                // komplett aus dem Bild verschwunden sind und soweit nach oben versetzt, dass sie nach und
                // nach ins Bild rutschen.
                snowflakes[i].y = 0 - radius;
            }
        }
    }

    // Zeichne den Hintergrund
    function drawBackground(): void {
        context.fillStyle = "#3f3f3f";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }

    // Erstelle eine definierte Anzahl von Schneeflocken mit zufälliger Position
    function createSnowflakes(_amount: number): void {
        for (let i: number = 0; i < _amount; i++) {
            let x: number = random(0, context.canvas.width);
            let y: number = random(0, context.canvas.height);

            createSnowflake(x, y);
        }
    }

    // Erstelle eine definierte Anzahl von Schneeflockem um die Position an die geklickt wurde
    function addSnowflakes(_event: MouseEvent): void {
        for (let i: number = 0; i < clickAmount; i++) {
            let x: number = random(_event.offsetX - 100, _event.offsetX + 100);
            let y: number = random(_event.offsetY - 100, _event.offsetY + 100);

            createSnowflake(x, y);
        }
    }

    // Erstelle eine Schneeflocke an einer definierten Position
    // Hier zeigt sich auch sehr schön wie sinnvoll die Kapselung von einzelnen Schritten in eigene
    // Funktionen sein kann: sowohl in "createSnowflakes" als auch "addSnowflakes" erstelle ich eine
    // Anzahl von Schneeflocken. In beiden Fällen bekommt die Schneeflocke jeweils eine Wert für x, y und radius.
    // Unterschiedlich ist lediglich wie ich an die Werte von x und y komme. Den gemeinsamen Schritt "erstelle
    // eine Schneeflocke mit folgenden Werten" habe ich in die Funktion "createSnowflake" ausgelagert und rufe
    // diese Funktion in den beiden anderen Funktionen auf und übergebe die Werte, die die Funktion zum arbeiten
    // braucht. Vorteile sind: Weniger Code den man verändern muss, wenn sich z.B. die Art und Weise ändert wie
    // ein Schneeflocken Objekt erstellt wird. Weniger Code bei dem man Fehler machen kann, wenn man z.B. vergisst
    // eine Änderung an allen kopierten Stellen einzutragen.
    function createSnowflake(_x: number, _y: number): void {
        let snowflake: Snowflake = {
            x: _x,
            y: _y,
            radius: radius
        };

        snowflakes.push(snowflake);
    }

    // Gleicher Grund für diese Funktion: Wir brauchen immer wieder Zufallszahlen in bestimmten Bereichen.
    // Wenn ich jedes mal Code reinkopiere und dann abändere, werden sich unweigerlich Fehler einschleichen und
    // in größeren Projekten eine einzelne Fehlerquelle auszumachen ist nervenaufreibend. Deswegen: Einmal die
    // Funktion definiert, geprüft, dass sie tut was man verlangt und dann kann man sie immer wieder verwenden.
    function random(_min: number, _max: number): number {
        return Math.random() * (_max - _min) + _min;
    }
}
