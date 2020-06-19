const path = require('path');
const globby = require('globby');
const OssCli = require('ali-oss');
const format = require('date-format');

const bucket = process.env.BUCKET_NAME || 'minapp-web-sites';

const cli = new OssCli({
  bucket,
  accessKeyId: process.env.ACCESS_KEY_ID,
  accessKeySecret: process.env.ACCESS_KEY_SECRET,
  region: process.env.REGION_NAME || 'oss-cn-zhangjiakou',
});

const uploadFiles = async (dir) => {
  const cwd = path.posix.join(__dirname, '../dist');

  globby.sync('**/*', { cwd }).forEach(async (file) => {
    const filePath = `${dir}/${file}`;
    // console.log('Putting %s to [%s]', `${cwd}/${file}`, `${bucket}/${filePath}`);
    await cli.put(filePath, `${cwd}/${file}`);
    // console.log("Updating %s symlink to: [%s]", file, path);
    // await cli.putSymlink(file, filePath);
  });
};

const deploy = async () => {
  // const version = format.asString('yyyyMMddhhmmss', new Date());
  const baseName = `${process.env.PUBLIC_PATH || ''}`; // /${version}
  console.log('Prepare to upload files to [%s/%s]', bucket, baseName);
  await uploadFiles(baseName);
  console.log('All files uploaded, Start update sym links...');
};

cli.getBucketWebsite(bucket).then(deploy).catch(console.error);
