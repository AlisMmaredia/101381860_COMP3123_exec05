const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs'); // Required for file operations

// Create new HTML file named home.html
// Add <h1> tag with the message "Welcome to ExpressJs Tutorial"
// Return home.html page to the client
//http://localhost:8081/home
router.get('/home', (req, res) => {
  const homePage = `<html><head><title>Welcome</title></head><body><h1>Welcome to ExpressJs Tutorial</h1></body></html>`;
  res.send(homePage);
});

// Return all details from user.json file to the client as JSON format
//http://localhost:8081/profile
router.get('/profile', (req, res) => {
  // Read data from user.json file
  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }

    const userData = JSON.parse(data);
    res.json(userData);
  });
});

// Modify /login route to accept username and password as query string parameters
//http://localhost:8081/login
router.get('/login', (req, res) => {
  const { username, password } = req.query;

  fs.readFile('user.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ status: false, message: 'Internal Server Error' });
    }

    const userData = JSON.parse(data);

    // Check if username and password are valid
    if (userData.username === username && userData.password === password) {
      res.json({ status: true, message: 'User is valid' });
    } else if (userData.username !== username) {
      res.json({ status: false, message: 'Username is invalid' });
    } else {
      res.json({ status: false, message: 'Password is invalid' });
    }
  });
});

// Modify /logout route to accept username as a parameter and display a message in HTML format
//http://localhost:8081/logout/:username
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  const message = `<b>${username} successfully logged out.</b>`;
  res.send(message);
});

app.use('/', router);

app.listen(process.env.PORT || 8081, () => {
  console.log('Web Server is listening at port ' + (process.env.PORT || 8081));
});
