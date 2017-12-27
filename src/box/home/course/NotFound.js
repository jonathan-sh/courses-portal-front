import React, { Component } from "react";
import HeaderBar from './../bar/HeaderBar';


class NotFound extends Component {

    render() {
        return (
          <div>
              <div>
                  <HeaderBar/>
              </div>
              <div className="course-not-found-1">
                  <div className="title" style={{marginTop:'20%',fontSize:'45px', color:'#fff'}}>Curso não encontrado.</div>
                  <br/>
                  <div className="title" style={{marginTop:'2%',fontSize:'65px', color:'#fff'}}>:(</div>
              </div>
          </div>
        );
    }
}
export default NotFound;


