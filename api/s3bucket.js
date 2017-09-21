const express = require('express');
const router = express.Router();
const AWS = require('aws-sdk');

router.get('/', (req, res) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-2'
  });
  const fileName = req.query['file-name'];
  const s3Params = {
    Bucket: process.env.S3_BUCKET,
    Key: fileName,
    Expires: 60,
    ContentType: 'image/jpeg',
    ACL: 'public-read'
  };

  s3.getSignedUrl('putObject', s3Params, (err, data) => {
    if (err) {
      console.log(err);
      return res.end();
    }
    const returnData = {
      signedRequest: data,
      url: `https://s3-us-east-2.amazonaws.com/${process.env.S3_BUCKET}/${fileName}`

    };
    return res.json(returnData);
  });
});

module.exports = router;
