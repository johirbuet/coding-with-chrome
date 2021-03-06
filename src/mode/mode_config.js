/**
 * @fileoverview Editor mode config for the Coding with Chrome editor.
 *
 * @license Copyright 2015 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */
goog.provide('cwc.mode.Config');

goog.require('cwc.file.Type');
goog.require('cwc.mode.ConfigData');


/**
 * @constructor
 * @final
 */
cwc.mode.Config = function() {};


/**
 * @param {!cwc.mode.Type} type
 * @param {boolean=} required
 * @return {Object}
 */
cwc.mode.Config.get = function(type, required = false) {
  if (type in cwc.mode.ConfigData) {
    return cwc.mode.ConfigData[type];
  } else {
    let error = 'Mode config for ' + type + ' is not defined !';
    if (required) {
      throw new Error('Required ' + error);
    }
    console.warn(error);
  }
  return null;
};


/**
 * @param {!cwc.mode.Type} modeType
 * @return {!string}
 */
cwc.mode.Config.getMode = function(modeType) {
  if (cwc.mode.Config.get(modeType, true)) {
    return modeType;
  }
  return '';
};


/**
 * @param {!string} mimeType
 * @return {!string}
 */
cwc.mode.Config.getModeByMimeType = function(mimeType) {
  for (let mod in cwc.mode.ConfigData) {
    if (Object.prototype.hasOwnProperty.call(cwc.mode.ConfigData, mod)) {
      let modConfig = cwc.mode.ConfigData[mod];
      if (modConfig.mimeTypes.indexOf(mimeType) !== -1) {
        return mod;
      }
    }
  }
  return '';
};
