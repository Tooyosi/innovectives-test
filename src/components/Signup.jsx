import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

export class Signup extends Component {
        constructor(props) {
          super(props);
          this.state = {
              formUsername: '',
              formPassword: ''
          };
          this.login = this.login.bind(this);
          this.username = this.username.bind(this);
          this.password = this.password.bind(this);
        }
        login(event) {
            event.preventDefault()
          axios({
            method: "POST",
            url: `http://localhost:3000/signup`,
            data: JSON.stringify({
                name:   this.state.formUsername,
                password: this.state.formPassword
            }),
            headers: {
              'Content-Type': 'application/json'
             },
             responseType: "application/json"
          }).then((response) => {
                if(response.response.status = 200){
                    console.log("successful login");
                    this.props.history.replace("/upload")
                }
                else{
                    console.log("failed")
                    this.props.history.replace("/")
                }
                // this.props.history.replace("/upload")
          }).catch(error => {
            console.log(error.response.data);
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
    