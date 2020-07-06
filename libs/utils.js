// const debug = require('debug')('smart:uitls');
const exec = require('child_process').exec;
const fs = require('fs');
const path = require('path');
const { ASSETS_PATH, ASSETS_ROPE } = require('../config');

// 判断是否对指定目录有操作权限
exports.isExist = (path) => {
  try {
    fs.accessSync(path);
    return true;
  } catch (e) {
     return false;
  }
}
exports.gitClone = (repo, target) => {
  var url = `https://github.com/${repo}.git`;
  return new Promise((resolve, reject) => {
    exec(`git clone ${url} ${target}`, function(err, stdout, stderr) {
      if (err) {
        console.log(err);
        reject();
      }
      resolve();
    });
  });
}
exports.gitPull =  (pull_path)  => {
    const cmd = `git --git-dir=${path.join(pull_path,'.git')} --work-tree=${pull_path} pull`;
    console.log(cmd);
    return new Promise((resolve, reject) => {
       exec(cmd, (err, stdout, stderr ) =>{
         if(err) {
            reject(err);
            return
         }
         resolve();
       })
    })

}

exports.getConfig = async () => {
    if (!exports.isExist(ASSETS_PATH)) {
    //   debug(ASSETS_ROPE);
      await exports.gitClone(ASSETS_ROPE, ASSETS_PATH).catch(e => reject(e))
    }
    // 每次获取都 pull
    await exports.gitPull(ASSETS_PATH);
    return require(path.join(ASSETS_PATH, 'config'));
  };


 