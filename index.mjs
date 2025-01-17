var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

function getAugmentedNamespace(n) {
  var f = n.default;
	if (typeof f == "function") {
		var a = function () {
			return f.apply(this, arguments);
		};
		a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, '__esModule', {value: true});
	Object.keys(n).forEach(function (k) {
		var d = Object.getOwnPropertyDescriptor(n, k);
		Object.defineProperty(a, k, d.get ? d : {
			enumerable: true,
			get: function () {
				return n[k];
			}
		});
	});
	return a;
}

var tpl$2 = {exports: {}};

/*
global define
*/

(function (module, exports) {
	!(function () {
	  let f;
	  let b = {
	    open: '{{',
	    close: '}}'
	  };
	  let c = {
	    exp (a) {
	      return new RegExp(a, 'g')
	    },
	    query (a, c, e) {
	      let f = ['#([\\s\\S])+?', '([^{#}])*?'][a || 0];
	      return d((c || '') + b.open + f + b.close + (e || ''))
	    },
	    escape (a) {
	      return String(a || '')
	        .replace(/&(?!#?[a-zA-Z0-9]+;)/g, '&amp;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/'/g, '&#39;')
	        .replace(/"/g, '&quot;')
	    },
	    error (a, b) {
	      let c = 'Laytpl Error：';
	      return typeof console === 'object' && console.error(c + a + '\n' + (b || '')), c + a
	    }
	  };

	  let d = c.exp;

	  let e = function (a) {
	    this.tpl = a;
	  }
	  ;(e.pt = e.prototype),
	    (e.pt.parse = function (a, e) {
	      let f = this;

	      let g = a;

	      let h = d('^' + b.open + '#', '');

	      let i = d(b.close + '$', '');
	      a = a.replace(/\n/g, '＼ｎ');
	      a = a.replace(/\r/g, '＼ｒ')
	      // a=a.replace(/[\n\r\t]/g,"") //\t
	      ;(a = a
	        .replace(d(b.open + '#'), b.open + '# ')
	        .replace(d(b.close + '}'), '} ' + b.close)
	        .replace(/\\/g, '\\\\')
	        .replace(/(?="|')/g, '\\')
	        .replace(c.query(), function (a) {
	          return (a = a.replace(h, '').replace(i, '')), '";' + a.replace(/\\/g, '') + '; view+="'
	        })
	        .replace(c.query(1), function (a) {
	          let c = '"+(';
	          return a.replace(/\s/g, '') === b.open + b.close
	            ? ''
	            : ((a = a.replace(d(b.open + '|' + b.close), '')), /^=/.test(a) && ((a = a.replace(/^=/, '')), (c = '"+_escape_(')), c + a.replace(/\\/g, '') + ')+"')
	        })),
	        (a = '"use strict";let view = "' + a + '";return view;');
	      try {
	        return (f.cache = a = new Function('d, _escape_', a)), a(e, c.escape)
	      } catch (j) {
	        return delete f.cache, c.error(j, g)
	      }
	    }),
	    (e.pt.render = function (a, b) {
	      let e;
	      let d = this;
	      return a
	        ? ((e = d.cache
	            ? d.cache(a, c.escape)
	            : d
	                .parse(d.tpl, a)
	                .replaceAll('＼ｎ', '\n')
	                .replaceAll('＼ｒ', '\r')),
	          b ? (b(e), void 0) : e)
	        : c.error('no data')
	    }),
	    (f = function (a) {
	      return typeof a !== 'string' ? c.error('Template not found') : new e(a)
	    }),
	    (f.config = function (a) {
	      a = a || {};
	      for (let c in a) {
	        b[c] = a[c];
	      }
	    }),
	    (f.v = '1.1'),
	    (module.exports = f)
	      ;
	})();
} (tpl$2));

// @ts-check
/**
 * @namespace String_prototype
 */

const tpl$1 = tpl$2.exports;
var string$2 = {
  render (o) {
    /**
     * @memberof String_prototype#
     * @param {String} o - 渲染模板对象
     * @description html模板渲染
     * @function render
     * @return {string}
     * @example
     * '<{{d.tag}}></{{d.tag}}>'.render({ tag: 'div' })
     * // <div></div>
     */

    return tpl$1(this).render(o)
  },

  fillStr (str, len, pos = 1) {
    // 填入什么字符多少位,中文算2个字符,pos1右面，-1左面
    /**
     * @memberof String_prototype#
     * @param {string} str - 填充字符
     * @param {number} len - 总长度
     * @param {number} pos - 1右面，-1左面
     * @description html模板渲染
     * @function fillStr
     * @return {string}
     * @example
     * 'bcdef'.fillStr('a', 8, 1)
     * // bcdefaaa
     */

    const l = (this + '').len();
    const s = len - l > 0 ? str.times(len - l) : '';
    return ~pos ? this + s : s + this
  },

  toMoney (p = 3) {
    // p精度
    /**
     * @memberof String_prototype#
     * @param {number} p - 精度
     * @description 数字转金额显示
     * @function toMoney
     * @return {string}
     * @example
     * '-9812345678.45678901'.toMoney(2)
     * // '-9,812,345,678.45'
     */

    let num = String(this);
    num = num.replace(new RegExp(',', 'g'), '');
    // 正负号处理
    let symbol = '';
    if (/^([-+]).*$/.test(num)) {
      symbol = num.replace(/^([-+]).*$/, '$1');
      num = num.replace(/^([-+])(.*)$/, '$2');
    }
    if (/^[-.0-9]+(\.\d+)?$/.test(num)) {
      num = num.replace(new RegExp('^[0]+', 'g'), '');
      if (/^\./.test(num)) {
        num = '0' + num;
      }
      let decimal = num.replace(/^\d+(\.\d+)?$/, '$1');
      let integer = num.replace(/^(\d+)(\.\d+)?$/, '$1');
      const re = /(\d+)(\d{3})/;
      while (re.test(integer)) {
        integer = integer.replace(re, '$1,$2');
      }
      if (Number(p)) {
        decimal = decimal.substr(0, Number(p) + 1);
      }
      if (p === 0) {
        decimal = '';
      }
      return symbol + integer + decimal
    } else {
      return p
    }
  },

  toLow () {
    /**
     * @memberof String_prototype#
     * @description 字符串转小写
     * @function toLow
     * @return {string}
     * @example
     * 'AsdF'.toLow()
     * // 'asdf'
     */

    return this.toLowerCase()
  },

  toUp () {
    /**
     * @memberof String_prototype#
     * @description 字符串转大写
     * @function toUp
     * @return {string}
     * @example
     * 'AsdF'.toUp()
     * // 'ASDF'
     */

    return this.toUpperCase()
  },
  toDate () {
    let d;
    if (/\d{8}/g.test(this)) {
      const a = this.split('');
      d = a[0] + a[1] + a[2] + a[3] + '-' + +a[4] + +a[5] + '-' + +a[6] + +a[7];
    } else {
      d = this;
    }
    d = new Date(d);
    return d.toString() === 'Invalid Date' ? -1 : d
  },
  esHtml () {
    /**
     * @memberof String_prototype#
     * @description 转译成html
     * @function esHtml
     * @return {string}
     * @example
     * '&<>'.esHtml()
     * // '&amp;&lt;&gt;'
     */

    const o = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;',
      "'": '&#39;',
      '\u00a0': '&nbsp;'
    };
    return this.replace(/[<>&"'\\u00a0]/g, function (s) {
      return o[s]
    })
  },

  toHtml () {
    /**
     * @memberof String_prototype#
     * @description html转译
     * @function toHtml
     * @return {string}
     * @example
     * '&amp;&lt;&gt;'.toHtml()
     * // '&<>'
     */

    return this.replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&amp;/g, '&')
      .replace(/&quot;/g, '"')
      .replace(/&nbsp;/g, '\u00a0')
  },

  reHtml () {
    /**
     * @memberof String_prototype#
     * @description html相关元素去掉
     * @function reHtml
     * @return {string}
     * @example
     * '<div><a>xx</a><div><div>yy</div>'.reHtml()
     * // xxyy
     */

    return this.replace(/(<([^>]+)>)/gi, '').replace(/[\r\n]/g, '')
  },

  times (n) {
    // NOTICE: 原生repeat 比times快一个数量级
    /**
     * @memberof String_prototype#
     * @description 字符串重复输出
     * @param {number} n - 重复次数
     * @function times
     * @return {string}
     * @example
     * 'abc'.times(2)
     * // 'abcabc'
     */

    if (n <= 0) {
      return ''
    }
    return this.repeat ? this.repeat(n) : new Array(n + 1).join(this)
  },

  format () {
    /**
     * @memberof String_prototype#
     * @description 字符串格式化替换输出
     * @function format
     * @return {string}
     * @example
     * 'a{0}c{1}e{2}g{3}'.format('b', 'd', 'f', 1)
     * // 'abcdefg1'
     */

    const [s, a] = [this, []];
    for (let i = 0, l = arguments.length; i < l; i++) {
      a.push(arguments[i]);
    }
    return s.replace(/\{(\d+)\}/g, function (_, i) {
      return a[i] || '{' + i + '}'
    })
  },

  len () {
    /**
     * @memberof String_prototype#
     * @description 字符串占用空间大小
     * @function len
     * @return {number}
     * @example
     * '我a'.len()
     * // 3
     */
    return this.replace(/[^\x00-\xff]/gm, '**').length //eslint-disable-line
  },

  toInt () {
    /**
     * @memberof String_prototype#
     * @description 转化为int类型
     * @function toInt
     * @return {number}
     * @example
     * '12.3'.toInt()
     * // 12
     */

    return parseInt(this, 10)
  },

  replaceAll (s1, s2) {
    /**
     * @memberof String_prototype#
     * @description 替换字符串
     * @param {string} s1 - 原字符串
     * @param {string} s2 - 新字符串
     * @function replaceAll
     * @return {string}
     * @example
     * 'aaabbbccc'.replaceAll('b', 'x')
     * // 'aaaxxxccc'
     */

    const a = this.split(s1);
    return a.join(s2)
  },

  /*
  trim () {
      @memberof String_prototype#
      @description 字符串前后替换空格
      @function trim
      @return {string}
      @example
      ' x x x   '.trim()
      // 'x x x'

    return this.replace(/^\s+|\s+$/g, '')
  },
*/

  camelize (split = '-') {
    /**
     * @memberof String_prototype#
     * @description -后字符大写转换一个字符
     * @function camelize
     * @param {string} split - 分割字符串默认-
     * @return {string}
     * @example
     * 'a-b-c-d-da-d'.camelize()
     * // 'aBCDDaD'
     */

    return this.replace(new RegExp(`(${split}[a-z])`, 'g'), function (s) {
      return s.substring(1).toUpperCase()
    })
  },
  deCamelize (split = '-') {
    /**
     * @memberof String_prototype#
     * @description 反驼峰化
     * @param {string} split - 分割字符串默认-
     * @function deCamelize
     * @return {string}
     * @example
     * 'aBCDDaD'.deCamelize()
     * 'a-b-c-d-da-d'
     */

    return this.replace(/([A-Z])/g, `${split}$1`).toLowerCase()
  },
  ec (s) {
    /**
     * @memberof String_prototype#
     * @description - 判断是否存在s字符串 单独包含 用于class name操作
     * @param {string} s - 字符串
     * @function ec
     * @return {bool}
     * @example
     * ' as df '.ec('as')
     * // true
     */

    s = s.trim();
    return new RegExp('(^' + s + '\\s)|(\\s' + s + '$)|(\\s' + s + '\\s)|(^' + s + '$)', 'g').test(this)
  },

  tc (s) {
    /**
     * @memberof String_prototype#
     * @description - 增加 & 删除 s字符串内容 用于class name操作
     * @param {string} s - 字符串
     * @function tc
     * @return {string}
     * @example
     * ' as df '.tc('as').tc('dd')
     * // df dd
     */

    s = s.trim();
    if (this.ec(s)) {
      return this.dc(s)
    } else {
      return this.ac(s)
    }
  },

  dc (s) {
    /**
     * @memberof String_prototype#
     * @description - 删除 s字符串内容 用于class name操作
     * @param {string} s - 字符串
     * @function dc
     * @return {string}
     * @example
     * ' as df '.dc('as')
     * // df
     */

    if (this.ec(s)) {
      return this.trim()
        .split(s)
        .join('')
        .replace(/\s{2,}/g, ' ')
        .trim()
    } else {
      return this
    }
  },

  ac (s) {
    /**
     * @memberof String_prototype#
     * @description - 增加 s字符串内容 用于class name操作
     * @param {string} s - 字符串
     * @function ac
     * @return {string}
     * @example
     * ' as df '.ac('as')
     * // df as
     */

    return this.trim().dc(s) + ' ' + s
  },

  upperFirst () {
    // 首字母大写
    /**
     * @memberof String_prototype#
     * @description -首字母大写
     * @function upperFirst
     * @return {string}
     * @example
     * 'abcd'.upperFirst()
     * // 'Abcd'
     */

    const s = this.toLowerCase();
    return s.replace(/\b(\w)|\s(\w)/g, function (m) {
      return m.toUpperCase()
    })
  }
};

// @ts-check
/**
 * @namespace Number_prototype
 */

var number$2 = {
  round (p) {
    /**
     * @memberof Number_prototype#
     * @param {number} p - 保留小数点
     * @description 四舍五入到某一位
     * @function round
     * @return {number}
     * @example
     * 1.123456789.round(6)
     * // 1.123457
     */

    p = Math.pow(10, p || 0);
    return Math.round(this * p) / p
  },

  prettyBytes (precision = 3, addSpace = true, unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']) {
    /**
     * @memberof Number_prototype#
     * @param {number} precision - 精度
     * @param {Boolean} addSpace - 和单位之间是否有空格
     * @description 美化字节输出
     * @function prettyBytes
     * @return {String}
     * @example
     * (1000).prettyBytes()
     * // 1 KB
     */

    if (Math.abs(this) < 1) {
      return this.round(precision) + (addSpace ? ' ' : '') + unit[0]
    }
    const exponent = Math.min(Math.floor(Math.log10(this < 0 ? -this : this) / 3), unit.length - 1);
    const n = Number(((this < 0 ? -this : this) / 1000 ** exponent).toPrecision(precision));
    return (this < 0 ? '-' : '') + n + (addSpace ? ' ' : '') + unit[exponent]
  },
  isPrime () {
    /**
     * @memberof Number_prototype#
     * @description 判断质数
     * @function isPrime
     * @return {bool}
     * @example
     * (15).isPrime()
     * // false
     */

    if (this === 2) {
      // 2是质数
      return true
    } else if (this % 2 === 0) {
      // 排除偶数
      return false
    }
    // 依次判断是否能被奇数整除，最大循环为数值的开方
    const squareRoot = Math.sqrt(this);
    // 因为2已经验证过，所以从3开始；且已经排除偶数，所以每次加2
    for (let i = 3; i <= squareRoot; i += 2) {
      if (this % i === 0) {
        return false
      }
    }
    return true
  },

  /**
   * @memberof Number_prototype#
   * @description 同String.fillStr
   * @function fillStr
   * @return {String}
   */

  fillStr: String.prototype.fillStr
};

// @ts-check
// 日期原型扩展
/**
 * @namespace Date_prototype
 */

const getYearWeek = function (dateObj) {
  const [a, b, c] = [dateObj.getFullYear(), dateObj.getMonth() + 1, dateObj.getDate()];

  /*
    d1是当前日期
    d2是当年第一天
    d是当前日期是今年第多少天
    用d + 当前年的第一天的周差距的和在除以7就是本年第几周
    */

  const d1 = new Date(a, parseInt(b) - 1, c);
  const d2 = new Date(a, 0, 1);
  const d = Math.round((d1.valueOf() - d2.valueOf()) / 86400000);
  return Math.ceil((d + (d2.getDay() + 1 - 1)) / 7)
};

const format$1 = function (s = 'yyyy-MM-dd hh:mm:ss') {
  const o = {
    'M+': this.getMonth() + 1, // 月份
    'w+': getYearWeek(this), // 周
    'W+': getYearWeek(this), // 周
    'd+': this.getDate(), // 日
    'D+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'H+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    S: this.getMilliseconds(), // 毫秒
    X: (+this / 1000) | 0 // unix秒
  };
  if (/([yY]+)/.test(s)) {
    s = s.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(s)) {
      s = s.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
    }
  }
  return s
};

const dateOffset = function (interval, number) {
  const me = this;
  const k = {
    y: 'FullYear',
    q: 'Month',
    M: 'Month',
    w: 'Date',
    d: 'Date',
    h: 'Hours',
    m: 'Minutes',
    s: 'Seconds',
    ms: 'MilliSeconds'
  };
  const n = {
    q: 3,
    w: 7
  };
  me['set' + k[interval]](me['get' + k[interval]]() + (n[interval] || 1) * number);
  return me
};

const isLeap = d => new Date(d.getFullYear(), 1, 29).getDate() === 29;

const myDate = {
  /**
   * @function isLeap
   * @description 是否闰年
   * @memberof Date_prototype#
   * @return {Boolean} 返回 true/false
   * @param {Date} d
   */

  isLeap () {
    return isLeap(this)
  },

  /**
   * @function format
   * @type {Function}
   * @description 格式化日期
   * @memberof Date_prototype#
   * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
   * @return {string} 返回 日期模板的结果.
   * @example
   * $.now().format('yyyy-MM-dd hh:mm:ss')
   * // 2019-6-1 10:19:01
   */

  format (s) {
    return format$1.call(this, s)
  },

  /**
   * @function getWeek
   * @description 本年的第几周
   * @memberof Date_prototype#
   * @return {number}
   * @param {Date} d
   */

  getWeek () {
    return getYearWeek(this)
  },

  /**
   * @function date2Str
   * @description 格式化日期
   * @memberof Date_prototype#
   * @param {string} s - 日期模板 yyyy/YYYY mm/MM ww/WW dd/DD hh/HH mm ss SS(毫秒) q(季度) X(unix秒).
   * @return {string} 返回 日期模板的结果.
   * @example
   * $.now().date2Str('yyyy-MM-dd hh:mm:ss')
   * // 2019-6-1 10:19:01
   */

  date2Str () {
    return format$1.call(this)
  },

  /**
   * @memberof Date_prototype#
   * @function date8
   * @description 日期格式化8位函数.
   * @param {string} s - 分隔符.
   * @return {string} 返回 格式化结果.
   * @example
   * $.now().date8()
   * $.date.date8(new Date())
   * // 20190601
   */

  date8 (s = '') {
    let m = this.getMonth() + 1;
    let d = this.getDate();
    m = m <= 9 ? '0' + m : m;
    d = d <= 9 ? '0' + d : d;
    s = s || '';
    return [this.getFullYear(), m, d].join(s)
  },

  /**
   * @function dateAdd
   * @description 日期偏移操作.
   * @memberof Date_prototype#
   * @param {string} i interval 年月日时分秒周季 yMdhnswq.
   * @param {number} n 时间间隔 可正负.
   * @return {string} 返回 得到日期年月日等加数字后的日期.
   * @example
   * $.now().dateAdd('y',-1)
   * $.date.dateAdd(new Date())
   * // 2018-6-1 10:19:01
   */

  dateAdd (i, n) {
    return dateOffset.call(this, i, n)
  },

  /**
   * @function offset
   * @description 日期偏移操作.
   * @memberof Date_prototype#
   * @param {string} i interval 年月日时分秒周季 yMdhnswq.
   * @param {number} n 时间间隔 可正负.
   * @return {string} 返回 得到日期年月日等加数字后的日期.
   * @example
   * $.now().offset('y',-1)
   * $.date.offset(new Date())
   * // 2018-6-1 10:19:01
   */

  offset (i, n) {
    return dateOffset.call(this, i, n)
  }
};

var date$2 = myDate;

// @ts-check
/**
 * @namespace Function_prototype
 */

var _function = {
  /**
   * @memberof Function_prototype#
   * @param {number} s - 开始的字符串
   * @param {number} e - 结束的字符串
   * @description 获取函数内部注解
   * @function help
   * @return {String}
   * @example
   * (function(){\/* comment1 *\/}).help()
   * // 'comment1'
   */

  help (s = '/*', e = '*/') {
    let l = '' + this;
    l = l.substring(l.indexOf(s) + 3, l.lastIndexOf(e));
    return l.trim()
  }
};

var empty = {};

var empty$1 = /*#__PURE__*/Object.freeze({
	__proto__: null,
	'default': empty
});

var require$$0 = /*@__PURE__*/getAugmentedNamespace(empty$1);

// @ts-check

/**
 * @namespace MathRand
 */

let secRand;
let crypto$2;
const uniformRandInt = (a, b) => {
  /**
    * @memberof MathRand#
    * @description 返回相对均匀的[a,b]之间的整数
    * @function uniformRandInt
    * @param {Number} a - 范围最小值
    * @param {Number} b - 范围最大值
    * @return {Number}
    * $.tools.rnd(-100, -100)
    // -100
    */

  let num;
  if (a > b) {
[a, b] = [b, a];
  }
  const maxEx = b + 5;
  do {
    num = Math.floor(Math.random() * (maxEx - a) + a);
    num -= 4;
  } while (num < a || num > b)
  return num
  // return Math.round(Math.random() * (b - a)) + a // NOTICE: 传统方式会造成2端的值不平均
};
const randInt = uniformRandInt;
try {
  crypto$2 = require$$0;
} catch (err) {
  console.log('crypto support is disabled!');
}
if (crypto$2 !== undefined) {
  /*
 （1）首先找到样本数据Y的最小值Min及最大值Max
 （2）计算系数为：k=(b-a)/(Max-Min)
 （3）得到归一化到[a,b)区间的数据：norY=a+k(Y-Min)
  */
  secRand = (a, b) => {
    const r = crypto$2.randomBytes(4); // 0-4294967295
    return Math.floor(((b - a + 1) / 4294967295) * r.readUInt32LE(0)) + a
  };
} else {
  secRand = uniformRandInt;
}

const E = Math.E;
const PI = Math.PI;
const PI_2 = PI / 2;
const uniformBase = (a, b) => {
  /**
    * @memberof MathRand#
    * @description 返回[a,b)之间的数
    * @function uniformBase
    * @param {Number} a - 范围最小值
    * @param {Number} b - 范围最大值
    * @return {Number}
    * uniformBase(-1.1, 1.1)
    // -1.01

    function random(lower, upper) { // [a,b)
        return Math.floor(Math.random() * (upper - lower)) + lower
    }
    function random(lower, upper) { // [a,b]
        return Math.floor(Math.random() * (upper - lower + 1)) + lower
    }
    */

  return a + (b - a) * Math.random()
};

const normal = (mu = 0, sigma = 1) => {
  /**
    * @memberof MathRand#
    * @description 返回 默认参数下 [-无穷大，+无穷大] 在-1.96～+1.96范围内曲线下的面积等于0.9500，在-2.58～+2.58范围内曲线下面积为0.9900
    * @function normal
    * @param {Number} mu
    * @param {Number} sigma
    * @return {Number}
    * normal()
    // -100
    */

  let p, p1, p2;
  do {
    p1 = uniformBase(-1, 1);
    p2 = uniformBase(-1, 1);
    p = p1 * p1 + p2 * p2;
  } while (p >= 1)

  return mu + sigma * p1 * Math.sqrt((-2 * Math.log(p)) / p)
};
const arcsine = function (a, b) {
  const q = Math.sin(PI_2 * uniformBase(0, 1));
  return a + (b - a) * q * q
};
const exponential = function (a, b) {
  return a - b * Math.log(uniformBase(0, 1))
};
const gamma = function (a, b, c) {
  const A = 1 / Math.sqrt(2 * c - 1);
  const B = c - Math.log(4);
  const Q = c + 1 / A;
  const T = 4.5;
  const D = 1 + Math.log(T);
  const C = 1 + c / E;

  if (c < 1) {
    while (true) {
      const p = C * uniformBase(0, 1);
      if (p > 1) {
        const y = -Math.log((C - p) / c);
        if (uniformBase(0, 1) <= Math.pow(y, c - 1)) {
          return a + b * y
        }
      } else {
        const y = Math.pow(p, 1 / c);
        if (uniformBase(0, 1) <= Math.exp(-y)) {
          return a + b * y
        }
      }
    }
  } else if (parseInt(c, 10) === 1) {
    return exponential(a, b)
  } else {
    while (true) {
      const p1 = uniformBase(0, 1);
      const p2 = uniformBase(0, 1);
      const v = A * Math.log(p1 / (1 - p1));
      const y = c * Math.exp(v);
      const z = p1 * p1 * p2;
      const w = B + Q * v - y;
      if (w + D - T * z > 0 || w >= Math.log(z)) {
        return a + b * y
      }
    }
  }
};
const beta = function (v, w, min, max) {
  if (v < w) {
    return max - (max - min) * beta(w, v, 0, 1)
  }
  const y1 = gamma(0, 1, v);
  const y2 = gamma(0, 1, w);

  return min + ((max - min) * y1) / (y1 + y2)
};
const cauchy = function (a, b) {
  return a + b * Math.tan(PI * uniformBase(-0.5, 0.5))
};
const bernoulli = function (p) {
  return uniformBase(0, 1) < p ? 1 : 0
};
const userSpecified = function (usf, xMin, xMax, yMin, yMax) {
  let x;
  let y;
  const areaMax = (xMax - xMin) * (yMax - yMin);

  do {
    x = uniformBase(0, areaMax) / (yMax - yMin) + xMin;
    y = uniformBase(yMin, yMax);
  } while (y > usf(x, xMin, xMax))
  return x
};
const chiSquare = function (df) {
  return gamma(0, 2, 0.5 * df)
};
const cosine = function (min, max) {
  const a = 0.5 * (min + max);

  const b = (max - min) / PI;
  return a + b * Math.asin(uniformBase(-1, 1))
};
const doubleLog = function (min, max) {
  const a = 0.5 * (min + max);

  let b = 0.5 * (max - min);
  if (bernoulli(0.5) === 0) {
    b = -b;
  }
  return a + b * uniformBase(0, 1) * uniformBase(0, 1)
};
const erlang = function (b, c) {
  let prod = 1.0;
  let i;
  for (i = 1; i < c; i++) {
    prod *= uniformBase(0, 1);
  }
  return -b * Math.log(prod)
};
const extremeValue = function (a, b) {
  return a + b * Math.log(-Math.log(uniformBase(0, 1)))
};
const fRatio = function (v, w) {
  return chiSquare(v) / v / (chiSquare(w) / w)
};
const laplace = function (a, b) {
  if (bernoulli(0.5) === 1) {
    return a + b * Math.log(uniformBase(0, 1))
  } else {
    return a - b * Math.log(uniformBase(0, 1))
  }
};
const logarithmic = function (min, max) {
  const a = min;
  const b = max - min;

  return a + b * uniformBase(0, 1) * uniformBase(0, 1)
};
const logistic = function (a, b) {
  return a - b * Math.log(1 / uniformBase(0, 1) - 1)
};
const lognormal = function (a, mu, sigma) {
  return a + Math.exp(normal(mu, sigma))
};
const parabolic = function (min, max) {
  const parabola = function (x, min, max) {
    if (x < min || x > max) {
      return 0.0
    }
    const a = 0.5 * (min + max);
    const b = 0.5 * (max - min);
    const yMax = 3 / (4 * b);
    return yMax * (1 - ((x - a) * (x - a)) / (b * b))
  };

  const a = 0.5 * (min + max);
  const yMax = parabola(a, min + max);

  return userSpecified(parabola, min, max, 0, yMax)
};
const pareto = function (c) {
  return Math.pow(uniformBase(0, 1), -1 / c)
};
const pearson5 = function (b, c) {
  return 1 / gamma(0, 1 / b, c)
};
const pearson6 = function (b, v, w) {
  return gamma(0, b, v) / gamma(0, b, w)
};
const power = function (c) {
  return Math.pow(uniformBase(0, 1), 1 / c)
};
const rayleigh = function (a, b) {
  return a + b * Math.sqrt(-Math.log(uniformBase(0, 1)))
};
const studentT = function (df) {
  return normal(0, 1) / Math.sqrt(chiSquare(df) / df)
};
const triangular = function (min, max, c) {
  const p = uniformBase(0, 1);
  const q = 1 - p;
  if (p <= (c - min) / (max - min)) {
    return min + Math.sqrt((max - min) * (c - min) * p)
  } else {
    return max - Math.sqrt((max - min) * (max - c) * q)
  }
};
const weibull = function (a, b, c) {
  return a + b * Math.pow(-Math.log(uniformBase(0, 1)), 1 / c)
};
const binomial = function (n, p) {
  let sum = 0;
  for (let i = 0; i < n; i++) {
    sum += bernoulli(p);
  }
  return sum
};
const geometric = function (p) {
  return Math.floor(Math.log(uniformBase(0, 1)) / Math.log(1 - p))
};
const hypergeometric = function (n, N, K) {
  let count = 0;
  for (let i = 0; i < n; i++, N--) {
    const p = K / N;
    if (bernoulli(p)) {
      count++;
      K--;
    }
  }

  return count
};
const negativeBinomial = function (s, p) {
  let sum = 0;
  for (let i = 0; i < s; i++) {
    sum += geometric(p);
  }

  return sum
};
const pascal = function (s, p) {
  return negativeBinomial(s, p) + s
};
const poisson = function (mu) {
  let b = 1;
  let i;
  for (i = 0; b >= Math.exp(-mu); i++) {
    b *= uniformBase(0, 1);
  }

  return i - 1
};
const uniformDiscrete = function (i, j) {
  return i + Math.floor((j - i + 1) * uniformBase(0, 1))
};
var mathRand$1 = {
  uniformBase, // [0,1) 分布
  uniformRandInt, // [a,b]整数均匀分布
  randInt,
  secRand, // 安全伪随机发生器
  normal, // 正态分布 https://reference.wolfram.com/language/ref/NormalDistribution.html
  arcsine, // 反正弦分布 https://reference.wolfram.com/language/ref/ArcSinDistribution.html
  beta, // https://reference.wolfram.com/language/ref/BetaDistribution.html
  gamma, // 一些设备的寿命服从此分布 https://reference.wolfram.com/language/ref/GammaDistribution.html
  cauchy, // 柯西分布 https://reference.wolfram.com/language/ref/CauchyDistribution.html
  bernoulli, // 伯努利分布 https://reference.wolfram.com/language/ref/BernoulliDistribution.html
  exponential,
  userSpecified,
  chiSquare,
  cosine,
  doubleLog,
  erlang,
  extremeValue,
  fRatio,
  laplace,
  logarithmic,
  logistic,
  lognormal,
  parabolic,
  pareto,
  pearson5,
  pearson6,
  power,
  rayleigh,
  studentT,
  triangular,
  weibull,
  binomial,
  geometric,
  hypergeometric,
  negativeBinomial,
  pascal,
  poisson,
  uniformDiscrete
};

// @ts-check
/**
 * @namespace mathAlgebra
 */

const abs = Math.abs;

const gaussian = A => {
  /**
   * @function gaussian
   * @memberof mathAlgebra
   * @description Gaussian elimination
   * @param  array A matrix + b vector
   * @return array x solution vector
   */

  let i, k, j;
  const len = A.length;

  for (i = 0; i < len; i++) {
    // Search for maximum in this column
    let [maxEl, maxRow] = [abs(A[i][i]), i];
    for (k = i + 1; k < len; k++) {
      if (abs(A[k][i]) > maxEl) {
        maxEl = abs(A[k][i]);
        maxRow = k;
      }
    }
    // Swap maximum row with current row (column by column)
    for (k = i; k < len + 1; k++) {
      const tmp = A[maxRow][k];
      A[maxRow][k] = A[i][k];
      A[i][k] = tmp;
    }
    // Make all rows below this one 0 in current column
    for (k = i + 1; k < len; k++) {
      const c = -A[k][i] / A[i][i];
      for (j = i; j < len + 1; j++) {
        if (i === j) {
          A[k][j] = 0;
        } else {
          A[k][j] += c * A[i][j];
        }
      }
    }
  }
  // 解恒等式 Ax=b
  const x = '0'.repeat(len).split('');
  for (i = len - 1; i > -1; i--) {
    x[i] = A[i][len] / A[i][i];
    for (k = i - 1; k > -1; k--) {
      A[k][len] -= A[k][i] * x[i];
    }
  }
  return x
};
const gcd = (a, b) => {
  let t;
  while (b) {
    t = b;
    b = a % b;
    a = t;
  }
  return a
};
const lcm = (a, b) => {
  return (a * b) / gcd(a, b)
};
const primeFactorOne = x => {
  if (x === 0 || x === 1) {
    return x
  }
  if (x % 2 === 0) {
    return 2
  }
  const squareRoot = Math.sqrt(x);
  for (let i = 3; i <= squareRoot; i += 2) {
    if (x % i === 0) {
      return i
    }
  }
  return x
};
const primeFactor = x => {
  const a = [];
  let num = x;
  while (num) {
    const primeOne = primeFactorOne(num);
    if (primeOne === num) {
      a.push(primeOne);
      return a
    } else {
      a.push(primeOne);
      num /= primeOne;
    }
  }
  a.push(0);

  return a
};
var mathAlgebra$1 = {
  primeFactor,
  lcm,
  gaussian,
  gcd
};

// @ts-check
/**
 * @namespace mathDistance
 */

/**
 * @function euclidean
 * @memberof mathDistance
 * @description Euclidean Distance(欧式距离)
 * @param {Array} x
 * @param {Array} y
 * @returns {Number}
 */
function euclidean (x, y) {
  const len = x.length;
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += (x[i] - y[i]) ** 2;
  }
  return Math.sqrt(sum)
}
// Standardized Euclidean Distance(标准化欧氏距离)
function euclideans (x, y) {
  const len = x.length;
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0;
  for (let i = 0; i < len; i++) {
    const avg = (x[i] - y[i]) / 2;
    const si = Math.sqrt((x[i] - avg) ** 2 + (y[i] - avg) ** 2);
    sum += ((x[i] - y[i]) / si) ** 2;
  }
  return Math.sqrt(sum)
}
// ManhattanDistance(曼哈顿距离)
function manhattan (x, y) {
  const len = x.length;
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += Math.abs(x[i] - y[i]);
  }
  return sum
}
// lanceDistance(兰氏距离)
function lance (x, y) {
  const len = x.length;
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }
  let sum = 0;
  for (let i = 0; i < len; i++) {
    sum += i === 0 ? 0 : Math.abs(x[i] - y[i]) / Math.abs(x[i] + Math.abs(y[i]));
  }
  return sum
}
// Chebyshev Distance(切比雪夫距离)
function chebyshevn (x, y) {
  const len = x.length;
  if (len !== y.length) {
    throw Error('元素长度不一致')
  }

  let dis = 0;
  for (let i = 0; i < len; i++) {
    if (Math.abs(x[i] - y[i]) > dis) {
      dis = Math.abs(x[i] - y[i]);
    }
  }
  return dis
}

/**
 * @description Edit Distance 编辑距离
 * @param {Array} a
 * @param {Array} b
 * @return {Object} {ld编辑距离,matchRate匹配度,matrix动态转义矩阵}
 */

function levenshtein (a = [], b = []) {
  a = typeof a === 'string' ? a.split('') : a;
  b = typeof b === 'string' ? b.split('') : b;
  const [aLen, bLen] = [a.length, b.length];
  if (aLen === 0) {
    return { ld: bLen, matchRate: 0, matrix: [] }
  }
  if (bLen === 0) {
    return { ld: aLen, matchRate: 0, matrix: [] }
  }
  const dis = Array(aLen + 1)
    .fill(0)
    .map(_ => Array(bLen + 1).fill(0));
  for (let i = 0; i <= aLen; i++) {
    dis[i][0] = i;
  }
  for (let j = 0; j <= bLen; j++) {
    dis[0][j] = j;
  }
  let cas;
  for (let j = 1; j <= bLen; j++) {
    for (let i = 1; i <= aLen; i++) {
      cas = a[i - 1] === b[j - 1] ? 0 : 1;
      const re = Math.min(dis[i - 1][j] + 1, dis[i][j - 1] + 1);
      dis[i][j] = Math.min(re, dis[i - 1][j - 1] + cas);
    }
  }

  const ld = dis[aLen][bLen];
  return { ld, matchRate: 1 - ld / Math.max(aLen, bLen), matrix: dis }
}
// HammingDistance 汉明距离
function hamming (x, y) {
  const len = x.length;
  let n = 0;
  for (let i = 0; i < len; i++) {
    if (x[i] !== y[i]) {
      n += 1;
    }
  }

  return n
}
// dice系数
function diceCoefficient (x, y) {
  return (2 * x.intersect(y).length) / (x.length + y.length)
}
// 杰卡德相似系数
function jaccardCoefficient (x, y) {
  return x.intersect(y).length / x.union(y).length
}
// JaccardDistance(杰卡德距离)
function jaccardDistance (x, y) {
  return (x.union(y).length - x.intersect(y).length) / x.union(y).length
}
// Cos(Cosine 余弦相似度)
function cosn (x = [], y = []) {
  let [xy, xSq, ySq, len] = [0, 0, 0, x.length];
  for (let i = 0; i < len; i++) {
    xy += x[i] * y[i];
    xSq += x[i] ** 2;
    ySq += y[i] ** 2;
  }
  return xy / (Math.sqrt(xSq) * Math.sqrt(ySq))
}

var mathDistance = {
  euclidean,
  euclideans,
  manhattan,
  chebyshevn,
  hamming,
  diceCoefficient,
  jaccardCoefficient,
  jaccardDistance,
  cosn,
  lance,
  levenshtein,
  edit: levenshtein
};

// @ts-check
/**
 * @namespace matrix
 */

const matrix = {};

const NOT_SQUARE = '矩阵必须是方形的';

matrix._subMatrix = function (rows, i, j) {
  const r = rows.copy();
  let index;
  r.splice(i, 1);
  index = r.length;
  while (index--) {
    r[index].splice(j, 1);
  }
  return r
};

/**
 * copy一个矩阵.
 *
 * @param {Array} matrix
 * @return {Array}
 */

matrix.deepCopy = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('输入必须是矩阵')
  } else if (arr[0][0] === undefined) {
    throw new Error('输入不能是向量')
  }
  const result = new Array(arr.length);

  for (let i = 0; i < arr.length; i++) {
    result[i] = arr[i].slice();
  }

  return result
};

/**
 * 判断矩阵是否是方阵
 *
 * @param {Array} arr
 * @return {Boolean}
 */

matrix.isSquare = function (arr) {
  if (!Array.isArray(arr)) {
    throw new Error('输出必须是矩阵')
  } else if (arr[0][0] === undefined) {
    throw new Error('输入不是向量')
  }
  const rows = arr.length;

  for (let i = 0; i < rows; i++) {
    if (arr[i].length !== rows) {
      return false
    }
  }

  return true
};

/**
 * 两个矩阵相加，维度需要一致 addition
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array}
 */

matrix.add = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length);
  let i;

  if (!arrA[0].length) {
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] + arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (let j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] + arrB[i][j];
      }
    }
  }

  return result
};

/**
 * 两个矩阵相减，维度需要一致 subtraction
 *
 * @param {Array} matrix A.
 * @param {Array} matrix B.
 * @return {Array}
 */

matrix.sub = function (arrA, arrB) {
  if (arrA.length !== arrB.length || arrA[0].length !== arrB[0].length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length);
  let i;

  if (!arrA[0].length) {
    // The arrays are vectors.
    for (i = 0; i < arrA.length; i++) {
      result[i] = arrA[i] - arrB[i];
    }
  } else {
    for (i = 0; i < arrA.length; i++) {
      result[i] = new Array(arrA[i].length);

      for (let j = 0; j < arrA[i].length; j++) {
        result[i][j] = arrA[i][j] - arrB[i][j];
      }
    }
  }

  return result
};

/**
 * 比例一个矩阵
 *
 * @param {Array} matrix.
 * @param {Number} scalar.
 * @return {Array}
 */

matrix.scalar = function (arr, val) {
  const result = matrix.deepCopy(arr);
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = val * arr[i][j];
    }
  }

  return result
};

/**
 * 转置矩阵
 *
 * @param {Array} matrix.
 * @return {Array}
 */

matrix.transpose = function (arr) {
  const result = new Array(arr[0].length);

  for (let i = 0; i < arr[0].length; i++) {
    result[i] = new Array(arr.length);

    for (let j = 0; j < arr.length; j++) {
      result[i][j] = arr[j][i];
    }
  }

  return result
};

/**
 * 创建 n x n 单位矩阵.
 *
 * @param {Number} dimension
 * @return {Array} n x n 单位矩阵.
 */

matrix.identity = function (n) {
  const result = new Array(n);

  for (let i = 0; i < n; i++) {
    result[i] = new Array(n);
    for (let j = 0; j < n; j++) {
      result[i][j] = i === j ? 1 : 0;
    }
  }

  return result
};

/**
 * 向量点乘 dotproduct
 *
 * @param {Array} vector.
 * @param {Array} vector.
 * @return {Array} dot product.
 */

matrix.dot = function (vectorA, vectorB) {
  if (vectorA.length !== vectorB.length) {
    throw new Error('向量不匹配')
  }

  let result = 0;
  for (let i = 0; i < vectorA.length; i++) {
    result += vectorA[i] * vectorB[i];
  }
  return result
};

/**
 * 叉乘2个矩阵 multiply
 *
 *
 * @param {Array} matrix.
 * @param {Array} matrix.
 * @return {Array} result of multiplied matrices.
 */

matrix.mul = function (arrA, arrB) {
  if (arrA[0].length !== arrB.length) {
    throw new Error('矩阵维度不匹配')
  }

  const result = new Array(arrA.length);

  for (let x = 0; x < arrA.length; x++) {
    result[x] = new Array(arrB[0].length);
  }

  const arrBT = matrix.transpose(arrB);

  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result[i].length; j++) {
      result[i][j] = matrix.dot(arrA[i], arrBT[j]);
    }
  }
  return result
};

/**
 * 矩阵的行列式值 determinant
 *
 * @param {Array} matrix.
 * @return {Number}
 */

matrix.det = function (m) {
  const numRow = m.length;
  const numCol = m[0].length;
  let det = 0;
  // let row, col
  let sign;

  if (!matrix.isSquare(m)) {
    throw new Error(NOT_SQUARE)
  }

  if (numRow === 1) {
    return m[0][0]
  } else if (numRow === 2) {
    return m[0][0] * m[1][1] - m[0][1] * m[1][0]
  }

  for (let i = 0; i < 1; i++) {
    for (let j = 0; j < numCol; j++) {
      sign = (i + j) % 2 ? -1 : 1;
      det += sign * m[i][j] * matrix.det(matrix._subMatrix(m, i, j));
    }
  }
  return det
};

/**
 * 高斯约旦消元
 *
 * @param {Array} matrix.
 * @param {Number} epsilon.
 * @return {Array} RREF matrix.
 */

matrix.GaussJordanEliminate = function (m, epsilon) {
  // Translated from:
  // http://elonen.iki.fi/code/misc-notes/python-gaussj/index.html
  const eps = typeof epsilon === 'undefined' ? 1e-10 : epsilon;

  const h = m.length;
  const w = m[0].length;
  let y = -1;
  let y2, x, c;

  while (++y < h) {
    // Pivot.
    let maxrow = y;
    y2 = y;
    while (++y2 < h) {
      if (Math.abs(m[y2][y]) > Math.abs(m[maxrow][y])) {
        maxrow = y2;
      }
    }
    const tmp = m[y];
    m[y] = m[maxrow];
    m[maxrow] = tmp;

    // Singular
    if (Math.abs(m[y][y]) <= eps) {
      return m
    }

    // Eliminate column
    y2 = y;
    while (++y2 < h) {
      c = m[y2][y] / m[y][y];
      x = y - 1;
      while (++x < w) {
        m[y2][x] -= m[y][x] * c;
      }
    }
  }

  // Backsubstitute.
  y = h;
  while (--y >= 0) {
    c = m[y][y];
    y2 = -1;
    while (++y2 < y) {
      x = w;
      while (--x >= y) {
        m[y2][x] -= (m[y][x] * m[y2][y]) / c;
      }
    }
    m[y][y] /= c;

    // Normalize row
    x = h - 1;
    while (++x < w) {
      m[y][x] /= c;
    }
  }

  return m
};

/**
 * nxn 求逆 inverse
 *
 * @param {Array} matrix.
 * @return {Array}
 */

matrix.inv = function (m) {
  if (!matrix.isSquare(m)) {
    throw new Error(NOT_SQUARE)
  }

  const n = m.length;
  const identity = matrix.identity(n);
  let i;

  // A*I
  for (i = 0; i < n; i++) {
    m[i] = m[i].concat(identity[i]);
  }

  // inv(I*A)
  m = matrix.GaussJordanEliminate(m);

  // inv(A)
  for (i = 0; i < n; i++) {
    m[i] = m[i].slice(n);
  }

  return m
};

/**
 * 获取矩阵列
 *
 * @param {Array} matrix
 * @param {Int} column number
 * @return {Array} column
 */

matrix.getCol = function (M, n) {
  const result = new Array(M.length);
  if (n < 0) {
    throw new Error('需要正数')
  } else if (n >= M[0].length) {
    throw new Error('0 and columns - 1.')
  }
  for (let i = 0; i < M.length; i++) {
    result[i] = M[i][n];
  }
  return result
};

/**
 * 创建 n x m 全0矩阵.
 *
 * @param {Int} number of rows
 * @param {Int} number of columns
 * @return {Array} matrix
 */

matrix.zero = function (n, m) {
  if (n < 1 || m < 1) {
    throw new Error('矩阵维度必须为正数')
  }
  n = n | 0;
  m = m | 0;
  return Array(n)
    .fill(0)
    .map(_ => Array(m).fill(0))

  /*
  for (let i = 0; i < n; i++) {
    let empty = new Array(m)
    for (let j = 0; j < m; j++) {
      empty[j] = 0
    }
    M[i] = empty
  }
  return M
  */
};

/**
 * 矩阵map操作
 *
 * @param {Array} matrix
 * @param {Function} function to apply to each element
 * @return {Array} matrix operated on
 */

matrix.map = function (M, f) {
  // M is n-by-m (n rows, m columns)
  const n = M.length;
  const m = M[0].length;
  let i;
  let j;

  const res = matrix.deepCopy(M);

  for (i = 0; i < n; i++) {
    for (j = 0; j < m; j++) {
      res[i][j] = f(M[i][j], i, j);
    }
  }
  return res
};

/**
 * Swaps two rows of a matrix  and returns the updated matrix.
 * Used in row reduction functions.
 *
 * @param {Array} matrix.
 * @param {Number} row1.
 * @param {Number} row2.
 */

matrix.rowSwitch = function (m, row1, row2) {
  const result = new Array(m.length);

  for (let i = 0; i < m.length; i++) {
    result[i] = new Array(m[i].length);

    for (let j = 0; j < m[i].length; j++) {
      if (i === row1) {
        result[i][j] = m[row2][j];
      } else if (i === row2) {
        result[i][j] = m[row1][j];
      } else {
        result[i][j] = m[i][j];
      }
    }
  }
  return result
};

/**
 * Returns a LUP decomposition of the given matrix such that:
 *
 * A*P = L*U
 *
 * Where
 * A is the input matrix
 * P is a pivot matrix
 * L is a lower triangular matrix
 * U is a upper triangular matrix
 *
 * This method returns an array of three matrices such that:
 *
 * matrix.luDecomposition(array) = [L, U, P]
 *
 * @param {Array} arr
 * @return {Array} array of matrices [L, U, P]
 */

matrix.lupDecomposition = function (arr) {
  if (!matrix.isSquare(arr)) {
    throw new Error('ERROR_MATRIX_NOT_SQUARE')
  }

  const size = arr.length;

  let LU = matrix.deepCopy(arr);
  let P = matrix.transpose(matrix.identity(size));
  let currentRow;
  const currentColumn = new Array(size);

  this.getL = function (a) {
    const m = a[0].length;
    const L = matrix.identity(m);

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        if (i > j) {
          L[i][j] = a[i][j];
        }
      }
    }

    return L
  };

  this.getU = function (a) {
    const m = a[0].length;
    const U = matrix.identity(m);

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < m; j++) {
        if (i <= j) {
          U[i][j] = a[i][j];
        }
      }
    }

    return U
  };

  for (let j = 0; j < size; j++) {
    let i;
    for (i = 0; i < size; i++) {
      currentColumn[i] = LU[i][j];
    }

    for (i = 0; i < size; i++) {
      currentRow = LU[i];

      const minIndex = Math.min(i, j);
      let s = 0;

      for (let k = 0; k < minIndex; k++) {
        s += currentRow[k] * currentColumn[k];
      }

      currentRow[j] = currentColumn[i] -= s;
    }

    // Find pivot
    let pivot = j;
    for (i = j + 1; i < size; i++) {
      if (Math.abs(currentColumn[i]) > Math.abs(currentColumn[pivot])) {
        pivot = i;
      }
    }

    if (pivot !== j) {
      LU = matrix.rowSwitch(LU, pivot, j);
      P = matrix.rowSwitch(P, pivot, j);
    }

    if (j < size && LU[j][j] !== 0) {
      for (i = j + 1; i < size; i++) {
        LU[i][j] /= LU[j][j];
      }
    }
  }

  return [this.getL(LU), this.getU(LU), P]
};

var mathMatrix = { mat: matrix };

// @ts-check
/**
 * @namespace Math_prototype
 */

const mathRand = mathRand$1;
const mathAlgebra = mathAlgebra$1;
const dist = mathDistance;
const mat = mathMatrix;
const MAX64_BIGINT = 2n ** 63n - 1n;
const MIN64_BIGINT = -1n * MAX64_BIGINT;
/**
 *
 * @param {Number} s
 * @param {Number} e
 * @param {Number} step
 */

const genRange = (s, e, step = 1) => Array.from({ length: e - s + 1 }, (_, i) => i + s + (step - 1) * i);
const max = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 最大值
   * @function max
   * @return {number}
   * @example
   * max([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // 8.1
   */

  return a.reduce((x, y) => (x > y ? x : y))
};
const min$1 = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 最小值
   * @function min
   * @return {number}
   * @example
   * min([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // 1
   */

  return a.reduce((x, y) => (x < y ? x : y))
};
const range = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 极值
   * @function range
   * @return {number}
   * @example
   * range([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // 7.1
   */

  return max(a) - min$1(a)
}; // 极差/范围误差/全距
const sum = a => a.reduce((x, y) => x + y);

const mean = a => {
  /**
   * @memberof Math_prototype#
   * @description 从数组值求平均数
   * @function mean
   * @return {integer}
   * @example
   * $.math.mean([1, 2, 3, 4, 5])
   * // 3
   */

  const len = a.length;
  return sum(a) / len
};
const largek = function (a, k) {
  return a.sort((a, b) => b - a)[k - 1]
};
const smallk = function (a, k) {
  return a.sort((a, b) => a - b)[k - 1]
};
const median = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 从数组值求中位数
   * @function median
   * @return {Number}
   * @example
   * $.math.median([1, 2, 3, 4, 5])
   * // 3
   */

  const meSort = a.copy().sort((a, b) => a - b);
  const len = meSort.length;
  return len & 1 ? meSort[(len - 1) / 2] : (meSort[len / 2] + meSort[len / 2 - 1]) / 2
};

const quantile = (a, pos = 2, type = 'inc') => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @param {integer} pos - 0min 1四分之一 2四分之二 3四分之三 4max
   * @param {integer} type - 求位置算法
   * @description 从数组值求四分位数
   * @function quantile
   * @return {Number}
   * @example
   * excel quartile.exc 只有 1,2中位数,3
   * quartile.inc 0,1,2,3
   * Q0 min
   * Q1的位置=[(n + 3) /4] 0.25,0.5,0.75 乘 上-下
   * Q2的位置= 中位数
   * Q3的位置=[(3*n+1)/4] 0.25,0.5,0.75 乘 上-下
   * Q4 max
   */
  const aCopy = a.copy();
  const meSort = aCopy.sort((a, b) => a - b);
  const len = meSort.length;
  const lowSit = len + 3;
  const upSit = 3 * len + 1;
  const ratio = [0, 0.25, 0.5, 0.75];
  let sit = 0;
  let up = -1;
  switch (+pos) {
    case 0:
      return type === 'inc' ? min$1(meSort) : NaN
    case 1:
      sit = ((lowSit / 4) | 0) - 1;
      up = meSort[sit + 1];
      if (up === undefined) {
        up = meSort[sit];
      }
      return meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? lowSit % 4 : 1]
    case 2:
      return median(meSort)
    case 3:
      sit = ((upSit / 4) | 0) - 1;
      up = meSort[sit + 1];
      if (up === undefined) {
        up = meSort[sit];
      }
      return meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? upSit % 4 : 3]
    case 4:
      return type === 'inc' ? max(meSort) : NaN
    default:
      return median(meSort)
  }
};
const quantileAll = (a, type = 'inc') => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @param {integer} type - 求位置算法
   * @description 从数组值求四分位数全部位置
   * @function quantileAll
   * @return {Number}
   * @example
   * excel quartile.exc 只有 1,2中位数,3
   * quartile.inc 0,1,2,3
   * Q0 min
   * Q1的位置=[(n + 3) /4] 0.25,0.5,0.75 乘 上-下
   * Q2的位置= 中位数
   * Q3的位置=[(3*n+1)/4] 0.25,0.5,0.75 乘 上-下
   * Q4 max
   */
  const aCopy = a.copy();
  const meSort = aCopy.copy().sort((a, b) => a - b);
  const len = meSort.length;
  const lowSit = len + 3;
  const upSit = 3 * len + 1;
  const ratio = [0, 0.25, 0.5, 0.75];
  let sit = 0;
  let up = -1;

  sit = ((lowSit / 4) | 0) - 1;
  up = meSort[sit + 1];
  if (up === undefined) {
    up = meSort[sit];
  }
  const Q1 = meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? lowSit % 4 : 1];
  sit = ((upSit / 4) | 0) - 1;
  up = meSort[sit + 1];
  if (up === undefined) {
    up = meSort[sit];
  }
  const Q3 = meSort[sit] + (up - meSort[sit]) * ratio[type === 'inc' ? upSit % 4 : 3];
  const IQR = Q3 - Q1;
  const upper = Q3 + IQR;
  const lower = Q3 - IQR;
  return {
    min: meSort[0],
    Q1,
    Q2: median(meSort),
    Q3,
    max: meSort[len - 1],
    IQR,
    upper,
    lower
  }
};

/**
 * @memberof Math_prototype#
 * @description 统计每个value的个数
 * @function count
 * @param {Array} a
 * @param {Boolean} isKV 是否以数组kvw形式返回
 * @return {Array|Object}
 * @example
 * ['A', 'B', 'B', 'C', 'A', 'D'].count()
 * // {"A":2,"B":2,"C":1,"D":1}
 */

const count = (a = []) => {
  return a.reduce(function (o, item) {
    o[item] = o[item] ? ++o[item] : 1;
    return o
  }, {})
};
const countAdv = (a = []) => {
  const len = a.length;
  const countObj = [];
  const obj = count(a);
  for (const i in obj) {
    countObj.push({ k: i, v: obj[i], w: obj[i] / len });
  }
  return countObj
};
const mode = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 从数组值求众数,出现次数>[n/2]
   * @function mode
   * @return {integer}
   * @example
   * $.math.mode([1, 1, 1, 2, 3])
   * // []
   */

  const arr = [];
  const o = count(a);
  let max = 1; // 只有1次没有众数
  for (const i in o) {
    if (o[i] > max) {
      max = o[i];
      arr.length = 0;
      arr.push(+i);
    }
  }
  return arr
};
const _stat = function (x, y, xMean, yMean) {
  let [len, xmean, ymean, sumx, sumy, sumxy] = [x.length, xMean || mean(x), yMean || mean(y), 0, 0, 0];
  for (let i = 0; i < len; i++) {
    sumx += (x[i] - xmean) * (x[i] - xmean);
    sumy += (y[i] - ymean) * (y[i] - ymean);
    sumxy += (y[i] - ymean) * (x[i] - xmean);
  }
  return { len, xmean, ymean, sumx, sumy, sumxy }
};
const covariance = (x = [], y = []) => {
  // 全体协方差
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差
   * @function covariance
   * @return {string}
   * @example
   * covariance([2, 1, 8.1, 3, 4, 5.1, 6.7],[2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '5.542041'
   */

  const { len, sumxy } = _stat(x, y);
  return sumxy / len
};
const covarianceCorrect = (x = [], y = []) => {
  // 样本协方差
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差
   * @function covarianceCorrect
   * @return {string}
   * @example
   * covariance([2, 1, 8.1, 3, 4, 5.1, 6.7],[2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '5.542041'
   */

  const { len, sumxy } = _stat(x, y);
  return sumxy / (len - 1) || 0
};

/*
 * 计算协方差
 *
 * @param {Array} arr
 * @param {Bool} isSample
 */

const cov = function (mat) {
  const len = mat.length;
  const a = [];
  for (let i = 0; i < len; i++) {
    a[i] = [];
    for (let j = 0; j < len; j++) {
      a[i][j] = covarianceCorrect(mat[i], mat[j]); // / len
    }
  }
  return a
};
const variance = a => {
  // stddev 标准偏差/标准差/均方差 2.354154 方差开根号
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差
   * @function variance
   * @return {string}
   * @example
   * variance([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '5.542041'
   */

  return covariance(a, a)
};

const varianceCorrect = a => {
  // sqrt(varianceCorrect) 标准偏差 2.542777 更正开根号
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 更正方差
   * @function varianceCorrect
   * @return {string}
   * @example
   * varianceCorrect([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '6.465714'
   */
  /*
  const m = mean(a)
  const len = a.length - 1
  return (
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len
  ) */

  return covarianceCorrect(a, a)
};

const gMean = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 几何平均数
   * @function gMean
   * @return {string}
   * @example
   * gMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '3.515999'
   */

  const len = 1 / a.length;
  return a.reduce(function (x, y) {
    // 几何平均
    return x * Math.pow(y, len)
  }, 1)
};

const hMean = a => {
  // 调和平均
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 调和平均数
   * @function hMean
   * @return {string}
   * @example
   * hMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '2.742815'
   */

  const len = a.length;
  return (
    len /
    a.reduce(function (x, y) {
      return x + 1 / y
    }, 0)
  )
};

const qMean = a => {
  // 平方平均
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 平方平均数
   * @function qMean
   * @return {string}
   * @example
   * qMean([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '4.877206'
   */

  const len = a.length;
  return Math.sqrt(
    a.reduce(function (x, y) {
      return x + y * y
    }, 0) / len
  )
};

const stddev = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 方差开根号 总体标准偏差(population)
   * @function stddev
   * @return {number}
   * @example
   * stddev([1, 2, 3, 4, 5])
   * // 1.4142135623730951
   */

  return Math.sqrt(variance(a))
}; // stddev 总体标准偏差(population)/标准差/均方差 2.354154 方差开

const stddevCorrect = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 标准偏差(sample)
   * @function stddevCorrect
   * @return {string}
   * @example
   * stddevCorrect([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '2.542777'
   */

  return Math.sqrt(varianceCorrect(a))
}; // 标准偏差(sample)

const meanDev = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 平均偏差
   * @function meanDev
   * @return {string}
   * @example
   * meanDev([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '2.024490'
   */
  // mean Deviation 平均偏差 2.024490
  const len = a.length;
  return (
    a.reduce(function (x, y) {
      return x + Math.abs(y - mean(a))
    }, 0) / len
  )
};

const medianDev = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 中位数偏差
   * @function medianDev
   * @return {string}
   * @example
   * medianDev([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '1.985714'
   */
  // medianDev 中位数偏差 1.985714
  const med = a.median(a.sort((a, b) => a - b));
  const len = a.length;
  return (
    a.reduce(function (x, y) {
      return x + Math.abs(y - med)
    }, 0) / len
  )
};

const stdErr = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 标准误差
   * @function stdErr
   * @return {string}
   * @example
   * stdErr([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '0.961079'
   */
  // Standard error 标准误差 0.961079
  const len = a.length;
  return Math.sqrt(variance(a) / (len - 1)) // also equal Math.sqrt(varianceCorrect(a) / len)
};

const coeVariation = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 变异系数/离散系数
   * @function coeVariation
   * @return {string}
   * @example
   * coeVariation([2, 1, 8.1, 3, 4, 5.1, 6.7]).toFixed(6)
   * // '0.551140'
   */
  // Coefficient of Variation 变异系数/离散系数 0.551140
  const m = mean(a);
  return stddev(a) / m
};

const skew = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 偏度 同excel skew函数
   * @function skew
   * @return {string}
   * @example
   * skew([53, 61, 49, 66, 78, 47]).toFixed(6)
   * // '0.782633'
   */

  const len = a.length;
  const m = mean(a);
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m)
    }, 0) / len;
  const v2 = Math.pow(
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len,
    1.5
  );
  return ((v1 / v2) * Math.sqrt(len * (len - 1))) / (len - 2)
};

const kurt1 = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description 峰度/峰态系数 同excel kurt函数
   * @function kurt1
   * @return {number}
   * @example
   * kurt1([53, 61, 49, 66, 78, 47])
   * // -0.2631655441038472
   */

  const len = a.length;
  const m = mean(a);
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) /
    varianceCorrect(a) /
    varianceCorrect(a);

  return (v1 / (len - 1) / (len - 2) / (len - 3)) * (len + 1) * len - (3 * (len - 1) * (len - 1)) / (len - 2) / (len - 3)
};

const kurt2 = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description >3 =3 <3 峰度/峰态系数
   * @function kurt2
   * @return {number}
   * @example
   * kurt2([53, 61, 49, 66, 78, 47])
   * // 1.7105241302560437
   */
  // 另一种算法
  const len = a.length;
  const m = mean(a);
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) /
    varianceCorrect(a) /
    varianceCorrect(a);

  return v1 / (len - 1)
};

const kurt3 = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description wiki上的算法 峰度/峰态系数
   * @function kurt3
   * @return {number}
   * @example
   * kurt3([53, 61, 49, 66, 78, 47])
   * // -0.9473710436927472
   */
  // wiki 上的算法
  const len = a.length;
  const m = mean(a);
  const v1 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m) * (y - m) * (y - m)
    }, 0) / len;
  const v2 =
    a.reduce(function (x, y) {
      return x + (y - m) * (y - m)
    }, 0) / len;
  return v1 / v2 / v2 - 3
};

const confidenceIntervals = a => {
  /**
   * @memberof Math_prototype#
   * @param {Array} a - 数组
   * @description wiki上的算法 峰度/峰态系数
   * @function confidenceIntervals
   * @return {Array}
   * @example
   * confidenceIntervals([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // [0.1659026888164572 , 8.376954454040686]
   */
  // 置信区间
  const len = a.length;
  const m = mean(a);
  const v1 = variance(a);
  const v2 = (1.959964 * v1) / Math.sqrt(len);
  return [m - v2, m + v2]
};
// 组合数学相关
const fac = num => {
  if (num < 0) {
    return -1
  } else if (num === 0 || num === 1) {
    return 1
  } else {
    for (let i = num - 1; i >= 1; i--) {
      num *= i;
    }
    return num
  }
};
const arrangement = (n, m) => fac(n) / fac(n - m);
const combination = (n, m) => fac(n) / fac(m) / fac(n - m);
// N种数中取M个数的可重复组合 N次有放回无序抽样 H(n,m)=C(n+m-1,m)
const hCombin = (n, m) => combination(n + m - 1, m);

/**
 * @memberof Math_prototype#
 * @description 排列数组输出
 * @param {Array} arr 要全排列的数组
 * @param {Number} num 每次拿出的值
 */

const arrangeList = (arr, num) => {
  const r = []
  ;(function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (let i = 0, l = a.length; i < l; i++) {
      f(t.concat(a[i]), a.slice(0, i).concat(a.slice(i + 1)), n - 1);
    }
  })([], arr, num);
  return r
};

/**
 * @memberof Math_prototype#
 * @description 组合数组输出
 * @param {*} arr
 * @param {*} num
 */

const combinList = (arr, num) => {
  const r = []
  ;(function f (t, a, n) {
    if (n === 0) {
      return r.push(t)
    }
    for (let i = 0, l = a.length; i <= l - n; i++) {
      f(t.concat(a[i]), a.slice(i + 1), n - 1);
    }
  })([], arr, num);
  return r
};

/**
 * @memberof Math_prototype#
 * @description 数组下标全排列输出
 * @param {*} len
 * @param {*} num
 */

const allList = (len, num) => {
  const point = new Array(num).fill(0);
  let pointSum = 0;
  const a = [];
  a.push(point.copy());
  while (pointSum ^ ((len - 1) * num)) {
    point[0]++;
    point[0] = point[0] % len;
    if (point[0] === 0) {
      for (let i = 1; i < num; i++) {
        point[i]++;
        point[i] = point[i] % len;
        if (point[i] % len === 0) ; else {
          break
        }
      }
    }
    a.push(point.copy());

    pointSum = sum(point);
  }
  return a
};

/**
 * @description 找到count对象中最大的
 * @param {Object} o
 */

const findMax = o => {
  let max = 0;
  let maxKey = '';
  for (const i in o) {
    if (o[i] > max) {
      max = o[i];
      maxKey = i;
    }
  }
  return { tag: maxKey, maxValue: max }
};
/**
 * 找到数组中最大最小值
 * @param {Array} a
 * @returns {Object}
 */
const findMaxMin = a => {
  let max, min, maxIdx, minIdx, sum, count;
  if (typeof a[0] === 'bigint') {
[max, min, maxIdx, minIdx, sum, count] = [MIN64_BIGINT, MAX64_BIGINT, -1, -1, 0n, a.length];
  } else {
[max, min, maxIdx, minIdx, sum, count] = [-Infinity, Infinity, -1, -1, 0, a.length];
  }

  for (let i = 0; i < count; i++) {
    if (a[i] > max) {
      max = a[i];
      maxIdx = i;
    }
    if (a[i] < min) {
      min = a[i];
      minIdx = i;
    }
    sum += a[i];
  }
  return { max, min, maxIdx, minIdx, count, sum }
};
const murmurHash = (key, seed = 0xee6b27eb) => {
  // ver3
  let remainder, bytes, h1, h1b, c1, c2, k1, i; //c1b ,c2b
  remainder = key.length & 3; // key.length % 4
  bytes = key.length - remainder;
  h1 = seed;
  c1 = 0xcc9e2d51;
  c2 = 0x1b873593;
  i = 0;

  while (i < bytes) {
    k1 = (key.charCodeAt(i) & 0xff) | ((key.charCodeAt(++i) & 0xff) << 8) | ((key.charCodeAt(++i) & 0xff) << 16) | ((key.charCodeAt(++i) & 0xff) << 24);
    ++i;

    k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
    k1 = (k1 << 15) | (k1 >>> 17);
    k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

    h1 ^= k1;
    h1 = (h1 << 13) | (h1 >>> 19);
    h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
    h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
  }

  k1 = 0;

  switch (remainder) {
    case 3:
      k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
      break
    case 2:
      k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
      break
    case 1:
      k1 ^= key.charCodeAt(i) & 0xff;

      k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
      k1 = (k1 << 15) | (k1 >>> 17);
      k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
      h1 ^= k1;
  }

  h1 ^= key.length;

  h1 ^= h1 >>> 16;
  h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 13;
  h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
  h1 ^= h1 >>> 16;

  return h1 >>> 0
};
/**
 * 傅里叶分析函数
 * @memberof Math_prototype#
 * @function fourierAnalysis
 * @param {Array} a
 * @returns {{period:Number}}
 */
function fourierAnalysis (a) {
  const PI2 = Math.PI * 2;
  let arr = a.copy();
  const meanData = mean(arr);
  arr = arr.map(x => x - meanData);
  const len = arr.length;
  const fillNum = 2 ** (Math.log2(len) | 0); // 2^N
  arr = arr.concat(genRange(0, fillNum - len - 1, 0)); // fill => 2^N
  let fourierArr = [];
  for (let idx = 0; idx < fillNum; idx++) {
    fourierArr[idx] = [0, 0, 0]; // 实部 虚部 共轭相乘
    // 时域=>频域
    for (let k = 0; k < fillNum; k++) {
      fourierArr[idx][0] += arr[k] * Math.cos((PI2 * k * idx) / fillNum);
      fourierArr[idx][1] += arr[k] * Math.sin((PI2 * k * idx) / fillNum);
    }
    fourierArr[idx][2] = fourierArr[idx][0] ** 2 + fourierArr[idx][1] ** 2;
  }
  // console.log(fourierArr.map(x => x[2] / fillNum).join('\n'))
  fourierArr = fourierArr
    .map(x => x[2] / fillNum) // 算出功率
    .slice(0, fillNum / 2); // 取一半
  const maxFreq = max(fourierArr); // 取最大值，计算频率的倒数 即为 周期
  return { period: fillNum / fourierArr.findIndex(x => x === maxFreq) }
}
/**
 * 自相关系数
 * @memberof Math_prototype#
 * @function autoCorrelation
 * @param {Array} a 数据
 * @param {Number} lag 延后值
 * @returns {Number}
 */
function autoCorrelation (arr, lag = 1) {
  let [sumSq, sumXy, len] = [0, 0, arr.length];
  const mean = sum(arr) / len;

  for (let i = 0; i < len; i++) {
    sumSq += (arr[i] - mean) ** 2;
    if (i < len - lag) {
      sumXy += (arr[i] - mean) * (arr[i + lag] - mean);
    }
  }
  return sumXy === sumSq ? 1 : sumXy / sumSq
}
var math$1 = Object.assign.call(null, mathAlgebra, mathRand, mat, {
  fac,
  arrangement,
  combination,
  combinList,
  arrangeList,
  hCombin,
  allList,
  approximatelyEqual (v1, v2, epsilon = 0.001) {
    return Math.abs(v1 - v2) < epsilon
  }, // 约等于
  count,
  countAdv,
  dist,
  findMax,
  findMaxMin,
  fourierAnalysis,
  autoCorrelation,
  mode,
  sum,
  max,
  min: min$1,
  smallk,
  largek,
  num2e (num, fixNum) {
    const p = Math.floor(Math.log(num) / Math.LN10);
    const n = num * Math.pow(10, -p);
    return n.toFixed(fixNum || 4) + 'e' + p
  },
  // 调和平均数≤几何平均数≤算术平均数≤平方平均数
  hMean,
  gMean,
  genRange,
  mean,
  qMean,
  median,
  quantile,
  quantileAll,
  covariance,
  covarianceCorrect,
  cov,
  variance,
  varianceCorrect,
  stddev,
  stddevCorrect,
  meanDev,
  medianDev,
  range,
  stat: _stat,
  stdErr,
  coeVariation,
  skew,
  kurt1,
  kurt2,
  kurt3,
  confidenceIntervals,
  murmurHash,
  exponentialSmoothing (y, a = 0.5, nextPoint = 0) {
    // 观察值，平滑系数，预测多少点
    const yArr = [];
    for (let i = 0; i < y.length + nextPoint; i++) {
      yArr[i] = i === 0 ? y[0] : (y[i] || 0) * a + (1 - a) * yArr[i - 1];
    }
    return yArr
  },
  linearFitting (x = [], y = []) {
    // 线性拟合 y=a*x+b
    const { xmean, ymean, sumx, sumy, sumxy } = _stat(x, y);
    const a = sumxy / sumx;
    const b = ymean - a * xmean;
    const r = (sumxy * sumxy) / (sumx * sumy);
    return {
      a, // 斜率 slope
      b, // 截距 intercept
      r, // 拟合度 R^2
      f: `y=${a.toFixed(4)}*x+${b.toFixed(4)} R^2=${r.toFixed(4)}`,
      latex: `y=${a.toFixed(4)}\times x+${b.toFixed(4)}  R^{2}=${r.toFixed(4)}`
    }
  },
  exponentFitting (x = [], y = []) {
    // 指数拟合 y=a*e^(b*x)
    const rst = this.linearFitting(
      x,
      y.map(item => Math.log(item))
    );
    const [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r];
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*e^(${b.toFixed(4)}*x) R^2=${r.toFixed(4)}`,
      latex: `y=${a.toFixed(4)}\times e^{ (${b.toFixed(4)}\times x)} R^{2}=${r.toFixed(4)}`
    }
  },
  lnFitting (x = [], y = []) {
    // 对数拟合 y=a*ln(x)+b
    const rst = this.linearFitting(
      x.map(item => Math.log(item)),
      y
    );
    const [a, b, r] = [rst.a, rst.b, rst.r];
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*ln(x)+${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  powerFitting (x = [], y = []) {
    // 幂函数拟合 y=a*x^b
    const rst = this.linearFitting(
      x.map(item => Math.log(item)),
      y.map(item => Math.log(item))
    );
    const [a, b, r] = [Math.pow(Math.E, rst.b), rst.a, rst.r];
    return {
      a,
      b,
      r,
      f: `y=${a.toFixed(4)}*x^${b.toFixed(4)} R^2=${r.toFixed(4)}`
    }
  },
  polyFitting (x = [], y = [], n = 2) {
    // 多项式拟合
    // https://www.jianshu.com/p/af0a4f71c05a
    const a = [];
    const { ymean } = _stat(x, y);
    for (let i = 0; i < n + 1; i++) {
      let [row, rowY] = [[], 0];
      for (let j = 0; j < n + 1; j++) {
        let sx = 0;
        let sxy = 0;
        for (let d = 0; d < x.length; d++) {
          sx += x[d] ** (j + i);
          sxy += x[d] ** i * y[d];
        }
        if (j === 0) {
          rowY = sxy;
        }
        row.push(sx);
      }
      a.push([...row, rowY]);
    }
    const fitArr = mathAlgebra.gaussian(a);
    let sst = 0; // 回归平方
    let ssr = 0; // 占总误差平方
    const formula = [];
    for (let i = 0; i < x.length; i++) {
      let fitSumY = 0;
      fitArr.forEach((it, idx) => {
        fitSumY += it * x[i] ** idx;
        if (i === 0) {
          formula.push(`${it.toFixed(4)}${idx ? '*x^' + idx : ''}`);
        }
      });
      ssr += (fitSumY - ymean) ** 2;
      sst += (y[i] - ymean) ** 2;
    }
    const r = ssr / sst;
    return {
      r,
      f: `y=${formula
        .reverse()
        .join('+')
        .replace('^1+', '+')
        .replace(/\+-/g, '-')} R^2=${+r.toFixed(4)}`,
      formula
    }
  },
  pearson (x = [], y = []) {
    /**
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description 皮尔逊相关分析，适用数据默认服从正态分布
     * @function pearson
     * @return {number}
     * @example
     * $.math.pearson([2.5, 3.5, 3.0, 3.5, 2.5, 3.0], [3.0, 3.5, 1.5, 5.0, 3.5, 3.0])
     *
     * 0.8-1.0 极强相关
     * 0.6-0.8 强相关
     * 0.4-0.6 中等程度相关
     * 0.2-0.4 弱相关
     * 0.0-0.2 极弱相关或无相关
     * 当两个变量的标准差都不为零时，相关系数才有定义，皮尔逊相关系数适用于：
     * (1)、两个变量之间是线性关系，都是连续数据。
     * (2)、两个变量的总体是正态分布，或接近正态的单峰分布。
     * (3)、两个变量的观测值是成对的，每对观测值之间相互独立。
     */

    const { sumx, sumy, sumxy } = _stat(x, y);
    return sumxy / Math.sqrt(sumx * sumy)
  },
  spearman (x = [], y = []) {
    /**
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description 斯皮尔曼等级相关分析，适用不清楚数据符合什么分布，强调数据在所在组中位置的吻合度
     * @function spearman
     * @return {number}
     * @example
     * $.math.spearman([3, 1, 5, 4, 2], [4, 1, 5, 2, 3])
     *
     * 斯皮尔曼等级相关系数同时也被认为是经过排行的两个随即变量的皮尔逊相关系数，要先排序
     * 相对于皮尔森相关系数，斯皮尔曼相关系数对于数据错误和极端值的反应不敏感
     * 这里需要注意：当变量的两个值相同时，它们的排行是通过对它们位置进行平均而得到的
     * 不论两个变量的总体分布形态、样本容量的大小如何，都可以用斯皮尔曼等级相关系数来进行研究
     * 0.8-1.0 极强相关
     * 0.6-0.8 强相关
     * 0.4-0.6 中等程度相关
     * 0.2-0.4 弱相关
     * 0.0-0.2 极弱相关或无相关
     * https://baike.baidu.com/item/%E6%96%AF%E7%9A%AE%E5%B0%94%E6%9B%BC%E7%AD%89%E7%BA%A7%E7%9B%B8%E5%85%B3/1858796
     * https://blog.csdn.net/zhaozhn5/article/details/78392220
     */

    const len = x.length;
    const xRank = x.map(
      it =>
        x
          .copy()
          .sort((a, b) => b - a)
          .findIndex(item => item === it) // x，y排序后在原序列中的位置 TODO:如果数值相同，要平均相同的个数
    );

    const yRank = y.map(it =>
      y
        .copy()
        .sort((a, b) => b - a)
        .findIndex(item => item === it)
    );
    const d = xRank.map((item, idx) => (item - yRank[idx]) ** 2);

    return 1 - (sum(d) * 6) / (len * len * len - len)
  },

  kendall (x = [], y = []) {
    /**
     * @function kendall
     * @memberof Math_prototype#
     * @param {Array} x - 数组
     * @param {Array} y - 数组
     * @description kendall强调固定数据从大到小排列后，对另一组数据排位的影响
     * @return {Array}
     * @example kendall
     * $.math.kendall([0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55], [1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42])
     * 情况1：Xi>Xj且Yi>Yj，情况2：Xi<Xj且Yi<Yj，这两个元素就被认为是一致的。
     * 情况3：Xi>Xj且Yi<Yj，情况4：Xi<Xj且Yi>Yj，这两个元素被认为是不一致的。
     * 情况5：Xi=Xj，情况6：Yi=Yj，这两个元素既不是一致的也不是不一致的       *
     * 公式 tau-b  http://hi.csdn.net/attachment/201009/17/19961_1284717925V2Xb.gif
     * 某研究喂食量对斑马鱼(zebrafish)存活的影响。在恒温下，投入饲料X (mg)，斑马鱼存活比例Y
     * v1 <- c(0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55)
     * v2 <- c(1, 0.95, 0.95, 0.9, 0.85, 0.7, 0.65, 0.6, 0.55, 0.42)
     * -0.9888265
     * 身高体重排名后，相关性分析
     */
    const { len } = _stat(x, y);

    const [countX, countY] = [count(x), count(y)];

    /*

      */

    let [n1, n2, C, D] = [0, 0, 0, 0];
    for (let i = 0; i < len; i++) {
      for (let k = 0; k < len; k++) {
        if (i === k) {
          continue
        }
        if ((x[i] > x[k] && y[i] > y[k]) || (x[i] < x[k] && y[i] < y[k])) {
          C++;
        }
        if ((x[i] > x[k] && y[i] < y[k]) || (x[i] < x[k] && y[i] > y[k])) {
          D++;
        }
      }
    }
    for (const i in countX) {
      const nCount = countX[i];
      if (nCount > 1) {
        n1 += (nCount * (nCount - 1)) / 2;
      }
    }
    for (const i in countY) {
      const nCount = countY[i];
      if (nCount > 1) {
        n2 += (nCount * (nCount - 1)) / 2;
      }
    }

    const n3 = (len * (len - 1)) / 2;
    const numerator = (C - D) / 2;
    const denominator = Math.sqrt((n3 - n1) * (n3 - n2));
    return numerator / denominator
  }
});

// @ts-check
// 数组原型扩展
/**
 * @namespace Array_prototype
 */

const $M$3 = math$1;
const flatten = arr => arr.reduce((a, v) => a.concat(Array.isArray(v) ? flatten(v) : v), []);

const publishObj = {
  allCheck (fn = Boolean) {
    /**
     * @memberof Array_prototype#
     * @description 用函数判断每个数组值,默认判断真值
     * @function allCheck
     * @return {Any}
     * @example
     * let a = [1,2,3]
     * console.log(a.allCheck())
     * // true
     */

    return this.every(fn)
  },
  indexOfAll (val) {
    /**
     * @memberof Array_prototype#
     * @description 找到所有的值得下标
     * @function indexOfAll
     * @return {Any}
     * @example
     * let a = [1,2,3,1]
     * console.log(a.indexOfAll(1))
     * // [0,3]
     */

    return this.reduce((acc, el, i) => (el === val ? [...acc, i] : acc), [])
  },
  pick () {
    /**
     * @memberof Array_prototype#
     * @description 数组中随机抽取1个值
     * @function pick
     * @return {Any}
     * @example
     * let a = [1,2,3]
     * console.log(a.pick())
     * // 1
     */

    const n = $M$3.uniformRandInt(0, this.length - 1);
    return this[n]
  },
  copy () {
    /**
     * @memberof Array_prototype#
     * @description 一般深度复制数组
     * @function copy
     * @return {Object}
     * @example
     * let a = [1,2,3]
     * let b = a.copy()
     */

    return JSON.parse(JSON.stringify(this))
  },
  count () {
    return $M$3.count(this)
  },
  countAdv () {
    return $M$3.countAdv(this)
  },
  mode () {
    return $M$3.mode(this)
  },
  countBy (fn) {
    /**
     * @memberof Array_prototype#
     * @description 根据函数计数
     * @function countBy
     * @return {Object}
     * @example
     * countBy([5.2, 4.2, 5.3], Math.floor); // {4: 1, 5: 2}
     */

    return this.map(typeof fn === 'function' ? fn : val => val[fn]).reduce((acc, val) => {
      acc[val] = (acc[val] || 0) + 1;
      return acc
    }, {})
  },
  flatten () {
    /**
     * @memberof Array_prototype#
     * @description 展开嵌套数组到一层
     * @function flatten
     * @return {Array}
     * @example
     * [1, [2, [3, [4, 5], 6], 7], 8].flatten().join('')
     * // '12345678'
     */

    return flatten(this)
  },
  findMaxMin () {
    return $M$3.findMaxMin(this)
  },
  /**
   *
   * @param {Array} groupCol 显示的列
   * @param {Array} aggregateCol 聚合列
   * @param {Array} aggregateOpt 聚合列的操作
   * @param {Array} aggregateColAlias 聚合列别名
   * @returns {Array}
   */
  groupBy (groupCol, aggregateCol = [], aggregateOpt = [], aggregateColAlias = []) {
    const groupObj = {};
    const groupAry = [];
    for (let i = 0; i < this.length; i++) {
      let groupKey = '';
      const groupKeyAry = [];
      const aItem = this[i];
      for (let col = 0; col < groupCol.length; col++) {
        groupKeyAry.push(aItem[groupCol[col]] ?? '<Null>');
      }
      groupKey = groupKeyAry.join(',');
      let keyObj = groupObj[groupKey];
      if (keyObj) {
        let idx = 0;
        aggregateCol.forEach(item => {
          const opt = aggregateOpt[idx] || 'count';
          switch (opt) {
            case 'count':
              keyObj[aggregateColAlias[idx] ?? `count(${item})`]++;
              break
            case 'sum':
              keyObj[aggregateColAlias[idx] ?? `sum(${item})`] += aItem[item];
              break
            case 'avg':
              keyObj[`_avgCount(${item})`]++;
              keyObj[aggregateColAlias[idx] ?? `avg(${item})`] = (keyObj[aggregateColAlias[idx] ?? `avg(${item})`] * (keyObj[`_avgCount(${item})`] - 1) + aItem[item]) / keyObj[`_avgCount(${item})`];
              break
            case 'max':
              keyObj[aggregateColAlias[idx] ?? `max(${item})`] = keyObj[aggregateColAlias[idx] ?? `max(${item})`] < aItem[item] ? aItem[item] : keyObj[aggregateColAlias[idx] ?? `max(${item})`];
              break
            case 'min':
              keyObj[aggregateColAlias[idx] ?? `min(${item})`] = keyObj[aggregateColAlias[idx] ?? `min(${item})`] > aItem[item] ? aItem[item] : keyObj[aggregateColAlias[idx] ?? `min(${item})`];
              break
          }
          idx++;
        });
      } else {
        groupObj[groupKey] = {};
        keyObj = groupObj[groupKey];
        let idx = 0;
        aggregateCol.forEach(item => {
          const opt = aggregateOpt[idx] || 'count';
          switch (opt) {
            case 'count':
              keyObj[aggregateColAlias[idx] ?? `count(${item})`] = 1;
              break
            case 'sum':
              keyObj[aggregateColAlias[idx] ?? `sum(${item})`] = aItem[item];
              break
            case 'avg':
              keyObj[`_avgCount(${item})`] = 1;
              keyObj[aggregateColAlias[idx] ?? `avg(${item})`] = aItem[item];
              break
            case 'max':
              keyObj[aggregateColAlias[idx] ?? `max(${item})`] = aItem[item];
              break
            case 'min':
              keyObj[aggregateColAlias[idx] ?? `min(${item})`] = aItem[item];
              break
          }
          idx++;
        });
      }
    }
    for (const i in groupObj) {
      const groupColKey = i.split(',');
      const o = {};
      for (let d = 0; d < groupColKey.length; d++) {
        if (groupCol[d]) {
          o[groupCol[d]] = groupColKey[d];
        }
      }
      for (const k in groupObj[i]) {
        if (!k.includes('_avgCount')) {
          o[k] = groupObj[i][k];
        }
      }
      groupAry.push(o);
    }
    return groupAry
  },
  orderBy (props, orders = ['asc']) {
    return [...this].sort((a, b) =>
      props.reduce((acc, prop, i) => {
        if (acc === 0) {
          const [p1, p2] = orders && orders[i] === 'desc' ? [b[prop], a[prop]] : [a[prop], b[prop]];
          acc = p1 > p2 ? 1 : p1 < p2 ? -1 : 0;
        }
        return acc
      }, 0)
    )
  },
  equals (a) {
    if (!a) {
      return false
    }
    if (this.length !== a.length) {
      return false
    }
    for (let i = 0, l = this.length; i < l; i++) {
      if (this[i] instanceof Array && a[i] instanceof Array) {
        if (!this[i].equals(a[i])) {
          return false
        }
      } else if (this[i] !== a[i] && !isNaN(this[i]) && !isNaN(a[i])) {
        // NOTICE: {x:1} != {x:1} =>true  NaN!==NaN =>true
        return false
      }
    }
    return true
  },
  unique () {
    /**
     * @memberof Array_prototype#
     * @description 数组去重
     * @function unique
     * @return {Array}
     * @example
     * [undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN].unique()
     * // [ undefined, null, 1, '1', NaN ]
     */

    return Array.from(new Set(this))
  },
  intersect (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 交集
     * @function intersect
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3].intersect([3, 4, 5])
     * // [3]
     */

    return this.filter(v => a.includes(v)).unique()
  },
  union (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 并集
     * @function union
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3].union([3, 4, 5])
     * // [1, 2, 3, 4, 5]
     */

    return this.concat(a).unique()
  },
  except (a = []) {
    /**
     * @memberof Array_prototype#
     * @description AB差集 属于A不属于B BA差集 反之
     * @function except
     * @param {Array} a 另一数组
     * @return {Array}
     * @example
     * [1, 2, 3, 4].except([2, 3, 5])
     * // [1, 4]
     */

    const aInter = this.filter(v => a.includes(v));
    return this.filter(v => !aInter.includes(v)).unique()
  },
  subset (a = []) {
    /**
     * @memberof Array_prototype#
     * @description 数组是否为另一数组的子集
     * @function subset
     * @param {Array} a 另一数组
     * @return {Boolean}
     * @example
     * [undefined, null, NaN, undefined, undefined].subset([undefined, null, 1, 1, '1', '1', null, undefined, NaN, NaN])
     * // true
     */
    // 是否为子集
    return !this.some(v => !a.includes(v))
  },
  max: function () {
    return $M$3.max(this)
  },
  min: function () {
    return $M$3.min(this)
  },
  sum: function () {
    return $M$3.sum(this)
  },
  mean: function () {
    return $M$3.mean(this)
  },
  median: function () {
    return $M$3.median(this)
  },
  shuffle () {
    /**
     * @memberof Array_prototype#
     * @description 随机打乱数组的值
     * @function shuffle
     * @return {Array}
     * @example
     * [1, 2, 3, 4, 5].shuffle()
     * // [随机]
     */

    return this.sort(() => Math.random() - 0.5)
  },
  fisherYates () {
    let i = this.length;
    while (i) {
      const j = Math.floor(Math.random() * i--)
      ;[this[i], this[j]] = [this[j], this[i]];
    }
    return this
  },
  chunk (perGroupLen) {
    let idx = 0;
    const a = [];
    while (idx < this.length) {
      a.push(this.slice(idx, (idx += perGroupLen)));
    }
    return a
  },
  remove (idx = 0, len = 1) {
    /**
     * @memberof Array_prototype#
     * @description 删除数组某一下标起的n个值
     * @function remove
     * @param {integer} idx 下标
     * @param {integer} len 个数
     * @return {Array}
     * @example
     * [1, 2, 3, 4, 5].remove()[0]
     * // 2
     */

    this.splice(idx, len);
    return this
  }
};
var array$2 = publishObj;

function ext$1 (a, b, isCall = false) {
  if (a && b) {
    for (const item in b) {
      if (!a.hasOwnProperty(item)) {
        if (isCall) {
          a[item] = (first, ...arg) => b[item].apply(first, arg);
        } else {
          // a[item] = b[item]
          Object.defineProperty(a, item, {
            configurable: false,
            enumerable: false,
            value: b[item]
          });
        }
      }
    }
    return a
  }
  return null
}

const _s = string$2;
ext$1(String.prototype, _s);
const string$1 = {};
ext$1(string$1, _s, !0);

const _n = number$2;
ext$1(Number.prototype, _n);
const number$1 = {};
ext$1(number$1, _n, !0);

const _d = date$2;
ext$1(Date.prototype, _d);
const date$1 = {};
ext$1(date$1, _d, !0);

const _f = _function;
ext$1(Function.prototype, _f);

const _a = array$2;
ext$1(Array.prototype, _a);
const array$1 = {};
ext$1(array$1, _a, !0);

/**
 * @memberof Date_prototype#
 * @param {string} str - 填充字符
 * @param {number} len - 总长度
 * @param {number} pos - 1右面，-1左面
 * @description 给日期前后补充字符串
 * @function fillStr
 * @return {string}
 * @example
 * new Date()['fillStr']('a', 50)
 * // Tue Dec 29 2015 01:11:01 GMT+0800 (中国标准时间)aa
 */
Date.prototype['fillStr'] = String.prototype['fillStr']; //eslint-disable-line

/**
 * @namespace Buffer_prototype
 * */
/**
 * @memberof Buffer_prototype#
 * @description 合并两个Buffer
 * @function contact
 * @param {Buffer} b 另一Buffer
 * @return {Buffer}
 * @example
 * Buffer.from('123').contact(Buffer.from('456')).toString()
 * // "123456"
 * */
if (Buffer !== undefined) {
  Buffer.prototype.contact =
    Buffer.prototype.contact ||
    function (b) {
      /*
    utf8 有bom头
    EF BB BF [239 187 191]
    */

      const bf = Buffer.alloc(this.length + b.length);
      this.copy(bf, 0, 0, this.length);
      b.copy(bf, this.length, 0, b.length);
      return bf
    };
}

var prototypeExt = {
  array: array$1,
  date: date$1,
  number: number$1,
  string: string$1,
  ext: ext$1
};

/* istanbul ignore file */

// @ts-check
/*
通用表格模板
*/

var genGrid = {
  genHtml,
  gridTable
};

/**
 *
 * @param {Array} arr 传入的数组
 * @param {*} isOpen 是否打开details标记
 * @param {*} isIndex 是否显示索引列
 */

function gridTable (arr, isOpen = '', isIndex = 0) {
  // isOpen '' or  open
  const redColor = '#f5222d';
  const greenColor = '#52c41a';
  const yellowColor = '#faad14';
  let body = '';
  const gridId = 'G' + ((Math.random() * 1000000) | 0);
  for (let i = 0; i < arr.length; i++) {
    const { dataTitleArr, dataArr, dataTitle } = arr[i];
    let trTitle = [];
    let tBody = '';
    let n = 1;
    try {
      if (isIndex) {
        dataTitleArr.unshift('序号');
      }
      trTitle = dataTitleArr
        .map(k => {
          return `<th title="${k}">${k}</th>`
        })
        .join('');
      tBody = dataArr
        .map(item => {
          if (isIndex) {
            item.unshift(n++);
          }
          const td = item
            .map((v, idx) => {
              let colorStr = '';
              if (['min', 'max', 'avg', 'time'].includes(dataTitleArr[idx])) {
                const v1 = +v.replace('ms', '');
                if (v1 > 0 && v1 <= 60) {
                  colorStr = `style="color:${greenColor}"`;
                }
                if (v1 > 60 && v1 <= 200) {
                  colorStr = `style="color:${yellowColor}"`;
                }
                if (v1 > 200) {
                  colorStr = `style="color:${redColor}"`;
                }
              }
              return `<td ${colorStr}>${v}</td>`
            })

            .join('');

          return `<tr>${td}</tr>`
        })
        .join('');
    } catch (e) {
      return [500, '错误', e.toString()]
    }
    body += `
      <details ${isOpen}>
      <summary><font size="5">${dataTitle}</font></summary>
      <button class="gridBtn" data-clipboard-target="#${gridId}">
          To Clipboard
      </button>
        <table id="${gridId}" class="gridtable">
          <thead>
            <tr>${trTitle}</tr>
          </thead>
          <tbody>${tBody}</tbody>
        </table>
      </details>`;
  }
  return body
}

/**
 *
 * @param {String} htmlTitle
 * @param {String} bodyText
 */

function genHtml (htmlTitle = '', bodyText = '', htmlHeadExtend = '') {
  return `<!DOCTYPE html>
  <html lang="zh-ch">
  <meta name="apple-mobile-web-app-capable" content="yes" />
  <meta name="apple-mobile-web-app-status-bar-style" content="black" />
  <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
  <head>
    <meta charset="utf-8"><title>${htmlTitle}</title>
    ${htmlHeadExtend}
      <style type="text/css">
          canvas {width: 90%;height: 300px;}
          table.gridtable {
              margin: 5px;
              font-family: verdana,arial,sans-serif;
              font-size:11px;
              color:#333333;
              background-color:#dddddd;
              border-width: 1px;
              border-color: #666666;
              border-collapse: collapse;
          }
          table.gridtable th {
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: #666666;
              background-color: #dedede;
          }
          table.gridtable td {
              text-align: left;
              border-width: 1px;
              padding: 8px;
              border-style: solid;
              border-color: #999999;
              background-color: #ffffff;
          }
      </style>
  </head>
  <body>${bodyText}</body>
  <script src="https://cdn.jsdelivr.net/npm/clipboard@2.0.10/dist/clipboard.min.js"></script>
  <script>
    new ClipboardJS('.gridBtn')
  </script>
  </html>`
}

/**
 * @namespace tools
 */

const $M$2 = math$1;

const genTemp = genGrid;
// tools库扩展
const getType = Object.prototype.toString;
const has = Object.prototype.hasOwnProperty;

const tools$4 = {
  size (val) {
    /**
     * @memberof tools#
     * @description 去对象的长度，支持Unicode object第一层
     * @param {mixed} val - 任何合法数据
     * @return {number}
     * @example
     * console.log($.tools.size({a:1,b:{c:1}}))
     * // 2
     */

    return Array.isArray(val) ? val.length : val && typeof val === 'object' ? val.size || val.length || Object.keys(val).length : typeof val === 'string' ? Buffer.from(val).length : 0
  },
  equals (x, y) {
    /**
     * @memberof tools#
     * @description 两个对象是否相等
     * @param {mixed} a
     * @param {mixed} b
     * @return {boolean}
     * @example
     * console.log($.tools.equals({ a: [2, { e: 3 ,h:{h:undefined}}], b: [4], c: 'foo' }, { a: [2, {h:{h:undefined}, e: 3 }], b: [4], c: 'foo' }))
     * // true
     */

    let ctor, len;
    if (x === y) {
      return !0
    }

    if (x && y && (ctor = x.constructor) === y.constructor) {
      if (ctor === Date) {
        return x.getTime() === y.getTime()
      }
      if (ctor === RegExp) {
        return x.toString() === y.toString()
      }
      if (ctor === Array) {
        if ((len = x.length) === y.length) {
          while (len-- && tools$4.equals(x[len], y[len])) {
            /*do nothing*/
          }
        }
        return len === -1
      }
      if (!ctor || typeof x === 'object') {
        len = 0;
        for (ctor in x) {
          if (has.call(x, ctor) && ++len && !has.call(y, ctor)) {
            return !1
          }
          if (!(ctor in y) || !tools$4.equals(x[ctor], y[ctor])) {
            return !1
          }
        }
        return Object.keys(y).length === len
      }
    }

    return x !== x && y !== y
  },
  getType (o) {
    /**
     * @typedef {function} tools.getType
     * @memberof tools#
     * @description 获取输入参数o的类型
     * @param {mixed} o - 任何合法数据
     * @return {String}
     * @example
     * console.log($.tools.getType('type'))
     * // String
     */

    return getType
      .call(o)
      .split(' ')[1]
      .split(']')[0]
  },
  isObj (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否对象
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isObj({}))
     * // true
     */

    return getType.call(o) === '[object Object]'
  },
  isObject (o) {
    /**
     * @memberof tools#
     * @description 类型判断：isObj的别称
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isObject('type'))
     * // false
     */

    return getType.call(o) === '[object Object]'
  },
  isString (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否字符串
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isString('type'))
     * // true
     */

    return getType.call(o) === '[object String]'
  },
  isNumber (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否Number
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNumber(123.123))
     * // true
     */

    return getType.call(o) === '[object Number]' && isFinite(o)
  },
  isBigInt (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 BigInt
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBigInt(123456789123456789n))
     * // true
     */

    return getType.call(o) === '[object BigInt]'
  },
  isArray (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 array
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isArray(['type']))
     * // true
     */

    return getType.call(o) === '[object Array]'
  },
  isNull (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 null
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNull(null))
     * // true
     */

    return getType.call(o) === '[object Null]'
  },
  isUndefined (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 undefined
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isUndefined(undefined))
     * // true
     */

    return getType.call(o) === '[object Undefined]'
  },
  isRegExp (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 RegExp
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isRegExp(/^\n+/))
     * // true
     */

    return getType.call(o) === '[object RegExp]'
  },
  isBoolean (o) {
    /**
     * @memberof tools#
     * @description 类型判断：是否 Boolean
     * @param {mixed} o - 任何合法数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBoolean(!5))
     * // true
     */

    return getType.call(o) === '[object Boolean]'
  },
  isPInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否大于0的正整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isPInt(522))
     * // true
     */

    const g = /^[1-9]+(\d*)$/;
    return g.test(o)
  },
  isNInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否小于0的负整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isNInt(-522))
     * // true
     */

    const g = /^-[1-9]+(\d*)$/;
    return g.test(o)
  },
  isInt (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否整数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isInt(-522))
     * // true
     */

    const g = /^-?\d+$/;
    return g.test(o)
  },
  isDecimal (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否小数
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isDecimal(-522.5))
     * // true
     */

    return !isNaN(o) && o !== '' && !this.isNull(o) && !this.isArray(o) && !this.isBoolean(o) && !this.isDate(o) // this.isNumber(o) 字符串数值就无法判断了
  },
  isBool (s) {
    /**
     * @memberof tools#
     * @description 合法判断：是否可表达是否的数据
     * @param {string|Number} s - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isBool(1))
     * // true
     */

    const b = ['0', '1', 'true', 'false'].includes((s + '').toLow());
    return this.isBoolean(s) || b
  },
  isDate (o) {
    /**
     * @memberof tools#
     * @description 合法判断：是否日期，Date对象或者可以用Date.parse解析的字符串或数字均返回true
     * @param {string|Number} o - 要判断的数据
     * @return {boolean}
     * @example
     * console.log($.tools.isDate('2019-06-14'))
     * // true
     */

    if (this.getType(o) === 'Date') {
      return !0
    }
    if (this.isBoolean(o)) {
      return !1
    }
    const s = String(o);
    const b1 = s.indexOf('-');
    const b2 = s.indexOf('/');
    const b = b1 > 0 || b2 > 0;
    // let b = /^[^-/].+[-/].+/g.test(s) //或者使用正则
    return s === '#now()' || (b && !isNaN(Date.parse(o)))
  }
};
tools$4.genTemp = genTemp;
tools$4.ifObjEmpty = function (o, ex) {
  /**
   * @memberof tools#
   * @description 判断对象是否为空,ex是需要排除的数据数组
   * @function ifObjEmpty
   * @param {Object} o - 判断的对象
   * @param {Array} ex - 需要排除的属性数组
   * @return {String}
   * @example
   * console.log($.tools.ifObjEmpty('{test: 'test'}', ['test']))
   */

  ex = ex || [];
  for (const i in o) {
    if (ex.includes(i)) {
      continue
    } else {
      return !1
    }
  }
  return !0
};

tools$4.jsonPack = function (obj, order) {
  /**
   * @memberof tools#
   * @description 数组相同属性的元素,属性合并成第一个数组元素
   * @function jsonPack
   * @param {Array} o - 输入的数组
   * @param {Number|Null} order - 是否排序
   * @return {String}
   * @example
   * console.log($.tools.jsonPack([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1)))
   * // [['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]]
   */

  const len = obj.length;
  const a = [];
  for (const prop in obj[0]) {
    a.push(prop);
  }
  if (order === 1) {
    a.sort();
  }
  const ret = [];
  ret.push(a);
  const pLen = a.length;
  for (let i = 0; i < len; i++) {
    const _arr = [];
    for (let j = 0; j < pLen; j++) {
      const key = a[j];
      _arr.push(obj[i][key]);
    }
    ret.push(_arr);
  }
  return ret
};

tools$4.copy = function (o) {
  /**
   * @memberof tools#
   * @description 浅拷贝一个对象
   * @function copy
   * @param {mixed} o - 任何数据
   * @return {mixed}
   * @example
   * console.log($.tools.copy([{ bac: 2, abc: 1, cba: 3 }, { cba: 33, bac: 22, abc: 11 }, { bac: 222, cba: 333, abc: 111 }], 1)))
   * // [['abc', 'bac', 'cba'], [1, 2, 3], [11, 22, 33], [111, 222, 333]]
   */
  return JSON.parse(JSON.stringify(o))
};

tools$4.uuid = function (len, radix) {
  /**
   * @memberof tools#
   * @description 返回多位随机字符
   * @function uuid
   * @param {Number|Null} len - 长度
   * @param {Number} radix - 进制
   * @return {String}
   * @example
   *  tools.uuid(null, 64) // '2EC9D207-DCA5-4D96-A397-F1371D053AEB'
   */

  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
  const uuid = [];
  let i;
  radix = radix || chars.length;
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | (Math.random() * radix)];
    }
  } else {
    // rfc4122, version 4 form
    let r;
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
    uuid[14] = '4';
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | (Math.random() * 16);
        uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r];
      }
    }
  }
  return uuid.join('')
};
tools$4.wait = function (t) {
  /**
   * @memberof tools#
   * @description promise停止t秒
   * @function wait
   * @param {Number} t - 停止秒数
   * @return {Function}
   */

  return new Promise(resolve => {
    // 老的方法使用 return function 在最外层递归调用时候有问题
    const id = setTimeout(() => {
      clearTimeout(id);
      resolve();
    }, t);
  })
};

tools$4.waitNotEmpty = async function (o, prop, fn) {
  /**
   * @memberof tools#
   * @description 返回a,b之间的整数
   * @function waitNotEmpty
   * @param {Object} o - 被测对象
   * @param {String} prop - 排除的属性
   * @param {Function} fn - 回调函数
   * await waitNotEmpty(db, '_mysql')
   */

  const func =
    fn ||
    function () {
      /* do nothing */
    };
  if (!o[prop]) {
    func(o, prop);
    await tools$4.wait(100);
    await tools$4.waitNotEmpty(o, prop, func);
  }
};

tools$4.rnd = function (a, b) {
  /**
     * @memberof tools#
     * @description 返回a,b之间的整数
     * @function rnd
     * @param {Number} a - 范围最小值
     * @param {Number} b - 范围最大值
     * @return {Number}
     * $.tools.rnd(-100, -100)
     // -100
     */

  return $M$2.uniformRandInt(a, b)
};
tools$4.timeAgo = function (t1, t2, lng = 'zh') {
  /**
   * @memberof tools#
   * @description 两个时间差 中文显示函数
   * @function timeAgo
   * @param {Date|Number|String} t1 - 时间随便取
   * @param {Date|Number|String} t2 - 时间随便取
   * @param {String} lng - 语言包
   * @return {String}
   * @example
   * $.tools.timeAgo(1558338047719, 1558338047719)
   * // 刚刚
   */
  // NOTICE: 如果前端使用 需要兼容一下 str.replace(/-/g,"/")
  let [r, n, dt] = [null, 0, new Date(t2) - new Date(t1)];
  const a = [
    lng === 'zh' ? '年' : 'year',
    60 * 60 * 24 * 365,
    lng === 'zh' ? '个月' : 'month',
    60 * 60 * 24 * 30,
    lng === 'zh' ? '天' : 'day',
    60 * 60 * 24,
    lng === 'zh' ? '小时' : 'hours',
    60 * 60,
    lng === 'zh' ? '分钟' : 'min',
    60,
    lng === 'zh' ? '秒' : 'secs',
    1
  ]; // ymdhms格式
  a.some((item, idx) => {
    n = Math.abs(dt) / a[idx * 2 + 1] / 1000;
    if (n >= 1) {
      r = ~~n + a[idx * 2] + (lng === 'zh' ? ['前', '后'] : ['ago', 'late'])[dt > 0 ? 0 : 1];
      return !0
    }
  });
  return Math.abs(dt) < 1000 ? (lng === 'zh' ? '刚刚' : 'just now') : r
};

tools$4.checkParam = function (a, b) {
  /**
  * @memberof tools#
  * @description 检查 a 对象是否符合 b 对象所描述的要求
  * @param {Object} a - 被检查的对象，将检查里面的每一个键值对
  * @param {Object} b - 描述对象。里面的每一个值，都是对该键的描述，将检查 a 对象中的同名键的值是否符合该描述
  * @return {String}
  * @example
  * $.tools.checkParam({
       id: 2
     }, {
       id: {
         desc: 'id',
         req: 1,
         type: 'int',
         size: [-1, 1]
       },
     })
  * // {
  * //   code: 200,
  * //   msg: '',
  * //   data: {
  * //     id: 2
  * //   }
  * // }
  */
  // NOTICE : 0的问题
  const c = {};
  let _n;
  // 类型判断函数
  const typeCheck = function (i, valA, valB, addToC) {
    addToC = addToC !== false; // 默认为true
    switch ((valB.type || 'string').toLow()) {
      case 'int':
        _n = valA === 0 ? 0 : valA || valB.def;
        if (!tools$4.isInt(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为整型'
          }
        }
        addToC && (c[i] = +_n);
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'positive':
        _n = valA === 0 ? 0 : valA || valB.def;
        if (!tools$4.isInt(_n) || _n <= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为正数'
          }
        }
        addToC && (c[i] = +_n);
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'negative':
        _n = valA === 0 ? 0 : valA || valB.def;
        if (!tools$4.isInt(_n) || _n >= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为负数'
          }
        }
        addToC && (c[i] = +_n);
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'string':
        if (typeof valA !== 'string') {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为字符串，不能为null NaN等'
          }
        }
        _n = valA === '' ? '' : String(valA || '') || valB.def;
        _n = _n ? _n.trim() : _n; // string类型默认会trim
        addToC && (c[i] = _n);
        if (valA && valB.size) {
          const len = _n.len();
          if (len < valB.size[0] || len > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ` 长度有误[${valB.size[0]}-${valB.size[1]}]`
            }
          }
        }
        if (valA && valB.reg) {
          if (!new RegExp(valB.reg).test(valA)) {
            return {
              code: 401,
              msg: valB.err || (valB.name || i) + ' 格式有误'
            }
          }
        }

        break
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = valA || (valB.def === '#now()' ? new Date() : valB.def);
        if (!valB.req && _n === '') {
          break
        }
        if (!tools$4.isDate(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为日期型'
          }
        }
        addToC && (c[i] = _n);
        break
      case 'file':
        if (!tools$4.isArray(valA) || !valA[0].size) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为文件类型'
          }
        }
        if (tools$4.isArray(valB.size)) {
          if (valA.some(x => x.size < valB.size[0] || 0 || x.size > valB.size[1] || valB.size[0] || 0)) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 类型错误,文件大小不在允许范围'
            }
          }
        }
        if (!valB.fileType) {
          break
        }
        if (tools$4.isArray(valB.fileType)) {
          if (valB.fileType.includes('*')) {
            break
          }
          if (valA.some(x => !valB.fileType.includes(x.type))) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 文件类型不在允许的范围'
            }
          }
        }
        break
      case 'enum':
        _n = valA;
        if (!tools$4.isArray(valB.size)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为枚举型'
          }
        }
        addToC && (c[i] = _n);
        if (!valB.size.includes(c[i]) && !valB.size.includes(+c[i])) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 枚举范围有误'
          }
        }
        break
      case 'bool':
        if (tools$4.isBoolean(valA)) {
          addToC && (c[i] = valA);
          break
        }
        _n = valA === 0 ? 0 : valA || valB.def;
        if (!tools$4.isBool(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误，,应为布尔型 ' + _n
          }
        }
        addToC && (c[i] = _n);
        break
      case 'number':
        _n = valA === 0 ? 0 : valA || valB.def;
        if (!tools$4.isDecimal(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数值型'
          }
        }
        addToC && (c[i] = +_n);
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'array': // 支持数组
        if (!(valA instanceof Array)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数组型'
          }
        }
        // 如果是数组，可以为它配置items的类型： arrayParam1:{type:'array',items:{type:'string'}}
        for (let j = 0; j < valA.length; j++) {
          const result = typeCheck(i, valA[j], valB.items || {}, false);
          if (result && result.code >= 400) {
            return result
          }
        }
        addToC && (c[i] = valA);
        break
      default:
        return {
          code: 500,
          msg: '参数类型定义错误'
        }
    }
  };
  for (const i in b) {
    if (b[i].req === 1) {
      if (!a[i]) {
        return {
          code: 401,
          msg: b[i].reqErr || (b[i].name || i) + ' 必填'
        }
      } else {
        const r = typeCheck(i, a[i], b[i]);
        if (r) {
          return r
        }
      }
    } else {
      if (a[i] === void 0) {
        c[i] = a[i] || b[i].def;
        if (c[i] === null || c[i] === void 0) {
          delete c[i];
        }
      } else {
        const r = typeCheck(i, a[i], b[i]);
        if (r) {
          return r
        }
      }
    }
  }
  return {
    code: 200,
    msg: '',
    data: c
  }
};

/**
 * @typedef {Object} tools.utf8
 * @description 对utf8和Unicode的互转码
 * @property {function} encode(str) 把utf8转为Unicode编码
 * @property {function} decode(str) 把Unicode转为utf8编码
 */

const utf8 = {
  encode (s) {
    /**
     * @memberof tools.utf8#
     * @description 把utf8转为Unicode编码
     * @param {string} s
     * @return {String}
     * @example
     * $.tools.utf8.encode('你好abc')
     */

    let r = '';
    const len = s.length;
    const fromCode = String.fromCharCode;
    for (let n = 0; n < len; n++) {
      const c = s.charCodeAt(n);
      if (c < 128) {
        r += fromCode(c);
      } else if (c > 127 && c < 2048) {
        r += fromCode((c >> 6) | 192);
        r += fromCode((c & 63) | 128);
      } else {
        r += fromCode((c >> 12) | 224);
        r += fromCode(((c >> 6) & 63) | 128);
        r += fromCode((c & 63) | 128);
      }
    }
    return r
  },
  decode (s) {
    /**
     * @memberof tools.utf8#
     * @description 把Unicode转为utf8编码
     * @param {string} s
     * @return {String}
     */

    let r = '';
    let i = 0;
    let c1 = 0;
    let c2 = 0;
    let c3 = 0;
    const fromCode = String.fromCharCode;
    while (i < s.length) {
      c1 = s.charCodeAt(i);
      if (c1 < 128) {
        r += fromCode(c1);
        i++;
      } else if (c1 > 191 && c1 < 224) {
        c2 = s.charCodeAt(i + 1);
        r += fromCode(((c1 & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = s.charCodeAt(i + 1);
        c3 = s.charCodeAt(i + 2);
        r += fromCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
        i += 3;
      }
    }
    return r
  }
};
tools$4.utf8 = utf8;

/**
 * @typedef {Object} tools.lzw
 * @description LZW，对中文的压缩算法
 * @property {function} compress(str) 压缩
 * @property {function} uncompress(str) 解压缩
 */

const lzw = {
  compress (str) {
    /**
     * @typedef {function} tools.lzw.compress
     * @description 压缩
     * @param {string} str
     * @return {String}
     * @example
     * $.tools.lzw.compress($.tools.utf8.encode('你好abc'))
     */

    const fromCode = String.fromCharCode;
    let rStr = '';
    rStr = utf8.encode(str);
    let size = 0;
    let xstr = '';
    let chars = 256;
    const dict = [];
    for (let i = 0; i < chars; i++) {
      dict[String(i)] = i;
    }
    let splitted = [];
    splitted = rStr.split('');
    let buffer = [];
    size = splitted.length;
    let current = '';
    let r = '';
    for (let i = 0; i <= size; i++) {
      current = String(splitted[i]);
      xstr = buffer.length === 0 ? String(current.charCodeAt(0)) : buffer.join('-') + '-' + String(current.charCodeAt(0));
      if (dict[xstr] !== void 0) {
        buffer.push(current.charCodeAt(0));
      } else {
        r += fromCode(dict[buffer.join('-')]);
        dict[xstr] = chars;
        chars++;
        buffer = [];
        buffer.push(current.charCodeAt(0));
      }
    }
    return r
  },
  uncompress (str) {
    /**
     * @memberof tools.lzw#
     * @description 解压缩
     * @param {string} str
     * @return {String}
     */

    let i;
    let chars = 256;
    const dict = [];
    const fromCode = String.fromCharCode;
    for (i = 0; i < chars; i++) {
      dict[i] = fromCode(i);
    }
    const original = String(str);
    const splitted = original.split('');
    const size = splitted.length;
    let buffer = '';
    let chain = '';
    let r = '';
    for (i = 0; i < size; i++) {
      const code = original.charCodeAt(i);
      const current = dict[code];
      if (buffer === '') {
        buffer = current;
        r += current;
      } else {
        if (code <= 255) {
          r += current;
          chain = buffer + current;
          dict[chars] = chain;
          chars++;
          buffer = current;
        } else {
          chain = dict[code];
          if (chain === null) {
            chain = buffer + buffer.slice(0, 1);
          }
          r += chain;
          dict[chars] = buffer + chain.slice(0, 1);
          chars++;
          buffer = chain;
        }
      }
    }
    r = utf8.decode(r);
    return r
  }
};
tools$4.lzw = lzw;
// 取函数反值
const negate = func => (...args) => !func(...args);
tools$4.negate = negate;
const obj2Url = function obj2Url (o) {
  const a = [];
  for (const i in o) {
    a.push(`${i}=${o[i]}`);
  }
  return a.join('&')
};
tools$4.obj2Url = obj2Url;
const objByString = function objByString (o, s) {
  /**
   * @memberof tools.objByString#
   * @description 通过字符串访问对象内部
   * @param {object} o
   * @param {string} s
   * @return {any}
   */

  const a = s
    .replace(/\[(\w+)\]/g, '.$1')
    .replace(/^\./, '')
    .split('.');
  for (let i = 0, n = a.length; i < n; ++i) {
    const k = a[i];
    if (k in o) {
      o = o[k];
    } else {
      return // undefined
    }
  }
  return o
};

const cFn = function cFn (s, fc, dimNum, bc, isUnderline) {
  /**
   * 返回控制台颜色包裹体
   * 背景色:                          前景色:
   * 40: 黑                          30: 黑
   * 41: 红                          31: 红
   * 42: 绿                          32: 绿
   * 43: 黄                          33: 黄
   * 44: 蓝                          34: 蓝
   * 45: 紫                          35: 紫
   * 46: 深绿                        36: 深绿
   * 47: 白色                        37: 白色
   * @param {int} [fc] 前景色 frontColor， 可选 30-37
   * @param {enum} [dimNum] 设为1高亮度（其实是加粗），设为2或0则无高亮
   * @param {int} [bc] 背景色 backgroundColor，可选 40-47
   * @param {boolean} [isUnderline] 是否有下横线
   * @return {string}
   * */

  return `${isUnderline ? '\x1b[4m' : ''}${dimNum ? '\x1b[2m' : ''}${fc ? `\x1b[${fc}m` : '\x1b[37m'}${bc ? `\x1b[${bc}m` : ''}${s || ''}\x1b[0m`
};

/**
 *  0  All attributes off  5  Blink
    1  Bold   7  Reverse Video
    2  Dim    8  Invisible
    4  Underline

 * @description 控制台控制以及颜色输出
 * @prop {string} [cls] 把光标位置设到0,0，并清屏
 * @prop {function} [xy] 设置光标位置 $.c.xy(0,0)
 * @prop {string} [none] 包裹体结尾符
 * @prop {string} [black] 黑
 * @prop {string} [red] 亮红
 * @prop {string} [green] 亮绿
 * @prop {string} [yellow] 亮黄
 * @prop {string} [blue] 亮蓝
 * @prop {string} [magenta] 亮紫
 * @prop {string} [cyan] 亮深绿
 * @prop {string} [white] 亮白色
 * @prop {string} [dimred] 红
 * @prop {string} [dimgreen] 绿
 * @prop {string} [dimyellow] 黄
 * @prop {string} [dimblue] 蓝
 * @prop {string} [dimmagenta] 紫
 * @prop {string} [dimcyan] 深绿
 * @prop {string} [dimwhite] 白色
 * @prop {function} [r(string,backgroundColor,underLine)] 亮红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [g(string,backgroundColor,underLine)] 亮绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [y(string,backgroundColor,underLine)] 亮黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [b(string,backgroundColor,underLine)] 亮蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [m(string,backgroundColor,underLine)] 亮紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [c(string,backgroundColor,underLine)] 亮深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [w(string,backgroundColor,underLine)] 亮白色(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimr(string,backgroundColor,underLine)] 红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimg(string,backgroundColor,underLine)] 绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimy(string,backgroundColor,underLine)] 黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimb(string,backgroundColor,underLine)] 蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimm(string,backgroundColor,underLine)] 紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimc(string,backgroundColor,underLine)] 深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimw(string,backgroundColor,underLine)] 白色(字符串，背景色[40-47]，下横线(bool))
 */

const c$2 = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */

  cls: '\x1b[0;0;H\x1b[0J',
  xy (x, y) {
    return `\x1b[${y};${x};H`
  },

  r (s, bc, u) {
    return cFn(s, 31, 0, bc, u)
  },
  g (s, bc, u) {
    return cFn(s, 32, 0, bc, u)
  },
  green: '\x1b[32m',
  y (s, bc, u) {
    return cFn(s, 33, 0, bc, u)
  },
  yellow: '\x1b[33m',
  b (s, bc, u) {
    return cFn(s, 34, 0, bc, u)
  },
  m (s, bc, u) {
    return cFn(s, 35, 0, bc, u)
  },
  c (s, bc, u) {
    return cFn(s, 36, 0, bc, u)
  },
  cyan: '\x1b[36m',
  w (s, bc, u) {
    return cFn(s, 37, 0, bc, u)
  },
  dimr (s, bc, u) {
    return cFn(s, 31, 1, bc, u)
  },
  dimg (s, bc, u) {
    return cFn(s, 32, 1, bc, u)
  },
  dimy (s, bc, u) {
    return cFn(s, 33, 1, bc, u)
  },
  dimb (s, bc, u) {
    return cFn(s, 34, 1, bc, u)
  },
  dimm (s, bc, u) {
    return cFn(s, 35, 1, bc, u)
  },
  dimc (s, bc, u) {
    return cFn(s, 36, 1, bc, u)
  },
  dimw (s, bc, u) {
    return cFn(s, 37, 1, bc, u)
  },
  none: '\x1b[0m'
};

/**
 * 画字符串表格，结果会直接打印在控制台
 * @private
 * @param {number[]} colWidth [5,1,3]
 * @example $.drawLine([5,1,3])
 * // +-----+-+---+
 * */

function drawLine (colWidth) {
  let s = '';
  for (let i = 0; i < colWidth.length; i++) {
    s += '+';
    for (let j = 0; j < colWidth[i]; j++) {
      s += '-';
    }
  }
  const r = s + '+';
  console.log(r);
  return r + '\n'
}

/**
 * 在控制台绘制表格
 * @param {array} data
 * @param {array} colWidth
 * @param {object} opt
 * @example
 * let colWidth = [5, 10, 6]
 * let data = [{ id: 1, b: 'aaa', c: 'cccc1' }, { id: 2, b: true, c: 'cccc2' }, { id: 3, b: 'ccc', c: 'cccc3' }]
 * $.drawTable(data, colWidth)
 * $.drawTable(data, colWidth, { color: 1 })
 * //
 * +-----+----------+------+
 * |ID   |B         |C     |
 * +-----+----------+------+
 * |1    |aaa       |cccc1 |
 * |2    |true      |cccc2 |
 * |3    |ccc       |cccc3 |
 * +-----+----------+------+
 * */

function drawTable (data, colWidth = [], opt = { color: 0 }) {
  const len = data.length;
  let s = '';
  let allStr = '';
  const keys = Object.keys(data[0]);
  const keysLen = keys.length;
  for (let i = 0; i < keysLen; i++) {
    colWidth[i] = colWidth[i] || 15; // 默认的列宽为15
    if (opt.color) {
      s += c$2.dimg(keys[i].fillStr(' ', colWidth[i]).toUpperCase()) + '|';
    } else {
      s += keys[i].fillStr(' ', colWidth[i]).toUpperCase() + '|';
    }
  }
  allStr += drawLine(colWidth);
  console.log('|' + s);
  allStr += '|' + s + '\n';
  allStr += drawLine(colWidth);
  for (let i = 0; i < len; i++) {
    s = '';
    for (let k = 0; k < keysLen; k++) {
      let v = data[i][keys[k]];
      const valueType = typeof v;
      v = v + '';
      if (opt.color) {
        switch (valueType) {
          case 'number':
            s += c$2.dimy(v.fillStr(' ', colWidth[k])) + '|';
            break
          case 'boolean':
            s += c$2.dimr(v.fillStr(' ', colWidth[k])) + '|';
            break
          default:
            s += c$2.dimm(v.fillStr(' ', colWidth[k])) + '|';
        }
      } else {
        const diffLen = /\\u001b\[(?:\d*){0,5}\d*m/g.test(v) ? 13 : 0;
        s += v.fillStr(' ', colWidth[k] + diffLen) + '|';
      }
    }
    console.log('|' + s);
    allStr += '|' + s + '\n';
  }
  allStr += drawLine(colWidth);
  return allStr
}
tools$4.c = c$2;
tools$4.drawTable = drawTable;
tools$4.objByString = objByString;
var tools_1 = tools$4;

// const { performance } = require('perf_hooks')

const { c: c$1 } = tools_1;
const { min } = math$1;
const print = function print ({ funcName, spendTime, perSecVal, n, range, msg, fastStr }) {
  console.log(
    c$1.y(funcName.fillStr(' ', 15)),
    (spendTime.toFixed(0) + ' ms').fillStr(' ', 8, -1),
    ((+perSecVal >= 1 ? (perSecVal + '').toMoney() : perSecVal.toFixed(6)) + ' /ms').fillStr(' ', 10, -1),
    n.toExponential() + ' 次',
    ('±' + range.round(2) + '%').fillStr(' ', 9, -1),
    msg,
    fastStr || ''
  );
};
const json$1 = function json (
  fn = function () {
    /* do nothing */
  },
  msg = '',
  n = 1000000
) {
  let everyTime = 0;
  let timeSpend = 0;
  let dt = 0;
  let minDt = Infinity;
  let maxDt = -Infinity;
  for (let i = 0; i < n; i++) {
    everyTime = performance.now();
    fn();
    dt = performance.now() - everyTime;
    timeSpend += dt;
    minDt = dt < minDt ? dt : minDt;
    maxDt = dt > minDt ? dt : maxDt;
  }
  const diffTime = timeSpend;
  const spendTime = diffTime;
  const perSec = ((n / diffTime) * 10000) / 10000;
  const funcName = fn.name || '';
  const perSecVal = perSec >= 1 ? perSec | 0 : perSec.toFixed(6);
  const range = ((maxDt - minDt) / 2 / (spendTime / n)) * 100;

  // 只输出json对象
  return { funcName, spendTime, perSecVal: +perSecVal, n, range, msg }
};
/**
 * benchmark，性能测试函数.
 * @param {function} fn - 被执行的函数.
 * @param {String} msg - 后面的说明
 * @param {number} n - 执行次数.
 * @param {*} isJson  - 是否json返回
 * @return {void} 返回 [函数名] [执行时间] 毫秒 [每毫秒运行次数]/ms [执行次数] 次.
 * @example
 * let prime = function () { return (641).isPrime() }
 * $.benchmark(prime)
 * // prime     41 毫秒  24390.2439/ms 1e+6 次
 */

const benchmark = function benchmark (
  fn = function () {
    /* do nothing */
  },
  msg = '',
  num = 1000000
) {
  print(json$1(fn, msg, num));
};

function suite (a) {
  for (let i = 0; i < a.length; i++) {
    const testSample = [];
    const len = a[i].testArr.length;
    for (let k = 0; k < len; k++) {
      testSample[k] = json$1.apply(null, a[i].testArr[k]);
    }
    console.log('========', a[i].name || '测试' + (i + 1), '========');
    const perSecArr = testSample.map(x => x.perSecVal);

    const minVal = min(perSecArr);

    testSample.forEach((item, idx) => {
      if (testSample[idx].perSecVal > minVal) {
        item.fastStr = c$1.g('x' + (testSample[idx].perSecVal / minVal).toFixed(2)) + ' fast';
      }
      print(item);
    });
    // console.log(perSecArr,maxIdx)
  }
}
const bench$1 = {
  json: json$1,
  print,
  suite,
  benchmark
};
var bench_1 = bench$1;

var name = "meeko";
var version$1 = "1.8.241";
var description = "meeko自用函数";
var keywords = [
	"statistics",
	"js",
	"tools",
	"math",
	"Machine Learning",
	"AI",
	"coverage"
];
var main = "index.js";
var exports = {
	".": {
		"import": "./index.mjs",
		require: "./index.js"
	}
};
var browser$1 = {
	"./index.js": "./index.browser.js"
};
var scripts = {
	patch: "git add . && git commit -m:pencil2: && npm version patch && npm publish .",
	cz: "conventional-changelog -p atom -i CHANGELOG.md -s -r 0 && git add . && git status && git cz",
	push: "npm version patch && npm publish . && git push",
	jsdoc: "jsdoc ./README.md --configure  ./jsdoc.config.js",
	testlocal: "standard *.js && istanbul cover ./node_modules/mocha/bin/_mocha -- -r co-mocha --reporter spec --timeout 100000 --recursive tests/",
	test_new: "nyc mocha --timeout 100000 --recursive tests/",
	test: "mocha --recursive tests/",
	cjs2mjs: "rollup -c rollup.config.js",
	test2: "istanbul cover ./node_modules/mocha/bin/_mocha -- -r co-mocha --reporter mochawesome --timeout 100000 --recursive tests/",
	codecov: "nyc mocha --recursive tests/ && cat ./coverage/lcov.info | codecov",
	cov: "nyc --reporter html --reporter text npm test",
	coveralls: "nyc --reporter=lcov mocha --timeout 100000 --recursive tests/ && cat ./coverage/lcov.info",
	coveralls_old: "istanbul cover _mocha -- -r co-mocha --reporter spec --timeout 100000 --recursive tests/ && cat ./coverage/lcov.info | coveralls && rm -rf ./coverage"
};
var repository = {
	type: "git",
	url: "git://github.com/kongnet/meeko.git"
};
var engines = {
	node: ">= 14.0.0"
};
var author = "Kongnet <9601698@qq.com>";
var license = "MIT";
var devDependencies = {
	"@rollup/plugin-commonjs": "^22.0.0",
	"@rollup/plugin-json": "^4.1.0",
	"cc-jt": "^0.1.26",
	chai: "^4.3.6",
	codecov: "*",
	"conventional-changelog-cli": "^2.0.23",
	coveralls: "*",
	"cz-jt": "^0.1.11",
	docdash: "^1.2.0",
	istanbul: "*",
	jsdoc: "*",
	mocha: "*",
	mockjs: "^1.0.0",
	nyc: "*",
	"rollup-plugin-node-builtins": "^2.1.2",
	"rollup-plugin-node-globals": "^1.4.0"
};
var standard = {
	globals: [
		"$",
		"describe",
		"it",
		"define",
		"db",
		"performance"
	],
	ignore: [
		"/lib/tpl.js",
		"/lib/Snowflake.js"
	]
};
var eslintConfig = {
	plugins: [
	],
	parserOptions: {
		ecmaVersion: 2020,
		sourceType: "module",
		ecmaFeatures: {
			experimentalObjectRestSpread: true,
			jsx: true,
			modules: true
		}
	},
	env: {
		browser: true,
		node: true,
		es6: true,
		mocha: true
	},
	globals: {
		angular: true
	},
	rules: {
		"no-unused-vars": 1,
		camelcase: 0,
		curly: 2,
		"brace-style": [
			2,
			"1tbs",
			{
				allowSingleLine: true
			}
		],
		quotes: [
			1,
			"single"
		],
		semi: 0,
		"no-extra-semi": 1,
		"space-infix-ops": 1,
		"no-console": 0,
		complexity: [
			1,
			10
		]
	},
	"extends": "eslint:recommended"
};
var config$1 = {
	commitizen: {
		path: "./node_modules/cz-jt"
	}
};
var require$$2$2 = {
	name: name,
	version: version$1,
	description: description,
	keywords: keywords,
	main: main,
	exports: exports,
	browser: browser$1,
	scripts: scripts,
	repository: repository,
	engines: engines,
	author: author,
	license: license,
	devDependencies: devDependencies,
	standard: standard,
	eslintConfig: eslintConfig,
	config: config$1
};

/* istanbul ignore file */

// @ts-check
const Mat = mathMatrix.mat;
const tools$3 = tools_1;
const $M$1 = math$1;

/**
 * @description 雅克比迭代
 * @param {*} input
 * @param {*} epsilon
 * @param {*} iterations
 */

function jacobi (input, epsilon = 1e-10, iterations = 100) {
  const n = input[0].length;
  let D = input.copy();
  let S = Mat.identity(n);

  for (let i = 0; i < iterations; i++) {
    const itr = iterate(S, D, n);
    S = itr.S;
    D = itr.D;

    if (isDiagonal(D, epsilon)) {
      D = clean(D, epsilon);
      S = clean(S, epsilon);
      break
    }
  }

  return [S, D, Mat.transpose(S)]
}

function iterate (S, D, n) {
  let di;
  let dj;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue
      }

      if (di === undefined || dj === undefined || Math.abs(D[i][j]) > Math.abs(D[di][dj])) {
        di = i;
        dj = j;
      }
    }
  }

  let angle;

  if (D[di][di] === D[dj][dj]) {
    if (D[di][dj] > 0) {
      angle = Math.PI / 4;
    } else {
      angle = -Math.PI / 4;
    }
  } else {
    angle = 0.5 * Math.atan((2 * D[di][dj]) / (D[di][di] - D[dj][dj]));
  }

  const S1 = Mat.identity(n);
  S1[di][di] = Math.cos(angle);
  S1[dj][dj] = S1[di][di];
  S1[di][dj] = -Math.sin(angle);
  S1[dj][di] = -S1[di][dj];

  return {
    S: Mat.mul(S, S1),
    D: Mat.mul(Mat.mul(Mat.transpose(S1), D), S1)
  }
}

function clean (input, epsilon) {
  const n = input[0].length;
  const result = input.copy();

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (Math.abs(input[i][j]) < epsilon) {
        result[i][j] = 0;
      } else {
        result[i][j] = input[i][j];
      }
    }
  }

  return result
}

function isDiagonal (input, epsilon) {
  const n = input[0].length;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) {
        continue
      }
      if (Math.abs(input[i][j]) > epsilon) {
        return false
      }
    }
  }

  return true
}
function subMatrix (a, startRow, endRow, startColumn, endColumn) {
  const newMatrix = Mat.zero(endRow - startRow + 1, endColumn - startColumn + 1);
  for (let i = startRow; i <= endRow; i++) {
    for (let j = startColumn; j <= endColumn; j++) {
      newMatrix[i - startRow][j - startColumn] = a[i][j];
    }
  }
  return newMatrix
}

function isSymmetric (a) {
  if (Mat.isSquare(a)) {
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j <= i; j++) {
        if (a[i][j] !== a[j][i]) {
          return false
        }
      }
    }
    return true
  }
  return false
}
class Matrix {
  constructor (mat, colName = [], rowName = []) {
    this.optMatrix = mat.copy();
    this.oriMatrix = mat.copy();
    this.colName = colName;
    this.rowName = rowName;
  }

  // 创建向量
  c (arr) {
    this.optMatrix = [...[arr]];
    if (Array.isArray(arr)) {
      this.T();
    } else {
      throw new Error('无法转为向量')
    }
    return this
  }

  get row () {
    return this.optMatrix.length
  }

  get col () {
    return this.optMatrix[0].length
  }

  // 各类分解
  dc (a) {
    a = a || this.optMatrix;
    return {
      qr: new QrDc(a),
      choleskey: new CholeskyDc(a)
    }
  }

  shape () {
    const row = this.optMatrix.length;
    const col = this.optMatrix[0].length;
    return { row, col }
  }

  // 行列式
  det () {
    return Mat.det(this.optMatrix)
  }

  get (row, col) {
    if (row === undefined && col === undefined) {
      return this.V()
    }
    return this.optMatrix[row][col]
  }

  V (isOri) {
    return isOri ? this.oriMatrix : this.optMatrix
  }

  // 转置
  T () {
    this.optMatrix = Mat.transpose(this.optMatrix);
    return this
  }

  add (mat) {
    this.optMatrix = Mat.add(this.optMatrix, mat);
    return this
  }

  sub (mat) {
    this.optMatrix = Mat.sub(this.optMatrix, mat);
    return this
  }

  mul (mat) {
    if (typeof mat === 'number') {
      this.optMatrix = Mat.scalar(this.optMatrix, mat);
    } else {
      this.optMatrix = Mat.mul(this.optMatrix, mat);
    }
    return this
  }

  inv () {
    this.optMatrix = Mat.inv(this.optMatrix);
    return this
  }

  // 参数空=>对角线，数字=>eye*arr,数组=>
  diag (arr) {
    if (arr === undefined) {
      if (!Mat.isSquare(this.optMatrix)) {
        throw new Error('必须是方阵！')
      }
      return this.optMatrix[0].map((x, idx) => this.optMatrix[idx][idx])
    }
    if (typeof arr === 'number') {
      return Mat.identity(arr)
    }
    if (Array.isArray(arr) && !Array.isArray(arr[0])) {
      const m = Mat.identity(arr.length);
      for (let i = 0; i < m.length; i++) {
        m[i][i] = arr[i];
      }
      return m
    }
  }

  // 特征值
  eigen (a) {
    a = a || this.optMatrix;
    if (!Mat.isSquare(a)) {
      throw new Error('必须是方阵！')
    }
    const r = jacobi(a);
    return { s: r[0], d: r[1], st: r[2] }
  }

  // 某行基础统计 a null可以统计其他矩阵
  rowStat (a, rowNum = 0) {
    a = a || this.optMatrix;
    const r = a[rowNum];
    return {
      mean: $M$1.mean(r),
      std: $M$1.stddevCorrect(r),
      median: $M$1.median(r),
      mode: $M$1.mode(r),
      count: $M$1.countAdv(r),
      quantile: $M$1.quantileAll(r),
      r
    }
  }

  // 某列基础统计  a null可以统计其他矩阵
  colStat (a, colNum = 0) {
    a = a || this.optMatrix;
    const r = a.map((x, idx) => a[idx][colNum]);
    return {
      mean: $M$1.mean(r),
      std: $M$1.stddevCorrect(r),
      median: $M$1.median(r),
      mode: $M$1.mode(r),
      count: $M$1.countAdv(r),
      quantile: $M$1.quantileAll(r),
      r
    }
  }

  // 矩阵的迹
  trace (a) {
    a = a || this.optMatrix;
    const min = Math.min(a.length, a[0].length);
    let trace = 0;
    for (let i = 0; i < min; i++) {
      trace += a[i][i];
    }
    return trace
  }

  print (a) {
    a = a || this.optMatrix;
    const colMaxWidth = $M$1.genRange(0, a[0].length, 0);
    const data = a.map((x, idx) => {
      const rowObj = {};
      for (let i = 0; i < x.length; i++) {
        const col1 = this.colName[idx] || `[${idx + 1},]`;
        rowObj['-'] = col1;
        colMaxWidth[0] = col1.length > colMaxWidth[0] ? col1.length : colMaxWidth[0];
        const colx = x[i] + '';
        rowObj[this.rowName[i] || `[,${i + 1}]`] = colx;
        colMaxWidth[i + 1] = colx.length > colMaxWidth[i + 1] ? colx.length : colMaxWidth[i + 1];
      }
      return rowObj
    });
    const r = tools$3.drawTable(
      data,
      colMaxWidth.map(x => (x < 5 ? 5 : x + 1)),
      { color: 1 }
    );
    return r
  }

  log (a) {
    a = a || this.optMatrix;
    console.log('[');

    a.forEach(x => {
      const item = x.map(it => {
        const s = it.toFixed(6);
        return s.fillStr(' ', 13, -1)
      });

      console.log(item.join(','));
    });
    console.log(']');
    console.log('row', this.row);
    console.log('col', this.col);
  }
}

class QrDc {
  constructor (value) {
    const qr = value.copy();
    const m = value.length;
    const n = value[0].length;
    const rdiag = new Float64Array(n);
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      let nrm = 0;
      for (i = k; i < m; i++) {
        nrm = Math.hypot(nrm, qr[i][k]);
      }
      if (nrm !== 0) {
        if (qr[k][k] < 0) {
          nrm = -nrm;
        }
        for (i = k; i < m; i++) {
          qr[i][k] = qr[i][k] / nrm;
        }
        qr[k][k] = qr[k][k] + 1;
        for (j = k + 1; j < n; j++) {
          s = 0;
          for (i = k; i < m; i++) {
            s += qr[i][k] * qr[i][j];
          }
          s = -s / qr[k][k];
          for (i = k; i < m; i++) {
            qr[i][j] = qr[i][j] + s * qr[i][k];
          }
        }
      }
      rdiag[k] = -nrm;
    }

    this.QR = qr;
    this.Rdiag = rdiag;
  }

  solve (value) {
    const qr = this.QR;
    const m = qr.length;

    if (value.length !== m) {
      throw new Error('Matrix row dims must agree')
    }
    if (!this.isFullRank()) {
      throw new Error('Matrix is rank deficient')
    }

    const count = value[0].length;
    const X = value.copy();
    const n = qr[0].length;
    let i, j, k, s;

    for (k = 0; k < n; k++) {
      for (j = 0; j < count; j++) {
        s = 0;
        for (i = k; i < m; i++) {
          s += qr[i][k] * X[i][j];
        }
        s = -s / qr[k][k];
        for (i = k; i < m; i++) {
          X[i][j] = X[i][j] + s * qr[i][k];
        }
      }
    }
    for (k = n - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X[k][j] = X[k][j] / this.Rdiag[k];
      }
      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X[i][j] = X[i][j] - X[k][j] * qr[i][k];
        }
      }
    }

    return subMatrix(X, 0, n - 1, 0, count - 1)
  }

  isFullRank () {
    const columns = this.QR[0].length;
    for (let i = 0; i < columns; i++) {
      if (this.Rdiag[i] === 0) {
        return false
      }
    }
    return true
  }

  get upperTriangularMatrix () {
    const qr = this.QR;
    const n = qr[0].length;
    const X = Mat.identity(n);
    let i, j;
    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i < j) {
          X[i][j] = qr[i][j];
        } else if (i === j) {
          X[i][j] = this.Rdiag[i];
        } else {
          X[i][j] = 0;
        }
      }
    }
    return X
  }

  get orthogonalMatrix () {
    const qr = this.QR;
    const rows = qr.length;
    const columns = qr[0].length;
    const X = Mat.zero(rows, columns);
    let i, j, k, s;

    for (k = columns - 1; k >= 0; k--) {
      for (i = 0; i < rows; i++) {
        X[i][k] = 0;
      }
      X[k][k] = 1;
      for (j = k; j < columns; j++) {
        if (qr[k][k] !== 0) {
          s = 0;
          for (i = k; i < rows; i++) {
            s += qr[i][k] * X[i][j];
          }

          s = -s / qr[k][k];

          for (i = k; i < rows; i++) {
            X[i][j] = X[i][j] + s * qr[i][k];
          }
        }
      }
    }
    return X
  }
}
// 平方根法
class CholeskyDc {
  constructor (value) {
    if (!isSymmetric(value)) {
      throw new Error('矩阵不对称')
    }
    const a = value;
    const dim = a.length;
    const l = Mat.identity(dim);
    let positiveDefinite = true;
    let i, j, k;

    for (j = 0; j < dim; j++) {
      let d = 0;
      for (k = 0; k < j; k++) {
        let s = 0;
        for (i = 0; i < k; i++) {
          s += l[k][i] * l[j][i];
        }
        s = (a[j][k] - s) / l[k][k];
        l[j][k] = s;
        d = d + s * s;
      }

      d = a[j][j] - d;

      positiveDefinite = positiveDefinite && d > 0;
      l[j][j] = Math.sqrt(Math.max(d, 0));
      for (k = j + 1; k < dim; k++) {
        l[j][k] = 0;
      }
    }

    this.L = l;
    this.positiveDefinite = Boolean(positiveDefinite);
  }

  isPositiveDefinite () {
    return this.positiveDefinite
  }

  solve (value) {
    const l = this.L;
    const dim = l.length;

    if (value.length !== dim) {
      throw new Error('Matrix 维度不匹配')
    }
    if (this.isPositiveDefinite() === false) {
      throw new Error('Matrix is not positive definite')
    }

    const count = value[0].length;
    const B = value.copy();
    let i, j, k;

    for (k = 0; k < dim; k++) {
      for (j = 0; j < count; j++) {
        for (i = 0; i < k; i++) {
          B[k][j] = B[k][j] - B[i][j] * l[k][i];
        }
        B[k][j] = B[k][j] / l[k][k];
      }
    }

    for (k = dim - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        for (i = k + 1; i < dim; i++) {
          B[k][j] = B[k][j] - B[i][j] * l[i][k];
        }
        B[k][j] = B[k][j] / l[k][k];
      }
    }

    return B
  }

  get lowerTriangularMatrix () {
    return this.L
  }
}
var mathMatrixAdv = { Matrix, QrDc, CholeskyDc };

var color$1 = {exports: {}};

/* istanbul ignore file *
/**
 * @namespace color
 */

(function (module) {
	(function (Math) {
	  const trimLeft = /^\s+/;
	  const trimRight = /\s+$/;
	  let tinyCounter = 0;
	  const mathRound = Math.round;
	  const mathMin = Math.min;
	  const mathMax = Math.max;
	  const mathRandom = Math.random;

	  function miniColor (color, opts) {
	    color = color || '';
	    opts = opts || {};

	    // If input is already a miniColor, return itself
	    if (color instanceof miniColor) {
	      return color
	    }
	    // If we are called as a function, call using new instead
	    if (!(this instanceof miniColor)) {
	      return new miniColor(color, opts)
	    }

	    const rgb = inputToRGB(color)
	    ;(this._originalInput = color),
	      (this._r = rgb.r),
	      (this._g = rgb.g),
	      (this._b = rgb.b),
	      (this._a = rgb.a),
	      (this._roundA = mathRound(100 * this._a) / 100),
	      (this._format = opts.format || rgb.format);
	    this._gradientType = opts.gradientType;

	    // Don't let the range of [0,255] come back in [0,1].
	    // Potentially lose a little bit of precision here, but will fix issues where
	    // .5 gets interpreted as half of the total, instead of half of 1
	    // If it was supposed to be 128, this was already taken care of by `inputToRgb`
	    if (this._r < 1) {
	      this._r = mathRound(this._r);
	    }
	    if (this._g < 1) {
	      this._g = mathRound(this._g);
	    }
	    if (this._b < 1) {
	      this._b = mathRound(this._b);
	    }

	    this._ok = rgb.ok;
	    this._tc_id = tinyCounter++;
	  }

	  miniColor.prototype = {
	    isDark: function () {
	      return this.getBrightness() < 128
	    },
	    isLight: function () {
	      return !this.isDark()
	    },
	    isValid: function () {
	      return this._ok
	    },
	    getOriginalInput: function () {
	      return this._originalInput
	    },
	    getFormat: function () {
	      return this._format
	    },
	    getAlpha: function () {
	      return this._a
	    },
	    getBrightness: function () {
	      // http://www.w3.org/TR/AERT#color-contrast
	      const rgb = this.toRgb();
	      return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000
	    },
	    getLuminance: function () {
	      // http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
	      const rgb = this.toRgb();
	      let RsRGB, GsRGB, BsRGB, R, G, B;
	      RsRGB = rgb.r / 255;
	      GsRGB = rgb.g / 255;
	      BsRGB = rgb.b / 255;

	      if (RsRGB <= 0.03928) {
	        R = RsRGB / 12.92;
	      } else {
	        R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
	      }
	      if (GsRGB <= 0.03928) {
	        G = GsRGB / 12.92;
	      } else {
	        G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
	      }
	      if (BsRGB <= 0.03928) {
	        B = BsRGB / 12.92;
	      } else {
	        B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
	      }
	      return 0.2126 * R + 0.7152 * G + 0.0722 * B
	    },
	    setAlpha: function (value) {
	      this._a = boundAlpha(value);
	      this._roundA = mathRound(100 * this._a) / 100;
	      return this
	    },
	    toHsv: function () {
	      const hsv = rgbToHsv(this._r, this._g, this._b);
	      return { h: hsv.h * 360, s: hsv.s, v: hsv.v, a: this._a }
	    },
	    toHsvString: function () {
	      const hsv = rgbToHsv(this._r, this._g, this._b);
	      const h = mathRound(hsv.h * 360);
	      const s = mathRound(hsv.s * 100);
	      const v = mathRound(hsv.v * 100);
	      return this._a == 1 ? 'hsv(' + h + ', ' + s + '%, ' + v + '%)' : 'hsva(' + h + ', ' + s + '%, ' + v + '%, ' + this._roundA + ')'
	    },
	    toHsl: function () {
	      const hsl = rgbToHsl(this._r, this._g, this._b);
	      return { h: hsl.h * 360, s: hsl.s, l: hsl.l, a: this._a }
	    },
	    toHslString: function () {
	      const hsl = rgbToHsl(this._r, this._g, this._b);
	      const h = mathRound(hsl.h * 360);
	      const s = mathRound(hsl.s * 100);
	      const l = mathRound(hsl.l * 100);
	      return this._a == 1 ? 'hsl(' + h + ', ' + s + '%, ' + l + '%)' : 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + this._roundA + ')'
	    },
	    toHex: function (allow3Char) {
	      return rgbToHex(this._r, this._g, this._b, allow3Char)
	    },
	    toHexString: function (allow3Char) {
	      return '#' + this.toHex(allow3Char)
	    },
	    toHex8: function (allow4Char) {
	      return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char)
	    },
	    toHex8String: function (allow4Char) {
	      return '#' + this.toHex8(allow4Char)
	    },
	    toRgb: function () {
	      return {
	        r: mathRound(this._r),
	        g: mathRound(this._g),
	        b: mathRound(this._b),
	        a: this._a
	      }
	    },
	    toRgbString: function () {
	      return this._a == 1
	        ? 'rgb(' + mathRound(this._r) + ', ' + mathRound(this._g) + ', ' + mathRound(this._b) + ')'
	        : 'rgba(' + mathRound(this._r) + ', ' + mathRound(this._g) + ', ' + mathRound(this._b) + ', ' + this._roundA + ')'
	    },
	    toPercentageRgb: function () {
	      return {
	        r: mathRound(bound01(this._r, 255) * 100) + '%',
	        g: mathRound(bound01(this._g, 255) * 100) + '%',
	        b: mathRound(bound01(this._b, 255) * 100) + '%',
	        a: this._a
	      }
	    },
	    toPercentageRgbString: function () {
	      return this._a == 1
	        ? 'rgb(' + mathRound(bound01(this._r, 255) * 100) + '%, ' + mathRound(bound01(this._g, 255) * 100) + '%, ' + mathRound(bound01(this._b, 255) * 100) + '%)'
	        : 'rgba(' + mathRound(bound01(this._r, 255) * 100) + '%, ' + mathRound(bound01(this._g, 255) * 100) + '%, ' + mathRound(bound01(this._b, 255) * 100) + '%, ' + this._roundA + ')'
	    },
	    toName: function () {
	      if (this._a === 0) {
	        return 'transparent'
	      }

	      if (this._a < 1) {
	        return false
	      }

	      return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false
	    },
	    toFilter: function (secondColor) {
	      const hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
	      let secondHex8String = hex8String;
	      const gradientType = this._gradientType ? 'GradientType = 1, ' : '';

	      if (secondColor) {
	        const s = miniColor(secondColor);
	        secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
	      }

	      return 'progid:DXImageTransform.Microsoft.gradient(' + gradientType + 'startColorstr=' + hex8String + ',endColorstr=' + secondHex8String + ')'
	    },
	    toString: function (format) {
	      const formatSet = !!format;
	      format = format || this._format;

	      let formattedString = false;
	      const hasAlpha = this._a < 1 && this._a >= 0;
	      const needsAlphaFormat = !formatSet && hasAlpha && (format === 'hex' || format === 'hex6' || format === 'hex3' || format === 'hex4' || format === 'hex8' || format === 'name');

	      if (needsAlphaFormat) {
	        // Special case for "transparent", all other non-alpha formats
	        // will return rgba when there is transparency.
	        if (format === 'name' && this._a === 0) {
	          return this.toName()
	        }
	        return this.toRgbString()
	      }
	      if (format === 'rgb') {
	        formattedString = this.toRgbString();
	      }
	      if (format === 'prgb') {
	        formattedString = this.toPercentageRgbString();
	      }
	      if (format === 'hex' || format === 'hex6') {
	        formattedString = this.toHexString();
	      }
	      if (format === 'hex3') {
	        formattedString = this.toHexString(true);
	      }
	      if (format === 'hex4') {
	        formattedString = this.toHex8String(true);
	      }
	      if (format === 'hex8') {
	        formattedString = this.toHex8String();
	      }
	      if (format === 'name') {
	        formattedString = this.toName();
	      }
	      if (format === 'hsl') {
	        formattedString = this.toHslString();
	      }
	      if (format === 'hsv') {
	        formattedString = this.toHsvString();
	      }

	      return formattedString || this.toHexString()
	    },
	    clone: function () {
	      return miniColor(this.toString())
	    },

	    _applyModification: function (fn, args) {
	      const color = fn.apply(null, [this].concat([].slice.call(args)));
	      this._r = color._r;
	      this._g = color._g;
	      this._b = color._b;
	      this.setAlpha(color._a);
	      return this
	    },
	    lighten: function () {
	      return this._applyModification(lighten, arguments)
	    },
	    brighten: function () {
	      return this._applyModification(brighten, arguments)
	    },
	    darken: function () {
	      return this._applyModification(darken, arguments)
	    },
	    desaturate: function () {
	      return this._applyModification(desaturate, arguments)
	    },
	    saturate: function () {
	      return this._applyModification(saturate, arguments)
	    },
	    greyscale: function () {
	      return this._applyModification(greyscale, arguments)
	    },
	    spin: function () {
	      return this._applyModification(spin, arguments)
	    },

	    _applyCombination: function (fn, args) {
	      return fn.apply(null, [this].concat([].slice.call(args)))
	    },
	    analogous: function () {
	      return this._applyCombination(analogous, arguments)
	    },
	    complement: function () {
	      return this._applyCombination(complement, arguments)
	    },
	    monochromatic: function () {
	      return this._applyCombination(monochromatic, arguments)
	    },
	    splitcomplement: function () {
	      return this._applyCombination(splitcomplement, arguments)
	    },
	    triad: function () {
	      return this._applyCombination(triad, arguments)
	    },
	    tetrad: function () {
	      return this._applyCombination(tetrad, arguments)
	    }
	  };

	  // If input is an object, force 1 into "1.0" to handle ratios properly
	  // String input requires "1.0" as input, so 1 will be treated as 1
	  miniColor.fromRatio = function (color, opts) {
	    if (typeof color === 'object') {
	      const newColor = {};
	      for (const i in color) {
	        if (color.hasOwnProperty(i)) {
	          if (i === 'a') {
	            newColor[i] = color[i];
	          } else {
	            newColor[i] = convertToPercentage(color[i]);
	          }
	        }
	      }
	      color = newColor;
	    }

	    return miniColor(color, opts)
	  };

	  // Given a string or object, convert that input to RGB
	  // Possible string inputs:
	  //
	  //     "red"
	  //     "#f00" or "f00"
	  //     "#ff0000" or "ff0000"
	  //     "#ff000000" or "ff000000"
	  //     "rgb 255 0 0" or "rgb (255, 0, 0)"
	  //     "rgb 1.0 0 0" or "rgb (1, 0, 0)"
	  //     "rgba (255, 0, 0, 1)" or "rgba 255, 0, 0, 1"
	  //     "rgba (1.0, 0, 0, 1)" or "rgba 1.0, 0, 0, 1"
	  //     "hsl(0, 100%, 50%)" or "hsl 0 100% 50%"
	  //     "hsla(0, 100%, 50%, 1)" or "hsla 0 100% 50%, 1"
	  //     "hsv(0, 100%, 100%)" or "hsv 0 100% 100%"
	  //
	  function inputToRGB (color) {
	    let rgb = { r: 0, g: 0, b: 0 };
	    let a = 1;
	    let s = null;
	    let v = null;
	    let l = null;
	    let ok = false;
	    let format = false;

	    if (typeof color === 'string') {
	      color = stringInputToObject(color);
	    }

	    if (typeof color === 'object') {
	      if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
	        rgb = rgbToRgb(color.r, color.g, color.b);
	        ok = true;
	        format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
	      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
	        s = convertToPercentage(color.s);
	        v = convertToPercentage(color.v);
	        rgb = hsvToRgb(color.h, s, v);
	        ok = true;
	        format = 'hsv';
	      } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
	        s = convertToPercentage(color.s);
	        l = convertToPercentage(color.l);
	        rgb = hslToRgb(color.h, s, l);
	        ok = true;
	        format = 'hsl';
	      }

	      if (color.hasOwnProperty('a')) {
	        a = color.a;
	      }
	    }

	    a = boundAlpha(a);

	    return {
	      ok: ok,
	      format: color.format || format,
	      r: mathMin(255, mathMax(rgb.r, 0)),
	      g: mathMin(255, mathMax(rgb.g, 0)),
	      b: mathMin(255, mathMax(rgb.b, 0)),
	      a: a
	    }
	  }

	  // Conversion Functions
	  // --------------------

	  // `rgbToHsl`, `rgbToHsv`, `hslToRgb`, `hsvToRgb` modified from:
	  // <http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript>

	  // `rgbToRgb`
	  // Handle bounds / percentage checking to conform to CSS color spec
	  // <http://www.w3.org/TR/css3-color/>
	  // *Assumes:* r, g, b in [0, 255] or [0, 1]
	  // *Returns:* { r, g, b } in [0, 255]
	  function rgbToRgb (r, g, b) {
	    return {
	      r: bound01(r, 255) * 255,
	      g: bound01(g, 255) * 255,
	      b: bound01(b, 255) * 255
	    }
	  }

	  // `rgbToHsl`
	  // Converts an RGB color value to HSL.
	  // *Assumes:* r, g, and b are contained in [0, 255] or [0, 1]
	  // *Returns:* { h, s, l } in [0,1]
	  function rgbToHsl (r, g, b) {
	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    const max = mathMax(r, g, b);
	    const min = mathMin(r, g, b);
	    let h;
	    let s;
	    const l = (max + min) / 2;

	    if (max == min) {
	      h = s = 0; // achromatic
	    } else {
	      const d = max - min;
	      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
	      switch (max) {
	        case r:
	          h = (g - b) / d + (g < b ? 6 : 0);
	          break
	        case g:
	          h = (b - r) / d + 2;
	          break
	        case b:
	          h = (r - g) / d + 4;
	          break
	      }

	      h /= 6;
	    }

	    return { h: h, s: s, l: l }
	  }

	  // `hslToRgb`
	  // Converts an HSL color value to RGB.
	  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and l are contained [0, 1] or [0, 100]
	  // *Returns:* { r, g, b } in the set [0, 255]
	  function hslToRgb (h, s, l) {
	    let r, g, b;

	    h = bound01(h, 360);
	    s = bound01(s, 100);
	    l = bound01(l, 100);

	    function hue2rgb (p, q, t) {
	      if (t < 0) {
	        t += 1;
	      }
	      if (t > 1) {
	        t -= 1;
	      }
	      if (t < 1 / 6) {
	        return p + (q - p) * 6 * t
	      }
	      if (t < 1 / 2) {
	        return q
	      }
	      if (t < 2 / 3) {
	        return p + (q - p) * (2 / 3 - t) * 6
	      }
	      return p
	    }

	    if (s === 0) {
	      r = g = b = l; // achromatic
	    } else {
	      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
	      const p = 2 * l - q;
	      r = hue2rgb(p, q, h + 1 / 3);
	      g = hue2rgb(p, q, h);
	      b = hue2rgb(p, q, h - 1 / 3);
	    }

	    return { r: r * 255, g: g * 255, b: b * 255 }
	  }

	  // `rgbToHsv`
	  // Converts an RGB color value to HSV
	  // *Assumes:* r, g, and b are contained in the set [0, 255] or [0, 1]
	  // *Returns:* { h, s, v } in [0,1]
	  function rgbToHsv (r, g, b) {
	    r = bound01(r, 255);
	    g = bound01(g, 255);
	    b = bound01(b, 255);

	    const max = mathMax(r, g, b);
	    const min = mathMin(r, g, b);
	    let h;
	    let s;
	    const v = max;

	    const d = max - min;
	    s = max === 0 ? 0 : d / max;

	    if (max == min) {
	      h = 0; // achromatic
	    } else {
	      switch (max) {
	        case r:
	          h = (g - b) / d + (g < b ? 6 : 0);
	          break
	        case g:
	          h = (b - r) / d + 2;
	          break
	        case b:
	          h = (r - g) / d + 4;
	          break
	      }
	      h /= 6;
	    }
	    return { h: h, s: s, v: v }
	  }

	  // `hsvToRgb`
	  // Converts an HSV color value to RGB.
	  // *Assumes:* h is contained in [0, 1] or [0, 360] and s and v are contained in [0, 1] or [0, 100]
	  // *Returns:* { r, g, b } in the set [0, 255]
	  function hsvToRgb (h, s, v) {
	    h = bound01(h, 360) * 6;
	    s = bound01(s, 100);
	    v = bound01(v, 100);

	    const i = Math.floor(h);
	    const f = h - i;
	    const p = v * (1 - s);
	    const q = v * (1 - f * s);
	    const t = v * (1 - (1 - f) * s);
	    const mod = i % 6;
	    const r = [v, q, p, p, t, v][mod];
	    const g = [t, v, v, q, p, p][mod];
	    const b = [p, p, t, v, v, q][mod];

	    return { r: r * 255, g: g * 255, b: b * 255 }
	  }

	  // `rgbToHex`
	  // Converts an RGB color to hex
	  // Assumes r, g, and b are contained in the set [0, 255]
	  // Returns a 3 or 6 character hex
	  function rgbToHex (r, g, b, allow3Char) {
	    const hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

	    // Return a 3 character hex if possible
	    if (allow3Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1)) {
	      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0)
	    }

	    return hex.join('')
	  }

	  // `rgbaToHex`
	  // Converts an RGBA color plus alpha transparency to hex
	  // Assumes r, g, b are contained in the set [0, 255] and
	  // a in [0, 1]. Returns a 4 or 8 character rgba hex
	  function rgbaToHex (r, g, b, a, allow4Char) {
	    const hex = [pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16)), pad2(convertDecimalToHex(a))];

	    // Return a 4 character hex if possible
	    if (allow4Char && hex[0].charAt(0) == hex[0].charAt(1) && hex[1].charAt(0) == hex[1].charAt(1) && hex[2].charAt(0) == hex[2].charAt(1) && hex[3].charAt(0) == hex[3].charAt(1)) {
	      return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0)
	    }

	    return hex.join('')
	  }

	  // `rgbaToArgbHex`
	  // Converts an RGBA color to an ARGB Hex8 string
	  // Rarely used, but required for "toFilter()"
	  function rgbaToArgbHex (r, g, b, a) {
	    const hex = [pad2(convertDecimalToHex(a)), pad2(mathRound(r).toString(16)), pad2(mathRound(g).toString(16)), pad2(mathRound(b).toString(16))];

	    return hex.join('')
	  }

	  // `equals`
	  // Can be called with any miniColor input
	  miniColor.equals = function (color1, color2) {
	    if (!color1 || !color2) {
	      return false
	    }
	    return miniColor(color1).toRgbString() == miniColor(color2).toRgbString()
	  };

	  miniColor.random = function () {
	    return miniColor.fromRatio({
	      r: mathRandom(),
	      g: mathRandom(),
	      b: mathRandom()
	    })
	  };

	  // Modification Functions
	  // ----------------------
	  // Thanks to less.js for some of the basics here
	  // <https://github.com/cloudhead/less.js/blob/master/lib/less/functions.js>

	  function desaturate (color, amount) {
	    amount = amount === 0 ? 0 : amount || 10;
	    const hsl = miniColor(color).toHsl();
	    hsl.s -= amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return miniColor(hsl)
	  }

	  function saturate (color, amount) {
	    amount = amount === 0 ? 0 : amount || 10;
	    const hsl = miniColor(color).toHsl();
	    hsl.s += amount / 100;
	    hsl.s = clamp01(hsl.s);
	    return miniColor(hsl)
	  }

	  function greyscale (color) {
	    return miniColor(color).desaturate(100)
	  }

	  function lighten (color, amount) {
	    amount = amount === 0 ? 0 : amount || 10;
	    const hsl = miniColor(color).toHsl();
	    hsl.l += amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return miniColor(hsl)
	  }

	  function brighten (color, amount) {
	    amount = amount === 0 ? 0 : amount || 10;
	    const rgb = miniColor(color).toRgb();
	    rgb.r = mathMax(0, mathMin(255, rgb.r - mathRound(255 * -(amount / 100))));
	    rgb.g = mathMax(0, mathMin(255, rgb.g - mathRound(255 * -(amount / 100))));
	    rgb.b = mathMax(0, mathMin(255, rgb.b - mathRound(255 * -(amount / 100))));
	    return miniColor(rgb)
	  }

	  function darken (color, amount) {
	    amount = amount === 0 ? 0 : amount || 10;
	    const hsl = miniColor(color).toHsl();
	    hsl.l -= amount / 100;
	    hsl.l = clamp01(hsl.l);
	    return miniColor(hsl)
	  }

	  // Spin takes a positive or negative amount within [-360, 360] indicating the change of hue.
	  // Values outside of this range will be wrapped into this range.
	  function spin (color, amount) {
	    const hsl = miniColor(color).toHsl();
	    const hue = (hsl.h + amount) % 360;
	    hsl.h = hue < 0 ? 360 + hue : hue;
	    return miniColor(hsl)
	  }

	  // Combination Functions
	  // ---------------------
	  // Thanks to jQuery xColor for some of the ideas behind these
	  // <https://github.com/infusion/jQuery-xcolor/blob/master/jquery.xcolor.js>

	  function complement (color) {
	    const hsl = miniColor(color).toHsl();
	    hsl.h = (hsl.h + 180) % 360;
	    return miniColor(hsl)
	  }

	  function triad (color) {
	    const hsl = miniColor(color).toHsl();
	    const h = hsl.h;
	    return [miniColor(color), miniColor({ h: (h + 120) % 360, s: hsl.s, l: hsl.l }), miniColor({ h: (h + 240) % 360, s: hsl.s, l: hsl.l })]
	  }

	  function tetrad (color) {
	    const hsl = miniColor(color).toHsl();
	    const h = hsl.h;
	    return [miniColor(color), miniColor({ h: (h + 90) % 360, s: hsl.s, l: hsl.l }), miniColor({ h: (h + 180) % 360, s: hsl.s, l: hsl.l }), miniColor({ h: (h + 270) % 360, s: hsl.s, l: hsl.l })]
	  }

	  function splitcomplement (color) {
	    const hsl = miniColor(color).toHsl();
	    const h = hsl.h;
	    return [miniColor(color), miniColor({ h: (h + 72) % 360, s: hsl.s, l: hsl.l }), miniColor({ h: (h + 216) % 360, s: hsl.s, l: hsl.l })]
	  }

	  function analogous (color, results, slices) {
	    results = results || 6;
	    slices = slices || 30;

	    const hsl = miniColor(color).toHsl();
	    const part = 360 / slices;
	    const ret = [miniColor(color)];

	    for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results; ) {
	      hsl.h = (hsl.h + part) % 360;
	      ret.push(miniColor(hsl));
	    }
	    return ret
	  }

	  function monochromatic (color, results) {
	    results = results || 6;
	    const hsv = miniColor(color).toHsv();
	    const h = hsv.h;
	    const s = hsv.s;
	    let v = hsv.v;
	    const ret = [];
	    const modification = 1 / results;

	    while (results--) {
	      ret.push(miniColor({ h: h, s: s, v: v }));
	      v = (v + modification) % 1;
	    }

	    return ret
	  }

	  // Utility Functions
	  // ---------------------

	  miniColor.mix = function (color1, color2, amount) {
	    amount = amount === 0 ? 0 : amount || 50;

	    const rgb1 = miniColor(color1).toRgb();
	    const rgb2 = miniColor(color2).toRgb();

	    const p = amount / 100;

	    const rgba = {
	      r: (rgb2.r - rgb1.r) * p + rgb1.r,
	      g: (rgb2.g - rgb1.g) * p + rgb1.g,
	      b: (rgb2.b - rgb1.b) * p + rgb1.b,
	      a: (rgb2.a - rgb1.a) * p + rgb1.a
	    };

	    return miniColor(rgba)
	  };

	  // Readability Functions
	  // ---------------------
	  // <http://www.w3.org/TR/2008/REC-WCAG20-20081211/#contrast-ratiodef (WCAG Version 2)

	  // `contrast`
	  // Analyze the 2 colors and returns the color contrast defined by (WCAG Version 2)
	  miniColor.readability = function (color1, color2) {
	    const c1 = miniColor(color1);
	    const c2 = miniColor(color2);
	    return (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) / (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05)
	  };

	  // `isReadable`
	  // Ensure that foreground and background color combinations meet WCAG2 guidelines.
	  // The third argument is an optional Object.
	  //      the 'level' property states 'AA' or 'AAA' - if missing or invalid, it defaults to 'AA';
	  //      the 'size' property states 'large' or 'small' - if missing or invalid, it defaults to 'small'.
	  // If the entire object is absent, isReadable defaults to {level:"AA",size:"small"}.

	  // *Example*
	  //    miniColor.isReadable("#000", "#111") => false
	  //    miniColor.isReadable("#000", "#111",{level:"AA",size:"large"}) => false
	  miniColor.isReadable = function (color1, color2, wcag2) {
	    const readability = miniColor.readability(color1, color2);
	    let wcag2Parms, out;

	    out = false;

	    wcag2Parms = validateWCAG2Parms(wcag2);
	    switch (wcag2Parms.level + wcag2Parms.size) {
	      case 'AAsmall':
	      case 'AAAlarge':
	        out = readability >= 4.5;
	        break
	      case 'AAlarge':
	        out = readability >= 3;
	        break
	      case 'AAAsmall':
	        out = readability >= 7;
	        break
	    }
	    return out
	  };

	  // `mostReadable`
	  // Given a base color and a list of possible foreground or background
	  // colors for that base, returns the most readable color.
	  // Optionally returns Black or White if the most readable color is unreadable.
	  // *Example*
	  //    miniColor.mostReadable(miniColor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:false}).toHexString(); // "#112255"
	  //    miniColor.mostReadable(miniColor.mostReadable("#123", ["#124", "#125"],{includeFallbackColors:true}).toHexString();  // "#ffffff"
	  //    miniColor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"large"}).toHexString(); // "#faf3f3"
	  //    miniColor.mostReadable("#a8015a", ["#faf3f3"],{includeFallbackColors:true,level:"AAA",size:"small"}).toHexString(); // "#ffffff"
	  miniColor.mostReadable = function (baseColor, colorList, args) {
	    let bestColor = null;
	    let bestScore = 0;
	    let readability;
	    let includeFallbackColors, level, size;
	    args = args || {};
	    includeFallbackColors = args.includeFallbackColors;
	    level = args.level;
	    size = args.size;

	    for (let i = 0; i < colorList.length; i++) {
	      readability = miniColor.readability(baseColor, colorList[i]);
	      if (readability > bestScore) {
	        bestScore = readability;
	        bestColor = miniColor(colorList[i]);
	      }
	    }

	    if (
	      miniColor.isReadable(baseColor, bestColor, {
	        level: level,
	        size: size
	      }) ||
	      !includeFallbackColors
	    ) {
	      return bestColor
	    } else {
	      args.includeFallbackColors = false;
	      return miniColor.mostReadable(baseColor, ['#fff', '#000'], args)
	    }
	  };

	  // Big List of Colors
	  // ------------------
	  // <http://www.w3.org/TR/css3-color/#svg-color>
	  const names = (miniColor.names = {
	    aliceblue: 'f0f8ff',
	    antiquewhite: 'faebd7',
	    aqua: '0ff',
	    aquamarine: '7fffd4',
	    azure: 'f0ffff',
	    beige: 'f5f5dc',
	    bisque: 'ffe4c4',
	    black: '000',
	    blanchedalmond: 'ffebcd',
	    blue: '00f',
	    blueviolet: '8a2be2',
	    brown: 'a52a2a',
	    burlywood: 'deb887',
	    burntsienna: 'ea7e5d',
	    cadetblue: '5f9ea0',
	    chartreuse: '7fff00',
	    chocolate: 'd2691e',
	    coral: 'ff7f50',
	    cornflowerblue: '6495ed',
	    cornsilk: 'fff8dc',
	    crimson: 'dc143c',
	    cyan: '0ff',
	    darkblue: '00008b',
	    darkcyan: '008b8b',
	    darkgoldenrod: 'b8860b',
	    darkgray: 'a9a9a9',
	    darkgreen: '006400',
	    darkgrey: 'a9a9a9',
	    darkkhaki: 'bdb76b',
	    darkmagenta: '8b008b',
	    darkolivegreen: '556b2f',
	    darkorange: 'ff8c00',
	    darkorchid: '9932cc',
	    darkred: '8b0000',
	    darksalmon: 'e9967a',
	    darkseagreen: '8fbc8f',
	    darkslateblue: '483d8b',
	    darkslategray: '2f4f4f',
	    darkslategrey: '2f4f4f',
	    darkturquoise: '00ced1',
	    darkviolet: '9400d3',
	    deeppink: 'ff1493',
	    deepskyblue: '00bfff',
	    dimgray: '696969',
	    dimgrey: '696969',
	    dodgerblue: '1e90ff',
	    firebrick: 'b22222',
	    floralwhite: 'fffaf0',
	    forestgreen: '228b22',
	    fuchsia: 'f0f',
	    gainsboro: 'dcdcdc',
	    ghostwhite: 'f8f8ff',
	    gold: 'ffd700',
	    goldenrod: 'daa520',
	    gray: '808080',
	    green: '008000',
	    greenyellow: 'adff2f',
	    grey: '808080',
	    honeydew: 'f0fff0',
	    hotpink: 'ff69b4',
	    indianred: 'cd5c5c',
	    indigo: '4b0082',
	    ivory: 'fffff0',
	    khaki: 'f0e68c',
	    lavender: 'e6e6fa',
	    lavenderblush: 'fff0f5',
	    lawngreen: '7cfc00',
	    lemonchiffon: 'fffacd',
	    lightblue: 'add8e6',
	    lightcoral: 'f08080',
	    lightcyan: 'e0ffff',
	    lightgoldenrodyellow: 'fafad2',
	    lightgray: 'd3d3d3',
	    lightgreen: '90ee90',
	    lightgrey: 'd3d3d3',
	    lightpink: 'ffb6c1',
	    lightsalmon: 'ffa07a',
	    lightseagreen: '20b2aa',
	    lightskyblue: '87cefa',
	    lightslategray: '789',
	    lightslategrey: '789',
	    lightsteelblue: 'b0c4de',
	    lightyellow: 'ffffe0',
	    lime: '0f0',
	    limegreen: '32cd32',
	    linen: 'faf0e6',
	    magenta: 'f0f',
	    maroon: '800000',
	    mediumaquamarine: '66cdaa',
	    mediumblue: '0000cd',
	    mediumorchid: 'ba55d3',
	    mediumpurple: '9370db',
	    mediumseagreen: '3cb371',
	    mediumslateblue: '7b68ee',
	    mediumspringgreen: '00fa9a',
	    mediumturquoise: '48d1cc',
	    mediumvioletred: 'c71585',
	    midnightblue: '191970',
	    mintcream: 'f5fffa',
	    mistyrose: 'ffe4e1',
	    moccasin: 'ffe4b5',
	    navajowhite: 'ffdead',
	    navy: '000080',
	    oldlace: 'fdf5e6',
	    olive: '808000',
	    olivedrab: '6b8e23',
	    orange: 'ffa500',
	    orangered: 'ff4500',
	    orchid: 'da70d6',
	    palegoldenrod: 'eee8aa',
	    palegreen: '98fb98',
	    paleturquoise: 'afeeee',
	    palevioletred: 'db7093',
	    papayawhip: 'ffefd5',
	    peachpuff: 'ffdab9',
	    peru: 'cd853f',
	    pink: 'ffc0cb',
	    plum: 'dda0dd',
	    powderblue: 'b0e0e6',
	    purple: '800080',
	    rebeccapurple: '663399',
	    red: 'f00',
	    rosybrown: 'bc8f8f',
	    royalblue: '4169e1',
	    saddlebrown: '8b4513',
	    salmon: 'fa8072',
	    sandybrown: 'f4a460',
	    seagreen: '2e8b57',
	    seashell: 'fff5ee',
	    sienna: 'a0522d',
	    silver: 'c0c0c0',
	    skyblue: '87ceeb',
	    slateblue: '6a5acd',
	    slategray: '708090',
	    slategrey: '708090',
	    snow: 'fffafa',
	    springgreen: '00ff7f',
	    steelblue: '4682b4',
	    tan: 'd2b48c',
	    teal: '008080',
	    thistle: 'd8bfd8',
	    tomato: 'ff6347',
	    turquoise: '40e0d0',
	    violet: 'ee82ee',
	    wheat: 'f5deb3',
	    white: 'fff',
	    whitesmoke: 'f5f5f5',
	    yellow: 'ff0',
	    yellowgreen: '9acd32'
	  });

	  // Make it easy to access colors via `hexNames[hex]`
	  const hexNames = (miniColor.hexNames = flip(names));

	  // Utilities
	  // ---------

	  // `{ 'name1': 'val1' }` becomes `{ 'val1': 'name1' }`
	  function flip (o) {
	    const flipped = {};
	    for (const i in o) {
	      if (o.hasOwnProperty(i)) {
	        flipped[o[i]] = i;
	      }
	    }
	    return flipped
	  }

	  // Return a valid alpha value [0,1] with all invalid values being set to 1
	  function boundAlpha (a) {
	    a = parseFloat(a);

	    if (isNaN(a) || a < 0 || a > 1) {
	      a = 1;
	    }

	    return a
	  }

	  // Take input from [0, n] and return it as [0, 1]
	  function bound01 (n, max) {
	    if (isOnePointZero(n)) {
	      n = '100%';
	    }

	    const processPercent = isPercentage(n);
	    n = mathMin(max, mathMax(0, parseFloat(n)));

	    // Automatically convert percentage into number
	    if (processPercent) {
	      n = parseInt(n * max, 10) / 100;
	    }

	    // Handle floating point rounding errors
	    if (Math.abs(n - max) < 0.000001) {
	      return 1
	    }

	    // Convert into [0, 1] range if it isn't already
	    return (n % max) / parseFloat(max)
	  }

	  // Force a number between 0 and 1
	  function clamp01 (val) {
	    return mathMin(1, mathMax(0, val))
	  }

	  // Parse a base-16 hex value into a base-10 integer
	  function parseIntFromHex (val) {
	    return parseInt(val, 16)
	  }

	  // Need to handle 1.0 as 100%, since once it is a number, there is no difference between it and 1
	  // <http://stackoverflow.com/questions/7422072/javascript-how-to-detect-number-as-a-decimal-including-1-0>
	  function isOnePointZero (n) {
	    return typeof n === 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1
	  }

	  // Check to see if string passed in is a percentage
	  function isPercentage (n) {
	    return typeof n === 'string' && n.indexOf('%') != -1
	  }

	  // Force a hex value to have 2 characters
	  function pad2 (c) {
	    return c.length == 1 ? '0' + c : '' + c
	  }

	  // Replace a decimal with it's percentage value
	  function convertToPercentage (n) {
	    if (n <= 1) {
	      n = n * 100 + '%';
	    }

	    return n
	  }

	  // Converts a decimal to a hex value
	  function convertDecimalToHex (d) {
	    return Math.round(parseFloat(d) * 255).toString(16)
	  }
	  // Converts a hex value to a decimal
	  function convertHexToDecimal (h) {
	    return parseIntFromHex(h) / 255
	  }

	  const matchers = (function () {
	    // <http://www.w3.org/TR/css3-values/#integers>
	    const CSS_INTEGER = '[-\\+]?\\d+%?';

	    // <http://www.w3.org/TR/css3-values/#number-value>
	    const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';

	    // Allow positive/negative integer/number.  Don't capture the either/or, just the entire outcome.
	    const CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')';

	    // Actual matching.
	    // Parentheses and commas are optional, but not required.
	    // Whitespace can take the place of commas or opening paren
	    const PERMISSIVE_MATCH3 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
	    const PERMISSIVE_MATCH4 = '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';

	    return {
	      CSS_UNIT: new RegExp(CSS_UNIT),
	      rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
	      rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
	      hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
	      hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
	      hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
	      hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
	      hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	      hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
	      hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
	      hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/
	    }
	  })();

	  // `isValidCSSUnit`
	  // Take in a single string / number and check to see if it looks like a CSS unit
	  // (see `matchers` above for definition).
	  function isValidCSSUnit (color) {
	    return !!matchers.CSS_UNIT.exec(color)
	  }

	  // `stringInputToObject`
	  // Permissive string parsing.  Take in a number of formats, and output an object
	  // based on detected format.  Returns `{ r, g, b }` or `{ h, s, l }` or `{ h, s, v}`
	  function stringInputToObject (color) {
	    color = color
	      .replace(trimLeft, '')
	      .replace(trimRight, '')
	      .toLowerCase();
	    let named = false;
	    if (names[color]) {
	      color = names[color];
	      named = true;
	    } else if (color == 'transparent') {
	      return { r: 0, g: 0, b: 0, a: 0, format: 'name' }
	    }

	    // Try to match string input using regular expressions.
	    // Keep most of the number bounding out of this function - don't worry about [0,1] or [0,100] or [0,360]
	    // Just return an object and let the conversion functions handle that.
	    // This way the result will be the same whether the miniColor is initialized with string or object.
	    let match;
	    if ((match = matchers.rgb.exec(color))) {
	      return { r: match[1], g: match[2], b: match[3] }
	    }
	    if ((match = matchers.rgba.exec(color))) {
	      return { r: match[1], g: match[2], b: match[3], a: match[4] }
	    }
	    if ((match = matchers.hsl.exec(color))) {
	      return { h: match[1], s: match[2], l: match[3] }
	    }
	    if ((match = matchers.hsla.exec(color))) {
	      return { h: match[1], s: match[2], l: match[3], a: match[4] }
	    }
	    if ((match = matchers.hsv.exec(color))) {
	      return { h: match[1], s: match[2], v: match[3] }
	    }
	    if ((match = matchers.hsva.exec(color))) {
	      return { h: match[1], s: match[2], v: match[3], a: match[4] }
	    }
	    if ((match = matchers.hex8.exec(color))) {
	      return {
	        r: parseIntFromHex(match[1]),
	        g: parseIntFromHex(match[2]),
	        b: parseIntFromHex(match[3]),
	        a: convertHexToDecimal(match[4]),
	        format: named ? 'name' : 'hex8'
	      }
	    }
	    if ((match = matchers.hex6.exec(color))) {
	      return {
	        r: parseIntFromHex(match[1]),
	        g: parseIntFromHex(match[2]),
	        b: parseIntFromHex(match[3]),
	        format: named ? 'name' : 'hex'
	      }
	    }
	    if ((match = matchers.hex4.exec(color))) {
	      return {
	        r: parseIntFromHex(match[1] + '' + match[1]),
	        g: parseIntFromHex(match[2] + '' + match[2]),
	        b: parseIntFromHex(match[3] + '' + match[3]),
	        a: convertHexToDecimal(match[4] + '' + match[4]),
	        format: named ? 'name' : 'hex8'
	      }
	    }
	    if ((match = matchers.hex3.exec(color))) {
	      return {
	        r: parseIntFromHex(match[1] + '' + match[1]),
	        g: parseIntFromHex(match[2] + '' + match[2]),
	        b: parseIntFromHex(match[3] + '' + match[3]),
	        format: named ? 'name' : 'hex'
	      }
	    }

	    return false
	  }

	  function validateWCAG2Parms (parms) {
	    // return valid WCAG2 parms for isReadable.
	    // If input parms are invalid, return {"level":"AA", "size":"small"}
	    let level, size;
	    parms = parms || { level: 'AA', size: 'small' };
	    level = (parms.level || 'AA').toUpperCase();
	    size = (parms.size || 'small').toLowerCase();
	    if (level !== 'AA' && level !== 'AAA') {
	      level = 'AA';
	    }
	    if (size !== 'small' && size !== 'large') {
	      size = 'small';
	    }
	    return { level: level, size: size }
	  }

	  // Node: Export function
	  if (module.exports) {
	    module.exports = miniColor;
	  } else {
	    // Browser: Expose to window
	    window.miniColor = miniColor;
	  }
	})(Math);
} (color$1));

var firstName = "赵钱孙李周吴郑王冯陈褚卫蒋沈韩杨朱秦尤许何吕施张孔曹严华金魏陶姜戚谢邹喻柏水窦章云苏潘葛奚范彭郎鲁韦昌马苗凤花方俞任袁柳酆鲍史唐费廉岑薛雷贺倪汤滕殷罗毕郝邬安常乐于时傅皮卞齐康伍余元卜顾孟平黄和穆萧尹姚邵湛汪祁毛禹狄米贝明臧计伏成戴谈宋茅庞熊纪舒屈项祝董粱杜阮蓝闵席季麻强贾路娄危江童颜郭梅盛林刁钟徐邱骆高夏蔡田樊胡凌霍虞万支柯咎管卢莫经房裘缪干解应宗丁宣贲邓郁单杭洪包诸左石崔吉钮龚程嵇邢滑裴陆荣翁荀羊於惠甄曲家封芮羿储靳汲邴糜松井段富巫乌焦巴弓牧隗山谷车侯宓蓬全郗班仰秋仲伊宫宁仇栾暴甘钭厉戎祖武符刘景詹束龙叶幸司韶郜黎蓟薄印宿白怀蒲邰从鄂索咸籍赖卓蔺屠蒙池乔阴鬰胥能苍双闻莘党翟谭贡劳逄姬申扶堵冉宰郦雍郤璩桑桂濮牛寿通边扈燕冀郏浦尚农温别庄晏柴瞿阎充慕连茹习宦艾鱼容向古易慎戈廖庾终暨居衡步都耿满弘匡国文寇广禄阙东殴殳沃利蔚越夔隆师巩厍聂晁勾敖融冷訾辛阚那简饶空曾母沙乜养鞠须丰巢关蒯相查后荆红游竺权逯盖益桓公万俟司马上官欧阳夏侯诸葛闻人东方赫连皇甫尉迟公羊澹台公冶宗政濮阳淳于单于太叔申屠公孙仲孙轩辕令狐钟离宇文长孙慕容鲜于闾丘司徒司空亓官司寇仉督子车颛孙端木巫马公西漆雕乐正壤驷公良拓拔夹谷宰父谷粱晋楚闫法汝鄢涂钦段干百里东郭南门呼延归海羊舌微生岳帅缑亢况后有琴梁丘左丘东门西门商牟佘佴伯赏南宫墨哈谯笪年爱阳佟第五言福";
var secondName = "亦玉靖荷碧萱寒云向南书雁怀薇思菱忆文翠巧怀山若山向秋凡白绮烟从蕾天曼又亦依琴曼彤沛槐又槐元绿安珊夏之易槐宛亦白翠丹云问寒易文傲易青旋思真妙之半双若翠初兰怀曼惜萍初之宛丝寄南小萍幻儿千风天蓉雅青寄文代天春海惜珊向薇冬灵惜芹凌青谷芹香巧雁桃映雁书兰盼香向山寄风访烟绮晴傲柔寄容以珊紫雪芷容书琴寻桃涵阳怀寒易云采蓝代秋惜梦尔烟谷槐怀莲涵菱水蓝访冬半兰又柔冬卉安双冰岚香薇语芹静珊幻露访天静柏凌丝小翠雁卉访文凌文芷云思柔巧凡慕山依云千柳从凝安梦香旋凡巧映天安柏平萱以筠忆曼新竹绮露觅儿碧蓉白竹飞兰曼雁雁露凝冬含灵初阳海秋香天夏容傲冬谷翠冰双绿兰盼易思松梦山友灵绿竹灵安凌柏秋柔又蓝尔竹香天天蓝青枫问芙语海灵珊凝丹小蕾迎夏水之飞珍冰夏亦竹飞莲海白元蝶春蕾芷天怀绿尔容元芹若云寒烟听筠采梦凝莲元彤觅山痴瑶代桃冷之盼秋秋寒慕蕊巧夏海亦初晴巧蕊听安芷雪以松梦槐寒梅香岚寄柔映冬孤容晓蕾安萱听枫夜绿雪莲从丹碧蓉绮琴雨文幼荷青柏痴凝初蓝忆安盼晴寻冬雪珊梦寒迎南巧香采南如彤春竹采枫若雁翠阳沛容幻翠山兰芷波雪瑶代巧寄云慕卉冷松涵梅书白乐天雁卉宛秋傲旋新之凡儿夏真静枫痴柏恨蕊乐双白玉问玉寄松丹蝶元瑶冰蝶访曼代灵芷烟白易尔阳怜烟平卉丹寒访梦绿凝冰菱语蕊痴梅思烟忆枫映菱访儿凌兰曼岚若枫傲薇凡灵乐蕊秋灵谷槐觅云以寒寒香小凡代亦梦露映波友蕊寄凡怜蕾雁枫水绿曼荷笑珊寒珊谷南慕儿夏岚友儿小萱紫青妙菱冬寒曼柔语蝶青筠夜安觅海问安晓槐雅山访云翠容寒凡晓绿以菱冬云含玉访枫含卉夜白冷安灵竹醉薇元珊幻波盼夏元瑶迎曼水云访琴谷波乐之笑白之山妙海紫霜平夏凌旋孤丝怜寒向萍凡松青丝翠安如天凌雪绮菱代云南莲寻南春文香薇冬灵凌珍采绿天春沛文紫槐幻柏采文春梅雪旋盼海映梦安雁映容凝阳访风天亦平绿盼香觅风小霜雪萍半雪山柳谷雪靖易白薇梦菡飞绿如波又晴友易香菱冬亦问雁妙春海冬半安平春幼柏秋灵凝芙念烟白山从灵尔芙迎蓉念寒翠绿翠芙靖儿妙柏千凝小珍天巧妙旋雪枫夏菡元绿痴灵绮琴雨双听枫觅荷凡之晓凡雅彤香薇孤风从安绮彤之玉雨珍幻丝代梅香波青亦元菱海瑶飞槐听露梦岚幻竹新冬盼翠谷云忆霜水瑶慕晴秋双雨真觅珍丹雪从阳元枫痴香思天如松妙晴谷秋妙松晓夏香柏巧绿宛筠碧琴盼兰小夏安容青曼千儿香春寻双涵瑶冷梅秋柔思菱醉波醉柳以寒迎夏向雪香莲以丹依凝如柏雁菱凝竹宛白初柔南蕾书萱梦槐香芹南琴绿海沛儿晓瑶听春凝蝶紫雪念双念真曼寒凡霜飞雪雪兰雅霜从蓉冷雪靖巧翠丝觅翠凡白乐蓉迎波丹烟梦旋书双念桃夜天海桃青香恨风安筠觅柔初南秋蝶千易安露诗蕊山雁友菱香露晓兰白卉语山冷珍秋翠夏柳如之忆南书易翠桃寄瑶如曼问柳香梅幻桃又菡春绿醉蝶亦绿诗珊听芹新之易巧念云晓灵静枫夏蓉如南幼丝秋白冰安秋白南风醉山初彤凝海紫文凌晴香卉雅琴傲安傲之初蝶寻桃代芹诗霜春柏绿夏碧灵诗柳夏柳采白慕梅乐安冬菱紫安宛凝雨雪易真安荷静竹代柔丹秋绮梅依白凝荷冰巧之槐香柳问春夏寒半香诗筠新梅白曼安波从阳含桃曼卉笑萍碧巧晓露寻菡沛白平灵水彤安彤涵易乐巧依风紫南亦丝易蓉紫萍惜萱诗蕾寻绿诗双寻云孤丹谷蓝惜香谷枫山灵幻丝友梅从云雁丝盼旋幼旋尔蓝沛山代丝痴梅觅松冰香依玉冰之妙梦以冬碧春曼青冷菱雪曼安白香桃安春千亦凌蝶又夏南烟靖易沛凝翠梅书文雪卉乐儿傲丝安青初蝶寄灵惜寒雨竹冬莲绮南翠柏平凡亦玉孤兰秋珊新筠半芹夏瑶念文晓丝涵蕾雁凡谷兰灵凡凝云曼云丹彤南霜夜梦从筠雁芙语蝶依波晓旋念之盼芙曼安采珊盼夏初柳迎天曼安南珍妙芙语柳含莲晓筠夏山尔容采春念梦傲南问薇雨灵凝安冰海初珍宛菡冬卉盼晴冷荷寄翠幻梅如凡语梦易梦千柔向露梦玉傲霜依霜灵松诗桃书蝶恨真冰蝶山槐以晴友易梦桃香菱孤云水蓉雅容飞烟雁荷代芙醉易夏烟山梅若南恨桃依秋依波香巧紫萱涵易忆之幻巧水风安寒白亦惜玉碧春怜雪听南念蕾梦竹千凡寄琴采波元冬思菱平卉笑柳雪卉南蓉谷梦巧兰绿蝶飞荷平安孤晴芷荷曼冬寻巧寄波尔槐以旋绿蕊初夏依丝怜南千山雨安水风寄柔念巧幼枫凡桃新儿春翠夏波雨琴静槐元槐映阳飞薇小凝映寒傲菡谷蕊笑槐飞兰笑卉迎荷元冬书竹半烟绮波小之觅露夜雪春柔寒梦尔风白梅雨旋芷珊山彤尔柳沛柔灵萱沛凝白容乐蓉映安依云映冬凡雁梦秋醉柳梦凡秋巧若云元容怀蕾灵寒天薇白风访波亦凝易绿夜南曼凡亦巧青易冰真白萱友安诗翠雪珍海之小蕊又琴香彤语梦惜蕊迎彤沛白雁山易蓉雪晴诗珊春冬又绿冰绿半梅笑容沛凝念瑶天真含巧如冬向真从蓉春柔亦云向雁尔蝶冬易丹亦夏山醉香盼夏孤菱安莲问凝冬萱晓山雁蓉梦蕊山菡南莲飞双凝丝思萱怀梦雨梅冷霜向松迎丝迎梅听双山蝶夜梅醉冬巧云雨筠平文青文半蕾碧萱寒云向南书雁怀薇思菱忆文翠巧怀山若山向秋凡白绮烟从蕾天曼又亦依琴曼彤沛槐又槐元绿安珊夏之易槐宛亦白翠丹云问寒易文傲易青旋思真妙之半双若翠初兰怀曼惜萍初之宛丝寄南小萍幻儿千风天蓉雅青寄文代天春海惜珊向薇冬灵惜芹凌青谷芹香巧雁桃映雁书兰盼香向山寄风访烟绮晴傲柔寄容以珊紫雪芷容书琴寻桃涵阳怀寒易云采蓝代秋惜梦尔烟谷槐怀莲涵菱水蓝访冬半兰又柔冬卉安双冰岚香薇语芹静珊幻露访天静柏凌丝小翠雁卉访文凌文芷云思柔巧凡慕山依云千柳从凝安梦香旋凡巧映天安柏平萱以筠忆曼新竹绮露觅儿碧蓉白竹飞兰曼雁雁露凝冬含灵初阳海秋香天夏容傲冬谷翠冰双绿兰盼易思松梦山友灵绿竹灵安凌柏秋柔又蓝尔竹香天天蓝青枫问芙语海灵珊凝丹小蕾迎夏水之飞珍冰夏亦竹飞莲海白元蝶春蕾芷天怀绿尔容元芹若云寒烟听筠采梦凝莲元彤觅山痴瑶代桃冷之盼秋秋寒慕蕊巧夏海亦初晴巧蕊听安芷雪以松梦槐寒梅香岚寄柔映冬孤容晓蕾安萱听枫夜绿雪莲从丹碧蓉绮琴雨文幼荷青柏痴凝初蓝忆安盼晴寻冬雪珊梦寒迎南巧香采南如彤春竹采枫若雁翠阳沛容幻翠山兰芷波雪瑶代巧寄云慕卉冷松涵梅书白乐天雁卉宛秋傲旋新之凡儿夏真静枫痴柏恨蕊乐双白玉问玉寄松丹蝶元瑶冰蝶访曼代灵芷烟白易尔阳怜烟平卉丹寒访梦绿凝冰菱语蕊痴梅思烟忆枫映菱访儿凌兰曼岚若枫傲薇凡灵乐蕊秋灵谷槐觅云幼珊忆彤凌青之桃芷荷听荷代玉念珍梦菲夜春千秋白秋谷菱飞松初瑶惜灵恨瑶梦易新瑶曼梅碧曼友瑶雨兰夜柳香蝶盼巧芷珍香卉含芙夜云依萱凝雁以莲易容元柳安南幼晴尔琴飞阳白凡沛萍雪瑶向卉采文乐珍寒荷觅双白桃安卉迎曼盼雁乐松涵山恨寒问枫以柳含海秋春翠曼忆梅涵柳梦香海蓝晓曼代珊春冬恨荷忆丹静芙绮兰梦安紫丝千雁凝珍香萱梦容冷雁飞柏天真翠琴寄真秋荷代珊初雪雅柏怜容如风南露紫易冰凡海雪语蓉碧玉翠岚语风盼丹痴旋凝梦从雪白枫傲云白梅念露慕凝雅柔盼柳半青从霜怀柔怜晴夜蓉代双以南若菱芷文寄春南晴恨之梦寒初翠灵波巧春问夏凌春惜海亦旋沛芹幼萱白凝初露迎海绮玉凌香寻芹秋柳尔白映真含雁寒松友珊寻雪忆柏秋柏巧风恨蝶青烟问蕊灵阳春枫又儿雪巧丹萱凡双孤萍紫菱寻凝傲柏傲儿友容灵枫尔丝曼凝若蕊问丝思枫水卉问梅念寒诗双翠霜夜香寒蕾凡阳冷玉平彤语薇幻珊紫夏凌波芷蝶丹南之双凡波思雁白莲从菡如容采柳沛岚惜儿夜玉水儿半凡语海听莲幻枫念柏冰珍思山凝蕊天玉问香思萱向梦笑南夏旋之槐元灵以彤采萱巧曼绿兰平蓝问萍绿蓉靖柏迎蕾碧曼思卉白柏妙菡怜阳雨柏雁菡梦之又莲乐荷寒天凝琴书南映天白梦初瑶恨竹平露含巧慕蕊半莲醉卉天菱青雪雅旋巧荷飞丹恨云若灵尔云幻天诗兰青梦海菡灵槐忆秋寒凝凝芙绮山静白尔蓉尔冬映萱白筠冰双访彤绿柏夏云笑翠晓灵含双盼波以云怜翠雁风之卉平松问儿绿柳如蓉曼容天晴丹琴惜天寻琴痴春依瑶涵易忆灵从波依柔问兰山晴怜珊之云飞双傲白沛春雨南梦之笑阳代容友琴雁梅友桃从露语柔傲玉觅夏晓蓝新晴雨莲凝旋绿旋幻香觅双冷亦忆雪友卉幻翠靖柔寻菱丹翠安阳雅寒惜筠尔安雁易飞瑶夏兰沛蓝静丹山芙笑晴新烟笑旋雁兰凌翠秋莲书桃傲松语儿映菡初曼听云孤松初夏雅香语雪初珍白安冰薇诗槐冷玉梦琪忆柳之桃慕青问兰尔岚元香初夏沛菡傲珊曼文乐菱痴珊恨玉惜文香寒新柔语蓉海安夜蓉涵柏水桃醉蓝春儿语琴从彤傲晴语兰又菱碧彤元霜怜梦紫寒妙彤曼易南莲紫翠雨寒易烟如萱若南寻真晓亦向珊慕灵以蕊寻雁映易雪柳孤岚笑霜海云凝天沛珊寒云冰旋宛儿绿真盼儿晓霜碧凡夏菡曼香若烟半梦雅绿冰蓝灵槐平安书翠翠风香巧代云梦曼幼翠友巧听寒梦柏醉易访旋亦玉凌萱访卉怀亦笑蓝春翠靖柏夜蕾冰夏梦松书雪乐枫念薇靖雁寻春恨山从寒忆香觅波静曼凡旋以亦念露芷蕾千兰新波代真新蕾雁玉冷卉紫山千琴恨天傲芙盼山怀蝶冰兰山柏翠萱恨松问旋从南白易问筠如霜半芹丹珍冰彤亦寒寒雁怜云寻文乐丹翠柔谷山之瑶冰露尔珍谷雪乐萱涵菡海莲傲蕾青槐冬儿易梦惜雪宛海之柔夏青亦瑶妙菡春竹痴梦紫蓝晓巧幻柏元风冰枫访蕊南春芷蕊凡蕾凡柔安蕾天荷含玉书兰雅琴书瑶春雁从安夏槐念芹怀萍代曼幻珊谷丝秋翠白晴海露代荷含玉书蕾听白访琴灵雁秋春雪青乐瑶含烟涵双平蝶雅蕊傲之灵薇绿春含蕾从梦从蓉初丹听兰听蓉语芙夏彤凌瑶忆翠幻灵怜菡紫南依珊妙竹访烟怜蕾映寒友绿冰萍惜霜凌香芷蕾雁卉迎梦元柏代萱紫真千青凌寒紫安寒安怀蕊秋荷涵雁以山凡梅盼曼翠彤谷冬新巧冷安千萍冰烟雅阳友绿南松诗云飞风寄灵书芹幼蓉以蓝笑寒忆寒秋烟芷巧水香映之醉波幻莲夜山芷卉向彤小玉幼南凡梦尔曼念波迎松青寒笑天涵蕾碧菡映秋盼烟忆山";
var addressCode = [
	110000,
	"北京市",
	110101,
	"东城区",
	110102,
	"西城区",
	110105,
	"朝阳区",
	110106,
	"丰台区",
	110107,
	"石景山区",
	110108,
	"海淀区",
	110109,
	"门头沟区",
	110111,
	"房山区",
	110112,
	"通州区",
	110113,
	"顺义区",
	110114,
	"昌平区",
	110115,
	"大兴区",
	110116,
	"怀柔区",
	110117,
	"平谷区",
	110118,
	"密云区",
	110119,
	"延庆区",
	120000,
	"天津市",
	120101,
	"和平区",
	120102,
	"河东区",
	120103,
	"河西区",
	120104,
	"南开区",
	120105,
	"河北区",
	120106,
	"红桥区",
	120110,
	"东丽区",
	120111,
	"西青区",
	120112,
	"津南区",
	120113,
	"北辰区",
	120114,
	"武清区",
	120115,
	"宝坻区",
	120116,
	"滨海新区",
	120117,
	"宁河区",
	120118,
	"静海区",
	120119,
	"蓟州区",
	130000,
	"河北省",
	130100,
	"石家庄市",
	130102,
	"长安区",
	130104,
	"桥西区",
	130105,
	"新华区",
	130107,
	"井陉矿区",
	130108,
	"裕华区",
	130109,
	"藁城区",
	130110,
	"鹿泉区",
	130111,
	"栾城区",
	130121,
	"井陉县",
	130123,
	"正定县",
	130125,
	"行唐县",
	130126,
	"灵寿县",
	130127,
	"高邑县",
	130128,
	"深泽县",
	130129,
	"赞皇县",
	130130,
	"无极县",
	130131,
	"平山县",
	130132,
	"元氏县",
	130133,
	"赵县",
	130181,
	"辛集市",
	130183,
	"晋州市",
	130184,
	"新乐市",
	130200,
	"唐山市",
	130202,
	"路南区",
	130203,
	"路北区",
	130204,
	"古冶区",
	130205,
	"开平区",
	130207,
	"丰南区",
	130208,
	"丰润区",
	130209,
	"曹妃甸区",
	130224,
	"滦南县",
	130225,
	"乐亭县",
	130227,
	"迁西县",
	130229,
	"玉田县",
	130281,
	"遵化市",
	130283,
	"迁安市",
	130284,
	"滦州市",
	130300,
	"秦皇岛市",
	130302,
	"海港区",
	130303,
	"山海关区",
	130304,
	"北戴河区",
	130306,
	"抚宁区",
	130321,
	"青龙满族自治县",
	130322,
	"昌黎县",
	130324,
	"卢龙县",
	130400,
	"邯郸市",
	130402,
	"邯山区",
	130403,
	"丛台区",
	130404,
	"复兴区",
	130406,
	"峰峰矿区",
	130407,
	"肥乡区",
	130408,
	"永年区",
	130423,
	"临漳县",
	130424,
	"成安县",
	130425,
	"大名县",
	130426,
	"涉县",
	130427,
	"磁县",
	130430,
	"邱县",
	130431,
	"鸡泽县",
	130432,
	"广平县",
	130433,
	"馆陶县",
	130434,
	"魏县",
	130435,
	"曲周县",
	130481,
	"武安市",
	130500,
	"邢台市",
	130502,
	"桥东区",
	130503,
	"桥西区",
	130521,
	"邢台县",
	130522,
	"临城县",
	130523,
	"内丘县",
	130524,
	"柏乡县",
	130525,
	"隆尧县",
	130526,
	"任县",
	130527,
	"南和县",
	130528,
	"宁晋县",
	130529,
	"巨鹿县",
	130530,
	"新河县",
	130531,
	"广宗县",
	130532,
	"平乡县",
	130533,
	"威县",
	130534,
	"清河县",
	130535,
	"临西县",
	130581,
	"南宫市",
	130582,
	"沙河市",
	130600,
	"保定市",
	130602,
	"竞秀区",
	130606,
	"莲池区",
	130607,
	"满城区",
	130608,
	"清苑区",
	130609,
	"徐水区",
	130623,
	"涞水县",
	130624,
	"阜平县",
	130626,
	"定兴县",
	130627,
	"唐县",
	130628,
	"高阳县",
	130629,
	"容城县",
	130630,
	"涞源县",
	130631,
	"望都县",
	130632,
	"安新县",
	130633,
	"易县",
	130634,
	"曲阳县",
	130635,
	"蠡县",
	130636,
	"顺平县",
	130637,
	"博野县",
	130638,
	"雄县",
	130681,
	"涿州市",
	130682,
	"定州市",
	130683,
	"安国市",
	130684,
	"高碑店市",
	130700,
	"张家口市",
	130702,
	"桥东区",
	130703,
	"桥西区",
	130705,
	"宣化区",
	130706,
	"下花园区",
	130708,
	"万全区",
	130709,
	"崇礼区",
	130722,
	"张北县",
	130723,
	"康保县",
	130724,
	"沽源县",
	130725,
	"尚义县",
	130726,
	"蔚县",
	130727,
	"阳原县",
	130728,
	"怀安县",
	130730,
	"怀来县",
	130731,
	"涿鹿县",
	130732,
	"赤城县",
	130800,
	"承德市",
	130802,
	"双桥区",
	130803,
	"双滦区",
	130804,
	"鹰手营子矿区",
	130821,
	"承德县",
	130822,
	"兴隆县",
	130824,
	"滦平县",
	130825,
	"隆化县",
	130826,
	"丰宁满族自治县",
	130827,
	"宽城满族自治县",
	130828,
	"围场满族蒙古族自治县",
	130881,
	"平泉市",
	130900,
	"沧州市",
	130902,
	"新华区",
	130903,
	"运河区",
	130921,
	"沧县",
	130922,
	"青县",
	130923,
	"东光县",
	130924,
	"海兴县",
	130925,
	"盐山县",
	130926,
	"肃宁县",
	130927,
	"南皮县",
	130928,
	"吴桥县",
	130929,
	"献县",
	130930,
	"孟村回族自治县",
	130981,
	"泊头市",
	130982,
	"任丘市",
	130983,
	"黄骅市",
	130984,
	"河间市",
	131000,
	"廊坊市",
	131002,
	"安次区",
	131003,
	"广阳区",
	131022,
	"固安县",
	131023,
	"永清县",
	131024,
	"香河县",
	131025,
	"大城县",
	131026,
	"文安县",
	131028,
	"大厂回族自治县",
	131081,
	"霸州市",
	131082,
	"三河市",
	131100,
	"衡水市",
	131102,
	"桃城区",
	131103,
	"冀州区",
	131121,
	"枣强县",
	131122,
	"武邑县",
	131123,
	"武强县",
	131124,
	"饶阳县",
	131125,
	"安平县",
	131126,
	"故城县",
	131127,
	"景县",
	131128,
	"阜城县",
	131182,
	"深州市",
	140000,
	"山西省",
	140100,
	"太原市",
	140105,
	"小店区",
	140106,
	"迎泽区",
	140107,
	"杏花岭区",
	140108,
	"尖草坪区",
	140109,
	"万柏林区",
	140110,
	"晋源区",
	140121,
	"清徐县",
	140122,
	"阳曲县",
	140123,
	"娄烦县",
	140181,
	"古交市",
	140200,
	"大同市",
	140212,
	"新荣区",
	140213,
	"平城区",
	140214,
	"云冈区",
	140215,
	"云州区",
	140221,
	"阳高县",
	140222,
	"天镇县",
	140223,
	"广灵县",
	140224,
	"灵丘县",
	140225,
	"浑源县",
	140226,
	"左云县",
	140300,
	"阳泉市",
	140302,
	"城区",
	140303,
	"矿区",
	140311,
	"郊区",
	140321,
	"平定县",
	140322,
	"盂县",
	140400,
	"长治市",
	140403,
	"潞州区",
	140404,
	"上党区",
	140405,
	"屯留区",
	140406,
	"潞城区",
	140423,
	"襄垣县",
	140425,
	"平顺县",
	140426,
	"黎城县",
	140427,
	"壶关县",
	140428,
	"长子县",
	140429,
	"武乡县",
	140430,
	"沁县",
	140431,
	"沁源县",
	140500,
	"晋城市",
	140502,
	"城区",
	140521,
	"沁水县",
	140522,
	"阳城县",
	140524,
	"陵川县",
	140525,
	"泽州县",
	140581,
	"高平市",
	140600,
	"朔州市",
	140602,
	"朔城区",
	140603,
	"平鲁区",
	140621,
	"山阴县",
	140622,
	"应县",
	140623,
	"右玉县",
	140681,
	"怀仁市",
	140700,
	"晋中市",
	140702,
	"榆次区",
	140703,
	"太谷区",
	140721,
	"榆社县",
	140722,
	"左权县",
	140723,
	"和顺县",
	140724,
	"昔阳县",
	140725,
	"寿阳县",
	140727,
	"祁县",
	140728,
	"平遥县",
	140729,
	"灵石县",
	140781,
	"介休市",
	140800,
	"运城市",
	140802,
	"盐湖区",
	140821,
	"临猗县",
	140822,
	"万荣县",
	140823,
	"闻喜县",
	140824,
	"稷山县",
	140825,
	"新绛县",
	140826,
	"绛县",
	140827,
	"垣曲县",
	140828,
	"夏县",
	140829,
	"平陆县",
	140830,
	"芮城县",
	140881,
	"永济市",
	140882,
	"河津市",
	140900,
	"忻州市",
	140902,
	"忻府区",
	140921,
	"定襄县",
	140922,
	"五台县",
	140923,
	"代县",
	140924,
	"繁峙县",
	140925,
	"宁武县",
	140926,
	"静乐县",
	140927,
	"神池县",
	140928,
	"五寨县",
	140929,
	"岢岚县",
	140930,
	"河曲县",
	140931,
	"保德县",
	140932,
	"偏关县",
	140981,
	"原平市",
	141000,
	"临汾市",
	141002,
	"尧都区",
	141021,
	"曲沃县",
	141022,
	"翼城县",
	141023,
	"襄汾县",
	141024,
	"洪洞县",
	141025,
	"古县",
	141026,
	"安泽县",
	141027,
	"浮山县",
	141028,
	"吉县",
	141029,
	"乡宁县",
	141030,
	"大宁县",
	141031,
	"隰县",
	141032,
	"永和县",
	141033,
	"蒲县",
	141034,
	"汾西县",
	141081,
	"侯马市",
	141082,
	"霍州市",
	141100,
	"吕梁市",
	141102,
	"离石区",
	141121,
	"文水县",
	141122,
	"交城县",
	141123,
	"兴县",
	141124,
	"临县",
	141125,
	"柳林县",
	141126,
	"石楼县",
	141127,
	"岚县",
	141128,
	"方山县",
	141129,
	"中阳县",
	141130,
	"交口县",
	141181,
	"孝义市",
	141182,
	"汾阳市",
	150000,
	"内蒙古自治区",
	150100,
	"呼和浩特市",
	150102,
	"新城区",
	150103,
	"回民区",
	150104,
	"玉泉区",
	150105,
	"赛罕区",
	150121,
	"土默特左旗",
	150122,
	"托克托县",
	150123,
	"和林格尔县",
	150124,
	"清水河县",
	150125,
	"武川县",
	150200,
	"包头市",
	150202,
	"东河区",
	150203,
	"昆都仑区",
	150204,
	"青山区",
	150205,
	"石拐区",
	150206,
	"白云鄂博矿区",
	150207,
	"九原区",
	150221,
	"土默特右旗",
	150222,
	"固阳县",
	150223,
	"达尔罕茂明安联合旗",
	150300,
	"乌海市",
	150302,
	"海勃湾区",
	150303,
	"海南区",
	150304,
	"乌达区",
	150400,
	"赤峰市",
	150402,
	"红山区",
	150403,
	"元宝山区",
	150404,
	"松山区",
	150421,
	"阿鲁科尔沁旗",
	150422,
	"巴林左旗",
	150423,
	"巴林右旗",
	150424,
	"林西县",
	150425,
	"克什克腾旗",
	150426,
	"翁牛特旗",
	150428,
	"喀喇沁旗",
	150429,
	"宁城县",
	150430,
	"敖汉旗",
	150500,
	"通辽市",
	150502,
	"科尔沁区",
	150521,
	"科尔沁左翼中旗",
	150522,
	"科尔沁左翼后旗",
	150523,
	"开鲁县",
	150524,
	"库伦旗",
	150525,
	"奈曼旗",
	150526,
	"扎鲁特旗",
	150581,
	"霍林郭勒市",
	150600,
	"鄂尔多斯市",
	150602,
	"东胜区",
	150603,
	"康巴什区",
	150621,
	"达拉特旗",
	150622,
	"准格尔旗",
	150623,
	"鄂托克前旗",
	150624,
	"鄂托克旗",
	150625,
	"杭锦旗",
	150626,
	"乌审旗",
	150627,
	"伊金霍洛旗",
	150700,
	"呼伦贝尔市",
	150702,
	"海拉尔区",
	150703,
	"扎赉诺尔区",
	150721,
	"阿荣旗",
	150722,
	"莫力达瓦达斡尔族自治旗",
	150723,
	"鄂伦春自治旗",
	150724,
	"鄂温克族自治旗",
	150725,
	"陈巴尔虎旗",
	150726,
	"新巴尔虎左旗",
	150727,
	"新巴尔虎右旗",
	150781,
	"满洲里市",
	150782,
	"牙克石市",
	150783,
	"扎兰屯市",
	150784,
	"额尔古纳市",
	150785,
	"根河市",
	150800,
	"巴彦淖尔市",
	150802,
	"临河区",
	150821,
	"五原县",
	150822,
	"磴口县",
	150823,
	"乌拉特前旗",
	150824,
	"乌拉特中旗",
	150825,
	"乌拉特后旗",
	150826,
	"杭锦后旗",
	150900,
	"乌兰察布市",
	150902,
	"集宁区",
	150921,
	"卓资县",
	150922,
	"化德县",
	150923,
	"商都县",
	150924,
	"兴和县",
	150925,
	"凉城县",
	150926,
	"察哈尔右翼前旗",
	150927,
	"察哈尔右翼中旗",
	150928,
	"察哈尔右翼后旗",
	150929,
	"四子王旗",
	150981,
	"丰镇市",
	152200,
	"兴安盟",
	152201,
	"乌兰浩特市",
	152202,
	"阿尔山市",
	152221,
	"科尔沁右翼前旗",
	152222,
	"科尔沁右翼中旗",
	152223,
	"扎赉特旗",
	152224,
	"突泉县",
	152500,
	"锡林郭勒盟",
	152501,
	"二连浩特市",
	152502,
	"锡林浩特市",
	152522,
	"阿巴嘎旗",
	152523,
	"苏尼特左旗",
	152524,
	"苏尼特右旗",
	152525,
	"东乌珠穆沁旗",
	152526,
	"西乌珠穆沁旗",
	152527,
	"太仆寺旗",
	152528,
	"镶黄旗",
	152529,
	"正镶白旗",
	152530,
	"正蓝旗",
	152531,
	"多伦县",
	152900,
	"阿拉善盟",
	152921,
	"阿拉善左旗",
	152922,
	"阿拉善右旗",
	152923,
	"额济纳旗",
	210000,
	"辽宁省",
	210100,
	"沈阳市",
	210102,
	"和平区",
	210103,
	"沈河区",
	210104,
	"大东区",
	210105,
	"皇姑区",
	210106,
	"铁西区",
	210111,
	"苏家屯区",
	210112,
	"浑南区",
	210113,
	"沈北新区",
	210114,
	"于洪区",
	210115,
	"辽中区",
	210123,
	"康平县",
	210124,
	"法库县",
	210181,
	"新民市",
	210200,
	"大连市",
	210202,
	"中山区",
	210203,
	"西岗区",
	210204,
	"沙河口区",
	210211,
	"甘井子区",
	210212,
	"旅顺口区",
	210213,
	"金州区",
	210214,
	"普兰店区",
	210224,
	"长海县",
	210281,
	"瓦房店市",
	210283,
	"庄河市",
	210300,
	"鞍山市",
	210302,
	"铁东区",
	210303,
	"铁西区",
	210304,
	"立山区",
	210311,
	"千山区",
	210321,
	"台安县",
	210323,
	"岫岩满族自治县",
	210381,
	"海城市",
	210400,
	"抚顺市",
	210402,
	"新抚区",
	210403,
	"东洲区",
	210404,
	"望花区",
	210411,
	"顺城区",
	210421,
	"抚顺县",
	210422,
	"新宾满族自治县",
	210423,
	"清原满族自治县",
	210500,
	"本溪市",
	210502,
	"平山区",
	210503,
	"溪湖区",
	210504,
	"明山区",
	210505,
	"南芬区",
	210521,
	"本溪满族自治县",
	210522,
	"桓仁满族自治县",
	210600,
	"丹东市",
	210602,
	"元宝区",
	210603,
	"振兴区",
	210604,
	"振安区",
	210624,
	"宽甸满族自治县",
	210681,
	"东港市",
	210682,
	"凤城市",
	210700,
	"锦州市",
	210702,
	"古塔区",
	210703,
	"凌河区",
	210711,
	"太和区",
	210726,
	"黑山县",
	210727,
	"义县",
	210781,
	"凌海市",
	210782,
	"北镇市",
	210800,
	"营口市",
	210802,
	"站前区",
	210803,
	"西市区",
	210804,
	"鲅鱼圈区",
	210811,
	"老边区",
	210881,
	"盖州市",
	210882,
	"大石桥市",
	210900,
	"阜新市",
	210902,
	"海州区",
	210903,
	"新邱区",
	210904,
	"太平区",
	210905,
	"清河门区",
	210911,
	"细河区",
	210921,
	"阜新蒙古族自治县",
	210922,
	"彰武县",
	211000,
	"辽阳市",
	211002,
	"白塔区",
	211003,
	"文圣区",
	211004,
	"宏伟区",
	211005,
	"弓长岭区",
	211011,
	"太子河区",
	211021,
	"辽阳县",
	211081,
	"灯塔市",
	211100,
	"盘锦市",
	211102,
	"双台子区",
	211103,
	"兴隆台区",
	211104,
	"大洼区",
	211122,
	"盘山县",
	211200,
	"铁岭市",
	211202,
	"银州区",
	211204,
	"清河区",
	211221,
	"铁岭县",
	211223,
	"西丰县",
	211224,
	"昌图县",
	211281,
	"调兵山市",
	211282,
	"开原市",
	211300,
	"朝阳市",
	211302,
	"双塔区",
	211303,
	"龙城区",
	211321,
	"朝阳县",
	211322,
	"建平县",
	211324,
	"喀喇沁左翼蒙古族自治县",
	211381,
	"北票市",
	211382,
	"凌源市",
	211400,
	"葫芦岛市",
	211402,
	"连山区",
	211403,
	"龙港区",
	211404,
	"南票区",
	211421,
	"绥中县",
	211422,
	"建昌县",
	211481,
	"兴城市",
	220000,
	"吉林省",
	220100,
	"长春市",
	220102,
	"南关区",
	220103,
	"宽城区",
	220104,
	"朝阳区",
	220105,
	"二道区",
	220106,
	"绿园区",
	220112,
	"双阳区",
	220113,
	"九台区",
	220122,
	"农安县",
	220182,
	"榆树市",
	220183,
	"德惠市",
	220200,
	"吉林市",
	220202,
	"昌邑区",
	220203,
	"龙潭区",
	220204,
	"船营区",
	220211,
	"丰满区",
	220221,
	"永吉县",
	220281,
	"蛟河市",
	220282,
	"桦甸市",
	220283,
	"舒兰市",
	220284,
	"磐石市",
	220300,
	"四平市",
	220302,
	"铁西区",
	220303,
	"铁东区",
	220322,
	"梨树县",
	220323,
	"伊通满族自治县",
	220381,
	"公主岭市",
	220382,
	"双辽市",
	220400,
	"辽源市",
	220402,
	"龙山区",
	220403,
	"西安区",
	220421,
	"东丰县",
	220422,
	"东辽县",
	220500,
	"通化市",
	220502,
	"东昌区",
	220503,
	"二道江区",
	220521,
	"通化县",
	220523,
	"辉南县",
	220524,
	"柳河县",
	220581,
	"梅河口市",
	220582,
	"集安市",
	220600,
	"白山市",
	220602,
	"浑江区",
	220605,
	"江源区",
	220621,
	"抚松县",
	220622,
	"靖宇县",
	220623,
	"长白朝鲜族自治县",
	220681,
	"临江市",
	220700,
	"松原市",
	220702,
	"宁江区",
	220721,
	"前郭尔罗斯蒙古族自治县",
	220722,
	"长岭县",
	220723,
	"乾安县",
	220781,
	"扶余市",
	220800,
	"白城市",
	220802,
	"洮北区",
	220821,
	"镇赉县",
	220822,
	"通榆县",
	220881,
	"洮南市",
	220882,
	"大安市",
	222400,
	"延边朝鲜族自治州",
	222401,
	"延吉市",
	222402,
	"图们市",
	222403,
	"敦化市",
	222404,
	"珲春市",
	222405,
	"龙井市",
	222406,
	"和龙市",
	222424,
	"汪清县",
	222426,
	"安图县",
	230000,
	"黑龙江省",
	230100,
	"哈尔滨市",
	230102,
	"道里区",
	230103,
	"南岗区",
	230104,
	"道外区",
	230108,
	"平房区",
	230109,
	"松北区",
	230110,
	"香坊区",
	230111,
	"呼兰区",
	230112,
	"阿城区",
	230113,
	"双城区",
	230123,
	"依兰县",
	230124,
	"方正县",
	230125,
	"宾县",
	230126,
	"巴彦县",
	230127,
	"木兰县",
	230128,
	"通河县",
	230129,
	"延寿县",
	230183,
	"尚志市",
	230184,
	"五常市",
	230200,
	"齐齐哈尔市",
	230202,
	"龙沙区",
	230203,
	"建华区",
	230204,
	"铁锋区",
	230205,
	"昂昂溪区",
	230206,
	"富拉尔基区",
	230207,
	"碾子山区",
	230208,
	"梅里斯达斡尔族区",
	230221,
	"龙江县",
	230223,
	"依安县",
	230224,
	"泰来县",
	230225,
	"甘南县",
	230227,
	"富裕县",
	230229,
	"克山县",
	230230,
	"克东县",
	230231,
	"拜泉县",
	230281,
	"讷河市",
	230300,
	"鸡西市",
	230302,
	"鸡冠区",
	230303,
	"恒山区",
	230304,
	"滴道区",
	230305,
	"梨树区",
	230306,
	"城子河区",
	230307,
	"麻山区",
	230321,
	"鸡东县",
	230381,
	"虎林市",
	230382,
	"密山市",
	230400,
	"鹤岗市",
	230402,
	"向阳区",
	230403,
	"工农区",
	230404,
	"南山区",
	230405,
	"兴安区",
	230406,
	"东山区",
	230407,
	"兴山区",
	230421,
	"萝北县",
	230422,
	"绥滨县",
	230500,
	"双鸭山市",
	230502,
	"尖山区",
	230503,
	"岭东区",
	230505,
	"四方台区",
	230506,
	"宝山区",
	230521,
	"集贤县",
	230522,
	"友谊县",
	230523,
	"宝清县",
	230524,
	"饶河县",
	230600,
	"大庆市",
	230602,
	"萨尔图区",
	230603,
	"龙凤区",
	230604,
	"让胡路区",
	230605,
	"红岗区",
	230606,
	"大同区",
	230621,
	"肇州县",
	230622,
	"肇源县",
	230623,
	"林甸县",
	230624,
	"杜尔伯特蒙古族自治县",
	230700,
	"伊春市",
	230717,
	"伊美区",
	230718,
	"乌翠区",
	230719,
	"友好区",
	230722,
	"嘉荫县",
	230723,
	"汤旺县",
	230724,
	"丰林县",
	230725,
	"大箐山县",
	230726,
	"南岔县",
	230751,
	"金林区",
	230781,
	"铁力市",
	230800,
	"佳木斯市",
	230803,
	"向阳区",
	230804,
	"前进区",
	230805,
	"东风区",
	230811,
	"郊区",
	230822,
	"桦南县",
	230826,
	"桦川县",
	230828,
	"汤原县",
	230881,
	"同江市",
	230882,
	"富锦市",
	230883,
	"抚远市",
	230900,
	"七台河市",
	230902,
	"新兴区",
	230903,
	"桃山区",
	230904,
	"茄子河区",
	230921,
	"勃利县",
	231000,
	"牡丹江市",
	231002,
	"东安区",
	231003,
	"阳明区",
	231004,
	"爱民区",
	231005,
	"西安区",
	231025,
	"林口县",
	231081,
	"绥芬河市",
	231083,
	"海林市",
	231084,
	"宁安市",
	231085,
	"穆棱市",
	231086,
	"东宁市",
	231100,
	"黑河市",
	231102,
	"爱辉区",
	231123,
	"逊克县",
	231124,
	"孙吴县",
	231181,
	"北安市",
	231182,
	"五大连池市",
	231183,
	"嫩江市",
	231200,
	"绥化市",
	231202,
	"北林区",
	231221,
	"望奎县",
	231222,
	"兰西县",
	231223,
	"青冈县",
	231224,
	"庆安县",
	231225,
	"明水县",
	231226,
	"绥棱县",
	231281,
	"安达市",
	231282,
	"肇东市",
	231283,
	"海伦市",
	232700,
	"大兴安岭地区",
	232701,
	"漠河市",
	232721,
	"呼玛县",
	232722,
	"塔河县",
	310000,
	"上海市",
	310101,
	"黄浦区",
	310104,
	"徐汇区",
	310105,
	"长宁区",
	310106,
	"静安区",
	310107,
	"普陀区",
	310109,
	"虹口区",
	310110,
	"杨浦区",
	310112,
	"闵行区",
	310113,
	"宝山区",
	310114,
	"嘉定区",
	310115,
	"浦东新区",
	310116,
	"金山区",
	310117,
	"松江区",
	310118,
	"青浦区",
	310120,
	"奉贤区",
	310151,
	"崇明区",
	320000,
	"江苏省",
	320100,
	"南京市",
	320102,
	"玄武区",
	320104,
	"秦淮区",
	320105,
	"建邺区",
	320106,
	"鼓楼区",
	320111,
	"浦口区",
	320113,
	"栖霞区",
	320114,
	"雨花台区",
	320115,
	"江宁区",
	320116,
	"六合区",
	320117,
	"溧水区",
	320118,
	"高淳区",
	320200,
	"无锡市",
	320205,
	"锡山区",
	320206,
	"惠山区",
	320211,
	"滨湖区",
	320213,
	"梁溪区",
	320214,
	"新吴区",
	320281,
	"江阴市",
	320282,
	"宜兴市",
	320300,
	"徐州市",
	320302,
	"鼓楼区",
	320303,
	"云龙区",
	320305,
	"贾汪区",
	320311,
	"泉山区",
	320312,
	"铜山区",
	320321,
	"丰县",
	320322,
	"沛县",
	320324,
	"睢宁县",
	320381,
	"新沂市",
	320382,
	"邳州市",
	320400,
	"常州市",
	320402,
	"天宁区",
	320404,
	"钟楼区",
	320411,
	"新北区",
	320412,
	"武进区",
	320413,
	"金坛区",
	320481,
	"溧阳市",
	320500,
	"苏州市",
	320505,
	"虎丘区",
	320506,
	"吴中区",
	320507,
	"相城区",
	320508,
	"姑苏区",
	320509,
	"吴江区",
	320581,
	"常熟市",
	320582,
	"张家港市",
	320583,
	"昆山市",
	320585,
	"太仓市",
	320600,
	"南通市",
	320602,
	"崇川区",
	320611,
	"港闸区",
	320612,
	"通州区",
	320623,
	"如东县",
	320681,
	"启东市",
	320682,
	"如皋市",
	320684,
	"海门市",
	320685,
	"海安市",
	320700,
	"连云港市",
	320703,
	"连云区",
	320706,
	"海州区",
	320707,
	"赣榆区",
	320722,
	"东海县",
	320723,
	"灌云县",
	320724,
	"灌南县",
	320800,
	"淮安市",
	320803,
	"淮安区",
	320804,
	"淮阴区",
	320812,
	"清江浦区",
	320813,
	"洪泽区",
	320826,
	"涟水县",
	320830,
	"盱眙县",
	320831,
	"金湖县",
	320900,
	"盐城市",
	320902,
	"亭湖区",
	320903,
	"盐都区",
	320904,
	"大丰区",
	320921,
	"响水县",
	320922,
	"滨海县",
	320923,
	"阜宁县",
	320924,
	"射阳县",
	320925,
	"建湖县",
	320981,
	"东台市",
	321000,
	"扬州市",
	321002,
	"广陵区",
	321003,
	"邗江区",
	321012,
	"江都区",
	321023,
	"宝应县",
	321081,
	"仪征市",
	321084,
	"高邮市",
	321100,
	"镇江市",
	321102,
	"京口区",
	321111,
	"润州区",
	321112,
	"丹徒区",
	321181,
	"丹阳市",
	321182,
	"扬中市",
	321183,
	"句容市",
	321200,
	"泰州市",
	321202,
	"海陵区",
	321203,
	"高港区",
	321204,
	"姜堰区",
	321281,
	"兴化市",
	321282,
	"靖江市",
	321283,
	"泰兴市",
	321300,
	"宿迁市",
	321302,
	"宿城区",
	321311,
	"宿豫区",
	321322,
	"沭阳县",
	321323,
	"泗阳县",
	321324,
	"泗洪县",
	330000,
	"浙江省",
	330100,
	"杭州市",
	330102,
	"上城区",
	330103,
	"下城区",
	330104,
	"江干区",
	330105,
	"拱墅区",
	330106,
	"西湖区",
	330108,
	"滨江区",
	330109,
	"萧山区",
	330110,
	"余杭区",
	330111,
	"富阳区",
	330112,
	"临安区",
	330122,
	"桐庐县",
	330127,
	"淳安县",
	330182,
	"建德市",
	330200,
	"宁波市",
	330203,
	"海曙区",
	330205,
	"江北区",
	330206,
	"北仑区",
	330211,
	"镇海区",
	330212,
	"鄞州区",
	330213,
	"奉化区",
	330225,
	"象山县",
	330226,
	"宁海县",
	330281,
	"余姚市",
	330282,
	"慈溪市",
	330300,
	"温州市",
	330302,
	"鹿城区",
	330303,
	"龙湾区",
	330304,
	"瓯海区",
	330305,
	"洞头区",
	330324,
	"永嘉县",
	330326,
	"平阳县",
	330327,
	"苍南县",
	330328,
	"文成县",
	330329,
	"泰顺县",
	330381,
	"瑞安市",
	330382,
	"乐清市",
	330383,
	"龙港市",
	330400,
	"嘉兴市",
	330402,
	"南湖区",
	330411,
	"秀洲区",
	330421,
	"嘉善县",
	330424,
	"海盐县",
	330481,
	"海宁市",
	330482,
	"平湖市",
	330483,
	"桐乡市",
	330500,
	"湖州市",
	330502,
	"吴兴区",
	330503,
	"南浔区",
	330521,
	"德清县",
	330522,
	"长兴县",
	330523,
	"安吉县",
	330600,
	"绍兴市",
	330602,
	"越城区",
	330603,
	"柯桥区",
	330604,
	"上虞区",
	330624,
	"新昌县",
	330681,
	"诸暨市",
	330683,
	"嵊州市",
	330700,
	"金华市",
	330702,
	"婺城区",
	330703,
	"金东区",
	330723,
	"武义县",
	330726,
	"浦江县",
	330727,
	"磐安县",
	330781,
	"兰溪市",
	330782,
	"义乌市",
	330783,
	"东阳市",
	330784,
	"永康市",
	330800,
	"衢州市",
	330802,
	"柯城区",
	330803,
	"衢江区",
	330822,
	"常山县",
	330824,
	"开化县",
	330825,
	"龙游县",
	330881,
	"江山市",
	330900,
	"舟山市",
	330902,
	"定海区",
	330903,
	"普陀区",
	330921,
	"岱山县",
	330922,
	"嵊泗县",
	331000,
	"台州市",
	331002,
	"椒江区",
	331003,
	"黄岩区",
	331004,
	"路桥区",
	331022,
	"三门县",
	331023,
	"天台县",
	331024,
	"仙居县",
	331081,
	"温岭市",
	331082,
	"临海市",
	331083,
	"玉环市",
	331100,
	"丽水市",
	331102,
	"莲都区",
	331121,
	"青田县",
	331122,
	"缙云县",
	331123,
	"遂昌县",
	331124,
	"松阳县",
	331125,
	"云和县",
	331126,
	"庆元县",
	331127,
	"景宁畲族自治县",
	331181,
	"龙泉市",
	340000,
	"安徽省",
	340100,
	"合肥市",
	340102,
	"瑶海区",
	340103,
	"庐阳区",
	340104,
	"蜀山区",
	340111,
	"包河区",
	340121,
	"长丰县",
	340122,
	"肥东县",
	340123,
	"肥西县",
	340124,
	"庐江县",
	340181,
	"巢湖市",
	340200,
	"芜湖市",
	340202,
	"镜湖区",
	340203,
	"弋江区",
	340207,
	"鸠江区",
	340208,
	"三山区",
	340221,
	"芜湖县",
	340222,
	"繁昌县",
	340223,
	"南陵县",
	340281,
	"无为市",
	340300,
	"蚌埠市",
	340302,
	"龙子湖区",
	340303,
	"蚌山区",
	340304,
	"禹会区",
	340311,
	"淮上区",
	340321,
	"怀远县",
	340322,
	"五河县",
	340323,
	"固镇县",
	340400,
	"淮南市",
	340402,
	"大通区",
	340403,
	"田家庵区",
	340404,
	"谢家集区",
	340405,
	"八公山区",
	340406,
	"潘集区",
	340421,
	"凤台县",
	340422,
	"寿县",
	340500,
	"马鞍山市",
	340503,
	"花山区",
	340504,
	"雨山区",
	340506,
	"博望区",
	340521,
	"当涂县",
	340522,
	"含山县",
	340523,
	"和县",
	340600,
	"淮北市",
	340602,
	"杜集区",
	340603,
	"相山区",
	340604,
	"烈山区",
	340621,
	"濉溪县",
	340700,
	"铜陵市",
	340705,
	"铜官区",
	340706,
	"义安区",
	340711,
	"郊区",
	340722,
	"枞阳县",
	340800,
	"安庆市",
	340802,
	"迎江区",
	340803,
	"大观区",
	340811,
	"宜秀区",
	340822,
	"怀宁县",
	340825,
	"太湖县",
	340826,
	"宿松县",
	340827,
	"望江县",
	340828,
	"岳西县",
	340881,
	"桐城市",
	340882,
	"潜山市",
	341000,
	"黄山市",
	341002,
	"屯溪区",
	341003,
	"黄山区",
	341004,
	"徽州区",
	341021,
	"歙县",
	341022,
	"休宁县",
	341023,
	"黟县",
	341024,
	"祁门县",
	341100,
	"滁州市",
	341102,
	"琅琊区",
	341103,
	"南谯区",
	341122,
	"来安县",
	341124,
	"全椒县",
	341125,
	"定远县",
	341126,
	"凤阳县",
	341181,
	"天长市",
	341182,
	"明光市",
	341200,
	"阜阳市",
	341202,
	"颍州区",
	341203,
	"颍东区",
	341204,
	"颍泉区",
	341221,
	"临泉县",
	341222,
	"太和县",
	341225,
	"阜南县",
	341226,
	"颍上县",
	341282,
	"界首市",
	341300,
	"宿州市",
	341302,
	"埇桥区",
	341321,
	"砀山县",
	341322,
	"萧县",
	341323,
	"灵璧县",
	341324,
	"泗县",
	341500,
	"六安市",
	341502,
	"金安区",
	341503,
	"裕安区",
	341504,
	"叶集区",
	341522,
	"霍邱县",
	341523,
	"舒城县",
	341524,
	"金寨县",
	341525,
	"霍山县",
	341600,
	"亳州市",
	341602,
	"谯城区",
	341621,
	"涡阳县",
	341622,
	"蒙城县",
	341623,
	"利辛县",
	341700,
	"池州市",
	341702,
	"贵池区",
	341721,
	"东至县",
	341722,
	"石台县",
	341723,
	"青阳县",
	341800,
	"宣城市",
	341802,
	"宣州区",
	341821,
	"郎溪县",
	341823,
	"泾县",
	341824,
	"绩溪县",
	341825,
	"旌德县",
	341881,
	"宁国市",
	341882,
	"广德市",
	350000,
	"福建省",
	350100,
	"福州市",
	350102,
	"鼓楼区",
	350103,
	"台江区",
	350104,
	"仓山区",
	350105,
	"马尾区",
	350111,
	"晋安区",
	350112,
	"长乐区",
	350121,
	"闽侯县",
	350122,
	"连江县",
	350123,
	"罗源县",
	350124,
	"闽清县",
	350125,
	"永泰县",
	350128,
	"平潭县",
	350181,
	"福清市",
	350200,
	"厦门市",
	350203,
	"思明区",
	350205,
	"海沧区",
	350206,
	"湖里区",
	350211,
	"集美区",
	350212,
	"同安区",
	350213,
	"翔安区",
	350300,
	"莆田市",
	350302,
	"城厢区",
	350303,
	"涵江区",
	350304,
	"荔城区",
	350305,
	"秀屿区",
	350322,
	"仙游县",
	350400,
	"三明市",
	350402,
	"梅列区",
	350403,
	"三元区",
	350421,
	"明溪县",
	350423,
	"清流县",
	350424,
	"宁化县",
	350425,
	"大田县",
	350426,
	"尤溪县",
	350427,
	"沙县",
	350428,
	"将乐县",
	350429,
	"泰宁县",
	350430,
	"建宁县",
	350481,
	"永安市",
	350500,
	"泉州市",
	350502,
	"鲤城区",
	350503,
	"丰泽区",
	350504,
	"洛江区",
	350505,
	"泉港区",
	350521,
	"惠安县",
	350524,
	"安溪县",
	350525,
	"永春县",
	350526,
	"德化县",
	350527,
	"金门县",
	350581,
	"石狮市",
	350582,
	"晋江市",
	350583,
	"南安市",
	350600,
	"漳州市",
	350602,
	"芗城区",
	350603,
	"龙文区",
	350622,
	"云霄县",
	350623,
	"漳浦县",
	350624,
	"诏安县",
	350625,
	"长泰县",
	350626,
	"东山县",
	350627,
	"南靖县",
	350628,
	"平和县",
	350629,
	"华安县",
	350681,
	"龙海市",
	350700,
	"南平市",
	350702,
	"延平区",
	350703,
	"建阳区",
	350721,
	"顺昌县",
	350722,
	"浦城县",
	350723,
	"光泽县",
	350724,
	"松溪县",
	350725,
	"政和县",
	350781,
	"邵武市",
	350782,
	"武夷山市",
	350783,
	"建瓯市",
	350800,
	"龙岩市",
	350802,
	"新罗区",
	350803,
	"永定区",
	350821,
	"长汀县",
	350823,
	"上杭县",
	350824,
	"武平县",
	350825,
	"连城县",
	350881,
	"漳平市",
	350900,
	"宁德市",
	350902,
	"蕉城区",
	350921,
	"霞浦县",
	350922,
	"古田县",
	350923,
	"屏南县",
	350924,
	"寿宁县",
	350925,
	"周宁县",
	350926,
	"柘荣县",
	350981,
	"福安市",
	350982,
	"福鼎市",
	360000,
	"江西省",
	360100,
	"南昌市",
	360102,
	"东湖区",
	360103,
	"西湖区",
	360104,
	"青云谱区",
	360111,
	"青山湖区",
	360112,
	"新建区",
	360113,
	"红谷滩区",
	360121,
	"南昌县",
	360123,
	"安义县",
	360124,
	"进贤县",
	360200,
	"景德镇市",
	360202,
	"昌江区",
	360203,
	"珠山区",
	360222,
	"浮梁县",
	360281,
	"乐平市",
	360300,
	"萍乡市",
	360302,
	"安源区",
	360313,
	"湘东区",
	360321,
	"莲花县",
	360322,
	"上栗县",
	360323,
	"芦溪县",
	360400,
	"九江市",
	360402,
	"濂溪区",
	360403,
	"浔阳区",
	360404,
	"柴桑区",
	360423,
	"武宁县",
	360424,
	"修水县",
	360425,
	"永修县",
	360426,
	"德安县",
	360428,
	"都昌县",
	360429,
	"湖口县",
	360430,
	"彭泽县",
	360481,
	"瑞昌市",
	360482,
	"共青城市",
	360483,
	"庐山市",
	360500,
	"新余市",
	360502,
	"渝水区",
	360521,
	"分宜县",
	360600,
	"鹰潭市",
	360602,
	"月湖区",
	360603,
	"余江区",
	360681,
	"贵溪市",
	360700,
	"赣州市",
	360702,
	"章贡区",
	360703,
	"南康区",
	360704,
	"赣县区",
	360722,
	"信丰县",
	360723,
	"大余县",
	360724,
	"上犹县",
	360725,
	"崇义县",
	360726,
	"安远县",
	360727,
	"龙南县",
	360728,
	"定南县",
	360729,
	"全南县",
	360730,
	"宁都县",
	360731,
	"于都县",
	360732,
	"兴国县",
	360733,
	"会昌县",
	360734,
	"寻乌县",
	360735,
	"石城县",
	360781,
	"瑞金市",
	360800,
	"吉安市",
	360802,
	"吉州区",
	360803,
	"青原区",
	360821,
	"吉安县",
	360822,
	"吉水县",
	360823,
	"峡江县",
	360824,
	"新干县",
	360825,
	"永丰县",
	360826,
	"泰和县",
	360827,
	"遂川县",
	360828,
	"万安县",
	360829,
	"安福县",
	360830,
	"永新县",
	360881,
	"井冈山市",
	360900,
	"宜春市",
	360902,
	"袁州区",
	360921,
	"奉新县",
	360922,
	"万载县",
	360923,
	"上高县",
	360924,
	"宜丰县",
	360925,
	"靖安县",
	360926,
	"铜鼓县",
	360981,
	"丰城市",
	360982,
	"樟树市",
	360983,
	"高安市",
	361000,
	"抚州市",
	361002,
	"临川区",
	361003,
	"东乡区",
	361021,
	"南城县",
	361022,
	"黎川县",
	361023,
	"南丰县",
	361024,
	"崇仁县",
	361025,
	"乐安县",
	361026,
	"宜黄县",
	361027,
	"金溪县",
	361028,
	"资溪县",
	361030,
	"广昌县",
	361100,
	"上饶市",
	361102,
	"信州区",
	361103,
	"广丰区",
	361104,
	"广信区",
	361123,
	"玉山县",
	361124,
	"铅山县",
	361125,
	"横峰县",
	361126,
	"弋阳县",
	361127,
	"余干县",
	361128,
	"鄱阳县",
	361129,
	"万年县",
	361130,
	"婺源县",
	361181,
	"德兴市",
	370000,
	"山东省",
	370100,
	"济南市",
	370102,
	"历下区",
	370103,
	"市中区",
	370104,
	"槐荫区",
	370105,
	"天桥区",
	370112,
	"历城区",
	370113,
	"长清区",
	370114,
	"章丘区",
	370115,
	"济阳区",
	370116,
	"莱芜区",
	370117,
	"钢城区",
	370124,
	"平阴县",
	370126,
	"商河县",
	370200,
	"青岛市",
	370202,
	"市南区",
	370203,
	"市北区",
	370211,
	"黄岛区",
	370212,
	"崂山区",
	370213,
	"李沧区",
	370214,
	"城阳区",
	370215,
	"即墨区",
	370281,
	"胶州市",
	370283,
	"平度市",
	370285,
	"莱西市",
	370300,
	"淄博市",
	370302,
	"淄川区",
	370303,
	"张店区",
	370304,
	"博山区",
	370305,
	"临淄区",
	370306,
	"周村区",
	370321,
	"桓台县",
	370322,
	"高青县",
	370323,
	"沂源县",
	370400,
	"枣庄市",
	370402,
	"市中区",
	370403,
	"薛城区",
	370404,
	"峄城区",
	370405,
	"台儿庄区",
	370406,
	"山亭区",
	370481,
	"滕州市",
	370500,
	"东营市",
	370502,
	"东营区",
	370503,
	"河口区",
	370505,
	"垦利区",
	370522,
	"利津县",
	370523,
	"广饶县",
	370600,
	"烟台市",
	370602,
	"芝罘区",
	370611,
	"福山区",
	370612,
	"牟平区",
	370613,
	"莱山区",
	370634,
	"长岛县",
	370681,
	"龙口市",
	370682,
	"莱阳市",
	370683,
	"莱州市",
	370684,
	"蓬莱市",
	370685,
	"招远市",
	370686,
	"栖霞市",
	370687,
	"海阳市",
	370700,
	"潍坊市",
	370702,
	"潍城区",
	370703,
	"寒亭区",
	370704,
	"坊子区",
	370705,
	"奎文区",
	370724,
	"临朐县",
	370725,
	"昌乐县",
	370781,
	"青州市",
	370782,
	"诸城市",
	370783,
	"寿光市",
	370784,
	"安丘市",
	370785,
	"高密市",
	370786,
	"昌邑市",
	370800,
	"济宁市",
	370811,
	"任城区",
	370812,
	"兖州区",
	370826,
	"微山县",
	370827,
	"鱼台县",
	370828,
	"金乡县",
	370829,
	"嘉祥县",
	370830,
	"汶上县",
	370831,
	"泗水县",
	370832,
	"梁山县",
	370881,
	"曲阜市",
	370883,
	"邹城市",
	370900,
	"泰安市",
	370902,
	"泰山区",
	370911,
	"岱岳区",
	370921,
	"宁阳县",
	370923,
	"东平县",
	370982,
	"新泰市",
	370983,
	"肥城市",
	371000,
	"威海市",
	371002,
	"环翠区",
	371003,
	"文登区",
	371082,
	"荣成市",
	371083,
	"乳山市",
	371100,
	"日照市",
	371102,
	"东港区",
	371103,
	"岚山区",
	371121,
	"五莲县",
	371122,
	"莒县",
	371300,
	"临沂市",
	371302,
	"兰山区",
	371311,
	"罗庄区",
	371312,
	"河东区",
	371321,
	"沂南县",
	371322,
	"郯城县",
	371323,
	"沂水县",
	371324,
	"兰陵县",
	371325,
	"费县",
	371326,
	"平邑县",
	371327,
	"莒南县",
	371328,
	"蒙阴县",
	371329,
	"临沭县",
	371400,
	"德州市",
	371402,
	"德城区",
	371403,
	"陵城区",
	371422,
	"宁津县",
	371423,
	"庆云县",
	371424,
	"临邑县",
	371425,
	"齐河县",
	371426,
	"平原县",
	371427,
	"夏津县",
	371428,
	"武城县",
	371481,
	"乐陵市",
	371482,
	"禹城市",
	371500,
	"聊城市",
	371502,
	"东昌府区",
	371503,
	"茌平区",
	371521,
	"阳谷县",
	371522,
	"莘县",
	371524,
	"东阿县",
	371525,
	"冠县",
	371526,
	"高唐县",
	371581,
	"临清市",
	371600,
	"滨州市",
	371602,
	"滨城区",
	371603,
	"沾化区",
	371621,
	"惠民县",
	371622,
	"阳信县",
	371623,
	"无棣县",
	371625,
	"博兴县",
	371681,
	"邹平市",
	371700,
	"菏泽市",
	371702,
	"牡丹区",
	371703,
	"定陶区",
	371721,
	"曹县",
	371722,
	"单县",
	371723,
	"成武县",
	371724,
	"巨野县",
	371725,
	"郓城县",
	371726,
	"鄄城县",
	371728,
	"东明县",
	410000,
	"河南省",
	410100,
	"郑州市",
	410102,
	"中原区",
	410103,
	"二七区",
	410104,
	"管城回族区",
	410105,
	"金水区",
	410106,
	"上街区",
	410108,
	"惠济区",
	410122,
	"中牟县",
	410181,
	"巩义市",
	410182,
	"荥阳市",
	410183,
	"新密市",
	410184,
	"新郑市",
	410185,
	"登封市",
	410200,
	"开封市",
	410202,
	"龙亭区",
	410203,
	"顺河回族区",
	410204,
	"鼓楼区",
	410205,
	"禹王台区",
	410212,
	"祥符区",
	410221,
	"杞县",
	410222,
	"通许县",
	410223,
	"尉氏县",
	410225,
	"兰考县",
	410300,
	"洛阳市",
	410302,
	"老城区",
	410303,
	"西工区",
	410304,
	"瀍河回族区",
	410305,
	"涧西区",
	410306,
	"吉利区",
	410311,
	"洛龙区",
	410322,
	"孟津县",
	410323,
	"新安县",
	410324,
	"栾川县",
	410325,
	"嵩县",
	410326,
	"汝阳县",
	410327,
	"宜阳县",
	410328,
	"洛宁县",
	410329,
	"伊川县",
	410381,
	"偃师市",
	410400,
	"平顶山市",
	410402,
	"新华区",
	410403,
	"卫东区",
	410404,
	"石龙区",
	410411,
	"湛河区",
	410421,
	"宝丰县",
	410422,
	"叶县",
	410423,
	"鲁山县",
	410425,
	"郏县",
	410481,
	"舞钢市",
	410482,
	"汝州市",
	410500,
	"安阳市",
	410502,
	"文峰区",
	410503,
	"北关区",
	410505,
	"殷都区",
	410506,
	"龙安区",
	410522,
	"安阳县",
	410523,
	"汤阴县",
	410526,
	"滑县",
	410527,
	"内黄县",
	410581,
	"林州市",
	410600,
	"鹤壁市",
	410602,
	"鹤山区",
	410603,
	"山城区",
	410611,
	"淇滨区",
	410621,
	"浚县",
	410622,
	"淇县",
	410700,
	"新乡市",
	410702,
	"红旗区",
	410703,
	"卫滨区",
	410704,
	"凤泉区",
	410711,
	"牧野区",
	410721,
	"新乡县",
	410724,
	"获嘉县",
	410725,
	"原阳县",
	410726,
	"延津县",
	410727,
	"封丘县",
	410781,
	"卫辉市",
	410782,
	"辉县市",
	410783,
	"长垣市",
	410800,
	"焦作市",
	410802,
	"解放区",
	410803,
	"中站区",
	410804,
	"马村区",
	410811,
	"山阳区",
	410821,
	"修武县",
	410822,
	"博爱县",
	410823,
	"武陟县",
	410825,
	"温县",
	410882,
	"沁阳市",
	410883,
	"孟州市",
	410900,
	"濮阳市",
	410902,
	"华龙区",
	410922,
	"清丰县",
	410923,
	"南乐县",
	410926,
	"范县",
	410927,
	"台前县",
	410928,
	"濮阳县",
	411000,
	"许昌市",
	411002,
	"魏都区",
	411003,
	"建安区",
	411024,
	"鄢陵县",
	411025,
	"襄城县",
	411081,
	"禹州市",
	411082,
	"长葛市",
	411100,
	"漯河市",
	411102,
	"源汇区",
	411103,
	"郾城区",
	411104,
	"召陵区",
	411121,
	"舞阳县",
	411122,
	"临颍县",
	411200,
	"三门峡市",
	411202,
	"湖滨区",
	411203,
	"陕州区",
	411221,
	"渑池县",
	411224,
	"卢氏县",
	411281,
	"义马市",
	411282,
	"灵宝市",
	411300,
	"南阳市",
	411302,
	"宛城区",
	411303,
	"卧龙区",
	411321,
	"南召县",
	411322,
	"方城县",
	411323,
	"西峡县",
	411324,
	"镇平县",
	411325,
	"内乡县",
	411326,
	"淅川县",
	411327,
	"社旗县",
	411328,
	"唐河县",
	411329,
	"新野县",
	411330,
	"桐柏县",
	411381,
	"邓州市",
	411400,
	"商丘市",
	411402,
	"梁园区",
	411403,
	"睢阳区",
	411421,
	"民权县",
	411422,
	"睢县",
	411423,
	"宁陵县",
	411424,
	"柘城县",
	411425,
	"虞城县",
	411426,
	"夏邑县",
	411481,
	"永城市",
	411500,
	"信阳市",
	411502,
	"浉河区",
	411503,
	"平桥区",
	411521,
	"罗山县",
	411522,
	"光山县",
	411523,
	"新县",
	411524,
	"商城县",
	411525,
	"固始县",
	411526,
	"潢川县",
	411527,
	"淮滨县",
	411528,
	"息县",
	411600,
	"周口市",
	411602,
	"川汇区",
	411603,
	"淮阳区",
	411621,
	"扶沟县",
	411622,
	"西华县",
	411623,
	"商水县",
	411624,
	"沈丘县",
	411625,
	"郸城县",
	411627,
	"太康县",
	411628,
	"鹿邑县",
	411681,
	"项城市",
	411700,
	"驻马店市",
	411702,
	"驿城区",
	411721,
	"西平县",
	411722,
	"上蔡县",
	411723,
	"平舆县",
	411724,
	"正阳县",
	411725,
	"确山县",
	411726,
	"泌阳县",
	411727,
	"汝南县",
	411728,
	"遂平县",
	411729,
	"新蔡县",
	419001,
	"济源市",
	420000,
	"湖北省",
	420100,
	"武汉市",
	420102,
	"江岸区",
	420103,
	"江汉区",
	420104,
	"硚口区",
	420105,
	"汉阳区",
	420106,
	"武昌区",
	420107,
	"青山区",
	420111,
	"洪山区",
	420112,
	"东西湖区",
	420113,
	"汉南区",
	420114,
	"蔡甸区",
	420115,
	"江夏区",
	420116,
	"黄陂区",
	420117,
	"新洲区",
	420200,
	"黄石市",
	420202,
	"黄石港区",
	420203,
	"西塞山区",
	420204,
	"下陆区",
	420205,
	"铁山区",
	420222,
	"阳新县",
	420281,
	"大冶市",
	420300,
	"十堰市",
	420302,
	"茅箭区",
	420303,
	"张湾区",
	420304,
	"郧阳区",
	420322,
	"郧西县",
	420323,
	"竹山县",
	420324,
	"竹溪县",
	420325,
	"房县",
	420381,
	"丹江口市",
	420500,
	"宜昌市",
	420502,
	"西陵区",
	420503,
	"伍家岗区",
	420504,
	"点军区",
	420505,
	"猇亭区",
	420506,
	"夷陵区",
	420525,
	"远安县",
	420526,
	"兴山县",
	420527,
	"秭归县",
	420528,
	"长阳土家族自治县",
	420529,
	"五峰土家族自治县",
	420581,
	"宜都市",
	420582,
	"当阳市",
	420583,
	"枝江市",
	420600,
	"襄阳市",
	420602,
	"襄城区",
	420606,
	"樊城区",
	420607,
	"襄州区",
	420624,
	"南漳县",
	420625,
	"谷城县",
	420626,
	"保康县",
	420682,
	"老河口市",
	420683,
	"枣阳市",
	420684,
	"宜城市",
	420700,
	"鄂州市",
	420702,
	"梁子湖区",
	420703,
	"华容区",
	420704,
	"鄂城区",
	420800,
	"荆门市",
	420802,
	"东宝区",
	420804,
	"掇刀区",
	420822,
	"沙洋县",
	420881,
	"钟祥市",
	420882,
	"京山市",
	420900,
	"孝感市",
	420902,
	"孝南区",
	420921,
	"孝昌县",
	420922,
	"大悟县",
	420923,
	"云梦县",
	420981,
	"应城市",
	420982,
	"安陆市",
	420984,
	"汉川市",
	421000,
	"荆州市",
	421002,
	"沙市区",
	421003,
	"荆州区",
	421022,
	"公安县",
	421023,
	"监利县",
	421024,
	"江陵县",
	421081,
	"石首市",
	421083,
	"洪湖市",
	421087,
	"松滋市",
	421100,
	"黄冈市",
	421102,
	"黄州区",
	421121,
	"团风县",
	421122,
	"红安县",
	421123,
	"罗田县",
	421124,
	"英山县",
	421125,
	"浠水县",
	421126,
	"蕲春县",
	421127,
	"黄梅县",
	421181,
	"麻城市",
	421182,
	"武穴市",
	421200,
	"咸宁市",
	421202,
	"咸安区",
	421221,
	"嘉鱼县",
	421222,
	"通城县",
	421223,
	"崇阳县",
	421224,
	"通山县",
	421281,
	"赤壁市",
	421300,
	"随州市",
	421303,
	"曾都区",
	421321,
	"随县",
	421381,
	"广水市",
	422800,
	"恩施土家族苗族自治州",
	422801,
	"恩施市",
	422802,
	"利川市",
	422822,
	"建始县",
	422823,
	"巴东县",
	422825,
	"宣恩县",
	422826,
	"咸丰县",
	422827,
	"来凤县",
	422828,
	"鹤峰县",
	429004,
	"仙桃市",
	429005,
	"潜江市",
	429006,
	"天门市",
	429021,
	"神农架林区",
	430000,
	"湖南省",
	430100,
	"长沙市",
	430102,
	"芙蓉区",
	430103,
	"天心区",
	430104,
	"岳麓区",
	430105,
	"开福区",
	430111,
	"雨花区",
	430112,
	"望城区",
	430121,
	"长沙县",
	430181,
	"浏阳市",
	430182,
	"宁乡市",
	430200,
	"株洲市",
	430202,
	"荷塘区",
	430203,
	"芦淞区",
	430204,
	"石峰区",
	430211,
	"天元区",
	430212,
	"渌口区",
	430223,
	"攸县",
	430224,
	"茶陵县",
	430225,
	"炎陵县",
	430281,
	"醴陵市",
	430300,
	"湘潭市",
	430302,
	"雨湖区",
	430304,
	"岳塘区",
	430321,
	"湘潭县",
	430381,
	"湘乡市",
	430382,
	"韶山市",
	430400,
	"衡阳市",
	430405,
	"珠晖区",
	430406,
	"雁峰区",
	430407,
	"石鼓区",
	430408,
	"蒸湘区",
	430412,
	"南岳区",
	430421,
	"衡阳县",
	430422,
	"衡南县",
	430423,
	"衡山县",
	430424,
	"衡东县",
	430426,
	"祁东县",
	430481,
	"耒阳市",
	430482,
	"常宁市",
	430500,
	"邵阳市",
	430502,
	"双清区",
	430503,
	"大祥区",
	430511,
	"北塔区",
	430522,
	"新邵县",
	430523,
	"邵阳县",
	430524,
	"隆回县",
	430525,
	"洞口县",
	430527,
	"绥宁县",
	430528,
	"新宁县",
	430529,
	"城步苗族自治县",
	430581,
	"武冈市",
	430582,
	"邵东市",
	430600,
	"岳阳市",
	430602,
	"岳阳楼区",
	430603,
	"云溪区",
	430611,
	"君山区",
	430621,
	"岳阳县",
	430623,
	"华容县",
	430624,
	"湘阴县",
	430626,
	"平江县",
	430681,
	"汨罗市",
	430682,
	"临湘市",
	430700,
	"常德市",
	430702,
	"武陵区",
	430703,
	"鼎城区",
	430721,
	"安乡县",
	430722,
	"汉寿县",
	430723,
	"澧县",
	430724,
	"临澧县",
	430725,
	"桃源县",
	430726,
	"石门县",
	430781,
	"津市市",
	430800,
	"张家界市",
	430802,
	"永定区",
	430811,
	"武陵源区",
	430821,
	"慈利县",
	430822,
	"桑植县",
	430900,
	"益阳市",
	430902,
	"资阳区",
	430903,
	"赫山区",
	430921,
	"南县",
	430922,
	"桃江县",
	430923,
	"安化县",
	430981,
	"沅江市",
	431000,
	"郴州市",
	431002,
	"北湖区",
	431003,
	"苏仙区",
	431021,
	"桂阳县",
	431022,
	"宜章县",
	431023,
	"永兴县",
	431024,
	"嘉禾县",
	431025,
	"临武县",
	431026,
	"汝城县",
	431027,
	"桂东县",
	431028,
	"安仁县",
	431081,
	"资兴市",
	431100,
	"永州市",
	431102,
	"零陵区",
	431103,
	"冷水滩区",
	431121,
	"祁阳县",
	431122,
	"东安县",
	431123,
	"双牌县",
	431124,
	"道县",
	431125,
	"江永县",
	431126,
	"宁远县",
	431127,
	"蓝山县",
	431128,
	"新田县",
	431129,
	"江华瑶族自治县",
	431200,
	"怀化市",
	431202,
	"鹤城区",
	431221,
	"中方县",
	431222,
	"沅陵县",
	431223,
	"辰溪县",
	431224,
	"溆浦县",
	431225,
	"会同县",
	431226,
	"麻阳苗族自治县",
	431227,
	"新晃侗族自治县",
	431228,
	"芷江侗族自治县",
	431229,
	"靖州苗族侗族自治县",
	431230,
	"通道侗族自治县",
	431281,
	"洪江市",
	431300,
	"娄底市",
	431302,
	"娄星区",
	431321,
	"双峰县",
	431322,
	"新化县",
	431381,
	"冷水江市",
	431382,
	"涟源市",
	433100,
	"湘西土家族苗族自治州",
	433101,
	"吉首市",
	433122,
	"泸溪县",
	433123,
	"凤凰县",
	433124,
	"花垣县",
	433125,
	"保靖县",
	433126,
	"古丈县",
	433127,
	"永顺县",
	433130,
	"龙山县",
	440000,
	"广东省",
	440100,
	"广州市",
	440103,
	"荔湾区",
	440104,
	"越秀区",
	440105,
	"海珠区",
	440106,
	"天河区",
	440111,
	"白云区",
	440112,
	"黄埔区",
	440113,
	"番禺区",
	440114,
	"花都区",
	440115,
	"南沙区",
	440117,
	"从化区",
	440118,
	"增城区",
	440200,
	"韶关市",
	440203,
	"武江区",
	440204,
	"浈江区",
	440205,
	"曲江区",
	440222,
	"始兴县",
	440224,
	"仁化县",
	440229,
	"翁源县",
	440232,
	"乳源瑶族自治县",
	440233,
	"新丰县",
	440281,
	"乐昌市",
	440282,
	"南雄市",
	440300,
	"深圳市",
	440303,
	"罗湖区",
	440304,
	"福田区",
	440305,
	"南山区",
	440306,
	"宝安区",
	440307,
	"龙岗区",
	440308,
	"盐田区",
	440309,
	"龙华区",
	440310,
	"坪山区",
	440311,
	"光明区",
	440400,
	"珠海市",
	440402,
	"香洲区",
	440403,
	"斗门区",
	440404,
	"金湾区",
	440500,
	"汕头市",
	440507,
	"龙湖区",
	440511,
	"金平区",
	440512,
	"濠江区",
	440513,
	"潮阳区",
	440514,
	"潮南区",
	440515,
	"澄海区",
	440523,
	"南澳县",
	440600,
	"佛山市",
	440604,
	"禅城区",
	440605,
	"南海区",
	440606,
	"顺德区",
	440607,
	"三水区",
	440608,
	"高明区",
	440700,
	"江门市",
	440703,
	"蓬江区",
	440704,
	"江海区",
	440705,
	"新会区",
	440781,
	"台山市",
	440783,
	"开平市",
	440784,
	"鹤山市",
	440785,
	"恩平市",
	440800,
	"湛江市",
	440802,
	"赤坎区",
	440803,
	"霞山区",
	440804,
	"坡头区",
	440811,
	"麻章区",
	440823,
	"遂溪县",
	440825,
	"徐闻县",
	440881,
	"廉江市",
	440882,
	"雷州市",
	440883,
	"吴川市",
	440900,
	"茂名市",
	440902,
	"茂南区",
	440904,
	"电白区",
	440981,
	"高州市",
	440982,
	"化州市",
	440983,
	"信宜市",
	441200,
	"肇庆市",
	441202,
	"端州区",
	441203,
	"鼎湖区",
	441204,
	"高要区",
	441223,
	"广宁县",
	441224,
	"怀集县",
	441225,
	"封开县",
	441226,
	"德庆县",
	441284,
	"四会市",
	441300,
	"惠州市",
	441302,
	"惠城区",
	441303,
	"惠阳区",
	441322,
	"博罗县",
	441323,
	"惠东县",
	441324,
	"龙门县",
	441400,
	"梅州市",
	441402,
	"梅江区",
	441403,
	"梅县区",
	441422,
	"大埔县",
	441423,
	"丰顺县",
	441424,
	"五华县",
	441426,
	"平远县",
	441427,
	"蕉岭县",
	441481,
	"兴宁市",
	441500,
	"汕尾市",
	441502,
	"城区",
	441521,
	"海丰县",
	441523,
	"陆河县",
	441581,
	"陆丰市",
	441600,
	"河源市",
	441602,
	"源城区",
	441621,
	"紫金县",
	441622,
	"龙川县",
	441623,
	"连平县",
	441624,
	"和平县",
	441625,
	"东源县",
	441700,
	"阳江市",
	441702,
	"江城区",
	441704,
	"阳东区",
	441721,
	"阳西县",
	441781,
	"阳春市",
	441800,
	"清远市",
	441802,
	"清城区",
	441803,
	"清新区",
	441821,
	"佛冈县",
	441823,
	"阳山县",
	441825,
	"连山壮族瑶族自治县",
	441826,
	"连南瑶族自治县",
	441881,
	"英德市",
	441882,
	"连州市",
	441900,
	"东莞市",
	442000,
	"中山市",
	445100,
	"潮州市",
	445102,
	"湘桥区",
	445103,
	"潮安区",
	445122,
	"饶平县",
	445200,
	"揭阳市",
	445202,
	"榕城区",
	445203,
	"揭东区",
	445222,
	"揭西县",
	445224,
	"惠来县",
	445281,
	"普宁市",
	445300,
	"云浮市",
	445302,
	"云城区",
	445303,
	"云安区",
	445321,
	"新兴县",
	445322,
	"郁南县",
	445381,
	"罗定市",
	450000,
	"广西壮族自治区",
	450100,
	"南宁市",
	450102,
	"兴宁区",
	450103,
	"青秀区",
	450105,
	"江南区",
	450107,
	"西乡塘区",
	450108,
	"良庆区",
	450109,
	"邕宁区",
	450110,
	"武鸣区",
	450123,
	"隆安县",
	450124,
	"马山县",
	450125,
	"上林县",
	450126,
	"宾阳县",
	450127,
	"横县",
	450200,
	"柳州市",
	450202,
	"城中区",
	450203,
	"鱼峰区",
	450204,
	"柳南区",
	450205,
	"柳北区",
	450206,
	"柳江区",
	450222,
	"柳城县",
	450223,
	"鹿寨县",
	450224,
	"融安县",
	450225,
	"融水苗族自治县",
	450226,
	"三江侗族自治县",
	450300,
	"桂林市",
	450302,
	"秀峰区",
	450303,
	"叠彩区",
	450304,
	"象山区",
	450305,
	"七星区",
	450311,
	"雁山区",
	450312,
	"临桂区",
	450321,
	"阳朔县",
	450323,
	"灵川县",
	450324,
	"全州县",
	450325,
	"兴安县",
	450326,
	"永福县",
	450327,
	"灌阳县",
	450328,
	"龙胜各族自治县",
	450329,
	"资源县",
	450330,
	"平乐县",
	450381,
	"荔浦市",
	450332,
	"恭城瑶族自治县",
	450400,
	"梧州市",
	450403,
	"万秀区",
	450405,
	"长洲区",
	450406,
	"龙圩区",
	450421,
	"苍梧县",
	450422,
	"藤县",
	450423,
	"蒙山县",
	450481,
	"岑溪市",
	450500,
	"北海市",
	450502,
	"海城区",
	450503,
	"银海区",
	450512,
	"铁山港区",
	450521,
	"合浦县",
	450600,
	"防城港市",
	450602,
	"港口区",
	450603,
	"防城区",
	450621,
	"上思县",
	450681,
	"东兴市",
	450700,
	"钦州市",
	450702,
	"钦南区",
	450703,
	"钦北区",
	450721,
	"灵山县",
	450722,
	"浦北县",
	450800,
	"贵港市",
	450802,
	"港北区",
	450803,
	"港南区",
	450804,
	"覃塘区",
	450821,
	"平南县",
	450881,
	"桂平市",
	450900,
	"玉林市",
	450902,
	"玉州区",
	450903,
	"福绵区",
	450921,
	"容县",
	450922,
	"陆川县",
	450923,
	"博白县",
	450924,
	"兴业县",
	450981,
	"北流市",
	451000,
	"百色市",
	451002,
	"右江区",
	451003,
	"田阳区",
	451022,
	"田东县",
	451024,
	"德保县",
	451026,
	"那坡县",
	451027,
	"凌云县",
	451028,
	"乐业县",
	451029,
	"田林县",
	451030,
	"西林县",
	451031,
	"隆林各族自治县",
	451081,
	"靖西市",
	451082,
	"平果市",
	451100,
	"贺州市",
	451102,
	"八步区",
	451103,
	"平桂区",
	451121,
	"昭平县",
	451122,
	"钟山县",
	451123,
	"富川瑶族自治县",
	451200,
	"河池市",
	451202,
	"金城江区",
	451203,
	"宜州区",
	451221,
	"南丹县",
	451222,
	"天峨县",
	451223,
	"凤山县",
	451224,
	"东兰县",
	451225,
	"罗城仫佬族自治县",
	451226,
	"环江毛南族自治县",
	451227,
	"巴马瑶族自治县",
	451228,
	"都安瑶族自治县",
	451229,
	"大化瑶族自治县",
	451300,
	"来宾市",
	451302,
	"兴宾区",
	451321,
	"忻城县",
	451322,
	"象州县",
	451323,
	"武宣县",
	451324,
	"金秀瑶族自治县",
	451381,
	"合山市",
	451400,
	"崇左市",
	451402,
	"江州区",
	451421,
	"扶绥县",
	451422,
	"宁明县",
	451423,
	"龙州县",
	451424,
	"大新县",
	451425,
	"天等县",
	451481,
	"凭祥市",
	460000,
	"海南省",
	460100,
	"海口市",
	460105,
	"秀英区",
	460106,
	"龙华区",
	460107,
	"琼山区",
	460108,
	"美兰区",
	460200,
	"三亚市",
	460202,
	"海棠区",
	460203,
	"吉阳区",
	460204,
	"天涯区",
	460205,
	"崖州区",
	460300,
	"三沙市",
	460400,
	"儋州市",
	469001,
	"五指山市",
	469002,
	"琼海市",
	469005,
	"文昌市",
	469006,
	"万宁市",
	469007,
	"东方市",
	469021,
	"定安县",
	469022,
	"屯昌县",
	469023,
	"澄迈县",
	469024,
	"临高县",
	469025,
	"白沙黎族自治县",
	469026,
	"昌江黎族自治县",
	469027,
	"乐东黎族自治县",
	469028,
	"陵水黎族自治县",
	469029,
	"保亭黎族苗族自治县",
	469030,
	"琼中黎族苗族自治县",
	500000,
	"重庆市",
	500101,
	"万州区",
	500102,
	"涪陵区",
	500103,
	"渝中区",
	500104,
	"大渡口区",
	500105,
	"江北区",
	500106,
	"沙坪坝区",
	500107,
	"九龙坡区",
	500108,
	"南岸区",
	500109,
	"北碚区",
	500110,
	"綦江区",
	500111,
	"大足区",
	500112,
	"渝北区",
	500113,
	"巴南区",
	500114,
	"黔江区",
	500115,
	"长寿区",
	500116,
	"江津区",
	500117,
	"合川区",
	500118,
	"永川区",
	500119,
	"南川区",
	500120,
	"璧山区",
	500151,
	"铜梁区",
	500152,
	"潼南区",
	500153,
	"荣昌区",
	500154,
	"开州区",
	500155,
	"梁平区",
	500156,
	"武隆区",
	500229,
	"城口县",
	500230,
	"丰都县",
	500231,
	"垫江县",
	500233,
	"忠县",
	500235,
	"云阳县",
	500236,
	"奉节县",
	500237,
	"巫山县",
	500238,
	"巫溪县",
	500240,
	"石柱土家族自治县",
	500241,
	"秀山土家族苗族自治县",
	500242,
	"酉阳土家族苗族自治县",
	500243,
	"彭水苗族土家族自治县",
	510000,
	"四川省",
	510100,
	"成都市",
	510104,
	"锦江区",
	510105,
	"青羊区",
	510106,
	"金牛区",
	510107,
	"武侯区",
	510108,
	"成华区",
	510112,
	"龙泉驿区",
	510113,
	"青白江区",
	510114,
	"新都区",
	510115,
	"温江区",
	510116,
	"双流区",
	510117,
	"郫都区",
	510121,
	"金堂县",
	510129,
	"大邑县",
	510131,
	"蒲江县",
	510132,
	"新津县",
	510181,
	"都江堰市",
	510182,
	"彭州市",
	510183,
	"邛崃市",
	510184,
	"崇州市",
	510185,
	"简阳市",
	510300,
	"自贡市",
	510302,
	"自流井区",
	510303,
	"贡井区",
	510304,
	"大安区",
	510311,
	"沿滩区",
	510321,
	"荣县",
	510322,
	"富顺县",
	510400,
	"攀枝花市",
	510402,
	"东区",
	510403,
	"西区",
	510411,
	"仁和区",
	510421,
	"米易县",
	510422,
	"盐边县",
	510500,
	"泸州市",
	510502,
	"江阳区",
	510503,
	"纳溪区",
	510504,
	"龙马潭区",
	510521,
	"泸县",
	510522,
	"合江县",
	510524,
	"叙永县",
	510525,
	"古蔺县",
	510600,
	"德阳市",
	510603,
	"旌阳区",
	510604,
	"罗江区",
	510623,
	"中江县",
	510681,
	"广汉市",
	510682,
	"什邡市",
	510683,
	"绵竹市",
	510700,
	"绵阳市",
	510703,
	"涪城区",
	510704,
	"游仙区",
	510705,
	"安州区",
	510722,
	"三台县",
	510723,
	"盐亭县",
	510725,
	"梓潼县",
	510726,
	"北川羌族自治县",
	510727,
	"平武县",
	510781,
	"江油市",
	510800,
	"广元市",
	510802,
	"利州区",
	510811,
	"昭化区",
	510812,
	"朝天区",
	510821,
	"旺苍县",
	510822,
	"青川县",
	510823,
	"剑阁县",
	510824,
	"苍溪县",
	510900,
	"遂宁市",
	510903,
	"船山区",
	510904,
	"安居区",
	510921,
	"蓬溪县",
	510923,
	"大英县",
	510981,
	"射洪市",
	511000,
	"内江市",
	511002,
	"市中区",
	511011,
	"东兴区",
	511024,
	"威远县",
	511025,
	"资中县",
	511083,
	"隆昌市",
	511100,
	"乐山市",
	511102,
	"市中区",
	511111,
	"沙湾区",
	511112,
	"五通桥区",
	511113,
	"金口河区",
	511123,
	"犍为县",
	511124,
	"井研县",
	511126,
	"夹江县",
	511129,
	"沐川县",
	511132,
	"峨边彝族自治县",
	511133,
	"马边彝族自治县",
	511181,
	"峨眉山市",
	511300,
	"南充市",
	511302,
	"顺庆区",
	511303,
	"高坪区",
	511304,
	"嘉陵区",
	511321,
	"南部县",
	511322,
	"营山县",
	511323,
	"蓬安县",
	511324,
	"仪陇县",
	511325,
	"西充县",
	511381,
	"阆中市",
	511400,
	"眉山市",
	511402,
	"东坡区",
	511403,
	"彭山区",
	511421,
	"仁寿县",
	511423,
	"洪雅县",
	511424,
	"丹棱县",
	511425,
	"青神县",
	511500,
	"宜宾市",
	511502,
	"翠屏区",
	511503,
	"南溪区",
	511504,
	"叙州区",
	511523,
	"江安县",
	511524,
	"长宁县",
	511525,
	"高县",
	511526,
	"珙县",
	511527,
	"筠连县",
	511528,
	"兴文县",
	511529,
	"屏山县",
	511600,
	"广安市",
	511602,
	"广安区",
	511603,
	"前锋区",
	511621,
	"岳池县",
	511622,
	"武胜县",
	511623,
	"邻水县",
	511681,
	"华蓥市",
	511700,
	"达州市",
	511702,
	"通川区",
	511703,
	"达川区",
	511722,
	"宣汉县",
	511723,
	"开江县",
	511724,
	"大竹县",
	511725,
	"渠县",
	511781,
	"万源市",
	511800,
	"雅安市",
	511802,
	"雨城区",
	511803,
	"名山区",
	511822,
	"荥经县",
	511823,
	"汉源县",
	511824,
	"石棉县",
	511825,
	"天全县",
	511826,
	"芦山县",
	511827,
	"宝兴县",
	511900,
	"巴中市",
	511902,
	"巴州区",
	511903,
	"恩阳区",
	511921,
	"通江县",
	511922,
	"南江县",
	511923,
	"平昌县",
	512000,
	"资阳市",
	512002,
	"雁江区",
	512021,
	"安岳县",
	512022,
	"乐至县",
	513200,
	"阿坝藏族羌族自治州",
	513201,
	"马尔康市",
	513221,
	"汶川县",
	513222,
	"理县",
	513223,
	"茂县",
	513224,
	"松潘县",
	513225,
	"九寨沟县",
	513226,
	"金川县",
	513227,
	"小金县",
	513228,
	"黑水县",
	513230,
	"壤塘县",
	513231,
	"阿坝县",
	513232,
	"若尔盖县",
	513233,
	"红原县",
	513300,
	"甘孜藏族自治州",
	513301,
	"康定市",
	513322,
	"泸定县",
	513323,
	"丹巴县",
	513324,
	"九龙县",
	513325,
	"雅江县",
	513326,
	"道孚县",
	513327,
	"炉霍县",
	513328,
	"甘孜县",
	513329,
	"新龙县",
	513330,
	"德格县",
	513331,
	"白玉县",
	513332,
	"石渠县",
	513333,
	"色达县",
	513334,
	"理塘县",
	513335,
	"巴塘县",
	513336,
	"乡城县",
	513337,
	"稻城县",
	513338,
	"得荣县",
	513400,
	"凉山彝族自治州",
	513401,
	"西昌市",
	513422,
	"木里藏族自治县",
	513423,
	"盐源县",
	513424,
	"德昌县",
	513425,
	"会理县",
	513426,
	"会东县",
	513427,
	"宁南县",
	513428,
	"普格县",
	513429,
	"布拖县",
	513430,
	"金阳县",
	513431,
	"昭觉县",
	513432,
	"喜德县",
	513433,
	"冕宁县",
	513434,
	"越西县",
	513435,
	"甘洛县",
	513436,
	"美姑县",
	513437,
	"雷波县",
	520000,
	"贵州省",
	520100,
	"贵阳市",
	520102,
	"南明区",
	520103,
	"云岩区",
	520111,
	"花溪区",
	520112,
	"乌当区",
	520113,
	"白云区",
	520115,
	"观山湖区",
	520121,
	"开阳县",
	520122,
	"息烽县",
	520123,
	"修文县",
	520181,
	"清镇市",
	520200,
	"六盘水市",
	520201,
	"钟山区",
	520203,
	"六枝特区",
	520221,
	"水城县",
	520281,
	"盘州市",
	520300,
	"遵义市",
	520302,
	"红花岗区",
	520303,
	"汇川区",
	520304,
	"播州区",
	520322,
	"桐梓县",
	520323,
	"绥阳县",
	520324,
	"正安县",
	520325,
	"道真仡佬族苗族自治县",
	520326,
	"务川仡佬族苗族自治县",
	520327,
	"凤冈县",
	520328,
	"湄潭县",
	520329,
	"余庆县",
	520330,
	"习水县",
	520381,
	"赤水市",
	520382,
	"仁怀市",
	520400,
	"安顺市",
	520402,
	"西秀区",
	520403,
	"平坝区",
	520422,
	"普定县",
	520423,
	"镇宁布依族苗族自治县",
	520424,
	"关岭布依族苗族自治县",
	520425,
	"紫云苗族布依族自治县",
	520500,
	"毕节市",
	520502,
	"七星关区",
	520521,
	"大方县",
	520522,
	"黔西县",
	520523,
	"金沙县",
	520524,
	"织金县",
	520525,
	"纳雍县",
	520526,
	"威宁彝族回族苗族自治县",
	520527,
	"赫章县",
	520600,
	"铜仁市",
	520602,
	"碧江区",
	520603,
	"万山区",
	520621,
	"江口县",
	520622,
	"玉屏侗族自治县",
	520623,
	"石阡县",
	520624,
	"思南县",
	520625,
	"印江土家族苗族自治县",
	520626,
	"德江县",
	520627,
	"沿河土家族自治县",
	520628,
	"松桃苗族自治县",
	522300,
	"黔西南布依族苗族自治州",
	522301,
	"兴义市",
	522302,
	"兴仁市",
	522323,
	"普安县",
	522324,
	"晴隆县",
	522325,
	"贞丰县",
	522326,
	"望谟县",
	522327,
	"册亨县",
	522328,
	"安龙县",
	522600,
	"黔东南苗族侗族自治州",
	522601,
	"凯里市",
	522622,
	"黄平县",
	522623,
	"施秉县",
	522624,
	"三穗县",
	522625,
	"镇远县",
	522626,
	"岑巩县",
	522627,
	"天柱县",
	522628,
	"锦屏县",
	522629,
	"剑河县",
	522630,
	"台江县",
	522631,
	"黎平县",
	522632,
	"榕江县",
	522633,
	"从江县",
	522634,
	"雷山县",
	522635,
	"麻江县",
	522636,
	"丹寨县",
	522700,
	"黔南布依族苗族自治州",
	522701,
	"都匀市",
	522702,
	"福泉市",
	522722,
	"荔波县",
	522723,
	"贵定县",
	522725,
	"瓮安县",
	522726,
	"独山县",
	522727,
	"平塘县",
	522728,
	"罗甸县",
	522729,
	"长顺县",
	522730,
	"龙里县",
	522731,
	"惠水县",
	522732,
	"三都水族自治县",
	530000,
	"云南省",
	530100,
	"昆明市",
	530102,
	"五华区",
	530103,
	"盘龙区",
	530111,
	"官渡区",
	530112,
	"西山区",
	530113,
	"东川区",
	530114,
	"呈贡区",
	530115,
	"晋宁区",
	530124,
	"富民县",
	530125,
	"宜良县",
	530126,
	"石林彝族自治县",
	530127,
	"嵩明县",
	530128,
	"禄劝彝族苗族自治县",
	530129,
	"寻甸回族彝族自治县",
	530181,
	"安宁市",
	530300,
	"曲靖市",
	530302,
	"麒麟区",
	530303,
	"沾益区",
	530304,
	"马龙区",
	530322,
	"陆良县",
	530323,
	"师宗县",
	530324,
	"罗平县",
	530325,
	"富源县",
	530326,
	"会泽县",
	530381,
	"宣威市",
	530400,
	"玉溪市",
	530402,
	"红塔区",
	530403,
	"江川区",
	530423,
	"通海县",
	530424,
	"华宁县",
	530425,
	"易门县",
	530426,
	"峨山彝族自治县",
	530427,
	"新平彝族傣族自治县",
	530428,
	"元江哈尼族彝族傣族自治县",
	530481,
	"澄江市",
	530500,
	"保山市",
	530502,
	"隆阳区",
	530521,
	"施甸县",
	530523,
	"龙陵县",
	530524,
	"昌宁县",
	530581,
	"腾冲市",
	530600,
	"昭通市",
	530602,
	"昭阳区",
	530621,
	"鲁甸县",
	530622,
	"巧家县",
	530623,
	"盐津县",
	530624,
	"大关县",
	530625,
	"永善县",
	530626,
	"绥江县",
	530627,
	"镇雄县",
	530628,
	"彝良县",
	530629,
	"威信县",
	530681,
	"水富市",
	530700,
	"丽江市",
	530702,
	"古城区",
	530721,
	"玉龙纳西族自治县",
	530722,
	"永胜县",
	530723,
	"华坪县",
	530724,
	"宁蒗彝族自治县",
	530800,
	"普洱市",
	530802,
	"思茅区",
	530821,
	"宁洱哈尼族彝族自治县",
	530822,
	"墨江哈尼族自治县",
	530823,
	"景东彝族自治县",
	530824,
	"景谷傣族彝族自治县",
	530825,
	"镇沅彝族哈尼族拉祜族自治县",
	530826,
	"江城哈尼族彝族自治县",
	530827,
	"孟连傣族拉祜族佤族自治县",
	530828,
	"澜沧拉祜族自治县",
	530829,
	"西盟佤族自治县",
	530900,
	"临沧市",
	530902,
	"临翔区",
	530921,
	"凤庆县",
	530922,
	"云县",
	530923,
	"永德县",
	530924,
	"镇康县",
	530925,
	"双江拉祜族佤族布朗族傣族自治县",
	530926,
	"耿马傣族佤族自治县",
	530927,
	"沧源佤族自治县",
	532300,
	"楚雄彝族自治州",
	532301,
	"楚雄市",
	532322,
	"双柏县",
	532323,
	"牟定县",
	532324,
	"南华县",
	532325,
	"姚安县",
	532326,
	"大姚县",
	532327,
	"永仁县",
	532328,
	"元谋县",
	532329,
	"武定县",
	532331,
	"禄丰县",
	532500,
	"红河哈尼族彝族自治州",
	532501,
	"个旧市",
	532502,
	"开远市",
	532503,
	"蒙自市",
	532504,
	"弥勒市",
	532523,
	"屏边苗族自治县",
	532524,
	"建水县",
	532525,
	"石屏县",
	532527,
	"泸西县",
	532528,
	"元阳县",
	532529,
	"红河县",
	532530,
	"金平苗族瑶族傣族自治县",
	532531,
	"绿春县",
	532532,
	"河口瑶族自治县",
	532600,
	"文山壮族苗族自治州",
	532601,
	"文山市",
	532622,
	"砚山县",
	532623,
	"西畴县",
	532624,
	"麻栗坡县",
	532625,
	"马关县",
	532626,
	"丘北县",
	532627,
	"广南县",
	532628,
	"富宁县",
	532800,
	"西双版纳傣族自治州",
	532801,
	"景洪市",
	532822,
	"勐海县",
	532823,
	"勐腊县",
	532900,
	"大理白族自治州",
	532901,
	"大理市",
	532922,
	"漾濞彝族自治县",
	532923,
	"祥云县",
	532924,
	"宾川县",
	532925,
	"弥渡县",
	532926,
	"南涧彝族自治县",
	532927,
	"巍山彝族回族自治县",
	532928,
	"永平县",
	532929,
	"云龙县",
	532930,
	"洱源县",
	532931,
	"剑川县",
	532932,
	"鹤庆县",
	533100,
	"德宏傣族景颇族自治州",
	533102,
	"瑞丽市",
	533103,
	"芒市",
	533122,
	"梁河县",
	533123,
	"盈江县",
	533124,
	"陇川县",
	533300,
	"怒江傈僳族自治州",
	533301,
	"泸水市",
	533323,
	"福贡县",
	533324,
	"贡山独龙族怒族自治县",
	533325,
	"兰坪白族普米族自治县",
	533400,
	"迪庆藏族自治州",
	533401,
	"香格里拉市",
	533422,
	"德钦县",
	533423,
	"维西傈僳族自治县",
	540000,
	"西藏自治区",
	540100,
	"拉萨市",
	540102,
	"城关区",
	540103,
	"堆龙德庆区",
	540104,
	"达孜区",
	540121,
	"林周县",
	540122,
	"当雄县",
	540123,
	"尼木县",
	540124,
	"曲水县",
	540127,
	"墨竹工卡县",
	540200,
	"日喀则市",
	540202,
	"桑珠孜区",
	540221,
	"南木林县",
	540222,
	"江孜县",
	540223,
	"定日县",
	540224,
	"萨迦县",
	540225,
	"拉孜县",
	540226,
	"昂仁县",
	540227,
	"谢通门县",
	540228,
	"白朗县",
	540229,
	"仁布县",
	540230,
	"康马县",
	540231,
	"定结县",
	540232,
	"仲巴县",
	540233,
	"亚东县",
	540234,
	"吉隆县",
	540235,
	"聂拉木县",
	540236,
	"萨嘎县",
	540237,
	"岗巴县",
	540300,
	"昌都市",
	540302,
	"卡若区",
	540321,
	"江达县",
	540322,
	"贡觉县",
	540323,
	"类乌齐县",
	540324,
	"丁青县",
	540325,
	"察雅县",
	540326,
	"八宿县",
	540327,
	"左贡县",
	540328,
	"芒康县",
	540329,
	"洛隆县",
	540330,
	"边坝县",
	540400,
	"林芝市",
	540402,
	"巴宜区",
	540421,
	"工布江达县",
	540422,
	"米林县",
	540423,
	"墨脱县",
	540424,
	"波密县",
	540425,
	"察隅县",
	540426,
	"朗县",
	540500,
	"山南市",
	540502,
	"乃东区",
	540521,
	"扎囊县",
	540522,
	"贡嘎县",
	540523,
	"桑日县",
	540524,
	"琼结县",
	540525,
	"曲松县",
	540526,
	"措美县",
	540527,
	"洛扎县",
	540528,
	"加查县",
	540529,
	"隆子县",
	540530,
	"错那县",
	540531,
	"浪卡子县",
	540600,
	"那曲市",
	540602,
	"色尼区",
	540621,
	"嘉黎县 ",
	540622,
	"比如县 ",
	540623,
	"聂荣县 ",
	540624,
	"安多县 ",
	540625,
	"申扎县 ",
	540626,
	"索县 ",
	540627,
	"班戈县 ",
	540628,
	"巴青县 ",
	540629,
	"尼玛县 ",
	540630,
	"双湖县 ",
	542500,
	"阿里地区",
	542521,
	"普兰县",
	542522,
	"札达县",
	542523,
	"噶尔县",
	542524,
	"日土县",
	542525,
	"革吉县",
	542526,
	"改则县",
	542527,
	"措勤县",
	610000,
	"陕西省",
	610100,
	"西安市",
	610102,
	"新城区",
	610103,
	"碑林区",
	610104,
	"莲湖区",
	610111,
	"灞桥区",
	610112,
	"未央区",
	610113,
	"雁塔区",
	610114,
	"阎良区",
	610115,
	"临潼区",
	610116,
	"长安区",
	610117,
	"高陵区",
	610118,
	"鄠邑区",
	610122,
	"蓝田县",
	610124,
	"周至县",
	610200,
	"铜川市",
	610202,
	"王益区",
	610203,
	"印台区",
	610204,
	"耀州区",
	610222,
	"宜君县",
	610300,
	"宝鸡市",
	610302,
	"渭滨区",
	610303,
	"金台区",
	610304,
	"陈仓区",
	610322,
	"凤翔县",
	610323,
	"岐山县",
	610324,
	"扶风县",
	610326,
	"眉县",
	610327,
	"陇县",
	610328,
	"千阳县",
	610329,
	"麟游县",
	610330,
	"凤县",
	610331,
	"太白县",
	610400,
	"咸阳市",
	610402,
	"秦都区",
	610403,
	"杨陵区",
	610404,
	"渭城区",
	610422,
	"三原县",
	610423,
	"泾阳县",
	610424,
	"乾县",
	610425,
	"礼泉县",
	610426,
	"永寿县",
	610428,
	"长武县",
	610429,
	"旬邑县",
	610430,
	"淳化县",
	610431,
	"武功县",
	610481,
	"兴平市",
	610482,
	"彬州市",
	610500,
	"渭南市",
	610502,
	"临渭区",
	610503,
	"华州区",
	610522,
	"潼关县",
	610523,
	"大荔县",
	610524,
	"合阳县",
	610525,
	"澄城县",
	610526,
	"蒲城县",
	610527,
	"白水县",
	610528,
	"富平县",
	610581,
	"韩城市",
	610582,
	"华阴市",
	610600,
	"延安市",
	610602,
	"宝塔区",
	610603,
	"安塞区",
	610621,
	"延长县",
	610622,
	"延川县",
	610625,
	"志丹县",
	610626,
	"吴起县",
	610627,
	"甘泉县",
	610628,
	"富县",
	610629,
	"洛川县",
	610630,
	"宜川县",
	610631,
	"黄龙县",
	610632,
	"黄陵县",
	610681,
	"子长市",
	610700,
	"汉中市",
	610702,
	"汉台区",
	610703,
	"南郑区",
	610722,
	"城固县",
	610723,
	"洋县",
	610724,
	"西乡县",
	610725,
	"勉县",
	610726,
	"宁强县",
	610727,
	"略阳县",
	610728,
	"镇巴县",
	610729,
	"留坝县",
	610730,
	"佛坪县",
	610800,
	"榆林市",
	610802,
	"榆阳区",
	610803,
	"横山区",
	610822,
	"府谷县",
	610824,
	"靖边县",
	610825,
	"定边县",
	610826,
	"绥德县",
	610827,
	"米脂县",
	610828,
	"佳县",
	610829,
	"吴堡县",
	610830,
	"清涧县",
	610831,
	"子洲县",
	610881,
	"神木市",
	610900,
	"安康市",
	610902,
	"汉滨区",
	610921,
	"汉阴县",
	610922,
	"石泉县",
	610923,
	"宁陕县",
	610924,
	"紫阳县",
	610925,
	"岚皋县",
	610926,
	"平利县",
	610927,
	"镇坪县",
	610928,
	"旬阳县",
	610929,
	"白河县",
	611000,
	"商洛市",
	611002,
	"商州区",
	611021,
	"洛南县",
	611022,
	"丹凤县",
	611023,
	"商南县",
	611024,
	"山阳县",
	611025,
	"镇安县",
	611026,
	"柞水县",
	620000,
	"甘肃省",
	620100,
	"兰州市",
	620102,
	"城关区",
	620103,
	"七里河区",
	620104,
	"西固区",
	620105,
	"安宁区",
	620111,
	"红古区",
	620121,
	"永登县",
	620122,
	"皋兰县",
	620123,
	"榆中县",
	620200,
	"嘉峪关市",
	620300,
	"金昌市",
	620302,
	"金川区",
	620321,
	"永昌县",
	620400,
	"白银市",
	620402,
	"白银区",
	620403,
	"平川区",
	620421,
	"靖远县",
	620422,
	"会宁县",
	620423,
	"景泰县",
	620500,
	"天水市",
	620502,
	"秦州区",
	620503,
	"麦积区",
	620521,
	"清水县",
	620522,
	"秦安县",
	620523,
	"甘谷县",
	620524,
	"武山县",
	620525,
	"张家川回族自治县",
	620600,
	"武威市",
	620602,
	"凉州区",
	620621,
	"民勤县",
	620622,
	"古浪县",
	620623,
	"天祝藏族自治县",
	620700,
	"张掖市",
	620702,
	"甘州区",
	620721,
	"肃南裕固族自治县",
	620722,
	"民乐县",
	620723,
	"临泽县",
	620724,
	"高台县",
	620725,
	"山丹县",
	620800,
	"平凉市",
	620802,
	"崆峒区",
	620821,
	"泾川县",
	620822,
	"灵台县",
	620823,
	"崇信县",
	620825,
	"庄浪县",
	620826,
	"静宁县",
	620881,
	"华亭市",
	620900,
	"酒泉市",
	620902,
	"肃州区",
	620921,
	"金塔县",
	620922,
	"瓜州县",
	620923,
	"肃北蒙古族自治县",
	620924,
	"阿克塞哈萨克族自治县",
	620981,
	"玉门市",
	620982,
	"敦煌市",
	621000,
	"庆阳市",
	621002,
	"西峰区",
	621021,
	"庆城县",
	621022,
	"环县",
	621023,
	"华池县",
	621024,
	"合水县",
	621025,
	"正宁县",
	621026,
	"宁县",
	621027,
	"镇原县",
	621100,
	"定西市",
	621102,
	"安定区",
	621121,
	"通渭县",
	621122,
	"陇西县",
	621123,
	"渭源县",
	621124,
	"临洮县",
	621125,
	"漳县",
	621126,
	"岷县",
	621200,
	"陇南市",
	621202,
	"武都区",
	621221,
	"成县",
	621222,
	"文县",
	621223,
	"宕昌县",
	621224,
	"康县",
	621225,
	"西和县",
	621226,
	"礼县",
	621227,
	"徽县",
	621228,
	"两当县",
	622900,
	"临夏回族自治州",
	622901,
	"临夏市",
	622921,
	"临夏县",
	622922,
	"康乐县",
	622923,
	"永靖县",
	622924,
	"广河县",
	622925,
	"和政县",
	622926,
	"东乡族自治县",
	622927,
	"积石山保安族东乡族撒拉族自治县",
	623000,
	"甘南藏族自治州",
	623001,
	"合作市",
	623021,
	"临潭县",
	623022,
	"卓尼县",
	623023,
	"舟曲县",
	623024,
	"迭部县",
	623025,
	"玛曲县",
	623026,
	"碌曲县",
	623027,
	"夏河县",
	630000,
	"青海省",
	630100,
	"西宁市",
	630102,
	"城东区",
	630103,
	"城中区",
	630104,
	"城西区",
	630105,
	"城北区",
	630106,
	"湟中区",
	630121,
	"大通回族土族自治县",
	630123,
	"湟源县",
	630200,
	"海东市",
	630202,
	"乐都区",
	630203,
	"平安区",
	630222,
	"民和回族土族自治县",
	630223,
	"互助土族自治县",
	630224,
	"化隆回族自治县",
	630225,
	"循化撒拉族自治县",
	632200,
	"海北藏族自治州",
	632221,
	"门源回族自治县",
	632222,
	"祁连县",
	632223,
	"海晏县",
	632224,
	"刚察县",
	632300,
	"黄南藏族自治州",
	632321,
	"同仁县",
	632322,
	"尖扎县",
	632323,
	"泽库县",
	632324,
	"河南蒙古族自治县",
	632500,
	"海南藏族自治州",
	632521,
	"共和县",
	632522,
	"同德县",
	632523,
	"贵德县",
	632524,
	"兴海县",
	632525,
	"贵南县",
	632600,
	"果洛藏族自治州",
	632621,
	"玛沁县",
	632622,
	"班玛县",
	632623,
	"甘德县",
	632624,
	"达日县",
	632625,
	"久治县",
	632626,
	"玛多县",
	632700,
	"玉树藏族自治州",
	632701,
	"玉树市",
	632722,
	"杂多县",
	632723,
	"称多县",
	632724,
	"治多县",
	632725,
	"囊谦县",
	632726,
	"曲麻莱县",
	632800,
	"海西蒙古族藏族自治州",
	632801,
	"格尔木市",
	632802,
	"德令哈市",
	632803,
	"茫崖市",
	632821,
	"乌兰县",
	632822,
	"都兰县",
	632823,
	"天峻县",
	640000,
	"宁夏回族自治区",
	640100,
	"银川市",
	640104,
	"兴庆区",
	640105,
	"西夏区",
	640106,
	"金凤区",
	640121,
	"永宁县",
	640122,
	"贺兰县",
	640181,
	"灵武市",
	640200,
	"石嘴山市",
	640202,
	"大武口区",
	640205,
	"惠农区",
	640221,
	"平罗县",
	640300,
	"吴忠市",
	640302,
	"利通区",
	640303,
	"红寺堡区",
	640323,
	"盐池县",
	640324,
	"同心县",
	640381,
	"青铜峡市",
	640400,
	"固原市",
	640402,
	"原州区",
	640422,
	"西吉县",
	640423,
	"隆德县",
	640424,
	"泾源县",
	640425,
	"彭阳县",
	640500,
	"中卫市",
	640502,
	"沙坡头区",
	640521,
	"中宁县",
	640522,
	"海原县",
	650000,
	"新疆维吾尔自治区",
	650100,
	"乌鲁木齐市",
	650102,
	"天山区",
	650103,
	"沙依巴克区",
	650104,
	"新市区",
	650105,
	"水磨沟区",
	650106,
	"头屯河区",
	650107,
	"达坂城区",
	650109,
	"米东区",
	650121,
	"乌鲁木齐县",
	650200,
	"克拉玛依市",
	650202,
	"独山子区",
	650203,
	"克拉玛依区",
	650204,
	"白碱滩区",
	650205,
	"乌尔禾区",
	650400,
	"吐鲁番市",
	650402,
	"高昌区",
	650421,
	"鄯善县",
	650422,
	"托克逊县",
	650500,
	"哈密市",
	650502,
	"伊州区",
	650521,
	"巴里坤哈萨克自治县",
	650522,
	"伊吾县",
	652300,
	"昌吉回族自治州",
	652301,
	"昌吉市",
	652302,
	"阜康市",
	652323,
	"呼图壁县",
	652324,
	"玛纳斯县",
	652325,
	"奇台县",
	652327,
	"吉木萨尔县",
	652328,
	"木垒哈萨克自治县",
	652700,
	"博尔塔拉蒙古自治州",
	652701,
	"博乐市",
	652702,
	"阿拉山口市",
	652722,
	"精河县",
	652723,
	"温泉县",
	652800,
	"巴音郭楞蒙古自治州",
	652801,
	"库尔勒市",
	652822,
	"轮台县",
	652823,
	"尉犁县",
	652824,
	"若羌县",
	652825,
	"且末县",
	652826,
	"焉耆回族自治县",
	652827,
	"和静县",
	652828,
	"和硕县",
	652829,
	"博湖县",
	652900,
	"阿克苏地区",
	652901,
	"阿克苏市",
	652902,
	"库车市",
	652922,
	"温宿县",
	652924,
	"沙雅县",
	652925,
	"新和县",
	652926,
	"拜城县",
	652927,
	"乌什县",
	652928,
	"阿瓦提县",
	652929,
	"柯坪县",
	653000,
	"克孜勒苏柯尔克孜自治州",
	653001,
	"阿图什市",
	653022,
	"阿克陶县",
	653023,
	"阿合奇县",
	653024,
	"乌恰县",
	653100,
	"喀什地区",
	653101,
	"喀什市",
	653121,
	"疏附县",
	653122,
	"疏勒县",
	653123,
	"英吉沙县",
	653124,
	"泽普县",
	653125,
	"莎车县",
	653126,
	"叶城县",
	653127,
	"麦盖提县",
	653128,
	"岳普湖县",
	653129,
	"伽师县",
	653130,
	"巴楚县",
	653131,
	"塔什库尔干塔吉克自治县",
	653200,
	"和田地区",
	653201,
	"和田市",
	653221,
	"和田县",
	653222,
	"墨玉县",
	653223,
	"皮山县",
	653224,
	"洛浦县",
	653225,
	"策勒县",
	653226,
	"于田县",
	653227,
	"民丰县",
	654000,
	"伊犁哈萨克自治州",
	654002,
	"伊宁市",
	654003,
	"奎屯市",
	654004,
	"霍尔果斯市",
	654021,
	"伊宁县",
	654022,
	"察布查尔锡伯自治县",
	654023,
	"霍城县",
	654024,
	"巩留县",
	654025,
	"新源县",
	654026,
	"昭苏县",
	654027,
	"特克斯县",
	654028,
	"尼勒克县",
	654200,
	"塔城地区",
	654201,
	"塔城市",
	654202,
	"乌苏市",
	654221,
	"额敏县",
	654223,
	"沙湾县",
	654224,
	"托里县",
	654225,
	"裕民县",
	654226,
	"和布克赛尔蒙古自治县",
	654300,
	"阿勒泰地区",
	654301,
	"阿勒泰市",
	654321,
	"布尔津县",
	654322,
	"富蕴县",
	654323,
	"福海县",
	654324,
	"哈巴河县",
	654325,
	"青河县",
	654326,
	"吉木乃县",
	659001,
	"石河子市",
	659002,
	"阿拉尔市",
	659003,
	"图木舒克市",
	659004,
	"五家渠市",
	659005,
	"北屯市",
	659006,
	"铁门关市",
	659007,
	"双河市",
	659008,
	"可克达拉市",
	659009,
	"昆玉市",
	659010,
	"胡杨河市",
	710000,
	"台湾省",
	810000,
	"香港特别行政区",
	820000,
	"澳门特别行政区"
];
var require$$2$1 = {
	firstName: firstName,
	secondName: secondName,
	addressCode: addressCode
};

const tools$2 = tools_1;

let [r, aFirst, aSecond, addrCodeArr] = [null, null, null, null];
// 身份证加权因子
const coefficientArray = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
// 身份证校验码
const lastNumberArray = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2];
function loadFakeFile () {
  if (addrCodeArr) {
    return
  }
  const r = require$$2$1;
  /*
  r = JSON.parse(
    fs.readFileSync(path.join(__dirname, 'fakeResource.dat'), 'utf-8')
  )
  */
  aFirst = r.firstName.split('');
  aSecond = r.secondName.split('');
  addrCodeArr = r.addressCode;
}

function randData (o, n) {
  if (!o) {
    return ''
  }
  const a = o instanceof Array ? o : String(o).split('');
  const len = a.length - 1;
  let str = '';
  for (let i = 0; i < n; i++) {
    str += a[tools$2.rnd(0, len)];
  }
  return str
}

function randNum (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的数字,返回值类型为字符串
   * @function randNum
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.randNum(10))
   */

  let sNum = '';
  for (let i = 0; i < n; i++) {
    sNum += tools$2.rnd(0, 9);
  }
  return sNum
}
function randStr (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的小写字母,返回值类型为字符串
   * @function randStr
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.randStr(10))
   */

  return randData('abcdefghijklmnopqrstuvwxyz', n)
}

function randTime (startTime, endTime) {
  const secStart = new Date(startTime).getTime() / 1000;
  let secDiff = 0;
  if (secStart < 0) {
    secDiff = new Date(endTime) / 1000 + Math.abs(secStart);
  } else {
    secDiff = ~~((new Date(endTime) - new Date(startTime)) / 1000);
  }
  const randSec = tools$2.rnd(0, secDiff);
  const resultSec = new Date(startTime).getTime() + randSec * 1000;
  return new Date(resultSec).date2Str()
}

function randfirstName () {
  /**
   * @memberof fake#
   * @description 随机生成一个姓氏
   * @function randfirstName
   * @return {String}
   * @example
   * console.log($.fake.randfirstName())
   */

  loadFakeFile();
  return randData(aFirst, 1)
}

function randSecName () {
  /**
   * @memberof fake#
   * @description 随机生成名字,长度为1或2
   * @function randSecName
   * @return {String}
   * @example
   * console.log($.fake.randSecName())
   */

  loadFakeFile();
  return randData(aSecond, tools$2.rnd(1, 2))
}

function randName () {
  return `${randfirstName()}${randSecName()}`
}

function randColor (colorType) {
  if (colorType === 'rgba') {
    const a = [];
    for (let i = 0; i < 3; i++) {
      a.push(tools$2.rnd(0, 255));
    }
    a.push(Math.round(Math.random() * 10) / 10);
    return `rgba(${a[0]},${a[1]},${a[2]},${a[3]})`
  } else {
    return `#${randData('0123456789abcdef', 6)}`
  }
}
function genImg (option = {}) {
  /**
   * @memberof fake#
   * @description 随机size的svg图片
   * @function genImg
   * @return {String}
   * @example
   * ctx.type = 'image/svg+xml'
   * ctx.body=$.Mock.genImg({ bg: $.fake.randColor(), fc: '#fff' })
   */

  const objDefaut = {
    size: '128x128',
    text: '占位符',
    textX: 0,
    textY: 0,
    bg: '#EEEEEE',
    fs: '14',
    fc: '#AAAAAA',
    isText: 'y'
  };
  const svgObj = Object.assign(objDefaut, option);

  const size = svgObj.size ? svgObj.size.split('x') : [];
  if (size.length !== 2) {
    return 0
  }
  svgObj.text = svgObj.text ? decodeURIComponent(svgObj.text) : '';
  svgObj.width = size[0];
  svgObj.height = size[1];
  svgObj.size = svgObj.width + 'x' + svgObj.height;
  svgObj.textX = (svgObj.width / 2) | 0;
  svgObj.textY = (svgObj.height / 2) | 0;

  if (svgObj.isText === 'n') {
    svgObj.text = '';
    svgObj.size = '';
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${svgObj.width}" height="${svgObj.height}" viewBox="0 0 ${svgObj.width} ${svgObj.height}" preserveAspectRatio="none">
  <rect width="${svgObj.width}" height="${svgObj.height}" fill="${svgObj.bg}" />
  <text text-anchor="start" x="10" y="20" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.text}</text>
  <text text-anchor="middle" x="${svgObj.textX}" y="${svgObj.textY}" style="fill:${svgObj.fc};font-size:${svgObj.fs}px;font-family:Helvetica,sans-serif;dominant-baseline:central">${svgObj.size}</text>
  </svg>`
}
function price (beforeDot, afterDot) {
  /**
   * @memberof fake#
   * @description 随机生成价格, beforeDot为,
   * @function price
   * @param {Number} beforeDot - 整数长度
   * @param {Number} afterDot - 小数长度
   * @return {String}
   * @example
   * console.log($.fake.price(2, 2))
   */

  return `${randNum(beforeDot)}.${randNum(afterDot)}`
}

function smallAndNum (n) {
  /**
   * @memberof fake#
   * @description 随机生成长度为n的小写字母+数字
   * @function smallAndNum
   * @param {Number} n - 长度
   * @return {String}
   * @example
   * console.log($.fake.smallAndNum(4))
   */

  n = Number(n) || 1;
  return randData('0123456789abcdefghijklmnopqrstuvwxyz', n)
}

function randUrl (n) {
  n = Number(n) || 1;
  return `http://www.${smallAndNum(tools$2.rnd(1, n))}.com/`
}

function randIp () {
  const aIp = [];
  for (let i = 0; i < 4; i++) {
    aIp.push(tools$2.rnd(0, 255));
  }
  return aIp.join('.')
}

// 手机号码
const mobile = [
  [134, 135, 136, 137, 138, 139, 144, 147, 148, 150, 151, 152, 157, 158, 159, 172, 178, 182, 183, 184, 187, 188, 195, 198], // 移动
  [130, 131, 132, 140, 145, 146, 155, 156, 166, 167, 171, 175, 176, 185, 186], // 联通
  [133, 149, 153, 173, 174, 177, 180, 181, 189, 191, 199], // 电信
  [165, 170] // 虚拟
];

function whichNetwork (s) {
  /**
   * @memberof fake#
   * @description 检查手机号是哪个服务商的,
   * @function whichNetwork
   * @param {Number | String} s - 手机号
   * @return {String} i - 返回值是数字(-1:不存在, 0:移动, 1:联通, 2: 电信)
   * @example
   * console.log($.fake.whichNetwork(13713833331))
   */

  s = s.slice(0, 3);
  for (let i = 0; i < mobile.length; i++) {
    if (mobile[i].includes(+s)) {
      return i
    }
  }
  return -1
}

function phoneNum () {
  return `${randData(mobile[tools$2.rnd(0, 2)], 1)}${randNum(8)}`
}

function idCard () {
  loadFakeFile();
  const addrCodeLen = addrCodeArr.length / 2;
  let sIdNum = addrCodeArr[tools$2.rnd(0, addrCodeLen - 1) * 2];
  while (sIdNum % 100 === 0) {
    sIdNum = addrCodeArr[tools$2.rnd(0, addrCodeLen - 1) * 2];
  }
  const iNow = new Date().date2Str().slice(0, 10);
  const sr = randTime('1900-01-01', iNow).slice(0, 10);
  sIdNum += sr.slice(0, 10).replace(/-/gi, '');
  sIdNum += randNum(2) + randData('01', 1);

  const a = sIdNum.split('');
  let total = 0;
  for (let i = 0, l = a.length; i < l; i++) {
    total += parseInt(a[i], 10) * coefficientArray[i];
  }
  return sIdNum + lastNumberArray[total % 11]
}

const checkIdCard = {
  /* 每位加权因子 */

  powers: coefficientArray,

  /* 第18位校检码 */

  parityBit: lastNumberArray,

  /* 性别 */

  genders: { male: '男', female: '女' },

  /* 校验地址码 */

  checkAddressCode: function (addressCode) {
    loadFakeFile();
    return addrCodeArr.includes(+addressCode)
  },

  /* 校验日期码 */

  checkBirthDayCode: function (birDayCode) {
    const yyyy = parseInt(birDayCode.slice(0, 4), 10);
    const mm = parseInt(birDayCode.slice(4, 6), 10);
    const dd = parseInt(birDayCode.slice(6), 10);
    const xdata = new Date(yyyy, mm - 1, dd);
    if (xdata > new Date()) {
      return false // 生日不能大于当前日期
    } else if (xdata.getFullYear() == yyyy && xdata.getMonth() == mm - 1 && xdata.getDate() == dd) {
      return true
    } else {
      return false
    }
  },

  /* 计算校检码 */

  getParityBit: function (idCardNo) {
    const id17 = idCardNo.slice(0, 17);

    /* 加权 */

    let power = 0;
    for (let i = 0; i < 17; i++) {
      power += parseInt(id17.charAt(i), 10) * parseInt(checkIdCard.powers[i]);
    }

    /* 取模 */

    const mod = power % 11;
    return checkIdCard.parityBit[mod]
  },

  /* 验证校检码 */

  checkParityBit: function (idCardNo) {
    const parityBit = idCardNo.charAt(17).toUpperCase();
    return checkIdCard.getParityBit(idCardNo) == parityBit
  },

  /* 校验15位或18位的身份证号码 */

  check: function (idCardNo) {
    // 15位和18位身份证号码的基本校验
    const check = /^(\d{15}|\d{17}(\d|x|X))$/.test(idCardNo);
    if (!check) {
      return false
    }
    // 判断长度为15位或18位
    if (idCardNo.length == 15) {
      return checkIdCard.check15IdCardNo(idCardNo)
    } else if (idCardNo.length == 18) {
      return checkIdCard.check18IdCardNo(idCardNo)
    } else {
      return false
    }
  },

  // 校验15位的身份证号码
  check15IdCardNo: function (idCardNo) {
    // 15位身份证号码的基本校验
    let check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}$/.test(idCardNo);
    if (!check) {
      return false
    }
    // 校验地址码
    const addressCode = idCardNo.slice(0, 6);
    check = checkIdCard.checkAddressCode(addressCode);
    if (!check) {
      return false
    }
    const birDayCode = '19' + idCardNo.slice(6, 12);
    // 校验日期码
    return checkIdCard.checkBirthDayCode(birDayCode)
  },

  // 校验18位的身份证号码
  check18IdCardNo: function (idCardNo) {
    // 18位身份证号码的基本格式校验
    let check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2]\d)|(3[0-1]))\d{3}(\d|x|X)$/.test(idCardNo);
    if (!check) {
      return false
    }
    // 校验地址码
    const addressCode = idCardNo.slice(0, 6);
    check = checkIdCard.checkAddressCode(addressCode);
    if (!check) {
      return false
    }
    // 校验日期码
    const birDayCode = idCardNo.slice(6, 14);
    check = checkIdCard.checkBirthDayCode(birDayCode);
    if (!check) {
      return false
    }
    // 验证校检码
    return checkIdCard.checkParityBit(idCardNo)
  },

  formateDateCN: function (day) {
    const yyyy = day.slice(0, 4);
    const mm = day.slice(4, 6);
    const dd = day.slice(6);
    return yyyy + '-' + mm + '-' + dd
  },

  // 获取信息
  getInfo: function (idCardNo) {
    const idCardInfo = {
      gender: '', // 性别
      birthday: '' // 出生日期(yyyy-mm-dd)
    };
    if (idCardNo.length == 15) {
      const aday = '19' + idCardNo.slice(6, 12);
      idCardInfo.birthday = checkIdCard.formateDateCN(aday);
      if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
        idCardInfo.gender = checkIdCard.genders.female;
      } else {
        idCardInfo.gender = checkIdCard.genders.male;
      }
    } else if (idCardNo.length == 18) {
      const aday = idCardNo.slice(6, 14);
      idCardInfo.birthday = checkIdCard.formateDateCN(aday);
      if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
        idCardInfo.gender = checkIdCard.genders.female;
      } else {
        idCardInfo.gender = checkIdCard.genders.male;
      }
    }
    const address = idCardNo.slice(0, 6);
    idCardInfo.place = [
      addrCodeArr[addrCodeArr.indexOf(+(address.slice(0, 2) + '0000')) + 1],
      addrCodeArr[addrCodeArr.indexOf(+(address.slice(0, 4) + '00')) + 1],
      addrCodeArr[addrCodeArr.indexOf(+address) + 1]
    ].join(',');
    return idCardInfo
  },

  /* 18位转15位 */

  getId15: function (idCardNo) {
    if (idCardNo.length == 15) {
      return idCardNo
    } else if (idCardNo.length == 18) {
      return idCardNo.slice(0, 6) + idCardNo.slice(8, 17)
    } else {
      return null
    }
  },

  /* 15位转18位 */

  getId18: function (idCardNo) {
    if (idCardNo.length == 15) {
      const id17 = idCardNo.slice(0, 6) + '19' + idCardNo.slice(6);
      const parityBit = checkIdCard.getParityBit(id17);
      return id17 + parityBit
    } else if (idCardNo.length == 18) {
      return idCardNo
    } else {
      return null
    }
  }
};

var fake$2 = {
  genImg,
  randData,
  randNum,
  randStr,
  randTime,
  randName,
  randfirstName,
  randSecName,
  randColor,
  price,
  smallAndNum,
  randUrl,
  randIp,
  phoneNum,
  idCard, // 随机生成身份证
  checkIdCard,
  whichNetwork // 手机号码是那个服务商
};

/* istanbul ignore file */
// @ts-check
/**
 * @namespace file
 */

const fs$1 = require$$0;
const crypto$1 = require$$0;
const BUFFER_SIZE = 8192;

function getFileType (filePath) {
  const buffer = Buffer.alloc(8);
  const fd = fs$1.openSync(filePath, 'r');
  fs$1.readSync(fd, buffer, 0, 8, 0);
  const newBuf = buffer.slice(0, 4);
  fs$1.closeSync(fd);
  const typeCode = newBuf.toString('hex');
  let filetype = 'unknown';
  let mimetype = 'unknown';
  // console.log(typeCode)
  switch (typeCode.substring(0, 4)) {
    case '424d':
      filetype = 'bmp';
      mimetype = 'image/bmp';
      break
    case '504b':
      filetype = 'zip';
      mimetype = ['application/x-zip', 'application/zip', 'application/x-zip-compressed'];
      break
  }
  switch (typeCode.substring(0, 6)) {
    case '474946':
      filetype = 'gif';
      mimetype = 'image/gif';
      break
  }
  switch (typeCode) {
    case 'ffd8ffe1': // 带有exif
      filetype = 'jpg';
      mimetype = ['image/jpeg', 'image/pjpeg'];
      break
    case 'ffd8ffe0': // 老式相机采用JFIF格式
      filetype = 'jpg';
      mimetype = ['image/jpeg', 'image/pjpeg'];
      break
    case '89504e47':
      filetype = 'png';
      mimetype = ['image/png', 'image/x-png'];
      break
    case '25504446':
      filetype = 'pdf';
      mimetype = 'application/pdf';
      break
    case '49492a00':
      filetype = 'tif';
      mimetype = 'image/tiff';
      break
    case '4d4d002a':
      filetype = 'tif';
      mimetype = 'image/tiff';
      break
    case '38425053':
      filetype = 'psd';
      mimetype = 'image/vnd.adobe.photoshop';
      break
  }
  return {
    fileType: filetype,
    mimeType: mimetype
  }
}
function checkImgComplete (filePath, type = 'jpg') {
  const f1 = fs$1.readFileSync(filePath);
  const pos = f1.slice(-4);
  if (type === 'jpg' || type === 'jpeg') {
    return pos[2] === 255 && pos[3] === 217
  }
  if (type === 'png') {
    return pos[0] === 174 && pos[1] === 66 && pos[2] === 96 && pos[3] === 130
  }
  if (type === 'gif') {
    return pos[2] === 0 && pos[3] === 59
  }
  return -1
}

function getFileMd5 (filename) {
  const fd = fs$1.openSync(filename, 'r');
  const hash = crypto$1.createHash('md5');
  const buffer = Buffer.alloc(BUFFER_SIZE);

  try {
    let bytesRead;

    do {
      bytesRead = fs$1.readSync(fd, buffer, 0, BUFFER_SIZE);
      hash.update(buffer.slice(0, bytesRead));
    } while (bytesRead === BUFFER_SIZE)
  } finally {
    fs$1.closeSync(fd);
  }

  return hash.digest('hex')
}
const csv2Arr = (data, splitStr = ',', omitFirstRow = false, fn = it => it) =>
  data
    .slice(omitFirstRow ? data.indexOf('\n') + 1 : 0)
    .split('\n')
    .map(v => v.split(splitStr).map(x => fn(x)));

function deleteAll (path) {
  /**
   * @memberof file#
   * @param {String} path - 目录路径
   * @description 递归删除目录
   * @return {number}
   * @example
   * $.file.deleteAll('./temp')
   */

  let files = [];
  if (fs$1.existsSync(path)) {
    files = fs$1.readdirSync(path);
    files.forEach(function (file, index) {
      const curPath = path + '/' + file;
      if (fs$1.statSync(curPath).isDirectory()) {
        // recurse
        deleteAll(curPath);
      } else {
        // delete file
        fs$1.unlinkSync(curPath);
      }
    });
    fs$1.rmdirSync(path);
  }
}

/**
 *
 * @param {string} fileName 文件名
 * @param {*} sp 分隔符正则或者字符
 * @param {*} cbFunc 每次满足行的回调函数
 * @param {*} endFunc 读完的时候的回调函数
 */

function readBig (fileName, sp = /\r?\n/g, cbFunc = function () {}, endFunc = function () {}) {
  let buffer = '';
  let count = 0;
  const rs = fs$1.createReadStream(fileName);
  const t = new Date();
  rs.on('data', function (chunk) {
    const lines = (buffer + chunk).split(sp);
    buffer = lines.pop();
    for (let i = 0; i < lines.length; ++i) {
      count++;
      cbFunc(count, lines[i]);
    }
  });
  rs.on('end', function () {
    // 最后一行 或 分割，或 是一个空行
    count++;
    endFunc(buffer, { spendTime: new Date() - t, n: count });
  });
}
var file$1 = {
  getFileType,
  checkImgComplete,
  getFileMd5,
  csv2Arr,
  deleteAll,
  readBig
};

/* istanbul ignore file */

function Token (n) {
  this.type = n, this.offset = Token.offset(), this.text = Token.text();
}

function Alternate (n, l) {
  Token.call(this, 'alternate'), this.left = n, this.right = l;
}

function Match (n) {
  Token.call(this, 'match'), this.body = n.filter(Boolean);
}

function Group (n, l) {
  Token.call(this, n), this.body = l;
}

function CaptureGroup (n) {
  Group.call(this, 'capture-group'), this.index = cgs[this.offset] || (cgs[this.offset] = index++),
  this.body = n;
}

function Quantified (n, l) {
  Token.call(this, 'quantified'), this.body = n, this.quantifier = l;
}

function Quantifier (n, l) {
  Token.call(this, 'quantifier'), this.min = n, this.max = l, this.greedy = !0;
}

function CharSet (n, l) {
  Token.call(this, 'charset'), this.invert = n, this.body = l;
}

function CharacterRange (n, l) {
  Token.call(this, 'range'), this.start = n, this.end = l;
}

function Literal (n) {
  Token.call(this, 'literal'), this.body = n, this.escaped = this.body != this.text;
}

function Unicode (n) {
  Token.call(this, 'unicode'), this.code = n.toUpperCase();
}

function Hex (n) {
  Token.call(this, 'hex'), this.code = n.toUpperCase();
}

function Octal (n) {
  Token.call(this, 'octal'), this.code = n.toUpperCase();
}

function BackReference (n) {
  Token.call(this, 'back-reference'), this.code = n.toUpperCase();
}

function ControlCharacter (n) {
  Token.call(this, 'control-character'), this.code = n.toUpperCase();
}

var parser = (function () {
  function n (n, l) {
    function u () {
      this.constructor = n;
    }
    u.prototype = l.prototype, n.prototype = new u();
  }
  function l (n, l, u, t, r) {
    function e (n, l) {
      function u (n) {
        function l (n) {
          return n.charCodeAt(0).toString(16)
            .toUpperCase()
        }
        return n.replace(/\\/g, '\\\\').replace(/"/g, '\\"')
          .replace(/\x08/g, '\\b')
          .replace(/\t/g, '\\t')
          .replace(/\n/g, '\\n')
          .replace(/\f/g, '\\f')
          .replace(/\r/g, '\\r')
          .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (n) {
            return '\\x0' + l(n)
          })
          .replace(/[\x10-\x1F\x80-\xFF]/g, function (n) {
            return '\\x' + l(n)
          })
          .replace(/[\u0180-\u0FFF]/g, function (n) {
            return '\\u0' + l(n)
          })
          .replace(/[\u1080-\uFFFF]/g, function (n) {
            return '\\u' + l(n)
          })
      }
      let t, r;
      switch (n.length) {
        case 0:
          t = 'end of input';
          break

        case 1:
          t = n[0];
          break

        default:
          t = n.slice(0, -1).join(', ') + ' or ' + n[n.length - 1];
      }
      return r = l ? '"' + u(l) + '"' : 'end of input', 'Expected ' + t + ' but ' + r + ' found.'
    }
    this.expected = n, this.found = l, this.offset = u, this.line = t, this.column = r,
    this.name = 'SyntaxError', this.message = e(n, l);
  }
  function u (n) {
    function u () {
      return n.substring(Lt, qt)
    }
    function t () {
      return Lt
    }
    function r (l) {
      function u (l, u, t) {
        let r, e;
        for (r = u; t > r; r++) {
          e = n.charAt(r), e === '\n' ? (l.seenCR || l.line++, l.column = 1,
          l.seenCR = !1) : e === '\r' || e === '\u2028' || e === '\u2029' ? (l.line++, l.column = 1,
          l.seenCR = !0) : (l.column++, l.seenCR = !1);
        }
      }
      return Mt !== l && (Mt > l && (Mt = 0, Dt = {
        line: 1,
        column: 1,
        seenCR: !1
      }), u(Dt, Mt, l), Mt = l), Dt
    }
    function e (n) {
      Ht > qt || (qt > Ht && (Ht = qt, Ot = []), Ot.push(n));
    }
    function o (n) {
      let l = 0;
      for (n.sort(); l < n.length;) { n[l - 1] === n[l] ? n.splice(l, 1) : l++; }
    }
    function c () {
      let l, u, t, r, o;
      return l = qt, u = i(), u !== null ? (t = qt, n.charCodeAt(qt) === 124 ? (r = fl,
      qt++) : (r = null, Wt === 0 && e(sl)), r !== null ? (o = c(), o !== null ? (r = [r, o],
      t = r) : (qt = t, t = il)) : (qt = t, t = il), t === null && (t = al), t !== null ? (Lt = l,
      u = hl(u, t), u === null ? (qt = l, l = u) : l = u) : (qt = l, l = il)) : (qt = l,
      l = il), l
    }
    function i () {
      let n, l, u, t, r;
      if (n = qt, l = f(), l === null && (l = al), l !== null) {
        if (u = qt, Wt++, t = d(),
        Wt--, t === null ? u = al : (qt = u, u = il), u !== null) {
          for (t = [], r = h(), r === null && (r = a()); r !== null;) {
            t.push(r), r = h(),
            r === null && (r = a());
          }
          t !== null ? (r = s(), r === null && (r = al), r !== null ? (Lt = n, l = dl(l, t, r),
          l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il);
        } else { qt = n, n = il; }
      } else { qt = n, n = il; }
      return n
    }
    function a () {
      let n;
      return n = x(), n === null && (n = Q(), n === null && (n = B())), n
    }
    function f () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 94 ? (u = pl, qt++) : (u = null, Wt === 0 && e(vl)),
      u !== null && (Lt = l, u = wl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function s () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 36 ? (u = Al, qt++) : (u = null, Wt === 0 && e(Cl)),
      u !== null && (Lt = l, u = gl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function h () {
      let n, l, u;
      return n = qt, l = a(), l !== null ? (u = d(), u !== null ? (Lt = n, l = bl(l, u),
      l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n, n = il), n
    }
    function d () {
      let n, l, u;
      return Wt++, n = qt, l = p(), l !== null ? (u = k(), u === null && (u = al), u !== null ? (Lt = n,
      l = Tl(l, u), l === null ? (qt = n, n = l) : n = l) : (qt = n, n = il)) : (qt = n,
      n = il), Wt--, n === null && (l = null, Wt === 0 && e(kl)), n
    }
    function p () {
      let n;
      return n = v(), n === null && (n = w(), n === null && (n = A(), n === null && (n = C(),
      n === null && (n = g(), n === null && (n = b()))))), n
    }
    function v () {
      let l, u, t, r, o, c;
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.charCodeAt(qt) === 44 ? (r = ml, qt++) : (r = null,
      Wt === 0 && e(Rl)), r !== null ? (o = T(), o !== null ? (n.charCodeAt(qt) === 125 ? (c = Fl,
      qt++) : (c = null, Wt === 0 && e(Ql)), c !== null ? (Lt = l, u = Sl(t, o), u === null ? (qt = l,
      l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function w () {
      let l, u, t, r;
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.substr(qt, 2) === Ul ? (r = Ul, qt += 2) : (r = null,
      Wt === 0 && e(El)), r !== null ? (Lt = l, u = Gl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function A () {
      let l, u, t, r;
      return l = qt, n.charCodeAt(qt) === 123 ? (u = xl, qt++) : (u = null, Wt === 0 && e(yl)),
      u !== null ? (t = T(), t !== null ? (n.charCodeAt(qt) === 125 ? (r = Fl, qt++) : (r = null,
      Wt === 0 && e(Ql)), r !== null ? (Lt = l, u = Bl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function C () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 43 ? (u = jl, qt++) : (u = null, Wt === 0 && e($l)),
      u !== null && (Lt = l, u = ql()), u === null ? (qt = l, l = u) : l = u, l
    }
    function g () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 42 ? (u = Ll, qt++) : (u = null, Wt === 0 && e(Ml)),
      u !== null && (Lt = l, u = Dl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function b () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 63 ? (u = Hl, qt++) : (u = null, Wt === 0 && e(Ol)),
      u !== null && (Lt = l, u = Wl()), u === null ? (qt = l, l = u) : l = u, l
    }
    function k () {
      let l;
      return n.charCodeAt(qt) === 63 ? (l = Hl, qt++) : (l = null, Wt === 0 && e(Ol)),
      l
    }
    function T () {
      let l, u, t;
      if (l = qt, u = [], zl.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null,
      Wt === 0 && e(Il)), t !== null) {
        for (; t !== null;) {
          u.push(t), zl.test(n.charAt(qt)) ? (t = n.charAt(qt),
          qt++) : (t = null, Wt === 0 && e(Il));
        }
      } else { u = il; }
      return u !== null && (Lt = l, u = Jl(u)), u === null ? (qt = l, l = u) : l = u,
      l
    }
    function x () {
      let l, u, t, r;
      return l = qt, n.charCodeAt(qt) === 40 ? (u = Kl, qt++) : (u = null, Wt === 0 && e(Nl)),
      u !== null ? (t = R(), t === null && (t = F(), t === null && (t = m(), t === null && (t = y()))),
      t !== null ? (n.charCodeAt(qt) === 41 ? (r = Pl, qt++) : (r = null, Wt === 0 && e(Vl)),
      r !== null ? (Lt = l, u = Xl(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il)) : (qt = l, l = il), l
    }
    function y () {
      let n, l;
      return n = qt, l = c(), l !== null && (Lt = n, l = Yl(l)), l === null ? (qt = n,
      n = l) : n = l, n
    }
    function m () {
      let l, u, t;
      return l = qt, n.substr(qt, 2) === Zl ? (u = Zl, qt += 2) : (u = null, Wt === 0 && e(_l)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = nu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function R () {
      let l, u, t;
      return l = qt, n.substr(qt, 2) === lu ? (u = lu, qt += 2) : (u = null, Wt === 0 && e(uu)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = tu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function F () {
      let l, u, t;
      return l = qt, n.substr(qt, 2) === ru ? (u = ru, qt += 2) : (u = null, Wt === 0 && e(eu)),
      u !== null ? (t = c(), t !== null ? (Lt = l, u = ou(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function Q () {
      let l, u, t, r, o;
      if (Wt++, l = qt, n.charCodeAt(qt) === 91 ? (u = iu, qt++) : (u = null, Wt === 0 && e(au)),
      u !== null) {
        if (n.charCodeAt(qt) === 94 ? (t = pl, qt++) : (t = null, Wt === 0 && e(vl)),
        t === null && (t = al), t !== null) {
          for (r = [], o = S(), o === null && (o = U()); o !== null;) {
            r.push(o), o = S(),
            o === null && (o = U());
          }
          r !== null ? (n.charCodeAt(qt) === 93 ? (o = fu, qt++) : (o = null, Wt === 0 && e(su)),
          o !== null ? (Lt = l, u = hu(t, r), u === null ? (qt = l, l = u) : l = u) : (qt = l,
          l = il)) : (qt = l, l = il);
        } else { qt = l, l = il; }
      } else { qt = l, l = il; }
      return Wt--, l === null && (u = null, Wt === 0 && e(cu)), l
    }
    function S () {
      let l, u, t, r;
      return Wt++, l = qt, u = U(), u !== null ? (n.charCodeAt(qt) === 45 ? (t = pu, qt++) : (t = null,
      Wt === 0 && e(vu)), t !== null ? (r = U(), r !== null ? (Lt = l, u = wu(u, r), u === null ? (qt = l,
      l = u) : l = u) : (qt = l, l = il)) : (qt = l, l = il)) : (qt = l, l = il), Wt--,
      l === null && (u = null, Wt === 0 && e(du)), l
    }
    function U () {
      let n;
      return Wt++, n = G(), n === null && (n = E()), Wt--, n === null && (Wt === 0 && e(Au)),
      n
    }
    function E () {
      let l, u;
      return l = qt, Cu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null, Wt === 0 && e(gu)),
      u !== null && (Lt = l, u = bu(u)), u === null ? (qt = l, l = u) : l = u, l
    }
    function G () {
      let n;
      return n = L(), n === null && (n = Y(), n === null && (n = H(), n === null && (n = O(),
      n === null && (n = W(), n === null && (n = z(), n === null && (n = I(), n === null && (n = J(),
      n === null && (n = K(), n === null && (n = N(), n === null && (n = P(), n === null && (n = V(),
      n === null && (n = X(), n === null && (n = _(), n === null && (n = nl(), n === null && (n = ll(),
      n === null && (n = ul(), n === null && (n = tl()))))))))))))))))), n
    }
    function B () {
      let n;
      return n = j(), n === null && (n = q(), n === null && (n = $())), n
    }
    function j () {
      let l, u;
      return l = qt, n.charCodeAt(qt) === 46 ? (u = ku, qt++) : (u = null, Wt === 0 && e(Tu)),
      u !== null && (Lt = l, u = xu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function $ () {
      let l, u;
      return Wt++, l = qt, mu.test(n.charAt(qt)) ? (u = n.charAt(qt), qt++) : (u = null,
      Wt === 0 && e(Ru)), u !== null && (Lt = l, u = bu(u)), u === null ? (qt = l, l = u) : l = u,
      Wt--, l === null && (u = null, Wt === 0 && e(yu)), l
    }
    function q () {
      let n;
      return n = M(), n === null && (n = D(), n === null && (n = Y(), n === null && (n = H(),
      n === null && (n = O(), n === null && (n = W(), n === null && (n = z(), n === null && (n = I(),
      n === null && (n = J(), n === null && (n = K(), n === null && (n = N(), n === null && (n = P(),
      n === null && (n = V(), n === null && (n = X(), n === null && (n = Z(), n === null && (n = _(),
      n === null && (n = nl(), n === null && (n = ll(), n === null && (n = ul(), n === null && (n = tl()))))))))))))))))))),
      n
    }
    function L () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, Wt === 0 && e(Qu)),
      u !== null && (Lt = l, u = Su()), u === null ? (qt = l, l = u) : l = u, l
    }
    function M () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Fu ? (u = Fu, qt += 2) : (u = null, Wt === 0 && e(Qu)),
      u !== null && (Lt = l, u = Uu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function D () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Eu ? (u = Eu, qt += 2) : (u = null, Wt === 0 && e(Gu)),
      u !== null && (Lt = l, u = Bu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function H () {
      let l, u;
      return l = qt, n.substr(qt, 2) === ju ? (u = ju, qt += 2) : (u = null, Wt === 0 && e($u)),
      u !== null && (Lt = l, u = qu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function O () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Lu ? (u = Lu, qt += 2) : (u = null, Wt === 0 && e(Mu)),
      u !== null && (Lt = l, u = Du()), u === null ? (qt = l, l = u) : l = u, l
    }
    function W () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Hu ? (u = Hu, qt += 2) : (u = null, Wt === 0 && e(Ou)),
      u !== null && (Lt = l, u = Wu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function z () {
      let l, u;
      return l = qt, n.substr(qt, 2) === zu ? (u = zu, qt += 2) : (u = null, Wt === 0 && e(Iu)),
      u !== null && (Lt = l, u = Ju()), u === null ? (qt = l, l = u) : l = u, l
    }
    function I () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Ku ? (u = Ku, qt += 2) : (u = null, Wt === 0 && e(Nu)),
      u !== null && (Lt = l, u = Pu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function J () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Vu ? (u = Vu, qt += 2) : (u = null, Wt === 0 && e(Xu)),
      u !== null && (Lt = l, u = Yu()), u === null ? (qt = l, l = u) : l = u, l
    }
    function K () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Zu ? (u = Zu, qt += 2) : (u = null, Wt === 0 && e(_u)),
      u !== null && (Lt = l, u = nt()), u === null ? (qt = l, l = u) : l = u, l
    }
    function N () {
      let l, u;
      return l = qt, n.substr(qt, 2) === lt ? (u = lt, qt += 2) : (u = null, Wt === 0 && e(ut)),
      u !== null && (Lt = l, u = tt()), u === null ? (qt = l, l = u) : l = u, l
    }
    function P () {
      let l, u;
      return l = qt, n.substr(qt, 2) === rt ? (u = rt, qt += 2) : (u = null, Wt === 0 && e(et)),
      u !== null && (Lt = l, u = ot()), u === null ? (qt = l, l = u) : l = u, l
    }
    function V () {
      let l, u;
      return l = qt, n.substr(qt, 2) === ct ? (u = ct, qt += 2) : (u = null, Wt === 0 && e(it)),
      u !== null && (Lt = l, u = at()), u === null ? (qt = l, l = u) : l = u, l
    }
    function X () {
      let l, u;
      return l = qt, n.substr(qt, 2) === ft ? (u = ft, qt += 2) : (u = null, Wt === 0 && e(st)),
      u !== null && (Lt = l, u = ht()), u === null ? (qt = l, l = u) : l = u, l
    }
    function Y () {
      let l, u, t;
      return l = qt, n.substr(qt, 2) === dt ? (u = dt, qt += 2) : (u = null, Wt === 0 && e(pt)),
      u !== null ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(vt)),
      t !== null ? (Lt = l, u = wt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function Z () {
      let l, u, t;
      return l = qt, n.charCodeAt(qt) === 92 ? (u = At, qt++) : (u = null, Wt === 0 && e(Ct)),
      u !== null ? (gt.test(n.charAt(qt)) ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(bt)),
      t !== null ? (Lt = l, u = kt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    function _ () {
      let l, u, t, r;
      if (l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, Wt === 0 && e(xt)),
      u !== null) {
        if (t = [], yt.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(mt)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), yt.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(mt));
          }
        } else { t = il; }
        t !== null ? (Lt = l, u = Rt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il);
      } else { qt = l, l = il; }
      return l
    }
    function nl () {
      let l, u, t, r;
      if (l = qt, n.substr(qt, 2) === Ft ? (u = Ft, qt += 2) : (u = null, Wt === 0 && e(Qt)),
      u !== null) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(Ut)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(Ut));
          }
        } else { t = il; }
        t !== null ? (Lt = l, u = Et(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il);
      } else { qt = l, l = il; }
      return l
    }
    function ll () {
      let l, u, t, r;
      if (l = qt, n.substr(qt, 2) === Gt ? (u = Gt, qt += 2) : (u = null, Wt === 0 && e(Bt)),
      u !== null) {
        if (t = [], St.test(n.charAt(qt)) ? (r = n.charAt(qt), qt++) : (r = null, Wt === 0 && e(Ut)),
        r !== null) {
          for (; r !== null;) {
            t.push(r), St.test(n.charAt(qt)) ? (r = n.charAt(qt),
            qt++) : (r = null, Wt === 0 && e(Ut));
          }
        } else { t = il; }
        t !== null ? (Lt = l, u = jt(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
        l = il);
      } else { qt = l, l = il; }
      return l
    }
    function ul () {
      let l, u;
      return l = qt, n.substr(qt, 2) === Tt ? (u = Tt, qt += 2) : (u = null, Wt === 0 && e(xt)),
      u !== null && (Lt = l, u = $t()), u === null ? (qt = l, l = u) : l = u, l
    }
    function tl () {
      let l, u, t;
      return l = qt, n.charCodeAt(qt) === 92 ? (u = At, qt++) : (u = null, Wt === 0 && e(Ct)),
      u !== null ? (n.length > qt ? (t = n.charAt(qt), qt++) : (t = null, Wt === 0 && e(vt)),
      t !== null ? (Lt = l, u = bu(t), u === null ? (qt = l, l = u) : l = u) : (qt = l,
      l = il)) : (qt = l, l = il), l
    }
    let rl; const el = arguments.length > 1 ? arguments[1] : {}; const ol = {
      regexp: c
    }; let cl = c; var il = null; var al = ''; var fl = '|'; var sl = '"|"'; var hl = function (n, l) {
      return l ? new Alternate(n, l[1]) : n
    }; var dl = function (n, l, u) {
      return new Match([n].concat(l).concat([u]))
    }; var pl = '^'; var vl = '"^"'; var wl = function () {
      return new Token('start')
    }; var Al = '$'; var Cl = '"$"'; var gl = function () {
      return new Token('end')
    }; var bl = function (n, l) {
      return new Quantified(n, l)
    }; var kl = 'Quantifier'; var Tl = function (n, l) {
      return l && (n.greedy = !1), n
    }; var xl = '{'; var yl = '"{"'; var ml = ','; var Rl = '","'; var Fl = '}'; var Ql = '"}"'; var Sl = function (n, l) {
      return new Quantifier(n, l)
    }; var Ul = ',}'; var El = '",}"'; var Gl = function (n) {
      return new Quantifier(n, 1 / 0)
    }; var Bl = function (n) {
      return new Quantifier(n, n)
    }; var jl = '+'; var $l = '"+"'; var ql = function () {
      return new Quantifier(1, 1 / 0)
    }; var Ll = '*'; var Ml = '"*"'; var Dl = function () {
      return new Quantifier(0, 1 / 0)
    }; var Hl = '?'; var Ol = '"?"'; var Wl = function () {
      return new Quantifier(0, 1)
    }; var zl = /^[0-9]/; var Il = '[0-9]'; var Jl = function (n) {
      return +n.join('')
    }; var Kl = '('; var Nl = '"("'; var Pl = ')'; var Vl = '")"'; var Xl = function (n) {
      return n
    }; var Yl = function (n) {
      return new CaptureGroup(n)
    }; var Zl = '?:'; var _l = '"?:"'; var nu = function (n) {
      return new Group('non-capture-group', n)
    }; var lu = '?='; var uu = '"?="'; var tu = function (n) {
      return new Group('positive-lookahead', n)
    }; var ru = '?!'; var eu = '"?!"'; var ou = function (n) {
      return new Group('negative-lookahead', n)
    }; var cu = 'CharacterSet'; var iu = '['; var au = '"["'; var fu = ']'; var su = '"]"'; var hu = function (n, l) {
      return new CharSet(!!n, l)
    }; var du = 'CharacterRange'; var pu = '-'; var vu = '"-"'; var wu = function (n, l) {
      return new CharacterRange(n, l)
    }; var Au = 'Character'; var Cu = /^[^\\\]]/; var gu = '[^\\\\\\]]'; var bu = function (n) {
      return new Literal(n)
    }; var ku = '.'; var Tu = '"."'; var xu = function () {
      return new Token('any-character')
    }; var yu = 'Literal'; var mu = /^[^|\\\/.[()?+*$\^]/; var Ru = '[^|\\\\\\/.[()?+*$\\^]'; var Fu = '\\b'; var Qu = '"\\\\b"'; var Su = function () {
      return new Token('backspace')
    }; var Uu = function () {
      return new Token('word-boundary')
    }; var Eu = '\\B'; var Gu = '"\\\\B"'; var Bu = function () {
      return new Token('non-word-boundary')
    }; var ju = '\\d'; var $u = '"\\\\d"'; var qu = function () {
      return new Token('digit')
    }; var Lu = '\\D'; var Mu = '"\\\\D"'; var Du = function () {
      return new Token('non-digit')
    }; var Hu = '\\f'; var Ou = '"\\\\f"'; var Wu = function () {
      return new Token('form-feed')
    }; var zu = '\\n'; var Iu = '"\\\\n"'; var Ju = function () {
      return new Token('line-feed')
    }; var Ku = '\\r'; var Nu = '"\\\\r"'; var Pu = function () {
      return new Token('carriage-return')
    }; var Vu = '\\s'; var Xu = '"\\\\s"'; var Yu = function () {
      return new Token('white-space')
    }; var Zu = '\\S'; var _u = '"\\\\S"'; var nt = function () {
      return new Token('non-white-space')
    }; var lt = '\\t'; var ut = '"\\\\t"'; var tt = function () {
      return new Token('tab')
    }; var rt = '\\v'; var et = '"\\\\v"'; var ot = function () {
      return new Token('vertical-tab')
    }; var ct = '\\w'; var it = '"\\\\w"'; var at = function () {
      return new Token('word')
    }; var ft = '\\W'; var st = '"\\\\W"'; var ht = function () {
      return new Token('non-word')
    }; var dt = '\\c'; var pt = '"\\\\c"'; var vt = 'any character'; var wt = function (n) {
      return new ControlCharacter(n)
    }; var At = '\\'; var Ct = '"\\\\"'; var gt = /^[1-9]/; var bt = '[1-9]'; var kt = function (n) {
      return new BackReference(n)
    }; var Tt = '\\0'; var xt = '"\\\\0"'; var yt = /^[0-7]/; var mt = '[0-7]'; var Rt = function (n) {
      return new Octal(n.join(''))
    }; var Ft = '\\x'; var Qt = '"\\\\x"'; var St = /^[0-9a-fA-F]/; var Ut = '[0-9a-fA-F]'; var Et = function (n) {
      return new Hex(n.join(''))
    }; var Gt = '\\u'; var Bt = '"\\\\u"'; var jt = function (n) {
      return new Unicode(n.join(''))
    }; var $t = function () {
      return new Token('null-character')
    }; var qt = 0; var Lt = 0; var Mt = 0; var Dt = {
      line: 1,
      column: 1,
      seenCR: !1
    }; var Ht = 0; var Ot = []; var Wt = 0;
    if ('startRule' in el) {
      if (!(el.startRule in ol)) { throw new Error("Can't start parsing from rule \"" + el.startRule + '".') }
      cl = ol[el.startRule];
    }
    if (Token.offset = t, Token.text = u, rl = cl(), rl !== null && qt === n.length) { return rl }
    throw o(Ot), Lt = Math.max(qt, Ht), new l(Ot, Lt < n.length ? n.charAt(Lt) : null, Lt, r(Lt).line, r(Lt).column)
  }
  return n(l, Error), {
    SyntaxError: l,
    parse: u
  }
}()); var index = 1; var cgs = {};

var parser_1 = parser;

/* istanbul ignore file */

const Util$3 = {};

Util$3.extend = function extend () {
  let target = arguments[0] || {};

  let i = 1;

  const length = arguments.length;

  let options; let name; let src; let copy; let clone;

  if (length === 1) {
    target = this;
    i = 0;
  }

  for (; i < length; i++) {
    options = arguments[i];
    if (!options) { continue }

    for (name in options) {
      src = target[name];
      copy = options[name];

      if (target === copy) { continue }
      if (copy === undefined) { continue }

      if (Util$3.isArray(copy) || Util$3.isObject(copy)) {
        if (Util$3.isArray(copy)) { clone = src && Util$3.isArray(src) ? src : []; }
        if (Util$3.isObject(copy)) { clone = src && Util$3.isObject(src) ? src : {}; }

        target[name] = Util$3.extend(clone, copy);
      } else {
        target[name] = copy;
      }
    }
  }

  return target
};

Util$3.each = function each (obj, iterator, context) {
  let i, key;
  if (this.type(obj) === 'number') {
    for (i = 0; i < obj; i++) {
      iterator(i, i);
    }
  } else if (obj.length === +obj.length) {
    for (i = 0; i < obj.length; i++) {
      if (iterator.call(context, obj[i], i, obj) === false) { break }
    }
  } else {
    for (key in obj) {
      if (iterator.call(context, obj[key], key, obj) === false) { break }
    }
  }
};

Util$3.type = function type (obj) {
  return obj === null || obj === undefined ? String(obj) : Object.prototype.toString.call(obj).match(/\[object (\w+)\]/)[1].toLowerCase()
};

Util$3.each('String Object Array RegExp Function'.split(' '), function (value) {
  Util$3['is' + value] = function (obj) {
    return Util$3.type(obj) === value.toLowerCase()
  };
});

Util$3.isObjectOrArray = function (value) {
  return Util$3.isObject(value) || Util$3.isArray(value)
};

Util$3.isNumeric = function (value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
};

Util$3.keys = function (obj) {
  const keys = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { keys.push(key); }
  }
  return keys
};
Util$3.values = function (obj) {
  const values = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) { values.push(obj[key]); }
  }
  return values
};

/*
    ### Mock.heredoc(fn)

    * Mock.heredoc(fn)

    以直观、安全的方式书写（多行）HTML 模板。

    **使用示例**如下所示：

        var tpl = Mock.heredoc(function() {
            /*!
        {{email}}{{age}}
        <!-- Mock {
            email: '@EMAIL',
            age: '@INT(1,100)'
        } -->
            *\/
        })

    **相关阅读**
    * [Creating multiline strings in JavaScript](http://stackoverflow.com/questions/805107/creating-multiline-strings-in-javascript)、
*/

Util$3.heredoc = function heredoc (fn) {
  // 1. 移除起始的 function(){ /*!
  // 2. 移除末尾的 */ }
  // 3. 移除起始和末尾的空格
  return fn.toString()
    .replace(/^[^/]+\/\*!?/, '')
    .replace(/\*\/[^/]+$/, '')
    .replace(/^[\s\xA0]+/, '')
    .replace(/[\s\xA0]+$/, '') // .trim()
};

Util$3.noop = function () { };

var util$1 = Util$3;

/* istanbul ignore file */

/*
    ## Basics
*/

var basic = {
  // 返回一个随机的布尔值。
  boolean: function (min, max, cur) {
    if (cur !== undefined) {
      min = typeof min !== 'undefined' && !isNaN(min) ? parseInt(min, 10) : 1;
      max = typeof max !== 'undefined' && !isNaN(max) ? parseInt(max, 10) : 1;
      return Math.random() > 1.0 / (min + max) * min ? !cur : cur
    }

    return Math.random() >= 0.5
  },
  bool: function (min, max, cur) {
    return this.boolean(min, max, cur)
  },
  // 返回一个随机的自然数（大于等于 0 的整数）。
  natural: function (min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : 0;
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min
  },
  // 返回一个随机的整数。
  integer: function (min, max) {
    min = typeof min !== 'undefined' ? parseInt(min, 10) : -9007199254740992;
    max = typeof max !== 'undefined' ? parseInt(max, 10) : 9007199254740992; // 2^53
    return Math.round(Math.random() * (max - min)) + min
  },
  int: function (min, max) {
    return this.integer(min, max)
  },
  // 返回一个随机的浮点数。
  float: function (min, max, dmin, dmax) {
    dmin = dmin === undefined ? 0 : dmin;
    dmin = Math.max(Math.min(dmin, 17), 0);
    dmax = dmax === undefined ? 17 : dmax;
    dmax = Math.max(Math.min(dmax, 17), 0);
    let ret = this.integer(min, max) + '.';
    for (let i = 0, dcount = this.natural(dmin, dmax); i < dcount; i++) {
      ret +=
        // 最后一位不能为 0：如果最后一位为 0，会被 JS 引擎忽略掉。
        i < dcount - 1 ? this.character('number') : this.character('123456789');
    }
    return parseFloat(ret, 10)
  },
  // 返回一个随机字符。
  character: function (pool) {
    const pools = {
      lower: 'abcdefghijklmnopqrstuvwxyz',
      upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      number: '0123456789',
      symbol: '!@#$%^&*()[]'
    };
    pools.alpha = pools.lower + pools.upper;
    pools.undefined = pools.lower + pools.upper + pools.number + pools.symbol;

    pool = pools[('' + pool).toLowerCase()] || pool;
    return pool.charAt(this.natural(0, pool.length - 1))
  },
  char: function (pool) {
    return this.character(pool)
  },
  // 返回一个随机字符串。
  string: function (pool, min, max) {
    let len;
    switch (arguments.length) {
      case 0: // ()
        len = this.natural(3, 7);
        break
      case 1: // ( length )
        len = pool;
        pool = undefined;
        break
      case 2:
        // ( pool, length )
        if (typeof arguments[0] === 'string') {
          len = min;
        } else {
          // ( min, max )
          len = this.natural(pool, min);
          pool = undefined;
        }
        break
      case 3:
        len = this.natural(min, max);
        break
    }

    let text = '';
    for (let i = 0; i < len; i++) {
      text += this.character(pool);
    }

    return text
  },
  str: function (/* pool, min, max */) {
    return this.string.apply(this, arguments)
  },
  // 返回一个整型数组。
  range: function (start, stop, step) {
    // range( stop )
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    // range( start, stop )
    step = arguments[2] || 1;

    start = +start;
    stop = +stop;
    step = +step;

    const len = Math.max(Math.ceil((stop - start) / step), 0);
    let idx = 0;
    const range = new Array(len);

    while (idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range
  }
};

/* istanbul ignore file */

/*
    ## Helpers
*/

const Util$2 = util$1;

var helper = {
  // 把字符串的第一个字母转换为大写。
  capitalize: function (word) {
    return (word + '').charAt(0).toUpperCase() + (word + '').substr(1)
  },
  // 把字符串转换为大写。
  upper: function (str) {
    return (str + '').toUpperCase()
  },
  // 把字符串转换为小写。
  lower: function (str) {
    return (str + '').toLowerCase()
  },
  // 从数组中随机选取一个元素，并返回。
  pick: function pick (arr, min, max) {
    // pick( item1, item2 ... )
    if (!Util$2.isArray(arr)) {
      arr = [].slice.call(arguments);
      min = 1;
      max = 1;
    } else {
      // pick( [ item1, item2 ... ] )
      if (min === undefined) { min = 1; }

      // pick( [ item1, item2 ... ], count )
      if (max === undefined) { max = min; }
    }

    if (min === 1 && max === 1) { return arr[this.natural(0, arr.length - 1)] }

    // pick( [ item1, item2 ... ], min, max )
    return this.shuffle(arr, min, max)

    // 通过参数个数判断方法签名，扩展性太差！#90
    // switch (arguments.length) {
    // 	case 1:
    // 		// pick( [ item1, item2 ... ] )
    // 		return arr[this.natural(0, arr.length - 1)]
    // 	case 2:
    // 		// pick( [ item1, item2 ... ], count )
    // 		max = min
    // 			/* falls through */
    // 	case 3:
    // 		// pick( [ item1, item2 ... ], min, max )
    // 		return this.shuffle(arr, min, max)
    // }
  },

  /*
      打乱数组中元素的顺序，并返回。
      Given an array, scramble the order and return it.

      其他的实现思路：
          // https://code.google.com/p/jslibs/wiki/JavascriptTips
          result = result.sort(function() {
              return Math.random() - 0.5
          })
  */

  shuffle: function shuffle (arr, min, max) {
    arr = arr || [];
    const old = arr.slice(0);

    const result = [];

    let index = 0;

    const length = old.length;
    for (let i = 0; i < length; i++) {
      index = this.natural(0, old.length - 1);
      result.push(old[index]);
      old.splice(index, 1);
    }
    switch (arguments.length) {
      case 0:
      case 1:
        return result
      case 2:
        max = min;

        /* falls through */

      case 3:
        min = parseInt(min, 10);
        max = parseInt(max, 10);
        return result.slice(0, this.natural(min, max))
    }
  },

  /*
      * Random.order(item, item)
      * Random.order([item, item ...])

      顺序获取数组中的元素

      [JSON导入数组支持数组数据录入](https://github.com/thx/RAP/issues/22)

      不支持单独调用！
  */

  order: function order (array) {
    order.cache = order.cache || {};

    if (arguments.length > 1) { array = [].slice.call(arguments, 0); }

    // options.context.path/templatePath
    const options = order.options;
    const templatePath = options.context.templatePath.join('.');

    const cache =
      order.cache[templatePath] = order.cache[templatePath] || {
        index: 0,
        array: array
      };

    return cache.array[cache.index++ % cache.array.length]
  }
};

/*
    ## Mock.Random

    工具类，用于生成各种随机数据。
*/

const Util$1 = util$1;

const Random$1 = {
  extend: Util$1.extend
};

Random$1.extend(basic);
Random$1.extend(helper);

/* Random.extend(require('./date'))
Random.extend(require('./image'))
Random.extend(require('./color'))
Random.extend(require('./text'))
Random.extend(require('./name'))
Random.extend(require('./web'))
Random.extend(require('./address'))
Random.extend(require('./misc'))
*/

var random = Random$1;

/* istanbul ignore file */

/*
    ## RegExp Handler

    https://github.com/ForbesLindesay/regexp
    https://github.com/dmajda/pegjs
    http://www.regexper.com/

    每个节点的结构
        {
            type: '',
            offset: number,
            text: '',
            body: {},
            escaped: true/false
        }

    type 可选值
        alternate             |         选择
        match                 匹配
        capture-group         ()        捕获组
        non-capture-group     (?:...)   非捕获组
        positive-lookahead    (?=p)     零宽正向先行断言
        negative-lookahead    (?!p)     零宽负向先行断言
        quantified            a*        重复节点
        quantifier            *         量词
        charset               []        字符集
        range                 {m, n}    范围
        literal               a         直接量字符
        unicode               \uxxxx    Unicode
        hex                   \x        十六进制
        octal                 八进制
        back-reference        \n        反向引用
        control-character     \cX       控制字符

        // Token
        start               ^       开头
        end                 $       结尾
        any-character       .       任意字符
        backspace           [\b]    退格直接量
        word-boundary       \b      单词边界
        non-word-boundary   \B      非单词边界
        digit               \d      ASCII 数字，[0-9]
        non-digit           \D      非 ASCII 数字，[^0-9]
        form-feed           \f      换页符
        line-feed           \n      换行符
        carriage-return     \r      回车符
        white-space         \s      空白符
        non-white-space     \S      非空白符
        tab                 \t      制表符
        vertical-tab        \v      垂直制表符
        word                \w      ASCII 字符，[a-zA-Z0-9]
        non-word            \W      非 ASCII 字符，[^a-zA-Z0-9]
        null-character      \o      NUL 字符
 */

const Util = util$1;
const Random = random;

/*

    */

const Handler$1 = {
  extend: Util.extend
};

// http://en.wikipedia.org/wiki/ASCII#ASCII_printable_code_chart
/* var ASCII_CONTROL_CODE_CHART = {
    '@': ['\u0000'],
    A: ['\u0001'],
    B: ['\u0002'],
    C: ['\u0003'],
    D: ['\u0004'],
    E: ['\u0005'],
    F: ['\u0006'],
    G: ['\u0007', '\a'],
    H: ['\u0008', '\b'],
    I: ['\u0009', '\t'],
    J: ['\u000A', '\n'],
    K: ['\u000B', '\v'],
    L: ['\u000C', '\f'],
    M: ['\u000D', '\r'],
    N: ['\u000E'],
    O: ['\u000F'],
    P: ['\u0010'],
    Q: ['\u0011'],
    R: ['\u0012'],
    S: ['\u0013'],
    T: ['\u0014'],
    U: ['\u0015'],
    V: ['\u0016'],
    W: ['\u0017'],
    X: ['\u0018'],
    Y: ['\u0019'],
    Z: ['\u001A'],
    '[': ['\u001B', '\e'],
    '\\': ['\u001C'],
    ']': ['\u001D'],
    '^': ['\u001E'],
    '_': ['\u001F']
} */

// ASCII printable code chart
// var LOWER = 'abcdefghijklmnopqrstuvwxyz'
// var UPPER = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
// var NUMBER = '0123456789'
// var SYMBOL = ' !"#$%&\'()*+,-./' + ':;<=>?@' + '[\\]^_`' + '{|}~'
const LOWER = ascii(97, 122);
const UPPER = ascii(65, 90);
const NUMBER = ascii(48, 57);
const OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126); // 排除 95 _ ascii(91, 94) + ascii(96, 96)
const PRINTABLE = ascii(32, 126);
const SPACE = ' \f\n\r\t\v\u00A0\u2028\u2029';
const CHARACTER_CLASSES = {
  '\\w': LOWER + UPPER + NUMBER + '_', // ascii(95, 95)
  '\\W': OTHER.replace('_', ''),
  '\\s': SPACE,
  '\\S': (function () {
    let result = PRINTABLE;
    for (let i = 0; i < SPACE.length; i++) {
      result = result.replace(SPACE[i], '');
    }
    return result
  }()),
  '\\d': NUMBER,
  '\\D': LOWER + UPPER + OTHER
};

function ascii (from, to) {
  let result = '';
  for (let i = from; i <= to; i++) {
    result += String.fromCharCode(i);
  }
  return result
}

// var ast = RegExpParser.parse(regexp.source)
Handler$1.gen = function (node, result, cache) {
  cache = cache || {
    guid: 1
  };
  return Handler$1[node.type] ? Handler$1[node.type](node, result, cache)
    : Handler$1.token(node, result, cache)
};

Handler$1.extend({
  /* jshint unused:false */
  token: function (node, result, cache) {
    switch (node.type) {
      case 'start':
      case 'end':
        return ''
      case 'any-character':
        return Random.character()
      case 'backspace':
        return ''
      case 'word-boundary': // TODO
        return ''
      case 'non-word-boundary': // TODO
        break
      case 'digit':
        return Random.pick(
          NUMBER.split('')
        )
      case 'non-digit':
        return Random.pick(
          (LOWER + UPPER + OTHER).split('')
        )
      case 'form-feed':
        break
      case 'line-feed':
        return node.body || node.text
      case 'carriage-return':
        break
      case 'white-space':
        return Random.pick(
          SPACE.split('')
        )
      case 'non-white-space':
        return Random.pick(
          (LOWER + UPPER + NUMBER).split('')
        )
      case 'word': // \w [a-zA-Z0-9]
        return Random.pick(
          (LOWER + UPPER + NUMBER).split('')
        )
      case 'tab':
        break
      case 'vertical-tab':
        break

      case 'non-word': // \W [^a-zA-Z0-9]
        return Random.pick(
          OTHER.replace('_', '').split('')
        )
    }
    return node.body || node.text
  },

  /*
        {
            type: 'alternate',
            offset: 0,
            text: '',
            left: {
                boyd: []
            },
            right: {
                boyd: []
            }
        }
    */

  alternate: function (node, result, cache) {
    // node.left/right {}
    return this.gen(
      Random.boolean() ? node.left : node.right,
      result,
      cache
    )
  },

  /*
        {
            type: 'match',
            offset: 0,
            text: '',
            body: []
        }
    */

  match: function (node, result, cache) {
    result = '';
    // node.body []
    for (let i = 0; i < node.body.length; i++) {
      result += this.gen(node.body[i], result, cache);
    }
    return result
  },
  // ()
  'capture-group': function (node, result, cache) {
    // node.body {}
    result = this.gen(node.body, result, cache);
    cache[cache.guid++] = result;
    return result
  },
  // (?:...)
  'non-capture-group': function (node, result, cache) {
    // node.body {}
    return this.gen(node.body, result, cache)
  },
  // (?=p)
  'positive-lookahead': function (node, result, cache) {
    // node.body
    return this.gen(node.body, result, cache)
  },
  // (?!p)
  'negative-lookahead': function (node, result, cache) {
    // node.body
    return ''
  },

  /*
        {
            type: 'quantified',
            offset: 3,
            text: 'c*',
            body: {
                type: 'literal',
                offset: 3,
                text: 'c',
                body: 'c',
                escaped: false
            },
            quantifier: {
                type: 'quantifier',
                offset: 4,
                text: '*',
                min: 0,
                max: Infinity,
                greedy: true
            }
        }
    */

  quantified: function (node, result, cache) {
    result = '';
    // node.quantifier {}
    const count = this.quantifier(node.quantifier);
    // node.body {}
    for (let i = 0; i < count; i++) {
      result += this.gen(node.body, result, cache);
    }
    return result
  },

  /*
        quantifier: {
            type: 'quantifier',
            offset: 4,
            text: '*',
            min: 0,
            max: Infinity,
            greedy: true
        }
    */

  quantifier: function (node, result, cache) {
    const min = Math.max(node.min, 0);
    const max = isFinite(node.max) ? node.max
      : min + Random.integer(3, 7);
    return Random.integer(min, max)
  },

  /*

    */

  charset: function (node, result, cache) {
    // node.invert
    if (node.invert) { return this['invert-charset'](node, result, cache) }

    // node.body []
    const literal = Random.pick(node.body);
    return this.gen(literal, result, cache)
  },
  'invert-charset': function (node, result, cache) {
    let pool = PRINTABLE;
    for (var i = 0, item; i < node.body.length; i++) {
      item = node.body[i];
      switch (item.type) {
        case 'literal':
          pool = pool.replace(item.body, '');
          break
        case 'range':
          var min = this.gen(item.start, result, cache).charCodeAt();
          var max = this.gen(item.end, result, cache).charCodeAt();
          for (let ii = min; ii <= max; ii++) {
            pool = pool.replace(String.fromCharCode(ii), '');
          }

          /* falls through */

        default:
          var characters = CHARACTER_CLASSES[item.text];
          if (characters) {
            for (let iii = 0; iii <= characters.length; iii++) {
              pool = pool.replace(characters[iii], '');
            }
          }
      }
    }
    return Random.pick(pool.split(''))
  },
  range: function (node, result, cache) {
    // node.start, node.end
    const min = this.gen(node.start, result, cache).charCodeAt();
    const max = this.gen(node.end, result, cache).charCodeAt();
    return String.fromCharCode(
      Random.integer(min, max)
    )
  },
  literal: function (node, result, cache) {
    return node.escaped ? node.body : node.text
  },
  // Unicode \u
  unicode: function (node, result, cache) {
    return String.fromCharCode(
      parseInt(node.code, 16)
    )
  },
  // 十六进制 \xFF
  hex: function (node, result, cache) {
    return String.fromCharCode(
      parseInt(node.code, 16)
    )
  },
  // 八进制 \0
  octal: function (node, result, cache) {
    return String.fromCharCode(
      parseInt(node.code, 8)
    )
  },
  // 反向引用
  'back-reference': function (node, result, cache) {
    return cache[node.code] || ''
  },

  /*
        http://en.wikipedia.org/wiki/C0_and_C1_control_codes
    */

  CONTROL_CHARACTER_MAP: (function () {
    const CONTROL_CHARACTER = '@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _'.split(' ');
    const CONTROL_CHARACTER_UNICODE = '\u0000 \u0001 \u0002 \u0003 \u0004 \u0005 \u0006 \u0007 \u0008 \u0009 \u000A \u000B \u000C \u000D \u000E \u000F \u0010 \u0011 \u0012 \u0013 \u0014 \u0015 \u0016 \u0017 \u0018 \u0019 \u001A \u001B \u001C \u001D \u001E \u001F'.split(' ');
    const map = {};
    for (let i = 0; i < CONTROL_CHARACTER.length; i++) {
      map[CONTROL_CHARACTER[i]] = CONTROL_CHARACTER_UNICODE[i];
    }
    return map
  }()),
  'control-character': function (node, result, cache) {
    return this.CONTROL_CHARACTER_MAP[node.code]
  }
});

var handler = Handler$1;

/* istanbul ignore file */

const Parser = parser_1;
const Handler = handler;
var reg$2 = {
  Parser: Parser,
  Handler: Handler
};

const reg$1 = reg$2;

/**
 * @namespace Reg_prototype
 */

const gen = s => {
  /**
   * @memberof Reg_prototype#
   * @param {string} s - 正则表达式
   * @description 按照正则表达式输出相应内容
   * @function gen
   * @return {number}
   * @example
   * gen('-[1-9][0-9]{2,10}')
   * // -513
   */

  return reg$1.Handler.gen(reg$1.Parser.parse(s))
};

var reg_1 = {
  gen
};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

// @ts-check
/**
 * @namespace RequireDir_prototype
 */

const fs = require$$0;
function identity (val) {
  return val
}

var requireDir = function requireAll (options) {
  /**
   * @memberof RequireDir_prototype#
   * @param {Object} options - 目录名称或目录结构体
   * @description 递归读取制定目录下所有文件
   * @function requireAll
   * @return {Object}
   * @example
   * requireAll({ dirname: path.join(__dirname, '.', 'lib', 'tools')})
   * // {"index":{"utf8":{},"lzw":{}}}
   */

  const dirname = typeof options === 'string' ? options : options.dirname;
  const filter = options.filter || /^([^\\.].*)\.js(on)?$/;
  const modules = {};
  const resolve = options.resolve || identity;
  const map = options.map || identity;

  function filterFile (filename) {
    if (typeof filter === 'function') {
      return filter(filename)
    }

    const match = filename.match(filter);
    if (!match) {
      return 0
    }

    return match[1] || match[0]
  }

  const files = fs.readdirSync(dirname);

  files.forEach(function (file) {
    const filepath = dirname + '/' + file;
    if (fs.statSync(filepath).isDirectory()) {
      const subModules = requireAll({
        dirname: filepath,
        filter: filter,
        map: map,
        resolve: resolve
      });

      if (Object.keys(subModules).length === 0) {
        return 0
      }

      modules[map(file, filepath)] = subModules;
    } else {
      const name = filterFile(file);
      if (!name) {
        return 0
      }

      modules[map(name, filepath)] = resolve(commonjsRequire(filepath));
    }
  });

  return modules
};

/*
global BigInt
*/

/**
 * @class
 */

class Snowflake$1 {
  constructor (_workerId, _dataCenterId, _sequence) {
    this.twepoch = 1288834974657n;
    // this.twepoch = 0n
    this.workerIdBits = 5n;
    this.dataCenterIdBits = 5n;
    this.maxWrokerId = -1n ^ (-1n << this.workerIdBits); // 值为：31
    this.maxDataCenterId = -1n ^ (-1n << this.dataCenterIdBits); // 值为：31
    this.sequenceBits = 12n;
    this.workerIdShift = this.sequenceBits; // 值为：12
    this.dataCenterIdShift = this.sequenceBits + this.workerIdBits; // 值为：17
    this.timestampLeftShift = this.sequenceBits + this.workerIdBits + this.dataCenterIdBits; // 值为：22
    this.sequenceMask = -1n ^ (-1n << this.sequenceBits); // 值为：4095
    this.lastTimestamp = -1n;
    // 设置默认值,从环境变量取
    this.workerId = BigInt(_workerId) || 1n;
    this.dataCenterId = BigInt(_dataCenterId) || 1n;
    this.sequence = BigInt(_sequence) || 0n;

    if (this.workerId > this.maxWrokerId || this.workerId < 0) {
      throw new Error('0 < _workerId < maxWrokerId-[' + this.maxWrokerId + ']')
    }
    if (this.dataCenterId > this.maxDataCenterId || this.dataCenterId < 0) {
      throw new Error('0 < _dataCenterId < maxDataCenterId-[' + this.maxDataCenterId + ']')
    }
  }

  tilNextMillis (lastTimestamp) {
    /**
     * @memberof Snowflake#
     * @param {BigInt} a - 数组
     * @description 获取bigInt类型时间戳
     * @method tilNextMillis
     * @return {BigInt}
     * @example
     * tilNextMillis(1560393215020)
     * // 1560393270246
     */

    let timestamp = this.timeGen();
    while (timestamp <= lastTimestamp) {
      timestamp = this.timeGen();
    }
    return BigInt(timestamp)
  }

  timeGen () {
    /**
     * @memberof Snowflake#
     * @description 获取BigInt时间戳
     * @method timeGen
     * @return {BigInt}
     * @example
     * timeGen()
     * // 1560393270246
     */

    return BigInt(Date.now())
  }

  nextId () {
    /**
     * @memberof Snowflake#
     * @description 雪花算法获取唯一随机数
     * @method nextId
     * @return {BigInt}
     * @example
     * nextId()
     * // 1138999382948057088
     */

    let timestamp = this.timeGen();
    if (timestamp < this.lastTimestamp) {
      console.error('时钟倒退了，无法产生id ' + (this.lastTimestamp - timestamp));
      return -1 // 调用端要判断是否为-1
    }
    if (this.lastTimestamp === timestamp) {
      this.sequence = (this.sequence + 1n) & this.sequenceMask;
      if (this.sequence === 0n) {
        timestamp = this.tilNextMillis(this.lastTimestamp);
      }
    } else {
      this.sequence = 0n;
    }
    this.lastTimestamp = timestamp;
    return ((timestamp - this.twepoch) << this.timestampLeftShift) | (this.dataCenterId << this.dataCenterIdShift) | (this.workerId << this.workerIdShift) | this.sequence
  }
}
var Snowflake_1 = Snowflake$1;

/* istanbul ignore file */

var util;
var hasRequiredUtil;

function requireUtil () {
	if (hasRequiredUtil) return util;
	hasRequiredUtil = 1;
	/**
	 * @namespace Math_prototype
	 */

	const Mat = mathMatrix.mat;

	const $M = math$1;
	function zScoreNorm (a) {
	  const arr = $M.mat.transpose(a).map(x => {
	    const mean = $M.mean(x);
	    const std = $M.stddev(x);
	    x = x.map(it => (it - mean) / std);
	    return x
	  });
	  return $M.mat.transpose(arr)
	}
	function minMaxNorm (a) {
	  const arr = $M.mat.transpose(a).map(x => {
	    const max = $M.max(x);
	    const min = $M.min(x);
	    x = x.map(it => (it - min) / (max - min));
	    return x
	  });
	  return $M.mat.transpose(arr)
	}
	function minMaxScale (a) {
	  const arr = $M.mat.transpose(a).map(x => {
	    const max = $M.max(x);
	    const min = $M.min(x);
	    x = x.map(it => it / (max - min));
	    return x
	  });
	  return $M.mat.transpose(arr)
	}
	function none (a) {
	  return a
	}
	function meanStandard (a) {
	  const meanArr = [];
	  // 均值中心化
	  const arr = $M.mat.transpose(a).map(x => {
	    const mean = $M.mean(x);
	    meanArr.push(mean);
	    x = x.map(it => it - mean);
	    return x
	  });
	  return { meanMat: $M.mat.transpose(arr), meanArr: meanArr }
	}
	// 马氏距离
	function mahalanobis (mat, vecType = 0, a = 0, b = 0) {
	  // 参考 https://www.jb51.net/article/137650.htm
	  // 马氏距离要求样本数要大于维数，否则无法求协方差矩阵
	  let meanVec = [];
	  // vecType 0 全部返回 1 单点和均值向量马氏距离 2 xy2点之间马氏距离

	  const data = Mat.transpose(mat);
	  const dataT = mat;

	  const covArr = Mat.inv($M.cov(data));
	  if (vecType === 1) {
	    meanVec = [data.map(x => $M.mean(x))];
	    const simpleArr = [];
	    for (_ of dataT) {
	      const dT = Mat.transpose(meanVec);
	      // console.log(dT)
	      simpleArr.push(Math.sqrt(Mat.mul(Mat.mul(meanVec, covArr), dT)[0][0]));
	    }
	    return simpleArr
	  }
	  if (vecType === 2) {
	    const d = Mat.sub([dataT[a]], [dataT[b]]);
	    const dT = Mat.transpose(d);
	    return Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0])
	  }
	  const pairArr = [];
	  for (let i = 0; i < dataT.length; i++) {
	    for (let k = i + 1; k < dataT.length; k++) {
	      const d = Mat.sub([dataT[i]], [dataT[k]]);
	      const dT = Mat.transpose(d);
	      pairArr.push([i, k], Math.sqrt(Mat.mul(Mat.mul(d, covArr), dT)[0][0]));
	    }
	  }
	  return pairArr
	}
	// 计算信息熵/香农熵
	function infoEntropy (a) {
	  const arr = a.countAdv();
	  return -arr.reduce((x, y) => x + y.w * Math.log2(y.w), 0)
	}

	/** @description 混淆矩阵一致性检验类 error Matrix = confusion Matrix
	 */

	class ConfusionMatrix {
	  constructor (tagArr) {
	    // 如果是数组count成对象，否则，直接使用
	    this.tagCount = Array.isArray(tagArr) ? tagArr.count() : tagArr;
	    let n = 0;
	    // this.tagTotal = tagArr.length
	    this.keyMap = {};
	    for (const i in this.tagCount) {
	      this.keyMap[i] = n;
	      n++;
	    }
	    this.dimNum = n;
	    this.mat = this.fillTag(this.dimNum + 1); // 列为实际，行为测试
	  }

	  // 填入标签，形成混淆矩阵
	  fillTag (m) {
	    const a = $M.mat.zero(m + 1, m + 1);
	    const keyArr = Object.keys(this.keyMap);
	    let sum = 0;
	    for (let i = 1; i < m + 1; i++) {
	      const itemCount = this.tagCount[keyArr[i - 1]];
	      sum += itemCount || 0;
	      a[0][i] = keyArr[i - 1] || '小计';
	      a[i][0] = keyArr[i - 1] || '小计';
	      a[m][i] = itemCount || sum;
	    }
	    return a
	  }

	  getMatrix () {
	    return this
	  }

	  // 一致性检测值
	  getKappa () {
	    let diagonalSum = 0;
	    let itemsquareSum = 0;
	    for (let i = 1; i < this.dimNum + 1; i++) {
	      diagonalSum += this.mat[i][i];
	      itemsquareSum += this.mat[this.dimNum + 1][i] * this.mat[i][this.dimNum + 1];
	    }
	    const po = diagonalSum / this.mat[this.dimNum + 1][this.dimNum + 1];
	    const pe = itemsquareSum / this.mat[this.dimNum + 1][this.dimNum + 1] ** 2;

	    return { po, pe, k: (po - pe) / (1 - pe) }
	  }

	  /**
	   * @description 测试
	   * @param {string} tag1 预测成为的标签
	   * @param {string} tag2 实际标签
	   * @param {number} num 数量
	   */

	  addCountByKey (tag1, tag2, num = 1) {
	    if (this.keyMap[tag1] === void 0 || this.keyMap[tag2] === void 0) {
	      throw new Error('标签未定义')
	    }
	    this.mat[this.keyMap[tag1] + 1][this.keyMap[tag2] + 1] += num;
	    this.mat[this.keyMap[tag1] + 1][this.dimNum + 1] += num;
	  }
	}

	util = {
	  infoEntropy,
	  cov: $M.cov,
	  ConfusionMatrix,
	  mahalanobis,
	  zScoreNorm,
	  minMaxNorm,
	  meanStandard,
	  minMaxScale,
	  none
	};
	return util;
}

/* istanbul ignore file */

var DecisionTree_1;
var hasRequiredDecisionTree;

function requireDecisionTree () {
	if (hasRequiredDecisionTree) return DecisionTree_1;
	hasRequiredDecisionTree = 1;
	/**
	 * @namespace Math_prototype
	 */

	const $M = math$1;
	const util = requireUtil();
	function drawTree (inObj, outObj = {}, key, level = -1) {
	  level++;
	  if (outObj[key]) {
	    outObj[key + '&'] = ' . '.repeat(level) + $.c.y(key);
	    return
	  }
	  if (inObj[key] instanceof Array) {
	    outObj[key] = ' . '.repeat(level) + key;
	    inObj[key].forEach(item => {
	      drawTree(inObj, outObj, item, level++);
	      level--;
	    });
	  }
	  if (!inObj[key]) {
	    outObj[key] = ' . '.repeat(level) + key;
	  }
	  return outObj
	}
	// ID3 or C4.5
	class DecisionTree {
	  constructor (a, tag = [], algorithm = 'ID3') {
	    // NOTICE: a的最后一行总是 标签分类列
	    if (a <= 1 || !(a[0] instanceof Array)) {
	      throw new Error($.c.r('数据行数太少,或不是矩阵形式'))
	    }
	    this.tag = tag;
	    this.algorithm = algorithm;
	    this.rowNum = a.length; // 数据多少行,行数都是一样的
	    this.decisionObj = {};
	    this.outTree = {}; // 输出的结构树
	    this.baseEntropy = 0; // 总的信息熵
	    this.buildTree(a);
	  }

	  decisionSub (a, filterColumn = [], path = '开始决策') {
	    if (!a) {
	      return
	    }
	    if (filterColumn.length === a[0].length - 1) {
	      return
	    } // 没有维度可以再分了
	    const arr = a.copy();
	    const r = $M.mat.transpose(arr);
	    if (r[r.length - 1].countAdv()[0].v === a.length) {
	      return
	    } // 如果所有tag都是一样的，就不用再分裂了
	    delete this.decisionObj[path]; // 父亲集合可以再分裂，所以删除父亲，已经浅复制
	    let maxGain = -1; // 最大增益
	    let maxGainIdx = -1; // 最大增益索引
	    for (let i = 0; i < r.length - 1; i++) {
	      if (filterColumn.includes(i)) {
	        continue
	      }
	      const dimTagObj = {}; // 每个维度对应tag的分类对象
	      let dimEntropy = 0;
	      const splitInfo = this.algorithm === 'ID3' ? 1 : util.infoEntropy(r[i]); // 如果不是ID3 就是 C4.5

	      for (let d = 0; d < this.rowNum; d++) {
	        const item = r[i][d];
	        if (dimTagObj[item]) {
	          dimTagObj[item].count++;
	        } else {
	          dimTagObj[item] = { count: 1, tag: [] };
	        }
	        dimTagObj[item].tag.push(r[r.length - 1][d]);
	      }
	      for (const k in dimTagObj) {
	        const prob = dimTagObj[k].count / this.rowNum;
	        dimEntropy += prob * util.infoEntropy(dimTagObj[k].tag);
	      }
	      if ((this.baseEntropy - dimEntropy) / splitInfo > maxGain) {
	        maxGain = (this.baseEntropy - dimEntropy) / splitInfo;
	        maxGainIdx = i;
	      }
	    }

	    const pathArr = [];

	    arr.forEach(x => {
	      const pItem = path + '=>' + (this.tag[maxGainIdx] || maxGainIdx) + '(' + x[maxGainIdx] + ')';
	      if (this.decisionObj[pItem]) ; else {
	        pathArr.push(pItem);
	        this.decisionObj[pItem] = [];
	      }
	      this.decisionObj[pItem].push(x);
	    });
	    filterColumn.push(maxGainIdx);

	    for (let i = 0; i < pathArr.length; i++) {
	      this.decisionSub(this.decisionObj[pathArr[i]], [...filterColumn], pathArr[i]);
	    }
	  }

	  buildTree (a) {
	    const dimArr = $M.mat.transpose([...a]);
	    this.baseEntropy = util.infoEntropy(dimArr[dimArr.length - 1]); // 最后1列为分类tag列，由此列计算基础信息熵、香农熵
	    this.decisionSub(a);
	    return this.decisionObj
	  }

	  printTree () {
	    this.toTreeObj();
	    for (const i in this.outTree) {
	      console.log(this.outTree[i]);
	    }
	  }

	  toTreeObj () {
	    const treeObjArr = {};
	    const o = this.decisionObj;
	    for (const i in o) {
	      const arr = i.split('=>');
	      arr[arr.length - 1] += '==>' + o[i][0][o[i][0].length - 1] + `[${o[i].length}]`;
	      arr.forEach((x, idx) => {
	        if (treeObjArr[x]) ; else {
	          treeObjArr[x] = [];
	          if (arr[idx - 1]) {
	            treeObjArr[arr[idx - 1]].push(x);
	          }
	        }
	      });
	    }
	    this.outTree = drawTree(treeObjArr, {}, '开始决策');

	    return this.outTree
	  }
	}

	DecisionTree_1 = DecisionTree;
	return DecisionTree_1;
}

/**
 * @namespace Math_prototype
 */

var Knn_1;
var hasRequiredKnn;

function requireKnn () {
	if (hasRequiredKnn) return Knn_1;
	hasRequiredKnn = 1;
	const $M = math$1;
	// K-邻近机器学习
	class Knn {
	  constructor (xRaw, yRaw, k = 3, algorithm = 'euclidean') {
	    this.set(xRaw, yRaw, k, algorithm);
	  }

	  set (xRaw, yRaw, k = 3, algorithm = 'euclidean') {
	    this.xRaw = xRaw;
	    this.yRaw = yRaw;
	    this.k = k;
	    this.algorithm = algorithm;
	  }

	  calcDis (dimArr) {
	    return this.xRaw.map((item, idx) => {
	      return { id: idx, dis: $M.dist[this.algorithm](item, dimArr) }
	    })
	  }

	  predict (dimArr) {
	    const countObj = this.calcDis(dimArr)
	      .orderBy(['dis'], ['asc'])
	      .slice(0, this.k)
	      .map(x => this.yRaw[x.id])
	      .count();
	    return {
	      result: $M.findMax(countObj),
	      whole: countObj,
	      algorithm: this.algorithm
	    }
	  }

	  optimize (chunkSize) {
	    // 将训练集分为 训练80%和测试20% 2个集合，自动计算最佳K取值
	    const testSetLen = Math.round(this.xRaw.length * 0.2);
	    const incArr = Array.from({ length: this.xRaw.length }, (_, index) => index);
	    const testSet = incArr.chunk(chunkSize || testSetLen); // $M.combinList(incArr, testSetLen) 数组组合 太大时内存溢出，改用直接分包
	    const trainSet = testSet.map(item => incArr.except(item)); // 差集
	    const trainSetDim = trainSet.map(item => item.map(it => this.xRaw[it]));
	    const trainSetTag = trainSet.map(item => item.map(it => this.yRaw[it]));
	    const testPredictSet = testSet.map(item => item.map(it => this.xRaw[it]));
	    const testTagSet = testSet.map(item => item.map(it => this.yRaw[it]));
	    let maxRatio = 0;
	    let optimizeK = 3;
	    for (let k = optimizeK; k < 9; k += 2) {
	      let n = 0;
	      let nRight = 0;
	      for (let i = 0; i < trainSetDim.length; i++) {
	        this.set(trainSetDim[i], trainSetTag[i], k, this.algorithm);
	        for (let d = 0; d < testPredictSet[i].length; d++) {
	          if (this.predict(testPredictSet[i][d]).result.tag === testTagSet[i][d]) {
	            nRight++;
	          }
	          n++;
	        }
	      }

	      if (nRight / n > maxRatio) {
	        maxRatio = nRight / n;
	        optimizeK = k;
	      }
	    }
	    this.set(this.xRaw, this.yRaw, optimizeK, this.algorithm);
	    return { k: optimizeK, accuracy: maxRatio, algorithm: this.algorithm }
	  }
	}

	Knn_1 = Knn;
	return Knn_1;
}

/* istanbul ignore file */

var NaiveBayes_1;
var hasRequiredNaiveBayes;

function requireNaiveBayes () {
	if (hasRequiredNaiveBayes) return NaiveBayes_1;
	hasRequiredNaiveBayes = 1;
	// @ts-check
	/**
	 * 用于重置分类器的键
	 * keys we use to serialize a classifier's state
	 * fork from https://github.com/ttezel/bayes
	 */

	const STATE_KEYS = ['categories', 'docCount', 'totalDocuments', 'vocabulary', 'wordCount', 'wordFrequencyCount', 'options'];

	/**
	 * 默认分词器，英文按照空格分割单词，中文按照字符分割 可使用其他分词器代替
	 * Given an input string, tokenize it into an array of word tokens.
	 * This is the default tokenization function used if user does not provide one in `options`.
	 *
	 * @param  {String} text
	 * @return {Array}
	 */

	const defaultTokenizer = text => {
	  // 仅保留英文、中文、数字
	  const rgxPunctuation = /[^(a-zA-ZA-Яa-я\u4e00-\u9fa50-9_)+\s]/g;
	  // 英文以空格分词，中文不分词，以单个字为单位
	  return text
	    .replace(rgxPunctuation, ' ')
	    .replace(/[\u4e00-\u9fa5]/g, word => `${word} `)
	    .split(/\s+/)
	};

	/**
	 * Naive-Bayes Classifier 朴素贝叶斯
	 *
	 * This is a naive-bayes classifier that uses Laplace Smoothing.
	 *
	 */

	class NaiveBayes {
	  constructor (opt) {
	    this.options = {};
	    if (typeof opt !== 'undefined') {
	      if (!opt || typeof opt !== 'object' || Array.isArray(opt)) {
	        console.error('配置，需要是对象');
	        return -1
	      }
	      this.options = opt;
	    }
	    // 分词器
	    this.tokenizer = this.options.tokenizer || defaultTokenizer;
	    // 词汇表
	    this.vocabulary = [];
	    // 已学习的文档总数量, number of documents we have learned from
	    this.totalDocuments = 0;
	    // 分类的词频表, document frequency table for each of our categories
	    this.docCount = {};
	    // 分类词总数/概率基数, for each category, how many words total were mapped to it
	    this.wordCount = {};
	    // 分类的词频统计, word frequency table for each category
	    this.wordFrequencyCount = {};
	    // 所有分类, hashmap of our category names
	    this.categories = [];
	  }

	  /**
	   * 初始化新分类
	   * Initialize each of our data structure entries for this new category
	   *
	   * @param  {String} categoryName
	   */

	  initializeCategory (categoryName) {
	    if (!this.categories.includes(categoryName)) {
	      this.docCount[categoryName] = 0;
	      this.wordCount[categoryName] = 0;
	      this.wordFrequencyCount[categoryName] = {};
	      this.categories.push(categoryName);
	    }
	    return this
	  }

	  /**
	   * 训练朴素贝叶斯分类器，告诉它分类关系
	   * train our naive-bayes classifier by telling it what `category`
	   * the `text` corresponds to.
	   *
	   * @param  {String} text
	   * @param  {String} class
	   */

	  learn (text, category) {
	    // 初始化分类, initialize category data structures if we've never seen this category
	    this.initializeCategory(category);
	    // 更新这个分类映射的语句的数量（用于计算后面的 P(C) ）
	    // update our count of how many documents mapped to this category
	    this.docCount[category]++;
	    // 更新已学习的文档总数, update the total number of documents we have learned from
	    this.totalDocuments++;
	    // 将文本标准化为词汇数组, normalize the text into a word array
	    const tokens = this.tokenizer(text);
	    // 获取文本中每个词汇的词频（用于更新总词频）, get a frequency count for each token in the text
	    const frequencyTable = this.frequencyTable(tokens);

	    /*
	     * 更新我们的词汇和我们的词频计数这个分类
	     * Update our vocabulary and our word frequency count for this category
	     */

	    Object.keys(frequencyTable).forEach(token => {
	      // 将目标词汇添加到词汇表, add this word to our vocabulary if not already existing
	      if (!this.vocabulary.includes(token)) {
	        this.vocabulary.push(token);
	      }
	      const frequencyInText = frequencyTable[token];
	      // 在这个分类中更新这个词的频率信息（更新总词频）, update the frequency information for this word in this category
	      if (!this.wordFrequencyCount[category][token]) {
	        this.wordFrequencyCount[category][token] = frequencyInText;
	      } else {
	        this.wordFrequencyCount[category][token] += frequencyInText;
	      }
	      // 更新我们已经看到映射到这个分类的所有词汇的计数（C.wordCount，用于计算词类概率）
	      // update the count of all words we have seen mapped to this category
	      this.wordCount[category] += frequencyInText;
	    });
	    return this
	  }

	  /**
	   * 进行分类，或者说进行预测
	   * Determine what category `text` belongs to.
	   *
	   * @param  {String} text
	   * @param  {Boolean} probability
	   * @return {String} category
	   */

	  categorize (text, probability) {
	    return probability ? this.probabilities(text)[0] : this.probabilities(text)[0].category
	  }

	  /**
	   * 返回一个数组，数组内部是按照概率从高到低排序的组合
	   * Determine category probabilities for `text`.
	   *
	   * @param  {String} text
	   * @return {Array} probabilities
	   */

	  probabilities (text) {
	    // [W1,W2,W3,W4,Wn...]
	    const tokens = this.tokenizer(text);
	    const frequencyTable = this.frequencyTable(tokens);
	    // 返回由 P(W1|C) * P(W2|C) ... P(Wn|C) * P(C) 组成的数组
	    // iterate thru our categories to calculate the probability for this text
	    return this.categories
	      .map(category => {
	        // start by calculating the overall probability of this category
	        // => out of all documents we've ever looked at, how many were
	        //    mapped to this category
	        const categoryProbability = this.docCount[category] / this.totalDocuments;
	        // take the log to avoid underflow
	        let logProbability = Math.log(categoryProbability);
	        // now determine P( w | c ) for each word `w` in the text
	        Object.keys(frequencyTable).forEach(token => {
	          const frequencyInText = frequencyTable[token];
	          const tokenProbability = this.tokenProbability(token, category);
	          // console.log('token: %s category: `%s` tokenProbability: %d', token, category, tokenProbability)
	          // determine the log of the P( w | c ) for this word
	          logProbability += frequencyInText * Math.log(tokenProbability);
	        });
	        return {
	          category: category,
	          probability: logProbability
	        }
	      })
	      .sort((prev, next) => next.probability - prev.probability)
	  }

	  /**
	   * 概率计算器，用于计算"元素"属于"分类"的概率
	   * Calculate probability that a `token` belongs to a `category`
	   *
	   * @param  {String} token
	   * @param  {String} category
	   * @return {Number} probability
	   */

	  tokenProbability (token, category) {
	    // 分类中目标词汇的词频
	    const wordFrequencyCount = this.wordFrequencyCount[category][token] || 0;
	    // 分类总词汇数量
	    const wordCount = this.wordCount[category];
	    // 拉普拉斯方程，防止概率为0，P(W|C)
	    return (wordFrequencyCount + 1) / (wordCount + this.vocabulary.length)
	  }

	  /**
	   * 概率HashMap
	   * Build a frequency hashmap where
	   * - the keys are the entries in `tokens`
	   * - the values are the frequency of each entry in `tokens`
	   *
	   * @param  {Array} tokens  Normalized word array
	   * @return {Object}
	   */

	  frequencyTable (tokens) {
	    const frequencyTable = Object.create(null);
	    tokens.forEach(token => {
	      if (!frequencyTable[token]) {
	        frequencyTable[token] = 1;
	      } else {
	        frequencyTable[token]++;
	      }
	    });
	    return frequencyTable
	  }

	  /**
	   * Dump the classifier's state as a JSON string.
	   * @param {Boolean} Optionally format the serialized JSON output for easier human consumption
	   * @return {String} Representation of the classifier.
	   */

	  toJson () {
	    return JSON.stringify(this.toJsonObject(), null, 2)
	  }

	  toJsonObject () {
	    const me = this;
	    const state = {};
	    STATE_KEYS.forEach(function (key) {
	      state[key] = me[key];
	    });
	    return state
	  }

	  /**
	   * 从JSON初始化贝叶斯分类器实例（json对象，不是字符串对象）
	   * Initializes a NaiveBayes instance from a JSON state representation.
	   * Use this with classifier.toJson().
	   *
	   * @param  {String} jsonStr   state representation obtained by classifier.toJson()
	   * @return {NaiveBayes}       Classifier
	   */

	  static fromJson (o) {
	    try {
	      o = JSON.parse(o);
	    } catch (e) {
	      console.error('JSON格式不对');
	      return -1
	    }
	    o.options = o.options || {};
	    // init a new classifier
	    const classifier = new NaiveBayes(o.options);
	    // override the classifier's state
	    STATE_KEYS.forEach(key => {
	      if (o[key] === void 0) {
	        console.error(`朴素贝叶斯.fromJson: JSON 属性丢失: '${key}'.`);
	      } else {
	        classifier[key] = o[key];
	      }
	    });
	    return classifier
	  }
	}
	NaiveBayes_1 = NaiveBayes;
	return NaiveBayes_1;
}

/* istanbul ignore file */

var Svd;
var hasRequiredSvd;

function requireSvd () {
	if (hasRequiredSvd) return Svd;
	hasRequiredSvd = 1;
	// @ts-check
	/**
	 * @namespace Math_prototype
	 */

	/**
	 * This procedure computes the singular values and complete orthogonal decomposition of a real rectangular matrix A:
	 *    A = U * diag(q) * V(t), U(t) * U = V(t) * V = I
	 * where the arrays a, u, v, q represent A, U, V, q respectively. The actual parameters corresponding to a, u, v may
	 * all be identical unless withu = withv = {true}. In this case, the actual parameters corresponding to u and v must
	 * differ. m >= n is assumed (with m = a.length and n = a[0].length)
	 *
	 *  @param a {Array} Represents the matrix A to be decomposed
	 *  @param [withu] {boolean} {true} if U is desired {false} otherwise
	 *  @param [withv] {boolean} {true} if U is desired {false} otherwise
	 *  @param [eps] {Number} A constant used in the test for convergence; should not be smaller than the machine precision
	 *  @param [tol] {Number} A machine dependent constant which should be set equal to B/eps0 where B is the smallest
	 *    positive number representable in the computer
	 *
	 *  @returns {Object} An object containing:
	 *    q: A vector holding the singular values of A; they are non-negative but not necessarily ordered in
	 *      decreasing sequence
	 *    u: Represents the matrix U with orthonormalized columns (if withu is {true} otherwise u is used as
	 *      a working storage)
	 *    v: Represents the orthogonal matrix V (if withv is {true}, otherwise v is not used)
	 *
	 */

	const SVD = (a, withu, withv, eps, tol) => {
	  // Define default parameters
	  withu = withu !== void 0 ? withu : true;
	  withv = withv !== void 0 ? withv : true;
	  eps = eps || 2 ** -52;
	  tol = 1e-64 / eps;

	  // throw error if a is not defined
	  if (!a) {
	    throw new TypeError('Matrix a is not defined')
	  }

	  // Householder's reduction to bidiagonal form

	  const n = a[0].length;
	  const m = a.length;

	  if (m < n) {
	    throw new TypeError('Invalid matrix: m < n')
	  }

	  let i, j, k, l, l1, c, f, g, h, s, x, y, z;

	  g = 0;
	  x = 0;
	  const e = [];

	  const u = [];
	  const v = [];

	  // Initialize u
	  for (i = 0; i < m; i++) {
	    u[i] = new Array(n).fill(0);
	  }

	  // Initialize v
	  for (i = 0; i < n; i++) {
	    v[i] = new Array(n).fill(0);
	  }

	  // Initialize q
	  const q = new Array(n).fill(0);

	  // Copy array a in u
	  for (i = 0; i < m; i++) {
	    for (j = 0; j < n; j++) {
	      u[i][j] = a[i][j];
	    }
	  }

	  for (i = 0; i < n; i++) {
	    e[i] = g;
	    s = 0;
	    l = i + 1;
	    for (j = i; j < m; j++) {
	      s += Math.pow(u[j][i], 2);
	    }
	    if (s < tol) {
	      g = 0;
	    } else {
	      f = u[i][i];
	      g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
	      h = f * g - s;
	      u[i][i] = f - g;
	      for (j = l; j < n; j++) {
	        s = 0;
	        for (k = i; k < m; k++) {
	          s += u[k][i] * u[k][j];
	        }
	        f = s / h;
	        for (k = i; k < m; k++) {
	          u[k][j] = u[k][j] + f * u[k][i];
	        }
	      }
	    }
	    q[i] = g;
	    s = 0;
	    for (j = l; j < n; j++) {
	      s += Math.pow(u[i][j], 2);
	    }
	    if (s < tol) {
	      g = 0;
	    } else {
	      f = u[i][i + 1];
	      g = f < 0 ? Math.sqrt(s) : -Math.sqrt(s);
	      h = f * g - s;
	      u[i][i + 1] = f - g;
	      for (j = l; j < n; j++) {
	        e[j] = u[i][j] / h;
	      }
	      for (j = l; j < m; j++) {
	        s = 0;
	        for (k = l; k < n; k++) {
	          s += u[j][k] * u[i][k];
	        }
	        for (k = l; k < n; k++) {
	          u[j][k] = u[j][k] + s * e[k];
	        }
	      }
	    }
	    y = Math.abs(q[i]) + Math.abs(e[i]);
	    if (y > x) {
	      x = y;
	    }
	  }

	  // Accumulation of right-hand transformations
	  if (withv) {
	    for (i = n - 1; i >= 0; i--) {
	      if (g !== 0) {
	        h = u[i][i + 1] * g;
	        for (j = l; j < n; j++) {
	          v[j][i] = u[i][j] / h;
	        }
	        for (j = l; j < n; j++) {
	          s = 0;
	          for (k = l; k < n; k++) {
	            s += u[i][k] * v[k][j];
	          }
	          for (k = l; k < n; k++) {
	            v[k][j] = v[k][j] + s * v[k][i];
	          }
	        }
	      }
	      for (j = l; j < n; j++) {
	        v[i][j] = 0;
	        v[j][i] = 0;
	      }
	      v[i][i] = 1;
	      g = e[i];
	      l = i;
	    }
	  }

	  // Accumulation of left-hand transformations
	  if (withu) {
	    for (i = n - 1; i >= 0; i--) {
	      l = i + 1;
	      g = q[i];
	      for (j = l; j < n; j++) {
	        u[i][j] = 0;
	      }
	      if (g !== 0) {
	        h = u[i][i] * g;
	        for (j = l; j < n; j++) {
	          s = 0;
	          for (k = l; k < m; k++) {
	            s += u[k][i] * u[k][j];
	          }
	          f = s / h;
	          for (k = i; k < m; k++) {
	            u[k][j] = u[k][j] + f * u[k][i];
	          }
	        }
	        for (j = i; j < m; j++) {
	          u[j][i] = u[j][i] / g;
	        }
	      } else {
	        for (j = i; j < m; j++) {
	          u[j][i] = 0;
	        }
	      }
	      u[i][i] = u[i][i] + 1;
	    }
	  }

	  // Diagonalization of the bidiagonal form
	  eps = eps * x;
	  let testConvergence;
	  for (k = n - 1; k >= 0; k--) {
	    for (let iteration = 0; iteration < 50; iteration++) {
	      // test-f-splitting
	      testConvergence = false;
	      for (l = k; l >= 0; l--) {
	        if (Math.abs(e[l]) <= eps) {
	          testConvergence = true;
	          break
	        }
	        if (Math.abs(q[l - 1]) <= eps) {
	          break
	        }
	      }

	      if (!testConvergence) {
	        // cancellation of e[l] if l>0
	        c = 0;
	        s = 1;
	        l1 = l - 1;
	        for (i = l; i < k + 1; i++) {
	          f = s * e[i];
	          e[i] = c * e[i];
	          if (Math.abs(f) <= eps) {
	            break // goto test-f-convergence
	          }
	          g = q[i];
	          q[i] = Math.sqrt(f * f + g * g);
	          h = q[i];
	          c = g / h;
	          s = -f / h;
	          if (withu) {
	            for (j = 0; j < m; j++) {
	              y = u[j][l1];
	              z = u[j][i];
	              u[j][l1] = y * c + z * s;
	              u[j][i] = -y * s + z * c;
	            }
	          }
	        }
	      }

	      // test f convergence
	      z = q[k];
	      if (l === k) {
	        // convergence
	        if (z < 0) {
	          // q[k] is made non-negative
	          q[k] = -z;
	          if (withv) {
	            for (j = 0; j < n; j++) {
	              v[j][k] = -v[j][k];
	            }
	          }
	        }
	        break // break out of iteration loop and move on to next k value
	      }

	      // Shift from bottom 2x2 minor
	      x = q[l];
	      y = q[k - 1];
	      g = e[k - 1];
	      h = e[k];
	      f = ((y - z) * (y + z) + (g - h) * (g + h)) / (2 * h * y);
	      g = Math.sqrt(f * f + 1);
	      f = ((x - z) * (x + z) + h * (y / (f < 0 ? f - g : f + g) - h)) / x;

	      // Next QR transformation
	      c = 1;
	      s = 1;
	      for (i = l + 1; i < k + 1; i++) {
	        g = e[i];
	        y = q[i];
	        h = s * g;
	        g = c * g;
	        z = Math.sqrt(f * f + h * h);
	        e[i - 1] = z;
	        c = f / z;
	        s = h / z;
	        f = x * c + g * s;
	        g = -x * s + g * c;
	        h = y * s;
	        y = y * c;
	        if (withv) {
	          for (j = 0; j < n; j++) {
	            x = v[j][i - 1];
	            z = v[j][i];
	            v[j][i - 1] = x * c + z * s;
	            v[j][i] = -x * s + z * c;
	          }
	        }
	        z = Math.sqrt(f * f + h * h);
	        q[i - 1] = z;
	        c = f / z;
	        s = h / z;
	        f = c * g + s * y;
	        x = -s * g + c * y;
	        if (withu) {
	          for (j = 0; j < m; j++) {
	            y = u[j][i - 1];
	            z = u[j][i];
	            u[j][i - 1] = y * c + z * s;
	            u[j][i] = -y * s + z * c;
	          }
	        }
	      }
	      e[l] = 0;
	      e[k] = f;
	      q[k] = x;
	    }
	  }

	  // Number below eps should be zero
	  for (i = 0; i < n; i++) {
	    if (q[i] < eps) {
	      q[i] = 0;
	    }
	  }

	  return { u, q, v }
	};

	Svd = SVD;
	return Svd;
}

/* istanbul ignore file */

var Pca;
var hasRequiredPca;

function requirePca () {
	if (hasRequiredPca) return Pca;
	hasRequiredPca = 1;
	// @ts-check
	/**
	 * @namespace Math_prototype
	 */

	const $M = math$1;
	const util = requireUtil();

	const SVD = requireSvd();
	function findMainFactor (a, percent = 0.95) {
	  const sum = $M.sum(a);
	  let cumulat = 0;
	  for (let i = 0; i < a.length; i++) {
	    cumulat += a[i];
	    if (cumulat / sum >= percent) {
	      return i + 1
	    }
	  }
	  return a.length
	}

	/**
	 *
	 * @param {Array} data
	 * @param {Number} threshold
	 * @param {Function} normfunc
	 */

	function PCA (data, threshold = 0.95, normfunc = util.none) {
	  // 求协方差矩阵
	  const arr = util.cov($M.mat.transpose(data));
	  const qMatrx = SVD(arr);
	  const mainFactorLen = findMainFactor(qMatrx.q, threshold); // 自动发现最佳主因素，默认损失率<=5%

	  const transData = $M.mat.mul(
	    util.meanStandard(normfunc(data)).meanMat, // 数据中心化
	    qMatrx.u.map(x => x.slice(0, mainFactorLen)) // 奇异值分解
	  );
	  return {
	    mat: transData,
	    mainFactorLen,
	    u: qMatrx.u,
	    q: qMatrx.q,
	    v: qMatrx.v
	  }
	}

	Pca = PCA;
	return Pca;
}

/* istanbul ignore file */

const $M = math$1;

/**
 *
 * @param {Array} y
 * @param {Number} peridNum
 * @param {Number} nextPoint
 */

function peridForecast (y, peridNum = 7, nextPoint = 14) {
  const len = y.length;
  const x = $M.genRange(0, len - 1);
  const { a, b } = $M.linearFitting(x, y); // 去除趋势影响
  const anormalIndex = []; // 异常点
  let yModArr = []; // 周期数组
  const quantile = $M.quantileAll(y); // 统计四分位算法
  const forecastArr = y.copy().map((x, idx) => x - a * idx - b);

  forecastArr.forEach((x, idx) => {
    const it = yModArr[idx % peridNum];
    if (it) {
      it.push(x);
    } else {
      yModArr[idx % peridNum] = [];
      yModArr[idx % peridNum].push(x);
    }

    if (x < quantile.lower - a * idx - b || x > quantile.upper - a * idx - b) {
      anormalIndex.push(idx);
    }
  });
  yModArr = yModArr.map(x => $M.mean(x));
  for (let i = 0; i < nextPoint; i++) {
    const idx = len + i + 1;
    forecastArr.push(yModArr[idx % peridNum]);
  }
  return {
    forecast: forecastArr.map((x, idx) => x + a * idx + b),
    oriLen: len,
    nextPoint,
    peridNum,
    anormalIndex,
    yModArr,
    trend: { a, b }
  }
}
var ml$1 = {
  DecisionTree: requireDecisionTree(),
  Knn: requireKnn(),
  NaiveBayes: requireNaiveBayes(),
  Pca: requirePca(),
  Svd: requireSvd(),
  util: requireUtil(),
  peridForecast
};

var spinner_1;
var hasRequiredSpinner;

function requireSpinner () {
	if (hasRequiredSpinner) return spinner_1;
	hasRequiredSpinner = 1;
	// @ts-check
	const spinner = {
	  dots: '⠋⠙⠹⠸⠼⠴⠦⠧⠇⠏',
	  dots2: '⣾⣽⣻⢿⡿⣟⣯⣷',
	  dots3: '⠋⠙⠚⠞⠖⠦⠴⠲⠳⠓',
	  dots4: '⠄⠆⠇⠋⠙⠸⠰⠠⠰⠸⠙⠋⠇⠆',
	  dots5: '⠋⠙⠚⠒⠂⠂⠒⠲⠴⠦⠖⠒⠐⠐⠒⠓⠋',
	  dots6: '⠁⠉⠙⠚⠒⠂⠂⠒⠲⠴⠤⠄⠄⠤⠴⠲⠒⠂⠂⠒⠚⠙⠉⠁',
	  dots7: '⠈⠉⠋⠓⠒⠐⠐⠒⠖⠦⠤⠠⠠⠤⠦⠖⠒⠐⠐⠒⠓⠋⠉⠈',
	  dots8: ['⠁', '⠁', '⠉', '⠙', '⠚', '⠒', '⠂', '⠂', '⠒', '⠲', '⠴', '⠤', '⠄', '⠄', '⠤', '⠠', '⠠', '⠤', '⠦', '⠖', '⠒', '⠐', '⠐', '⠒', '⠓', '⠋', '⠉', '⠈', '⠈'],
	  dots9: ['⢹', '⢺', '⢼', '⣸', '⣇', '⡧', '⡗', '⡏'],
	  dots10: ['⢄', '⢂', '⢁', '⡁', '⡈', '⡐', '⡠'],
	  dots11: ['⠁', '⠂', '⠄', '⡀', '⢀', '⠠', '⠐', '⠈'],
	  dots12: [
	    '⢀⠀',
	    '⡀⠀',
	    '⠄⠀',
	    '⢂⠀',
	    '⡂⠀',
	    '⠅⠀',
	    '⢃⠀',
	    '⡃⠀',
	    '⠍⠀',
	    '⢋⠀',
	    '⡋⠀',
	    '⠍⠁',
	    '⢋⠁',
	    '⡋⠁',
	    '⠍⠉',
	    '⠋⠉',
	    '⠋⠉',
	    '⠉⠙',
	    '⠉⠙',
	    '⠉⠩',
	    '⠈⢙',
	    '⠈⡙',
	    '⢈⠩',
	    '⡀⢙',
	    '⠄⡙',
	    '⢂⠩',
	    '⡂⢘',
	    '⠅⡘',
	    '⢃⠨',
	    '⡃⢐',
	    '⠍⡐',
	    '⢋⠠',
	    '⡋⢀',
	    '⠍⡁',
	    '⢋⠁',
	    '⡋⠁',
	    '⠍⠉',
	    '⠋⠉',
	    '⠋⠉',
	    '⠉⠙',
	    '⠉⠙',
	    '⠉⠩',
	    '⠈⢙',
	    '⠈⡙',
	    '⠈⠩',
	    '⠀⢙',
	    '⠀⡙',
	    '⠀⠩',
	    '⠀⢘',
	    '⠀⡘',
	    '⠀⠨',
	    '⠀⢐',
	    '⠀⡐',
	    '⠀⠠',
	    '⠀⢀',
	    '⠀⡀'
	  ],
	  line: ['-', '\\', '|', '/'],
	  line2: ['⠂', '-', '–', '—', '–', '-'],
	  pipe: ['┤', '┘', '┴', '└', '├', '┌', '┬', '┐'],
	  simpleDots: ['.  ', '.. ', '...', '   '],
	  simpleDotsScrolling: ['.  ', '.. ', '...', ' ..', '  .', '   '],
	  star: ['✶', '✸', '✹', '✺', '✹', '✷'],
	  star2: ['+', 'x', '*'],
	  flip: ['_', '_', '_', '-', '`', '`', "'", '´', '-', '_', '_', '_'],
	  hamburger: ['☱', '☲', '☴'],
	  growVertical: ['▁', '▃', '▄', '▅', '▆', '▇', '▆', '▅', '▄', '▃'],
	  growHorizontal: ['▏', '▎', '▍', '▌', '▋', '▊', '▉', '▊', '▋', '▌', '▍', '▎'],
	  balloon: [' ', '.', 'o', 'O', '@', '*', ' '],
	  balloon2: ['.', 'o', 'O', '°', 'O', 'o', '.'],
	  noise: ['▓', '▒', '░'],
	  bounce: ['⠁', '⠂', '⠄', '⠂'],
	  boxBounce: ['▖', '▘', '▝', '▗'],
	  boxBounce2: ['▌', '▀', '▐', '▄'],
	  triangle: ['◢', '◣', '◤', '◥'],
	  arc: ['◜', '◠', '◝', '◞', '◡', '◟'],
	  circle: ['◡', '⊙', '◠'],
	  squareCorners: ['◰', '◳', '◲', '◱'],
	  circleQuarters: ['◴', '◷', '◶', '◵'],
	  circleHalves: ['◐', '◓', '◑', '◒'],
	  squish: ['╫', '╪'],
	  toggle: ['⊶', '⊷'],
	  toggle2: ['▫', '▪'],
	  toggle3: ['□', '■'],
	  toggle4: ['■', '□', '▪', '▫'],
	  toggle5: ['▮', '▯'],
	  toggle6: ['ဝ', '၀'],
	  toggle7: ['⦾', '⦿'],
	  toggle8: ['◍', '◌'],
	  toggle9: ['◉', '◎'],
	  toggle10: ['㊂', '㊀', '㊁'],
	  toggle11: ['⧇', '⧆'],
	  toggle12: ['☗', '☖'],
	  toggle13: ['=', '*', '-'],
	  arrow: ['←', '↖', '↑', '↗', '→', '↘', '↓', '↙'],
	  arrow2: ['⬆️ ', '↗️ ', '➡️ ', '↘️ ', '⬇️ ', '↙️ ', '⬅️ ', '↖️ '],
	  arrow3: ['▹▹▹▹▹', '▸▹▹▹▹', '▹▸▹▹▹', '▹▹▸▹▹', '▹▹▹▸▹', '▹▹▹▹▸'],
	  bouncingBar: ['[    ]', '[=   ]', '[==  ]', '[=== ]', '[ ===]', '[  ==]', '[   =]', '[    ]', '[   =]', '[  ==]', '[ ===]', '[====]', '[=== ]', '[==  ]', '[=   ]'],
	  bouncingBall: ['( ●    )', '(  ●   )', '(   ●  )', '(    ● )', '(     ●)', '(    ● )', '(   ●  )', '(  ●   )', '( ●    )', '(●     )'],
	  smiley: ['😄 ', '😝 '],
	  monkey: ['🙈 ', '🙈 ', '🙉 ', '🙊 '],
	  hearts: ['💛 ', '💙 ', '💜 ', '💚 ', '❤️ '],
	  clock: ['🕛 ', '🕐 ', '🕑 ', '🕒 ', '🕓 ', '🕔 ', '🕕 ', '🕖 ', '🕗 ', '🕘 ', '🕙 ', '🕚 '],
	  earth: ['🌍 ', '🌎 ', '🌏 '],
	  moon: ['🌑 ', '🌒 ', '🌓 ', '🌔 ', '🌕 ', '🌖 ', '🌗 ', '🌘 '],
	  runner: ['🚶 ', '🏃 '],
	  pong: [
	    '▐⠂       ▌',
	    '▐⠈       ▌',
	    '▐ ⠂      ▌',
	    '▐ ⠠      ▌',
	    '▐  ⡀     ▌',
	    '▐  ⠠     ▌',
	    '▐   ⠂    ▌',
	    '▐   ⠈    ▌',
	    '▐    ⠂   ▌',
	    '▐    ⠠   ▌',
	    '▐     ⡀  ▌',
	    '▐     ⠠  ▌',
	    '▐      ⠂ ▌',
	    '▐      ⠈ ▌',
	    '▐       ⠂▌',
	    '▐       ⠠▌',
	    '▐       ⡀▌',
	    '▐      ⠠ ▌',
	    '▐      ⠂ ▌',
	    '▐     ⠈  ▌',
	    '▐     ⠂  ▌',
	    '▐    ⠠   ▌',
	    '▐    ⡀   ▌',
	    '▐   ⠠    ▌',
	    '▐   ⠂    ▌',
	    '▐  ⠈     ▌',
	    '▐  ⠂     ▌',
	    '▐ ⠠      ▌',
	    '▐ ⡀      ▌',
	    '▐⠠       ▌'
	  ],
	  shark: [
	    '▐|\\____________▌',
	    '▐_|\\___________▌',
	    '▐__|\\__________▌',
	    '▐___|\\_________▌',
	    '▐____|\\________▌',
	    '▐_____|\\_______▌',
	    '▐______|\\______▌',
	    '▐_______|\\_____▌',
	    '▐________|\\____▌',
	    '▐_________|\\___▌',
	    '▐__________|\\__▌',
	    '▐___________|\\_▌',
	    '▐____________|\\▌',
	    '▐____________/|▌',
	    '▐___________/|_▌',
	    '▐__________/|__▌',
	    '▐_________/|___▌',
	    '▐________/|____▌',
	    '▐_______/|_____▌',
	    '▐______/|______▌',
	    '▐_____/|_______▌',
	    '▐____/|________▌',
	    '▐___/|_________▌',
	    '▐__/|__________▌',
	    '▐_/|___________▌',
	    '▐/|____________▌'
	  ],
	  dqpb: ['d', 'q', 'p', 'b'],
	  weather: ['☀️ ', '☀️ ', '☀️ ', '🌤 ', '⛅️ ', '🌥 ', '☁️ ', '🌧 ', '🌨 ', '🌧 ', '🌨 ', '🌧 ', '🌨 ', '⛈ ', '🌨 ', '🌧 ', '🌨 ', '☁️ ', '🌥 ', '⛅️ ', '🌤 ', '☀️ ', '☀️ '],
	  christmas: ['🌲', '🎄'],
	  grenade: ['،   ', '′   ', ' ´ ', ' ‾ ', '  ⸌', '  ⸊', '  |', '  ⁎', '  ⁕', ' ෴ ', '  ⁓', '   ', '   ', '   '],
	  point: ['∙∙∙', '●∙∙', '∙●∙', '∙∙●', '∙∙∙'],
	  layer: ['-', '=', '≡']
	};
	spinner_1 = spinner;
	return spinner_1;
}

// @ts-check
/**
 * @class
 */

class Spinner$1 {
  // 构造函数
  constructor (type = 'bouncingBar') {
    this.frames = requireSpinner()[type];
    this.index = 0;
    this.timer = {};
    this.showTxt = '';
  }

  // 设置动画显示文字
  setShowTxt (s) {
    /**
     * @memberof Spinner#
     * @param {string} s - 文字内容
     * @description 设置动画显示文字
     * @method setShowTxt
     * @example
     * setShowTxt('test')
     */

    this.showTxt = s;
  }

  start (s) {
    /**
     * 启动
     * @memberof Spinner#
     * @param {string} s - 文字内容
     * @description 启动
     * @method start
     * @example
     * start('test')
     */

    this.showTxt = s ?? this.showTxt;
    this.timer = setInterval(() => {
      this.index = ++this.index % this.frames.length;
      // process.stdout.clearLine() //输出闪动
      process.stdout.write(`\r ${this.frames[this.index]} ${this.showTxt || 'Waiting...'}`);
      // process.stdout.cursorTo(colum, row)
    }, 100);
  }

  stop () {
    /**
     * 停止
     * @memberof Spinner#
     * @description 停止
     * @method stop
     * @example
     * stop('test')
     */

    clearInterval(+this.timer);
    try {
      process.stdout.cursorTo(0);
      process.stdout.clearLine(0);
    } catch (e) {
      /* do nothing */
    }
  }
}
var Spinner_1 = Spinner$1;

var require$$2 = [
	"倚楼听戏，临池赏尽浮灯月华，惊鸿刹那，见你秋波恍如倾世桃花。",
	"山之高，月出小，月之小，何皎皎，我有所思在远道，一日不见兮，我心悄悄。",
	"醉过才知酒浓，爱过才知情重。你不能做我的诗，正如我不能做你的梦。",
	"最幸福不过是，你曾温柔呼唤，而我恰好有过应答。",
	"不知道这漫天的雨是谁碎了的心，只是在这多雨的季节诗意般落下。",
	"不是蝴蝶飞不过沧海，而是彼岸已经没有了期待。",
	"你不能做我的诗，正如我不能做你的梦。",
	"多少红颜悴，多少相思碎，唯留血染墨香哭乱冢。",
	"白花花的一片银色，好像倾泻在山上的秋阳一般。",
	"大多时间都在匆忙追赶，其实仅差一个转身回眸而已。",
	"不经意的遇见，辗转了千年，咫尺天涯间，散落了一地的荒诞。",
	"像孩子一样真诚，像夕阳一样唯美，像天空一样宁静。",
	"最后我也丢了诗和梦想，放弃了残存的骄傲，独自一人流浪远方。",
	"秋寒至才知风雨有力能蚀骨，故人散方悟相思千行无笔书。",
	"喜欢一个人的感觉，就像五六月的梅雨，总带着一些唯美一点毒，却又自愿深陷其中。",
	"曾许黄泉碧落，死生契阔，而今人影婆娑，爱恨蹉跎。",
	"那年未见尘世繁华，未负半生牵挂，而今岁月飒沓，人已天涯。",
	"前尘如故地唯美白雪，芳时明月，空悲切，终离别。",
	"谁的眼如初清浅，谁的眸如初安然，谁的过往成了谁的思念。",
	"你轻言无关风月的轻描淡写，一如旧欢搁浅惊艳的满地残雪。",
	"曾经朝思暮念的少年，如今错落成了谁的姻缘，曾经清明通透的凡心一点，如今荒芜了谁的人烟。",
	"我要像果仁一样洁净，在你的心中安睡。我要汇入你的湖泊，在水底静静地长成大树。",
	"或轻、或淡、或深、或浅，在心的流离之处，存放安然。",
	"我一直在等一个你，希望那天，不早不晚，风景刚好。",
	"伊人一笑便倾城，使吾见之醉半生，为再次观伊人笑，烽火台上戏众生。",
	"年轻的我们 ，容易把感动当成爱情， 也容易把过客当成挚爱。",
	"别忧郁，你的前面是阳光，你的背后还有我，如果你看不到阳光了，就回头来看我。",
	"文字有时候会散发出淡淡的幽香，又有的时候会散发出淡淡的忧伤。",
	"可否把此生的遗憾化作为来世的羁绊，以后纵使黄泉路上忘川河畔也可心安。",
	"我喜欢初春的树、盛夏的风、深秋的雨、冬至的雪和每天的你。",
	"花开半夏，如诗如画，蒲公英开，随风天涯，生如夏花，一梦繁华，花前月下，绽放年华。",
	"琴声转起，离魂夜，雨中舞，花落满地，为你舞最后倾国倾城。",
	"这一世，我从雨中走来，涤尽俗世尘埃；这一次，我将前尘放开，绽放于漫天湖海。",
	"烟雨江南，一世繁华，待我倾尽天下，只为陪你踏碎那一场盛世烟花。",
	"夕阳又下小楼，我日日如此消磨时光，心境如水烟迷离，寂寞为空山落花。",
	"在每一个清晨，记得早起，努力追逐第一缕阳光，选一种姿态，让自己活得无可替代。",
	"静水流深，沧笙踏歌。三生阴晴圆缺，一朝悲欢离合。",
	"有缘相遇，无缘相聚，天涯海角，但愿相忆。有幸相知，无幸相守，苍海明月，天长地久。",
	"你说霞染天光，陌上花开与谁享；后来烟笼柳暗，湖心水动影无双。",
	"人道海水深，不抵相思半。海水尚有涯，相思渺无畔。",
	"愿你我在落雪之时相见，久久未言，脱口一句好久不见甚是思念。",
	"最美的感觉是，当我在人群中回首望向你的时候，你也站在那里看着我。",
	"我一生最奢侈的事，就是途中与你相遇，然后相濡以沫，共闻花香。",
	"人生如逆旅，我亦是行人，但愿初相遇，不负有心人。",
	"一念成悦，处处繁华处处锦。一念成执，寸寸相思寸寸灰。",
	"有些风景，只能够喜欢，却不能收藏，有些人，只适合遇见，却不适合久伴。",
	"人生只似风前絮，欢也零星，悲也零星，都作连江点点萍。",
	"世上何物最易催少年老，半是心中积霜半是人影杳。",
	"邂逅一首好词，如同在春之暮野，邂逅一个人，眼波流转，微笑蔓延，黯然心动。",
	"人是懂得回忆的动物，寂寞是因为失去。只是，很多事，当时只道是寻常。",
	"看时间万物却寻不到你的影子，想放弃却无法将你忘记。",
	"被彻底颠覆的生活如一道未尽的路横亘在前，世界之大，我却不知其折或远。",
	"车窗外一闪而逝的绿色快得拉成了一条项链，轻轻为我戴上。",
	"那些花朵一样摇曳的过去，像时光一样没有办法库存。",
	"孤独的执伞人在雨中只有手中的伞，而我淋雨人即便孤独却有万千雨滴与我作伴。",
	"把醉了的明天寄托在潘多拉的琴弦、浮沉余生虚伪地歌咏天上人间。",
	"谁的寂寞，覆我华裳。谁的华裳，覆我肩膀。",
	"我在漫天风雪的回忆里披荆斩棘、你却在哪一个的字典里演绎皈依。",
	"一身覆雪，雪洗风尘。凝视旷野，雪落无言，心灵沉静如冬。",
	"一瞬的永恒，只是浮华里的一个瑰梦，如烟花。",
	"生活就是这样，你越是想要得到的东西，往往要到你不再追逐的时候才姗姗来迟。",
	"假如每次想起你我都会得到一朵鲜花，那么我将永远在花丛中徜徉。",
	"从马尾到卷发，从衬衫到长裙，从帆布到高跟，从素颜到淡妆，从青涩到成熟，青春也就这么长。",
	"对花对酒，落梅成愁，十里长亭水悠悠。",
	"桃花笑尽春风，再难觅，何处相守，何来相聚。",
	"孤意如月寂如莲，孤月独映人不眠，灯深月浅两相念。",
	"我独自站在云水之涯，眺望我求不得的你啊，掌间盛开了冻伤的优钵罗花。",
	"纤指红尘，醉影笑惊鸿，皓月长歌把酒临风，倾杯畅饮，尽长虹。",
	"挥袖抚琴，七弦玲珑，芦苇客舟，雨朦胧。",
	"前生乌衣巷，月潮空城荡，素面望，北城墙，桂树已蔓火光。",
	"荏苒岁月覆盖的过往，白驹过隙，匆匆的铸成一抹哀伤。",
	"相思弦，尘缘浅，红尘一梦弹指间。轮回换，宿命牵，回眸看旧缘。",
	"孤意如月寂如莲，孤月独映人不眠，灯深月浅两相念。",
	"万里江山尘飞扬，叹日久思望乡。故人老，青丝，染成霜。念离别，离别伤。",
	"情不知所起，一往而情深，怎奈何，如花美眷，终不敌，似水流年。",
	"我是人间惆怅客，知君何事泪纵横，断肠声里忆平生。",
	"梦湿空阶，频敲云子惊残漏。一杯浊酒，难看红尘透。",
	"万种思量，多方开解，只凭寂寞厌厌地。系我生命心，负你千行泪。",
	"在那个寒冷的季节，所有的人都躲避风雨，只有你陪我一齐歌唱。",
	"来是偶然的，走是必然的。因此你务必，随缘不变，不变随缘。",
	"深夜听着旋律哭泣，我怕寂寞的黑。用音乐陪伴自我。",
	"时刻是面斑驳的墙，却框不住心在回忆里轮回。",
	"新欢旧爱，在新欢面前说忘记了旧爱，在旧爱面前说厌倦了新欢。",
	"丢失在雨里，迷失向风中，忘记的就象昨日的流水，在海里那头，夕阳陪你度过。",
	"闭上眼，飞花铺天盖地地涌过来，像是谁的回忆，突然从天而降。",
	"总在不经意的年生。回首彼岸，纵然发现光景绵长。",
	"月光的森然，乐律的精魂，一切只是幻影，稍纵即逝。",
	"滴水穿石，不因其力量，而因其坚韧不拔锲而不舍。",
	"我是就应和星星一齐数着你的心事，还是就应和你一齐数着天上的星星。",
	"是是非非的凡尘，梦一般碎落，风一样无痕。",
	"你连叹息都能够美得像是在微笑，这样要我怎样画出悲伤的你。",
	"不知觉的在玻璃窗上呵出你的名字，原来你一向在我心里。",
	"季节总是要经过一场无奈的离别之后，才会让那份友情深入骨髓。",
	"连宇宙也在谎言中甘愿化作浮尘。连信仰也甘愿化作一地尘埃。",
	"今生的重唱，只能改为独唱，所有的合奏，终将也成为清音。",
	"一曲一歌，一醉一醒，一梦生命，也许，人生就是如此而已。",
	"生活其实也很简单，喜欢的就争取，得到的就珍惜，失去了就忘记。",
	"人生，过路客不说唏嘘。人间，你和我但是寄居。",
	"青春和时光都会凋零，只有住在心里的那一朵花能够永远地灿烂下去。",
	"生活是种律动，须有光有影，有左有右，有晴有雨，味道就含在这变而不猛的曲折里。",
	"有些记忆，注定无法抹去；就像有些人，注定无法替代一样。",
	"单调而沉闷的空气窒息着我幼小的心灵，缠绕着我飞翔的翅膀。",
	"童年的那一个个追逐嬉笑的日子，有如行云流水般在我的性命的旅途中流淌。",
	"遥远的距离使我相思成灰，阴阳的间隔使我欲哭无泪。",
	"总有一些句子，会滴墨成伤；总有一个人，会在记忆里站成永恒。",
	"自我是蓝色的，音乐是悠扬的，情绪是透明的，灵魂是飞舞的。",
	"或许，转身是为了忘却，但是，转过身，却发觉，有一种撕心裂肺叫做思念。",
	"细数门前落叶，倾听窗外雨声，涉水而过的声音此次响起，你被雨淋湿的心，是否依旧。",
	"人生，有时轻似风，淡如水，有时浓如油，烈如酒。",
	"大把大把的时光从指缝间遛走，留下许多叫知识和情感的东西握在手里。",
	"思念不重，像一整个秋天的落叶。",
	"美人鱼的童话让我坚信感情，也让我明白并非每段完美的感情都有一个幸福的结局。",
	"感情犹如泡泡糖，甜甜的味道，却不是谁都能够吹起来品尝它的美妙。",
	"淋过雨的空气，疲倦了的悲哀，我记忆里的童话已经慢慢的融化。",
	"记忆像是倒在手心里的水，不论是摊平还是握紧，终究还是会从指缝中一滴一滴流淌干净。",
	"愿我来世，得菩提时，身如琉璃，内外明澈，净无瑕秽。",
	"我想化作一阵春风，被生活热爱，被岁月歌颂，被你留在身边。",
	"世上有很多美好的事物等着你，所以你要内心温柔，安静努力。",
	"岁月冗长我才明白并不是所有的念念不忘都能听到回响。",
	"我还是很喜欢你，就像风走了八百里，不问归期。"
];

// @ts-check
const tools$1 = tools_1;
const fake$1 = fake$2;

/**
 * @namespace Mock
 */

function genEnum (a = []) {
  /**
   * @memberof Mock#
   * @param {Array} a - 数组
   * @description 随机获取数组中元素
   * @function genEnum
   * @return {string}
   * @example
   * genEnum([2, 1, 8.1, 3, 4, 5.1, 6.7])
   * // 3
   */

  return a[tools$1.rnd(0, a.length - 1)]
}
function genBool () {
  /**
   * @memberof Mock#
   * @description 随机bool值
   * @function genBool
   * @return {number}
   * @example
   * genBool()
   * // 1
   */

  return genEnum([0, 1])
}
function genWord (n = 1) {
  /**
   * @memberof Mock#
   * @description n个随机汉字
   * @param {number} n - 汉字个数
   * @function genWord
   * @return {string}
   * @example
   * genWord(5)
   * // 用们生到作
   */

  const word =
    '的一是在不了有和人这中大为上个国我以要他时来用们生到作地于出就分对成会可主发年动同工也能下过子说产种面而方后多定行学法所民得经十三之进着等部度家电力里如水化高自二理起小物现实加量都两体制机当使点从业本去把性好应开它合还因由其些然前外天政四日那社义事平形相全表间样与关各重新线内数正心反你明看原又么利比或但质气第向道命此变条只没结解问意建月公无系军很情者最立代想已通并提直题党程展五果料象员革位入常文总次品式活设及管特件长求老头基资边流路级少图山统接知较将组见计别她手角期根论运农指几九区强放决西被干做必战先回则任取据处队南给色光门即保治北造百规热领七海口东导器压志世金增争济阶油思术极交受联什认六共权收证改清己美再采转更单风切打白教速花带安场身车例真务具万每目至达走积示议声报斗完类八离华名确才科张信马节话米整空元况今集温传土许步群广石记需段研界拉林律叫且究观越织装影算低持音众书布复容儿须际商非验连断深难近矿千周委素技备半办青省列习响约支般史感劳便团往酸历市克何除消构府称太准精值号率族维划选标写存候毛亲快效斯院查江型眼王按格养易置派层片始却专状育厂京识适属圆包火住调满县局照参红细引听该铁价严龙飞';
  return fake$1.randData(word, n)
}
function genText (n = 20) {
  /**
   * @memberof Mock#
   * @description n个随机汉字
   * @param {number} n - 汉字个数
   * @function genText
   * @return {string}
   * @example
   * genText(5) //默认是长度为20的一段文字
   * // 用社员际个
   */

  if (n >= 20) {
    const len1 = ~~(n / 3);
    const len2 = ~~((n - len1) / 2);
    const len3 = n - len1 - len2 - 3;
    return genWord(len1) + '，' + genWord(len2) + '，' + genWord(len3) + '。'
  }
  return genWord(n)
}
function genConstellation () {
  /**
   * @memberof Mock#
   * @description 随机星座
   * @function genConstellation
   * @return {string}
   * @example
   * genConstellation()
   * // 狮子座
   */

  return genEnum(['白羊座', '金牛座', '双子座', '巨蟹座', '狮子座', '处女座', '天秤座', '天蝎座', '射手座', '摩羯座', '水瓶座', '双鱼座'])
}
function genBeautyText () {
  /**
   * @memberof fake#
   * @description 随机抽取一句唯美句子
   * @function genBeautyText
   * @return {String}
   * @example
   * console.log($.fake.genBeautyText())
   */

  const text = require$$2;
  return text.pick()
}
const extObj = {
  genUUID: tools$1.uuid,
  genDatetime: function (startTime, endTime) {
    /**
     * @memberof Mock#
     * @description 在某一时间段内随机生成日期,"2013-02-15 21:00:00",返回值类型为字符串
     * @function genDatetime
     * @param {String|Date} startTime - 开始时间
     * @param {String|Date} endTime - 结束时间
     * @return {String}
     * @example
     * console.log($.fake.randTime("2013-02-15 21:00:00", "2014-02-15 21:00:00"))
     */

    return fake$1.randTime(startTime, endTime)
  },
  genData: function (o = 'abcdefghijklmnopqrstuvwxyz', n = 10) {
    /**
     * @memberof Mock#
     * @description 随机生成长度为n的字符串
     * @function randData
     * @param {Number} o - 数据源
     * @param {Number} n - 长度
     * @return {String}
     * @example
     * console.log($.fake.randData(0,10))
     */

    return fake$1.randData(o, n)
  },
  genName: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成姓名,长度为2或3
     * @function randName
     * @return {String}
     * @example
     * console.log($.fake.randName())
     */

    return fake$1.randName(params)
  },
  genCard: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成中国身份证号码
     * @function idCard
     * @return {String}
     * @example
     * console.log($.fake.idCard())
     */

    return fake$1.idCard(params)
  },
  genIp: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成ip地址
     * @function randIp
     * @return {String}
     * @example
     * console.log($.fake.randIp())
     */

    return fake$1.randIp(params)
  },
  genUrl: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成url
     * @function randUrl
     * @param {Number} n - 域名长度
     * @return {String}
     * @example
     * console.log($.fake.randUrl(12))
     */

    return fake$1.randUrl(params)
  },
  genPhone: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成中国手机号
     * @function phoneNum
     * @return {String}
     * @example
     * console.log($.fake.phoneNum())
     */

    return fake$1.phoneNum(params)
  },
  genColor: function (params) {
    /**
     * @memberof Mock#
     * @description 随机生成颜色,
     * @function randColor
     * @param {String | null} colorType - 参数二选一  [null|'rgba']
     * @return {String}
     * @example
     * console.log($.fake.randColor('rgba'))
     */

    return fake$1.randColor(params)
  },
  genImg: fake$1.genImg,
  genWord: genWord,
  genText: genText,
  genConstellation: genConstellation,
  genBool: genBool,
  genEnum: genEnum,
  genBeautyText: genBeautyText,
  genList: function (length, step = 1) {
    return Array.from({ length }, (_, index) => index * step)
    // return [...new Array(len).keys()]
  }
};
var Mock$1 = extObj;

/* istanbul ignore file */

/**
 * @class
 */

const VERSIONS = [
  null,
  [[10, 7, 17, 13], [1, 1, 1, 1], []],
  [
    [16, 10, 28, 22],
    [1, 1, 1, 1],
    [4, 16]
  ],
  [
    [26, 15, 22, 18],
    [1, 1, 2, 2],
    [4, 20]
  ],
  [
    [18, 20, 16, 26],
    [2, 1, 4, 2],
    [4, 24]
  ],
  [
    [24, 26, 22, 18],
    [2, 1, 4, 4],
    [4, 28]
  ],
  [
    [16, 18, 28, 24],
    [4, 2, 4, 4],
    [4, 32]
  ],
  [
    [18, 20, 26, 18],
    [4, 2, 5, 6],
    [4, 20, 36]
  ],
  [
    [22, 24, 26, 22],
    [4, 2, 6, 6],
    [4, 22, 40]
  ],
  [
    [22, 30, 24, 20],
    [5, 2, 8, 8],
    [4, 24, 44]
  ],
  [
    [26, 18, 28, 24],
    [5, 4, 8, 8],
    [4, 26, 48]
  ],
  [
    [30, 20, 24, 28],
    [5, 4, 11, 8],
    [4, 28, 52]
  ],
  [
    [22, 24, 28, 26],
    [8, 4, 11, 10],
    [4, 30, 56]
  ],
  [
    [22, 26, 22, 24],
    [9, 4, 16, 12],
    [4, 32, 60]
  ],
  [
    [24, 30, 24, 20],
    [9, 4, 16, 16],
    [4, 24, 44, 64]
  ],
  [
    [24, 22, 24, 30],
    [10, 6, 18, 12],
    [4, 24, 46, 68]
  ],
  [
    [28, 24, 30, 24],
    [10, 6, 16, 17],
    [4, 24, 48, 72]
  ],
  [
    [28, 28, 28, 28],
    [11, 6, 19, 16],
    [4, 28, 52, 76]
  ],
  [
    [26, 30, 28, 28],
    [13, 6, 21, 18],
    [4, 28, 54, 80]
  ],
  [
    [26, 28, 26, 26],
    [14, 7, 25, 21],
    [4, 28, 56, 84]
  ],
  [
    [26, 28, 28, 30],
    [16, 8, 25, 20],
    [4, 32, 60, 88]
  ],
  [
    [26, 28, 30, 28],
    [17, 8, 25, 23],
    [4, 26, 48, 70, 92]
  ],
  [
    [28, 28, 24, 30],
    [17, 9, 34, 23],
    [4, 24, 48, 72, 96]
  ],
  [
    [28, 30, 30, 30],
    [18, 9, 30, 25],
    [4, 28, 52, 76, 100]
  ],
  [
    [28, 30, 30, 30],
    [20, 10, 32, 27],
    [4, 26, 52, 78, 104]
  ],
  [
    [28, 26, 30, 30],
    [21, 12, 35, 29],
    [4, 30, 56, 82, 108]
  ],
  [
    [28, 28, 30, 28],
    [23, 12, 37, 34],
    [4, 28, 56, 84, 112]
  ],
  [
    [28, 30, 30, 30],
    [25, 12, 40, 34],
    [4, 32, 60, 88, 116]
  ],
  [
    [28, 30, 30, 30],
    [26, 13, 42, 35],
    [4, 24, 48, 72, 96, 120]
  ],
  [
    [28, 30, 30, 30],
    [28, 14, 45, 38],
    [4, 28, 52, 76, 100, 124]
  ],
  [
    [28, 30, 30, 30],
    [29, 15, 48, 40],
    [4, 24, 50, 76, 102, 128]
  ],
  [
    [28, 30, 30, 30],
    [31, 16, 51, 43],
    [4, 28, 54, 80, 106, 132]
  ],
  [
    [28, 30, 30, 30],
    [33, 17, 54, 45],
    [4, 32, 58, 84, 110, 136]
  ],
  [
    [28, 30, 30, 30],
    [35, 18, 57, 48],
    [4, 28, 56, 84, 112, 140]
  ],
  [
    [28, 30, 30, 30],
    [37, 19, 60, 51],
    [4, 32, 60, 88, 116, 144]
  ],
  [
    [28, 30, 30, 30],
    [38, 19, 63, 53],
    [4, 28, 52, 76, 100, 124, 148]
  ],
  [
    [28, 30, 30, 30],
    [40, 20, 66, 56],
    [4, 22, 48, 74, 100, 126, 152]
  ],
  [
    [28, 30, 30, 30],
    [43, 21, 70, 59],
    [4, 26, 52, 78, 104, 130, 156]
  ],
  [
    [28, 30, 30, 30],
    [45, 22, 74, 62],
    [4, 30, 56, 82, 108, 134, 160]
  ],
  [
    [28, 30, 30, 30],
    [47, 24, 77, 65],
    [4, 24, 52, 80, 108, 136, 164]
  ],
  [
    [28, 30, 30, 30],
    [49, 25, 81, 68],
    [4, 28, 56, 84, 112, 140, 168]
  ]
];

const MODE_TERMINATOR = 0;
const MODE_NUMERIC = 1;
const MODE_ALPHANUMERIC = 2;
const MODE_OCTET = 4;
const MODE_KANJI = 8;

// validation regexps
const NUMERIC_REGEXP = /^\d*$/;
const ALPHANUMERIC_REGEXP = /^[A-Za-z0-9 $%*+\-./:]*$/;
const ALPHANUMERIC_OUT_REGEXP = /^[A-Z0-9 $%*+\-./:]*$/;

const ECCLEVEL_L = 1;
const ECCLEVEL_M = 0;
const ECCLEVEL_Q = 3;
const ECCLEVEL_H = 2;

const GF256_MAP = [];
const GF256_INVMAP = [-1];
for (let i = 0, v = 1; i < 255; ++i) {
  GF256_MAP.push(v);
  GF256_INVMAP[v] = i;
  v = (v * 2) ^ (v >= 128 ? 0x11d : 0);
}

const GF256_GENPOLY = [[]];
for (let i = 0; i < 30; ++i) {
  const prevpoly = GF256_GENPOLY[i];
  const poly = [];
  for (let j = 0; j <= i; ++j) {
    const a = j < i ? GF256_MAP[prevpoly[j]] : 0;
    const b = GF256_MAP[(i + (prevpoly[j - 1] || 0)) % 255];
    poly.push(GF256_INVMAP[a ^ b]);
  }
  GF256_GENPOLY.push(poly);
}

const ALPHANUMERIC_MAP = {};
for (let i = 0; i < 45; ++i) {
  ALPHANUMERIC_MAP['0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ $%*+-./:'.charAt(i)] = i;
}

const MASKFUNCS = [
  function (i, j) {
    return (i + j) % 2 == 0
  },
  function (i, j) {
    return i % 2 == 0
  },
  function (i, j) {
    return j % 3 == 0
  },
  function (i, j) {
    return (i + j) % 3 == 0
  },
  function (i, j) {
    return (((i / 2) | 0) + ((j / 3) | 0)) % 2 == 0
  },
  function (i, j) {
    return ((i * j) % 2) + ((i * j) % 3) == 0
  },
  function (i, j) {
    return (((i * j) % 2) + ((i * j) % 3)) % 2 == 0
  },
  function (i, j) {
    return (((i + j) % 2) + ((i * j) % 3)) % 2 == 0
  }
];

const needsverinfo = function (ver) {
  return ver > 6
};
const getsizebyver = function (ver) {
  return 4 * ver + 17
};

const nfullbits = function (ver) {
  const v = VERSIONS[ver];
  let nbits = 16 * ver * ver + 128 * ver + 64; // finder, timing and format info.
  if (needsverinfo(ver)) {
    nbits -= 36;
  } // version information
  if (v[2].length) {
    // alignment patterns
    nbits -= 25 * v[2].length * v[2].length - 10 * v[2].length - 55;
  }
  return nbits
};

const ndatabits = function (ver, ecclevel) {
  let nbits = nfullbits(ver) & ~7;
  const v = VERSIONS[ver];
  nbits -= 8 * v[0][ecclevel] * v[1][ecclevel]; // ecc bits
  return nbits
};

const ndatalenbits = function (ver, mode) {
  switch (mode) {
    case MODE_NUMERIC:
      return ver < 10 ? 10 : ver < 27 ? 12 : 14
    case MODE_ALPHANUMERIC:
      return ver < 10 ? 9 : ver < 27 ? 11 : 13
    case MODE_OCTET:
      return ver < 10 ? 8 : 16
    case MODE_KANJI:
      return ver < 10 ? 8 : ver < 27 ? 10 : 12
  }
};

const getmaxdatalen = function (ver, mode, ecclevel) {
  const nbits = ndatabits(ver, ecclevel) - 4 - ndatalenbits(ver, mode);
  switch (mode) {
    case MODE_NUMERIC:
      return ((nbits / 10) | 0) * 3 + (nbits % 10 < 4 ? 0 : nbits % 10 < 7 ? 1 : 2)
    case MODE_ALPHANUMERIC:
      return ((nbits / 11) | 0) * 2 + (nbits % 11 < 6 ? 0 : 1)
    case MODE_OCTET:
      return (nbits / 8) | 0
    case MODE_KANJI:
      return (nbits / 13) | 0
  }
};

const validatedata = function (mode, data) {
  switch (mode) {
    case MODE_NUMERIC:
      if (!data.match(NUMERIC_REGEXP)) {
        return null
      }
      return data

    case MODE_ALPHANUMERIC:
      if (!data.match(ALPHANUMERIC_REGEXP)) {
        return null
      }
      return data.toUpperCase()

    case MODE_OCTET:
      if (typeof data === 'string') {
        // encode as utf-8 string
        const newdata = [];
        for (let i = 0; i < data.length; ++i) {
          const ch = data.charCodeAt(i);
          if (ch < 0x80) {
            newdata.push(ch);
          } else if (ch < 0x800) {
            newdata.push(0xc0 | (ch >> 6), 0x80 | (ch & 0x3f));
          } else if (ch < 0x10000) {
            newdata.push(0xe0 | (ch >> 12), 0x80 | ((ch >> 6) & 0x3f), 0x80 | (ch & 0x3f));
          } else {
            newdata.push(0xf0 | (ch >> 18), 0x80 | ((ch >> 12) & 0x3f), 0x80 | ((ch >> 6) & 0x3f), 0x80 | (ch & 0x3f));
          }
        }
        return newdata
      } else {
        return data
      }
  }
};

const encode$1 = function (ver, mode, data, maxbuflen) {
  const buf = [];
  let bits = 0;
  let remaining = 8;
  const datalen = data.length;
  let i;
  const pack = function (x, n) {
    if (n >= remaining) {
      buf.push(bits | (x >> (n -= remaining)));
      while (n >= 8) {
        buf.push((x >> (n -= 8)) & 255);
      }
      bits = 0;
      remaining = 8;
    }
    if (n > 0) {
      bits |= (x & ((1 << n) - 1)) << (remaining -= n);
    }
  };

  const nlenbits = ndatalenbits(ver, mode);
  pack(mode, 4);
  pack(datalen, nlenbits);

  switch (mode) {
    case MODE_NUMERIC:
      for (i = 2; i < datalen; i += 3) {
        pack(parseInt(data.substring(i - 2, i + 1), 10), 10);
      }
      pack(parseInt(data.substring(i - 2), 10), [0, 4, 7][datalen % 3]);
      break

    case MODE_ALPHANUMERIC:
      for (i = 1; i < datalen; i += 2) {
        pack(ALPHANUMERIC_MAP[data.charAt(i - 1)] * 45 + ALPHANUMERIC_MAP[data.charAt(i)], 11);
      }
      if (datalen % 2 == 1) {
        pack(ALPHANUMERIC_MAP[data.charAt(i - 1)], 6);
      }
      break

    case MODE_OCTET:
      for (i = 0; i < datalen; ++i) {
        pack(data[i], 8);
      }
      break
  }

  pack(MODE_TERMINATOR, 4);
  if (remaining < 8) {
    buf.push(bits);
  }

  while (buf.length + 1 < maxbuflen) {
    buf.push(0xec, 0x11);
  }
  if (buf.length < maxbuflen) {
    buf.push(0xec);
  }
  return buf
};

const calculateecc = function (poly, genpoly) {
  const modulus = poly.slice(0);
  const polylen = poly.length;
  const genpolylen = genpoly.length;
  for (let i = 0; i < genpolylen; ++i) {
    modulus.push(0);
  }
  for (let i = 0; i < polylen; ) {
    const quotient = GF256_INVMAP[modulus[i++]];
    if (quotient >= 0) {
      for (let j = 0; j < genpolylen; ++j) {
        modulus[i + j] ^= GF256_MAP[(quotient + genpoly[j]) % 255];
      }
    }
  }
  return modulus.slice(polylen)
};

const augumenteccs = function (poly, nblocks, genpoly) {
  const subsizes = [];
  const subsize = (poly.length / nblocks) | 0;
  let subsize0 = 0;
  const pivot = nblocks - (poly.length % nblocks);
  for (let i = 0; i < pivot; ++i) {
    subsizes.push(subsize0);
    subsize0 += subsize;
  }
  for (let i = pivot; i < nblocks; ++i) {
    subsizes.push(subsize0);
    subsize0 += subsize + 1;
  }
  subsizes.push(subsize0);

  const eccs = [];
  for (let i = 0; i < nblocks; ++i) {
    eccs.push(calculateecc(poly.slice(subsizes[i], subsizes[i + 1]), genpoly));
  }

  const result = [];
  const nitemsperblock = (poly.length / nblocks) | 0;
  for (let i = 0; i < nitemsperblock; ++i) {
    for (let j = 0; j < nblocks; ++j) {
      result.push(poly[subsizes[j] + i]);
    }
  }
  for (let j = pivot; j < nblocks; ++j) {
    result.push(poly[subsizes[j + 1] - 1]);
  }
  for (let i = 0; i < genpoly.length; ++i) {
    for (let j = 0; j < nblocks; ++j) {
      result.push(eccs[j][i]);
    }
  }
  return result
};

const augumentbch = function (poly, p, genpoly, q) {
  let modulus = poly << q;
  for (let i = p - 1; i >= 0; --i) {
    if ((modulus >> (q + i)) & 1) {
      modulus ^= genpoly << i;
    }
  }
  return (poly << q) | modulus
};

const makebasematrix = function (ver) {
  const v = VERSIONS[ver];
  const n = getsizebyver(ver);
  const matrix = [];
  const reserved = [];
  for (let i = 0; i < n; ++i) {
    matrix.push([]);
    reserved.push([]);
  }

  const blit = function (y, x, h, w, bits) {
    for (let i = 0; i < h; ++i) {
      for (let j = 0; j < w; ++j) {
        matrix[y + i][x + j] = (bits[i] >> j) & 1;
        reserved[y + i][x + j] = 1;
      }
    }
  };

  // finder patterns and a part of timing patterns
  blit(0, 0, 9, 9, [0x7f, 0x41, 0x5d, 0x5d, 0x5d, 0x41, 0x17f, 0x00, 0x40]);
  blit(n - 8, 0, 8, 9, [0x100, 0x7f, 0x41, 0x5d, 0x5d, 0x5d, 0x41, 0x7f]);
  blit(0, n - 8, 9, 8, [0xfe, 0x82, 0xba, 0xba, 0xba, 0x82, 0xfe, 0x00, 0x00]);

  // the rest of timing patterns
  for (let i = 9; i < n - 8; ++i) {
    matrix[6][i] = matrix[i][6] = ~i & 1;
    reserved[6][i] = reserved[i][6] = 1;
  }

  // alignment patterns
  const aligns = v[2];
  const m = aligns.length;
  for (let i = 0; i < m; ++i) {
    const minj = i == 0 || i == m - 1 ? 1 : 0;
    const maxj = i == 0 ? m - 1 : m;
    for (let j = minj; j < maxj; ++j) {
      blit(aligns[i], aligns[j], 5, 5, [0x1f, 0x11, 0x15, 0x11, 0x1f]);
    }
  }

  // version information
  if (needsverinfo(ver)) {
    const code = augumentbch(ver, 6, 0x1f25, 12);
    let k = 0;
    for (let i = 0; i < 6; ++i) {
      for (let j = 0; j < 3; ++j) {
        matrix[i][n - 11 + j] = matrix[n - 11 + j][i] = (code >> k++) & 1;
        reserved[i][n - 11 + j] = reserved[n - 11 + j][i] = 1;
      }
    }
  }

  return {
    matrix: matrix,
    reserved: reserved
  }
};

const putdata = function (matrix, reserved, buf) {
  const n = matrix.length;
  let k = 0;
  let dir = -1;
  for (let i = n - 1; i >= 0; i -= 2) {
    if (i == 6) {
      --i;
    } // skip the entire timing pattern column
    let jj = dir < 0 ? n - 1 : 0;
    for (let j = 0; j < n; ++j) {
      for (let ii = i; ii > i - 2; --ii) {
        if (!reserved[jj][ii]) {
          matrix[jj][ii] = (buf[k >> 3] >> (~k & 7)) & 1;
          ++k;
        }
      }
      jj += dir;
    }
    dir = -dir;
  }
  return matrix
};

const maskdata = function (matrix, reserved, mask) {
  const maskf = MASKFUNCS[mask];
  const n = matrix.length;
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < n; ++j) {
      if (!reserved[i][j]) {
        matrix[i][j] ^= maskf(i, j);
      }
    }
  }
  return matrix
};

// puts the format information.
const putformatinfo = function (matrix, reserved, ecclevel, mask) {
  const n = matrix.length;
  const code = augumentbch((ecclevel << 3) | mask, 5, 0x537, 10) ^ 0x5412;
  for (let i = 0; i < 15; ++i) {
    const r = [0, 1, 2, 3, 4, 5, 7, 8, n - 7, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1][i];
    const c = [n - 1, n - 2, n - 3, n - 4, n - 5, n - 6, n - 7, n - 8, 7, 5, 4, 3, 2, 1, 0][i];
    matrix[r][8] = matrix[8][c] = (code >> i) & 1;
  }
  return matrix
};

const evaluatematrix = function (matrix) {
  const PENALTY_CONSECUTIVE = 3;

  const PENALTY_TWOBYTWO = 3;

  const PENALTY_FINDERLIKE = 40;

  const PENALTY_DENSITY = 10;

  const evaluategroup = function (groups) {
    let score = 0;
    for (let i = 0; i < groups.length; ++i) {
      if (groups[i] >= 5) {
        score += PENALTY_CONSECUTIVE + (groups[i] - 5);
      }
    }
    for (let i = 5; i < groups.length; i += 2) {
      const p = groups[i];
      if (groups[i - 1] == p && groups[i - 2] == 3 * p && groups[i - 3] == p && groups[i - 4] == p && (groups[i - 5] >= 4 * p || groups[i + 1] >= 4 * p)) {
        score += PENALTY_FINDERLIKE;
      }
    }
    return score
  };

  const n = matrix.length;
  let score = 0;
  let nblacks = 0;
  for (let i = 0; i < n; ++i) {
    const row = matrix[i];
    let groups;

    groups = [0];
    for (let j = 0; j < n; ) {
      let k;
      for (k = 0; j < n && row[j]; ++k) {
        ++j;
      }
      groups.push(k);
      for (k = 0; j < n && !row[j]; ++k) {
        ++j;
      }
      groups.push(k);
    }
    score += evaluategroup(groups);

    groups = [0];
    for (let j = 0; j < n; ) {
      let k;
      for (k = 0; j < n && matrix[j][i]; ++k) {
        ++j;
      }
      groups.push(k);
      for (k = 0; j < n && !matrix[j][i]; ++k) {
        ++j;
      }
      groups.push(k);
    }
    score += evaluategroup(groups);

    const nextrow = matrix[i + 1] || [];
    nblacks += row[0];
    for (let j = 1; j < n; ++j) {
      const p = row[j];
      nblacks += p;
      if (row[j - 1] == p && nextrow[j] === p && nextrow[j - 1] === p) {
        score += PENALTY_TWOBYTWO;
      }
    }
  }

  score += PENALTY_DENSITY * ((Math.abs(nblacks / n / n - 0.5) / 0.05) | 0);
  return score
};

const generate = function (data, ver, mode, ecclevel, mask) {
  const v = VERSIONS[ver];
  let buf = encode$1(ver, mode, data, ndatabits(ver, ecclevel) >> 3);
  buf = augumenteccs(buf, v[1][ecclevel], GF256_GENPOLY[v[0][ecclevel]]);

  const result = makebasematrix(ver);
  const matrix = result.matrix;
  const reserved = result.reserved;
  putdata(matrix, reserved, buf);

  if (mask < 0) {
    maskdata(matrix, reserved, 0);
    putformatinfo(matrix, reserved, ecclevel, 0);
    let bestmask = 0;
    let bestscore = evaluatematrix(matrix);
    maskdata(matrix, reserved, 0);
    for (mask = 1; mask < 8; ++mask) {
      maskdata(matrix, reserved, mask);
      putformatinfo(matrix, reserved, ecclevel, mask);
      const score = evaluatematrix(matrix);
      if (bestscore > score) {
        bestscore = score;
        bestmask = mask;
      }
      maskdata(matrix, reserved, mask);
    }
    mask = bestmask;
  }

  maskdata(matrix, reserved, mask);
  putformatinfo(matrix, reserved, ecclevel, mask);
  return matrix
};

const QRCode = {
  // we can input some value about the QR code,such as size,ecc level,padding,mode,version,mask and so on,so we can generate different QR code;
  generate: function (data, options) {
    const MODES = {
      numeric: MODE_NUMERIC,
      alphanumeric: MODE_ALPHANUMERIC,
      octet: MODE_OCTET
    };
    const ECCLEVELS = {
      L: ECCLEVEL_L,
      M: ECCLEVEL_M,
      Q: ECCLEVEL_Q,
      H: ECCLEVEL_H
    };

    options = options || {};
    let ver = options.version || -1;
    const ecclevel = ECCLEVELS[(options.ecclevel || 'L').toUpperCase()];
    let mode = options.mode ? MODES[options.mode.toLowerCase()] : -1;
    const mask = 'mask' in options ? options.mask : -1;

    if (mode < 0) {
      if (typeof data === 'string') {
        if (data.match(NUMERIC_REGEXP)) {
          mode = MODE_NUMERIC;
        } else if (data.match(ALPHANUMERIC_OUT_REGEXP)) {
          mode = MODE_ALPHANUMERIC;
        } else {
          mode = MODE_OCTET;
        }
      } else {
        mode = MODE_OCTET;
      }
    } else if (!(mode == MODE_NUMERIC || mode == MODE_ALPHANUMERIC || mode == MODE_OCTET)) {
      throw '暂时不支持你所输入的内容格式'
    }

    data = validatedata(mode, data);
    if (data === null) {
      throw '请输入内容'
    }

    if (ecclevel < 0 || ecclevel > 3) {
      throw 'ecc错误纠正级别有误'
    }

    if (ver < 0) {
      for (ver = 1; ver <= 40; ++ver) {
        if (data.length <= getmaxdatalen(ver, mode, ecclevel)) {
          break
        }
      }
      if (ver > 40) {
        throw '数据太大'
      }
    } else if (ver < 1 || ver > 40) {
      throw 'invalid version'
    }

    if (mask != -1 && (mask < 0 || mask > 8)) {
      throw 'invalid mask'
    }

    return generate(data, ver, mode, ecclevel, mask)
  },
  // if there is not support canvas, use table to replace canvas
  generateHTML: function (data, options) {
    options = options || {};
    const matrix = QRCode.generate(data, options);
    const modsize = Math.max(options.modulesize || 5, 0.5);
    const margin = Math.max(options.margin || 4, 0.0);

    // let e = document.createElement('div')
    const n = matrix.length;
    const html = ['<table border="0" cellspacing="0" cellpadding="0" style="border:' + modsize * margin + 'px solid #fff;background:#fff">'];
    for (let i = 0; i < n; ++i) {
      html.push('<tr>');
      for (let j = 0; j < n; ++j) {
        html.push('<td style="width:' + modsize + 'px;height:' + modsize + 'px' + (matrix[i][j] ? ';background:#000' : '') + '"></td>');
      }
      html.push('</tr>');
    }
    // e.className = 'qrcode'
    // e.innerHTML = '<div>'+html.join('') + '</table><div>'
    return '<div>' + html.join('') + '</table><div>'
  }
};
var qrcode$1 = QRCode;

/* istanbul ignore file */

/**
 * @namespace Geo
 */

const BASE32_CODES = '0123456789bcdefghjkmnpqrstuvwxyz';
const BASE32_CODES_DICT = {};
for (let i = 0; i < BASE32_CODES.length; i++) {
  BASE32_CODES_DICT[BASE32_CODES.charAt(i)] = i;
}

const ENCODE_AUTO = 'auto';

const MIN_LAT = -90;
const MAX_LAT = 90;
const MIN_LON = -180;
const MAX_LON = 180;

//                        0  1  2  3  4   5   6   7   8   9  10
const SIGFIG_HASH_LENGTH = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18];

/**
 * Encode
 *
 * @param {Number|String} latitude
 * @param {Number|String} longitude
 * @param {Number} numberOfChars
 * @returns {String}
 */

const encode = function (latitude, longitude, numberOfChars) {
  if (numberOfChars === ENCODE_AUTO) {
    if (typeof latitude === 'number' || typeof longitude === 'number') {
      throw new Error('自动精度需要字符串')
    }
    const decSigFigsLat = latitude.split('.')[1].length;
    const decSigFigsLong = longitude.split('.')[1].length;
    const numberOfSigFigs = Math.max(decSigFigsLat, decSigFigsLong);
    numberOfChars = SIGFIG_HASH_LENGTH[numberOfSigFigs];
  } else if (numberOfChars === undefined) {
    numberOfChars = 9;
  }

  const chars = [];
  let bits = 0;
  let bitsTotal = 0;
  let hashValue = 0;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;
  let mid;
  while (chars.length < numberOfChars) {
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        hashValue = (hashValue << 1) + 1;
        minLon = mid;
      } else {
        hashValue = (hashValue << 1) + 0;
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        hashValue = (hashValue << 1) + 1;
        minLat = mid;
      } else {
        hashValue = (hashValue << 1) + 0;
        maxLat = mid;
      }
    }

    bits++;
    bitsTotal++;
    if (bits === 5) {
      const code = BASE32_CODES[hashValue];
      chars.push(code);
      bits = 0;
      hashValue = 0;
    }
  }
  return chars.join('')
};

/**
 * Encode Integer
 *
 * @param {Number} latitude
 * @param {Number} longitude
 * @param {Number} bitDepth
 * @returns {Number}
 */

const encode_int = function (latitude, longitude, bitDepth) {
  bitDepth = bitDepth || 52;

  let bitsTotal = 0;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;
  let mid;
  let combinedBits = 0;

  while (bitsTotal < bitDepth) {
    combinedBits *= 2;
    if (bitsTotal % 2 === 0) {
      mid = (maxLon + minLon) / 2;
      if (longitude > mid) {
        combinedBits += 1;
        minLon = mid;
      } else {
        maxLon = mid;
      }
    } else {
      mid = (maxLat + minLat) / 2;
      if (latitude > mid) {
        combinedBits += 1;
        minLat = mid;
      } else {
        maxLat = mid;
      }
    }
    bitsTotal++;
  }
  return combinedBits
};

/**
 * Decode Bounding Box
 *
 * @param {String} hashString
 * @returns {Array}
 */

const decode_bbox = function (hashString) {
  let isLon = true;
  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;
  let mid;

  let hashValue = 0;
  for (let i = 0, l = hashString.length; i < l; i++) {
    const code = hashString[i].toLowerCase();
    hashValue = BASE32_CODES_DICT[code];

    for (let bits = 4; bits >= 0; bits--) {
      const bit = (hashValue >> bits) & 1;
      if (isLon) {
        mid = (maxLon + minLon) / 2;
        if (bit === 1) {
          minLon = mid;
        } else {
          maxLon = mid;
        }
      } else {
        mid = (maxLat + minLat) / 2;
        if (bit === 1) {
          minLat = mid;
        } else {
          maxLat = mid;
        }
      }
      isLon = !isLon;
    }
  }
  return [minLat, minLon, maxLat, maxLon]
};

/**
 * Decode Bounding Box Integer
 *
 * @param {Number} hashInt
 * @param {Number} bitDepth
 * @returns {Array}
 */

const decode_bbox_int = function (hashInt, bitDepth) {
  bitDepth = bitDepth || 52;

  let maxLat = MAX_LAT;
  let minLat = MIN_LAT;
  let maxLon = MAX_LON;
  let minLon = MIN_LON;

  let latBit = 0;
  let lonBit = 0;
  const step = bitDepth / 2;

  for (let i = 0; i < step; i++) {
    lonBit = get_bit(hashInt, (step - i) * 2 - 1);
    latBit = get_bit(hashInt, (step - i) * 2 - 2);

    if (latBit === 0) {
      maxLat = (maxLat + minLat) / 2;
    } else {
      minLat = (maxLat + minLat) / 2;
    }

    if (lonBit === 0) {
      maxLon = (maxLon + minLon) / 2;
    } else {
      minLon = (maxLon + minLon) / 2;
    }
  }
  return [minLat, minLon, maxLat, maxLon]
};

function get_bit (bits, position) {
  return (bits / Math.pow(2, position)) & 0x01
}

/**
 * Decode
 *
 * @param {String} hashString
 * @returns {Object}
 */

const decode = function (hashString) {
  const bbox = decode_bbox(hashString);
  const lat = (bbox[0] + bbox[2]) / 2;
  const lon = (bbox[1] + bbox[3]) / 2;
  const latErr = bbox[2] - lat;
  const lonErr = bbox[3] - lon;
  return {
    latitude: lat,
    longitude: lon,
    error: { latitude: latErr, longitude: lonErr }
  }
};

/**
 * Decode Integer
 *
 * @param {Number} hash_int
 * @param {Number} bitDepth
 * @returns {Object}
 */

const decode_int = function (hash_int, bitDepth) {
  const bbox = decode_bbox_int(hash_int, bitDepth);
  const lat = (bbox[0] + bbox[2]) / 2;
  const lon = (bbox[1] + bbox[3]) / 2;
  const latErr = bbox[2] - lat;
  const lonErr = bbox[3] - lon;
  return {
    latitude: lat,
    longitude: lon,
    error: { latitude: latErr, longitude: lonErr }
  }
};

/**
 * Neighbor
 *
 * [1,0] 北, [-1,-1] 西南.
 * 方向 [lat, lon]
 * [1,0] - 北
 * [1,1] - 东北
 * ...
 * @param {String} hashString
 * @param {Array} Direction
 * @returns {String}
 */

const neighbor = function (hashString, direction) {
  const lonLat = decode(hashString);
  let neighborLat = lonLat.latitude + direction[0] * lonLat.error.latitude * 2;
  let neighborLon = lonLat.longitude + direction[1] * lonLat.error.longitude * 2;
  neighborLon = ensure_valid_lon(neighborLon);
  neighborLat = ensure_valid_lat(neighborLat);
  return encode(neighborLat, neighborLon, hashString.length)
};

/**
 * Neighbor Integer
 *
 * ...
 * @param {String} hashString
 * @returns {Array}
 */

const neighbor_int = function (hash_int, direction, bitDepth) {
  bitDepth = bitDepth || 52;
  const lonlat = decode_int(hash_int, bitDepth);
  let neighbor_lat = lonlat.latitude + direction[0] * lonlat.error.latitude * 2;
  let neighbor_lon = lonlat.longitude + direction[1] * lonlat.error.longitude * 2;
  neighbor_lon = ensure_valid_lon(neighbor_lon);
  neighbor_lat = ensure_valid_lat(neighbor_lat);
  return encode_int(neighbor_lat, neighbor_lon, bitDepth)
};

/**
 * Neighbors
 *
 * 7 0 1
 * 6 x 2
 * 5 4 3
 * @param {String} hashString
 * @returns {Array}
 */

const neighbors = function (hashString) {
  const hashstringLength = hashString.length;

  const lonlat = decode(hashString);
  const lat = lonlat.latitude;
  const lon = lonlat.longitude;
  const latErr = lonlat.error.latitude * 2;
  const lonErr = lonlat.error.longitude * 2;

  let neighbor_lat, neighbor_lon;

  const neighborHashList = [
    encodeNeighbor(1, 0),
    encodeNeighbor(1, 1),
    encodeNeighbor(0, 1),
    encodeNeighbor(-1, 1),
    encodeNeighbor(-1, 0),
    encodeNeighbor(-1, -1),
    encodeNeighbor(0, -1),
    encodeNeighbor(1, -1)
  ];

  function encodeNeighbor (neighborLatDir, neighborLonDir) {
    neighbor_lat = lat + neighborLatDir * latErr;
    neighbor_lon = lon + neighborLonDir * lonErr;
    neighbor_lon = ensure_valid_lon(neighbor_lon);
    neighbor_lat = ensure_valid_lat(neighbor_lat);
    return encode(neighbor_lat, neighbor_lon, hashstringLength)
  }

  return neighborHashList
};

/**
 * Neighbors Integer
 *
 * 7 0 1
 * 6 x 2
 * 5 4 3
 * @param {Number} hash_int
 * @param {Number} bitDepth
 * @returns {Array}
 */

const neighbors_int = function (hash_int, bitDepth) {
  bitDepth = bitDepth || 52;

  const lonlat = decode_int(hash_int, bitDepth);
  const lat = lonlat.latitude;
  const lon = lonlat.longitude;
  const latErr = lonlat.error.latitude * 2;
  const lonErr = lonlat.error.longitude * 2;

  let neighbor_lat, neighbor_lon;

  const neighborHashIntList = [
    encodeNeighbor_int(1, 0),
    encodeNeighbor_int(1, 1),
    encodeNeighbor_int(0, 1),
    encodeNeighbor_int(-1, 1),
    encodeNeighbor_int(-1, 0),
    encodeNeighbor_int(-1, -1),
    encodeNeighbor_int(0, -1),
    encodeNeighbor_int(1, -1)
  ];

  function encodeNeighbor_int (neighborLatDir, neighborLonDir) {
    neighbor_lat = lat + neighborLatDir * latErr;
    neighbor_lon = lon + neighborLonDir * lonErr;
    neighbor_lon = ensure_valid_lon(neighbor_lon);
    neighbor_lat = ensure_valid_lat(neighbor_lat);
    return encode_int(neighbor_lat, neighbor_lon, bitDepth)
  }

  return neighborHashIntList
};

/**
 * Bounding Boxes
 *
 * @param {Number} minLat
 * @param {Number} minLon
 * @param {Number} maxLat
 * @param {Number} maxLon
 * @param {Number} numberOfChars
 * @returns {bboxes.hashList|Array}
 */

const bboxes = function (minLat, minLon, maxLat, maxLon, numberOfChars) {
  if (numberOfChars <= 0) {
    throw new Error('要正数形式')
  }
  numberOfChars = numberOfChars || 9;

  const hashSouthWest = encode(minLat, minLon, numberOfChars);
  const hashNorthEast = encode(maxLat, maxLon, numberOfChars);

  const latLon = decode(hashSouthWest);

  const perLat = latLon.error.latitude * 2;
  const perLon = latLon.error.longitude * 2;

  const boxSouthWest = decode_bbox(hashSouthWest);
  const boxNorthEast = decode_bbox(hashNorthEast);

  const latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat);
  const lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon);

  const hashList = [];

  for (let lat = 0; lat <= latStep; lat++) {
    for (let lon = 0; lon <= lonStep; lon++) {
      hashList.push(neighbor(hashSouthWest, [lat, lon]));
    }
  }

  return hashList
};

/**
 * Bounding Boxes Integer
 *
 * @param {Number} minLat
 * @param {Number} minLon
 * @param {Number} maxLat
 * @param {Number} maxLon
 * @param {Number} bitDepth
 * @returns {bboxes_int.hashList|Array}
 */

const bboxes_int = function (minLat, minLon, maxLat, maxLon, bitDepth) {
  bitDepth = bitDepth || 52;

  const hashSouthWest = encode_int(minLat, minLon, bitDepth);
  const hashNorthEast = encode_int(maxLat, maxLon, bitDepth);

  const latlon = decode_int(hashSouthWest, bitDepth);

  const perLat = latlon.error.latitude * 2;
  const perLon = latlon.error.longitude * 2;

  const boxSouthWest = decode_bbox_int(hashSouthWest, bitDepth);
  const boxNorthEast = decode_bbox_int(hashNorthEast, bitDepth);

  const latStep = Math.round((boxNorthEast[0] - boxSouthWest[0]) / perLat);
  const lonStep = Math.round((boxNorthEast[1] - boxSouthWest[1]) / perLon);

  const hashList = [];

  for (let lat = 0; lat <= latStep; lat++) {
    for (let lon = 0; lon <= lonStep; lon++) {
      hashList.push(neighbor_int(hashSouthWest, [lat, lon], bitDepth));
    }
  }

  return hashList
};

function ensure_valid_lon (lon) {
  if (lon > MAX_LON) {
    return MIN_LON + (lon % MAX_LON)
  }
  if (lon < MIN_LON) {
    return MAX_LON + (lon % MAX_LON)
  }
  return lon
}

function ensure_valid_lat (lat) {
  if (lat > MAX_LAT) {
    return MAX_LAT
  }
  if (lat < MIN_LAT) {
    return MIN_LAT
  }
  return lat
}

/** 百度坐标转高德（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function bd2gd (lat, lng) {
  const xPI = (Math.PI * 3000.0) / 180.0;
  const x = lng - 0.0065;
  const y = lat - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * xPI);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * xPI);
  const gd_lng = z * Math.cos(theta);
  const gd_lat = z * Math.sin(theta);
  return { lat: gd_lat, lng: gd_lng }
}

/** 高德坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function gd2bd (lat, lng) {
  const X_PI = (Math.PI * 3000.0) / 180.0;
  const x = lng;
  const y = lat;
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * X_PI);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * X_PI);
  const bd_lng = z * Math.cos(theta) + 0.0065;
  const bd_lat = z * Math.sin(theta) + 0.006;
  return {
    lat: bd_lat,
    lng: bd_lng
  }
}

/** 百度坐标转腾讯（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function bd2tx (lat, lng) {
  if (lng == null || lng == '' || lat == null || lat == '') {
    return { lat, lng }
  }

  const x_pi = Math.PI;
  const x = parseFloat(lng) - 0.0065;
  const y = parseFloat(lat) - 0.006;
  const z = Math.sqrt(x * x + y * y) - 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) - 0.000003 * Math.cos(x * x_pi);
  lng = (z * Math.cos(theta)).toFixed(7);
  lat = (z * Math.sin(theta)).toFixed(7);

  return { lat, lng }
}

/** 腾讯坐标转百度（传入纬度,经度）
 * @memberof Geo#
 * @param {Number} lat
 * @param {Number} lng
 */

function tx2bd (lat, lng) {
  if (lng == null || lng == '' || lat == null || lat == '') {
    return { lat, lng }
  }

  const x_pi = Math.PI;
  const x = parseFloat(lng);
  const y = parseFloat(lat);
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * x_pi);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * x_pi);
  lng = (z * Math.cos(theta) + 0.0065).toFixed(6);
  lat = (z * Math.sin(theta) + 0.006).toFixed(6);
  return { lat, lng }
}

/**
 * WGS84|CGCS2000 转 GCj02/谷歌、高德
 * @param lat
 * @param lng
 * @returns {{ lat: Number, lng: Number }}
 */
function wgs842gd (lat, lng) {
  const a = 6378245.0;
  const ee = 0.00669342162296594323;
  if (outsideChina(lat, lng)) {
    return { lat, lng }
  } else {
    let dlat = transformlat(lat - 35.0, lng - 105.0);
    let dlng = transformlng(lat - 35.0, lng - 105.0);
    const radlat = (lat / 180.0) * Math.PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return { lat: mglat, lng: mglng }
  }
}

/**
 * GCJ02/谷歌、高德 转换为 WGS84|CGCS2000
 * @param lat
 * @param lng
 * @returns {{lat:Number,lng:Number}}
 */
function gd2wgs84 (lat, lng) {
  const a = 6378245.0;
  const ee = 0.00669342162296594323;
  if (outsideChina(lat, lng)) {
    return { lat, lng }
  } else {
    let dlat = transformlat(lat - 35.0, lng - 105.0);
    let dlng = transformlng(lat - 35.0, lng - 105.0);
    const radlat = (lat / 180.0) * Math.PI;
    let magic = Math.sin(radlat);
    magic = 1 - ee * magic * magic;
    const sqrtmagic = Math.sqrt(magic);
    dlat = (dlat * 180.0) / (((a * (1 - ee)) / (magic * sqrtmagic)) * Math.PI);
    dlng = (dlng * 180.0) / ((a / sqrtmagic) * Math.cos(radlat) * Math.PI);
    const mglat = lat + dlat;
    const mglng = lng + dlng;
    return { lat: lat * 2 - mglat, lng: lng * 2 - mglng }
  }
}

function transformlat (lat, lng) {
  let ret = -100.0 + 2.0 * lng + 3.0 * lat + 0.2 * lat * lat + 0.1 * lng * lat + 0.2 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lat * Math.PI) + 40.0 * Math.sin((lat / 3.0) * Math.PI)) * 2.0) / 3.0;
  ret += ((160.0 * Math.sin((lat / 12.0) * Math.PI) + 320 * Math.sin((lat * Math.PI) / 30.0)) * 2.0) / 3.0;
  return ret
}

function transformlng (lat, lng) {
  let ret = 300.0 + lng + 2.0 * lat + 0.1 * lng * lng + 0.1 * lng * lat + 0.1 * Math.sqrt(Math.abs(lng));
  ret += ((20.0 * Math.sin(6.0 * lng * Math.PI) + 20.0 * Math.sin(2.0 * lng * Math.PI)) * 2.0) / 3.0;
  ret += ((20.0 * Math.sin(lng * Math.PI) + 40.0 * Math.sin((lng / 3.0) * Math.PI)) * 2.0) / 3.0;
  ret += ((150.0 * Math.sin((lng / 12.0) * Math.PI) + 300.0 * Math.sin((lng / 30.0) * Math.PI)) * 2.0) / 3.0;
  return ret
}
/**
 * 判断是否在国内，不在国内则不做偏移
 * @param lng
 * @param lat
 * @returns {boolean}
 */
const outsideChina = function (lat, lng) {
  return lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271 || false
};

/** 两点之间距离
 * @memberof Geo#
 * @param {Number} lat1
 * @param {Number} lng1
 * @param {Number} lat2
 * @param {Number} lng2
 */
function getDistance (lat1, lng1, lat2, lng2) {
  const radLat1 = (lat1 * Math.PI) / 180.0;
  const radLat2 = (lat2 * Math.PI) / 180.0;
  const a = radLat1 - radLat2;
  const b = (lng1 * Math.PI) / 180.0 - (lng2 * Math.PI) / 180.0;
  let s = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)));
  s = s * 6378.137; // 地球半径;
  s = Math.round(s * 10000) / 10000;
  return s
}
const geo$1 = {
  bd2tx,
  tx2bd,
  bd2gd,
  gd2bd,
  getDistance,
  wgs842gd,
  gd2wgs84,
  ENCODE_AUTO: ENCODE_AUTO,
  encode: encode,
  encode_uint64: encode_int,
  encode_int: encode_int,
  decode: decode,
  decode_int: decode_int,
  decode_uint64: decode_int,
  decode_bbox: decode_bbox,
  decode_bbox_uint64: decode_bbox_int,
  decode_bbox_int: decode_bbox_int,
  neighbor: neighbor,
  neighbor_int: neighbor_int,
  neighbors: neighbors,
  neighbors_int: neighbors_int,
  bboxes: bboxes,
  bboxes_int: bboxes_int
};

var geo_1 = geo$1;

var domain;

// This constructor is used to store event handlers. Instantiating this is
// faster than explicitly calling `Object.create(null)` to get a "clean" empty
// object (tested with v8 v4.9).
function EventHandlers() {}
EventHandlers.prototype = Object.create(null);

function EventEmitter() {
  EventEmitter.init.call(this);
}

// nodejs oddity
// require('events') === require('events').EventEmitter
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.usingDomains = false;

EventEmitter.prototype.domain = undefined;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

EventEmitter.init = function() {
  this.domain = null;
  if (EventEmitter.usingDomains) {
    // if there is an active domain, then attach to it.
    if (domain.active ) ;
  }

  if (!this._events || this._events === Object.getPrototypeOf(this)._events) {
    this._events = new EventHandlers();
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
};

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events, domain;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  domain = this.domain;

  // If there is no 'error' event listener then throw.
  if (doError) {
    er = arguments[1];
    if (domain) {
      if (!er)
        er = new Error('Uncaught, unspecified "error" event');
      er.domainEmitter = this;
      er.domain = domain;
      er.domainThrown = false;
      domain.emit('error', er);
    } else if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
    // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
    // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = new EventHandlers();
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
                  listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] = prepend ? [listener, existing] :
                                          [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
                            existing.length + ' ' + type + ' listeners added. ' +
                            'Use emitter.setMaxListeners() to increase limit');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        emitWarning(w);
      }
    }
  }

  return target;
}
function emitWarning(e) {
  typeof console.warn === 'function' ? console.warn(e) : console.log(e);
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function _onceWrap(target, type, listener) {
  var fired = false;
  function g() {
    target.removeListener(type, g);
    if (!fired) {
      fired = true;
      listener.apply(target, arguments);
    }
  }
  g.listener = listener;
  return g;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || (list.listener && list.listener === listener)) {
        if (--this._eventsCount === 0)
          this._events = new EventHandlers();
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length; i-- > 0;) {
          if (list[i] === listener ||
              (list[i].listener && list[i].listener === listener)) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (list.length === 1) {
          list[0] = undefined;
          if (--this._eventsCount === 0) {
            this._events = new EventHandlers();
            return this;
          } else {
            delete events[type];
          }
        } else {
          spliceOne(list, position);
        }

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = new EventHandlers();
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = new EventHandlers();
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = Object.keys(events);
        for (var i = 0, key; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = new EventHandlers();
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        do {
          this.removeListener(type, listeners[listeners.length - 1]);
        } while (listeners[0]);
      }

      return this;
    };

EventEmitter.prototype.listeners = function listeners(type) {
  var evlistener;
  var ret;
  var events = this._events;

  if (!events)
    ret = [];
  else {
    evlistener = events[type];
    if (!evlistener)
      ret = [];
    else if (typeof evlistener === 'function')
      ret = [evlistener.listener || evlistener];
    else
      ret = unwrapListeners(evlistener);
  }

  return ret;
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount$1.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount$1;
function listenerCount$1(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, i) {
  var copy = new Array(i);
  while (i--)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

// shim for using process in browser
// based off https://github.com/defunctzombie/node-process/blob/master/browser.js

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
var cachedSetTimeout = defaultSetTimout;
var cachedClearTimeout = defaultClearTimeout;
if (typeof global.setTimeout === 'function') {
    cachedSetTimeout = setTimeout;
}
if (typeof global.clearTimeout === 'function') {
    cachedClearTimeout = clearTimeout;
}

function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}
function nextTick(fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
}
// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
var title = 'browser';
var platform = 'browser';
var browser = true;
var env = {};
var argv = [];
var version = ''; // empty string to avoid regexp issues
var versions = {};
var release = {};
var config = {};

function noop() {}

var on = noop;
var addListener = noop;
var once = noop;
var off = noop;
var removeListener = noop;
var removeAllListeners = noop;
var emit = noop;

function binding$1(name) {
    throw new Error('process.binding is not supported');
}

function cwd () { return '/' }
function chdir (dir) {
    throw new Error('process.chdir is not supported');
}function umask() { return 0; }

// from https://github.com/kumavis/browser-process-hrtime/blob/master/index.js
var performance$1 = global.performance || {};
var performanceNow =
  performance$1.now        ||
  performance$1.mozNow     ||
  performance$1.msNow      ||
  performance$1.oNow       ||
  performance$1.webkitNow  ||
  function(){ return (new Date()).getTime() };

// generate timestamp or delta
// see http://nodejs.org/api/process.html#process_process_hrtime
function hrtime(previousTimestamp){
  var clocktime = performanceNow.call(performance$1)*1e-3;
  var seconds = Math.floor(clocktime);
  var nanoseconds = Math.floor((clocktime%1)*1e9);
  if (previousTimestamp) {
    seconds = seconds - previousTimestamp[0];
    nanoseconds = nanoseconds - previousTimestamp[1];
    if (nanoseconds<0) {
      seconds--;
      nanoseconds += 1e9;
    }
  }
  return [seconds,nanoseconds]
}

var startTime = new Date();
function uptime() {
  var currentTime = new Date();
  var dif = currentTime - startTime;
  return dif / 1000;
}

var process$1 = {
  nextTick: nextTick,
  title: title,
  browser: browser,
  env: env,
  argv: argv,
  version: version,
  versions: versions,
  on: on,
  addListener: addListener,
  once: once,
  off: off,
  removeListener: removeListener,
  removeAllListeners: removeAllListeners,
  emit: emit,
  binding: binding$1,
  cwd: cwd,
  chdir: chdir,
  umask: umask,
  hrtime: hrtime,
  platform: platform,
  release: release,
  config: config,
  uptime: uptime
};

var inherits;
if (typeof Object.create === 'function'){
  inherits = function inherits(ctor, superCtor) {
    // implementation from standard node.js 'util' module
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  inherits = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    var TempCtor = function () {};
    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}
var inherits$1 = inherits;

// Copyright Joyent, Inc. and other Node contributors.
var formatRegExp = /%[sdj%]/g;
function format(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
}

// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
function deprecate(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process$1.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process$1.throwDeprecation) {
        throw new Error(msg);
      } else if (process$1.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

var debugs = {};
var debugEnviron;
function debuglog(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process$1.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = 0;
      debugs[set] = function() {
        var msg = format.apply(null, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
}

/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    _extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray$1(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var length = output.reduce(function(prev, cur) {
    if (cur.indexOf('\n') >= 0) ;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray$1(ar) {
  return Array.isArray(ar);
}

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

function isNull(arg) {
  return arg === null;
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isString(arg) {
  return typeof arg === 'string';
}

function isUndefined(arg) {
  return arg === void 0;
}

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}

function isFunction(arg) {
  return typeof arg === 'function';
}

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function _extend(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
}
function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;
var inited = false;
function init () {
  inited = true;
  var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
  for (var i = 0, len = code.length; i < len; ++i) {
    lookup[i] = code[i];
    revLookup[code.charCodeAt(i)] = i;
  }

  revLookup['-'.charCodeAt(0)] = 62;
  revLookup['_'.charCodeAt(0)] = 63;
}

function toByteArray (b64) {
  if (!inited) {
    init();
  }
  var i, j, l, tmp, placeHolders, arr;
  var len = b64.length;

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  placeHolders = b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0;

  // base64 is 4/3 + up to two characters of the original data
  arr = new Arr(len * 3 / 4 - placeHolders);

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len;

  var L = 0;

  for (i = 0, j = 0; i < l; i += 4, j += 3) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)];
    arr[L++] = (tmp >> 16) & 0xFF;
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4);
    arr[L++] = tmp & 0xFF;
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2);
    arr[L++] = (tmp >> 8) & 0xFF;
    arr[L++] = tmp & 0xFF;
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2]);
    output.push(tripletToBase64(tmp));
  }
  return output.join('')
}

function fromByteArray (uint8) {
  if (!inited) {
    init();
  }
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
  var output = '';
  var parts = [];
  var maxChunkLength = 16383; // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    output += lookup[tmp >> 2];
    output += lookup[(tmp << 4) & 0x3F];
    output += '==';
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1]);
    output += lookup[tmp >> 10];
    output += lookup[(tmp >> 4) & 0x3F];
    output += lookup[(tmp << 2) & 0x3F];
    output += '=';
  }

  parts.push(output);

  return parts.join('')
}

function read (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? (nBytes - 1) : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];

  i += d;

  e = s & ((1 << (-nBits)) - 1);
  s >>= (-nBits);
  nBits += eLen;
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1);
  e >>= (-nBits);
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

function write (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
  var i = isLE ? 0 : (nBytes - 1);
  var d = isLE ? 1 : -1;
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

  value = Math.abs(value);

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }

    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m;
  eLen += mLen;
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128;
}

var toString = {}.toString;

var isArray = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};

/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */

var INSPECT_MAX_BYTES = 50;

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer$1.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : true;

function kMaxLength () {
  return Buffer$1.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length);
    that.__proto__ = Buffer$1.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer$1(length);
    }
    that.length = length;
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer$1 (arg, encodingOrOffset, length) {
  if (!Buffer$1.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer$1)) {
    return new Buffer$1(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer$1.poolSize = 8192; // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer$1._augment = function (arr) {
  arr.__proto__ = Buffer$1.prototype;
  return arr
};

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer$1.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
};

if (Buffer$1.TYPED_ARRAY_SUPPORT) {
  Buffer$1.prototype.__proto__ = Uint8Array.prototype;
  Buffer$1.__proto__ = Uint8Array;
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size);
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer$1.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
};

function allocUnsafe (that, size) {
  assertSize(size);
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0;
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer$1.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
};
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer$1.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
};

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8';
  }

  if (!Buffer$1.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0;
  that = createBuffer(that, length);

  var actual = that.write(string, encoding);

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual);
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0;
  that = createBuffer(that, length);
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255;
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength; // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array);
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset);
  } else {
    array = new Uint8Array(array, byteOffset, length);
  }

  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array;
    that.__proto__ = Buffer$1.prototype;
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array);
  }
  return that
}

function fromObject (that, obj) {
  if (internalIsBuffer(obj)) {
    var len = checked(obj.length) | 0;
    that = createBuffer(that, len);

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len);
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}
Buffer$1.isBuffer = isBuffer;
function internalIsBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer$1.compare = function compare (a, b) {
  if (!internalIsBuffer(a) || !internalIsBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length;
  var y = b.length;

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i];
      y = b[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

Buffer$1.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
};

Buffer$1.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer$1.alloc(0)
  }

  var i;
  if (length === undefined) {
    length = 0;
    for (i = 0; i < list.length; ++i) {
      length += list[i].length;
    }
  }

  var buffer = Buffer$1.allocUnsafe(length);
  var pos = 0;
  for (i = 0; i < list.length; ++i) {
    var buf = list[i];
    if (!internalIsBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos);
    pos += buf.length;
  }
  return buffer
};

function byteLength (string, encoding) {
  if (internalIsBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string;
  }

  var len = string.length;
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
}
Buffer$1.byteLength = byteLength;

function slowToString (encoding, start, end) {
  var loweredCase = false;

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0;
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length;
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0;
  start >>>= 0;

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8';

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase();
        loweredCase = true;
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer$1.prototype._isBuffer = true;

function swap (b, n, m) {
  var i = b[n];
  b[n] = b[m];
  b[m] = i;
}

Buffer$1.prototype.swap16 = function swap16 () {
  var len = this.length;
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1);
  }
  return this
};

Buffer$1.prototype.swap32 = function swap32 () {
  var len = this.length;
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3);
    swap(this, i + 1, i + 2);
  }
  return this
};

Buffer$1.prototype.swap64 = function swap64 () {
  var len = this.length;
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7);
    swap(this, i + 1, i + 6);
    swap(this, i + 2, i + 5);
    swap(this, i + 3, i + 4);
  }
  return this
};

Buffer$1.prototype.toString = function toString () {
  var length = this.length | 0;
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
};

Buffer$1.prototype.equals = function equals (b) {
  if (!internalIsBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer$1.compare(this, b) === 0
};

Buffer$1.prototype.inspect = function inspect () {
  var str = '';
  var max = INSPECT_MAX_BYTES;
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ');
    if (this.length > max) str += ' ... ';
  }
  return '<Buffer ' + str + '>'
};

Buffer$1.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!internalIsBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0;
  }
  if (end === undefined) {
    end = target ? target.length : 0;
  }
  if (thisStart === undefined) {
    thisStart = 0;
  }
  if (thisEnd === undefined) {
    thisEnd = this.length;
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0;
  end >>>= 0;
  thisStart >>>= 0;
  thisEnd >>>= 0;

  if (this === target) return 0

  var x = thisEnd - thisStart;
  var y = end - start;
  var len = Math.min(x, y);

  var thisCopy = this.slice(thisStart, thisEnd);
  var targetCopy = target.slice(start, end);

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i];
      y = targetCopy[i];
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
};

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset;
    byteOffset = 0;
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff;
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000;
  }
  byteOffset = +byteOffset;  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1);
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1;
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0;
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer$1.from(val, encoding);
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (internalIsBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF; // Search for a byte value [0-255]
    if (Buffer$1.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1;
  var arrLength = arr.length;
  var valLength = val.length;

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase();
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2;
      arrLength /= 2;
      valLength /= 2;
      byteOffset /= 2;
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i;
  if (dir) {
    var foundIndex = -1;
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i;
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex;
        foundIndex = -1;
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
    for (i = byteOffset; i >= 0; i--) {
      var found = true;
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false;
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer$1.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
};

Buffer$1.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
};

Buffer$1.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
};

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0;
  var remaining = buf.length - offset;
  if (!length) {
    length = remaining;
  } else {
    length = Number(length);
    if (length > remaining) {
      length = remaining;
    }
  }

  // must be an even number of digits
  var strLen = string.length;
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2;
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16);
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed;
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer$1.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8';
    length = this.length;
    offset = 0;
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset;
    length = this.length;
    offset = 0;
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0;
    if (isFinite(length)) {
      length = length | 0;
      if (encoding === undefined) encoding = 'utf8';
    } else {
      encoding = length;
      length = undefined;
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset;
  if (length === undefined || length > remaining) length = remaining;

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8';

  var loweredCase = false;
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase();
        loweredCase = true;
    }
  }
};

Buffer$1.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
};

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return fromByteArray(buf)
  } else {
    return fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end);
  var res = [];

  var i = start;
  while (i < end) {
    var firstByte = buf[i];
    var codePoint = null;
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1;

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint;

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte;
          }
          break
        case 2:
          secondByte = buf[i + 1];
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 3:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint;
            }
          }
          break
        case 4:
          secondByte = buf[i + 1];
          thirdByte = buf[i + 2];
          fourthByte = buf[i + 3];
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint;
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD;
      bytesPerSequence = 1;
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000;
      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
      codePoint = 0xDC00 | codePoint & 0x3FF;
    }

    res.push(codePoint);
    i += bytesPerSequence;
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000;

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length;
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = '';
  var i = 0;
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    );
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F);
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = '';
  end = Math.min(buf.length, end);

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i]);
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length;

  if (!start || start < 0) start = 0;
  if (!end || end < 0 || end > len) end = len;

  var out = '';
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i]);
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end);
  var res = '';
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
  }
  return res
}

Buffer$1.prototype.slice = function slice (start, end) {
  var len = this.length;
  start = ~~start;
  end = end === undefined ? len : ~~end;

  if (start < 0) {
    start += len;
    if (start < 0) start = 0;
  } else if (start > len) {
    start = len;
  }

  if (end < 0) {
    end += len;
    if (end < 0) end = 0;
  } else if (end > len) {
    end = len;
  }

  if (end < start) end = start;

  var newBuf;
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer$1.prototype;
  } else {
    var sliceLen = end - start;
    newBuf = new Buffer$1(sliceLen, undefined);
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start];
    }
  }

  return newBuf
};

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer$1.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }

  return val
};

Buffer$1.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length);
  }

  var val = this[offset + --byteLength];
  var mul = 1;
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul;
  }

  return val
};

Buffer$1.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  return this[offset]
};

Buffer$1.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return this[offset] | (this[offset + 1] << 8)
};

Buffer$1.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  return (this[offset] << 8) | this[offset + 1]
};

Buffer$1.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
};

Buffer$1.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
};

Buffer$1.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var val = this[offset];
  var mul = 1;
  var i = 0;
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer$1.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) checkOffset(offset, byteLength, this.length);

  var i = byteLength;
  var mul = 1;
  var val = this[offset + --i];
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul;
  }
  mul *= 0x80;

  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

  return val
};

Buffer$1.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length);
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
};

Buffer$1.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset] | (this[offset + 1] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer$1.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length);
  var val = this[offset + 1] | (this[offset] << 8);
  return (val & 0x8000) ? val | 0xFFFF0000 : val
};

Buffer$1.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
};

Buffer$1.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
};

Buffer$1.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, true, 23, 4)
};

Buffer$1.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length);
  return read(this, offset, false, 23, 4)
};

Buffer$1.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, true, 52, 8)
};

Buffer$1.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length);
  return read(this, offset, false, 52, 8)
};

function checkInt (buf, value, offset, ext, max, min) {
  if (!internalIsBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer$1.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var mul = 1;
  var i = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  byteLength = byteLength | 0;
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
    checkInt(this, value, offset, byteLength, maxBytes, 0);
  }

  var i = byteLength - 1;
  var mul = 1;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  this[offset] = (value & 0xff);
  return offset + 1
};

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8;
  }
}

Buffer$1.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer$1.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1;
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff;
  }
}

Buffer$1.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24);
    this[offset + 2] = (value >>> 16);
    this[offset + 1] = (value >>> 8);
    this[offset] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer$1.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

Buffer$1.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = 0;
  var mul = 1;
  var sub = 0;
  this[offset] = value & 0xFF;
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1);

    checkInt(this, value, offset, byteLength, limit - 1, -limit);
  }

  var i = byteLength - 1;
  var mul = 1;
  var sub = 0;
  this[offset + i] = value & 0xFF;
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1;
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
  }

  return offset + byteLength
};

Buffer$1.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
  if (!Buffer$1.TYPED_ARRAY_SUPPORT) value = Math.floor(value);
  if (value < 0) value = 0xff + value + 1;
  this[offset] = (value & 0xff);
  return offset + 1
};

Buffer$1.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
  } else {
    objectWriteUInt16(this, value, offset, true);
  }
  return offset + 2
};

Buffer$1.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8);
    this[offset + 1] = (value & 0xff);
  } else {
    objectWriteUInt16(this, value, offset, false);
  }
  return offset + 2
};

Buffer$1.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff);
    this[offset + 1] = (value >>> 8);
    this[offset + 2] = (value >>> 16);
    this[offset + 3] = (value >>> 24);
  } else {
    objectWriteUInt32(this, value, offset, true);
  }
  return offset + 4
};

Buffer$1.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value;
  offset = offset | 0;
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
  if (value < 0) value = 0xffffffff + value + 1;
  if (Buffer$1.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24);
    this[offset + 1] = (value >>> 16);
    this[offset + 2] = (value >>> 8);
    this[offset + 3] = (value & 0xff);
  } else {
    objectWriteUInt32(this, value, offset, false);
  }
  return offset + 4
};

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4);
  }
  write(buf, value, offset, littleEndian, 23, 4);
  return offset + 4
}

Buffer$1.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
};

Buffer$1.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
};

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8);
  }
  write(buf, value, offset, littleEndian, 52, 8);
  return offset + 8
}

Buffer$1.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
};

Buffer$1.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
};

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer$1.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0;
  if (!end && end !== 0) end = this.length;
  if (targetStart >= target.length) targetStart = target.length;
  if (!targetStart) targetStart = 0;
  if (end > 0 && end < start) end = start;

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length;
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start;
  }

  var len = end - start;
  var i;

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start];
    }
  } else if (len < 1000 || !Buffer$1.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start];
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    );
  }

  return len
};

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer$1.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start;
      start = 0;
      end = this.length;
    } else if (typeof end === 'string') {
      encoding = end;
      end = this.length;
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0);
      if (code < 256) {
        val = code;
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer$1.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255;
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0;
  end = end === undefined ? this.length : end >>> 0;

  if (!val) val = 0;

  var i;
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val;
    }
  } else {
    var bytes = internalIsBuffer(val)
      ? val
      : utf8ToBytes(new Buffer$1(val, encoding).toString());
    var len = bytes.length;
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len];
    }
  }

  return this
};

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '');
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '=';
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity;
  var codePoint;
  var length = string.length;
  var leadSurrogate = null;
  var bytes = [];

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i);

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
          continue
        }

        // valid lead
        leadSurrogate = codePoint;

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
        leadSurrogate = codePoint;
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
    }

    leadSurrogate = null;

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint);
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      );
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF);
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo;
  var byteArray = [];
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i);
    hi = c >> 8;
    lo = c % 256;
    byteArray.push(lo);
    byteArray.push(hi);
  }

  return byteArray
}


function base64ToBytes (str) {
  return toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i];
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}


// the following is from is-buffer, also by Feross Aboukhadijeh and with same lisence
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
function isBuffer(obj) {
  return obj != null && (!!obj._isBuffer || isFastBuffer(obj) || isSlowBuffer(obj))
}

function isFastBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isFastBuffer(obj.slice(0, 0))
}

function BufferList() {
  this.head = null;
  this.tail = null;
  this.length = 0;
}

BufferList.prototype.push = function (v) {
  var entry = { data: v, next: null };
  if (this.length > 0) this.tail.next = entry;else this.head = entry;
  this.tail = entry;
  ++this.length;
};

BufferList.prototype.unshift = function (v) {
  var entry = { data: v, next: this.head };
  if (this.length === 0) this.tail = entry;
  this.head = entry;
  ++this.length;
};

BufferList.prototype.shift = function () {
  if (this.length === 0) return;
  var ret = this.head.data;
  if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
  --this.length;
  return ret;
};

BufferList.prototype.clear = function () {
  this.head = this.tail = null;
  this.length = 0;
};

BufferList.prototype.join = function (s) {
  if (this.length === 0) return '';
  var p = this.head;
  var ret = '' + p.data;
  while (p = p.next) {
    ret += s + p.data;
  }return ret;
};

BufferList.prototype.concat = function (n) {
  if (this.length === 0) return Buffer$1.alloc(0);
  if (this.length === 1) return this.head.data;
  var ret = Buffer$1.allocUnsafe(n >>> 0);
  var p = this.head;
  var i = 0;
  while (p) {
    p.data.copy(ret, i);
    i += p.data.length;
    p = p.next;
  }
  return ret;
};

// Copyright Joyent, Inc. and other Node contributors.
var isBufferEncoding = Buffer$1.isEncoding
  || function(encoding) {
       switch (encoding && encoding.toLowerCase()) {
         case 'hex': case 'utf8': case 'utf-8': case 'ascii': case 'binary': case 'base64': case 'ucs2': case 'ucs-2': case 'utf16le': case 'utf-16le': case 'raw': return true;
         default: return false;
       }
     };


function assertEncoding(encoding) {
  if (encoding && !isBufferEncoding(encoding)) {
    throw new Error('Unknown encoding: ' + encoding);
  }
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters. CESU-8 is handled as part of the UTF-8 encoding.
//
// @TODO Handling all encodings inside a single object makes it very difficult
// to reason about this code, so it should be split up in the future.
// @TODO There should be a utf8-strict encoding that rejects invalid UTF-8 code
// points as used by CESU-8.
function StringDecoder(encoding) {
  this.encoding = (encoding || 'utf8').toLowerCase().replace(/[-_]/, '');
  assertEncoding(encoding);
  switch (this.encoding) {
    case 'utf8':
      // CESU-8 represents each of Surrogate Pair by 3-bytes
      this.surrogateSize = 3;
      break;
    case 'ucs2':
    case 'utf16le':
      // UTF-16 represents each of Surrogate Pair by 2-bytes
      this.surrogateSize = 2;
      this.detectIncompleteChar = utf16DetectIncompleteChar;
      break;
    case 'base64':
      // Base-64 stores 3 bytes in 4 chars, and pads the remainder.
      this.surrogateSize = 3;
      this.detectIncompleteChar = base64DetectIncompleteChar;
      break;
    default:
      this.write = passThroughWrite;
      return;
  }

  // Enough space to store all bytes of a single character. UTF-8 needs 4
  // bytes, but CESU-8 may require up to 6 (3 bytes per surrogate).
  this.charBuffer = new Buffer$1(6);
  // Number of bytes received for the current incomplete multi-byte character.
  this.charReceived = 0;
  // Number of bytes expected for the current incomplete multi-byte character.
  this.charLength = 0;
}

// write decodes the given buffer and returns it as JS string that is
// guaranteed to not contain any partial multi-byte characters. Any partial
// character found at the end of the buffer is buffered up, and will be
// returned when calling write again with the remaining bytes.
//
// Note: Converting a Buffer containing an orphan surrogate to a String
// currently works, but converting a String to a Buffer (via `new Buffer`, or
// Buffer#write) will replace incomplete surrogates with the unicode
// replacement character. See https://codereview.chromium.org/121173009/ .
StringDecoder.prototype.write = function(buffer) {
  var charStr = '';
  // if our last write ended with an incomplete multibyte character
  while (this.charLength) {
    // determine how many remaining bytes this buffer has to offer for this char
    var available = (buffer.length >= this.charLength - this.charReceived) ?
        this.charLength - this.charReceived :
        buffer.length;

    // add the new bytes to the char buffer
    buffer.copy(this.charBuffer, this.charReceived, 0, available);
    this.charReceived += available;

    if (this.charReceived < this.charLength) {
      // still not enough chars in this buffer? wait for more ...
      return '';
    }

    // remove bytes belonging to the current character from the buffer
    buffer = buffer.slice(available, buffer.length);

    // get the character that was split
    charStr = this.charBuffer.slice(0, this.charLength).toString(this.encoding);

    // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
    var charCode = charStr.charCodeAt(charStr.length - 1);
    if (charCode >= 0xD800 && charCode <= 0xDBFF) {
      this.charLength += this.surrogateSize;
      charStr = '';
      continue;
    }
    this.charReceived = this.charLength = 0;

    // if there are no more bytes in this buffer, just emit our char
    if (buffer.length === 0) {
      return charStr;
    }
    break;
  }

  // determine and set charLength / charReceived
  this.detectIncompleteChar(buffer);

  var end = buffer.length;
  if (this.charLength) {
    // buffer the incomplete character bytes we got
    buffer.copy(this.charBuffer, 0, buffer.length - this.charReceived, end);
    end -= this.charReceived;
  }

  charStr += buffer.toString(this.encoding, 0, end);

  var end = charStr.length - 1;
  var charCode = charStr.charCodeAt(end);
  // CESU-8: lead surrogate (D800-DBFF) is also the incomplete character
  if (charCode >= 0xD800 && charCode <= 0xDBFF) {
    var size = this.surrogateSize;
    this.charLength += size;
    this.charReceived += size;
    this.charBuffer.copy(this.charBuffer, size, 0, size);
    buffer.copy(this.charBuffer, 0, 0, size);
    return charStr.substring(0, end);
  }

  // or just emit the charStr
  return charStr;
};

// detectIncompleteChar determines if there is an incomplete UTF-8 character at
// the end of the given buffer. If so, it sets this.charLength to the byte
// length that character, and sets this.charReceived to the number of bytes
// that are available for this character.
StringDecoder.prototype.detectIncompleteChar = function(buffer) {
  // determine how many bytes we have to check at the end of this buffer
  var i = (buffer.length >= 3) ? 3 : buffer.length;

  // Figure out if one of the last i bytes of our buffer announces an
  // incomplete char.
  for (; i > 0; i--) {
    var c = buffer[buffer.length - i];

    // See http://en.wikipedia.org/wiki/UTF-8#Description

    // 110XXXXX
    if (i == 1 && c >> 5 == 0x06) {
      this.charLength = 2;
      break;
    }

    // 1110XXXX
    if (i <= 2 && c >> 4 == 0x0E) {
      this.charLength = 3;
      break;
    }

    // 11110XXX
    if (i <= 3 && c >> 3 == 0x1E) {
      this.charLength = 4;
      break;
    }
  }
  this.charReceived = i;
};

StringDecoder.prototype.end = function(buffer) {
  var res = '';
  if (buffer && buffer.length)
    res = this.write(buffer);

  if (this.charReceived) {
    var cr = this.charReceived;
    var buf = this.charBuffer;
    var enc = this.encoding;
    res += buf.slice(0, cr).toString(enc);
  }

  return res;
};

function passThroughWrite(buffer) {
  return buffer.toString(this.encoding);
}

function utf16DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 2;
  this.charLength = this.charReceived ? 2 : 0;
}

function base64DetectIncompleteChar(buffer) {
  this.charReceived = buffer.length % 3;
  this.charLength = this.charReceived ? 3 : 0;
}

Readable.ReadableState = ReadableState;

var debug = debuglog('stream');
inherits$1(Readable, EventEmitter);

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event])
      emitter.on(event, fn);
    else if (Array.isArray(emitter._events[event]))
      emitter._events[event].unshift(fn);
    else
      emitter._events[event] = [fn, emitter._events[event]];
  }
}
function listenerCount (emitter, type) {
  return emitter.listeners(type).length;
}
function ReadableState(options, stream) {

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // when piping, we only care about 'readable' events that happen
  // after read()ing all the bytes and not getting any pushback.
  this.ranOut = false;

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}
function Readable(options) {

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options && typeof options.read === 'function') this._read = options.read;

  EventEmitter.call(this);
}

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;

  if (!state.objectMode && typeof chunk === 'string') {
    encoding = encoding || state.defaultEncoding;
    if (encoding !== state.encoding) {
      chunk = Buffer.from(chunk, encoding);
      encoding = '';
    }
  }

  return readableAddChunk(this, state, chunk, encoding, false);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  var state = this._readableState;
  return readableAddChunk(this, state, chunk, '', true);
};

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

function readableAddChunk(stream, state, chunk, encoding, addToFront) {
  var er = chunkInvalid(state, chunk);
  if (er) {
    stream.emit('error', er);
  } else if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else if (state.objectMode || chunk && chunk.length > 0) {
    if (state.ended && !addToFront) {
      var e = new Error('stream.push() after EOF');
      stream.emit('error', e);
    } else if (state.endEmitted && addToFront) {
      var _e = new Error('stream.unshift() after end event');
      stream.emit('error', _e);
    } else {
      var skipAdd;
      if (state.decoder && !addToFront && !encoding) {
        chunk = state.decoder.write(chunk);
        skipAdd = !state.objectMode && chunk.length === 0;
      }

      if (!addToFront) state.reading = false;

      // Don't add to the buffer if we've decoded to an empty string chunk and
      // we're not in object mode
      if (!skipAdd) {
        // if we want the data now, just emit it.
        if (state.flowing && state.length === 0 && !state.sync) {
          stream.emit('data', chunk);
          stream.read(0);
        } else {
          // update the buffer info.
          state.length += state.objectMode ? 1 : chunk.length;
          if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

          if (state.needReadable) emitReadable(stream);
        }
      }

      maybeReadMore(stream, state);
    }
  } else if (!addToFront) {
    state.reading = false;
  }

  return needMoreData(state);
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function chunkInvalid(state, chunk) {
  var er = null;
  if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) nextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    nextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false);

  var endFn = doEnd ? onend : cleanup;
  if (state.endEmitted) nextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable) {
    debug('onunpipe');
    if (readable === src) {
      cleanup();
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', cleanup);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (listenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && src.listeners('data').length) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var _i = 0; _i < len; _i++) {
      dests[_i].emit('unpipe', this);
    }return this;
  }

  // try to find the right one.
  var i = indexOf(state.pipes, dest);
  if (i === -1) return this;

  state.pipes.splice(i, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = EventEmitter.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        nextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    nextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  var events = ['error', 'close', 'destroy', 'pause', 'resume'];
  forEach(events, function (ev) {
    stream.on(ev, self.emit.bind(self, ev));
  });

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    nextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}

// A bit simpler than readable streams.
Writable.WritableState = WritableState;
inherits$1(Writable, EventEmitter);

function nop() {}

function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

function WritableState(options, stream) {
  Object.defineProperty(this, 'buffer', {
    get: deprecate(function () {
      return this.getBuffer();
    }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.')
  });
  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = ~ ~this.highWaterMark;

  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function writableStateGetBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};
function Writable(options) {

  // Writable ctor is applied to Duplexes, though they're not
  // instanceof Writable, they're instanceof Readable.
  if (!(this instanceof Writable) && !(this instanceof Duplex)) return new Writable(options);

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;
  }

  EventEmitter.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  nextTick(cb, er);
}

// If we get something that is not a buffer, string, null, or undefined,
// and we're not in objectMode, then that's an error.
// Otherwise stream chunks are all considered to be of length=1, and the
// watermarks determine how many objects to keep in the buffer, rather than
// how many bytes or characters.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;
  // Always throw error if a null is written
  // if we are not in object mode then throw
  // if it is not a buffer, string, or undefined.
  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (!Buffer$1.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    nextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (Buffer$1.isBuffer(chunk)) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer$1.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, chunk, encoding, cb) {
  chunk = decodeChunk(state, chunk, encoding);

  if (Buffer$1.isBuffer(chunk)) encoding = 'buffer';
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = new WriteReq(chunk, encoding, cb);
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;
  if (sync) nextTick(cb, er);else cb(er);

  stream._writableState.errorEmitted = true;
  stream.emit('error', er);
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
        nextTick(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
        afterWrite(stream, state, finished, cb);
      }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    while (entry) {
      buffer[count] = entry;
      entry = entry.next;
      count += 1;
    }

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}

function prefinish(stream, state) {
  if (!state.prefinished) {
    state.prefinished = true;
    stream.emit('prefinish');
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    if (state.pendingcb === 0) {
      prefinish(stream, state);
      state.finished = true;
      stream.emit('finish');
    } else {
      prefinish(stream, state);
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) nextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;

  this.finish = function (err) {
    var entry = _this.entry;
    _this.entry = null;
    while (entry) {
      var cb = entry.callback;
      state.pendingcb--;
      cb(err);
      entry = entry.next;
    }
    if (state.corkedRequestsFree) {
      state.corkedRequestsFree.next = _this;
    } else {
      state.corkedRequestsFree = _this;
    }
  };
}

inherits$1(Duplex, Readable);

var keys = Object.keys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}
function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  nextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

// a transform stream is a readable/writable stream where you do
inherits$1(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) return stream.emit('error', new Error('no writecb in Transform class'));

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}
function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  // when the writable side finishes, then flush out anything remaining.
  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er) {
      done(stream, er);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('Not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

function done(stream, er) {
  if (er) return stream.emit('error', er);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

inherits$1(PassThrough, Transform);
function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

inherits$1(Stream, EventEmitter);
Stream.Readable = Readable;
Stream.Writable = Writable;
Stream.Duplex = Duplex;
Stream.Transform = Transform;
Stream.PassThrough = PassThrough;

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;

// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EventEmitter.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EventEmitter.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};

var msg = {
  2:      'need dictionary',     /* Z_NEED_DICT       2  */
  1:      'stream end',          /* Z_STREAM_END      1  */
  0:      '',                    /* Z_OK              0  */
  '-1':   'file error',          /* Z_ERRNO         (-1) */
  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
};

function ZStream() {
  /* next input byte */
  this.input = null; // JS specific, because we have no pointers
  this.next_in = 0;
  /* number of bytes available at input */
  this.avail_in = 0;
  /* total number of input bytes read so far */
  this.total_in = 0;
  /* next output byte should be put there */
  this.output = null; // JS specific, because we have no pointers
  this.next_out = 0;
  /* remaining free space at output */
  this.avail_out = 0;
  /* total number of bytes output so far */
  this.total_out = 0;
  /* last error message, NULL if no error */
  this.msg = ''/*Z_NULL*/;
  /* not visible by applications */
  this.state = null;
  /* best guess about the data type: binary or text */
  this.data_type = 2/*Z_UNKNOWN*/;
  /* adler32 value of the uncompressed data */
  this.adler = 0;
}

function arraySet(dest, src, src_offs, len, dest_offs) {
  if (src.subarray && dest.subarray) {
    dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
    return;
  }
  // Fallback to ordinary array
  for (var i = 0; i < len; i++) {
    dest[dest_offs + i] = src[src_offs + i];
  }
}


var Buf8 = Uint8Array;
var Buf16 = Uint16Array;
var Buf32 = Int32Array;
// Enable/Disable typed arrays use, for testing
//

/* Public constants ==========================================================*/
/* ===========================================================================*/


//var Z_FILTERED          = 1;
//var Z_HUFFMAN_ONLY      = 2;
//var Z_RLE               = 3;
var Z_FIXED$2 = 4;
//var Z_DEFAULT_STRATEGY  = 0;

/* Possible values of the data_type field (though see inflate()) */
var Z_BINARY$1 = 0;
var Z_TEXT$1 = 1;
//var Z_ASCII             = 1; // = Z_TEXT
var Z_UNKNOWN$2 = 2;

/*============================================================================*/


function zero$1(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}

// From zutil.h

var STORED_BLOCK = 0;
var STATIC_TREES = 1;
var DYN_TREES = 2;
/* The three kinds of block type */

var MIN_MATCH$1 = 3;
var MAX_MATCH$1 = 258;
/* The minimum and maximum match lengths */

// From deflate.h
/* ===========================================================================
 * Internal compression state.
 */

var LENGTH_CODES$1 = 29;
/* number of length codes, not counting the special END_BLOCK code */

var LITERALS$1 = 256;
/* number of literal bytes 0..255 */

var L_CODES$1 = LITERALS$1 + 1 + LENGTH_CODES$1;
/* number of Literal or Length codes, including the END_BLOCK code */

var D_CODES$1 = 30;
/* number of distance codes */

var BL_CODES$1 = 19;
/* number of codes used to transfer the bit lengths */

var HEAP_SIZE$1 = 2 * L_CODES$1 + 1;
/* maximum heap size */

var MAX_BITS$1 = 15;
/* All codes must not exceed MAX_BITS bits */

var Buf_size = 16;
/* size of bit buffer in bi_buf */


/* ===========================================================================
 * Constants
 */

var MAX_BL_BITS = 7;
/* Bit length codes must not exceed MAX_BL_BITS bits */

var END_BLOCK = 256;
/* end of block literal code */

var REP_3_6 = 16;
/* repeat previous bit length 3-6 times (2 bits of repeat count) */

var REPZ_3_10 = 17;
/* repeat a zero length 3-10 times  (3 bits of repeat count) */

var REPZ_11_138 = 18;
/* repeat a zero length 11-138 times  (7 bits of repeat count) */

/* eslint-disable comma-spacing,array-bracket-spacing */
var extra_lbits = /* extra bits for each length code */ [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0];

var extra_dbits = /* extra bits for each distance code */ [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];

var extra_blbits = /* extra bits for each bit length code */ [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7];

var bl_order = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
/* eslint-enable comma-spacing,array-bracket-spacing */

/* The lengths of the bit length codes are sent in order of decreasing
 * probability, to avoid transmitting the lengths for unused bit length codes.
 */

/* ===========================================================================
 * Local data. These are initialized only once.
 */

// We pre-fill arrays with 0 to avoid uninitialized gaps

var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

// !!!! Use flat array insdead of structure, Freq = i*2, Len = i*2+1
var static_ltree = new Array((L_CODES$1 + 2) * 2);
zero$1(static_ltree);
/* The static literal tree. Since the bit lengths are imposed, there is no
 * need for the L_CODES extra codes used during heap construction. However
 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
 * below).
 */

var static_dtree = new Array(D_CODES$1 * 2);
zero$1(static_dtree);
/* The static distance tree. (Actually a trivial tree since all codes use
 * 5 bits.)
 */

var _dist_code = new Array(DIST_CODE_LEN);
zero$1(_dist_code);
/* Distance codes. The first 256 values correspond to the distances
 * 3 .. 258, the last 256 values correspond to the top 8 bits of
 * the 15 bit distances.
 */

var _length_code = new Array(MAX_MATCH$1 - MIN_MATCH$1 + 1);
zero$1(_length_code);
/* length code for each normalized match length (0 == MIN_MATCH) */

var base_length = new Array(LENGTH_CODES$1);
zero$1(base_length);
/* First normalized length for each code (0 = MIN_MATCH) */

var base_dist = new Array(D_CODES$1);
zero$1(base_dist);
/* First normalized distance for each code (0 = distance of 1) */


function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

  this.static_tree = static_tree; /* static tree or NULL */
  this.extra_bits = extra_bits; /* extra bits for each code or NULL */
  this.extra_base = extra_base; /* base index for extra_bits */
  this.elems = elems; /* max number of elements in the tree */
  this.max_length = max_length; /* max bit length for the codes */

  // show if `static_tree` has data or dummy - needed for monomorphic objects
  this.has_stree = static_tree && static_tree.length;
}


var static_l_desc;
var static_d_desc;
var static_bl_desc;


function TreeDesc(dyn_tree, stat_desc) {
  this.dyn_tree = dyn_tree; /* the dynamic tree */
  this.max_code = 0; /* largest code with non zero frequency */
  this.stat_desc = stat_desc; /* the corresponding static tree */
}



function d_code(dist) {
  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
}


/* ===========================================================================
 * Output a short LSB first on the stream.
 * IN assertion: there is enough room in pendingBuf.
 */
function put_short(s, w) {
  //    put_byte(s, (uch)((w) & 0xff));
  //    put_byte(s, (uch)((ush)(w) >> 8));
  s.pending_buf[s.pending++] = (w) & 0xff;
  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
}


/* ===========================================================================
 * Send a value on a given number of bits.
 * IN assertion: length <= 16 and value fits in length bits.
 */
function send_bits(s, value, length) {
  if (s.bi_valid > (Buf_size - length)) {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    put_short(s, s.bi_buf);
    s.bi_buf = value >> (Buf_size - s.bi_valid);
    s.bi_valid += length - Buf_size;
  } else {
    s.bi_buf |= (value << s.bi_valid) & 0xffff;
    s.bi_valid += length;
  }
}


function send_code(s, c, tree) {
  send_bits(s, tree[c * 2] /*.Code*/ , tree[c * 2 + 1] /*.Len*/ );
}


/* ===========================================================================
 * Reverse the first len bits of a code, using straightforward code (a faster
 * method would use a table)
 * IN assertion: 1 <= len <= 15
 */
function bi_reverse(code, len) {
  var res = 0;
  do {
    res |= code & 1;
    code >>>= 1;
    res <<= 1;
  } while (--len > 0);
  return res >>> 1;
}


/* ===========================================================================
 * Flush the bit buffer, keeping at most 7 bits in it.
 */
function bi_flush(s) {
  if (s.bi_valid === 16) {
    put_short(s, s.bi_buf);
    s.bi_buf = 0;
    s.bi_valid = 0;

  } else if (s.bi_valid >= 8) {
    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
    s.bi_buf >>= 8;
    s.bi_valid -= 8;
  }
}


/* ===========================================================================
 * Compute the optimal bit lengths for a tree and update the total bit length
 * for the current block.
 * IN assertion: the fields freq and dad are set, heap[heap_max] and
 *    above are the tree nodes sorted by increasing frequency.
 * OUT assertions: the field len is set to the optimal bit length, the
 *     array bl_count contains the frequencies for each bit length.
 *     The length opt_len is updated; static_len is also updated if stree is
 *     not null.
 */
function gen_bitlen(s, desc) {
//    deflate_state *s;
//    tree_desc *desc;    /* the tree descriptor */
  var tree = desc.dyn_tree;
  var max_code = desc.max_code;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var extra = desc.stat_desc.extra_bits;
  var base = desc.stat_desc.extra_base;
  var max_length = desc.stat_desc.max_length;
  var h; /* heap index */
  var n, m; /* iterate over the tree elements */
  var bits; /* bit length */
  var xbits; /* extra bits */
  var f; /* frequency */
  var overflow = 0; /* number of elements with bit length too large */

  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    s.bl_count[bits] = 0;
  }

  /* In a first pass, compute the optimal bit lengths (which may
   * overflow in the case of the bit length tree).
   */
  tree[s.heap[s.heap_max] * 2 + 1] /*.Len*/ = 0; /* root of the heap */

  for (h = s.heap_max + 1; h < HEAP_SIZE$1; h++) {
    n = s.heap[h];
    bits = tree[tree[n * 2 + 1] /*.Dad*/ * 2 + 1] /*.Len*/ + 1;
    if (bits > max_length) {
      bits = max_length;
      overflow++;
    }
    tree[n * 2 + 1] /*.Len*/ = bits;
    /* We overwrite tree[n].Dad which is no longer needed */

    if (n > max_code) {
      continue;
    } /* not a leaf node */

    s.bl_count[bits]++;
    xbits = 0;
    if (n >= base) {
      xbits = extra[n - base];
    }
    f = tree[n * 2] /*.Freq*/ ;
    s.opt_len += f * (bits + xbits);
    if (has_stree) {
      s.static_len += f * (stree[n * 2 + 1] /*.Len*/ + xbits);
    }
  }
  if (overflow === 0) {
    return;
  }

  // Trace((stderr,"\nbit length overflow\n"));
  /* This happens for example on obj2 and pic of the Calgary corpus */

  /* Find the first bit length which could increase: */
  do {
    bits = max_length - 1;
    while (s.bl_count[bits] === 0) {
      bits--;
    }
    s.bl_count[bits]--; /* move one leaf down the tree */
    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
    s.bl_count[max_length]--;
    /* The brother of the overflow item also moves one step up,
     * but this does not affect bl_count[max_length]
     */
    overflow -= 2;
  } while (overflow > 0);

  /* Now recompute all bit lengths, scanning in increasing frequency.
   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
   * lengths instead of fixing only the wrong ones. This idea is taken
   * from 'ar' written by Haruhiko Okumura.)
   */
  for (bits = max_length; bits !== 0; bits--) {
    n = s.bl_count[bits];
    while (n !== 0) {
      m = s.heap[--h];
      if (m > max_code) {
        continue;
      }
      if (tree[m * 2 + 1] /*.Len*/ !== bits) {
        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
        s.opt_len += (bits - tree[m * 2 + 1] /*.Len*/ ) * tree[m * 2] /*.Freq*/ ;
        tree[m * 2 + 1] /*.Len*/ = bits;
      }
      n--;
    }
  }
}


/* ===========================================================================
 * Generate the codes for a given tree and bit counts (which need not be
 * optimal).
 * IN assertion: the array bl_count contains the bit length statistics for
 * the given tree and the field len is set for all tree elements.
 * OUT assertion: the field code is set for all tree elements of non
 *     zero code length.
 */
function gen_codes(tree, max_code, bl_count) {
//    ct_data *tree;             /* the tree to decorate */
//    int max_code;              /* largest code with non zero frequency */
//    ushf *bl_count;            /* number of codes at each bit length */

  var next_code = new Array(MAX_BITS$1 + 1); /* next code value for each bit length */
  var code = 0; /* running code value */
  var bits; /* bit index */
  var n; /* code index */

  /* The distribution counts are first used to generate the code values
   * without bit reversal.
   */
  for (bits = 1; bits <= MAX_BITS$1; bits++) {
    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
  }
  /* Check that the bit counts in bl_count are consistent. The last code
   * must be all ones.
   */
  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
  //        "inconsistent bit counts");
  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

  for (n = 0; n <= max_code; n++) {
    var len = tree[n * 2 + 1] /*.Len*/ ;
    if (len === 0) {
      continue;
    }
    /* Now reverse the bits */
    tree[n * 2] /*.Code*/ = bi_reverse(next_code[len]++, len);

    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
  }
}


/* ===========================================================================
 * Initialize the various 'constant' tables.
 */
function tr_static_init() {
  var n; /* iterates over tree elements */
  var bits; /* bit counter */
  var length; /* length value */
  var code; /* code value */
  var dist; /* distance index */
  var bl_count = new Array(MAX_BITS$1 + 1);
  /* number of codes at each bit length for an optimal tree */

  // do check in _tr_init()
  //if (static_init_done) return;

  /* For some embedded targets, global variables are not initialized: */
  /*#ifdef NO_INIT_GLOBAL_POINTERS
    static_l_desc.static_tree = static_ltree;
    static_l_desc.extra_bits = extra_lbits;
    static_d_desc.static_tree = static_dtree;
    static_d_desc.extra_bits = extra_dbits;
    static_bl_desc.extra_bits = extra_blbits;
  #endif*/

  /* Initialize the mapping length (0..255) -> length code (0..28) */
  length = 0;
  for (code = 0; code < LENGTH_CODES$1 - 1; code++) {
    base_length[code] = length;
    for (n = 0; n < (1 << extra_lbits[code]); n++) {
      _length_code[length++] = code;
    }
  }
  //Assert (length == 256, "tr_static_init: length != 256");
  /* Note that the length 255 (match length 258) can be represented
   * in two different ways: code 284 + 5 bits or code 285, so we
   * overwrite length_code[255] to use the best encoding:
   */
  _length_code[length - 1] = code;

  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
  dist = 0;
  for (code = 0; code < 16; code++) {
    base_dist[code] = dist;
    for (n = 0; n < (1 << extra_dbits[code]); n++) {
      _dist_code[dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: dist != 256");
  dist >>= 7; /* from now on, all distances are divided by 128 */
  for (; code < D_CODES$1; code++) {
    base_dist[code] = dist << 7;
    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
      _dist_code[256 + dist++] = code;
    }
  }
  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

  /* Construct the codes of the static literal tree */
  for (bits = 0; bits <= MAX_BITS$1; bits++) {
    bl_count[bits] = 0;
  }

  n = 0;
  while (n <= 143) {
    static_ltree[n * 2 + 1] /*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  while (n <= 255) {
    static_ltree[n * 2 + 1] /*.Len*/ = 9;
    n++;
    bl_count[9]++;
  }
  while (n <= 279) {
    static_ltree[n * 2 + 1] /*.Len*/ = 7;
    n++;
    bl_count[7]++;
  }
  while (n <= 287) {
    static_ltree[n * 2 + 1] /*.Len*/ = 8;
    n++;
    bl_count[8]++;
  }
  /* Codes 286 and 287 do not exist, but we must include them in the
   * tree construction to get a canonical Huffman tree (longest code
   * all ones)
   */
  gen_codes(static_ltree, L_CODES$1 + 1, bl_count);

  /* The static distance tree is trivial: */
  for (n = 0; n < D_CODES$1; n++) {
    static_dtree[n * 2 + 1] /*.Len*/ = 5;
    static_dtree[n * 2] /*.Code*/ = bi_reverse(n, 5);
  }

  // Now data ready and we can init static trees
  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS$1 + 1, L_CODES$1, MAX_BITS$1);
  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0, D_CODES$1, MAX_BITS$1);
  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0, BL_CODES$1, MAX_BL_BITS);

  //static_init_done = true;
}


/* ===========================================================================
 * Initialize a new block.
 */
function init_block(s) {
  var n; /* iterates over tree elements */

  /* Initialize the trees. */
  for (n = 0; n < L_CODES$1; n++) {
    s.dyn_ltree[n * 2] /*.Freq*/ = 0;
  }
  for (n = 0; n < D_CODES$1; n++) {
    s.dyn_dtree[n * 2] /*.Freq*/ = 0;
  }
  for (n = 0; n < BL_CODES$1; n++) {
    s.bl_tree[n * 2] /*.Freq*/ = 0;
  }

  s.dyn_ltree[END_BLOCK * 2] /*.Freq*/ = 1;
  s.opt_len = s.static_len = 0;
  s.last_lit = s.matches = 0;
}


/* ===========================================================================
 * Flush the bit buffer and align the output on a byte boundary
 */
function bi_windup(s) {
  if (s.bi_valid > 8) {
    put_short(s, s.bi_buf);
  } else if (s.bi_valid > 0) {
    //put_byte(s, (Byte)s->bi_buf);
    s.pending_buf[s.pending++] = s.bi_buf;
  }
  s.bi_buf = 0;
  s.bi_valid = 0;
}

/* ===========================================================================
 * Copy a stored block, storing first the length and its
 * one's complement if requested.
 */
function copy_block(s, buf, len, header) {
//DeflateState *s;
//charf    *buf;    /* the input data */
//unsigned len;     /* its length */
//int      header;  /* true if block header must be written */

  bi_windup(s); /* align on byte boundary */

  if (header) {
    put_short(s, len);
    put_short(s, ~len);
  }
  //  while (len--) {
  //    put_byte(s, *buf++);
  //  }
  arraySet(s.pending_buf, s.window, buf, len, s.pending);
  s.pending += len;
}

/* ===========================================================================
 * Compares to subtrees, using the tree depth as tie breaker when
 * the subtrees have equal frequency. This minimizes the worst case length.
 */
function smaller(tree, n, m, depth) {
  var _n2 = n * 2;
  var _m2 = m * 2;
  return (tree[_n2] /*.Freq*/ < tree[_m2] /*.Freq*/ ||
    (tree[_n2] /*.Freq*/ === tree[_m2] /*.Freq*/ && depth[n] <= depth[m]));
}

/* ===========================================================================
 * Restore the heap property by moving down the tree starting at node k,
 * exchanging a node with the smallest of its two sons if necessary, stopping
 * when the heap property is re-established (each father smaller than its
 * two sons).
 */
function pqdownheap(s, tree, k)
//    deflate_state *s;
//    ct_data *tree;  /* the tree to restore */
//    int k;               /* node to move down */
{
  var v = s.heap[k];
  var j = k << 1; /* left son of k */
  while (j <= s.heap_len) {
    /* Set j to the smallest of the two sons: */
    if (j < s.heap_len &&
      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
      j++;
    }
    /* Exit if v is smaller than both sons */
    if (smaller(tree, v, s.heap[j], s.depth)) {
      break;
    }

    /* Exchange v with the smallest son */
    s.heap[k] = s.heap[j];
    k = j;

    /* And continue down the tree, setting j to the left son of k */
    j <<= 1;
  }
  s.heap[k] = v;
}


// inlined manually
// var SMALLEST = 1;

/* ===========================================================================
 * Send the block data compressed using the given Huffman trees
 */
function compress_block(s, ltree, dtree)
//    deflate_state *s;
//    const ct_data *ltree; /* literal tree */
//    const ct_data *dtree; /* distance tree */
{
  var dist; /* distance of matched string */
  var lc; /* match length or unmatched char (if dist == 0) */
  var lx = 0; /* running index in l_buf */
  var code; /* the code to send */
  var extra; /* number of extra bits to send */

  if (s.last_lit !== 0) {
    do {
      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
      lc = s.pending_buf[s.l_buf + lx];
      lx++;

      if (dist === 0) {
        send_code(s, lc, ltree); /* send a literal byte */
        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
      } else {
        /* Here, lc is the match length - MIN_MATCH */
        code = _length_code[lc];
        send_code(s, code + LITERALS$1 + 1, ltree); /* send the length code */
        extra = extra_lbits[code];
        if (extra !== 0) {
          lc -= base_length[code];
          send_bits(s, lc, extra); /* send the extra length bits */
        }
        dist--; /* dist is now the match distance - 1 */
        code = d_code(dist);
        //Assert (code < D_CODES, "bad d_code");

        send_code(s, code, dtree); /* send the distance code */
        extra = extra_dbits[code];
        if (extra !== 0) {
          dist -= base_dist[code];
          send_bits(s, dist, extra); /* send the extra distance bits */
        }
      } /* literal or match pair ? */

      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
      //       "pendingBuf overflow");

    } while (lx < s.last_lit);
  }

  send_code(s, END_BLOCK, ltree);
}


/* ===========================================================================
 * Construct one Huffman tree and assigns the code bit strings and lengths.
 * Update the total bit length for the current block.
 * IN assertion: the field freq is set for all tree elements.
 * OUT assertions: the fields len and code are set to the optimal bit length
 *     and corresponding code. The length opt_len is updated; static_len is
 *     also updated if stree is not null. The field max_code is set.
 */
function build_tree(s, desc)
//    deflate_state *s;
//    tree_desc *desc; /* the tree descriptor */
{
  var tree = desc.dyn_tree;
  var stree = desc.stat_desc.static_tree;
  var has_stree = desc.stat_desc.has_stree;
  var elems = desc.stat_desc.elems;
  var n, m; /* iterate over heap elements */
  var max_code = -1; /* largest code with non zero frequency */
  var node; /* new node being created */

  /* Construct the initial heap, with least frequent element in
   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
   * heap[0] is not used.
   */
  s.heap_len = 0;
  s.heap_max = HEAP_SIZE$1;

  for (n = 0; n < elems; n++) {
    if (tree[n * 2] /*.Freq*/ !== 0) {
      s.heap[++s.heap_len] = max_code = n;
      s.depth[n] = 0;

    } else {
      tree[n * 2 + 1] /*.Len*/ = 0;
    }
  }

  /* The pkzip format requires that at least one distance code exists,
   * and that at least one bit should be sent even if there is only one
   * possible code. So to avoid special checks later on we force at least
   * two codes of non zero frequency.
   */
  while (s.heap_len < 2) {
    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
    tree[node * 2] /*.Freq*/ = 1;
    s.depth[node] = 0;
    s.opt_len--;

    if (has_stree) {
      s.static_len -= stree[node * 2 + 1] /*.Len*/ ;
    }
    /* node is 0 or 1 so it does not have extra bits */
  }
  desc.max_code = max_code;

  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
   * establish sub-heaps of increasing lengths:
   */
  for (n = (s.heap_len >> 1 /*int /2*/ ); n >= 1; n--) {
    pqdownheap(s, tree, n);
  }

  /* Construct the Huffman tree by repeatedly combining the least two
   * frequent nodes.
   */
  node = elems; /* next internal node of the tree */
  do {
    //pqremove(s, tree, n);  /* n = node of least frequency */
    /*** pqremove ***/
    n = s.heap[1 /*SMALLEST*/ ];
    s.heap[1 /*SMALLEST*/ ] = s.heap[s.heap_len--];
    pqdownheap(s, tree, 1 /*SMALLEST*/ );
    /***/

    m = s.heap[1 /*SMALLEST*/ ]; /* m = node of next least frequency */

    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
    s.heap[--s.heap_max] = m;

    /* Create a new node father of n and m */
    tree[node * 2] /*.Freq*/ = tree[n * 2] /*.Freq*/ + tree[m * 2] /*.Freq*/ ;
    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
    tree[n * 2 + 1] /*.Dad*/ = tree[m * 2 + 1] /*.Dad*/ = node;

    /* and insert the new node in the heap */
    s.heap[1 /*SMALLEST*/ ] = node++;
    pqdownheap(s, tree, 1 /*SMALLEST*/ );

  } while (s.heap_len >= 2);

  s.heap[--s.heap_max] = s.heap[1 /*SMALLEST*/ ];

  /* At this point, the fields freq and dad are set. We can now
   * generate the bit lengths.
   */
  gen_bitlen(s, desc);

  /* The field len is now set, we can generate the bit codes */
  gen_codes(tree, max_code, s.bl_count);
}


/* ===========================================================================
 * Scan a literal or distance tree to determine the frequencies of the codes
 * in the bit length tree.
 */
function scan_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree;   /* the tree to be scanned */
//    int max_code;    /* and its largest code of non zero frequency */
{
  var n; /* iterates over all tree elements */
  var prevlen = -1; /* last emitted length */
  var curlen; /* length of current code */

  var nextlen = tree[0 * 2 + 1] /*.Len*/ ; /* length of next code */

  var count = 0; /* repeat count of the current code */
  var max_count = 7; /* max repeat count */
  var min_count = 4; /* min repeat count */

  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }
  tree[(max_code + 1) * 2 + 1] /*.Len*/ = 0xffff; /* guard */

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1] /*.Len*/ ;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      s.bl_tree[curlen * 2] /*.Freq*/ += count;

    } else if (curlen !== 0) {

      if (curlen !== prevlen) {
        s.bl_tree[curlen * 2] /*.Freq*/ ++;
      }
      s.bl_tree[REP_3_6 * 2] /*.Freq*/ ++;

    } else if (count <= 10) {
      s.bl_tree[REPZ_3_10 * 2] /*.Freq*/ ++;

    } else {
      s.bl_tree[REPZ_11_138 * 2] /*.Freq*/ ++;
    }

    count = 0;
    prevlen = curlen;

    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Send a literal or distance tree in compressed form, using the codes in
 * bl_tree.
 */
function send_tree(s, tree, max_code)
//    deflate_state *s;
//    ct_data *tree; /* the tree to be scanned */
//    int max_code;       /* and its largest code of non zero frequency */
{
  var n; /* iterates over all tree elements */
  var prevlen = -1; /* last emitted length */
  var curlen; /* length of current code */

  var nextlen = tree[0 * 2 + 1] /*.Len*/ ; /* length of next code */

  var count = 0; /* repeat count of the current code */
  var max_count = 7; /* max repeat count */
  var min_count = 4; /* min repeat count */

  /* tree[max_code+1].Len = -1; */
  /* guard already set */
  if (nextlen === 0) {
    max_count = 138;
    min_count = 3;
  }

  for (n = 0; n <= max_code; n++) {
    curlen = nextlen;
    nextlen = tree[(n + 1) * 2 + 1] /*.Len*/ ;

    if (++count < max_count && curlen === nextlen) {
      continue;

    } else if (count < min_count) {
      do {
        send_code(s, curlen, s.bl_tree);
      } while (--count !== 0);

    } else if (curlen !== 0) {
      if (curlen !== prevlen) {
        send_code(s, curlen, s.bl_tree);
        count--;
      }
      //Assert(count >= 3 && count <= 6, " 3_6?");
      send_code(s, REP_3_6, s.bl_tree);
      send_bits(s, count - 3, 2);

    } else if (count <= 10) {
      send_code(s, REPZ_3_10, s.bl_tree);
      send_bits(s, count - 3, 3);

    } else {
      send_code(s, REPZ_11_138, s.bl_tree);
      send_bits(s, count - 11, 7);
    }

    count = 0;
    prevlen = curlen;
    if (nextlen === 0) {
      max_count = 138;
      min_count = 3;

    } else if (curlen === nextlen) {
      max_count = 6;
      min_count = 3;

    } else {
      max_count = 7;
      min_count = 4;
    }
  }
}


/* ===========================================================================
 * Construct the Huffman tree for the bit lengths and return the index in
 * bl_order of the last bit length code to send.
 */
function build_bl_tree(s) {
  var max_blindex; /* index of last bit length code of non zero freq */

  /* Determine the bit length frequencies for literal and distance trees */
  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

  /* Build the bit length tree: */
  build_tree(s, s.bl_desc);
  /* opt_len now includes the length of the tree representations, except
   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
   */

  /* Determine the number of bit length codes to send. The pkzip format
   * requires that at least 4 bit length codes be sent. (appnote.txt says
   * 3 but the actual value used is 4.)
   */
  for (max_blindex = BL_CODES$1 - 1; max_blindex >= 3; max_blindex--) {
    if (s.bl_tree[bl_order[max_blindex] * 2 + 1] /*.Len*/ !== 0) {
      break;
    }
  }
  /* Update opt_len to include the bit length tree and counts */
  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
  //        s->opt_len, s->static_len));

  return max_blindex;
}


/* ===========================================================================
 * Send the header for a block using dynamic Huffman trees: the counts, the
 * lengths of the bit length codes, the literal tree and the distance tree.
 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
 */
function send_all_trees(s, lcodes, dcodes, blcodes)
//    deflate_state *s;
//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
{
  var rank; /* index in bl_order */

  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
  //        "too many codes");
  //Tracev((stderr, "\nbl counts: "));
  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
  send_bits(s, dcodes - 1, 5);
  send_bits(s, blcodes - 4, 4); /* not -3 as stated in appnote.txt */
  for (rank = 0; rank < blcodes; rank++) {
    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1] /*.Len*/ , 3);
  }
  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
}


/* ===========================================================================
 * Check if the data type is TEXT or BINARY, using the following algorithm:
 * - TEXT if the two conditions below are satisfied:
 *    a) There are no non-portable control characters belonging to the
 *       "black list" (0..6, 14..25, 28..31).
 *    b) There is at least one printable character belonging to the
 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
 * - BINARY otherwise.
 * - The following partially-portable control characters form a
 *   "gray list" that is ignored in this detection algorithm:
 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
 * IN assertion: the fields Freq of dyn_ltree are set.
 */
function detect_data_type(s) {
  /* black_mask is the bit mask of black-listed bytes
   * set bits 0..6, 14..25, and 28..31
   * 0xf3ffc07f = binary 11110011111111111100000001111111
   */
  var black_mask = 0xf3ffc07f;
  var n;

  /* Check for non-textual ("black-listed") bytes. */
  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
    if ((black_mask & 1) && (s.dyn_ltree[n * 2] /*.Freq*/ !== 0)) {
      return Z_BINARY$1;
    }
  }

  /* Check for textual ("white-listed") bytes. */
  if (s.dyn_ltree[9 * 2] /*.Freq*/ !== 0 || s.dyn_ltree[10 * 2] /*.Freq*/ !== 0 ||
    s.dyn_ltree[13 * 2] /*.Freq*/ !== 0) {
    return Z_TEXT$1;
  }
  for (n = 32; n < LITERALS$1; n++) {
    if (s.dyn_ltree[n * 2] /*.Freq*/ !== 0) {
      return Z_TEXT$1;
    }
  }

  /* There are no "black-listed" or "white-listed" bytes:
   * this stream either is empty or has tolerated ("gray-listed") bytes only.
   */
  return Z_BINARY$1;
}


var static_init_done = false;

/* ===========================================================================
 * Initialize the tree data structures for a new zlib stream.
 */
function _tr_init(s) {

  if (!static_init_done) {
    tr_static_init();
    static_init_done = true;
  }

  s.l_desc = new TreeDesc(s.dyn_ltree, static_l_desc);
  s.d_desc = new TreeDesc(s.dyn_dtree, static_d_desc);
  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

  s.bi_buf = 0;
  s.bi_valid = 0;

  /* Initialize the first block of the first file: */
  init_block(s);
}


/* ===========================================================================
 * Send a stored block
 */
function _tr_stored_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3); /* send block type */
  copy_block(s, buf, stored_len, true); /* with header */
}


/* ===========================================================================
 * Send one empty static block to give enough lookahead for inflate.
 * This takes 10 bits, of which 7 may remain in the bit buffer.
 */
function _tr_align(s) {
  send_bits(s, STATIC_TREES << 1, 3);
  send_code(s, END_BLOCK, static_ltree);
  bi_flush(s);
}


/* ===========================================================================
 * Determine the best encoding for the current block: dynamic trees, static
 * trees or store, and output the encoded block to the zip file.
 */
function _tr_flush_block(s, buf, stored_len, last)
//DeflateState *s;
//charf *buf;       /* input block, or NULL if too old */
//ulg stored_len;   /* length of input block */
//int last;         /* one if this is the last block for a file */
{
  var opt_lenb, static_lenb; /* opt_len and static_len in bytes */
  var max_blindex = 0; /* index of last bit length code of non zero freq */

  /* Build the Huffman trees unless a stored block is forced */
  if (s.level > 0) {

    /* Check if the file is binary or text */
    if (s.strm.data_type === Z_UNKNOWN$2) {
      s.strm.data_type = detect_data_type(s);
    }

    /* Construct the literal and distance trees */
    build_tree(s, s.l_desc);
    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));

    build_tree(s, s.d_desc);
    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
    //        s->static_len));
    /* At this point, opt_len and static_len are the total bit lengths of
     * the compressed block data, excluding the tree representations.
     */

    /* Build the bit length tree for the above two trees, and get the index
     * in bl_order of the last bit length code to send.
     */
    max_blindex = build_bl_tree(s);

    /* Determine the best encoding. Compute the block lengths in bytes. */
    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
    static_lenb = (s.static_len + 3 + 7) >>> 3;

    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
    //        s->last_lit));

    if (static_lenb <= opt_lenb) {
      opt_lenb = static_lenb;
    }

  } else {
    // Assert(buf != (char*)0, "lost buf");
    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
  }

  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
    /* 4: two words for the lengths */

    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
     * Otherwise we can't have processed more than WSIZE input bytes since
     * the last block flush, because compression would have been
     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
     * transform a block into a stored block.
     */
    _tr_stored_block(s, buf, stored_len, last);

  } else if (s.strategy === Z_FIXED$2 || static_lenb === opt_lenb) {

    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
    compress_block(s, static_ltree, static_dtree);

  } else {
    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
    compress_block(s, s.dyn_ltree, s.dyn_dtree);
  }
  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
  /* The above check is made mod 2^32, for files larger than 512 MB
   * and uLong implemented on 32 bits.
   */
  init_block(s);

  if (last) {
    bi_windup(s);
  }
  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
  //       s->compressed_len-7*last));
}

/* ===========================================================================
 * Save the match info and tally the frequency counts. Return true if
 * the current block must be flushed.
 */
function _tr_tally(s, dist, lc)
//    deflate_state *s;
//    unsigned dist;  /* distance of matched string */
//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
{
  //var out_length, in_length, dcode;

  s.pending_buf[s.d_buf + s.last_lit * 2] = (dist >>> 8) & 0xff;
  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
  s.last_lit++;

  if (dist === 0) {
    /* lc is the unmatched char */
    s.dyn_ltree[lc * 2] /*.Freq*/ ++;
  } else {
    s.matches++;
    /* Here, lc is the match length - MIN_MATCH */
    dist--; /* dist = match distance - 1 */
    //Assert((ush)dist < (ush)MAX_DIST(s) &&
    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

    s.dyn_ltree[(_length_code[lc] + LITERALS$1 + 1) * 2] /*.Freq*/ ++;
    s.dyn_dtree[d_code(dist) * 2] /*.Freq*/ ++;
  }

  // (!) This block is disabled in zlib defailts,
  // don't enable it for binary compatibility

  //#ifdef TRUNCATE_BLOCK
  //  /* Try to guess if it is profitable to stop the current block here */
  //  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
  //    /* Compute an upper bound for the compressed length */
  //    out_length = s.last_lit*8;
  //    in_length = s.strstart - s.block_start;
  //
  //    for (dcode = 0; dcode < D_CODES; dcode++) {
  //      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
  //    }
  //    out_length >>>= 3;
  //    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
  //    //       s->last_lit, in_length, out_length,
  //    //       100L - out_length*100L/in_length));
  //    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
  //      return true;
  //    }
  //  }
  //#endif

  return (s.last_lit === s.lit_bufsize - 1);
  /* We avoid equality with lit_bufsize because of wraparound at 64K
   * on 16 bit machines and because stored blocks are restricted to
   * 64K-1 bytes.
   */
}

// Note: adler32 takes 12% for level 0 and 2% for level 6.
// It doesn't worth to make additional optimizationa as in original.
// Small size is preferable.

function adler32(adler, buf, len, pos) {
  var s1 = (adler & 0xffff) |0,
      s2 = ((adler >>> 16) & 0xffff) |0,
      n = 0;

  while (len !== 0) {
    // Set limit ~ twice less than 5552, to keep
    // s2 in 31-bits, because we force signed ints.
    // in other case %= will fail.
    n = len > 2000 ? 2000 : len;
    len -= n;

    do {
      s1 = (s1 + buf[pos++]) |0;
      s2 = (s2 + s1) |0;
    } while (--n);

    s1 %= 65521;
    s2 %= 65521;
  }

  return (s1 | (s2 << 16)) |0;
}

// Note: we can't get significant speed boost here.
// So write code to minimize size - no pregenerated tables
// and array tools dependencies.


// Use ordinary array, since untyped makes no boost here
function makeTable() {
  var c, table = [];

  for (var n = 0; n < 256; n++) {
    c = n;
    for (var k = 0; k < 8; k++) {
      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
    }
    table[n] = c;
  }

  return table;
}

// Create table on load. Just 255 signed longs. Not a problem.
var crcTable = makeTable();


function crc32(crc, buf, len, pos) {
  var t = crcTable,
      end = pos + len;

  crc ^= -1;

  for (var i = pos; i < end; i++) {
    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
  }

  return (crc ^ (-1)); // >>> 0;
}

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
var Z_NO_FLUSH$1 = 0;
var Z_PARTIAL_FLUSH$1 = 1;
//var Z_SYNC_FLUSH    = 2;
var Z_FULL_FLUSH$1 = 3;
var Z_FINISH$2 = 4;
var Z_BLOCK$2 = 5;
//var Z_TREES         = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK$2 = 0;
var Z_STREAM_END$2 = 1;
//var Z_NEED_DICT     = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR$2 = -2;
var Z_DATA_ERROR$2 = -3;
//var Z_MEM_ERROR     = -4;
var Z_BUF_ERROR$2 = -5;
//var Z_VERSION_ERROR = -6;


/* compression levels */
//var Z_NO_COMPRESSION      = 0;
//var Z_BEST_SPEED          = 1;
//var Z_BEST_COMPRESSION    = 9;
var Z_DEFAULT_COMPRESSION$1 = -1;


var Z_FILTERED$1 = 1;
var Z_HUFFMAN_ONLY$1 = 2;
var Z_RLE$1 = 3;
var Z_FIXED$1 = 4;

/* Possible values of the data_type field (though see inflate()) */
//var Z_BINARY              = 0;
//var Z_TEXT                = 1;
//var Z_ASCII               = 1; // = Z_TEXT
var Z_UNKNOWN$1 = 2;


/* The deflate compression method */
var Z_DEFLATED$2 = 8;

/*============================================================================*/


var MAX_MEM_LEVEL = 9;


var LENGTH_CODES = 29;
/* number of length codes, not counting the special END_BLOCK code */
var LITERALS = 256;
/* number of literal bytes 0..255 */
var L_CODES = LITERALS + 1 + LENGTH_CODES;
/* number of Literal or Length codes, including the END_BLOCK code */
var D_CODES = 30;
/* number of distance codes */
var BL_CODES = 19;
/* number of codes used to transfer the bit lengths */
var HEAP_SIZE = 2 * L_CODES + 1;
/* maximum heap size */
var MAX_BITS = 15;
/* All codes must not exceed MAX_BITS bits */

var MIN_MATCH = 3;
var MAX_MATCH = 258;
var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

var PRESET_DICT = 0x20;

var INIT_STATE = 42;
var EXTRA_STATE = 69;
var NAME_STATE = 73;
var COMMENT_STATE = 91;
var HCRC_STATE = 103;
var BUSY_STATE = 113;
var FINISH_STATE = 666;

var BS_NEED_MORE = 1; /* block not completed, need more input or more output */
var BS_BLOCK_DONE = 2; /* block flush performed */
var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
var BS_FINISH_DONE = 4; /* finish done, accept no more input or output */

var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

function err$1(strm, errorCode) {
  strm.msg = msg[errorCode];
  return errorCode;
}

function rank(f) {
  return ((f) << 1) - ((f) > 4 ? 9 : 0);
}

function zero(buf) {
  var len = buf.length;
  while (--len >= 0) {
    buf[len] = 0;
  }
}


/* =========================================================================
 * Flush as much pending output as possible. All deflate() output goes
 * through this function so some applications may wish to modify it
 * to avoid allocating a large strm->output buffer and copying into it.
 * (See also read_buf()).
 */
function flush_pending(strm) {
  var s = strm.state;

  //_tr_flush_bits(s);
  var len = s.pending;
  if (len > strm.avail_out) {
    len = strm.avail_out;
  }
  if (len === 0) {
    return;
  }

  arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
  strm.next_out += len;
  s.pending_out += len;
  strm.total_out += len;
  strm.avail_out -= len;
  s.pending -= len;
  if (s.pending === 0) {
    s.pending_out = 0;
  }
}


function flush_block_only(s, last) {
  _tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
  s.block_start = s.strstart;
  flush_pending(s.strm);
}


function put_byte(s, b) {
  s.pending_buf[s.pending++] = b;
}


/* =========================================================================
 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
 * IN assertion: the stream state is correct and there is enough room in
 * pending_buf.
 */
function putShortMSB(s, b) {
  //  put_byte(s, (Byte)(b >> 8));
  //  put_byte(s, (Byte)(b & 0xff));
  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
  s.pending_buf[s.pending++] = b & 0xff;
}


/* ===========================================================================
 * Read a new buffer from the current input stream, update the adler32
 * and total number of bytes read.  All deflate() input goes through
 * this function so some applications may wish to modify it to avoid
 * allocating a large strm->input buffer and copying from it.
 * (See also flush_pending()).
 */
function read_buf(strm, buf, start, size) {
  var len = strm.avail_in;

  if (len > size) {
    len = size;
  }
  if (len === 0) {
    return 0;
  }

  strm.avail_in -= len;

  // zmemcpy(buf, strm->next_in, len);
  arraySet(buf, strm.input, strm.next_in, len, start);
  if (strm.state.wrap === 1) {
    strm.adler = adler32(strm.adler, buf, len, start);
  } else if (strm.state.wrap === 2) {
    strm.adler = crc32(strm.adler, buf, len, start);
  }

  strm.next_in += len;
  strm.total_in += len;

  return len;
}


/* ===========================================================================
 * Set match_start to the longest match starting at the given string and
 * return its length. Matches shorter or equal to prev_length are discarded,
 * in which case the result is equal to prev_length and match_start is
 * garbage.
 * IN assertions: cur_match is the head of the hash chain for the current
 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
 * OUT assertion: the match length is not greater than s->lookahead.
 */
function longest_match(s, cur_match) {
  var chain_length = s.max_chain_length; /* max hash chain length */
  var scan = s.strstart; /* current string */
  var match; /* matched string */
  var len; /* length of current match */
  var best_len = s.prev_length; /* best match length so far */
  var nice_match = s.nice_match; /* stop if match long enough */
  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
    s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0 /*NIL*/ ;

  var _win = s.window; // shortcut

  var wmask = s.w_mask;
  var prev = s.prev;

  /* Stop when cur_match becomes <= limit. To simplify the code,
   * we prevent matches with the string of window index 0.
   */

  var strend = s.strstart + MAX_MATCH;
  var scan_end1 = _win[scan + best_len - 1];
  var scan_end = _win[scan + best_len];

  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
   * It is easy to get rid of this optimization if necessary.
   */
  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

  /* Do not waste too much time if we already have a good match: */
  if (s.prev_length >= s.good_match) {
    chain_length >>= 2;
  }
  /* Do not look for matches beyond the end of the input. This is necessary
   * to make deflate deterministic.
   */
  if (nice_match > s.lookahead) {
    nice_match = s.lookahead;
  }

  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

  do {
    // Assert(cur_match < s->strstart, "no future");
    match = cur_match;

    /* Skip to next match if the match length cannot increase
     * or if the match length is less than 2.  Note that the checks below
     * for insufficient lookahead only occur occasionally for performance
     * reasons.  Therefore uninitialized memory will be accessed, and
     * conditional jumps will be made that depend on those values.
     * However the length of the match is limited to the lookahead, so
     * the output of deflate is not affected by the uninitialized values.
     */

    if (_win[match + best_len] !== scan_end ||
      _win[match + best_len - 1] !== scan_end1 ||
      _win[match] !== _win[scan] ||
      _win[++match] !== _win[scan + 1]) {
      continue;
    }

    /* The check at best_len-1 can be removed because it will be made
     * again later. (This heuristic is not always a win.)
     * It is not necessary to compare scan[2] and match[2] since they
     * are always equal when the other bytes match, given that
     * the hash keys are equal and that HASH_BITS >= 8.
     */
    scan += 2;
    match++;
    // Assert(*scan == *match, "match[2]?");

    /* We check for insufficient lookahead only every 8th comparison;
     * the 256th check will be made at strstart+258.
     */
    do {
      /*jshint noempty:false*/
    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
      _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
      _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
      _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
      scan < strend);

    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

    len = MAX_MATCH - (strend - scan);
    scan = strend - MAX_MATCH;

    if (len > best_len) {
      s.match_start = cur_match;
      best_len = len;
      if (len >= nice_match) {
        break;
      }
      scan_end1 = _win[scan + best_len - 1];
      scan_end = _win[scan + best_len];
    }
  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

  if (best_len <= s.lookahead) {
    return best_len;
  }
  return s.lookahead;
}


/* ===========================================================================
 * Fill the window when the lookahead becomes insufficient.
 * Updates strstart and lookahead.
 *
 * IN assertion: lookahead < MIN_LOOKAHEAD
 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
 *    At least one byte has been read, or avail_in == 0; reads are
 *    performed for at least two bytes (required for the zip translate_eol
 *    option -- not supported here).
 */
function fill_window(s) {
  var _w_size = s.w_size;
  var p, n, m, more, str;

  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

  do {
    more = s.window_size - s.lookahead - s.strstart;

    // JS ints have 32 bit, block below not needed
    /* Deal with !@#$% 64K limit: */
    //if (sizeof(int) <= 2) {
    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
    //        more = wsize;
    //
    //  } else if (more == (unsigned)(-1)) {
    //        /* Very unlikely, but possible on 16 bit machine if
    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
    //         */
    //        more--;
    //    }
    //}


    /* If the window is almost full and there is insufficient lookahead,
     * move the upper half to the lower one to make room in the upper half.
     */
    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

      arraySet(s.window, s.window, _w_size, _w_size, 0);
      s.match_start -= _w_size;
      s.strstart -= _w_size;
      /* we now have strstart >= MAX_DIST */
      s.block_start -= _w_size;

      /* Slide the hash table (could be avoided with 32 bit values
       at the expense of memory usage). We slide even when level == 0
       to keep the hash table consistent if we switch back to level > 0
       later. (Using level 0 permanently is not an optimal usage of
       zlib, so we don't care about this pathological case.)
       */

      n = s.hash_size;
      p = n;
      do {
        m = s.head[--p];
        s.head[p] = (m >= _w_size ? m - _w_size : 0);
      } while (--n);

      n = _w_size;
      p = n;
      do {
        m = s.prev[--p];
        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
        /* If n is not on any hash chain, prev[n] is garbage but
         * its value will never be used.
         */
      } while (--n);

      more += _w_size;
    }
    if (s.strm.avail_in === 0) {
      break;
    }

    /* If there was no sliding:
     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
     *    more == window_size - lookahead - strstart
     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
     * => more >= window_size - 2*WSIZE + 2
     * In the BIG_MEM or MMAP case (not yet supported),
     *   window_size == input_size + MIN_LOOKAHEAD  &&
     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
     * Otherwise, window_size == 2*WSIZE so more >= 2.
     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
     */
    //Assert(more >= 2, "more < 2");
    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
    s.lookahead += n;

    /* Initialize the hash value now that we have some input: */
    if (s.lookahead + s.insert >= MIN_MATCH) {
      str = s.strstart - s.insert;
      s.ins_h = s.window[str];

      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
      //#if MIN_MATCH != 3
      //        Call update_hash() MIN_MATCH-3 more times
      //#endif
      while (s.insert) {
        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

        s.prev[str & s.w_mask] = s.head[s.ins_h];
        s.head[s.ins_h] = str;
        str++;
        s.insert--;
        if (s.lookahead + s.insert < MIN_MATCH) {
          break;
        }
      }
    }
    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
     * but this is not important since only literal bytes will be emitted.
     */

  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

  /* If the WIN_INIT bytes after the end of the current data have never been
   * written, then zero those bytes in order to avoid memory check reports of
   * the use of uninitialized (or uninitialised as Julian writes) bytes by
   * the longest match routines.  Update the high water mark for the next
   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
   */
  //  if (s.high_water < s.window_size) {
  //    var curr = s.strstart + s.lookahead;
  //    var init = 0;
  //
  //    if (s.high_water < curr) {
  //      /* Previous high water mark below current data -- zero WIN_INIT
  //       * bytes or up to end of window, whichever is less.
  //       */
  //      init = s.window_size - curr;
  //      if (init > WIN_INIT)
  //        init = WIN_INIT;
  //      zmemzero(s->window + curr, (unsigned)init);
  //      s->high_water = curr + init;
  //    }
  //    else if (s->high_water < (ulg)curr + WIN_INIT) {
  //      /* High water mark at or above current data, but below current data
  //       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
  //       * to end of window, whichever is less.
  //       */
  //      init = (ulg)curr + WIN_INIT - s->high_water;
  //      if (init > s->window_size - s->high_water)
  //        init = s->window_size - s->high_water;
  //      zmemzero(s->window + s->high_water, (unsigned)init);
  //      s->high_water += init;
  //    }
  //  }
  //
  //  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
  //    "not enough room for search");
}

/* ===========================================================================
 * Copy without compression as much as possible from the input stream, return
 * the current block state.
 * This function does not insert new strings in the dictionary since
 * uncompressible data is probably not useful. This function is used
 * only for the level=0 compression option.
 * NOTE: this function should be optimized to avoid extra copying from
 * window to pending_buf.
 */
function deflate_stored(s, flush) {
  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
   * to pending_buf_size, and each stored block has a 5 byte header:
   */
  var max_block_size = 0xffff;

  if (max_block_size > s.pending_buf_size - 5) {
    max_block_size = s.pending_buf_size - 5;
  }

  /* Copy as much as possible from input to output: */
  for (;;) {
    /* Fill the window as much as possible: */
    if (s.lookahead <= 1) {

      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
      //  s->block_start >= (long)s->w_size, "slide too late");
      //      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
      //        s.block_start >= s.w_size)) {
      //        throw  new Error("slide too late");
      //      }

      fill_window(s);
      if (s.lookahead === 0 && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }

      if (s.lookahead === 0) {
        break;
      }
      /* flush the current block */
    }
    //Assert(s->block_start >= 0L, "block gone");
    //    if (s.block_start < 0) throw new Error("block gone");

    s.strstart += s.lookahead;
    s.lookahead = 0;

    /* Emit a stored block if pending_buf will be full: */
    var max_start = s.block_start + max_block_size;

    if (s.strstart === 0 || s.strstart >= max_start) {
      /* strstart == 0 is possible when wraparound on 16-bit machine */
      s.lookahead = s.strstart - max_start;
      s.strstart = max_start;
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/


    }
    /* Flush if we may have to slide, otherwise block_start may become
     * negative and the data will be gone:
     */
    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }

  s.insert = 0;

  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }

  if (s.strstart > s.block_start) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_NEED_MORE;
}

/* ===========================================================================
 * Compress as much as possible from the input stream, return the current
 * block state.
 * This function does not perform lazy evaluation of matches and inserts
 * new strings in the dictionary only for unmatched strings or for short
 * matches. It is used only for the fast compression options.
 */
function deflate_fast(s, flush) {
  var hash_head; /* head of the hash chain */
  var bflush; /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break; /* flush the current block */
      }
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0 /*NIL*/ ;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     * At this point we have always match_length < MIN_MATCH
     */
    if (hash_head !== 0 /*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */
    }
    if (s.match_length >= MIN_MATCH) {
      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

      /*** _tr_tally_dist(s, s.strstart - s.match_start,
                     s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;

      /* Insert new strings in the hash table only if the match length
       * is not too large. This saves time but degrades compression.
       */
      if (s.match_length <= s.max_lazy_match /*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
        s.match_length--; /* string at strstart already in table */
        do {
          s.strstart++;
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
           * always MIN_MATCH bytes ahead.
           */
        } while (--s.match_length !== 0);
        s.strstart++;
      } else {
        s.strstart += s.match_length;
        s.match_length = 0;
        s.ins_h = s.window[s.strstart];
        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

        //#if MIN_MATCH != 3
        //                Call UPDATE_HASH() MIN_MATCH-3 more times
        //#endif
        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
         * matter since it will be recomputed at next deflate call.
         */
      }
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s.window[s.strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * Same as above, but achieves better compression. We use a lazy
 * evaluation for matches: a match is finally adopted only if there is
 * no better match at the next window position.
 */
function deflate_slow(s, flush) {
  var hash_head; /* head of hash chain */
  var bflush; /* set if current block must be flushed */

  var max_insert;

  /* Process the input block. */
  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the next match, plus MIN_MATCH bytes to insert the
     * string following the next match.
     */
    if (s.lookahead < MIN_LOOKAHEAD) {
      fill_window(s);
      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      } /* flush the current block */
    }

    /* Insert the string window[strstart .. strstart+2] in the
     * dictionary, and set hash_head to the head of the hash chain:
     */
    hash_head = 0 /*NIL*/ ;
    if (s.lookahead >= MIN_MATCH) {
      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
      s.head[s.ins_h] = s.strstart;
      /***/
    }

    /* Find the longest match, discarding those <= prev_length.
     */
    s.prev_length = s.match_length;
    s.prev_match = s.match_start;
    s.match_length = MIN_MATCH - 1;

    if (hash_head !== 0 /*NIL*/ && s.prev_length < s.max_lazy_match &&
      s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD) /*MAX_DIST(s)*/ ) {
      /* To simplify the code, we prevent matches with the string
       * of window index 0 (in particular we have to avoid a match
       * of the string with itself at the start of the input file).
       */
      s.match_length = longest_match(s, hash_head);
      /* longest_match() sets match_start */

      if (s.match_length <= 5 &&
        (s.strategy === Z_FILTERED$1 || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096 /*TOO_FAR*/ ))) {

        /* If prev_match is also MIN_MATCH, match_start is garbage
         * but we will ignore the current match anyway.
         */
        s.match_length = MIN_MATCH - 1;
      }
    }
    /* If there was a match at the previous step and the current
     * match is not better, output the previous match:
     */
    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
      max_insert = s.strstart + s.lookahead - MIN_MATCH;
      /* Do not insert strings in hash table beyond this. */

      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
                     s.prev_length - MIN_MATCH, bflush);***/
      bflush = _tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
      /* Insert in hash table all strings up to the end of the match.
       * strstart-1 and strstart are already inserted. If there is not
       * enough lookahead, the last two strings are not inserted in
       * the hash table.
       */
      s.lookahead -= s.prev_length - 1;
      s.prev_length -= 2;
      do {
        if (++s.strstart <= max_insert) {
          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
          s.head[s.ins_h] = s.strstart;
          /***/
        }
      } while (--s.prev_length !== 0);
      s.match_available = 0;
      s.match_length = MIN_MATCH - 1;
      s.strstart++;

      if (bflush) {
        /*** FLUSH_BLOCK(s, 0); ***/
        flush_block_only(s, false);
        if (s.strm.avail_out === 0) {
          return BS_NEED_MORE;
        }
        /***/
      }

    } else if (s.match_available) {
      /* If there was no match at the previous position, output a
       * single literal. If there was a match but the current match
       * is longer, truncate the previous match to a single literal.
       */
      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

      if (bflush) {
        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
        flush_block_only(s, false);
        /***/
      }
      s.strstart++;
      s.lookahead--;
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
    } else {
      /* There is no previous match to compare with, wait for
       * the next step to decide.
       */
      s.match_available = 1;
      s.strstart++;
      s.lookahead--;
    }
  }
  //Assert (flush != Z_NO_FLUSH, "no flush?");
  if (s.match_available) {
    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart - 1]);

    s.match_available = 0;
  }
  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }

  return BS_BLOCK_DONE;
}


/* ===========================================================================
 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
 * deflate switches away from Z_RLE.)
 */
function deflate_rle(s, flush) {
  var bflush; /* set if current block must be flushed */
  var prev; /* byte at distance one to match */
  var scan, strend; /* scan goes up to strend for length of run */

  var _win = s.window;

  for (;;) {
    /* Make sure that we always have enough lookahead, except
     * at the end of the input file. We need MAX_MATCH bytes
     * for the longest run, plus one for the unrolled loop.
     */
    if (s.lookahead <= MAX_MATCH) {
      fill_window(s);
      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH$1) {
        return BS_NEED_MORE;
      }
      if (s.lookahead === 0) {
        break;
      } /* flush the current block */
    }

    /* See how many times the previous byte repeats */
    s.match_length = 0;
    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
      scan = s.strstart - 1;
      prev = _win[scan];
      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
        strend = s.strstart + MAX_MATCH;
        do {
          /*jshint noempty:false*/
        } while (prev === _win[++scan] && prev === _win[++scan] &&
          prev === _win[++scan] && prev === _win[++scan] &&
          prev === _win[++scan] && prev === _win[++scan] &&
          prev === _win[++scan] && prev === _win[++scan] &&
          scan < strend);
        s.match_length = MAX_MATCH - (strend - scan);
        if (s.match_length > s.lookahead) {
          s.match_length = s.lookahead;
        }
      }
      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
    }

    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
    if (s.match_length >= MIN_MATCH) {
      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
      bflush = _tr_tally(s, 1, s.match_length - MIN_MATCH);

      s.lookahead -= s.match_length;
      s.strstart += s.match_length;
      s.match_length = 0;
    } else {
      /* No match, output a literal byte */
      //Tracevv((stderr,"%c", s->window[s->strstart]));
      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
      bflush = _tr_tally(s, 0, s.window[s.strstart]);

      s.lookahead--;
      s.strstart++;
    }
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* ===========================================================================
 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
 * (It will be regenerated if this run of deflate switches away from Huffman.)
 */
function deflate_huff(s, flush) {
  var bflush; /* set if current block must be flushed */

  for (;;) {
    /* Make sure that we have a literal to write. */
    if (s.lookahead === 0) {
      fill_window(s);
      if (s.lookahead === 0) {
        if (flush === Z_NO_FLUSH$1) {
          return BS_NEED_MORE;
        }
        break; /* flush the current block */
      }
    }

    /* Output a literal byte */
    s.match_length = 0;
    //Tracevv((stderr,"%c", s->window[s->strstart]));
    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
    bflush = _tr_tally(s, 0, s.window[s.strstart]);
    s.lookahead--;
    s.strstart++;
    if (bflush) {
      /*** FLUSH_BLOCK(s, 0); ***/
      flush_block_only(s, false);
      if (s.strm.avail_out === 0) {
        return BS_NEED_MORE;
      }
      /***/
    }
  }
  s.insert = 0;
  if (flush === Z_FINISH$2) {
    /*** FLUSH_BLOCK(s, 1); ***/
    flush_block_only(s, true);
    if (s.strm.avail_out === 0) {
      return BS_FINISH_STARTED;
    }
    /***/
    return BS_FINISH_DONE;
  }
  if (s.last_lit) {
    /*** FLUSH_BLOCK(s, 0); ***/
    flush_block_only(s, false);
    if (s.strm.avail_out === 0) {
      return BS_NEED_MORE;
    }
    /***/
  }
  return BS_BLOCK_DONE;
}

/* Values for max_lazy_match, good_match and max_chain_length, depending on
 * the desired pack level (0..9). The values given below have been tuned to
 * exclude worst case performance for pathological files. Better values may be
 * found for specific files.
 */
function Config(good_length, max_lazy, nice_length, max_chain, func) {
  this.good_length = good_length;
  this.max_lazy = max_lazy;
  this.nice_length = nice_length;
  this.max_chain = max_chain;
  this.func = func;
}

var configuration_table;

configuration_table = [
  /*      good lazy nice chain */
  new Config(0, 0, 0, 0, deflate_stored), /* 0 store only */
  new Config(4, 4, 8, 4, deflate_fast), /* 1 max speed, no lazy matches */
  new Config(4, 5, 16, 8, deflate_fast), /* 2 */
  new Config(4, 6, 32, 32, deflate_fast), /* 3 */

  new Config(4, 4, 16, 16, deflate_slow), /* 4 lazy matches */
  new Config(8, 16, 32, 32, deflate_slow), /* 5 */
  new Config(8, 16, 128, 128, deflate_slow), /* 6 */
  new Config(8, 32, 128, 256, deflate_slow), /* 7 */
  new Config(32, 128, 258, 1024, deflate_slow), /* 8 */
  new Config(32, 258, 258, 4096, deflate_slow) /* 9 max compression */
];


/* ===========================================================================
 * Initialize the "longest match" routines for a new zlib stream
 */
function lm_init(s) {
  s.window_size = 2 * s.w_size;

  /*** CLEAR_HASH(s); ***/
  zero(s.head); // Fill with NIL (= 0);

  /* Set the default configuration parameters:
   */
  s.max_lazy_match = configuration_table[s.level].max_lazy;
  s.good_match = configuration_table[s.level].good_length;
  s.nice_match = configuration_table[s.level].nice_length;
  s.max_chain_length = configuration_table[s.level].max_chain;

  s.strstart = 0;
  s.block_start = 0;
  s.lookahead = 0;
  s.insert = 0;
  s.match_length = s.prev_length = MIN_MATCH - 1;
  s.match_available = 0;
  s.ins_h = 0;
}


function DeflateState() {
  this.strm = null; /* pointer back to this zlib stream */
  this.status = 0; /* as the name implies */
  this.pending_buf = null; /* output still pending */
  this.pending_buf_size = 0; /* size of pending_buf */
  this.pending_out = 0; /* next pending byte to output to the stream */
  this.pending = 0; /* nb of bytes in the pending buffer */
  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
  this.gzhead = null; /* gzip header information to write */
  this.gzindex = 0; /* where in extra, name, or comment */
  this.method = Z_DEFLATED$2; /* can only be DEFLATED */
  this.last_flush = -1; /* value of flush param for previous deflate call */

  this.w_size = 0; /* LZ77 window size (32K by default) */
  this.w_bits = 0; /* log2(w_size)  (8..16) */
  this.w_mask = 0; /* w_size - 1 */

  this.window = null;
  /* Sliding window. Input bytes are read into the second half of the window,
   * and move to the first half later to keep a dictionary of at least wSize
   * bytes. With this organization, matches are limited to a distance of
   * wSize-MAX_MATCH bytes, but this ensures that IO is always
   * performed with a length multiple of the block size.
   */

  this.window_size = 0;
  /* Actual size of window: 2*wSize, except when the user input buffer
   * is directly used as sliding window.
   */

  this.prev = null;
  /* Link to older string with same hash index. To limit the size of this
   * array to 64K, this link is maintained only for the last 32K strings.
   * An index in this array is thus a window index modulo 32K.
   */

  this.head = null; /* Heads of the hash chains or NIL. */

  this.ins_h = 0; /* hash index of string to be inserted */
  this.hash_size = 0; /* number of elements in hash table */
  this.hash_bits = 0; /* log2(hash_size) */
  this.hash_mask = 0; /* hash_size-1 */

  this.hash_shift = 0;
  /* Number of bits by which ins_h must be shifted at each input
   * step. It must be such that after MIN_MATCH steps, the oldest
   * byte no longer takes part in the hash key, that is:
   *   hash_shift * MIN_MATCH >= hash_bits
   */

  this.block_start = 0;
  /* Window position at the beginning of the current output block. Gets
   * negative when the window is moved backwards.
   */

  this.match_length = 0; /* length of best match */
  this.prev_match = 0; /* previous match */
  this.match_available = 0; /* set if previous match exists */
  this.strstart = 0; /* start of string to insert */
  this.match_start = 0; /* start of matching string */
  this.lookahead = 0; /* number of valid bytes ahead in window */

  this.prev_length = 0;
  /* Length of the best match at previous step. Matches not greater than this
   * are discarded. This is used in the lazy match evaluation.
   */

  this.max_chain_length = 0;
  /* To speed up deflation, hash chains are never searched beyond this
   * length.  A higher limit improves compression ratio but degrades the
   * speed.
   */

  this.max_lazy_match = 0;
  /* Attempt to find a better match only when the current match is strictly
   * smaller than this value. This mechanism is used only for compression
   * levels >= 4.
   */
  // That's alias to max_lazy_match, don't use directly
  //this.max_insert_length = 0;
  /* Insert new strings in the hash table only if the match length is not
   * greater than this length. This saves time but degrades compression.
   * max_insert_length is used only for compression levels <= 3.
   */

  this.level = 0; /* compression level (1..9) */
  this.strategy = 0; /* favor or force Huffman coding*/

  this.good_match = 0;
  /* Use a faster search when the previous match is longer than this */

  this.nice_match = 0; /* Stop searching when current match exceeds this */

  /* used by c: */

  /* Didn't use ct_data typedef below to suppress compiler warning */

  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

  // Use flat array of DOUBLE size, with interleaved fata,
  // because JS does not support effective
  this.dyn_ltree = new Buf16(HEAP_SIZE * 2);
  this.dyn_dtree = new Buf16((2 * D_CODES + 1) * 2);
  this.bl_tree = new Buf16((2 * BL_CODES + 1) * 2);
  zero(this.dyn_ltree);
  zero(this.dyn_dtree);
  zero(this.bl_tree);

  this.l_desc = null; /* desc. for literal tree */
  this.d_desc = null; /* desc. for distance tree */
  this.bl_desc = null; /* desc. for bit length tree */

  //ush bl_count[MAX_BITS+1];
  this.bl_count = new Buf16(MAX_BITS + 1);
  /* number of codes at each bit length for an optimal tree */

  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
  this.heap = new Buf16(2 * L_CODES + 1); /* heap used to build the Huffman trees */
  zero(this.heap);

  this.heap_len = 0; /* number of elements in the heap */
  this.heap_max = 0; /* element of largest frequency */
  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
   * The same heap array is used to build all
   */

  this.depth = new Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
  zero(this.depth);
  /* Depth of each subtree used as tie breaker for trees of equal frequency
   */

  this.l_buf = 0; /* buffer index for literals or lengths */

  this.lit_bufsize = 0;
  /* Size of match buffer for literals/lengths.  There are 4 reasons for
   * limiting lit_bufsize to 64K:
   *   - frequencies can be kept in 16 bit counters
   *   - if compression is not successful for the first block, all input
   *     data is still in the window so we can still emit a stored block even
   *     when input comes from standard input.  (This can also be done for
   *     all blocks if lit_bufsize is not greater than 32K.)
   *   - if compression is not successful for a file smaller than 64K, we can
   *     even emit a stored file instead of a stored block (saving 5 bytes).
   *     This is applicable only for zip (not gzip or zlib).
   *   - creating new Huffman trees less frequently may not provide fast
   *     adaptation to changes in the input data statistics. (Take for
   *     example a binary file with poorly compressible code followed by
   *     a highly compressible string table.) Smaller buffer sizes give
   *     fast adaptation but have of course the overhead of transmitting
   *     trees more frequently.
   *   - I can't count above 4
   */

  this.last_lit = 0; /* running index in l_buf */

  this.d_buf = 0;
  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
   * the same number of elements. To use different lengths, an extra flag
   * array would be necessary.
   */

  this.opt_len = 0; /* bit length of current block with optimal trees */
  this.static_len = 0; /* bit length of current block with static trees */
  this.matches = 0; /* number of string matches in current block */
  this.insert = 0; /* bytes at end of window left to insert */


  this.bi_buf = 0;
  /* Output buffer. bits are inserted starting at the bottom (least
   * significant bits).
   */
  this.bi_valid = 0;
  /* Number of valid bits in bi_buf.  All bits above the last valid bit
   * are always zero.
   */

  // Used for window memory init. We safely ignore it for JS. That makes
  // sense only for pointers and memory check tools.
  //this.high_water = 0;
  /* High water mark offset in window for initialized bytes -- bytes above
   * this are set to zero in order to avoid memory check warnings when
   * longest match routines access bytes past the input.  This is then
   * updated to the new high water mark.
   */
}


function deflateResetKeep(strm) {
  var s;

  if (!strm || !strm.state) {
    return err$1(strm, Z_STREAM_ERROR$2);
  }

  strm.total_in = strm.total_out = 0;
  strm.data_type = Z_UNKNOWN$1;

  s = strm.state;
  s.pending = 0;
  s.pending_out = 0;

  if (s.wrap < 0) {
    s.wrap = -s.wrap;
    /* was made negative by deflate(..., Z_FINISH); */
  }
  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
  strm.adler = (s.wrap === 2) ?
    0 // crc32(0, Z_NULL, 0)
    :
    1; // adler32(0, Z_NULL, 0)
  s.last_flush = Z_NO_FLUSH$1;
  _tr_init(s);
  return Z_OK$2;
}


function deflateReset(strm) {
  var ret = deflateResetKeep(strm);
  if (ret === Z_OK$2) {
    lm_init(strm.state);
  }
  return ret;
}


function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
  if (!strm) { // === Z_NULL
    return Z_STREAM_ERROR$2;
  }
  var wrap = 1;

  if (level === Z_DEFAULT_COMPRESSION$1) {
    level = 6;
  }

  if (windowBits < 0) { /* suppress zlib wrapper */
    wrap = 0;
    windowBits = -windowBits;
  } else if (windowBits > 15) {
    wrap = 2; /* write gzip wrapper instead */
    windowBits -= 16;
  }


  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED$2 ||
    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
    strategy < 0 || strategy > Z_FIXED$1) {
    return err$1(strm, Z_STREAM_ERROR$2);
  }


  if (windowBits === 8) {
    windowBits = 9;
  }
  /* until 256-byte window bug fixed */

  var s = new DeflateState();

  strm.state = s;
  s.strm = strm;

  s.wrap = wrap;
  s.gzhead = null;
  s.w_bits = windowBits;
  s.w_size = 1 << s.w_bits;
  s.w_mask = s.w_size - 1;

  s.hash_bits = memLevel + 7;
  s.hash_size = 1 << s.hash_bits;
  s.hash_mask = s.hash_size - 1;
  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

  s.window = new Buf8(s.w_size * 2);
  s.head = new Buf16(s.hash_size);
  s.prev = new Buf16(s.w_size);

  // Don't need mem init magic for JS.
  //s.high_water = 0;  /* nothing written to s->window yet */

  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

  s.pending_buf_size = s.lit_bufsize * 4;

  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
  //s->pending_buf = (uchf *) overlay;
  s.pending_buf = new Buf8(s.pending_buf_size);

  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
  s.d_buf = 1 * s.lit_bufsize;

  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
  s.l_buf = (1 + 2) * s.lit_bufsize;

  s.level = level;
  s.strategy = strategy;
  s.method = method;

  return deflateReset(strm);
}


function deflate(strm, flush) {
  var old_flush, s;
  var beg, val; // for gzip header write only

  if (!strm || !strm.state ||
    flush > Z_BLOCK$2 || flush < 0) {
    return strm ? err$1(strm, Z_STREAM_ERROR$2) : Z_STREAM_ERROR$2;
  }

  s = strm.state;

  if (!strm.output ||
    (!strm.input && strm.avail_in !== 0) ||
    (s.status === FINISH_STATE && flush !== Z_FINISH$2)) {
    return err$1(strm, (strm.avail_out === 0) ? Z_BUF_ERROR$2 : Z_STREAM_ERROR$2);
  }

  s.strm = strm; /* just in case */
  old_flush = s.last_flush;
  s.last_flush = flush;

  /* Write the header */
  if (s.status === INIT_STATE) {
    if (s.wrap === 2) {
      // GZIP header
      strm.adler = 0; //crc32(0L, Z_NULL, 0);
      put_byte(s, 31);
      put_byte(s, 139);
      put_byte(s, 8);
      if (!s.gzhead) { // s->gzhead == Z_NULL
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, 0);
        put_byte(s, s.level === 9 ? 2 :
          (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ?
            4 : 0));
        put_byte(s, OS_CODE);
        s.status = BUSY_STATE;
      } else {
        put_byte(s, (s.gzhead.text ? 1 : 0) +
          (s.gzhead.hcrc ? 2 : 0) +
          (!s.gzhead.extra ? 0 : 4) +
          (!s.gzhead.name ? 0 : 8) +
          (!s.gzhead.comment ? 0 : 16)
        );
        put_byte(s, s.gzhead.time & 0xff);
        put_byte(s, (s.gzhead.time >> 8) & 0xff);
        put_byte(s, (s.gzhead.time >> 16) & 0xff);
        put_byte(s, (s.gzhead.time >> 24) & 0xff);
        put_byte(s, s.level === 9 ? 2 :
          (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2 ?
            4 : 0));
        put_byte(s, s.gzhead.os & 0xff);
        if (s.gzhead.extra && s.gzhead.extra.length) {
          put_byte(s, s.gzhead.extra.length & 0xff);
          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
        }
        if (s.gzhead.hcrc) {
          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
        }
        s.gzindex = 0;
        s.status = EXTRA_STATE;
      }
    } else // DEFLATE header
    {
      var header = (Z_DEFLATED$2 + ((s.w_bits - 8) << 4)) << 8;
      var level_flags = -1;

      if (s.strategy >= Z_HUFFMAN_ONLY$1 || s.level < 2) {
        level_flags = 0;
      } else if (s.level < 6) {
        level_flags = 1;
      } else if (s.level === 6) {
        level_flags = 2;
      } else {
        level_flags = 3;
      }
      header |= (level_flags << 6);
      if (s.strstart !== 0) {
        header |= PRESET_DICT;
      }
      header += 31 - (header % 31);

      s.status = BUSY_STATE;
      putShortMSB(s, header);

      /* Save the adler32 of the preset dictionary: */
      if (s.strstart !== 0) {
        putShortMSB(s, strm.adler >>> 16);
        putShortMSB(s, strm.adler & 0xffff);
      }
      strm.adler = 1; // adler32(0L, Z_NULL, 0);
    }
  }

  //#ifdef GZIP
  if (s.status === EXTRA_STATE) {
    if (s.gzhead.extra /* != Z_NULL*/ ) {
      beg = s.pending; /* start of bytes to update crc */

      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            break;
          }
        }
        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
        s.gzindex++;
      }
      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (s.gzindex === s.gzhead.extra.length) {
        s.gzindex = 0;
        s.status = NAME_STATE;
      }
    } else {
      s.status = NAME_STATE;
    }
  }
  if (s.status === NAME_STATE) {
    if (s.gzhead.name /* != Z_NULL*/ ) {
      beg = s.pending; /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.name.length) {
          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.gzindex = 0;
        s.status = COMMENT_STATE;
      }
    } else {
      s.status = COMMENT_STATE;
    }
  }
  if (s.status === COMMENT_STATE) {
    if (s.gzhead.comment /* != Z_NULL*/ ) {
      beg = s.pending; /* start of bytes to update crc */
      //int val;

      do {
        if (s.pending === s.pending_buf_size) {
          if (s.gzhead.hcrc && s.pending > beg) {
            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
          }
          flush_pending(strm);
          beg = s.pending;
          if (s.pending === s.pending_buf_size) {
            val = 1;
            break;
          }
        }
        // JS specific: little magic to add zero terminator to end of string
        if (s.gzindex < s.gzhead.comment.length) {
          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
        } else {
          val = 0;
        }
        put_byte(s, val);
      } while (val !== 0);

      if (s.gzhead.hcrc && s.pending > beg) {
        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
      }
      if (val === 0) {
        s.status = HCRC_STATE;
      }
    } else {
      s.status = HCRC_STATE;
    }
  }
  if (s.status === HCRC_STATE) {
    if (s.gzhead.hcrc) {
      if (s.pending + 2 > s.pending_buf_size) {
        flush_pending(strm);
      }
      if (s.pending + 2 <= s.pending_buf_size) {
        put_byte(s, strm.adler & 0xff);
        put_byte(s, (strm.adler >> 8) & 0xff);
        strm.adler = 0; //crc32(0L, Z_NULL, 0);
        s.status = BUSY_STATE;
      }
    } else {
      s.status = BUSY_STATE;
    }
  }
  //#endif

  /* Flush as much pending output as possible */
  if (s.pending !== 0) {
    flush_pending(strm);
    if (strm.avail_out === 0) {
      /* Since avail_out is 0, deflate will be called again with
       * more output space, but possibly with both pending and
       * avail_in equal to zero. There won't be anything to do,
       * but this is not an error situation so make sure we
       * return OK instead of BUF_ERROR at next call of deflate:
       */
      s.last_flush = -1;
      return Z_OK$2;
    }

    /* Make sure there is something to do and avoid duplicate consecutive
     * flushes. For repeated and useless calls with Z_FINISH, we keep
     * returning Z_STREAM_END instead of Z_BUF_ERROR.
     */
  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
    flush !== Z_FINISH$2) {
    return err$1(strm, Z_BUF_ERROR$2);
  }

  /* User must not provide more input after the first FINISH: */
  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
    return err$1(strm, Z_BUF_ERROR$2);
  }

  /* Start a new block or continue the current one.
   */
  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
    (flush !== Z_NO_FLUSH$1 && s.status !== FINISH_STATE)) {
    var bstate = (s.strategy === Z_HUFFMAN_ONLY$1) ? deflate_huff(s, flush) :
      (s.strategy === Z_RLE$1 ? deflate_rle(s, flush) :
        configuration_table[s.level].func(s, flush));

    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
      s.status = FINISH_STATE;
    }
    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
      if (strm.avail_out === 0) {
        s.last_flush = -1;
        /* avoid BUF_ERROR next call, see above */
      }
      return Z_OK$2;
      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
       * of deflate should use the same flush parameter to make sure
       * that the flush is complete. So we don't have to output an
       * empty block here, this will be done at next call. This also
       * ensures that for a very small output buffer, we emit at most
       * one empty block.
       */
    }
    if (bstate === BS_BLOCK_DONE) {
      if (flush === Z_PARTIAL_FLUSH$1) {
        _tr_align(s);
      } else if (flush !== Z_BLOCK$2) { /* FULL_FLUSH or SYNC_FLUSH */

        _tr_stored_block(s, 0, 0, false);
        /* For a full flush, this empty block will be recognized
         * as a special marker by inflate_sync().
         */
        if (flush === Z_FULL_FLUSH$1) {
          /*** CLEAR_HASH(s); ***/
          /* forget history */
          zero(s.head); // Fill with NIL (= 0);

          if (s.lookahead === 0) {
            s.strstart = 0;
            s.block_start = 0;
            s.insert = 0;
          }
        }
      }
      flush_pending(strm);
      if (strm.avail_out === 0) {
        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
        return Z_OK$2;
      }
    }
  }
  //Assert(strm->avail_out > 0, "bug2");
  //if (strm.avail_out <= 0) { throw new Error("bug2");}

  if (flush !== Z_FINISH$2) {
    return Z_OK$2;
  }
  if (s.wrap <= 0) {
    return Z_STREAM_END$2;
  }

  /* Write the trailer */
  if (s.wrap === 2) {
    put_byte(s, strm.adler & 0xff);
    put_byte(s, (strm.adler >> 8) & 0xff);
    put_byte(s, (strm.adler >> 16) & 0xff);
    put_byte(s, (strm.adler >> 24) & 0xff);
    put_byte(s, strm.total_in & 0xff);
    put_byte(s, (strm.total_in >> 8) & 0xff);
    put_byte(s, (strm.total_in >> 16) & 0xff);
    put_byte(s, (strm.total_in >> 24) & 0xff);
  } else {
    putShortMSB(s, strm.adler >>> 16);
    putShortMSB(s, strm.adler & 0xffff);
  }

  flush_pending(strm);
  /* If avail_out is zero, the application will call deflate again
   * to flush the rest.
   */
  if (s.wrap > 0) {
    s.wrap = -s.wrap;
  }
  /* write the trailer only once! */
  return s.pending !== 0 ? Z_OK$2 : Z_STREAM_END$2;
}

function deflateEnd(strm) {
  var status;

  if (!strm /*== Z_NULL*/ || !strm.state /*== Z_NULL*/ ) {
    return Z_STREAM_ERROR$2;
  }

  status = strm.state.status;
  if (status !== INIT_STATE &&
    status !== EXTRA_STATE &&
    status !== NAME_STATE &&
    status !== COMMENT_STATE &&
    status !== HCRC_STATE &&
    status !== BUSY_STATE &&
    status !== FINISH_STATE
  ) {
    return err$1(strm, Z_STREAM_ERROR$2);
  }

  strm.state = null;

  return status === BUSY_STATE ? err$1(strm, Z_DATA_ERROR$2) : Z_OK$2;
}

/* Not implemented
exports.deflateBound = deflateBound;
exports.deflateCopy = deflateCopy;
exports.deflateParams = deflateParams;
exports.deflatePending = deflatePending;
exports.deflatePrime = deflatePrime;
exports.deflateTune = deflateTune;
*/

// See state defs from inflate.js
var BAD$1 = 30;       /* got a data error -- remain here until reset */
var TYPE$1 = 12;      /* i: waiting for type bits, including last-flag bit */

/*
   Decode literal, length, and distance codes and write out the resulting
   literal and match bytes until either not enough input or output is
   available, an end-of-block is encountered, or a data error is encountered.
   When large enough input and output buffers are supplied to inflate(), for
   example, a 16K input buffer and a 64K output buffer, more than 95% of the
   inflate execution time is spent in this routine.

   Entry assumptions:

        state.mode === LEN
        strm.avail_in >= 6
        strm.avail_out >= 258
        start >= strm.avail_out
        state.bits < 8

   On return, state.mode is one of:

        LEN -- ran out of enough output space or enough available input
        TYPE -- reached end of block code, inflate() to interpret next block
        BAD -- error in block data

   Notes:

    - The maximum input bits used by a length/distance pair is 15 bits for the
      length code, 5 bits for the length extra, 15 bits for the distance code,
      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
      Therefore if strm.avail_in >= 6, then there is enough input to avoid
      checking for available input while decoding.

    - The maximum bytes that a single length/distance pair can output is 258
      bytes, which is the maximum length that can be coded.  inflate_fast()
      requires strm.avail_out >= 258 for each loop to avoid checking for
      output space.
 */
function inflate_fast(strm, start) {
  var state;
  var _in;                    /* local strm.input */
  var last;                   /* have enough input while in < last */
  var _out;                   /* local strm.output */
  var beg;                    /* inflate()'s initial strm.output */
  var end;                    /* while out < end, enough space available */
//#ifdef INFLATE_STRICT
  var dmax;                   /* maximum distance from zlib header */
//#endif
  var wsize;                  /* window size or zero if not using window */
  var whave;                  /* valid bytes in the window */
  var wnext;                  /* window write index */
  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
  var s_window;               /* allocated sliding window, if wsize != 0 */
  var hold;                   /* local strm.hold */
  var bits;                   /* local strm.bits */
  var lcode;                  /* local strm.lencode */
  var dcode;                  /* local strm.distcode */
  var lmask;                  /* mask for first level of length codes */
  var dmask;                  /* mask for first level of distance codes */
  var here;                   /* retrieved table entry */
  var op;                     /* code bits, operation, extra bits, or */
                              /*  window position, window bytes to copy */
  var len;                    /* match length, unused bytes */
  var dist;                   /* match distance */
  var from;                   /* where to copy match from */
  var from_source;


  var input, output; // JS specific, because we have no pointers

  /* copy state to local variables */
  state = strm.state;
  //here = state.here;
  _in = strm.next_in;
  input = strm.input;
  last = _in + (strm.avail_in - 5);
  _out = strm.next_out;
  output = strm.output;
  beg = _out - (start - strm.avail_out);
  end = _out + (strm.avail_out - 257);
//#ifdef INFLATE_STRICT
  dmax = state.dmax;
//#endif
  wsize = state.wsize;
  whave = state.whave;
  wnext = state.wnext;
  s_window = state.window;
  hold = state.hold;
  bits = state.bits;
  lcode = state.lencode;
  dcode = state.distcode;
  lmask = (1 << state.lenbits) - 1;
  dmask = (1 << state.distbits) - 1;


  /* decode literals and length/distances until end-of-block or not enough
     input data or output space */

  top:
  do {
    if (bits < 15) {
      hold += input[_in++] << bits;
      bits += 8;
      hold += input[_in++] << bits;
      bits += 8;
    }

    here = lcode[hold & lmask];

    dolen:
    for (;;) { // Goto emulation
      op = here >>> 24/*here.bits*/;
      hold >>>= op;
      bits -= op;
      op = (here >>> 16) & 0xff/*here.op*/;
      if (op === 0) {                          /* literal */
        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
        //        "inflate:         literal '%c'\n" :
        //        "inflate:         literal 0x%02x\n", here.val));
        output[_out++] = here & 0xffff/*here.val*/;
      }
      else if (op & 16) {                     /* length base */
        len = here & 0xffff/*here.val*/;
        op &= 15;                           /* number of extra bits */
        if (op) {
          if (bits < op) {
            hold += input[_in++] << bits;
            bits += 8;
          }
          len += hold & ((1 << op) - 1);
          hold >>>= op;
          bits -= op;
        }
        //Tracevv((stderr, "inflate:         length %u\n", len));
        if (bits < 15) {
          hold += input[_in++] << bits;
          bits += 8;
          hold += input[_in++] << bits;
          bits += 8;
        }
        here = dcode[hold & dmask];

        dodist:
        for (;;) { // goto emulation
          op = here >>> 24/*here.bits*/;
          hold >>>= op;
          bits -= op;
          op = (here >>> 16) & 0xff/*here.op*/;

          if (op & 16) {                      /* distance base */
            dist = here & 0xffff/*here.val*/;
            op &= 15;                       /* number of extra bits */
            if (bits < op) {
              hold += input[_in++] << bits;
              bits += 8;
              if (bits < op) {
                hold += input[_in++] << bits;
                bits += 8;
              }
            }
            dist += hold & ((1 << op) - 1);
//#ifdef INFLATE_STRICT
            if (dist > dmax) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD$1;
              break top;
            }
//#endif
            hold >>>= op;
            bits -= op;
            //Tracevv((stderr, "inflate:         distance %u\n", dist));
            op = _out - beg;                /* max distance in output */
            if (dist > op) {                /* see if copy from window */
              op = dist - op;               /* distance back in window */
              if (op > whave) {
                if (state.sane) {
                  strm.msg = 'invalid distance too far back';
                  state.mode = BAD$1;
                  break top;
                }

// (!) This block is disabled in zlib defailts,
// don't enable it for binary compatibility
//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
//                if (len <= op - whave) {
//                  do {
//                    output[_out++] = 0;
//                  } while (--len);
//                  continue top;
//                }
//                len -= op - whave;
//                do {
//                  output[_out++] = 0;
//                } while (--op > whave);
//                if (op === 0) {
//                  from = _out - dist;
//                  do {
//                    output[_out++] = output[from++];
//                  } while (--len);
//                  continue top;
//                }
//#endif
              }
              from = 0; // window index
              from_source = s_window;
              if (wnext === 0) {           /* very common case */
                from += wsize - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              else if (wnext < op) {      /* wrap around window */
                from += wsize + wnext - op;
                op -= wnext;
                if (op < len) {         /* some from end of window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = 0;
                  if (wnext < len) {  /* some from start of window */
                    op = wnext;
                    len -= op;
                    do {
                      output[_out++] = s_window[from++];
                    } while (--op);
                    from = _out - dist;      /* rest from output */
                    from_source = output;
                  }
                }
              }
              else {                      /* contiguous in window */
                from += wnext - op;
                if (op < len) {         /* some from window */
                  len -= op;
                  do {
                    output[_out++] = s_window[from++];
                  } while (--op);
                  from = _out - dist;  /* rest from output */
                  from_source = output;
                }
              }
              while (len > 2) {
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                output[_out++] = from_source[from++];
                len -= 3;
              }
              if (len) {
                output[_out++] = from_source[from++];
                if (len > 1) {
                  output[_out++] = from_source[from++];
                }
              }
            }
            else {
              from = _out - dist;          /* copy direct from output */
              do {                        /* minimum length is three */
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                output[_out++] = output[from++];
                len -= 3;
              } while (len > 2);
              if (len) {
                output[_out++] = output[from++];
                if (len > 1) {
                  output[_out++] = output[from++];
                }
              }
            }
          }
          else if ((op & 64) === 0) {          /* 2nd level distance code */
            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
            continue dodist;
          }
          else {
            strm.msg = 'invalid distance code';
            state.mode = BAD$1;
            break top;
          }

          break; // need to emulate goto via "continue"
        }
      }
      else if ((op & 64) === 0) {              /* 2nd level length code */
        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
        continue dolen;
      }
      else if (op & 32) {                     /* end-of-block */
        //Tracevv((stderr, "inflate:         end of block\n"));
        state.mode = TYPE$1;
        break top;
      }
      else {
        strm.msg = 'invalid literal/length code';
        state.mode = BAD$1;
        break top;
      }

      break; // need to emulate goto via "continue"
    }
  } while (_in < last && _out < end);

  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
  len = bits >> 3;
  _in -= len;
  bits -= len << 3;
  hold &= (1 << bits) - 1;

  /* update state and return */
  strm.next_in = _in;
  strm.next_out = _out;
  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
  state.hold = hold;
  state.bits = bits;
  return;
}

var MAXBITS = 15;
var ENOUGH_LENS$1 = 852;
var ENOUGH_DISTS$1 = 592;
//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

var CODES$1 = 0;
var LENS$1 = 1;
var DISTS$1 = 2;

var lbase = [ /* Length codes 257..285 base */
  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
];

var lext = [ /* Length codes 257..285 extra */
  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
];

var dbase = [ /* Distance codes 0..29 base */
  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
  8193, 12289, 16385, 24577, 0, 0
];

var dext = [ /* Distance codes 0..29 extra */
  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
  28, 28, 29, 29, 64, 64
];

function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts) {
  var bits = opts.bits;
  //here = opts.here; /* table entry for duplication */

  var len = 0; /* a code's length in bits */
  var sym = 0; /* index of code symbols */
  var min = 0,
    max = 0; /* minimum and maximum code lengths */
  var root = 0; /* number of index bits for root table */
  var curr = 0; /* number of index bits for current table */
  var drop = 0; /* code bits to drop for sub-table */
  var left = 0; /* number of prefix codes available */
  var used = 0; /* code entries in table used */
  var huff = 0; /* Huffman code */
  var incr; /* for incrementing code, index */
  var fill; /* index for replicating entries */
  var low; /* low bits for current root entry */
  var mask; /* mask for low root bits */
  var next; /* next available space in table */
  var base = null; /* base value table to use */
  var base_index = 0;
  //  var shoextra;    /* extra bits table to use */
  var end; /* use base and extra for symbol > end */
  var count = new Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
  var offs = new Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
  var extra = null;
  var extra_index = 0;

  var here_bits, here_op, here_val;

  /*
   Process a set of code lengths to create a canonical Huffman code.  The
   code lengths are lens[0..codes-1].  Each length corresponds to the
   symbols 0..codes-1.  The Huffman code is generated by first sorting the
   symbols by length from short to long, and retaining the symbol order
   for codes with equal lengths.  Then the code starts with all zero bits
   for the first code of the shortest length, and the codes are integer
   increments for the same length, and zeros are appended as the length
   increases.  For the deflate format, these bits are stored backwards
   from their more natural integer increment ordering, and so when the
   decoding tables are built in the large loop below, the integer codes
   are incremented backwards.

   This routine assumes, but does not check, that all of the entries in
   lens[] are in the range 0..MAXBITS.  The caller must assure this.
   1..MAXBITS is interpreted as that code length.  zero means that that
   symbol does not occur in this code.

   The codes are sorted by computing a count of codes for each length,
   creating from that a table of starting indices for each length in the
   sorted table, and then entering the symbols in order in the sorted
   table.  The sorted table is work[], with that space being provided by
   the caller.

   The length counts are used for other purposes as well, i.e. finding
   the minimum and maximum length codes, determining if there are any
   codes at all, checking for a valid set of lengths, and looking ahead
   at length counts to determine sub-table sizes when building the
   decoding tables.
   */

  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
  for (len = 0; len <= MAXBITS; len++) {
    count[len] = 0;
  }
  for (sym = 0; sym < codes; sym++) {
    count[lens[lens_index + sym]]++;
  }

  /* bound code lengths, force root to be within code lengths */
  root = bits;
  for (max = MAXBITS; max >= 1; max--) {
    if (count[max] !== 0) {
      break;
    }
  }
  if (root > max) {
    root = max;
  }
  if (max === 0) { /* no symbols to code at all */
    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;


    //table.op[opts.table_index] = 64;
    //table.bits[opts.table_index] = 1;
    //table.val[opts.table_index++] = 0;
    table[table_index++] = (1 << 24) | (64 << 16) | 0;

    opts.bits = 1;
    return 0; /* no symbols, but wait for decoding to report error */
  }
  for (min = 1; min < max; min++) {
    if (count[min] !== 0) {
      break;
    }
  }
  if (root < min) {
    root = min;
  }

  /* check for an over-subscribed or incomplete set of lengths */
  left = 1;
  for (len = 1; len <= MAXBITS; len++) {
    left <<= 1;
    left -= count[len];
    if (left < 0) {
      return -1;
    } /* over-subscribed */
  }
  if (left > 0 && (type === CODES$1 || max !== 1)) {
    return -1; /* incomplete set */
  }

  /* generate offsets into symbol table for each length for sorting */
  offs[1] = 0;
  for (len = 1; len < MAXBITS; len++) {
    offs[len + 1] = offs[len] + count[len];
  }

  /* sort symbols by length, by symbol order within each length */
  for (sym = 0; sym < codes; sym++) {
    if (lens[lens_index + sym] !== 0) {
      work[offs[lens[lens_index + sym]]++] = sym;
    }
  }

  /*
   Create and fill in decoding tables.  In this loop, the table being
   filled is at next and has curr index bits.  The code being used is huff
   with length len.  That code is converted to an index by dropping drop
   bits off of the bottom.  For codes where len is less than drop + curr,
   those top drop + curr - len bits are incremented through all values to
   fill the table with replicated entries.

   root is the number of index bits for the root table.  When len exceeds
   root, sub-tables are created pointed to by the root entry with an index
   of the low root bits of huff.  This is saved in low to check for when a
   new sub-table should be started.  drop is zero when the root table is
   being filled, and drop is root when sub-tables are being filled.

   When a new sub-table is needed, it is necessary to look ahead in the
   code lengths to determine what size sub-table is needed.  The length
   counts are used for this, and so count[] is decremented as codes are
   entered in the tables.

   used keeps track of how many table entries have been allocated from the
   provided *table space.  It is checked for LENS and DIST tables against
   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
   the initial root table size constants.  See the comments in inftrees.h
   for more information.

   sym increments through all symbols, and the loop terminates when
   all codes of length max, i.e. all codes, have been processed.  This
   routine permits incomplete codes, so another loop after this one fills
   in the rest of the decoding tables with invalid code markers.
   */

  /* set up for code type */
  // poor man optimization - use if-else instead of switch,
  // to avoid deopts in old v8
  if (type === CODES$1) {
    base = extra = work; /* dummy value--not used */
    end = 19;

  } else if (type === LENS$1) {
    base = lbase;
    base_index -= 257;
    extra = lext;
    extra_index -= 257;
    end = 256;

  } else { /* DISTS */
    base = dbase;
    extra = dext;
    end = -1;
  }

  /* initialize opts for loop */
  huff = 0; /* starting code */
  sym = 0; /* starting code symbol */
  len = min; /* starting code length */
  next = table_index; /* current table to fill in */
  curr = root; /* current table index bits */
  drop = 0; /* current bits to drop from code for index */
  low = -1; /* trigger new sub-table when len > root */
  used = 1 << root; /* use root table entries */
  mask = used - 1; /* mask for comparing low */

  /* check available table space */
  if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
    (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
    return 1;
  }
  /* process all codes and make table entries */
  for (;;) {
    /* create table entry */
    here_bits = len - drop;
    if (work[sym] < end) {
      here_op = 0;
      here_val = work[sym];
    } else if (work[sym] > end) {
      here_op = extra[extra_index + work[sym]];
      here_val = base[base_index + work[sym]];
    } else {
      here_op = 32 + 64; /* end of block */
      here_val = 0;
    }

    /* replicate for those indices with low len bits equal to huff */
    incr = 1 << (len - drop);
    fill = 1 << curr;
    min = fill; /* save offset to next table */
    do {
      fill -= incr;
      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val | 0;
    } while (fill !== 0);

    /* backwards increment the len-bit code huff */
    incr = 1 << (len - 1);
    while (huff & incr) {
      incr >>= 1;
    }
    if (incr !== 0) {
      huff &= incr - 1;
      huff += incr;
    } else {
      huff = 0;
    }

    /* go to next symbol, update count, len */
    sym++;
    if (--count[len] === 0) {
      if (len === max) {
        break;
      }
      len = lens[lens_index + work[sym]];
    }

    /* create new sub-table if needed */
    if (len > root && (huff & mask) !== low) {
      /* if first time, transition to sub-tables */
      if (drop === 0) {
        drop = root;
      }

      /* increment past last table */
      next += min; /* here min is 1 << curr */

      /* determine length of next table */
      curr = len - drop;
      left = 1 << curr;
      while (curr + drop < max) {
        left -= count[curr + drop];
        if (left <= 0) {
          break;
        }
        curr++;
        left <<= 1;
      }

      /* check for enough space */
      used += 1 << curr;
      if ((type === LENS$1 && used > ENOUGH_LENS$1) ||
        (type === DISTS$1 && used > ENOUGH_DISTS$1)) {
        return 1;
      }

      /* point entry in root table to sub-table */
      low = huff & mask;
      /*table.op[low] = curr;
      table.bits[low] = root;
      table.val[low] = next - opts.table_index;*/
      table[low] = (root << 24) | (curr << 16) | (next - table_index) | 0;
    }
  }

  /* fill in remaining table entry if code is incomplete (guaranteed to have
   at most one remaining entry, since if the code is incomplete, the
   maximum code length that was allowed to get this far is one bit) */
  if (huff !== 0) {
    //table.op[next + huff] = 64;            /* invalid code marker */
    //table.bits[next + huff] = len - drop;
    //table.val[next + huff] = 0;
    table[next + huff] = ((len - drop) << 24) | (64 << 16) | 0;
  }

  /* set return parameters */
  //opts.table_index += used;
  opts.bits = root;
  return 0;
}

var CODES = 0;
var LENS = 1;
var DISTS = 2;

/* Public constants ==========================================================*/
/* ===========================================================================*/


/* Allowed flush values; see deflate() and inflate() below for details */
//var Z_NO_FLUSH      = 0;
//var Z_PARTIAL_FLUSH = 1;
//var Z_SYNC_FLUSH    = 2;
//var Z_FULL_FLUSH    = 3;
var Z_FINISH$1 = 4;
var Z_BLOCK$1 = 5;
var Z_TREES$1 = 6;


/* Return codes for the compression/decompression functions. Negative values
 * are errors, positive values are used for special but normal events.
 */
var Z_OK$1 = 0;
var Z_STREAM_END$1 = 1;
var Z_NEED_DICT$1 = 2;
//var Z_ERRNO         = -1;
var Z_STREAM_ERROR$1 = -2;
var Z_DATA_ERROR$1 = -3;
var Z_MEM_ERROR = -4;
var Z_BUF_ERROR$1 = -5;
//var Z_VERSION_ERROR = -6;

/* The deflate compression method */
var Z_DEFLATED$1 = 8;


/* STATES ====================================================================*/
/* ===========================================================================*/


var HEAD = 1; /* i: waiting for magic header */
var FLAGS = 2; /* i: waiting for method and flags (gzip) */
var TIME = 3; /* i: waiting for modification time (gzip) */
var OS = 4; /* i: waiting for extra flags and operating system (gzip) */
var EXLEN = 5; /* i: waiting for extra length (gzip) */
var EXTRA = 6; /* i: waiting for extra bytes (gzip) */
var NAME = 7; /* i: waiting for end of file name (gzip) */
var COMMENT = 8; /* i: waiting for end of comment (gzip) */
var HCRC = 9; /* i: waiting for header crc (gzip) */
var DICTID = 10; /* i: waiting for dictionary check value */
var DICT = 11; /* waiting for inflateSetDictionary() call */
var TYPE = 12; /* i: waiting for type bits, including last-flag bit */
var TYPEDO = 13; /* i: same, but skip check to exit inflate on new block */
var STORED = 14; /* i: waiting for stored size (length and complement) */
var COPY_ = 15; /* i/o: same as COPY below, but only first time in */
var COPY = 16; /* i/o: waiting for input or output to copy stored block */
var TABLE = 17; /* i: waiting for dynamic block table lengths */
var LENLENS = 18; /* i: waiting for code length code lengths */
var CODELENS = 19; /* i: waiting for length/lit and distance code lengths */
var LEN_ = 20; /* i: same as LEN below, but only first time in */
var LEN = 21; /* i: waiting for length/lit/eob code */
var LENEXT = 22; /* i: waiting for length extra bits */
var DIST = 23; /* i: waiting for distance code */
var DISTEXT = 24; /* i: waiting for distance extra bits */
var MATCH = 25; /* o: waiting for output space to copy string */
var LIT = 26; /* o: waiting for output space to write literal */
var CHECK = 27; /* i: waiting for 32-bit check value */
var LENGTH = 28; /* i: waiting for 32-bit length (gzip) */
var DONE = 29; /* finished check, done -- remain here until reset */
var BAD = 30; /* got a data error -- remain here until reset */
var MEM = 31; /* got an inflate() memory error -- remain here until reset */
var SYNC = 32; /* looking for synchronization bytes to restart inflate() */

/* ===========================================================================*/



var ENOUGH_LENS = 852;
var ENOUGH_DISTS = 592;


function zswap32(q) {
  return (((q >>> 24) & 0xff) +
    ((q >>> 8) & 0xff00) +
    ((q & 0xff00) << 8) +
    ((q & 0xff) << 24));
}


function InflateState() {
  this.mode = 0; /* current inflate mode */
  this.last = false; /* true if processing last block */
  this.wrap = 0; /* bit 0 true for zlib, bit 1 true for gzip */
  this.havedict = false; /* true if dictionary provided */
  this.flags = 0; /* gzip header method and flags (0 if zlib) */
  this.dmax = 0; /* zlib header max distance (INFLATE_STRICT) */
  this.check = 0; /* protected copy of check value */
  this.total = 0; /* protected copy of output count */
  // TODO: may be {}
  this.head = null; /* where to save gzip header information */

  /* sliding window */
  this.wbits = 0; /* log base 2 of requested window size */
  this.wsize = 0; /* window size or zero if not using window */
  this.whave = 0; /* valid bytes in the window */
  this.wnext = 0; /* window write index */
  this.window = null; /* allocated sliding window, if needed */

  /* bit accumulator */
  this.hold = 0; /* input bit accumulator */
  this.bits = 0; /* number of bits in "in" */

  /* for string and stored block copying */
  this.length = 0; /* literal or length of data to copy */
  this.offset = 0; /* distance back to copy string from */

  /* for table and code decoding */
  this.extra = 0; /* extra bits needed */

  /* fixed and dynamic code tables */
  this.lencode = null; /* starting table for length/literal codes */
  this.distcode = null; /* starting table for distance codes */
  this.lenbits = 0; /* index bits for lencode */
  this.distbits = 0; /* index bits for distcode */

  /* dynamic table building */
  this.ncode = 0; /* number of code length code lengths */
  this.nlen = 0; /* number of length code lengths */
  this.ndist = 0; /* number of distance code lengths */
  this.have = 0; /* number of code lengths in lens[] */
  this.next = null; /* next available space in codes[] */

  this.lens = new Buf16(320); /* temporary storage for code lengths */
  this.work = new Buf16(288); /* work area for code table building */

  /*
   because we don't have pointers in js, we use lencode and distcode directly
   as buffers so we don't need codes
  */
  //this.codes = new Buf32(ENOUGH);       /* space for code tables */
  this.lendyn = null; /* dynamic table for length/literal codes (JS specific) */
  this.distdyn = null; /* dynamic table for distance codes (JS specific) */
  this.sane = 0; /* if false, allow invalid distance too far */
  this.back = 0; /* bits back of last unprocessed length/lit */
  this.was = 0; /* initial length of match */
}

function inflateResetKeep(strm) {
  var state;

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  strm.total_in = strm.total_out = state.total = 0;
  strm.msg = ''; /*Z_NULL*/
  if (state.wrap) { /* to support ill-conceived Java test suite */
    strm.adler = state.wrap & 1;
  }
  state.mode = HEAD;
  state.last = 0;
  state.havedict = 0;
  state.dmax = 32768;
  state.head = null /*Z_NULL*/ ;
  state.hold = 0;
  state.bits = 0;
  //state.lencode = state.distcode = state.next = state.codes;
  state.lencode = state.lendyn = new Buf32(ENOUGH_LENS);
  state.distcode = state.distdyn = new Buf32(ENOUGH_DISTS);

  state.sane = 1;
  state.back = -1;
  //Tracev((stderr, "inflate: reset\n"));
  return Z_OK$1;
}

function inflateReset(strm) {
  var state;

  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;
  state.wsize = 0;
  state.whave = 0;
  state.wnext = 0;
  return inflateResetKeep(strm);

}

function inflateReset2(strm, windowBits) {
  var wrap;
  var state;

  /* get the state */
  if (!strm || !strm.state) {
    return Z_STREAM_ERROR$1;
  }
  state = strm.state;

  /* extract wrap request from windowBits parameter */
  if (windowBits < 0) {
    wrap = 0;
    windowBits = -windowBits;
  } else {
    wrap = (windowBits >> 4) + 1;
    if (windowBits < 48) {
      windowBits &= 15;
    }
  }

  /* set number of window bits, free window if different */
  if (windowBits && (windowBits < 8 || windowBits > 15)) {
    return Z_STREAM_ERROR$1;
  }
  if (state.window !== null && state.wbits !== windowBits) {
    state.window = null;
  }

  /* update state and reset the rest of it */
  state.wrap = wrap;
  state.wbits = windowBits;
  return inflateReset(strm);
}

function inflateInit2(strm, windowBits) {
  var ret;
  var state;

  if (!strm) {
    return Z_STREAM_ERROR$1;
  }
  //strm.msg = Z_NULL;                 /* in case we return an error */

  state = new InflateState();

  //if (state === Z_NULL) return Z_MEM_ERROR;
  //Tracev((stderr, "inflate: allocated\n"));
  strm.state = state;
  state.window = null /*Z_NULL*/ ;
  ret = inflateReset2(strm, windowBits);
  if (ret !== Z_OK$1) {
    strm.state = null /*Z_NULL*/ ;
  }
  return ret;
}


/*
 Return state with length and distance decoding tables and index sizes set to
 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
 If BUILDFIXED is defined, then instead this routine builds the tables the
 first time it's called, and returns those tables the first time and
 thereafter.  This reduces the size of the code by about 2K bytes, in
 exchange for a little execution time.  However, BUILDFIXED should not be
 used for threaded applications, since the rewriting of the tables and virgin
 may not be thread-safe.
 */
var virgin = true;

var lenfix, distfix; // We have no pointers in JS, so keep tables separate

function fixedtables(state) {
  /* build fixed huffman tables if first call (may not be thread safe) */
  if (virgin) {
    var sym;

    lenfix = new Buf32(512);
    distfix = new Buf32(32);

    /* literal/length table */
    sym = 0;
    while (sym < 144) {
      state.lens[sym++] = 8;
    }
    while (sym < 256) {
      state.lens[sym++] = 9;
    }
    while (sym < 280) {
      state.lens[sym++] = 7;
    }
    while (sym < 288) {
      state.lens[sym++] = 8;
    }

    inflate_table(LENS, state.lens, 0, 288, lenfix, 0, state.work, {
      bits: 9
    });

    /* distance table */
    sym = 0;
    while (sym < 32) {
      state.lens[sym++] = 5;
    }

    inflate_table(DISTS, state.lens, 0, 32, distfix, 0, state.work, {
      bits: 5
    });

    /* do this just once */
    virgin = false;
  }

  state.lencode = lenfix;
  state.lenbits = 9;
  state.distcode = distfix;
  state.distbits = 5;
}


/*
 Update the window with the last wsize (normally 32K) bytes written before
 returning.  If window does not exist yet, create it.  This is only called
 when a window is already in use, or when output has been written during this
 inflate call, but the end of the deflate stream has not been reached yet.
 It is also called to create a window for dictionary data when a dictionary
 is loaded.

 Providing output buffers larger than 32K to inflate() should provide a speed
 advantage, since only the last 32K of output is copied to the sliding window
 upon return from inflate(), and since all distances after the first 32K of
 output will fall in the output data, making match copies simpler and faster.
 The advantage may be dependent on the size of the processor's data caches.
 */
function updatewindow(strm, src, end, copy) {
  var dist;
  var state = strm.state;

  /* if it hasn't been done already, allocate space for the window */
  if (state.window === null) {
    state.wsize = 1 << state.wbits;
    state.wnext = 0;
    state.whave = 0;

    state.window = new Buf8(state.wsize);
  }

  /* copy state->wsize or less output bytes into the circular window */
  if (copy >= state.wsize) {
    arraySet(state.window, src, end - state.wsize, state.wsize, 0);
    state.wnext = 0;
    state.whave = state.wsize;
  } else {
    dist = state.wsize - state.wnext;
    if (dist > copy) {
      dist = copy;
    }
    //zmemcpy(state->window + state->wnext, end - copy, dist);
    arraySet(state.window, src, end - copy, dist, state.wnext);
    copy -= dist;
    if (copy) {
      //zmemcpy(state->window, end - copy, copy);
      arraySet(state.window, src, end - copy, copy, 0);
      state.wnext = copy;
      state.whave = state.wsize;
    } else {
      state.wnext += dist;
      if (state.wnext === state.wsize) {
        state.wnext = 0;
      }
      if (state.whave < state.wsize) {
        state.whave += dist;
      }
    }
  }
  return 0;
}

function inflate(strm, flush) {
  var state;
  var input, output; // input/output buffers
  var next; /* next input INDEX */
  var put; /* next output INDEX */
  var have, left; /* available input and output */
  var hold; /* bit buffer */
  var bits; /* bits in bit buffer */
  var _in, _out; /* save starting available input and output */
  var copy; /* number of stored or match bytes to copy */
  var from; /* where to copy match bytes from */
  var from_source;
  var here = 0; /* current decoding table entry */
  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
  //var last;                   /* parent table entry */
  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
  var len; /* length to copy for repeats, bits to drop */
  var ret; /* return code */
  var hbuf = new Buf8(4); /* buffer for gzip header crc calculation */
  var opts;

  var n; // temporary var for NEED_BITS

  var order = /* permutation of code lengths */ [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];


  if (!strm || !strm.state || !strm.output ||
    (!strm.input && strm.avail_in !== 0)) {
    return Z_STREAM_ERROR$1;
  }

  state = strm.state;
  if (state.mode === TYPE) {
    state.mode = TYPEDO;
  } /* skip check */


  //--- LOAD() ---
  put = strm.next_out;
  output = strm.output;
  left = strm.avail_out;
  next = strm.next_in;
  input = strm.input;
  have = strm.avail_in;
  hold = state.hold;
  bits = state.bits;
  //---

  _in = have;
  _out = left;
  ret = Z_OK$1;

  inf_leave: // goto emulation
    for (;;) {
      switch (state.mode) {
      case HEAD:
        if (state.wrap === 0) {
          state.mode = TYPEDO;
          break;
        }
        //=== NEEDBITS(16);
        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((state.wrap & 2) && hold === 0x8b1f) { /* gzip header */
          state.check = 0 /*crc32(0L, Z_NULL, 0)*/ ;
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//

          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          state.mode = FLAGS;
          break;
        }
        state.flags = 0; /* expect zlib header */
        if (state.head) {
          state.head.done = false;
        }
        if (!(state.wrap & 1) || /* check if zlib header allowed */
          (((hold & 0xff) /*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
          strm.msg = 'incorrect header check';
          state.mode = BAD;
          break;
        }
        if ((hold & 0x0f) /*BITS(4)*/ !== Z_DEFLATED$1) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        len = (hold & 0x0f) /*BITS(4)*/ + 8;
        if (state.wbits === 0) {
          state.wbits = len;
        } else if (len > state.wbits) {
          strm.msg = 'invalid window size';
          state.mode = BAD;
          break;
        }
        state.dmax = 1 << len;
        //Tracev((stderr, "inflate:   zlib header ok\n"));
        strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/ ;
        state.mode = hold & 0x200 ? DICTID : TYPE;
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        break;
      case FLAGS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.flags = hold;
        if ((state.flags & 0xff) !== Z_DEFLATED$1) {
          strm.msg = 'unknown compression method';
          state.mode = BAD;
          break;
        }
        if (state.flags & 0xe000) {
          strm.msg = 'unknown header flags set';
          state.mode = BAD;
          break;
        }
        if (state.head) {
          state.head.text = ((hold >> 8) & 1);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = TIME;
        /* falls through */
      case TIME:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.time = hold;
        }
        if (state.flags & 0x0200) {
          //=== CRC4(state.check, hold)
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          hbuf[2] = (hold >>> 16) & 0xff;
          hbuf[3] = (hold >>> 24) & 0xff;
          state.check = crc32(state.check, hbuf, 4, 0);
          //===
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = OS;
        /* falls through */
      case OS:
        //=== NEEDBITS(16); */
        while (bits < 16) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if (state.head) {
          state.head.xflags = (hold & 0xff);
          state.head.os = (hold >> 8);
        }
        if (state.flags & 0x0200) {
          //=== CRC2(state.check, hold);
          hbuf[0] = hold & 0xff;
          hbuf[1] = (hold >>> 8) & 0xff;
          state.check = crc32(state.check, hbuf, 2, 0);
          //===//
        }
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = EXLEN;
        /* falls through */
      case EXLEN:
        if (state.flags & 0x0400) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length = hold;
          if (state.head) {
            state.head.extra_len = hold;
          }
          if (state.flags & 0x0200) {
            //=== CRC2(state.check, hold);
            hbuf[0] = hold & 0xff;
            hbuf[1] = (hold >>> 8) & 0xff;
            state.check = crc32(state.check, hbuf, 2, 0);
            //===//
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        } else if (state.head) {
          state.head.extra = null /*Z_NULL*/ ;
        }
        state.mode = EXTRA;
        /* falls through */
      case EXTRA:
        if (state.flags & 0x0400) {
          copy = state.length;
          if (copy > have) {
            copy = have;
          }
          if (copy) {
            if (state.head) {
              len = state.head.extra_len - state.length;
              if (!state.head.extra) {
                // Use untyped array for more conveniend processing later
                state.head.extra = new Array(state.head.extra_len);
              }
              arraySet(
                state.head.extra,
                input,
                next,
                // extra field is limited to 65536 bytes
                // - no need for additional size check
                copy,
                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
                len
              );
              //zmemcpy(state.head.extra + len, next,
              //        len + copy > state.head.extra_max ?
              //        state.head.extra_max - len : copy);
            }
            if (state.flags & 0x0200) {
              state.check = crc32(state.check, input, copy, next);
            }
            have -= copy;
            next += copy;
            state.length -= copy;
          }
          if (state.length) {
            break inf_leave;
          }
        }
        state.length = 0;
        state.mode = NAME;
        /* falls through */
      case NAME:
        if (state.flags & 0x0800) {
          if (have === 0) {
            break inf_leave;
          }
          copy = 0;
          do {
            // TODO: 2 or 1 bytes?
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
              (state.length < 65536 /*state.head.name_max*/ )) {
              state.head.name += String.fromCharCode(len);
            }
          } while (len && copy < have);

          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) {
            break inf_leave;
          }
        } else if (state.head) {
          state.head.name = null;
        }
        state.length = 0;
        state.mode = COMMENT;
        /* falls through */
      case COMMENT:
        if (state.flags & 0x1000) {
          if (have === 0) {
            break inf_leave;
          }
          copy = 0;
          do {
            len = input[next + copy++];
            /* use constant limit because in js we should not preallocate memory */
            if (state.head && len &&
              (state.length < 65536 /*state.head.comm_max*/ )) {
              state.head.comment += String.fromCharCode(len);
            }
          } while (len && copy < have);
          if (state.flags & 0x0200) {
            state.check = crc32(state.check, input, copy, next);
          }
          have -= copy;
          next += copy;
          if (len) {
            break inf_leave;
          }
        } else if (state.head) {
          state.head.comment = null;
        }
        state.mode = HCRC;
        /* falls through */
      case HCRC:
        if (state.flags & 0x0200) {
          //=== NEEDBITS(16); */
          while (bits < 16) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.check & 0xffff)) {
            strm.msg = 'header crc mismatch';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
        }
        if (state.head) {
          state.head.hcrc = ((state.flags >> 9) & 1);
          state.head.done = true;
        }
        strm.adler = state.check = 0;
        state.mode = TYPE;
        break;
      case DICTID:
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        strm.adler = state.check = zswap32(hold);
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = DICT;
        /* falls through */
      case DICT:
        if (state.havedict === 0) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          return Z_NEED_DICT$1;
        }
        strm.adler = state.check = 1 /*adler32(0L, Z_NULL, 0)*/ ;
        state.mode = TYPE;
        /* falls through */
      case TYPE:
        if (flush === Z_BLOCK$1 || flush === Z_TREES$1) {
          break inf_leave;
        }
        /* falls through */
      case TYPEDO:
        if (state.last) {
          //--- BYTEBITS() ---//
          hold >>>= bits & 7;
          bits -= bits & 7;
          //---//
          state.mode = CHECK;
          break;
        }
        //=== NEEDBITS(3); */
        while (bits < 3) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.last = (hold & 0x01) /*BITS(1)*/ ;
        //--- DROPBITS(1) ---//
        hold >>>= 1;
        bits -= 1;
        //---//

        switch ((hold & 0x03) /*BITS(2)*/ ) {
        case 0:
          /* stored block */
          //Tracev((stderr, "inflate:     stored block%s\n",
          //        state.last ? " (last)" : ""));
          state.mode = STORED;
          break;
        case 1:
          /* fixed block */
          fixedtables(state);
          //Tracev((stderr, "inflate:     fixed codes block%s\n",
          //        state.last ? " (last)" : ""));
          state.mode = LEN_; /* decode codes */
          if (flush === Z_TREES$1) {
            //--- DROPBITS(2) ---//
            hold >>>= 2;
            bits -= 2;
            //---//
            break inf_leave;
          }
          break;
        case 2:
          /* dynamic block */
          //Tracev((stderr, "inflate:     dynamic codes block%s\n",
          //        state.last ? " (last)" : ""));
          state.mode = TABLE;
          break;
        case 3:
          strm.msg = 'invalid block type';
          state.mode = BAD;
        }
        //--- DROPBITS(2) ---//
        hold >>>= 2;
        bits -= 2;
        //---//
        break;
      case STORED:
        //--- BYTEBITS() ---// /* go to byte boundary */
        hold >>>= bits & 7;
        bits -= bits & 7;
        //---//
        //=== NEEDBITS(32); */
        while (bits < 32) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
          strm.msg = 'invalid stored block lengths';
          state.mode = BAD;
          break;
        }
        state.length = hold & 0xffff;
        //Tracev((stderr, "inflate:       stored length %u\n",
        //        state.length));
        //=== INITBITS();
        hold = 0;
        bits = 0;
        //===//
        state.mode = COPY_;
        if (flush === Z_TREES$1) {
          break inf_leave;
        }
        /* falls through */
      case COPY_:
        state.mode = COPY;
        /* falls through */
      case COPY:
        copy = state.length;
        if (copy) {
          if (copy > have) {
            copy = have;
          }
          if (copy > left) {
            copy = left;
          }
          if (copy === 0) {
            break inf_leave;
          }
          //--- zmemcpy(put, next, copy); ---
          arraySet(output, input, next, copy, put);
          //---//
          have -= copy;
          next += copy;
          left -= copy;
          put += copy;
          state.length -= copy;
          break;
        }
        //Tracev((stderr, "inflate:       stored end\n"));
        state.mode = TYPE;
        break;
      case TABLE:
        //=== NEEDBITS(14); */
        while (bits < 14) {
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
        }
        //===//
        state.nlen = (hold & 0x1f) /*BITS(5)*/ + 257;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ndist = (hold & 0x1f) /*BITS(5)*/ + 1;
        //--- DROPBITS(5) ---//
        hold >>>= 5;
        bits -= 5;
        //---//
        state.ncode = (hold & 0x0f) /*BITS(4)*/ + 4;
        //--- DROPBITS(4) ---//
        hold >>>= 4;
        bits -= 4;
        //---//
        //#ifndef PKZIP_BUG_WORKAROUND
        if (state.nlen > 286 || state.ndist > 30) {
          strm.msg = 'too many length or distance symbols';
          state.mode = BAD;
          break;
        }
        //#endif
        //Tracev((stderr, "inflate:       table sizes ok\n"));
        state.have = 0;
        state.mode = LENLENS;
        /* falls through */
      case LENLENS:
        while (state.have < state.ncode) {
          //=== NEEDBITS(3);
          while (bits < 3) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.lens[order[state.have++]] = (hold & 0x07); //BITS(3);
          //--- DROPBITS(3) ---//
          hold >>>= 3;
          bits -= 3;
          //---//
        }
        while (state.have < 19) {
          state.lens[order[state.have++]] = 0;
        }
        // We have separate tables & no pointers. 2 commented lines below not needed.
        //state.next = state.codes;
        //state.lencode = state.next;
        // Switch to use dynamic table
        state.lencode = state.lendyn;
        state.lenbits = 7;

        opts = {
          bits: state.lenbits
        };
        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
        state.lenbits = opts.bits;

        if (ret) {
          strm.msg = 'invalid code lengths set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, "inflate:       code lengths ok\n"));
        state.have = 0;
        state.mode = CODELENS;
        /* falls through */
      case CODELENS:
        while (state.have < state.nlen + state.ndist) {
          for (;;) {
            here = state.lencode[hold & ((1 << state.lenbits) - 1)]; /*BITS(state.lenbits)*/
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((here_bits) <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          if (here_val < 16) {
            //--- DROPBITS(here.bits) ---//
            hold >>>= here_bits;
            bits -= here_bits;
            //---//
            state.lens[state.have++] = here_val;
          } else {
            if (here_val === 16) {
              //=== NEEDBITS(here.bits + 2);
              n = here_bits + 2;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              if (state.have === 0) {
                strm.msg = 'invalid bit length repeat';
                state.mode = BAD;
                break;
              }
              len = state.lens[state.have - 1];
              copy = 3 + (hold & 0x03); //BITS(2);
              //--- DROPBITS(2) ---//
              hold >>>= 2;
              bits -= 2;
              //---//
            } else if (here_val === 17) {
              //=== NEEDBITS(here.bits + 3);
              n = here_bits + 3;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 3 + (hold & 0x07); //BITS(3);
              //--- DROPBITS(3) ---//
              hold >>>= 3;
              bits -= 3;
              //---//
            } else {
              //=== NEEDBITS(here.bits + 7);
              n = here_bits + 7;
              while (bits < n) {
                if (have === 0) {
                  break inf_leave;
                }
                have--;
                hold += input[next++] << bits;
                bits += 8;
              }
              //===//
              //--- DROPBITS(here.bits) ---//
              hold >>>= here_bits;
              bits -= here_bits;
              //---//
              len = 0;
              copy = 11 + (hold & 0x7f); //BITS(7);
              //--- DROPBITS(7) ---//
              hold >>>= 7;
              bits -= 7;
              //---//
            }
            if (state.have + copy > state.nlen + state.ndist) {
              strm.msg = 'invalid bit length repeat';
              state.mode = BAD;
              break;
            }
            while (copy--) {
              state.lens[state.have++] = len;
            }
          }
        }

        /* handle error breaks in while */
        if (state.mode === BAD) {
          break;
        }

        /* check for end-of-block code (better have one) */
        if (state.lens[256] === 0) {
          strm.msg = 'invalid code -- missing end-of-block';
          state.mode = BAD;
          break;
        }

        /* build code tables -- note: do not change the lenbits or distbits
           values here (9 and 6) without reading the comments in inftrees.h
           concerning the ENOUGH constants, which depend on those values */
        state.lenbits = 9;

        opts = {
          bits: state.lenbits
        };
        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.lenbits = opts.bits;
        // state.lencode = state.next;

        if (ret) {
          strm.msg = 'invalid literal/lengths set';
          state.mode = BAD;
          break;
        }

        state.distbits = 6;
        //state.distcode.copy(state.codes);
        // Switch to use dynamic table
        state.distcode = state.distdyn;
        opts = {
          bits: state.distbits
        };
        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
        // We have separate tables & no pointers. 2 commented lines below not needed.
        // state.next_index = opts.table_index;
        state.distbits = opts.bits;
        // state.distcode = state.next;

        if (ret) {
          strm.msg = 'invalid distances set';
          state.mode = BAD;
          break;
        }
        //Tracev((stderr, 'inflate:       codes ok\n'));
        state.mode = LEN_;
        if (flush === Z_TREES$1) {
          break inf_leave;
        }
        /* falls through */
      case LEN_:
        state.mode = LEN;
        /* falls through */
      case LEN:
        if (have >= 6 && left >= 258) {
          //--- RESTORE() ---
          strm.next_out = put;
          strm.avail_out = left;
          strm.next_in = next;
          strm.avail_in = have;
          state.hold = hold;
          state.bits = bits;
          //---
          inflate_fast(strm, _out);
          //--- LOAD() ---
          put = strm.next_out;
          output = strm.output;
          left = strm.avail_out;
          next = strm.next_in;
          input = strm.input;
          have = strm.avail_in;
          hold = state.hold;
          bits = state.bits;
          //---

          if (state.mode === TYPE) {
            state.back = -1;
          }
          break;
        }
        state.back = 0;
        for (;;) {
          here = state.lencode[hold & ((1 << state.lenbits) - 1)]; /*BITS(state.lenbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if (here_bits <= bits) {
            break;
          }
          //--- PULLBYTE() ---//
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if (here_op && (here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.lencode[last_val +
              ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        state.length = here_val;
        if (here_op === 0) {
          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
          //        "inflate:         literal '%c'\n" :
          //        "inflate:         literal 0x%02x\n", here.val));
          state.mode = LIT;
          break;
        }
        if (here_op & 32) {
          //Tracevv((stderr, "inflate:         end of block\n"));
          state.back = -1;
          state.mode = TYPE;
          break;
        }
        if (here_op & 64) {
          strm.msg = 'invalid literal/length code';
          state.mode = BAD;
          break;
        }
        state.extra = here_op & 15;
        state.mode = LENEXT;
        /* falls through */
      case LENEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.length += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/ ;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //Tracevv((stderr, "inflate:         length %u\n", state.length));
        state.was = state.length;
        state.mode = DIST;
        /* falls through */
      case DIST:
        for (;;) {
          here = state.distcode[hold & ((1 << state.distbits) - 1)]; /*BITS(state.distbits)*/
          here_bits = here >>> 24;
          here_op = (here >>> 16) & 0xff;
          here_val = here & 0xffff;

          if ((here_bits) <= bits) {
            break;
          }
          //--- PULLBYTE() ---//
          if (have === 0) {
            break inf_leave;
          }
          have--;
          hold += input[next++] << bits;
          bits += 8;
          //---//
        }
        if ((here_op & 0xf0) === 0) {
          last_bits = here_bits;
          last_op = here_op;
          last_val = here_val;
          for (;;) {
            here = state.distcode[last_val +
              ((hold & ((1 << (last_bits + last_op)) - 1)) /*BITS(last.bits + last.op)*/ >> last_bits)];
            here_bits = here >>> 24;
            here_op = (here >>> 16) & 0xff;
            here_val = here & 0xffff;

            if ((last_bits + here_bits) <= bits) {
              break;
            }
            //--- PULLBYTE() ---//
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
            //---//
          }
          //--- DROPBITS(last.bits) ---//
          hold >>>= last_bits;
          bits -= last_bits;
          //---//
          state.back += last_bits;
        }
        //--- DROPBITS(here.bits) ---//
        hold >>>= here_bits;
        bits -= here_bits;
        //---//
        state.back += here_bits;
        if (here_op & 64) {
          strm.msg = 'invalid distance code';
          state.mode = BAD;
          break;
        }
        state.offset = here_val;
        state.extra = (here_op) & 15;
        state.mode = DISTEXT;
        /* falls through */
      case DISTEXT:
        if (state.extra) {
          //=== NEEDBITS(state.extra);
          n = state.extra;
          while (bits < n) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          state.offset += hold & ((1 << state.extra) - 1) /*BITS(state.extra)*/ ;
          //--- DROPBITS(state.extra) ---//
          hold >>>= state.extra;
          bits -= state.extra;
          //---//
          state.back += state.extra;
        }
        //#ifdef INFLATE_STRICT
        if (state.offset > state.dmax) {
          strm.msg = 'invalid distance too far back';
          state.mode = BAD;
          break;
        }
        //#endif
        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
        state.mode = MATCH;
        /* falls through */
      case MATCH:
        if (left === 0) {
          break inf_leave;
        }
        copy = _out - left;
        if (state.offset > copy) { /* copy from window */
          copy = state.offset - copy;
          if (copy > state.whave) {
            if (state.sane) {
              strm.msg = 'invalid distance too far back';
              state.mode = BAD;
              break;
            }
            // (!) This block is disabled in zlib defailts,
            // don't enable it for binary compatibility
            //#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
            //          Trace((stderr, "inflate.c too far\n"));
            //          copy -= state.whave;
            //          if (copy > state.length) { copy = state.length; }
            //          if (copy > left) { copy = left; }
            //          left -= copy;
            //          state.length -= copy;
            //          do {
            //            output[put++] = 0;
            //          } while (--copy);
            //          if (state.length === 0) { state.mode = LEN; }
            //          break;
            //#endif
          }
          if (copy > state.wnext) {
            copy -= state.wnext;
            from = state.wsize - copy;
          } else {
            from = state.wnext - copy;
          }
          if (copy > state.length) {
            copy = state.length;
          }
          from_source = state.window;
        } else { /* copy from output */
          from_source = output;
          from = put - state.offset;
          copy = state.length;
        }
        if (copy > left) {
          copy = left;
        }
        left -= copy;
        state.length -= copy;
        do {
          output[put++] = from_source[from++];
        } while (--copy);
        if (state.length === 0) {
          state.mode = LEN;
        }
        break;
      case LIT:
        if (left === 0) {
          break inf_leave;
        }
        output[put++] = state.length;
        left--;
        state.mode = LEN;
        break;
      case CHECK:
        if (state.wrap) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            // Use '|' insdead of '+' to make sure that result is signed
            hold |= input[next++] << bits;
            bits += 8;
          }
          //===//
          _out -= left;
          strm.total_out += _out;
          state.total += _out;
          if (_out) {
            strm.adler = state.check =
              /*UPDATE(state.check, put - _out, _out);*/
              (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

          }
          _out = left;
          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
            strm.msg = 'incorrect data check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   check matches trailer\n"));
        }
        state.mode = LENGTH;
        /* falls through */
      case LENGTH:
        if (state.wrap && state.flags) {
          //=== NEEDBITS(32);
          while (bits < 32) {
            if (have === 0) {
              break inf_leave;
            }
            have--;
            hold += input[next++] << bits;
            bits += 8;
          }
          //===//
          if (hold !== (state.total & 0xffffffff)) {
            strm.msg = 'incorrect length check';
            state.mode = BAD;
            break;
          }
          //=== INITBITS();
          hold = 0;
          bits = 0;
          //===//
          //Tracev((stderr, "inflate:   length matches trailer\n"));
        }
        state.mode = DONE;
        /* falls through */
      case DONE:
        ret = Z_STREAM_END$1;
        break inf_leave;
      case BAD:
        ret = Z_DATA_ERROR$1;
        break inf_leave;
      case MEM:
        return Z_MEM_ERROR;
      case SYNC:
        /* falls through */
      default:
        return Z_STREAM_ERROR$1;
      }
    }

  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

  /*
     Return from inflate(), updating the total counts and the check value.
     If there was no progress during the inflate() call, return a buffer
     error.  Call updatewindow() to create and/or update the window state.
     Note: a memory error from inflate() is non-recoverable.
   */

  //--- RESTORE() ---
  strm.next_out = put;
  strm.avail_out = left;
  strm.next_in = next;
  strm.avail_in = have;
  state.hold = hold;
  state.bits = bits;
  //---

  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
      (state.mode < CHECK || flush !== Z_FINISH$1))) {
    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
  }
  _in -= strm.avail_in;
  _out -= strm.avail_out;
  strm.total_in += _in;
  strm.total_out += _out;
  state.total += _out;
  if (state.wrap && _out) {
    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
  }
  strm.data_type = state.bits + (state.last ? 64 : 0) +
    (state.mode === TYPE ? 128 : 0) +
    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
  if (((_in === 0 && _out === 0) || flush === Z_FINISH$1) && ret === Z_OK$1) {
    ret = Z_BUF_ERROR$1;
  }
  return ret;
}

function inflateEnd(strm) {

  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/ ) {
    return Z_STREAM_ERROR$1;
  }

  var state = strm.state;
  if (state.window) {
    state.window = null;
  }
  strm.state = null;
  return Z_OK$1;
}

/* Not implemented
exports.inflateCopy = inflateCopy;
exports.inflateGetDictionary = inflateGetDictionary;
exports.inflateMark = inflateMark;
exports.inflatePrime = inflatePrime;
exports.inflateSync = inflateSync;
exports.inflateSyncPoint = inflateSyncPoint;
exports.inflateUndermine = inflateUndermine;
*/

// import constants from './constants';


// zlib modes
var NONE = 0;
var DEFLATE = 1;
var INFLATE = 2;
var GZIP = 3;
var GUNZIP = 4;
var DEFLATERAW = 5;
var INFLATERAW = 6;
var UNZIP = 7;
var Z_NO_FLUSH=         0,
  Z_PARTIAL_FLUSH=    1,
  Z_SYNC_FLUSH=    2,
  Z_FULL_FLUSH=       3,
  Z_FINISH=       4,
  Z_BLOCK=           5,
  Z_TREES=            6,

  /* Return codes for the compression/decompression functions. Negative values
  * are errors, positive values are used for special but normal events.
  */
  Z_OK=               0,
  Z_STREAM_END=       1,
  Z_NEED_DICT=      2,
  Z_ERRNO=       -1,
  Z_STREAM_ERROR=   -2,
  Z_DATA_ERROR=    -3,
  //Z_MEM_ERROR:     -4,
  Z_BUF_ERROR=    -5,
  //Z_VERSION_ERROR: -6,

  /* compression levels */
  Z_NO_COMPRESSION=         0,
  Z_BEST_SPEED=             1,
  Z_BEST_COMPRESSION=       9,
  Z_DEFAULT_COMPRESSION=   -1,


  Z_FILTERED=               1,
  Z_HUFFMAN_ONLY=           2,
  Z_RLE=                    3,
  Z_FIXED=                  4,
  Z_DEFAULT_STRATEGY=       0,

  /* Possible values of the data_type field (though see inflate()) */
  Z_BINARY=                 0,
  Z_TEXT=                   1,
  //Z_ASCII:                1, // = Z_TEXT (deprecated)
  Z_UNKNOWN=                2,

  /* The deflate compression method */
  Z_DEFLATED=               8;
function Zlib$1(mode) {
  if (mode < DEFLATE || mode > UNZIP)
    throw new TypeError('Bad argument');

  this.mode = mode;
  this.init_done = false;
  this.write_in_progress = false;
  this.pending_close = false;
  this.windowBits = 0;
  this.level = 0;
  this.memLevel = 0;
  this.strategy = 0;
  this.dictionary = null;
}

Zlib$1.prototype.init = function(windowBits, level, memLevel, strategy, dictionary) {
  this.windowBits = windowBits;
  this.level = level;
  this.memLevel = memLevel;
  this.strategy = strategy;
  // dictionary not supported.

  if (this.mode === GZIP || this.mode === GUNZIP)
    this.windowBits += 16;

  if (this.mode === UNZIP)
    this.windowBits += 32;

  if (this.mode === DEFLATERAW || this.mode === INFLATERAW)
    this.windowBits = -this.windowBits;

  this.strm = new ZStream();
  var status;
  switch (this.mode) {
  case DEFLATE:
  case GZIP:
  case DEFLATERAW:
    status = deflateInit2(
      this.strm,
      this.level,
      Z_DEFLATED,
      this.windowBits,
      this.memLevel,
      this.strategy
    );
    break;
  case INFLATE:
  case GUNZIP:
  case INFLATERAW:
  case UNZIP:
    status  = inflateInit2(
      this.strm,
      this.windowBits
    );
    break;
  default:
    throw new Error('Unknown mode ' + this.mode);
  }

  if (status !== Z_OK) {
    this._error(status);
    return;
  }

  this.write_in_progress = false;
  this.init_done = true;
};

Zlib$1.prototype.params = function() {
  throw new Error('deflateParams Not supported');
};

Zlib$1.prototype._writeCheck = function() {
  if (!this.init_done)
    throw new Error('write before init');

  if (this.mode === NONE)
    throw new Error('already finalized');

  if (this.write_in_progress)
    throw new Error('write already in progress');

  if (this.pending_close)
    throw new Error('close is pending');
};

Zlib$1.prototype.write = function(flush, input, in_off, in_len, out, out_off, out_len) {
  this._writeCheck();
  this.write_in_progress = true;

  var self = this;
  process.nextTick(function() {
    self.write_in_progress = false;
    var res = self._write(flush, input, in_off, in_len, out, out_off, out_len);
    self.callback(res[0], res[1]);

    if (self.pending_close)
      self.close();
  });

  return this;
};

// set method for Node buffers, used by pako
function bufferSet(data, offset) {
  for (var i = 0; i < data.length; i++) {
    this[offset + i] = data[i];
  }
}

Zlib$1.prototype.writeSync = function(flush, input, in_off, in_len, out, out_off, out_len) {
  this._writeCheck();
  return this._write(flush, input, in_off, in_len, out, out_off, out_len);
};

Zlib$1.prototype._write = function(flush, input, in_off, in_len, out, out_off, out_len) {
  this.write_in_progress = true;

  if (flush !== Z_NO_FLUSH &&
      flush !== Z_PARTIAL_FLUSH &&
      flush !== Z_SYNC_FLUSH &&
      flush !== Z_FULL_FLUSH &&
      flush !== Z_FINISH &&
      flush !== Z_BLOCK) {
    throw new Error('Invalid flush value');
  }

  if (input == null) {
    input = new Buffer(0);
    in_len = 0;
    in_off = 0;
  }

  if (out._set)
    out.set = out._set;
  else
    out.set = bufferSet;

  var strm = this.strm;
  strm.avail_in = in_len;
  strm.input = input;
  strm.next_in = in_off;
  strm.avail_out = out_len;
  strm.output = out;
  strm.next_out = out_off;
  var status;
  switch (this.mode) {
  case DEFLATE:
  case GZIP:
  case DEFLATERAW:
    status = deflate(strm, flush);
    break;
  case UNZIP:
  case INFLATE:
  case GUNZIP:
  case INFLATERAW:
    status = inflate(strm, flush);
    break;
  default:
    throw new Error('Unknown mode ' + this.mode);
  }

  if (status !== Z_STREAM_END && status !== Z_OK) {
    this._error(status);
  }

  this.write_in_progress = false;
  return [strm.avail_in, strm.avail_out];
};

Zlib$1.prototype.close = function() {
  if (this.write_in_progress) {
    this.pending_close = true;
    return;
  }

  this.pending_close = false;

  if (this.mode === DEFLATE || this.mode === GZIP || this.mode === DEFLATERAW) {
    deflateEnd(this.strm);
  } else {
    inflateEnd(this.strm);
  }

  this.mode = NONE;
};
var status;
Zlib$1.prototype.reset = function() {
  switch (this.mode) {
  case DEFLATE:
  case DEFLATERAW:
    status = deflateReset(this.strm);
    break;
  case INFLATE:
  case INFLATERAW:
    status = inflateReset(this.strm);
    break;
  }

  if (status !== Z_OK) {
    this._error(status);
  }
};

Zlib$1.prototype._error = function(status) {
  this.onerror(msg[status] + ': ' + this.strm.msg, status);

  this.write_in_progress = false;
  if (this.pending_close)
    this.close();
};

var _binding = /*#__PURE__*/Object.freeze({
	__proto__: null,
	NONE: NONE,
	DEFLATE: DEFLATE,
	INFLATE: INFLATE,
	GZIP: GZIP,
	GUNZIP: GUNZIP,
	DEFLATERAW: DEFLATERAW,
	INFLATERAW: INFLATERAW,
	UNZIP: UNZIP,
	Z_NO_FLUSH: Z_NO_FLUSH,
	Z_PARTIAL_FLUSH: Z_PARTIAL_FLUSH,
	Z_SYNC_FLUSH: Z_SYNC_FLUSH,
	Z_FULL_FLUSH: Z_FULL_FLUSH,
	Z_FINISH: Z_FINISH,
	Z_BLOCK: Z_BLOCK,
	Z_TREES: Z_TREES,
	Z_OK: Z_OK,
	Z_STREAM_END: Z_STREAM_END,
	Z_NEED_DICT: Z_NEED_DICT,
	Z_ERRNO: Z_ERRNO,
	Z_STREAM_ERROR: Z_STREAM_ERROR,
	Z_DATA_ERROR: Z_DATA_ERROR,
	Z_BUF_ERROR: Z_BUF_ERROR,
	Z_NO_COMPRESSION: Z_NO_COMPRESSION,
	Z_BEST_SPEED: Z_BEST_SPEED,
	Z_BEST_COMPRESSION: Z_BEST_COMPRESSION,
	Z_DEFAULT_COMPRESSION: Z_DEFAULT_COMPRESSION,
	Z_FILTERED: Z_FILTERED,
	Z_HUFFMAN_ONLY: Z_HUFFMAN_ONLY,
	Z_RLE: Z_RLE,
	Z_FIXED: Z_FIXED,
	Z_DEFAULT_STRATEGY: Z_DEFAULT_STRATEGY,
	Z_BINARY: Z_BINARY,
	Z_TEXT: Z_TEXT,
	Z_UNKNOWN: Z_UNKNOWN,
	Z_DEFLATED: Z_DEFLATED,
	Zlib: Zlib$1
});

// Copyright Joyent, Inc. and other Node contributors.
function assert (a, msg) {
  if (!a) {
    throw new Error(msg);
  }
}
var binding = {};
Object.keys(_binding).forEach(function (key) {
  binding[key] = _binding[key];
});
// zlib doesn't provide these, so kludge them in following the same
// const naming scheme zlib uses.
binding.Z_MIN_WINDOWBITS = 8;
binding.Z_MAX_WINDOWBITS = 15;
binding.Z_DEFAULT_WINDOWBITS = 15;

// fewer than 64 bytes per chunk is stupid.
// technically it could work with as few as 8, but even 64 bytes
// is absurdly low.  Usually a MB or more is best.
binding.Z_MIN_CHUNK = 64;
binding.Z_MAX_CHUNK = Infinity;
binding.Z_DEFAULT_CHUNK = (16 * 1024);

binding.Z_MIN_MEMLEVEL = 1;
binding.Z_MAX_MEMLEVEL = 9;
binding.Z_DEFAULT_MEMLEVEL = 8;

binding.Z_MIN_LEVEL = -1;
binding.Z_MAX_LEVEL = 9;
binding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;


// translation table for return codes.
var codes = {
  Z_OK: binding.Z_OK,
  Z_STREAM_END: binding.Z_STREAM_END,
  Z_NEED_DICT: binding.Z_NEED_DICT,
  Z_ERRNO: binding.Z_ERRNO,
  Z_STREAM_ERROR: binding.Z_STREAM_ERROR,
  Z_DATA_ERROR: binding.Z_DATA_ERROR,
  Z_MEM_ERROR: binding.Z_MEM_ERROR,
  Z_BUF_ERROR: binding.Z_BUF_ERROR,
  Z_VERSION_ERROR: binding.Z_VERSION_ERROR
};

Object.keys(codes).forEach(function(k) {
  codes[codes[k]] = k;
});

// generic zlib
// minimal 2-byte header
function Deflate(opts) {
  if (!(this instanceof Deflate)) return new Deflate(opts);
  Zlib.call(this, opts, binding.DEFLATE);
}

function Inflate(opts) {
  if (!(this instanceof Inflate)) return new Inflate(opts);
  Zlib.call(this, opts, binding.INFLATE);
}



// gzip - bigger header, same deflate compression
function Gzip(opts) {
  if (!(this instanceof Gzip)) return new Gzip(opts);
  Zlib.call(this, opts, binding.GZIP);
}

function Gunzip(opts) {
  if (!(this instanceof Gunzip)) return new Gunzip(opts);
  Zlib.call(this, opts, binding.GUNZIP);
}



// raw - no header
function DeflateRaw(opts) {
  if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
  Zlib.call(this, opts, binding.DEFLATERAW);
}

function InflateRaw(opts) {
  if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
  Zlib.call(this, opts, binding.INFLATERAW);
}


// auto-detect header.
function Unzip(opts) {
  if (!(this instanceof Unzip)) return new Unzip(opts);
  Zlib.call(this, opts, binding.UNZIP);
}


// the Zlib class they all inherit from
// This thing manages the queue of requests, and returns
// true or false if there is anything in the queue when
// you call the .write() method.

function Zlib(opts, mode) {
  this._opts = opts = opts || {};
  this._chunkSize = opts.chunkSize || binding.Z_DEFAULT_CHUNK;

  Transform.call(this, opts);

  if (opts.flush) {
    if (opts.flush !== binding.Z_NO_FLUSH &&
        opts.flush !== binding.Z_PARTIAL_FLUSH &&
        opts.flush !== binding.Z_SYNC_FLUSH &&
        opts.flush !== binding.Z_FULL_FLUSH &&
        opts.flush !== binding.Z_FINISH &&
        opts.flush !== binding.Z_BLOCK) {
      throw new Error('Invalid flush flag: ' + opts.flush);
    }
  }
  this._flushFlag = opts.flush || binding.Z_NO_FLUSH;

  if (opts.chunkSize) {
    if (opts.chunkSize < binding.Z_MIN_CHUNK ||
        opts.chunkSize > binding.Z_MAX_CHUNK) {
      throw new Error('Invalid chunk size: ' + opts.chunkSize);
    }
  }

  if (opts.windowBits) {
    if (opts.windowBits < binding.Z_MIN_WINDOWBITS ||
        opts.windowBits > binding.Z_MAX_WINDOWBITS) {
      throw new Error('Invalid windowBits: ' + opts.windowBits);
    }
  }

  if (opts.level) {
    if (opts.level < binding.Z_MIN_LEVEL ||
        opts.level > binding.Z_MAX_LEVEL) {
      throw new Error('Invalid compression level: ' + opts.level);
    }
  }

  if (opts.memLevel) {
    if (opts.memLevel < binding.Z_MIN_MEMLEVEL ||
        opts.memLevel > binding.Z_MAX_MEMLEVEL) {
      throw new Error('Invalid memLevel: ' + opts.memLevel);
    }
  }

  if (opts.strategy) {
    if (opts.strategy != binding.Z_FILTERED &&
        opts.strategy != binding.Z_HUFFMAN_ONLY &&
        opts.strategy != binding.Z_RLE &&
        opts.strategy != binding.Z_FIXED &&
        opts.strategy != binding.Z_DEFAULT_STRATEGY) {
      throw new Error('Invalid strategy: ' + opts.strategy);
    }
  }

  if (opts.dictionary) {
    if (!Buffer.isBuffer(opts.dictionary)) {
      throw new Error('Invalid dictionary: it should be a Buffer instance');
    }
  }

  this._binding = new binding.Zlib(mode);

  var self = this;
  this._hadError = false;
  this._binding.onerror = function(message, errno) {
    // there is no way to cleanly recover.
    // continuing only obscures problems.
    self._binding = null;
    self._hadError = true;

    var error = new Error(message);
    error.errno = errno;
    error.code = binding.codes[errno];
    self.emit('error', error);
  };

  var level = binding.Z_DEFAULT_COMPRESSION;
  if (typeof opts.level === 'number') level = opts.level;

  var strategy = binding.Z_DEFAULT_STRATEGY;
  if (typeof opts.strategy === 'number') strategy = opts.strategy;

  this._binding.init(opts.windowBits || binding.Z_DEFAULT_WINDOWBITS,
                     level,
                     opts.memLevel || binding.Z_DEFAULT_MEMLEVEL,
                     strategy,
                     opts.dictionary);

  this._buffer = new Buffer(this._chunkSize);
  this._offset = 0;
  this._closed = false;
  this._level = level;
  this._strategy = strategy;

  this.once('end', this.close);
}

inherits$1(Zlib, Transform);

Zlib.prototype.params = function(level, strategy, callback) {
  if (level < binding.Z_MIN_LEVEL ||
      level > binding.Z_MAX_LEVEL) {
    throw new RangeError('Invalid compression level: ' + level);
  }
  if (strategy != binding.Z_FILTERED &&
      strategy != binding.Z_HUFFMAN_ONLY &&
      strategy != binding.Z_RLE &&
      strategy != binding.Z_FIXED &&
      strategy != binding.Z_DEFAULT_STRATEGY) {
    throw new TypeError('Invalid strategy: ' + strategy);
  }

  if (this._level !== level || this._strategy !== strategy) {
    var self = this;
    this.flush(binding.Z_SYNC_FLUSH, function() {
      self._binding.params(level, strategy);
      if (!self._hadError) {
        self._level = level;
        self._strategy = strategy;
        if (callback) callback();
      }
    });
  } else {
    process.nextTick(callback);
  }
};

Zlib.prototype.reset = function() {
  return this._binding.reset();
};

// This is the _flush function called by the transform class,
// internally, when the last chunk has been written.
Zlib.prototype._flush = function(callback) {
  this._transform(new Buffer(0), '', callback);
};

Zlib.prototype.flush = function(kind, callback) {
  var ws = this._writableState;

  if (typeof kind === 'function' || (kind === void 0 && !callback)) {
    callback = kind;
    kind = binding.Z_FULL_FLUSH;
  }

  if (ws.ended) {
    if (callback)
      process.nextTick(callback);
  } else if (ws.ending) {
    if (callback)
      this.once('end', callback);
  } else if (ws.needDrain) {
    var self = this;
    this.once('drain', function() {
      self.flush(callback);
    });
  } else {
    this._flushFlag = kind;
    this.write(new Buffer(0), '', callback);
  }
};

Zlib.prototype.close = function(callback) {
  if (callback)
    process.nextTick(callback);

  if (this._closed)
    return;

  this._closed = true;

  this._binding.close();

  var self = this;
  process.nextTick(function() {
    self.emit('close');
  });
};

Zlib.prototype._transform = function(chunk, encoding, cb) {
  var flushFlag;
  var ws = this._writableState;
  var ending = ws.ending || ws.ended;
  var last = ending && (!chunk || ws.length === chunk.length);

  if (!chunk === null && !Buffer.isBuffer(chunk))
    return cb(new Error('invalid input'));

  // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag.
  // If it's explicitly flushing at some other time, then we use
  // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
  // goodness.
  if (last)
    flushFlag = binding.Z_FINISH;
  else {
    flushFlag = this._flushFlag;
    // once we've flushed the last of the queue, stop flushing and
    // go back to the normal behavior.
    if (chunk.length >= ws.length) {
      this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;
    }
  }

  this._processChunk(chunk, flushFlag, cb);
};

Zlib.prototype._processChunk = function(chunk, flushFlag, cb) {
  var availInBefore = chunk && chunk.length;
  var availOutBefore = this._chunkSize - this._offset;
  var inOff = 0;

  var self = this;

  var async = typeof cb === 'function';

  if (!async) {
    var buffers = [];
    var nread = 0;

    var error;
    this.on('error', function(er) {
      error = er;
    });

    do {
      var res = this._binding.writeSync(flushFlag,
                                        chunk, // in
                                        inOff, // in_off
                                        availInBefore, // in_len
                                        this._buffer, // out
                                        this._offset, //out_off
                                        availOutBefore); // out_len
    } while (!this._hadError && callback(res[0], res[1]));

    if (this._hadError) {
      throw error;
    }

    var buf = Buffer.concat(buffers, nread);
    this.close();

    return buf;
  }

  var req = this._binding.write(flushFlag,
                                chunk, // in
                                inOff, // in_off
                                availInBefore, // in_len
                                this._buffer, // out
                                this._offset, //out_off
                                availOutBefore); // out_len

  req.buffer = chunk;
  req.callback = callback;

  function callback(availInAfter, availOutAfter) {
    if (self._hadError)
      return;

    var have = availOutBefore - availOutAfter;
    assert(have >= 0, 'have should not go down');

    if (have > 0) {
      var out = self._buffer.slice(self._offset, self._offset + have);
      self._offset += have;
      // serve some output to the consumer.
      if (async) {
        self.push(out);
      } else {
        buffers.push(out);
        nread += out.length;
      }
    }

    // exhausted the output buffer, or used all the input create a new one.
    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
      availOutBefore = self._chunkSize;
      self._offset = 0;
      self._buffer = new Buffer(self._chunkSize);
    }

    if (availOutAfter === 0) {
      // Not actually done.  Need to reprocess.
      // Also, update the availInBefore to the availInAfter value,
      // so that if we have to hit it a third (fourth, etc.) time,
      // it'll have the correct byte counts.
      inOff += (availInBefore - availInAfter);
      availInBefore = availInAfter;

      if (!async)
        return true;

      var newReq = self._binding.write(flushFlag,
                                       chunk,
                                       inOff,
                                       availInBefore,
                                       self._buffer,
                                       self._offset,
                                       self._chunkSize);
      newReq.callback = callback; // this same function
      newReq.buffer = chunk;
      return;
    }

    if (!async)
      return false;

    // finished with the chunk.
    cb();
  }
};

inherits$1(Deflate, Zlib);
inherits$1(Inflate, Zlib);
inherits$1(Gzip, Zlib);
inherits$1(Gunzip, Zlib);
inherits$1(DeflateRaw, Zlib);
inherits$1(InflateRaw, Zlib);
inherits$1(Unzip, Zlib);

// @ts-check
/**
 * @class
 */

const crypto = require$$0;

class CryptoUtil {
  constructor (opt) {
    //this.tag = Buffer.alloc(0)
    this.opt = Object.assign(
      {
        key: crypto.randomBytes(32), // 32位的共享密钥
        iv: crypto.randomBytes(16), // 初始向量，16 字节
        algorithm: 'aes-256-gcm', // 加密算法和操作模式 aes-256-ecb等
        clearEncoding: 'utf8',
        cipherEncoding: 'base64',
        tag: Buffer.alloc(0)
      },
      opt
    );
    this.easyAES = {
      encrypt: function (data, key, iv, algorithm = 'aes-256-cfb', cipherEncoding = 'hex', clearEncoding = 'utf-8') {
        //If the next line is uncommented, the final cleartext is wrong.
        /*
          默认是使用的 PKCS7 填充模式（所以我们未指定填充模式也可以等到跟 Java 相同的加密结果）
        */
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, cipherEncoding), Buffer.from(iv, cipherEncoding));
        let str = cipher.update(data, clearEncoding, cipherEncoding);
        str += cipher.final(cipherEncoding);
        return str
      },
      decrypt: function (data, key, iv, algorithm = 'aes-256-cfb', cipherEncoding = 'hex', clearEncoding = 'utf-8') {
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, cipherEncoding), Buffer.from(iv, cipherEncoding));
        let str = decipher.update(data, cipherEncoding, clearEncoding);
        str += decipher.final(clearEncoding);
        return str
      }
    };
  }
  /**
   * 解密
   * @return {string}
   */

  decrypt (data, key, vi, tag) {
    // 初始化解密算法
    const decipher = crypto.createDecipheriv(this.opt.algorithm, key ?? this.opt.key, vi ?? this.opt.iv);
    // 传入验证标签，验证密文的来源
    decipher.setAuthTag(tag || this.opt.tag);
    decipher.setAutoPadding(true);
    let decrypted = decipher.update(data, this.opt.cipherEncoding, this.opt.clearEncoding);
    decrypted += decipher.final(this.opt.clearEncoding);
    return { r: decrypted }
  }

  /**
   * 加密
   */
  encrypt (data, key, vi) {
    // 初始化加密算法
    const cipher = crypto.createCipheriv(this.opt.algorithm, key ?? this.opt.key, vi ?? this.opt.iv);
    cipher.setAutoPadding(true);
    let encrypted = cipher.update(data, this.opt.clearEncoding, this.opt.cipherEncoding);
    encrypted += cipher.final(this.opt.cipherEncoding);
    // 使用GCM，CCM和OCB时需要AuthTag
    return { r: encrypted, tag: cipher.getAuthTag() }
  }
}

var CryptoExt = CryptoUtil;

var buf$1;
var hasRequiredBuf;

function requireBuf () {
	if (hasRequiredBuf) return buf$1;
	hasRequiredBuf = 1;
	// @ts-check
	/**
	 * @namespace buf
	 */

	const zero = Buffer.from([0x0]); // 0x0
	// 按指定字符拆分buffer
	const split = (a = [], spl = zero) => {
	  const arr = [];
	  let [cur, n] = [0, 0];
	  while ((n = a.indexOf(spl, cur)) !== -1) {
	    arr.push(a.slice(cur, n));
	    cur = n + spl.length;
	  }
	  arr.push(a.slice(cur));
	  return arr
	};
	// 按指定字符合并buffer
	const join = (a = [], splitElm = zero) => {
	  return a.reduce((x, y) => x.contact(splitElm).contact(y))
	};

	buf$1 = {
	  join,
	  split,
	  zero
	};
	return buf$1;
}

/* istanbul ignore next */

const { ext, array, date, number, string } = prototypeExt;
const bench = bench_1;
const Pack = require$$2$2;
const tools = tools_1;
const c = tools.c;

const getGlobal = function () {
  // 普通解决方案但并不完美
  if (typeof self !== 'undefined') {
    return self
  }
  if (typeof window !== 'undefined') {
    return window
  }
  if (typeof commonjsGlobal !== 'undefined') {
    return commonjsGlobal
  }
};
const globalThis$1 = getGlobal();

/**
 * @description 合并两个对象，与 Object.assign 类似，但只能合并两个
 * @param {object} a a对象，将b对象的可枚举属性复制到此对象，如果a对象已有相同属性，将被覆盖
 * @param {object} b b对象，不会修改此对象
 * @return {object} a对象，此方法并不会生成新对象
 * */

const option = {
  logTime: true
};

/**
 * 获取错误堆栈跟踪数据
 * @return string
 * */

const getStackTrace = function () {
  const obj = {};
  Error.captureStackTrace(obj, getStackTrace);
  return obj.stack
};
const os = process.platform;
const re = os.includes('win32') ? /\\(.+)\.js:(\d+:\d+)/g : /\/(.+)\.js:(\d+:\d+)/g;
const trace = console;

/**
 * @param {...any[]} args 要打印的参数
 * */

const log = function log (...args) {
  getStackTrace()
    .split('\n')[2]
    .match(re);
  const s = ' [' + c.dimg(RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '')) + ']';
  let str = '';
  for (let item of args) {
    if (typeof item === 'object') {
      str = str + JSON.stringify(item) + ' ';
    } else {
      str = str + item + ' ';
    }
  }
  trace.log(str + (option.logTime ? s : ''));
  return 1
};

/**
 * @param {...any[]} args 要打印的参数
 * */

const err = function err (...args) {
  getStackTrace()
    .split('\n')[2]
    .match(re);
  const s = ' [' + c.dimr(RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '')) + ']';
  let str = '';
  for (let item of args) {
    if (typeof item === 'object') {
      str = str + JSON.stringify(item) + ' ';
    } else {
      str = str + item + ' ';
    }
  }
  trace.error(str + (option.logTime ? s : ''));
  return 1
};

function strColor (k, v) {
  if (typeof v === 'bigint') {
    return '#green#' + v.toString() + 'n' + '#none#'
  }

  if (typeof v === 'function') {
    return `[function ${k}]`
  }
  if (Object.prototype.toString.call(v) === '[object RegExp]') {
    return '#cyan#' + v + '#none#'
  }
  return v
}

/**
 * dir json着色函数.
 * @param {...array<any>} args 任何参数
 */

const dir = function dir (...args) {
  for (let item of args) {
    let ss = JSON.stringify(item, strColor, 4);
    ss = ss
      .replace('#none#', c.none)
      .replace('#cyan#', c.cyan)
      .replace('#green#', c.green)
      .replace(/"(.+)": /g, c.g('$1') + ': ')
      .replace(/(true)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/(false)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/"(.+)",\n/g, '"' + c.m('$1') + '",\n')
      .replace(/"(.+)"\n/g, '"' + c.m('$1') + '"\n')
      .replace(/([0-9.]+),\n/g, c.y('$1') + ',\n')
      .replace(/([0-9.]+)\n/g, c.y('$1') + '\n')
      .replace(/,\n/g, c.y(',\n'))
      .replace(/("|{|}|[|])/g, c.y('$1'));
    console.log(ss);
  }
  return args
};

/**
 * 返回一个sort函数，用于给对象数组根据某字段排序，类似sql中的order by
 * @param {String} k 排序根据的k
 * @param {String} order 可选 desc|asc
 * @return function
 * @example
 * [{ 'name': 'a', lev: 1 }, { name: 'b', lev: 2 }].sort($.compare('lev', 'desc'))
 * // [{ name: 'b', lev: 2 }, { 'name': 'a', lev: 1 }]
 * */

function compare (k, order) {
  return function (a, b) {
    return order === 'desc' ? b[k] - a[k] : a[k] - b[k] // ~~(a[k] < b[k]) : ~~(a[k] > b[k])
  }
}

/**
 * setTimeout的promise版
 * @param {Number} t 毫秒
 * @return Promise
 * @example
 * await $.wait(5000)
 * */

const wait = function (t) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, t);
  })
};

const math = math$1;
const matAdv = mathMatrixAdv;
Object.assign(math, matAdv);
const fake = fake$2;
const file = file$1;
const reg = reg_1;
const tpl = tpl$2.exports;
const color = color$1.exports;
const requireAll = requireDir;
const Snowflake = Snowflake_1;
const ml = ml$1; // requireAll({ dirname: path.join(__dirname, '.', 'lib', 'ml') })

const Spinner = Spinner_1;
const Mock = Mock$1;
const qrcode = qrcode$1;
const geo = geo_1;
const cryptoExt = CryptoExt;
let buf;
if (Buffer !== undefined) {
  buf = requireBuf();
} else {
  buf = {};
}

/**
 * 把数组里的函数挨个执行，并且把前面函数的返回值传给下一个函数
 * @param {any} [funcs]
 * @return void 0
 * @example
 * $.pipe(arg=>{return arg.push(1)},arg=>{return arg.push(2))([0])
 * // [0,1,2]
 * */

const pipe = (...funcs) => arg => funcs.reduce((p, fn) => fn(p), arg);

/**
 * @description 处理JSON
 * @prop {function} parse 把JSON字符串解析为js对象
 * @prop {function} stringify JSON.stringify的别名
 * */

const json = {
  parse: function (s) {
    return Function('return ' + s)()
  }, // 为了解决key没有双引号
  stringify: JSON.stringify
};
const to = function (p, diyErrCode = {}, okCode = null) {
  return p
    .then(d => [okCode, d])
    .catch(err => {
      return [Object.assign(err, diyErrCode), null]
    })
};

/**
 * new Date 的别名，禁止输入参数
 * @return Date 当前时间
 * */

const now = () => new Date();

globalThis$1.isMeekoLoad && console.log(c.g('✔'), `Meeko (${c.y(Pack.version)}) ${c.g('https://github.com/kongnet/meeko.git')}`);
globalThis$1.isMeekoLoad = true;
const exportObj = {
  // _proto_,
  array,
  date,
  number,
  string,
  bench,
  benchmark: bench.benchmark,
  buf,
  c,
  color,
  compare,
  Crypto: cryptoExt,
  dir,
  drawTable: tools.drawTable,
  err,
  ext,
  fake,
  file,
  getStackTrace,
  geo,
  json,
  log,
  math,
  Mock,
  now,
  option,
  pipe,
  qrcode,
  reg,
  requireAll,
  Snowflake,
  ml,
  Spinner,
  tools,
  tpl,
  to,
  wait
};
var meeko = exportObj;

export { meeko as default };
