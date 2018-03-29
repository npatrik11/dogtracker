var getDogListMW = require('../middleware/dogs/getDogList');
var renderMW = require('../middleware/common/render');
var uploadDogMW = require('../middleware/dogs/uploadDog');
var getDogMW = require('../middleware/dogs/getDog');
var checkUserLoggedInMW = require('../middleware/common/checkUserLoggedIn');
var editDogMW = require('../middleware/dogs/editDog');
var deleteDogMW = require('../middleware/dogs/deleteDog');
var multer = require('multer');
var upload = multer({limits: {fileSize: 2000000 },dest:'./uploads/'});

var dogModel = require('../models/dog');

module.exports = function (app) {

    var objectRepository = {
      dogModel: dogModel
    };

    /**
     * List all the dogs
     */
    app.get('/dogs',
        checkUserLoggedInMW(),
        getDogListMW(objectRepository),
        renderMW('dogList')
    );

    /**
     * Delete a dog
     * - then redirect to /dogs
     */
    app.use('/dogs/:dogid/delete',
        checkUserLoggedInMW(),
        deleteDogMW(objectRepository)
    );

    /**
     * Edit dog details
     */
    app.get('/dogs/:dogid/edit',
        checkUserLoggedInMW(),
        getDogMW(objectRepository),
        renderMW('editDog')
    );

    app.post('/dogs/:dogid/edit',
        checkUserLoggedInMW(),
        upload.single('editInputImageFile'),
        editDogMW(objectRepository),
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
        uploadDogMW(objectRepository),
        renderMW('uploadDog')
    );


    /**
     * Dog image in big size
     */
    app.get('/dogs/:dogid/image',
        checkUserLoggedInMW(),
        getDogMW(objectRepository),
        renderMW('dogImage')
    );


};