import CharDb_min_100标准字符_List from "@/database/char_db/min_100_olny_char.json";

export default (props: { level: string }) => {
  console.log("level =>", props.level);
  let eleList = [];
  for (let str of CharDb_min_100标准字符_List) {
    eleList.push(<p>{str}</p>);
  }
  const min100Content = `
xxxxxmin100
    
`;

  return (
    <div>
      <pre
        style={{
          whiteSpace: "break-spaces",
        }}
      >
        {min100Content}
      </pre>
    </div>
  );
};
