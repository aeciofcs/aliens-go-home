import React from 'react';
import Sky from './Sky';


const Canvas = () => {
    
    //const style = { border: '1px solid black' };
    const viewBox = [window.innerWidth / -2, 
                     100 - window.innerHeight, 
                     window.innerWidth, 
                     window.innerHeight];

    return (
        <svg 
            id="aliens-go-home-canvas"
            preserveAspectRatio="xMaxYMax nome"
            //style={style}
            viewBox={viewBox}
        >
            <Sky />
            <circle cx={0} cy={0} r={50} />
        </svg>
    );
};

export default Canvas;