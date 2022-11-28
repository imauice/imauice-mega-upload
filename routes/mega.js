var express = require('express');
var router = express.Router();
var formidable = require('formidable'),
  util = require('util');
const { Storage } = require('megajs');
var fs = require('fs');

/* GET home page. */
router.post('/', function (req, res, next) {

  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) {

      // Check for and handle any errors here.
      console.error(err.message);
      return;
    }
    res.writeHead(200, { 'content-type': 'text/plain' });
    res.write('received upload:\n\n');

    (async function () {
      const storage = await new Storage({
        email: process.env.email,
        password: process.env.password
      }).ready

      try {
        const data = fs.readFileSync(files.pic.filepath);
        const file = await storage.upload(files.pic.newFilename + '.png', data).complete
        console.log('The file was uploaded!', file.name)

        // Using promises to get link
        const link = await file.link()
        console.log(link)
        //response
        res.end(util.inspect({ fields: fields, files: file.name , link:link }));

      } catch (err) {
        console.error(err);
      }

    }()).catch(error => {
      console.error(error)
      process.exit(1)
    })
   
  });
  return;

});

module.exports = router;
