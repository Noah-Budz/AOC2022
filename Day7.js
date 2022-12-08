"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const stack_1 = require("./stack");
function getData(handle) {
    const data = (0, fs_1.readFileSync)((0, path_1.join)((0, path_1.resolve)(), handle), 'utf-8');
    { //get data from file
        var commands = data.split(/[\n]/); //seperate each line into an array
        commands = commands.map(function (x) { return x.replace(/[\r]/gm, ''); }); //strip "/r" from each line
    }
    ;
    return commands;
}
function getDirSize(fileTree, dir) {
    let size = 0;
    for (let file of fileTree[dir]) {
        if (/^\d/.test(file[0])) {
            size += parseInt(file.split(' ')[0]);
        }
        else {
            let newdir = dir + file + '/';
            size += getDirSize(fileTree, newdir);
        }
    }
    return size;
}
function makeDirectory(commands) {
    let fileTree = {};
    const Directory = new stack_1.Stack();
    let currentDirectory = '';
    for (let command of commands) {
        if (command.startsWith("$ cd")) {
            let newDirectory = command.split(" ")[2];
            if (newDirectory == '..') {
                Directory.pop();
                currentDirectory = Directory.peek();
                continue;
            }
            if (newDirectory == '/') {
                Directory.push(newDirectory);
                currentDirectory = Directory.peek();
                fileTree[currentDirectory] = [];
                continue;
            }
            let newdir = currentDirectory + newDirectory + '/';
            if (!(fileTree.hasOwnProperty(newdir))) {
                Directory.push(newdir);
                currentDirectory = Directory.peek();
                fileTree[currentDirectory] = [];
            }
        }
        if (command.startsWith("$ ls")) {
            continue;
        }
        if (command.startsWith("dir")) {
            let dir = command.split(' ')[1];
            fileTree[currentDirectory].push(dir);
        }
        if (/^\d/.test(command)) {
            fileTree[currentDirectory].push(command);
        }
    }
    return fileTree;
}
function part1(fileTree) {
    let sum = 0;
    for (let dir in fileTree) {
        if (getDirSize(fileTree, dir) <= 100000) {
            sum += getDirSize(fileTree, dir);
        }
    }
    return sum;
}
function part2(fileTree) {
    let threshold = 30000000 - (70000000 - getDirSize(fileTree, '/'));
    let size = getDirSize(fileTree, '/');
    for (let dir in fileTree) {
        if (getDirSize(fileTree, dir) >= threshold) {
            if (getDirSize(fileTree, dir) < size) {
                size = getDirSize(fileTree, dir);
            }
        }
    }
    return size;
}
let commands = getData("input.txt");
let fileTree = makeDirectory(commands);
let part1ans = part1(fileTree);
let part2ans = part2(fileTree);
console.log("The answer to part 1 is: " + part1ans); //print out part 1 answer
console.log("The answer to part 2 is: " + part2ans); //print out part 2 answer
//# sourceMappingURL=Day7.js.map