const http = require('http');
const port = process.env.PORT||1234;
const path = require("path");
const fs =   require("fs");


const server = http.createServer((req,res)=>{
		var jsonString;
		//req.on("data",(data)=>{jsonString+=data;});
		//req.on("end",()=>{console.log(JSON.parse(jsonString));});
		req.on("data",(data)=>{
					var jsonData = JSON.parse(data);
					var intendData = JSON.parse(jsonData["intent"]["query"]);
					//console.log()
					console.log(intendData);
					//http.connect("http://184.144.70.115:8082/?"+jsonData["intent"]);
					});
		
		if(req.method=="GET"){
			var fileUrl;
			if(req.url=="/")fileUrl="/index.html";
			else fileUrl = req.url;
			var filePath = path.resolve("."+fileUrl);
			const fileExt = path.extname(filePath);
			if(fileExt ==".html"){
				fs.exists(filePath,(exists)=>{
				if(!exists){
					res.statusCode="404";
					res.setHeader("Content-Type","text/html");
					res.end("<html><body><h1>"+fileUrl+"not found</h1></body></html>");
					return;
					}
				res.statusCode="200";
				res.setHeader("Content-Type","text/html");
				fs.createReadStream(filePath).pipe(res);
				return;
				});
			}
			else{
				res.statusCode="404";
				res.setHeader("Content-Type","text/html");
				res.end("<html><body><h1>"+fileUrl+"not html</h1></body></html>");
				return;

				}
		}
		else{
			res.statusCode="404";
			res.setHeader("Content-Type","text/html");
			res.end("<html><body><h1>"+req.method+"not found</h1></body></html>");
			return;
		}		
				
	}
);

server.listen(port);


