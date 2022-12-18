import * as Types from "@/types/index";
import { Table } from "antd";
import "./index.less";

export default ({
  nameList = [],
  columnCount = 5,
}: {
  nameList: Types.Type_Name[];
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
    let realName = `${index.toString().padStart(2, "0")} - ${name.姓氏}${
      name.人名_第一个字.char_item.char
    }${name.人名_第二个字.char_item.char}`;
    realNameList.push(realName);
  }

  // 拆分成实际姓名列表
  let tableDataSource = [];
  while (realNameList.length > 0) {
    let row: { [key: `name-${number}`]: string } = {};
    for (let i = 1; i <= columnCount; i++) {
      let realname = realNameList.shift();
      row[`name-${i}`] = realname ?? "";
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
