import Trie from "../Trie";
import TrieNode from "../TrieNode";

describe("Trie", () => {
  it("should create trie", () => {
    const trie = new Trie();

    expect(trie).toBeDefined();
    expect(trie.head.toString()).toBe("*");
  });

  it("should add words to trie", () => {
    const trie = new Trie();

    trie.addWord("cat");
    expect(trie.head.toString()).toBe("*:c");
    expect((trie.head.getChild("c") as TrieNode).toString()).toBe("c:a");

    trie.addWord("car");
    expect(trie.head.toString()).toBe("*:c");

    const cTrieNode = trie.head.getChild("c") as TrieNode;
    expect(cTrieNode.toString()).toBe("c:a");

    const aTrieNode = cTrieNode.getChild("a") as TrieNode;
    expect(aTrieNode.toString()).toBe("a:t,r");

    const tTrieNode = aTrieNode.getChild("t") as TrieNode;
    expect(tTrieNode.toString()).toBe("t*");

    const rTrieNode = aTrieNode.getChild("r") as TrieNode;
    expect(rTrieNode.toString()).toBe("r*");
  });

  it("should delete words from trie", () => {
    const trie = new Trie();

    trie.addWord("carpet");
    trie.addWord("car");
    trie.addWord("cat");
    trie.addWord("cart");
    expect(trie.doesWordExist("carpet")).toBe(true);
    expect(trie.doesWordExist("car")).toBe(true);
    expect(trie.doesWordExist("cart")).toBe(true);
    expect(trie.doesWordExist("cat")).toBe(true);

    trie.deleteWord("carpool");
    expect(trie.doesWordExist("carpet")).toBe(true);
    expect(trie.doesWordExist("car")).toBe(true);
    expect(trie.doesWordExist("cart")).toBe(true);
    expect(trie.doesWordExist("cat")).toBe(true);

    trie.deleteWord("carpet");
    expect(trie.doesWordExist("carpet")).toBe(false);
    expect(trie.doesWordExist("car")).toBe(true);
    expect(trie.doesWordExist("cart")).toBe(true);
    expect(trie.doesWordExist("cat")).toBe(true);

    trie.deleteWord("cat");
    expect(trie.doesWordExist("cat")).toBe(false);
    expect(trie.doesWordExist("car")).toBe(true);
    expect(trie.doesWordExist("cart")).toBe(true);

    trie.deleteWord("car");
    expect(trie.doesWordExist("car")).toBe(false);
    expect(trie.doesWordExist("cart")).toBe(true);

    trie.deleteWord("cart");
    expect(trie.doesWordExist("car")).toBe(false);
    expect(trie.doesWordExist("cart")).toBe(false);
  });

  it("should suggests next characters", () => {
    const trie = new Trie();

    trie.addWord("cat");
    trie.addWord("cats");
    trie.addWord("car");
    trie.addWord("caption");

    expect(trie.suggestNextCharacters("ca")).toEqual(["t", "r", "p"]);
    expect(trie.suggestNextCharacters("cat")).toEqual(["s"]);
    expect(trie.suggestNextCharacters("cab")).toBeNull();
  });

  it("should check if word exists", () => {
    const trie = new Trie();

    trie.addWord("cat");
    trie.addWord("cats");
    trie.addWord("carpet");
    trie.addWord("car");
    trie.addWord("caption");

    expect(trie.doesWordExist("cat")).toBe(true);
    expect(trie.doesWordExist("cats")).toBe(true);
    expect(trie.doesWordExist("carpet")).toBe(true);
    expect(trie.doesWordExist("car")).toBe(true);
    expect(trie.doesWordExist("cap")).toBe(false);
    expect(trie.doesWordExist("call")).toBe(false);
  });
});
