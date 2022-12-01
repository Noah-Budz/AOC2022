import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); {
        var textByLine = data.split("\n")  
        textByLine = textByLine.map(function(x){return x.replace(/[\r\n]/gm, '');});
    } ;

    var calories:number[] = [];

    let count = 0;

    for (var i  = 0; i < textByLine.length; i++) {
        let val = parseInt(textByLine[i]);
        if (isNaN(val)) {
            calories.push(count);
            count = 0;
            continue;
        }
        count += val;

        if (i == textByLine.length - 1) {
            calories.push(count);
        }
    }
    
    return calories;
}

function part1(calories: number[]) {

    const max = calories.reduce((a, b) => Math.max(a, b), -Infinity);
    return max;
}

function part2(calories: number[]) {

    var sortedCalories: number[] = calories.sort((n1,n2) => n2 - n1);

    const ans = sortedCalories[0] + sortedCalories[1] + sortedCalories[2];

    return ans;
}


const data = getData('input.txt');


console.log("The answer to part 1 is: " + part1(data));

console.log("The answer to part 2 is: " + part2(data));