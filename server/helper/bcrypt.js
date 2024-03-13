const bcrypt = require('bcryptjs')

const hashPassword = (defaultPassword) =>{
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(defaultPassword, salt);

    return hash
}

const comparePassword = (defaultPassword,hashedPassword) =>{
    let compare = bcrypt.compareSync(defaultPassword, hashedPassword);

    return compare
}

module.exports = {hashPassword,comparePassword}
