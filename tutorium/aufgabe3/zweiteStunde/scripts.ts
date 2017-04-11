namespace tutorium_3a {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let dimension: number = 8; // Dimensionen unseres Schachbretts 8x8 = 64;
    let width: number = 50; // Breite eines einzelnen Felds
    let height: number = 50; // Höhe eines einzelnen Felds
    let state: boolean[] = []; // Soll die Information halten, ob ein Feld angeklickt wurde (true) oder nicht (false)

    window.onload = init; // Wenn die Seite komplett geladen ist führe die init Funktion aus

    function init(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        context = canvas.getContext("2d"); // 2d Kontext der die Zeichenbefehle beinhaltet

        createBoard(); // Methode die das Schachbrett zeichnet
        canvas.addEventListener("click", select); // Wenn auf das canvas geklickt wird, soll das Feld an der Stelle markiert werden
        document.addEventListener("mousemove", displaySum); // Wird die Maus bewegt, soll das Div mit der Summe folgen
    }

    function createBoard(): void {
        // Erste Schleife mit so vielen Durchläufen wie 'dimension' groß ist, die sich um die Zeilen kümmert
        for (let row: number = 0; row < dimension; row++) {
            // Zweite Schleife mit so vielen Durchläufen wie 'dimension' groß ist, die sich um die Spalten kümmert
            // dimension * dimension = Gesamtzahl der Felder (z.B. 8x8 = 64)
            for (let column: number = 0; column < dimension; column++) {
                context.beginPath(); // Beginne einen neuen Zeichenpfad auf dem Canvas
                // Wenn ein Feld 'width' breit ist sitzt das erste Feld bei x = 0 x width, das zweite bei 1 * width ...
                // Selbes Spiel bei der Höhe, wenn wir in eine neue Zeile rutschen:
                // Erstes Feld y = 0 * height, Neuntes Feld (erstes in zweiter Zeile) y = 1 * height
                // Verschiebung um +1 jeweils um die Umrandung am linken und oberen Rand sichtbar zu machen
                context.rect(1 + column * width, 1 + row * height, width, height);
                context.closePath(); // Pfad schließen
                context.stroke(); // Umrande den Pfad

                // Abwechselndes Schwarz / Weiß Muster
                if ((row + column) % 2 == 0) {
                    context.fillStyle = "#ffffff"; // Benutze zum Füllen die Farbe Weiß
                } else {
                    context.fillStyle = "#000000"; // " Schwarz
                }
                context.fill(); // Fülle den Pfad mit der Farbe


                state.push(false); // Speichere den Status des gerade erstellten Felds (false = nicht selektiert)
            }
        }
    }

    // Funktion die aufgerufen wird, wenn auf das Canvas geklickt wird
    function select(_event: MouseEvent): void {
        // offsetX/Y liefert uns die Koordinates an denen geklickt wurde in Relation zum Element das angeklickt wurde
        // Wie oft passt die Breite eines Feldes in die X Position an die geklickt wurde?
        // Abgerundet ergibt das die Spalte (von 0 beginnend) in die geklickt wurde
        let column: number = Math.floor(_event.offsetX / width);
        // Selbes Spiel mit Y Position und Höhe für die Reihe
        let row: number = Math.floor(_event.offsetY / height);

        // Zeichne ein neues Rechteck an dieselbe Stelle wie das Feld das gerade angeklickt wurde
        context.beginPath();
        context.rect(1 + column * width, 1 + row * height, width, height);
        context.closePath();
        context.stroke();

        // Die Reihe * dimension des Bretts + Spalte ergibt die exakte Position des Felds im Array
        // Ist der Wert true ist das Feld bereits selektiert, also färbe es wieder schwarz/weiß
        if (state[row * dimension + column]) {
            if ((row + column) % 2 == 0) {
                context.fillStyle = "#ffffff";
            } else {
                context.fillStyle = "#000000";
            }
            state[row * dimension + column] = false; // Und setze den Wert auf falsch = nicht markiert
        }
        // Ist es noch nicht selektiert färbe es rot
        else {
            context.fillStyle = "#ff0000";
            state[row * dimension + column] = true; // Und setze den Wert auf true = markiert
        }

        context.fill();
    }

    function displaySum(_event: MouseEvent): void {
        let box: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
        let sum: number = 0;
        for (let i: number = 0; i < state.length; i++) {
            if (state[i]) {
                sum += Math.pow(2, i);
            }
        }

        box.textContent = "Summe: " + sum;

        box.style.left = 10 + _event.clientX + "px";
        box.style.top = 10 + _event.clientY + "px";
    }
}















