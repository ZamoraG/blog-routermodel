const express = require('express');
const router = express.Router();
const {ListBPost} = require('./blog-post-model');

router.get('/blog-posts/:author', (req, res, next) => {
    let bAuthor = req.params.author;

    if(!bAuthor){
        res.status(406).json({
            message: "No author field sent in parameters",
            status: 406
        });
    }

	const postauth = ListBPost.getauth(bAuthor);

    if(postauth.length <= 0){
         res.status(404).json({
            message : "Author doesn't exist in the blog",
            status : 404
        });
        next();
    }else{
        res.status(200).json({
            message: "Blog Posts sent",
            status: 200,
            found: postauth
        });
        next();
    }    
});

router.post('/blog-posts', (req, res, next) => {

    let bFields = ['title', 'content', 'author', 'publishDate'];
    let npost = req.body;

    for (let i = 0; i < bFields.length; i++){
        let currentField = bFields[i];
        if(!(currentField in req.body)){
            res.status(406).json({
                message : `Missing field ${currentField} in body`,
                status : 406
            });
            next();
        }
    }

    const BPost = ListBPost.PostAdd(npost);

    res.status(201).json({
        message: "Post entry added",
        status: 201,
        post: BPost
    });
    next()
});

router.put('/blog-posts/:id', (req, res, next) => {
    let pathId = req.params.id;
    let pUpdate = req.body;
    
    
    if(!pathId){
        res.status(406).json({
            message: "Missing field id in path",
            status: 406
        });
    }

    const Update = ListBPost.UpdPost(pathId, pUpdate);

    if (Update == true){
    	res.status(200).json({
                message: "Successfully updated post",
                status: 200
            });	
    	next();
    } else {
    	res.status(404).json({
	        message: 'ID does not exist',
	        status: 404,
	    });
	    next();
    }

});

router.delete('/blog-posts/:id', (req, res, next) => {
    let removalId = req.body.id;
    let pId = req.params.id;
    

    if(!pId){
        res.status(406).json({
            message: "id in parameters is required",
            status: 406
        });
        next();
    }

    if(!removalId){
        res.status(406).json({
            message: "id in body is required",
            status: 406
        });
        next();
    }

    const Delbool = ListBPost.DelPost(removalId, pId);
    if (Delbool == true) {
    	res.status(201).json({
                message: "Post deleted ",
                status: 201
            });
    	next();
    } else {
    	res.status(404).json({
        message: "Post not found",
        status: 404
    });
    next();
    }
});

module.exports = router;