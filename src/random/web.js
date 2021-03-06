import { integer, character } from './basic';
import { pick } from './helper';
import { word } from './text';

// 协议簇
const PROTOCOLS = ('' +
  // 'http https ws wss ssh ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais' +
  // 选择几个常用的协议
  'http https ws wss ftp' +
  '').split(' ');

// Top Level Domain
const TOP_LEVEL_DOMAINS = ('' +
  // 'com net org edu gov int mil cn ' +
  // 国内域名
  // 'com.cn net.cn gov.cn org.cn ' +
  // 中文国内域名
  // '中国 中国互联.公司 中国互联.网络 ' +
  // 新国际域名
  // 'tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ' +
  // 世界各国域名后缀
  // 'ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw' +

  // 以上域名赛选常用的几个
  'com net org cn ' +
  'com.cn net.cn gov.cn org.cn ' +
  'tv tw jp' +
  '').split(' ');

/**
 * 随机生成一个 URL 协议
 *
 * @export
 * @param {string|array} protocols
 * @returns
 */
export function protocol(protocols) {
  if (protocols) {
    protocols = typeof protocols === 'string' ? protocols.split(/[ ,]/) : protocols;
  } else {
    protocols = PROTOCOLS;
  }

  return pick(protocols || PROTOCOLS);
}

/**
 * 随机生成一个顶级域名
 *
 * @export
 * @param {string|array} topLevelDomains
 * @returns
 */
export function tld(topLevelDomains) {
  if (topLevelDomains) {
    topLevelDomains =
      typeof topLevelDomains === 'string' ? topLevelDomains.split(/[ ,]/) : topLevelDomains;
  } else {
    topLevelDomains = TOP_LEVEL_DOMAINS;
  }

  return pick(topLevelDomains);
}

/**
 * 随机生成一个域名
 *
 * @export
 * @param {string} secondLevelDomain
 * @param {string} topLevelDomain
 * @returns
 */
export function domain(secondLevelDomain, topLevelDomain) {
  const arr = [];

  if (secondLevelDomain) {
    arr.push(secondLevelDomain);
  }

  arr.push(word());
  arr.push(topLevelDomain || tld());

  return arr.join('.');
}

/**
 * 随机生成一个 URL
 *
 * @export
 * @param {string} protocolName
 * @param {string} host
 * @returns
 */
export function url(protocolName, host) {
  return `${protocolName || protocol()}://${host || domain()}/${word()}`;
}

/**
 * 随机生成一个邮件地址
 *
 * @export
 * @param {string} domain
 * @returns
 */
/* eslint no-shadow:0 */
export function email(domain) {
  return `${character('lower')}.${word()}@${domain || `${word()}.${tld()}`}`;
}

/**
 * 随机生成一个 IP 地址
 *
 * @export
 * @returns
 */
export function ip() {
  return `${integer(1, 254)}.${integer(0, 255)}.${integer(0, 255)}.${integer(1, 254)}`;
}
