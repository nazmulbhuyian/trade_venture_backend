import nodemailer from 'nodemailer'

export const sendRegOTP = async (otp: number, email: string) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            secure: false,
            port: 487,
            auth: {
                user: process.env.EMAIL_USERNAME,
                pass: process.env.EMAIL_PASSWORD,
            },
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'No reply <TradeVenture@gmail.com>', // sender address
            to: email, // list of receivers
            subject: `Send Your TRADE VENTURE APP Registration OTP`,
            html: `
                <h3>Your OTP IS ${otp}</h3>
            `, // html body
        });
        console.log(info)
        return info;
    } catch (error) {
        console.log(error)
        return error;
    }
};
