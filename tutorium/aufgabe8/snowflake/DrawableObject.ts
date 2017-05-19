
namespace snowflake_a8 {
    export abstract class DrawableObject {
        position: Position;
        color: string;
        radius: number;

        constructor(_x: number, _y: number, _color: string, _radius: number) {
            this.position = {
                x: _x,
                y: _y
            };
            this.color = _color;
            this.radius = _radius;
        }

        // Anders als im Tutorium habe ich die draw Funktion meiner Ausgangsklasse gefüllt,
        // Da mir beim Nachdenken aufgefallen ist, dass ja sowohl der Stern als auch die Schneeflocke
        // die gleiche Grundform haben, man also problemlos diese Funktionalität in der Superklasse
        // unterbringen kann.
        draw(): void {
            this.drawShape();
            this.rotateShape(45 * Math.PI / 180);
            this.drawShape();
            this.clearTransformation();
        }

        // Malt ein Kreuz
        drawShape(): void {
            context.strokeStyle = this.color;
            context.beginPath();
            context.moveTo(this.position.x, this.position.y - this.radius);
            context.lineTo(this.position.x, this.position.y + this.radius);
            context.closePath();
            context.stroke();
            context.beginPath();
            context.moveTo(this.position.x - this.radius, this.position.y);
            context.lineTo(this.position.x + this.radius, this.position.y);
            context.closePath();
            context.stroke();
        }

        // Rotiert das Canvas um _degree Grad
        rotateShape(_degree: number): void {
            // Verschiebe das Koordinatensystem
            context.translate(this.position.x, this.position.y);
            // Rotiere um _degree Grad
            context.rotate(_degree);
            // Verschiebe zurück
            context.translate(-this.position.x, -this.position.y);
        }

        // Hebt sämtliche Transformationen auf und setzt das Canvas auf Ausgangszustand zurück
        clearTransformation(): void {
            // Setzte eine neue Transformationsmatrix (bei Mathe aufpassen!), die alle Transformationen aufhebt
            context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}
