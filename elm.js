var Elm = Elm || { Native: {} };
Elm.Agent = Elm.Agent || {};
Elm.Agent.make = function (_elm) {
   "use strict";
   _elm.Agent = _elm.Agent || {};
   if (_elm.Agent.values)
   return _elm.Agent.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Agent",
   $Basics = Elm.Basics.make(_elm),
   $Graph = Elm.Graph.make(_elm),
   $Helpers = Elm.Helpers.make(_elm),
   $IntDict = Elm.IntDict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Types = Elm.Types.make(_elm);
   var changeEdge = F2(function (agent,
   nid) {
      return function () {
         var _v0 = agent.kind;
         switch (_v0.ctor)
         {case "Bus":
            return $Helpers.getOrFail(A2($Basics._op["++"],
              "Bus can\'t find where to go after node ",
              A2($Basics._op["++"],
              $Basics.toString(nid),
              A2($Basics._op["++"],
              " in ",
              $Basics.toString($IntDict.toList(_v0._0))))))(A2($IntDict.get,
              nid,
              _v0._0));
            case "Car":
            return $Maybe.withDefault(10000)(A2($IntDict.get,
              nid,
              _v0._0));}
         _U.badCase($moduleName,
         "between lines 18 and 20");
      }();
   });
   var translate = F2(function (agent,
   maxTravelled) {
      return function () {
         var limit = maxTravelled;
         var newPos = A2($Basics.min,
         agent.travelled + agent.speed,
         limit);
         return _U.replace([["travelled"
                            ,newPos]
                           ,["totalDist"
                            ,agent.totalDist + (newPos - agent.travelled)]],
         agent);
      }();
   });
   var move = F5(function (ctx,
   from,
   road,
   agent,
   maxTravelled) {
      return function () {
         var moved = A2(translate,
         agent,
         maxTravelled);
         return _U.cmp(moved.travelled,
         road.length) > 0 ? A2($Types.canMoveThrough,
         agent,
         ctx.node.label) ? function () {
            var remainder = moved.travelled - road.length;
            return {ctor: "_Tuple2"
                   ,_0: {ctor: "_Tuple2"
                        ,_0: ctx.node.id
                        ,_1: A2(changeEdge,
                        agent,
                        ctx.node.id)}
                   ,_1: _U.replace([["travelled"
                                    ,remainder]
                                   ,["lastEdge"
                                    ,$Maybe.Just({ctor: "_Tuple2"
                                                 ,_0: from
                                                 ,_1: ctx.node.id})]],
                   agent)};
         }() : {ctor: "_Tuple2"
               ,_0: {ctor: "_Tuple2"
                    ,_0: from
                    ,_1: ctx.node.id}
               ,_1: _U.replace([["travelled"
                                ,road.length]],
               agent)} : {ctor: "_Tuple2"
                         ,_0: {ctor: "_Tuple2"
                              ,_0: from
                              ,_1: ctx.node.id}
                         ,_1: moved};
      }();
   });
   _elm.Agent.values = {_op: _op
                       ,translate: translate
                       ,changeEdge: changeEdge
                       ,move: move};
   return _elm.Agent.values;
};
Elm.Basics = Elm.Basics || {};
Elm.Basics.make = function (_elm) {
   "use strict";
   _elm.Basics = _elm.Basics || {};
   if (_elm.Basics.values)
   return _elm.Basics.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Basics",
   $Native$Basics = Elm.Native.Basics.make(_elm),
   $Native$Show = Elm.Native.Show.make(_elm),
   $Native$Utils = Elm.Native.Utils.make(_elm);
   var uncurry = F2(function (f,
   _v0) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2": return A2(f,
              _v0._0,
              _v0._1);}
         _U.badCase($moduleName,
         "on line 595, column 3 to 8");
      }();
   });
   var curry = F3(function (f,
   a,
   b) {
      return f({ctor: "_Tuple2"
               ,_0: a
               ,_1: b});
   });
   var flip = F3(function (f,b,a) {
      return A2(f,a,b);
   });
   var snd = function (_v4) {
      return function () {
         switch (_v4.ctor)
         {case "_Tuple2": return _v4._1;}
         _U.badCase($moduleName,
         "on line 573, column 3 to 4");
      }();
   };
   var fst = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "_Tuple2": return _v8._0;}
         _U.badCase($moduleName,
         "on line 567, column 3 to 4");
      }();
   };
   var always = F2(function (a,
   _v12) {
      return function () {
         return a;
      }();
   });
   var identity = function (x) {
      return x;
   };
   _op["<|"] = F2(function (f,x) {
      return f(x);
   });
   _op["|>"] = F2(function (x,f) {
      return f(x);
   });
   _op[">>"] = F3(function (f,
   g,
   x) {
      return g(f(x));
   });
   _op["<<"] = F3(function (g,
   f,
   x) {
      return g(f(x));
   });
   _op["++"] = $Native$Utils.append;
   var toString = $Native$Show.toString;
   var isInfinite = $Native$Basics.isInfinite;
   var isNaN = $Native$Basics.isNaN;
   var toFloat = $Native$Basics.toFloat;
   var ceiling = $Native$Basics.ceiling;
   var floor = $Native$Basics.floor;
   var truncate = $Native$Basics.truncate;
   var round = $Native$Basics.round;
   var otherwise = true;
   var not = $Native$Basics.not;
   var xor = $Native$Basics.xor;
   _op["||"] = $Native$Basics.or;
   _op["&&"] = $Native$Basics.and;
   var max = $Native$Basics.max;
   var min = $Native$Basics.min;
   var GT = {ctor: "GT"};
   var EQ = {ctor: "EQ"};
   var LT = {ctor: "LT"};
   var compare = $Native$Basics.compare;
   _op[">="] = $Native$Basics.ge;
   _op["<="] = $Native$Basics.le;
   _op[">"] = $Native$Basics.gt;
   _op["<"] = $Native$Basics.lt;
   _op["/="] = $Native$Basics.neq;
   _op["=="] = $Native$Basics.eq;
   var e = $Native$Basics.e;
   var pi = $Native$Basics.pi;
   var clamp = $Native$Basics.clamp;
   var logBase = $Native$Basics.logBase;
   var abs = $Native$Basics.abs;
   var negate = $Native$Basics.negate;
   var sqrt = $Native$Basics.sqrt;
   var atan2 = $Native$Basics.atan2;
   var atan = $Native$Basics.atan;
   var asin = $Native$Basics.asin;
   var acos = $Native$Basics.acos;
   var tan = $Native$Basics.tan;
   var sin = $Native$Basics.sin;
   var cos = $Native$Basics.cos;
   _op["^"] = $Native$Basics.exp;
   _op["%"] = $Native$Basics.mod;
   var rem = $Native$Basics.rem;
   _op["//"] = $Native$Basics.div;
   _op["/"] = $Native$Basics.floatDiv;
   _op["*"] = $Native$Basics.mul;
   _op["-"] = $Native$Basics.sub;
   _op["+"] = $Native$Basics.add;
   var toPolar = $Native$Basics.toPolar;
   var fromPolar = $Native$Basics.fromPolar;
   var turns = $Native$Basics.turns;
   var degrees = $Native$Basics.degrees;
   var radians = function (t) {
      return t;
   };
   _elm.Basics.values = {_op: _op
                        ,max: max
                        ,min: min
                        ,compare: compare
                        ,not: not
                        ,xor: xor
                        ,otherwise: otherwise
                        ,rem: rem
                        ,negate: negate
                        ,abs: abs
                        ,sqrt: sqrt
                        ,clamp: clamp
                        ,logBase: logBase
                        ,e: e
                        ,pi: pi
                        ,cos: cos
                        ,sin: sin
                        ,tan: tan
                        ,acos: acos
                        ,asin: asin
                        ,atan: atan
                        ,atan2: atan2
                        ,round: round
                        ,floor: floor
                        ,ceiling: ceiling
                        ,truncate: truncate
                        ,toFloat: toFloat
                        ,degrees: degrees
                        ,radians: radians
                        ,turns: turns
                        ,toPolar: toPolar
                        ,fromPolar: fromPolar
                        ,isNaN: isNaN
                        ,isInfinite: isInfinite
                        ,toString: toString
                        ,fst: fst
                        ,snd: snd
                        ,identity: identity
                        ,always: always
                        ,flip: flip
                        ,curry: curry
                        ,uncurry: uncurry
                        ,LT: LT
                        ,EQ: EQ
                        ,GT: GT};
   return _elm.Basics.values;
};
Elm.Bitwise = Elm.Bitwise || {};
Elm.Bitwise.make = function (_elm) {
   "use strict";
   _elm.Bitwise = _elm.Bitwise || {};
   if (_elm.Bitwise.values)
   return _elm.Bitwise.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Bitwise",
   $Native$Bitwise = Elm.Native.Bitwise.make(_elm);
   var shiftRightLogical = $Native$Bitwise.shiftRightLogical;
   var shiftRight = $Native$Bitwise.shiftRightArithmatic;
   var shiftLeft = $Native$Bitwise.shiftLeft;
   var complement = $Native$Bitwise.complement;
   var xor = $Native$Bitwise.xor;
   var or = $Native$Bitwise.or;
   var and = $Native$Bitwise.and;
   _elm.Bitwise.values = {_op: _op
                         ,and: and
                         ,or: or
                         ,xor: xor
                         ,complement: complement
                         ,shiftLeft: shiftLeft
                         ,shiftRight: shiftRight
                         ,shiftRightLogical: shiftRightLogical};
   return _elm.Bitwise.values;
};
Elm.Char = Elm.Char || {};
Elm.Char.make = function (_elm) {
   "use strict";
   _elm.Char = _elm.Char || {};
   if (_elm.Char.values)
   return _elm.Char.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Char",
   $Basics = Elm.Basics.make(_elm),
   $Native$Char = Elm.Native.Char.make(_elm);
   var fromCode = $Native$Char.fromCode;
   var toCode = $Native$Char.toCode;
   var toLocaleLower = $Native$Char.toLocaleLower;
   var toLocaleUpper = $Native$Char.toLocaleUpper;
   var toLower = $Native$Char.toLower;
   var toUpper = $Native$Char.toUpper;
   var isBetween = F3(function (low,
   high,
   $char) {
      return function () {
         var code = toCode($char);
         return _U.cmp(code,
         toCode(low)) > -1 && _U.cmp(code,
         toCode(high)) < 1;
      }();
   });
   var isUpper = A2(isBetween,
   _U.chr("A"),
   _U.chr("Z"));
   var isLower = A2(isBetween,
   _U.chr("a"),
   _U.chr("z"));
   var isDigit = A2(isBetween,
   _U.chr("0"),
   _U.chr("9"));
   var isOctDigit = A2(isBetween,
   _U.chr("0"),
   _U.chr("7"));
   var isHexDigit = function ($char) {
      return isDigit($char) || (A3(isBetween,
      _U.chr("a"),
      _U.chr("f"),
      $char) || A3(isBetween,
      _U.chr("A"),
      _U.chr("F"),
      $char));
   };
   _elm.Char.values = {_op: _op
                      ,isUpper: isUpper
                      ,isLower: isLower
                      ,isDigit: isDigit
                      ,isOctDigit: isOctDigit
                      ,isHexDigit: isHexDigit
                      ,toUpper: toUpper
                      ,toLower: toLower
                      ,toLocaleUpper: toLocaleUpper
                      ,toLocaleLower: toLocaleLower
                      ,toCode: toCode
                      ,fromCode: fromCode};
   return _elm.Char.values;
};
Elm.Color = Elm.Color || {};
Elm.Color.make = function (_elm) {
   "use strict";
   _elm.Color = _elm.Color || {};
   if (_elm.Color.values)
   return _elm.Color.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Color",
   $Basics = Elm.Basics.make(_elm);
   var Radial = F5(function (a,
   b,
   c,
   d,
   e) {
      return {ctor: "Radial"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d
             ,_4: e};
   });
   var radial = Radial;
   var Linear = F3(function (a,
   b,
   c) {
      return {ctor: "Linear"
             ,_0: a
             ,_1: b
             ,_2: c};
   });
   var linear = Linear;
   var fmod = F2(function (f,n) {
      return function () {
         var integer = $Basics.floor(f);
         return $Basics.toFloat(A2($Basics._op["%"],
         integer,
         n)) + f - $Basics.toFloat(integer);
      }();
   });
   var rgbToHsl = F3(function (red,
   green,
   blue) {
      return function () {
         var b = $Basics.toFloat(blue) / 255;
         var g = $Basics.toFloat(green) / 255;
         var r = $Basics.toFloat(red) / 255;
         var cMax = A2($Basics.max,
         A2($Basics.max,r,g),
         b);
         var cMin = A2($Basics.min,
         A2($Basics.min,r,g),
         b);
         var c = cMax - cMin;
         var lightness = (cMax + cMin) / 2;
         var saturation = _U.eq(lightness,
         0) ? 0 : c / (1 - $Basics.abs(2 * lightness - 1));
         var hue = $Basics.degrees(60) * (_U.eq(cMax,
         r) ? A2(fmod,
         (g - b) / c,
         6) : _U.eq(cMax,
         g) ? (b - r) / c + 2 : _U.eq(cMax,
         b) ? (r - g) / c + 4 : _U.badIf($moduleName,
         "between lines 150 and 152"));
         return {ctor: "_Tuple3"
                ,_0: hue
                ,_1: saturation
                ,_2: lightness};
      }();
   });
   var hslToRgb = F3(function (hue,
   saturation,
   lightness) {
      return function () {
         var hue$ = hue / $Basics.degrees(60);
         var chroma = (1 - $Basics.abs(2 * lightness - 1)) * saturation;
         var x = chroma * (1 - $Basics.abs(A2(fmod,
         hue$,
         2) - 1));
         var $ = _U.cmp(hue$,
         0) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: 0
                  ,_2: 0} : _U.cmp(hue$,
         1) < 0 ? {ctor: "_Tuple3"
                  ,_0: chroma
                  ,_1: x
                  ,_2: 0} : _U.cmp(hue$,
         2) < 0 ? {ctor: "_Tuple3"
                  ,_0: x
                  ,_1: chroma
                  ,_2: 0} : _U.cmp(hue$,
         3) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: chroma
                  ,_2: x} : _U.cmp(hue$,
         4) < 0 ? {ctor: "_Tuple3"
                  ,_0: 0
                  ,_1: x
                  ,_2: chroma} : _U.cmp(hue$,
         5) < 0 ? {ctor: "_Tuple3"
                  ,_0: x
                  ,_1: 0
                  ,_2: chroma} : _U.cmp(hue$,
         6) < 0 ? {ctor: "_Tuple3"
                  ,_0: chroma
                  ,_1: 0
                  ,_2: x} : {ctor: "_Tuple3"
                            ,_0: 0
                            ,_1: 0
                            ,_2: 0},
         r = $._0,
         g = $._1,
         b = $._2;
         var m = lightness - chroma / 2;
         return {ctor: "_Tuple3"
                ,_0: r + m
                ,_1: g + m
                ,_2: b + m};
      }();
   });
   var toRgb = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA":
            return function () {
                 var $ = A3(hslToRgb,
                 color._0,
                 color._1,
                 color._2),
                 r = $._0,
                 g = $._1,
                 b = $._2;
                 return {_: {}
                        ,alpha: color._3
                        ,blue: $Basics.round(255 * b)
                        ,green: $Basics.round(255 * g)
                        ,red: $Basics.round(255 * r)};
              }();
            case "RGBA": return {_: {}
                                ,alpha: color._3
                                ,blue: color._2
                                ,green: color._1
                                ,red: color._0};}
         _U.badCase($moduleName,
         "between lines 124 and 132");
      }();
   };
   var toHsl = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA": return {_: {}
                              ,alpha: color._3
                              ,hue: color._0
                              ,lightness: color._2
                              ,saturation: color._1};
            case "RGBA":
            return function () {
                 var $ = A3(rgbToHsl,
                 color._0,
                 color._1,
                 color._2),
                 h = $._0,
                 s = $._1,
                 l = $._2;
                 return {_: {}
                        ,alpha: color._3
                        ,hue: h
                        ,lightness: l
                        ,saturation: s};
              }();}
         _U.badCase($moduleName,
         "between lines 114 and 118");
      }();
   };
   var HSLA = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "HSLA"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var hsla = F4(function (hue,
   saturation,
   lightness,
   alpha) {
      return A4(HSLA,
      hue - $Basics.turns($Basics.toFloat($Basics.floor(hue / (2 * $Basics.pi)))),
      saturation,
      lightness,
      alpha);
   });
   var hsl = F3(function (hue,
   saturation,
   lightness) {
      return A4(hsla,
      hue,
      saturation,
      lightness,
      1);
   });
   var complement = function (color) {
      return function () {
         switch (color.ctor)
         {case "HSLA": return A4(hsla,
              color._0 + $Basics.degrees(180),
              color._1,
              color._2,
              color._3);
            case "RGBA":
            return function () {
                 var $ = A3(rgbToHsl,
                 color._0,
                 color._1,
                 color._2),
                 h = $._0,
                 s = $._1,
                 l = $._2;
                 return A4(hsla,
                 h + $Basics.degrees(180),
                 s,
                 l,
                 color._3);
              }();}
         _U.badCase($moduleName,
         "between lines 105 and 108");
      }();
   };
   var grayscale = function (p) {
      return A4(HSLA,0,0,1 - p,1);
   };
   var greyscale = function (p) {
      return A4(HSLA,0,0,1 - p,1);
   };
   var RGBA = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "RGBA"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var rgba = RGBA;
   var rgb = F3(function (r,g,b) {
      return A4(RGBA,r,g,b,1);
   });
   var lightRed = A4(RGBA,
   239,
   41,
   41,
   1);
   var red = A4(RGBA,204,0,0,1);
   var darkRed = A4(RGBA,
   164,
   0,
   0,
   1);
   var lightOrange = A4(RGBA,
   252,
   175,
   62,
   1);
   var orange = A4(RGBA,
   245,
   121,
   0,
   1);
   var darkOrange = A4(RGBA,
   206,
   92,
   0,
   1);
   var lightYellow = A4(RGBA,
   255,
   233,
   79,
   1);
   var yellow = A4(RGBA,
   237,
   212,
   0,
   1);
   var darkYellow = A4(RGBA,
   196,
   160,
   0,
   1);
   var lightGreen = A4(RGBA,
   138,
   226,
   52,
   1);
   var green = A4(RGBA,
   115,
   210,
   22,
   1);
   var darkGreen = A4(RGBA,
   78,
   154,
   6,
   1);
   var lightBlue = A4(RGBA,
   114,
   159,
   207,
   1);
   var blue = A4(RGBA,
   52,
   101,
   164,
   1);
   var darkBlue = A4(RGBA,
   32,
   74,
   135,
   1);
   var lightPurple = A4(RGBA,
   173,
   127,
   168,
   1);
   var purple = A4(RGBA,
   117,
   80,
   123,
   1);
   var darkPurple = A4(RGBA,
   92,
   53,
   102,
   1);
   var lightBrown = A4(RGBA,
   233,
   185,
   110,
   1);
   var brown = A4(RGBA,
   193,
   125,
   17,
   1);
   var darkBrown = A4(RGBA,
   143,
   89,
   2,
   1);
   var black = A4(RGBA,0,0,0,1);
   var white = A4(RGBA,
   255,
   255,
   255,
   1);
   var lightGrey = A4(RGBA,
   238,
   238,
   236,
   1);
   var grey = A4(RGBA,
   211,
   215,
   207,
   1);
   var darkGrey = A4(RGBA,
   186,
   189,
   182,
   1);
   var lightGray = A4(RGBA,
   238,
   238,
   236,
   1);
   var gray = A4(RGBA,
   211,
   215,
   207,
   1);
   var darkGray = A4(RGBA,
   186,
   189,
   182,
   1);
   var lightCharcoal = A4(RGBA,
   136,
   138,
   133,
   1);
   var charcoal = A4(RGBA,
   85,
   87,
   83,
   1);
   var darkCharcoal = A4(RGBA,
   46,
   52,
   54,
   1);
   _elm.Color.values = {_op: _op
                       ,rgb: rgb
                       ,rgba: rgba
                       ,hsl: hsl
                       ,hsla: hsla
                       ,greyscale: greyscale
                       ,grayscale: grayscale
                       ,complement: complement
                       ,linear: linear
                       ,radial: radial
                       ,toRgb: toRgb
                       ,toHsl: toHsl
                       ,red: red
                       ,orange: orange
                       ,yellow: yellow
                       ,green: green
                       ,blue: blue
                       ,purple: purple
                       ,brown: brown
                       ,lightRed: lightRed
                       ,lightOrange: lightOrange
                       ,lightYellow: lightYellow
                       ,lightGreen: lightGreen
                       ,lightBlue: lightBlue
                       ,lightPurple: lightPurple
                       ,lightBrown: lightBrown
                       ,darkRed: darkRed
                       ,darkOrange: darkOrange
                       ,darkYellow: darkYellow
                       ,darkGreen: darkGreen
                       ,darkBlue: darkBlue
                       ,darkPurple: darkPurple
                       ,darkBrown: darkBrown
                       ,white: white
                       ,lightGrey: lightGrey
                       ,grey: grey
                       ,darkGrey: darkGrey
                       ,lightCharcoal: lightCharcoal
                       ,charcoal: charcoal
                       ,darkCharcoal: darkCharcoal
                       ,black: black
                       ,lightGray: lightGray
                       ,gray: gray
                       ,darkGray: darkGray};
   return _elm.Color.values;
};
Elm.Debug = Elm.Debug || {};
Elm.Debug.make = function (_elm) {
   "use strict";
   _elm.Debug = _elm.Debug || {};
   if (_elm.Debug.values)
   return _elm.Debug.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Debug",
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm);
   var trace = $Native$Debug.tracePath;
   var watchSummary = $Native$Debug.watchSummary;
   var watch = $Native$Debug.watch;
   var crash = $Native$Debug.crash;
   var log = $Native$Debug.log;
   _elm.Debug.values = {_op: _op
                       ,log: log
                       ,crash: crash
                       ,watch: watch
                       ,watchSummary: watchSummary
                       ,trace: trace};
   return _elm.Debug.values;
};
Elm.Dict = Elm.Dict || {};
Elm.Dict.make = function (_elm) {
   "use strict";
   _elm.Dict = _elm.Dict || {};
   if (_elm.Dict.values)
   return _elm.Dict.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Dict",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Debug = Elm.Native.Debug.make(_elm),
   $String = Elm.String.make(_elm);
   var foldr = F3(function (f,
   acc,
   t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            switch (t._0.ctor)
              {case "LBlack": return acc;}
              break;
            case "RBNode": return A3(foldr,
              f,
              A3(f,
              t._1,
              t._2,
              A3(foldr,f,acc,t._4)),
              t._3);}
         _U.badCase($moduleName,
         "between lines 417 and 421");
      }();
   });
   var keys = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      keyList) {
         return A2($List._op["::"],
         key,
         keyList);
      }),
      _L.fromArray([]),
      dict);
   };
   var values = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      valueList) {
         return A2($List._op["::"],
         value,
         valueList);
      }),
      _L.fromArray([]),
      dict);
   };
   var toList = function (dict) {
      return A3(foldr,
      F3(function (key,value,list) {
         return A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: key
         ,_1: value},
         list);
      }),
      _L.fromArray([]),
      dict);
   };
   var foldl = F3(function (f,
   acc,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack": return acc;}
              break;
            case "RBNode": return A3(foldl,
              f,
              A3(f,
              dict._1,
              dict._2,
              A3(foldl,f,acc,dict._3)),
              dict._4);}
         _U.badCase($moduleName,
         "between lines 406 and 410");
      }();
   });
   var isBBlack = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBBlack": return true;}
              break;
            case "RBNode":
            switch (dict._0.ctor)
              {case "BBlack": return true;}
              break;}
         return false;
      }();
   };
   var showFlag = function (f) {
      return function () {
         switch (f.ctor)
         {case "Insert": return "Insert";
            case "Remove": return "Remove";
            case "Same": return "Same";}
         _U.badCase($moduleName,
         "between lines 182 and 185");
      }();
   };
   var Same = {ctor: "Same"};
   var Remove = {ctor: "Remove"};
   var Insert = {ctor: "Insert"};
   var get = F2(function (targetKey,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return $Maybe.Nothing;}
              break;
            case "RBNode":
            return function () {
                 var _v29 = A2($Basics.compare,
                 targetKey,
                 dict._1);
                 switch (_v29.ctor)
                 {case "EQ":
                    return $Maybe.Just(dict._2);
                    case "GT": return A2(get,
                      targetKey,
                      dict._4);
                    case "LT": return A2(get,
                      targetKey,
                      dict._3);}
                 _U.badCase($moduleName,
                 "between lines 129 and 132");
              }();}
         _U.badCase($moduleName,
         "between lines 124 and 132");
      }();
   });
   var member = F2(function (key,
   dict) {
      return function () {
         var _v30 = A2(get,key,dict);
         switch (_v30.ctor)
         {case "Just": return true;
            case "Nothing": return false;}
         _U.badCase($moduleName,
         "between lines 138 and 140");
      }();
   });
   var max = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            return $Native$Debug.crash("(max Empty) is not defined");
            case "RBNode":
            switch (dict._4.ctor)
              {case "RBEmpty":
                 return {ctor: "_Tuple2"
                        ,_0: dict._1
                        ,_1: dict._2};}
              return max(dict._4);}
         _U.badCase($moduleName,
         "between lines 100 and 108");
      }();
   };
   var min = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return $Native$Debug.crash("(min Empty) is not defined");}
              break;
            case "RBNode":
            switch (dict._3.ctor)
              {case "RBEmpty":
                 switch (dict._3._0.ctor)
                   {case "LBlack":
                      return {ctor: "_Tuple2"
                             ,_0: dict._1
                             ,_1: dict._2};}
                   break;}
              return min(dict._3);}
         _U.badCase($moduleName,
         "between lines 87 and 95");
      }();
   };
   var RBEmpty = function (a) {
      return {ctor: "RBEmpty"
             ,_0: a};
   };
   var RBNode = F5(function (a,
   b,
   c,
   d,
   e) {
      return {ctor: "RBNode"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d
             ,_4: e};
   });
   var showLColor = function (color) {
      return function () {
         switch (color.ctor)
         {case "LBBlack":
            return "LBBlack";
            case "LBlack": return "LBlack";}
         _U.badCase($moduleName,
         "between lines 70 and 72");
      }();
   };
   var LBBlack = {ctor: "LBBlack"};
   var LBlack = {ctor: "LBlack"};
   var empty = RBEmpty(LBlack);
   var isEmpty = function (dict) {
      return _U.eq(dict,empty);
   };
   var map = F2(function (f,dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack":
                 return RBEmpty(LBlack);}
              break;
            case "RBNode": return A5(RBNode,
              dict._0,
              dict._1,
              A2(f,dict._1,dict._2),
              A2(map,f,dict._3),
              A2(map,f,dict._4));}
         _U.badCase($moduleName,
         "between lines 394 and 399");
      }();
   });
   var showNColor = function (c) {
      return function () {
         switch (c.ctor)
         {case "BBlack": return "BBlack";
            case "Black": return "Black";
            case "NBlack": return "NBlack";
            case "Red": return "Red";}
         _U.badCase($moduleName,
         "between lines 56 and 60");
      }();
   };
   var reportRemBug = F4(function (msg,
   c,
   lgot,
   rgot) {
      return $Native$Debug.crash($String.concat(_L.fromArray(["Internal red-black tree invariant violated, expected "
                                                             ,msg
                                                             ," and got "
                                                             ,showNColor(c)
                                                             ,"/"
                                                             ,lgot
                                                             ,"/"
                                                             ,rgot
                                                             ,"\nPlease report this bug to <https://github.com/elm-lang/Elm/issues>"])));
   });
   var NBlack = {ctor: "NBlack"};
   var BBlack = {ctor: "BBlack"};
   var Black = {ctor: "Black"};
   var ensureBlackRoot = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBlack": return dict;}
              break;
            case "RBNode":
            switch (dict._0.ctor)
              {case "Black": return dict;
                 case "Red": return A5(RBNode,
                   Black,
                   dict._1,
                   dict._2,
                   dict._3,
                   dict._4);}
              break;}
         _U.badCase($moduleName,
         "between lines 154 and 162");
      }();
   };
   var blackish = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty": return true;
            case "RBNode":
            return _U.eq(t._0,
              Black) || _U.eq(t._0,BBlack);}
         _U.badCase($moduleName,
         "between lines 339 and 341");
      }();
   };
   var blacken = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            return RBEmpty(LBlack);
            case "RBNode": return A5(RBNode,
              Black,
              t._1,
              t._2,
              t._3,
              t._4);}
         _U.badCase($moduleName,
         "between lines 378 and 380");
      }();
   };
   var Red = {ctor: "Red"};
   var moreBlack = function (color) {
      return function () {
         switch (color.ctor)
         {case "BBlack":
            return $Native$Debug.crash("Can\'t make a double black node more black!");
            case "Black": return BBlack;
            case "NBlack": return Red;
            case "Red": return Black;}
         _U.badCase($moduleName,
         "between lines 244 and 248");
      }();
   };
   var lessBlack = function (color) {
      return function () {
         switch (color.ctor)
         {case "BBlack": return Black;
            case "Black": return Red;
            case "NBlack":
            return $Native$Debug.crash("Can\'t make a negative black node less black!");
            case "Red": return NBlack;}
         _U.badCase($moduleName,
         "between lines 253 and 257");
      }();
   };
   var lessBlackTree = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "RBEmpty":
            switch (dict._0.ctor)
              {case "LBBlack":
                 return RBEmpty(LBlack);}
              break;
            case "RBNode": return A5(RBNode,
              lessBlack(dict._0),
              dict._1,
              dict._2,
              dict._3,
              dict._4);}
         _U.badCase($moduleName,
         "between lines 262 and 264");
      }();
   };
   var redden = function (t) {
      return function () {
         switch (t.ctor)
         {case "RBEmpty":
            return $Native$Debug.crash("can\'t make a Leaf red");
            case "RBNode": return A5(RBNode,
              Red,
              t._1,
              t._2,
              t._3,
              t._4);}
         _U.badCase($moduleName,
         "between lines 386 and 388");
      }();
   };
   var balance_node = function (t) {
      return function () {
         var assemble = function (col) {
            return function (xk) {
               return function (xv) {
                  return function (yk) {
                     return function (yv) {
                        return function (zk) {
                           return function (zv) {
                              return function (a) {
                                 return function (b) {
                                    return function (c) {
                                       return function (d) {
                                          return A5(RBNode,
                                          lessBlack(col),
                                          yk,
                                          yv,
                                          A5(RBNode,Black,xk,xv,a,b),
                                          A5(RBNode,Black,zk,zv,c,d));
                                       };
                                    };
                                 };
                              };
                           };
                        };
                     };
                  };
               };
            };
         };
         return blackish(t) ? function () {
            switch (t.ctor)
            {case "RBNode":
               switch (t._3.ctor)
                 {case "RBNode":
                    switch (t._3._0.ctor)
                      {case "Red":
                         switch (t._3._3.ctor)
                           {case "RBNode":
                              switch (t._3._3._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._3._3._1)(t._3._3._2)(t._3._1)(t._3._2)(t._1)(t._2)(t._3._3._3)(t._3._3._4)(t._3._4)(t._4);}
                                break;}
                           switch (t._3._4.ctor)
                           {case "RBNode":
                              switch (t._3._4._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._3._1)(t._3._2)(t._3._4._1)(t._3._4._2)(t._1)(t._2)(t._3._3)(t._3._4._3)(t._3._4._4)(t._4);}
                                break;}
                           break;}
                      break;}
                 switch (t._4.ctor)
                 {case "RBNode":
                    switch (t._4._0.ctor)
                      {case "Red":
                         switch (t._4._3.ctor)
                           {case "RBNode":
                              switch (t._4._3._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._1)(t._2)(t._4._3._1)(t._4._3._2)(t._4._1)(t._4._2)(t._3)(t._4._3._3)(t._4._3._4)(t._4._4);}
                                break;}
                           switch (t._4._4.ctor)
                           {case "RBNode":
                              switch (t._4._4._0.ctor)
                                {case "Red":
                                   return assemble(t._0)(t._1)(t._2)(t._4._1)(t._4._2)(t._4._4._1)(t._4._4._2)(t._3)(t._4._3)(t._4._4._3)(t._4._4._4);}
                                break;}
                           break;}
                      break;}
                 switch (t._0.ctor)
                 {case "BBlack":
                    switch (t._4.ctor)
                      {case "RBNode":
                         switch (t._4._0.ctor)
                           {case "NBlack":
                              switch (t._4._3.ctor)
                                {case "RBNode":
                                   switch (t._4._3._0.ctor)
                                     {case "Black":
                                        return function () {
                                             switch (t._4._4.ctor)
                                             {case "RBNode":
                                                switch (t._4._4._0.ctor)
                                                  {case "Black":
                                                     return A5(RBNode,
                                                       Black,
                                                       t._4._3._1,
                                                       t._4._3._2,
                                                       A5(RBNode,
                                                       Black,
                                                       t._1,
                                                       t._2,
                                                       t._3,
                                                       t._4._3._3),
                                                       A5(balance,
                                                       Black,
                                                       t._4._1,
                                                       t._4._2,
                                                       t._4._3._4,
                                                       redden(t._4._4)));}
                                                  break;}
                                             return t;
                                          }();}
                                     break;}
                                break;}
                           break;}
                      switch (t._3.ctor)
                      {case "RBNode":
                         switch (t._3._0.ctor)
                           {case "NBlack":
                              switch (t._3._4.ctor)
                                {case "RBNode":
                                   switch (t._3._4._0.ctor)
                                     {case "Black":
                                        return function () {
                                             switch (t._3._3.ctor)
                                             {case "RBNode":
                                                switch (t._3._3._0.ctor)
                                                  {case "Black":
                                                     return A5(RBNode,
                                                       Black,
                                                       t._3._4._1,
                                                       t._3._4._2,
                                                       A5(balance,
                                                       Black,
                                                       t._3._1,
                                                       t._3._2,
                                                       redden(t._3._3),
                                                       t._3._4._3),
                                                       A5(RBNode,
                                                       Black,
                                                       t._1,
                                                       t._2,
                                                       t._3._4._4,
                                                       t._4));}
                                                  break;}
                                             return t;
                                          }();}
                                     break;}
                                break;}
                           break;}
                      break;}
                 break;}
            return t;
         }() : t;
      }();
   };
   var balance = F5(function (c,
   k,
   v,
   l,
   r) {
      return balance_node(A5(RBNode,
      c,
      k,
      v,
      l,
      r));
   });
   var bubble = F5(function (c,
   k,
   v,
   l,
   r) {
      return isBBlack(l) || isBBlack(r) ? A5(balance,
      moreBlack(c),
      k,
      v,
      lessBlackTree(l),
      lessBlackTree(r)) : A5(RBNode,
      c,
      k,
      v,
      l,
      r);
   });
   var remove_max = F5(function (c,
   k,
   v,
   l,
   r) {
      return function () {
         switch (r.ctor)
         {case "RBEmpty": return A3(rem,
              c,
              l,
              r);
            case "RBNode": return A5(bubble,
              c,
              k,
              v,
              l,
              A5(remove_max,
              r._0,
              r._1,
              r._2,
              r._3,
              r._4));}
         _U.badCase($moduleName,
         "between lines 323 and 328");
      }();
   });
   var rem = F3(function (c,l,r) {
      return function () {
         var _v169 = {ctor: "_Tuple2"
                     ,_0: l
                     ,_1: r};
         switch (_v169.ctor)
         {case "_Tuple2":
            switch (_v169._0.ctor)
              {case "RBEmpty":
                 switch (_v169._1.ctor)
                   {case "RBEmpty":
                      return function () {
                           switch (c.ctor)
                           {case "Black":
                              return RBEmpty(LBBlack);
                              case "Red":
                              return RBEmpty(LBlack);}
                           _U.badCase($moduleName,
                           "between lines 282 and 286");
                        }();
                      case "RBNode":
                      return function () {
                           var _v191 = {ctor: "_Tuple3"
                                       ,_0: c
                                       ,_1: _v169._0._0
                                       ,_2: _v169._1._0};
                           switch (_v191.ctor)
                           {case "_Tuple3":
                              switch (_v191._0.ctor)
                                {case "Black":
                                   switch (_v191._1.ctor)
                                     {case "LBlack":
                                        switch (_v191._2.ctor)
                                          {case "Red": return A5(RBNode,
                                               Black,
                                               _v169._1._1,
                                               _v169._1._2,
                                               _v169._1._3,
                                               _v169._1._4);}
                                          break;}
                                     break;}
                                break;}
                           return A4(reportRemBug,
                           "Black/LBlack/Red",
                           c,
                           showLColor(_v169._0._0),
                           showNColor(_v169._1._0));
                        }();}
                   break;
                 case "RBNode":
                 switch (_v169._1.ctor)
                   {case "RBEmpty":
                      return function () {
                           var _v195 = {ctor: "_Tuple3"
                                       ,_0: c
                                       ,_1: _v169._0._0
                                       ,_2: _v169._1._0};
                           switch (_v195.ctor)
                           {case "_Tuple3":
                              switch (_v195._0.ctor)
                                {case "Black":
                                   switch (_v195._1.ctor)
                                     {case "Red":
                                        switch (_v195._2.ctor)
                                          {case "LBlack":
                                             return A5(RBNode,
                                               Black,
                                               _v169._0._1,
                                               _v169._0._2,
                                               _v169._0._3,
                                               _v169._0._4);}
                                          break;}
                                     break;}
                                break;}
                           return A4(reportRemBug,
                           "Black/Red/LBlack",
                           c,
                           showNColor(_v169._0._0),
                           showLColor(_v169._1._0));
                        }();
                      case "RBNode":
                      return function () {
                           var l$ = A5(remove_max,
                           _v169._0._0,
                           _v169._0._1,
                           _v169._0._2,
                           _v169._0._3,
                           _v169._0._4);
                           var r = A5(RBNode,
                           _v169._1._0,
                           _v169._1._1,
                           _v169._1._2,
                           _v169._1._3,
                           _v169._1._4);
                           var l = A5(RBNode,
                           _v169._0._0,
                           _v169._0._1,
                           _v169._0._2,
                           _v169._0._3,
                           _v169._0._4);
                           var $ = max(l),
                           k = $._0,
                           v = $._1;
                           return A5(bubble,c,k,v,l$,r);
                        }();}
                   break;}
              break;}
         _U.badCase($moduleName,
         "between lines 280 and 309");
      }();
   });
   var update = F3(function (k,
   alter,
   dict) {
      return function () {
         var up = function (dict) {
            return function () {
               switch (dict.ctor)
               {case "RBEmpty":
                  switch (dict._0.ctor)
                    {case "LBlack":
                       return function () {
                            var _v206 = alter($Maybe.Nothing);
                            switch (_v206.ctor)
                            {case "Just":
                               return {ctor: "_Tuple2"
                                      ,_0: Insert
                                      ,_1: A5(RBNode,
                                      Red,
                                      k,
                                      _v206._0,
                                      empty,
                                      empty)};
                               case "Nothing":
                               return {ctor: "_Tuple2"
                                      ,_0: Same
                                      ,_1: empty};}
                            _U.badCase($moduleName,
                            "between lines 194 and 198");
                         }();}
                    break;
                  case "RBNode":
                  return function () {
                       var _v208 = A2($Basics.compare,
                       k,
                       dict._1);
                       switch (_v208.ctor)
                       {case "EQ": return function () {
                               var _v209 = alter($Maybe.Just(dict._2));
                               switch (_v209.ctor)
                               {case "Just":
                                  return {ctor: "_Tuple2"
                                         ,_0: Same
                                         ,_1: A5(RBNode,
                                         dict._0,
                                         dict._1,
                                         _v209._0,
                                         dict._3,
                                         dict._4)};
                                  case "Nothing":
                                  return {ctor: "_Tuple2"
                                         ,_0: Remove
                                         ,_1: A3(rem,
                                         dict._0,
                                         dict._3,
                                         dict._4)};}
                               _U.badCase($moduleName,
                               "between lines 201 and 206");
                            }();
                          case "GT": return function () {
                               var $ = up(dict._4),
                               flag = $._0,
                               newRight = $._1;
                               return function () {
                                  switch (flag.ctor)
                                  {case "Insert":
                                     return {ctor: "_Tuple2"
                                            ,_0: Insert
                                            ,_1: A5(balance,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};
                                     case "Remove":
                                     return {ctor: "_Tuple2"
                                            ,_0: Remove
                                            ,_1: A5(bubble,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};
                                     case "Same":
                                     return {ctor: "_Tuple2"
                                            ,_0: Same
                                            ,_1: A5(RBNode,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            dict._3,
                                            newRight)};}
                                  _U.badCase($moduleName,
                                  "between lines 215 and 220");
                               }();
                            }();
                          case "LT": return function () {
                               var $ = up(dict._3),
                               flag = $._0,
                               newLeft = $._1;
                               return function () {
                                  switch (flag.ctor)
                                  {case "Insert":
                                     return {ctor: "_Tuple2"
                                            ,_0: Insert
                                            ,_1: A5(balance,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};
                                     case "Remove":
                                     return {ctor: "_Tuple2"
                                            ,_0: Remove
                                            ,_1: A5(bubble,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};
                                     case "Same":
                                     return {ctor: "_Tuple2"
                                            ,_0: Same
                                            ,_1: A5(RBNode,
                                            dict._0,
                                            dict._1,
                                            dict._2,
                                            newLeft,
                                            dict._4)};}
                                  _U.badCase($moduleName,
                                  "between lines 208 and 213");
                               }();
                            }();}
                       _U.badCase($moduleName,
                       "between lines 199 and 220");
                    }();}
               _U.badCase($moduleName,
               "between lines 192 and 220");
            }();
         };
         var $ = up(dict),
         flag = $._0,
         updatedDict = $._1;
         return function () {
            switch (flag.ctor)
            {case "Insert":
               return ensureBlackRoot(updatedDict);
               case "Remove":
               return blacken(updatedDict);
               case "Same":
               return updatedDict;}
            _U.badCase($moduleName,
            "between lines 222 and 225");
         }();
      }();
   });
   var insert = F3(function (key,
   value,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Just(value)),
      dict);
   });
   var singleton = F2(function (key,
   value) {
      return A3(insert,
      key,
      value,
      empty);
   });
   var union = F2(function (t1,
   t2) {
      return A3(foldl,
      insert,
      t2,
      t1);
   });
   var fromList = function (assocs) {
      return A3($List.foldl,
      F2(function (_v214,dict) {
         return function () {
            switch (_v214.ctor)
            {case "_Tuple2":
               return A3(insert,
                 _v214._0,
                 _v214._1,
                 dict);}
            _U.badCase($moduleName,
            "on line 466, column 38 to 59");
         }();
      }),
      empty,
      assocs);
   };
   var filter = F2(function (predicate,
   dictionary) {
      return function () {
         var add = F3(function (key,
         value,
         dict) {
            return A2(predicate,
            key,
            value) ? A3(insert,
            key,
            value,
            dict) : dict;
         });
         return A3(foldl,
         add,
         empty,
         dictionary);
      }();
   });
   var intersect = F2(function (t1,
   t2) {
      return A2(filter,
      F2(function (k,_v218) {
         return function () {
            return A2(member,k,t2);
         }();
      }),
      t1);
   });
   var partition = F2(function (predicate,
   dict) {
      return function () {
         var add = F3(function (key,
         value,
         _v220) {
            return function () {
               switch (_v220.ctor)
               {case "_Tuple2":
                  return A2(predicate,
                    key,
                    value) ? {ctor: "_Tuple2"
                             ,_0: A3(insert,
                             key,
                             value,
                             _v220._0)
                             ,_1: _v220._1} : {ctor: "_Tuple2"
                                              ,_0: _v220._0
                                              ,_1: A3(insert,
                                              key,
                                              value,
                                              _v220._1)};}
               _U.badCase($moduleName,
               "between lines 487 and 489");
            }();
         });
         return A3(foldl,
         add,
         {ctor: "_Tuple2"
         ,_0: empty
         ,_1: empty},
         dict);
      }();
   });
   var remove = F2(function (key,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Nothing),
      dict);
   });
   var diff = F2(function (t1,t2) {
      return A3(foldl,
      F3(function (k,v,t) {
         return A2(remove,k,t);
      }),
      t1,
      t2);
   });
   _elm.Dict.values = {_op: _op
                      ,empty: empty
                      ,singleton: singleton
                      ,insert: insert
                      ,update: update
                      ,isEmpty: isEmpty
                      ,get: get
                      ,remove: remove
                      ,member: member
                      ,filter: filter
                      ,partition: partition
                      ,foldl: foldl
                      ,foldr: foldr
                      ,map: map
                      ,union: union
                      ,intersect: intersect
                      ,diff: diff
                      ,keys: keys
                      ,values: values
                      ,toList: toList
                      ,fromList: fromList};
   return _elm.Dict.values;
};
Elm.Focus = Elm.Focus || {};
Elm.Focus.make = function (_elm) {
   "use strict";
   _elm.Focus = _elm.Focus || {};
   if (_elm.Focus.values)
   return _elm.Focus.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Focus",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   _op["=>"] = F2(function (largerFocus,
   smallerFocus) {
      return {_: {}
             ,get: function (big) {
                return smallerFocus.get(largerFocus.get(big));
             }
             ,update: F2(function (f,big) {
                return A2(largerFocus.update,
                smallerFocus.update(f),
                big);
             })};
   });
   var update = F3(function (focus,
   f,
   big) {
      return A2(focus.update,
      f,
      big);
   });
   var set = F3(function (focus,
   small,
   big) {
      return A2(focus.update,
      $Basics.always(small),
      big);
   });
   var get = F2(function (focus,
   big) {
      return focus.get(big);
   });
   var create = F2(function (get,
   update) {
      return {_: {}
             ,get: get
             ,update: update};
   });
   var Focus = F2(function (a,b) {
      return {_: {}
             ,get: a
             ,update: b};
   });
   _elm.Focus.values = {_op: _op
                       ,get: get
                       ,set: set
                       ,update: update
                       ,create: create
                       ,Focus: Focus};
   return _elm.Focus.values;
};
Elm.Graph = Elm.Graph || {};
Elm.Graph.make = function (_elm) {
   "use strict";
   _elm.Graph = _elm.Graph || {};
   if (_elm.Graph.values)
   return _elm.Graph.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graph",
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Focus = Elm.Focus.make(_elm),
   $Graph$Tree = Elm.Graph.Tree.make(_elm),
   $IntDict = Elm.IntDict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Queue = Elm.Queue.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var ignorePath = F4(function (visit,
   path,
   _v0,
   acc) {
      return function () {
         return function () {
            switch (path.ctor)
            {case "::": return A2(visit,
                 path._0,
                 acc);
               case "[]":
               return $Debug.crash("Graph.ignorePath: No algorithm should ever pass an empty path into this BfsNodeVisitor.");}
            _U.badCase($moduleName,
            "between lines 990 and 994");
         }();
      }();
   });
   var onFinish = F3(function (visitor,
   ctx,
   acc) {
      return {ctor: "_Tuple2"
             ,_0: acc
             ,_1: visitor(ctx)};
   });
   var onDiscovery = F3(function (visitor,
   ctx,
   acc) {
      return {ctor: "_Tuple2"
             ,_0: A2(visitor,ctx,acc)
             ,_1: $Basics.identity};
   });
   var alongIncomingEdges = function (ctx) {
      return $IntDict.keys(ctx.incoming);
   };
   var alongOutgoingEdges = function (ctx) {
      return $IntDict.keys(ctx.outgoing);
   };
   var lookup = function (nodeId) {
      return A2($Focus.create,
      $IntDict.get(nodeId),
      $IntDict.update(nodeId));
   };
   var outgoing = A2($Focus.create,
   function (_) {
      return _.outgoing;
   },
   F2(function (update,record) {
      return _U.replace([["outgoing"
                         ,update(record.outgoing)]],
      record);
   }));
   var incoming = A2($Focus.create,
   function (_) {
      return _.incoming;
   },
   F2(function (update,record) {
      return _U.replace([["incoming"
                         ,update(record.incoming)]],
      record);
   }));
   var node = A2($Focus.create,
   function (_) {
      return _.node;
   },
   F2(function (update,record) {
      return _U.replace([["node"
                         ,update(record.node)]],
      record);
   }));
   var to = A2($Focus.create,
   function (_) {
      return _.to;
   },
   F2(function (update,record) {
      return _U.replace([["to"
                         ,update(record.to)]],
      record);
   }));
   var from = A2($Focus.create,
   function (_) {
      return _.from;
   },
   F2(function (update,record) {
      return _U.replace([["from"
                         ,update(record.from)]],
      record);
   }));
   var label = A2($Focus.create,
   function (_) {
      return _.label;
   },
   F2(function (update,record) {
      return _U.replace([["label"
                         ,update(record.label)]],
      record);
   }));
   var id = A2($Focus.create,
   function (_) {
      return _.id;
   },
   F2(function (update,record) {
      return _U.replace([["id"
                         ,update(record.id)]],
      record);
   }));
   var applyEdgeDiff = F3(function (nodeId,
   diff,
   graphRep) {
      return function () {
         var edgeUpdateToMaybe = function (edgeUpdate) {
            return function () {
               switch (edgeUpdate.ctor)
               {case "Insert":
                  return $Maybe.Just(edgeUpdate._0);
                  case "Remove":
                  return $Maybe.Nothing;}
               _U.badCase($moduleName,
               "between lines 240 and 244");
            }();
         };
         var updateAdjacency = F3(function (edgeFocus,
         updatedId,
         edgeUpdate) {
            return function () {
               var updateLbl = A2($Focus.set,
               edgeFocus,
               edgeUpdateToMaybe(edgeUpdate));
               return A2($IntDict.update,
               updatedId,
               $Maybe.map(updateLbl));
            }();
         });
         var foldl$ = F3(function (f,
         dict,
         acc) {
            return A3($IntDict.foldl,
            f,
            acc,
            dict);
         });
         return A2(foldl$,
         updateAdjacency(A2($Focus._op["=>"],
         outgoing,
         lookup(nodeId))),
         diff.outgoing)(A2(foldl$,
         updateAdjacency(A2($Focus._op["=>"],
         incoming,
         lookup(nodeId))),
         diff.incoming)(graphRep));
      }();
   });
   var emptyDiff = {_: {}
                   ,incoming: $IntDict.empty
                   ,outgoing: $IntDict.empty};
   var EdgeDiff = F2(function (a,
   b) {
      return {_: {}
             ,incoming: a
             ,outgoing: b};
   });
   var Remove = function (a) {
      return {ctor: "Remove"
             ,_0: a};
   };
   var Insert = function (a) {
      return {ctor: "Insert"
             ,_0: a};
   };
   var computeEdgeDiff = F2(function (old,
   $new) {
      return function () {
         var collectUpdates = F3(function (edgeUpdate,
         updatedId,
         label) {
            return function () {
               var replaceUpdate = function (old) {
                  return function () {
                     var _v8 = {ctor: "_Tuple2"
                               ,_0: old
                               ,_1: edgeUpdate(label)};
                     switch (_v8.ctor)
                     {case "_Tuple2":
                        switch (_v8._0.ctor)
                          {case "Just":
                             switch (_v8._0._0.ctor)
                               {case "Insert":
                                  return $Debug.crash("Graph.computeEdgeDiff: Collected inserts before removals. This is an error in the implementation of Graph and you should file a bug report!");
                                  case "Remove":
                                  switch (_v8._1.ctor)
                                    {case "Insert":
                                       return $Maybe.Nothing;
                                       case "Remove":
                                       return $Debug.crash("Graph.computeEdgeDiff: Collected two removals for the same edge. This is an error in the implementation of Graph and you should file a bug report!");}
                                    break;}
                               break;
                             case "Nothing":
                             return $Maybe.Just(_v8._1);}
                          break;}
                     _U.badCase($moduleName,
                     "between lines 196 and 207");
                  }();
               };
               return A2($IntDict.update,
               updatedId,
               replaceUpdate);
            }();
         });
         var collect = F3(function (edgeUpdate,
         adj,
         updates) {
            return A3($IntDict.foldl,
            collectUpdates(edgeUpdate),
            updates,
            adj);
         });
         return function () {
            var _v16 = {ctor: "_Tuple2"
                       ,_0: old
                       ,_1: $new};
            switch (_v16.ctor)
            {case "_Tuple2":
               switch (_v16._0.ctor)
                 {case "Just":
                    switch (_v16._1.ctor)
                      {case "Just":
                         return _U.eq(_v16._0._0,
                           _v16._1._0) ? emptyDiff : {_: {}
                                                     ,incoming: A2(collect,
                                                     Insert,
                                                     _v16._1._0.outgoing)(A2(collect,
                                                     Remove,
                                                     _v16._0._0.outgoing)($IntDict.empty))
                                                     ,outgoing: A2(collect,
                                                     Insert,
                                                     _v16._1._0.incoming)(A2(collect,
                                                     Remove,
                                                     _v16._0._0.incoming)($IntDict.empty))};
                         case "Nothing": return {_: {}
                                                ,incoming: A2(collect,
                                                Remove,
                                                _v16._0._0.outgoing)($IntDict.empty)
                                                ,outgoing: A2(collect,
                                                Remove,
                                                _v16._0._0.incoming)($IntDict.empty)};}
                      break;
                    case "Nothing":
                    switch (_v16._1.ctor)
                      {case "Just": return {_: {}
                                           ,incoming: A2(collect,
                                           Insert,
                                           _v16._1._0.outgoing)($IntDict.empty)
                                           ,outgoing: A2(collect,
                                           Insert,
                                           _v16._1._0.incoming)($IntDict.empty)};
                         case "Nothing":
                         return emptyDiff;}
                      break;}
                 break;}
            _U.badCase($moduleName,
            "between lines 213 and 230");
         }();
      }();
   });
   var unGraph = function (graph) {
      return function () {
         switch (graph.ctor)
         {case "Graph": return graph._0;}
         _U.badCase($moduleName,
         "between lines 158 and 161");
      }();
   };
   var edges = function (graph) {
      return function () {
         var foldl$ = F3(function (f,
         dict,
         list) {
            return A3($IntDict.foldl,
            f,
            list,
            dict);
         });
         var prependEdges = F2(function (node1,
         ctx) {
            return A2(foldl$,
            F2(function (node2,e) {
               return F2(function (x,y) {
                  return A2($List._op["::"],
                  x,
                  y);
               })({_: {}
                  ,from: node1
                  ,label: e
                  ,to: node2});
            }),
            ctx.outgoing);
         });
         return A3(foldl$,
         prependEdges,
         unGraph(graph),
         _L.fromArray([]));
      }();
   };
   var Graph = function (a) {
      return {ctor: "Graph",_0: a};
   };
   var empty = Graph($IntDict.empty);
   var isEmpty = function (graph) {
      return _U.eq(graph,empty);
   };
   var graphRep = A2($Focus.create,
   unGraph,
   function (update) {
      return function ($) {
         return Graph(update(unGraph($)));
      };
   });
   var update = F2(function (nodeId,
   updater) {
      return function () {
         var updater$ = function (rep) {
            return function () {
               var filterInvalidEdges = function (ctx) {
                  return $IntDict.filter(F2(function (id,
                  _v24) {
                     return function () {
                        return _U.eq(id,
                        ctx.node.id) || A2($IntDict.member,
                        id,
                        rep);
                     }();
                  }));
               };
               var cleanUpEdges = function (ctx) {
                  return A2($Focus.update,
                  outgoing,
                  filterInvalidEdges(ctx))(A2($Focus.update,
                  incoming,
                  filterInvalidEdges(ctx))(ctx));
               };
               var old = A2($IntDict.get,
               nodeId,
               rep);
               var $new = $Maybe.map(cleanUpEdges)(updater(old));
               var diff = A2(computeEdgeDiff,
               old,
               $new);
               return A2($IntDict.update,
               nodeId,
               $Basics.always($new))(A2(applyEdgeDiff,
               nodeId,
               diff)(rep));
            }();
         };
         return A2($Focus.update,
         graphRep,
         updater$);
      }();
   });
   var insert = F2(function (nodeContext,
   graph) {
      return A3(update,
      nodeContext.node.id,
      $Basics.always($Maybe.Just(nodeContext)),
      graph);
   });
   var remove = F2(function (nodeId,
   graph) {
      return A3(update,
      nodeId,
      $Basics.always($Maybe.Nothing),
      graph);
   });
   var size = function ($) {
      return $IntDict.size($Focus.get(graphRep)($));
   };
   var member = function (nodeId) {
      return function ($) {
         return $IntDict.member(nodeId)($Focus.get(graphRep)($));
      };
   };
   var get = function (nodeId) {
      return $Focus.get(A2($Focus._op["=>"],
      graphRep,
      lookup(nodeId)));
   };
   var inducedSubgraph = F2(function (nodeIds,
   graph) {
      return function () {
         var insertContextById = F2(function (nodeId,
         acc) {
            return function () {
               var _v26 = A2(get,
               nodeId,
               graph);
               switch (_v26.ctor)
               {case "Just": return A2(insert,
                    _v26._0,
                    acc);
                  case "Nothing": return acc;}
               _U.badCase($moduleName,
               "between lines 349 and 354");
            }();
         });
         return A3($List.foldl,
         insertContextById,
         empty,
         nodeIds);
      }();
   });
   var nodeById = function (nodeId) {
      return A2($Focus.create,
      get(nodeId),
      update(nodeId));
   };
   var guidedDfs = F5(function (selectNeighbors,
   visitNode,
   seeds,
   acc,
   graph) {
      return function () {
         var go = F3(function (seeds,
         acc,
         graph) {
            return function () {
               switch (seeds.ctor)
               {case "::": return function () {
                       var _v31 = A2(get,
                       seeds._0,
                       graph);
                       switch (_v31.ctor)
                       {case "Just":
                          return function () {
                               var $ = A2(visitNode,
                               _v31._0,
                               acc),
                               accAfterDiscovery = $._0,
                               finishNode = $._1;
                               var $ = A3(go,
                               selectNeighbors(_v31._0),
                               accAfterDiscovery,
                               A2(remove,seeds._0,graph)),
                               accBeforeFinish = $._0,
                               graph$ = $._1;
                               var accAfterFinish = finishNode(accBeforeFinish);
                               return A3(go,
                               seeds._1,
                               accAfterFinish,
                               graph$);
                            }();
                          case "Nothing": return A3(go,
                            seeds._1,
                            acc,
                            graph);}
                       _U.badCase($moduleName,
                       "between lines 894 and 912");
                    }();
                  case "[]":
                  return {ctor: "_Tuple2"
                         ,_0: acc
                         ,_1: graph};}
               _U.badCase($moduleName,
               "between lines 890 and 912");
            }();
         });
         return A3(go,seeds,acc,graph);
      }();
   });
   var dfsForest = F2(function (seeds,
   graph) {
      return function () {
         var visitNode = F2(function (ctx,
         trees) {
            return {ctor: "_Tuple2"
                   ,_0: _L.fromArray([])
                   ,_1: function (children) {
                      return A2($List._op["::"],
                      A2($Graph$Tree.inner,
                      ctx,
                      children),
                      trees);
                   }};
         });
         return $List.reverse($Basics.fst(A5(guidedDfs,
         alongOutgoingEdges,
         visitNode,
         seeds,
         _L.fromArray([]),
         graph)));
      }();
   });
   var dfsTree = F2(function (seed,
   graph) {
      return function () {
         var _v33 = A2(dfsForest,
         _L.fromArray([seed]),
         graph);
         switch (_v33.ctor)
         {case "::":
            switch (_v33._1.ctor)
              {case "[]": return _v33._0;}
              break;
            case "[]":
            return $Graph$Tree.empty;}
         return $Debug.crash("dfsTree: There can\'t be more than one DFS tree. This invariant is violated, please report this bug.");
      }();
   });
   var guidedBfs = F5(function (selectNeighbors,
   visitNode,
   seeds,
   acc,
   graph) {
      return function () {
         var enqueueMany = F4(function (distance,
         parentPath,
         nodeIds,
         queue) {
            return A2($List.foldl,
            $Queue.push,
            queue)($List.map(function (id) {
               return {ctor: "_Tuple3"
                      ,_0: id
                      ,_1: parentPath
                      ,_2: distance};
            })(nodeIds));
         });
         var go = F3(function (seeds,
         acc,
         graph) {
            return function () {
               var _v36 = $Queue.pop(seeds);
               switch (_v36.ctor)
               {case "Just":
                  switch (_v36._0.ctor)
                    {case "_Tuple2":
                       switch (_v36._0._0.ctor)
                         {case "_Tuple3":
                            return function () {
                                 var _v43 = A2(get,
                                 _v36._0._0._0,
                                 graph);
                                 switch (_v43.ctor)
                                 {case "Just":
                                    return function () {
                                         var path = A2($List._op["::"],
                                         _v43._0,
                                         _v36._0._0._1);
                                         var acc$ = A3(visitNode,
                                         path,
                                         _v36._0._0._2,
                                         acc);
                                         var seeds$$ = A4(enqueueMany,
                                         _v36._0._0._2 + 1,
                                         path,
                                         selectNeighbors(_v43._0),
                                         _v36._0._1);
                                         return A3(go,
                                         seeds$$,
                                         acc$,
                                         A2(remove,_v36._0._0._0,graph));
                                      }();
                                    case "Nothing": return A3(go,
                                      _v36._0._1,
                                      acc,
                                      graph);}
                                 _U.badCase($moduleName,
                                 "between lines 1030 and 1048");
                              }();}
                         break;}
                    break;
                  case "Nothing":
                  return {ctor: "_Tuple2"
                         ,_0: acc
                         ,_1: graph};}
               _U.badCase($moduleName,
               "between lines 1026 and 1048");
            }();
         });
         return A3(go,
         A4(enqueueMany,
         0,
         _L.fromArray([]),
         seeds,
         $Queue.empty),
         acc,
         graph);
      }();
   });
   var nodeIdRange = function (graph) {
      return function () {
         var rep = A2($Focus.get,
         graphRep,
         graph);
         return A2($Maybe.andThen,
         $IntDict.findMin(rep),
         function (_v45) {
            return function () {
               switch (_v45.ctor)
               {case "_Tuple2":
                  return A2($Maybe.andThen,
                    $IntDict.findMax(rep),
                    function (_v49) {
                       return function () {
                          switch (_v49.ctor)
                          {case "_Tuple2":
                             return $Maybe.Just({ctor: "_Tuple2"
                                                ,_0: _v45._0
                                                ,_1: _v49._0});}
                          _U.badCase($moduleName,
                          "on line 426, column 5 to 19");
                       }();
                    });}
               _U.badCase($moduleName,
               "between lines 425 and 426");
            }();
         });
      }();
   };
   var fold = F3(function (f,
   acc,
   graph) {
      return function () {
         var go = F2(function (acc,
         graph$) {
            return function () {
               var maybeContext = A2($Basics.flip,
               $Maybe.andThen,
               function (id) {
                  return A2(get,id,graph);
               })($Maybe.map($Basics.fst)(nodeIdRange(graph$)));
               return function () {
                  switch (maybeContext.ctor)
                  {case "Just": return A2(go,
                       A2(f,maybeContext._0,acc),
                       A2(remove,
                       maybeContext._0.node.id,
                       graph$));
                     case "Nothing": return acc;}
                  _U.badCase($moduleName,
                  "between lines 665 and 670");
               }();
            }();
         });
         return A2(go,acc,graph);
      }();
   });
   var mapContexts = function (f) {
      return A2(fold,
      function (ctx) {
         return insert(f(ctx));
      },
      empty);
   };
   var mapNodes = function (f) {
      return A2(fold,
      function (ctx) {
         return insert(_U.replace([["node"
                                   ,{_: {}
                                    ,id: ctx.node.id
                                    ,label: f(ctx.node.label)}]],
         ctx));
      },
      empty);
   };
   var mapEdges = function (f) {
      return A2(fold,
      function (ctx) {
         return insert(_U.replace([["outgoing"
                                   ,A2($IntDict.map,
                                   F2(function (n,e) {
                                      return f(e);
                                   }),
                                   ctx.outgoing)]
                                  ,["incoming"
                                   ,A2($IntDict.map,
                                   F2(function (n,e) {
                                      return f(e);
                                   }),
                                   ctx.incoming)]],
         ctx));
      },
      empty);
   };
   var heightLevels = function (graph) {
      return function () {
         var subtract = F2(function (a,
         b) {
            return b - a;
         });
         var decrementAndNoteSources = F3(function (id,
         _v55,
         _v56) {
            return function () {
               switch (_v56.ctor)
               {case "_Tuple2":
                  return function () {
                       return function () {
                          var indegrees$ = A3($IntDict.update,
                          id,
                          $Maybe.map(subtract(1)),
                          _v56._1);
                          return function () {
                             var _v61 = A2($IntDict.get,
                             id,
                             indegrees$);
                             switch (_v61.ctor)
                             {case "Just": switch (_v61._0)
                                  {case 0: return function () {
                                          var _v63 = A2(get,id,graph);
                                          switch (_v63.ctor)
                                          {case "Just":
                                             return {ctor: "_Tuple2"
                                                    ,_0: A2($List._op["::"],
                                                    _v63._0,
                                                    _v56._0)
                                                    ,_1: indegrees$};
                                             case "Nothing":
                                             return $Debug.crash("Graph.heightLevels: Could not get a node of a graph which should be there by invariants. Please file a bug report!");}
                                          _U.badCase($moduleName,
                                          "between lines 1115 and 1118");
                                       }();}
                                  break;}
                             return {ctor: "_Tuple2"
                                    ,_0: _v56._0
                                    ,_1: indegrees$};
                          }();
                       }();
                    }();}
               _U.badCase($moduleName,
               "between lines 1110 and 1121");
            }();
         });
         var decrementIndegrees = F3(function (source,
         nextLevel,
         indegrees) {
            return A3($IntDict.foldl,
            decrementAndNoteSources,
            {ctor: "_Tuple2"
            ,_0: nextLevel
            ,_1: indegrees},
            source.outgoing);
         });
         var go = F4(function (currentLevel,
         nextLevel,
         indegrees,
         graph) {
            return function () {
               var _v65 = {ctor: "_Tuple2"
                          ,_0: currentLevel
                          ,_1: nextLevel};
               switch (_v65.ctor)
               {case "_Tuple2":
                  switch (_v65._0.ctor)
                    {case "::": return function () {
                            var $ = A3(decrementIndegrees,
                            _v65._0._0,
                            nextLevel,
                            indegrees),
                            nextLevel$ = $._0,
                            indegrees$ = $._1;
                            return function () {
                               var _v70 = A4(go,
                               _v65._0._1,
                               nextLevel$,
                               indegrees$,
                               A2(remove,
                               _v65._0._0.node.id,
                               graph));
                               switch (_v70.ctor)
                               {case "::":
                                  return A2($List._op["::"],
                                    A2($List._op["::"],
                                    _v65._0._0,
                                    _v70._0),
                                    _v70._1);
                                  case "[]":
                                  return $Debug.crash("Graph.heightLevels: Reached a branch which is impossible by invariants. Please file a bug report!");}
                               _U.badCase($moduleName,
                               "between lines 1134 and 1139");
                            }();
                         }();
                       case "[]": switch (_v65._1.ctor)
                         {case "[]":
                            return _L.fromArray([_L.fromArray([])]);}
                         return A2($List._op["::"],
                         _L.fromArray([]),
                         A4(go,
                         nextLevel,
                         _L.fromArray([]),
                         indegrees,
                         graph));}
                    break;}
               _U.badCase($moduleName,
               "between lines 1125 and 1139");
            }();
         });
         var countIndegrees = A2(fold,
         function (ctx) {
            return A2($IntDict.insert,
            ctx.node.id,
            $IntDict.size(ctx.incoming));
         },
         $IntDict.empty);
         var sources = A3(fold,
         F2(function (ctx,acc) {
            return $IntDict.isEmpty(ctx.incoming) ? A2($List._op["::"],
            ctx,
            acc) : acc;
         }),
         _L.fromArray([]),
         graph);
         return A4(go,
         sources,
         _L.fromArray([]),
         countIndegrees(graph),
         graph);
      }();
   };
   var nodes = function ($) {
      return $List.map(function (_) {
         return _.node;
      })($IntDict.values($Focus.get(graphRep)($)));
   };
   var toString$ = function (graph) {
      return function () {
         var edgeList = edges(graph);
         var nodeList = nodes(graph);
         return A2($Basics._op["++"],
         "Graph.fromNodesAndEdges ",
         A2($Basics._op["++"],
         $Basics.toString(nodeList),
         A2($Basics._op["++"],
         " ",
         $Basics.toString(edgeList))));
      }();
   };
   var nodeIds = function ($) {
      return $IntDict.keys($Focus.get(graphRep)($));
   };
   var dfs = F3(function (visitNode,
   acc,
   graph) {
      return $Basics.fst(A5(guidedDfs,
      alongOutgoingEdges,
      visitNode,
      nodeIds(graph),
      acc,
      graph));
   });
   var bfs = F3(function (visitNode,
   acc,
   graph) {
      return function () {
         var $ = A5(guidedBfs,
         alongOutgoingEdges,
         visitNode,
         nodeIds(graph),
         acc,
         graph),
         acc$ = $._0,
         restGraph$ = $._1;
         return function () {
            var _v73 = nodeIdRange(graph);
            switch (_v73.ctor)
            {case "Just":
               switch (_v73._0.ctor)
                 {case "_Tuple2":
                    return function () {
                         var $ = A5(guidedBfs,
                         alongOutgoingEdges,
                         visitNode,
                         _L.fromArray([_v73._0._0]),
                         acc,
                         graph),
                         acc$ = $._0,
                         restGraph$ = $._1;
                         return A3(bfs,
                         visitNode,
                         acc$,
                         restGraph$);
                      }();}
                 break;
               case "Nothing": return acc;}
            _U.badCase($moduleName,
            "between lines 1063 and 1071");
         }();
      }();
   });
   var topologicalSort = function (graph) {
      return $List.concatMap($Graph$Tree.preOrderList)($List.reverse(dfsForest(nodeIds(graph))(graph)));
   };
   var anyNode = function () {
      var getMinId = function ($) {
         return $Maybe.map($Basics.fst)($IntDict.findMin($Focus.get(graphRep)($)));
      };
      var get = function (graph) {
         return A2($Maybe.andThen,
         getMinId(graph),
         function (id) {
            return A2($Focus.get,
            nodeById(id),
            graph);
         });
      };
      var update = F2(function (upd,
      graph) {
         return function () {
            var nodeId = A2($Maybe.withDefault,
            0,
            getMinId(graph));
            return A3($Focus.update,
            nodeById(nodeId),
            upd,
            graph);
         }();
      });
      return A2($Focus.create,
      get,
      update);
   }();
   var symmetricClosure = function (edgeMerger) {
      return function () {
         var orderedEdgeMerger = F4(function (from,
         to,
         outgoing,
         incoming) {
            return _U.cmp(from,
            to) < 1 ? A4(edgeMerger,
            from,
            to,
            outgoing,
            incoming) : A4(edgeMerger,
            to,
            from,
            incoming,
            outgoing);
         });
         var updateContext = F2(function (nodeId,
         ctx) {
            return function () {
               var edges = A3($IntDict.uniteWith,
               orderedEdgeMerger(nodeId),
               ctx.outgoing,
               ctx.incoming);
               return _U.replace([["outgoing"
                                  ,edges]
                                 ,["incoming",edges]],
               ctx);
            }();
         });
         return A2($Focus.update,
         graphRep,
         $IntDict.map(updateContext));
      }();
   };
   var reverseEdges = function () {
      var updateContext = F2(function (nodeId,
      ctx) {
         return _U.replace([["outgoing"
                            ,ctx.incoming]
                           ,["incoming",ctx.outgoing]],
         ctx);
      });
      return A2($Focus.update,
      graphRep,
      $IntDict.map(updateContext));
   }();
   var stronglyConnectedComponents = function (graph) {
      return function () {
         var timestamps = A3(dfs,
         onFinish(function ($) {
            return F2(function (x,y) {
               return A2($List._op["::"],
               x,
               y);
            })(function (_) {
               return _.id;
            }(function (_) {
               return _.node;
            }($)));
         }),
         _L.fromArray([]),
         graph);
         var forest = A2(dfsForest,
         timestamps,
         reverseEdges(graph));
         var components = A2($List.map,
         function ($) {
            return reverseEdges(A2($List.foldr,
            insert,
            empty)($Graph$Tree.preOrderList($)));
         },
         forest);
         return components;
      }();
   };
   var NodeContext = F3(function (a,
   b,
   c) {
      return {_: {}
             ,incoming: b
             ,node: a
             ,outgoing: c};
   });
   var fromNodesAndEdges = F2(function (nodes,
   edges) {
      return function () {
         var addEdge = F2(function (edge,
         rep) {
            return function () {
               var updateIncoming = function (ctx) {
                  return _U.replace([["incoming"
                                     ,A3($IntDict.insert,
                                     edge.from,
                                     edge.label,
                                     ctx.incoming)]],
                  ctx);
               };
               var updateOutgoing = function (ctx) {
                  return _U.replace([["outgoing"
                                     ,A3($IntDict.insert,
                                     edge.to,
                                     edge.label,
                                     ctx.outgoing)]],
                  ctx);
               };
               return A2($IntDict.update,
               edge.to,
               $Maybe.map(updateIncoming))(A2($IntDict.update,
               edge.from,
               $Maybe.map(updateOutgoing))(rep));
            }();
         });
         var nodeRep = A3($List.foldl,
         function (n) {
            return A2($IntDict.insert,
            n.id,
            A3(NodeContext,
            n,
            $IntDict.empty,
            $IntDict.empty));
         },
         $IntDict.empty,
         nodes);
         return Graph(A3($List.foldl,
         addEdge,
         nodeRep,
         edges));
      }();
   });
   var Edge = F3(function (a,b,c) {
      return {_: {}
             ,from: a
             ,label: c
             ,to: b};
   });
   var Node = F2(function (a,b) {
      return {_: {}
             ,id: a
             ,label: b};
   });
   var fromNodeLabelsAndEdgePairs = F2(function (labels,
   edges) {
      return function () {
         var edges$ = A2($List.map,
         function (_v77) {
            return function () {
               switch (_v77.ctor)
               {case "_Tuple2": return A3(Edge,
                    _v77._0,
                    _v77._1,
                    {ctor: "_Tuple0"});}
               _U.badCase($moduleName,
               "on line 529, column 32 to 46");
            }();
         },
         edges);
         var nodes = $Basics.snd(A2($List.foldl,
         F2(function (lbl,_v81) {
            return function () {
               switch (_v81.ctor)
               {case "_Tuple2":
                  return {ctor: "_Tuple2"
                         ,_0: _v81._0 + 1
                         ,_1: A2($List._op["::"],
                         A2(Node,_v81._0,lbl),
                         _v81._1)};}
               _U.badCase($moduleName,
               "on line 524, column 35 to 63");
            }();
         }),
         {ctor: "_Tuple2"
         ,_0: 0
         ,_1: _L.fromArray([])})(labels));
         return A2(fromNodesAndEdges,
         nodes,
         edges$);
      }();
   });
   _elm.Graph.values = {_op: _op
                       ,empty: empty
                       ,update: update
                       ,insert: insert
                       ,remove: remove
                       ,inducedSubgraph: inducedSubgraph
                       ,isEmpty: isEmpty
                       ,size: size
                       ,member: member
                       ,get: get
                       ,nodeIdRange: nodeIdRange
                       ,nodeIds: nodeIds
                       ,nodes: nodes
                       ,edges: edges
                       ,fromNodesAndEdges: fromNodesAndEdges
                       ,fromNodeLabelsAndEdgePairs: fromNodeLabelsAndEdgePairs
                       ,id: id
                       ,label: label
                       ,from: from
                       ,to: to
                       ,node: node
                       ,incoming: incoming
                       ,outgoing: outgoing
                       ,nodeById: nodeById
                       ,anyNode: anyNode
                       ,fold: fold
                       ,mapContexts: mapContexts
                       ,mapNodes: mapNodes
                       ,mapEdges: mapEdges
                       ,symmetricClosure: symmetricClosure
                       ,reverseEdges: reverseEdges
                       ,alongOutgoingEdges: alongOutgoingEdges
                       ,alongIncomingEdges: alongIncomingEdges
                       ,onDiscovery: onDiscovery
                       ,onFinish: onFinish
                       ,dfs: dfs
                       ,dfsTree: dfsTree
                       ,dfsForest: dfsForest
                       ,guidedDfs: guidedDfs
                       ,ignorePath: ignorePath
                       ,bfs: bfs
                       ,guidedBfs: guidedBfs
                       ,heightLevels: heightLevels
                       ,topologicalSort: topologicalSort
                       ,stronglyConnectedComponents: stronglyConnectedComponents
                       ,toString$: toString$
                       ,Node: Node
                       ,Edge: Edge
                       ,NodeContext: NodeContext};
   return _elm.Graph.values;
};
Elm.Graph = Elm.Graph || {};
Elm.Graph.Tree = Elm.Graph.Tree || {};
Elm.Graph.Tree.make = function (_elm) {
   "use strict";
   _elm.Graph = _elm.Graph || {};
   _elm.Graph.Tree = _elm.Graph.Tree || {};
   if (_elm.Graph.Tree.values)
   return _elm.Graph.Tree.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graph.Tree",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Queue = Elm.Queue.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var pushMany = F2(function (vals,
   queue) {
      return A3($List.foldl,
      $Queue.push,
      queue,
      vals);
   });
   var listForTraversal = F2(function (traversal,
   tree) {
      return function () {
         var acc = $Basics.identity;
         var f = F3(function (label,
         children,
         rest) {
            return function ($) {
               return rest(F2(function (x,
               y) {
                  return A2($List._op["::"],
                  x,
                  y);
               })(label)($));
            };
         });
         return A4(traversal,
         f,
         acc,
         tree,
         _L.fromArray([]));
      }();
   });
   var size = function (tree) {
      return function () {
         switch (tree.ctor)
         {case "MkTree": return tree._0;}
         _U.badCase($moduleName,
         "between lines 155 and 156");
      }();
   };
   var root = function (tree) {
      return function () {
         switch (tree.ctor)
         {case "MkTree": return tree._1;}
         _U.badCase($moduleName,
         "between lines 144 and 145");
      }();
   };
   var height = function (tree) {
      return function () {
         var go = F2(function (h,t) {
            return function () {
               var _v6 = root(t);
               switch (_v6.ctor)
               {case "Just":
                  switch (_v6._0.ctor)
                    {case "_Tuple2":
                       return A2($List.foldl,
                         function ($) {
                            return $Basics.max(go(h + 1)($));
                         },
                         h + 1)(_v6._0._1);}
                    break;
                  case "Nothing": return h;}
               _U.badCase($moduleName,
               "between lines 168 and 174");
            }();
         });
         return A2(go,0,tree);
      }();
   };
   var levelOrder = F3(function (visit,
   acc,
   tree) {
      return function () {
         var go = F2(function (acc,
         toVisit) {
            return function () {
               var _v10 = $Queue.pop(toVisit);
               switch (_v10.ctor)
               {case "Just":
                  switch (_v10._0.ctor)
                    {case "_Tuple2":
                       return function () {
                            var _v14 = root(_v10._0._0);
                            switch (_v14.ctor)
                            {case "Just":
                               switch (_v14._0.ctor)
                                 {case "_Tuple2": return A2(go,
                                      A3(visit,
                                      _v14._0._0,
                                      _v14._0._1,
                                      acc),
                                      A2(pushMany,
                                      _v14._0._1,
                                      _v10._0._1));}
                                 break;
                               case "Nothing": return A2(go,
                                 acc,
                                 _v10._0._1);}
                            _U.badCase($moduleName,
                            "between lines 216 and 220");
                         }();}
                    break;
                  case "Nothing": return acc;}
               _U.badCase($moduleName,
               "between lines 213 and 220");
            }();
         });
         return A2(go,
         acc,
         $Queue.push(tree)($Queue.empty));
      }();
   });
   var levelOrderList = listForTraversal(levelOrder);
   var postOrder = F3(function (visit,
   acc,
   tree) {
      return function () {
         var folder = $Basics.flip(postOrder(visit));
         return function () {
            var _v18 = root(tree);
            switch (_v18.ctor)
            {case "Just":
               switch (_v18._0.ctor)
                 {case "_Tuple2":
                    return A3(visit,
                      _v18._0._0,
                      _v18._0._1,
                      A3($List.foldl,
                      folder,
                      acc,
                      _v18._0._1));}
                 break;
               case "Nothing": return acc;}
            _U.badCase($moduleName,
            "between lines 253 and 256");
         }();
      }();
   });
   var postOrderList = listForTraversal(postOrder);
   var preOrder = F3(function (visit,
   acc,
   tree) {
      return function () {
         var folder = $Basics.flip(preOrder(visit));
         return function () {
            var _v22 = root(tree);
            switch (_v22.ctor)
            {case "Just":
               switch (_v22._0.ctor)
                 {case "_Tuple2":
                    return A3($List.foldl,
                      folder,
                      A3(visit,
                      _v22._0._0,
                      _v22._0._1,
                      acc),
                      _v22._0._1);}
                 break;
               case "Nothing": return acc;}
            _U.badCase($moduleName,
            "between lines 286 and 289");
         }();
      }();
   });
   var preOrderList = listForTraversal(preOrder);
   var MkTree = F2(function (a,b) {
      return {ctor: "MkTree"
             ,_0: a
             ,_1: b};
   });
   var empty = A2(MkTree,
   0,
   $Maybe.Nothing);
   var isEmpty = function (tree) {
      return _U.eq(tree,empty);
   };
   var inner = F2(function (label,
   children) {
      return function () {
         var children$ = A2($List.filter,
         function ($) {
            return $Basics.not(isEmpty($));
         },
         children);
         var size$ = A3($List.foldl,
         function ($) {
            return F2(function (x,y) {
               return x + y;
            })(size($));
         },
         1,
         children$);
         return A2(MkTree,
         size$,
         $Maybe.Just({ctor: "_Tuple2"
                     ,_0: label
                     ,_1: children$}));
      }();
   });
   var leaf = function (val) {
      return A2(inner,
      val,
      _L.fromArray([]));
   };
   var unfoldTree = F2(function (next,
   seed) {
      return function () {
         var $ = next(seed),
         label = $._0,
         seeds = $._1;
         return A2(inner,
         label,
         A2($List.map,
         unfoldTree(next),
         seeds));
      }();
   });
   var unfoldForest = F2(function (next,
   seeds) {
      return A2($List.map,
      unfoldTree(next),
      seeds);
   });
   _elm.Graph.Tree.values = {_op: _op
                            ,empty: empty
                            ,leaf: leaf
                            ,inner: inner
                            ,unfoldTree: unfoldTree
                            ,unfoldForest: unfoldForest
                            ,isEmpty: isEmpty
                            ,root: root
                            ,size: size
                            ,height: height
                            ,levelOrder: levelOrder
                            ,levelOrderList: levelOrderList
                            ,preOrder: preOrder
                            ,preOrderList: preOrderList
                            ,postOrder: postOrder
                            ,postOrderList: postOrderList};
   return _elm.Graph.Tree.values;
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Collage = Elm.Graphics.Collage || {};
Elm.Graphics.Collage.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Collage = _elm.Graphics.Collage || {};
   if (_elm.Graphics.Collage.values)
   return _elm.Graphics.Collage.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graphics.Collage",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $List = Elm.List.make(_elm),
   $Native$Graphics$Collage = Elm.Native.Graphics.Collage.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Transform2D = Elm.Transform2D.make(_elm);
   var ngon = F2(function (n,r) {
      return function () {
         var m = $Basics.toFloat(n);
         var t = 2 * $Basics.pi / m;
         var f = function (i) {
            return {ctor: "_Tuple2"
                   ,_0: r * $Basics.cos(t * i)
                   ,_1: r * $Basics.sin(t * i)};
         };
         return A2($List.map,
         f,
         _L.range(0,m - 1));
      }();
   });
   var oval = F2(function (w,h) {
      return function () {
         var hh = h / 2;
         var hw = w / 2;
         var n = 50;
         var t = 2 * $Basics.pi / n;
         var f = function (i) {
            return {ctor: "_Tuple2"
                   ,_0: hw * $Basics.cos(t * i)
                   ,_1: hh * $Basics.sin(t * i)};
         };
         return A2($List.map,
         f,
         _L.range(0,n - 1));
      }();
   });
   var circle = function (r) {
      return A2(oval,2 * r,2 * r);
   };
   var rect = F2(function (w,h) {
      return function () {
         var hh = h / 2;
         var hw = w / 2;
         return _L.fromArray([{ctor: "_Tuple2"
                              ,_0: 0 - hw
                              ,_1: 0 - hh}
                             ,{ctor: "_Tuple2"
                              ,_0: 0 - hw
                              ,_1: hh}
                             ,{ctor: "_Tuple2",_0: hw,_1: hh}
                             ,{ctor: "_Tuple2"
                              ,_0: hw
                              ,_1: 0 - hh}]);
      }();
   });
   var square = function (n) {
      return A2(rect,n,n);
   };
   var polygon = function (points) {
      return points;
   };
   var segment = F2(function (p1,
   p2) {
      return _L.fromArray([p1,p2]);
   });
   var path = function (ps) {
      return ps;
   };
   var collage = $Native$Graphics$Collage.collage;
   var alpha = F2(function (a,f) {
      return _U.replace([["alpha"
                         ,a]],
      f);
   });
   var rotate = F2(function (t,f) {
      return _U.replace([["theta"
                         ,f.theta + t]],
      f);
   });
   var scale = F2(function (s,f) {
      return _U.replace([["scale"
                         ,f.scale * s]],
      f);
   });
   var moveY = F2(function (y,f) {
      return _U.replace([["y"
                         ,f.y + y]],
      f);
   });
   var moveX = F2(function (x,f) {
      return _U.replace([["x"
                         ,f.x + x]],
      f);
   });
   var move = F2(function (_v0,f) {
      return function () {
         switch (_v0.ctor)
         {case "_Tuple2":
            return _U.replace([["x"
                               ,f.x + _v0._0]
                              ,["y",f.y + _v0._1]],
              f);}
         _U.badCase($moduleName,
         "on line 226, column 3 to 37");
      }();
   });
   var form = function (f) {
      return {_: {}
             ,alpha: 1
             ,form: f
             ,scale: 1
             ,theta: 0
             ,x: 0
             ,y: 0};
   };
   var Fill = function (a) {
      return {ctor: "Fill",_0: a};
   };
   var Line = function (a) {
      return {ctor: "Line",_0: a};
   };
   var FGroup = F2(function (a,b) {
      return {ctor: "FGroup"
             ,_0: a
             ,_1: b};
   });
   var group = function (fs) {
      return form(A2(FGroup,
      $Transform2D.identity,
      fs));
   };
   var groupTransform = F2(function (matrix,
   fs) {
      return form(A2(FGroup,
      matrix,
      fs));
   });
   var FElement = function (a) {
      return {ctor: "FElement"
             ,_0: a};
   };
   var toForm = function (e) {
      return form(FElement(e));
   };
   var FImage = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "FImage"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var sprite = F4(function (w,
   h,
   pos,
   src) {
      return form(A4(FImage,
      w,
      h,
      pos,
      src));
   });
   var FText = function (a) {
      return {ctor: "FText",_0: a};
   };
   var text = function (t) {
      return form(FText(t));
   };
   var FOutlinedText = F2(function (a,
   b) {
      return {ctor: "FOutlinedText"
             ,_0: a
             ,_1: b};
   });
   var outlinedText = F2(function (ls,
   t) {
      return form(A2(FOutlinedText,
      ls,
      t));
   });
   var FShape = F2(function (a,b) {
      return {ctor: "FShape"
             ,_0: a
             ,_1: b};
   });
   var fill = F2(function (style,
   shape) {
      return form(A2(FShape,
      Fill(style),
      shape));
   });
   var outlined = F2(function (style,
   shape) {
      return form(A2(FShape,
      Line(style),
      shape));
   });
   var FPath = F2(function (a,b) {
      return {ctor: "FPath"
             ,_0: a
             ,_1: b};
   });
   var traced = F2(function (style,
   path) {
      return form(A2(FPath,
      style,
      path));
   });
   var LineStyle = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,cap: c
             ,color: a
             ,dashOffset: f
             ,dashing: e
             ,join: d
             ,width: b};
   });
   var Clipped = {ctor: "Clipped"};
   var Sharp = function (a) {
      return {ctor: "Sharp",_0: a};
   };
   var Smooth = {ctor: "Smooth"};
   var Padded = {ctor: "Padded"};
   var Round = {ctor: "Round"};
   var Flat = {ctor: "Flat"};
   var defaultLine = {_: {}
                     ,cap: Flat
                     ,color: $Color.black
                     ,dashOffset: 0
                     ,dashing: _L.fromArray([])
                     ,join: Sharp(10)
                     ,width: 1};
   var solid = function (clr) {
      return _U.replace([["color"
                         ,clr]],
      defaultLine);
   };
   var dashed = function (clr) {
      return _U.replace([["color"
                         ,clr]
                        ,["dashing"
                         ,_L.fromArray([8,4])]],
      defaultLine);
   };
   var dotted = function (clr) {
      return _U.replace([["color"
                         ,clr]
                        ,["dashing"
                         ,_L.fromArray([3,3])]],
      defaultLine);
   };
   var Grad = function (a) {
      return {ctor: "Grad",_0: a};
   };
   var gradient = F2(function (grad,
   shape) {
      return A2(fill,
      Grad(grad),
      shape);
   });
   var Texture = function (a) {
      return {ctor: "Texture"
             ,_0: a};
   };
   var textured = F2(function (src,
   shape) {
      return A2(fill,
      Texture(src),
      shape);
   });
   var Solid = function (a) {
      return {ctor: "Solid",_0: a};
   };
   var filled = F2(function (color,
   shape) {
      return A2(fill,
      Solid(color),
      shape);
   });
   var Form = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,alpha: e
             ,form: f
             ,scale: b
             ,theta: a
             ,x: c
             ,y: d};
   });
   _elm.Graphics.Collage.values = {_op: _op
                                  ,collage: collage
                                  ,toForm: toForm
                                  ,filled: filled
                                  ,textured: textured
                                  ,gradient: gradient
                                  ,outlined: outlined
                                  ,traced: traced
                                  ,text: text
                                  ,outlinedText: outlinedText
                                  ,move: move
                                  ,moveX: moveX
                                  ,moveY: moveY
                                  ,scale: scale
                                  ,rotate: rotate
                                  ,alpha: alpha
                                  ,group: group
                                  ,groupTransform: groupTransform
                                  ,rect: rect
                                  ,oval: oval
                                  ,square: square
                                  ,circle: circle
                                  ,ngon: ngon
                                  ,polygon: polygon
                                  ,segment: segment
                                  ,path: path
                                  ,solid: solid
                                  ,dashed: dashed
                                  ,dotted: dotted
                                  ,defaultLine: defaultLine
                                  ,Form: Form
                                  ,LineStyle: LineStyle
                                  ,Flat: Flat
                                  ,Round: Round
                                  ,Padded: Padded
                                  ,Smooth: Smooth
                                  ,Sharp: Sharp
                                  ,Clipped: Clipped};
   return _elm.Graphics.Collage.values;
};
Elm.Graphics = Elm.Graphics || {};
Elm.Graphics.Element = Elm.Graphics.Element || {};
Elm.Graphics.Element.make = function (_elm) {
   "use strict";
   _elm.Graphics = _elm.Graphics || {};
   _elm.Graphics.Element = _elm.Graphics.Element || {};
   if (_elm.Graphics.Element.values)
   return _elm.Graphics.Element.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Graphics.Element",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Graphics$Element = Elm.Native.Graphics.Element.make(_elm),
   $Text = Elm.Text.make(_elm);
   var DOut = {ctor: "DOut"};
   var outward = DOut;
   var DIn = {ctor: "DIn"};
   var inward = DIn;
   var DRight = {ctor: "DRight"};
   var right = DRight;
   var DLeft = {ctor: "DLeft"};
   var left = DLeft;
   var DDown = {ctor: "DDown"};
   var down = DDown;
   var DUp = {ctor: "DUp"};
   var up = DUp;
   var Position = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,horizontal: a
             ,vertical: b
             ,x: c
             ,y: d};
   });
   var Relative = function (a) {
      return {ctor: "Relative"
             ,_0: a};
   };
   var relative = Relative;
   var Absolute = function (a) {
      return {ctor: "Absolute"
             ,_0: a};
   };
   var absolute = Absolute;
   var N = {ctor: "N"};
   var bottomLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var Z = {ctor: "Z"};
   var middle = {_: {}
                ,horizontal: Z
                ,vertical: Z
                ,x: Relative(0.5)
                ,y: Relative(0.5)};
   var midLeft = _U.replace([["horizontal"
                             ,N]
                            ,["x",Absolute(0)]],
   middle);
   var middleAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midBottomAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var P = {ctor: "P"};
   var topLeft = {_: {}
                 ,horizontal: N
                 ,vertical: P
                 ,x: Absolute(0)
                 ,y: Absolute(0)};
   var bottomLeft = _U.replace([["vertical"
                                ,N]],
   topLeft);
   var topRight = _U.replace([["horizontal"
                              ,P]],
   topLeft);
   var bottomRight = _U.replace([["horizontal"
                                 ,P]],
   bottomLeft);
   var midRight = _U.replace([["horizontal"
                              ,P]],
   midLeft);
   var midTop = _U.replace([["vertical"
                            ,P]
                           ,["y",Absolute(0)]],
   middle);
   var midBottom = _U.replace([["vertical"
                               ,N]],
   midTop);
   var topLeftAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: N
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var topRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var bottomRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: N
             ,x: x
             ,y: y};
   });
   var midRightAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: P
             ,vertical: Z
             ,x: x
             ,y: y};
   });
   var midTopAt = F2(function (x,
   y) {
      return {_: {}
             ,horizontal: Z
             ,vertical: P
             ,x: x
             ,y: y};
   });
   var justified = $Native$Graphics$Element.block("justify");
   var centered = $Native$Graphics$Element.block("center");
   var rightAligned = $Native$Graphics$Element.block("right");
   var leftAligned = $Native$Graphics$Element.block("left");
   var show = function (value) {
      return leftAligned($Text.monospace($Text.fromString($Basics.toString(value))));
   };
   var Tiled = {ctor: "Tiled"};
   var Cropped = function (a) {
      return {ctor: "Cropped"
             ,_0: a};
   };
   var Fitted = {ctor: "Fitted"};
   var Plain = {ctor: "Plain"};
   var Custom = {ctor: "Custom"};
   var RawHtml = {ctor: "RawHtml"};
   var Spacer = {ctor: "Spacer"};
   var Flow = F2(function (a,b) {
      return {ctor: "Flow"
             ,_0: a
             ,_1: b};
   });
   var Container = F2(function (a,
   b) {
      return {ctor: "Container"
             ,_0: a
             ,_1: b};
   });
   var Image = F4(function (a,
   b,
   c,
   d) {
      return {ctor: "Image"
             ,_0: a
             ,_1: b
             ,_2: c
             ,_3: d};
   });
   var newElement = $Native$Graphics$Element.newElement;
   var image = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Plain,w,h,src));
   });
   var fittedImage = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Fitted,w,h,src));
   });
   var croppedImage = F4(function (pos,
   w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Cropped(pos),w,h,src));
   });
   var tiledImage = F3(function (w,
   h,
   src) {
      return A3(newElement,
      w,
      h,
      A4(Image,Tiled,w,h,src));
   });
   var container = F4(function (w,
   h,
   pos,
   e) {
      return A3(newElement,
      w,
      h,
      A2(Container,pos,e));
   });
   var spacer = F2(function (w,h) {
      return A3(newElement,
      w,
      h,
      Spacer);
   });
   var link = F2(function (href,
   e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["href"
                                    ,href]],
                p)};
      }();
   });
   var tag = F2(function (name,e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["tag"
                                    ,name]],
                p)};
      }();
   });
   var color = F2(function (c,e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["color"
                                    ,$Maybe.Just(c)]],
                p)};
      }();
   });
   var opacity = F2(function (o,
   e) {
      return function () {
         var p = e.props;
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["opacity"
                                    ,o]],
                p)};
      }();
   });
   var height = F2(function (nh,
   e) {
      return function () {
         var p = e.props;
         var props = function () {
            var _v0 = e.element;
            switch (_v0.ctor)
            {case "Image":
               return _U.replace([["width"
                                  ,$Basics.round($Basics.toFloat(_v0._1) / $Basics.toFloat(_v0._2) * $Basics.toFloat(nh))]],
                 p);}
            return p;
         }();
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["height"
                                    ,nh]],
                p)};
      }();
   });
   var width = F2(function (nw,e) {
      return function () {
         var p = e.props;
         var props = function () {
            var _v5 = e.element;
            switch (_v5.ctor)
            {case "Image":
               return _U.replace([["height"
                                  ,$Basics.round($Basics.toFloat(_v5._2) / $Basics.toFloat(_v5._1) * $Basics.toFloat(nw))]],
                 p);
               case "RawHtml":
               return _U.replace([["height"
                                  ,$Basics.snd(A2($Native$Graphics$Element.htmlHeight,
                                  nw,
                                  e.element))]],
                 p);}
            return p;
         }();
         return {_: {}
                ,element: e.element
                ,props: _U.replace([["width"
                                    ,nw]],
                props)};
      }();
   });
   var size = F3(function (w,h,e) {
      return A2(height,
      h,
      A2(width,w,e));
   });
   var sizeOf = function (e) {
      return {ctor: "_Tuple2"
             ,_0: e.props.width
             ,_1: e.props.height};
   };
   var heightOf = function (e) {
      return e.props.height;
   };
   var widthOf = function (e) {
      return e.props.width;
   };
   var above = F2(function (hi,
   lo) {
      return A3(newElement,
      A2($Basics.max,
      widthOf(hi),
      widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,
      DDown,
      _L.fromArray([hi,lo])));
   });
   var below = F2(function (lo,
   hi) {
      return A3(newElement,
      A2($Basics.max,
      widthOf(hi),
      widthOf(lo)),
      heightOf(hi) + heightOf(lo),
      A2(Flow,
      DDown,
      _L.fromArray([hi,lo])));
   });
   var beside = F2(function (lft,
   rht) {
      return A3(newElement,
      widthOf(lft) + widthOf(rht),
      A2($Basics.max,
      heightOf(lft),
      heightOf(rht)),
      A2(Flow,
      right,
      _L.fromArray([lft,rht])));
   });
   var layers = function (es) {
      return function () {
         var hs = A2($List.map,
         heightOf,
         es);
         var ws = A2($List.map,
         widthOf,
         es);
         return A3(newElement,
         A2($Maybe.withDefault,
         0,
         $List.maximum(ws)),
         A2($Maybe.withDefault,
         0,
         $List.maximum(hs)),
         A2(Flow,DOut,es));
      }();
   };
   var empty = A2(spacer,0,0);
   var flow = F2(function (dir,
   es) {
      return function () {
         var newFlow = F2(function (w,
         h) {
            return A3(newElement,
            w,
            h,
            A2(Flow,dir,es));
         });
         var maxOrZero = function (list) {
            return A2($Maybe.withDefault,
            0,
            $List.maximum(list));
         };
         var hs = A2($List.map,
         heightOf,
         es);
         var ws = A2($List.map,
         widthOf,
         es);
         return _U.eq(es,
         _L.fromArray([])) ? empty : function () {
            switch (dir.ctor)
            {case "DDown":
               return A2(newFlow,
                 maxOrZero(ws),
                 $List.sum(hs));
               case "DIn": return A2(newFlow,
                 maxOrZero(ws),
                 maxOrZero(hs));
               case "DLeft": return A2(newFlow,
                 $List.sum(ws),
                 maxOrZero(hs));
               case "DOut": return A2(newFlow,
                 maxOrZero(ws),
                 maxOrZero(hs));
               case "DRight":
               return A2(newFlow,
                 $List.sum(ws),
                 maxOrZero(hs));
               case "DUp": return A2(newFlow,
                 maxOrZero(ws),
                 $List.sum(hs));}
            _U.badCase($moduleName,
            "between lines 362 and 368");
         }();
      }();
   });
   var Properties = F9(function (a,
   b,
   c,
   d,
   e,
   f,
   g,
   h,
   i) {
      return {_: {}
             ,click: i
             ,color: e
             ,height: c
             ,hover: h
             ,href: f
             ,id: a
             ,opacity: d
             ,tag: g
             ,width: b};
   });
   var Element = F2(function (a,
   b) {
      return {_: {}
             ,element: b
             ,props: a};
   });
   _elm.Graphics.Element.values = {_op: _op
                                  ,image: image
                                  ,fittedImage: fittedImage
                                  ,croppedImage: croppedImage
                                  ,tiledImage: tiledImage
                                  ,leftAligned: leftAligned
                                  ,rightAligned: rightAligned
                                  ,centered: centered
                                  ,justified: justified
                                  ,show: show
                                  ,width: width
                                  ,height: height
                                  ,size: size
                                  ,color: color
                                  ,opacity: opacity
                                  ,link: link
                                  ,tag: tag
                                  ,widthOf: widthOf
                                  ,heightOf: heightOf
                                  ,sizeOf: sizeOf
                                  ,flow: flow
                                  ,up: up
                                  ,down: down
                                  ,left: left
                                  ,right: right
                                  ,inward: inward
                                  ,outward: outward
                                  ,layers: layers
                                  ,above: above
                                  ,below: below
                                  ,beside: beside
                                  ,empty: empty
                                  ,spacer: spacer
                                  ,container: container
                                  ,middle: middle
                                  ,midTop: midTop
                                  ,midBottom: midBottom
                                  ,midLeft: midLeft
                                  ,midRight: midRight
                                  ,topLeft: topLeft
                                  ,topRight: topRight
                                  ,bottomLeft: bottomLeft
                                  ,bottomRight: bottomRight
                                  ,absolute: absolute
                                  ,relative: relative
                                  ,middleAt: middleAt
                                  ,midTopAt: midTopAt
                                  ,midBottomAt: midBottomAt
                                  ,midLeftAt: midLeftAt
                                  ,midRightAt: midRightAt
                                  ,topLeftAt: topLeftAt
                                  ,topRightAt: topRightAt
                                  ,bottomLeftAt: bottomLeftAt
                                  ,bottomRightAt: bottomRightAt
                                  ,Element: Element
                                  ,Position: Position};
   return _elm.Graphics.Element.values;
};
Elm.Helpers = Elm.Helpers || {};
Elm.Helpers.make = function (_elm) {
   "use strict";
   _elm.Helpers = _elm.Helpers || {};
   if (_elm.Helpers.values)
   return _elm.Helpers.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Helpers",
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Graph = Elm.Graph.make(_elm),
   $Graph$Tree = Elm.Graph.Tree.make(_elm),
   $IntDict = Elm.IntDict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Types = Elm.Types.make(_elm);
   var findPathInTree = F2(function (goalId,
   tree) {
      return function () {
         var _v0 = $Graph$Tree.root(tree);
         switch (_v0.ctor)
         {case "Just":
            switch (_v0._0.ctor)
              {case "_Tuple2":
                 return _U.eq(_v0._0._0.node.id,
                   goalId) ? $Maybe.Just(_L.fromArray([goalId])) : function () {
                      var paths = A2($List.filterMap,
                      findPathInTree(goalId),
                      _v0._0._1);
                      return $Maybe.map(function (lst) {
                         return A2($List._op["::"],
                         _v0._0._0.node.id,
                         lst);
                      })($List.head(paths));
                   }();}
              break;
            case "Nothing":
            return $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 47 and 54");
      }();
   });
   var addCoords = F2(function (_v4,
   _v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple2":
            return function () {
                 switch (_v4.ctor)
                 {case "_Tuple2":
                    return {ctor: "_Tuple2"
                           ,_0: _v4._0 + _v5._0
                           ,_1: _v4._1 + _v5._1};}
                 _U.badCase($moduleName,
                 "on line 35, column 30 to 42");
              }();}
         _U.badCase($moduleName,
         "on line 35, column 30 to 42");
      }();
   });
   var interpolate = F3(function (p1,
   p2,
   fraction) {
      return {_: {}
             ,x: (1 - fraction) * p1.x + fraction * p2.x
             ,y: (1 - fraction) * p1.y + fraction * p2.y};
   });
   var dist = F2(function (x,y) {
      return $Basics.sqrt(Math.pow(x,
      2) + Math.pow(y,2));
   });
   var watchIf = F3(function (str,
   bool,
   value) {
      return bool ? A2($Debug.watch,
      str,
      value) : value;
   });
   var dropRight = function (lst) {
      return $List.reverse($List.drop(1)($List.reverse(lst)));
   };
   var carRouteFromList = function (x) {
      return function () {
         switch (x.ctor)
         {case "::":
            return $IntDict.fromList(A3($List.map2,
              F2(function (v0,v1) {
                 return {ctor: "_Tuple2"
                        ,_0: v0
                        ,_1: v1};
              }),
              dropRight(A2($List._op["::"],
              x._0,
              x._1)),
              x._1));
            case "[]":
            return $IntDict.empty;}
         _U.badCase($moduleName,
         "between lines 71 and 73");
      }();
   };
   var getOrFail = F2(function (ex,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just": return maybe._0;
            case "Nothing":
            return $Debug.crash(ex);}
         _U.badCase($moduleName,
         "between lines 13 and 15");
      }();
   });
   var findPath = F2(function (net,
   _v17) {
      return function () {
         switch (_v17.ctor)
         {case "_Tuple2":
            return function () {
                 var dfsTree = A2($Graph.dfsTree,
                 _v17._0,
                 net);
                 return getOrFail("couldn\'t find path!")(A2(findPathInTree,
                 _v17._1,
                 dfsTree));
              }();}
         _U.badCase($moduleName,
         "between lines 41 and 43");
      }();
   });
   var busRouteFromList = F2(function (x,
   net) {
      return function () {
         switch (x.ctor)
         {case "::": return function () {
                 var pairs = A3($List.map2,
                 F2(function (v0,v1) {
                    return {ctor: "_Tuple2"
                           ,_0: v0
                           ,_1: v1};
                 }),
                 A2($List._op["::"],x._0,x._1),
                 A2($Basics._op["++"],
                 x._1,
                 _L.fromArray([x._0])));
                 var subroutes = A2($List.map,
                 findPath(net),
                 pairs);
                 var combinedList = A2($List.concatMap,
                 $List.drop(1),
                 subroutes);
                 var first = getOrFail("")($List.head(combinedList));
                 var rest = getOrFail("")($List.tail(combinedList));
                 return $IntDict.fromList(A3($List.map2,
                 F2(function (v0,v1) {
                    return {ctor: "_Tuple2"
                           ,_0: v0
                           ,_1: v1};
                 }),
                 combinedList,
                 A2($Basics._op["++"],
                 rest,
                 _L.fromArray([first]))));
              }();
            case "[]":
            return $IntDict.empty;}
         _U.badCase($moduleName,
         "between lines 59 and 68");
      }();
   });
   _elm.Helpers.values = {_op: _op
                         ,getOrFail: getOrFail
                         ,dropRight: dropRight
                         ,watchIf: watchIf
                         ,dist: dist
                         ,interpolate: interpolate
                         ,addCoords: addCoords
                         ,findPath: findPath
                         ,findPathInTree: findPathInTree
                         ,busRouteFromList: busRouteFromList
                         ,carRouteFromList: carRouteFromList};
   return _elm.Helpers.values;
};
Elm.IntDict = Elm.IntDict || {};
Elm.IntDict.make = function (_elm) {
   "use strict";
   _elm.IntDict = _elm.IntDict || {};
   if (_elm.IntDict.values)
   return _elm.IntDict.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "IntDict",
   $Basics = Elm.Basics.make(_elm),
   $Bitwise = Elm.Bitwise.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var combineBits = F3(function (a,
   b,
   mask) {
      return A2($Bitwise.or,
      A2($Bitwise.and,
      a,
      $Bitwise.complement(mask)),
      A2($Bitwise.and,b,mask));
   });
   var Siblings = function (a) {
      return {ctor: "Siblings"
             ,_0: a};
   };
   var RightChild = function (a) {
      return {ctor: "RightChild"
             ,_0: a};
   };
   var LeftChild = function (a) {
      return {ctor: "LeftChild"
             ,_0: a};
   };
   var Same = {ctor: "Same"};
   var foldr = F3(function (f,
   acc,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty": return acc;
            case "Inner": return A3(foldr,
              f,
              A3(foldr,f,acc,dict._0.right),
              dict._0.left);
            case "Leaf": return A3(f,
              dict._0.key,
              dict._0.value,
              acc);}
         _U.badCase($moduleName,
         "between lines 342 and 347");
      }();
   });
   var keys = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      keyList) {
         return A2($List._op["::"],
         key,
         keyList);
      }),
      _L.fromArray([]),
      dict);
   };
   var values = function (dict) {
      return A3(foldr,
      F3(function (key,
      value,
      valueList) {
         return A2($List._op["::"],
         value,
         valueList);
      }),
      _L.fromArray([]),
      dict);
   };
   var toList = function (dict) {
      return A3(foldr,
      F3(function (key,value,list) {
         return A2($List._op["::"],
         {ctor: "_Tuple2"
         ,_0: key
         ,_1: value},
         list);
      }),
      _L.fromArray([]),
      dict);
   };
   var toString$ = function (dict) {
      return A2($Basics._op["++"],
      "IntDict.fromList ",
      $Basics.toString(toList(dict)));
   };
   var foldl = F3(function (f,
   acc,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty": return acc;
            case "Inner": return A3(foldl,
              f,
              A3(foldl,f,acc,dict._0.left),
              dict._0.right);
            case "Leaf": return A3(f,
              dict._0.key,
              dict._0.value,
              acc);}
         _U.badCase($moduleName,
         "between lines 331 and 336");
      }();
   });
   var findMax = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty":
            return $Maybe.Nothing;
            case "Inner":
            return findMax(dict._0.right);
            case "Leaf":
            return $Maybe.Just({ctor: "_Tuple2"
                               ,_0: dict._0.key
                               ,_1: dict._0.value});}
         _U.badCase($moduleName,
         "between lines 299 and 302");
      }();
   };
   var findMin = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty":
            return $Maybe.Nothing;
            case "Inner":
            return findMin(dict._0.left);
            case "Leaf":
            return $Maybe.Just({ctor: "_Tuple2"
                               ,_0: dict._0.key
                               ,_1: dict._0.value});}
         _U.badCase($moduleName,
         "between lines 290 and 293");
      }();
   };
   var size = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty": return 0;
            case "Inner":
            return dict._0.size;
            case "Leaf": return 1;}
         _U.badCase($moduleName,
         "between lines 253 and 257");
      }();
   };
   var isEmpty = function (dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty": return true;}
         return false;
      }();
   };
   var highestBitSet = function (n) {
      return function () {
         var shiftOr = F2(function (n$,
         shift) {
            return A2($Bitwise.or,
            n$,
            A2($Bitwise.shiftRightLogical,
            n$,
            shift));
         });
         var n1 = A2(shiftOr,n,1);
         var n2 = A2(shiftOr,n1,2);
         var n3 = A2(shiftOr,n2,4);
         var n4 = A2(shiftOr,n3,8);
         var n5 = A2(shiftOr,n4,16);
         return A2($Bitwise.and,
         n5,
         $Bitwise.complement(A2($Bitwise.shiftRightLogical,
         n5,
         1)));
      }();
   };
   var signBit = highestBitSet(-1);
   var isBranchingBitSet = F2(function (p,
   n) {
      return function () {
         var n$ = A2($Bitwise.xor,
         n,
         signBit);
         return !_U.eq(A2($Bitwise.and,
         n$,
         p.branchingBit),
         0);
      }();
   });
   var higherBitMask = function (branchingBit) {
      return $Bitwise.complement(branchingBit * 2 - 1);
   };
   var prefixMatches = F2(function (p,
   n) {
      return _U.eq(A2($Bitwise.and,
      n,
      higherBitMask(p.branchingBit)),
      p.prefixBits);
   });
   var get = F2(function (key,
   dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty":
            return $Maybe.Nothing;
            case "Inner":
            return $Basics.not(A2(prefixMatches,
              dict._0.prefix,
              key)) ? $Maybe.Nothing : A2(isBranchingBitSet,
              dict._0.prefix,
              key) ? A2(get,
              key,
              dict._0.right) : A2(get,
              key,
              dict._0.left);
            case "Leaf":
            return _U.eq(dict._0.key,
              key) ? $Maybe.Just(dict._0.value) : $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 272 and 284");
      }();
   });
   var member = F2(function (key,
   dict) {
      return function () {
         var _v19 = A2(get,key,dict);
         switch (_v19.ctor)
         {case "Just": return true;
            case "Nothing": return false;}
         _U.badCase($moduleName,
         "between lines 262 and 264");
      }();
   });
   var lcp = F2(function (x,y) {
      return function () {
         var diff = A2($Bitwise.xor,
         x,
         y);
         var branchingBit = highestBitSet(diff);
         var mask = higherBitMask(branchingBit);
         var prefixBits = A2($Bitwise.and,
         x,
         mask);
         return {_: {}
                ,branchingBit: branchingBit
                ,prefixBits: prefixBits};
      }();
   });
   var determineInnerRelation = F2(function (l,
   r) {
      return function () {
         var parentOf = F2(function (p,
         c) {
            return A2(isBranchingBitSet,
            p.prefix,
            c.prefix.prefixBits) ? RightChild({_: {}
                                              ,p: p
                                              ,r: c}) : LeftChild({_: {}
                                                                  ,l: c
                                                                  ,p: p});
         });
         var rp = r.prefix;
         var lp = l.prefix;
         var mask = highestBitSet(A2($Basics.max,
         lp.branchingBit,
         rp.branchingBit));
         var modifiedRightPrefix = A3(combineBits,
         rp.prefixBits,
         $Bitwise.complement(lp.prefixBits),
         mask);
         var prefix = A2(lcp,
         lp.prefixBits,
         modifiedRightPrefix);
         return _U.eq(l.prefix,
         r.prefix) ? Same : _U.eq(prefix,
         l.prefix) ? A2(parentOf,
         l,
         r) : _U.eq(prefix,
         r.prefix) ? A2(parentOf,
         r,
         l) : A2(isBranchingBitSet,
         prefix,
         rp.prefixBits) ? Siblings({_: {}
                                   ,l: l
                                   ,parentPrefix: prefix
                                   ,r: r}) : Siblings({_: {}
                                                      ,l: r
                                                      ,parentPrefix: prefix
                                                      ,r: l});
      }();
   });
   var isValidKey = function (k) {
      return _U.eq(A2($Bitwise.or,
      k,
      0),
      k);
   };
   var Inner = function (a) {
      return {ctor: "Inner",_0: a};
   };
   var inner = F3(function (p,
   l,
   r) {
      return function () {
         var _v21 = {ctor: "_Tuple2"
                    ,_0: l
                    ,_1: r};
         switch (_v21.ctor)
         {case "_Tuple2":
            switch (_v21._0.ctor)
              {case "Empty": return r;}
              switch (_v21._1.ctor)
              {case "Empty": return l;}
              return Inner({_: {}
                           ,left: l
                           ,prefix: p
                           ,right: r
                           ,size: size(l) + size(r)});}
         _U.badCase($moduleName,
         "between lines 100 and 108");
      }();
   });
   var Leaf = function (a) {
      return {ctor: "Leaf",_0: a};
   };
   var leaf = F2(function (k,v) {
      return Leaf({_: {}
                  ,key: k
                  ,value: v});
   });
   var singleton = F2(function (key,
   value) {
      return A2(leaf,key,value);
   });
   var Empty = {ctor: "Empty"};
   var empty = Empty;
   var update = F3(function (key,
   alter,
   dict) {
      return function () {
         var join = F2(function (_v24,
         _v25) {
            return function () {
               switch (_v25.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v24.ctor)
                       {case "_Tuple2":
                          return function () {
                               var prefix = A2(lcp,
                               _v24._0,
                               _v25._0);
                               return A2(isBranchingBitSet,
                               prefix,
                               _v25._0) ? A3(inner,
                               prefix,
                               _v24._1,
                               _v25._1) : A3(inner,
                               prefix,
                               _v25._1,
                               _v24._1);
                            }();}
                       _U.badCase($moduleName,
                       "between lines 218 and 221");
                    }();}
               _U.badCase($moduleName,
               "between lines 218 and 221");
            }();
         });
         var alteredNode = function (v) {
            return function () {
               var _v32 = alter(v);
               switch (_v32.ctor)
               {case "Just": return A2(leaf,
                    key,
                    _v32._0);
                  case "Nothing": return empty;}
               _U.badCase($moduleName,
               "between lines 213 and 217");
            }();
         };
         return function () {
            switch (dict.ctor)
            {case "Empty":
               return alteredNode($Maybe.Nothing);
               case "Inner":
               return A2(prefixMatches,
                 dict._0.prefix,
                 key) ? A2(isBranchingBitSet,
                 dict._0.prefix,
                 key) ? A3(inner,
                 dict._0.prefix,
                 dict._0.left,
                 A3(update,
                 key,
                 alter,
                 dict._0.right)) : A3(inner,
                 dict._0.prefix,
                 A3(update,
                 key,
                 alter,
                 dict._0.left),
                 dict._0.right) : A2(join,
                 {ctor: "_Tuple2"
                 ,_0: key
                 ,_1: alteredNode($Maybe.Nothing)},
                 {ctor: "_Tuple2"
                 ,_0: dict._0.prefix.prefixBits
                 ,_1: dict});
               case "Leaf":
               return _U.eq(dict._0.key,
                 key) ? alteredNode($Maybe.Just(dict._0.value)) : A2(join,
                 {ctor: "_Tuple2"
                 ,_0: key
                 ,_1: alteredNode($Maybe.Nothing)},
                 {ctor: "_Tuple2"
                 ,_0: dict._0.key
                 ,_1: dict});}
            _U.badCase($moduleName,
            "between lines 223 and 236");
         }();
      }();
   });
   var insert = F3(function (key,
   value,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Just(value)),
      dict);
   });
   var remove = F2(function (key,
   dict) {
      return A3(update,
      key,
      $Basics.always($Maybe.Nothing),
      dict);
   });
   var uniteWith = F3(function (merger,
   d1,
   d2) {
      return function () {
         var mergeWith = F3(function (key,
         left,
         right) {
            return function () {
               var _v37 = {ctor: "_Tuple2"
                          ,_0: left
                          ,_1: right};
               switch (_v37.ctor)
               {case "_Tuple2":
                  switch (_v37._0.ctor)
                    {case "Just":
                       switch (_v37._1.ctor)
                         {case "Just":
                            return $Maybe.Just(A3(merger,
                              key,
                              _v37._0._0,
                              _v37._1._0));}
                         return left;}
                    switch (_v37._1.ctor)
                    {case "Just": return right;}
                    switch (_v37._0.ctor)
                    {case "Nothing":
                       switch (_v37._1.ctor)
                         {case "Nothing":
                            return $Debug.crash("IntDict.uniteWith: mergeWith was called with 2 Nothings. This is a bug in the implementation, please file a bug report!");}
                         break;}
                    break;}
               _U.badCase($moduleName,
               "between lines 406 and 412");
            }();
         });
         return function () {
            var _v43 = {ctor: "_Tuple2"
                       ,_0: d1
                       ,_1: d2};
            switch (_v43.ctor)
            {case "_Tuple2":
               switch (_v43._0.ctor)
                 {case "Empty": return _v43._1;}
                 switch (_v43._1.ctor)
                 {case "Empty": return _v43._0;}
                 switch (_v43._0.ctor)
                 {case "Leaf": return A3(update,
                      _v43._0._0.key,
                      function (r$) {
                         return A3(mergeWith,
                         _v43._0._0.key,
                         $Maybe.Just(_v43._0._0.value),
                         r$);
                      },
                      _v43._1);}
                 switch (_v43._1.ctor)
                 {case "Leaf": return A3(update,
                      _v43._1._0.key,
                      function (l$) {
                         return A3(mergeWith,
                         _v43._1._0.key,
                         l$,
                         $Maybe.Just(_v43._1._0.value));
                      },
                      _v43._0);}
                 switch (_v43._0.ctor)
                 {case "Inner":
                    switch (_v43._1.ctor)
                      {case "Inner":
                         return function () {
                              var _v50 = A2(determineInnerRelation,
                              _v43._0._0,
                              _v43._1._0);
                              switch (_v50.ctor)
                              {case "LeftChild":
                                 return A3(inner,
                                   _v50._0.p.prefix,
                                   A3(uniteWith,
                                   merger,
                                   _v50._0.p.left,
                                   Inner(_v50._0.l)),
                                   _v50._0.p.right);
                                 case "RightChild":
                                 return A3(inner,
                                   _v50._0.p.prefix,
                                   _v50._0.p.left,
                                   A3(uniteWith,
                                   merger,
                                   _v50._0.p.right,
                                   Inner(_v50._0.r)));
                                 case "Same": return A3(inner,
                                   _v43._0._0.prefix,
                                   A3(uniteWith,
                                   merger,
                                   _v43._0._0.left,
                                   _v43._1._0.left),
                                   A3(uniteWith,
                                   merger,
                                   _v43._0._0.right,
                                   _v43._1._0.right));
                                 case "Siblings":
                                 return A3(inner,
                                   _v50._0.parentPrefix,
                                   Inner(_v50._0.l),
                                   Inner(_v50._0.r));}
                              _U.badCase($moduleName,
                              "between lines 417 and 427");
                           }();}
                      break;}
                 break;}
            _U.badCase($moduleName,
            "between lines 412 and 427");
         }();
      }();
   });
   var union = uniteWith(F3(function (key,
   old,
   $new) {
      return old;
   }));
   var filter = F2(function (predicate,
   dict) {
      return function () {
         var add = F3(function (k,
         v,
         d) {
            return A2(predicate,
            k,
            v) ? A3(insert,k,v,d) : d;
         });
         return A3(foldl,add,empty,dict);
      }();
   });
   var map = F2(function (f,dict) {
      return function () {
         switch (dict.ctor)
         {case "Empty": return empty;
            case "Inner": return A3(inner,
              dict._0.prefix,
              A2(map,f,dict._0.left),
              A2(map,f,dict._0.right));
            case "Leaf": return A2(leaf,
              dict._0.key,
              A2(f,
              dict._0.key,
              dict._0.value));}
         _U.badCase($moduleName,
         "between lines 322 and 325");
      }();
   });
   var partition = F2(function (predicate,
   dict) {
      return function () {
         var add = F3(function (key,
         value,
         _v57) {
            return function () {
               switch (_v57.ctor)
               {case "_Tuple2":
                  return A2(predicate,
                    key,
                    value) ? {ctor: "_Tuple2"
                             ,_0: A3(insert,
                             key,
                             value,
                             _v57._0)
                             ,_1: _v57._1} : {ctor: "_Tuple2"
                                             ,_0: _v57._0
                                             ,_1: A3(insert,
                                             key,
                                             value,
                                             _v57._1)};}
               _U.badCase($moduleName,
               "between lines 356 and 358");
            }();
         });
         return A3(foldl,
         add,
         {ctor: "_Tuple2"
         ,_0: empty
         ,_1: empty},
         dict);
      }();
   });
   var fromList = function (pairs) {
      return function () {
         var insert$ = F2(function (_v61,
         dict) {
            return function () {
               switch (_v61.ctor)
               {case "_Tuple2":
                  return A3(insert,
                    _v61._0,
                    _v61._1,
                    dict);}
               _U.badCase($moduleName,
               "on line 507, column 31 to 46");
            }();
         });
         return A3($List.foldl,
         insert$,
         empty,
         pairs);
      }();
   };
   var intersect = F2(function (d1,
   d2) {
      return function () {
         var _v65 = {ctor: "_Tuple2"
                    ,_0: d1
                    ,_1: d2};
         switch (_v65.ctor)
         {case "_Tuple2":
            switch (_v65._0.ctor)
              {case "Empty": return Empty;}
              switch (_v65._1.ctor)
              {case "Empty": return Empty;}
              switch (_v65._0.ctor)
              {case "Leaf": return A2(member,
                   _v65._0._0.key,
                   _v65._1) ? d1 : Empty;}
              switch (_v65._1.ctor)
              {case "Leaf":
                 return function () {
                      var _v72 = A2(get,
                      _v65._1._0.key,
                      _v65._0);
                      switch (_v72.ctor)
                      {case "Just": return A2(leaf,
                           _v65._1._0.key,
                           _v72._0);
                         case "Nothing": return Empty;}
                      _U.badCase($moduleName,
                      "between lines 443 and 446");
                   }();}
              switch (_v65._0.ctor)
              {case "Inner":
                 switch (_v65._1.ctor)
                   {case "Inner":
                      return function () {
                           var _v74 = A2(determineInnerRelation,
                           _v65._0._0,
                           _v65._1._0);
                           switch (_v74.ctor)
                           {case "LeftChild":
                              return _U.eq(_v74._0.p,
                                _v65._0._0) ? A2(intersect,
                                _v65._0._0.left,
                                d2) : A2(intersect,
                                d1,
                                _v65._1._0.left);
                              case "RightChild":
                              return _U.eq(_v74._0.p,
                                _v65._0._0) ? A2(intersect,
                                _v65._0._0.right,
                                d2) : A2(intersect,
                                d1,
                                _v65._1._0.right);
                              case "Same": return A3(inner,
                                _v65._0._0.prefix,
                                A2(intersect,
                                _v65._0._0.left,
                                _v65._1._0.left),
                                A2(intersect,
                                _v65._0._0.right,
                                _v65._1._0.right));
                              case "Siblings": return Empty;}
                           _U.badCase($moduleName,
                           "between lines 446 and 457");
                        }();}
                   break;}
              break;}
         _U.badCase($moduleName,
         "between lines 439 and 457");
      }();
   });
   var diff = F2(function (d1,d2) {
      return function () {
         var _v78 = {ctor: "_Tuple2"
                    ,_0: d1
                    ,_1: d2};
         switch (_v78.ctor)
         {case "_Tuple2":
            switch (_v78._0.ctor)
              {case "Empty": return Empty;}
              switch (_v78._1.ctor)
              {case "Empty": return _v78._0;}
              switch (_v78._0.ctor)
              {case "Leaf": return A2(member,
                   _v78._0._0.key,
                   _v78._1) ? Empty : d1;}
              switch (_v78._1.ctor)
              {case "Leaf": return A2(remove,
                   _v78._1._0.key,
                   _v78._0);}
              switch (_v78._0.ctor)
              {case "Inner":
                 switch (_v78._1.ctor)
                   {case "Inner":
                      return function () {
                           var _v85 = A2(determineInnerRelation,
                           _v78._0._0,
                           _v78._1._0);
                           switch (_v85.ctor)
                           {case "LeftChild":
                              return _U.eq(_v85._0.p,
                                _v78._0._0) ? A3(inner,
                                _v78._0._0.prefix,
                                A2(diff,_v78._0._0.left,d2),
                                _v78._0._0.right) : A2(diff,
                                d1,
                                _v78._1._0.left);
                              case "RightChild":
                              return _U.eq(_v85._0.p,
                                _v78._0._0) ? A3(inner,
                                _v78._0._0.prefix,
                                _v78._0._0.left,
                                A2(diff,
                                _v78._0._0.right,
                                d2)) : A2(diff,
                                d1,
                                _v78._1._0.right);
                              case "Same": return A3(inner,
                                _v78._0._0.prefix,
                                A2(diff,
                                _v78._0._0.left,
                                _v78._1._0.left),
                                A2(diff,
                                _v78._0._0.right,
                                _v78._1._0.right));
                              case "Siblings": return d1;}
                           _U.badCase($moduleName,
                           "between lines 469 and 480");
                        }();}
                   break;}
              break;}
         _U.badCase($moduleName,
         "between lines 464 and 480");
      }();
   });
   var InnerType = F4(function (a,
   b,
   c,
   d) {
      return {_: {}
             ,left: b
             ,prefix: a
             ,right: c
             ,size: d};
   });
   var KeyPrefix = F2(function (a,
   b) {
      return {_: {}
             ,branchingBit: b
             ,prefixBits: a};
   });
   _elm.IntDict.values = {_op: _op
                         ,isValidKey: isValidKey
                         ,empty: empty
                         ,singleton: singleton
                         ,insert: insert
                         ,update: update
                         ,remove: remove
                         ,isEmpty: isEmpty
                         ,size: size
                         ,member: member
                         ,get: get
                         ,findMin: findMin
                         ,findMax: findMax
                         ,filter: filter
                         ,map: map
                         ,foldl: foldl
                         ,foldr: foldr
                         ,partition: partition
                         ,uniteWith: uniteWith
                         ,union: union
                         ,intersect: intersect
                         ,diff: diff
                         ,keys: keys
                         ,values: values
                         ,toList: toList
                         ,fromList: fromList
                         ,toString$: toString$};
   return _elm.IntDict.values;
};
Elm.List = Elm.List || {};
Elm.List.make = function (_elm) {
   "use strict";
   _elm.List = _elm.List || {};
   if (_elm.List.values)
   return _elm.List.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "List",
   $Basics = Elm.Basics.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$List = Elm.Native.List.make(_elm);
   var sortWith = $Native$List.sortWith;
   var sortBy = $Native$List.sortBy;
   var sort = function (xs) {
      return A2(sortBy,
      $Basics.identity,
      xs);
   };
   var repeat = $Native$List.repeat;
   var drop = $Native$List.drop;
   var take = $Native$List.take;
   var map5 = $Native$List.map5;
   var map4 = $Native$List.map4;
   var map3 = $Native$List.map3;
   var map2 = $Native$List.map2;
   var any = $Native$List.any;
   var all = F2(function (pred,
   xs) {
      return $Basics.not(A2(any,
      function ($) {
         return $Basics.not(pred($));
      },
      xs));
   });
   var foldr = $Native$List.foldr;
   var foldl = $Native$List.foldl;
   var length = function (xs) {
      return A3(foldl,
      F2(function (_v0,i) {
         return function () {
            return i + 1;
         }();
      }),
      0,
      xs);
   };
   var sum = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {
         return x + y;
      }),
      0,
      numbers);
   };
   var product = function (numbers) {
      return A3(foldl,
      F2(function (x,y) {
         return x * y;
      }),
      1,
      numbers);
   };
   var maximum = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(A3(foldl,
              $Basics.max,
              list._0,
              list._1));}
         return $Maybe.Nothing;
      }();
   };
   var minimum = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(A3(foldl,
              $Basics.min,
              list._0,
              list._1));}
         return $Maybe.Nothing;
      }();
   };
   var indexedMap = F2(function (f,
   xs) {
      return A3(map2,
      f,
      _L.range(0,length(xs) - 1),
      xs);
   });
   var member = F2(function (x,
   xs) {
      return A2(any,
      function (a) {
         return _U.eq(a,x);
      },
      xs);
   });
   var isEmpty = function (xs) {
      return function () {
         switch (xs.ctor)
         {case "[]": return true;}
         return false;
      }();
   };
   var tail = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(list._1);
            case "[]":
            return $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 87 and 89");
      }();
   };
   var head = function (list) {
      return function () {
         switch (list.ctor)
         {case "::":
            return $Maybe.Just(list._0);
            case "[]":
            return $Maybe.Nothing;}
         _U.badCase($moduleName,
         "between lines 75 and 77");
      }();
   };
   _op["::"] = $Native$List.cons;
   var map = F2(function (f,xs) {
      return A3(foldr,
      F2(function (x,acc) {
         return A2(_op["::"],
         f(x),
         acc);
      }),
      _L.fromArray([]),
      xs);
   });
   var filter = F2(function (pred,
   xs) {
      return function () {
         var conditionalCons = F2(function (x,
         xs$) {
            return pred(x) ? A2(_op["::"],
            x,
            xs$) : xs$;
         });
         return A3(foldr,
         conditionalCons,
         _L.fromArray([]),
         xs);
      }();
   });
   var maybeCons = F3(function (f,
   mx,
   xs) {
      return function () {
         var _v15 = f(mx);
         switch (_v15.ctor)
         {case "Just":
            return A2(_op["::"],_v15._0,xs);
            case "Nothing": return xs;}
         _U.badCase($moduleName,
         "between lines 179 and 181");
      }();
   });
   var filterMap = F2(function (f,
   xs) {
      return A3(foldr,
      maybeCons(f),
      _L.fromArray([]),
      xs);
   });
   var reverse = function (list) {
      return A3(foldl,
      F2(function (x,y) {
         return A2(_op["::"],x,y);
      }),
      _L.fromArray([]),
      list);
   };
   var scanl = F3(function (f,
   b,
   xs) {
      return function () {
         var scan1 = F2(function (x,
         accAcc) {
            return function () {
               switch (accAcc.ctor)
               {case "::": return A2(_op["::"],
                    A2(f,x,accAcc._0),
                    accAcc);
                  case "[]":
                  return _L.fromArray([]);}
               _U.badCase($moduleName,
               "between lines 148 and 151");
            }();
         });
         return reverse(A3(foldl,
         scan1,
         _L.fromArray([b]),
         xs));
      }();
   });
   var append = F2(function (xs,
   ys) {
      return function () {
         switch (ys.ctor)
         {case "[]": return xs;}
         return A3(foldr,
         F2(function (x,y) {
            return A2(_op["::"],x,y);
         }),
         ys,
         xs);
      }();
   });
   var concat = function (lists) {
      return A3(foldr,
      append,
      _L.fromArray([]),
      lists);
   };
   var concatMap = F2(function (f,
   list) {
      return concat(A2(map,
      f,
      list));
   });
   var partition = F2(function (pred,
   list) {
      return function () {
         var step = F2(function (x,
         _v21) {
            return function () {
               switch (_v21.ctor)
               {case "_Tuple2":
                  return pred(x) ? {ctor: "_Tuple2"
                                   ,_0: A2(_op["::"],x,_v21._0)
                                   ,_1: _v21._1} : {ctor: "_Tuple2"
                                                   ,_0: _v21._0
                                                   ,_1: A2(_op["::"],
                                                   x,
                                                   _v21._1)};}
               _U.badCase($moduleName,
               "between lines 301 and 303");
            }();
         });
         return A3(foldr,
         step,
         {ctor: "_Tuple2"
         ,_0: _L.fromArray([])
         ,_1: _L.fromArray([])},
         list);
      }();
   });
   var unzip = function (pairs) {
      return function () {
         var step = F2(function (_v25,
         _v26) {
            return function () {
               switch (_v26.ctor)
               {case "_Tuple2":
                  return function () {
                       switch (_v25.ctor)
                       {case "_Tuple2":
                          return {ctor: "_Tuple2"
                                 ,_0: A2(_op["::"],
                                 _v25._0,
                                 _v26._0)
                                 ,_1: A2(_op["::"],
                                 _v25._1,
                                 _v26._1)};}
                       _U.badCase($moduleName,
                       "on line 339, column 12 to 28");
                    }();}
               _U.badCase($moduleName,
               "on line 339, column 12 to 28");
            }();
         });
         return A3(foldr,
         step,
         {ctor: "_Tuple2"
         ,_0: _L.fromArray([])
         ,_1: _L.fromArray([])},
         pairs);
      }();
   };
   var intersperse = F2(function (sep,
   xs) {
      return function () {
         switch (xs.ctor)
         {case "::": return function () {
                 var step = F2(function (x,
                 rest) {
                    return A2(_op["::"],
                    sep,
                    A2(_op["::"],x,rest));
                 });
                 var spersed = A3(foldr,
                 step,
                 _L.fromArray([]),
                 xs._1);
                 return A2(_op["::"],
                 xs._0,
                 spersed);
              }();
            case "[]":
            return _L.fromArray([]);}
         _U.badCase($moduleName,
         "between lines 350 and 356");
      }();
   });
   _elm.List.values = {_op: _op
                      ,isEmpty: isEmpty
                      ,length: length
                      ,reverse: reverse
                      ,member: member
                      ,head: head
                      ,tail: tail
                      ,filter: filter
                      ,take: take
                      ,drop: drop
                      ,repeat: repeat
                      ,append: append
                      ,concat: concat
                      ,intersperse: intersperse
                      ,partition: partition
                      ,unzip: unzip
                      ,map: map
                      ,map2: map2
                      ,map3: map3
                      ,map4: map4
                      ,map5: map5
                      ,filterMap: filterMap
                      ,concatMap: concatMap
                      ,indexedMap: indexedMap
                      ,foldr: foldr
                      ,foldl: foldl
                      ,sum: sum
                      ,product: product
                      ,maximum: maximum
                      ,minimum: minimum
                      ,all: all
                      ,any: any
                      ,scanl: scanl
                      ,sort: sort
                      ,sortBy: sortBy
                      ,sortWith: sortWith};
   return _elm.List.values;
};
Elm.Maybe = Elm.Maybe || {};
Elm.Maybe.make = function (_elm) {
   "use strict";
   _elm.Maybe = _elm.Maybe || {};
   if (_elm.Maybe.values)
   return _elm.Maybe.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Maybe";
   var withDefault = F2(function ($default,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just": return maybe._0;
            case "Nothing":
            return $default;}
         _U.badCase($moduleName,
         "between lines 45 and 47");
      }();
   });
   var Nothing = {ctor: "Nothing"};
   var oneOf = function (maybes) {
      return function () {
         switch (maybes.ctor)
         {case "::": return function () {
                 switch (maybes._0.ctor)
                 {case "Just": return maybes._0;
                    case "Nothing":
                    return oneOf(maybes._1);}
                 _U.badCase($moduleName,
                 "between lines 64 and 66");
              }();
            case "[]": return Nothing;}
         _U.badCase($moduleName,
         "between lines 59 and 66");
      }();
   };
   var andThen = F2(function (maybeValue,
   callback) {
      return function () {
         switch (maybeValue.ctor)
         {case "Just":
            return callback(maybeValue._0);
            case "Nothing": return Nothing;}
         _U.badCase($moduleName,
         "between lines 110 and 112");
      }();
   });
   var Just = function (a) {
      return {ctor: "Just",_0: a};
   };
   var map = F2(function (f,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return Just(f(maybe._0));
            case "Nothing": return Nothing;}
         _U.badCase($moduleName,
         "between lines 76 and 78");
      }();
   });
   _elm.Maybe.values = {_op: _op
                       ,andThen: andThen
                       ,map: map
                       ,withDefault: withDefault
                       ,oneOf: oneOf
                       ,Just: Just
                       ,Nothing: Nothing};
   return _elm.Maybe.values;
};
Elm.Native.Basics = {};
Elm.Native.Basics.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Basics = localRuntime.Native.Basics || {};
	if (localRuntime.Native.Basics.values)
	{
		return localRuntime.Native.Basics.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	function div(a, b)
	{
		return (a/b)|0;
	}
	function rem(a, b)
	{
		return a % b;
	}
	function mod(a, b)
	{
		if (b === 0)
		{
			throw new Error("Cannot perform mod 0. Division by zero error.");
		}
		var r = a % b;
		var m = a === 0 ? 0 : (b > 0 ? (a >= 0 ? r : r+b) : -mod(-a,-b));

		return m === b ? 0 : m;
	}
	function logBase(base, n)
	{
		return Math.log(n) / Math.log(base);
	}
	function negate(n)
	{
		return -n;
	}
	function abs(n)
	{
		return n < 0 ? -n : n;
	}

	function min(a, b)
	{
		return Utils.cmp(a,b) < 0 ? a : b;
	}
	function max(a, b)
	{
		return Utils.cmp(a,b) > 0 ? a : b;
	}
	function clamp(lo, hi, n)
	{
		return Utils.cmp(n,lo) < 0 ? lo : Utils.cmp(n,hi) > 0 ? hi : n;
	}

	function xor(a, b)
	{
		return a !== b;
	}
	function not(b)
	{
		return !b;
	}
	function isInfinite(n)
	{
		return n === Infinity || n === -Infinity
	}

	function truncate(n)
	{
		return n|0;
	}

	function degrees(d)
	{
		return d * Math.PI / 180;
	}
	function turns(t)
	{
		return 2 * Math.PI * t;
	}
	function fromPolar(point)
	{
		var r = point._0;
		var t = point._1;
		return Utils.Tuple2(r * Math.cos(t), r * Math.sin(t));
	}
	function toPolar(point)
	{
		var x = point._0;
		var y = point._1;
		return Utils.Tuple2(Math.sqrt(x * x + y * y), Math.atan2(y,x));
	}

	return localRuntime.Native.Basics.values = {
		div: F2(div),
		rem: F2(rem),
		mod: F2(mod),

		pi: Math.PI,
		e: Math.E,
		cos: Math.cos,
		sin: Math.sin,
		tan: Math.tan,
		acos: Math.acos,
		asin: Math.asin,
		atan: Math.atan,
		atan2: F2(Math.atan2),

		degrees:  degrees,
		turns:  turns,
		fromPolar:  fromPolar,
		toPolar:  toPolar,

		sqrt: Math.sqrt,
		logBase: F2(logBase),
		negate: negate,
		abs: abs,
		min: F2(min),
		max: F2(max),
		clamp: F3(clamp),
		compare: Utils.compare,

		xor: F2(xor),
		not: not,

		truncate: truncate,
		ceiling: Math.ceil,
		floor: Math.floor,
		round: Math.round,
		toFloat: function(x) { return x; },
		isNaN: isNaN,
		isInfinite: isInfinite
	};
};

