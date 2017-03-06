import React, {Component} from 'react';

class Resultado extends Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    var historia = {
      id:"",
      historia:  {
        nombre: ""
      }
    }
    axios.post(this.props.url + "/historias", this.state).then( response => {
        this.setState({
          correo: '',
          clave: ''
        });
        $('#login').hide();
        $('#registrate').hide();
        this.props.estaLogueado = true;
    })
  }

  render() {
    if(this.props.estaLogueado){
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
          <div className="row pad">
            <h4>Ubicación:</h4> <p>{this.props.resultado.ubicacion}</p>
            <h4>Horario de atención:</h4> <p>{this.props.resultado.horario}</p>
          </div>
          <div className="row pad">
            <form id="userRegisterForm" onSubmit={this.handleSubmit}>
              <button type="submit" className="btn btn-cta-primary">Guardar Resultado</button>
            </form>
          </div>
        </div>
      )
    } else {
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
          <div className="row pad">
            <h4>Ubicación:</h4> <p>{this.props.resultado.ubicacion}</p>
            <h4>Horario de atención:</h4> <p>{this.props.resultado.horario}</p>
          </div>
        </div>
      )
    }
  }
}

export default Resultado;
