import nodemailer from 'nodemailer'

const sendForgottenEmailLink = async (email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: true,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });
        const resetLink = 'http://localhost:5000/'
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'No reply <ovigo@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Send Your TRADE VENTURE APP Reset Password Link`,
            html: `<h3>Go to <a href="${resetLink}">link</a> reset your password</h3>`, // html body
        });
        console.log(info)
        return info;
    } catch (error) {
        console.log(error)
        return error;
    }
};

module.exports = {
    sendForgottenEmailLink,
};