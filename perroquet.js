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

app.post('/webhook', (req, res) => {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach((entry) => {
      // Gets the body of the webhook event
      const webhookEvent = entry.messaging[0];
      console.log(webhookEvent.messaging);

      // Get the sender PSID
      const senderPsid = webhookEvent.sender.id;
      console.log(`Sender PSID: ${senderPsid}`);

      entry.messaging.forEach((event) => {
        if (event.message) {
          handleMessage(event);
        } else {
          console.log(`Webhook received unknown event: ${event}`);
        }
      });
    });

    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
});
