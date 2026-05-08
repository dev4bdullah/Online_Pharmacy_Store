export function getVerificationEmailHtml(url: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Email Verification</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; }
        .footer { text-align: center; font-size: 14px; color: #888; padding: 10px; background: #f4f4f4; }
        .footer a { color: #007bff; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Zahid Pharmacy Verification</h1></div>
        <div class="content">
          <p>Hi there,</p>
          <p>Thanks for registering. Please click below to verify your email:</p>
          <a href="${url}" class="button">Verify My Email</a>
          <p>If you didn't request this, you can safely ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Zahid Pharmacy. All rights reserved.</p>
          <p><a href="mailto:syedabdullahayaz175@gmail.com">Contact Support</a></p>
        </div>
      </div>
    </body>
    </html>
    `;
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      