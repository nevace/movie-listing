import React from 'react';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import sinonChain from 'sinon-chai';
import chaiJestDiff from 'chai-jest-diff';
import chaiEnzyme from 'chai-enzyme';
import sinon from 'sinon';
import { configure, mount, render, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';

configure({ adapter: new Adapter() });

global.expect = expect;
global.sandbox = sinon.createSandbox();
global.React = React;
global.mount = mount;
global.shallow = shallow;
global.render = render;
global.axiosGetStub = sandbox.stub(axios, 'get');
global.axiosPostStub = sandbox.stub(axios, 'post');

chai.use(chaiAsPromised);
chai.use(sinonChain);
chai.use(chaiEnzyme);
chai.use(chaiJestDiff());
