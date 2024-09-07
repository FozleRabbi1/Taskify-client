/* eslint-disable react/prop-types */
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";


const TSInput = ({ type, name, label, disabled }) => {
  return (
    <div>
      <Controller
        name={name} 
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default TSInput;
