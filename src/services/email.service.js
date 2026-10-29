require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Error connecting to email server:", error);
  } else {
    console.log("Email server is ready to send messages");
  }
});

// Function 

const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"Backend Transaction System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            text,
            html
        });

        console.log("Email sent successfully:", info.messageId);
        return info;

    } catch (error) {
        console.error("Email sending failed:", error);
        throw error;
    }
};



// it is concept of sending the email on the your account  
async function sendRegistrationEmail(userEmail, name) {
    try {
        const subject = "Welcome to Backend Transaction System!";

        const text = `Hello ${name}, your registration was successful!`;

        const html = `<h1>Welcome ${name}!</h1>
                      <p>Your registration was successful.</p>`;

        const info = await sendEmail(userEmail, subject, text, html);

        console.log("Email sent:", info.messageId);
        return info;

    } catch (error) {
        console.error("Email error:", error.message);
        throw error;
    }
}


async function sendLoginEmail(userEmail, name) {
    try {
        console.log("Starting login notification email...");
        console.log("Recipient:", userEmail);

        const safeName = String(name || "User")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");

        const subject = "🔐 New Login Notification - Backend Transaction System";

        const text = `
Hello ${String(name || "User")},

Your account has been successfully logged in to Backend Transaction System.

LOGIN STATUS: Successful

If this was you, no further action is required.

If you do not recognize this login, please change your password
immediately and contact our support team.

Your account security matters to us.

Best regards,
The Backend Transaction Team

This is an automated security notification. Please do not reply.
        `.trim();

        const html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Login Notification</title>
        </head>

        <body style="
            margin: 0;
            padding: 0;
            background-color: #f1f5f9;
            font-family: Arial, Helvetica, sans-serif;
            color: #1e293b;
        ">

            <div style="
                max-width: 600px;
                margin: 30px auto;
                background-color: #ffffff;
                border-radius: 14px;
                overflow: hidden;
                box-shadow: 0 5px 20px rgba(0,0,0,0.08);
            ">

                <!-- Header -->
                <div style="
                    padding: 35px 20px;
                    text-align: center;
                    background: linear-gradient(135deg, #2563eb, #4f46e5);
                    color: #ffffff;
                ">
                    <div style="font-size: 42px;">🔐</div>

                    <h1 style="
                        margin: 15px 0 8px;
                        font-size: 26px;
                    ">
                        Login Successful!
                    </h1>

                    <p style="
                        margin: 0;
                        font-size: 14px;
                        color: #dbeafe;
                    ">
                        Your account security matters to us.
                    </p>
                </div>

                <!-- Email Content -->
                <div style="padding: 30px;">

                    <h2 style="
                        margin-top: 0;
                        font-size: 21px;
                        color: #0f172a;
                    ">
                        Hello ${safeName}! 👋
                    </h2>

                    <p style="
                        font-size: 15px;
                        line-height: 1.8;
                        color: #475569;
                    ">
                        A successful login to your
                        <strong>Backend Transaction System</strong>
                        account has been recorded.
                    </p>

                    <!-- Status Card -->
                    <div style="
                        margin: 25px 0;
                        padding: 20px;
                        text-align: center;
                        background-color: #ecfdf5;
                        border: 1px solid #a7f3d0;
                        border-radius: 10px;
                    ">
                        <p style="
                            margin: 0;
                            font-size: 17px;
                            font-weight: bold;
                            color: #047857;
                        ">
                            ✓ Login Status: Successful
                        </p>

                        <p style="
                            margin: 10px 0 0;
                            font-size: 13px;
                            color: #065f46;
                        ">
                            Your account login was completed successfully.
                        </p>
                    </div>

                    <h3 style="
                        font-size: 17px;
                        color: #0f172a;
                    ">
                        Was this you?
                    </h3>

                    <p style="
                        font-size: 14px;
                        line-height: 1.8;
                        color: #475569;
                    ">
                        If you just logged in, you can safely ignore
                        this notification.
                    </p>

                    <!-- Security Warning -->
                    <div style="
                        margin: 20px 0;
                        padding: 18px;
                        background-color: #fff7ed;
                        border-left: 4px solid #f97316;
                        border-radius: 6px;
                    ">
                        <p style="
                            margin: 0 0 8px;
                            font-size: 15px;
                            font-weight: bold;
                            color: #9a3412;
                        ">
                            ⚠️ Didn't log in?
                        </p>

                        <p style="
                            margin: 0;
                            font-size: 14px;
                            line-height: 1.7;
                            color: #9a3412;
                        ">
                            If you don't recognize this activity,
                            change your password immediately and
                            review your account security.
                        </p>
                    </div>

                    <p style="
                        margin-top: 25px;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #475569;
                    ">
                        Thank you for using our platform.
                        We are committed to helping you keep
                        your account secure.
                    </p>

                    <p style="
                        margin-top: 25px;
                        font-size: 14px;
                        line-height: 1.8;
                        color: #475569;
                    ">
                        Best regards,<br>
                        <strong style="color: #4f46e5;">
                            The Backend Transaction Team
                        </strong>
                    </p>

                </div>

                <!-- Footer -->
                <div style="
                    padding: 20px;
                    text-align: center;
                    background-color: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                ">
                    <p style="
                        margin: 0;
                        font-size: 12px;
                        line-height: 1.7;
                        color: #64748b;
                    ">
                        This is an automated security notification.
                        Please do not reply to this email.
                    </p>

                    <p style="
                        margin: 12px 0 0;
                        font-size: 12px;
                        color: #94a3b8;
                    ">
                        &copy; ${new Date().getFullYear()}
                        Backend Transaction System.
                        All rights reserved.
                    </p>
                </div>

            </div>

        </body>
        </html>
        `;

        const info = await sendEmail(
            userEmail,
            subject,
            text,
            html
        );

        console.log(
            "Login notification email sent successfully:",
            info.messageId
        );

        return info;

    } catch (error) {
        console.error(
            "Login notification email error:",
            error.message
        );

        throw error;
    }
}




module.exports = {
    sendRegistrationEmail,
    sendLoginEmail
};

