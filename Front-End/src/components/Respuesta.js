import React, {Component} from 'react';

class Respuesta extends Component {

  render() {
    return(
      <a className="bubtn btn-default" onClick={() => this.props.cargarPregunta(this.props.respuesta._id)}>
        {this.props.respuesta.contenido}
      </a>
    )
  }
}

export default Respuesta;
