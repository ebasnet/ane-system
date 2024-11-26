const nodemailer = require('nodemailer');

require('dotenv').config();
const gmail_address = process.env.GMAIL_ADDRESS
const gmail_password = process.env.GMAIL_APP_PASSWORD

async function sendMail(studentName, studentEmail) {

    // Create a transporter object using your Gmail credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: gmail_address,
            pass: gmail_password
        }
    });

    // Set up email data
    const mailOptions = {
        from: `Blue Bird English School <${gmail_address}>`,
        to: studentEmail,
        subject: 'Your Form has been Rejected!',
        html:
        `
        <p>
            <h2>${studentName}! We are sorry to inform you that your form has been rejected.</h2>
            <strong>Login to our website for further queries.</strong>
        </p>
        `
    };
    

    // Send mail with defined transport object
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return

    } catch (error) {
        throw new Error('Failed to send email');
    }


}

module.exports = sendMail;
