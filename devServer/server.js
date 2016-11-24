var express = new require('express')
var app = express()
var port = 5145
var proxy = require('express-http-proxy');
var path = require('path');

//
app.use('/api', proxy('shopapi-test.halobear.cn'));
// app.use('/test', express.static(path.join(__dirname, '../test')));
// app.use('/tmp', express.static(path.join(__dirname,  '../tmp')));
app.use('/', express.static(path.join(__dirname,   '../dist')));

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, '../dist/index.html'))
});


app.listen(port, function(error) {
    if (error) {
        console.error(error)
    } else {
        console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port)
    }
});
