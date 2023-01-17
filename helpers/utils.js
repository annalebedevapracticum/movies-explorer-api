const urlRegex = /^http?s:\/\/(www)?\S/;
const devSecretKey = 'devSecret';
const devMongoUrl = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  urlRegex,
  devSecretKey,
  devMongoUrl,
};
