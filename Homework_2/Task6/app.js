const yargs = require('yargs'); 
const  operators = {
    '+': function(a, b) { return a + b; },
    '-': function(a, b) { return a - b; },
    '*': function(a, b) { return a * b; },
    '/': function(a, b) { return a / b; },
    ':': function(a, b) { return a / b; }
};
var { argv } = yargs.scriptName("Calculator")
  .option("a", {
    alias: "firstNum",
    describe: "First number",
    demandOption: "The First number is required.",
    type: "number",
    nargs: 1,
  })
  .option("b", {
    alias: "secNum",
    describe: "Second number",
    demandOption: "The Second number is required.",
    type: "number",
    nargs: 1,
  })
  .option("operator", {
    alias: "operator",
    describe: "Operator",
    demandOption: "Operator is required.",
    type: "string",
    nargs: 1,
  })
  .describe("help", "Show help.") 

  const { a, b, operator } = argv;

  console.log(a);
  console.log(b);
  console.log("Result for "+ a.toString() + operator + b.toString() + " is " + operators[operator](a,b));