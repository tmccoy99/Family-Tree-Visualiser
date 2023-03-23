import PersonNode from '../src/PersonNode'

describe('PersonNode testing', () => {
  test('PersonNode with suitable data can have data fetched', () => {
    const node = new PersonNode({name: 'Jerry Smith', birthYear: 1999, isAlive: true})
    expect(node.getData()).toEqual({name: 'Jerry Smith', birthYear: 1999, isAlive: true})
  })
})
