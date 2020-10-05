const express = require('express');
const {body, validationResult } = require('express-validator');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/checkemails', [body('data').isArray(), body('data').notEmpty()], (req, res) => {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).send('Invalid payload. Please check your JSON.');
  }
    res.json(checkEmails(req.body.data));
});

app.all('*', (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`The magic happens on port ${port}...`);
});

const checkEmails = (emails) => {
    let emailSet = new Set();

    emails.forEach(email => {
        let uniqueEmail = email;
        if (uniqueEmail.endsWith('@gmail.com')) {
            const splitMail = uniqueEmail.split('@');
            const indexOfPlus = splitMail[0].indexOf('+');
            if (indexOfPlus >= 0) {
                splitMail[0] = splitMail[0].substring(0, indexOfPlus);
            }
            uniqueEmail = `${splitMail[0].replace(/[.]+/g, '')}@${splitMail[1]}`;
        }
        emailSet.add(uniqueEmail);
    });

    return emailSet.size;
};

module.exports.checkEmails = checkEmails;
module.exports.app = app;