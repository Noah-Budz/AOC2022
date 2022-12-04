"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getData(handle) {
    const data = (0, fs_1.readFileSync)((0, path_1.join)((0, path_1.resolve)(), handle), 'utf-8');
    { //get data from file
        var object = data.split(/[\n]/); //seperate each line into an array
        object = object.map(function (x) { return x.replace(/[\r]/gm, ''); }); //strip "/r" from each line
    }
    ;
    return object;
}
function part1(object) {
    return 1;
}
function part2(object) {
    return 1;
}
let object = getData("input.txt");
let part1ans = part1(object);
let part2ans = part2(object);
console.log("The answer to part 1 is : " + part1ans); //print out part 1 answer
console.log("The answer to part 2 is : " + part2ans); //print out part 2 answer
//# sourceMappingURL=Dayn.js.map