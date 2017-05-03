/// <reference path="Snowflake.ts"/>
var snowflake;
(function (snowflake_1) {
    window.addEventListener("load", init);
    var context;
    // Fester Radius für alle Schneeflocken
    var radiusMin = 5;
    var radiusMax = 15;
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
        context = canvas.getContext("2d");
        canvas.addEventListener("click", addSnowflakes);
        // Erstelle 200 Schneeflocken an zufälligen Positionen
        createSnowflakes(200);
        // Alle Vorbereitungen abgeschlossen, los gehts mit der Animation
        animate();
    }
    // Hier werden alle Aufgaben untergebracht die einmal pro Frame ausgeführt werden müssen ...
    function animate() {
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
    function drawSnowflakes() {
        // Laufe durch das komplette Array der Schneeflocken...
        for (var i = 0; i < snowflakes.length; i++) {
            // ... und zeichne bei jedem Durchlauf die Schneeflocke, die du an der Stelle findest
            drawSnowflake(snowflakes[i].x, snowflakes[i].y, snowflakes[i].radius, snowflakes[i].rotation);
        }
    }
    // Zeichne eine einzelne Schneeflocke
    // Das wir die Funktionalität "Zeichne eine Schneeflocke" von "Zeichne alle Schneeflocken" abtrennen,
    // in dem wir eine eigene Funktion für "Zeichne eine Schneeflocke" einführen, die dann in "Zeichne
    // alle Schneeflocken" aufgerufen wird, ist deshalb sinnvoll, da wir jetzt auch zu jederzeit eine
    // einzelne Schneeflocke an einer bestimmten Stelle zeichnen können, ohne Code kopieren zu müssen.
    // Angewand auf die Aufgabe: Stell dir vor dein Bienenstock hat eine Wächterbiene, die immer am
    // Eingang sitzt, Wache schiebt und ihre Position nicht ändern muss.
    function drawSnowflake(_x, _y, _radius, _rotation) {
        context.strokeStyle = "#f2f2f2";
        // Verschiebe den Ursprung des Koordinaten Systems an den Mittelpunkt der Schneefloke
        context.translate(_x, _y);
        // Rotiere das Koordinatensystem um die aktuelle Rotation der Schneeflocke
        context.rotate(_rotation * Math.PI / 180);
        //Schiebe das Koordinatensystem wieder zurück an den Urspung
        context.translate(-_x, -_y);
        // Male ein Kreuz
        context.beginPath();
        context.moveTo(_x, _y - _radius);
        context.lineTo(_x, _y + _radius);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(_x - _radius, _y);
        context.lineTo(_x + _radius, _y);
        context.closePath();
        context.stroke();
        // Verschiebe wieder das Koordinatensystem
        context.translate(_x, _y);
        // Rotiere um 45 Grad
        context.rotate(45 * Math.PI / 180);
        // Verschiebe zurück
        context.translate(-_x, -_y);
        // Zeichne das zweite Kreuz (das 45° zum ersten rotiert ist)
        context.beginPath();
        context.moveTo(_x, _y - _radius);
        context.lineTo(_x, _y + _radius);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(_x - _radius, _y);
        context.lineTo(_x + _radius, _y);
        context.closePath();
        context.stroke();
        // Setzte eine neue Transformationsmatrix (bei Mathe aufpassen!), die alle Transformationen aufhebt
        context.setTransform(1, 0, 0, 1, 0, 0);
    }
    // Update die Position aller Schneeflocken
    function updateSnowflakes() {
        for (var i = 0; i < snowflakes.length; i++) {
            // Die Schneeflocken fallen von oben nach unten, also muss der Y-Wert steigen
            snowflakes[i].y++;
            // Die Position unserer Schneeflocke definiert gleichzeitig den Mittelpunkt unseres Kreises
            // der die Schneeflocke graphisch dastellt. Würden wir also nur testen ob (y > height), dann
            // würde die Schneeflocke am unteren Rand verschwinden, wenn sie noch halb im Bild ist ...
            if (snowflakes[i].y > context.canvas.height + radiusMin) {
                // ... und umgekehrt würde sie am oberen Bildrand mit einem Schlag halbgemalt auftauchen,
                // würden wir (y = 0) setzen. So werden die Schneeflocken erst nach oben verschoben, wenn
                // komplett aus dem Bild verschwunden sind und soweit nach oben versetzt, dass sie nach und
                // nach ins Bild rutschen.
                snowflakes[i].y = 0 - radiusMin;
            }
            snowflakes[i].rotation++;
            if (snowflakes[i].rotation >= 360) {
                snowflakes[i].rotation = 0;
            }
        }
    }
    // Zeichne den Hintergrund
    function drawBackground() {
        context.fillStyle = "#3f3f3f";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    }
    // Erstelle eine definierte Anzahl von Schneeflocken mit zufälliger Position
    function createSnowflakes(_amount) {
        for (var i = 0; i < _amount; i++) {
            var x_1 = random(0, context.canvas.width);
            var y_1 = random(0, context.canvas.height);
            createSnowflake(x_1, y_1);
        }
    }
    // Erstelle eine definierte Anzahl von Schneeflockem um die Position an die geklickt wurde
    function addSnowflakes(_event) {
        for (var i = 0; i < clickAmount; i++) {
            var x_2 = random(_event.offsetX - 100, _event.offsetX + 100);
            var y_2 = random(_event.offsetY - 100, _event.offsetY + 100);
            createSnowflake(x_2, y_2);
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
    function createSnowflake(_x, _y) {
        var snowflake = {
            x: _x,
            y: _y,
            radius: Math.round(Math.random() * (radiusMax - radiusMin) + radiusMin),
            rotation: 0
        };
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