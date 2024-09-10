/* eslint-disable react/prop-types */
import { Form, Input } from "antd";
import { Controller } from "react-hook-form";


const TSInput = ({ type, name, label, disabled, placeholder }) => {
  return (
    <div>
      <Controller
        name={name} 
        render={({ field }) => (
          <Form.Item label={label} className="uppercase">
            <Input
              {...field}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
              placeholder={placeholder}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default TSInput;
