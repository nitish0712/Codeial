const User = require('../models/user');
const fs = require('fs');
const path = require('path');


module.exports.profile = function(req,res){
    User.findById(req.params.id, function(err, user){
        return res.render('user_profile',{
            title: "User Profile",
            profile_user: user
        });
    });
}

module.exports.update = async function(req,res){
    if(req.user.id == req.params.id){

        try{

            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function(err){
                if(err) {console.log('*****Multer Error****', err)}
                
                user.name = req.body.name;
                user.email = req.body.email;

                if(req.file){

                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    //this is saving the file of uploaded file into the avatar field in the user
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                req.flash('success', 'Updated');
                return res.redirect('back');
            });

        }catch(err){
            
            req.flash('error', err);
            return res.redirect('back');
        }
    }else{
        req.flash('error','Unauthorized');
        return res.status(401).send('Unauthorized')
    }
}

//render sign in page
module.exports.signin = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}


//render sign up page
module.exports.signup = function(req,res){
    if(req.isAuthenticated()){
       return res.redirect('/users/profile');
    }
    
    return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
    });
}

//get the sign up data
module.exports.create=function(req,res){
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email: req.body.email}, function(err, user){
        if(err){console.log('error in finding user in signing up'); return;}
    
        if(!user){
            User.create(req.body, function(err,user){
                if(err){console.log('error in creating user while signing up'); return;}
            
                return res.redirect('/users/signin');
            });
        }else{
            return res.redirect('back');
        }
    });
}

//sign in and create the session for user
module.exports.createSession=function(req,res){
    req.flash('success', 'Logged in Successfully');
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    req.flash('success', 'You have logged out Successfully');

    return res.redirect('/');
}

module.exports.reset=function(req,res){
    var email = req.body.email;
    console.log(email);
    return res.render('reset-password',{
        title: "Codeial | Reset Password",
        user: email
    });
}

module.exports.forgot = function(req,res){
    return res.render('forgot-email',{
        title: "Codeial | Reset Password",
        
    });
}

module.exports.resetPassword=function(req,res){

    if(req.body.password != req.body.confirm_password){
        return res.redirect('/users/forgot');
    }

    // var email = req.body.email;
    // console.log(email.id);
    return res.redirect('/users/signin');
    

    // User.findOne({email: req.body.email}, function(err, user){
    //     if(err){console.log('error in finding user in signing up'); return;}
    
    //     if(!user){
    //         User.create(req.body, function(err,user){
    //             if(err){console.log('error in creating user while signing up'); return;}
            
    //             return res.redirect('/users/signin');
    //         });
    //     }else{
    //         return res.redirect('back');
    //     }
    // });
}