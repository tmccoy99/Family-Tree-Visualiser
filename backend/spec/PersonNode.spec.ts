import PersonNode from "../src/PersonNode";

describe("PersonNode testing", () => {
  test("PersonNode with essential data can construct and have data fetched", () => {
    const node = new PersonNode({
      name: "Jerry Smith",
      birthYear: 1999,
      isAlive: true,
    });
    expect(node.getData()).toEqual({
      name: "Jerry Smith",
      birthYear: 1999,
      isAlive: true,
    });
  });

  test("PersonNode optionally accepts data containing a spouse PersonNode", () => {
    const spouseNode = new PersonNode({
      name: "Wendy Smith",
      birthYear: 1995,
      isAlive: true,
    });
    const mainNode = new PersonNode({
      name: "Jerry Smith",
      birthYear: 1999,
      isAlive: true,
      spouse: spouseNode,
    });
    expect(mainNode.getData()).toEqual({
      name: "Jerry Smith",
      birthYear: 1999,
      isAlive: true,
      spouse: spouseNode,
    });
  });
});
