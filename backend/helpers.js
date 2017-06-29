let crypto = require('crypto');

let getToken = (request) => {
    let header = request.header('Authorization');
    if(header && header.split(' ').length > 1)
        return header.split(' ')[1];
    return false;
};

let genRandomString = (length) => {
    return crypto.randomBytes(Math.ceil(length/2))
        .toString('hex') /** convert to hexadecimal format */
        .slice(0,length);   /** return required number of characters */
};

let sha512 = (password, salt) => {
    let hash = crypto.createHmac('sha512', salt); /** Hashing algorithm sha512 */
    hash.update(password);
    let value = hash.digest('hex');
    return {
        salt:salt,
        passwordHash:value
    };
};

let saltHashPassword = (userpassword, optionalSalt) => {
    let salt = optionalSalt || genRandomString(16); /** Gives us salt of length 16 */

    return sha512(userpassword, salt);
};



module.exports = {
    getToken,
    saltHashPassword
};