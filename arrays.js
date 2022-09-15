//forEach(function): calls the argument function on each element in an array
//Drawbacks: always returns undefined, it cannot be used to modify the elements in an array

const nums = [1, 3, 5, 7, 9];

nums.forEach(num => console.log(num));

//map(function): creates and returns new array with values tha ae returned by calling the argument function of each element.
console.log(nums.map(num => num *= 2))

//find(function): tests each element with the argument function, returns the value of the first element that satsfies the argument function
//argument function returns a boolean type value.

console.log(nums.find(num => num > 3));

//findIndex(function): works similarly as find(), but it returns the index of the first element that satisfies the first eement

console.log(nums.findIndex(num => num > 5));