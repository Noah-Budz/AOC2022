import { readFileSync, promises as fsPromises } from 'fs';
import { join, resolve } from 'path';

function part1(handle: string) {

    const data = readFileSync(join(resolve(), handle), 'utf-8');

    console.log(data);
    return 1;
}

part1('input.txt');