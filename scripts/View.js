"Use strict"
//import EuclidCalc from "EuclidCalc.js";

class View {
  constructor(){
    this.inputX = document.querySelector('.x-input');
    this.inputY = document.querySelector('.y-input');
    this.inputX.addEventListener("input", this.inputEventListener.bind(this));
    this.inputY.addEventListener("input", this.inputEventListener.bind(this));
  }
  static convertToTableRow(rowLabel, arr) {
    return `<tr><th>${rowLabel}</th>` +
            arr.reduce( (stringSoFar, n) => stringSoFar + `<td>${n}</td>`, "") +
            "</tr>";
  }
  static isInt(string){
    return /[1-9][0-9]*/.test(string);
  }
  inputEventListener(event){
    if(this.isInt(this.inputX) && this.isInt(this.inputY)){
      this.generateHTMLTable(Number.parseInt(this.inputX), Number.parseInt(this.inputY));
    }
    console.log(this.inputX.value);
    console.log(this.inputY.value);
  }
  static generateHTMLTable(x, y) {
    let tableData = EuclidCalc.calcHorizontal(x, y);

    let indexRow = "<tr><th>i</th>";
    for(let i = - 1; i < tableData.r.length - 1; i++){
      indexRow += `<th>${i}</th>`;
    }
    indexRow += "</tr>"

    let table = `
      <table>
        ${ indexRow }
        ${ this.convertToTableRow("ai", tableData.a) }
        ${ this.convertToTableRow("bi", tableData.b) }
        ${ this.convertToTableRow("qi", tableData.q) }
        ${ this.convertToTableRow("ri", tableData.r) }
      </table>
    `;

    document.querySelector('.euclid-table-wrapper').innerHTML = table;

  }
}
