const {expect} = require('chai');
const {
  group2words,
  int2words_recursive,
  int2words_iterative,
  toGroups,
} = require('./int-to-words.js');

const testCases = [
  {value: 0, expected: [ 'zero' ]},
  {value: 13, expected: [ 'thirteen']},
  {value: 23, expected: [ 'twenty-three']},
  {value: 100, expected: [ 'one', 'hundred' ]},
  {value: 112, expected: [ 'one', 'hundred', 'twelve']},
  {value: 1234, expected: [ 'one', 'thousand', 'two', 'hundred', 'thirty-four']},
  {value: 1234000987, expected: ['one', 'billion', 'two', 'hundred', 'thirty-four', 'million', 'nine', 'hundred', 'eighty-seven']},
  {
    value: 1234567890,
    expected: [
      'one', 'billion',
      'two', 'hundred', 'thirty-four', 'million',
      'five', 'hundred', 'sixty-seven', 'thousand',
      'eight', 'hundred', 'ninety',
    ],
  },
];

describe('group2words()', function() {

  it('returns an empty list for zero with a group name', function() {
    const words = group2words(0, 'thousand');
    expect(words).to.deep.equal([]);
  });
  it('returns \'zero\' for zero without a group name', function() {
    const words = group2words(0);
    expect(words).to.deep.equal(['zero']);
  });
  it('returns the expected value(s)', function() {
    const testCases = [
      {value: 1, expected: [ 'one' ]},
      {value: 20, expected: ['twenty' ]},
      {value: 15, expected: ['fifteen' ]},
      {value: 35, expected: ['thirty-five']},
      {value: 100, expected: ['one', 'hundred' ]},
      {value: 123, expected: ['one', 'hundred', 'twenty-three']},
    ];

    for (const tc of testCases ) {
      const actual = group2words(tc.value);
      expect(actual).to.deep.equal(tc.expected);
    }

  });

});

describe('int2words_recursive()', function() {
  it('returns the expected values', function() {

    for (const tc of testCases) {
      const actual = int2words_recursive(tc.value);
      expect(actual).to.deep.equal(tc.expected);
    }

  });
});

describe('int2words_iterative()', function() {
  it('returns the expected values', function() {

    for (const tc of testCases) {
      const actual = int2words_iterative(tc.value);
      expect(actual).to.deep.equal(tc.expected);
    }

  });
});

describe('toGroups()', function() {
  it('returns the expected results', function() {
    /* eslint-disable no-multi-spaces, comma-spacing */
    expect(toGroups( 1234567890 )).to.deep.equal([   1 , 234 , 567 , 890 ]);
    expect(toGroups(  123456789 )).to.deep.equal([       123 , 456 , 789 ]);
    expect(toGroups(   12345678 )).to.deep.equal([        12 , 345 , 678 ]);
    expect(toGroups(    1234567 )).to.deep.equal([         1 , 234 , 567 ]);
    expect(toGroups(     123456 )).to.deep.equal([             123 , 456 ]);
    expect(toGroups(      12345 )).to.deep.equal([              12 , 345 ]);
    expect(toGroups(       1234 )).to.deep.equal([               1 , 234 ]);
    expect(toGroups(        123 )).to.deep.equal([                   123 ]);
    expect(toGroups(         12 )).to.deep.equal([                    12 ]);
    expect(toGroups(          1 )).to.deep.equal([                     1 ]);
    expect(toGroups(          0 )).to.deep.equal([                     0 ]);
    /* eslint-enable no-multi-spaces, comma-spacing */
  });
});
