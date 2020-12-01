import TrieNode from "./TrieNode";

const HEAD_CHARACTER = "*";

export default class Trie {
  head: TrieNode;

  constructor() {
    this.head = new TrieNode(HEAD_CHARACTER);
  }

  addWord(word: string): Trie {
    const characters = Array.from(word);
    let currentNode = this.head;

    for (let i = 0; i < characters.length; i += 1) {
      const isComplete = i === characters.length - 1;
      currentNode = currentNode.addChild(characters[i], isComplete);
    }

    return this;
  }

  deleteWord(word: string): Trie {
    const depthFirstDelete = (currentNode: TrieNode, charIndex = 0) => {
      if (charIndex >= word.length) {
        return;
      }

      const character = word[charIndex];
      const nextNode = currentNode.getChild(character);

      if (nextNode === undefined) {
        return;
      }

      depthFirstDelete(nextNode, charIndex + 1);

      if (charIndex === word.length - 1) {
        nextNode.isCompleteWord = false;
      }

      currentNode.removeChild(character);
    };

    depthFirstDelete(this.head);
    return this;
  }

  suggestNextCharacters(word: string): string[] | null {
    const lastCharacter = this.getLastCharacterNode(word);
    if (!lastCharacter) {
      return null;
    }

    return lastCharacter.suggestChildren();
  }

  doesWordExist(word: string): boolean {
    const lastCharacter = this.getLastCharacterNode(word);

    return !!lastCharacter && lastCharacter.isCompleteWord;
  }

  getLastCharacterNode(word: string): TrieNode | null {
    const characters = Array.from(word);
    let currentNode: TrieNode | undefined = this.head;

    for (let i = 0; i < characters.length; i++) {
      if (currentNode === undefined || !currentNode.hasChild(characters[i])) {
        return null;
      }

      currentNode = currentNode.getChild(characters[i]);
    }

    return currentNode as TrieNode;
  }
}
