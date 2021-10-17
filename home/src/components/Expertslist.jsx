import React from "react";
const Expertslist = () => {
  
  const [value, setValue] = React.useState([]);
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
    getlist()
    console.log(value)
    
  return (
    value
  );
};


export default  Expertslist;
