let selected: HTMLDivElement;

window.onload = function (): void {
  let divs: NodeListOf<HTMLDivElement> = document.getElementsByTagName("div");
  for (let i: number = 0; i < divs.length; i++) {
      divs[i].addEventListener("click", select);
  }

  document.addEventListener("click", moveDiv);

  for (let i: number = 0; i < 64; i++) {
      console.log(Math.pow(2, i).toString(16));
  }
};

function select(event: MouseEvent): void {
    selected = <HTMLDivElement>event.target;
}

function moveDiv(event: MouseEvent): void {
    let style: CSSStyleDeclaration = selected.style;
    style.position = "absolute";
    style.left = event.clientX.toString() + "px";
    style.top = event.clientY.toString() + "px";
}