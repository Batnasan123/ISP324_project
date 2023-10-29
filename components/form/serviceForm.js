import React, { useState, useEffect } from "react";
import {
  Button,
  Steps,
  Form,
  Modal,
  Input,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import styles from "./CustomTimePicker.module.css";

const serviceForm = ({ data, events }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    form.setFieldsValue({
      userId: initialData?.user?.id,
      serviceId: data,
    });
  }, [data]);
  const detail = localStorage.getItem("beauty_detail");
  const initialData1 = detail === "undefined" ? null : detail;
  var initialData = initialData1 === null ? {} : JSON.parse(initialData1);
  //   const handleFormFinish = () => {
  //     events.handleCloseModal();
  //     form.submit();
  //   };
  const dateFormat = "YYYY/MM/DD";
  const format = "HH:mm";
  //   console.log("serviceId", data);
  return (
    <div>
      <Form
        layout="vertical"
        form={form}
        initialValues={{}}
        // onValuesChange={events.onHandleChange}
        onFinish={events.handleOnFinish}
      >
        <Form.Item name="serviceId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item name="userId" hidden>
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="employeeId"
          name="employeeId"
          rules={[
            {
              required: true,
              message: "Please select a employee!",
            },
          ]}
        >
          <InputNumber />
        </Form.Item>
        <Form.Item
          label="date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please select a date!",
            },
          ]}
        >
          <DatePicker format={dateFormat} />
        </Form.Item>
        <Form.Item
          label="time"
          name="time"
          rules={[
            {
              required: true,
              message: "Please select a time!",
            },
          ]}
        >
          {/* <Input /> */}
          <TimePicker className={styles.customTimePicker} format="HH:mm" />
        </Form.Item>
        {/* submit button */}
        <Form.Item>
          <Button
            className="bg-[#0F285F]"
            type="primary"
            htmlType="submit"
            // disabled={data?.maxSharesError}
          >
            submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default serviceForm;
