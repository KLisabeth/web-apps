/* reverse-engineering

  To understand what this exercise should do,
  practice using exercise-9-demo in the terminal

  your task is to reverse-engineer the behavior of the demo

  you'll know you've finished when it's impossible to tell
    if you're using the demo or your exercise
*/

// require dependencies
const fs = require('fs');

// declare constants
const START = Date.now();
const DOC_STRING = `
COMMANDS:

  list
    logs all of the file names in the current directory

  write <fileName> <text>
    writes the <text> the file with <fileName>

  append <fileName> <text>
    appends the <text> the file with <fileName>

FLAGS:

  -h
    print this helpful message
`;

// declare logging function
const log = (logId, value) => console.log(
  `\nlog ${logId}, ${Date.now() - START} ms. \n`,
  value
);


// --- main script ---

// fill in the _'s to reverse-engineer the behavior of exercise-9-demo.min.js

if (process.argv.includes('-h')) {
  log(0, DOC_STRING);
  process.exit(0);
};

const command = process.argv[2];
const fileName = process.argv[3];
const text = process.argv[4];

if (!command) {
  log('1.a', 'a command is required, exiting');
  process.exit(0);
}
log('1.b', 'command: ' + command);

if (command === 'list') {
  log('3', 'reading filenames ...');
  const fileNames = fs.readdirSync(__dirname, 'utf-8');
  log('4', fileNames);
  process.exit(0)
};


if (!fileName) {
  log('2.a', 'a file name is required, exiting');
  process.exit(0);
}
log('2.b', 'fileName: ' + fileName);


if (!text) {
  log('3.a', 'text is required, exiting');
  process.exit(0);
}
log('3.b', 'text: ' + text);


if (command === 'write') {
  log('4.a', 'declaring writeFileCallback');
  const writeFileCallback = (err, contents) => {
    if (err) { console.error(err) };

    log('6.a', 'success!  wrote to ' + fileName)
  };
  fs.writeFile(__dirname + '/' + fileName, text, writeFileCallback);
  log('5.a', 'writing to ' + fileName + ' ...');

} else if (command === 'append') {
  log('4.b', 'declaring appendFileCallback');
  const appendFileCallback = (err) => {
    if (err) { console.error(err) };

    log('6.b', 'success!  appended to ' + fileName);
  };
  fs.appendFile(__dirname + '/' + fileName, text, appendFileCallback);
  log('5.b', 'appending to ' + fileName + ' ...');

} else {
  log('3.c', 'unknown command: ' + command);
}