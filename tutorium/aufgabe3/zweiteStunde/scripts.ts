namespace tutorium_3a {

    let canvas: HTMLCanvasElement;
    let context: CanvasRenderingContext2D;
    let dimension: number = 8;
    let width: number = 50;
    let height: number = 50;
    let state: boolean[] = [];
    window.onload = init;

    function init(): void {
        canvas = <HTMLCanvasElement>document.getElementById("canvas");
        context = canvas.getContext("2d");

        createBoard();
        canvas.addEventListener("click", select);
        document.addEventListener("mousemove", displaySum);
    }

    function createBoard(): void {
        for (let row: number = 0; row < dimension; row++) {
            for (let column: number = 0; column < dimension; column++) {
                context.beginPath();
                context.rect(1 + column * width, 1 + row * height, width, height);
                context.closePath();
                context.stroke();

                if ((row + column) % 2 == 0) {
                    context.fillStyle = "#ffffff";
                } else {
                    context.fillStyle = "#000000";
                }
                context.fill();
                state.push(false);

            }
        }
    }

    function select(_event: MouseEvent): void {
        console.log(_event.offsetX, _event.offsetY);
        let row: number = Math.floor(_event.offsetY / height);
        let column: number = Math.floor(_event.offsetX / width);

        context.beginPath();
        context.rect(1 + column * width, 1 + row * height, width, height);
        context.closePath();
        context.stroke();

        if (state[row * dimension + column]) {
            if ((row + column) % 2 == 0) {
                context.fillStyle = "#ffffff";
            } else {
                context.fillStyle = "#000000";
            }
            state[row * dimension + column] = false;
        } else {
            context.fillStyle = "#ff0000";
            state[row * dimension + column] = true;
        }

        context.fill();
    }

    function displaySum(_event: MouseEvent): void {
        let box: HTMLDivElement = <HTMLDivElement>document.getElementById("display");
        let sum: number = 0;
        for (let i: number = 0; i < state.length; i++) {
            if (state[i]) {
                sum += Math.pow(2, i);
            }
        }

        box.textContent = "Summe: " + sum;

        box.style.left = 10 + _event.clientX + "px";
        box.style.top = 10 + _event.clientY + "px";
    }
}















