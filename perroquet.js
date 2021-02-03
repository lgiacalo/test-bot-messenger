const express = require('express');
const bodyParser = require('body-parser');
const { TOKEN_FACEBOOK } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(process.env.PORT || 3000);

app.get('/', (_req, res) => {
  res.send('Je suis le serveur du bot Perroquet !');
});

// Facebook Webhook
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === TOKEN_FACEBOOK) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});
