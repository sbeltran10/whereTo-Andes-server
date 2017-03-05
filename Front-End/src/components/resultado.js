import React, {Component} from 'react';

class Resultado extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <h2 className="title text-center">Para solucionar tu duda o problema puedes ir a: </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <h2 className="title text-center">{this.props.resultado.nombre}</h2>
            <img className="center" src={this.props.resultado.imagen} width="200px" height="50px"/>
          </div>
        </div>
        <div className="row">
          <h4>Ubicación:</h4> <p>{this.props.resultado.ubicacion}</p>
          <h4>Horario de atención:</h4> <p>{this.props.resultado.horario}</p>
        </div>
      </div>
    )
  }
}

export default Resultado;
