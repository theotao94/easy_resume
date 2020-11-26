var result = {};
var oldLabel;
var isInit = false;
var textFillLabe = [
  "姓名|",
  "籍贯|",
  "出生地|",
  "户口所在地|",
  "生源地|",
  "联系地址|",
  "邮政编码|",
  "固定电话|",
  "邮箱|",
  "手机号码|",
  "证件号码|",
  "期望薪资|",
  "个人特长爱好|",
  "四级成绩|",
  "六级成绩|",
  "托业成绩|",
  "新托福成绩|",
  "雅思成绩|",
  "其他语种水平|",
  "学校名称|",
  "学院名称|",
  "专业名称|",
  "学分绩|",
  "班级排名|",
]; //以文本形式的填充字段

var radioFillLabe = ["性别|", "是否接受调剂|"]; //以单选形式的填充字段

var selectFillLable = [
  "民族|",
  "政治面貌|",
  "国家承认最高学历|",
  "户口类型|",
  "健康状况|",
  "证件类型|",
  "学习形式|",
  "学历|",
  "学位|",
]; //以选择器形式的填充字段

var timeFillLable = ["毕业时间|", "出生日期|", "入党（团） 时间|"]; //以时间形式的填充字段

var schoolLable = ["学校名称|",
  "时间|",
  "学院名称|",
  "专业名称|",
  "学习形式|",
  "学历|",
  "学位|",
  "学分绩|",
  "班级排名|",];
//label 映射表，可以配置更改某个key
var labelMapping = {
  "姓名|": "name",
  "性别|": "sex",
  "民族|": "national",
  "毕业时间|": "graduationTime",
  "籍贯|": "hometown",
  "出生地|": "birthplace",
  "户口所在地|": "registeredResidence",
  "生源地|": "students",
  "联系地址|": "contactAddress",
  "邮政编码|": "postalCode",
  "固定电话|": "fixedTelephone",
  "邮箱|": "email",
  "手机号码|": "phoneNumber",
  "证件号码|": "IdNumber",
  "期望薪资|": "expectedSalary",
  "个人特长爱好|": "hobby",
  "四级成绩|": "cet4",
  "六级成绩|": "cet6",
  "托业成绩|": "TOEIC",
  "新托福成绩|": "TOEFL",
  "雅思成绩|": "IELTS",
  "其他语种水平|": "otherLanguageLevel",
  "是否接受调剂|": "hasAdjustment",
  "政治面貌|": "politicalStatus",
  "国家承认最高学历|": "highestEducationalLevel",
  "户口类型|": "accountType",
  "健康状况|": "health",
  "证件类型|": "documentType",
  "出生日期|": "birthTime",
  "入党（团） 时间|": "joiningThePartyTime",
  "学校名称|": "schoolName",
  "时间|": "learningTime",
  "学院名称|": "faculty",
  "专业名称|": "nameProfessional",
  "学习形式|": "learnForm",
  "学历|": "recordFormalSchooling",
  "学位|": "degreeIn",
  "学分绩|": "creditGrade",
  "班级排名|": "classRank",
};

//模版是固定格式的json
var template = {
  name: "熊亚楠",
  sex: "女",
  national: "彝族",
  graduationTime: "2020/11/01",
  students: "重庆邮电大学",
  registeredResidence: "深圳市南山区",
  birthplace: "云南省普洱市",
  hometown: "云南普洱",
  graduationTime: "2017-07-02",
  contactAddress: "深圳市宝安区西乡街道银田创意园",
  postalCode: "518000",
  fixedTelephone: "3203754",
  email: "17610906827@163.com",
  phoneNumber: "17610906827",
  IdNumber: "53272219940901003X",
  expectedSalary: "10K",
  hobby: "要你管？",
  cet4: "544",
  cet6: "456",
  TOEIC: "333",
  TOEFL: "222",
  IELTS: "222",
  otherLanguageLevel: "法语100级",
  hasAdjustment: "否",
  politicalStatus: "群众",
  highestEducationalLevel: "硕士研究生",
  accountType: "本地城镇",
  health: "良好",
  documentType: "身份证",
  birthTime: "1994-10-02",
  joiningThePartyTime: "2013-08-08",
  school: [{
    "schoolName": "",
    "learningTime": "",
    "faculty": "",
    "nameProfessional": "",
    "learnForm": "",
    "recordFormalSchooling": "",
    "degreeIn": "",
    "creditGrade": "",
    "classRank": "",
  },{
    "schoolName": "",
    "learningTime": "",
    "faculty": "",
    "nameProfessional": "",
    "learnForm": "",
    "recordFormalSchooling": "",
    "degreeIn": "",
    "creditGrade": "",
    "classRank": "",
  },
  ],
};

