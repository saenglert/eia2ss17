/// <reference path="main.ts" />

namespace snowflake_a8 {
    // Im Gegensatz zu einem Interface beschreibt eine Klasse nicht nur welche Informationen vorhanden sind,
    // sondern definieren auch über die Methoden und Konstruktoren, wie man zu dieser Info kommt.
    export class Snowflake extends DrawableObject {
        rotation: number;

        // Ein Konstruktor wird aufgerufen, wenn die Klasse mit dem new Schlüsselwort angesprochen wird.
        // Wie eine Funktion kann er Parameter entgegennehmen und verarbeiten. Sinnvolle Parameter sind z.B.
        // Informationen die sofort nach erstellen des Objekts verfügbar sein müssen: Position, Farbe etc.
        constructor(_x: number, _y: number, _color: string) {
            super(_x, _y, _color, Math.random() * (15 - 5) + 5);
            this.rotation = Math.random() * 360;

        }

        // Zeichenfunktion der einzelnen Schneeflocke
        draw(): void {
            this.rotateShape(this.rotation * Math.PI / 180);
            this.drawShape();
            this.rotateShape(45 * Math.PI / 180);
            this.drawShape();
            this.clearTransformation();
        }

        // Funktion die die einzelne Schneeflocke bewegt
        move(): void {
            this.position.y++;
            if (this.position.y - this.radius >= context.canvas.height) {
                this.position.y = this.radius;
            }

            this.rotation++;
            if (this.rotation >= 360) {
                this.rotation = 0;
            }
        }

        update(): void {
            this.move();
            this.draw();
        }

    }
}