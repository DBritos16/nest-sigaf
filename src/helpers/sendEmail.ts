import { createTransport } from 'nodemailer';

export const enviarEmail = async ({ subject, codigo, toEmail }) => {
    const config = {
      host: 'smtp.gmail.com',
      port: 587,
      auth: {
        user: process.env.usermail,
        pass: process.env.passwordmail
      }
    };
  
    const transporter = createTransport(config);
  
    const message = {
      from: process.env.usermail,
      to: toEmail,
      subject,
      html: `
      <!DOCTYPE html>
      <html>
      <head>
          <title>Confirmación de correo electrónico</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  background-color: #f5f5f5;
                  text-align: center;
              }
              .container {
                  background-color: #ffffff;
                  border-radius: 10px;
                  padding: 20px;
                  width: 80%;
                  margin: 20px auto;
              }
              h1 {
                  color: #333;
              }
              p {
                  color: #555;
              }
              .confirmation-code {
                  font-size: 24px;
                  font-weight: bold;
                  color: #007bff;
              }

              .sigaf {
                color: 'green'
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>¡Bienvenido a <span class="sigaf">SIGAF</span>!</h1>
              <p>Por favor, confirma tu correo electrónico para completar el proceso de registro.</p>
              <p>Tu código de confirmación es: <span class="confirmation-code">${codigo}</span></p>
          </div>
      </body>
      </html>
  `
    };
  
    return await transporter.sendMail(message);
  }
