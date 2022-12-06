import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function hasDuplicates(array) {
    return (new Set(array)).size !== array.length;
}


function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var datastream = data.split(/[\n]/)  //seperate each line into an array
        datastream = datastream.map(function(x){return x.replace(/[\r]/gm, '');}); //strip "/r" from each line
    } ;
    return datastream;
}


function part1(datastream: string) { //gets part 1 answer
    let index = -1;
    for (let i = 0; i < datastream.length-3; i++) {
        let potential_code = datastream.slice(i, i+4);
        if (!hasDuplicates(potential_code)) {
            index = i+3;
            break;
        }
    }
    return index+1; 
}


function part2(datastream: string) { //gets part 2 answer
    let index = -1;
    for (let i = 0; i < datastream.length-13; i++) {
        let potential_code = datastream.slice(i, i+14);
        if (!hasDuplicates(potential_code)) {
            index = i+13;
            break;
        }
    }
    return index+1;
}

let datastream = getData("input.txt")[0];
let packet_marker = part1(datastream);
let message_marker = part2(datastream);

console.log("The answer to part 1 is: " + packet_marker); //print out part 1 answer
console.log("The answer to part 2 is: " + message_marker); //print out part 2 answer