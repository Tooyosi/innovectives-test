import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import ACCESS_TOKEN from './Login';

const API_URL = "http://localhost:3000"
const AUTH_URL = "http://localhost:8080"

// let ACCESS_TOKEN = undefined;
console.log(ACCESS_TOKEN)
export class Upload extends Component {
    constructor(props) {
      super(props);
      this.state = {
          fileProperties: [],
          ready: 'loading',
      };
    }

    
  componentDidMount() {
      this.setState({
      ready: 'loading',
    });
    var headers = {}
    if(ACCESS_TOKEN){
        headers = {Authorization: `Bearer ${ACCESS_TOKEN}`}
    }
    axios({
      method: 'get',
      url: `${API_URL}/files`,
      headers: headers,
    }).then((res) => {
      if(res.data.success){
          console.log(res)
        console.log("Done")
        this.setState({
            ready: 'loaded',
            fileProperties: res.data.message
        })
    }else{
        console.log("Failed")
        console.log(res)
        this.props.history.replace("/")
      }
    }).catch(error => {
        console.log(error.response)
    })
  }
    render() {
        const { fileProperties, ready } = this.state;
        return (
            <Fragment>
                { fileProperties.length ? '' : 'Files in your folder are less than 10'  }
                { ready === 'loading' ? '' : '' }
                { fileProperties.map(property => (
                    <div key={property.id}>
                    {(property.message)? 
                    <div>
                        <p>File-name:{property.name} <br/>
                            <span>Type: {property.type} </span> <br/>
                            <span>Extension: {property.extension}</span> <br/>
                            <span>Information: {property.information}</span> <br/>
                            <span>Supported: {property.supported? "Supported File" : "Un-supported file"}</span>
                        </p>
                    </div>
                    : ""}
                    </div>
              )) }
            </Fragment>
        )
    }    
  }
