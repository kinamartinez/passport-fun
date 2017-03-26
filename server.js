/**
 * Created by karina on 26/03/17.
 */
"use strict";
var express = require('express');
var app = express();
var passport = require('passport');
var bodyParser = require('body-parser');
var LocalStrategy = require('passport-local').Strategy;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());

app.get('/success', function(req, res) {
    res.send("Hey, hello from the server!");
})

app.get('/login', function(req, res) {
    res.sendFile(__dirname + '/public/login.html');
});

passport.use(new LocalStrategy(function(username, password, done) {
    if ((username === "John") && (password === "password")) {
        return done(null, { username: username, id: 1 });
    } else {
        return done(null, false);
    }
}));

app.post('/login', passport.authenticate('local', {
    successRedirect: '/success',
    failureRedirect: '/login',
    session: false
}));

app.listen(8000, function() {
    console.log("Ready for some authentication action");
})