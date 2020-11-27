import LinkedList from "../linked-list/LinkedList";
import LinkedListNode from "../linked-list/LinkedListNode";

export type HashMap<T> = {
  key: string;
  value: T;
};

const defaultHashTableSize = 32;

export default class HashTable<T> {
  buckets: LinkedList<HashMap<T>>[];
  keys: Record<string, number>;

  constructor(hashTableSize = defaultHashTableSize) {
    this.buckets = Array(hashTableSize)
      .fill(null)
      .map(() => new LinkedList());

    this.keys = {};
  }

  hash(key: string): number {
    const hash = Array.from(key).reduce(
      (hashAccumulator, keySymbol) => hashAccumulator + keySymbol.charCodeAt(0),
      0
    );

    return hash % this.buckets.length;
  }

  set(key: string, value: T): void {
    const keyHash = this.hash(key);
    this.keys[key] = keyHash;
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (!node) {
      bucketLinkedList.append({ key, value });
    } else {
      node.value.value = value;
    }
  }

  delete(key: string): LinkedListNode<HashMap<T>> | null {
    const keyHash = this.hash(key);
    delete this.keys[key];
    const bucketLinkedList = this.buckets[keyHash];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    if (node) {
      return bucketLinkedList.delete(node.value);
    }

    return null;
  }

  get(key: string): T | undefined {
    const bucketLinkedList = this.buckets[this.hash(key)];
    const node = bucketLinkedList.find({
      callback: (nodeValue) => nodeValue.key === key,
    });

    return node ? node.value.value : undefined;
  }

  has(key: string): boolean {
    return Object.hasOwnProperty.call(this.keys, key);
  }

  getKeys(): string[] {
    return Object.keys(this.keys);
  }
}
