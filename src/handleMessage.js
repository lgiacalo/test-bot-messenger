const {
  sendTextMessage,
  sendHowAreYouMessage,
  sendResponse,
} = require('./messages');

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

  const messageText = message.text;
  const messageAttachments = message.attachments;

  if (messageAttachments && messageAttachments[0].type === 'image') {
    sendTextMessage(senderID, 'Je ne sais pas traiter ce type dedemande.');
  } else if (messageText) {
    const regex = /.*comment( +)va(s?)( |-)tu/g;

    if (messageText.toLowerCase().match(regex)) sendHowAreYouMessage(senderID);
    else if (message.quick_reply) {
      const msg = message.quick_reply.payload === 'Good' ? '😁 👍' : '😢';
      sendTextMessage(senderID, msg);
    } else sendTextMessage(senderID, messageText);
  } else {
    console.log('message :>> ', message);
    sendResponse(senderID, message);
  }
}

module.exports = {
  handleMessage,
};
