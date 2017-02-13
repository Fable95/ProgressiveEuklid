"Use strict"
import EuclidCalc from "EuclidCalc.js";
class View{
  fillTableHorizontal(x, y){
    let tableData = EuclidCalc.calcHorizontal(x, y);
    let table = "<table><tr>";
    for(let i = - 1; i < tableData.r.length - 1; i++){
      table += `<th>${i}</th>`;
    }
    table += "</tr>";
    
  }
}
