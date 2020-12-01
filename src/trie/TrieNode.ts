import HashTable from "../hash-table/HashTable";

export default class TrieNode {
  character: string;
  isCompleteWord: boolean;
  children: HashTable<TrieNode>;

  constructor(character: string, isCompleteWord = false) {
    this.character = character;
    this.isCompleteWord = isCompleteWord;
    this.children = new HashTable();
  }

  getChild(character: string): TrieNode | undefined {
    return this.children.get(character);
  }

  addChild(character: string, isCompleteWord = false): TrieNode {
    if (!this.children.has(character)) {
      this.children.set(character, new TrieNode(character, isCompleteWord));
    }

    const childNode = this.children.get(character) as TrieNode;
    childNode.isCompleteWord = childNode.isCompleteWord || isCompleteWord;

    return childNode;
  }

  removeChild(character: string): TrieNode {
    const childNode = this.getChild(character);
    if (childNode && !childNode.isCompleteWord && !childNode.hasChildren()) {
      this.children.delete(character);
    }

    return this;
  }

  hasChild(character: string): boolean {
    return this.children.has(character);
  }

  hasChildren(): boolean {
    return this.children.getKeys().length !== 0;
  }

  suggestChildren(): string[] {
    return [...this.children.getKeys()];
  }

  toString(): string {
    let childrenAsString = this.suggestChildren().toString();
    childrenAsString = childrenAsString ? `:${childrenAsString}` : "";
    const isCompleteString = this.isCompleteWord ? "*" : "";

    return `${this.character}${isCompleteString}${childrenAsString}`;
  }
}
