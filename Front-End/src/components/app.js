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

    this.cargarPregunta("58bb814fd5309c00110d995c");
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

  cargarRespuesta(id) {
      axios.get(ROOT_URL + "/respuestas/"+id)
      .then(response => {
        document.getElementsByClassName("index")[0].className = "";
        document.getElementsByClassName("next")[0].className = "content";
        this.cargarPregunta(response.data.preguntasHijo[0]);

      })
  }

  render(){
    return(
      <div>
        <section id="Preguntas" className="about section">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <h2 className="title text-center">{this.state.pregunta}</h2>
              </div>
            </div>
            <div className="row">
              <Respuestas respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)} cargarRespuesta={this.cargarRespuesta.bind(this)}/>
            </div>
          </div>
        </section>
        <div className="next">
        </div>
      </div>
    )
  }
}

export default App;