Elm.Native.Bitwise = {};
Elm.Native.Bitwise.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Bitwise = localRuntime.Native.Bitwise || {};
	if (localRuntime.Native.Bitwise.values)
	{
		return localRuntime.Native.Bitwise.values;
	}

	function and(a,b) { return a & b; }
	function or (a,b) { return a | b; }
	function xor(a,b) { return a ^ b; }
	function not(a) { return ~a; }
	function sll(a,offset) { return a << offset; }
	function sra(a,offset) { return a >> offset; }
	function srl(a,offset) { return a >>> offset; }

	return localRuntime.Native.Bitwise.values = {
		and: F2(and),
		or : F2(or ),
		xor: F2(xor),
		complement: not,
		shiftLeft           : F2(sll),
		shiftRightArithmatic: F2(sra),
		shiftRightLogical   : F2(srl)
	};

};

Elm.Native.Char = {};
Elm.Native.Char.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Char = localRuntime.Native.Char || {};
	if (localRuntime.Native.Char.values)
	{
		return localRuntime.Native.Char.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	return localRuntime.Native.Char.values = {
		fromCode : function(c) { return Utils.chr(String.fromCharCode(c)); },
		toCode   : function(c) { return c.charCodeAt(0); },
		toUpper  : function(c) { return Utils.chr(c.toUpperCase()); },
		toLower  : function(c) { return Utils.chr(c.toLowerCase()); },
		toLocaleUpper : function(c) { return Utils.chr(c.toLocaleUpperCase()); },
		toLocaleLower : function(c) { return Utils.chr(c.toLocaleLowerCase()); },
	};
};

