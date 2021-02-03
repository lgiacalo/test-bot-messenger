const request = require('request');
const { TOKEN_PAGE_FACEBOOK_MESSENGER } = require('./config');

function sendGenericMessage(recipientId, messageText) {
  // To be expanded in later sections
}

function callSendAPI(messageData) {
  console.log('messageData :>> ', messageData);
  request(
    {
      uri: 'https://graph.facebook.com/v2.6/me/messages',
      qs: { access_token: TOKEN_PAGE_FACEBOOK_MESSENGER },
      method: 'POST',
      json: messageData,
    },
    (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const recipientId = body.recipient_id;
        const messageId = body.message_id;

        console.log(
          'Successfully sent generic message with id %s to recipient %s',
          messageId,
          recipientId,
        );
      } else {
        console.error('Unable to send message.');
        console.error(response);
        console.error(error);
      }
    },
  );
}

function sendTextMessage(recipientId, messageText) {
  const messageData = {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };

  callSendAPI(messageData);
}

function handleMessage(event) {
  const senderID = event.sender.id;
  const recipientID = event.recipient.id;
  const timeOfMessage = event.timestamp;
  const { message } = event;

  console.log(
    'Received message for user %d and page %d at %d with message:',
    senderID,
    recipientID,
    timeOfMessage,
  );
  console.log(JSON.stringify(message));

  const messageId = message.mid;

  if (message.text) {
    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (message.text) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        sendTextMessage(senderID, message.text);
    }
  } else if (message.attachments) {
    sendTextMessage(senderID, 'Message with attachment received');
  }
}

module.exports = {
  handleMessage,
};
