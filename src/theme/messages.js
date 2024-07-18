const { themeComponentsMessages } = require('./messages/components');
const { themePagesMessages } = require('./messages/pages');

module.exports = {
  name: 'Theming Colors File',
  themeMessages: {
    components: themeComponentsMessages,
    pages: themePagesMessages,
  },
};
