const bcrypt = require('bcrypt');
const saltRounds = 100;
const myPlaintextPassword = 'd';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
        // Store hash in your password DB.
        console.log(myPlaintextPassword)
        console.log(salt)
        console.log(hash)
    });
});

let hash='$2b$10$XB3glpq45VIIYwUb53/Z2eNdgEA9bGXsg6ebnWozqW.X0U2Eak/xm'
bcrypt.compare(myPlaintextPassword, hash, function(err, res) {
    // res == true
    console.log(res)
});
bcrypt.compare(someOtherPlaintextPassword, hash, function(err, res) {
    // res == false
});