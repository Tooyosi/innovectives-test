import React, { Fragment, Component } from 'react';
import styled from 'styled-components';

const SignupStyle = styled.div`
height: 100vh;
padding: 10px;
background-color: #e3dfe0;
text-align: center;
table{
    width: 50%;
    padding: 20px;
    border: 1px solid white;
    margin: 0 auto;
}
a{
    text-decoration: none;
    padding: 5px;
    border: 2px solid transparent;
    border-radius: 5%;
    color: white;
    background-color: #3bcb3b;
    transition: .4s linear;
}
a:hover{
  padding: 7px;
}
`;

const Signup = () => (
  <Fragment>
    <SignupStyle>
      <p>Please Log in with either of the following details</p>
      <table>
        <thead>
          <tr>
            <td>Username</td>
            <td>Password</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>admin</td>
            <td>admin</td>
          </tr>
          <tr>
            <td>guest</td>
            <td>guest</td>
          </tr>
        </tbody>
      </table>
      <p><a href="/login">Login</a></p>
    </SignupStyle>
  </Fragment>
  )

export default Signup;