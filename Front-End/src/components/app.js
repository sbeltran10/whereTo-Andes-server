import React, {Component} from 'react';
import axios from 'axios';
import Respuestas from './respuestas';
import Resultado from './resultado';
import Login from './login';
import Registro from './registro';
import Historia from './historia';

const ROOT_URL = "http://whereto-andes-server.herokuapp.com";
const PREGUNTA_INICIO = "58bb814fd5309c00110d995c";

class App extends Component {
  constructor(props) {
    super(props);
    var container = document.getElementById('visualization');
    this.state = {
      idPregunta: '',
      pregunta:'',
      respuestas: [],
      resultado: {},
      valoresRed:[],
      numero: 0,
      resultadoBoolean: false,
      estaLogueado: false,
      idUsuario: ''
    }
    this.cargarPregunta(PREGUNTA_INICIO);
  }

  cargarPregunta(id) {
      axios.get(ROOT_URL + "/preguntas/"+id)
      .then(response => {
        this.setState({
          idPregunta: id,
          pregunta: response.data.contenido,
          respuestas: response.data.respuestas
        })
      })
      if(this.state.numero===1) {
        $('html,body').animate({
        scrollTop: $("#visualization").offset().top},
        'slow');
      }
  }

  cargarResultado(id) {
      axios.get(ROOT_URL + "/resultados/"+id)
      .then(response => {
        this.setState({
          resultadoBoolean: true,
          resultado:{
            nombre: response.data.nombre,
            ubicacion: response.data.ubicacion,
            imagen: response.data.imagen,
            horario: response.data.horario
          }
        })
        this.state.numero= this.state.numero + 1;
        this.state.valoresRed.push(
        {
          id: id,
          idRespuesta: "-1",
          numero: this.state.numero,
          pregunta: "Respuesta",
          respuesta: response.data.nombre,
          start: this.getCurrentDate()
        });
        this.cargarTimeline();
      })
  }

  cargarRespuesta(id,pregunta,idPregunta) {
    $(".tituloGrafico").css("visibility","visible");
      axios.get(ROOT_URL + "/respuestas/"+id)
      .then(response => {
        this.state.numero = this.state.numero+1;
        this.state.valoresRed.push(
        {
          id: idPregunta,
          idRespuesta: id,
          numero: this.state.numero,
          pregunta: pregunta,
          respuesta: response.data.contenido,
          start: this.getCurrentDate()
        });
        this.cargarTimeline();
        if(response.data.resultadosHijo.length===0) {
          this.cargarPregunta(response.data.preguntasHijo[0]);
        } else {
          this.cargarResultado(response.data.resultadosHijo[0]);
        }
      })
  }

  cargarTimeline() {
      // create a handlebars template
      var source   = document.getElementById('item-template').innerHTML;
      var template = Handlebars.compile(source);

      // DOM element where the Timeline will be attached
      var container = document.getElementById('visualization');
      $("#visualization").html("");

      // Create a DataSet (allows two way data-binding)
      var items = new vis.DataSet(this.state.valoresRed);

      // Configuration for the Timeline
      var options = {
        // specify a template for the items
        template: template
      };

      var timeline = new vis.Timeline(container, items, options);
      var este=this;
      timeline.on("click", function (params) {
          este.cargarPreguntaTimeline(params.item);
      });
  }

  cargarPreguntaTimeline(item) {
      var termino=false;
      for (var i = this.state.valoresRed.length; i >0  && !termino; i--) {
        if(this.state.valoresRed[i-1].id===item) {
          if(this.state.valoresRed[i-1].idRespuesta==="-1"){
            alert("Ups!!! No puedes volver a la respuesta en la que ya estas :D");
            termino=true;
          } else {
            termino=true;
            this.state.numero=i-1;
            this.setState({
              resultadoBoolean: false
            });
            this.state.valoresRed.pop();
            this.cargarPregunta(item);
            this.cargarTimeline();
          }
        } else {
          this.state.valoresRed.pop();
        }
      }
  }

  getCurrentDate() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    var hh = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }

    return mm+'/'+dd+'/'+yyyy+"@"+hh+":"+m+":"+s;
  }

  cambiarEstadoLogueado(id) {
    if(this.state.estaLogueado) {
      this.state.estaLogueado = false;
    } else {
      this.state.estaLogueado = true;
    }
    if(id!=="undefined") {
      this.setState({
        idUsuario: id
      });
    }
  }

  guardarHistoria(nombre) {
    var pasos = [];
    for (var i = 0; i < this.state.valoresRed.length; i++) {
      var actual = this.state.valoresRed[i];
      if(i===this.state.valoresRed.length-1) {
        pasos.push( {
            pregunta: actual.id
          }
        );
      } else {
        pasos.push( {
            pregunta: actual.id,
            respuesta: actual.idRespuesta
          }
        );
      }
    }

    var historia = {
      usuario: this.state.idUsuario,
      nombre: nombre,
      pasos: pasos
    }

    console.log(historia);

    axios.post(ROOT_URL + "/historias", historia).then( response => {
        if (response.status===200){
          alert("Tu historia se a guardado de forma exitosa");
        }
    });
  }

  render(){
     if(this.state.resultadoBoolean) {
        return(
          <div>
            <section id="resultados" className="about section">
              <Resultado estaLogueado={this.state.estaLogueado} guardarHistoria={this.guardarHistoria.bind(this)} resultado={this.state.resultado}/>
            </section>
            <div className="tituloGrafico">Aquí puedes ver las respuestas que has dado a preguntas anteriores. Organizadas por el segundo exacto en el que las respondiste. Si respondiste mal y quieres devolverte a alguna, solo debes dar click en ella: </div>
            <div className="refrescar" id="visualization"></div>
            <section id="login" >
              <Login estaLogueado={this.state.estaLogueado} cambiarEstadoLogueado={this.cambiarEstadoLogueado.bind(this)} url={ROOT_URL}/>
            </section>
            <section id="registrate" >
              <Registro estaLogueado={this.state.estaLogueado} cambiarEstadoLogueado={this.cambiarEstadoLogueado.bind(this)} url={ROOT_URL}/>
            </section>
          </div>
        )
      } else {
      return(
          <div>
            <section id="preguntas" className="about section">
                <div className="row">
                  <div className="col-md-12">
                    <h2 className="title text-center">{this.state.pregunta}</h2>
                  </div>
                </div>
                <div className="row">
                  <div id="esconder">
                    <Respuestas idPregunta={this.state.idPregunta} pregunta={this.state.pregunta} respuestas={this.state.respuestas} cargarPregunta={this.cargarPregunta.bind(this)} cargarRespuesta={this.cargarRespuesta.bind(this)}/>
                  </div>
                </div>
            </section>
            <div className="tituloGrafico">Aquí puedes ver las respuestas que has dado a preguntas anteriores. Organizadas por el segundo exacto en el que las respondiste. Si respondiste mal y quieres devolverte a alguna, solo debes dar click en ella: </div>
            <div className="refrescar" id="visualization"></div>
            <section id="login" >
              <Login estaLogueado={this.state.estaLogueado}  cambiarEstadoLogueado={this.cambiarEstadoLogueado.bind(this)} url={ROOT_URL}/>
            </section>
            <section id="registrate" >
              <Registro estaLogueado={this.state.estaLogueado}  cambiarEstadoLogueado={this.cambiarEstadoLogueado.bind(this)} url={ROOT_URL}/>
            </section>
          </div>
      )
    }
  }
}

export default App;
