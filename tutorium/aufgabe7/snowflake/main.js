/// <reference path="Snowflake.ts"/>
var snowflake;
(function (snowflake_1) {
    window.addEventListener("load", init);
    var background;
    // Anzahl der Schneeflocken, die beim Click auf das Canvas erstellt werden
    var clickAmount = 20;
    // Array bestehend aus Snowflake Objekten
    // Für Erklärung Snowflake Objekt siehe Snowflake.ts
    var snowflakes = [];
    // In der init Funktion sollen alle Schritte abgearbeitet werden, die nötig
    // sind um unser Bild vorzubereiten, aber nur einmal ausgeführt werden müssen:
    // Canvas und Context initialisieren ... die Schneeflocken erstellen ... und
    // sobald du recherchiert hast wie es geht, soll hier auch der (statische) Hintergrund einmal
    // gezeichnet und dann zwischengespeichert werden.
    function init() {
        var canvas = document.getElementsByTagName("canvas")[0];
        // Verschiebe den Canvas um 200px nach rechts
        // Damit haben wir den Unterschied zwischen clientX/Y und offsetX/Y im Event Objekt verdeutlicht
        canvas.style.marginLeft = "200px";
        snowflake_1.context = canvas.getContext("2d");
        canvas.addEventListener("click", addSnowflakes);
        snowflake_1.context.fillStyle = "#3f3f3f";
        snowflake_1.context.fillRect(0, 0, snowflake_1.context.canvas.width, snowflake_1.context.canvas.height);
        // Zeichne zwanzig statische Schneeflocken/Sterne die einmal auf den Hintergrund gezeichnet
        // und nicht gespeichert werden
        for (var i = 0; i < 20; i++) {
            new snowflake_1.Snowflake(Math.random() * canvas.width, Math.random() * canvas.height, "#bfcf00").draw();
        }
        background = snowflake_1.context.getImageData(0, 0, canvas.width, canvas.height);
        // Erstelle 200 Schneeflocken an zufälligen Positionen
        createSnowflakes(200);
        // Alle Vorbereitungen abgeschlossen, los gehts mit der Animation
        animate();
    }
    // Hier werden alle Aufgaben untergebracht die einmal pro Frame ausgeführt werden müssen ...
    function animate() {
        // ... das alte Bild muss übermalt werden, damit keine Schlieren entstehen ...
        drawBackground();
        updateSnowflakes();
        // Wenn das alles erledigt ist, warten wir 20millisekunden und rufen die Funktion erneut auf
        setTimeout(animate, 20);
    }
    // Zeichne alle Schneeflocken
    function updateSnowflakes() {
        // Laufe durch das komplette Array der Schneeflocken...
        for (var i = 0; i < snowflakes.length; i++) {
            snowflakes[i].update();
        }
    }
    // Zeichne den Hintergrund
    function drawBackground() {
        snowflake_1.context.putImageData(background, 0, 0);
    }
    // Erstelle eine definierte Anzahl von Schneeflocken mit zufälliger Position
    function createSnowflakes(_amount) {
        for (var i = 0; i < _amount; i++) {
            var x_1 = random(0, snowflake_1.context.canvas.width);
            var y_1 = random(0, snowflake_1.context.canvas.height);
            createSnowflake(x_1, y_1, "#ffffff");
        }
    }
    // Erstelle eine definierte Anzahl von Schneeflockem um die Position an die geklickt wurde
    function addSnowflakes(_event) {
        for (var i = 0; i < clickAmount; i++) {
            var x_2 = random(_event.offsetX - 100, _event.offsetX + 100);
            var y_2 = random(_event.offsetY - 100, _event.offsetY + 100);
            createSnowflake(x_2, y_2, "#ffffff");
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
    function createSnowflake(_x, _y, _color) {
        var snowflake = new snowflake_1.Snowflake(_x, _y, _color);
        snowflakes.push(snowflake);
    }
    // Gleicher Grund für diese Funktion: Wir brauchen immer wieder Zufallszahlen in bestimmten Bereichen.
    // Wenn ich jedes mal Code reinkopiere und dann abändere, werden sich unweigerlich Fehler einschleichen und
    // in größeren Projekten eine einzelne Fehlerquelle auszumachen ist nervenaufreibend. Deswegen: Einmal die
    // Funktion definiert, geprüft, dass sie tut was man verlangt und dann kann man sie immer wieder verwenden.
    function random(_min, _max) {
        return Math.random() * (_max - _min) + _min;
    }
})(snowflake || (snowflake = {}));
//# sourceMappingURL=main.js.map