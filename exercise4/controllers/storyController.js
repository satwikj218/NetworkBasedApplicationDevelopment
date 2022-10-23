const model = require('../models/story');

//GET /stories - send all stories to the user
exports.index = (req, res) => {
    let stories = model.find();
    res.render('./story/index', {stories});
};

//GET /stories/new - send html form for creating a new story
exports.new = (req, res) => {
    res.render('./story/new');
};

//POST /stories - create a new story
exports.create = (req, res) => {
    let story = req.body;
    model.save(story);
    res.redirect("/stories");
};

//GET /stories/:id - send details of story identified by id
exports.show = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/show', {story});
    }
    else{
        let err = new Error("Cannot find a story with id " + id);
        err.status = 404;
        next(err);
    }
    
};

//GET /stories/:id/edit - send html form for editing an existing story
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let story = model.findById(id);
    if(story){
        res.render('./story/edit', {story});
    }
    else{
        let err = new Error("Cannot find a story with id " + id);
        err.status = 404;
        next(err);
    }
};

//PUT /stories/:id - update the story identified by id
exports.update = (req, res, next) => {
    let story = req.body;
    let id = req.params.id;

    if(model.updateById(id, story)){
        res.redirect('/stories/'+id);
    }
    else{
        let err = new Error("Cannot find a story with id " + id);
        err.status = 404;
        next(err);
    }
};

//DELETE /stories/:id - delete the story identified by id
exports.delete = (req, res, next) => {
    let id = req.params.id;
    if(model.deleteById(id)){
        res.redirect('/stories/');
    }
    else{
        let err = new Error("Cannot find a story with id " + id);
        err.status = 404;
        next(err);
    }
};