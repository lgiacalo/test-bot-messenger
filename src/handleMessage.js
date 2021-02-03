const { sendGenericMessage, sendTextMessage } = require('./messages');

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
