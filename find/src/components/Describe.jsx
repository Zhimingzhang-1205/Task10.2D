import React from "react";
import { Menu } from "antd";
import { Form, Input,Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import  "./Describe.css";
const Describe = (props) => {
  const menus = [
    { name: "Describe your task to Experts" },
  ];
  const fileList = [
    {
      uid: '-1',
      name: 'yyy.png',
      status: 'error',
    },
  ];
  const renderMenus = () => {
    return menus.map((item) => (
      <Menu.Item style={{ marginRight: "2vw" }} key={item.name} class={item.name}>
        {item.name}
      </Menu.Item>
    ));
  };
//   const [value, setValue] = React.useState(1);

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  
  return (
    <div class="comp">
    <Menu
      mode="horizontal"
      style={{
        display: "flex",
        justifyContent: "center",
        margin:"8px"
      }}
    >
      {renderMenus()}
      
      
    </Menu>
    <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Task Title"
        name="title"
        rules={[
          {
            required: true,
            message: 'Please input your title!',
          },
        ]}
      >
        <Input onChange={(e)=>{props.title(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please input your description!',
          },
        ]}
      >
        <Input onChange={(e)=>{props.des(e.target.value)}}/>
      </Form.Item>

      <Form.Item
        label="Add your image"
        name="description"
        rules={[
          {
            required: true,
            message: 'Please Add your image!',
          },
        ]}
      >
      <Upload
      action="http://localhost:8000/upimg"
      listType="picture"
      defaultFileList={[...fileList]}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
    <br />
    </Form.Item>
    </Form>
    </div>
  );
};

export default Describe;

