const express = require('express');
const axios = require("axios");
const db = require("./db");
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: (process.env.REJECT_SELF_SIGNED_CERTIFICATES || 'true').toLowerCase() ==='true'
});


const axios_instance = axios.create({
  httpsAgent: agent
});

const router = express.Router();

router.get('/Items/Images/Backdrop/', async(req, res) => {
    const { id,fillWidth,quality } = req.query; // Get the image URL from the query string
    const { rows: config } = await db.query('SELECT * FROM app_config where "ID"=1');

    if (config[0].JF_HOST === null || config[0].JF_API_KEY === null) {
      res.send({ error: "Config Details Not Found" });
      return;
    }
  

    let url=`${config[0].JF_HOST}/Items/${id}/Images/Backdrop?fillWidth=${fillWidth || 100}&quality=${quality || 100}`;


    axios_instance.get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      res.set('Content-Type', 'image/jpeg');
      res.status(200);

      if (response.headers['content-type'].startsWith('image/')) {
        res.send(response.data);
      } else {
        res.send(response.data.toString());
      }
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).send('Error fetching image');
    });
  });

  router.get('/Items/Images/Primary/', async(req, res) => {
    const { id,fillWidth,quality } = req.query; // Get the image URL from the query string
    const { rows: config } = await db.query('SELECT * FROM app_config where "ID"=1');

    if (config[0].JF_HOST === null || config[0].JF_API_KEY === null) {
      res.send({ error: "Config Details Not Found" });
      return;
    }
  

    let url=`${config[0].JF_HOST}/Items/${id}/Images/Primary?fillWidth=${fillWidth || 100}&quality=${quality || 100}`;

    axios_instance.get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      res.set('Content-Type', 'image/jpeg');
      res.status(200);

      if (response.headers['content-type'].startsWith('image/')) {
        res.send(response.data);
      } else {
        res.send(response.data.toString());
      }
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).send('Error fetching image');
    });
  });

  
  router.get('/Users/Images/Primary/', async(req, res) => {
    const { id,fillWidth,quality } = req.query; // Get the image URL from the query string
    const { rows: config } = await db.query('SELECT * FROM app_config where "ID"=1');

    if (config[0].JF_HOST === null || config[0].JF_API_KEY === null) {
      res.send({ error: "Config Details Not Found" });
      return;
    }
  

    let url=`${config[0].JF_HOST}/Users/${id}/Images/Primary?fillWidth=${fillWidth || 100}&quality=${quality || 100}`;

    axios_instance.get(url, {
      responseType: 'arraybuffer'
    })
    .then((response) => {
      res.set('Content-Type', 'image/jpeg');
      res.status(200);

      if (response.headers['content-type'].startsWith('image/')) {
        res.send(response.data);
      } else {
        res.send(response.data.toString());
      }
    })
    .catch((error) => {
      // console.error(error);
      res.status(500).send('Error fetching image');
    });
  });
  
  

module.exports = router;