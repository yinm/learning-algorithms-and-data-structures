import LinkedListNode, { ToStringCallback } from "./LinkedListNode";
import Comparator, { CompareFunction } from "../utils/Comparator";

type FindParams<T> = {
  value?: T;
  callback?: (value: T) => boolean;
};

export default class LinkedList<T> {
  head: LinkedListNode<T> | null;
  tail: LinkedListNode<T> | null;
  compare: Comparator<T>;

  constructor(comparatorFunction?: CompareFunction<T>) {
    this.head = null;
    this.tail = null;
    this.compare = new Comparator(comparatorFunction);
  }

  prepend(value: T): this {
    const newNode = new LinkedListNode(value, this.head);
    this.head = newNode;

    if (this.tail === null) {
      this.tail = newNode;
    }

    return this;
  }

  append(value: T): this {
    const newNode = new LinkedListNode(value);

    if (this.head === null || this.tail === null) {
      this.head = newNode;
      this.tail = newNode;
      return this;
    }

    this.tail.next = newNode;
    this.tail = newNode;
    return this;
  }

  delete(value: T): LinkedListNode<T> | null {
    if (this.head === null) {
      return null;
    }

    let deletedNode = null;
    while (this.head && this.compare.equal(this.head.value, value)) {
      deletedNode = this.head;
      this.head = this.head.next;
    }

    let currentNode = this.head;
    if (currentNode !== null) {
      while (currentNode.next) {
        if (this.compare.equal(currentNode.next.value, value)) {
          deletedNode = currentNode.next;
          currentNode.next = currentNode.next.next;
        } else {
          currentNode = currentNode.next;
        }
      }
    }

    if (this.compare.equal((this.tail as LinkedListNode<T>).value, value)) {
      this.tail = currentNode;
    }

    return deletedNode;
  }

  find({
    value = undefined,
    callback = undefined,
  }: FindParams<T>): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    let currentNode = this.head;
    while (currentNode) {
      if (callback && callback(currentNode.value)) {
        return currentNode;
      }

      if (value !== undefined && this.compare.equal(currentNode.value, value)) {
        return currentNode;
      }

      currentNode = currentNode.next as LinkedListNode<T>;
    }
    return null;
  }

  deleteTail(): LinkedListNode<T> | null {
    if (this.head === null || this.tail === null) {
      return null;
    }

    const deletedTail = this.tail;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;

      return deletedTail;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (!currentNode.next.next) {
        currentNode.next = null;
      } else {
        currentNode = currentNode.next;
      }
    }

    this.tail = currentNode;

    return deletedTail;
  }

  deleteHead(): LinkedListNode<T> | null {
    if (!this.head) {
      return null;
    }

    const deletedHead = this.head;

    if (this.head.next) {
      this.head = this.head.next;
    } else {
      this.head = null;
      this.tail = null;
    }

    return deletedHead;
  }

  fromArray(values: T[]): LinkedList<T> {
    values.forEach((value) => this.append(value));

    return this;
  }

  toArray(): LinkedListNode<T>[] {
    const nodes = [];

    let currentNode = this.head;
    while (currentNode) {
      nodes.push(currentNode);
      currentNode = currentNode.next;
    }

    return nodes;
  }

  toString(callback?: ToStringCallback<T>): string {
    return this.toArray()
      .map((node) => node.toString(callback))
      .toString();
  }

  reverse(): this {
    let currNode = this.head;
    let prevNode = null;
    let nextNode = null;

    while (currNode) {
      nextNode = currNode.next;
      currNode.next = prevNode;

      prevNode = currNode;
      currNode = nextNode;
    }

    this.tail = this.head;
    this.head = prevNode;
    return this;
  }
}
