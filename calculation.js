// function add(x, y){
//     return x + y;
// }

// function subtract(x, y){
//     return x - y;
// }

// module.exports = {}

//module.exports.xyz = add;

// exports = initalized with module.exports
// function wrappers returns module.exports
// use exports as a shortcut for module.exports

//exports.xyz = add;

//module.exports = add;

//console.log(module.exports); //add function
//console.log(exports); // {}

//exports.add = add;
//exports.sub = subtract;

exports.add = (x, y) => x + y;
exports.sub = (x, y) => x - y;