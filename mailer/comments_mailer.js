const nodeMailer = require('../config/nodemailer');


module.exports.newComment = (comment) => {
    console.log('inside new comment mailer', comment);

    nodeMailer.transporter.sendMail({
        from: 'nitishkumar07081999@gmail.com',
        to: comment.user.email,
        subject: "New Comment Published",
        html: '<h1> YUP, your comment is now published</h1>'
    },(err,info)=>{
        if(err){console.log('error in sending mail', err); return}

        console.log('Message sent', info);
        return;
    });
}