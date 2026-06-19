const fs = require('fs/promises');

const UPSTREAM_BASE = process.env.UPSTREAM_BASE || 'https://raw.githubusercontent.com/HandsomeMJZ/cfip/refs/heads/main';
const LIMIT_PER_REGION = Number(process.env.LIMIT_PER_REGION || 5);

const COUNTRY_NAMES = {
  AE: '阿联酋',
  AL: '阿尔巴尼亚',
  AM: '亚美尼亚',
  AR: '阿根廷',
  AT: '奥地利',
  AU: '澳大利亚',
  BD: '孟加拉国',
  BE: '比利时',
  BG: '保加利亚',
  BR: '巴西',
  BY: '白俄罗斯',
  CA: '加拿大',
  CH: '瑞士',
  CL: '智利',
  CN: '中国大陆',
  CY: '塞浦路斯',
  CZ: '捷克',
  DE: '德国',
  DK: '丹麦',
  DO: '多米尼加',
  EE: '爱沙尼亚',
  EG: '埃及',
  ES: '西班牙',
  FI: '芬兰',
  FR: '法国',
  GB: '英国',
  GE: '格鲁吉亚',
  GR: '希腊',
  HK: '中国香港',
  HR: '克罗地亚',
  HU: '匈牙利',
  ID: '印度尼西亚',
  IE: '爱尔兰',
  IL: '以色列',
  IN: '印度',
  IS: '冰岛',
  IT: '意大利',
  JP: '日本',
  KG: '吉尔吉斯斯坦',
  KH: '柬埔寨',
  KR: '韩国',
  KZ: '哈萨克斯坦',
  LT: '立陶宛',
  LV: '拉脱维亚',
  MD: '摩尔多瓦',
  MK: '北马其顿',
  MX: '墨西哥',
  MY: '马来西亚',
  NL: '荷兰',
  NO: '挪威',
  NZ: '新西兰',
  PH: '菲律宾',
  PL: '波兰',
  PT: '葡萄牙',
  RO: '罗马尼亚',
  RS: '塞尔维亚',
  RU: '俄罗斯',
  SE: '瑞典',
  SG: '新加坡',
  SK: '斯洛伐克',
  TH: '泰国',
  TR: '土耳其',
  TW: '中国台湾',
  UA: '乌克兰',
  US: '美国',
  UZ: '乌兹别克斯坦',
  VN: '越南',
  ZA: '南非'
};

function parseRegion(line) {
  return line.match(/#([A-Z]{2})\b/)?.[1] || 'UNKNOWN';
}

function parseSpeed(line) {
  const matches = [...line.matchAll(/(\d+(?:\.\d+)?)\s*M/gi)];
  if (!matches.length) return 0;
  return Number(matches[matches.length - 1][1]);
}

function translateRegion(line) {
  return line.replace(/#([A-Z]{2})\b/, (match, code) => `#${COUNTRY_NAMES[code] || code}`);
}

function transform(text) {
  const groups = new Map();

  text.split(/\r?\n/)
    .map(line => line.trim())
    .filter(Boolean)
    .forEach((line, index) => {
      const region = parseRegion(line);
      if (!groups.has(region)) groups.set(region, []);
      groups.get(region).push({ line, index, speed: parseSpeed(line) });
    });

  const output = [];
  for (const group of groups.values()) {
    group
      .sort((a, b) => b.speed - a.speed || a.index - b.index)
      .slice(0, LIMIT_PER_REGION)
      .forEach(item => output.push(translateRegion(item.line)));
  }

  return output.join('\n') + '\n';
}

async function fetchText(name) {
  const response = await fetch(`${UPSTREAM_BASE}/${name}`, {
    headers: { 'User-Agent': '3436639997/cfip subscription updater' }
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${name}: ${response.status} ${response.statusText}`);
  }

  return response.text();
}

async function updateFile(name) {
  const upstreamText = await fetchText(name);
  const transformed = transform(upstreamText);
  await fs.writeFile(name, transformed, 'utf8');
  const lines = transformed.trim() ? transformed.trim().split(/\r?\n/).length : 0;
  console.log(`${name}: wrote ${lines} lines`);
}

async function main() {
  await updateFile('full_ips.txt');
  await updateFile('best_ips.txt');
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
