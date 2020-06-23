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

const uploadFiles = async (dir, version) => {
  const cwd = path.resolve(process.env.DIST_DIR_PATH || './dist');

  globby.sync('**/*', { cwd }).forEach(async (file) => {
    const fileUploadPath = `${dir}-${version}/${file}`;
    // console.log('Putting %s to [%s]', `${cwd}/${file}`, `${bucket}/${fileUploadPath}`);

    await cli.put(fileUploadPath, `${cwd}/${file}`);
    await cli.putSymlink(`${dir}/${file}`, fileUploadPath);
    // console.log('Updating %s symlink to: [%s]', file, path);
  });
};

const deploy = async () => {
  const version = format.asString('yyyyMMddhhmmss', new Date());
  const folderName = `${process.env.PUBLIC_PATH || ''}`;

  console.log('Prepare to upload files to [%s/%s]', bucket, `${folderName}-${version}`);
  await uploadFiles(folderName, version);
  console.log('All files uploaded, Start update sym links...');
};

cli.getBucketWebsite(bucket).then(deploy).catch(console.error);
