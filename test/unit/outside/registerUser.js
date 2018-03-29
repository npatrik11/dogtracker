var expect = require('chai').expect;
var registerUserMW = require('../../../middleware/outside/registerUser');

describe('registerUser middleware ', function () {

    it('Should push errors to res.tpl.error when fields are not filled', function (done) {

        var req = {
            body: {
                registerInputEmail: '',
                registerInputPassword: '',
                registerInputPhoneNumber: ''
            }
        };

        var res = {
            tpl: {}
        };

        res.tpl.error = [];

        registerUserMW({})(req, res, function (err) {
            expect(res.tpl.error.length).to.eql(3);
            done();
        });
    });

    it('Should push error to res.tpl.error when find user database call returns error', function (done) {

        var req = {
            body: {
                registerInputEmail: 'asd@asd.com',
                registerInputPassword: 'asd',
                registerInputPhoneNumber: '1234'
            }
        };

        var errorMessage = 'Here is and error';

        var res = {
            tpl: {}
        };

        res.tpl.error = [];

        var fakeUserModel = {
            find: function (some, cb) {
                cb(errorMessage, undefined)
            }
        };

        registerUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error.length).to.eql(1);
            expect(res.tpl.error[0]).to.eql(errorMessage);
            done();
        });
    });

    it('Should push error message with request body email to res.tpl.error when user with email already exists in database', function (done) {

        var req = {
            body: {
                registerInputEmail: 'asd@asd.com',
                registerInputPassword: 'asd',
                registerInputPhoneNumber: '1234'
            }
        };

        var res = {
            tpl: {}
        };

        res.tpl.error = [];

        var fakeUserModel = {
            find: function (some, cb) {
                cb(undefined, [{email:'asd@asd.com'}])
            }
        };

        registerUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error.length).to.eql(1);
            expect(res.tpl.error[0]).contains(req.body.registerInputEmail);
            done();
        });
    });

    it('Should push error to res.tpl.error when create user database call returns error', function (done) {

        var req = {
            body: {
                registerInputEmail: 'asd@asd.com',
                registerInputPassword: 'asd',
                registerInputPhoneNumber: '1234'
            }
        };

        var errorMessage = 'Here is and error';

        var res = {
            tpl: {}
        };

        res.tpl.error = [];

        var fakeUserModel = {
            find: function (some, cb) {
                cb(undefined, [])
            },
            create: function (some, cb) {
                cb(errorMessage, undefined)
            }
        };

        registerUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
            expect(res.tpl.error[0]).to.eql(errorMessage);
            done();
        });
    });

    it('Should redirect to /login when user successfully created without errors', function (done) {

        var req = {
            body: {
                registerInputEmail: 'asd@asd.com',
                registerInputPassword: 'asd',
                registerInputPhoneNumber: '1234'
            }
        };

        var res = {
            tpl: {},
            redirect: function (to) {
                expect(to).to.eql('/login');
                done();
            }
        };

        res.tpl.error = [];

        var fakeUserModel = {
            find: function (some, cb) {
                cb(undefined, [])
            },
            create: function (some, cb) {
                cb(undefined, [{email: 'asd@asd.com'}])
            }
        };

        registerUserMW({
            userModel: fakeUserModel
        })(req, res, function (err) {
    
        });
    });

});