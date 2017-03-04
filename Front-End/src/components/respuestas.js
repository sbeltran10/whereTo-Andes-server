import React, {Component} from 'react';
import Respuesta from './respuesta';

class Respuestas extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.respuestas) {
      return(
        <div className="col-md-4">
          {this.props.respuestas.map((respuesta, index) => {
            if(index != 0) {
              return <Respuesta key={index} respuesta={respuesta} cargarPregunta={this.props.cargarPregunta.bind(this)}/>
            }
          })}
        </div>
      )
    }
    else {
      return(
        <div></div>
      )
    }

  }
}

export default Respuestas;
