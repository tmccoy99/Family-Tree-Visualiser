type Person = { name: string; birthYear: number; isAlive: boolean };

class PersonNode {
  data: Person;

  constructor(person: Person) {
    this.data = person;
  }

  getData(): Person {
    return this.data;
  }
}

export = PersonNode;
