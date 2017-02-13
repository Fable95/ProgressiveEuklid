"Use strict"
//import EuclidCalc from "EuclidCalc.js";

class View {

  static convertToTableRow(rowLabel, arr) {
    return `<tr><th>${rowLabel}</th>` +
            arr.reduce( (stringSoFar, n) => stringSoFar + `<td>${n}</td>`, "") +
            "</tr>";
  }
  
  static fillTableHorizontal(x, y) {
    let tableData = EuclidCalc.calcHorizontal(x, y);
    
    let indexRow = "<tr><th>i</th>";
    for(let i = - 1; i < tableData.r.length - 1; i++){
      indexRow += `<th>${i}</th>`;
    }
    indexRow += "</tr>"

    table = `
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
