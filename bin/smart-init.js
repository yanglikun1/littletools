#!/usr/bin/env node
const program = require('commander');
const fs = require('fs');
const exists = require('fs').existsSync; // 如果路径存在返回true
const path = require('path');
const ora = require('ora')
const chalk = require('chalk');
const inquirer = require('inquirer');
const utils = require('../libs/utils');
 
program.usage('[project-name]')
  program.on('--help', function () {
    console.log('  Examples:')
    console.log()
    console.log(chalk.blue('  # create a smart project with an official template'))
    console.log('    $ smart init smart-home-vue')
    console.log()
  })
  .parse(process.argv);
  
  var local;
  var template;

  async function main () {
    help ();
    const answer = await ask();
    template = answer.template;
    var target = program.args[0];
     
    if(!target) {
      target = '.'; //判断是否
    }
    var inplace = target == '.';
    local = path.resolve(target);
    console.log(local);
    
    if (exists(local)) { // 判断路径存在
      inquirer.prompt([{
        type: 'confirm',
        message: inplace ? 'Generate project in current directory?'
          : 'Target directory exists. Continue?',
        name: 'ok'
      }]).then(function (answers) {
        // if (answers.ok) {
        //   run()
        // }
      });
    } else {
      // run()
    }


  }

  
  (async () => {
      main ();
  })()

    // 获取询问
  async function ask() {
    const config = await utils.getConfig();
    console.log(config, '---===---===---');
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'template',
        pageSize: config.template.length,
        message: 'Which template you want to create?',
        choices: formatTemplatesList(config.template),
        filter(answer) {
            return /\S*/.exec(answer)[0];
        },
      }
    ]);
    console.log(answer);
      return answer;
    }
     // 判断 如果没有参数 执行help
    function help () {
      program.parse(process.argv)
      if (program.args.length < 1) return program.help()
    }

function formatTemplatesList(templates) {
  const newArr = [];
  let maxLength = 0;
  templates.forEach(item => {
    if (item.type) {
      return;
    }
    if (item.name.length > maxLength) {
      maxLength = item.name.length;
    }
  }); 
  templates.forEach(item => {
    if (item.type) {
      newArr.push(item);
    } else {
      newArr.push(`${item.name.padEnd(maxLength)}    ${item.desc}`);
    }
  });
   return newArr;
}
     