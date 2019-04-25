

module.exports = db => {
    let getAll = (req, callback) => {
        db.query(`SELECT * FROM users`, (err, result) => {
            if (err) {
                callback(err, null);
            }
            if (result.rows){
                callback(null, result.rows);
            } else {
                callback(null, null);
            }
        })
    }

    return {
        getAll
    }
}