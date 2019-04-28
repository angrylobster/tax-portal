module.exports = db => {
    let all = (req, res) => {
        db.users.all(req, (err, result) => {
            err ? res.status(400).send({ error: 'There was a query error' })
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
            err ? res.status(400).send({ error: 'Error creating user' })
                : res.status(200).send(result);
        })
    }

    let destroy = (req, res) => {
        db.users.destroy(req, (err, result) => {
            err ? res.status(400).send({ error: 'Error deleting user' })
                : res.status(200).send(result);
        })
    }

    let edit = (req, res) => {
        console.log('edit', req);
        db.users.edit(req, (err, result) => {
            err ? res.status(400).send({ error: 'Error editing user' })
                : res.status(200).send(result);
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