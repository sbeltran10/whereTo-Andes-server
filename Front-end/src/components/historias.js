import React, { Component } from 'react';
import axios from 'axios';

class Historias extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        if (this.props.historias) {
            return (
                <div>
                    {this.props.historias.map((historia, index) => {
                        return <Historia key={index} historia={historia} idHistoria={this.props.idHistoria} nombreHistoria={this.props.nombreHistoria} cargarHistoria={this.props.cargarHistoria.bind(this)} />
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
