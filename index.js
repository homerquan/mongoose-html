'use strict';
var mongoose = require('mongoose'),
  sanitizeHtml = require('sanitize-html'),
  util = require('util');

var setting = {};

module.exports.loadType = function(mongoose) {
  mongoose.Types.Html = mongoose.SchemaTypes.Html = Html;
  return Html;
};

function Html(path, options) {
    setting = options.setting;
    mongoose.SchemaTypes.String.call(this, path, options);
  }
  /*!
   * inherits
   */

util.inherits(Html, mongoose.SchemaTypes.String);

Html.prototype.cast = function(val) {
  if (isType('String', val)) {
    var dirty = val.toString();
    var clean = sanitizeHtml(dirty, setting);
    return clean;
  } else {
    return new Error('Should pass in a string');
  }
};

/**
 * isType(type, obj)
 * Supported types: 'Function', 'String', 'Number', 'Date', 'RegExp',
 * 'Arguments'
 * source: https://github.com/jashkenas/underscore/blob/1.5.2/underscore.js#L996
 */

function isType(type, obj) {
  return Object.prototype.toString.call(obj) == '[object ' + type + ']';
}