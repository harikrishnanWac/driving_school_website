import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, email, plan, message } = body;

    // Validate required fields
    if (!name || !phone || !email || !plan) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.SMTP_USER || 'no-reply@safedrive.com',
      to: 'harikrishnan.mv@wacmob.com',
      subject: 'New Driving School Enquiry',
      text: `New enquiry received from the website.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nPreferred Plan: ${plan}\nMessage: ${message || 'No additional message provided.'}`,
      html: `
        <h3>New enquiry received from the website.</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Preferred Plan:</strong> ${plan}</p>
        <p><strong>Message:</strong> ${message || 'No additional message provided.'}</p>
      `
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { success: true, message: 'Enquiry sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send enquiry' },
      { status: 500 }
    );
  }
}
