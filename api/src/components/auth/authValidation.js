const { expect } = require('chai');

const { describe, before, it } = require('mocha');
const { createToken } = require('../../jwt');

const inputData = [];
const expectedResult = 0;

function functionToTest(data) {
  return data.length;
}

describe('First test', () => {
  before('Before hook', () => {
    console.log('Before hook ran');
    const token = createToken({
      name: 'Francisco',
      lastname: 'Pepe Mantero',
      email: 'franciscopm1982@gmail.com',
      role: 'admin',
    });

    console.log('token');
  });

  it('Test', () => {
    expect(functionToTest(inputData)).to.eql(expectedResult);
  });
});
