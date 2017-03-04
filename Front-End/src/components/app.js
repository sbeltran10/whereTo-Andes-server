import React, {Component} from 'react';
import axios from 'axios';
import Respuestas from './respuestas';

var ROOT_URL = "http://whereto-andes-server.herokuapp.com";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pregunta:'',
      respuestas: [],
      resultado: {}
    }

    this.cargarPregunta("58baeb5a609f080c78011425");
  }

  agregarEstudiante() {
      axios.post(ROOT_URL + "/estudiantes", {
        nombre: this.state.nombre,
        codigo: this.state.codigo,
        nota: this.state.nota
      }).then(
        this.obtenerEstudiantes()
      )
  }

  cargarPregunta(id) {

      axios.get(ROOT_URL + "/preguntas/"+id)
      .then(response => {
        this.setState({
          pregunta: response.data.contenido,
          respuestas: response.data.respuestas
        })
      })
  }

  render(){
    return(
      <div>
        <section id="about" className="about section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="title text-center">{this.state.pregunta}</h2>
              </div>
            </div>
            <Respuestas respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)}/>
          </div>
        </section>
      </div>
    )
  }
}

export default App;
