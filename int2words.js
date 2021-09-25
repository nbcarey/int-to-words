const {int2words_recursive, int2words_iterative} = require('./int-to-words');
const usage = `
Usage: node int2words algorithm value [value...]

where
- 'algorithm' is either 'iterative' or 'recursive', and
- 'value' is a non-negative integer.
`;

/**
 * One or more integer values to be converted into words.
 * @param {number} prices
 */
async function main(algorithm, ...prices) {
  const int2words = getAlgorithm(algorithm);

  if (prices.length === 0 ) {
    throw usage;
  }

  for (const p of prices) {
    const price = Number(p);
    const isValid = Number.isInteger(price) &&
      price >= 0 && // can't have a price less than 0
      price <= 2 ** 31 - 1; // max signed 32-bit two's complement integer
    if (!isValid) {
      throw new Error(`Invalid Price: '${p}'. Must be a non-negative integer less then 2,147,483,648`);
    }

    words = int2words(price);

    console.log(`Input:  ${price}`);
    console.log(`Output: ${words.join(' ')}`);
    console.log();

  }

}

/** gets algorithm */
function getAlgorithm(algorithm) {
  switch (algorithm) {
    case 'recursive': return int2words_recursive;
    case 'iterative': return int2words_iterative;
    default: throw usage;
  }
}

main(...process.argv.slice(2))
    .then((cc) => {
      process.exit(cc ?? 0);
    })
    .catch((e) => {
      console.log(e);
      process.exit(1);
    });
