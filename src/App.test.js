import React from 'react'
import { shallow } from 'enzyme'
import Login from './components/Login'

import App from './App'
import { isExportDeclaration } from 'typescript';
describe('App', () => {
  let appWrapper;
  beforeAll(() => {
    appWrapper = shallow(<App />);
  });

  it('renders login form', () => {
    const loginForm = appWrapper.find(Login);
    expect(loginForm).toHaveLength(1);
  });
});