Elm.Native.Color = {};
Elm.Native.Color.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Color = localRuntime.Native.Color || {};
	if (localRuntime.Native.Color.values)
	{
		return localRuntime.Native.Color.values;
	}

	function toCss(c)
	{
		var format = '';
		var colors = '';
		if (c.ctor === 'RGBA')
		{
			format = 'rgb';
			colors = c._0 + ', ' + c._1 + ', ' + c._2;
		}
		else
		{
			format = 'hsl';
			colors = (c._0 * 180 / Math.PI) + ', ' +
					 (c._1 * 100) + '%, ' +
					 (c._2 * 100) + '%';
		}
		if (c._3 === 1)
		{
			return format + '(' + colors + ')';
		}
		else
		{
			return format + 'a(' + colors + ', ' + c._3 + ')';
		}
	}

	return localRuntime.Native.Color.values = {
		toCss: toCss
	};

};

Elm.Native.Debug = {};
Elm.Native.Debug.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Debug = localRuntime.Native.Debug || {};
	if (localRuntime.Native.Debug.values)
	{
		return localRuntime.Native.Debug.values;
	}

	var toString = Elm.Native.Show.make(localRuntime).toString;

	function log(tag, value)
	{
		var msg = tag + ': ' + toString(value);
		var process = process || {};
		if (process.stdout)
		{
			process.stdout.write(msg);
		}
		else
		{
			console.log(msg);
		}
		return value;
	}

	function crash(message)
	{
		throw new Error(message);
	}

	function tracePath(tag, form)
	{
		if (localRuntime.debug)
		{
			return localRuntime.debug.trace(tag, form);
		}
		return form;
	}

	function watch(tag, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, value);
		}
		return value;
	}

	function watchSummary(tag, summarize, value)
	{
		if (localRuntime.debug)
		{
			localRuntime.debug.watch(tag, summarize(value));
		}
		return value;
	}

	return localRuntime.Native.Debug.values = {
		crash: crash,
		tracePath: F2(tracePath),
		log: F2(log),
		watch: F2(watch),
		watchSummary:F3(watchSummary),
	};
};


// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Collage = Elm.Native.Graphics.Collage || {};

// definition
Elm.Native.Graphics.Collage.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Collage = localRuntime.Native.Graphics.Collage || {};
	if ('values' in localRuntime.Native.Graphics.Collage)
	{
		return localRuntime.Native.Graphics.Collage.values;
	}

	// okay, we cannot short-ciruit, so now we define everything
	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var NativeElement = Elm.Native.Graphics.Element.make(localRuntime);
	var Transform = Elm.Transform2D.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function setStrokeStyle(ctx, style)
	{
		ctx.lineWidth = style.width;

		var cap = style.cap.ctor;
		ctx.lineCap = cap === 'Flat'
			? 'butt'
			: cap === 'Round'
				? 'round'
				: 'square';

		var join = style.join.ctor;
		ctx.lineJoin = join === 'Smooth'
			? 'round'
			: join === 'Sharp'
				? 'miter'
				: 'bevel';

		ctx.miterLimit = style.join._0 || 10;
		ctx.strokeStyle = Color.toCss(style.color);
	}

	function setFillStyle(ctx, style)
	{
		var sty = style.ctor;
		ctx.fillStyle = sty === 'Solid'
			? Color.toCss(style._0)
			: sty === 'Texture'
				? texture(redo, ctx, style._0)
				: gradient(ctx, style._0);
	}

	function trace(ctx, path)
	{
		var points = List.toArray(path);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		ctx.moveTo(points[i]._0, points[i]._1);
		while (i--)
		{
			ctx.lineTo(points[i]._0, points[i]._1);
		}
		if (path.closed)
		{
			i = points.length - 1;
			ctx.lineTo(points[i]._0, points[i]._1);
		}
	}

	function line(ctx,style,path)
	{
		(style.dashing.ctor === '[]')
			? trace(ctx, path)
			: customLineHelp(ctx, style, path);
		ctx.scale(1,-1);
		ctx.stroke();
	}

	function customLineHelp(ctx, style, path)
	{
		var points = List.toArray(path);
		if (path.closed)
		{
			points.push(points[0]);
		}
		var pattern = List.toArray(style.dashing);
		var i = points.length - 1;
		if (i <= 0)
		{
			return;
		}
		var x0 = points[i]._0, y0 = points[i]._1;
		var x1=0, y1=0, dx=0, dy=0, remaining=0, nx=0, ny=0;
		var pindex = 0, plen = pattern.length;
		var draw = true, segmentLength = pattern[0];
		ctx.moveTo(x0,y0);
		while (i--)
		{
			x1 = points[i]._0;
			y1 = points[i]._1;
			dx = x1 - x0;
			dy = y1 - y0;
			remaining = Math.sqrt(dx * dx + dy * dy);
			while (segmentLength <= remaining)
			{
				x0 += dx * segmentLength / remaining;
				y0 += dy * segmentLength / remaining;
				ctx[draw ? 'lineTo' : 'moveTo'](x0, y0);
				// update starting position
				dx = x1 - x0;
				dy = y1 - y0;
				remaining = Math.sqrt(dx * dx + dy * dy);
				// update pattern
				draw = !draw;
				pindex = (pindex + 1) % plen;
				segmentLength = pattern[pindex];
			}
			if (remaining > 0)
			{
				ctx[draw ? 'lineTo' : 'moveTo'](x1, y1);
				segmentLength -= remaining;
			}
			x0 = x1;
			y0 = y1;
		}
	}

	function drawLine(ctx, style, path)
	{
		setStrokeStyle(ctx, style);
		return line(ctx, style, path);
	}

	function texture(redo, ctx, src)
	{
		var img = new Image();
		img.src = src;
		img.onload = redo;
		return ctx.createPattern(img, 'repeat');
	}

	function gradient(ctx, grad)
	{
		var g;
		var stops = [];
		if (grad.ctor === 'Linear')
		{
			var p0 = grad._0, p1 = grad._1;
			g = ctx.createLinearGradient(p0._0, -p0._1, p1._0, -p1._1);
			stops = List.toArray(grad._2);
		}
		else
		{
			var p0 = grad._0, p2 = grad._2;
			g = ctx.createRadialGradient(p0._0, -p0._1, grad._1, p2._0, -p2._1, grad._3);
			stops = List.toArray(grad._4);
		}
		var len = stops.length;
		for (var i = 0; i < len; ++i)
		{
			var stop = stops[i];
			g.addColorStop(stop._0, Color.toCss(stop._1));
		}
		return g;
	}

	function drawShape(redo, ctx, style, path)
	{
		trace(ctx, path);
		setFillStyle(ctx, style);
		ctx.scale(1,-1);
		ctx.fill();
	}


	// TEXT RENDERING

	function fillText(redo, ctx, text)
	{
		drawText(ctx, text, ctx.fillText);
	}

	function strokeText(redo, ctx, style, text)
	{
		setStrokeStyle(ctx, style);
		// Use native canvas API for dashes only for text for now
		// Degrades to non-dashed on IE 9 + 10
		if (style.dashing.ctor !== '[]' && ctx.setLineDash)
		{
			var pattern = List.toArray(style.dashing);
			ctx.setLineDash(pattern);
		}
		drawText(ctx, text, ctx.strokeText);
	}

	function drawText(ctx, text, canvasDrawFn)
	{
		var textChunks = chunkText(defaultContext, text);

		var totalWidth = 0;
		var maxHeight = 0;
		var numChunks = textChunks.length;

		ctx.scale(1,-1);

		for (var i = numChunks; i--; )
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			var metrics = ctx.measureText(chunk.text);
			chunk.width = metrics.width;
			totalWidth += chunk.width;
			if (chunk.height > maxHeight)
			{
				maxHeight = chunk.height;
			}
		}

		var x = -totalWidth / 2.0;
		for (var i = 0; i < numChunks; ++i)
		{
			var chunk = textChunks[i];
			ctx.font = chunk.font;
			ctx.fillStyle = chunk.color;
			canvasDrawFn.call(ctx, chunk.text, x, maxHeight / 2);
			x += chunk.width;
		}
	}

	function toFont(props)
	{
		return [
			props['font-style'],
			props['font-variant'],
			props['font-weight'],
			props['font-size'],
			props['font-family']
		].join(' ');
	}


	// Convert the object returned by the text module
	// into something we can use for styling canvas text
	function chunkText(context, text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			var leftChunks = chunkText(context, text._0);
			var rightChunks = chunkText(context, text._1);
			return leftChunks.concat(rightChunks);
		}
		if (tag === 'Text:Text')
		{
			return [{
				text: text._0,
				color: context.color,
				height: context['font-size'].slice(0,-2) | 0,
				font: toFont(context)
			}];
		}
		if (tag === 'Text:Meta')
		{
			var newContext = freshContext(text._0, context);
			return chunkText(newContext, text._1);
		}
	}

	function freshContext(props, ctx)
	{
		return {
			'font-style': props['font-style'] || ctx['font-style'],
			'font-variant': props['font-variant'] || ctx['font-variant'],
			'font-weight': props['font-weight'] || ctx['font-weight'],
			'font-size': props['font-size'] || ctx['font-size'],
			'font-family': props['font-family'] || ctx['font-family'],
			'color': props['color'] || ctx['color']
		};
	}

	var defaultContext = {
		'font-style': 'normal',
		'font-variant': 'normal',
		'font-weight': 'normal',
		'font-size': '12px',
		'font-family': 'sans-serif',
		'color': 'black'
	};


	// IMAGES

	function drawImage(redo, ctx, form)
	{
		var img = new Image();
		img.onload = redo;
		img.src = form._3;
		var w = form._0,
			h = form._1,
			pos = form._2,
			srcX = pos._0,
			srcY = pos._1,
			srcW = w,
			srcH = h,
			destX = -w/2,
			destY = -h/2,
			destW = w,
			destH = h;

		ctx.scale(1,-1);
		ctx.drawImage(img, srcX, srcY, srcW, srcH, destX, destY, destW, destH);
	}

	function renderForm(redo, ctx, form)
	{
		ctx.save();

		var x = form.x,
			y = form.y,
			theta = form.theta,
			scale = form.scale;

		if (x !== 0 || y !== 0)
		{
			ctx.translate(x, y);
		}
		if (theta !== 0)
		{
			ctx.rotate(theta);
		}
		if (scale !== 1)
		{
			ctx.scale(scale,scale);
		}
		if (form.alpha !== 1)
		{
			ctx.globalAlpha = ctx.globalAlpha * form.alpha;
		}

		ctx.beginPath();
		var f = form.form;
		switch (f.ctor)
		{
			case 'FPath':
				drawLine(ctx, f._0, f._1);
				break;

			case 'FImage':
				drawImage(redo, ctx, f);
				break;

			case 'FShape':
				if (f._0.ctor === 'Line')
				{
					f._1.closed = true;
					drawLine(ctx, f._0._0, f._1);
				}
				else
				{
					drawShape(redo, ctx, f._0._0, f._1);
				}
				break;

			case 'FText':
				fillText(redo, ctx, f._0);
				break;

			case 'FOutlinedText':
				strokeText(redo, ctx, f._0, f._1);
				break;
		}
		ctx.restore();
	}

	function formToMatrix(form)
	{
	   var scale = form.scale;
	   var matrix = A6( Transform.matrix, scale, 0, 0, scale, form.x, form.y );

	   var theta = form.theta
	   if (theta !== 0)
	   {
		   matrix = A2( Transform.multiply, matrix, Transform.rotation(theta) );
	   }

	   return matrix;
	}

	function str(n)
	{
		if (n < 0.00001 && n > -0.00001)
		{
			return 0;
		}
		return n;
	}

	function makeTransform(w, h, form, matrices)
	{
		var props = form.form._0.props;
		var m = A6( Transform.matrix, 1, 0, 0, -1,
					(w - props.width ) / 2,
					(h - props.height) / 2 );
		var len = matrices.length;
		for (var i = 0; i < len; ++i)
		{
			m = A2( Transform.multiply, m, matrices[i] );
		}
		m = A2( Transform.multiply, m, formToMatrix(form) );

		return 'matrix(' +
			str( m[0]) + ', ' + str( m[3]) + ', ' +
			str(-m[1]) + ', ' + str(-m[4]) + ', ' +
			str( m[2]) + ', ' + str( m[5]) + ')';
	}

	function stepperHelp(list)
	{
		var arr = List.toArray(list);
		var i = 0;
		function peekNext()
		{
			return i < arr.length ? arr[i].form.ctor : '';
		}
		// assumes that there is a next element
		function next()
		{
			var out = arr[i];
			++i;
			return out;
		}
		return {
			peekNext: peekNext,
			next: next
		};
	}

	function formStepper(forms)
	{
		var ps = [stepperHelp(forms)];
		var matrices = [];
		var alphas = [];
		function peekNext()
		{
			var len = ps.length;
			var formType = '';
			for (var i = 0; i < len; ++i )
			{
				if (formType = ps[i].peekNext()) return formType;
			}
			return '';
		}
		// assumes that there is a next element
		function next(ctx)
		{
			while (!ps[0].peekNext())
			{
				ps.shift();
				matrices.pop();
				alphas.shift();
				if (ctx)
				{
					ctx.restore();
				}
			}
			var out = ps[0].next();
			var f = out.form;
			if (f.ctor === 'FGroup')
			{
				ps.unshift(stepperHelp(f._1));
				var m = A2(Transform.multiply, f._0, formToMatrix(out));
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
				matrices.push(m);

				var alpha = (alphas[0] || 1) * out.alpha;
				alphas.unshift(alpha);
				ctx.globalAlpha = alpha;
			}
			return out;
		}
		function transforms()
		{
			return matrices;
		}
		function alpha()
		{
			return alphas[0] || 1;
		}
		return {
			peekNext: peekNext,
			next: next,
			transforms: transforms,
			alpha: alpha
		};
	}

	function makeCanvas(w,h)
	{
		var canvas = NativeElement.createNode('canvas');
		canvas.style.width  = w + 'px';
		canvas.style.height = h + 'px';
		canvas.style.display = "block";
		canvas.style.position = "absolute";
		var ratio = window.devicePixelRatio || 1;
		canvas.width  = w * ratio;
		canvas.height = h * ratio;
		return canvas;
	}

	function render(model)
	{
		var div = NativeElement.createNode('div');
		div.style.overflow = 'hidden';
		div.style.position = 'relative';
		update(div, model, model);
		return div;
	}

	function nodeStepper(w,h,div)
	{
		var kids = div.childNodes;
		var i = 0;
		var ratio = window.devicePixelRatio || 1;

		function transform(transforms, ctx)
		{
			ctx.translate( w / 2 * ratio, h / 2 * ratio );
			ctx.scale( ratio, -ratio );
			var len = transforms.length;
			for (var i = 0; i < len; ++i)
			{
				var m = transforms[i];
				ctx.save();
				ctx.transform(m[0], m[3], m[1], m[4], m[2], m[5]);
			}
			return ctx;
		}
		function nextContext(transforms)
		{
			while (i < kids.length)
			{
				var node = kids[i];
				if (node.getContext)
				{
					node.width = w * ratio;
					node.height = h * ratio;
					node.style.width = w + 'px';
					node.style.height = h + 'px';
					++i;
					return transform(transforms, node.getContext('2d'));
				}
				div.removeChild(node);
			}
			var canvas = makeCanvas(w,h);
			div.appendChild(canvas);
			// we have added a new node, so we must step our position
			++i;
			return transform(transforms, canvas.getContext('2d'));
		}
		function addElement(matrices, alpha, form)
		{
			var kid = kids[i];
			var elem = form.form._0;

			var node = (!kid || kid.getContext)
				? NativeElement.render(elem)
				: NativeElement.update(kid, kid.oldElement, elem);

			node.style.position = 'absolute';
			node.style.opacity = alpha * form.alpha * elem.props.opacity;
			NativeElement.addTransform(node.style, makeTransform(w, h, form, matrices));
			node.oldElement = elem;
			++i;
			if (!kid)
			{
				div.appendChild(node);
			}
			else
			{
				div.insertBefore(node, kid);
			}
		}
		function clearRest()
		{
			while (i < kids.length)
			{
				div.removeChild(kids[i]);
			}
		}
		return {
			nextContext: nextContext,
			addElement: addElement,
			clearRest: clearRest
		};
	}


	function update(div, _, model)
	{
		var w = model.w;
		var h = model.h;

		var forms = formStepper(model.forms);
		var nodes = nodeStepper(w,h,div);
		var ctx = null;
		var formType = '';

		while (formType = forms.peekNext())
		{
			// make sure we have context if we need it
			if (ctx === null && formType !== 'FElement')
			{
				ctx = nodes.nextContext(forms.transforms());
				ctx.globalAlpha = forms.alpha();
			}

			var form = forms.next(ctx);
			// if it is FGroup, all updates are made within formStepper when next is called.
			if (formType === 'FElement')
			{
				// update or insert an element, get a new context
				nodes.addElement(forms.transforms(), forms.alpha(), form);
				ctx = null;
			}
			else if (formType !== 'FGroup')
			{
				renderForm(function() { update(div, model, model); }, ctx, form);
			}
		}
		nodes.clearRest();
		return div;
	}


	function collage(w,h,forms)
	{
		return A3(NativeElement.newElement, w, h, {
			ctor: 'Custom',
			type: 'Collage',
			render: render,
			update: update,
			model: {w:w, h:h, forms:forms}
		});
	}

	return localRuntime.Native.Graphics.Collage.values = {
		collage: F3(collage)
	};

};


