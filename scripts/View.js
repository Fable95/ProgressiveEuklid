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
    let tableRow = document.createElement('tr');
    let tableHeader = document.createElement('th');
    tableHeader.innerHTML = rowLabel;
    tableRow.appendChild(tableHeader);
    let tableCells = [];
    
    for (let i = 0; i < arr.length; i++) {
      let tableData = document.createElement('td');
      tableData.innerHTML = arr[i];
      tableCells.push(tableData);
      tableRow.appendChild(tableData);
    }

    return [tableRow, tableCells];
  }

  static isInt(string) {
    return /[1-9][0-9]*/.test(string);
  }

  inputEventListener(event){
    if(View.isInt(this.inputX.value) && View.isInt(this.inputY.value)){
      let tableData = EuclidCalc.calcHorizontal(Number.parseInt(this.inputX.value), Number.parseInt(this.inputY.value));
      View.generateHTMLTable(tableData);
      View.updateExampleFormulas(tableData);
    }
    //console.log(this.inputX.value);
    //console.log(this.inputY.value);
  }

  static generateHTMLTable(tableData) {
    
    let table = document.createElement('table');
    let indexRow = document.createElement('tr');
    let indexLabel = document.createElement('th');
    indexLabel.innerHTML = 'i';
    indexRow.appendChild(indexLabel);

    for(let i = - 1; i < tableData.r.length - 1; i++){
      let indexEl = document.createElement('td');
      indexEl.innerHTML = i.toString();
      indexRow.appendChild(indexEl);
    }

    table.appendChild(indexRow);

    let [aRow, aCells] = this.convertToTableRow('a', tableData['a']);
    let [bRow, bCells] = this.convertToTableRow('b', tableData['b']);
    let [qRow, qCells] = this.convertToTableRow('q', tableData['q']);
    let [rRow, rCells] = this.convertToTableRow('r', tableData['r']);

    let tableCells = {
      'a': aCells,
      'b': bCells,
      'q': qCells,
      'r': rCells
    };
    
    table.appendChild(aRow);
    table.appendChild(bRow);
    table.appendChild(qRow);
    table.appendChild(rRow);

    let wrapper = document.querySelector('.euclid-table-wrapper');
    while (wrapper.firstChild) wrapper.removeChild(wrapper.firstChild);
    wrapper.appendChild(table);
  }

  static getTableCell(col, row) {
    let rows = document.querySelectorAll('.euclid-table-wrapper tr');
    return rows[row].childNodes[col];
  }

  static updateExampleFormulas(tableData) {

    let gcd = document.querySelector('.horizontal-gcd-formula-example > .gcd');
    let xEl = document.querySelector('.horizontal-gcd-formula-example > .x');
    let yEl = document.querySelector('.horizontal-gcd-formula-example > .y');
    let aEl = document.querySelector('.horizontal-gcd-formula-example > .a');
    let bEl = document.querySelector('.horizontal-gcd-formula-example > .b');

    let a = tableData.a[tableData.a.length - 2];
    let b = tableData.b[tableData.b.length - 2];

    xEl.innerHTML = tableData.r[0];
    yEl.innerHTML = tableData.r[1];
    aEl.innerHTML = a < 0 ? `(${a})` : a;
    bEl.innerHTML = b < 0 ? `(${b})` : b;
    gcd.innerHTML = tableData.r[tableData.r.length - 2];
  }
}

const v = new View();
