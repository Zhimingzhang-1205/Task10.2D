import React from "react";
import Expert from "./Expert";
import faker from "faker";

const Experts = () => {
  
  const [value, setValue] = React.useState(['']);
  const getlist = () =>{
    fetch('http://localhost:8000/task', {
          method: 'get',
          headers: { 'Content-Type': 'application/json' },
        })
          .then(response => response.json())
          .then(data => {
            setValue(data.msg)
          })
          .catch(err => {
            console.log("Error:" + err)
          })
        
  }
 
  // const experts = new Array(Math.ceil(faker.finance.amount(3, 8)))
  //   .fill(1)
  //   .map(() => {
  //     return {
  //       image: faker.image.animals(250, 100),
  //       name: faker.name.findName() + " " + faker.name.lastName(),
  //       description: faker.name.title(),
  //       rate: faker.finance.account(1, 5),
  //     };
  //   });
  const renderExperts = () => {
    getlist()
    return value.map((expert) => (
      <Expert key={expert.name} expert={expert} />
    ));
  };
  return (
    <div
      style={{
        width: "60%",
        margin: "0 auto",
      }}
    >
      <h1 style={{
          display: "flex",
          justifyContent: "center",
      }}>TASKS LIST</h1>
      {renderExperts()}
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default Experts;
