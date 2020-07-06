
const path = require('path');
const os = require('os');

exports.REPO = 'yanglikun1/smart-project-template';

exports.CACHE_DIR = path.resolve(os.homedir(), '.smtool');

exports.TEMPLATE_PATH = path.resolve(exports.CACHE_DIR, 'template');

exports.ASSETS_PATH = path.resolve(exports.CACHE_DIR, 'assets');

exports.ASSETS_ROPE = 'yanglikun1/smart-cli-assets';