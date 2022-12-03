import { CharacterEncoding } from 'crypto';
import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var backpacks = data.split("\n")  //seperate each line into an array
        backpacks = backpacks.map(function(x){return x.replace(/[\r\n]/gm, '');}); //strip "/r" from each line
    } ;

    return backpacks;
}

function match(s1: string, s2:string) { //helper to function to find matching character between two strings and return the char
    var char:string[] = [];
    for (let i = 0; i < s1.length; i++) {
        s2.includes(s1[i]) ? char.push(s1.charAt(i)) : false;
    } 

    return char;
}

function getpriority(letter: string) { //gets priority of input letter
    let val;

    if (letter == letter.toUpperCase()) { //check for upper or lower case letter
        val = letter.charCodeAt(0)-38; //turn char into its ascii code value and shift index to a = 1, A = 27
       }
    if (letter == letter.toLowerCase()) {
        val = letter.charCodeAt(0)-96;
       }

    return val;
}

function part1(backpacks: string[]) {
    let priority:number = 0;
    for (let backpack of backpacks) { //iterate through each inventory of backpacks
        let compartment1 = backpack.slice(0, backpack.length/2); //get the items of compartment 1 from 1st half of string
        let compartment2 = backpack.slice(backpack.length/2, backpack.length); //get items of compartment 2 from 2nd half
        let char = match(compartment1, compartment2)[0]; //find the shared item between the two compartments
        priority += getpriority(char);
    }
    return priority; //return total sum of item priorities
}

function part2(backpacks: string[]) {
    const groupSize = 3;
    let priority:number = 0;
    for (let i = 0; i < backpacks.length; i+= groupSize) {
        var group = backpacks.slice(i, i + groupSize);
        let char1 = match(group[0], group[1]); // get string of matching characters between members 1 and 2
        let char2 = match(group[0], group[2]); // get string of matching characters between members 1 and 3
        let char = match(char1.join(''), char2.join(''))[0]; // matching character between the firs two strings will matching in all 3 members
        priority += getpriority(char); //sum priorities over all groups
    }
    return priority;
}

let backpacks = getData("input.txt"); //read data
let priorities = part1(backpacks); //output part 1 answer
let group_priorities = part2(backpacks); //output part 2 answer

console.log("The priority of the items appearing in both compartsments of each backpack is: " + priorities);
console.log("The priority of the items appearing in each group members backpack is: " + group_priorities);