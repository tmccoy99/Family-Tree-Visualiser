type PersonData = {
  name: string;
  birthYear: number;
  isAlive: boolean;
  spouse?: PersonNode;
};

class PersonNode {
  private data: PersonData;

  constructor(personData: PersonData) {
    this.data = personData;
  }

  getData(): PersonData {
    return this.data;
  }
}

export = PersonNode;
