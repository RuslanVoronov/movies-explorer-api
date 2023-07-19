const urlRegEx = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+/i;
const imageRegEx = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i;

module.exports = { urlRegEx, imageRegEx };
