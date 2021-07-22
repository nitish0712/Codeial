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