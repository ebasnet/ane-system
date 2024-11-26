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
        subject: 'Form Approved! Welcome to BBES',
        html:
        `
        <h1><strong>Welcome to BBES Family</strong></h1>
        <p>
            <h3>Congratulations! ${studentName}</h3>
            Your Form has been approved. For further details and payment procedure login to our website and check your dashboard.
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
