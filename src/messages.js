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

function formatMessageData(recipientId, messageText) {
  return {
    recipient: {
      id: recipientId,
    },
    message: {
      text: messageText,
    },
  };
}

function sendHowAreYouMessage(recipientId) {
  const response = {
    attachment: {
      type: 'template',
      payload: {
        template_type: 'generic',
        elements: [
          {
            buttons: [
              {
                type: 'postback',
                title: 'Yes!',
                payload: 'yes',
              },
              {
                type: 'postback',
                title: 'No!',
                payload: 'no',
              },
            ],
          },
        ],
      },
    },
  };
  const messageData = formatMessageData(recipientId, response);

  callSendAPI(messageData);
}

function sendTextMessage(recipientId, messageText) {
  const messageData = formatMessageData(recipientId, messageText);

  callSendAPI(messageData);
}

module.exports = {
  sendHowAreYouMessage,
  sendTextMessage,
};
