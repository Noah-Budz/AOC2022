import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); {
        var matches = data.split("\n")  
        matches = matches.map(function(x){return x.replace(/[\r\n]/gm, '');});
    } ;

    return matches;
}

function part1(matches: String[]) {
    var score = 0;
    for (let games of matches) {
        let player1 = games.charAt(0);
        let player2 = games.charAt(2);

        if (player1 == 'A') {
            if (player2 == 'X') {
                score += 4;
            } if (player2 == 'Y') {
                score += 8;
            } if (player2 == 'Z') {
                score += 3;
            }
        } 
        if (player1 == 'B') {
            if (player2 == 'X') {
                score += 1;
            } if (player2 == 'Y') {
                score += 5;
            } if (player2 == 'Z') {
                score += 9;
            }
        }
        if (player1 == 'C') {
            if (player2 == 'X') {
                score += 7;
            } if (player2 == 'Y') {
                score += 2;
            } if (player2 == 'Z') {
                score += 6;
            }

        }
    }
    return score;
}

function part2(matches) {
    var score = 0;
    for (let games of matches) {
        let player1 = games.charAt(0);
        let player2 = games.charAt(2);

        if (player1 == 'A') {
            if (player2 == 'X') {
                score += 3;
            } if (player2 == 'Y') {
                score += 4;
            } if (player2 == 'Z') {
                score += 8;
            }
        } 
        if (player1 == 'B') {
            if (player2 == 'X') {
                score += 1;
            } if (player2 == 'Y') {
                score += 5;
            } if (player2 == 'Z') {
                score += 9;
            }
        }
        if (player1 == 'C') {
            if (player2 == 'X') {
                score += 2;
            } if (player2 == 'Y') {
                score += 6;
            } if (player2 == 'Z') {
                score += 7;
            }

        }
    }
    return score;
}

let matches = getData("input.txt")

let score = part1(matches);

let score2 = part2(matches);

console.log("The total score according the strategy guide for part 1 is: " + score);

console.log("The total score according the strategy guide for part 2 is: " + score2);