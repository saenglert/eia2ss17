/// <reference path="DrawableObject.ts"/>

namespace snowflake_a8 {
    export class Star extends DrawableObject {

        // Na, hups! Hier ist ja garnichts mehr?! So kann es ausgehen, wenn man noch
        // darüber nachdenkt was man wo braucht und feststellt, dass man eine überflüssige
        // Klasse eingebaut hat. So hat es sich nämlich in diesem Beispiel ergeben, dass
        // die suchende Schneeflocke eine spezielle Schneeflocke ist und die Schneeflocke
        // wiederum ein spezieller Stern. Eigentlich würde man die Klasse Star an dieser
        // Stelle aus dem Programm schmeißen, aber ich habe sie zu Demonstrationszwecken
        // hier gelassen
        constructor(_x: number, _y: number, _color: string, radius: number) {
            super(_x, _y, _color, radius);
        }
    }
}