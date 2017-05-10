/// <reference path="main.ts" />
var snowflake;
(function (snowflake) {
    // Im Gegensatz zu einem Interface beschreibt eine Klasse nicht nur welche Informationen vorhanden sind,
    // sondern definieren auch über die Methoden und Konstruktoren, wie man zu dieser Info kommt.
    var Snowflake = (function () {
        // Ein Konstruktor wird aufgerufen, wenn die Klasse mit dem new Schlüsselwort angesprochen wird.
        // Wie eine Funktion kann er Parameter entgegennehmen und verarbeiten. Sinnvolle Parameter sind z.B.
        // Informationen die sofort nach erstellen des Objekts verfügbar sein müssen: Position, Farbe etc.
        function Snowflake(_x, _y, _color) {
            this.x = _x;
            this.y = _y;
            this.radius = Math.random() * (15 - 5) + 5;
            this.rotation = Math.random() * 360;
            this.evil = Math.round(Math.random()) == 1;
            this.color = _color;
        }
        // Zeichenfunktion der einzelnen Schneeflocke
        Snowflake.prototype.draw = function () {
            snowflake.context.strokeStyle = this.color;
            // Verschiebe den Ursprung des Koordinaten Systems an den Mittelpunkt der Schneefloke
            snowflake.context.translate(this.x, this.y);
            // Rotiere das Koordinatensystem um die aktuelle Rotation der Schneeflocke
            snowflake.context.rotate(this.rotation * Math.PI / 180);
            //Schiebe das Koordinatensystem wieder zurück an den Urspung
            snowflake.context.translate(-this.x, -this.y);
            // Male ein Kreuz
            snowflake.context.beginPath();
            snowflake.context.moveTo(this.x, this.y - this.radius);
            snowflake.context.lineTo(this.x, this.y + this.radius);
            snowflake.context.closePath();
            snowflake.context.stroke();
            snowflake.context.beginPath();
            snowflake.context.moveTo(this.x - this.radius, this.y);
            snowflake.context.lineTo(this.x + this.radius, this.y);
            snowflake.context.closePath();
            snowflake.context.stroke();
            // Verschiebe wieder das Koordinatensystem
            snowflake.context.translate(this.x, this.y);
            // Rotiere um 45 Grad
            snowflake.context.rotate(45 * Math.PI / 180);
            // Verschiebe zurück
            snowflake.context.translate(-this.x, -this.y);
            // Zeichne das zweite Kreuz (das 45° zum ersten rotiert ist)
            snowflake.context.beginPath();
            snowflake.context.moveTo(this.x, this.y - this.radius);
            snowflake.context.lineTo(this.x, this.y + this.radius);
            snowflake.context.closePath();
            snowflake.context.stroke();
            snowflake.context.beginPath();
            snowflake.context.moveTo(this.x - this.radius, this.y);
            snowflake.context.lineTo(this.x + this.radius, this.y);
            snowflake.context.closePath();
            snowflake.context.stroke();
            // Setzte eine neue Transformationsmatrix (bei Mathe aufpassen!), die alle Transformationen aufhebt
            snowflake.context.setTransform(1, 0, 0, 1, 0, 0);
        };
        // Funktion die die einzelne Schneeflocke bewegt
        Snowflake.prototype.move = function () {
            if (this.evil) {
                this.y--;
                if (this.y + this.radius <= 0) {
                    this.y = snowflake.context.canvas.height + this.radius;
                } // end if
            }
            else {
                this.y++;
                if (this.y - this.radius >= snowflake.context.canvas.height) {
                    this.y = this.radius;
                } // end if
            } // end else
            this.rotation++;
            if (this.rotation >= 360) {
                this.rotation = 0;
            } // end if
        }; // end method
        Snowflake.prototype.update = function () {
            this.move();
            this.draw();
        };
        return Snowflake;
    }());
    snowflake.Snowflake = Snowflake;
})(snowflake || (snowflake = {}));
//# sourceMappingURL=Snowflake.js.map