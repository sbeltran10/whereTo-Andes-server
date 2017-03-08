import React, { Component } from 'react';
import axios from 'axios';
import Historia from './historia';

class Historias extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.historias) {
            return (
              <div>
                  {this.props.historias.map((historia, index) => {
                      return <Historia key={index} historia={historia} cargarHistoria={this.props.cargarHistoria.bind(this)} />
                  })}
              </div>
            )
        }
        else {
            return (
              <div></div>
            )
        }

    }
}

export default Historias;
