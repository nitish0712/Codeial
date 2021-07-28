const User = require('../models/user');

module.exports.profile = function(req,res){
    if(req.cookies.user_id){
        User.findById(req.cookies.user_id, function(err,user){
            if(err){console.log('error in finding user'); return;}

            if(user){
                return res.render('user_profile',{
                    title: "User Profile",
                    user: user
                })
            }else{
                return res.redirect('/users/signin');
            }
        });
    }else{
        return res.redirect('/users/signin');
    }
}

//render sign in page
module.exports.signin = function(req,res){
    return res.render('user_sign_in',{
        title: "Codeial | Sign In"
    });
}


//render sign up page
module.exports.signup = function(req,res){
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
    
    //steps to authenticate
    //find the user
    User.findOne({email: req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing in'); return;}
    
        //handle if user found
        if(user){
            //handle password which don't match
            if(user.password != req.body.password){
                return res.redirect('back');
            }

            //handle session creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');

        }else{
            //handle if user not found
            return res.redirect('back');
        }
    });

}


//signout
module.exports.signout=function(req,res){
    
    res.clearCookie('user_id');
    return res.redirect('/users/signin');
}