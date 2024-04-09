import { Pagination, Flex } from "antd";

const PaginationBar = ({ props }) => {
    const { page, FlexpageSize, pageCurrent, setPageSize, setPageCurrent } =
        props;
    return (
        <Flex justify={"center"} style={{ marginTop: "3%" }}>
            <Pagination
                total={page}
                pageSize={FlexpageSize}
                current={pageCurrent}
                onShowSizeChange={(pageCurrent, pageSize) => {
                    setPageSize(pageSize);
                    props.onRequest(pageCurrent, pageSize, true);
                }}
                onChange={(pageCurrent, pageSize) => {
                    setPageCurrent(pageCurrent);
                    props.onRequest(pageCurrent, pageSize, true);
                }}
            />
        </Flex>
    );
};

export default PaginationBar;
