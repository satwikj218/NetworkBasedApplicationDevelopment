var dog = {"name": "Woody", "type":"dog"};
var cat = {"name": "Bob", "type":"cat"};
console.log(dog);
console.log(cat);

var petNames = ["Woody", "Bob"];
console.log(petNames);
var pets = [dog, cat];
console.log(pets);

pets.push({"name": "Roxy", "type": "dog"});
console.log(pets);
console.log(pets[2]);

cat.age = 2;
dog["age"] = 14;

console.log(pets);
pets[0].age = 14;
pets[2]["age"] = 6;
console.log(pets);

pets[1].age = 3;
pets[1].hungry = true;
console.log(pets);
console.log(cat);