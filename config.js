require('dotenv').config();

const { TOKEN_FACEBOOK, TOKEN_PAGE_FACEBOOK_MESSENGER, PORT } = process.env;

module.exports = {
  TOKEN_FACEBOOK,
  TOKEN_PAGE_FACEBOOK_MESSENGER,
  PORT: PORT || 3000,
};
