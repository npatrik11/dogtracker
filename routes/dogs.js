var getDogListMW = require('../middleware/getDogList');
var renderMW = require('../middleware/render');
var uploadDogMW = require('../middleware/uploadDog');
var getDogMW = require('../middleware/getDog');
var checkUserLoggedInMW = require('../middleware/checkUserLoggedIn');
var editDogMW = require('../middleware/editDog');
var deleteDogMW = require('../middleware/deleteDogMW');
var multer = require('multer');
var upload = multer({limits: {fileSize: 2000000 },dest:'./uploads/'});

module.exports = function (app) {

    /**
     * List all the dogs
     */
    app.get('/dogs',
        checkUserLoggedInMW(),
        getDogListMW(),
        renderMW('dogList')
    );

    /**
     * Delete a dog
     * - then redirect to /dogs
     */
    app.use('/dogs/:dogid/delete',
        checkUserLoggedInMW(),
        deleteDogMW()
    );

    /**
     * Edit dog details
     */
    app.get('/dogs/:dogid/edit',
        checkUserLoggedInMW(),
        getDogMW(),
        renderMW('editDog')
    );

    app.post('/dogs/:dogid/edit',
        checkUserLoggedInMW(),
        upload.single('editInputImageFile'),
        editDogMW(),
        renderMW('editDog')
    );

    /**
     * Add new dog
     */
    app.get('/dogs/new',
        checkUserLoggedInMW(),
        renderMW('uploadDog')
    );

    app.post('/dogs/new',
        checkUserLoggedInMW(),
        upload.single('uploadInputImageFile'),
        uploadDogMW(),
        renderMW('uploadDog')
    );


    /**
     * Dog image in big size
     */
    app.get('/dogs/:dogid/image',
        checkUserLoggedInMW(),
        getDogMW(),
        renderMW('dogImage')
    );


};