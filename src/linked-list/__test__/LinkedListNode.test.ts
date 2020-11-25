import LinkedListNode from "../LinkedListNode";

describe("LinkedListNode", () => {
  it("should create list node with value", () => {
    const node = new LinkedListNode(1);

    expect(node.value).toBe(1);
    expect(node.next).toBeNull();
  });

  it("should create list node with object as a value", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new LinkedListNode(nodeValue);

    expect(node.value.value).toBe(1);
    expect(node.value.key).toBe("test");
    expect(node.next).toBeNull();
  });

  it("should link nodes together", () => {
    const node2 = new LinkedListNode(2);
    const node1 = new LinkedListNode(1, node2);

    expect(node1.next).toBeDefined();
    expect(node2.next).toBeNull();
    expect(node1.value).toBe(1);
    expect((node1.next as typeof node2).value).toBe(2);
  });

  it("should convert node to string", () => {
    const nodeOfNumber = new LinkedListNode(1);
    const nodeOfString = new LinkedListNode("string value");

    expect(nodeOfNumber.toString()).toBe("1");
    expect(nodeOfString.toString()).toBe("string value");
  });

  it("should convert node to string with custom stringifyer", () => {
    const nodeValue = { value: 1, key: "test" };
    const node = new LinkedListNode(nodeValue);
    const toStringCallback = (value: { value: number; key: string }) =>
      `value: ${value.value}, key: ${value.key}`;

    expect(node.toString(toStringCallback)).toBe("value: 1, key: test");
  });
});
