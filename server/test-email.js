import nodemailer from 'nodemailer';

async function main() {
    // Generate test SMTP service account
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test Account:', {
        user: testAccount.user,
        pass: testAccount.pass
    });

    // Create a transporter
    const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });

    // Send test email
    const info = await transporter.sendMail({
        from: '"Test" <test@example.com>',
        to: "it@chem-labs.com",
        subject: "Test Email",
        text: "This is a test email",
        html: "<b>This is a test email</b>"
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

main().catch(console.error);
