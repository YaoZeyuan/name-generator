import { Tooltip } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";

export default ({ title }: { title: string }) => {
  return (
    <Tooltip placement="topLeft" title={title}>
      &nbsp;
      <QuestionCircleOutlined />
    </Tooltip>
  );
};
