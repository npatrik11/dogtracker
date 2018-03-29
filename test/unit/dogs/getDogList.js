var expect = require('chai').expect;
var getDogListMW = require('../../../middleware/dogs/getDogList');

describe('getDogList middleware ', function () {

    it('Should push dogs to res.tpl.dogs', function (done) {

        var fakeUser = {
            email: 'asd',
            password: 'asd',
            phoneNumber: 'asd'
        };

        var req = {
            session: {
                user: fakeUser
            }
        };

        var res = {
            tpl: {}
        };

        var fakeDogs = ['dog1', 'dog2', 'dog3'];

        var fakeDogModel = {
            find: function (some, cb) {
                cb(undefined, fakeDogs)
            }
        };

        getDogListMW({
            dogModel: fakeDogModel
        })(req, res, function (err) {
            expect(res.tpl.dogs).to.eql(fakeDogs);
            expect(res.tpl.user).to.eql(fakeUser);
            expect(err).to.eql(undefined);
            done();
        });
    });

    it('Should push error to res.tpl.error when db returns error', function (done) {

        var errorMessage = 'Here is and error';

        var res = {
            tpl: {}
        };

        res.tpl.error = [];

        var fakeDogModel = {
            find: function (some, cb) {
                cb(errorMessage, undefined)
            }
        };

        getDogListMW({
            dogModel: fakeDogModel
        })({}, res, function (err) {
            expect(res.tpl.error[0]).to.eql(errorMessage);
            done();
        });
    });
});