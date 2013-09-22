var fs = require('fs');
var colors = require('colors');
var inquirer = require("inquirer");

console.log('Reading passwords.txt...'.magenta);

fs.readFile('passwords.txt', 'utf8', function (err, passwordData) {

  var passwords = passwordData.split('\n');

  if(err) {
    console.error('password.txt ist could not be read'.red);
  }

  inquirer.prompt([{
    name: 'password',
    type: "password",
    message: 'type your password'
  }], function(answers) {

    var pwdWasFound = false;

    if(!answers['password']) {
      console.error('Please type a password'.red);
    } else {
      console.log('Password will be checked in list ('.magenta + passwords.length + ')...'.magenta);
    }

    passwords.forEach(function (password) {
      if(password === answers['password']) {
        pwdWasFound = true;
        return;
      }
    });

    if(!pwdWasFound) {
      console.error('[SUCCESS]'.green + ' Your password was not found!');
    } else {
      console.error('[ATTENTION]'.red + ' Your password was found!');
    }
  });

});
