const puppeteer = require("puppeteer");
const fs = require("fs");
const server = require("node-http-server");
const url = "http://localhost:8080/";
const localIndexFile = "./build/index.html";

server.deploy(
  {
    verbose: true,
    port: 8080,
    root: __dirname + "/build/"
  },
  serverReady
);

function serverReady() {
  puppeteer
    .launch()
    .then(browser => browser.newPage())
    .then(page => {
      return page.goto(url, { waitUntil: "networkidle2" }).then(() => {
        return page.$("#app").then(bodyHandle => {
          page.evaluate(body => body.innerHTML, bodyHandle).then(html => {
            bodyHandle.dispose();
            replateContent(html);
            process.exit();
          });
        });
      });
    })
    .catch(er => console.log(er));
}

function replateContent(html) {
  const indexFile = fs.readFileSync(localIndexFile, "utf8");
  const newContent = indexFile.replace('<div class="prerender"></div>', html);
  fs.writeFileSync(localIndexFile, newContent, "utf8");
}
