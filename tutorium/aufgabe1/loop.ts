
for (let i: number = 0; i < 5; i++ ) {
    console.log("Äußere Schleife " + i);

    switch (i) {
        case 1:
            continue;
    }

    for (let j: number = 0; j < 5; j++) {
        console.log("    Innere Schleife " + j);
    }
}