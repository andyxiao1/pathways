import React, { Component } from 'react';
import Flexbox from 'flexbox-react';
import '../styles/InformationContainer.css';

const InformationContainer = (props) => {
  const {
    connected,
    courses,
    pathways,
    selected
  } = props.store.getState();
  console.log("Stuff")
  console.log(selected);
  console.log(courses);
  console.log(connected);
  console.log(pathways);

  console.log("selected");
  const c = courses[selected];
  console.log(c);

  return c
    ? (
      <div className="card" style={{
        backgroundColor: "white", 
        padding: "1em",
        textAlign: "center",
        width: "100%",
        borderRadius: "5px",
        border: "1px solid rgba(34,36,38,.15)"
      }}>
        <h3 style={{textAlign: 'center', fontWeight: 700}}>{`HIST${c['number']}: ${c['title']}`}</h3>
        <p>{c['description']}</p>
      </div>
    ) : <div>Show pathway info</div>

  return (
    <div className="card white">
      <h3>Hello, world</h3>
    </div>
  );
}

export default InformationContainer;