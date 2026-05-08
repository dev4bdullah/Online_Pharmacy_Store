export function getSessionExpiredHtml() {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Session Expired</title>
        <style>
          body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
          .container { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
          .header { background: black; color: #fff; padding: 20px; text-align: center; }
          .content { padding: 20px; text-align: center; }
          .footer { text-align: center; font-size: 14px; color: #888; padding: 10px; background: #f4f4f4; }
          .footer a { color: #007bff; text-decoration: none; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header"><h1>Session Expired</h1></div>
          <div class="content">
            <p>Your verification link has expired.</p>
            <p>Please request a new email verification to continue.</p>
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
  