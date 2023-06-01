import  CharDb_820标准字符_List    from '@/database/char_db/standard_820_char.json'

export default () => {
  let eleList = []
  for(let str of CharDb_820标准字符_List){
    eleList.push(
      <p>{str}</p>
    )
  }
  const houxuanContent = `
xxxxx
    
`;

  return (
    <div>
      <pre
        style={{
          whiteSpace: "break-spaces",
        }}
      >
        {eleList}
      </pre>
    </div>
  );
};
