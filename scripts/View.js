"Use strict"
//import EuclidCalc from "EuclidCalc.js";

class View {
  constructor(){
    this.input = document.querySelector('.input-wrapper');
    this.viewSwitch = document.querySelector('.view-switch');
    this.inputX = document.querySelector('.x-input');
    this.inputY = document.querySelector('.y-input');
    this.viewSwitch.addEventListener("click", this.inputEventListener.bind(this));
    this.input.addEventListener("input", this.inputEventListener.bind(this));
  }
  static convertToTableRow(rowLabel, arr) {
    return `<tr><th>${rowLabel}</th>` +
            arr.reduce( (stringSoFar, n) => stringSoFar + `<td>${n}</td>`, "") +
            "</tr>";
  }
  static isInt(string) {
    return /[1-9][0-9]*/.test(string);
  }
  inputEventListener(event){
    if(View.isInt(this.inputX.value) && View.isInt(this.inputY.value)){
      let x = Number.parseInt(this.inputX.value);
      let y = Number.parseInt(this.inputY.value);
      if(this.viewSwitch.checked){
        let tableData = EuclidCalc.calcVertical(x, y);
        View.generateVerticalHTMLTable(tableData);
      } else {
        let tableData = EuclidCalc.calcHorizontal(x, y);
        View.generateHorizontalHTMLTable(tableData);
      }
    }
    console.log(this.inputX.value);
    console.log(this.inputY.value);
  }
  static generateHorizontalHTMLTable(tableData) {
    let indexRow = "<tr><th>i</th>";
    for(let i = - 1; i < tableData.r.length - 1; i++){
      indexRow += `<th>${i}</th>`;
    }
    indexRow += "</tr>"

    let table = `
      <table>
        ${ indexRow }
        ${ this.convertToTableRow("a<sub>i</sub>", tableData.a) }
        ${ this.convertToTableRow("b<sub>i</sub>", tableData.b) }
        ${ this.convertToTableRow("q<sub>i</sub>", tableData.q) }
        ${ this.convertToTableRow("r<sub>i</sub>", tableData.r) }
      </table>
    `;

    document.querySelector('.euclid-table-wrapper').innerHTML = table;
  }
  static verticalTableRow(tableData, index){
    let retArr = Object.keys(tableData).map(k => tableData[k][index]);
    return "<tr>" + retArr.reduce( (stringSoFar, n) => stringSoFar + `<td>${n}</td>`, "") + "</tr>";
  }
  static verticalHeaderRow(){
    let labelRow = ["a", "b", "q", "s", "t"];
    return "<tr>" + labelRow.reduce( (stringSoFar, n) => stringSoFar + `<th>${n}<sub>i</sub></th>`, "") + "</tr>";
  }
  static generateVerticalHTMLTable(tableData){
    let headerRow = View.verticalHeaderRow();
    let table = `<table> ${headerRow}`;
    for (let i = 0; i < tableData.a.length; i++) {
      table += View.verticalTableRow(tableData, i);
    }
    table += "</table>";
    document.querySelector('.euclid-table-wrapper').innerHTML = table;
  }
}

new View();
