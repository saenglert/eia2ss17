
namespace connectedInputs {

    window.addEventListener("load", init);

    function init(): void {
        document.getElementsByTagName("fieldset")[0].addEventListener("change", change);
    }

    function change(_event: Event): void {
        // Das (Input)Element das angeklickt wurde
        let target: HTMLInputElement = <HTMLInputElement>_event.target;

        // Ist das angeklickte Element eine Checkbox...
        if (target.type == "checkbox") {
            let input: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(target.className)[1];

            // ... und ist die Checkbox ausgewählt ...
            if (target.checked) {
                // ... schalte den anderen Input ein
                input.disabled = false;
            } else {
                // ... wenn nicht, schalte ihn ab
                input.disabled = true;
            }
        }
    }
}