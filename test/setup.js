import chai from 'chai';
import React from 'react';
import sinon from 'sinon';
import { JSDOM } from 'jsdom';
import chaiEnzyme from 'chai-enzyme';
import enzyme, { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

const jsdom = new JSDOM('<!doctype html><html><body></body></html>');
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;

global.React = React;
global.enzyme = enzyme;
global.sinon = sinon;
global.chai = chai;

global.expect = chai.expect;
global.should = chai.should();

global.chai.use(chaiEnzyme());

copyProps(window, global);
