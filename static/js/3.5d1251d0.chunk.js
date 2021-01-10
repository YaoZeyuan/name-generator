(this["webpackJsonpreact-std-app"] = this["webpackJsonpreact-std-app"] || []).push([[3],{

/***/ 31:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCLS", function() { return p; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFCP", function() { return v; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFID", function() { return f; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLCP", function() { return g; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTTFB", function() { return h; });
var t,
    n,
    e = function e() {
  return "".concat(Date.now(), "-").concat(Math.floor(8999999999999 * Math.random()) + 1e12);
},
    i = function i(t) {
  var n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : -1;
  return {
    name: t,
    value: n,
    delta: 0,
    entries: [],
    id: e(),
    isFinal: !1
  };
},
    a = function a(t, n) {
  try {
    if (PerformanceObserver.supportedEntryTypes.includes(t)) {
      var e = new PerformanceObserver(function (t) {
        return t.getEntries().map(n);
      });
      return e.observe({
        type: t,
        buffered: !0
      }), e;
    }
  } catch (t) {}
},
    r = !1,
    o = !1,
    s = function s(t) {
  r = !t.persisted;
},
    u = function u() {
  addEventListener("pagehide", s), addEventListener("beforeunload", function () {});
},
    c = function c(t) {
  var n = arguments.length > 1 && void 0 !== arguments[1] && arguments[1];
  o || (u(), o = !0), addEventListener("visibilitychange", function (n) {
    var e = n.timeStamp;
    "hidden" === document.visibilityState && t({
      timeStamp: e,
      isUnloading: r
    });
  }, {
    capture: !0,
    once: n
  });
},
    l = function l(t, n, e, i) {
  var a;
  return function () {
    e && n.isFinal && e.disconnect(), n.value >= 0 && (i || n.isFinal || "hidden" === document.visibilityState) && (n.delta = n.value - (a || 0), (n.delta || n.isFinal || void 0 === a) && (t(n), a = n.value));
  };
},
    p = function p(t) {
  var n,
      e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = i("CLS", 0),
      o = function o(t) {
    t.hadRecentInput || (r.value += t.value, r.entries.push(t), n());
  },
      s = a("layout-shift", o);

  s && (n = l(t, r, s, e), c(function (t) {
    var e = t.isUnloading;
    s.takeRecords().map(o), e && (r.isFinal = !0), n();
  }));
},
    d = function d() {
  return void 0 === t && (t = "hidden" === document.visibilityState ? 0 : 1 / 0, c(function (n) {
    var e = n.timeStamp;
    return t = e;
  }, !0)), {
    get timeStamp() {
      return t;
    }

  };
},
    v = function v(t) {
  var n,
      e = i("FCP"),
      r = d(),
      o = a("paint", function (t) {
    "first-contentful-paint" === t.name && t.startTime < r.timeStamp && (e.value = t.startTime, e.isFinal = !0, e.entries.push(t), n());
  });
  o && (n = l(t, e, o));
},
    f = function f(t) {
  var n = i("FID"),
      e = d(),
      r = function r(t) {
    t.startTime < e.timeStamp && (n.value = t.processingStart - t.startTime, n.entries.push(t), n.isFinal = !0, s());
  },
      o = a("first-input", r),
      s = l(t, n, o);

  o ? c(function () {
    o.takeRecords().map(r), o.disconnect();
  }, !0) : window.perfMetrics && window.perfMetrics.onFirstInputDelay && window.perfMetrics.onFirstInputDelay(function (t, i) {
    i.timeStamp < e.timeStamp && (n.value = t, n.isFinal = !0, n.entries = [{
      entryType: "first-input",
      name: i.type,
      target: i.target,
      cancelable: i.cancelable,
      startTime: i.timeStamp,
      processingStart: i.timeStamp + t
    }], s());
  });
},
    m = function m() {
  return n || (n = new Promise(function (t) {
    return ["scroll", "keydown", "pointerdown"].map(function (n) {
      addEventListener(n, t, {
        once: !0,
        passive: !0,
        capture: !0
      });
    });
  })), n;
},
    g = function g(t) {
  var n,
      e = arguments.length > 1 && void 0 !== arguments[1] && arguments[1],
      r = i("LCP"),
      o = d(),
      s = function s(t) {
    var e = t.startTime;
    e < o.timeStamp ? (r.value = e, r.entries.push(t)) : r.isFinal = !0, n();
  },
      u = a("largest-contentful-paint", s);

  if (u) {
    n = l(t, r, u, e);

    var p = function p() {
      r.isFinal || (u.takeRecords().map(s), r.isFinal = !0, n());
    };

    m().then(p), c(p, !0);
  }
},
    h = function h(t) {
  var n,
      e = i("TTFB");
  n = function n() {
    try {
      var n = performance.getEntriesByType("navigation")[0] || function () {
        var t = performance.timing,
            n = {
          entryType: "navigation",
          startTime: 0
        };

        for (var e in t) {
          "navigationStart" !== e && "toJSON" !== e && (n[e] = Math.max(t[e] - t.navigationStart, 0));
        }

        return n;
      }();

      e.value = e.delta = n.responseStart, e.entries = [n], e.isFinal = !0, t(e);
    } catch (t) {}
  }, "complete" === document.readyState ? setTimeout(n, 0) : addEventListener("pageshow", n);
};



/***/ })

}]);
//# sourceMappingURL=3.5d1251d0.chunk.js.map