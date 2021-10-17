import React from "react";
import Expert from "./Expert";
import { Select } from 'antd';
import Search from "antd/lib/transfer/search";



const Experts = () => {
  const { Option } = Select;
 
  function handleChange(value) {
    console.log(`selected ${value}`);
    setSearch(value);
  }

  const [value, setValue] = React.useState(['']);
  const [search, setSearch]  = React.useState(['']);
  function getlist(value) {
    if (value == '') {
      fetch('http://localhost:8000/task', {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setValue(data.msg)
        })
        .catch(err => {
          console.log("Error:" + err)
        })
    } else {
      // fetch("http://localhost:8000/newtask/"+title,{
      //   method:'delete'
      // }).then(data => {
      //   return data.text();
      // }).then(ret => {
      //   console.log(ret);
      // })

      fetch('http://localhost:8000/newtask/' + value, {
        method: 'get',
        headers: { 'Content-Type': 'application/json' },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data)
          setValue(data)
        })
        .catch(err => {
          console.log("Error:" + err)
        })
    }


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
      <div>
        <span>Date</span>
        <Select defaultValue="00:00:00" style={{ width: 120 }} bordered={false} onChange={handleChange}>
          <Option value="01:00:00">01:00:00</Option>
          <Option value="02:00:00">02:00:00</Option>
          <Option value="03:00:00">03:00:00</Option>
          <Option value="04:00:00">04:00:00</Option>
          <Option value="05:00:00">05:00:00</Option>
          <Option value="06:00:00">06:00:00</Option>
          <Option value="07:00:00">07:00:00</Option>
          <Option value="08:00:00">08:00:00</Option>
          <Option value="09:00:00">09:00:00</Option>
          <Option value="10:00:00">10:00:00</Option>
          <Option value="11:00:00">11:00:00</Option>
          <Option value="00:00:00">00:00:00</Option>
        </Select>
        <span>Suburb</span>
        <Select defaultValue="TEST" style={{ width: 120 }} bordered={false} onChange={handleChange}>
          <Option value="TEST">TEST</Option>
          <Option value="Deakin">Deakin</Option>
          <Option value="HOME">HOME</Option>
        </Select>
        <span>Title</span>
        <Select defaultValue="1" style={{ width: 120 }} bordered={false} onChange={handleChange}>
          <Option value="3">3</Option>
          <Option value="1">1</Option>
          <Option value="2">2</Option>
        </Select>

        <button onClick={() => { getlist(search) }}>Confirm</button>
      </div>
      {renderExperts()}
      <div style={{ clear: "both" }}></div>
    </div>
  );
};

export default Experts;
