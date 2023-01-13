const bcrypt = require('bcrypt');
const saltRounds = 10;
const password = 'Dinasefhas28!ousjjoJJLn2bH9!@';

bcrypt
  .hash(password, saltRounds)
  .then((hash) => {
    userHash = hash;
    console.log('Hash ', hash);
    validateUser(hash);
  })
  .catch((err) => console.error(err.message));

function validateUser(hash) {
  bcrypt
    .compare(password, hash)
    .then((res) => {
      console.log(res); // return true
    })
    .catch((err) => console.error(err.message));
}

validateUser();
