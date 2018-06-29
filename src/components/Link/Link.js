import React from 'react';
import './Link.css';
import Clarifai from 'clarifai';
import Data from '../Data/Data';

//Clarifai key
const app = new Clarifai.App({
    apiKey: 'c9479978db9f45aa8273b8d0fc5417c0 '});

class Link extends React.Component{
    constructor(){
        super();
        this.state = {
            image: '',
            input: '',
            imgurl: '',
            box: {},
            age: '',
            gender : '',
            native : '',
            todisplay: false,
        }
    }

    previewFile = () =>{
       var preview = document.querySelector('img');
        var file    = document.querySelector('input[type=file]').files[0];
        var reader  = new FileReader();
      
        reader.addEventListener("load",()=> {
         preview.src = reader.result;
          this.setState({image :  reader.result })
          const pos = this.state.image.lastIndexOf(',')+1;
          const len = this.state.image.length
          var res = this.state.image.slice(pos,len)
          this.setState({image : res})
        // console.log(res)
        }, false);
      
        if (file) {
          reader.readAsDataURL(file);
        }
      }

    submit = ( ) => {
        app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3",
        {base64:this.state.image})
        .then(response =>{
        //console.log(Response)
       this.displayFaceBox(this.calculateFaceLocation(response)) 
        this.findChanges(response)
        })
        .catch(err => console.log(err))       
    }

    displayFaceBox = (box) =>{
        this.setState({box : box});
      }
    
      // calculation of face data
      calculateFaceLocation = (data) =>{
       // this.setState({imgurl : this.state.input});
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


      render(){
            const {box , age, gender, native,todisplay} =this.state
        return(
            <div className= "pt5 center">
                <p className=' letme'>
                Hello,my name is PANDA, Predict Panda.I am good at guessing.<br/>
                Let me guess Something about you.Please enter your single image.
                </p>
                <p className=' letme'>
                this can take a few seconds please tolerate. :)
                </p>
                <div className='center form measure-wide' >
                    <div className= 'center form pa4  br3 shadow-5'>
                        <input className='f4 pa2 w-70 center' type='text' onChange={this.props.onInputChange} placeholder="enter the url of you image here" />
                        <button className='w-30 f4 link grow pointer ph3 pv2 dib white bg-light-purple' onClick={this.props.onSubmit}>Detect</button>
                    {/* <input type="file"  accept="image/png, image/jpeg" onchange={this.previewFile}/> */}
                        <br/>
                        <p className="f4">or</p>
                        <input type="file" onChange={this.previewFile}/> 
                        {/* <img src="" height="200" alt="preview..." id='ooi'/> */}
                        <button className='w-30 f4 link grow pointer ph3 pv2 dib white bg-light-purple' onClick={this.submit}>Detect</button>
                    </div>
                </div>        
            
    
            {/* image view */}


            <div className='center measure-wide f5 pv3 lh-solid ph5'>
                <div className='absolute mt2'>
                    <img  id='inputImage' alt='.'  width='500px' height='500px' />
                    <div className='boundingbox' style={{left:box.leftCol, top: box.topRow , right: box.rightCol, bottom:box.bottomRow}}></div>
                </div>
            </div>
            <Data age={age} gender={gender} native={native} todisplay={todisplay} />     
                       
            </div> 
            
        );
    }
}

export default Link;



