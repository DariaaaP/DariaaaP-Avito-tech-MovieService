import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Input, Flex } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import "./loginui.scss";

const LoginUI = () => {
    const [form] = Form.useForm();
    const [clientReady, setClientReady] = useState(false);

    useEffect(() => {
        setClientReady(true);
    }, []);

    return (
        <Form
            form={form}
            name="horizontal_login"
            layout="inline"
            style={{ flexDirection: "column", gap: "3rem" }}
        >
            <Flex className="wrapper-form">
                <Form.Item
                    name="username"
                    rules={[
                        {
                            required: true,
                            message: "Please input your username!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <UserOutlined className="site-form-item-icon" />
                        }
                        placeholder="Username"
                    />
                </Form.Item>
                <Form.Item
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: "Please input your password!",
                        },
                    ]}
                >
                    <Input
                        prefix={
                            <LockOutlined className="site-form-item-icon" />
                        }
                        type="password"
                        placeholder="Password"
                    />
                </Form.Item>
                <Form.Item shouldUpdate>
                    {() => (
                        <Link to={"/"}>
                            <Button
                                type="primary"
                                htmlType="submit"
                                disabled={
                                    !clientReady ||
                                    !form.isFieldsTouched(true) ||
                                    !!form
                                        .getFieldsError()
                                        .filter(({ errors }) => errors.length)
                                        .length
                                }
                                onClick={() =>
                                    localStorage.setItem("login", "true")
                                }
                            >
                                Log in
                            </Button>
                        </Link>
                    )}
                </Form.Item>
            </Flex>
            <Flex style={{ justifyContent: "space-around" }}>
                <Form.Item>
                    <Link to={"/"}>
                        <Button>Cancel</Button>
                    </Link>
                </Form.Item>
            </Flex>
        </Form>
    );
};

export default LoginUI;
