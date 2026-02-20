/**
 * 解析字库, 给出json后的编码, 方便编写/调试
 */
import v1, {
  Type_Pinyin,
} from "@/const/pinyin_按音调对汉字进行分类整理";


export default () => {
  return (
    <div>
      <pre>{JSON.stringify(v1, null, 2)}</pre>
    </div>
  );
};
