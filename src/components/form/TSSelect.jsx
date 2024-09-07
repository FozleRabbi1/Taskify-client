/* eslint-disable react/prop-types */
import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

const TSSelect = ({ label, name, options, disabled, mode }) => {
    return (
        <Controller
            name={name}
            render={({ field, fieldState: { error } }) => {
                return (
                    <Form.Item label={label}>
                        <Select
                            mode={mode}
                            style={{ width: "100%" }}
                            {...field}
                            options={options}
                            disabled={disabled}
                            size="large"
                        />
                        {error && <small style={{ color: "red" }}>{error.message}</small>}
                    </Form.Item>
                );
            }}
        />
    );
};

export default TSSelect;
