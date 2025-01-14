import mongoose, { Schema } from "mongoose";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Your code here

const noticeSchema = new Schema(
    {
        team: [{ type: Schema.Types.ObjectId, ref: "User" }],
        text: { type: String },
        task: { type: Schema.Types.ObjectId, ref: "Task" },
        notiType: { type: String, default: "alert", enum: ["alert", "message"] },
        isRead: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
    { timestamps: true }
);

dotenv.config()

// Create a transporter object using your SMTP service credentials
const transporter = nodemailer.createTransport({
    service: 'gmail',  // Or any other service (e.g., 'sendgrid')
    auth: {
        user: process.env.EMAIL_USER, // Use environment variable for email
        pass: process.env.EMAIL_PASS, // Use environment variable for password or app password
    },
});

export const sendEmail = (to, subject, text) => {
    const mailOptions = {
        from: process.env.EMAIL_USER, // Sender's email
        to, // Receiver's email
        subject, // Subject
        text, // Email content
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

const Notice = mongoose.model("Notice", noticeSchema);

export default Notice;