// setup
Elm.Native = Elm.Native || {};
Elm.Native.Graphics = Elm.Native.Graphics || {};
Elm.Native.Graphics.Element = Elm.Native.Graphics.Element || {};

// definition
Elm.Native.Graphics.Element.make = function(localRuntime) {
	'use strict';

	// attempt to short-circuit
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Graphics = localRuntime.Native.Graphics || {};
	localRuntime.Native.Graphics.Element = localRuntime.Native.Graphics.Element || {};
	if ('values' in localRuntime.Native.Graphics.Element)
	{
		return localRuntime.Native.Graphics.Element.values;
	}

	var Color = Elm.Native.Color.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Text = Elm.Native.Text.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CREATION

	function createNode(elementType)
	{
		var node = document.createElement(elementType);
		node.style.padding = "0";
		node.style.margin = "0";
		return node;
	}


	function newElement(width, height, elementPrim)
	{
		return {
			_: {},
			element: elementPrim,
			props: {
				_: {},
				id: Utils.guid(),
				width: width,
				height: height,
				opacity: 1,
				color: Maybe.Nothing,
				href: "",
				tag: "",
				hover: Utils.Tuple0,
				click: Utils.Tuple0
			}
		};
	}


	// PROPERTIES

	function setProps(elem, node)
	{
		var props = elem.props;

		var element = elem.element;
		var width = props.width - (element.adjustWidth || 0);
		var height = props.height - (element.adjustHeight || 0);
		node.style.width  = (width |0) + 'px';
		node.style.height = (height|0) + 'px';

		if (props.opacity !== 1)
		{
			node.style.opacity = props.opacity;
		}

		if (props.color.ctor === 'Just')
		{
			node.style.backgroundColor = Color.toCss(props.color._0);
		}

		if (props.tag !== '')
		{
			node.id = props.tag;
		}

		if (props.hover.ctor !== '_Tuple0')
		{
			addHover(node, props.hover);
		}

		if (props.click.ctor !== '_Tuple0')
		{
			addClick(node, props.click);
		}

		if (props.href !== '')
		{
			var anchor = createNode('a');
			anchor.href = props.href;
			anchor.style.display = 'block';
			anchor.style.pointerEvents = 'auto';
			anchor.appendChild(node);
			node = anchor;
		}

		return node;
	}

	function addClick(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_click_handler = handler;
		function trigger(ev)
		{
			e.elm_click_handler(Utils.Tuple0);
			ev.stopPropagation();
		}
		e.elm_click_trigger = trigger;
		e.addEventListener('click', trigger);
	}

	function removeClick(e, handler)
	{
		if (e.elm_click_trigger)
		{
			e.removeEventListener('click', e.elm_click_trigger);
			e.elm_click_trigger = null;
			e.elm_click_handler = null;
		}
	}

	function addHover(e, handler)
	{
		e.style.pointerEvents = 'auto';
		e.elm_hover_handler = handler;
		e.elm_hover_count = 0;

		function over(evt)
		{
			if (e.elm_hover_count++ > 0) return;
			e.elm_hover_handler(true);
			evt.stopPropagation();
		}
		function out(evt)
		{
			if (e.contains(evt.toElement || evt.relatedTarget)) return;
			e.elm_hover_count = 0;
			e.elm_hover_handler(false);
			evt.stopPropagation();
		}
		e.elm_hover_over = over;
		e.elm_hover_out = out;
		e.addEventListener('mouseover', over);
		e.addEventListener('mouseout', out);
	}

	function removeHover(e)
	{
		e.elm_hover_handler = null;
		if (e.elm_hover_over)
		{
			e.removeEventListener('mouseover', e.elm_hover_over);
			e.elm_hover_over = null;
		}
		if (e.elm_hover_out)
		{
			e.removeEventListener('mouseout', e.elm_hover_out);
			e.elm_hover_out = null;
		}
	}


	// IMAGES

	function image(props, img)
	{
		switch (img._0.ctor)
		{
			case 'Plain':
				return plainImage(img._3);

			case 'Fitted':
				return fittedImage(props.width, props.height, img._3);

			case 'Cropped':
				return croppedImage(img,props.width,props.height,img._3);

			case 'Tiled':
				return tiledImage(img._3);
		}
	}

	function plainImage(src)
	{
		var img = createNode('img');
		img.src = src;
		img.name = src;
		img.style.display = "block";
		return img;
	}

	function tiledImage(src)
	{
		var div = createNode('div');
		div.style.backgroundImage = 'url(' + src + ')';
		return div;
	}

	function fittedImage(w, h, src)
	{
		var div = createNode('div');
		div.style.background = 'url(' + src + ') no-repeat center';
		div.style.webkitBackgroundSize = 'cover';
		div.style.MozBackgroundSize = 'cover';
		div.style.OBackgroundSize = 'cover';
		div.style.backgroundSize = 'cover';
		return div;
	}

	function croppedImage(elem, w, h, src)
	{
		var pos = elem._0._0;
		var e = createNode('div');
		e.style.overflow = "hidden";

		var img = createNode('img');
		img.onload = function() {
			var sw = w / elem._1, sh = h / elem._2;
			img.style.width = ((this.width * sw)|0) + 'px';
			img.style.height = ((this.height * sh)|0) + 'px';
			img.style.marginLeft = ((- pos._0 * sw)|0) + 'px';
			img.style.marginTop = ((- pos._1 * sh)|0) + 'px';
		};
		img.src = src;
		img.name = src;
		e.appendChild(img);
		return e;
	}


	// FLOW

	function goOut(node)
	{
		node.style.position = 'absolute';
		return node;
	}
	function goDown(node)
	{
		return node;
	}
	function goRight(node)
	{
		node.style.styleFloat = 'left';
		node.style.cssFloat = 'left';
		return node;
	}

	var directionTable = {
		DUp    : goDown,
		DDown  : goDown,
		DLeft  : goRight,
		DRight : goRight,
		DIn    : goOut,
		DOut   : goOut
	};
	function needsReversal(dir)
	{
		return dir == 'DUp' || dir == 'DLeft' || dir == 'DIn';
	}

	function flow(dir,elist)
	{
		var array = List.toArray(elist);
		var container = createNode('div');
		var goDir = directionTable[dir];
		if (goDir == goOut)
		{
			container.style.pointerEvents = 'none';
		}
		if (needsReversal(dir))
		{
			array.reverse();
		}
		var len = array.length;
		for (var i = 0; i < len; ++i)
		{
			container.appendChild(goDir(render(array[i])));
		}
		return container;
	}


	// CONTAINER

	function toPos(pos)
	{
		return pos.ctor === "Absolute"
			? pos._0 + "px"
			: (pos._0 * 100) + "%";
	}

	// must clear right, left, top, bottom, and transform
	// before calling this function
	function setPos(pos,elem,e)
	{
		var element = elem.element;
		var props = elem.props;
		var w = props.width + (element.adjustWidth ? element.adjustWidth : 0);
		var h = props.height + (element.adjustHeight ? element.adjustHeight : 0);

		e.style.position = 'absolute';
		e.style.margin = 'auto';
		var transform = '';

		switch (pos.horizontal.ctor)
		{
			case 'P':
				e.style.right = toPos(pos.x);
				e.style.removeProperty('left');
				break;

			case 'Z':
				transform = 'translateX(' + ((-w/2)|0) + 'px) ';

			case 'N':
				e.style.left = toPos(pos.x);
				e.style.removeProperty('right');
				break;
		}
		switch (pos.vertical.ctor)
		{
			case 'N':
				e.style.bottom = toPos(pos.y);
				e.style.removeProperty('top');
				break;

			case 'Z':
				transform += 'translateY(' + ((-h/2)|0) + 'px)';

			case 'P':
				e.style.top = toPos(pos.y);
				e.style.removeProperty('bottom');
				break;
		}
		if (transform !== '')
		{
			addTransform(e.style, transform);
		}
		return e;
	}

	function addTransform(style, transform)
	{
		style.transform       = transform;
		style.msTransform     = transform;
		style.MozTransform    = transform;
		style.webkitTransform = transform;
		style.OTransform      = transform;
	}

	function container(pos,elem)
	{
		var e = render(elem);
		setPos(pos, elem, e);
		var div = createNode('div');
		div.style.position = 'relative';
		div.style.overflow = 'hidden';
		div.appendChild(e);
		return div;
	}


	function rawHtml(elem)
	{
		var html = elem.html;
		var guid = elem.guid;
		var align = elem.align;

		var div = createNode('div');
		div.innerHTML = html;
		div.style.visibility = "hidden";
		if (align)
		{
			div.style.textAlign = align;
		}
		div.style.visibility = 'visible';
		div.style.pointerEvents = 'auto';
		return div;
	}


	// RENDER

	function render(elem)
	{
		return setProps(elem, makeElement(elem));
	}
	function makeElement(e)
	{
		var elem = e.element;
		switch(elem.ctor)
		{
			case 'Image':
				return image(e.props, elem);

			case 'Flow':
				return flow(elem._0.ctor, elem._1);

			case 'Container':
				return container(elem._0, elem._1);

			case 'Spacer':
				return createNode('div');

			case 'RawHtml':
				return rawHtml(elem);

			case 'Custom':
				return elem.render(elem.model);
		}
	}

	function updateAndReplace(node, curr, next)
	{
		var newNode = update(node, curr, next);
		if (newNode !== node)
		{
			node.parentNode.replaceChild(newNode, node);
		}
		return newNode;
	}


	// UPDATE

	function update(node, curr, next)
	{
		var rootNode = node;
		if (node.tagName === 'A')
		{
			node = node.firstChild;
		}
		if (curr.props.id === next.props.id)
		{
			updateProps(node, curr, next);
			return rootNode;
		}
		if (curr.element.ctor !== next.element.ctor)
		{
			return render(next);
		}
		var nextE = next.element;
		var currE = curr.element;
		switch(nextE.ctor)
		{
			case "Spacer":
				updateProps(node, curr, next);
				return rootNode;

			case "RawHtml":
				if(currE.html.valueOf() !== nextE.html.valueOf())
				{
					node.innerHTML = nextE.html;
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Image":
				if (nextE._0.ctor === 'Plain')
				{
					if (nextE._3 !== currE._3)
					{
						node.src = nextE._3;
					}
				}
				else if (!Utils.eq(nextE,currE)
					|| next.props.width !== curr.props.width
					|| next.props.height !== curr.props.height)
				{
					return render(next);
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Flow":
				var arr = List.toArray(nextE._1);
				for (var i = arr.length; i--; )
				{
					arr[i] = arr[i].element.ctor;
				}
				if (nextE._0.ctor !== currE._0.ctor)
				{
					return render(next);
				}
				var nexts = List.toArray(nextE._1);
				var kids = node.childNodes;
				if (nexts.length !== kids.length)
				{
					return render(next);
				}
				var currs = List.toArray(currE._1);
				var dir = nextE._0.ctor;
				var goDir = directionTable[dir];
				var toReverse = needsReversal(dir);
				var len = kids.length;
				for (var i = len; i-- ;)
				{
					var subNode = kids[toReverse ? len - i - 1 : i];
					goDir(updateAndReplace(subNode, currs[i], nexts[i]));
				}
				updateProps(node, curr, next);
				return rootNode;

			case "Container":
				var subNode = node.firstChild;
				var newSubNode = updateAndReplace(subNode, currE._1, nextE._1);
				setPos(nextE._0, nextE._1, newSubNode);
				updateProps(node, curr, next);
				return rootNode;

			case "Custom":
				if (currE.type === nextE.type)
				{
					var updatedNode = nextE.update(node, currE.model, nextE.model);
					updateProps(updatedNode, curr, next);
					return updatedNode;
				}
				return render(next);
		}
	}

	function updateProps(node, curr, next)
	{
		var nextProps = next.props;
		var currProps = curr.props;

		var element = next.element;
		var width = nextProps.width - (element.adjustWidth || 0);
		var height = nextProps.height - (element.adjustHeight || 0);
		if (width !== currProps.width)
		{
			node.style.width = (width|0) + 'px';
		}
		if (height !== currProps.height)
		{
			node.style.height = (height|0) + 'px';
		}

		if (nextProps.opacity !== currProps.opacity)
		{
			node.style.opacity = nextProps.opacity;
		}

		var nextColor = nextProps.color.ctor === 'Just'
			? Color.toCss(nextProps.color._0)
			: '';
		if (node.style.backgroundColor !== nextColor)
		{
			node.style.backgroundColor = nextColor;
		}

		if (nextProps.tag !== currProps.tag)
		{
			node.id = nextProps.tag;
		}

		if (nextProps.href !== currProps.href)
		{
			if (currProps.href === '')
			{
				// add a surrounding href
				var anchor = createNode('a');
				anchor.href = nextProps.href;
				anchor.style.display = 'block';
				anchor.style.pointerEvents = 'auto';

				node.parentNode.replaceChild(anchor, node);
				anchor.appendChild(node);
			}
			else if (nextProps.href === '')
			{
				// remove the surrounding href
				var anchor = node.parentNode;
				anchor.parentNode.replaceChild(node, anchor);
			}
			else
			{
				// just update the link
				node.parentNode.href = nextProps.href;
			}
		}

		// update click and hover handlers
		var removed = false;

		// update hover handlers
		if (currProps.hover.ctor === '_Tuple0')
		{
			if (nextProps.hover.ctor !== '_Tuple0')
			{
				addHover(node, nextProps.hover);
			}
		}
		else
		{
			if (nextProps.hover.ctor === '_Tuple0')
			{
				removed = true;
				removeHover(node);
			}
			else
			{
				node.elm_hover_handler = nextProps.hover;
			}
		}

		// update click handlers
		if (currProps.click.ctor === '_Tuple0')
		{
			if (nextProps.click.ctor !== '_Tuple0')
			{
				addClick(node, nextProps.click);
			}
		}
		else
		{
			if (nextProps.click.ctor === '_Tuple0')
			{
				removed = true;
				removeClick(node);
			}
			else
			{
				node.elm_click_handler = nextProps.click;
			}
		}

		// stop capturing clicks if
		if (removed
			&& nextProps.hover.ctor === '_Tuple0'
			&& nextProps.click.ctor === '_Tuple0')
		{
			node.style.pointerEvents = 'none';
		}
	}


	// TEXT

	function block(align)
	{
		return function(text)
		{
			var raw = {
				ctor :'RawHtml',
				html : Text.renderHtml(text),
				align: align
			};
			var pos = htmlHeight(0, raw);
			return newElement(pos._0, pos._1, raw);
		}
	}

	function markdown(text)
	{
		var raw = {
			ctor:'RawHtml',
			html: text,
			align: null
		};
		var pos = htmlHeight(0, raw);
		return newElement(pos._0, pos._1, raw);
	}

	function htmlHeight(width, rawHtml)
	{
		// create dummy node
		var temp = document.createElement('div');
		temp.innerHTML = rawHtml.html;
		if (width > 0)
		{
			temp.style.width = width + "px";
		}
		temp.style.visibility = "hidden";
		temp.style.styleFloat = "left";
		temp.style.cssFloat   = "left";

		document.body.appendChild(temp);

		// get dimensions
		var style = window.getComputedStyle(temp, null);
		var w = Math.ceil(style.getPropertyValue("width").slice(0,-2) - 0);
		var h = Math.ceil(style.getPropertyValue("height").slice(0,-2) - 0);
		document.body.removeChild(temp);
		return Utils.Tuple2(w,h);
	}


	return localRuntime.Native.Graphics.Element.values = {
		render: render,
		update: update,
		updateAndReplace: updateAndReplace,

		createNode: createNode,
		newElement: F3(newElement),
		addTransform: addTransform,
		htmlHeight: F2(htmlHeight),
		guid: Utils.guid,

		block: block,
		markdown: markdown
	};

};

Elm.Native.List = {};
Elm.Native.List.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.List = localRuntime.Native.List || {};
	if (localRuntime.Native.List.values)
	{
		return localRuntime.Native.List.values;
	}
	if ('values' in Elm.Native.List)
	{
		return localRuntime.Native.List.values = Elm.Native.List.values;
	}

	var Utils = Elm.Native.Utils.make(localRuntime);

	var Nil = Utils.Nil;
	var Cons = Utils.Cons;

	function toArray(xs)
	{
		var out = [];
		while (xs.ctor !== '[]')
		{
			out.push(xs._0);
			xs = xs._1;
		}
		return out;
	}

	function fromArray(arr)
	{
		var out = Nil;
		for (var i = arr.length; i--; )
		{
			out = Cons(arr[i], out);
		}
		return out;
	}

	function range(lo,hi)
	{
		var lst = Nil;
		if (lo <= hi)
		{
			do { lst = Cons(hi,lst) } while (hi-->lo);
		}
		return lst
	}

	// f defined similarly for both foldl and foldr (NB: different from Haskell)
	// ie, foldl : (a -> b -> b) -> b -> [a] -> b
	function foldl(f, b, xs)
	{
		var acc = b;
		while (xs.ctor !== '[]')
		{
			acc = A2(f, xs._0, acc);
			xs = xs._1;
		}
		return acc;
	}

	function foldr(f, b, xs)
	{
		var arr = toArray(xs);
		var acc = b;
		for (var i = arr.length; i--; )
		{
			acc = A2(f, arr[i], acc);
		}
		return acc;
	}

	function any(pred, xs)
	{
		while (xs.ctor !== '[]')
		{
			if (pred(xs._0))
			{
				return true;
			}
			xs = xs._1;
		}
		return false;
	}

	function map2(f, xs, ys)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]')
		{
			arr.push(A2(f, xs._0, ys._0));
			xs = xs._1;
			ys = ys._1;
		}
		return fromArray(arr);
	}

	function map3(f, xs, ys, zs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && ys.ctor !== '[]' && zs.ctor !== '[]')
		{
			arr.push(A3(f, xs._0, ys._0, zs._0));
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map4(f, ws, xs, ys, zs)
	{
		var arr = [];
		while (   ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A4(f, ws._0, xs._0, ys._0, zs._0));
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function map5(f, vs, ws, xs, ys, zs)
	{
		var arr = [];
		while (   vs.ctor !== '[]'
			   && ws.ctor !== '[]'
			   && xs.ctor !== '[]'
			   && ys.ctor !== '[]'
			   && zs.ctor !== '[]')
		{
			arr.push(A5(f, vs._0, ws._0, xs._0, ys._0, zs._0));
			vs = vs._1;
			ws = ws._1;
			xs = xs._1;
			ys = ys._1;
			zs = zs._1;
		}
		return fromArray(arr);
	}

	function sortBy(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a,b){
			return Utils.cmp(f(a), f(b));
		}));
	}

	function sortWith(f, xs)
	{
		return fromArray(toArray(xs).sort(function(a,b){
			var ord = f(a)(b).ctor;
			return ord === 'EQ' ? 0 : ord === 'LT' ? -1 : 1;
		}));
	}

	function take(n, xs)
	{
		var arr = [];
		while (xs.ctor !== '[]' && n > 0)
		{
			arr.push(xs._0);
			xs = xs._1;
			--n;
		}
		return fromArray(arr);
	}

	function drop(n, xs)
	{
		while (xs.ctor !== '[]' && n > 0)
		{
			xs = xs._1;
			--n;
		}
		return xs;
	}

	function repeat(n, x)
	{
		var arr = [];
		var pattern = [x];
		while (n > 0)
		{
			if (n & 1)
			{
				arr = arr.concat(pattern);
			}
			n >>= 1, pattern = pattern.concat(pattern);
		}
		return fromArray(arr);
	}


	Elm.Native.List.values = {
		Nil:Nil,
		Cons:Cons,
		cons:F2(Cons),
		toArray:toArray,
		fromArray:fromArray,
		range:range,

		foldl:F3(foldl),
		foldr:F3(foldr),

		any:F2(any),
		map2:F3(map2),
		map3:F4(map3),
		map4:F5(map4),
		map5:F6(map5),
		sortBy:F2(sortBy),
		sortWith:F2(sortWith),
		take:F2(take),
		drop:F2(drop),
		repeat:F2(repeat)
	};
	return localRuntime.Native.List.values = Elm.Native.List.values;

};

Elm.Native.Port = {};
Elm.Native.Port.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Port = localRuntime.Native.Port || {};
	if (localRuntime.Native.Port.values)
	{
		return localRuntime.Native.Port.values;
	}

	var NS;
	var Utils = Elm.Native.Utils.make(localRuntime);


	// INBOUND

	function inbound(name, type, converter)
	{
		if (!localRuntime.argsTracker[name])
		{
			throw new Error(
				"Port Error:\n" +
				"No argument was given for the port named '" + name + "' with type:\n\n" +
				"    " + type.split('\n').join('\n        ') + "\n\n" +
				"You need to provide an initial value!\n\n" +
				"Find out more about ports here <http://elm-lang.org/learn/Ports.elm>"
			);
		}
		var arg = localRuntime.argsTracker[name];
		arg.used = true;

		return jsToElm(name, type, converter, arg.value);
	}


	function inboundSignal(name, type, converter)
	{
		var initialValue = inbound(name, type, converter);

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		var signal = NS.input('inbound-port-' + name, initialValue);

		function send(jsValue)
		{
			var elmValue = jsToElm(name, type, converter, jsValue);
			setTimeout(function() {
				localRuntime.notify(signal.id, elmValue);
			}, 0);
		}

		localRuntime.ports[name] = { send: send };

		return signal;
	}


	function jsToElm(name, type, converter, value)
	{
		try
		{
			return converter(value);
		}
		catch(e)
		{
			throw new Error(
				"Port Error:\n" +
				"Regarding the port named '" + name + "' with type:\n\n" +
				"    " + type.split('\n').join('\n        ') + "\n\n" +
				"You just sent the value:\n\n" +
				"    " + JSON.stringify(value) + "\n\n" +
				"but it cannot be converted to the necessary type.\n" +
				e.message
			);
		}
	}


	// OUTBOUND

	function outbound(name, converter, elmValue)
	{
		localRuntime.ports[name] = converter(elmValue);
	}


	function outboundSignal(name, converter, signal)
	{
		var subscribers = [];

		function subscribe(handler)
		{
			subscribers.push(handler);
		}
		function unsubscribe(handler)
		{
			subscribers.pop(subscribers.indexOf(handler));
		}

		function notify(elmValue)
		{
			var jsValue = converter(elmValue);
			var len = subscribers.length;
			for (var i = 0; i < len; ++i)
			{
				subscribers[i](jsValue);
			}
		}

		if (!NS)
		{
			NS = Elm.Native.Signal.make(localRuntime);
		}
		NS.output('outbound-port-' + name, notify, signal);

		localRuntime.ports[name] = {
			subscribe: subscribe,
			unsubscribe: unsubscribe
		};

		return signal;
	}


	return localRuntime.Native.Port.values = {
		inbound: inbound,
		outbound: outbound,
		inboundSignal: inboundSignal,
		outboundSignal: outboundSignal
	};
};


