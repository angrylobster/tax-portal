module.exports = db => {
    let all = (req, callback) => {
        db.query(`SELECT * FROM submissions`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }
    let submission = (req, callback) => {
        db.query(`SELECT * FROM submissions WHERE id=${req.params.id}`, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows[0]) : callback(null, null);
        })
    }

    let create = (req, callback) => {
        const queryString = `INSERT INTO submissions (submission, user_id, year) VALUES ('${req.body.submission}', '${req.body.userId}', '${req.body.year}') RETURNING *`;

        db.query(queryString, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let destroy = (req, callback) => {
        const queryString = `DELETE FROM submissions WHERE id=${req.body.id}`

        db.query(queryString, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    let edit = (req, callback) => {
        const editedValues = [];
        Object.keys(req.body).forEach(key => {
            editedValues.push(req.body[key]);
        })
        const queryString = `UPDATE submissions SET submission=$1, user_id=$2, year=$3 WHERE id=${parseInt(req.params.id)} RETURNING *`;

        db.query(queryString, editedValues, (err, result) => {
            err ? callback(err, null) : result.rows ? callback(null, result.rows) : callback(null, null);
        })
    }

    return {
        all,
        submission,
        create,
        destroy,
        edit
    }
}