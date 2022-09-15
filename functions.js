//function declaration
//function name(parameter list) { body }

function sum(a, b){
    return a + b;
}

console.log(sum(10, 20));

//function expression
// const name = function(parmeter list) { body };

const sumExp = function(a, b){
    return a + b
};

console.log(sumExp(5,2));

//arrow function (ES6)
//const name = (parameter list) => {body};

const sumArrow = (a, b) => {
    return a + b;
};

//if we have only one return statment
//can also be written as (a, b) => a + b;

console.log(sumArrow(1, 2));

//A Higher order function is a function that returns a function or takes a function as an argument

//return a function
function gretaerThan(a) {
    return function(b){
        return b > a;
    };
}

const greaterThan10 = gretaerThan(10);
const greaterThan20 = gretaerThan(20);
console.log(greaterThan10);

console.log(greaterThan10(5));
console.log(greaterThan20(15));
console.log(greaterThan20(30));

// Takes function as an argument

const nums = [3, 10, 7, 25, -5, 8];

nums.sort((a, b) => a - b); // b - a for descending order


console.log(nums);