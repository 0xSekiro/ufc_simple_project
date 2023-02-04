// Import core modules
const http = require("http");
const fs = require("fs");
const url = require("url");

// Import custom modules
const replacer = require("./custom_modules/replacer");

// Read Data from JSON file
const data = fs.readFileSync(`${__dirname}/api/data.json`, "utf-8");
const objData = JSON.parse(data);

// Read Templates files
const warriors = fs.readFileSync(
  `${__dirname}/templates/warriors.html`,
  "utf-8"
);
const oneWarrior = fs.readFileSync(
  `${__dirname}/templates/warrior.html`,
  "utf-8"
);
const theFighter = fs.readFileSync(
  `${__dirname}/templates/fighter.html`,
  `utf-8`
);

// Create server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  if (pathname == "/assets") {
    const theImg = fs.readFileSync(`./templates/${query.src}`);
    res.end(theImg);
  }
  // Warriors page (home)
  else if (pathname == "/" || pathname == "/warriors") {
    let theWarriorsPage = objData
      .map((fighter) => replacer(oneWarrior, fighter))
      .join("");
    theWarriorsPage = warriors.replace("$warrior", theWarriorsPage);
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(theWarriorsPage);
  }
  // Fighter page
  else if (pathname == "/fighter") {
    if (query.id == undefined || query.id == "") {
      res.statusCode = 500;
      res.end("missing id parameter");
    } else {
      const fighterPage = replacer(theFighter, objData[query.id]);
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end(fighterPage);
    }
  }
  // API page
  else if (pathname == "/api" || pathname == "/api/") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(data);
  }
  // Not Found page
  else {
    res.writeHead(404, { "Content-Type": "text/html" });
    res.end("<h1>Page not found</h1>");
  }
});

// Server listen to port 8000 on localhost
server.listen(8000, "127.0.0.1");
