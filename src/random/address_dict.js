const DICT = {
  110000: '北京',
  110100: '北京市',
  110101: '东城区',
  110102: '西城区',
  110105: '朝阳区',
  110106: '丰台区',
  110107: '石景山区',
  110108: '海淀区',
  110109: '门头沟区',
  110111: '房山区',
  110112: '通州区',
  110113: '顺义区',
  110114: '昌平区',
  110115: '大兴区',
  110116: '怀柔区',
  110117: '平谷区',
  310000: '上海',
  310100: '上海市',
  310101: '黄浦区',
  310107: '普陀区',
  310109: '虹口区',
  310110: '杨浦区',
  310115: '浦东新区',
  310117: '松江区',
  320000: '江苏省',
  320100: '南京市',
  320102: '玄武区',
  320104: '秦淮区',
  320105: '建邺区',
  320106: '鼓楼区',
  320111: '浦口区',
  320113: '栖霞区',
  320115: '江宁区',
  320116: '六合区',
  330000: '浙江省',
  330100: '杭州市',
  330102: '上城区',
  330103: '下城区',
  330104: '江干区',
  330105: '拱墅区',
  330106: '西湖区',
  330108: '滨江区',
  330109: '萧山区',
  330110: '余杭区',
  330122: '桐庐县',
  330127: '淳安县',
  330182: '建德市',
  330183: '富阳市',
  330185: '临安市',
  330200: '宁波市',
  330203: '海曙区',
  330225: '象山县',
  330226: '宁海县',
  330281: '余姚市',
  330282: '慈溪市',
  330283: '奉化市',
  330300: '温州市',
  330302: '鹿城区',
  330303: '龙湾区',
  330304: '瓯海区',
  330322: '洞头县',
  330324: '永嘉县',
  330328: '文成县',
  330329: '泰顺县',
  330381: '瑞安市',
  350000: '福建省',
  350200: '厦门市',
  350203: '思明区',
  350205: '海沧区',
  350206: '湖里区',
  350211: '集美区',
  350212: '同安区',
  350213: '翔安区',
  370000: '山东省',
  370200: '青岛市',
  370202: '市南区',
  370203: '市北区',
  370211: '黄岛区',
  370212: '崂山区',
  370213: '李沧区',
  370214: '城阳区',
  370281: '胶州市',
  370283: '平度市',
  440000: '广东省',
  440100: '广州市',
  440105: '海珠区',
  440106: '天河区',
  440111: '白云区',
  440114: '花都区',
  440115: '南沙区',
  440300: '深圳市',
  440303: '罗湖区',
  440304: '福田区',
  440305: '南山区',
  440306: '宝安区',
  440307: '龙岗区',
  440308: '盐田区',
  440400: '珠海市',
  440402: '香洲区',
  440403: '斗门区',
  440404: '金湾区',
  440488: '其它区',
  460000: '海南省',
  460100: '海口市',
  460105: '秀英区',
  460106: '龙华区',
  460107: '琼山区',
  460108: '美兰区',
  460109: '其它区',
  460200: '三亚市',
  500000: '重庆',
  500100: '重庆市',
  500101: '万州区',
  500102: '涪陵区',
  500103: '渝中区',
  500105: '江北区',
  500106: '沙坪坝区',
  500107: '九龙坡区',
  500112: '渝北区',
  510000: '四川省',
  510100: '成都市',
  510104: '锦江区',
  510107: '武侯区',
  510112: '龙泉驿区',
  510113: '青白江区',
  510122: '双流县',
  510181: '都江堰市',
  510182: '彭州市',
};

/**
 * 生成树状结构
 *
 * @param {array} list
 * @returns
 */
function tree(list) {
  const mapped = {}; // { id: name } 形式方便取值

  list.forEach((it) => {
    mapped[it.id] = it;
  });

  const result = [];

  list.forEach((it) => {
    if (it.pid === '') {
      result.push(it);
    } else {
      const parent = mapped[it.pid];
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(it);
      }
    }
  });

  return result;
}

/**
 * 解析数据父节点ID
 *
 * @param {array} dist
 * @returns
 */
function parse(dist) {
  return Object.keys(dist).map((id) => {
    let pid;

    if (id.slice(2, 6) === '0000') {
      pid = '';
    } else if (id.slice(4, 6) === '00') {
      pid = `${id.slice(0, 2)}0000`;
    } else {
      pid = `${id.slice(0, 4)}00`;
    }

    return { id, pid, name: dist[id] };
  });
}

export default tree(parse(DICT));
