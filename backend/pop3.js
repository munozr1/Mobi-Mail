const sqlite3 = require('sqlite3')

function processCommand(command) {
  let db = new sqlite3.Database('emaildb');
  switch(command) {
    case "USER":
      break;
    case "PASS":
      //TODO:commands.PASS();
      break;
    case "STAT":
     //TODO: commands.STAT();
      break;
    case "QUIT":
     //TODO: commands.QUIT();
      break;
    case "LIST":
     //TODO: commands.LIST();
      break;
    default:
      // Handle unknown command
      break;
  }
}
