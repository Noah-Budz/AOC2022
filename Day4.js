"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getData(handle) {
    const data = (0, fs_1.readFileSync)((0, path_1.join)((0, path_1.resolve)(), handle), 'utf-8');
    { //get data from file
        var pairs = data.split(/[\n]/); //seperate each line into an array
        pairs = pairs.map(function (x) { return x.replace(/[\r]/gm, ''); }); //strip "/r" from each line
    }
    ;
    return pairs;
}
function part1(pairs) {
    let contains = 0;
    for (let pair of pairs) { //iterate through each set of pairs
        let tasks = pair.split(/[,]/); //seperate pair into individual array elements
        let elf1 = tasks[0].split(/[-]/); //turn each pair into an array containing two endpoints
        let elf2 = tasks[1].split(/[-]/);
        if ( // check if both endpoints are contained entirely within the endpoints of the other pairs
        (parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[1]))
            || (parseInt(elf2[0]) <= parseInt(elf1[0]) && parseInt(elf2[1]) >= parseInt(elf1[1]))) {
            contains += 1; //if one pair is contained within the other count it
        }
    }
    return contains;
}
function part2(pairs) {
    let intersects = 0;
    for (let pair of pairs) {
        let tasks = pair.split(/[,]/);
        let elf1 = tasks[0].split(/[-]/);
        let elf2 = tasks[1].split(/[-]/);
        if ( //check if pairs intersect by checking if any endpoint of the two pairs is contained within the other
        (parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[0]))
            || (parseInt(elf1[0]) <= parseInt(elf2[1]) && parseInt(elf1[1]) >= parseInt(elf2[1]))
            || (parseInt(elf1[0]) >= parseInt(elf2[0]) && parseInt(elf1[0]) <= parseInt(elf2[1]))
            || (parseInt(elf1[0]) <= parseInt(elf2[0]) && parseInt(elf1[1]) >= parseInt(elf2[1]))) {
            intersects += 1;
        }
    }
    return intersects;
}
let pairs = getData("input.txt");
let contains = part1(pairs);
let intersects = part2(pairs);
console.log("The total pairs of elfs with ones task list containing the others is : " + contains); //print out part 1 answer
console.log("The answer pairs of elfs with task lists that intersect is : " + intersects); //print out part 2 answer
//# sourceMappingURL=Day4.js.map