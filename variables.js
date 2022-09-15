//let, const, var

//let: global scope or bock scope

let a = 10; // global scope

if(a > 1){
    let b = 5; // block scope
    a = a * b;
}

console.log(a);
//console.log(b); //not accessible

//const: constants whose values cannot be changed

const c = 10;
//c = 5; // not posible

//console.log(c) //error

//var: global scope or function scope

var d = 10; //global scope

/*function double(){
    var e = d * 2; //function scope
    console.log(e);
}*/

if(d > 5){
    var e = d * 2; //global scope
    console.log(e);
}

console.log(d);
//double();
console.log(e);