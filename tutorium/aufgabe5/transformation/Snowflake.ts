namespace transformations {
    // Ein Interface ist grob gesagt eine abstrake Bauanleitung für ein Objekt.
    // Es beschreibt welche Attribute ein Objekt haben muss, damit es sich mit
    // dem Namen des Interfaces schmücken darf.
    //
    // Ein einfaches (leeres) Objekt erstellt man mit {}:
    //
    // let foo: Object = {}
    //
    // Damit sich das Objekt Snowflake nennen darf, muss es aber wie man im Interface
    // lesen kann ein Attribute x, y und radius haben:
    //
    // let bar: Snowflake = {
    //     x: 14,
    //     y: 19,
    //     radius: 25
    // }
    //
    // Die Datentypen der Attribute müssen natürlich mit denen die im Interface
    // definiert sind übereinstimmen.

    // Jetzt haben wir praktisch unseren eigenen Datentyp namens Snowflake definiert
    // und der Compiler wird jedesmal bevor er euer Programm verarbeitet überprüfen,
    // ob das Objekt das ihr ihm da vorsetzt auch wirklich vom Datentyp Snowflake
    // ist und die erforderlichen Attribute hat.
    //
    // Da wir jetzt drei Informationsstücke (x, y, radius) in einem Objekt
    // zusammengefasst haben, brauchen wir nicht mehr jeweils ein Array um diese
    // zu speichern, sondern legiglich ein einzelnes Array das Objekte vom Typ
    // Snowflake speichert
    export interface Snowflake {
        x: number;
        y: number;
        radius: number;
    }
}