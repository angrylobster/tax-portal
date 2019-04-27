module.exports = (app, db) => {
    const users = require('./controllers/users')(db);
    app.get('/users', users.all)
}