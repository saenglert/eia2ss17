namespace StudiVZ {
    interface StudentData {
        matrikel: number;
        name: string;
        firstname: string;
        age: number;
        sex: boolean;
        comment: string;
    }

    let students: StudentData[] = [];
    let stop: boolean = true;

    while (!stop) {
        let action: string = prompt("Datensatz anlegen (n), abfragen(a) oder Programm beenden (s)\nn,a oder s eingeben");

        switch (action) {
            case "n":
            case "N":
                let input: string = prompt("Eingabe (jeweils mit Komma getrennt) von\nMatrikelnummer, Name, Vorname, Alter, Geschlecht (0 oder 1) und Kommentar");
                alert(saveData(input));
                break;
            case "a":
            case "A":
                let matrikel: number = parseInt(prompt("Eingabe Matrikelnummer"));
                console.log(matrikel);
                alert(queryData(matrikel));
                break;
            case "s":
            case "S":
                stop = true;
        }
    }

    function saveData(_input: string): string {
        return "Hier fehlt noch der richtige Code...";
    }
    function queryData(_matrikel: number): string {
        return "Hier fehlt noch der richtige Code...";
    }
}