const nodeMailer = require('../config/nodemailer');


module.exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate({comment: comment}, '/comments/new_comment.ejs');

    nodeMailer.transporter.sendMail({
        from: 'nitishkumar07081999@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: htmlString
    },(err,info)=>{
        if(err){console.log('error in sending mail', err); return}

        console.log('Message sent', info);
        return;
    });
}