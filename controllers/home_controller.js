const Post = require('../models/post');
 
 module.exports.home = function(req,res){
    //res.cookie('user_id',11); 


    // Post.find({}, function(err, posts){
    //     return res.render('home',{
    //         title: "Codeial | Home",
    //         posts: posts
    //     });
    // });

    // populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path: 'comments',
        populate:{
            path: 'user'}
    })
    .exec(function(err,posts){
        return res.render('home',{
            title: "Codeial | Home",
            posts: posts
        });
    });
}

//  module.exports.base = function(req,res){
//     return res.end('<h1>Base!</h1>');
// }

