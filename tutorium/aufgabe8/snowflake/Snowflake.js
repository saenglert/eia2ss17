/// <reference path="main.ts" />
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var snowflake_a8;
(function (snowflake_a8) {
    // Im Gegensatz zu einem Interface beschreibt eine Klasse nicht nur welche Informationen vorhanden sind,
    // sondern definieren auch über die Methoden und Konstruktoren, wie man zu dieser Info kommt.
    var Snowflake = (function (_super) {
        __extends(Snowflake, _super);
        // Ein Konstruktor wird aufgerufen, wenn die Klasse mit dem new Schlüsselwort angesprochen wird.
        // Wie eine Funktion kann er Parameter entgegennehmen und verarbeiten. Sinnvolle Parameter sind z.B.
        // Informationen die sofort nach erstellen des Objekts verfügbar sein müssen: Position, Farbe etc.
        function Snowflake(_x, _y, _color) {
            var _this = _super.call(this, _x, _y, _color, Math.random() * (15 - 5) + 5) || this;
            _this.rotation = Math.random() * 360;
            return _this;
        }
        // Zeichenfunktion der einzelnen Schneeflocke
        Snowflake.prototype.draw = function () {
            this.rotateShape(this.rotation * Math.PI / 180);
            this.drawShape();
            this.rotateShape(45 * Math.PI / 180);
            this.drawShape();
            this.clearTransformation();
        };
        // Funktion die die einzelne Schneeflocke bewegt
        Snowflake.prototype.move = function () {
            this.position.y++;
            if (this.position.y - this.radius >= snowflake_a8.context.canvas.height) {
                this.position.y = this.radius;
            }
            this.rotation++;
            if (this.rotation >= 360) {
                this.rotation = 0;
            }
        };
        Snowflake.prototype.update = function () {
            this.move();
            this.draw();
        };
        return Snowflake;
    }(snowflake_a8.DrawableObject));
    snowflake_a8.Snowflake = Snowflake;
})(snowflake_a8 || (snowflake_a8 = {}));
//# sourceMappingURL=Snowflake.js.map