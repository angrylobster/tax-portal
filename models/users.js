const sha256 = require('sha256');

module.exports = db => {
    let all = (req, callback) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let user = (req, callback) => {
        db.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows[0]) : callback(null, null);
        })
    }

    let create = (req, callback) => {
        const { email, password, confirmPassword, address, taxRegistration, contactNumber } = req.body;
        let errors = [];

        db.query(`SELECT * FROM users WHERE email='${req.body.email}'`)
            .then(result => {
                errors = [...errors, ...checkUser(req)]
                if (result.rows.length > 0) {
                    errors.push({ email: 'Email already exists' });
                }
            })
            .catch(err => {
                callback({ queryError: err }, null);
            })
            .finally(() => {
                if (errors.length > 0) {
                    callback(null, { email, password, confirmPassword, address, taxRegistration, contactNumber, errors });
                } else {
                    const queryString = `INSERT INTO users (email, password, address, tax_registration, contact_number) VALUES ('${email}', '${sha256(password)}', '${address}', '${taxRegistration}', ${contactNumber}) RETURNING *`;

                    db.query(queryString, (err, result) => {
                        console.log('doing insertion')
                        err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
                    })
                }
            })
    }

    let destroy = (req, callback) => {
        const queryString = `DELETE FROM users WHERE id=${req.body.id}`

        db.query(queryString, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let edit = (req, callback) => {
        const { email, password, confirmPassword, address, taxRegistration, contactNumber } = req.body;
        const errors = [...checkUser(req)];
        if (errors.length > 0) {
            callback(null, { email, password, confirmPassword, address, taxRegistration, contactNumber, errors });
        }
        const editedValues = [];
        Object.keys(req.body).forEach(key => {
            if (key !== 'confirmPassword'){
                editedValues.push(req.body[key]);
            }
        })
        const queryString = `UPDATE users SET email=$1, password=$2, address=$3, tax_registration=$4, contact_number=$5 WHERE id=${parseInt(req.params.id)} RETURNING *`;
        db.query(queryString, editedValues, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let checkUser = req => {
        const { email, password, confirmPassword, address, taxRegistration, contactNumber } = req.body;
        const errors = [];
        if (!email || !email.includes('@')) {
            console.log(!email, !email.includes('@'))
            errors.push({ email: 'Invalid email address' });
        } else if (password.length < 6) {
            errors.push({ password: 'Password needs to be at least 6 characters' });
        } else if (password !== confirmPassword) {
            errors.push({ confirmPassword: 'Confirmation password needs to be the same as your password' });
        } else if (!address) {
            errors.push({ address: 'Address not provided' });
        } else if (!taxRegistration) {
            errors.push({ taxRegistration: 'Tax registration number not provided' });
        } else if (isNaN(parseInt(contactNumber))) {
            errors.push({ contactNumber: 'Contact number is not a number' });
        }
        return errors;
    }

    return {
        all,
        user,
        create,
        destroy,
        edit
    }
}