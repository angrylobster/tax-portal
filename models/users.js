module.exports = db => {
    let all = (req, callback) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let user = (req, callback) => {
        db.query(`SELECT * FROM users WHERE id=${req.params.id}`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let create = (req, callback) => {
        const queryString = `INSERT INTO users (email, password, address, tax_registration, contact_number) VALUES ('${req.body.email}', '${req.body.password}', '${req.body.address}', '${req.body.taxRegistration}', ${req.body.contactNumber}) RETURNING *`;

        db.query(queryString, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let destroy = (req, callback) => {
        const queryString = `DELETE FROM users WHERE id=${req.body.id}`

        db.query(queryString, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let edit = (req, callback) => {
        const editedValues = [];
        Object.keys(req.body).forEach(key => {
            editedValues.push(req.body[key]);
        })
        const queryString = `UPDATE users SET email=$1, password=$2, address=$3, tax_registration=$4, contact_number=$5 WHERE id=${parseInt(req.params.id)} RETURNING *`;

        db.query(queryString, editedValues, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    return {
        all,
        user,
        create,
        destroy,
        edit
    }
}