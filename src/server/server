const path = require('path');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
var sslRedirect = require('heroku-ssl-redirect');

app.use(sslRedirect());
app.use(express.static(path.join(__dirname, 'build')));

app.get('*', (req, res, next) => {
   if (req.headers['x-forwarded-proto'] != 'https') {
      res.redirect('https://' + req.hostname + req.url);
   } else {
      next();
   }
});

app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
   console.log('Server is up!');
});