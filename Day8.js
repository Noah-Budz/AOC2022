"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
function getData(handle) {
    const data = (0, fs_1.readFileSync)((0, path_1.join)((0, path_1.resolve)(), handle), 'utf-8');
    { //get data from file
        var columns = data.split(/[\n]/); //seperate each line into an array
        columns = columns.map(function (x) { return x.replace(/[\r]/gm, ''); }); //strip "/r" from each line
        var grid = [];
        for (let column of columns) {
            var gridColumn = column.split('').map(function (item) {
                return parseInt(item, 10);
            });
            grid.push(gridColumn);
        }
    }
    ;
    return grid;
}
function part1(treeGrid) {
    let count = 0;
    let transposedTree = treeGrid[0].map((_, colIndex) => treeGrid.map(row => row[colIndex]));
    for (let i = 1; i < treeGrid.length - 1; i++) {
        for (let j = 1; j < treeGrid[i].length - 1; j++) {
            if ((transposedTree[j].slice(0, i).every(el => { return el < treeGrid[i][j]; })) || (transposedTree[j].slice(i + 1).every(el => { return el < treeGrid[i][j]; })) || (treeGrid[i].slice(0, j).every(el => { return el < treeGrid[i][j]; })) || (treeGrid[i].slice(j + 1).every(el => { return el < treeGrid[i][j]; }))) {
                count += 1;
            }
        }
    }
    let visible = 2 * treeGrid[0].length + 2 * (transposedTree[0].length - 2) + count;
    return visible;
}
function part2(treeGrid) {
    let transposedTree = treeGrid[0].map((_, colIndex) => treeGrid.map(row => row[colIndex]));
    let scenicScores = [];
    for (let i = 1; i < treeGrid[0].length - 1; i++) {
        for (let j = 1; j < transposedTree[0].length - 1; j++) {
            let north = transposedTree[j].slice(0, i).reverse().findIndex(el => { return el >= treeGrid[i][j]; });
            north = (north >= 0 ? north + 1 : transposedTree[j].slice(0, i).length);
            let south = transposedTree[j].slice(i + 1).findIndex(el => { return el >= treeGrid[i][j]; });
            south = (south >= 0 ? south + 1 : transposedTree[j].slice(i + 1).length);
            let east = treeGrid[i].slice(j + 1).findIndex(el => { return el >= treeGrid[i][j]; });
            east = (east >= 0 ? east + 1 : treeGrid[i].slice(j + 1).length);
            let west = treeGrid[i].slice(0, j).reverse().findIndex(el => { return el >= treeGrid[i][j]; });
            west = (west >= 0 ? west + 1 : treeGrid[i].slice(0, j).length);
            scenicScores.push(north * south * west * east);
        }
    }
    return Math.max(...scenicScores);
}
let treeGrid = getData("input.txt");
let visibleTrees = part1(treeGrid);
let scenicTree = part2(treeGrid);
console.log("The total amount of visible trees from outside the grid: " + visibleTrees); //print out part 1 answer
console.log("The tree with the most scenic score has a value of: " + scenicTree); //print out part 2 answer
//# sourceMappingURL=Day8.js.map