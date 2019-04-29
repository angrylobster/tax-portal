module.exports = (app, db) => {
    const users = require('./controllers/users')(db);
    app.get('/users', users.all);
    app.get('/users/:id', users.user);
    app.post('/users/create', users.create);
    app.delete('/users/destroy', users.destroy);
    app.put('/users/edit/:id', users.edit);

    const submissions = require('./controllers/submissions')(db);
    app.get('/submissions', submissions.all);
    app.get('/submissions/:id', submissions.submission);
    app.post('/submissions/create', submissions.create);
    app.delete('/submissions/destroy', submissions.destroy);
    app.put('/submissions/edit/:id', submissions.edit);

}