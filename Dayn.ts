import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var object = data.split(/[\n]/)  //seperate each line into an array
        object = object.map(function(x){return x.replace(/[\r]/gm, '');}); //strip "/r" from each line
    } ;
    return object;
}


function part1(object: string[]) { //gets part 1 answer

    return 1; 
}


function part2(object: string[]) { //gets part 2 answer

    return 1;
}

let object = getData("input.txt");
let part1ans = part1(object);
let part2ans = part2(object);

console.log("The answer to part 1 is: " + part1ans); //print out part 1 answer
console.log("The answer to part 2 is: " + part2ans); //print out part 2 answer