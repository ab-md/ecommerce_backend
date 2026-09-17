import transporter from "../../config/mailer.config.js";

const sendMail = async (email, subject, text) => {
    await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject,
        text
    });
}

export default sendMail;