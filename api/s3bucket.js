const express = require('express');
const AWS = require('aws-sdk');

const router = express.Router();

const S3_BUCKET = process.env.S3_BUCKET;

router.get('/', (req, res) => {
  const s3 = new AWS.S3({
    signatureVersion: 'v4',
    region: 'us-east-2'
  });
  const fileName = req.query['file-name'];
  const s3Params = {
    Bucket: S3_BUCKET,
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
      url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
    };
    return res.json(returnData);
  });
});


module.exports = router;
