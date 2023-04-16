interface FamilyMember {
  name: string;
  birthYear: number;
  deathYear?: number;
  imageURL: string;
  children: FamilyMember[];
  spouse?: FamilyMember;
}

const einstein: FamilyMember = {
  name: 'Albert Einstein',
  birthYear: 1879,
  deathYear: 1955,
  imageURL: '/src/assets/',
  children: [],
};

export { FamilyMember, einstein };
