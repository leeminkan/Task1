const http = require('http');
const callapi = require('./callapi.js');
const router = require('router');
const path = require('path');
const view = require('consolidate');
const app = new router();
const qs = require('querystring');
const finalhandler = require('finalhandler');

const server = http.createServer();
app.use((req, res, next)=>{
	res.render = function render(filename, params){
		var file = path.resolve(__dirname + '/views', filename);
		view.mustache(file, params || {}, function(err, html){
			if (err) return next(err);
			res.setHeader('Content-Type', 'text/html');
			res.end(html);
		});
	}
	next();
});


app.use((req, res, next)=>{
	if (req.method !== 'POST') {return next();}
	let body ='';
	req.on('data', (buf) =>{
		body += buf.toString();
	});
	req.on('end', ()=>{
		req.body = qs.parse(body);
		next();
	});
});


app.get('/', (req, res)=>{
	res.render('home.html');
});


app.post('/', (req, res) =>{
	if (! req.body.url){
		return res.render('home.html', {
			msg: 'url missing'
		});
	}

	let url = req.body.url;
	//Call API
	callapi.call(url, function(data){
		console.log(data);
		res.render('home.html',{
			msg: `Data: ${data}`
		});
	});
});


server.on('request', (req, res)=>{
	app(req, res, finalhandler(req, res));
});


server.listen(process.env.PORT || 3000);