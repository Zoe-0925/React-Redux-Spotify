import React, { useState } from 'react';

export default function ShowMoreLink(props) {

    //TODO add css and font

    return (
        <div className="ShowMoreLink" style={{textAlign:"center", cursor:"pointer", fontSize:"25px"}} >
            {props.show && <p className="link" onClick={props.showMore}>Show More ⬇︎</p>}
            {!props.show && <p className="link" onClick={props.showLess}>Show Less ⬇︎</p>}
        </div>
    )
}