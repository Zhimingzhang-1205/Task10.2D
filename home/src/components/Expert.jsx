import React from "react";
import classes from "./Expert.module.css";

import { Rate, Card } from "antd";
const Expert = ({ expert }) => {
  return (
    <Card className={classes.expert}>
      <img src={"http://localhost:8000/"+expert.image} alt="" />
      <h3>{expert.title}</h3>
      <p>{expert.des}</p>
      <p>{expert.date}</p>
      <p>
        <Rate disabled defaultValue={expert.number} />
      </p>
    </Card>
  );
};

export default Expert;
