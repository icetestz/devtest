const axios = require('axios');
const express = require('express');
const app = express();
const JSZip = require('jszip');
const fs = require('fs');
const zip = new JSZip();
const b64ToBlob = require("b64-to-blob");
const fileSaver = require("file-saver");
const port = 3000
  
app.get('/', function(req, res) {
    // Make a request for a user with a given ID
    axios.get('https://rickandmortyapi.com/api')
      .then(function (response) {
        // handle success
        res.send(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
});

app.get('/characters', function(req, res) {
    res.setHeader('Content-Disposition', 'attachment; filename=character.zip');
    res.setHeader('Content-Type', 'application/zip');
    axios.get('https://rickandmortyapi.com/api/character')
      .then(function (response) {
        res.json(response.data.results);
        var buf = Buffer.from(JSON.stringify(response.data.results));
        zip.file(
            "standalone.json",
            buf
          );
    
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream('character.zip'))
            .on('finish', function () {
                res.download('character.zip')
                res.end();
            });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
});

app.get('/locations', function(req, res) {
    res.setHeader('Content-Disposition', 'attachment; filename=locations.zip');
    res.setHeader('Content-Type', 'application/zip');
    axios.get('https://rickandmortyapi.com/api/location')
      .then(function (response) {
        res.json(response.data.results);
        var buf = Buffer.from(JSON.stringify(response.data.results));
        zip.file(
            "standalone.json",
            buf
          );
    
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream('locations.zip'))
            .on('finish', function () {
                res.download('locations.zip')
                res.end();
            });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
});

app.get('/episodes', function(req, res) {
    res.setHeader('Content-Disposition', 'attachment; filename=episodes.zip');
    res.setHeader('Content-Type', 'application/zip');
    axios.get('https://rickandmortyapi.com/api/episode')
      .then(function (response) {
        res.json(response.data.results);
        var buf = Buffer.from(JSON.stringify(response.data.results));
        zip.file(
            "standalone.json",
            buf
          );
    
        zip.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
            .pipe(fs.createWriteStream('episodes.zip'))
            .on('finish', function () {
                res.download('episodes.zip')
                res.end();
            });
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
