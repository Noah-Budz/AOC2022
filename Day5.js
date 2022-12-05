"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stack_1 = require("./stack");
function parseInts(str) {
    // Use a regular expression to match all sequences of one or more digits
    const regex = /\d+/g;
    // Use the `match()` method to find all matches in the string
    const matches = str.match(regex);
    // Use the `map()` method to convert each string to a number
    return matches.map(match => parseInt(match, 10));
}
function getData(handle) {
    const data = (0, fs_1.readFileSync)((0, path_1.join)((0, path_1.resolve)(), handle), 'utf-8');
    { //get data from file
        var cargo_orders = data.split(/[\n]/); //seperate each line into an array
        cargo_orders = cargo_orders.map(function (x) { return x.replace(/[\r]/gm, ''); }); //strip "/r" from each line
    }
    ;
    const stacks = [];
    let orders = [];
    let empty = cargo_orders.indexOf("");
    let stackinstruct = cargo_orders[empty - 1].replace(/[\s+]/gm, '').split(''); // get total number of crate stacks
    for (let i = 0; i < stackinstruct.length; i++) {
        stacks[i] = new stack_1.Stack();
    }
    for (let i = empty - 2; i >= 0; i--) { //put all cargo in stacks starting from bottom of stack to top
        for (let num of stackinstruct) {
            let index = parseInt(num) - 1;
            if (cargo_orders[i].charAt(cargo_orders[empty - 1].indexOf(num)) != ' ') {
                let cargo = cargo_orders[i].charAt(cargo_orders[empty - 1].indexOf(num));
                stacks[index].push(cargo);
            }
        }
    }
    for (let i = empty + 1; i < cargo_orders.length; i++) { //extract orders in form [num, stack_start, stack_end]  
        orders.push(parseInts(cargo_orders[i]));
    }
    return { stacks, orders };
}
function part1(stacks, orders) {
    let tempstacks = stacks;
    for (let order of orders) {
        for (let i = 0; i < order[0]; i++) {
            let crate = tempstacks[order[1] - 1].pop();
            tempstacks[order[2] - 1].push(crate);
        }
    }
    let top = '';
    for (let stack of tempstacks) {
        top += stack.peek();
    }
    return top;
}
function part2(stacks, orders) {
    for (let order of orders) {
        let temp = new stack_1.Stack();
        for (let i = 0; i < order[0]; i++) {
            let crate = stacks[order[1] - 1].pop();
            temp.push(crate);
        }
        for (let i = 0; i < order[0]; i++) {
            let crate = temp.pop();
            stacks[order[2] - 1].push(crate);
        }
    }
    let top = '';
    for (let stack of stacks) {
        top += stack.peek();
    }
    return top;
}
let { stacks, orders } = getData("input.txt");
//let top = part1(stacks, orders);
let top2 = part2(stacks, orders);
//console.log("The crates that end up at the top of each stack is: " + top); //print out part 1 answer
console.log("The crates that end up at the top of each stack moving multiple crates at once is " + top2); //print out part 2 answer
//# sourceMappingURL=Day5.js.map