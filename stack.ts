export class Stack<T> {
    private data: T[] = [];
  
    // Add an element to the top of the stack
    push(element: T): void {
      this.data.push(element);
    }
  
    // Remove and return the element at the top of the stack
    pop(): T | undefined {
      return this.data.pop();
    }
  
    // Return the element at the top of the stack without removing it
    peek(): T | undefined {
      return this.data[this.data.length - 1];
    }
  
    // Return the number of elements in the stack
    size(): number {
      return this.data.length;
    }
  
    // Check if the stack is empty
    isEmpty(): boolean {
      return this.data.length === 0;
    }
  
    // Clear all elements from the stack
    clear(): void {
      this.data = [];
    }
  }