import { Button, DatePicker, Form, Select, Collapse } from "antd";
import { useState } from "react";
import { ControlOutlined, SlidersOutlined } from "@ant-design/icons";
import "./movieallfiltres.scss";
const collapseStyle = {
    width: "30%",
    position: "absolute",
    zIndex: 3,
    border: "none",
    backgroundColor: "transparent",
};

const itemsStyle = {
    border: "none",
};

const MovieAllFilters = () => {
    const [toggled, setToggled] = useState(false);

    // document.addEventListener("click", e => {
    //     e.stopPropagation();
    //     setToggled(false);
    // });

    const classNameToggle = toggled ? "filters filters--active" : "filters";

    const [open, setOpen] = useState();
    const handleSubmit = () => {
        setOpen();
        console.log(open);
    };
    return (
        <>
            <button
                onClick={e => {
                    // e.preventDefault();
                    e.stopPropagation();
                    setToggled(toggle => !toggle);
                }}
                id="filter-button"
                className="button"
            >
                Filter
            </button>
            <div id="filter-container" className={classNameToggle}>
                <Form
                    onFinish={handleSubmit}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 14,
                    }}
                    layout="vertical"
                    style={{
                        maxWidth: 600,
                    }}
                >
                    <Form.Item label="Страна">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                            <Select.Option value="demo2">Demo2</Select.Option>
                            <Select.Option value="demo3">Demo3</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Возрастной рейтинг">
                        <Select>
                            <Select.Option value="demo">Demo</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Год">
                        <DatePicker mode="year" picker="year" />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                            offset: 6,
                            span: 16,
                        }}
                    >
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => setToggled(false)}
                        >
                            Показать
                        </Button>
                    </Form.Item>
                </Form>
            </div>

            {/* <Collapse
                activeKey={open}
                expandIcon={({ isActive }) =>
                    isActive ? (
                        <ControlOutlined
                            style={{
                                fontSize: "x-large",
                                transform: "rotate(-90deg)",
                            }}
                        />
                    ) : (
                        <SlidersOutlined
                            style={{
                                fontSize: "x-large",
                                transform: "rotate(-90deg)",
                            }}
                        />
                    )
                }
                style={collapseStyle}
                onChange={e => {
                    console.log(e);
                    open === 1 ? setOpen() : setOpen(1);
                }}
                items={[
                    {
                        key: "1",
                        style: itemsStyle,
                        children: (
                            <Form
                                onFinish={handleSubmit}
                                labelCol={{
                                    span: 4,
                                }}
                                wrapperCol={{
                                    span: 14,
                                }}
                                layout="vertical"
                                style={{
                                    maxWidth: 600,
                                }}
                            >
                                <Form.Item label="Страна">
                                    <Select>
                                        <Select.Option value="demo">
                                            Demo
                                        </Select.Option>
                                        <Select.Option value="demo2">
                                            Demo2
                                        </Select.Option>
                                        <Select.Option value="demo3">
                                            Demo3
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Возрастной рейтинг">
                                    <Select>
                                        <Select.Option value="demo">
                                            Demo
                                        </Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item label="Год">
                                    <DatePicker mode="year" picker="year" />
                                </Form.Item>
                                <Form.Item
                                    wrapperCol={{
                                        offset: 6,
                                        span: 16,
                                    }}
                                >
                                    <Button type="primary" htmlType="submit">
                                        Показать
                                    </Button>
                                </Form.Item>
                            </Form>
                        ),
                    },
                ]}
            ></Collapse> */}
        </>
    );
};

export default MovieAllFilters;
