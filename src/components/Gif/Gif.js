import React from 'react';

class Gif extends React.Component{
    constructor(){
        super()
        this.state ={
            value: ''
        }
    }

    onAlter = () =>{
    this.setState({value: 'true'})
    }
    onNo = () =>{
        this.setState({value: 'false'})
        }

    render(){
        return(
            <div>
                <div className="ph3">
                <button type="button" className="btn btn-default pointer" onClick={this.onAlter}>Yes</button>
                <button type="button" className="btn btn-default" onClick={this.onNo}>No</button>
                <br/>
                {(this.state.value === 'true')
                ?
                <div>
                <img  src="https://img.freepik.com/free-vector/cartoon-emoticon-giving-thumb-up_42886-326.jpg?size=338&ext=jpg" height="200px" width="400px"  alt="preview" />
                <p className="f4">Thank you so much. This means a lot.</p>
                </div>
                :
                <p className="f6">.</p>
                }
                {(this.state.value==='false')
                ?
                <div>
                <img  src="https://i.pinimg.com/originals/31/e9/20/31e920826131ecfd3f3756afd03c336d.jpg" height="200px" width="400px"  alt="preview" />
                <p className="f4">Send a complaint message here(you can include your name even):<a href="https://sunitas.sarahah.com/" target="_blank" rel="noopener noreferrer">Sunita</a></p>
                </div>
                :
                <p className="f6">.</p>
                }
                </div>
               

            </div>
        );
    }

} 


export default Gif;