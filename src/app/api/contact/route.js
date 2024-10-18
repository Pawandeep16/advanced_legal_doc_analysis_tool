import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function POST(req) {
  const { email, message } = await req.json(); // Parse JSON request body

  const msg = {
    to: 'thandipawandeep@gmail.com', // Replace with your email address
    from: email, // User's email as the sender
    subject: 'Contact Us Form Submission',
    text: message,
    html: `<p><strong>Email:</strong> ${email}</p><p>${message}</p>`,
  };

  try {
    await sgMail.send(msg);
    return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error sending email:', error.response ? error.response.body : error);
    return new Response(JSON.stringify({ message: 'Error sending email.' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
