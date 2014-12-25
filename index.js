var fs = require('fs');
var colors = require('colors');
var inquirer = require("inquirer");
var zxcvbn = require("zxcvbn2");

console.log('Reading passwords.txt...');

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
      return;
    } else {
      console.log('Password will be checked in list (' + passwords.length + ')...');
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

    var statistics = zxcvbn(answers['password']);

    var crackTime = statistics.crack_time < 1 ? (statistics.crack_time * 1000) + 'ms' : statistics.crack_time + 's';

    console.log('[STATS] '.magenta + 'You password would be cracked: ' + statistics.crack_time_display.magenta + ' (' + crackTime + ')');
  });

});
