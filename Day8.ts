import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function getData(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8'); { //get data from file
        var columns = data.split(/[\n]/)  //seperate each line into an array
        columns = columns.map(function(x){return x.replace(/[\r]/gm, '');}); //strip "/r" from each line
        var grid:number[][] = []
        for (let column of columns) {
            var gridColumn = column.split('').map(function(item) {
                return parseInt(item, 10);
            });
            grid.push(gridColumn);

        }
    } ;
    return grid;
}


function part1(treeGrid: number[][]) { //gets part 1 answer
    let count = 0;
    let transposedTree = treeGrid[0].map((_, colIndex) => treeGrid.map(row => row[colIndex]));
    for (let i = 1; i < treeGrid.length-1; i++) {
        for (let j = 1; j < treeGrid[i].length-1; j++) {
            if ((transposedTree[j].slice(0, i).every(el => {return el < treeGrid[i][j]})) || (transposedTree[j].slice(i+1).every(el => {return el < treeGrid[i][j]})) || (treeGrid[i].slice(0, j).every(el => {return el < treeGrid[i][j]})) || (treeGrid[i].slice(j+1).every(el => {return el < treeGrid[i][j]}))) {
                count += 1;
            }
        }
    }
    let visible = 2*treeGrid[0].length+ 2*(transposedTree[0].length-2) + count;
    return visible; 
}


function part2(treeGrid: number[][]) { //gets part 2 answer
    let transposedTree = treeGrid[0].map((_, colIndex) => treeGrid.map(row => row[colIndex]));
    let scenicScores:number[] = [];
    for (let i = 1; i < treeGrid[0].length-1; i++) {
        for (let j = 1; j < transposedTree[0].length-1; j++) {
            let north = transposedTree[j].slice(0, i).findIndex(el => {return el >= treeGrid[i][j]});
            north = (north >= 0 ? north + 1 : transposedTree[j].slice(0, i).length);
            let south = transposedTree[j].slice(i+1).findIndex(el => {return el >= treeGrid[i][j]});
            south = (south >= 0 ? south + 1 : transposedTree[j].slice(i+1).length);
            let east = treeGrid[i].slice(j+1).findIndex(el => {return el >= treeGrid[i][j]});
            east = (east >= 0 ? east + 1 : treeGrid[i].slice(j+1).length);
            let west = treeGrid[i].slice(0, j).findIndex(el => {return el >= treeGrid[i][j]});
            west = (west >= 0 ? west + 1 : treeGrid[i].slice(0, j).length);
            console.log(north, south, west, east);
            scenicScores.push(north*south*west*east);
        }
    }
    console.log(scenicScores);
    return Math.max(...scenicScores);
}

let treeGrid = getData("input.txt");
//let visibleTrees = part1(treeGrid);
let scenicTree = part2(treeGrid);

//console.log("The total amount of visible trees from outside the grid: " + visibleTrees); //print out part 1 answer
console.log("The tree with the most scenic score has a value of: " + scenicTree); //print out part 2 answer