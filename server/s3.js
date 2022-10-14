const fs = require('fs');
const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const multer = require('multer');

const bucket = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const awsKey = process.env.AWS_BUCKET_ACCESS_KEY;
const awsSecret  = process.env.AWS_BUCKET_SECRET_KEY;


const s3 = new S3Client({
  credentials: {
    region: region,
    accessKeyId: awsKey,
    secretAccessKey: awsSecret
  }
});

//upload file


//download file
