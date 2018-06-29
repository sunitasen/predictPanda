import React from 'react';
import './FaceRecognition.css';
const FaceRecognition = ({imgurl ,box}) =>{
    return(
        <div className='center measure-wide f5 pv3 lh-solid ph5'>
            <div className='absolute mt2'>
                <img  id='inputImage ooi' alt='' src={imgurl} width='500px' height='500px' />
                <div className='boundingbox' style={{left:box.leftCol, top: box.topRow , right: box.rightCol, bottom:box.bottomRow}}></div>
            </div>
        </div>
    );
}

export default FaceRecognition; 