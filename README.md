# Convert an integer to words

The challenge is to write a function to  convert a non-negative integer to words,
so `1,234` becomes `one thousand two hundred thirty-four`,
and `1000234567` becomes `one million two hundred thirty-four thousand five hundred sixty-seven`,
and so on.

You can assume that the value passed will never exceed the capacity of a 32-bit
integer, so the value will never be larger than billions.

## Prerequisites
- **Node.js**, version 14.* or higher.<br/>
  See https://nodejs.org for installation instructions.

## Installation
This package is not published to NPM, so...

- Clone the repo from Github.
- Open your terminal/shell with this repo as the current directory.
- Execute the command `npm install`.<br/>
  This will install the required dependencies.

## Usage
To execute the unit tests, simply run the command
`npm test` on the command line.

To debug the unit tests, this project is set up with a Visual Studio Code
launch configuration that allows you to debug the unit tests (and thus the
code itself in VS Code). Just set breakpoints in VS Code where you want to stop.

To install Visual Studio Code, visit https://code.visualstudio.com/
(it's a great editor, so you should get it anyway.)

The unit tests are written using `mocha` as the unit test framework, and `chai`
as the assertion framework:

- **Mocha:** https://mochajs.org/
- **Chai:** https://www.chaijs.com/
