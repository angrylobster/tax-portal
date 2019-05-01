module.exports = db => {
    let all = (req, res) => {
        db.users.all(req, (err, result) => {
            err ? res.status(400).send({ error: 'There was a query error for users' })
                : res.status(200).send(result);
        })
    }

    let user = (req, res) => {
        db.users.user(req, (err, result) => {
            err ? res.status(400).send({ error: 'No such user' })
                : res.status(200).send(result);
        })
    }

    let create = (req, res) => {
        db.users.create(req, (err, result) => {
            if (err){
                res.status(400).json({ queryError: 'There was an error in creating the user' });
            } else if (result.errors && result.errors.length > 0) {
                res.status(403).json(result);
            } else {
                res.status(200).json(result);
            }
        })
    }

    let destroy = (req, res) => {
        db.users.destroy(req, (err, result) => {
            err ? res.status(400).send({ error: 'Error deleting user' })
                : res.status(200).send(result);
        })
    }

    let edit = (req, res) => {
        db.users.edit(req, (err, result) => {
            if (err){
                res.status(400).send({ queryError: 'There was an error in editing the user' });
            } else if (result.errors && result.errors.length > 0) {
                res.status(403).send(result);
            } else {
                res.status(200).send(result);
            }
        })
    }

    return {
        all,
        user,
        create,
        destroy,
        edit
    }
};