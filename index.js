const  http = require('http');
const  port = process.env.PORT || 1234;

const server = http.createServer((req,res)=>{
	console.log(req.headers);
	res.statusCode=200;
	}
);

server.listen(port,()=>{
		console.log("server running");
	}
	);
