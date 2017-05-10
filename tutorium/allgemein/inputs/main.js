var StudiVZ;
(function (StudiVZ) {
    var students = [];
    var stop = false;
    while (!stop) {
        var action = prompt("Datensatz anlegen (n), abfragen(a) oder Programm beenden (s)\nn,a oder s eingeben");
        switch (action) {
            case "n":
            case "N":
                var input = prompt("Eingabe (jeweils mit Komma getrennt) von\nMatrikelnummer, Name, Vorname, Alter, Geschlecht (0 = w oder 1 = m) und Kommentar");
                alert(saveData(input));
                break;
            case "a":
            case "A":
                var matrikel = parseInt(prompt("Eingabe Matrikelnummer"));
                alert(queryData(matrikel));
                break;
            case "s":
            case "S":
                stop = true;
        }
    }
    function saveData(_input) {
        var array = _input.split(","); // bei jedem Komma wir das array zerhackt
        var s = {
            matrikel: parseInt(array[0]),
            name: array[1],
            firstname: array[2],
            age: parseInt(array[3]),
            sex: parseInt(array[4]) == 1,
            comment: array[5]
        };
        students.push(s);
        var geschlecht;
        if (s.sex == true) {
            geschlecht = "m"; // wird 1 eingegeben, ist der Nutzer männlich
        }
        else {
            geschlecht = "w"; // wird 0 eingegeben ist der Nutzer weiblich
        }
        return "Daten gespeichert\nMatrikelnr: " + s.matrikel + "\nName: " + s.name + "\nVorname: " + s.firstname + "\nAlter: " + s.age + "\nGeschlecht: " + geschlecht + "\nKommentar: " + s.comment;
    }
    function queryData(_matrikel) {
        for (var i = 0; i < students.length; i++) {
            var sex = void 0;
            if (students[i].matrikel == _matrikel) {
                sex = (students[i].sex).toString(); // sex irgendwie in typ string umwandeln wie kann
                return "Welcome back " + students[i].firstname + "! : \nMatrikelnummer: " + students[i].matrikel + "\nName: " + students[i].name + "\nVorname: " + students[i].firstname + "\nAlter: " + students[i].age + "\nGeschlecht: " + students[i].sex + "\nKommentar: " + students[i].comment;
            } // end if
        } // end for
        return "Die eingegebene Matrikelnummer ist nicht vorhanden";
    } // end function
})(StudiVZ || (StudiVZ = {})); // end namespace
//# sourceMappingURL=main.js.map