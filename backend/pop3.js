const sqlite3 = require('sqlite3')

let db = new sqlite3.Database('emaildb');


function processCommand(command) {
  let db = new sqlite3.Database('emaildb');
  switch(command) {
    case "USER":
      break;
    case "QUIT":
     //TODO: commands.QUIT();
      break;
    case "LIST":
     //TODO: commands.LIST();
      break;
    case "RETR":
      //TODO: commands.RETR();
      break;
    default:
      // Handle unknown command
      break;
  }
}
