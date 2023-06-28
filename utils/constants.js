const urlRegEx = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+/i;
const imageRegEx = /^https?:\/\/(www\.)?[a-zA-Z0-9-.]+\.[a-z]{2,}\/[\S]+\.(png|jpg|jpeg)/i;
const mongoUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = { urlRegEx, imageRegEx, mongoUrl }