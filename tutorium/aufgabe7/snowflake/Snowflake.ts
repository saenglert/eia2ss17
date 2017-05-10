/// <reference path="main.ts" />

namespace snowflake {
    // Im Gegensatz zu einem Interface beschreibt eine Klasse nicht nur welche Informationen vorhanden sind,
    // sondern definieren auch über die Methoden und Konstruktoren, wie man zu dieser Info kommt.
    export class Snowflake {
        x: number;
        y: number;
        radius: number;
        rotation: number;
        evil: boolean;
        color: string;

        // Ein Konstruktor wird aufgerufen, wenn die Klasse mit dem new Schlüsselwort angesprochen wird.
        // Wie eine Funktion kann er Parameter entgegennehmen und verarbeiten. Sinnvolle Parameter sind z.B.
        // Informationen die sofort nach erstellen des Objekts verfügbar sein müssen: Position, Farbe etc.
        constructor(_x: number, _y: number, _color: string) {
            this.x = _x;
            this.y = _y;
            this.radius = Math.random() * (15 - 5) + 5;
            this.rotation = Math.random() * 360;
            this.evil = Math.round(Math.random()) == 1;
            this.color = _color;
        }

        // Zeichenfunktion der einzelnen Schneeflocke
        draw(): void {
            context.strokeStyle = this.color;

            // Verschiebe den Ursprung des Koordinaten Systems an den Mittelpunkt der Schneefloke
            context.translate(this.x, this.y);
            // Rotiere das Koordinatensystem um die aktuelle Rotation der Schneeflocke
            context.rotate(this.rotation * Math.PI / 180);
            //Schiebe das Koordinatensystem wieder zurück an den Urspung
            context.translate(-this.x, -this.y);

            // Male ein Kreuz
            context.beginPath();
            context.moveTo(this.x, this.y - this.radius);
            context.lineTo(this.x, this.y + this.radius);
            context.closePath();
            context.stroke();
            context.beginPath();
            context.moveTo(this.x - this.radius, this.y);
            context.lineTo(this.x + this.radius, this.y);
            context.closePath();
            context.stroke();

            // Verschiebe wieder das Koordinatensystem
            context.translate(this.x, this.y);
            // Rotiere um 45 Grad
            context.rotate(45 * Math.PI / 180);
            // Verschiebe zurück
            context.translate(-this.x, -this.y);

            // Zeichne das zweite Kreuz (das 45° zum ersten rotiert ist)
            context.beginPath();
            context.moveTo(this.x, this.y - this.radius);
            context.lineTo(this.x, this.y + this.radius);
            context.closePath();
            context.stroke();
            context.beginPath();
            context.moveTo(this.x - this.radius, this.y);
            context.lineTo(this.x + this.radius, this.y);
            context.closePath();
            context.stroke();

            // Setzte eine neue Transformationsmatrix (bei Mathe aufpassen!), die alle Transformationen aufhebt
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
        
        // Funktion die die einzelne Schneeflocke bewegt
        move(): void {
            if (this.evil) {
                this.y--;
                if (this.y + this.radius <= 0) {
                    this.y = context.canvas.height + this.radius;
                } // end if
            } else {
               this.y++;
               if (this.y - this.radius >= context.canvas.height) {
                   this.y = this.radius;
               } // end if
            } // end else

            this.rotation++;
            if (this.rotation >= 360) {
                this.rotation = 0;
            }                      // end if
        } // end method

        update(): void {
            this.move();
            this.draw();
        }

    }
}