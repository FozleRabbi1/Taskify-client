/* eslint-disable react/prop-types */
import { Form } from "antd";
import { FormProvider, useForm } from "react-hook-form";

const TSForm = ({ onSubmit, children, defaultValues, resolver }) => {
  const formConfig = {};
  if (defaultValues) {
    formConfig.defaultValues = defaultValues;
  }
  if (resolver) {
    formConfig.resolver = resolver;
  }

  const methods = useForm(formConfig);
  const submit = (data) => {
    onSubmit(data);
    methods.reset();
  };

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default TSForm;