//检查节点是否存在fill字段
var checkInnerHtml = function (node) {
  oldLabel = node.innerHTML;

  if (oldLabel == undefined || oldLabel == "") {
    return false;
  }

  if (oldLabel.indexOf("<") > -1 || oldLabel.indexOf("</") > -1) {
    return false;
  }
  if (!(new RegExp("[\u4E00-\u9FA5]+").test(oldLabel))) {
    //纯数字不匹配
    return false;
  }

  //TODO 处理系div -》 span target 识别不到的情况
  //TODO 这里的姓名|是需要在模版文件中标注 需要改成正则表达式
  oldLabel = oldLabel.trim();
  oldLabel = oldLabel.replace(new RegExp(/(:|：)/g), "");
  node.innerHTML = oldLabel;
  if (isMatchLable(oldLabel)) {
    console.log("节点开始可以进行处理", oldLabel);
    return true;
  }
};

function isTextFillLabe(html) {
  var result = false;
  textFillLabe.some(function (key) {
    var regexp = RegExp("[|]*" + html + "[|]");
    result = regexp.test(key);
    if (result) {
      oldLabel = key;
    }
    return result;
  });
  return result;
}

function isRadioFillLabe(html) {
  var result = false;
  radioFillLabe.some(function (key) {
    var regexp = RegExp("[|]*" + html + "[|]");
    result = regexp.test(key);
    if (result) {
      oldLabel = key;
    }
    return result;
  });
  return result;
}

function isSchoolLable(html) {
  var result = false;
  schoolLable.some(function (key) {
    var regexp = RegExp("[|]*" + html + "[|]");
    result = regexp.test(key);
    if (result) {
      oldLabel = key;
    }
    return result;
  });
  return result;
}
function isSelectFillLable(html) {
  var result = false;
  selectFillLable.some(function (key) {
    var regexp = RegExp("[|]*" + html + "[|]");
    result = regexp.test(key);
    if (result) {
      oldLabel = key;
    }
    return result;
  });
  return result;
}

function isTimeFillLable(html) {
  var result = false;
  timeFillLable.some(function (key) {
    var regexp = RegExp("[|]*" + html + "[|]");
    result = regexp.test(key);
    if (result) {
      oldLabel = key;
    }
    return result;
  });
  return result;
}
function isMatchLable(label) {
  return (
    isTimeFillLable(label) |
    isSelectFillLable(label) |
    isRadioFillLabe(label) |
    isTextFillLabe(label)
  );
}
//nodeList -》 arry
function makeArry(nodelist) {
  var arr = null;
  try {
    arr = Array.prototype.slice.call(nodelist);
  } catch (e) {
    arr = [];
    for (var i = 0, len = nodelist.length; i < len; i++) {
      arr.push(nodelist[i]);
    }
  }

  return arr;
}
//处理指定类型字段
function handleInputValue(label, nodes) {

  if (isSchoolLable) {

  }
  if (isTextFillLabe(label)) {
    textFill(oldLabel, nodes);
    return;
  }
  if (isRadioFillLabe(label)) {
    radioFill(oldLabel, nodes);
    return;
  }
  if (isSelectFillLable(label)) {
    selectFill(oldLabel, nodes);
    return;
  }
  if (isTimeFillLable(label)) {
    timeFill(oldLabel, nodes);
    return;
  }
}

//文本input的填充处理
function textFill(label, nodes) {
  if (label === undefined || nodes === undefined) {
    console.error("textFill 参数错误");
    return;
  }
  console.log(label + " > 文本类型字段开始填充");

  nodes.some(function (e) {
    if (e.localName == "input") {
      var value = getTemplateFromFillLable(label);
      e.value = value;
      console.log(label + " > 文本填充值为:" + value);

      return true;
    }
    if (e.localName == "textarea") {
      //富文本标记
      var value = getTemplateFromFillLable(label);
      e.value = value;
      console.log(label + " > 文本填充值为:" + value);

      return true;
    }
  });
}

