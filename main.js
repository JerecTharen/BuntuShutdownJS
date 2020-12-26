/// This script is built to run on Linux or Ubuntu systems.
/// It needs to be run with "sudo" or the shutdown command
/// will not have permissions. This script will shutdown
/// the computer it is on by a default of 30 seconds. Or
/// it will shutdown after the last parsable integer that
/// is passed in when this script was run in seconds.

//Import needed modules
const cmd = require('child_process');

//Set up global variables
let shutdownSeconds = 30;
let secondsPast = 0;

//Parse through arguments passed in and set how long to
//shutdown if a parsable int was passed in.
console.log('arguments', process.argv);
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
  if(Number(val) !== NaN)
    shutdownSeconds = Number(val);
});

console.log(`Shutting down in ${shutdownSeconds} seconds.`);

//Start counting up for the user in order to properly predict when the shutdown will happen.
setInterval(() => {
    secondsPast++;
    console.log(`${secondsPast} seconds have passed.`);
}, 1000);

//Set up the computer to shutdown once the set time has passed.
//NOTE: On my system, this command schedules a shutdown for 60 seconds after the command was entered.
setTimeout(()=>{
    console.log(`Shutting down now that ${shutdownSeconds} have passed.`);
    cmd.exec('sudo shutdown', (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.error(`stderr: ${stderr}`);
      });
}, shutdownSeconds * 1000);
