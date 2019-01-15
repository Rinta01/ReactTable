import React from 'react';
import './BottomBtns.css';

const DataBtns = (props) => {
    return (
        <div className="bottomBtnBox left">
            <button id="small" className={`bottomBtn ${"small" === props.dataSize ? "activeBtn" : ""}`} onClick={(e) => props.handleDataSize(e.target.id)}>Less Data</button>
            <button id="big" className={`bottomBtn ${"big" === props.dataSize ? "activeBtn" : ""}`} onClick={(e) => props.handleDataSize(e.target.id)}>More Data</button>
        </div>
    );
}

export default DataBtns;
