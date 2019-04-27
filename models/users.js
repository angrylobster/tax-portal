module.exports = db => {
    let all = (req, callback) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback (null, result.rows) : callback(null, null);
        })
    }

    return {
        all
    }
}