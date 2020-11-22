window.onload = function name() {
  var result = {};

  var textFillLabe = ["姓名"]; //以文本形式的填充字段

  var radioFillLabe = ["性别"]; //以单选形式的填充字段

  var selectFillLable = ["民族"]; //以选择器形式的填充字段

  var timeFillLable = ["毕业时间"]; //以时间形式的填充字段

  //label 映射表，可以配置更改某个key
  var labelMapping = {
    姓名: "name",
    性别: "sex",
    民族: "national",
    毕业时间: "graduationTime",
  };

  //模版是固定格式的json
  var template = {
    name: "熊亚楠",
    sex: "女",
    national: "彝族",
    graduationTime: "2020/11/01",
  };

  //检查节点是否存在fill字段
  var checkInnerHtml = function (node) {
    var html = node.innerHTML;

    if (html == undefined) {
      return false;
    }

    if (html.indexOf("<") > -1 || html.indexOf("</") > -1) {
      return false;
    }

    //TODO 这里的姓名是需要在模版文件中标注 需要改成正则表达式
    html = html.trim();
    html = html.replace(new RegExp(/(:|：)/g), "");
    node.innerHTML = html;
    if (
      textFillLabe.indexOf(html) > -1 ||
      radioFillLabe.indexOf(html) > -1 ||
      selectFillLable.indexOf(html) > -1 ||
      timeFillLable.indexOf(html) > -1
    ) {
      //TODO 去除：等多符号
      return true;
    }
  };

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
    if (textFillLabe.indexOf(label) > -1) {
      textFill(label, nodes);
      return;
    }
    if (radioFillLabe.indexOf(label) > -1) {
      radioFill(label, nodes);
      return;
    }
    if (selectFillLable.indexOf(label) > -1) {
      selectFill(label, nodes);
      return;
    }
    if (timeFillLable.indexOf(label) > -1) {
      timeFill(label, nodes);
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
        //
        for (let i = 0; i < e.children.length; i++) {
          if (e.children[i].localName === "input") {
            var sexInt = tempValue === "男" ? "0" : "1";
            if (
              e.children[i].value === tempValue ||
              e.children[i].value === sexInt
            ) {
              e.children[i].checked = true;
              break;
            }
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

    tempValue = tempValue.replaceAll("/", "-");
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
      console.error("labelMapping||template 中不存在:" + label);
      return;
    }

    return value;
  }

  function traverseNodes(node) {
    //判断是否是元素节点
    if (node.nodeType != 3 && node.nodeName != "SCRIPT") {
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
          traverseNodes(sonnode);
        }
      }
    }
  }
  traverseNodes(document.body);
};
