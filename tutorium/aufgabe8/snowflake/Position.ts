
namespace snowflake_a8 {

    // Typ Definition für eine zweidimensionale Position
    // Ist einfach schöner und übersichtlicher z.B. ein Attribut position oder target in eine Klasse einzubauen
    // und dann auf dessen Attribute x und y zuzugreifen statt irgendwann positionX/Y, targetX/Y, offsetX/Y usw.
    // jeweils einzeln verwalten zu müssen
    export interface Position {
        x: number;
        y: number;
    }
}