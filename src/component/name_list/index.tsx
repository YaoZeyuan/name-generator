import * as CommonType from "@/../script/common/type";
import { Table } from "antd";
import "./index.less";

export default ({
  nameList = [],
  columnCount = 5,
}: {
  nameList: CommonType.Type_Name[];
  // 每行展示x个姓名
  columnCount: number;
}) => {
  let columns = [];
  for (let i = 1; i <= columnCount; i++) {
    columns.push({
      title: `姓名-${i}`,
      dataIndex: `name-${i}`,
      key: `name-${i}`,
    });
  }

  let index = 0;

  let realNameList: string[] = [];
  for (let name of nameList) {
    index++;
    let realName = `${index.toString().padStart(2, "0")} - ${name.demoStr}`;
    realNameList.push(realName);
  }

  // 拆分成实际姓名列表
  let tableDataSource = [];
  while (realNameList.length > 0) {
    let row: {
      key: string;
      [key: `name-${number}`]: string;
    } = {
      key: "",
    };
    for (let i = 1; i <= columnCount; i++) {
      let realname = realNameList.shift();
      row[`name-${i}`] = realname ?? "";
      row["key"] = `${realname}-${i}`;
    }
    tableDataSource.push(row);
  }

  return (
    <div className="name-list-block">
      <div className="name-list">
        <Table
          size="small"
          dataSource={tableDataSource}
          columns={columns}
        ></Table>
      </div>
    </div>
  );
};
