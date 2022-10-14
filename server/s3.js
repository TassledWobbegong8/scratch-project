const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');

const bucket = process.ENV.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const awsKey = process.ENV.AWS_BUCKET_ACCESS_KEY;
const awsSecret  = process.ENV.AWS_BUCKET_SECRET_KEY;

//configure bucket

export const bucketParams = {
  Bucket: bucket,
  Key: awsKey,
  //get request body from front end
};

const s3 = new S3Client({
  region: region,
  accessKeyId: awsKey,
  secretAccessKey: awsSecret
});

//upload file


//download file
