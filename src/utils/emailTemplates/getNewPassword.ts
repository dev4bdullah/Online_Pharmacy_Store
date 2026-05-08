export function getNewPassword(url: string) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Reset Password</title>
      <style>
        body { font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px; }
        .container { max-width: 600px; margin: auto; background: #fff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .form-group { margin-bottom: 15px; }
        label { display: block; margin-bottom: 5px; font-weight: bold; }
        input { width: 100%; padding: 10px; border: 1px solid #ccc; border-radius: 5px; }
        .button { display: inline-block; background: #000; color: #fff; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-top: 20px; border: none; cursor: pointer; }
        .footer { text-align: center; font-size: 14px; color: #888; padding: 10px; background: #f4f4f4; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header"><h1>Reset Your Password</h1></div>
        <div class="content">
          <form action="${url}" method="POST">
            <div class="form-group">
              <label for="password">New Password</label>
              <input type="password" name="password" required />
            </div>
            <div class="form-group">
              <label for="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" required />
            </div>
            <button type="submit" class="button">Reset Password</button>
          </form>
          <p>If you didn’t request this, you can ignore this email.</p>
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
  