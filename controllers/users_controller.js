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

}

//sign in and create the session for user
module.exports.createSession=function(req,res){
    
}