"use strict";

class EuclidCalc{

  static calcNextHorizontalA(a, q, index){
    return (a[index - 2] - a[index - 1] * q[index]);
  }
  static calcNextHorizontalB(b, q, index){
    return (b[index - 2] - b[index - 1] * q[index]);
  }
  static calcNextHorizontalQ(r, index){
    return (Math.floor(r[index - 2] / r[index - 1]));
  }
  static calcNextHorizontalR(r, index){
    return (r[index - 2] % r[index - 1]);
  }
  static calcHorizontal(x, y){

    if(x < y){
      [x, y] = [y, x];
    }

    let retObject = {
      "r" : [x, y],
      "q" : [0, 0],
      "a" : [1, 0],
      "b" : [0, 1]
    };

    while(retObject.r[retObject.r.length - 1] != 0){
      let index = retObject.r.length;
      retObject.r.push(this.calcNextHorizontalR(retObject.r, index));
      retObject.q.push(this.calcNextHorizontalQ(retObject.r, index));
      retObject.a.push(this.calcNextHorizontalA(retObject.a, retObject.q, index));
      retObject.b.push(this.calcNextHorizontalB(retObject.b, retObject.q, index));
    }
    return retObject;
  }
  static calcNextVerticalA(b, index){
    return b[index - 1];
  }
  static calcNextVerticalB(a, b, index){
    return (a[index - 1] % b[index - 1]);
  }
  static calcNextVerticalQ(a, b, index){
    if(b[index] === 0){
      return 0;
    }
    return (Math.floor(a[index] / b[index]));
  }
  static calcNextVerticalS(t, index){
    return t[index + 1];
  }
  static calcNextVerticalT(s, t, q, index){
    return (s[index + 1] - t[index + 1] * q[index]);
  }
  static calcVertical(a, b){
    if(a < b){
      [a, b] = [b, a];
    }
    let retObject = {
      "a" : [a],
      "b" : [b],
      "q" : [],
      "s" : [],
      "t" : []
    };
    retObject.q.push(this.calcNextVerticalQ(retObject.a, retObject.b, 0));
    while(retObject.b[retObject.b.length - 1] != 0){
      let index = retObject.b.length;
      retObject.a.push(this.calcNextVerticalA(retObject.b, index));
      retObject.b.push(this.calcNextVerticalB(retObject.a, retObject.b, index));
      retObject.q.push(this.calcNextVerticalQ(retObject.a, retObject.b, index));
    }
    let length = retObject.a.length;
    retObject.s[length - 1] = 1;
    retObject.t[length - 1] = 0;
    for (let i = length - 1; i > 0; i--) {
      retObject.s[i - 1] = this.calcNextVerticalS(retObject.t, i-1);
      retObject.t[i - 1] = this.calcNextVerticalT(retObject.s, retObject.t, retObject.q, i-1);

    }
    return retObject;
  }
}
