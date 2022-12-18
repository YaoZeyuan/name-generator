import * as Types from "@/types/index";
import {
  Select,
  Button,
  Dropdown,
  DropdownButton,
  DropdownClickTrigger,
  DropdownContent,
  DropdownPosition,
  Menu,
  MenuCascader,
  ICascaderItem,
} from "zent";
import "./index.less";

export default ({ nameList = [] }: { nameList: Types.Type_Name[] }) => {
  let nodeList = [];
  let index = 0;
  for (let name of nameList) {
    index++;
    let realName = `${index.toString().padStart(2, "0")} - ${name.姓氏}${
      name.人名_第一个字.char_item.char
    }${name.人名_第二个字.char_item.char}`;
    let ele = (
      <div className="item">
        <Button key={realName} type="primary" outline>
          {realName}
        </Button>
      </div>
    );
    nodeList.push(ele);
  }

  return (
    <div className="name-list-block">
      <h3>姓名列表</h3>
      <div className="name-list">{nodeList}</div>
    </div>
  );
};
