import React, { Fragment, Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';

const API_URL = "http://localhost:3000"
const AUTH_URL = "http://localhost:8080"

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
    if(this.props.uploadToken){
        // headers = {Authorization: `Bearer ${props.token}`}
        console.log(this.props.uploadToken)
    }
    axios({
      method: 'get',
      url: `${API_URL}/files`,
      headers: headers,
    }).then((res) => {
      if(res.data.success){
          console.log(res)
        console.log(props.token)
        console.log("Done")
        this.setState({
            ready: 'loaded',
            fileProperties: res.data.message
        })
    }else{
        console.log("Failed")
        console.log(res)
        console.log(props.token)
        this.props.history.replace("/")
      }
    }).catch(error => {
        console.log(error.response)
        console.log(this.props)
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