if (!Elm.fullscreen) {

	(function() {
		'use strict';

		var Display = {
			FULLSCREEN: 0,
			COMPONENT: 1,
			NONE: 2
		};

		Elm.fullscreen = function(module, args)
		{
			var container = document.createElement('div');
			document.body.appendChild(container);
			return init(Display.FULLSCREEN, container, module, args || {});
		};

		Elm.embed = function(module, container, args)
		{
			var tag = container.tagName;
			if (tag !== 'DIV')
			{
				throw new Error('Elm.node must be given a DIV, not a ' + tag + '.');
			}
			return init(Display.COMPONENT, container, module, args || {});
		};

		Elm.worker = function(module, args)
		{
			return init(Display.NONE, {}, module, args || {});
		};

		function init(display, container, module, args, moduleToReplace)
		{
			// defining state needed for an instance of the Elm RTS
			var inputs = [];

			/* OFFSET
			 * Elm's time traveling debugger lets you pause time. This means
			 * "now" may be shifted a bit into the past. By wrapping Date.now()
			 * we can manage this.
			 */
			var timer = {
				programStart: Date.now(),
				now: function()
				{
					return Date.now();
				}
			};

			var updateInProgress = false;
			function notify(id, v)
			{
				if (updateInProgress)
				{
					throw new Error(
						'The notify function has been called synchronously!\n' +
						'This can lead to frames being dropped.\n' +
						'Definitely report this to <https://github.com/elm-lang/Elm/issues>\n');
				}
				updateInProgress = true;
				var timestep = timer.now();
				for (var i = inputs.length; i--; )
				{
					inputs[i].notify(timestep, id, v);
				}
				updateInProgress = false;
			}
			function setTimeout(func, delay)
			{
				return window.setTimeout(func, delay);
			}

			var listeners = [];
			function addListener(relevantInputs, domNode, eventName, func)
			{
				domNode.addEventListener(eventName, func);
				var listener = {
					relevantInputs: relevantInputs,
					domNode: domNode,
					eventName: eventName,
					func: func
				};
				listeners.push(listener);
			}

			var argsTracker = {};
			for (var name in args)
			{
				argsTracker[name] = {
					value: args[name],
					used: false
				};
			}

			// create the actual RTS. Any impure modules will attach themselves to this
			// object. This permits many Elm programs to be embedded per document.
			var elm = {
				notify: notify,
				setTimeout: setTimeout,
				node: container,
				addListener: addListener,
				inputs: inputs,
				timer: timer,
				argsTracker: argsTracker,
				ports: {},

				isFullscreen: function() { return display === Display.FULLSCREEN; },
				isEmbed: function() { return display === Display.COMPONENT; },
				isWorker: function() { return display === Display.NONE; }
			};

			function swap(newModule)
			{
				removeListeners(listeners);
				var div = document.createElement('div');
				var newElm = init(display, div, newModule, args, elm);
				inputs = [];
				// elm.swap = newElm.swap;
				return newElm;
			}

			function dispose()
			{
				removeListeners(listeners);
				inputs = [];
			}

			var Module = {};
			try
			{
				Module = module.make(elm);
				checkInputs(elm);
			}
			catch (error)
			{
				if (typeof container.appendChild == 'undefined')
				{
					console.log(error.message);
				}
				else
				{
					container.appendChild(errorNode(error.message));
				}
				throw error;
			}

			if (display !== Display.NONE)
			{
				var graphicsNode = initGraphics(elm, Module);
			}

			var rootNode = { kids: inputs };
			trimDeadNodes(rootNode);
			inputs = rootNode.kids;
			filterListeners(inputs, listeners);

			addReceivers(elm.ports);

			if (typeof moduleToReplace !== 'undefined')
			{
				hotSwap(moduleToReplace, elm);

				// rerender scene if graphics are enabled.
				if (typeof graphicsNode !== 'undefined')
				{
					graphicsNode.notify(0, true, 0);
				}
			}

			return {
				swap: swap,
				ports: elm.ports,
				dispose: dispose
			};
		};

		function checkInputs(elm)
		{
			var argsTracker = elm.argsTracker;
			for (var name in argsTracker)
			{
				if (!argsTracker[name].used)
				{
					throw new Error(
						"Port Error:\nYou provided an argument named '" + name +
						"' but there is no corresponding port!\n\n" +
						"Maybe add a port '" + name + "' to your Elm module?\n" +
						"Maybe remove the '" + name + "' argument from your initialization code in JS?"
					);
				}
			}
		}

		function errorNode(message)
		{
			var code = document.createElement('code');

			var lines = message.split('\n');
			code.appendChild(document.createTextNode(lines[0]));
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createElement('br'));
			for (var i = 1; i < lines.length; ++i)
			{
				code.appendChild(document.createTextNode('\u00A0 \u00A0 ' + lines[i].replace(/  /g, '\u00A0 ')));
				code.appendChild(document.createElement('br'));
			}
			code.appendChild(document.createElement('br'));
			code.appendChild(document.createTextNode("Open the developer console for more details."));
			return code;
		}


		//// FILTER SIGNALS ////

		// TODO: move this code into the signal module and create a function
		// Signal.initializeGraph that actually instantiates everything.

		function filterListeners(inputs, listeners)
		{
			loop:
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				for (var j = inputs.length; j--; )
				{
					if (listener.relevantInputs.indexOf(inputs[j].id) >= 0)
					{
						continue loop;
					}
				}
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		function removeListeners(listeners)
		{
			for (var i = listeners.length; i--; )
			{
				var listener = listeners[i];
				listener.domNode.removeEventListener(listener.eventName, listener.func);
			}
		}

		// add receivers for built-in ports if they are defined
		function addReceivers(ports)
		{
			if ('title' in ports)
			{
				if (typeof ports.title === 'string')
				{
					document.title = ports.title;
				}
				else
				{
					ports.title.subscribe(function(v) { document.title = v; });
				}
			}
			if ('redirect' in ports)
			{
				ports.redirect.subscribe(function(v) {
					if (v.length > 0)
					{
						window.location = v;
					}
				});
			}
		}


		// returns a boolean representing whether the node is alive or not.
		function trimDeadNodes(node)
		{
			if (node.isOutput)
			{
				return true;
			}

			var liveKids = [];
			for (var i = node.kids.length; i--; )
			{
				var kid = node.kids[i];
				if (trimDeadNodes(kid))
				{
					liveKids.push(kid);
				}
			}
			node.kids = liveKids;

			return liveKids.length > 0;
		}


		////  RENDERING  ////

		function initGraphics(elm, Module)
		{
			if (!('main' in Module))
			{
				throw new Error("'main' is missing! What do I display?!");
			}

			var signalGraph = Module.main;

			// make sure the signal graph is actually a signal & extract the visual model
			if (!('notify' in signalGraph))
			{
				signalGraph = Elm.Signal.make(elm).constant(signalGraph);
			}
			var initialScene = signalGraph.value;

			// Figure out what the render functions should be
			var render;
			var update;
			if (initialScene.props)
			{
				var Element = Elm.Native.Graphics.Element.make(elm);
				render = Element.render;
				update = Element.updateAndReplace;
			}
			else
			{
				var VirtualDom = Elm.Native.VirtualDom.make(elm);
				render = VirtualDom.render;
				update = VirtualDom.updateAndReplace;
			}

			// Add the initialScene to the DOM
			var container = elm.node;
			var node = render(initialScene);
			while (container.firstChild)
			{
				container.removeChild(container.firstChild);
			}
			container.appendChild(node);

			var _requestAnimationFrame =
				typeof requestAnimationFrame !== 'undefined'
					? requestAnimationFrame
					: function(cb) { setTimeout(cb, 1000/60); }
					;

			// domUpdate is called whenever the main Signal changes.
			//
			// domUpdate and drawCallback implement a small state machine in order
			// to schedule only 1 draw per animation frame. This enforces that
			// once draw has been called, it will not be called again until the
			// next frame.
			//
			// drawCallback is scheduled whenever
			// 1. The state transitions from PENDING_REQUEST to EXTRA_REQUEST, or
			// 2. The state transitions from NO_REQUEST to PENDING_REQUEST
			//
			// Invariants:
			// 1. In the NO_REQUEST state, there is never a scheduled drawCallback.
			// 2. In the PENDING_REQUEST and EXTRA_REQUEST states, there is always exactly 1
			//    scheduled drawCallback.
			var NO_REQUEST = 0;
			var PENDING_REQUEST = 1;
			var EXTRA_REQUEST = 2;
			var state = NO_REQUEST;
			var savedScene = initialScene;
			var scheduledScene = initialScene;

			function domUpdate(newScene)
			{
				scheduledScene = newScene;

				switch (state)
				{
					case NO_REQUEST:
						_requestAnimationFrame(drawCallback);
						state = PENDING_REQUEST;
						return;
					case PENDING_REQUEST:
						state = PENDING_REQUEST;
						return;
					case EXTRA_REQUEST:
						state = PENDING_REQUEST;
						return;
				}
			}

			function drawCallback()
			{
				switch (state)
				{
					case NO_REQUEST:
						// This state should not be possible. How can there be no
						// request, yet somehow we are actively fulfilling a
						// request?
						throw new Error(
							"Unexpected draw callback.\n" +
							"Please report this to <https://github.com/elm-lang/core/issues>."
						);

					case PENDING_REQUEST:
						// At this point, we do not *know* that another frame is
						// needed, but we make an extra request to rAF just in
						// case. It's possible to drop a frame if rAF is called
						// too late, so we just do it preemptively.
						_requestAnimationFrame(drawCallback);
						state = EXTRA_REQUEST;

						// There's also stuff we definitely need to draw.
						draw();
						return;

					case EXTRA_REQUEST:
						// Turns out the extra request was not needed, so we will
						// stop calling rAF. No reason to call it all the time if
						// no one needs it.
						state = NO_REQUEST;
						return;
				}
			}

			function draw()
			{
				update(elm.node.firstChild, savedScene, scheduledScene);
				if (elm.Native.Window)
				{
					elm.Native.Window.values.resizeIfNeeded();
				}
				savedScene = scheduledScene;
			}

			var renderer = Elm.Native.Signal.make(elm).output('main', domUpdate, signalGraph);

			// must check for resize after 'renderer' is created so
			// that changes show up.
			if (elm.Native.Window)
			{
				elm.Native.Window.values.resizeIfNeeded();
			}

			return renderer;
		}

		//// HOT SWAPPING ////

		// Returns boolean indicating if the swap was successful.
		// Requires that the two signal graphs have exactly the same
		// structure.
		function hotSwap(from, to)
		{
			function similar(nodeOld,nodeNew)
			{
				if (nodeOld.id !== nodeNew.id)
				{
					return false;
				}
				if (nodeOld.isOutput)
				{
					return nodeNew.isOutput;
				}
				return nodeOld.kids.length === nodeNew.kids.length;
			}
			function swap(nodeOld,nodeNew)
			{
				nodeNew.value = nodeOld.value;
				return true;
			}
			var canSwap = depthFirstTraversals(similar, from.inputs, to.inputs);
			if (canSwap)
			{
				depthFirstTraversals(swap, from.inputs, to.inputs);
			}
			from.node.parentNode.replaceChild(to.node, from.node);

			return canSwap;
		}

		// Returns false if the node operation f ever fails.
		function depthFirstTraversals(f, queueOld, queueNew)
		{
			if (queueOld.length !== queueNew.length)
			{
				return false;
			}
			queueOld = queueOld.slice(0);
			queueNew = queueNew.slice(0);

			var seen = [];
			while (queueOld.length > 0 && queueNew.length > 0)
			{
				var nodeOld = queueOld.pop();
				var nodeNew = queueNew.pop();
				if (seen.indexOf(nodeOld.id) < 0)
				{
					if (!f(nodeOld, nodeNew))
					{
						return false;
					}
					queueOld = queueOld.concat(nodeOld.kids || []);
					queueNew = queueNew.concat(nodeNew.kids || []);
					seen.push(nodeOld.id);
				}
			}
			return true;
		}
	}());

	function F2(fun)
	{
		function wrapper(a) { return function(b) { return fun(a,b) } }
		wrapper.arity = 2;
		wrapper.func = fun;
		return wrapper;
	}

	function F3(fun)
	{
		function wrapper(a) {
			return function(b) { return function(c) { return fun(a,b,c) }}
		}
		wrapper.arity = 3;
		wrapper.func = fun;
		return wrapper;
	}

	function F4(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return fun(a,b,c,d) }}}
		}
		wrapper.arity = 4;
		wrapper.func = fun;
		return wrapper;
	}

	function F5(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return fun(a,b,c,d,e) }}}}
		}
		wrapper.arity = 5;
		wrapper.func = fun;
		return wrapper;
	}

	function F6(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return fun(a,b,c,d,e,f) }}}}}
		}
		wrapper.arity = 6;
		wrapper.func = fun;
		return wrapper;
	}

	function F7(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return fun(a,b,c,d,e,f,g) }}}}}}
		}
		wrapper.arity = 7;
		wrapper.func = fun;
		return wrapper;
	}

	function F8(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) {
			return fun(a,b,c,d,e,f,g,h)}}}}}}}
		}
		wrapper.arity = 8;
		wrapper.func = fun;
		return wrapper;
	}

	function F9(fun)
	{
		function wrapper(a) { return function(b) { return function(c) {
			return function(d) { return function(e) { return function(f) {
			return function(g) { return function(h) { return function(i) {
			return fun(a,b,c,d,e,f,g,h,i) }}}}}}}}
		}
		wrapper.arity = 9;
		wrapper.func = fun;
		return wrapper;
	}

	function A2(fun,a,b)
	{
		return fun.arity === 2
			? fun.func(a,b)
			: fun(a)(b);
	}
	function A3(fun,a,b,c)
	{
		return fun.arity === 3
			? fun.func(a,b,c)
			: fun(a)(b)(c);
	}
	function A4(fun,a,b,c,d)
	{
		return fun.arity === 4
			? fun.func(a,b,c,d)
			: fun(a)(b)(c)(d);
	}
	function A5(fun,a,b,c,d,e)
	{
		return fun.arity === 5
			? fun.func(a,b,c,d,e)
			: fun(a)(b)(c)(d)(e);
	}
	function A6(fun,a,b,c,d,e,f)
	{
		return fun.arity === 6
			? fun.func(a,b,c,d,e,f)
			: fun(a)(b)(c)(d)(e)(f);
	}
	function A7(fun,a,b,c,d,e,f,g)
	{
		return fun.arity === 7
			? fun.func(a,b,c,d,e,f,g)
			: fun(a)(b)(c)(d)(e)(f)(g);
	}
	function A8(fun,a,b,c,d,e,f,g,h)
	{
		return fun.arity === 8
			? fun.func(a,b,c,d,e,f,g,h)
			: fun(a)(b)(c)(d)(e)(f)(g)(h);
	}
	function A9(fun,a,b,c,d,e,f,g,h,i)
	{
		return fun.arity === 9
			? fun.func(a,b,c,d,e,f,g,h,i)
			: fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
	}
}

Elm.Native.Show = {};
Elm.Native.Show.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Show = localRuntime.Native.Show || {};
	if (localRuntime.Native.Show.values)
	{
		return localRuntime.Native.Show.values;
	}

	var _Array;
	var Dict;
	var List;
	var Utils = Elm.Native.Utils.make(localRuntime);

	var toString = function(v)
	{
		var type = typeof v;
		if (type === "function")
		{
			var name = v.func ? v.func.name : v.name;
			return '<function' + (name === '' ? '' : ': ') + name + '>';
		}
		else if (type === "boolean")
		{
			return v ? "True" : "False";
		}
		else if (type === "number")
		{
			return v + "";
		}
		else if ((v instanceof String) && v.isChar)
		{
			return "'" + addSlashes(v, true) + "'";
		}
		else if (type === "string")
		{
			return '"' + addSlashes(v, false) + '"';
		}
		else if (type === "object" && '_' in v && probablyPublic(v))
		{
			var output = [];
			for (var k in v._)
			{
				for (var i = v._[k].length; i--; )
				{
					output.push(k + " = " + toString(v._[k][i]));
				}
			}
			for (var k in v)
			{
				if (k === '_') continue;
				output.push(k + " = " + toString(v[k]));
			}
			if (output.length === 0)
			{
				return "{}";
			}
			return "{ " + output.join(", ") + " }";
		}
		else if (type === "object" && 'ctor' in v)
		{
			if (v.ctor.substring(0,6) === "_Tuple")
			{
				var output = [];
				for (var k in v)
				{
					if (k === 'ctor') continue;
					output.push(toString(v[k]));
				}
				return "(" + output.join(",") + ")";
			}
			else if (v.ctor === "_Array")
			{
				if (!_Array)
				{
					_Array = Elm.Array.make(localRuntime);
				}
				var list = _Array.toList(v);
				return "Array.fromList " + toString(list);
			}
			else if (v.ctor === "::")
			{
				var output = '[' + toString(v._0);
				v = v._1;
				while (v.ctor === "::")
				{
					output += "," + toString(v._0);
					v = v._1;
				}
				return output + ']';
			}
			else if (v.ctor === "[]")
			{
				return "[]";
			}
			else if (v.ctor === "RBNode" || v.ctor === "RBEmpty")
			{
				if (!Dict)
				{
					Dict = Elm.Dict.make(localRuntime);
				}
				if (!List)
				{
					List = Elm.List.make(localRuntime);
				}
				var list = Dict.toList(v);
				var name = "Dict";
				if (list.ctor === "::" && list._0._1.ctor === "_Tuple0")
				{
					name = "Set";
					list = A2(List.map, function(x){return x._0}, list);
				}
				return name + ".fromList " + toString(list);
			}
			else if (v.ctor.slice(0,5) === "Text:")
			{
				return '<text>'
			}
			else
			{
				var output = "";
				for (var i in v)
				{
					if (i === 'ctor') continue;
					var str = toString(v[i]);
					var parenless = str[0] === '{' || str[0] === '<' || str.indexOf(' ') < 0;
					output += ' ' + (parenless ? str : '(' + str + ')');
				}
				return v.ctor + output;
			}
		}
		if (type === 'object' && 'notify' in v && 'id' in v)
		{
			return '<Signal>';
		}
		return "<internal structure>";
	};

	function addSlashes(str, isChar)
	{
		var s = str.replace(/\\/g, '\\\\')
				  .replace(/\n/g, '\\n')
				  .replace(/\t/g, '\\t')
				  .replace(/\r/g, '\\r')
				  .replace(/\v/g, '\\v')
				  .replace(/\0/g, '\\0');
		if (isChar)
		{
			return s.replace(/\'/g, "\\'")
		}
		else
		{
			return s.replace(/\"/g, '\\"');
		}
	}

	function probablyPublic(v)
	{
		var keys = Object.keys(v);
		var len = keys.length;
		if (len === 3
			&& 'props' in v
			&& 'element' in v)
		{
			return false;
		}
		else if (len === 5
			&& 'horizontal' in v
			&& 'vertical' in v
			&& 'x' in v
			&& 'y' in v)
		{
			return false;
		}
		else if (len === 7
			&& 'theta' in v
			&& 'scale' in v
			&& 'x' in v
			&& 'y' in v
			&& 'alpha' in v
			&& 'form' in v)
		{
			return false;
		}
		return true;
	}

	return localRuntime.Native.Show.values = {
		toString: toString
	};
};

Elm.Native.Signal = {};
Elm.Native.Signal.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Signal = localRuntime.Native.Signal || {};
	if (localRuntime.Native.Signal.values)
	{
		return localRuntime.Native.Signal.values;
	}


	var Task = Elm.Native.Task.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);


	function broadcastToKids(node, timestamp, update)
	{
		var kids = node.kids;
		for (var i = kids.length; i--; )
		{
			kids[i].notify(timestamp, update, node.id);
		}
	}


	// INPUT

	function input(name, base)
	{
		var node = {
			id: Utils.guid(),
			name: 'input-' + name,
			value: base,
			parents: [],
			kids: []
		};

		node.notify = function(timestamp, targetId, value) {
			var update = targetId === node.id;
			if (update)
			{
				node.value = value;
			}
			broadcastToKids(node, timestamp, update);
			return update;
		};

		localRuntime.inputs.push(node);

		return node;
	}

	function constant(value)
	{
		return input('constant', value);
	}


	// MAILBOX

	function mailbox(base)
	{
		var signal = input('mailbox', base);

		function send(value) {
			return Task.asyncFunction(function(callback) {
				localRuntime.setTimeout(function() {
					localRuntime.notify(signal.id, value);
				}, 0);
				callback(Task.succeed(Utils.Tuple0));
			});
		}

		return {
			_: {},
			signal: signal,
			address: {
				ctor: 'Address',
				_0: send
			}
		};
	}

	function sendMessage(message)
	{
		Task.perform(message._0);
	}


	// OUTPUT

	function output(name, handler, parent)
	{
		var node = {
			id: Utils.guid(),
			name: 'output-' + name,
			parents: [parent],
			isOutput: true
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				handler(parent.value);
			}
		};

		parent.kids.push(node);

		return node;
	}


	// MAP

	function mapMany(refreshValue, args)
	{
		var node = {
			id: Utils.guid(),
			name: 'map' + args.length,
			value: refreshValue(),
			parents: args,
			kids: []
		};

		var numberOfParents = args.length;
		var count = 0;
		var update = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			++count;

			update = update || parentUpdate;

			if (count === numberOfParents)
			{
				if (update)
				{
					node.value = refreshValue();
				}
				broadcastToKids(node, timestamp, update);
				update = false;
				count = 0;
			}
		};

		for (var i = numberOfParents; i--; )
		{
			args[i].kids.push(node);
		}

		return node;
	}


	function map(func, a)
	{
		function refreshValue()
		{
			return func(a.value);
		}
		return mapMany(refreshValue, [a]);
	}


	function map2(func, a, b)
	{
		function refreshValue()
		{
			return A2( func, a.value, b.value );
		}
		return mapMany(refreshValue, [a,b]);
	}


	function map3(func, a, b, c)
	{
		function refreshValue()
		{
			return A3( func, a.value, b.value, c.value );
		}
		return mapMany(refreshValue, [a,b,c]);
	}


	function map4(func, a, b, c, d)
	{
		function refreshValue()
		{
			return A4( func, a.value, b.value, c.value, d.value );
		}
		return mapMany(refreshValue, [a,b,c,d]);
	}


	function map5(func, a, b, c, d, e)
	{
		function refreshValue()
		{
			return A5( func, a.value, b.value, c.value, d.value, e.value );
		}
		return mapMany(refreshValue, [a,b,c,d,e]);
	}



	// FOLD

	function foldp(update, state, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'foldp',
			parents: [signal],
			kids: [],
			value: state
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = A2( update, signal.value, node.value );
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	// TIME

	function timestamp(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'timestamp',
			value: Utils.Tuple2(localRuntime.timer.programStart, signal.value),
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentUpdate)
			{
				node.value = Utils.Tuple2(timestamp, signal.value);
			}
			broadcastToKids(node, timestamp, parentUpdate);
		};

		signal.kids.push(node);

		return node;
	}


	function delay(time, signal)
	{
		var delayed = input('delay-input-' + time, signal.value);

		function handler(value)
		{
			setTimeout(function() {
				localRuntime.notify(delayed.id, value);
			}, time);
		}

		output('delay-output-' + time, handler, signal);

		return delayed;
	}


	// MERGING

	function genericMerge(tieBreaker, leftStream, rightStream)
	{
		var node = {
			id: Utils.guid(),
			name: 'merge',
			value: A2(tieBreaker, leftStream.value, rightStream.value),
			parents: [leftStream, rightStream],
			kids: []
		};

		var left = { touched: false, update: false, value: null };
		var right = { touched: false, update: false, value: null };

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === leftStream.id)
			{
				left.touched = true;
				left.update = parentUpdate;
				left.value = leftStream.value;
			}
			if (parentID === rightStream.id)
			{
				right.touched = true;
				right.update = parentUpdate;
				right.value = rightStream.value;
			}

			if (left.touched && right.touched)
			{
				var update = false;
				if (left.update && right.update)
				{
					node.value = A2(tieBreaker, left.value, right.value);
					update = true;
				}
				else if (left.update)
				{
					node.value = left.value;
					update = true;
				}
				else if (right.update)
				{
					node.value = right.value;
					update = true;
				}
				left.touched = false;
				right.touched = false;

				broadcastToKids(node, timestamp, update);
			}
		};

		leftStream.kids.push(node);
		rightStream.kids.push(node);

		return node;
	}


	// FILTERING

	function filterMap(toMaybe, base, signal)
	{
		var maybe = toMaybe(signal.value);
		var node = {
			id: Utils.guid(),
			name: 'filterMap',
			value: maybe.ctor === 'Nothing' ? base : maybe._0,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate)
			{
				var maybe = toMaybe(signal.value);
				if (maybe.ctor === 'Just')
				{
					update = true;
					node.value = maybe._0;
				}
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	// SAMPLING

	function sampleOn(ticker, signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'sampleOn',
			value: signal.value,
			parents: [ticker, signal],
			kids: []
		};

		var signalTouch = false;
		var tickerTouch = false;
		var tickerUpdate = false;

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			if (parentID === ticker.id)
			{
				tickerTouch = true;
				tickerUpdate = parentUpdate;
			}
			if (parentID === signal.id)
			{
				signalTouch = true;
			}

			if (tickerTouch && signalTouch)
			{
				if (tickerUpdate)
				{
					node.value = signal.value;
				}
				tickerTouch = false;
				signalTouch = false;

				broadcastToKids(node, timestamp, tickerUpdate);
			}
		};

		ticker.kids.push(node);
		signal.kids.push(node);

		return node;
	}


	// DROP REPEATS

	function dropRepeats(signal)
	{
		var node = {
			id: Utils.guid(),
			name: 'dropRepeats',
			value: signal.value,
			parents: [signal],
			kids: []
		};

		node.notify = function(timestamp, parentUpdate, parentID)
		{
			var update = false;
			if (parentUpdate && !Utils.eq(node.value, signal.value))
			{
				node.value = signal.value;
				update = true;
			}
			broadcastToKids(node, timestamp, update);
		};

		signal.kids.push(node);

		return node;
	}


	return localRuntime.Native.Signal.values = {
		input: input,
		constant: constant,
		mailbox: mailbox,
		sendMessage: sendMessage,
		output: output,
		map: F2(map),
		map2: F3(map2),
		map3: F4(map3),
		map4: F5(map4),
		map5: F6(map5),
		foldp: F3(foldp),
		genericMerge: F3(genericMerge),
		filterMap: F3(filterMap),
		sampleOn: F2(sampleOn),
		dropRepeats: dropRepeats,
		timestamp: timestamp,
		delay: F2(delay)
	};
};

Elm.Native.String = {};
Elm.Native.String.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.String = localRuntime.Native.String || {};
	if (localRuntime.Native.String.values)
	{
		return localRuntime.Native.String.values;
	}
	if ('values' in Elm.Native.String)
	{
		return localRuntime.Native.String.values = Elm.Native.String.values;
	}


	var Char = Elm.Char.make(localRuntime);
	var List = Elm.Native.List.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);
	var Result = Elm.Result.make(localRuntime);
	var Utils = Elm.Native.Utils.make(localRuntime);

	function isEmpty(str)
	{
		return str.length === 0;
	}
	function cons(chr,str)
	{
		return chr + str;
	}
	function uncons(str)
	{
		var hd;
		return (hd = str[0])
			? Maybe.Just(Utils.Tuple2(Utils.chr(hd), str.slice(1)))
			: Maybe.Nothing;
	}
	function append(a,b)
	{
		return a + b;
	}
	function concat(strs)
	{
		return List.toArray(strs).join('');
	}
	function length(str)
	{
		return str.length;
	}
	function map(f,str)
	{
		var out = str.split('');
		for (var i = out.length; i--; )
		{
			out[i] = f(Utils.chr(out[i]));
		}
		return out.join('');
	}
	function filter(pred,str)
	{
		return str.split('').map(Utils.chr).filter(pred).join('');
	}
	function reverse(str)
	{
		return str.split('').reverse().join('');
	}
	function foldl(f,b,str)
	{
		var len = str.length;
		for (var i = 0; i < len; ++i)
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}
	function foldr(f,b,str)
	{
		for (var i = str.length; i--; )
		{
			b = A2(f, Utils.chr(str[i]), b);
		}
		return b;
	}

	function split(sep, str)
	{
		return List.fromArray(str.split(sep));
	}
	function join(sep, strs)
	{
		return List.toArray(strs).join(sep);
	}
	function repeat(n, str)
	{
		var result = '';
		while (n > 0)
		{
			if (n & 1)
			{
				result += str;
			}
			n >>= 1, str += str;
		}
		return result;
	}

	function slice(start, end, str)
	{
		return str.slice(start,end);
	}
	function left(n, str)
	{
		return n < 1 ? "" : str.slice(0,n);
	}
	function right(n, str)
	{
		return n < 1 ? "" : str.slice(-n);
	}
	function dropLeft(n, str)
	{
		return n < 1 ? str : str.slice(n);
	}
	function dropRight(n, str)
	{
		return n < 1 ? str : str.slice(0,-n);
	}

	function pad(n,chr,str)
	{
		var half = (n - str.length) / 2;
		return repeat(Math.ceil(half),chr) + str + repeat(half|0,chr);
	}
	function padRight(n,chr,str)
	{
		return str + repeat(n - str.length, chr);
	}
	function padLeft(n,chr,str)
	{
		return repeat(n - str.length, chr) + str;
	}

	function trim(str)
	{
		return str.trim();
	}
	function trimLeft(str)
	{
		return str.trimLeft();
	}
	function trimRight(str)
	{
		return str.trimRight();
	}

	function words(str)
	{
		return List.fromArray(str.trim().split(/\s+/g));
	}
	function lines(str)
	{
		return List.fromArray(str.split(/\r\n|\r|\n/g));
	}

	function toUpper(str)
	{
		return str.toUpperCase();
	}
	function toLower(str)
	{
		return str.toLowerCase();
	}

	function any(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (pred(Utils.chr(str[i])))
			{
				return true;
			}
		}
		return false;
	}
	function all(pred, str)
	{
		for (var i = str.length; i--; )
		{
			if (!pred(Utils.chr(str[i])))
			{
				return false;
			}
		}
		return true;
	}

	function contains(sub, str)
	{
		return str.indexOf(sub) > -1;
	}
	function startsWith(sub, str)
	{
		return str.indexOf(sub) === 0;
	}
	function endsWith(sub, str)
	{
		return str.length >= sub.length &&
			str.lastIndexOf(sub) === str.length - sub.length;
	}
	function indexes(sub, str)
	{
		var subLen = sub.length;
		var i = 0;
		var is = [];
		while ((i = str.indexOf(sub, i)) > -1)
		{
			is.push(i);
			i = i + subLen;
		}
		return List.fromArray(is);
	}

	function toInt(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to an Int" );
		}
		var start = 0;
		if (s[0] == '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
			start = 1;
		}
		for (var i = start; i < len; ++i)
		{
			if (!Char.isDigit(s[i]))
			{
				return Result.Err("could not convert string '" + s + "' to an Int" );
			}
		}
		return Result.Ok(parseInt(s, 10));
	}

	function toFloat(s)
	{
		var len = s.length;
		if (len === 0)
		{
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		var start = 0;
		if (s[0] == '-')
		{
			if (len === 1)
			{
				return Result.Err("could not convert string '" + s + "' to a Float" );
			}
			start = 1;
		}
		var dotCount = 0;
		for (var i = start; i < len; ++i)
		{
			if (Char.isDigit(s[i]))
			{
				continue;
			}
			if (s[i] === '.')
			{
				dotCount += 1;
				if (dotCount <= 1)
				{
					continue;
				}
			}
			return Result.Err("could not convert string '" + s + "' to a Float" );
		}
		return Result.Ok(parseFloat(s));
	}

	function toList(str)
	{
		return List.fromArray(str.split('').map(Utils.chr));
	}
	function fromList(chars)
	{
		return List.toArray(chars).join('');
	}

	return Elm.Native.String.values = {
		isEmpty: isEmpty,
		cons: F2(cons),
		uncons: uncons,
		append: F2(append),
		concat: concat,
		length: length,
		map: F2(map),
		filter: F2(filter),
		reverse: reverse,
		foldl: F3(foldl),
		foldr: F3(foldr),

		split: F2(split),
		join: F2(join),
		repeat: F2(repeat),

		slice: F3(slice),
		left: F2(left),
		right: F2(right),
		dropLeft: F2(dropLeft),
		dropRight: F2(dropRight),

		pad: F3(pad),
		padLeft: F3(padLeft),
		padRight: F3(padRight),

		trim: trim,
		trimLeft: trimLeft,
		trimRight: trimRight,

		words: words,
		lines: lines,

		toUpper: toUpper,
		toLower: toLower,

		any: F2(any),
		all: F2(all),

		contains: F2(contains),
		startsWith: F2(startsWith),
		endsWith: F2(endsWith),
		indexes: F2(indexes),

		toInt: toInt,
		toFloat: toFloat,
		toList: toList,
		fromList: fromList
	};
};

Elm.Native.Task = {};
Elm.Native.Task.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Task = localRuntime.Native.Task || {};
	if (localRuntime.Native.Task.values)
	{
		return localRuntime.Native.Task.values;
	}

	var Result = Elm.Result.make(localRuntime);
	var Signal;
	var Utils = Elm.Native.Utils.make(localRuntime);


	// CONSTRUCTORS

	function succeed(value)
	{
		return {
			tag: 'Succeed',
			value: value
		};
	}

	function fail(error)
	{
		return {
			tag: 'Fail',
			value: error
		};
	}

	function asyncFunction(func)
	{
		return {
			tag: 'Async',
			asyncFunction: func
		};
	}

	function andThen(task, callback)
	{
		return {
			tag: 'AndThen',
			task: task,
			callback: callback
		};
	}

	function catch_(task, callback)
	{
		return {
			tag: 'Catch',
			task: task,
			callback: callback
		};
	}


	// RUNNER

	function perform(task) {
		runTask({ task: task }, function() {});
	}

	function performSignal(name, signal)
	{
		var workQueue = [];

		function onComplete()
		{
			workQueue.shift();

			setTimeout(function() {
				if (workQueue.length > 0)
				{
					runTask(workQueue[0], onComplete);
				}
			}, 0);
		}

		function register(task)
		{
			var root = { task: task };
			workQueue.push(root);
			if (workQueue.length === 1)
			{
				runTask(root, onComplete);
			}
		}

		if (!Signal)
		{
			Signal = Elm.Native.Signal.make(localRuntime);
		}
		Signal.output('perform-tasks-' + name, register, signal);

		register(signal.value);

		return signal;
	}

	function mark(status, task)
	{
		return { status: status, task: task };
	}

	function runTask(root, onComplete)
	{
		var result = mark('runnable', root.task);
		while (result.status === 'runnable')
		{
			result = stepTask(onComplete, root, result.task);
		}

		if (result.status === 'done')
		{
			root.task = result.task;
			onComplete();
		}

		if (result.status === 'blocked')
		{
			root.task = result.task;
		}
	}

	function stepTask(onComplete, root, task)
	{
		var tag = task.tag;

		if (tag === 'Succeed' || tag === 'Fail')
		{
			return mark('done', task);
		}

		if (tag === 'Async')
		{
			var placeHolder = {};
			var couldBeSync = true;
			var wasSync = false;

			task.asyncFunction(function(result) {
				placeHolder.tag = result.tag;
				placeHolder.value = result.value;
				if (couldBeSync)
				{
					wasSync = true;
				}
				else
				{
					runTask(root, onComplete);
				}
			});
			couldBeSync = false;
			return mark(wasSync ? 'done' : 'blocked', placeHolder);
		}

		if (tag === 'AndThen' || tag === 'Catch')
		{
			var result = mark('runnable', task.task);
			while (result.status === 'runnable')
			{
				result = stepTask(onComplete, root, result.task);
			}

			if (result.status === 'done')
			{
				var activeTask = result.task;
				var activeTag = activeTask.tag;

				var succeedChain = activeTag === 'Succeed' && tag === 'AndThen';
				var failChain = activeTag === 'Fail' && tag === 'Catch';

				return (succeedChain || failChain)
					? mark('runnable', task.callback(activeTask.value))
					: mark('runnable', activeTask);
			}
			if (result.status === 'blocked')
			{
				return mark('blocked', {
					tag: tag,
					task: result.task,
					callback: task.callback
				});
			}
		}
	}


	// THREADS

	function sleep(time) {
		return asyncFunction(function(callback) {
			setTimeout(function() {
				callback(succeed(Utils.Tuple0));
			}, time);
		});
	}

	function spawn(task) {
		return asyncFunction(function(callback) {
			var id = setTimeout(function() {
				perform(task);
			}, 0);
			callback(succeed(id));
		});
	}


	return localRuntime.Native.Task.values = {
		succeed: succeed,
		fail: fail,
		asyncFunction: asyncFunction,
		andThen: F2(andThen),
		catch_: F2(catch_),
		perform: perform,
		performSignal: performSignal,
		spawn: spawn,
		sleep: sleep
	};
};

