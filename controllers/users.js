module.exports = db => {
    let getAll = (req, res) => {
        db.users.getAll(req, (err, result) => {
            !err ? res.status(200).send(result) : console.error(err);
        })
    }

    return {
        getAll
    }
};