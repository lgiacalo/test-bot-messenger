const request = require('request');
const { TOKEN_PAGE_FACEBOOK_MESSENGER } = require('../config');

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
        console.error('Unable to send message !');
        // console.error(response);
        // console.error(error);
      }
    },
  );
}

function sendGenericMessage(recipientId, messageText) {
  // To be expanded in later sections
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

module.exports = {
  sendTextMessage,
  sendGenericMessage,
};