Elm.Native.Text = {};
Elm.Native.Text.make = function(localRuntime) {
	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Text = localRuntime.Native.Text || {};
	if (localRuntime.Native.Text.values)
	{
		return localRuntime.Native.Text.values;
	}

	var toCss = Elm.Native.Color.make(localRuntime).toCss;
	var List = Elm.Native.List.make(localRuntime);


	// CONSTRUCTORS

	function fromString(str)
	{
		return {
			ctor: 'Text:Text',
			_0: str
		};
	}

	function append(a, b)
	{
		return {
			ctor: 'Text:Append',
			_0: a,
			_1: b
		};
	}

	function addMeta(field, value, text)
	{
		var newProps = {};
		var newText = {
			ctor: 'Text:Meta',
			_0: newProps,
			_1: text
		};

		if (text.ctor === 'Text:Meta')
		{
			newText._1 = text._1;
			var props = text._0;
			for (var i = metaKeys.length; i--; )
			{
				var key = metaKeys[i];
				var val = props[key];
				if (val)
				{
					newProps[key] = val;
				}
			}
		}
		newProps[field] = value;
		return newText;
	}

	var metaKeys = [
		'font-size',
		'font-family',
		'font-style',
		'font-weight',
		'href',
		'text-decoration',
		'color'
	];


	// conversions from Elm values to CSS

	function toTypefaces(list)
	{
		var typefaces = List.toArray(list);
		for (var i = typefaces.length; i--; )
		{
			var typeface = typefaces[i];
			if (typeface.indexOf(' ') > -1)
			{
				typefaces[i] = "'" + typeface + "'";
			}
		}
		return typefaces.join(',');
	}

	function toLine(line)
	{
		var ctor = line.ctor;
		return ctor === 'Under'
			? 'underline'
			: ctor === 'Over'
				? 'overline'
				: 'line-through';
	}

	// setting styles of Text

	function style(style, text)
	{
		var newText = addMeta('color', toCss(style.color), text);
		var props = newText._0;

		if (style.typeface.ctor !== '[]')
		{
			props['font-family'] = toTypefaces(style.typeface);
		}
		if (style.height.ctor !== "Nothing")
		{
			props['font-size'] = style.height._0 + 'px';
		}
		if (style.bold)
		{
			props['font-weight'] = 'bold';
		}
		if (style.italic)
		{
			props['font-style'] = 'italic';
		}
		if (style.line.ctor !== 'Nothing')
		{
			props['text-decoration'] = toLine(style.line._0);
		}
		return newText;
	}

	function height(px, text)
	{
		return addMeta('font-size', px + 'px', text);
	}

	function typeface(names, text)
	{
		return addMeta('font-family', toTypefaces(names), text);
	}

	function monospace(text)
	{
		return addMeta('font-family', 'monospace', text);
	}

	function italic(text)
	{
		return addMeta('font-style', 'italic', text);
	}

	function bold(text)
	{
		return addMeta('font-weight', 'bold', text);
	}

	function link(href, text)
	{
		return addMeta('href', href, text);
	}

	function line(line, text)
	{
		return addMeta('text-decoration', toLine(line), text);
	}

	function color(color, text)
	{
		return addMeta('color', toCss(color), text);;
	}


	// RENDER

	function renderHtml(text)
	{
		var tag = text.ctor;
		if (tag === 'Text:Append')
		{
			return renderHtml(text._0) + renderHtml(text._1);
		}
		if (tag === 'Text:Text')
		{
			return properEscape(text._0);
		}
		if (tag === 'Text:Meta')
		{
			return renderMeta(text._0, renderHtml(text._1));
		}
	}

	function renderMeta(metas, string)
	{
		var href = metas['href'];
		if (href)
		{
			string = '<a href="' + href + '">' + string + '</a>';
		}
		var styles = '';
		for (var key in metas)
		{
			if (key === 'href')
			{
				continue;
			}
			styles += key + ':' + metas[key] + ';';
		}
		if (styles)
		{
			string = '<span style="' + styles + '">' + string + '</span>';
		}
		return string;
	}

	function properEscape(str)
	{
		if (str.length == 0)
		{
			return str;
		}
		str = str //.replace(/&/g,  "&#38;")
			.replace(/"/g,  '&#34;')
			.replace(/'/g,  "&#39;")
			.replace(/</g,  "&#60;")
			.replace(/>/g,  "&#62;");
		var arr = str.split('\n');
		for (var i = arr.length; i--; )
		{
			arr[i] = makeSpaces(arr[i]);
		}
		return arr.join('<br/>');
	}

	function makeSpaces(s)
	{
		if (s.length == 0)
		{
			return s;
		}
		var arr = s.split('');
		if (arr[0] == ' ')
		{
			arr[0] = "&nbsp;"
		}
		for (var i = arr.length; --i; )
		{
			if (arr[i][0] == ' ' && arr[i-1] == ' ')
			{
				arr[i-1] = arr[i-1] + arr[i];
				arr[i] = '';
			}
		}
		for (var i = arr.length; i--; )
		{
			if (arr[i].length > 1 && arr[i][0] == ' ')
			{
				var spaces = arr[i].split('');
				for (var j = spaces.length - 2; j >= 0; j -= 2)
				{
					spaces[j] = '&nbsp;';
				}
				arr[i] = spaces.join('');
			}
		}
		arr = arr.join('');
		if (arr[arr.length-1] === " ")
		{
			return arr.slice(0,-1) + '&nbsp;';
		}
		return arr;
	}


	return localRuntime.Native.Text.values = {
		fromString: fromString,
		append: F2(append),

		height: F2(height),
		italic: italic,
		bold: bold,
		line: F2(line),
		monospace: monospace,
		typeface: F2(typeface),
		color: F2(color),
		link: F2(link),
		style: F2(style),

		toTypefaces: toTypefaces,
		toLine: toLine,
		renderHtml: renderHtml
	};
};

Elm.Native.Time = {};
Elm.Native.Time.make = function(localRuntime)
{

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Time = localRuntime.Native.Time || {};
	if (localRuntime.Native.Time.values)
	{
		return localRuntime.Native.Time.values;
	}

	var NS = Elm.Native.Signal.make(localRuntime);
	var Maybe = Elm.Maybe.make(localRuntime);


	// FRAMES PER SECOND

	function fpsWhen(desiredFPS, isOn)
	{
		var msPerFrame = 1000 / desiredFPS;
		var ticker = NS.input('fps-' + desiredFPS, null);

		function notifyTicker()
		{
			localRuntime.notify(ticker.id, null);
		}

		function firstArg(x, y)
		{
			return x;
		}

		// input fires either when isOn changes, or when ticker fires.
		// Its value is a tuple with the current timestamp, and the state of isOn
		var input = NS.timestamp(A3(NS.map2, F2(firstArg), NS.dropRepeats(isOn), ticker));

		var initialState = {
			isOn: false,
			time: localRuntime.timer.programStart,
			delta: 0
		};

		var timeoutId;

		function update(input,state)
		{
			var currentTime = input._0;
			var isOn = input._1;
			var wasOn = state.isOn;
			var previousTime = state.time;

			if (isOn)
			{
				timeoutId = localRuntime.setTimeout(notifyTicker, msPerFrame);
			}
			else if (wasOn)
			{
				clearTimeout(timeoutId);
			}

			return {
				isOn: isOn,
				time: currentTime,
				delta: (isOn && !wasOn) ? 0 : currentTime - previousTime
			};
		}

		return A2(
			NS.map,
			function(state) { return state.delta; },
			A3(NS.foldp, F2(update), update(input.value,initialState), input)
		);
	}


	// EVERY

	function every(t)
	{
		var ticker = NS.input('every-' + t, null);
		function tellTime()
		{
			localRuntime.notify(ticker.id, null);
		}
		var clock = A2( NS.map, fst, NS.timestamp(ticker) );
		setInterval(tellTime, t);
		return clock;
	}


	function fst(pair)
	{
		return pair._0;
	}


	function read(s)
	{
		var t = Date.parse(s);
		return isNaN(t) ? Maybe.Nothing : Maybe.Just(t);
	}

	return localRuntime.Native.Time.values = {
		fpsWhen: F2(fpsWhen),
		every: every,
		toDate: function(t) { return new window.Date(t); },
		read: read
	};

};

Elm.Native.Transform2D = {};
Elm.Native.Transform2D.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Transform2D = localRuntime.Native.Transform2D || {};
	if (localRuntime.Native.Transform2D.values)
	{
		return localRuntime.Native.Transform2D.values;
	}

	var A;
	if (typeof Float32Array === 'undefined')
	{
		A = function(arr)
		{
			this.length = arr.length;
			this[0] = arr[0];
			this[1] = arr[1];
			this[2] = arr[2];
			this[3] = arr[3];
			this[4] = arr[4];
			this[5] = arr[5];
		};
	}
	else
	{
		A = Float32Array;
	}

	// layout of matrix in an array is
	//
	//   | m11 m12 dx |
	//   | m21 m22 dy |
	//   |  0   0   1 |
	//
	//  new A([ m11, m12, dx, m21, m22, dy ])

	var identity = new A([1,0,0,0,1,0]);
	function matrix(m11, m12, m21, m22, dx, dy)
	{
		return new A([m11, m12, dx, m21, m22, dy]);
	}

	function rotation(t)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		return new A([c, -s, 0, s, c, 0]);
	}

	function rotate(t,m)
	{
		var c = Math.cos(t);
		var s = Math.sin(t);
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11*c + m12*s, -m11*s + m12*c, m[2],
					  m21*c + m22*s, -m21*s + m22*c, m[5]]);
	}
	/*
	function move(xy,m) {
		var x = xy._0;
		var y = xy._1;
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4];
		return new A([m11, m12, m11*x + m12*y + m[2],
					  m21, m22, m21*x + m22*y + m[5]]);
	}
	function scale(s,m) { return new A([m[0]*s, m[1]*s, m[2], m[3]*s, m[4]*s, m[5]]); }
	function scaleX(x,m) { return new A([m[0]*x, m[1], m[2], m[3]*x, m[4], m[5]]); }
	function scaleY(y,m) { return new A([m[0], m[1]*y, m[2], m[3], m[4]*y, m[5]]); }
	function reflectX(m) { return new A([-m[0], m[1], m[2], -m[3], m[4], m[5]]); }
	function reflectY(m) { return new A([m[0], -m[1], m[2], m[3], -m[4], m[5]]); }

	function transform(m11, m21, m12, m22, mdx, mdy, n) {
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11*n11 + m12*n21,
					  m11*n12 + m12*n22,
					  m11*ndx + m12*ndy + mdx,
					  m21*n11 + m22*n21,
					  m21*n12 + m22*n22,
					  m21*ndx + m22*ndy + mdy]);
	}
	*/
	function multiply(m, n)
	{
		var m11 = m[0], m12 = m[1], m21 = m[3], m22 = m[4], mdx = m[2], mdy = m[5];
		var n11 = n[0], n12 = n[1], n21 = n[3], n22 = n[4], ndx = n[2], ndy = n[5];
		return new A([m11*n11 + m12*n21,
					  m11*n12 + m12*n22,
					  m11*ndx + m12*ndy + mdx,
					  m21*n11 + m22*n21,
					  m21*n12 + m22*n22,
					  m21*ndx + m22*ndy + mdy]);
	}

	return localRuntime.Native.Transform2D.values = {
		identity:identity,
		matrix:F6(matrix),
		rotation:rotation,
		multiply:F2(multiply)
		/*
		transform:F7(transform),
		rotate:F2(rotate),
		move:F2(move),
		scale:F2(scale),
		scaleX:F2(scaleX),
		scaleY:F2(scaleY),
		reflectX:reflectX,
		reflectY:reflectY
		*/
	};

};

