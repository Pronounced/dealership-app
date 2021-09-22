import React from 'react';
import { shallow } from 'enzyme';
import Login from './components/Login';
import { idText } from 'typescript';

describe('Login', () => {
  let loginWrapper;
  let loginState;
  beforeAll(() => {
  loginWrapper = shallow(<Login users={[{username:"1", password:"1"}]} updateLoginStatus={jest.fn(() => true)}/>);
    loginState = loginWrapper.state();
  });

  it('To have at least one Form.Control', () => {
    expect(loginWrapper.find('FormControl').length).toBeGreaterThan(0);
  })

  it('To have 2 inputs and 2 button', () => {
    const loginInputs = loginWrapper.find('FormControl');
    const loginButton = loginWrapper.find('Button')
    expect(loginInputs.length).toBe(2);
    expect(loginButton.length).toBe(2);
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
    loginWrapper.find('FormControl[type="text"]').simulate('change', {target: {name: 'username', value: 'krishankantsinghal'}});
    expect(loginWrapper.state('username')).toEqual('krishankantsinghal');
  });

  it('state has value input in password field', () => {
    loginWrapper.find('FormControl[type="text"]').simulate('change', {target: {name: 'password', value: 'testpass'}});
    expect(loginWrapper.state('password')).toEqual('testpass');
  });
  
})