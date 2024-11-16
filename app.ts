const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/send-message', async (req, res) => {
const { name, email, message } = req.body;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'emailexemplo@gmail.com',
        pass: '1234',
    },
});

const mailOptions = {
    from: email,
    to: 'vitorhsoliveira13@gmail.com',
    subject: `Nova mensagem de ${name}`,
    text: message,
};

try {
    await transporter.sendMail(mailOptions);
    res.status(200).send('Mensagem enviada com sucesso!');
} catch (error) {
    res.status(500).send('Erro ao enviar mensagem.');
}
});

app.listen(5500, () => console.log('Servidor rodando na porta 5500'));
