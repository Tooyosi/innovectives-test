import React, { Fragment, Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'

const UploadStyle = styled.div`
  *{
    margin: 0px;
    padding: 5px
  }
  thead{
    background-color: black;
    color: white;
  }
  tr:nth-child(even) {
    background-color: pink;
}
 }
`


const API_URL = "http://localhost:3000";

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
    axios({
      method: 'get',
      url: `${API_URL}/files`,
      redirect: 'follow',
      withCredentials: true,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:8080",
        "Content-type": "application/json",
        "accept": "application/json"
      },
    }).then((res) => {
      if(res.status == 200){
          console.log(res)
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
        this.props.history.replace("/")
    })
  }
    render() {
        const { fileProperties, ready } = this.state;
        return (
            <Fragment>
                <UploadStyle>
                    { fileProperties.length ? '' : 'Files in your folder are less than 10'  }
                    { ready === 'loading' ? '' : '' }
                    <table>
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>File-name</td>
                                <td>Type</td>
                                <td>Extension</td>
                                <td>Information</td>
                                <td>Size</td>
                                <td>Supported</td>
                            </tr>
                        </thead>
                        { fileProperties.map(property => (
                        <tbody>
                          {(property.message)? 
                            <tr key={property.id}>
                                <td>{property.id + 1}</td>
                                <td>{property.name}</td>
                                <td>{property.type}</td>
                                <td>{property.extension}</td>
                                <td>{property.information}</td>
                                <td>{property.size}</td>
                                <td>{property.supported? "Supported File" : "Un-supported file"}</td>
                            </tr>
                          : ""}
                        </tbody>
                    )) }
                    </table>

                </UploadStyle>
            </Fragment>
        )
    }    
  }
