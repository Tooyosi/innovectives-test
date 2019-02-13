import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

var ACCESS_TOKEN = undefined;

export class Login extends Component {
        constructor(props) {
          super(props);
          this.state = {
              formUsername: '',
              formPassword: '',
              token: ''
          };
          this.login = this.login.bind(this);
          this.username = this.username.bind(this);
          this.password = this.password.bind(this);
        }
        login(event) {
            event.preventDefault()
          axios({
            method: "POST",
            url: `http://localhost:3000/login`,
            headers: {
              "Content-type": "application/json",
              "accept": "application/json"
            },
            data: {
                name:   this.state.formUsername,
                password: this.state.formPassword
            }
          }).then((response) => {
                if(response.status == 200){
                    ACCESS_TOKEN = response.data.access_token,
                    console.log(response);
                    console.log("successful login");
                    this.setState({
                      token: ACCESS_TOKEN 
                    })
                    console.log(this.state.token)
                    this.props.history.replace("/upload")              
                }else{
                    console.log("failed")
                    // this.props.history.replace("/login")
                }
                // this.props.history.replace("/upload")
          }).then(() =>{
          }).catch(error => {
            console.log(error);
          });
        }
        username(event) { 
          this.setState({
            formUsername: event.target.value,
          })
        }
        password(event) {
          this.setState({
            formPassword: event.target.value,
          })
        }
        render() {
          return (
              
        <Fragment>
                <form  onSubmit={this.login}>   
                    <input onChange={this.username} type="text" name="username" value={this.state.formUsername} required placeholder="Name(required)" />
                    <input onChange={this.password} type="password" name="password" value={this.state.formPassword} required placeholder="Your email" />
                    <input type="submit" value="Send" />
                </form>
        </Fragment>
          );
        }
      } 
  
    export default ACCESS_TOKEN;