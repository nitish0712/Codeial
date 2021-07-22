module.exports.signin = function(req,res){
    res.render('sign_in',{
        title: "Sign In"
    });
}

module.exports.signup = function(req,res){
    res.render('sign_up',{
        title: "Sign Up"
    });
}