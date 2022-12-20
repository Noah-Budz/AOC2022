import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var movements = data.split(/[\n]/)  //seperate each line into an array
        movements = movements.map(function(x){return x.replace(/[\r]/gm, '');}); //strip "/r" from each line
    } ;
    return movements;
}


function part1(movements: string[]) { //gets part 1 answer
    console.log(movements)
    let head, tail = [0,0];
    let right  = [1, 0];
    let left = [-1, 0];
    let up = [0, 1];
    let down = [0, -1];
    for (let input of movements) {
        let move = parseInt(input[-1]);
        if (Math.abs((head[0] - tail[0])**2 + (head[1] - tail[1])**2) > 1) {
            //diagonal;
        }
        for(let i = 0; i < move; i++) {
            head+right;
        };
        switch(input[0]) {
            case 'R': {
                move;
            }
            case 'L': {
                move;
            }
            case 'U': {
                move;
            }
            case 'D': {
                move;
            }
        }
    }
    return 1; 
}


function part2(movements: string[]) { //gets part 2 answer

    return 1;
}

let movements = getData("input.txt");
let part1ans = part1(movements);
let part2ans = part2(movements);

//console.log("The answer to part 1 is: " + part1ans); //print out part 1 answer
//console.log("The answer to part 2 is: " + part2ans); //print out part 2 answer