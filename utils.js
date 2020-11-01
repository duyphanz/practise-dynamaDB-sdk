const handleCallback = (err, data) => {
  if (err) console.log(err);
  else console.log(JSON.stringify(data, null, 2));
};

module.exports = { handleCallback };
