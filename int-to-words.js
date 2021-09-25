exports = module.exports = {
  group2words,
  int2words_recursive,
  int2words_iterative,
  toGroups,
};

/**
 * Convert a non-negative integer to words recursively
 * @param {number} n - a non-negative integer
 *
 * @returns {string[]}
 */
function int2words_recursive(n) {
  // is this value a special?
  if ( map.has(n) ) {
    // if so, simply convert it to a word and return it.
    // This takes care of the special case of zero.
    return [ map.get(n) ];
  }

  const words = toWords(n, 0 );
  return words;

  /** The recursive core. */
  function toWords(n, p ) {
    const words = [];

    // is n less than 1000?
    if (n < 1000) {
      // if so, we're done.
      words.push( ...group2words(n, suffixes[p] ) );
      return words;
    }

    // if n >= 1000...

    // split n into quotient and remainder modulo 1000
    const q = Math.floor( n / 1000 );
    const r = n % 1000;

    // recurse down to get all the words to the left of this group
    words.push( ...toWords( q, p+1 ) );
    // finally, add all the words for this group
    words.push( ...group2words(r, suffixes[p]) );

    return words;
  }

}

/**
 * Convert a non-negative integer to words iteratively
 * @param {number} n - a non-negative integer
 */
function int2words_iterative(n) {
  // this is a whole chain of things:
  // - partition the value into a list of its 3-digit groups
  // - reverse that, so we can use the offset of the group within the list to get the desired suffix/group name
  // - map each groups value into a phrase (a list of the words for that group), including the group name
  // - reduce that list-of-lists by flattening it (and reversing it again) so that things come out int the
  //   correct order.
  //
  // So... if we start with 1,234,567,890...
  //
  // - toGroups() gives us [ 1, 234, 567, 890 ], and
  // - reverse()` gives us [ 890, 567, 234, 1 ], and
  // - map() gives us
  //    [
  //      [ 'eight', 'hundred', 'ninety' ],
  //      [ 'five', 'hundred', 'sixty-seven', 'thousand' ],
  //      [ 'two', 'hundred', 'thirty-four', 'million' ],
  //      [ 'one', 'billion' ]
  //    ]
  // - and finally....
  // - reduce() gives us the final result:
  //   [ 'one', 'billion', 'two', 'hundred', 'thirty-four', 'million' ],
  //    'five', 'hundred', 'sixty-seven', 'thousand' 'eight', 'hundred', 'ninety',
  //   ]
  //
  const words = toGroups(n)
      .reverse()
      .map( (v, i) => group2words(v, suffixes[i] ) )
      .reduce( (acc, grp) => {
        acc.unshift( ...grp ); // adds to the beginning of the array, thus reversing the list.
        return acc;
      }, []);
  return words;
}

/**
 * partition a number into a list of 3-digit groups
 * @param {number} n
 */
function toGroups(n) {
  const groups = [];
  let q = n;
  do {
    groups.unshift( q % 1000 );
    q = Math.floor( q / 1000 );
  } while ( q );

  // groups are in the order one would expect:
  // 1,234,567,890 --> [1, 234, 567, 890 ]
  return groups;
}

/**
 * Convert a single group (0-999) into words (e.g., 123 --> one hundred twenty-three)
 * @param {number} grp - non-negative integer group value (0-999)
 * @param {string} [grpName] - optional suffix ('thousands', 'millions'...)
 * @returns {string[]}
 */
function group2words( grp, grpName = undefined ) {
  // sentence accumulator
  const words = [];

  // Groups with a zero value are not expressed
  // (except for the last segment that doesn't contain a suffix)
  // 1,000,234 --> one million zero thousand two hundred thirty-four
  // makes no sense.
  if (grp > 0 || !grpName ) {
    // split off the hundreds digit, leaving the tens- and ones- digits
    const hundreds = Math.floor( grp / 100 );
    const tensAndOnes = grp % 100;

    // is there a non-zero hundreds digit?
    if (hundreds) {
      // convert that non-zero hundreds digit to 'xxxx hundred'
      // and add to the end of the sentence
      words.push( map.get(hundreds), 'hundred');
    }

    // are the 10s-and-1s a special?
    if (map.has(tensAndOnes)) {
      // tensAndOnes is a special (0-19, 20, 30, 40, 50, 60, 70, 80, or 90)
      // so convert it to its word.

      // but only...
      // if it's got a hundreds digit and a non-zero 10s-and-1s
      // because 'one hundred zero' makes no sense.
      if ( !hundreds || tensAndOnes !== 0 ) {
        // add the word to the end of the sentence
        words.push( map.get(tensAndOnes) );
      }

    } else {
      // tensAndOnes is in the range 21-99, but is not an integral multiple of 10

      // split the 10s-and-1s into a tens digit and a ones digit
      const tensDigit = Math.floor( tensAndOnes / 10 ) * 10;
      const onesDigit = tensAndOnes % 10;

      // map each to its word
      const tensWord = map.get(tensDigit);
      const onesWord = map.get(onesDigit);

      // splice them together with a hyphen.
      const word = `${tensWord}-${onesWord}`;

      // and add to the end of the sentence
      words.push( word );

    }

    // did we get a group name suffix?
    if (grpName) {
      // if so, add that to the end of the sentence
      words.push( grpName );
    }

  }

  // return the completed sentence
  return words;
}

const map = new Map([

  [ 0, 'zero' ],
  [ 1, 'one' ],
  [ 2, 'two' ],
  [ 3, 'three' ],
  [ 4, 'four' ],
  [ 5, 'five' ],
  [ 6, 'six' ],
  [ 7, 'seven' ],
  [ 8, 'eight' ],
  [ 9, 'nine' ],

  [ 10, 'ten' ],
  [ 11, 'eleven' ],
  [ 12, 'twelve' ],
  [ 13, 'thirteen' ],
  [ 14, 'fourteeen' ],
  [ 15, 'fifteen' ],
  [ 16, 'sixteen' ],
  [ 17, 'seventeen' ],
  [ 18, 'eighteen' ],
  [ 19, 'nineteen' ],

  [ 20, 'twenty' ],
  [ 30, 'thirty' ],
  [ 40, 'fourty' ],
  [ 50, 'fifty' ],
  [ 60, 'sixty' ],
  [ 70, 'seventy' ],
  [ 80, 'eighty' ],
  [ 90, 'ninety' ],

]);


const suffixes = [
  undefined,
  'thousand',
  'million',
  'billion',
];

