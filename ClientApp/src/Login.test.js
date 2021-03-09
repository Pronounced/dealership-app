import React from 'react'
import { shallow } from 'enzyme'
import Login from './components/Login'

describe('Login', () => {
  let loginWrapper;
  let loginState;
  beforeAll(() => {
    loginWrapper = shallow(<Login />);
    loginState = loginWrapper.state();
  });

  it('To have 2 inputs and 1 button', () => {
    const loginInputs = loginWrapper.find('input');
    const loginButton = loginWrapper.find('button')
    expect(loginInputs.length).toBe(2);
    expect(loginButton.length).toBe(1);
  });

  it('has state', () => {
    expect(loginState).not.toBeNull();
  });

  it('has username property on state', () => {
    expect(loginState.username).not.toBeUndefined();
  });

  it('has password property on state', () => {
    expect(loginState.password).not.toBeUndefined();
  });

  it('state has value input in username field', () => {
    loginWrapper.find('input[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
    expect(loginWrapper.state('username')).toEqual('krishankantsinghal');
  });

  it('state has value input in password field', () => {
    loginWrapper.find('input[type="text"]').simulate('change', {target: {name: 'password', value: 'testpass'}});
    expect(loginWrapper.state('password')).toEqual('testpass');
  });

  it('can fetch from api', () => {
    expect(loginState.userList.length).toBe(0);
  });

  it('user can login', () => {
    loginState.username = "TestUser 1";
    loginState.password = "1"
    loginWrapper.find('form').simulate('submit', {target: {name:'loginForm'}});
    expect(loginState.isLogined).toBe(true);
  });

  it('', () => {

  });
  
})