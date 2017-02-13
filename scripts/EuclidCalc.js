"use strict";

class EuclidCalc{

  static calcNextA(a, q, index){
    return (a[index - 2] - a[index - 1] * q[index]);
  }
  static calcNextB(b, q, index){
    return (b[index - 2] - b[index - 1] * q[index]);
  }
  static calcNextQ(r, index){
    return (Math.floor(r[index - 2] / r[index - 1]));
  }
  static calcNextR(r, index){
    return (r[index - 2] % r[index - 1]);
  }
  static calcHorizontal(x, y){
    let retObject = {
      "r" : [x, y],
      "q" : [0, 0],
      "a" : [1, 0],
      "b" : [0, 1]
    };
    if(x < y){
      [x, y] = [y, x];
    }
    while(retObject.r[retObject.r.length - 1] != 0){
      let index = retObject.r.length;
      retObject.r.push(this.calcNextR(retObject.r, index));
      retObject.q.push(this.calcNextQ(retObject.r, index));
      retObject.a.push(this.calcNextA(retObject.a, retObject.q, index));
      retObject.b.push(this.calcNextB(retObject.b, retObject.q, index));
    }
    return retObject;
  }
}
