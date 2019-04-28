module.exports = (app, db) => {
    const users = require('./controllers/users')(db);
    app.get('/users', users.all);
    app.get('/users/:id', users.user);
    app.post('/users/create', users.create);
    app.delete('/users/destroy', users.destroy);
    app.put('/users/edit/:id', users.edit);
}