import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';
import { Stack } from './stack';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var commands = data.split(/[\n]/)  //seperate each line into an array
        commands = commands.map(function(x){return x.replace(/[\r]/gm, '');}); //strip "/r" from each line
    } ;
    return commands;
}

function getDirSize(fileTree, dir) {
    let size:number = 0;
    for (let file of fileTree[dir]) {
        if (/^\d/.test(file[0])) {
            size += parseInt(file.split(' ')[0]);
        } else {
            let newdir = dir + file + '/';
            size += getDirSize(fileTree, newdir);
        }
    }
    return size;
}

function makeDirectory(commands: string[]) {
    let fileTree: {[key: string]: string[]} = {};
    const Directory:Stack<string> = new Stack<string>();
    let currentDirectory:string = '';
    for (let command of commands) {
        if (command.startsWith("$ cd")) {
            let newDirectory  = command.split(" ")[2];

            if (newDirectory == '..') {
                Directory.pop();
                currentDirectory = Directory.peek() as string;
                continue;
            }

            if (newDirectory == '/') {
                Directory.push(newDirectory);
                currentDirectory = Directory.peek() as string;
                fileTree[currentDirectory] = [];
                continue;
            }

            let newdir = currentDirectory + newDirectory +'/';
            if(!(fileTree.hasOwnProperty(newdir))) {
                Directory.push(newdir);
                currentDirectory = Directory.peek() as string;
                fileTree[currentDirectory] = [];
            }
            
        }
        if (command.startsWith("$ ls")) {
            continue;
        }
        if (command.startsWith("dir")) {
            let dir:string = command.split(' ')[1];
            fileTree[currentDirectory].push(dir);
        } if(/^\d/.test(command)) {
            fileTree[currentDirectory].push(command);
        }
    }
    return fileTree;
}

function part1(fileTree: {[key: string]: string[]}) { //gets part 1 answer
   let sum = 0;
    for (let dir in fileTree) {
        if (getDirSize(fileTree, dir) <= 100000) {
            sum += getDirSize(fileTree, dir);
        } 
    }
    return sum; 
}


function part2(fileTree: {[key: string]: string[]}) { //gets part 2 answer
    let threshold = 30000000 - (70000000 - getDirSize(fileTree, '/'));
    let size = getDirSize(fileTree, '/');
    for (let dir in fileTree) {
        if (getDirSize(fileTree, dir) >= threshold) {
            if(getDirSize(fileTree, dir) < size) {
                size = getDirSize(fileTree, dir);
            }
        } 
    }
    return size;
}



let commands = getData("input.txt");
let fileTree = makeDirectory(commands);
let sizes = part1(fileTree);
let directory = part2(fileTree);

console.log("The total size of directories under 100MB is: " + sizes + "b"); //print out part 1 answer
console.log("The directory to be deleted for space is: " + directory); //print out part 2 answer