 module.exports.home = function(req,res){
    //res.cookie('user_id',11); 
    return res.render('home',{
         title: "Home"
     });
 }

//  module.exports.base = function(req,res){
//     return res.end('<h1>Base!</h1>');
// }

