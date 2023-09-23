import React from 'react';

function Card(props) {

  return (
    <div style={{ float: 'center', backgroundColor: 'white', marginLeft: '35%', width: '30%', borderRadius: 10, height: props.half ? "395px" : '700px', margin:10, boxShadow: '0 3px 10px rgb(0 0 0 / 0.2)',}}>
      <div style={{height: 60, borderRadius: '10px 10px 0px 0px'}}>
        <div style={{fontFamily: "Inter", color: 'grey', 
            fontSize: "1.3rem", padding: 18, textAlign: 'center', alignContent: 'left', paddingLeft: '2%'
      } }>{props.title}</div>
        {props.children}
      </div>
    </div>
  );
}

export default Card;