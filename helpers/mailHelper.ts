import * as mailHelper from "nodemailer";
import Mailgen from "mailgen";
async function testEmail(email: string,data:any): Promise<string> {
  try {
    let config = {
      service: "gmail",
      auth: {
        user: "pageturnbooks007@gmail.com",
        pass: "ryss zlfb fufm vkes",
      },
    };
    let transporter = mailHelper.createTransport(config);
    let mailGenerator = new Mailgen({
      theme: "default",
      product: {
        name: "PageTurnBooks",
        link: "https://mailgen.js",
      },
    });
    let response_body = {
      body: {
        name: "Your Items",
        info: "Your email is working",
        table: {
          data:[...data]
        },
        outro: "Looking Forward To See You Again",
      },
    };
    let mail = mailGenerator.generate(response_body);
    let message = {
      from: "pageturnbooks007@gmail.com",
      to: "ranjansaurav07@gmail.com",
      subject: "Order Placed!!!",
      html: mail,
    };
    const result = await transporter.sendMail(message);
    let response = result.response.split(" ")[2];
    return response;
  } catch (error: any) {
    return error.message;
  }
}
export{testEmail}