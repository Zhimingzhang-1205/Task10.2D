import React from "react";
import classes from "./Expert.module.css";

import { Rate, Card, Collapse } from "antd";
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const del = (title) => {

      fetch("http://localhost:8000/newtask/"+title,{
        method:'delete'
      }).then(data => {
        return data.text();
        window.location.reload()
      }).then(ret => {
        console.log(ret);
      })
 
}

const Expert = ({ expert }) => {
  return (
    <Card className={classes.expert}>
      <img src={"http://localhost:8000/"+expert.image} alt="" />
      <h3>{expert.title}</h3>
      <p>Suggest:{expert.suggest}</p>
      <p>Date:{expert.date}</p>
      <button onClick={()=>{del(expert.title)}}>Delete</button>
      <br/><br/>
      <Collapse accordion onChange={callback}>
    <Panel header="Task details" key="1">
      <p>Description:{expert.des}</p>
      <p>Suburb:{expert.suburb}</p>
      <p>Pay:{expert.number}</p>
    </Panel>
  </Collapse>
  <p>
        <Rate disabled defaultValue={expert.number} />
      </p>
    </Card>
  );
};

export default Expert;
