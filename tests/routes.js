const chai = require('chai');
const app = require('../index');
const chaiHttp = require('chai-http');
const sha256 = require('sha256');

chai.use(chaiHttp);
chai.should();

describe('Users routes', () => {

    describe('GET /users', () => {
        it('should get all users', done => {
            chai.request(app)
                .get('/users')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    })

    describe('GET /users/:id', () => {
        const id = 1;
        it('should get a single user', done => {
            chai.request(app)
                .get(`/users/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })

        it('should not get a single user if id is invalid', done => {
            chai.request(app)
                .get('/users/string')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    })

    describe('POST /users/create', () => {
        // it('should create a user', done => {
        //     chai.request(app)
        //         .post('/users/create')
        //         .send({
        //             email: 'email',
        //             password: 'password',
        //             address: 'address',
        //             taxRegistration: 'taxRegistration',
        //             contactNumber: 1234567
        //         })
        //         .end((err, res) => {
        //             res.should.have.status(200);
        //             done();
        //         })
        // })

        it('should throw an error if the email already exists', done => {
            chai.request(app)
                .post('/users/create')
                .send({
                    email: 'email@email.com', 
                    password: sha256('password'), 
                    confirmPassword: sha256('password'),
                    address: 'address',
                    taxRegistration: '7654321',
                    contactNumber: '1234567'
                })
                .end((err, res) => {
                    res.should.have.status(403);
                    done();
                })
        })
    })

    describe('DELETE /users/destroy', () => {
        it('should delete a user', done => {
            const id = 1;
            chai.request(app)
                .delete(`/users/destroy`)
                .send({
                    id: id
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

    describe('PUT /users/edit/:id', () => {
        it('should edit a user', done => {
            const id = 1;
            chai.request(app)
                .put(`/users/edit/${id}`)
                .send({
                    email: 'editedemail@editedemail.com',
                    password: 'editedpassword',
                    confirmPassword: 'editedpassword',
                    address: 'editedaddress',
                    taxRegistration: 'editedTaxRegistration',
                    contactNumber: 12345678
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

});

describe('Submissions routes', () => {

    describe('GET /submissions', () => {
        it('should get all submissions', done => {
            chai.request(app)
                .get('/submissions')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        })
    })

    describe('GET /submissions/:id', () => {
        const id = 1;
        it('should get a single submission', done => {
            chai.request(app)
                .get(`/submissions/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })

        it('should not get a single user if id is invalid', done => {
            chai.request(app)
                .get('/submissions/string')
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                })
        })
    })

    describe('POST /submissions/create', () => {
        const jsonObject = {'key': 'value', 'anotherKey': 'anotherValue'}
        it('should create a submission', done => {
            chai.request(app)
                .post('/submissions/create')
                .send({
                    submission: JSON.stringify(jsonObject),
                    userId: 1,
                    year: 2019,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

    describe('DELETE /submissions/destroy', () => {
        it('should delete a submission', done => {
            const id = 1;
            chai.request(app)
                .delete(`/submissions/destroy`)
                .send({
                    id: id
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

    describe('PUT /submissions/edit/:id', () => {
        const jsonObject = {'submission': 'value', 'anotherKey': 'anotherValue'}
        it('should edit a submission', done => {
            const id = 1;
            chai.request(app)
                .put(`/submissions/edit/${id}`)
                .send({
                    submission: JSON.stringify(jsonObject),
                    userId: 1,
                    year: 2019,
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                })
        })
    })

});