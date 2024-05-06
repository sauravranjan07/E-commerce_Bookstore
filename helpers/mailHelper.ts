import Mailgen from "mailgen";
import * as mailHelper from "nodemailer";
interface TableRow {
  name: string;
  quantity: string;
  price: string;
  total:number
}

async function testEmail(
  email: string,
  data: any,
  name: string,
  Total: number
): Promise<string> {
  try {
    console.log("insideeeeeee");
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
    // Construct table rows dynamically based on items
    let tableRows: TableRow[] = data.map((item: any) => ({
      name: item.name,
      quantity: item.quantity.toString(), // Convert to string for alignment
      price: "Rs" + " " + item.price.toString(), 
      // Format price as currency
    }));
    var response_body: any = {
      body: {
        name: name,
        intro: `Your orders Total: ${Total}`,
        table: {
          columns: [
            { customWidth: "50%", customAlignment: "left" },
            { customWidth: "25%", customAlignment: "right" },
            { customWidth: "25%", customAlignment: "right" },
          ],
          data: tableRows,
          outro: "Thank you for shopping with us!",
        },
       
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
    let response = result.response;
    return response;
  } catch (error: any) {
    return error.message;
  }
}
export { testEmail };
