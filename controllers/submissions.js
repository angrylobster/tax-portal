module.exports = db => {

    let all = (req, res) => {
        db.submissions.all(req, (err, result) => {
            err ? res.status(400).send({ error: 'There was a query error for submissions' })
            : res.status(200).send(result);
        })
    }

    let submission = (req, res) => {
        db.submissions.submission(req, (err, result) => {
            err ? res.status(400).send({ error: 'No such submission' })
                : res.status(200).send(result);
        })
    }

    let create = (req, res) => {
        db.submissions.create(req, (err, result) => {
            err ? res.status(400).send({ error: err })
                : res.status(200).send(result);
        })
    }

    let destroy = (req, res) => {
        db.submissions.destroy(req, (err, result) => {
            err ? res.status(400).send({ error: 'Error deleting submission' })
                : res.status(200).send(result);
        })
    }

    let edit = (req, res) => {
        db.submissions.edit(req, (err, result) => {
            err ? res.status(400).send({ error: 'Error editing submission' })
                : res.status(200).send(result);
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

