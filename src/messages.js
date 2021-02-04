const request = require('request');
const { TOKEN_PAGE_FACEBOOK_MESSENGER } = require('../config');

function callSendAPI(messageData) {
  console.log('messageData :>> ', messageData);
  request(
    {
      uri: 'https://graph.facebook.com/v9.0/me/messages',
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
        console.error('Unable to send message');
        // console.error(error);
        console.error(response.body);
      }
    },
  );
}

function sendResponse(recipientId, message) {
  callSendAPI({
    recipient: {
      id: recipientId,
    },
    message,
  });
}

function sendHowAreYouMessage(recipientId) {
  const response = {
    text: 'Très bien et vous ?',
    quick_replies: [
      {
        content_type: 'text',
        title: 'Je vais bien, merci',
        payload: 'Good',
      },
      {
        content_type: 'text',
        title: 'Non, ça ne va pas',
        payload: 'Bad',
      },
    ],
  };

  sendResponse(recipientId, response);
}

function sendTextMessage(recipientId, messageText) {
  sendResponse(recipientId, { text: messageText });
}

module.exports = {
  sendHowAreYouMessage,
  sendTextMessage,
  sendResponse,
};
