import inquirer from 'inquirer';
import QRCode from 'qrcode';

async function generateQR() {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'text',
        message: 'Enter text or URL:',
        validate: function (input) {
          if (input === '') {
            return 'Input cannot be empty';
          }
          return true;
        }
      }
    ]);

    const userText = answer.text;

    // File name from input
    const fileName = userText.replace(/[^a-zA-Z0-9]/g, "_");

    // Generate QR
    await QRCode.toFile(`${fileName}.png`, userText);

    console.log("QR Code generated and saved as", `${fileName}.png`);
  } catch (error) {
    console.log("Error:", error.message);
  }
}

generateQR();