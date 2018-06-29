import React from 'react';
import './Data.css';
import Gif from '../Gif/Gif'

const Data  = ({ age ,native, gender , todisplay}) =>{


    return(
        <div className=''>
           { todisplay ?
           <div className= 'data pv4'>
               {/* age */}
               <div className="about">
                  It looks like, your age is  <i className="values">{`${age}`}</i>
               </div>
               {/* gender */}
               <div className="about">
                  I guess you are more <i className="values">{`${gender}`}</i>
               </div>
               {/* native */}
               <div className="about">
                  My prediction about your origin: <i className="values">{`${native}`}</i>
               </div>
               <br/>
               <div className='about f3'>
               So? was I somewhat near??
               </div>
               <Gif />

            </div>
            :
            <div>
                .
            </div>

           }
        </div>
    );
}

export default Data;