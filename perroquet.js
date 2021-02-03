const express = require('express');
const bodyParser = require('body-parser');
const { TOKEN_FACEBOOK } = require('./config');
const { receivedMessage } = require('./utils');

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

app.post('/webhook', (req, res) => {
  const data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {
    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach((entry) => {
      const pageID = entry.id;
      const timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach((event) => {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log('Webhook received unknown event: ', event);
        }
      });
    });

    // Assume all went well.
    //
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.sendStatus(200);
  }
});
