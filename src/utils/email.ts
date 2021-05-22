import nodemailer from "nodemailer";
import mailgun from "nodemailer-mailgun-transport";
import pug from "pug";
import htmlToText from "html-to-text";

class Email {
  firstName: string;
  to: string;
  url: string;
  from: string;
  constructor(user: any, url: string) {
    this.to = user.email;
    this.firstName = user.name.split(" ")[0];
    this.url = url;
    this.from = `Expresso <${process.env.EMAIL}>`;
  }

  static newTransport(): any {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport(
        mailgun({
          auth: {
            api_key: process.env.MAILGUN_API_KEY,
            domain: process.env.MAILGUN_DOMAIN,
          },
        })
      );
    }

    return nodemailer.createTransport(
      mailgun({
        auth: {
          api_key: process.env.MAILGUN_API_KEY,
          domain: process.env.MAILGUN_DOMAIN,
        },
      })
    );
  }

  // Send the actual email
  public async send(template: string, subject: string): Promise<any> {
    // 1) Render HTML based on a pug template
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
    });

    // 2) Define email options
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
      attachments: [
        {
          filename: "logo.png",
          path: `${__dirname}/../public/images/logo.png`,
          cid: "logo",
        },
      ],
    };

    // 3) Create a transport and send email
    await Email.newTransport().sendMail(mailOptions, (err) => {
      if (err) {
        // eslint-disable-next-line no-console
        return console.log("Error occurs");
      }
      // eslint-disable-next-line no-console
      return console.log("Email sent!!!");
    });
  }

  async welcome(): Promise<any> {
    await this.send("welcome", "Welcome to My App !");
  }

  async sendPasswordReset(): Promise<any> {
    await this.send(
      "passwordReset",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}

export default Email;
