const http = require("http");
const fs = require("fs");
const path = require("path");
const contentType = require("./getContent.js");

const serveStatic = (rootDir, req, res) => {
  const filePath = path.join(rootDir, req.url);
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === "ENOENT") {
        res.writeHead(404, { "content-type": "text/html" });
        res.end("<h1> 404 Not Found! </h1>");
      } else {
        res.writeHead(500, { "content-type": "text/html" });
        res.end("<h1> 500 Internal Server Error! </h1>");
      }
    } else {
      const extname = path.extname(filePath);
      const content = contentType.getContentType(extname);
      res.writeHead(200, { "content-type": content });
      res.end(data);
    }
  });
};

const server = http.createServer((req, res) => {
  console.log("req.url: ", req.url);

  if (req.url == "/hello") {
    const helloHTML = fs.readFileSync("static/hello.html", "utf-8");

    res.writeHead(200, { "content-type": "text/html" });
    res.write(helloHTML);
    res.end();
  } else if (req.url == "/") {
    const homeHTML = fs.readFileSync("static/home.html", "utf-8");

    res.writeHead(200, { "content-type": "text/html" });
    res.write(homeHTML);
    res.end();
  } else {
    serveStatic("static", req, res);
  }
});

const PORT = 3000;

server.listen(PORT, () => {
  console.log(
    `지금 서버는 ${server.address().address}:${
      server.address().port
    } 에서 돌아가는 중`
  );
});
