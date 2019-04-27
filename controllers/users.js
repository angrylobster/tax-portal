module.exports = db => {
    let getAll = (req, res) => {
        db.users.getAll(req, (err, result) => {
            err ? res.status(400).send({error: 'There was a query error'}) 
                : res.status(200).send(result);
        })
    }

    return {
        getAll
    }
};