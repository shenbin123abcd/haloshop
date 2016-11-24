var express = new require('express')
var app = express()
var port = 5145
var proxy = require('express-http-proxy');
var path = require('path');


app.all('/fake1',  (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    var data={"iRet":1,"info":"success","data":{subject:'peter'}};
    setTimeout(()=> {
        if (req.query.callback) {
            res.jsonp(data);
        } else {
            res.json(data);
        }
    },Number(req.query.d)||0)
});

app.all('/fake2',  (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Request-Method', '*');
    var data={"iRet":-1,"info":"Access denied"};
    setTimeout(()=> {
        if (req.query.callback) {
            res.jsonp(data);
        } else {
            res.json(data);
        }
    },Number(req.query.d)||0)
});



// app.use('/api', proxy('shopapi.halobear.cn'));
app.use('/api', proxy('shopapi-test.halobear.cn'));
app.use('/test', express.static(path.join(__dirname, '../test')));
app.use('/tmp', express.static(path.join(__dirname,  '../tmp')));
app.use('/dist', express.static(path.join(__dirname,   '../dist')));

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
