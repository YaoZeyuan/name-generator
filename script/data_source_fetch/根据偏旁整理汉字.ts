import * as path from "path";
import * as fs from "fs";
import * as Const from "@/script/common/const";
import * as Type from "@/script/common/type";
const cnchar = require("cnchar");
const a = require("cnchar-radical");

/**
 * 根据偏旁整理汉字
 */
async function asyncRunner() {
  console.log("开始");
  const content =
    "一又于才与上小山千川久凡夕广义之卫子女飞乡丰开天夫元专云艺木太区友匹戈少中水贝见升长仁片化从分公月风丹凤文方为计认心予双书未末巧正卉功去世艾节本可左右石布龙平东北业帅归叶田央生禾们仪白用印乐处外冬务立兰汉宁让礼必讯永司民弘辽加边台邦扬芊芝朴权过臣西在有百存达列成尧迈至师光当早曳曲团同岁则刚年朱先廷竹乔伟传休优延任华自伊向行全会创朵旭名多争壮冲冰庆亦齐衣关米灯州江池汝兴宇守安军许农寻迅异阵阳丞如好羽观欢红纪驰麦形进远贡志报芸芷芮花芬芳严克苏杜材杉杨甫豆丽辰励来连轩步坚肖呈时园男别岐岑岚钊告利秀兵何佑作佟余希谷奂彤岛迎言应冷间灿沪沁怀宏良启初君灵际陆妍妙纯纳奉武青玥表玟规拓坤顶幸其茉若苗英苒直林松枫杭杰雨奈奔奇欧非肯卓虎尚旺昊果昆国昌畅昕明易昂旻迪典固忠咏岸岩凯峄图知和季委佳岳岱佩依欣所舍金采觅念朋服京夜府庚放炎浅河泊泌泓波泽怡学宝宗定宜官空实诗房诚诞建肃居承孟陌姗妮始参绅绍经春珂珀珍玲珊城政革茜荐茵荃荣故胡茹南标柯栋相柏栎树威厚耐轶轻皆战点临省盼显星昱昭贵思品勋哈钦看适香秋科重复段顺修俏保俐信皇泉侯追俊律胜脉独峦将亭亮度奕庭姿亲音彦施闻首总烁洁洪派洛济洋洲恒恺恬举宣宥客冠娅娆姝娇姚娜贺盈勇柔结骁骄艳泰珠班素振载起都哲聂恭莲莫莉荷莜莎莹真桂桓桥桃格根夏原顾致眠晓晏恩盎峰峻钰造积笔笑倩偌倾隽健航爱颂玺卿逢留凌栾高准资站部旅朔烟烨烊涛浦浩海流润浪悦宽家宵宾容窈朗祥展娱娟娴娣通能桑骋继骏琅珺探基菁菲萌菊萍菀萧菡彬梦梓盛雪堂常晨晞晗跃崇铤铭银甜符笠敏悠皎盘欲彩逸康章商旋望盖粒焕清鸿渠淑深涵寄隆婧婕婉绩绪维绵绽琴琪琳琛款越超博颉喜彭斯期联葛敬落萱韩森棉惠雄雯雅斐晴量晶遇晩景赋淼锐智筑策皓奥舒舜然斌童阑阔善翔普尊道港湘渺温游愉寒富裕幂谦强婷瑞瑜勤幕蓓蓉蒙颐献楠想楼感雷煦照路嵩锦筱鹏腾颖靖新歆韵意数猷煜滢溥源溪福群静碧瑶嘉赫慕暮熙蔚榕歌霆裴睿箐韶端潇漂赛翠慧璋璇聪蕊樊飘磊震影蝶黎德磐颜澎澜翩鹤燕蕾薇翰霖霏臻穆衡璨霞瞭攀馨耀曦巍露鑫";
  // @ts-ignore
  cnchar.use(a);
  let map: Record<
    string,
    {
      radical: string;
      charList: string[];
    }
  > = {};
  let charList = content.split("");
  for (let char of charList) {
    // @ts-ignore
    let item = cnchar.radical(char)[0];
    if (map[item.radical] === undefined) {
      map[item.radical] = {
        radical: item.radical,
        charList: [char],
      };
    } else {
      map[item.radical].charList.push(char);
    }

    console.log("item => ", item);
  }
  console.log(
    Object.values(map)
      .map((item) => item.charList.join(""))
      .sort((a, b) => {
        return b.length - a.length;
      })
      .join("\n")
  );

  console.log("完毕");
}

asyncRunner();
