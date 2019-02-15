import React, { Fragment, Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const LoginStyle = styled.div`
  .container{
    margin: 0;
    padding: 0;
    height: 100vh; 
  }
 .wrapper{
   max-width: 100%;
   margin: 0px auto;
   display: grid;
   grid-template-column: 1fr;
   form{
    position: relative;
   }

   form{
    max-width: 100%;
    height: 40vh;
    border: 1px solid transparent;
    border-radius: 9%;
    background-color: white;
    margin: 15% auto 0 auto;
    box-shadow: 1px 1px 15px 12px whitesmoke;
   }

   form > input{
    display: block;
    padding: 10px;
    margin: 20px;
    border: 1px solid transparent;
    border-bottom: 2px solid #bebebe;
    border-radius: 2%;
  } 

  form > input: focus{
    border: 1px solid transparent;
  }

  input[type="submit"]{
    background-color: #358f3a;
    border: 1px solid transparent;
    border-radius: 5px;
    padding: 12px;
    width: 80%;
    color: white;
  }
 }
`

export class Login extends Component {
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
            url: `http://localhost:3000/login`,
            redirect: 'follow',
            withCredentials: 'include',
            headers: {
              "Access-Control-Allow-Origin": "http://localhost:8080",              
              "Content-type": "application/json",
              "accept": "application/json"
            },
            data: {
                name:   this.state.formUsername,
                password: this.state.formPassword
            }
          }).then((response) => {
                if(response.status == 200){
                    console.log("successful login");
                    this.props.history.replace("/upload")              
                }else{
                    console.log("failed")
                    this.props.history.replace("/")
                }
          }).catch(error => {
            console.log(error);
            this.props.history.replace("/")
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
              <LoginStyle>
               <div className="container">
                 <div className="wrapper">
                    <form  onSubmit={this.login}>   
                        <input onChange={this.username} type="text" name="username" value={this.state.formUsername} required placeholder="Name" />
                        <input onChange={this.password} type="password" name="password" value={this.state.formPassword} required placeholder="Password" />
                        <input type="submit" value="Send" />
                    </form>
                 </div>
               </div>
              </LoginStyle>
          
          );
        }
      } 
  