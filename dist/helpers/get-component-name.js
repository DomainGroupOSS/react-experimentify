"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (component) {
  return component.displayName || component.name;
};