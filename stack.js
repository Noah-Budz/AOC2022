"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Stack = void 0;
class Stack {
    constructor() {
        this.data = [];
    }
    // Add an element to the top of the stack
    push(element) {
        this.data.push(element);
    }
    // Remove and return the element at the top of the stack
    pop() {
        return this.data.pop();
    }
    // Return the element at the top of the stack without removing it
    peek() {
        return this.data[this.data.length - 1];
    }
    // Return the number of elements in the stack
    size() {
        return this.data.length;
    }
    // Check if the stack is empty
    isEmpty() {
        return this.data.length === 0;
    }
    // Clear all elements from the stack
    clear() {
        this.data = [];
    }
}
exports.Stack = Stack;
//# sourceMappingURL=stack.js.map