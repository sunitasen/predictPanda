import React, { Component } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Clarifai from 'clarifai';
import Heading from './components/Heading/Heading';
import Link from './components/Link/Link';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Data from './components/Data/Data';

//Clarifai key
const app = new Clarifai.App({
  apiKey: 'c9479978db9f45aa8273b8d0fc5417c0 '});

//particles
const paricle ={
  particles: {
    number:{
      value:150,
      density:{
        enable: true,
        value_area: 1000,
      }
    } ,
    color:{
      value: '#181111',
    },
    line_linked: {
      color: "#f7eded",
    }
  },
}

class App extends Component {

  constructor(){
    super();
    this.state = {
      input: '',
      imgurl: '',
      box: {},
      age: '',
      gender : '',
      native : '',
      todisplay: false,
    }
 
  }

// submit data
  onSubmit = () =>{
    this.setState({imgurl : this.state.input});
    app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3",
      this.state.input)
      .then(response =>{
        this.displayFaceBox(this.calculateFaceLocation(response))
        this.findChanges(response)
      })
      .catch(err => console.log(err))
  }

// input gets changed 
  onInputChange = (event) => {
    this.setState ({input : event.target.value})
  }

  //displaying the box
  displayFaceBox = (box) =>{
    this.setState({box : box});
  }

  // calculation of face data
  calculateFaceLocation = (data) =>{
    this.setState({imgurl : this.state.input});
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.height);
    const height = Number(image.height);
   //console.log(clarifaiFace);
    return {
        leftCol : clarifaiFace.left_col * width,
        topRow : clarifaiFace.top_row *height ,
        rightCol : width -(clarifaiFace.right_col * width),
        bottomRow : height - (clarifaiFace.bottom_row * height),
    }
  }

  //age appearance and all
  findChanges = (data) => {
    //const age= Math.max(data.outputs[0].data.regions[0].data.face.age_appearance.concepts.map(o =>o.value));
   // const age = Math.max.apply(Math,data.outputs[0].data.regions[0].data.face.age_appearance.concepts.map(function(o){return o.value;}))
    const ProbableAge = Number(data.outputs[0].data.regions[0].data.face.age_appearance.concepts[0].name);
    const ProbableGender = data.outputs[0].data.regions[0].data.face.gender_appearance.concepts[0].name;
    const ProbableNative = data.outputs[0].data.regions[0].data.face.multicultural_appearance.concepts[0].name;
    //console.log(ProbableNative)
    this.setState({age : ProbableAge});
    this.setState({gender : ProbableGender});
    this.setState({native : ProbableNative});
    this.setState({todisplay : true});
  }

  render() {

    const {imgurl  ,box ,age ,native ,gender,todisplay} =this.state;

    return (
      <div className="App center">
      <Particles className='particles' params={paricle}/>
      <Heading />
      <Link 
      onInputChange ={this.onInputChange} 
      onSubmit ={this.onSubmit} 
      displayFaceBox ={this.displayFaceBox}
      calculateFaceLocation ={this.calculateFaceLocation}
      findChanges ={this.findChanges}
      box={box} imgurl={imgurl}
      />
      <FaceRecognition box={box} imgurl={imgurl}/>
      <Data age={age} gender={gender} native={native} todisplay={todisplay} />
      
      </div>
    );
  }
}

export default App;
