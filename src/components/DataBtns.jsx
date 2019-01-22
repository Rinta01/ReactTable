import React from 'react';
import '../css/BottomBtns.scss';

const DataBtns = props => {
    let classname = id =>
        `bottom-btn ${id === props.dataSize ? 'active-btn' : ''}`;
    const onClick = e => props.handleDataSize(e.target.id);
    return (
        <div className="bottom-btn-box left-box">
            <button id="small" className={classname('small')} onClick={onClick}>
                Less Data
            </button>
            <button id="big" className={classname('big')} onClick={onClick}>
                More Data
            </button>
        </div>
    );
};

export default DataBtns;
