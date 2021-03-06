const express = require('express');
const bodyParser = require('body-parser');
const { TOKEN_FACEBOOK } = require('./config');
const { handleMessage } = require('./src/handleMessage');
const { PORT } = require('./config');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.listen(PORT);

app.get('/', (_req, res) => {
  res.send(
    'Je suis le serveur du bot Perroquet ! https://www.facebook.com/botTestLgiacalo',
  );
});

// Facebook Webhook
app.get('/webhook', (req, res) => {
  if (req.query['hub.verify_token'] === TOKEN_FACEBOOK) {
    res.send(req.query['hub.challenge']);
  } else {
    res.send('Invalid verify token');
  }
});

app.post('/webhook', (req, res) => {
  const data = req.body;

  if (data?.object === 'page') {
    data.entry?.forEach((entry) => {
      entry.messaging?.forEach((event) => {
        if (event.message) {
          handleMessage(event);
        } else {
          console.log(`Webhook received unknown event: ${event}`);
        }
      });
    });

    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});
