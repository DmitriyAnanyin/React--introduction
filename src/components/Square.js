import React from "react";

export default function Square(props) {
    let className = 'square'
    
    if (props.isActive) {
        className += ' active'
    }

    return (
        <button
            className={className}
            onClick={props.onClick}
        >
            {props.value}
        </button>
    );
}
  