Elm.Native = Elm.Native || {};
Elm.Native.Utils = {};
Elm.Native.Utils.make = function(localRuntime) {

	localRuntime.Native = localRuntime.Native || {};
	localRuntime.Native.Utils = localRuntime.Native.Utils || {};
	if (localRuntime.Native.Utils.values)
	{
		return localRuntime.Native.Utils.values;
	}

	function eq(l,r)
	{
		var stack = [{'x': l, 'y': r}]
		while (stack.length > 0)
		{
			var front = stack.pop();
			var x = front.x;
			var y = front.y;
			if (x === y)
			{
				continue;
			}
			if (typeof x === "object")
			{
				var c = 0;
				for (var i in x)
				{
					++c;
					if (i in y)
					{
						if (i !== 'ctor')
						{
							stack.push({ 'x': x[i], 'y': y[i] });
						}
					}
					else
					{
						return false;
					}
				}
				if ('ctor' in x)
				{
					stack.push({'x': x.ctor, 'y': y.ctor});
				}
				if (c !== Object.keys(y).length)
				{
					return false;
				}
			}
			else if (typeof x === 'function')
			{
				throw new Error('Equality error: general function equality is ' +
								'undecidable, and therefore, unsupported');
			}
			else
			{
				return false;
			}
		}
		return true;
	}

	// code in Generate/JavaScript.hs depends on the particular
	// integer values assigned to LT, EQ, and GT
	var LT = -1, EQ = 0, GT = 1, ord = ['LT','EQ','GT'];

	function compare(x,y)
	{
		return {
			ctor: ord[cmp(x,y)+1]
		};
	}

	function cmp(x,y) {
		var ord;
		if (typeof x !== 'object')
		{
			return x === y ? EQ : x < y ? LT : GT;
		}
		else if (x.isChar)
		{
			var a = x.toString();
			var b = y.toString();
			return a === b
				? EQ
				: a < b
					? LT
					: GT;
		}
		else if (x.ctor === "::" || x.ctor === "[]")
		{
			while (true)
			{
				if (x.ctor === "[]" && y.ctor === "[]")
				{
					return EQ;
				}
				if (x.ctor !== y.ctor)
				{
					return x.ctor === '[]' ? LT : GT;
				}
				ord = cmp(x._0, y._0);
				if (ord !== EQ)
				{
					return ord;
				}
				x = x._1;
				y = y._1;
			}
		}
		else if (x.ctor.slice(0,6) === '_Tuple')
		{
			var n = x.ctor.slice(6) - 0;
			var err = 'cannot compare tuples with more than 6 elements.';
			if (n === 0) return EQ;
			if (n >= 1) { ord = cmp(x._0, y._0); if (ord !== EQ) return ord;
			if (n >= 2) { ord = cmp(x._1, y._1); if (ord !== EQ) return ord;
			if (n >= 3) { ord = cmp(x._2, y._2); if (ord !== EQ) return ord;
			if (n >= 4) { ord = cmp(x._3, y._3); if (ord !== EQ) return ord;
			if (n >= 5) { ord = cmp(x._4, y._4); if (ord !== EQ) return ord;
			if (n >= 6) { ord = cmp(x._5, y._5); if (ord !== EQ) return ord;
			if (n >= 7) throw new Error('Comparison error: ' + err); } } } } } }
			return EQ;
		}
		else
		{
			throw new Error('Comparison error: comparison is only defined on ints, ' +
							'floats, times, chars, strings, lists of comparable values, ' +
							'and tuples of comparable values.');
		}
	}


	var Tuple0 = {
		ctor: "_Tuple0"
	};

	function Tuple2(x,y)
	{
		return {
			ctor: "_Tuple2",
			_0: x,
			_1: y
		};
	}

	function chr(c)
	{
		var x = new String(c);
		x.isChar = true;
		return x;
	}

	function txt(str)
	{
		var t = new String(str);
		t.text = true;
		return t;
	}

	var count = 0;
	function guid(_)
	{
		return count++
	}

	function copy(oldRecord)
	{
		var newRecord = {};
		for (var key in oldRecord)
		{
			var value = key === '_'
				? copy(oldRecord._)
				: oldRecord[key];
			newRecord[key] = value;
		}
		return newRecord;
	}

	function remove(key, oldRecord)
	{
		var record = copy(oldRecord);
		if (key in record._)
		{
			record[key] = record._[key][0];
			record._[key] = record._[key].slice(1);
			if (record._[key].length === 0)
			{
				delete record._[key];
			}
		}
		else
		{
			delete record[key];
		}
		return record;
	}

	function replace(keyValuePairs, oldRecord)
	{
		var record = copy(oldRecord);
		for (var i = keyValuePairs.length; i--; )
		{
			var pair = keyValuePairs[i];
			record[pair[0]] = pair[1];
		}
		return record;
	}

	function insert(key, value, oldRecord)
	{
		var newRecord = copy(oldRecord);
		if (key in newRecord)
		{
			var values = newRecord._[key];
			var copiedValues = values ? values.slice(0) : [];
			newRecord._[key] = [newRecord[key]].concat(copiedValues);
		}
		newRecord[key] = value;
		return newRecord;
	}

	function getXY(e)
	{
		var posx = 0;
		var posy = 0;
		if (e.pageX || e.pageY)
		{
			posx = e.pageX;
			posy = e.pageY;
		}
		else if (e.clientX || e.clientY)
		{
			posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		if (localRuntime.isEmbed())
		{
			var rect = localRuntime.node.getBoundingClientRect();
			var relx = rect.left + document.body.scrollLeft + document.documentElement.scrollLeft;
			var rely = rect.top + document.body.scrollTop + document.documentElement.scrollTop;
			// TODO: figure out if there is a way to avoid rounding here
			posx = posx - Math.round(relx) - localRuntime.node.clientLeft;
			posy = posy - Math.round(rely) - localRuntime.node.clientTop;
		}
		return Tuple2(posx, posy);
	}


	//// LIST STUFF ////

	var Nil = { ctor:'[]' };

	function Cons(hd,tl)
	{
		return {
			ctor: "::",
			_0: hd,
			_1: tl
		};
	}

	function append(xs,ys)
	{
		// append Strings
		if (typeof xs === "string")
		{
			return xs + ys;
		}

		// append Text
		if (xs.ctor.slice(0,5) === 'Text:')
		{
			return {
				ctor: 'Text:Append',
				_0: xs,
				_1: ys
			};
		}



		// append Lists
		if (xs.ctor === '[]')
		{
			return ys;
		}
		var root = Cons(xs._0, Nil);
		var curr = root;
		xs = xs._1;
		while (xs.ctor !== '[]')
		{
			curr._1 = Cons(xs._0, Nil);
			xs = xs._1;
			curr = curr._1;
		}
		curr._1 = ys;
		return root;
	}

	//// RUNTIME ERRORS ////

	function indent(lines)
	{
		return '\n' + lines.join('\n');
	}

	function badCase(moduleName, span)
	{
		var msg = indent([
			'Non-exhaustive pattern match in case-expression.',
			'Make sure your patterns cover every case!'
		]);
		throw new Error('Runtime error in module ' + moduleName + ' (' + span + ')' + msg);
	}

	function badIf(moduleName, span)
	{
		var msg = indent([
			'Non-exhaustive pattern match in multi-way-if expression.',
			'It is best to use \'otherwise\' as the last branch of multi-way-if.'
		]);
		throw new Error('Runtime error in module ' + moduleName + ' (' + span + ')' + msg);
	}


	function badPort(expected, received)
	{
		var msg = indent([
			'Expecting ' + expected + ' but was given ',
			JSON.stringify(received)
		]);
		throw new Error('Runtime error when sending values through a port.' + msg);
	}


	return localRuntime.Native.Utils.values = {
		eq: eq,
		cmp: cmp,
		compare: F2(compare),
		Tuple0: Tuple0,
		Tuple2: Tuple2,
		chr: chr,
		txt: txt,
		copy: copy,
		remove: remove,
		replace: replace,
		insert: insert,
		guid: guid,
		getXY: getXY,

		Nil: Nil,
		Cons: Cons,
		append: F2(append),

		badCase: badCase,
		badIf: badIf,
		badPort: badPort
	};
};

Elm.Network = Elm.Network || {};
Elm.Network.make = function (_elm) {
   "use strict";
   _elm.Network = _elm.Network || {};
   if (_elm.Network.values)
   return _elm.Network.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Network",
   $Agent = Elm.Agent.make(_elm),
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Graph = Elm.Graph.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Helpers = Elm.Helpers.make(_elm),
   $IntDict = Elm.IntDict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $RenderNetwork = Elm.RenderNetwork.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Time = Elm.Time.make(_elm),
   $Types = Elm.Types.make(_elm);
   var moveAgents = function (ctx) {
      return function () {
         var moveRoad = function (_v0) {
            return function () {
               switch (_v0.ctor)
               {case "_Tuple2":
                  return function () {
                       var go = F2(function (agent,
                       calculated) {
                          return function () {
                             var onEdge = $List.map($Basics.snd)(A2($List.filter,
                             function (_v4) {
                                return function () {
                                   switch (_v4.ctor)
                                   {case "_Tuple2":
                                      switch (_v4._0.ctor)
                                        {case "_Tuple2":
                                           return _U.eq(_v4._0._0,_v0._0);}
                                        break;}
                                   _U.badCase($moduleName,
                                   "on line 76, column 50 to 59");
                                }();
                             },
                             calculated));
                             var max = function () {
                                var _v10 = $List.head(onEdge);
                                switch (_v10.ctor)
                                {case "Just":
                                   return _v10._0.travelled - $Types.sizeOf(_v10._0);
                                   case "Nothing": return 1 / 0;}
                                _U.badCase($moduleName,
                                "between lines 77 and 80");
                             }();
                             return A2($List._op["::"],
                             A5($Agent.move,
                             ctx,
                             _v0._0,
                             _v0._1,
                             agent,
                             max),
                             calculated);
                          }();
                       });
                       return A2($List.foldl,
                       go,
                       _L.fromArray([]))($List.reverse(A2($List.sortBy,
                       function (_) {
                          return _.travelled;
                       },
                       _v0._1.agents)));
                    }();}
               _U.badCase($moduleName,
               "between lines 75 and 83");
            }();
         };
         return $List.concatMap(moveRoad)($IntDict.toList(ctx.incoming));
      }();
   };
   var updateContext = function (ctx) {
      return function () {
         var moved = moveAgents(ctx);
         var updateEdge = F2(function (edgeIds,
         road) {
            return function () {
               var spawnedAgents = function () {
                  var _v12 = ctx.node.label.kind;
                  switch (_v12.ctor)
                  {case "CarSpawner":
                     return _U.cmp(_v12._0.nextIn,
                       1) < 0 && _U.eq(_v12._0.startEdge,
                       edgeIds) ? _L.fromArray([{_: {}
                                                ,color: $Color.gray
                                                ,kind: $Types.Car(_v12._0.route)
                                                ,lastEdge: $Maybe.Nothing
                                                ,speed: 5.0e-2
                                                ,totalDist: 0.0
                                                ,travelled: 0.0}]) : _L.fromArray([]);}
                  return _L.fromArray([]);
               }();
               var check = function (_v14) {
                  return function () {
                     switch (_v14.ctor)
                     {case "_Tuple2":
                        return _U.eq(_v14._0,
                          edgeIds) ? $Maybe.Just(_v14._1) : $Maybe.Nothing;}
                     _U.badCase($moduleName,
                     "between lines 92 and 94");
                  }();
               };
               return _U.replace([["agents"
                                  ,A2($Basics._op["++"],
                                  A2($List.filterMap,check,moved),
                                  spawnedAgents)]],
               road);
            }();
         });
         var newIncoming = A2($IntDict.map,
         F2(function (nid,road) {
            return A2(updateEdge,
            {ctor: "_Tuple2"
            ,_0: nid
            ,_1: ctx.node.id},
            road);
         }),
         ctx.incoming);
         var newIncomingEdges = $List.map(function (_v18) {
            return function () {
               switch (_v18.ctor)
               {case "_Tuple2": return {_: {}
                                       ,from: _v18._0
                                       ,label: _v18._1
                                       ,to: ctx.node.id};}
               _U.badCase($moduleName,
               "on line 106, column 83 to 129");
            }();
         })($IntDict.toList(newIncoming));
         var newOutgoing = A2($IntDict.map,
         F2(function (nid,road) {
            return A2(updateEdge,
            {ctor: "_Tuple2"
            ,_0: ctx.node.id
            ,_1: nid},
            road);
         }),
         ctx.outgoing);
         var newOutgoingEdges = $List.map(function (_v22) {
            return function () {
               switch (_v22.ctor)
               {case "_Tuple2": return {_: {}
                                       ,from: ctx.node.id
                                       ,label: _v22._1
                                       ,to: _v22._0};}
               _U.badCase($moduleName,
               "on line 107, column 81 to 125");
            }();
         })($IntDict.toList(newOutgoing));
         return {ctor: "_Tuple2"
                ,_0: newIncomingEdges
                ,_1: newOutgoingEdges};
      }();
   };
   var pickUpSpeed = 1.0;
   var updatePoint = F3(function (edges,
   id,
   point) {
      return function () {
         var _v26 = point.kind;
         switch (_v26.ctor)
         {case "BusStop":
            return function () {
                 var newProps = A2($List.any,
                 function (e) {
                    return _U.eq(e.to,
                    id) && A2($List.any,
                    function (a) {
                       return _U.eq(a.travelled,
                       e.label.length);
                    },
                    e.label.agents);
                 },
                 edges) ? _U.replace([["currentlyWaiting"
                                      ,_v26._0.currentlyWaiting - pickUpSpeed]],
                 _v26._0) : _U.replace([["currentlyWaiting"
                                        ,_v26._0.currentlyWaiting + _v26._0.waitingDelta]],
                 _v26._0);
                 return _U.replace([["kind"
                                    ,$Types.BusStop(newProps)]],
                 point);
              }();
            case "CarSpawner":
            return function () {
                 var newProps = _U.cmp(_v26._0.nextIn,
                 1) < 0 ? _U.replace([["nextIn"
                                      ,_v26._0.interval]],
                 _v26._0) : _U.replace([["nextIn"
                                        ,_v26._0.nextIn - 1]],
                 _v26._0);
                 return _U.replace([["kind"
                                    ,$Types.CarSpawner(newProps)]],
                 point);
              }();
            case "Intersection":
            return point;
            case "StopSign":
            return function () {
                 var newProps = A2($List.any,
                 function (e) {
                    return _U.eq(e.to,
                    id) && A2($List.any,
                    function (a) {
                       return _U.eq(a.travelled,
                       e.label.length);
                    },
                    e.label.agents);
                 },
                 edges) ? _U.replace([["currentDelay"
                                      ,_v26._0.currentDelay - 1]],
                 _v26._0) : _U.replace([["currentDelay"
                                        ,_v26._0.delay]],
                 _v26._0);
                 return _U.replace([["kind"
                                    ,$Types.StopSign(newProps)]],
                 point);
              }();}
         _U.badCase($moduleName,
         "between lines 113 and 129");
      }();
   });
   var updateNetwork = function (net) {
      return function () {
         var go = F2(function (ctx,
         _v30) {
            return function () {
               switch (_v30.ctor)
               {case "_Tuple2":
                  return function () {
                       var $ = updateContext(ctx),
                       in$ = $._0,
                       out$ = $._1;
                       return {ctor: "_Tuple2"
                              ,_0: A2($Basics._op["++"],
                              _v30._0,
                              in$)
                              ,_1: A2($Basics._op["++"],
                              _v30._1,
                              out$)};
                    }();}
               _U.badCase($moduleName,
               "on line 133, column 28 to 93");
            }();
         });
         var $ = A3($Graph.fold,
         go,
         {ctor: "_Tuple2"
         ,_0: _L.fromArray([])
         ,_1: _L.fromArray([])},
         net),
         ins = $._0,
         outs = $._1;
         var mergedEdges = function () {
            var intsToInt = F2(function (x,
            y) {
               return Math.pow(2,
               x) * Math.pow(3,y);
            });
            var insDict = $IntDict.fromList(A2($List.map,
            function (e) {
               return {ctor: "_Tuple2"
                      ,_0: A2(intsToInt,e.from,e.to)
                      ,_1: e};
            },
            ins));
            var outDict = $IntDict.fromList(A2($List.map,
            function (e) {
               return {ctor: "_Tuple2"
                      ,_0: A2(intsToInt,e.from,e.to)
                      ,_1: e};
            },
            outs));
            var united = A3($IntDict.uniteWith,
            F3(function (key,inE,outE) {
               return function () {
                  var inElabel = inE.label;
                  return _U.replace([["label"
                                     ,_U.replace([["agents"
                                                  ,A2($Basics._op["++"],
                                                  inE.label.agents,
                                                  outE.label.agents)]],
                                     inElabel)]],
                  inE);
               }();
            }),
            insDict,
            outDict);
            return $IntDict.values(united);
         }();
         var newNodes = $List.map(function (n) {
            return _U.replace([["label"
                               ,A3(updatePoint,
                               mergedEdges,
                               n.id,
                               n.label)]],
            n);
         })($Graph.nodes(net));
         return A2($Graph.fromNodesAndEdges,
         newNodes,
         mergedEdges);
      }();
   };
   var example = function () {
      var edge = F4(function (from,
      to,
      distance,
      agents) {
         return A3($Graph.Edge,
         from,
         to,
         A2($Types.Road,
         distance,
         agents));
      });
      var edgesWithoutBuses = _L.fromArray([A4(edge,
                                           1,
                                           2,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           2,
                                           4,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           2,
                                           7,
                                           A2($Helpers.dist,1,2),
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           3,
                                           1,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           4,
                                           3,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           4,
                                           6,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           5,
                                           3,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           6,
                                           5,
                                           1.0,
                                           _L.fromArray([]))
                                           ,A4(edge,
                                           7,
                                           6,
                                           1.0,
                                           _L.fromArray([]))]);
      var node = F3(function (id,
      _v34,
      kind) {
         return function () {
            switch (_v34.ctor)
            {case "_Tuple2":
               return A2($Graph.Node,
                 id,
                 A2($Types.Point,
                 A2($Types.Coords,
                 _v34._0,
                 _v34._1),
                 kind));}
            _U.badCase($moduleName,
            "on line 25, column 28 to 60");
         }();
      });
      var carRouteDown = $Helpers.carRouteFromList(_L.fromArray([5
                                                                ,3
                                                                ,1]));
      var carRouteUp = $Helpers.carRouteFromList(_L.fromArray([2
                                                              ,4
                                                              ,6]));
      var nodes = _L.fromArray([A3(node,
                               1,
                               {ctor: "_Tuple2"
                               ,_0: 0.0
                               ,_1: 0.0},
                               $Types.BusStop({_: {}
                                              ,currentlyWaiting: 0.0
                                              ,waitingDelta: 0.1}))
                               ,A3(node,
                               2,
                               {ctor: "_Tuple2"
                               ,_0: 1.0
                               ,_1: 0.0},
                               $Types.CarSpawner({_: {}
                                                 ,interval: 20
                                                 ,nextIn: 0
                                                 ,route: carRouteUp
                                                 ,startEdge: {ctor: "_Tuple2"
                                                             ,_0: 2
                                                             ,_1: 4}}))
                               ,A3(node,
                               3,
                               {ctor: "_Tuple2"
                               ,_0: 0.0
                               ,_1: 1.0},
                               $Types.BusStop({_: {}
                                              ,currentlyWaiting: 0.0
                                              ,waitingDelta: 0.2}))
                               ,A3(node,
                               4,
                               {ctor: "_Tuple2"
                               ,_0: 1.0
                               ,_1: 1.0},
                               $Types.StopSign({_: {}
                                               ,currentDelay: 0.0
                                               ,delay: 8}))
                               ,A3(node,
                               5,
                               {ctor: "_Tuple2"
                               ,_0: 0.0
                               ,_1: 2.0},
                               $Types.CarSpawner({_: {}
                                                 ,interval: 20
                                                 ,nextIn: 0
                                                 ,route: carRouteDown
                                                 ,startEdge: {ctor: "_Tuple2"
                                                             ,_0: 5
                                                             ,_1: 3}}))
                               ,A3(node,
                               6,
                               {ctor: "_Tuple2"
                               ,_0: 1.0
                               ,_1: 2.0},
                               $Types.Intersection)
                               ,A3(node,
                               7,
                               {ctor: "_Tuple2"
                               ,_0: 2.0
                               ,_1: 2.0},
                               $Types.BusStop({_: {}
                                              ,currentlyWaiting: 0.0
                                              ,waitingDelta: 0.1}))]);
      var networkWithoutBuses = A2($Graph.fromNodesAndEdges,
      nodes,
      edgesWithoutBuses);
      var busKind = $Types.Bus(A2($Helpers.busRouteFromList,
      _L.fromArray([7,3,1]),
      networkWithoutBuses));
      var bus = {_: {}
                ,color: $Color.green
                ,kind: busKind
                ,lastEdge: $Maybe.Nothing
                ,speed: 4.0e-2
                ,totalDist: 0.0
                ,travelled: 0.0};
      var edges = _L.fromArray([A4(edge,
                               1,
                               2,
                               1.0,
                               _L.fromArray([bus]))
                               ,A4(edge,
                               2,
                               4,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               2,
                               7,
                               A2($Helpers.dist,1,2),
                               _L.fromArray([]))
                               ,A4(edge,
                               3,
                               1,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               4,
                               3,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               4,
                               6,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               5,
                               3,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               6,
                               5,
                               1.0,
                               _L.fromArray([]))
                               ,A4(edge,
                               7,
                               6,
                               1.0,
                               _L.fromArray([bus]))]);
      return A2($Graph.fromNodesAndEdges,
      nodes,
      edges);
   }();
   var fps = 30;
   var analyze = F2(function (net,
   oldMetrics) {
      return function () {
         var currentlyWaiting = $List.sum($List.map(function (node) {
            return $Basics.toFloat($Types.waitingPassengersAt(node.label));
         })($Graph.nodes(net)));
         var totalBusDistanceTravelled = $List.sum($List.map(function (edge) {
            return $List.sum(A2($List.map,
            $Types.busDistanceTravelled,
            edge.label.agents));
         })($Graph.edges(net)));
         var numRoads = $Basics.toFloat($List.length($Graph.edges(net)));
         var numBuses = $List.sum($List.map(function (edge) {
            return $Basics.toFloat($List.length(A2($List.filter,
            $Types.isBus,
            edge.label.agents)));
         })($Graph.edges(net)));
         var avgBusDistanceTravelled = totalBusDistanceTravelled / numBuses;
         var numAgents = $List.sum($List.map(function (edge) {
            return $Basics.toFloat($List.length(edge.label.agents));
         })($Graph.edges(net)));
         var currentCongestion = numAgents / numRoads;
         var metrics = A2($Dict.insert,
         "avgBusDistanceTravelled",
         avgBusDistanceTravelled)(A2($Dict.insert,
         "totalWaiting",
         currentlyWaiting + $Maybe.withDefault(0)(A2($Dict.get,
         "totalWaiting",
         oldMetrics)))(A2($Dict.insert,
         "currentlyWaiting",
         currentlyWaiting)(A2($Dict.insert,
         "totalCongestion",
         currentCongestion + $Maybe.withDefault(0)(A2($Dict.get,
         "totalCongestion",
         oldMetrics)))(A2($Dict.insert,
         "currentCongestion",
         currentCongestion)(A2($Dict.insert,
         "ticks",
         1 + $Maybe.withDefault(0)(A2($Dict.get,
         "ticks",
         oldMetrics)))(oldMetrics))))));
         return $Debug.watch("metrics")(A2($Dict.insert,
         "avgBusSpeed",
         $Helpers.getOrFail("")(A2($Dict.get,
         "avgBusDistanceTravelled",
         metrics)) / $Helpers.getOrFail("")(A2($Dict.get,
         "ticks",
         metrics)) * fps)(A2($Dict.insert,
         "avgWaiting",
         $Helpers.getOrFail("")(A2($Dict.get,
         "totalWaiting",
         metrics)) / $Helpers.getOrFail("")(A2($Dict.get,
         "ticks",
         metrics)))(A2($Dict.insert,
         "avgCongestion",
         $Helpers.getOrFail("")(A2($Dict.get,
         "totalCongestion",
         metrics)) / $Helpers.getOrFail("")(A2($Dict.get,
         "ticks",
         metrics)))(metrics))));
      }();
   });
   var update = function (_v38) {
      return function () {
         switch (_v38.ctor)
         {case "State":
            return A2($Types.State,
              updateNetwork(_v38._0),
              A2(analyze,_v38._0,_v38._1));}
         _U.badCase($moduleName,
         "on line 171, column 34 to 88");
      }();
   };
   var main = function () {
      var initialState = A2($Types.State,
      example,
      $Dict.empty);
      var state = A3($Signal.foldp,
      F2(function (tick,s) {
         return update(s);
      }),
      initialState,
      $Time.fps(fps));
      return A2($Signal.map,
      $RenderNetwork.render,
      state);
   }();
   _elm.Network.values = {_op: _op
                         ,fps: fps
                         ,example: example
                         ,pickUpSpeed: pickUpSpeed
                         ,moveAgents: moveAgents
                         ,updateContext: updateContext
                         ,updatePoint: updatePoint
                         ,updateNetwork: updateNetwork
                         ,analyze: analyze
                         ,update: update
                         ,main: main};
   return _elm.Network.values;
};
Elm.Queue = Elm.Queue || {};
Elm.Queue.make = function (_elm) {
   "use strict";
   _elm.Queue = _elm.Queue || {};
   if (_elm.Queue.values)
   return _elm.Queue.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Queue",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Queue$Internal = Elm.Queue.Internal.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var toList = function (_v0) {
      return function () {
         switch (_v0.ctor)
         {case "Queue":
            return A2($Basics._op["++"],
              _v0._0,
              $List.reverse(_v0._1));}
         _U.badCase($moduleName,
         "on line 55, column 22 to 41");
      }();
   };
   var map = F2(function (g,_v4) {
      return function () {
         switch (_v4.ctor)
         {case "Queue":
            return A2($Queue$Internal.Queue,
              A2($List.map,g,_v4._0),
              A2($List.map,g,_v4._1));}
         _U.badCase($moduleName,
         "on line 52, column 21 to 55");
      }();
   });
   var length = function (_v8) {
      return function () {
         switch (_v8.ctor)
         {case "Queue":
            return $List.length(_v8._0) + $List.length(_v8._1);}
         _U.badCase($moduleName,
         "on line 49, column 22 to 51");
      }();
   };
   var isEmpty = function (q) {
      return function () {
         switch (q.ctor)
         {case "Queue":
            switch (q._0.ctor)
              {case "[]": switch (q._1.ctor)
                   {case "[]": return true;}
                   break;}
              break;}
         return false;
      }();
   };
   var pop = function (_v15) {
      return function () {
         switch (_v15.ctor)
         {case "Queue":
            return function () {
                 switch (_v15._0.ctor)
                 {case "::":
                    return $Maybe.Just({ctor: "_Tuple2"
                                       ,_0: _v15._0._0
                                       ,_1: A2($Queue$Internal.Queue,
                                       _v15._0._1,
                                       _v15._1)});
                    case "[]": return function () {
                         switch (_v15._1.ctor)
                         {case "[]":
                            return $Maybe.Nothing;}
                         return function () {
                            var _raw = $List.reverse(_v15._1),
                            $ = _raw.ctor === "::" ? _raw : _U.badCase($moduleName,
                            "on line 40, column 27 to 41"),
                            x = $._0,
                            f$ = $._1;
                            return $Maybe.Just({ctor: "_Tuple2"
                                               ,_0: x
                                               ,_1: A2($Queue$Internal.Queue,
                                               f$,
                                               _L.fromArray([]))});
                         }();
                      }();}
                 _U.badCase($moduleName,
                 "between lines 37 and 41");
              }();}
         _U.badCase($moduleName,
         "between lines 37 and 41");
      }();
   };
   var push = F2(function (x,
   _v23) {
      return function () {
         switch (_v23.ctor)
         {case "Queue":
            return A2($Queue$Internal.Queue,
              _v23._0,
              A2($List._op["::"],x,_v23._1));}
         _U.badCase($moduleName,
         "on line 34, column 23 to 36");
      }();
   });
   var empty = A2($Queue$Internal.Queue,
   _L.fromArray([]),
   _L.fromArray([]));
   _elm.Queue.values = {_op: _op
                       ,empty: empty
                       ,push: push
                       ,pop: pop
                       ,isEmpty: isEmpty
                       ,length: length
                       ,map: map
                       ,toList: toList};
   return _elm.Queue.values;
};
Elm.Queue = Elm.Queue || {};
Elm.Queue.Internal = Elm.Queue.Internal || {};
Elm.Queue.Internal.make = function (_elm) {
   "use strict";
   _elm.Queue = _elm.Queue || {};
   _elm.Queue.Internal = _elm.Queue.Internal || {};
   if (_elm.Queue.Internal.values)
   return _elm.Queue.Internal.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Queue.Internal",
   $Basics = Elm.Basics.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var Queue = F2(function (a,b) {
      return {ctor: "Queue"
             ,_0: a
             ,_1: b};
   });
   _elm.Queue.Internal.values = {_op: _op
                                ,Queue: Queue};
   return _elm.Queue.Internal.values;
};
Elm.RenderNetwork = Elm.RenderNetwork || {};
Elm.RenderNetwork.make = function (_elm) {
   "use strict";
   _elm.RenderNetwork = _elm.RenderNetwork || {};
   if (_elm.RenderNetwork.values)
   return _elm.RenderNetwork.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "RenderNetwork",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Graph = Elm.Graph.make(_elm),
   $Graphics$Collage = Elm.Graphics.Collage.make(_elm),
   $Graphics$Element = Elm.Graphics.Element.make(_elm),
   $Helpers = Elm.Helpers.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm),
   $Text = Elm.Text.make(_elm),
   $Types = Elm.Types.make(_elm);
   var getNodes = F2(function (net,
   edge) {
      return function () {
         var _v0 = {ctor: "_Tuple2"
                   ,_0: A2($Graph.get,
                   edge.from,
                   net)
                   ,_1: A2($Graph.get,
                   edge.to,
                   net)};
         switch (_v0.ctor)
         {case "_Tuple2":
            switch (_v0._0.ctor)
              {case "Just":
                 switch (_v0._1.ctor)
                   {case "Just":
                      return $Maybe.Just({ctor: "_Tuple2"
                                         ,_0: _v0._0._0.node.label.coords
                                         ,_1: _v0._1._0.node.label.coords});}
                   break;}
              break;}
         return $Maybe.Nothing;
      }();
   });
   var agentPositions = function (network) {
      return function () {
         var go = function (edge) {
            return function () {
               var toCoords = function (_) {
                  return _.coords;
               }(function (_) {
                  return _.label;
               }(function (_) {
                  return _.node;
               }($Helpers.getOrFail("can\'t find toCoords")(A2($Graph.get,
               edge.to,
               network)))));
               var fromCoords = function (_) {
                  return _.coords;
               }(function (_) {
                  return _.label;
               }(function (_) {
                  return _.node;
               }($Helpers.getOrFail("can\'t find fromCoords")(A2($Graph.get,
               edge.from,
               network)))));
               var angle = A2($Basics.atan2,
               toCoords.y - fromCoords.y,
               toCoords.x - fromCoords.x);
               var road = edge.label;
               var length = road.length;
               var agents = road.agents;
               return A2($List.map,
               function (a) {
                  return {ctor: "_Tuple3"
                         ,_0: A3($Helpers.interpolate,
                         fromCoords,
                         toCoords,
                         a.travelled / length)
                         ,_1: a
                         ,_2: angle};
               },
               agents);
            }();
         };
         return $List.concatMap(go)($Graph.edges(network));
      }();
   };
   var size = 3.5;
   var roadStyle = function () {
      var def = $Graphics$Collage.defaultLine;
      return _U.replace([["width"
                         ,size * 10]
                        ,["cap"
                         ,$Graphics$Collage.Round]],
      def);
   }();
   var medianStyle = function () {
      var def = $Graphics$Collage.defaultLine;
      return _U.replace([["width"
                         ,size / 2]
                        ,["cap",$Graphics$Collage.Round]
                        ,["color",$Color.yellow]
                        ,["dashing"
                         ,_L.fromArray([8 * $Basics.round(size)
                                       ,4 * $Basics.round(size)])]],
      def);
   }();
   var loc = function (n) {
      return {ctor: "_Tuple2"
             ,_0: size * 50 * n.x
             ,_1: size * 50 * n.y};
   };
   var renderAgent = function (_v5) {
      return function () {
         switch (_v5.ctor)
         {case "_Tuple3":
            return function () {
                 var renderedSize = function () {
                    var _v10 = _v5._1.kind;
                    switch (_v10.ctor)
                    {case "Bus": return 25;
                       case "Car": return 20;}
                    _U.badCase($moduleName,
                    "between lines 53 and 56");
                 }();
                 return $Graphics$Collage.rotate(_v5._2)($Graphics$Collage.move(loc(_v5._0))($Graphics$Collage.filled(_v5._1.color)(A2($Graphics$Collage.rect,
                 renderedSize,
                 12))));
              }();}
         _U.badCase($moduleName,
         "between lines 51 and 57");
      }();
   };
   var renderPoint = function (point) {
      return function () {
         var _v13 = point.kind;
         switch (_v13.ctor)
         {case "BusStop":
            return function () {
                 var busSign = $Graphics$Collage.group(_L.fromArray([$Graphics$Collage.traced($Graphics$Collage.defaultLine)(A2($Graphics$Collage.segment,
                                                                    {ctor: "_Tuple2"
                                                                    ,_0: 0
                                                                    ,_1: 0},
                                                                    {ctor: "_Tuple2"
                                                                    ,_0: -20
                                                                    ,_1: 50}))
                                                                    ,$Graphics$Collage.move({ctor: "_Tuple2"
                                                                                            ,_0: -20
                                                                                            ,_1: 50})($Graphics$Collage.filled($Color.yellow)($Graphics$Collage.circle(15)))
                                                                    ,$Graphics$Collage.rotate($Basics.degrees(22.5))($Graphics$Collage.move({ctor: "_Tuple2"
                                                                                                                                            ,_0: -20
                                                                                                                                            ,_1: 50})($Graphics$Collage.text($Text.fromString("BUS"))))]));
                 var crowdSize = $Basics.max(2)(A2($Basics.min,
                 20,
                 $Basics.sqrt(_v13._0.currentlyWaiting) * 2));
                 var crowdCircle = $Graphics$Collage.filled($Color.lightBlue)($Graphics$Collage.circle(crowdSize));
                 return $Graphics$Collage.move(A2($Helpers.addCoords,
                 {ctor: "_Tuple2"
                 ,_0: (0 - size) * 5
                 ,_1: size * 5},
                 loc(point.coords)))($Graphics$Collage.group(_L.fromArray([crowdCircle
                                                                          ,busSign])));
              }();
            case "StopSign":
            return $Graphics$Collage.move(A2($Helpers.addCoords,
              {ctor: "_Tuple2"
              ,_0: (0 - size) * 5
              ,_1: size * 5},
              loc(point.coords)))($Graphics$Collage.group(_L.fromArray([$Graphics$Collage.traced($Graphics$Collage.defaultLine)(A2($Graphics$Collage.segment,
                                                                       {ctor: "_Tuple2"
                                                                       ,_0: 0
                                                                       ,_1: 0},
                                                                       {ctor: "_Tuple2"
                                                                       ,_0: -20
                                                                       ,_1: 50}))
                                                                       ,$Graphics$Collage.move({ctor: "_Tuple2"
                                                                                               ,_0: -20
                                                                                               ,_1: 50})($Graphics$Collage.filled($Color.red)(A2($Graphics$Collage.ngon,
                                                                       8,
                                                                       15)))])));}
         return $Graphics$Collage.toForm($Graphics$Element.empty);
      }();
   };
   var renderNetwork = function (net) {
      return function () {
         var globalTransform = {ctor: "_Tuple2"
                               ,_0: -200.0
                               ,_1: -100.0};
         var agents = A2($List.map,
         renderAgent,
         agentPositions(net));
         var edgeNodePairs = $List.filterMap(getNodes(net))($Graph.edges(net));
         var edgeLines = A2($List.map,
         function (_v16) {
            return function () {
               switch (_v16.ctor)
               {case "_Tuple2":
                  return A2($Graphics$Collage.segment,
                    loc(_v16._0),
                    loc(_v16._1));}
               _U.badCase($moduleName,
               "on line 80, column 41 to 68");
            }();
         },
         edgeNodePairs);
         var roads = A2($List.map,
         $Graphics$Collage.traced(roadStyle),
         edgeLines);
         var lines = A2($List.map,
         $Graphics$Collage.traced(medianStyle),
         edgeLines);
         var points = $List.map(function (_) {
            return _.label;
         })($Graph.nodes(net));
         var busStops = A2($List.map,
         renderPoint,
         points);
         var mapGroup = A2($Graphics$Collage.move,
         globalTransform,
         $Graphics$Collage.group(A2($Basics._op["++"],
         roads,
         A2($Basics._op["++"],
         lines,
         A2($Basics._op["++"],
         busStops,
         agents)))));
         return A2($Graphics$Collage.collage,
         1000,
         800)(_L.fromArray([mapGroup]));
      }();
   };
   var render = function (_v20) {
      return function () {
         switch (_v20.ctor)
         {case "State":
            return A2($Graphics$Element.flow,
              $Graphics$Element.down,
              _L.fromArray([$Graphics$Element.show(A2($Basics._op["++"],
                           "Avg bus speed = ",
                           $Basics.toString($Maybe.withDefault(0)(A2($Dict.get,
                           "avgBusSpeed",
                           _v20._1)))))
                           ,$Graphics$Element.show(A2($Basics._op["++"],
                           "Avg congestion = ",
                           $Basics.toString($Maybe.withDefault(0)(A2($Dict.get,
                           "avgCongestion",
                           _v20._1)))))
                           ,$Graphics$Element.show(A2($Basics._op["++"],
                           "Avg waiting passengers = ",
                           $Basics.toString($Maybe.withDefault(0)(A2($Dict.get,
                           "avgWaiting",
                           _v20._1)))))
                           ,renderNetwork(_v20._0)]));}
         _U.badCase($moduleName,
         "between lines 94 and 98");
      }();
   };
   _elm.RenderNetwork.values = {_op: _op
                               ,size: size
                               ,roadStyle: roadStyle
                               ,medianStyle: medianStyle
                               ,agentPositions: agentPositions
                               ,loc: loc
                               ,getNodes: getNodes
                               ,renderAgent: renderAgent
                               ,renderPoint: renderPoint
                               ,renderNetwork: renderNetwork
                               ,render: render};
   return _elm.RenderNetwork.values;
};
Elm.Result = Elm.Result || {};
Elm.Result.make = function (_elm) {
   "use strict";
   _elm.Result = _elm.Result || {};
   if (_elm.Result.values)
   return _elm.Result.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Result",
   $Maybe = Elm.Maybe.make(_elm);
   var toMaybe = function (result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return $Maybe.Nothing;
            case "Ok":
            return $Maybe.Just(result._0);}
         _U.badCase($moduleName,
         "between lines 164 and 166");
      }();
   };
   var Err = function (a) {
      return {ctor: "Err",_0: a};
   };
   var andThen = F2(function (result,
   callback) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return Err(result._0);
            case "Ok":
            return callback(result._0);}
         _U.badCase($moduleName,
         "between lines 126 and 128");
      }();
   });
   var Ok = function (a) {
      return {ctor: "Ok",_0: a};
   };
   var map = F2(function (func,
   ra) {
      return function () {
         switch (ra.ctor)
         {case "Err": return Err(ra._0);
            case "Ok":
            return Ok(func(ra._0));}
         _U.badCase($moduleName,
         "between lines 41 and 43");
      }();
   });
   var map2 = F3(function (func,
   ra,
   rb) {
      return function () {
         var _v9 = {ctor: "_Tuple2"
                   ,_0: ra
                   ,_1: rb};
         switch (_v9.ctor)
         {case "_Tuple2":
            switch (_v9._0.ctor)
              {case "Err":
                 return Err(_v9._0._0);
                 case "Ok": switch (_v9._1.ctor)
                   {case "Ok": return Ok(A2(func,
                        _v9._0._0,
                        _v9._1._0));}
                   break;}
              switch (_v9._1.ctor)
              {case "Err":
                 return Err(_v9._1._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 55 and 58");
      }();
   });
   var map3 = F4(function (func,
   ra,
   rb,
   rc) {
      return function () {
         var _v16 = {ctor: "_Tuple3"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc};
         switch (_v16.ctor)
         {case "_Tuple3":
            switch (_v16._0.ctor)
              {case "Err":
                 return Err(_v16._0._0);
                 case "Ok": switch (_v16._1.ctor)
                   {case "Ok":
                      switch (_v16._2.ctor)
                        {case "Ok": return Ok(A3(func,
                             _v16._0._0,
                             _v16._1._0,
                             _v16._2._0));}
                        break;}
                   break;}
              switch (_v16._1.ctor)
              {case "Err":
                 return Err(_v16._1._0);}
              switch (_v16._2.ctor)
              {case "Err":
                 return Err(_v16._2._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 63 and 67");
      }();
   });
   var map4 = F5(function (func,
   ra,
   rb,
   rc,
   rd) {
      return function () {
         var _v26 = {ctor: "_Tuple4"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc
                    ,_3: rd};
         switch (_v26.ctor)
         {case "_Tuple4":
            switch (_v26._0.ctor)
              {case "Err":
                 return Err(_v26._0._0);
                 case "Ok": switch (_v26._1.ctor)
                   {case "Ok":
                      switch (_v26._2.ctor)
                        {case "Ok":
                           switch (_v26._3.ctor)
                             {case "Ok": return Ok(A4(func,
                                  _v26._0._0,
                                  _v26._1._0,
                                  _v26._2._0,
                                  _v26._3._0));}
                             break;}
                        break;}
                   break;}
              switch (_v26._1.ctor)
              {case "Err":
                 return Err(_v26._1._0);}
              switch (_v26._2.ctor)
              {case "Err":
                 return Err(_v26._2._0);}
              switch (_v26._3.ctor)
              {case "Err":
                 return Err(_v26._3._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 72 and 77");
      }();
   });
   var map5 = F6(function (func,
   ra,
   rb,
   rc,
   rd,
   re) {
      return function () {
         var _v39 = {ctor: "_Tuple5"
                    ,_0: ra
                    ,_1: rb
                    ,_2: rc
                    ,_3: rd
                    ,_4: re};
         switch (_v39.ctor)
         {case "_Tuple5":
            switch (_v39._0.ctor)
              {case "Err":
                 return Err(_v39._0._0);
                 case "Ok": switch (_v39._1.ctor)
                   {case "Ok":
                      switch (_v39._2.ctor)
                        {case "Ok":
                           switch (_v39._3.ctor)
                             {case "Ok":
                                switch (_v39._4.ctor)
                                  {case "Ok": return Ok(A5(func,
                                       _v39._0._0,
                                       _v39._1._0,
                                       _v39._2._0,
                                       _v39._3._0,
                                       _v39._4._0));}
                                  break;}
                             break;}
                        break;}
                   break;}
              switch (_v39._1.ctor)
              {case "Err":
                 return Err(_v39._1._0);}
              switch (_v39._2.ctor)
              {case "Err":
                 return Err(_v39._2._0);}
              switch (_v39._3.ctor)
              {case "Err":
                 return Err(_v39._3._0);}
              switch (_v39._4.ctor)
              {case "Err":
                 return Err(_v39._4._0);}
              break;}
         _U.badCase($moduleName,
         "between lines 82 and 88");
      }();
   });
   var formatError = F2(function (f,
   result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return Err(f(result._0));
            case "Ok":
            return Ok(result._0);}
         _U.badCase($moduleName,
         "between lines 148 and 150");
      }();
   });
   var fromMaybe = F2(function (err,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return Ok(maybe._0);
            case "Nothing":
            return Err(err);}
         _U.badCase($moduleName,
         "between lines 180 and 182");
      }();
   });
   _elm.Result.values = {_op: _op
                        ,map: map
                        ,map2: map2
                        ,map3: map3
                        ,map4: map4
                        ,map5: map5
                        ,andThen: andThen
                        ,toMaybe: toMaybe
                        ,fromMaybe: fromMaybe
                        ,formatError: formatError
                        ,Ok: Ok
                        ,Err: Err};
   return _elm.Result.values;
};
Elm.Signal = Elm.Signal || {};
Elm.Signal.make = function (_elm) {
   "use strict";
   _elm.Signal = _elm.Signal || {};
   if (_elm.Signal.values)
   return _elm.Signal.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Signal",
   $Basics = Elm.Basics.make(_elm),
   $Debug = Elm.Debug.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Task = Elm.Task.make(_elm);
   var send = F2(function (_v0,
   value) {
      return function () {
         switch (_v0.ctor)
         {case "Address":
            return A2($Task.onError,
              _v0._0(value),
              function (_v3) {
                 return function () {
                    return $Task.succeed({ctor: "_Tuple0"});
                 }();
              });}
         _U.badCase($moduleName,
         "between lines 370 and 371");
      }();
   });
   var Message = function (a) {
      return {ctor: "Message"
             ,_0: a};
   };
   var message = F2(function (_v5,
   value) {
      return function () {
         switch (_v5.ctor)
         {case "Address":
            return Message(_v5._0(value));}
         _U.badCase($moduleName,
         "on line 352, column 5 to 24");
      }();
   });
   var mailbox = $Native$Signal.mailbox;
   var Address = function (a) {
      return {ctor: "Address"
             ,_0: a};
   };
   var forwardTo = F2(function (_v8,
   f) {
      return function () {
         switch (_v8.ctor)
         {case "Address":
            return Address(function (x) {
                 return _v8._0(f(x));
              });}
         _U.badCase($moduleName,
         "on line 339, column 5 to 29");
      }();
   });
   var Mailbox = F2(function (a,
   b) {
      return {_: {}
             ,address: a
             ,signal: b};
   });
   var sampleOn = $Native$Signal.sampleOn;
   var dropRepeats = $Native$Signal.dropRepeats;
   var filterMap = $Native$Signal.filterMap;
   var filter = F3(function (isOk,
   base,
   signal) {
      return A3(filterMap,
      function (value) {
         return isOk(value) ? $Maybe.Just(value) : $Maybe.Nothing;
      },
      base,
      signal);
   });
   var merge = F2(function (left,
   right) {
      return A3($Native$Signal.genericMerge,
      $Basics.always,
      left,
      right);
   });
   var mergeMany = function (signalList) {
      return function () {
         var _v11 = $List.reverse(signalList);
         switch (_v11.ctor)
         {case "::":
            return A3($List.foldl,
              merge,
              _v11._0,
              _v11._1);
            case "[]":
            return $Debug.crash("mergeMany was given an empty list!");}
         _U.badCase($moduleName,
         "between lines 177 and 182");
      }();
   };
   var foldp = $Native$Signal.foldp;
   var map5 = $Native$Signal.map5;
   var map4 = $Native$Signal.map4;
   var map3 = $Native$Signal.map3;
   var map2 = $Native$Signal.map2;
   _op["~"] = F2(function (funcs,
   args) {
      return A3(map2,
      F2(function (f,v) {
         return f(v);
      }),
      funcs,
      args);
   });
   var map = $Native$Signal.map;
   _op["<~"] = map;
   var constant = $Native$Signal.constant;
   var Signal = {ctor: "Signal"};
   _elm.Signal.values = {_op: _op
                        ,merge: merge
                        ,mergeMany: mergeMany
                        ,map: map
                        ,map2: map2
                        ,map3: map3
                        ,map4: map4
                        ,map5: map5
                        ,constant: constant
                        ,dropRepeats: dropRepeats
                        ,filter: filter
                        ,filterMap: filterMap
                        ,sampleOn: sampleOn
                        ,foldp: foldp
                        ,mailbox: mailbox
                        ,send: send
                        ,message: message
                        ,forwardTo: forwardTo
                        ,Mailbox: Mailbox};
   return _elm.Signal.values;
};
Elm.String = Elm.String || {};
Elm.String.make = function (_elm) {
   "use strict";
   _elm.String = _elm.String || {};
   if (_elm.String.values)
   return _elm.String.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "String",
   $Maybe = Elm.Maybe.make(_elm),
   $Native$String = Elm.Native.String.make(_elm),
   $Result = Elm.Result.make(_elm);
   var fromList = $Native$String.fromList;
   var toList = $Native$String.toList;
   var toFloat = $Native$String.toFloat;
   var toInt = $Native$String.toInt;
   var indices = $Native$String.indexes;
   var indexes = $Native$String.indexes;
   var endsWith = $Native$String.endsWith;
   var startsWith = $Native$String.startsWith;
   var contains = $Native$String.contains;
   var all = $Native$String.all;
   var any = $Native$String.any;
   var toLower = $Native$String.toLower;
   var toUpper = $Native$String.toUpper;
   var lines = $Native$String.lines;
   var words = $Native$String.words;
   var trimRight = $Native$String.trimRight;
   var trimLeft = $Native$String.trimLeft;
   var trim = $Native$String.trim;
   var padRight = $Native$String.padRight;
   var padLeft = $Native$String.padLeft;
   var pad = $Native$String.pad;
   var dropRight = $Native$String.dropRight;
   var dropLeft = $Native$String.dropLeft;
   var right = $Native$String.right;
   var left = $Native$String.left;
   var slice = $Native$String.slice;
   var repeat = $Native$String.repeat;
   var join = $Native$String.join;
   var split = $Native$String.split;
   var foldr = $Native$String.foldr;
   var foldl = $Native$String.foldl;
   var reverse = $Native$String.reverse;
   var filter = $Native$String.filter;
   var map = $Native$String.map;
   var length = $Native$String.length;
   var concat = $Native$String.concat;
   var append = $Native$String.append;
   var uncons = $Native$String.uncons;
   var cons = $Native$String.cons;
   var fromChar = function ($char) {
      return A2(cons,$char,"");
   };
   var isEmpty = $Native$String.isEmpty;
   _elm.String.values = {_op: _op
                        ,isEmpty: isEmpty
                        ,length: length
                        ,reverse: reverse
                        ,repeat: repeat
                        ,cons: cons
                        ,uncons: uncons
                        ,fromChar: fromChar
                        ,append: append
                        ,concat: concat
                        ,split: split
                        ,join: join
                        ,words: words
                        ,lines: lines
                        ,slice: slice
                        ,left: left
                        ,right: right
                        ,dropLeft: dropLeft
                        ,dropRight: dropRight
                        ,contains: contains
                        ,startsWith: startsWith
                        ,endsWith: endsWith
                        ,indexes: indexes
                        ,indices: indices
                        ,toInt: toInt
                        ,toFloat: toFloat
                        ,toList: toList
                        ,fromList: fromList
                        ,toUpper: toUpper
                        ,toLower: toLower
                        ,pad: pad
                        ,padLeft: padLeft
                        ,padRight: padRight
                        ,trim: trim
                        ,trimLeft: trimLeft
                        ,trimRight: trimRight
                        ,map: map
                        ,filter: filter
                        ,foldl: foldl
                        ,foldr: foldr
                        ,any: any
                        ,all: all};
   return _elm.String.values;
};
Elm.Task = Elm.Task || {};
Elm.Task.make = function (_elm) {
   "use strict";
   _elm.Task = _elm.Task || {};
   if (_elm.Task.values)
   return _elm.Task.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Task",
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Task = Elm.Native.Task.make(_elm),
   $Result = Elm.Result.make(_elm);
   var sleep = $Native$Task.sleep;
   var spawn = $Native$Task.spawn;
   var ThreadID = function (a) {
      return {ctor: "ThreadID"
             ,_0: a};
   };
   var onError = $Native$Task.catch_;
   var andThen = $Native$Task.andThen;
   var fail = $Native$Task.fail;
   var mapError = F2(function (f,
   promise) {
      return A2(onError,
      promise,
      function (err) {
         return fail(f(err));
      });
   });
   var succeed = $Native$Task.succeed;
   var map = F2(function (func,
   promiseA) {
      return A2(andThen,
      promiseA,
      function (a) {
         return succeed(func(a));
      });
   });
   var map2 = F3(function (func,
   promiseA,
   promiseB) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return succeed(A2(func,a,b));
         });
      });
   });
   var map3 = F4(function (func,
   promiseA,
   promiseB,
   promiseC) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return succeed(A3(func,
               a,
               b,
               c));
            });
         });
      });
   });
   var map4 = F5(function (func,
   promiseA,
   promiseB,
   promiseC,
   promiseD) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return A2(andThen,
               promiseD,
               function (d) {
                  return succeed(A4(func,
                  a,
                  b,
                  c,
                  d));
               });
            });
         });
      });
   });
   var map5 = F6(function (func,
   promiseA,
   promiseB,
   promiseC,
   promiseD,
   promiseE) {
      return A2(andThen,
      promiseA,
      function (a) {
         return A2(andThen,
         promiseB,
         function (b) {
            return A2(andThen,
            promiseC,
            function (c) {
               return A2(andThen,
               promiseD,
               function (d) {
                  return A2(andThen,
                  promiseE,
                  function (e) {
                     return succeed(A5(func,
                     a,
                     b,
                     c,
                     d,
                     e));
                  });
               });
            });
         });
      });
   });
   var andMap = F2(function (promiseFunc,
   promiseValue) {
      return A2(andThen,
      promiseFunc,
      function (func) {
         return A2(andThen,
         promiseValue,
         function (value) {
            return succeed(func(value));
         });
      });
   });
   var sequence = function (promises) {
      return function () {
         switch (promises.ctor)
         {case "::": return A3(map2,
              F2(function (x,y) {
                 return A2($List._op["::"],
                 x,
                 y);
              }),
              promises._0,
              sequence(promises._1));
            case "[]":
            return succeed(_L.fromArray([]));}
         _U.badCase($moduleName,
         "between lines 101 and 106");
      }();
   };
   var toMaybe = function (task) {
      return A2(onError,
      A2(map,$Maybe.Just,task),
      function (_v3) {
         return function () {
            return succeed($Maybe.Nothing);
         }();
      });
   };
   var fromMaybe = F2(function ($default,
   maybe) {
      return function () {
         switch (maybe.ctor)
         {case "Just":
            return succeed(maybe._0);
            case "Nothing":
            return fail($default);}
         _U.badCase($moduleName,
         "between lines 139 and 141");
      }();
   });
   var toResult = function (task) {
      return A2(onError,
      A2(map,$Result.Ok,task),
      function (msg) {
         return succeed($Result.Err(msg));
      });
   };
   var fromResult = function (result) {
      return function () {
         switch (result.ctor)
         {case "Err":
            return fail(result._0);
            case "Ok":
            return succeed(result._0);}
         _U.badCase($moduleName,
         "between lines 151 and 153");
      }();
   };
   var Task = {ctor: "Task"};
   _elm.Task.values = {_op: _op
                      ,succeed: succeed
                      ,fail: fail
                      ,map: map
                      ,map2: map2
                      ,map3: map3
                      ,map4: map4
                      ,map5: map5
                      ,andMap: andMap
                      ,sequence: sequence
                      ,andThen: andThen
                      ,onError: onError
                      ,mapError: mapError
                      ,toMaybe: toMaybe
                      ,fromMaybe: fromMaybe
                      ,toResult: toResult
                      ,fromResult: fromResult
                      ,spawn: spawn
                      ,sleep: sleep};
   return _elm.Task.values;
};
Elm.Text = Elm.Text || {};
Elm.Text.make = function (_elm) {
   "use strict";
   _elm.Text = _elm.Text || {};
   if (_elm.Text.values)
   return _elm.Text.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Text",
   $Color = Elm.Color.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Native$Text = Elm.Native.Text.make(_elm);
   var line = $Native$Text.line;
   var italic = $Native$Text.italic;
   var bold = $Native$Text.bold;
   var color = $Native$Text.color;
   var height = $Native$Text.height;
   var link = $Native$Text.link;
   var monospace = $Native$Text.monospace;
   var typeface = $Native$Text.typeface;
   var style = $Native$Text.style;
   var append = $Native$Text.append;
   var fromString = $Native$Text.fromString;
   var empty = fromString("");
   var concat = function (texts) {
      return A3($List.foldr,
      append,
      empty,
      texts);
   };
   var join = F2(function (seperator,
   texts) {
      return concat(A2($List.intersperse,
      seperator,
      texts));
   });
   var defaultStyle = {_: {}
                      ,bold: false
                      ,color: $Color.black
                      ,height: $Maybe.Nothing
                      ,italic: false
                      ,line: $Maybe.Nothing
                      ,typeface: _L.fromArray([])};
   var Style = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,bold: d
             ,color: c
             ,height: b
             ,italic: e
             ,line: f
             ,typeface: a};
   });
   var Through = {ctor: "Through"};
   var Over = {ctor: "Over"};
   var Under = {ctor: "Under"};
   var Text = {ctor: "Text"};
   _elm.Text.values = {_op: _op
                      ,fromString: fromString
                      ,empty: empty
                      ,append: append
                      ,concat: concat
                      ,join: join
                      ,link: link
                      ,style: style
                      ,defaultStyle: defaultStyle
                      ,typeface: typeface
                      ,monospace: monospace
                      ,height: height
                      ,color: color
                      ,bold: bold
                      ,italic: italic
                      ,line: line
                      ,Style: Style
                      ,Under: Under
                      ,Over: Over
                      ,Through: Through};
   return _elm.Text.values;
};
Elm.Time = Elm.Time || {};
Elm.Time.make = function (_elm) {
   "use strict";
   _elm.Time = _elm.Time || {};
   if (_elm.Time.values)
   return _elm.Time.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Time",
   $Basics = Elm.Basics.make(_elm),
   $Native$Signal = Elm.Native.Signal.make(_elm),
   $Native$Time = Elm.Native.Time.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var delay = $Native$Signal.delay;
   var since = F2(function (time,
   signal) {
      return function () {
         var stop = A2($Signal.map,
         $Basics.always(-1),
         A2(delay,time,signal));
         var start = A2($Signal.map,
         $Basics.always(1),
         signal);
         var delaydiff = A3($Signal.foldp,
         F2(function (x,y) {
            return x + y;
         }),
         0,
         A2($Signal.merge,start,stop));
         return A2($Signal.map,
         F2(function (x,y) {
            return !_U.eq(x,y);
         })(0),
         delaydiff);
      }();
   });
   var timestamp = $Native$Signal.timestamp;
   var every = $Native$Time.every;
   var fpsWhen = $Native$Time.fpsWhen;
   var fps = function (targetFrames) {
      return A2(fpsWhen,
      targetFrames,
      $Signal.constant(true));
   };
   var inMilliseconds = function (t) {
      return t;
   };
   var millisecond = 1;
   var second = 1000 * millisecond;
   var minute = 60 * second;
   var hour = 60 * minute;
   var inHours = function (t) {
      return t / hour;
   };
   var inMinutes = function (t) {
      return t / minute;
   };
   var inSeconds = function (t) {
      return t / second;
   };
   _elm.Time.values = {_op: _op
                      ,millisecond: millisecond
                      ,second: second
                      ,minute: minute
                      ,hour: hour
                      ,inMilliseconds: inMilliseconds
                      ,inSeconds: inSeconds
                      ,inMinutes: inMinutes
                      ,inHours: inHours
                      ,fps: fps
                      ,fpsWhen: fpsWhen
                      ,every: every
                      ,timestamp: timestamp
                      ,delay: delay
                      ,since: since};
   return _elm.Time.values;
};
Elm.Transform2D = Elm.Transform2D || {};
Elm.Transform2D.make = function (_elm) {
   "use strict";
   _elm.Transform2D = _elm.Transform2D || {};
   if (_elm.Transform2D.values)
   return _elm.Transform2D.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Transform2D",
   $Native$Transform2D = Elm.Native.Transform2D.make(_elm);
   var multiply = $Native$Transform2D.multiply;
   var rotation = $Native$Transform2D.rotation;
   var matrix = $Native$Transform2D.matrix;
   var translation = F2(function (x,
   y) {
      return A6(matrix,
      1,
      0,
      0,
      1,
      x,
      y);
   });
   var scale = function (s) {
      return A6(matrix,
      s,
      0,
      0,
      s,
      0,
      0);
   };
   var scaleX = function (x) {
      return A6(matrix,
      x,
      0,
      0,
      1,
      0,
      0);
   };
   var scaleY = function (y) {
      return A6(matrix,
      1,
      0,
      0,
      y,
      0,
      0);
   };
   var identity = $Native$Transform2D.identity;
   var Transform2D = {ctor: "Transform2D"};
   _elm.Transform2D.values = {_op: _op
                             ,identity: identity
                             ,matrix: matrix
                             ,multiply: multiply
                             ,rotation: rotation
                             ,translation: translation
                             ,scale: scale
                             ,scaleX: scaleX
                             ,scaleY: scaleY};
   return _elm.Transform2D.values;
};
Elm.Types = Elm.Types || {};
Elm.Types.make = function (_elm) {
   "use strict";
   _elm.Types = _elm.Types || {};
   if (_elm.Types.values)
   return _elm.Types.values;
   var _op = {},
   _N = Elm.Native,
   _U = _N.Utils.make(_elm),
   _L = _N.List.make(_elm),
   $moduleName = "Types",
   $Basics = Elm.Basics.make(_elm),
   $Color = Elm.Color.make(_elm),
   $Dict = Elm.Dict.make(_elm),
   $Graph = Elm.Graph.make(_elm),
   $IntDict = Elm.IntDict.make(_elm),
   $List = Elm.List.make(_elm),
   $Maybe = Elm.Maybe.make(_elm),
   $Result = Elm.Result.make(_elm),
   $Signal = Elm.Signal.make(_elm);
   var canMoveThrough = F2(function (agent,
   point) {
      return function () {
         var _v0 = {ctor: "_Tuple2"
                   ,_0: point.kind
                   ,_1: agent.kind};
         switch (_v0.ctor)
         {case "_Tuple2":
            switch (_v0._0.ctor)
              {case "BusStop":
                 switch (_v0._1.ctor)
                   {case "Bus":
                      return _U.cmp(_v0._0._0.currentlyWaiting,
                        1.0) < 1;}
                   break;
                 case "StopSign":
                 return _U.cmp(_v0._0._0.currentDelay,
                   1.0) < 1;}
              break;}
         return true;
      }();
   });
   var waitingPassengersAt = function (point) {
      return function () {
         var _v6 = point.kind;
         switch (_v6.ctor)
         {case "BusStop":
            return $Basics.round(_v6._0.currentlyWaiting);}
         return 0;
      }();
   };
   var busDistanceTravelled = function (agent) {
      return function () {
         var _v8 = agent.kind;
         switch (_v8.ctor)
         {case "Bus":
            return agent.totalDist;
            case "Car": return 0;}
         _U.badCase($moduleName,
         "between lines 60 and 62");
      }();
   };
   var sizeOf = function (agent) {
      return function () {
         var _v11 = agent.kind;
         switch (_v11.ctor)
         {case "Bus": return 0.2;
            case "Car": return 0.16;}
         _U.badCase($moduleName,
         "between lines 54 and 56");
      }();
   };
   var isBus = function (agent) {
      return function () {
         var _v14 = agent.kind;
         switch (_v14.ctor)
         {case "Bus": return true;
            case "Car": return false;}
         _U.badCase($moduleName,
         "between lines 48 and 50");
      }();
   };
   var Car = function (a) {
      return {ctor: "Car",_0: a};
   };
   var Bus = function (a) {
      return {ctor: "Bus",_0: a};
   };
   var Agent = F6(function (a,
   b,
   c,
   d,
   e,
   f) {
      return {_: {}
             ,color: e
             ,kind: a
             ,lastEdge: f
             ,speed: b
             ,totalDist: d
             ,travelled: c};
   });
   var Road = F2(function (a,b) {
      return {_: {}
             ,agents: b
             ,length: a};
   });
   var CarSpawner = function (a) {
      return {ctor: "CarSpawner"
             ,_0: a};
   };
   var StopSign = function (a) {
      return {ctor: "StopSign"
             ,_0: a};
   };
   var BusStop = function (a) {
      return {ctor: "BusStop"
             ,_0: a};
   };
   var Intersection = {ctor: "Intersection"};
   var Point = F2(function (a,b) {
      return {_: {}
             ,coords: a
             ,kind: b};
   });
   var State = F2(function (a,b) {
      return {ctor: "State"
             ,_0: a
             ,_1: b};
   });
   var Coords = F2(function (a,b) {
      return {_: {},x: a,y: b};
   });
   _elm.Types.values = {_op: _op
                       ,Coords: Coords
                       ,State: State
                       ,Point: Point
                       ,Intersection: Intersection
                       ,BusStop: BusStop
                       ,StopSign: StopSign
                       ,CarSpawner: CarSpawner
                       ,Road: Road
                       ,Agent: Agent
                       ,Bus: Bus
                       ,Car: Car
                       ,isBus: isBus
                       ,sizeOf: sizeOf
                       ,busDistanceTravelled: busDistanceTravelled
                       ,waitingPassengersAt: waitingPassengersAt
                       ,canMoveThrough: canMoveThrough};
   return _elm.Types.values;
};
