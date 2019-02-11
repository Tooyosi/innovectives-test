import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

export class withAuth extends Component {
    constructor(props) {
      super(props);
      this.state = {
          
      };
    }

    
  componentDidMount() {
    axios({
      method: 'get',
      url: `http://localhost:3000/test`,
    //   headers: {Authorization: `Bearer ${process.env.API_KEY}`},
    }).then((res) => {
      if(res.data.token){
        console.log("Done")
        this.props.history.replace("/upload")
      }else{
        console.log("Failed")
        console.log(res)
        // this.props.history.replace("/")
      }
    }).catch(error => {
        console.log(error)
    })
  }
    render() {
        return (
            <Fragment>
                <p>Please enter your correct details</p>
            </Fragment>
        )
    }    
  }