//单选框input的填充处理
function radioFill(label, nodes) {
  if (label === undefined || nodes === undefined) {
    console.error("textFill 参数错误");
    return;
  }

  console.log(label + " > 单选类型字段开始填充");

  var tempValue = getTemplateFromFillLable(label);

  nodes.forEach(function (e) {
    if (
      e.localName === "div" &&
      e.children != undefined &&
      e.children.length > 0
    ) {
      var inputs = [];
      console.log("这个元素", e);
      traverseNodes(e, inputs);
      console.log("这个元素后面的input", inputs);
      for (let i = 0; i < inputs.length; i++) {
        var sexInt = tempValue === "男" ? "0" : tempValue === "是" ? "0" : "1";
        if (inputs[i].value === tempValue || inputs[i].value === sexInt) {
          inputs[i].checked = true;
          break;
        }
      }
    }
  });
}
//处理select 下拉框
function selectFill(label, nodes) {
  if (label === undefined || nodes === undefined) {
    console.error("textFill 参数错误");
    return;
  }

  console.log(label + " > 选择类型字段开始填充");
  var tempValue = getTemplateFromFillLable(label);
  nodes.forEach(function (e) {
    if (
      e.localName === "select" &&
      e.children != undefined &&
      e.children.length > 0
    ) {
      for (let i = 0; i < e.children.length; i++) {
        if (e.children[i].localName === "option") {
          if (e.children[i].innerText === tempValue) {
            e.value = e.children[i].value;
            break;
          }
        }
      }
    }
  });
}

//时间类型的文本填充
function timeFill(label, nodes) {
  if (label === undefined || nodes === undefined) {
    console.error("textFill 参数错误");
    return;
  }
  console.log(label + " > 时间类型字段开始填充");
  var tempValue = getTemplateFromFillLable(label);

  tempValue = tempValue.replaceAll("-", "/");
  nodes.some(function (e) {
    if (e.localName == "input") {
      e.value = tempValue;
      console.log(label + " > 文本填充值为:" + tempValue);

      return true;
    }
  });
}

function getTemplateFromFillLable(label) {
  var mappinKey = labelMapping[label];
  var value = template[mappinKey];

  if (mappinKey === undefined || value === undefined) {
    console.error(
      "labelMapping||template 中不存在:" + label + "||" + mappinKey
    );
    return;
  }

  return value;
}

function traverseNodes(node, inputs) {
  //判断是否是元素节点
  if (node.nodeType != 3 && node.nodeName != "SCRIPT" && node.localName != 'style') {
    console.log('遍历节点', node.localName);
    if (node.localName === "input") {
      inputs.push(node);
    }
    if (checkInnerHtml(node)) {
      var nodeList = makeArry(node.parentNode.childNodes);

      nodeList = nodeList.splice(nodeList.indexOf(node));

      //过滤掉多余的节点
      nodeList = nodeList.filter(function (item) {
        if (item.nodeType != 3 && item.nodeName != "SCRIPT") {
          return item;
        }
      });

      //兄弟节点 第一个input
      console.log(
        '找到匹配  "' + node.innerHTML + '"  节点的兄弟元素',
        nodeList
      );

      handleInputValue(node.innerHTML, nodeList);
    }

    //判断该元素节点是否有子节点
    if (node.hasChildNodes) {
      //得到所有的子节点
      var sonnodes = node.childNodes;
      //遍历所有的子节点

      for (var i = 0; i < sonnodes.length; i++) {
        //得到具体的某个子节点
        var sonnode = sonnodes.item(i);
        //递归遍历
        traverseNodes(sonnode, inputs);
      }
    }
  }
}

function fillInfo() {
  console.log("填充开始");
  console.log(document.body);
  var golbal = [];
  traverseNodes(document.body, golbal);
  console.log("golbal", golbal);
}
fillInfo();

function fillSchool() {
  console.log('school');
}
