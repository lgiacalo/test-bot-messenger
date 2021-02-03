const { sendTextMessage, sendHowAreYouMessage } = require('./messages');

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
    const regex = /.*comment( +)va(s?)( |-)tu/g;

    if (message.text.toLowerCase().match(regex)) sendHowAreYouMessage(senderID);
    else if (message.quick_reply) {
      const msg = message.quick_reply.payload === 'Good' ? '😁 👍' : '😢';
      sendTextMessage(senderID, msg);
    } else sendTextMessage(senderID, message.text);
  } else if (message.attachments) {
    console.log('message.attachments :>> ', message.attachments);
    sendTextMessage(senderID, 'Je ne sais pas traiter ce type dedemande.');
  }
}

module.exports = {
  handleMessage,
};
