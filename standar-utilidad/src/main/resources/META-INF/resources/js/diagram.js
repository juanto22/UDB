!function () {
    "undefined" == typeof Math.sgn && (
            Math.sgn = function (a) {
                return 0 == a ? 0 : a > 0 ? 1 : -1
            });
    var a = {
        subtract: function (a, b) {
            return{
                x: a.x - b.x, y: a.y - b.y
            }
        },
        dotProduct: function (a, b) {
            return a.x * b.x + a.y * b.y
        },
        square: function (a) {
            return Math.sqrt(a.x * a.x + a.y * a.y)
        },
        scale: function (a, b) {
            return{
                x: a.x * b, y: a.y * b
            }
        }
    },
    b = 64, c = Math.pow(2, -b - 1),
            d = function (b, c) {
                for (var d = [], e = f(b, c), h = c.length - 1, i = 2 * h - 1, j = g(e, i, d, 0), k = a.subtract(b, c[0]), m = a.square(k), n = 0, o = 0; j > o; o++) {
                    k = a.subtract(b, l(c, h, d[o], null, null));
                    var p = a.square(k);
                    m > p && (m = p, n = d[o])
                }
                return k = a.subtract(b, c[h]), p = a.square(k), m > p && (m = p, n = 1), {location: n, distance: m}
            }, e = function (a, b) {
        var c = d(a, b);
        return{point: l(b, b.length - 1, c.location, null, null), location: c.location}
    },
            f = function (b, c) {
                for (var d = c.length - 1, e = 2 * d - 1, f = [], g = [], h = [], i = [], k = [[1, .6, .3, .1], [.4, .6, .6, .4], [.1, .3, .6, 1]], l = 0; d >= l; l++)
                    f[l] = a.subtract(c[l], b);
                for (var l = 0; d - 1 >= l; l++)
                    g[l] = a.subtract(c[l + 1], c[l]), g[l] = a.scale(g[l], 3);
                for (var m = 0; d - 1 >= m; m++)
                    for (var n = 0; d >= n; n++)
                        h[m] || (h[m] = []), h[m][n] = a.dotProduct(g[m], f[n]);
                for (l = 0; e >= l; l++)
                    i[l] || (i[l] = []), i[l].y = 0, i[l].x = parseFloat(l) / e;
                for (var o = d, p = d - 1, q = 0; o + p >= q; q++) {
                    var r = Math.max(0, q - p), s = Math.min(q, o);
                    for (l = r; s >= l; l++)
                        j = q - l, i[l + j].y += h[j][l] * k[j][l]
                }
                return i
            },
            g = function (a, c, d, e) {
                var f, j, m = [], n = [], o = [], p = [];
                switch (h(a, c)) {
                    case 0:
                        return 0;
                    case 1:
                        if (e >= b)
                            return d[0] = (a[0].x + a[c].x) / 2, 1;
                        if (i(a, c))
                            return d[0] = k(a, c), 1
                }
                l(a, c, .5, m, n),
                        f = g(m, c, o, e + 1),
                        j = g(n, c, p, e + 1);
                for (var q = 0; f > q; q++)
                    d[q] = o[q];
                for (var q = 0; j > q; q++)
                    d[q + f] = p[q];
                return f + j
            },
            h = function (a, b) {
                var c, d, e = 0;
                c = d = Math.sgn(a[0].y);
                for (var f = 1; b >= f; f++)
                    c = Math.sgn(a[f].y), c != d && e++, d = c;
                return e
            },
            i = function (a, b) {
                var d, e, f, g, h, i, j,
                        k, l, m, n, o,
                        p, q, r, s;
                i = a[0].y - a[b].y, j = a[b].x - a[0].x, k = a[0].x * a[b].y - a[b].x * a[0].y;
                for (var t = max_distance_below = 0, u = 1; b > u; u++) {
                    var v = i * a[u].x + j * a[u].y + k;
                    v > t ? t = v : max_distance_below > v && (max_distance_below = v)
                }
                return n = 0, o = 1, p = 0, q = i, r = j, s = k - t, l = n * r - q * o, m = 1 / l, e = (o * s - r * p) * m, q = i, r = j, s = k - max_distance_below, l = n * r - q * o, m = 1 / l, f = (o * s - r * p) * m, g = Math.min(e, f), h = Math.max(e, f), d = h - g, c > d ? 1 : 0
            },
            k = function (a, b) {
                var c = 1,
                        d = 0,
                        e = a[b].x - a[0].x,
                        f = a[b].y - a[0].y,
                        g = a[0].x - 0,
                        h = a[0].y - 0,
                        i = e * d - f * c,
                        j = 1 / i,
                        k = (e * h - f * g) * j;
                return 0 + c * k
            },
            l = function (a, b, c, d, e) {
                for (var f = [[]], g = 0; b >= g; g++)
                    f[0][g] = a[g];
                for (var h = 1; b >= h; h++)
                    for (var g = 0; b - h >= g; g++)
                        f[h] || (f[h] = []),
                                f[h][g] || (f[h][g] = {}),
                                f[h][g].x = (1 - c) * f[h - 1][g].x + c * f[h - 1][g + 1].x,
                                f[h][g].y = (1 - c) * f[h - 1][g].y + c * f[h - 1][g + 1].y;
                if (null != d)
                    for (g = 0; b >= g; g++)
                        d[g] = f[g][0];
                if (null != e)
                    for (g = 0; b >= g; g++)
                        e[g] = f[b - g][g];
                return f[b][0]
            },
            m = {}, n = function (a) {
        var b = m[a];
        if (!b) {
            b = [];
            var c = function () {
                return function (b) {
                    return Math.pow(b, a)
                }
            }, d = function () {
                return function (b) {
                    return Math.pow(1 - b, a)
                }
            }, e = function (a) {
                return function () {
                    return a
                }
            }, f = function () {
                return function (a) {
                    return a
                }
            }, g = function () {
                return function (a) {
                    return 1 - a
                }
            }, h = function (a) {
                return function (b) {
                    for (var c = 1, d = 0; d < a.length; d++)
                        c *= a[d](b);
                    return c
                }
            };
            b.push(new c);
            for (var i = 1; a > i; i++) {
                for (var j = [new e(a)], k = 0; a - i > k; k++)
                    j.push(new f);
                for (var k = 0; i > k; k++)
                    j.push(new g);
                b.push(new h(j))
            }
            b.push(new d), m[a] = b
        }
        return b
    },
            o = function (a, b) {
                for (var c = n(a.length - 1), d = 0, e = 0, f = 0; f < a.length; f++)
                    d += a[f].x * c[f](b), e += a[f].y * c[f](b);
                return{x: d, y: e}
            },
            p = function (a, b) {
                return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2))
            },
            q = function (a) {
                return a[0].x == a[1].x && a[0].y == a[1].y
            },
            r = function (a, b, c) {
                if (q(a))
                    return{point: a[0], location: b};
                for (var d = o(a, b), e = 0, f = b, g = c > 0 ? 1 : -1, h = null; e < Math.abs(c); )
                    f += .005 * g, h = o(a, f), e += p(h, d), d = h;
                return{point: h, location: f}
            },
            s = function (a) {
                if (q(a))
                    return 0;
                for (var b = o(a, 0), c = 0, d = 0, e = 1, f = null; 1 > d; )
                    d += .005 * e, f = o(a, d), c += p(f, b), b = f;
                return c
            },
            t = function (a, b, c) {
                return r(a, b, c).point
            },
            u = function (a, b, c) {
                return r(a, b, c).location
            },
            v = function (a, b) {
                var c = o(a, b), d = o(a.slice(0, a.length - 1), b), e = d.y - c.y, f = d.x - c.x;
                return 0 == e ? 1 / 0 : Math.atan(e / f)
            },
            w = function (a, b, c) {
                var d = r(a, b, c);
                return d.location > 1 && (d.location = 1), d.location < 0 && (d.location = 0), v(a, d.location)
            },
            x = function (a, b, c, d) {
                d = null == d ? 0 : d;
                var e = r(a, b, d),
                        f = v(a, e.location),
                        g = Math.atan(-1 / f),
                        h = c / 2 * Math.sin(g),
                        i = c / 2 * Math.cos(g);
                return[{x: e.point.x + i, y: e.point.y + h}, {x: e.point.x - i, y: e.point.y - h}]
            };
    window.jsBezier = {
        distanceFromCurve: d,
        gradientAtPoint: v,
        gradientAtPointAlongCurveFrom: w,
        nearestPointOnCurve: e,
        pointOnCurve: o,
        pointAlongCurveFrom: t,
        perpendicularToCurveAt: x,
        locationAlongCurveFrom: u,
        getLength: s
    }
}(),
        function () {
            "use strict";
            var a = this.Biltong = {}, b = function (a) {
                return"[object Array]" === Object.prototype.toString.call(a)
            },
                    c = function (a, c, d) {
                        return a = b(a) ? a : [a.x, a.y], c = b(c) ? c : [c.x, c.y], d(a, c)
                    },
                    d = a.gradient = function (a, b) {
                        return c(a, b, function (a, b) {
                            return b[0] == a[0] ? b[1] > a[1] ? 1 / 0 : -1 / 0 : b[1] == a[1] ? b[0] > a[0] ? 0 : -0 : (b[1] - a[1]) / (b[0] - a[0])
                        })
                    },
                    e = (a.normal = function (a, b) {
                        return -1 / d(a, b)
                    },
                            a.lineLength = function (a, b) {
                                return c(a, b, function (a, b) {
                                    return Math.sqrt(Math.pow(b[1] - a[1], 2) + Math.pow(b[0] - a[0], 2))
                                })
                            },
                            a.quadrant = function (a, b) {
                                return c(a, b, function (a, b) {
                                    return b[0] > a[0] ? b[1] > a[1] ? 2 : 1 : b[0] == a[0] ? b[1] > a[1] ? 2 : 1 : b[1] > a[1] ? 3 : 4
                                })
                            }),
                    f = (a.theta = function (a, b) {
                        return c(a, b, function (a, b) {
                            var c = d(a, b), f = Math.atan(c), g = e(a, b);
                            return(4 == g || 3 == g) && (f += Math.PI), 0 > f && (f += 2 * Math.PI), f
                        })
                    },
                            a.intersects = function (a, b) {
                                var c = a.x,
                                        d = a.x + a.w,
                                        e = a.y,
                                        f = a.y + a.h,
                                        g = b.x,
                                        h = b.x + b.w,
                                        i = b.y,
                                        j = b.y + b.h;
                                return g >= c && d >= g && i >= e && f >= i || h >= c && d >= h && i >= e && f >= i || g >= c && d >= g && j >= e && f >= j || h >= c && d >= g && j >= e && f >= j || c >= g && h >= c && e >= i && j >= e || d >= g && h >= d && e >= i && j >= e || c >= g && h >= c && f >= i && j >= f || d >= g && h >= c && f >= i && j >= f
                            },
                            a.encloses = function (a, b, c) {
                                var d = a.x,
                                        e = a.x + a.w,
                                        f = a.y,
                                        g = a.y + a.h,
                                        h = b.x,
                                        i = b.x + b.w,
                                        j = b.y,
                                        k = b.y + b.h,
                                        l = function (a, b, d, e) {
                                            return c ? b >= a && d >= e : b > a && d > e
                                        };
                                return l(d, h, e, i) && l(f, j, g, k)
                            }, [null, [1, -1], [1, 1], [-1, 1], [-1, -1]]),
                    g = [null, [-1, -1], [-1, 1], [1, 1], [1, -1]];
            a.pointOnLine = function (a, b, c) {
                var h = d(a, b),
                        i = e(a, b),
                        j = c > 0 ? f[i] : g[i],
                        k = Math.atan(h),
                        l = Math.abs(c * Math.sin(k)) * j[1],
                        m = Math.abs(c * Math.cos(k)) * j[0];
                return{x: a.x + m, y: a.y + l}
            }, a.perpendicularLineTo = function (a, b, c) {
                var e = d(a, b),
                        f = Math.atan(-1 / e),
                        g = c / 2 * Math.sin(f),
                        h = c / 2 * Math.cos(f);
                return[{x: b.x + h, y: b.y + g}, {x: b.x - h, y: b.y - g}]
            }
        }.call(this),
        function () {
            "use strict";
            var a = {
                android: navigator.userAgent.toLowerCase().indexOf("android") > -1
            },
            b = function (a, b, c) {
                c = c || a.parentNode;
                for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                    if (d[e] === a)
                        return!0;
                return!1
            },
                    c = function (a) {
                        return"string" == typeof a ? document.getElementById(a) : a
                    },
                    d = function (a) {
                        return a.srcElement || a.target
                    },
                    e = function (a, b) {
                        for (var c = 0, d = a.length; d > c && a[c] != b; c++)
                            ;
                        c < a.length && a.splice(c, 1)
                    },
                    f = 1, g = function (a, b, c) {
                        var d = f++;
                        return a.__ta = a.__ta || {}, a.__ta[b] = a.__ta[b] || {}, a.__ta[b][d] = c, c.__tauid = d, d
                    },
                    h = function (a, b, c) {
                        if (a.__ta && a.__ta[b] && delete a.__ta[b][c.__tauid], c.__taExtra) {
                            for (var d = 0; d < c.__taExtra.length; d++)
                                D(a, c.__taExtra[d][0], c.__taExtra[d][1]);
                            c.__taExtra.length = 0
                        }
                        c.__taUnstore && c.__taUnstore()
                    },
                    i = function (a, c, e, f) {
                        if (null == a)
                            return e;
                        var g = a.split(","), h = function (a) {
                            h.__tauid = e.__tauid;
                            for (var f = d(a), i = 0; i < g.length; i++)
                                b(f, g[i], c) && e.apply(f, arguments)
                        };
                        return j(e, f, h), h
                    },
                    j = function (a, b, c) {
                        a.__taExtra = a.__taExtra || [], a.__taExtra.push([b, c])
                    },
                    k = function (a, b, c, d) {
                        q && s[b] ? C(a, s[b], i(d, a, c, s[b]), c) : C(a, b, i(d, a, c, b), c)
                    },
                    l = function (a, b, c, f) {
                        if (null == a.__taSmartClicks) {
                            var g = function (b) {
                                a.__tad = w(b)
                            }, h = function (b) {
                                a.__tau = w(b)
                            }, i = function (b) {
                                if (a.__tad && a.__tau && a.__tad[0] === a.__tau[0] && a.__tad[1] === a.__tau[1])
                                    for (var c = 0; c < a.__taSmartClicks.length; c++)
                                        a.__taSmartClicks[c].apply(d(b), [b])
                            };
                            k(a, "mousedown", g, f),
                                    k(a, "mouseup", h, f),
                                    k(a, "click", i, f),
                                    a.__taSmartClicks = []
                        }
                        a.__taSmartClicks.push(c), c.__taUnstore = function () {
                            e(a.__taSmartClicks, c)
                        }
                    },
                    m = {
                        tap: {touches: 1, taps: 1},
                        dbltap: {touches: 1, taps: 2},
                        contextmenu: {touches: 2, taps: 1}
                    },
            n = function (a, c) {
                return function (f, g, h, i) {
                    if ("contextmenu" == g && r)
                        k(f, g, h, i);
                    else {
                        if (null == f.__taTapHandler) {
                            var j = f.__taTapHandler = {
                                tap: [],
                                dbltap: [],
                                contextmenu: [],
                                down: !1,
                                taps: 0,
                                downSelectors: []
                            },
                            l = function (d) {
                                for (var e = d.srcElement || d.target, g = 0; g < j.downSelectors.length; g++)
                                    if (null == j.downSelectors[g] || b(e, j.downSelectors[g], f)) {
                                        j.down = !0,
                                                setTimeout(o, a),
                                                setTimeout(p, c);
                                        break
                                    }
                            },
                                    n = function (a) {
                                        if (j.down) {
                                            var c = a.srcElement || a.target;
                                            j.taps++;
                                            var e = B(a);
                                            for (var g in m) {
                                                var h = m[g];
                                                if (h.touches === e && (1 === h.taps || h.taps === j.taps))
                                                    for (var i = 0; i < j[g].length; i++)
                                                        (null == j[g][i][1] || b(c, j[g][i][1], f)) && j[g][i][0].apply(d(a), [a])
                                            }
                                        }
                                    },
                                    o = function () {
                                        j.down = !1
                                    },
                                    p = function () {
                                        j.taps = 0
                                    };
                            k(f, "mousedown", l),
                                    k(f, "mouseup", n)
                        }
                        f.__taTapHandler.downSelectors.push(i), f.__taTapHandler[g].push([h, i]), h.__taUnstore = function () {
                            e(f.__taTapHandler[g], h)
                        }
                    }
                }
            },
                    o = function (a, b, c, d) {
                        for (var e in c.__tamee[a])
                            c.__tamee[a][e].apply(d, [b])
                    },
                    p = function () {
                        var a = [];
                        return function (c, e, f, h) {
                            if (!c.__tamee) {
                                c.__tamee = {
                                    over: !1,
                                    mouseenter: [],
                                    mouseexit: []
                                };
                                var j = function (e) {
                                    var f = d(e);
                                    (null == h && f == c && !c.__tamee.over || b(f, h, c) && (null == f.__tamee || !f.__tamee.over)) && (o("mouseenter", e, c, f), f.__tamee = f.__tamee || {}, f.__tamee.over = !0, a.push(f))
                                },
                                        k = function (e) {
                                            for (var f = d(e), g = 0; g < a.length; g++)
                                                f != a[g] || b(e.relatedTarget || e.toElement, "*", f) || (f.__tamee.over = !1, a.splice(g, 1), o("mouseexit", e, c, f))
                                        };
                                C(c, "mouseover",
                                        i(h, c, j, "mouseover"),
                                        j),
                                        C(c, "mouseout",
                                                i(h, c, k, "mouseout"),
                                                k)
                            }
                            f.__taUnstore = function () {
                                delete c.__tamee[e][f.__tauid]
                            }, g(c, e, f), c.__tamee[e][f.__tauid] = f
                        }
                    },
                    q = "ontouchstart"in document.documentElement,
                    r = "onmousedown"in document.documentElement,
                    s = {
                        mousedown: "touchstart",
                        mouseup: "touchend",
                        mousemove: "touchmove"
                    },
            t = function () {
                var a = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }(),
                    u = t > -1 && 9 > t,
                    v = function (a, b) {
                        if (null == a)
                            return[0, 0];
                        var c = A(a), d = z(c, 0);
                        return[d[b + "X"], d[b + "Y"]]
                    },
                    w = function (a) {
                        return null == a ? [0, 0] : u ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop] : v(a, "page")
                    },
                    x = function (a) {
                        return v(a, "screen")
                    },
                    y = function (a) {
                        return v(a, "client")
                    },
                    z = function (a, b) {
                        return a.item ? a.item(b) : a[b]
                    },
                    A = function (a) {
                        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
                    },
                    B = function (a) {
                        return A(a).length
                    },
                    C = function (a, b, c, d) {
                        if (g(a, b, c), d.__tauid = c.__tauid, a.addEventListener)
                            a.addEventListener(b, c, !1);
                        else if (a.attachEvent) {
                            var e = b + c.__tauid;
                            a["e" + e] = c, a[e] = function () {
                                a["e" + e] && a["e" + e](window.event)
                            }, a.attachEvent("on" + b, a[e])
                        }
                    },
                    D = function (a, b, d) {
                        null != d && E(a, function () {
                            var a = c(this);
                            if (h(a, b, d), null != d.__tauid)
                                if (a.removeEventListener)
                                    a.removeEventListener(b, d, !1);
                                else if (this.detachEvent) {
                                    var e = b + d.__tauid;
                                    a[e] && a.detachEvent("on" + b, a[e]), a[e] = null, a["e" + e] = null
                                }
                        })
                    },
                    E = function (a, b) {
                        if (null != a) {
                            a = "string" != typeof a && null == a.tagName && null != a.length ? a : "string" == typeof a ? document.querySelectorAll(a) : [a];
                            for (var c = 0; c < a.length; c++)
                                b.apply(a[c])
                        }
                    };
            this.Mottle = function (b) {
                b = b || {};
                var d = b.clickThreshold || 150, e = b.dblClickThreshold || 350, f = new p, g = new n(d, e), h = b.smartClicks, i = function (a, b, d, e) {
                    null != d && E(a, function () {
                        var a = c(this);
                        h && "click" === b ? l(a, b, d, e) : "tap" === b || "dbltap" === b || "contextmenu" === b ? g(a, b, d, e) : "mouseenter" === b || "mouseexit" == b ? f(a, b, d, e) : k(a, b, d, e)
                    })
                };
                this.remove = function (a) {
                    return E(a, function () {
                        var a = c(this);
                        if (a.__ta)
                            for (var b in a.__ta)
                                for (var d in a.__ta[b])
                                    D(a, b, a.__ta[b][d]);
                        a.parentNode && a.parentNode.removeChild(a)
                    }), this
                },
                        this.on = function () {
                            var a = arguments[0],
                                    b = 4 == arguments.length ? arguments[2] : null,
                                    c = arguments[1],
                                    d = arguments[arguments.length - 1];
                            return i(a, c, d, b), this
                        },
                        this.off = function (a, b, c) {
                            return D(a, b, c), this
                        },
                        this.trigger = function (b, d, e, f) {
                            var g = q && s[d] ? s[d] : d, h = w(e), i = x(e), j = y(e);
                            return E(b, function () {
                                var b, k = c(this);
                                e = e || {screenX: i[0],
                                    screenY: i[1],
                                    clientX: j[0],
                                    clientY: j[1]};
                                var l = function (a) {
                                    f && (a.payload = f)
                                }, m = {TouchEvent: function (a) {
                                        var b = document.createTouch(window, k, 0, h[0], h[1], i[0], i[1], j[0], j[1], 0, 0, 0, 0);
                                        a.initTouchEvent(g, !0, !0, window, 0, i[0], i[1], j[0], j[1], !1, !1, !1, !1, document.createTouchList(b))
                                    }, MouseEvents: function (b) {
                                        if (b.initMouseEvent(g, !0, !0, window, 0, i[0], i[1], j[0], j[1], !1, !1, !1, !1, 1, k), a.android) {
                                            var c = document.createTouch(window, k, 0, h[0], h[1], i[0], i[1], j[0], j[1], 0, 0, 0, 0);
                                            b.touches = b.targetTouches = b.changedTouches = document.createTouchList(c)
                                        }
                                    }};
                                if (document.createEvent) {
                                    var n = q && s[d] && !a.android,
                                            o = n ? "TouchEvent" : "MouseEvents";
                                    b = document.createEvent(o),
                                            m[o](b), l(b),
                                            k.dispatchEvent(b)
                                } else
                                    document.createEventObject && (b = document.createEventObject(),
                                            b.eventType = b.eventName = g,
                                            b.screenX = i[0],
                                            b.screenY = i[1],
                                            b.clientX = j[0],
                                            b.clientY = j[1],
                                            l(b),
                                            k.fireEvent("on" + g, b))
                            }), this
                        }
            },
                    Mottle.consume = function (a, b) {
                        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1, !b && a.preventDefault && a.preventDefault()
                    },
                    Mottle.pageLocation = w
        }.call(this),
        function () {
            "use strict";
            var a = function (a) {
                var b = a.getBoundingClientRect(),
                        c = document.body,
                        d = document.documentElement,
                        e = window.pageYOffset || d.scrollTop || c.scrollTop,
                        f = window.pageXOffset || d.scrollLeft || c.scrollLeft,
                        g = d.clientTop || c.clientTop || 0,
                        h = d.clientLeft || c.clientLeft || 0,
                        i = b.top + e - g,
                        j = b.left + f - h;
                return{
                    top: Math.round(i),
                    left: Math.round(j)
                }
            },
                    b = function (a, b, c) {
                        c = c || a.parentNode;
                        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                            if (d[e] === a)
                                return!0;
                        return!1
                    },
                    c = function () {
                        var a = -1;
                        if ("Microsoft Internet Explorer" == navigator.appName) {
                            var b = navigator.userAgent, c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                            null != c.exec(b) && (a = parseFloat(RegExp.$1))
                        }
                        return a
                    }(), d = c > -1 && 9 > c,
                    e = function (a) {
                        if (d)
                            return[a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop];
                        var b = g(a), c = f(b, 0);
                        return[c.pageX, c.pageY]
                    },
                    f = function (a, b) {
                        return a.item ? a.item(b) : a[b]
                    },
                    g = function (a) {
                        return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
                    },
                    h = {
                        draggable: "katavorio-draggable",
                        droppable: "katavorio-droppable",
                        drag: "katavorio-drag",
                        selected: "katavorio-drag-selected",
                        active: "katavorio-drag-active",
                        hover: "katavorio-drag-hover",
                        noSelect: "katavorio-drag-no-select"},
            i = "katavorio-drag-scope",
                    j = ["stop", "start", "drag", "drop", "over", "out"], k = function () {
            },
                    l = function () {
                        return!0
                    },
                    m = function (a, b, c) {
                        for (var d = 0; d < a.length; d++)
                            a[d] != c && b(a[d])
                    },
                    n = function (a, b, c, d) {
                        m(a, function (a) {
                            a.setActive(b), b && a.updatePosition(), c && a.setHover(d, b)
                        })
                    },
                    o = function (a, b) {
                        if (null != a) {
                            a = "string" != typeof a && null == a.tagName && null != a.length ? a : [a];
                            for (var c = 0; c < a.length; c++)
                                b.apply(a[c], [a[c]])
                        }
                    },
                    p = function (a) {
                        a.stopPropagation ? (a.stopPropagation(),
                                a.preventDefault()) : a.returnValue = !1
                    },
                    q = "input,textarea,select,button", r = function (a, c, d) {
                        var e = a.srcElement || a.target;
                        return!b(e, d.getInputFilterSelector(), c)
                    },
                    s = function (a, b, c, d) {
                        this.params = b || {},
                                this.el = a,
                                this.params.addClass(this.el, this._class);
                        var e = !0;
                        return this.setEnabled = function (a) {
                            e = a
                        },
                                this.isEnabled = function () {
                                    return e
                                },
                                this.toggleEnabled = function () {
                                    e = !e
                                },
                                this.setScope = function (a) {
                                    this.scopes = a ? a.split(/\s+/) : [d]
                                },
                                this.addScope = function (a) {
                                    var b = {};
                                    o(this.scopes, function (a) {
                                        b[a] = !0
                                    }), o(a ? a.split(/\s+/) : [], function (a) {
                                        b[a] = !0
                                    }), this.scopes = [];
                                    for (var c in b)
                                        this.scopes.push(c)
                                },
                                this.removeScope = function (a) {
                                    var b = {};
                                    o(this.scopes, function (a) {
                                        b[a] = !0
                                    }), o(a ? a.split(/\s+/) : [], function (a) {
                                        delete b[a]
                                    }), this.scopes = [];
                                    for (var c in b)
                                        this.scopes.push(c)
                                },
                                this.toggleScope = function (a) {
                                    var b = {};
                                    o(this.scopes, function (a) {
                                        b[a] = !0
                                    }), o(a ? a.split(/\s+/) : [], function (a) {
                                        b[a] ? delete b[a] : b[a] = !0
                                    }), this.scopes = [];
                                    for (var c in b)
                                        this.scopes.push(c)
                                },
                                this.setScope(b.scope),
                                this.k = b.katavorio,
                                b.katavorio
                    },
                    t = function (c, d, f) {
                        this._class = f.draggable;
                        var g = s.apply(this, arguments);
                        this.rightButtonCanDrag = this.params.rightButtonCanDrag;
                        var h = [0, 0],
                                i = null,
                                j = !1,
                                k = this.params.consumeStartEvent !== !1,
                                m = this.el,
                                o = this.params.clone;
                        this.toGrid = function (a) {
                            return null == this.params.grid ? a : [this.params.grid[0] * Math.floor(a[0] / this.params.grid[0]), this.params.grid[1] * Math.floor(a[1] / this.params.grid[1])]
                        }, this.constrain = "function" == typeof this.params.constrain ? this.params.constrain : this.params.constrain || this.params.containment ? function (a) {
                            return[Math.max(0, Math.min(w.w - this.size[0], a[0])), Math.max(0, Math.min(w.h - this.size[1], a[1]))]
                        } : function (a) {
                            return a
                        };
                        var q = l,
                                t = "",
                                u = this.params.filterExclude !== !1,
                                v = this.setFilter = function (a, d) {
                                    a && (t = a,
                                            u = d !== !1,
                                            q = function (d) {
                                                var e = d.srcElement || d.target,
                                                        f = b(e, a, c);
                                                return u ? !f : f
                                            })
                                };
                        this.canDrag = this.params.canDrag || l;
                        var w, x = [], y = [];
                        this.downListener = function (b) {
                            var c = this.rightButtonCanDrag || 3 !== b.which && 2 !== b.button;
                            if (c && this.isEnabled() && this.canDrag()) {
                                var d = q(b) && r(b, this.el, this.k);
                                if (d) {
                                    if (o) {
                                        m = this.el.cloneNode(!0),
                                                m.setAttribute("id", null),
                                                m.style.position = "absolute";
                                        var i = a(this.el);
                                        m.style.left = i.left + "px",
                                                m.style.top = i.top + "px",
                                                document.body.appendChild(m)
                                    } else
                                        m = this.el;
                                    k && p(b),
                                            h = e(b),
                                            this.params.bind(document, "mousemove", this.moveListener),
                                            this.params.bind(document, "mouseup", this.upListener),
                                            g.markSelection(this),
                                            this.params.addClass(document.body, f.noSelect)
                                } else
                                    this.params.consumeFilteredEvents && p(b)
                            }
                        }.bind(this),
                                this.moveListener = function (a) {
                                    if (h) {
                                        j || (this.params.events.start({el: this.el, pos: i, e: a, drag: this}),
                                                this.mark(), j = !0),
                                                y.length = 0;
                                        var b = e(a),
                                                c = b[0] - h[0],
                                                d = b[1] - h[1],
                                                f = this.params.ignoreZoom ? 1 : g.getZoom();
                                        c /= f,
                                                d /= f,
                                                this.moveBy(c, d, a),
                                                g.updateSelection(c, d, this)
                                    }
                                }.bind(this),
                                this.upListener = function (a) {
                                    h = null,
                                            j = !1,
                                            this.params.unbind(document, "mousemove", this.moveListener),
                                            this.params.unbind(document, "mouseup", this.upListener),
                                            this.params.removeClass(document.body, f.noSelect),
                                            this.unmark(a),
                                            g.unmarkSelection(this, a),
                                            this.stop(a),
                                            g.notifySelectionDragStop(this, a),
                                            o && (m && m.parentNode && m.parentNode.removeChild(m),
                                                    m = null)
                                }.bind(this),
                                this.getFilter = function () {
                                    return t
                                },
                                this.isFilterExclude = function () {
                                    return u
                                },
                                this.abort = function () {
                                    null != h && this.upListener()
                                },
                                this.getDragElement = function () {
                                    return m || this.el
                                },
                                this.stop = function (a) {
                                    this.params.events.stop({el: m, pos: this.params.getPosition(m), e: a, drag: this})
                                },
                                this.mark = function () {
                                    if (i = this.params.getPosition(m),
                                            this.size = this.params.getSize(m),
                                            x = g.getMatchingDroppables(this),
                                            n(x, !0, !1, this),
                                            this.params.addClass(m, this.params.dragClass || f.drag),
                                            this.params.constrain || this.params.containment) {
                                        var a = this.params.getSize(m.parentNode);
                                        w = {w: a[0], h: a[1]}
                                    }
                                },
                                this.unmark = function (a) {
                                    n(x, !1, !0, this),
                                            x.length = 0;
                                    for (var b = 0; b < y.length; b++)
                                        y[b].drop(this, a)
                                },
                                this.moveBy = function (a, b, c) {
                                    y.length = 0;
                                    var d = this.constrain(this.toGrid([i[0] + a, i[1] + b]), m),
                                            e = {
                                                x: d[0],
                                                y: d[1],
                                                w: this.size[0],
                                                h: this.size[1]
                                            };
                                    this.params.setPosition(m, d);
                                    for (var f = 0; f < x.length; f++) {
                                        var g = {x: x[f].position[0], y: x[f].position[1], w: x[f].size[0], h: x[f].size[1]};
                                        this.params.intersects(e, g) && x[f].canDrop(this) ? (y.push(x[f]), x[f].setHover(this, !0, c)) : x[f].el._katavorioDragHover && x[f].setHover(this, !1, c)
                                    }
                                    this.params.events.drag({el: this.el, pos: d, e: c, drag: this})
                                },
                                this.destroy = function () {
                                    this.params.unbind(this.el, "mousedown", this.downListener), this.params.unbind(document, "mousemove", this.moveListener), this.params.unbind(document, "mouseup", this.upListener), this.downListener = null, this.upListener = null, this.moveListener = null
                                },
                                this.params.bind(this.el, "mousedown", this.downListener), this.params.handle ? v(this.params.handle, !1) : v(this.params.filter, this.params.filterExclude)
                    },
                    u = function (a, b, c) {
                        this._class = c.droppable, this.params = b || {}, this._activeClass = b.activeClass || c.active, this._hoverClass = b.hoverClass || c.hover, s.apply(this, arguments);
                        var d = !1;
                        this.setActive = function (a) {
                            this.params[a ? "addClass" : "removeClass"](this.el, this._activeClass)
                        },
                                this.updatePosition = function () {
                                    this.position = this.params.getPosition(this.el), this.size = this.params.getSize(this.el)
                                },
                                this.canDrop = this.params.canDrop || function () {
                                    return!0
                                },
                                this.setHover = function (a, b, c) {
                                    (b || null == this.el._katavorioDragHover || this.el._katavorioDragHover == a.el._katavorio) && (this.params[b ? "addClass" : "removeClass"](this.el, this._hoverClass), this.el._katavorioDragHover = b ? a.el._katavorio : null, d !== b && this.params.events[b ? "over" : "out"]({el: this.el, e: c, drag: a, drop: this}), d = b)
                                },
                                this.drop = function (a, b) {
                                    this.params.events.drop({drag: a, e: b, drop: this})
                                },
                                this.destroy = function () {
                                    this._class = null, this._activeClass = null, this._hoverClass = null, d = null
                                }
                    },
                    v = function () {
                        return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                            var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
                            return c.toString(16)
                        })
                    },
                    w = function (a) {
                        return null == a ? null : (a = "string" == typeof a ? document.getElementById(a) : a, null == a ? null : (a._katavorio = a._katavorio || v(), a))
                    };
            this.Katavorio = function (a) {
                var b = [],
                        c = {};
                this._dragsByScope = {},
                        this._dropsByScope = {};
                var d = 1,
                        e = function (a, b) {
                            for (var c = 0; c < a.scopes.length; c++)
                                b[a.scopes[c]] = b[a.scopes[c]] || [], b[a.scopes[c]].push(a)
                        },
                        f = function (b, c) {
                            for (var d = 0, e = 0; e < b.scopes.length; e++)
                                if (c[b.scopes[e]]) {
                                    var f = a.indexOf(c[b.scopes[e]], b);
                                    -1 != f && (c[b.scopes[e]].splice(f, 1), d++)
                                }
                            return d > 0
                        },
                        g = (this.getMatchingDroppables = function (a) {
                            for (var b = [], c = {}, d = 0; d < a.scopes.length; d++) {
                                var e = this._dropsByScope[a.scopes[d]];
                                if (e)
                                    for (var f = 0; f < e.length; f++)
                                        e[f].canDrop(a) && !c[e[f].el._katavorio] && e[f].el !== a.el && (c[e[f].el._katavorio] = !0, b.push(e[f]))
                            }
                            return b
                        },
                                function (b) {
                                    b = b || {};
                                    var c = {events: {}};
                                    for (var d in a)
                                        c[d] = a[d];
                                    for (var d in b)
                                        c[d] = b[d];
                                    for (var d = 0; d < j.length; d++)
                                        c.events[j[d]] = b[j[d]] || k;
                                    return c.katavorio = this, c
                                }.bind(this)),
                        l = {},
                        n = a.css || {},
                        p = a.scope || i;
                for (var r in h)
                    l[r] = h[r];
                for (var r in n)
                    l[r] = n[r];
                var s = a.inputFilterSelector || q;
                this.getInputFilterSelector = function () {
                    return s
                },
                        this.setInputFilterSelector = function (a) {
                            return s = a, this
                        },
                        this.draggable = function (b, c) {
                            var d = [];
                            return o(b, function (b) {
                                if (b = w(b), null != b) {
                                    var f = g(c);
                                    b._katavorioDrag = new t(b, f, l, p),
                                            e(b._katavorioDrag, this._dragsByScope),
                                            d.push(b._katavorioDrag),
                                            a.addClass(b, l.draggable)
                                }
                            }.bind(this)), d
                        },
                        this.droppable = function (b, c) {
                            var d = [];
                            return o(b, function (b) {
                                b = w(b),
                                        null != b && (b._katavorioDrop = new u(b, g(c), l, p),
                                                e(b._katavorioDrop, this._dropsByScope),
                                                d.push(b._katavorioDrop),
                                                a.addClass(b, l.droppable))
                            }.bind(this)), d
                        },
                        this.select = function (d) {
                            return o(d, function () {
                                var d = w(this);
                                d && d._katavorioDrag && (c[d._katavorio] || (b.push(d._katavorioDrag),
                                        c[d._katavorio] = [d, b.length - 1],
                                        a.addClass(d, l.selected))
                                        )
                            }), this
                        },
                        this.deselect = function (d) {
                            return o(d, function () {
                                var d = w(this);
                                if (d && d._katavorio) {
                                    var e = c[d._katavorio];
                                    if (e) {
                                        for (var f = [], g = 0; g < b.length; g++)
                                            b[g].el !== d && f.push(b[g]);
                                        b = f, delete c[d._katavorio], a.removeClass(d, l.selected)
                                    }
                                }
                            }), this
                        },
                        this.deselectAll = function () {
                            for (var d in c) {
                                var e = c[d];
                                a.removeClass(e[0], l.selected)
                            }
                            b.length = 0, c = {}
                        },
                        this.markSelection = function (a) {
                            m(b, function (a) {
                                a.mark()
                            }, a)
                        },
                        this.unmarkSelection = function (a, c) {
                            m(b, function (a) {
                                a.unmark(c)
                            }, a)
                        },
                        this.getSelection = function () {
                            return b.slice(0)
                        },
                        this.updateSelection = function (a, c, d) {
                            m(b, function (b) {
                                b.moveBy(a, c)
                            }, d)
                        },
                        this.notifySelectionDragStop = function (a, c) {
                            m(b, function (a) {
                                a.stop(c)
                            }, a)
                        },
                        this.setZoom = function (a) {
                            d = a
                        },
                        this.getZoom = function () {
                            return d
                        };
                var v = function (a, b, c, d) {
                    null != a && (f(a, c), a[d](b), e(a, c))
                };
                o(["set", "add", "remove", "toggle"],
                        function (a) {
                            this[a + "Scope"] = function (b, c) {
                                v(b._katavorioDrag, c, this._dragsByScope, a + "Scope"),
                                        v(b._katavorioDrop, c, this._dropsByScope, a + "Scope")
                            }.bind(this), this[a + "DragScope"] = function (b, c) {
                                v(b._katavorioDrag, c, this._dragsByScope, a + "Scope")
                            }.bind(this), this[a + "DropScope"] = function (b, c) {
                                v(b._katavorioDrop, c, this._dropsByScope, a + "Scope")
                            }.bind(this)
                        }.bind(this)), this.getDragsForScope = function (a) {
                    return this._dragsByScope[a]
                }, this.getDropsForScope = function (a) {
                    return this._dropsByScope[a]
                };
                var x = function (a, b, c) {
                    a = w(a), a[b] && (f(a[b], c) && a[b].destroy(), a[b] = null)
                };
                this.elementRemoved = function (a) {
                    this.destroyDraggable(a), this.destroyDroppable(a)
                },
                        this.destroyDraggable = function (a) {
                            x(a, "_katavorioDrag", this._dragsByScope)
                        },
                        this.destroyDroppable = function (a) {
                            x(a, "_katavorioDrop", this._dropsByScope)
                        }
            }
        }.call(this), function () {
    var a = function (a) {
        return"[object Array]" === Object.prototype.toString.call(a)
    }, b = function (a) {
        return"[object Number]" === Object.prototype.toString.call(a)
    }, c = function (a) {
        return"string" == typeof a
    }, d = function (a) {
        return"boolean" == typeof a
    }, e = function (a) {
        return null == a
    }, f = function (a) {
        return null == a ? !1 : "[object Object]" === Object.prototype.toString.call(a)
    }, g = function (a) {
        return"[object Date]" === Object.prototype.toString.call(a)
    }, h = function (a) {
        return"[object Function]" === Object.prototype.toString.call(a)
    }, i = function (a) {
        for (var b in a)
            if (a.hasOwnProperty(b))
                return!1;
        return!0
    },
            j = this,
            k = j.jsPlumbUtil = {
                isArray: a,
                isString: c,
                isBoolean: d,
                isNull: e,
                isObject: f,
                isDate: g,
                isFunction: h,
                isEmpty: i,
                isNumber: b,
                clone: function (b) {
                    if (c(b))
                        return"" + b;
                    if (d(b))
                        return!!b;
                    if (g(b))
                        return new Date(b.getTime());
                    if (h(b))
                        return b;
                    if (a(b)) {
                        for (var e = [], i = 0; i < b.length; i++)
                            e.push(this.clone(b[i]));
                        return e
                    }
                    if (f(b)) {
                        var j = {};
                        for (var k in b)
                            j[k] = this.clone(b[k]);
                        return j
                    }
                    return b
                },
                merge: function (b, e, g) {
                    var h, i, j = {};
                    for (g = g || [], i = 0; i < g.length; i++)
                        j[g[i]] = !0;
                    var k = this.clone(b);
                    for (i in e)
                        if (null == k[i])
                            k[i] = e[i];
                        else if (c(e[i]) || d(e[i]))
                            j[i] ? (h = [],
                                    h.push.apply(h, a(k[i]) ? k[i] : [k[i]]),
                                    h.push.apply(h, a(e[i]) ? e[i] : [e[i]]),
                                    k[i] = h) : k[i] = e[i];
                        else if (a(e[i]))
                            h = [],
                                    a(k[i]) && h.push.apply(h, k[i]),
                                    h.push.apply(h, e[i]), k[i] = h;
                        else if (f(e[i])) {
                            f(k[i]) || (k[i] = {});
                            for (var l in e[i])
                                k[i][l] = e[i][l]
                        }
                    return k
                },
                replace: function (a, b, c) {
                    if (null != a) {
                        var d = a, e = d;
                        return b.replace(/([^\.])+/g, function (a, b, d, f) {
                            var g = a.match(/([^\[0-9]+){1}(\[)([0-9+])/),
                                    h = d + a.length >= f.length,
                                    i = function () {
                                        return e[g[1]] || function () {
                                            return e[g[1]] = [], e[g[1]]
                                        }()
                                    };
                            if (h)
                                g ? i()[g[3]] = c : e[a] = c;
                            else if (g) {
                                var j = i();
                                e = j[g[3]] || function () {
                                    return j[g[3]] = {}, j[g[3]]
                                }()
                            } else
                                e = e[a] || function () {
                                    return e[a] = {}, e[a]
                                }()
                        }), a
                    }
                },
                functionChain: function (a, b, c) {
                    for (var d = 0; d < c.length; d++) {
                        var e = c[d][0][c[d][1]].apply(c[d][0], c[d][2]);
                        if (e === b)
                            return e
                    }
                    return a
                },
                populate: function (b, d) {
                    var e = function (a) {
                        var b = a.match(/(\${.*?})/g);
                        if (null != b)
                            for (var c = 0; c < b.length; c++) {
                                var e = d[b[c].substring(2, b[c].length - 1)] || "";
                                null != e && (a = a.replace(b[c], e))
                            }
                        return a
                    }, g = function (b) {
                        if (null != b) {
                            if (c(b))
                                return e(b);
                            if (a(b)) {
                                for (var d = [], h = 0; h < b.length; h++)
                                    d.push(g(b[h]));
                                return d
                            }
                            if (f(b)) {
                                var i = {};
                                for (var j in b)
                                    i[j] = g(b[j]);
                                return i
                            }
                            return b
                        }
                    };
                    return g(b)
                },
                convertStyle: function (a, b) {
                    if ("transparent" === a)
                        return a;
                    var c = a, d = function (a) {
                        return 1 == a.length ? "0" + a : a
                    }, e = function (a) {
                        return d(Number(a).toString(16))
                    }, f = /(rgb[a]?\()(.*)(\))/;
                    if (a.match(f)) {
                        var g = a.match(f)[2].split(",");
                        c = "#" + e(g[0]) + e(g[1]) + e(g[2]),
                                b || 4 != g.length || (c += e(g[3]))
                    }
                    return c
                },
                findWithFunction: function (a, b) {
                    if (a)
                        for (var c = 0; c < a.length; c++)
                            if (b(a[c]))
                                return c;
                    return -1
                },
                indexOf: function (a, b) {
                    return a.indexOf ? a.indexOf(b) : k.findWithFunction(a, function (a) {
                        return a == b
                    })
                },
                removeWithFunction: function (a, b) {
                    var c = k.findWithFunction(a, b);
                    return c > -1 && a.splice(c, 1), -1 != c
                },
                remove: function (a, b) {
                    var c = k.indexOf(a, b);
                    return c > -1 && a.splice(c, 1), -1 != c
                },
                addWithFunction: function (a, b, c) {
                    -1 == k.findWithFunction(a, c) && a.push(b)
                },
                addToList: function (a, b, c, d) {
                    var e = a[b];
                    return null == e && (e = [], a[b] = e), e[d ? "unshift" : "push"](c), e
                },
                extend: function (b, c) {
                    var d;
                    for (c = a(c)?c:[c], d = 0; d < c.length; d++)
                        for (var e in c[d].prototype)
                            c[d].prototype.hasOwnProperty(e) && (b.prototype[e] = c[d].prototype[e]);
                    var f = function (a, b) {
                        return function () {
                            for (d = 0; d < c.length; d++)
                                c[d].prototype[a] && c[d].prototype[a].apply(this, arguments);
                            return b.apply(this, arguments)
                        }
                    }, g = function (a) {
                        for (var c in a)
                            b.prototype[c] = f(c, a[c])
                    };
                    if (arguments.length > 2)
                        for (d = 2; d < arguments.length; d++)
                            g(arguments[d]);
                    return b
                },
                uuid: function () {
                    return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (a) {
                        var b = 0 | 16 * Math.random(), c = "x" == a ? b : 8 | 3 & b;
                        return c.toString(16)
                    })
                },
                logEnabled: !0, log: function () {
                    if (k.logEnabled && "undefined" != typeof console)
                        try {
                            var a = arguments[arguments.length - 1];
                            console.log(a)
                        } catch (b) {
                        }
                },
                wrap: function (a, b, c) {
                    return a = a || function () {
                    },
                            b = b || function () {
                            },
                            function () {
                                var d = null;
                                try {
                                    d = b.apply(this, arguments)
                                } catch (e) {
                                    k.log("jsPlumb function failed : " + e)
                                }
                                if (null == c || d !== c)
                                    try {
                                        d = a.apply(this, arguments)
                                    } catch (e) {
                                        k.log("wrapped function failed : " + e)
                                    }
                                return d
                            }
                }};
    k.EventGenerator = function () {
        var a = {},
                b = !1,
                c = {ready: !0};
        this.bind = function (b, c, d) {
            return k.addToList(a, b, c, d), this
        },
                this.fire = function (d, e, f) {
                    if (!b && a[d]) {
                        var g = a[d].length, h = 0, i = !1, j = null;
                        if (!this.shouldFireEvent || this.shouldFireEvent(d, e, f))
                            for (; !i && g > h && j !== !1; ) {
                                if (c[d])
                                    a[d][h].apply(this, [e, f]);
                                else
                                    try {
                                        j = a[d][h].apply(this, [e, f])
                                    } catch (l) {
                                        k.log("jsPlumb: fire failed for event " + d + " : " + l)
                                    }
                                h++, (null == a || null == a[d]) && (i = !0)
                            }
                    }
                    return this
                },
                this.unbind = function (b) {
                    return b ? delete a[b] : a = {}, this
                },
                this.getListener = function (b) {
                    return a[b]
                },
                this.setSuspendEvents = function (a) {
                    b = a
                },
                this.isSuspendEvents = function () {
                    return b
                },
                this.cleanupListeners = function () {
                    for (var b in a)
                        a[b] = null
                }
    }, k.EventGenerator.prototype = {cleanup: function () {
            this.cleanupListeners()
        }},
    Function.prototype.bind || (Function.prototype.bind = function (a) {
        if ("function" != typeof this)
            throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var b = Array.prototype.slice.call(arguments, 1),
                c = this,
                d = function () {
                },
                e = function () {
                    return c.apply(this instanceof d && a ? this : a, b.concat(Array.prototype.slice.call(arguments)))
                };
        return d.prototype = this.prototype, e.prototype = new d, e
    })
}.call(this),
        function () {
            "use strict";
            var a = this,
                    b = a.jsPlumbUtil;
            b.ieVersion = /MSIE\s([\d.]+)/.test(navigator.userAgent) ? new Number(RegExp.$1) : -1,
                    b.oldIE = b.ieVersion > -1 && b.ieVersion < 9,
                    b.matchesSelector = function (a, b, c) {
                        c = c || a.parentNode;
                        for (var d = c.querySelectorAll(b), e = 0; e < d.length; e++)
                            if (d[e] === a)
                                return!0;
                        return!1
                    },
                    b.consume = function (a, b) {
                        a.stopPropagation ? a.stopPropagation() : a.returnValue = !1,
                                !b && a.preventDefault && a.preventDefault()
                    },
                    b.sizeElement = function (a, b, c, d, e) {
                        a && (a.style.height = e + "px",
                                a.height = e,
                                a.style.width = d + "px",
                                a.width = d,
                                a.style.left = b + "px",
                                a.style.top = c + "px")
                    }
        }.call(this), function () {
    var a = this,
            b = !!window.SVGAngle || document.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1"),
            c = function () {
                if (void 0 === c.vml) {
                    var a = document.body.appendChild(document.createElement("div"));
                    a.innerHTML = '<v:shape id="vml_flag1" adj="1" />';
                    var b = a.firstChild;
                    null != b && null != b.style ? (b.style.behavior = "url(#default#VML)",
                            c.vml = b ? "object" == typeof b.adj : !0) : c.vml = !1,
                            a.parentNode.removeChild(a)
                }
                return c.vml
            },
            d = function () {
                var a = -1;
                if ("Microsoft Internet Explorer" == navigator.appName) {
                    var b = navigator.userAgent,
                            c = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
                    null != c.exec(b) && (a = parseFloat(RegExp.$1))
                }
                return a
            }(),
            e = d > -1 && 9 > d, f = function (a, b) {
                if (null == a)
                    return[0, 0];
                var c = k(a), d = j(c, 0);
                return[d[b + "X"],
                    d[b + "Y"]]
            },
            g = function (a) {
                return null == a ? [0, 0] : e ? [a.clientX + document.documentElement.scrollLeft, a.clientY + document.documentElement.scrollTop] : f(a, "page")
            },
            h = function (a) {
                return f(a, "screen")
            },
            i = function (a) {
                return f(a, "client")
            },
            j = function (a, b) {
                return a.item ? a.item(b) : a[b]
            },
            k = function (a) {
                return a.touches && a.touches.length > 0 ? a.touches : a.changedTouches && a.changedTouches.length > 0 ? a.changedTouches : a.targetTouches && a.targetTouches.length > 0 ? a.targetTouches : [a]
            },
            l = function (a) {
                var b = {},
                        c = [],
                        d = {},
                        e = {},
                        f = {};
                this.register = function (g) {
                    var h = a.getId(g),
                            i = jsPlumbAdapter.getOffset(g, a);
                    b[h] || (b[h] = g,
                            c.push(g), d[h] = {});
                    var j = function (b) {
                        if (b)
                            for (var c = 0; c < b.childNodes.length; c++)
                                if (3 != b.childNodes[c].nodeType && 8 != b.childNodes[c].nodeType) {
                                    var g = jsPlumb.getElementObject(b.childNodes[c]),
                                            k = a.getId(b.childNodes[c],
                                                    null, !0);
                                    if (k && e[k] && e[k] > 0) {
                                        var l = jsPlumbAdapter.getOffset(g, a);
                                        d[h][k] = {
                                            id: k, offset: {left: l.left - i.left, top: l.top - i.top
                                            }
                                        },
                                        f[k] = h
                                    }
                                    j(b.childNodes[c])
                                }
                    };
                    j(g)
                },
                        this.updateOffsets = function (b) {
                            if (null != b) {
                                var c = jsPlumb.getDOMElement(b),
                                        e = a.getId(c),
                                        g = d[e],
                                        h = jsPlumbAdapter.getOffset(c, a);
                                if (g)
                                    for (var i in g) {
                                        var j = jsPlumb.getElementObject(i),
                                                k = jsPlumbAdapter.getOffset(j, a);
                                        d[e][i] = {
                                            id: i, offset: {
                                                left: k.left - h.left, top: k.top - h.top}}, f[i] = e
                                    }
                            }
                        },
                        this.endpointAdded = function (c, g) {
                            g = g || a.getId(c);
                            var h = document.body, i = c.parentNode;
                            for (e[g] = e[g] ? e[g] + 1 : 1; null != i && i != h; ) {
                                var j = a.getId(i, null, !0);
                                if (j && b[j]) {
                                    var k = jsPlumbAdapter.getOffset(i, a);
                                    if (null == d[j][g]) {
                                        var l = jsPlumbAdapter.getOffset(c, a);
                                        d[j][g] = {
                                            id: g, offset: {
                                                left: l.left - k.left, top: l.top - k.top
                                            }
                                        }, f[g] = j
                                    }
                                    break
                                }
                                i = i.parentNode
                            }
                        },
                        this.endpointDeleted = function (a) {
                            if (e[a.elementId] && (e[a.elementId]--, e[a.elementId] <= 0))
                                for (var b in d)
                                    d[b] && (delete d[b][a.elementId], delete f[a.elementId])
                        },
                        this.changeId = function (a, b) {
                            d[b] = d[a], d[a] = {},
                                    f[b] = f[a], f[a] = null
                        },
                        this.getElementsForDraggable = function (a) {
                            return d[a]
                        },
                        this.elementRemoved = function (a) {
                            var b = f[a];
                            b && (delete d[b][a],
                                    delete f[a])
                        },
                        this.reset = function () {
                            b = {},
                                    c = [],
                                    d = {},
                                    e = {}
                        },
                        this.dragEnded = function (b) {
                            var c = a.getId(b), d = f[c];
                            d && this.updateOffsets(d)
                        },
                        this.setParent = function (b, c, e, g) {
                            var h = f[c];
                            if (h) {
                                d[g] || (d[g] = {}), d[g][c] = d[h][c], delete d[h][c];
                                var i = jsPlumbAdapter.getOffset(e, a), j = jsPlumbAdapter.getOffset(b, a);
                                d[g][c].offset = {left: j.left - i.left, top: j.top - i.top}, f[c] = g
                            }
                        },
                        this.getDragAncestor = function (b) {
                            var c = jsPlumb.getDOMElement(b), d = a.getId(c),
                                    e = f[d];
                            return e ? jsPlumb.getDOMElement(e) : null
                        }
            };
    window.console || (window.console = {time: function () {
        }, timeEnd: function () {
        }, group: function () {
        }, groupEnd: function () {
        }, log: function () {
        }});
    var m = function (a) {
        return null == a ? null : a.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
    }, n = function (a, b) {
        b = m(b), "undefined" != typeof a.className.baseVal ? a.className.baseVal = b : a.className = b
    }, o = function (a) {
        return"undefined" == typeof a.className.baseVal ? a.className : a.className.baseVal
    }, p = function (a, b, c) {
        b = null == b ? [] : jsPlumbUtil.isArray(b) ? b : b.split(/\s+/), c = null == c ? [] : jsPlumbUtil.isArray(c) ? c : c.split(/\s+/);
        var d = o(a), e = d.split(/\s+/), f = function (a, b) {
            for (var c = 0; c < b.length; c++)
                if (a)
                    -1 == jsPlumbUtil.indexOf(e, b[c]) && e.push(b[c]);
                else {
                    var d = jsPlumbUtil.indexOf(e, b[c]);
                    -1 != d && e.splice(d, 1)
                }
        };
        f(!0, b), f(!1, c), n(a, e.join(" "))
    }, q = function (a, b) {
        if (null != a)
            if ("string" == typeof a)
                b(jsPlumb.getDOMElement(a));
            else if (null != a.length)
                for (var c = 0; c < a.length; c++)
                    b(jsPlumb.getDOMElement(a[c]));
            else
                b(a)
    };
    window.jsPlumbAdapter = {headless: !1, pageLocation: g, screenLocation: h, clientLocation: i, getAttribute: function (a, b) {
            return a.getAttribute(b)
        }, setAttribute: function (a, b, c) {
            a.setAttribute(b, c)
        },
        appendToRoot: function (a) {
            document.body.appendChild(a)
        },
        getRenderModes: function () {
            return["svg", "vml"]
        }, isRenderModeAvailable: function (a) {
            return{
                svg: b, vml: c()
            }[a]
        },
        getDragManager: function (a) {
            return new l(a)
        },
        setRenderMode: function (a) {
            var b;
            if (a) {
                a = a.toLowerCase();
                var c = this.isRenderModeAvailable("svg"),
                        d = this.isRenderModeAvailable("vml");
                "svg" === a ? c ? b = "svg" : d && (b = "vml") : d && (b = "vml")
            }
            return b
        },
        addClass: function (a, b) {
            q(a, function (a) {
                p(a, b)
            })
        },
        hasClass: function (a, b) {
            return a = jsPlumb.getDOMElement(a), a.classList ? a.classList.contains(b) : -1 != o(a).indexOf(b)
        },
        removeClass: function (a, b) {
            q(a, function (a) {
                p(a, null, b)
            })
        },
        updateClasses: function (a, b, c) {
            q(a, function (a) {
                p(a, b, c)
            })
        },
        setClass: function (a, b) {
            q(a, function (a) {
                n(a, b)
            })
        },
        setPosition: function (a, b) {
            a.style.left = b.left + "px", a.style.top = b.top + "px"
        },
        getPosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                return c ? c.substring(0, c.length - 2) : 0
            };
            return{left: b("left"), top: b("top")
            }
        },
        getOffset: function (a, b, c) {
            a = jsPlumb.getDOMElement(a);
            for (var d = b.getContainer(),
                    e = a.offsetLeft,
                    f = a.offsetTop, g = c || null != d && a.offsetParent != d ? a.offsetParent : null;
                    null != g;
                    )
                e += g.offsetLeft,
                        f += g.offsetTop,
                        g = c ? g.offsetParent : g.offsetParent == d ? null : g.offsetParent;
            return{
                left: e, top: f
            }
        },
        getPositionOnElement: function (a, b, c) {
            var d = "undefined" != typeof b.getBoundingClientRect ? b.getBoundingClientRect() : {
                left: 0, top: 0, width: 0, height: 0
            },
            e = document.body, f = document.documentElement,
                    g = (b.offsetParent, window.pageYOffset || f.scrollTop || e.scrollTop),
                    h = window.pageXOffset || f.scrollLeft || e.scrollLeft,
                    i = f.clientTop || e.clientTop || 0, j = f.clientLeft || e.clientLeft || 0, k = 0, l = 0, m = d.top + g - i + k * c, n = d.left + h - j + l * c, o = jsPlumbAdapter.pageLocation(a), p = d.width || b.offsetWidth * c, q = d.height || b.offsetHeight * c, r = (o[0] - n) / p, s = (o[1] - m) / q;
            return[r, s]
        }, getAbsolutePosition: function (a) {
            var b = function (b) {
                var c = a.style[b];
                return c ? parseFloat(c.substring(0, c.length - 2)) : void 0
            };
            return[b("left"), b("top")]
        }, setAbsolutePosition: function (b, c, d, e) {
            d ? a.jsPlumb.animate(b, {left: "+=" + (c[0] - d[0]), top: "+=" + (c[1] - d[1])}, e) : (b.style.left = c[0] + "px", b.style.top = c[1] + "px")
        }}
}.call(this), function () {
    "use strict";
    var a = jsPlumbUtil, b = function (a, b, c) {
        return jsPlumbAdapter.getOffset(a, b, c)
    }, c = function () {
        return"" + (new Date).getTime()
    }, d = function (a) {
        if (a._jsPlumb.paintStyle && a._jsPlumb.hoverPaintStyle) {
            var b = {};
            t.extend(b, a._jsPlumb.paintStyle), t.extend(b, a._jsPlumb.hoverPaintStyle), delete a._jsPlumb.hoverPaintStyle, b.gradient && a._jsPlumb.paintStyle.fillStyle && delete b.gradient, a._jsPlumb.hoverPaintStyle = b
        }
    }, e = ["click", "dblclick", "mouseover", "mouseout", "mousemove", "mousedown", "mouseup", "contextmenu"], f = function (a, b, c, d) {
        var e = a.getAttachedElements();
        if (e)
            for (var f = 0, g = e.length; g > f; f++)
                d && d == e[f] || e[f].setHover(b, !0, c)
    }, g = function (a) {
        return null == a ? null : a.split(" ")
    }, h = function (b, c, d) {
        if (b.getDefaultType) {
            for (var e = b.getTypeDescriptor(), f = a.merge({}, b.getDefaultType()), g = 0, h = b._jsPlumb.types.length; h > g; g++)
                f = a.merge(f, b._jsPlumb.instance.getType(b._jsPlumb.types[g], e), ["cssClass"]);
            c && (f = a.populate(f, c)), b.applyType(f, d), d || b.repaint()
        }
    }, i = window.jsPlumbUIComponent = function (b) {
        jsPlumbUtil.EventGenerator.apply(this, arguments);
        var c = this, d = arguments, e = c.idPrefix, f = e + (new Date).getTime();
        if (this._jsPlumb = {instance: b._jsPlumb, parameters: b.parameters || {}, paintStyle: null, hoverPaintStyle: null, paintStyleInUse: null, hover: !1, beforeDetach: b.beforeDetach, beforeDrop: b.beforeDrop, overlayPlacements: [], hoverClass: b.hoverClass || b._jsPlumb.Defaults.HoverClass, types: []}, this.getId = function () {
            return f
        }, b.events)
            for (var g in b.events)
                c.bind(g, b.events[g]);
        this.clone = function () {
            var a = {};
            return this.constructor.apply(a, d), a
        }.bind(this), this.isDetachAllowed = function (b) {
            var c = !0;
            if (this._jsPlumb.beforeDetach)
                try {
                    c = this._jsPlumb.beforeDetach(b)
                } catch (d) {
                    a.log("jsPlumb: beforeDetach callback failed", d)
                }
            return c
        }, this.isDropAllowed = function (b, c, d, e, f, g, h) {
            var i = this._jsPlumb.instance.checkCondition("beforeDrop", {sourceId: b, targetId: c, scope: d, connection: e, dropEndpoint: f, source: g, target: h});
            if (this._jsPlumb.beforeDrop)
                try {
                    i = this._jsPlumb.beforeDrop({sourceId: b, targetId: c, scope: d, connection: e, dropEndpoint: f, source: g, target: h})
                } catch (j) {
                    a.log("jsPlumb: beforeDrop callback failed", j)
                }
            return i
        };
        var h = [];
        this.setListenerComponent = function (a) {
            for (var b = 0; b < h.length; b++)
                h[b][3] = a
        }
    }, j = function (a, b) {
        var c = a._jsPlumb.types[b], d = a._jsPlumb.instance.getType(c, a.getTypeDescriptor());
        null != d && d.cssClass && a.canvas && a._jsPlumb.instance.removeClass(a.canvas, d.cssClass)
    };
    jsPlumbUtil.extend(i, jsPlumbUtil.EventGenerator, {getParameter: function (a) {
            return this._jsPlumb.parameters[a]
        }, setParameter: function (a, b) {
            this._jsPlumb.parameters[a] = b
        }, getParameters: function () {
            return this._jsPlumb.parameters
        }, setParameters: function (a) {
            this._jsPlumb.parameters = a
        }, addClass: function (a) {
            jsPlumbAdapter.addClass(this.canvas, a)
        }, removeClass: function (a) {
            jsPlumbAdapter.removeClass(this.canvas, a)
        }, updateClasses: function (a, b) {
            jsPlumbAdapter.updateClasses(this.canvas, a, b)
        }, setType: function (a, b, c) {
            this.clearTypes(), this._jsPlumb.types = g(a) || [], h(this, b, c)
        }, getType: function () {
            return this._jsPlumb.types
        }, reapplyTypes: function (a, b) {
            h(this, a, b)
        }, hasType: function (a) {
            return -1 != jsPlumbUtil.indexOf(this._jsPlumb.types, a)
        }, addType: function (a, b, c) {
            var d = g(a), e = !1;
            if (null != d) {
                for (var f = 0, i = d.length; i > f; f++)
                    this.hasType(d[f]) || (this._jsPlumb.types.push(d[f]), e = !0);
                e && h(this, b, c)
            }
        }, removeType: function (b, c) {
            var d = g(b), e = !1, f = function (b) {
                var c = a.indexOf(this._jsPlumb.types, b);
                return -1 != c ? (j(this, c), this._jsPlumb.types.splice(c, 1), !0) : !1
            }.bind(this);
            if (null != d) {
                for (var i = 0, k = d.length; k > i; i++)
                    e = f(d[i]) || e;
                e && h(this, null, c)
            }
        }, clearTypes: function (a) {
            for (var b = this._jsPlumb.types.length, c = 0; b > c; c++)
                j(this, 0), this._jsPlumb.types.splice(0, 1);
            h(this, {}, a)
        }, toggleType: function (a, b, c) {
            var d = g(a);
            if (null != d) {
                for (var e = 0, f = d.length; f > e; e++) {
                    var i = jsPlumbUtil.indexOf(this._jsPlumb.types, d[e]);
                    -1 != i ? (j(this, i), this._jsPlumb.types.splice(i, 1)) : this._jsPlumb.types.push(d[e])
                }
                h(this, b, c)
            }
        }, applyType: function (a, b) {
            if (this.setPaintStyle(a.paintStyle, b), this.setHoverPaintStyle(a.hoverPaintStyle, b), a.parameters)
                for (var c in a.parameters)
                    this.setParameter(c, a.parameters[c])
        }, setPaintStyle: function (a, b) {
            this._jsPlumb.paintStyle = a, this._jsPlumb.paintStyleInUse = this._jsPlumb.paintStyle, d(this), b || this.repaint()
        }, getPaintStyle: function () {
            return this._jsPlumb.paintStyle
        }, setHoverPaintStyle: function (a, b) {
            this._jsPlumb.hoverPaintStyle = a, d(this), b || this.repaint()
        }, getHoverPaintStyle: function () {
            return this._jsPlumb.hoverPaintStyle
        }, destroy: function () {
            this.cleanupListeners(), this.clone = null, this._jsPlumb = null
        }, isHover: function () {
            return this._jsPlumb.hover
        }, setHover: function (a, b, d) {
            if (this._jsPlumb && !this._jsPlumb.instance.currentlyDragging && !this._jsPlumb.instance.isHoverSuspended()) {
                if (this._jsPlumb.hover = a, null != this.canvas) {
                    if (null != this._jsPlumb.instance.hoverClass) {
                        var e = a ? "addClass" : "removeClass";
                        this._jsPlumb.instance[e](this.canvas, this._jsPlumb.instance.hoverClass)
                    }
                    null != this._jsPlumb.hoverClass && this._jsPlumb.instance[e](this.canvas, this._jsPlumb.hoverClass)
                }
                null != this._jsPlumb.hoverPaintStyle && (this._jsPlumb.paintStyleInUse = a ? this._jsPlumb.hoverPaintStyle : this._jsPlumb.paintStyle, this._jsPlumb.instance.isSuspendDrawing() || (d = d || c(), this.repaint({timestamp: d, recalc: !1}))), this.getAttachedElements && !b && f(this, a, c(), this)
            }
        }});
    var k = "__label", l = function (a, b) {
        for (var c = -1, d = 0, e = a._jsPlumb.overlays.length; e > d; d++)
            if (b === a._jsPlumb.overlays[d].id) {
                c = d;
                break
            }
        return c
    }, m = function (a, b) {
        var c = {cssClass: b.cssClass, labelStyle: a.labelStyle, id: k, component: a, _jsPlumb: a._jsPlumb.instance}, d = t.extend(c, b);
        return new (t.Overlays[a._jsPlumb.instance.getRenderMode()].Label)(d)
    }, n = function (b, c) {
        var d = null;
        if (a.isArray(c)) {
            var e = c[0], f = t.extend({component: b, _jsPlumb: b._jsPlumb.instance}, c[1]);
            3 == c.length && t.extend(f, c[2]), d = new (t.Overlays[b._jsPlumb.instance.getRenderMode()][e])(f)
        } else
            d = c.constructor == String ? new (t.Overlays[b._jsPlumb.instance.getRenderMode()][c])({component: b, _jsPlumb: b._jsPlumb.instance}) : c;
        b._jsPlumb.overlays.push(d)
    }, o = function (a, b) {
        var c = a.defaultOverlayKeys || [], d = b.overlays, e = function (b) {
            return a._jsPlumb.instance.Defaults[b] || t.Defaults[b] || []
        };
        d || (d = []);
        for (var f = 0, g = c.length; g > f; f++)
            d.unshift.apply(d, e(c[f]));
        return d
    }, p = window.OverlayCapableJsPlumbUIComponent = function (a) {
        i.apply(this, arguments), this._jsPlumb.overlays = [];
        var b = o(this, a);
        if (b)
            for (var c = 0, d = b.length; d > c; c++)
                n(this, b[c]);
        if (a.label) {
            var e = a.labelLocation || this.defaultLabelLocation || .5, f = a.labelStyle || this._jsPlumb.instance.Defaults.LabelStyle;
            this._jsPlumb.overlays.push(m(this, {label: a.label, location: e, labelStyle: f}))
        }
        this.setListenerComponent = function (a) {
            if (this._jsPlumb)
                for (var b = 0; b < this._jsPlumb.overlays.length; b++)
                    this._jsPlumb.overlays[b].setListenerComponent(a)
        }
    };
    jsPlumbUtil.extend(p, i, {applyType: function (a, b) {
            if (this.removeAllOverlays(b), a.overlays)
                for (var c = 0, d = a.overlays.length; d > c; c++)
                    this.addOverlay(a.overlays[c], !0)
        }, setHover: function (a) {
            if (this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged())
                for (var b = 0, c = this._jsPlumb.overlays.length; c > b; b++)
                    this._jsPlumb.overlays[b][a ? "addClass" : "removeClass"](this._jsPlumb.instance.hoverClass)
        }, addOverlay: function (a, b) {
            n(this, a), b || this.repaint()
        }, getOverlay: function (a) {
            var b = l(this, a);
            return b >= 0 ? this._jsPlumb.overlays[b] : null
        }, getOverlays: function () {
            return this._jsPlumb.overlays
        }, hideOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.hide()
        }, hideOverlays: function () {
            for (var a = 0, b = this._jsPlumb.overlays.length; b > a; a++)
                this._jsPlumb.overlays[a].hide()
        }, showOverlay: function (a) {
            var b = this.getOverlay(a);
            b && b.show()
        }, showOverlays: function () {
            for (var a = 0, b = this._jsPlumb.overlays.length; b > a; a++)
                this._jsPlumb.overlays[a].show()
        }, removeAllOverlays: function (a) {
            for (var b = 0, c = this._jsPlumb.overlays.length; c > b; b++)
                this._jsPlumb.overlays[b].cleanup && this._jsPlumb.overlays[b].cleanup();
            this._jsPlumb.overlays.splice(0, this._jsPlumb.overlays.length), this._jsPlumb.overlayPositions = null, a || this.repaint()
        }, removeOverlay: function (a) {
            var b = l(this, a);
            if (-1 != b) {
                var c = this._jsPlumb.overlays[b];
                c.cleanup && c.cleanup(), this._jsPlumb.overlays.splice(b, 1), this._jsPlumb.overlayPositions && delete this._jsPlumb.overlayPositions[a]
            }
        }, removeOverlays: function () {
            for (var a = 0, b = arguments.length; b > a; a++)
                this.removeOverlay(arguments[a])
        }, moveParent: function (a) {
            this.bgCanvas && (this.bgCanvas.parentNode.removeChild(this.bgCanvas), a.appendChild(this.bgCanvas)), this.canvas.parentNode.removeChild(this.canvas), a.appendChild(this.canvas);
            for (var b = 0; b < this._jsPlumb.overlays.length; b++)
                this._jsPlumb.overlays[b].isAppendedAtTopLevel && (this._jsPlumb.overlays[b].canvas.parentNode.removeChild(this._jsPlumb.overlays[b].canvas), a.appendChild(this._jsPlumb.overlays[b].canvas))
        }, getLabel: function () {
            var a = this.getOverlay(k);
            return null != a ? a.getLabel() : null
        }, getLabelOverlay: function () {
            return this.getOverlay(k)
        }, setLabel: function (a) {
            var b = this.getOverlay(k);
            if (b)
                a.constructor == String || a.constructor == Function ? b.setLabel(a) : (a.label && b.setLabel(a.label), a.location && b.setLocation(a.location));
            else {
                var c = a.constructor == String || a.constructor == Function ? {label: a} : a;
                b = m(this, c), this._jsPlumb.overlays.push(b)
            }
            this._jsPlumb.instance.isSuspendDrawing() || this.repaint()
        }, cleanup: function () {
            for (var a = 0; a < this._jsPlumb.overlays.length; a++)
                this._jsPlumb.overlays[a].cleanup(), this._jsPlumb.overlays[a].destroy();
            this._jsPlumb.overlays.length = 0, this._jsPlumb.overlayPositions = null
        }, setVisible: function (a) {
            this[a ? "showOverlays" : "hideOverlays"]()
        }, setAbsoluteOverlayPosition: function (a, b) {
            this._jsPlumb.overlayPositions = this._jsPlumb.overlayPositions || {}, this._jsPlumb.overlayPositions[a.id] = b
        }, getAbsoluteOverlayPosition: function (a) {
            return this._jsPlumb.overlayPositions ? this._jsPlumb.overlayPositions[a.id] : null
        }});
    var q = 0, r = function () {
        var a = q + 1;
        return q++, a
    }, s = window.jsPlumbInstance = function (d) {
        this.Defaults = {Anchor: "Bottom", Anchors: [null, null], ConnectionsDetachable: !0, ConnectionOverlays: [], Connector: "Bezier", Container: null, DoNotThrowErrors: !1, DragOptions: {}, DropOptions: {}, Endpoint: "Dot", EndpointOverlays: [], Endpoints: [null, null], EndpointStyle: {fillStyle: "#456"}, EndpointStyles: [null, null], EndpointHoverStyle: null, EndpointHoverStyles: [null, null], HoverPaintStyle: null, LabelStyle: {color: "black"}, LogEnabled: !1, Overlays: [], MaxConnections: 1,
            PaintStyle: {
                lineWidth: 4, strokeStyle: "#456"
            },
            ReattachConnections: !1,
            RenderMode: "svg",
            Scope: "jsPlumb_DefaultScope"},
        d && t.extend(this.Defaults, d),
                this.logEnabled = this.Defaults.LogEnabled,
                this._connectionTypes = {},
                this._endpointTypes = {},
                jsPlumbUtil.EventGenerator.apply(this);
        var f = this, g = r(),
                h = f.bind,
                j = {},
                k = 1, l = function (a) {
                    var b = f.getDOMElement(a);
                    return{
                        el: b,
                        id: jsPlumbUtil.isString(a) && null == b ? a : X(b)
                    }
                };
        this.getInstanceIndex = function () {
            return g
        },
                this.setZoom = function (a, b) {
                    return jsPlumbUtil.oldIE || (k = a, f.fire("zoom", k),
                            b && f.repaintEverything()),
                            !jsPlumbUtil.oldIE
                },
                this.getZoom = function () {
                    return k
                };
        for (var m in this.Defaults)
            j[m] = this.Defaults[m];
        var n;
        this.setContainer = function (a) {
            a = this.getDOMElement(a),
                    this.select().each(function (b) {
                b.moveParent(a)
            }),
                    this.selectEndpoints().each(function (b) {
                b.moveParent(a)
            }), n = a;
            for (var b = function (a, b) {
                var c = b.srcElement || b.target, d = (c && c.parentNode ? c.parentNode._jsPlumb : null) || (c ? c._jsPlumb : null) || (c && c.parentNode && c.parentNode.parentNode ? c.parentNode.parentNode._jsPlumb : null);
                d && (d.fire(a, d, b), f.fire(a, d, b))
            },
                    c = function (a) {
                        f.on(n, a, "._jsPlumb_connector, ._jsPlumb_connector > *",
                                function (c) {
                                    b(a, c)
                                }),
                                f.on(n, a, "._jsPlumb_endpoint, ._jsPlumb_endpoint > *, ._jsPlumb_endpoint svg *",
                                        function (c) {
                                            b(a, c)
                                        }),
                                f.on(n, a, "._jsPlumb_overlay, ._jsPlumb_overlay *",
                                        function (c) {
                                            b(a, c)
                                        })
                    },
                    d = 0; d < e.length; d++)
                c(e[d])
        },
                this.getContainer = function () {
                    return n
                },
                this.bind = function (a, b) {
                    "ready" === a && p ? b() : h.apply(f, [a, b])
                },
                f.importDefaults = function (a) {
                    for (var b in a)
                        f.Defaults[b] = a[b];
                    return a.Container && f.setContainer(a.Container), f
                },
                f.restoreDefaults = function () {
                    return f.Defaults = t.extend({}, j), f
                };
        var o = null, p = !1, q = [], s = {}, u = {}, v = {}, w = {}, x = {}, y = {}, z = !1, A = [], B = !1, C = null, D = this.Defaults.Scope, E = null, F = 1, G = function () {
            return"" + F++
        }, H = function (a, b) {
            n ? n.appendChild(a) : b ? this.getDOMElement(b).appendChild(a) : this.appendToRoot(a)
        }.bind(this), I = function (a, b, d, e) {
            if (!jsPlumbAdapter.headless && !B) {
                var g = X(a), h = f.dragManager.getElementsForDraggable(g);
                null == d && (d = c());
                var i = tb({elId: g, offset: b, recalc: !1, timestamp: d});
                if (h)
                    for (var j in h)
                        tb({elId: h[j].id, offset: {left: i.o.left + h[j].offset.left, top: i.o.top + h[j].offset.top}, recalc: !1, timestamp: d});
                if (f.anchorManager.redraw(g, b, d, null, e), h)
                    for (var k in h)
                        f.anchorManager.redraw(h[k].id, b, d, h[k].offset, e, !0)
            }
        }, J = function (b, c) {
            var d, e, g, h = null;
            if (a.isArray(b)) {
                h = [];
                for (var i = 0, j = b.length; j > i; i++)
                    d = f.getElementObject(b[i]), g = f.getDOMElement(d), e = f.getAttribute(g, "id"), h.push(c.apply(f, [g, e]))
            } else
                d = f.getDOMElement(b), e = f.getId(d), h = c.apply(f, [d, e]);
            return h
        }, K = function (a) {
            return u[a]
        }, L = function (b, c, d, e) {
            if (!jsPlumbAdapter.headless) {
                var g = null == c ? !1 : c;
                if (g && t.isDragSupported(b, f) && !t.isAlreadyDraggable(b, f)) {
                    var h = d || f.Defaults.DragOptions;
                    h = t.extend({}, h);
                    var i = t.dragEvents.drag, j = t.dragEvents.stop, k = t.dragEvents.start, l = f.getDOMElement(b), m = f.dragManager.getDragAncestor(l), n = {left: 0, top: 0}, o = n, p = !1;
                    rb(e, b), h[k] = a.wrap(h[k], function () {
                        return o = null != m ? jsPlumbAdapter.getOffset(m, f) : n, f.setHoverSuspended(!0), f.select({source: b}).addClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: b}).addClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.setConnectionBeingDragged(!0), h.canDrag ? d.canDrag() : void 0
                    }, !1), h[i] = a.wrap(h[i], function () {
                        var a = f.getUIPosition(arguments, f.getZoom());
                        a.left += o.left, a.top += o.top, I(b, a, null, !0), p && f.addClass(b, "jsPlumb_dragged"), p = !0
                    }), h[j] = a.wrap(h[j], function () {
                        var a = f.getUIPosition(arguments, f.getZoom(), !0);
                        I(b, a), p = !1, f.removeClass(b, "jsPlumb_dragged"), f.setHoverSuspended(!1), f.select({source: b}).removeClass(f.elementDraggingClass + " " + f.sourceElementDraggingClass, !0), f.select({target: b}).removeClass(f.elementDraggingClass + " " + f.targetElementDraggingClass, !0), f.setConnectionBeingDragged(!1), f.dragManager.dragEnded(b)
                    });
                    var q = X(b);
                    y[q] = !0;
                    var r = y[q];
                    h.disabled = null == r ? !1 : !r, f.initDraggable(b, h), f.dragManager.register(b)
                }
            }
        }, M = function (a, b) {
            for (var c = a.scope.split(/\s/), d = b.scope.split(/\s/), e = 0; e < c.length; e++)
                for (var f = 0; f < d.length; f++)
                    if (d[f] == c[e])
                        return!0;
            return!1
        }, N = function (b, c) {
            var d = t.extend({}, b);
            if (c && t.extend(d, c), d.source && (d.source.endpoint ? d.sourceEndpoint = d.source : d.source = f.getDOMElement(d.source)), d.target && (d.target.endpoint ? d.targetEndpoint = d.target : d.target = f.getDOMElement(d.target)), b.uuids && (d.sourceEndpoint = K(b.uuids[0]), d.targetEndpoint = K(b.uuids[1])), d.sourceEndpoint && d.sourceEndpoint.isFull())
                return a.log(f, "could not add connection; source endpoint is full"), void 0;
            if (d.targetEndpoint && d.targetEndpoint.isFull())
                return a.log(f, "could not add connection; target endpoint is full"), void 0;
            if (!d.type && d.sourceEndpoint && (d.type = d.sourceEndpoint.connectionType), d.sourceEndpoint && d.sourceEndpoint.connectorOverlays) {
                d.overlays = d.overlays || [];
                for (var e = 0, g = d.sourceEndpoint.connectorOverlays.length; g > e; e++)
                    d.overlays.push(d.sourceEndpoint.connectorOverlays[e])
            }
            !d["pointer-events"] && d.sourceEndpoint && d.sourceEndpoint.connectorPointerEvents && (d["pointer-events"] = d.sourceEndpoint.connectorPointerEvents);
            var h = function (a, b) {
                var c = t.extend({}, a);
                for (var d in b)
                    b[d] && (c[d] = b[d]);
                return c
            }, i = function (a, b, c) {
                return f.addEndpoint(a, h(b, {anchor: d.anchors ? d.anchors[c] : d.anchor, endpoint: d.endpoints ? d.endpoints[c] : d.endpoint, paintStyle: d.endpointStyles ? d.endpointStyles[c] : d.endpointStyle, hoverPaintStyle: d.endpointHoverStyles ? d.endpointHoverStyles[c] : d.endpointHoverStyle}))
            }, j = function (a, b, c) {
                if (d[a] && !d[a].endpoint && !d[a + "Endpoint"] && !d.newConnection) {
                    var e = X(d[a]), f = c[e];
                    if (f) {
                        if (!f.enabled)
                            return!1;
                        var g = null != f.endpoint && f.endpoint._jsPlumb ? f.endpoint : i(d[a], f.def, b);
                        if (f.uniqueEndpoint && (f.endpoint = g), g.isFull())
                            return!1;
                        d[a + "Endpoint"] = g, g._doNotDeleteOnDetach = !1, g._deleteOnDetach = !0
                    }
                }
            };
            return j("source", 0, this.sourceEndpointDefinitions) !== !1 && j("target", 1, this.targetEndpointDefinitions) !== !1 ? (d.sourceEndpoint && d.targetEndpoint && (M(d.sourceEndpoint, d.targetEndpoint) || (d = null)), d) : void 0
        }.bind(f), O = function (a) {
            var b = f.Defaults.ConnectionType || f.getDefaultConnectionType();
            a._jsPlumb = f, a.newConnection = O, a.newEndpoint = Q, a.endpointsByUUID = u, a.endpointsByElement = s, a.finaliseConnection = P;
            var c = new b(a);
            return c.id = "con_" + G(), c.isDetachable() && (c.endpoints[0].initDraggable(), c.endpoints[1].initDraggable()), c
        }, P = f.finaliseConnection = function (a, b, c, d) {
            if (b = b || {}, a.suspendedEndpoint || q.push(a), a.endpoints[0].isTemporarySource = !1, (null == a.suspendedEndpoint || d) && f.anchorManager.newConnection(a), I(a.source), !b.doNotFireConnectionEvent && b.fireEvent !== !1) {
                var e = {connection: a, source: a.source, target: a.target, sourceId: a.sourceId, targetId: a.targetId, sourceEndpoint: a.endpoints[0], targetEndpoint: a.endpoints[1]};
                f.fire("connection", e, c)
            }
        }, Q = function (a, b) {
            var c = f.Defaults.EndpointType || t.Endpoint, d = t.extend({}, a);
            d._jsPlumb = f, d.newConnection = O, d.newEndpoint = Q, d.endpointsByUUID = u, d.endpointsByElement = s, d.fireDetachEvent = $, d.elementId = b || X(d.source);
            var e = new c(d);
            return e.id = "ep_" + G(), rb(d.elementId, d.source), jsPlumbAdapter.headless || f.dragManager.endpointAdded(d.source, b), e
        }, R = function (a, b, c) {
            var d = s[a];
            if (d && d.length)
                for (var e = 0, f = d.length; f > e; e++) {
                    for (var g = 0, h = d[e].connections.length; h > g; g++) {
                        var i = b(d[e].connections[g]);
                        if (i)
                            return
                    }
                    c && c(d[e])
                }
        }, S = function (a, b) {
            return J(a, function (a, c) {
                y[c] = b, this.isDragSupported(a) && this.setElementDraggable(a, b)
            })
        }, T = function (a, b, c) {
            b = "block" === b;
            var d = null;
            c && (d = b ? function (a) {
                a.setVisible(!0, !0, !0)
            } : function (a) {
                a.setVisible(!1, !0, !0)
            });
            var e = l(a);
            R(e.id, function (a) {
                if (b && c) {
                    var d = a.sourceId === e.id ? 1 : 0;
                    a.endpoints[d].isVisible() && a.setVisible(!0)
                } else
                    a.setVisible(b)
            }, d)
        }, U = function (a) {
            return J(a, function (a, b) {
                var c = null == y[b] ? !1 : y[b];
                return c = !c, y[b] = c, this.setDraggable(a, c), c
            }.bind(this))
        }, V = function (a, b) {
            var c = null;
            b && (c = function (a) {
                var b = a.isVisible();
                a.setVisible(!b)
            }), R(a, function (a) {
                var b = a.isVisible();
                a.setVisible(!b)
            }, c)
        }, W = function (a) {
            var b = w[a];
            return b ? {o: b, s: A[a]} : tb({elId: a})
        }, X = function (a, b, c) {
            if (jsPlumbUtil.isString(a))
                return a;
            if (null == a)
                return null;
            var d = f.getAttribute(a, "id");
            return d && "undefined" !== d || (2 == arguments.length && void 0 !== arguments[1] ? d = b : (1 == arguments.length || 3 == arguments.length && !arguments[2]) && (d = "jsPlumb_" + g + "_" + G()), c || f.setAttribute(a, "id", d)), d
        };
        this.setConnectionBeingDragged = function (a) {
            z = a
        },
                this.isConnectionBeingDragged = function () {
                    return z
                },
                this.connectorClass = "_jsPlumb_connector",
                this.hoverClass = "_jsPlumb_hover",
                this.endpointClass = "_jsPlumb_endpoint",
                this.endpointConnectedClass = "_jsPlumb_endpoint_connected",
                this.endpointFullClass = "_jsPlumb_endpoint_full",
                this.endpointDropAllowedClass = "_jsPlumb_endpoint_drop_allowed",
                this.endpointDropForbiddenClass = "_jsPlumb_endpoint_drop_forbidden",
                this.overlayClass = "_jsPlumb_overlay",
                this.draggingClass = "_jsPlumb_dragging",
                this.elementDraggingClass = "_jsPlumb_element_dragging",
                this.sourceElementDraggingClass = "_jsPlumb_source_element_dragging",
                this.targetElementDraggingClass = "_jsPlumb_target_element_dragging",
                this.endpointAnchorClassPrefix = "_jsPlumb_endpoint_anchor",
                this.hoverSourceClass = "_jsPlumb_source_hover",
                this.hoverTargetClass = "_jsPlumb_target_hover",
                this.dragSelectClass = "_jsPlumb_drag_select",
                this.Anchors = {},
                this.Connectors = {
                    svg: {},
                    vml: {}
                },
        this.Endpoints = {
            svg: {},
            vml: {}
        },
        this.Overlays = {
            svg: {},
            vml: {}
        },
        this.ConnectorRenderers = {},
                this.SVG = "svg",
                this.VML = "vml",
                this.addEndpoint = function (b, c, d) {
                    d = d || {};
                    var e = t.extend({
                    }, d);
                    t.extend(e, c),
                            e.endpoint = e.endpoint || f.Defaults.Endpoint,
                            e.paintStyle = e.paintStyle || f.Defaults.EndpointStyle;
                    for (var g = [], h = a.isArray(b) || null != b.length && !a.isString(b) ? b : [b], i = 0, j = h.length; j > i; i++) {
                        e.source = f.getDOMElement(h[i]),
                                pb(e.source);
                        var k = X(e.source),
                                l = Q(e, k),
                                m = rb(k, e.source).info.o;
                        a.addToList(s, k, l),
                                B || l.paint({
                                    anchorLoc: l.anchor.compute({xy: [m.left, m.top],
                                        wh: A[k],
                                        element: l,
                                        timestamp: C}),
                                    timestamp: C}),
                                g.push(l),
                                l._doNotDeleteOnDetach = !0
                    }
                    return 1 == g.length ? g[0] : g
                },
                this.addEndpoints = function (b, c, d) {
                    for (var e = [], g = 0, h = c.length; h > g; g++) {
                        var i = f.addEndpoint(b, c[g], d);
                        a.isArray(i) ? Array.prototype.push.apply(e, i) : e.push(i)
                    }
                    return e
                },
                this.animate = function (b, c, d) {
                    d = d || {};
                    var e = f.getElementObject(b),
                            g = f.getDOMElement(b),
                            h = X(g),
                            i = t.animEvents.step,
                            j = t.animEvents.complete;
                    d[i] = a.wrap(d[i],
                            function () {
                                f.revalidate(h)
                            }),
                            d[j] = a.wrap(d[j],
                            function () {
                                f.revalidate(h)
                            }),
                            f.doAnimate(e, c, d)
                },
                this.checkCondition = function (b, c) {
                    var d = f.getListener(b),
                            e = !0;
                    if (d && d.length > 0)
                        try {
                            for (var g = 0, h = d.length; h > g; g++)
                                e = e && d[g](c)
                        } catch (i) {
                            a.log(f, "cannot check condition [" + b + "]" + i)
                        }
                    return e
                },
                this.connect = function (a, b) {
                    var c, d = N(a, b);
                    if (d) {
                        if (null == d.source && null == d.sourceEndpoint)
                            return jsPlumbUtil.log("Cannot establish connection - source does not exist"),
                                    void 0;
                        if (null == d.target && null == d.targetEndpoint)
                            return jsPlumbUtil.log("Cannot establish connection - target does not exist"),
                                    void 0;
                        pb(d.source),
                                c = O(d),
                                P(c, d)
                    }
                    return c
                };
        var Y = [
            {
                el: "source",
                elId: "sourceId",
                epDefs: "sourceEndpointDefinitions"},
            {
                el: "target",
                elId: "targetId",
                epDefs: "targetEndpointDefinitions"}],
                Z = function (a, b, c, d) {
                    var e, f, g, h = Y[c],
                            i = a[h.elId],
                            j = (a[h.el],
                                    a.endpoints[c]),
                            k = {index: c,
                                originalSourceId: 0 === c ? i : a.sourceId,
                                newSourceId: a.sourceId,
                                originalTargetId: 1 == c ? i : a.targetId,
                                newTargetId: a.targetId,
                                connection: a
                            };
                    if (b.constructor == t.Endpoint)
                        e = b,
                                e.addConnection(a);
                    else if (f = X(b),
                            g = this[h.epDefs][f],
                            f === a[h.elId])
                        e = null;
                    else if (g) {
                        if (!g.enabled)
                            return;
                        e = null != g.endpoint && g.endpoint._jsPlumb ? g.endpoint : this.addEndpoint(b, g.def),
                                g.uniqueEndpoint && (g.endpoint = e),
                                e._doNotDeleteOnDetach = !1,
                                e._deleteOnDetach = !0,
                                e.addConnection(a)
                    } else
                        e = a.makeEndpoint(0 === c, b, f),
                                e._doNotDeleteOnDetach = !1,
                                e._deleteOnDetach = !0;
                    return null != e && (j.detachFromConnection(a),
                            a.endpoints[c] = e,
                            a[h.el] = e.element,
                            a[h.elId] = e.elementId,
                            k[0 === c ? "newSourceId" : "newTargetId"] = e.elementId, _(k),
                            d || a.repaint()),
                            k
                }.bind(this);
        this.setSource = function (a, b, c) {
            var d = Z(a, b, 0, c);
            this.anchorManager.sourceChanged(d.originalSourceId, d.newSourceId, a)
        },
                this.setTarget = function (a, b, c) {
                    var d = Z(a, b, 1, c);
                    this.anchorManager.updateOtherEndpoint(d.originalSourceId, d.originalTargetId, d.newTargetId, a)
                },
                this.deleteEndpoint = function (a, b) {
                    var c = "string" == typeof a ? u[a] : a;
                    return c && f.deleteObject({endpoint: c, dontUpdateHover: b}), f
                },
                this.deleteEveryEndpoint = function () {
                    var a = f.setSuspendDrawing(!0);
                    for (var b in s) {
                        var c = s[b];
                        if (c && c.length)
                            for (var d = 0, e = c.length; e > d; d++)
                                f.deleteEndpoint(c[d], !0)
                    }
                    return s = {}, v = {}, u = {},
                            f.anchorManager.reset(), f.dragManager.reset(), a || f.setSuspendDrawing(!1), f
                };
        var $ = function (a, b, c) {
            var d = f.Defaults.ConnectionType || f.getDefaultConnectionType(), e = a.constructor == d, g = e ? {
                connection: a,
                source: a.source,
                target: a.target,
                sourceId: a.sourceId,
                targetId: a.targetId,
                sourceEndpoint: a.endpoints[0],
                targetEndpoint: a.endpoints[1]
            } : a;
            b && f.fire("connectionDetached", g, c), f.anchorManager.connectionDetached(g)
        }, _ = f.fireMoveEvent = function (a, b) {
            f.fire("connectionMoved", a, b)
        };
        this.unregisterEndpoint = function (a) {
            a._jsPlumb.uuid && (u[a._jsPlumb.uuid] = null), f.anchorManager.deleteEndpoint(a);
            for (var b in s) {
                var c = s[b];
                if (c) {
                    for (var d = [], e = 0, g = c.length; g > e; e++)
                        c[e] != a && d.push(c[e]);
                    s[b] = d
                }
                s[b].length < 1 && delete s[b]
            }
        },
                this.detach = function () {
                    if (0 !== arguments.length) {
                        var a = f.Defaults.ConnectionType || f.getDefaultConnectionType(),
                                b = arguments[0].constructor == a,
                                c = 2 == arguments.length ? b ? arguments[1] || {
                        } : arguments[0] : arguments[0], d = c.fireEvent !== !1,
                                e = c.forceDetach, g = b ? arguments[0] : c.connection;
                        if (g)
                            (e || jsPlumbUtil.functionChain(!0, !1, [[g.endpoints[0], "isDetachAllowed", [g]], [g.endpoints[1], "isDetachAllowed", [g]], [g, "isDetachAllowed", [g]], [f, "checkCondition", ["beforeDetach", g]]])) && g.endpoints[0].detach(g, !1, !0, d);
                        else {
                            var h = t.extend({}, c);
                            if (h.uuids)
                                K(h.uuids[0]).detachFrom(K(h.uuids[1]), d);
                            else if (h.sourceEndpoint && h.targetEndpoint)
                                h.sourceEndpoint.detachFrom(h.targetEndpoint);
                            else {
                                var i = X(f.getDOMElement(h.source)), j = X(f.getDOMElement(h.target));
                                R(i, function (a) {
                                    (a.sourceId == i && a.targetId == j || a.targetId == i && a.sourceId == j) && f.checkCondition("beforeDetach", a) && a.endpoints[0].detach(a, !1, !0, d)
                                })
                            }
                        }
                    }
                }, this.detachAllConnections = function (a, b) {
            b = b || {}, a = f.getDOMElement(a);
            var c = X(a), d = s[c];
            if (d && d.length)
                for (var e = 0, g = d.length; g > e; e++)
                    d[e].detachAll(b.fireEvent !== !1);
            return f
        }, this.detachEveryConnection = function (a) {
            return a = a || {}, f.doWhileSuspended(function () {
                for (var b in s) {
                    var c = s[b];
                    if (c && c.length)
                        for (var d = 0, e = c.length; e > d; d++)
                            c[d].detachAll(a.fireEvent !== !1)
                }
                q.length = 0
            }), f
        }, this.deleteObject = function (a) {
            var b = {endpoints: {}, connections: {}, endpointCount: 0, connectionCount: 0}, c = a.fireEvent !== !1, d = a.deleteAttachedObjects !== !1, e = function (c) {
                if (null != c && null == b.connections[c.id] && (a.dontUpdateHover || null == c._jsPlumb || c.setHover(!1), b.connections[c.id] = c, b.connectionCount++, d))
                    for (var e = 0; e < c.endpoints.length; e++)
                        c.endpoints[e]._deleteOnDetach && g(c.endpoints[e])
            }, g = function (c) {
                if (null != c && null == b.endpoints[c.id] && (a.dontUpdateHover || null == c._jsPlumb || c.setHover(!1), b.endpoints[c.id] = c, b.endpointCount++, d))
                    for (var f = 0; f < c.connections.length; f++) {
                        var g = c.connections[f];
                        e(g)
                    }
            };
            a.connection ? e(a.connection) : g(a.endpoint);
            for (var h in b.connections) {
                var i = b.connections[h];
                i._jsPlumb && (jsPlumbUtil.removeWithFunction(q, function (a) {
                    return i.id == a.id
                }), $(i, c, a.originalEvent), i.endpoints[0].detachFromConnection(i), i.endpoints[1].detachFromConnection(i), i.cleanup(), i.destroy())
            }
            for (var j in b.endpoints) {
                var k = b.endpoints[j];
                k._jsPlumb && (f.unregisterEndpoint(k), k.cleanup(), k.destroy())
            }
            return b
        }, this.draggable = function (a, b) {
            var c, d, e;
            if ("object" == typeof a && a.length)
                for (c = 0, d = a.length; d > c; c++)
                    e = l(a[c]), e.el && L(e.el, !0, b, e.id);
            else
                e = l(a), e.el && L(e.el, !0, b, e.id);
            return f
        };
        var ab = function (a, b, c, d) {
            for (var e = 0, f = a.length; f > e; e++)
                a[e][b].apply(a[e], c);
            return d(a)
        }, bb = function (a, b, c) {
            for (var d = [], e = 0, f = a.length; f > e; e++)
                d.push([a[e][b].apply(a[e], c), a[e]]);
            return d
        }, cb = function (a, b, c) {
            return function () {
                return ab(a, b, arguments, c)
            }
        }, db = function (a, b) {
            return function () {
                return bb(a, b, arguments)
            }
        }, eb = function (a, b) {
            var c = [];
            if (a)
                if ("string" == typeof a) {
                    if ("*" === a)
                        return a;
                    c.push(a)
                } else if (b)
                    c = a;
                else if (a.length)
                    for (var d = 0, e = a.length; e > d; d++)
                        c.push(l(a[d]).id);
                else
                    c.push(l(a).id);
            return c
        }, fb = function (a, b, c) {
            return"*" === a ? !0 : a.length > 0 ? -1 != jsPlumbUtil.indexOf(a, b) : !c
        };
        this.getConnections = function (a, b) {
            a ? a.constructor == String && (a = {scope: a}) : a = {};
            for (var c = a.scope || f.getDefaultScope(), d = eb(c, !0), e = eb(a.source), g = eb(a.target), h = !b && d.length > 1 ? {} : [], i = function (a, c) {
                if (!b && d.length > 1) {
                    var e = h[a];
                    null == e && (e = h[a] = []), e.push(c)
                } else
                    h.push(c)
            }, j = 0, k = q.length; k > j; j++) {
                var l = q[j];
                fb(d, l.scope) && fb(e, l.sourceId) && fb(g, l.targetId) && i(l.scope, l)
            }
            return h
        };
        var gb = function (a, b) {
            return function (c) {
                for (var d = 0, e = a.length; e > d; d++)
                    c(a[d]);
                return b(a)
            }
        }, hb = function (a) {
            return function (b) {
                return a[b]
            }
        }, ib = function (a, b) {
            var c, d, e = {
                length: a.length,
                each: gb(a, b),
                get: hb(a)},
            f = ["setHover",
                "removeAllOverlays",
                "setLabel",
                "addClass",
                "addOverlay",
                "removeOverlay",
                "removeOverlays",
                "showOverlay",
                "hideOverlay",
                "showOverlays",
                "hideOverlays",
                "setPaintStyle",
                "setHoverPaintStyle",
                "setSuspendEvents",
                "setParameter",
                "setParameters",
                "setVisible",
                "repaint",
                "addType",
                "toggleType",
                "removeType",
                "removeClass",
                "setType",
                "bind",
                "unbind"],
                    g = ["getLabel",
                        "getOverlay", "isHover",
                        "getParameter", "getParameters",
                        "getPaintStyle", "getHoverPaintStyle",
                        "isVisible", "hasType",
                        "getType", "isSuspendEvents"];
            for (c = 0, d = f.length; d > c; c++)
                e[f[c]] = cb(a, f[c], b);
            for (c = 0, d = g.length; d > c; c++)
                e[g[c]] = db(a, g[c]);
            return e
        }, jb = function (a) {
            var b = ib(a, jb);
            return t.extend(b, {
                setDetachable: cb(a, "setDetachable", jb),
                setReattach: cb(a, "setReattach", jb),
                setConnector: cb(a, "setConnector", jb),
                detach: function () {
                    for (var b = 0, c = a.length; c > b; b++)
                        f.detach(a[b])
                },
                isDetachable: db(a, "isDetachable"),
                isReattach: db(a, "isReattach")})
        },
                kb = function (a) {
                    var b = ib(a, kb);
                    return t.extend(b, {
                        setEnabled: cb(a, "setEnabled", kb),
                        setAnchor: cb(a, "setAnchor", kb),
                        isEnabled: db(a, "isEnabled"),
                        detachAll: function () {
                            for (var b = 0, c = a.length; c > b; b++)
                                a[b].detachAll()
                        }, remove: function () {
                            for (var b = 0, c = a.length; c > b; b++)
                                f.deleteObject({
                                    endpoint: a[b]
                                })
                        }
                    })
                };
        this.select = function (a) {
            return a = a || {},
                    a.scope = a.scope || "*",
                    jb(a.connections || f.getConnections(a, !0))
        },
                this.selectEndpoints = function (a) {
                    a = a || {},
                            a.scope = a.scope || "*";
                    var b = !a.element && !a.source && !a.target,
                            c = b ? "*" : eb(a.element),
                            d = b ? "*" : eb(a.source),
                            e = b ? "*" : eb(a.target),
                            f = eb(a.scope, !0),
                            g = [];
                    for (var h in s) {
                        var i = fb(c, h, !0),
                                j = fb(d, h, !0),
                                k = "*" != d,
                                l = fb(e, h, !0),
                                m = "*" != e;
                        if (i || j || l)
                            a:for (var n = 0, o = s[h].length; o > n; n++) {
                                var p = s[h][n];
                                if (fb(f, p.scope, !0)) {
                                    var q = k && d.length > 0 && !p.isSource, r = m && e.length > 0 && !p.isTarget;
                                    if (q || r)
                                        continue a;
                                    g.push(p)
                                }
                            }
                    }
                    return kb(g)
                },
                this.getAllConnections = function () {
                    return q
                },
                this.getDefaultScope = function () {
                    return D
                },
                this.getEndpoint = K,
                this.getEndpoints = function (a) {
                    return s[l(a).id]
                },
                this.getDefaultEndpointType = function () {
                    return t.Endpoint
                },
                this.getDefaultConnectionType = function () {
                    return t.Connection
                },
                this.getId = X,
                this.getOffset = function (a) {
                    return tb({
                        elId: a
                    }).o
                },
                this.appendElement = H;
        var lb = !1;
        this.isHoverSuspended = function () {
            return lb
        },
                this.setHoverSuspended = function (a) {
                    lb = a
                };
        var mb = function (a) {
            return function () {
                return jsPlumbAdapter.isRenderModeAvailable(a)
            }
        };
        this.isSVGAvailable = mb("svg"),
                this.isVMLAvailable = mb("vml"),
                this.hide = function (a, b) {
                    return T(a, "none", b), f
                },
                this.idstamp = G,
                this.connectorsInitialized = !1;
        var nb = [],
                ob = ["svg", "vml"];
        this.registerConnectorType = function (a, b) {
            nb.push([a, b])
        };
        var pb = function (a) {
            if (!n && a) {
                var b = f.getDOMElement(a);
                b.offsetParent && f.setContainer(b.offsetParent)
            }
        },
                qb = function () {
                    f.Defaults.Container && f.setContainer(f.Defaults.Container)
                }, rb = f.manage = function (a, b) {
            return v[a] || (v[a] = {el: b, endpoints: [], connections: []}, v[a].info = tb({elId: a, timestamp: C})),
                    v[a]
        }, sb = function (a) {
            delete v[a]
        },
                tb = this.updateOffset = function (a) {
                    var c, d = a.timestamp, e = a.recalc, g = a.offset, h = a.elId;
                    return B && !d && (d = C),
                            !e && d && d === x[h] ? {o: a.offset || w[h], s: A[h]} : (e || !g && null == w[h] ? (c = v[h] ? v[h].el : null,
                            null != c && (A[h] = f.getSize(c), w[h] = b(c, f), x[h] = d)) : (w[h] = g || w[h], null == A[h] && (c = v[h].el, null != c && (A[h] = f.getSize(c))),
                            x[h] = d), w[h] && !w[h].right && (w[h].right = w[h].left + A[h][0],
                            w[h].bottom = w[h].top + A[h][1], w[h].width = A[h][0], w[h].height = A[h][1],
                            w[h].centerx = w[h].left + w[h].width / 2, w[h].centery = w[h].top + w[h].height / 2),
                            {o: w[h], s: A[h]})
                };
        this.init = function () {
            var a = function (a, b, c) {
                t.Connectors[a][b] = function () {
                    c.apply(this, arguments),
                            t.ConnectorRenderers[a].apply(this, arguments)
                },
                        jsPlumbUtil.extend(t.Connectors[a][b], [c, t.ConnectorRenderers[a]])
            };
            if (!t.connectorsInitialized) {
                for (var b = 0; b < nb.length; b++)
                    for (var c = 0; c < ob.length; c++)
                        a(ob[c],
                                nb[b][1],
                                nb[b][0]);
                t.connectorsInitialized = !0
            }
            p || (qb(),
                    f.anchorManager = new t.AnchorManager({
                        jsPlumbInstance: f
                    }),
                    f.setRenderMode(f.Defaults.RenderMode),
                    p = !0,
                    f.fire("ready", f))
        }.bind(this),
                this.log = o,
                this.jsPlumbUIComponent = i,
                this.makeAnchor = function () {
                    var b, c = function (a, b) {
                        if (t.Anchors[a])
                            return new t.Anchors[a](b);
                        if (!f.Defaults.DoNotThrowErrors)
                            throw{
                                msg: "jsPlumb: unknown anchor type '" + a + "'"
                            }
                    };
                    if (0 === arguments.length)
                        return null;
                    var d = arguments[0], e = arguments[1], g = (arguments[2], null);
                    if (d.compute && d.getOrientation)
                        return d;
                    if ("string" == typeof d)
                        g = c(arguments[0], {elementId: e, jsPlumbInstance: f});
                    else if (a.isArray(d))
                        if (a.isArray(d[0]) || a.isString(d[0]))
                            2 == d.length && a.isObject(d[1]) ? a.isString(d[0]) ? (b = t.extend({elementId: e, jsPlumbInstance: f}, d[1]), g = c(d[0], b)) : (b = t.extend({elementId: e, jsPlumbInstance: f, anchors: d[0]}, d[1]), g = new t.DynamicAnchor(b)) : g = new t.DynamicAnchor({anchors: d, selector: null, elementId: e, jsPlumbInstance: f});
                        else {
                            var h = {x: d[0], y: d[1], orientation: d.length >= 4 ? [d[2], d[3]] : [0, 0], offsets: d.length >= 6 ? [d[4], d[5]] : [0, 0], elementId: e, jsPlumbInstance: f, cssClass: 7 == d.length ? d[6] : null};
                            g = new t.Anchor(h), g.clone = function () {
                                return new t.Anchor(h)
                            }
                        }
                    return g.id || (g.id = "anchor_" + G()), g
                }, this.makeAnchors = function (b, c, d) {
            for (var e = [], g = 0, h = b.length; h > g; g++)
                "string" == typeof b[g] ? e.push(t.Anchors[b[g]]({elementId: c, jsPlumbInstance: d})) : a.isArray(b[g]) && e.push(f.makeAnchor(b[g], c, d));
            return e
        }, this.makeDynamicAnchor = function (a, b) {
            return new t.DynamicAnchor({anchors: a, selector: b, elementId: null, jsPlumbInstance: f})
        }, this.targetEndpointDefinitions = {};
        var ub = function (a, b, c) {
            a.paintStyle = a.paintStyle || c.Defaults.EndpointStyles[b] || c.Defaults.EndpointStyle, a.hoverPaintStyle = a.hoverPaintStyle || c.Defaults.EndpointHoverStyles[b] || c.Defaults.EndpointHoverStyle, a.anchor = a.anchor || c.Defaults.Anchors[b] || c.Defaults.Anchor, a.endpoint = a.endpoint || c.Defaults.Endpoints[b] || c.Defaults.Endpoint
        };
        this.sourceEndpointDefinitions = {};
        var vb = function (a, b, c, d, e) {
            for (var f = a.target || a.srcElement, g = !1, h = d.getSelector(b, c), i = 0; i < h.length; i++)
                if (h[i] == f) {
                    g = !0;
                    break
                }
            return e ? !g : g
        };
        this.makeTarget = function (c, d, e) {
            var g = t.extend({_jsPlumb: this}, e);
            t.extend(g, d), ub(g, 1, this);
            for (var h = g.scope || f.Defaults.Scope, j = (!(g.deleteEndpointsOnDetach === !1), g.maxConnections || -1), k = g.onMaxConnections, m = function (c) {
                var d = l(c), e = d.id, m = new i(g), n = t.extend({}, g.dropOptions || {});
                pb(e);
                var o = {def: g, uniqueEndpoint: g.uniqueEndpoint, maxConnections: j, enabled: !0};
                d.el._jsPlumbTarget = o, this.targetEndpointDefinitions[e] = o;
                var p = g._jsPlumb.EndpointDropHandler({jsPlumb: f, enabled: function () {
                        return d.el._jsPlumbTarget.enabled
                    }, isFull: function (a) {
                        var b = f.select({target: e}).length, c = d.el._jsPlumbTarget, g = c.maxConnections > 0 && b >= c.maxConnections;
                        return g && k && k({element: d.el, connection: jpc}, a), g
                    }, element: d.el, elementId: e, isSource: !1, isTarget: !0, addClass: function (a) {
                        f.addClass(d.el, a)
                    }, removeClass: function (a) {
                        f.removeClass(d.el, a)
                    }, onDrop: function (a) {
                        var b = a.endpoints[0];
                        b.anchor.locked = !1
                    }, isDropAllowed: function () {
                        return m.isDropAllowed.apply(m, arguments)
                    }, getEndpoint: function (a) {
                        var c = f.getElementObject(d.el), e = d.el._jsPlumbTarget, h = e.endpoint;
                        if ((null == h || null == h._jsPlumb) && (h = f.addEndpoint(c, g)), g.uniqueEndpoint && (e.endpoint = h), h._doNotDeleteOnDetach = !1, h._deleteOnDetach = !0, a.isDetachable() && h.initDraggable(), null != h.anchor.positionFinder) {
                            var i = f.getUIPosition(arguments, this.getZoom()), j = b(c, this), k = f.getSize(c), l = h.anchor.positionFinder(i, j, k, h.anchor.constructorParams);
                            h.anchor.x = l[0], h.anchor.y = l[1]
                        }
                        return h
                    }}), q = t.dragEvents.drop;
                n.scope = n.scope || h, n[q] = a.wrap(n[q], p), g.allowLoopback === !1 && (n.canDrop = function (a) {
                    var b = a.getDragElement()._jsPlumbRelatedElement;
                    return b != d.el
                }), this.initDroppable(this.getElementObject(d.el), n, "internal")
            }.bind(this), n = c.length && c.constructor != String ? c : [c], o = 0, p = n.length; p > o; o++)
                m(n[o]);
            return this
        }, this.unmakeTarget = function (a, b) {
            var c = l(a);
            return t.destroyDroppable(c.el), b || delete this.targetEndpointDefinitions[c.id], this
        }, this.makeSource = function (c, d, e) {
            var g = t.extend({}, e);
            t.extend(g, d), ub(g, 0, this);
            for (var h = g.maxConnections || 1, i = g.onMaxConnections, j = function (c) {
                var d = c.id, e = this.getElementObject(c.el), j = this.getDOMElement(e), l = function () {
                    return null == g.parent ? null : "parent" === g.parent ? c.el.parentNode : f.getDOMElement(g.parent)
                }, m = null != g.parent ? this.getId(l()) : d;
                pb(m), this.sourceEndpointDefinitions[m] = {def: g, uniqueEndpoint: g.uniqueEndpoint, maxConnections: h, enabled: !0};
                var o = t.dragEvents.stop, p = t.dragEvents.drag, q = t.extend({}, g.dragOptions || {}), r = q.drag, s = q.stop, u = null, v = !1;
                q.scope = q.scope || g.scope, q[p] = a.wrap(q[p], function () {
                    r && r.apply(this, arguments), v = !1
                }), q[o] = a.wrap(q[o], function () {
                    if (s && s.apply(this, arguments), this.currentlyDragging = !1, null != u._jsPlumb) {
                        var a = g.anchor || this.Defaults.Anchor, c = u.anchor, e = u.connections[0], f = this.makeAnchor(a, d, this), h = u.element;
                        if (null != f.positionFinder) {
                            var i = b(h, this), j = this.getSize(h), k = {left: i.left + c.x * j[0], top: i.top + c.y * j[1]}, m = f.positionFinder(k, i, j, f.constructorParams);
                            f.x = m[0], f.y = m[1]
                        }
                        if (u.setAnchor(f, !0), g.parent) {
                            var o = l();
                            if (o) {
                                var p = g.container || n;
                                u.setElement(o, p)
                            }
                        }
                        u.repaint(), this.repaint(u.elementId), this.repaint(e.targetId)
                    }
                }.bind(this));
                var w = function (a) {
                    var b = this.getOriginalEvent(a);
                    if (3 !== a.which && 2 !== a.button) {
                        var c = this.sourceEndpointDefinitions[m];
                        if (d = this.getId(this.getDOMElement(e)), c.enabled) {
                            if (g.filter) {
                                var n = jsPlumbUtil.isString(g.filter) ? vb(b, e, g.filter, this, g.filterExclude) : g.filter(b, e);
                                if (n === !1)
                                    return
                            }
                            var o = this.select({source: m}).length;
                            if (c.maxConnections >= 0 && c.uniqueEndpoint && o >= c.maxConnections)
                                return i && i({element: e, maxConnections: h}, a), !1;
                            var p = jsPlumbAdapter.getPositionOnElement(b, j, k), r = {};
                            t.extend(r, g), r.isTemporarySource = !0, r.anchor = [p[0], p[1], 0, 0], r.dragOptions = q, u = this.addEndpoint(d, r), v = !0, u.endpointWillMoveTo = g.parent ? l() : null, c.uniqueEndpoint && (c.endpoint ? u.finalEndpoint = c.endpoint : c.endpoint = u), u._doNotDeleteOnDetach = !1, u._deleteOnDetach = !0;
                            var s = function () {
                                f.off(u.canvas, "mouseup", s), f.off(e, "mouseup", s), v && (v = !1, f.deleteEndpoint(u))
                            };
                            f.on(u.canvas, "mouseup", s), f.on(e, "mouseup", s), f.trigger(u.canvas, "mousedown", a), jsPlumbUtil.consume(a)
                        }
                    }
                }.bind(this);
                this.on(e, "mousedown", w), this.sourceEndpointDefinitions[m].trigger = w, g.filter && jsPlumbUtil.isString(g.filter) && f.setDragFilter(e, g.filter)
            }.bind(this), m = c.length && c.constructor != String ? c : [c], o = 0, p = m.length; p > o; o++)
                j(l(m[o]));
            return this
        }, this.unmakeSource = function (a, b) {
            var c = l(a), d = this.sourceEndpointDefinitions[c.id].trigger;
            return d && f.off(c.el, "mousedown", d), b || delete this.sourceEndpointDefinitions[c.id], this
        }, this.unmakeEverySource = function () {
            for (var a in this.sourceEndpointDefinitions)
                f.unmakeSource(a, !0);
            return this.sourceEndpointDefinitions = {}, this
        };
        var wb = function (a, b) {
            b = jsPlumbUtil.isArray(b) ? b : [b];
            for (var c = X(a), d = 0; d < b.length; d++) {
                var e = this[b[d]][c];
                if (e)
                    return e.def.scope || this.Defaults.Scope
            }
        }.bind(this), xb = function (a, b, c) {
            c = jsPlumbUtil.isArray(c) ? c : [c];
            for (var d = X(a), e = 0; e < c.length; e++) {
                var f = this[c[e]][d];
                f && (f.def.scope = b, null != this.scopeChange && this.scopeChange(a, d, s[d], b, c[e]))
            }
        }.bind(this);
        this.getScope = function (a) {
            return wb(a, ["sourceEndpointDefinitions", "targetEndpointDefinitions"])
        }, this.getSourceScope = function (a) {
            return wb(a, "sourceEndpointDefinitions")
        }, this.getTargetScope = function (a) {
            return wb(a, "targetEndpointDefinitions")
        }, this.setScope = function (a, b) {
            xb(a, b, ["sourceEndpointDefinitions", "targetEndpointDefinitions"])
        }, this.setSourceScope = function (a, b) {
            xb(a, b, "sourceEndpointDefinitions")
        }, this.setTargetScope = function (a, b) {
            xb(a, b, "targetEndpointDefinitions")
        }, this.unmakeEveryTarget = function () {
            for (var a in this.targetEndpointDefinitions)
                f.unmakeTarget(a, !0);
            return this.targetEndpointDefinitions = {}, this
        };
        var yb = function (b, c, d, e) {
            var f = "source" == b ? this.sourceEndpointDefinitions : this.targetEndpointDefinitions;
            if (a.isString(c))
                f[c].enabled = e ? !f[c].enabled : d;
            else if (c.length)
                for (var g = 0, h = c.length; h > g; g++) {
                    var i = l(c[g]);
                    f[i.id] && (f[i.id].enabled = e ? !f[i.id].enabled : d)
                }
            else {
                var j = l(c).id;
                f[j].enabled = e ? !f[j].enabled : d
            }
            return this
        }.bind(this), zb = function (b, c) {
            return a.isString(b) || !b.length ? c.apply(this, [b]) : b.length ? c.apply(this, [b[0]]) : void 0
        }.bind(this);
        this.toggleSourceEnabled = function (a) {
            return yb("source", a, null, !0), this.isSourceEnabled(a)
        }, this.setSourceEnabled = function (a, b) {
            return yb("source", a, b)
        }, this.isSource = function (a) {
            return zb(a, function (a) {
                return null != this.sourceEndpointDefinitions[l(a).id]
            }.bind(this))
        }, this.isSourceEnabled = function (a) {
            return zb(a, function (a) {
                var b = this.sourceEndpointDefinitions[l(a).id];
                return b && b.enabled === !0
            }.bind(this))
        }, this.toggleTargetEnabled = function (a) {
            return yb("target", a, null, !0), this.isTargetEnabled(a)
        }, this.isTarget = function (a) {
            return zb(a, function (a) {
                return null != this.targetEndpointDefinitions[l(a).id]
            }.bind(this))
        }, this.isTargetEnabled = function (a) {
            return zb(a, function (a) {
                var b = this.targetEndpointDefinitions[l(a).id];
                return b && b.enabled === !0
            }.bind(this))
        }, this.setTargetEnabled = function (a, b) {
            return yb("target", a, b)
        }, this.ready = function (a) {
            f.bind("ready", a)
        }, this.repaint = function (a, b, c) {
            if ("object" == typeof a && a.length)
                for (var d = 0, e = a.length; e > d; d++)
                    I(a[d], b, c);
            else
                I(a, b, c);
            return f
        }, this.revalidate = function (a) {
            var b = f.getId(a);
            return f.updateOffset({elId: b, recalc: !0}), f.repaint(a)
        }, this.repaintEverything = function (a) {
            var b, d = c();
            for (b in s)
                f.updateOffset({elId: b, recalc: !0, timestamp: d});
            for (b in s)
                I(b, null, d, a);
            return this
        }, this.removeAllEndpoints = function (a, b) {
            var c = function (a) {
                var d, e, g = l(a), h = s[g.id];
                if (h)
                    for (d = 0, e = h.length; e > d; d++)
                        f.deleteEndpoint(h[d]);
                if (delete s[g.id], b && g.el && 3 != g.el.nodeType && 8 != g.el.nodeType)
                    for (d = 0, e = g.el.childNodes.length; e > d; d++)
                        c(g.el.childNodes[d])
            };
            return c(a), this
        }, this.remove = function (a, b) {
            var c = l(a);
            return f.doWhileSuspended(function () {
                f.removeAllEndpoints(c.id, !0), f.dragManager.elementRemoved(c.id), delete f.floatingConnections[c.id], f.anchorManager.clearFor(c.id), f.anchorManager.removeFloatingConnection(c.id)
            }, b === !1), sb(c.id), c.el && (f.removeElement(c.el), c.el._jsPlumb = null), f
        }, this.reset = function () {
            f.setSuspendEvents(!0), f.deleteEveryEndpoint(), f.unbind(), this.targetEndpointDefinitions = {}, this.sourceEndpointDefinitions = {}, q.length = 0, f.setSuspendEvents(!1)
        };
        var Ab = function (a) {
            a.canvas && a.canvas.parentNode && a.canvas.parentNode.removeChild(a.canvas), a.cleanup(), a.destroy()
        }, Bb = function (a) {
            Ab(a)
        };
        this.clear = function () {
            f.select().each(Bb), f.selectEndpoints().each(Bb), s = {}, u = {}
        }, this.setDefaultScope = function (a) {
            return D = a, f
        }, this.setDraggable = S, this.setId = function (a, b, c) {
            var d;
            jsPlumbUtil.isString(a) ? d = a : (a = this.getDOMElement(a), d = this.getId(a));
            var e = this.getConnections({source: d, scope: "*"}, !0), f = this.getConnections({target: d, scope: "*"}, !0);
            b = "" + b, c ? a = this.getDOMElement(b) : (a = this.getDOMElement(d), this.setAttribute(a, "id", b)), s[b] = s[d] || [];
            for (var g = 0, h = s[b].length; h > g; g++)
                s[b][g].setElementId(b), s[b][g].setReferenceElement(a);
            delete s[d], this.anchorManager.changeId(d, b), this.dragManager && this.dragManager.changeId(d, b), v[b] = v[d], delete v[d];
            var i = function (c, d, e) {
                for (var f = 0, g = c.length; g > f; f++)
                    c[f].endpoints[d].setElementId(b), c[f].endpoints[d].setReferenceElement(a),
                            c[f][e + "Id"] = b,
                            c[f][e] = a
            };
            i(e, 0, "source"),
                    i(f, 1, "target"),
                    this.repaint(b)
        },
                this.setDebugLog = function (a) {
                    o = a
                },
                this.setSuspendDrawing = function (a, b) {
                    var c = B;
                    return B = a,
                            C = a ? (new Date).getTime() : null,
                            b && this.repaintEverything(), c
                },
                this.isSuspendDrawing = function () {
                    return B
                }, this.getSuspendedAt = function () {
            return C
        }, this.doWhileSuspended = function (b, c) {
            var d = this.isSuspendDrawing();
            d || this.setSuspendDrawing(!0);
            try {
                b()
            } catch (e) {
                a.log("Function run while suspended failed", e)
            }
            d || this.setSuspendDrawing(!1, !c)
        }, this.getOffset = function (a) {
            return w[a]
        }, this.getCachedData = W, this.timestamp = c, this.setRenderMode = function (a) {
            if (a !== t.SVG && a !== t.VML)
                throw new TypeError("Render mode [" + a + "] not supported");
            return E = jsPlumbAdapter.setRenderMode(a)
        }, this.getRenderMode = function () {
            return E
        }, this.show = function (a, b) {
            return T(a, "block", b), f
        }, this.toggleVisible = V, this.toggleDraggable = U, this.addListener = this.bind, jsPlumbAdapter.headless || (f.dragManager = jsPlumbAdapter.getDragManager(f), f.recalculateOffsets = f.dragManager.updateOffsets)
    };
    jsPlumbUtil.extend(s, jsPlumbUtil.EventGenerator, {setAttribute: function (a, b, c) {
            this.setAttribute(a, b, c)
        }, getAttribute: function (a, b) {
            return this.getAttribute(t.getDOMElement(a), b)
        }, registerConnectionType: function (a, b) {
            this._connectionTypes[a] = t.extend({}, b)
        }, registerConnectionTypes: function (a) {
            for (var b in a)
                this._connectionTypes[b] = t.extend({}, a[b])
        }, registerEndpointType: function (a, b) {
            this._endpointTypes[a] = t.extend({}, b)
        }, registerEndpointTypes: function (a) {
            for (var b in a)
                this._endpointTypes[b] = t.extend({}, a[b])
        }, getType: function (a, b) {
            return"connection" === b ? this._connectionTypes[a] : this._endpointTypes[a]
        }, setIdChanged: function (a, b) {
            this.setId(a, b, !0)
        }, setParent: function (a, b) {
            var c = this.getElementObject(a), d = this.getDOMElement(c), e = this.getId(d), f = this.getElementObject(b), g = this.getDOMElement(f), h = this.getId(g);
            d.parentNode.removeChild(d), g.appendChild(d), this.dragManager.setParent(c, e, f, h)
        }, getSize: function (a) {
            return[a.offsetWidth, a.offsetHeight]
        }, getWidth: function (a) {
            return a.offsetWidth
        }, getHeight: function (a) {
            return a.offsetHeight
        }, extend: function (a, b, c) {
            var d;
            if (c)
                for (d = 0; d < c.length; d++)
                    a[c[d]] = b[c[d]];
            else
                for (d in b)
                    a[d] = b[d];
            return a
        }, floatingConnections: {}, getFloatingAnchorIndex: function (a) {
            return a.endpoints[0].isFloating() ? 0 : 1
        }}, jsPlumbAdapter);
    var t = new s;
    "undefined" != typeof window && (window.jsPlumb = t), t.getInstance = function (a) {
        var b = new s(a);
        return b.init(), b
    }, "function" == typeof define && (define("jsplumb", [], function () {
        return t
    }), define("jsplumbinstance", [], function () {
        return t.getInstance()
    })), "undefined" != typeof exports && (exports.jsPlumb = t)
}(), function () {
    "use strict";
    var a = function (a, b) {
        var c = !1;
        return{drag: function () {
                if (c)
                    return c = !1, !0;
                var d = jsPlumb.getUIPosition(arguments, b.getZoom());
                a.element && (jsPlumbAdapter.setPosition(a.element, d), b.repaint(a.element, d))
            }, stopDrag: function () {
                c = !0
            }}
    }, b = function (a, b) {
        var c = document.createElement("div");
        c.style.position = "absolute";
        var d = b.getContainer() || document.body;
        d.appendChild(c);
        var e = b.getId(c);
        b.manage(e, c), a.id = e, a.element = c
    }, c = function (a, b, c, d, e, f, g, h) {
        var i = new jsPlumb.FloatingAnchor({
            reference: b,
            referenceCanvas: d,
            jsPlumbInstance: f
        });
        return g({
            paintStyle: a,
            endpoint: c,
            anchor: i,
            source: e,
            scope: h
        })
    },
            d = ["connectorStyle",
                "connectorHoverStyle",
                "connectorOverlays",
                "connector",
                "connectionType",
                "connectorClass",
                "connectorHoverClass"],
            e = function (a, b) {
                var c = 0;
                if (null != b)
                    for (var d = 0; d < a.connections.length; d++)
                        if (a.connections[d].sourceId == b || a.connections[d].targetId == b) {
                            c = d;
                            break
                        }
                return a.connections[c]
            },
            f = function (a, b) {
                return jsPlumbUtil.findWithFunction(b.connections, function (b) {
                    return b.id == a.id
                })
            };
    jsPlumb.Endpoint = function (g) {
        var h = g._jsPlumb,
                i = jsPlumb.getElementObject,
                j = jsPlumbUtil,
                k = g.newConnection,
                l = g.newEndpoint;
        g.finaliseConnection,
                g.fireMoveEvent,
                this.idPrefix = "_jsplumb_e_",
                this.defaultLabelLocation = [.5, .5],
                this.defaultOverlayKeys = ["Overlays", "EndpointOverlays"],
                OverlayCapableJsPlumbUIComponent.apply(this, arguments),
                this.getDefaultType = function () {
                    return{parameters: {},
                        scope: null,
                        maxConnections: this._jsPlumb.instance.Defaults.MaxConnections,
                        paintStyle: this._jsPlumb.instance.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                        endpoint: this._jsPlumb.instance.Defaults.Endpoint || jsPlumb.Defaults.Endpoint,
                        hoverPaintStyle: this._jsPlumb.instance.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle,
                        overlays: this._jsPlumb.instance.Defaults.EndpointOverlays || jsPlumb.Defaults.EndpointOverlays,
                        connectorStyle: g.connectorStyle,
                        connectorHoverStyle: g.connectorHoverStyle,
                        connectorClass: g.connectorClass,
                        connectorHoverClass: g.connectorHoverClass,
                        connectorOverlays: g.connectorOverlays,
                        connector: g.connector,
                        connectorTooltip: g.connectorTooltip
                    }
                },
                this._jsPlumb.enabled = !(g.enabled === !1),
                this._jsPlumb.visible = !0,
                this.element = jsPlumb.getDOMElement(g.source),
                this._jsPlumb.uuid = g.uuid,
                this._jsPlumb.floatingEndpoint = null;
        var m = null;
        this._jsPlumb.uuid && (g.endpointsByUUID[this._jsPlumb.uuid] = this),
                this.elementId = g.elementId,
                this._jsPlumb.connectionCost = g.connectionCost,
                this._jsPlumb.connectionsDirected = g.connectionsDirected,
                this._jsPlumb.currentAnchorClass = "",
                this._jsPlumb.events = {};
        var n = function () {
            var a = this._jsPlumb.currentAnchorClass;
            this._jsPlumb.currentAnchorClass = this.anchor.getCssClass(),
                    jsPlumbAdapter.updateClasses(this.element, h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass,
                            h.endpointAnchorClassPrefix + "_" + a),
                    this.updateClasses(h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass,
                            h.endpointAnchorClassPrefix + "_" + a)
        }.bind(this);
        this.setAnchor = function (a, b) {
            return this._jsPlumb.instance.continuousAnchorFactory.clear(this.elementId),
                    this.anchor = this._jsPlumb.instance.makeAnchor(a, this.elementId, h), n(),
                    this.anchor.bind("anchorChanged", function (a) {
                        this.fire("anchorChanged", {
                            endpoint: this, anchor: a
                        }), n()
                    }.bind(this)), b || this._jsPlumb.instance.repaint(this.elementId), this
        };
        var o = g.anchor ? g.anchor : g.anchors ? g.anchors : h.Defaults.Anchor || "Top";
        this.setAnchor(o, !0);
        var p = function (a) {
            if (this.connections.length > 0)
                for (var b = 0; b < this.connections.length; b++)
                    this.connections[b].setHover(a, !1);
            else
                this.setHover(a)
        }.bind(this);
        this.bind("mouseover", function () {
            p(!0)
        }),
                this.bind("mouseout", function () {
                    p(!1)
                }),
                g._transient || this._jsPlumb.instance.anchorManager.add(this, this.elementId),
                this.setEndpoint = function (a) {
                    null != this.endpoint && (this.endpoint.cleanup(), this.endpoint.destroy());
                    var b = function (a, b) {
                        var c = h.getRenderMode();
                        if (jsPlumb.Endpoints[c][a])
                            return new jsPlumb.Endpoints[c][a](b);
                        if (!h.Defaults.DoNotThrowErrors)
                            throw{
                                msg: "jsPlumb: unknown endpoint type '" + a + "'"}
                    },
                            c = {_jsPlumb: this._jsPlumb.instance,
                                cssClass: g.cssClass,
                                container: g.container,
                                tooltip: g.tooltip,
                                connectorTooltip: g.connectorTooltip,
                                endpoint: this};
                    j.isString(a) ? this.endpoint = b(a, c) : j.isArray(a) ? (c = j.merge(a[1], c),
                            this.endpoint = b(a[0], c)) : this.endpoint = a.clone(),
                            this.endpoint.clone = function () {
                                return j.isString(a) ? b(a, c) : j.isArray(a) ? (c = j.merge(a[1], c), b(a[0], c)) : void 0
                            }.bind(this),
                            this.type = this.endpoint.type
                }, this.setEndpoint(g.endpoint || h.Defaults.Endpoint || jsPlumb.Defaults.Endpoint || "Dot"),
                this.setPaintStyle(g.endpointStyle || g.paintStyle || g.style || h.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle,
                        !0),
                this.setHoverPaintStyle(g.endpointHoverStyle || g.hoverPaintStyle || h.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle, !0),
                this._jsPlumb.paintStyleInUse = this.getPaintStyle(),
                jsPlumb.extend(this, g, d),
                this.isSource = g.isSource || !1,
                this.isTemporarySource = g.isTemporarySource || !1,
                this.isTarget = g.isTarget || !1,
                this._jsPlumb.maxConnections = g.maxConnections || h.Defaults.MaxConnections,
                this.canvas = this.endpoint.canvas,
                this.canvas._jsPlumb = this,
                this.addClass(h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass),
                jsPlumbAdapter.addClass(this.element, h.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass),
                this.connections = g.connections || [],
                this.connectorPointerEvents = g["connector-pointer-events"],
                this.scope = g.scope || h.getDefaultScope(),
                this.timestamp = null,
                this.reattachConnections = g.reattach || h.Defaults.ReattachConnections,
                this.connectionsDetachable = h.Defaults.ConnectionsDetachable,
                (g.connectionsDetachable === !1 || g.detachable === !1) && (this.connectionsDetachable = !1), this.dragAllowedWhenFull = g.dragAllowedWhenFull !== !1, g.onMaxConnections && this.bind("maxConnections", g.onMaxConnections),
                this.addConnection = function (a) {
                    this.connections.push(a),
                            this[(this.connections.length > 0 ? "add" : "remove") + "Class"](h.endpointConnectedClass),
                            this[(this.isFull() ? "add" : "remove") + "Class"](h.endpointFullClass)
                },
                this.detachFromConnection = function (a, b, c) {
                    b = null == b ? f(a, this) : b,
                            b >= 0 && (this.connections.splice(b, 1),
                                    this[(this.connections.length > 0 ? "add" : "remove") + "Class"](h.endpointConnectedClass),
                                    this[(this.isFull() ? "add" : "remove") + "Class"](h.endpointFullClass)),
                            !c && this._deleteOnDetach && 0 === this.connections.length && h.deleteObject({
                                endpoint: this, fireEvent: !1, deleteAttachedObjects: !1})
                },
                this.detach = function (a, b, c, d, e, g, i) {
                    var j = null == i ? f(a, this) : i, k = !1;
                    return d = d !== !1,
                            j >= 0 && (c || a._forceDetach || a.isDetachable() && a.isDetachAllowed(a) && this.isDetachAllowed(a) && h.checkCondition("beforeDetach", a)) && (h.deleteObject({
                        connection: a, fireEvent: !b && d,
                        originalEvent: e, deleteAttachedObjects: !1
                    }),
                            k = !0), k
                },
                this.detachAll = function (a, b) {
                    for (; this.connections.length > 0; )
                        this.detach(this.connections[0], !1, !0, a !== !1, b, this, 0);
                    return this
                },
                this.detachFrom = function (a, b, c) {
                    for (var d = [], e = 0; e < this.connections.length; e++)
                        (
                                this.connections[e].endpoints[1] == a || this.connections[e].endpoints[0] == a) && d.push(this.connections[e]);
                    for (var f = 0; f < d.length; f++)
                        this.detach(d[f], !1, !0, b, c);
                    return this
                },
                this.getElement = function () {
                    return this.element
                },
                this.setElement = function (a) {
                    var b = this._jsPlumb.instance.getId(a), c = this.elementId;
                    return j.removeWithFunction(g.endpointsByElement[this.elementId], function (a) {
                        return a.id == this.id
                    }.bind(this)), this.element = jsPlumb.getDOMElement(a), this.elementId = h.getId(this.element), h.anchorManager.rehomeEndpoint(this, c, this.element), h.dragManager.endpointAdded(this.element), j.addToList(g.endpointsByElement, b, this), this
                },
                this.makeInPlaceCopy = function () {
                    var a = this.anchor.getCurrentLocation({element: this}),
                            b = this.anchor.getOrientation(this),
                            c = this.anchor.getCssClass(),
                            d = {
                                bind: function () {
                                },
                                compute: function () {
                                    return[a[0], a[1]]
                                },
                                getCurrentLocation: function () {
                                    return[a[0], a[1]]
                                },
                                getOrientation: function () {
                                    return b
                                },
                                getCssClass: function () {
                                    return c
                                }};
                    return l({
                        dropOptions: g.dropOptions,
                        anchor: d,
                        source: this.element,
                        paintStyle: this.getPaintStyle(),
                        endpoint: g.hideOnDrag ? "Blank" : this.endpoint,
                        _transient: !0,
                        scope: this.scope})
                },
                this.connectorSelector = function () {
                    var a = this.connections[0];
                    return this.isTarget && a ? a : this.connections.length < this._jsPlumb.maxConnections || -1 == this._jsPlumb.maxConnections ? null : a
                },
                this.setStyle = this.setPaintStyle, this.paint = function (a) {
                    a = a || {};
                    var b = a.timestamp, c = !(a.recalc === !1);
                    if (!b || this.timestamp !== b) {
                        var d = h.updateOffset({elId: this.elementId, timestamp: b}), f = a.offset ? a.offset.o : d.o;
                        if (null != f) {
                            var g = a.anchorPoint, i = a.connectorPaintStyle;
                            if (null == g) {
                                var j = a.dimensions || d.s, k = {xy: [f.left, f.top], wh: j, element: this, timestamp: b};
                                if (c && this.anchor.isDynamic && this.connections.length > 0) {
                                    var l = e(this, a.elementWithPrecedence), m = l.endpoints[0] == this ? 1 : 0, n = 0 === m ? l.sourceId : l.targetId, o = h.getCachedData(n), p = o.o, q = o.s;
                                    k.txy = [p.left, p.top], k.twh = q, k.tElement = l.endpoints[m]
                                }
                                g = this.anchor.compute(k)
                            }
                            this.endpoint.compute(g, this.anchor.getOrientation(this), this._jsPlumb.paintStyleInUse, i || this.paintStyleInUse),
                                    this.endpoint.paint(this._jsPlumb.paintStyleInUse, this.anchor),
                                    this.timestamp = b;
                            for (var r = 0; r < this._jsPlumb.overlays.length; r++) {
                                var s = this._jsPlumb.overlays[r];
                                s.isVisible() && (this._jsPlumb.overlayPlacements[r] = s.draw(this.endpoint, this._jsPlumb.paintStyleInUse),
                                        s.paint(this._jsPlumb.overlayPlacements[r]))
                            }
                        }
                    }
                },
                this.repaint = this.paint;
        var q = !1;
        this.initDraggable = function () {
            if (!q && jsPlumb.isDragSupported(this.element)) {
                var d = {id: null, element: null}, e = null, f = !1, n = null, o = a(d, h), p = g.dragOptions || {}, r = {}, s = jsPlumb.dragEvents.start, t = jsPlumb.dragEvents.stop, u = jsPlumb.dragEvents.drag, v = function () {
                    e = this.connectorSelector();
                    var a = !0;
                    if (this.isEnabled() || (a = !1), null != e || this.isSource || this.isTemporarySource || (a = !1),
                            this.isSource && this.isFull() && !this.dragAllowedWhenFull && (a = !1), null == e || e.isDetachable() || (a = !1), a === !1)
                        return h.stopDrag && h.stopDrag(this.canvas),
                                o.stopDrag(),
                                !1;
                    for (var p = 0; p < this.connections.length; p++)
                        this.connections[p].setHover(!1);
                    this.addClass("endpointDrag"),
                            h.setConnectionBeingDragged(!0), e && !this.isFull() && this.isSource && (e = null),
                            h.updateOffset({elId: this.elementId}), m = this.makeInPlaceCopy(),
                            m.referenceEndpoint = this, m.paint(), b(d, h);
                    var q = i(m.canvas),
                            r = jsPlumbAdapter.getOffset(q, this._jsPlumb.instance), s = i(this.canvas);
                    if (jsPlumbAdapter.setPosition(d.element, r),
                            this.parentAnchor && (this.anchor = h.makeAnchor(this.parentAnchor, this.elementId, h)),
                            h.setAttribute(this.canvas, "dragId", d.id),
                            h.setAttribute(this.canvas, "elId", this.elementId),
                            this._jsPlumb.floatingEndpoint = c(
                                    this.getPaintStyle(),
                                    this.anchor, this.endpoint,
                                    this.canvas,
                                    d.element, h, l, this.scope),
                            this.canvas.style.visibility = "hidden", null == e)
                        this.anchor.locked = !0,
                                this.setHover(!1, !1), e = k({
                            sourceEndpoint: this, targetEndpoint: this._jsPlumb.floatingEndpoint,
                            source: this.endpointWillMoveTo || this.element,
                            target: d.element,
                            anchors: [this.anchor, this._jsPlumb.floatingEndpoint.anchor],
                            paintStyle: g.connectorStyle,
                            hoverPaintStyle: g.connectorHoverStyle,
                            connector: g.connector,
                            overlays: g.connectorOverlays,
                            type: this.connectionType,
                            cssClass: this.connectorClass,
                            hoverClass: this.connectorHoverClass
                        }),
                                e.addClass(h.draggingClass),
                                this._jsPlumb.floatingEndpoint.addClass(h.draggingClass),
                                h.fire("connectionDrag", e);
                    else {
                        f = !0, e.setHover(!1);
                        var t = e.endpoints[0].id == this.id ? 0 : 1;
                        this.detachFromConnection(e, null, !0);
                        var u = h.getDragScope(s);
                        h.setAttribute(this.canvas, "originalScope", u);
                        var v = h.getDropScope(s);
                        h.setDragScope(s, v),
                                h.fire("connectionDrag", e),
                                0 === t ? (n = [e.source, e.sourceId, s, u],
                                        e.source = d.element,
                                        e.sourceId = d.id) : (n = [e.target, e.targetId, s, u],
                                e.target = d.element,
                                e.targetId = d.id),
                                e.endpoints[0 === t ? 1 : 0].anchor.locked = !0,
                                e.suspendedEndpoint = e.endpoints[t],
                                e.suspendedElement = e.endpoints[t].getElement(),
                                e.suspendedElementId = e.endpoints[t].elementId,
                                e.suspendedElementType = 0 === t ? "source" : "target",
                                e.suspendedEndpoint.setHover(!1),
                                this._jsPlumb.floatingEndpoint.referenceEndpoint = e.suspendedEndpoint, e.endpoints[t] = this._jsPlumb.floatingEndpoint,
                                e.addClass(h.draggingClass),
                                this._jsPlumb.floatingEndpoint.addClass(h.draggingClass)
                    }
                    h.floatingConnections[d.id] = e, h.anchorManager.addFloatingConnection(d.id, e), j.addToList(g.endpointsByElement, d.id, this._jsPlumb.floatingEndpoint), h.currentlyDragging = !0
                }.bind(this), w = function () {
                    if (h.setConnectionBeingDragged(!1), e && null != e.endpoints) {
                        var a = h.getDropEvent(arguments), b = h.getFloatingAnchorIndex(e);
                        if (e.endpoints[0 === b ? 1 : 0].anchor.locked = !1, e.removeClass(h.draggingClass), this._jsPlumb && (e.deleteConnectionNow || e.endpoints[b] == this._jsPlumb.floatingEndpoint) && f && e.suspendedEndpoint) {
                            0 === b ? (e.source = n[0], e.sourceId = n[1]) : (e.target = n[0], e.targetId = n[1]);
                            var c = this._jsPlumb.floatingEndpoint;
                            h.setDragScope(n[2], n[3]), e.endpoints[b] = e.suspendedEndpoint, e.isReattach() || e._forceReattach || e._forceDetach || !e.endpoints[0 === b ? 1 : 0].detach(e, !1, !1, !0, a) ? (e.setHover(!1), e._forceDetach = null, e._forceReattach = null, this._jsPlumb.floatingEndpoint.detachFromConnection(e), e.suspendedEndpoint.addConnection(e), h.repaint(n[1])) : h.deleteObject({endpoint: c})
                        }
                        h.remove(d.element, !1), h.deleteObject({endpoint: m}), this.deleteAfterDragStop ? h.deleteObject({endpoint: this}) : this._jsPlumb && (this._jsPlumb.floatingEndpoint = null, this.canvas.style.visibility = "visible", this.anchor.locked = !1, this.paint({recalc: !1})), h.fire("connectionDragStop", e, a), h.currentlyDragging = !1, e = null
                    }
                }.bind(this);
                p = jsPlumb.extend(r, p), p.scope = this.scope || p.scope, p[s] = j.wrap(p[s], v, !1), p[u] = j.wrap(p[u], o.drag), p[t] = j.wrap(p[t], w), p.canDrag = function () {
                    return this.isSource || this.isTemporarySource || this.isTarget && this.connections.length > 0
                }.bind(this), h.initDraggable(this.canvas, p, "internal"), this.canvas._jsPlumbRelatedElement = this.element, q = !0
            }
        },
                (this.isSource || this.isTarget || this.isTemporarySource) && this.initDraggable();
        var r = function (a, b, c, d) {
            if ((this.isTarget || b) && jsPlumb.isDropSupported(this.element)) {
                var e = g.dropOptions || h.Defaults.DropOptions || jsPlumb.Defaults.DropOptions;
                e = jsPlumb.extend({}, e),
                        e.scope = e.scope || this.scope;
                var f = jsPlumb.dragEvents.drop,
                        i = jsPlumb.dragEvents.over,
                        k = jsPlumb.dragEvents.out,
                        l = this,
                        m = h.EndpointDropHandler({
                            getEndpoint: function () {
                                return l
                            }, jsPlumb: h, enabled: function () {
                                return null != d ? d.isEnabled() : !0
                            }, isFull: function () {
                                return d.isFull()
                            }, element: this.element, elementId: this.elementId, isSource: this.isSource, isTarget: this.isTarget, addClass: function (a) {
                                l.addClass(a)
                            }, removeClass: function (a) {
                                l.removeClass(a)
                            }, isDropAllowed: function () {
                                return l.isDropAllowed.apply(l, arguments)
                            }
                        });
                e[f] = j.wrap(e[f], m),
                        e[i] = j.wrap(e[i],
                        function () {
                            var a = jsPlumb.getDragObject(arguments), b = h.getAttribute(jsPlumb.getDOMElement(a), "dragId"), c = h.floatingConnections[b];
                            if (null != c) {
                                var d = h.getFloatingAnchorIndex(c), e = this.isTarget && 0 !== d || c.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == c.suspendedEndpoint.id;
                                if (e) {
                                    var f = h.checkCondition("checkDropAllowed", {sourceEndpoint: c.endpoints[d], targetEndpoint: this, connection: c});
                                    this[(f ? "add" : "remove") + "Class"](h.endpointDropAllowedClass), this[(f ? "remove" : "add") + "Class"](h.endpointDropForbiddenClass), c.endpoints[d].anchor.over(this.anchor, this)
                                }
                            }
                        }.bind(this)),
                        e[k] = j.wrap(e[k],
                        function () {
                            var a = jsPlumb.getDragObject(arguments), b = null == a ? null : h.getAttribute(jsPlumb.getDOMElement(a), "dragId"), c = b ? h.floatingConnections[b] : null;
                            if (null != c) {
                                var d = h.getFloatingAnchorIndex(c), e = this.isTarget && 0 !== d || c.suspendedEndpoint && this.referenceEndpoint && this.referenceEndpoint.id == c.suspendedEndpoint.id;
                                e && (this.removeClass(h.endpointDropAllowedClass), this.removeClass(h.endpointDropForbiddenClass), c.endpoints[d].anchor.out())
                            }
                        }.bind(this)),
                        h.initDroppable(a, e, "internal", c)
            }
        }.bind(this);
        return this.anchor.isFloating || r(i(this.canvas), !0,
                !(g._transient || this.anchor.isFloating), this),
                g.type && this.addType(g.type, g.data,
                        h.isSuspendDrawing()), this
    },
            jsPlumbUtil.extend(jsPlumb.Endpoint, OverlayCapableJsPlumbUIComponent, {
                getTypeDescriptor: function () {
                    return"endpoint"
                },
                isVisible: function () {
                    return this._jsPlumb.visible
                },
                setVisible: function (a, b, c) {
                    if (this._jsPlumb.visible = a, this.canvas && (this.canvas.style.display = a ? "block" : "none"), this[a ? "showOverlays" : "hideOverlays"](), !b)
                        for (var d = 0; d < this.connections.length; d++)
                            if (this.connections[d].setVisible(a), !c) {
                                var e = this === this.connections[d].endpoints[0] ? 1 : 0;
                                1 == this.connections[d].endpoints[e].connections.length && this.connections[d].endpoints[e].setVisible(a, !0, !0)
                            }
                },
                getAttachedElements: function () {
                    return this.connections
                },
                applyType: function (a) {
                    this.setPaintStyle(a.endpointStyle || a.paintStyle), this.setHoverPaintStyle(a.endpointHoverStyle || a.hoverPaintStyle), null != a.maxConnections && (this._jsPlumb.maxConnections = a.maxConnections), a.scope && (this.scope = a.scope), jsPlumb.extend(this, a, d), a.anchor && (this.anchor = this._jsPlumb.instance.makeAnchor(a.anchor)), null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass)
                },
                isEnabled: function () {
                    return this._jsPlumb.enabled
                },
                setEnabled: function (a) {
                    this._jsPlumb.enabled = a
                },
                cleanup: function () {
                    jsPlumbAdapter.removeClass(this.element, this._jsPlumb.instance.endpointAnchorClassPrefix + "_" + this._jsPlumb.currentAnchorClass),
                            this.anchor = null,
                            this.endpoint.cleanup(),
                            this.endpoint.destroy(),
                            this.endpoint = null;
                    var a = jsPlumb.getElementObject(this.canvas);
                    this._jsPlumb.instance.destroyDraggable(a, "internal"),
                            this._jsPlumb.instance.destroyDroppable(a, "internal")
                },
                setHover: function (a) {
                    this.endpoint && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && this.endpoint.setHover(a)
                },
                isFull: function () {
                    return!(this.isFloating() || this._jsPlumb.maxConnections < 1 || this.connections.length < this._jsPlumb.maxConnections)
                },
                isFloating: function () {
                    return null != this.anchor && this.anchor.isFloating
                },
                isConnectedTo: function (a) {
                    var b = !1;
                    if (a)
                        for (var c = 0; c < this.connections.length; c++)
                            if (this.connections[c].endpoints[1] == a || this.connections[c].endpoints[0] == a) {
                                b = !0;
                                break
                            }
                    return b
                },
                getConnectionCost: function () {
                    return this._jsPlumb.connectionCost
                }, setConnectionCost: function (a) {
                    this._jsPlumb.connectionCost = a
                }, areConnectionsDirected: function () {
                    return this._jsPlumb.connectionsDirected
                },
                setConnectionsDirected: function (a) {
                    this._jsPlumb.connectionsDirected = a
                },
                setElementId: function (a) {
                    this.elementId = a,
                            this.anchor.elementId = a
                },
                setReferenceElement: function (a) {
                    this.element = jsPlumb.getDOMElement(a)
                },
                setDragAllowedWhenFull: function (a) {
                    this.dragAllowedWhenFull = a
                }, equals: function (a) {
                    return this.anchor.equals(a.anchor)
                }, getUuid: function () {
                    return this._jsPlumb.uuid
                },
                computeAnchor: function (a) {
                    return this.anchor.compute(a)
                }
            }),
            jsPlumbInstance.prototype.EndpointDropHandler = function (a) {
                return function (b) {
                    var c = a.jsPlumb;
                    a.removeClass(c.endpointDropAllowedClass),
                            a.removeClass(c.endpointDropForbiddenClass);
                    var d = c.getDropEvent(arguments),
                            e = c.getDOMElement(c.getDragObject(arguments)),
                            f = c.getAttribute(e, "dragId"),
                            g = (c.getAttribute(e, "elId"),
                                    c.getAttribute(e, "originalScope")),
                            h = c.floatingConnections[f];
                    if (null != h) {
                        var i = a.getEndpoint(h);
                        a.onDrop && a.onDrop(h);
                        var j = h.suspendedEndpoint && (h.suspendedEndpoint.id == i.id || i.referenceEndpoint && h.suspendedEndpoint.id == i.referenceEndpoint.id);
                        if (j)
                            return h._forceReattach = !0,
                                    h.setHover(!1),
                                    void 0;
                        var k = c.getFloatingAnchorIndex(h);
                        if (g && c.setDragScope(e, g),
                                a.isFull(b) && i.fire("maxConnections", {
                            endpoint: this,
                            connection: h,
                            maxConnections: i._jsPlumb.maxConnections},
                        d),
                                !a.isFull() && (0 !== k || a.isSource) && (1 != k || a.isTarget) && a.enabled()) {
                            var l = !0;
                            h.suspendedEndpoint && h.suspendedEndpoint.id != i.id && (h.isDetachAllowed(h) && h.endpoints[k].isDetachAllowed(h) && h.suspendedEndpoint.isDetachAllowed(h) && c.checkCondition("beforeDetach", h) || (l = !1)), 0 === k ? (h.source = a.element, h.sourceId = a.elementId) : (h.target = a.element, h.targetId = a.elementId);
                            var m = function () {
                                h.endpoints[k].detachFromConnection(h),
                                        h.suspendedEndpoint && h.suspendedEndpoint.detachFromConnection(h),
                                        h.endpoints[k] = i, i.addConnection(h);
                                var a = i.getParameters();
                                for (var b in a)
                                    h.setParameter(b, a[b]);
                                if (h.suspendedEndpoint) {
                                    var e = h.suspendedEndpoint.elementId;
                                    c.fireMoveEvent({
                                        index: k,
                                        originalSourceId: 0 === k ? e : h.sourceId,
                                        newSourceId: 0 === k ? i.elementId : h.sourceId,
                                        originalTargetId: 1 == k ? e : h.targetId,
                                        newTargetId: 1 == k ? i.elementId : h.targetId,
                                        originalSourceEndpoint: 0 === k ? h.suspendedEndpoint : h.endpoints[0],
                                        newSourceEndpoint: 0 === k ? i : h.endpoints[0],
                                        originalTargetEndpoint: 1 == k ? h.suspendedEndpoint : h.endpoints[1],
                                        newTargetEndpoint: 1 == k ? i : h.endpoints[1],
                                        connection: h}, d)
                                } else
                                    a.draggable && c.initDraggable(this.element, dragOptions, "internal", c);
                                if (1 == k ? c.anchorManager.updateOtherEndpoint(h.sourceId, h.suspendedElementId, h.targetId, h) : c.anchorManager.sourceChanged(h.suspendedEndpoint.elementId, h.sourceId, h), h.endpoints[0].finalEndpoint) {
                                    var f = h.endpoints[0];
                                    f.detachFromConnection(h), h.endpoints[0] = h.endpoints[0].finalEndpoint, h.endpoints[0].addConnection(h)
                                }
                                c.finaliseConnection(h, null, d), h.setHover(!1)
                            }.bind(this),
                                    n = function () {
                                        h.suspendedEndpoint && (h.endpoints[k] = h.suspendedEndpoint, h.setHover(!1), h._forceDetach = !0, 0 === k ? (h.source = h.suspendedEndpoint.element, h.sourceId = h.suspendedEndpoint.elementId) : (h.target = h.suspendedEndpoint.element, h.targetId = h.suspendedEndpoint.elementId), h.suspendedEndpoint.addConnection(h), c.repaint(h.sourceId), h._forceDetach = !1)
                                    };
                            l = l && a.isDropAllowed(h.sourceId, h.targetId, h.scope, h, i), l ? m() : n()
                        }
                        c.currentlyDragging = !1
                    }
                }
            }
}(),
        function () {
            "use strict";
            var a = function (a, b, c, d, e) {
                if (!a.Defaults.DoNotThrowErrors && null == jsPlumb.Connectors[b][c])
                    throw{msg: "jsPlumb: unknown connector type '" + c + "'"};
                return new jsPlumb.Connectors[b][c](d, e)
            }, b = function (a, b, c) {
                return a ? c.makeAnchor(a, b, c) : null
            };
            jsPlumb.Connection = function (a) {
                var b = a.newEndpoint,
                        c = jsPlumbUtil;
                this.connector = null,
                        this.idPrefix = "_jsplumb_c_",
                        this.defaultLabelLocation = .5,
                        this.defaultOverlayKeys = ["Overlays", "ConnectionOverlays"],
                        this.previousConnection = a.previousConnection,
                        this.source = jsPlumb.getDOMElement(a.source),
                        this.target = jsPlumb.getDOMElement(a.target),
                        a.sourceEndpoint && (this.source = a.sourceEndpoint.endpointWillMoveTo || a.sourceEndpoint.getElement()),
                        a.targetEndpoint && (this.target = a.targetEndpoint.getElement()),
                        OverlayCapableJsPlumbUIComponent.apply(this, arguments),
                        this.sourceId = this._jsPlumb.instance.getId(this.source),
                        this.targetId = this._jsPlumb.instance.getId(this.target),
                        this.scope = a.scope,
                        this.endpoints = [],
                        this.endpointStyles = [];
                var d = this._jsPlumb.instance;
                d.manage(this.sourceId, this.source),
                        d.manage(this.targetId, this.target),
                        this._jsPlumb.visible = !0,
                        this._jsPlumb.editable = a.editable === !0,
                        this._jsPlumb.params = {
                            cssClass: a.cssClass,
                            container: a.container,
                            "pointer-events": a["pointer-events"],
                            editorParams: a.editorParams
                        },
                this._jsPlumb.lastPaintedAt = null,
                        this.getDefaultType = function () {
                            return{
                                parameters: {},
                                scope: null,
                                detachable: this._jsPlumb.instance.Defaults.ConnectionsDetachable,
                                rettach: this._jsPlumb.instance.Defaults.ReattachConnections,
                                paintStyle: this._jsPlumb.instance.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle,
                                connector: this._jsPlumb.instance.Defaults.Connector || jsPlumb.Defaults.Connector,
                                hoverPaintStyle: this._jsPlumb.instance.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle,
                                overlays: this._jsPlumb.instance.Defaults.ConnectorOverlays || jsPlumb.Defaults.ConnectorOverlays}
                        },
                        this.bind("mouseover", function () {
                            this.setHover(!0)
                        }.bind(this)),
                        this.bind("mouseout", function () {
                            this.setHover(!1)
                        }.bind(this)),
                        this.makeEndpoint = function (c, e, f, g) {
                            return f = f || this._jsPlumb.instance.getId(e),
                                    this.prepareEndpoint(d, b, this, g, c ? 0 : 1, a, e, f)
                        };
                var e = this.makeEndpoint(!0, this.source, this.sourceId, a.sourceEndpoint),
                        f = this.makeEndpoint(!1, this.target, this.targetId, a.targetEndpoint);
                e && c.addToList(a.endpointsByElement, this.sourceId, e),
                        f && c.addToList(a.endpointsByElement, this.targetId, f),
                        this.scope || (this.scope = this.endpoints[0].scope),
                        null != a.deleteEndpointsOnDetach ? (this.endpoints[0]._deleteOnDetach = a.deleteEndpointsOnDetach, this.endpoints[1]._deleteOnDetach = a.deleteEndpointsOnDetach) : (this.endpoints[0]._doNotDeleteOnDetach || (this.endpoints[0]._deleteOnDetach = !0), this.endpoints[1]._doNotDeleteOnDetach || (this.endpoints[1]._deleteOnDetach = !0)), this.setConnector(this.endpoints[0].connector || this.endpoints[1].connector || a.connector || d.Defaults.Connector || jsPlumb.Defaults.Connector, !0, !0), a.path && this.connector.setPath(a.path),
                        this.setPaintStyle(this.endpoints[0].connectorStyle || this.endpoints[1].connectorStyle || a.paintStyle || d.Defaults.PaintStyle || jsPlumb.Defaults.PaintStyle, !0),
                        this.setHoverPaintStyle(this.endpoints[0].connectorHoverStyle || this.endpoints[1].connectorHoverStyle || a.hoverPaintStyle || d.Defaults.HoverPaintStyle || jsPlumb.Defaults.HoverPaintStyle, !0),
                        this._jsPlumb.paintStyleInUse = this.getPaintStyle();
                var g = d.getSuspendedAt();
                if (!d.isSuspendDrawing()) {
                    var h = d.getCachedData(this.sourceId),
                            i = h.o,
                            j = h.s,
                            k = d.getCachedData(this.targetId), l = k.o, m = k.s, n = g || d.timestamp(),
                            o = this.endpoints[0].anchor.compute({xy: [i.left, i.top], wh: j,
                        element: this.endpoints[0],
                        elementId: this.endpoints[0].elementId,
                        txy: [l.left, l.top],
                        twh: m, tElement: this.endpoints[1],
                        timestamp: n
                    });
                    this.endpoints[0].paint({anchorLoc: o, timestamp: n}),
                            o = this.endpoints[1].anchor.compute({
                        xy: [l.left, l.top],
                        wh: m,
                        element: this.endpoints[1],
                        elementId: this.endpoints[1].elementId,
                        txy: [i.left, i.top], twh: j,
                        tElement: this.endpoints[0], timestamp: n
                    }),
                            this.endpoints[1].paint({
                        anchorLoc: o, timestamp: n
                    })
                }
                this._jsPlumb.detachable = d.Defaults.ConnectionsDetachable,
                        a.detachable === !1 && (this._jsPlumb.detachable = !1),
                        this.endpoints[0].connectionsDetachable === !1 && (this._jsPlumb.detachable = !1),
                        this.endpoints[1].connectionsDetachable === !1 && (this._jsPlumb.detachable = !1),
                        this._jsPlumb.reattach = a.reattach || this.endpoints[0].reattachConnections || this.endpoints[1].reattachConnections || d.Defaults.ReattachConnections,
                        this._jsPlumb.cost = a.cost || this.endpoints[0].getConnectionCost(),
                        this._jsPlumb.directed = a.directed,
                        null == a.directed && (this._jsPlumb.directed = this.endpoints[0].areConnectionsDirected());
                var p = jsPlumb.extend({},
                        this.endpoints[1].getParameters());
                jsPlumb.extend(p, this.endpoints[0].getParameters()),
                        jsPlumb.extend(p,
                                this.getParameters()),
                        this.setParameters(p);
                var q = [
                    a.type,
                    this.endpoints[0].connectionType,
                    this.endpoints[1].connectionType].join(" ");
                /[^\s]/.test(q) && this.addType(q, a.data, !0)
            },
                    jsPlumbUtil.extend(jsPlumb.Connection, OverlayCapableJsPlumbUIComponent,
                            {
                                applyType: function (a, b) {
                                    null != a.detachable && this.setDetachable(a.detachable),
                                            null != a.reattach && this.setReattach(a.reattach),
                                            a.scope && (this.scope = a.scope),
                                            this.setConnector(a.connector, b),
                                            null != a.cssClass && this.canvas && this._jsPlumb.instance.addClass(this.canvas, a.cssClass),
                                            a.anchor ? (this.endpoints[0].anchor = this._jsPlumb.instance.makeAnchor(a.anchor),
                                                    this.endpoints[1].anchor = this._jsPlumb.instance.makeAnchor(a.anchor)) : a.anchors && (this.endpoints[0].anchor = this._jsPlumb.instance.makeAnchor(a.anchors[0]), this.endpoints[1].anchor = this._jsPlumb.instance.makeAnchor(a.anchors[1]))
                                },
                                getTypeDescriptor: function () {
                                    return"connection"
                                },
                                getAttachedElements: function () {
                                    return this.endpoints
                                },
                                addClass: function (a, b) {
                                    b && (this.endpoints[0].addClass(a),
                                            this.endpoints[1].addClass(a),
                                            this.suspendedEndpoint && this.suspendedEndpoint.addClass(a)),
                                            this.connector && this.connector.addClass(a)
                                },
                                removeClass: function (a, b) {
                                    b && (this.endpoints[0].removeClass(a),
                                            this.endpoints[1].removeClass(a),
                                            this.suspendedEndpoint && this.suspendedEndpoint.removeClass(a)),
                                            this.connector && this.connector.removeClass(a)
                                },
                                isVisible: function () {
                                    return this._jsPlumb.visible
                                },
                                setVisible: function (a) {
                                    this._jsPlumb.visible = a,
                                            this.connector && this.connector.setVisible(a),
                                            this.repaint()
                                },
                                cleanup: function () {
                                    this.endpoints = null,
                                            this.source = null,
                                            this.target = null,
                                            null != this.connector && (this.connector.cleanup(),
                                                    this.connector.destroy()),
                                            this.connector = null
                                },
                                isDetachable: function () {
                                    return this._jsPlumb.detachable === !0
                                },
                                setDetachable: function (a) {
                                    this._jsPlumb.detachable = a === !0
                                },
                                isReattach: function () {
                                    return this._jsPlumb.reattach === !0
                                },
                                setReattach: function (a) {
                                    this._jsPlumb.reattach = a === !0
                                },
                                setHover: function (a) {
                                    this.connector && this._jsPlumb && !this._jsPlumb.instance.isConnectionBeingDragged() && (this.connector.setHover(a),
                                            jsPlumbAdapter[a ? "addClass" : "removeClass"](this.source,
                                            this._jsPlumb.instance.hoverSourceClass),
                                            jsPlumbAdapter[a ? "addClass" : "removeClass"](this.target,
                                            this._jsPlumb.instance.hoverTargetClass)
                                            )
                                },
                                getCost: function () {
                                    return this._jsPlumb.cost
                                },
                                setCost: function (a) {
                                    this._jsPlumb.cost = a
                                },
                                isDirected: function () {
                                    return this._jsPlumb.directed === !0
                                },
                                getConnector: function () {
                                    return this.connector
                                },
                                setConnector: function (b, c, d) {
                                    var e = jsPlumbUtil;
                                    null != this.connector && (this.connector.cleanup(),
                                            this.connector.destroy());
                                    var f = {
                                        _jsPlumb: this._jsPlumb.instance,
                                        cssClass: this._jsPlumb.params.cssClass,
                                        container: this._jsPlumb.params.container,
                                        "pointer-events": this._jsPlumb.params["pointer-events"]},
                                    g = this._jsPlumb.instance.getRenderMode();
                                    e.isString(b) ? this.connector = a(
                                            this._jsPlumb.instance,
                                            g,
                                            b,
                                            f,
                                            this) : e.isArray(b) && (this.connector = 1 == b.length ? a(this._jsPlumb.instance,
                                            g,
                                            b[0],
                                            f, this) : a(this._jsPlumb.instance,
                                            g, b[0],
                                            e.merge(b[1], f),
                                            this)),
                                            this.canvas = this.connector.canvas,
                                            this.bgCanvas = this.connector.bgCanvas,
                                            this.canvas && (this.canvas._jsPlumb = this),
                                            this.bgCanvas && (this.bgCanvas._jsPlumb = this),
                                            d || this.setListenerComponent(this.connector),
                                            c || this.repaint()
                                },
                                paint: function (a) {
                                    if (!this._jsPlumb.instance.isSuspendDrawing() && this._jsPlumb.visible) {
                                        a = a || {};
                                        var b = a.timestamp,
                                                c = !1, d = c ? this.sourceId : this.targetId,
                                                e = c ? this.targetId : this.sourceId,
                                                f = c ? 0 : 1, g = c ? 1 : 0;
                                        if (null == b || b != this._jsPlumb.lastPaintedAt) {
                                            var h = this._jsPlumb.instance.getOffset(e),
                                                    i = this._jsPlumb.instance.getOffset(d),
                                                    j = this.endpoints[g],
                                                    k = this.endpoints[f],
                                                    l = j.anchor.getCurrentLocation({
                                                        xy: [h.left, h.top],
                                                        wh: [h.width, h.height],
                                                        element: j, timestamp: b}),
                                                    m = k.anchor.getCurrentLocation({
                                                        xy: [i.left,
                                                            i.top],
                                                        wh: [i.width, i.height], element: k, timestamp: b});
                                            this.connector.resetBounds(),
                                                    this.connector.compute({
                                                        sourcePos: l, targetPos: m,
                                                        sourceEndpoint: this.endpoints[g],
                                                        targetEndpoint: this.endpoints[f],
                                                        lineWidth: this._jsPlumb.paintStyleInUse.lineWidth,
                                                        sourceInfo: h, targetInfo: i
                                                    });
                                            for (var n = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}, o = 0; o < this._jsPlumb.overlays.length; o++) {
                                                var p = this._jsPlumb.overlays[o];
                                                p.isVisible() && (this._jsPlumb.overlayPlacements[o] = p.draw(this.connector, this._jsPlumb.paintStyleInUse,
                                                        this.getAbsoluteOverlayPosition(p)), n.minX = Math.min(n.minX, this._jsPlumb.overlayPlacements[o].minX),
                                                        n.maxX = Math.max(n.maxX, this._jsPlumb.overlayPlacements[o].maxX),
                                                        n.minY = Math.min(n.minY, this._jsPlumb.overlayPlacements[o].minY),
                                                        n.maxY = Math.max(n.maxY, this._jsPlumb.overlayPlacements[o].maxY))
                                            }
                                            var q = parseFloat(this._jsPlumb.paintStyleInUse.lineWidth || 1) / 2, r = parseFloat(
                                                    this._jsPlumb.paintStyleInUse.lineWidth || 0), s = {
                                                xmin: Math.min(this.connector.bounds.minX - (q + r), n.minX),
                                                ymin: Math.min(this.connector.bounds.minY - (q + r), n.minY),
                                                xmax: Math.max(this.connector.bounds.maxX + (q + r), n.maxX),
                                                ymax: Math.max(this.connector.bounds.maxY + (q + r), n.maxY)
                                            };
                                            this.connector.paint(this._jsPlumb.paintStyleInUse, null, s);
                                            for (var t = 0; t < this._jsPlumb.overlays.length; t++) {
                                                var u = this._jsPlumb.overlays[t];
                                                u.isVisible() && u.paint(
                                                        this._jsPlumb.overlayPlacements[t], s)
                                            }
                                        }
                                        this._jsPlumb.lastPaintedAt = b
                                    }
                                },
                                repaint: function (a) {
                                    a = a || {}, this.paint({
                                        elId: this.sourceId,
                                        recalc: !(a.recalc === !1),
                                        timestamp: a.timestamp})
                                },
                                prepareEndpoint: function (a, c, d, e, f, g, h, i) {
                                    var j;
                                    if (e)
                                        d.endpoints[f] = e, e.addConnection(d);
                                    else {
                                        g.endpoints || (g.endpoints = [null, null]);
                                        var k = g.endpoints[f] || g.endpoint || a.Defaults.Endpoints[f] || jsPlumb.Defaults.Endpoints[f] || a.Defaults.Endpoint || jsPlumb.Defaults.Endpoint;
                                        g.endpointStyles || (g.endpointStyles = [null, null]),
                                                g.endpointHoverStyles || (g.endpointHoverStyles = [null, null]);
                                        var l = g.endpointStyles[f] || g.endpointStyle || a.Defaults.EndpointStyles[f] || jsPlumb.Defaults.EndpointStyles[f] || a.Defaults.EndpointStyle || jsPlumb.Defaults.EndpointStyle;
                                        null == l.fillStyle && null != g.paintStyle && (l.fillStyle = g.paintStyle.strokeStyle),
                                                null == l.outlineColor && null != g.paintStyle && (l.outlineColor = g.paintStyle.outlineColor),
                                                null == l.outlineWidth && null != g.paintStyle && (l.outlineWidth = g.paintStyle.outlineWidth);
                                        var m = g.endpointHoverStyles[f] || g.endpointHoverStyle || a.Defaults.EndpointHoverStyles[f] || jsPlumb.Defaults.EndpointHoverStyles[f] || a.Defaults.EndpointHoverStyle || jsPlumb.Defaults.EndpointHoverStyle;
                                        null != g.hoverPaintStyle && (null == m && (m = {}),
                                                null == m.fillStyle && (m.fillStyle = g.hoverPaintStyle.strokeStyle));
                                        var n = g.anchors ? g.anchors[f] : g.anchor ? g.anchor : b(a.Defaults.Anchors[f], i, a) || b(jsPlumb.Defaults.Anchors[f], i, a) || b(a.Defaults.Anchor, i, a) || b(jsPlumb.Defaults.Anchor, i, a),
                                                o = g.uuids ? g.uuids[f] : null;
                                        j = c({
                                            paintStyle: l,
                                            hoverPaintStyle: m,
                                            endpoint: k,
                                            connections: [d],
                                            uuid: o, anchor: n,
                                            source: h,
                                            scope: g.scope,
                                            reattach: g.reattach || a.Defaults.ReattachConnections,
                                            detachable: g.detachable || a.Defaults.ConnectionsDetachable}),
                                                d.endpoints[f] = j,
                                                g.drawEndpoints === !1 && j.setVisible(!1, !0, !0)
                                    }
                                    return j
                                }
                            })
        }(),
        function () {
            "use strict";
            jsPlumb.AnchorManager = function (a) {
                var b = {}, c = {}, d = {}, e = {},
                        f = {HORIZONTAL: "horizontal",
                            VERTICAL: "vertical",
                            DIAGONAL: "diagonal",
                            IDENTITY: "identity"},
                g = ["left", "top", "right", "bottom"],
                        h = {},
                        i = this,
                        j = {},
                        k = a.jsPlumbInstance,
                        l = {},
                        m = function (a, b, c, d, e, h) {
                            if (a === b)
                                return{orientation: f.IDENTITY, a: ["top", "top"]};
                            var i = Math.atan2(d.centery - c.centery, d.centerx - c.centerx),
                                    j = Math.atan2(c.centery - d.centery, c.centerx - d.centerx),
                                    k = [],
                                    l = {};
                            !function (a, b) {
                                for (var c = 0; c < a.length; c++)
                                    l[a[c]] = {
                                        left: [b[c].left, b[c].centery],
                                        right: [b[c].right, b[c].centery],
                                        top: [b[c].centerx, b[c].top],
                                        bottom: [b[c].centerx, b[c].bottom]
                                    }
                            }(["source", "target"], [c, d]);
                            for (var m = 0; m < g.length; m++)
                                for (var n = 0; n < g.length; n++)
                                    m != n && k.push({source: g[m], target: g[n], dist: Biltong.lineLength(l.source[g[m]], l.target[g[n]])});
                            k.sort(function (a, b) {
                                return a.dist < b.dist ? -1 : a.dist > b.dist ? 1 : 0
                            });
                            for (var o = k[0].source, p = k[0].target, q = 0; q < k.length && (o = !e.isContinuous || e.isEdgeSupported(k[q].source)?k[q].source:null, p = !h.isContinuous || h.isEdgeSupported(k[q].target)?k[q].target:null, null == o || null == p); q++)
                                ;
                            return{a: [o, p], theta: i, theta2: j}
                        },
                        n = function (a, b, c, d, e, f, g) {
                            for (var h = [], i = b[e ? 0 : 1] / (d.length + 1), j = 0; j < d.length; j++) {
                                var k = (j + 1) * i, l = f * b[e ? 1 : 0];
                                g && (k = b[e ? 0 : 1] - k);
                                var m = e ? k : l,
                                        n = c[0] + m,
                                        o = m / b[0],
                                        p = e ? l : k,
                                        q = c[1] + p,
                                        r = p / b[1];
                                h.push([n, q, o, r, d[j][1], d[j][2]])
                            }
                            return h
                        },
                        o = function (a) {
                            return function (b, c) {
                                var d = !0;
                                return d = a ? b[0][0] < c[0][0] : b[0][0] > c[0][0], d === !1 ? -1 : 1
                            }
                        },
                        p = function (a, b) {
                            var c = a[0][0] < 0 ? -Math.PI - a[0][0] : Math.PI - a[0][0], d = b[0][0] < 0 ? -Math.PI - b[0][0] : Math.PI - b[0][0];
                            return c > d ? 1 : a[0][1] > b[0][1] ? 1 : -1
                        },
                        q = {
                            top: function (a, b) {
                                return a[0] > b[0] ? 1 : -1
                            },
                            right: o(!0),
                            bottom: o(!0),
                            left: p
                        },
                r = function (a, b) {
                    return a.sort(b)
                },
                        s = function (a, b) {
                            var d = k.getCachedData(a),
                                    f = d.s,
                                    g = d.o,
                                    h = function (b, d, f, g, h, i, j) {
                                        if (g.length > 0)
                                            for (var k = r(g, q[b]), l = "right" === b || "top" === b, m = n(b, d, f, k, h, i, l), o = function (a, b) {
                                                c[a.id] = [b[0],
                                                    b[1],
                                                    b[2],
                                                    b[3]],
                                                        e[a.id] = j
                                            },
                                                    p = 0; p < m.length; p++) {
                                                var s = m[p][4],
                                                        t = s.endpoints[0].elementId === a,
                                                        u = s.endpoints[1].elementId === a;
                                                t ? o(s.endpoints[0], m[p]) : u && o(s.endpoints[1], m[p])
                                            }
                                    };
                            h("bottom", f, [g.left, g.top], b.bottom, !0, 1, [0, 1]),
                                    h("top", f, [g.left, g.top], b.top, !0, 0, [0, -1]),
                                    h("left", f, [g.left, g.top], b.left, !1, 0, [-1, 0]),
                                    h("right", f, [g.left, g.top], b.right, !1, 1, [1, 0])
                        };
                this.reset = function () {
                    b = {}, h = {}, j = {}
                },
                        this.addFloatingConnection = function (a, b) {
                            l[a] = b
                        },
                        this.removeFloatingConnection = function (a) {
                            delete l[a]
                        },
                        this.newConnection = function (a) {
                            var b = a.sourceId,
                                    c = a.targetId,
                                    d = a.endpoints,
                                    e = !0,
                                    f = function (f, g, i, j, k) {
                                        b == c && i.isContinuous && (a._jsPlumb.instance.removeElement(d[1].canvas), e = !1),
                                                jsPlumbUtil.addToList(h, j, [k, g, i.constructor == jsPlumb.DynamicAnchor])
                                    };
                            f(0, d[0], d[0].anchor, c, a), e && f(1, d[1], d[1].anchor, b, a)
                        };
                var t = function (a) {
                    !function (a, b) {
                        if (a) {
                            var c = function (a) {
                                return a[4] == b
                            };
                            jsPlumbUtil.removeWithFunction(a.top, c),
                                    jsPlumbUtil.removeWithFunction(a.left, c),
                                    jsPlumbUtil.removeWithFunction(a.bottom, c),
                                    jsPlumbUtil.removeWithFunction(a.right, c)
                        }
                    }(j[a.elementId], a.id)
                };
                this.connectionDetached = function (a) {
                    var b = a.connection || a,
                            c = a.sourceId,
                            d = a.targetId,
                            e = b.endpoints,
                            f = function (a, b, c, d, e) {
                                null != c && c.constructor == jsPlumb.FloatingAnchor || jsPlumbUtil.removeWithFunction(h[d], function (a) {
                                    return a[0].id == e.id
                                })
                            };
                    f(1, e[1], e[1].anchor, c, b),
                            f(0, e[0], e[0].anchor, d, b),
                            t(b.endpoints[0]),
                            t(b.endpoints[1]),
                            i.redraw(b.sourceId),
                            i.redraw(b.targetId)
                },
                        this.add = function (a, c) {
                            jsPlumbUtil.addToList(b, c, a)
                        },
                        this.changeId = function (a, c) {
                            h[c] = h[a], b[c] = b[a], delete h[a], delete b[a]
                        },
                        this.getConnectionsFor = function (a) {
                            return h[a] || []
                        },
                        this.getEndpointsFor = function (a) {
                            return b[a] || []
                        },
                        this.deleteEndpoint = function (a) {
                            jsPlumbUtil.removeWithFunction(b[a.elementId], function (b) {
                                return b.id == a.id
                            }), t(a)
                        },
                        this.clearFor = function (a) {
                            delete b[a], b[a] = []
                        };
                var u = function (b, c, d, e, f, g, h, i, j, k, l, m) {
                    var n,
                            o = -1,
                            p = -1,
                            q = e.endpoints[h],
                            r = q.id, s = [1, 0][h],
                            t = [[c, d], e, f, g, r], u = b[j],
                            v = q._continuousAnchorEdge ? b[q._continuousAnchorEdge] : null;
                    if (v) {
                        var w = jsPlumbUtil.findWithFunction(v,
                                function (a) {
                                    return a[4] == r
                                });
                        if (-1 != w)
                            for (v.splice(w, 1), n = 0; n < v.length; n++)
                                jsPlumbUtil.addWithFunction(l, v[n][1],
                                        function (a) {
                                            return a.id == v[n][1].id
                                        }), jsPlumbUtil.addWithFunction(m, v[n][1].endpoints[h],
                                        function (a) {
                                            return a.id == v[n][1].endpoints[h].id
                                        }), jsPlumbUtil.addWithFunction(m, v[n][1].endpoints[s],
                                        function (a) {
                                            return a.id == v[n][1].endpoints[s].id
                                        })
                    }
                    for (n = 0; n < u.length; n++)
                        1 == a.idx && u[n][3] === g && -1 == p && (p = n),
                                jsPlumbUtil.addWithFunction(l, u[n][1],
                                        function (a) {
                                            return a.id == u[n][1].id
                                        }), jsPlumbUtil.addWithFunction(m, u[n][1].endpoints[h],
                                function (a) {
                                    return a.id == u[n][1].endpoints[h].id
                                }), jsPlumbUtil.addWithFunction(m, u[n][1].endpoints[s],
                                function (a) {
                                    return a.id == u[n][1].endpoints[s].id
                                });
                    if (-1 != o)
                        u[o] = t;
                    else {
                        var x = i ? -1 != p ? p : 0 : u.length;
                        u.splice(x, 0, t)
                    }
                    q._continuousAnchorEdge = j
                };
                this.updateOtherEndpoint = function (a, b, c, d) {
                    var e = jsPlumbUtil.findWithFunction(h[a], function (a) {
                        return a[0].id === d.id
                    }), f = jsPlumbUtil.findWithFunction(h[b], function (a) {
                        return a[0].id === d.id
                    });
                    -1 != e && (h[a][e][0] = d,
                            h[a][e][1] = d.endpoints[1],
                            h[a][e][2] = d.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor),
                            f > -1 && (h[b].splice(f, 1),
                                    jsPlumbUtil.addToList(h, c, [d, d.endpoints[0],
                                        d.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor]
                                            )
                                    )
                },
                        this.sourceChanged = function (a, b, c) {
                            if (a !== b) {
                                jsPlumbUtil.removeWithFunction(h[a], function (a) {
                                    return a[0].id === c.id
                                });
                                var d = jsPlumbUtil.findWithFunction(h[c.targetId], function (a) {
                                    return a[0].id === c.id
                                });
                                d > -1 && (h[c.targetId][d][0] = c,
                                        h[c.targetId][d][1] = c.endpoints[0],
                                        h[c.targetId][d][2] = c.endpoints[0].anchor.constructor == jsPlumb.DynamicAnchor),
                                        jsPlumbUtil.addToList(h, b, [c, c.endpoints[1], c.endpoints[1].anchor.constructor == jsPlumb.DynamicAnchor])
                            }
                        },
                        this.rehomeEndpoint = function (a, c, d) {
                            var e = b[c] || [], f = k.getId(d);
                            if (f !== c) {
                                var g = jsPlumbUtil.indexOf(e, a);
                                if (g > -1) {
                                    var h = e.splice(g, 1)[0];
                                    i.add(h, f)
                                }
                            }

                            for (var j = 0; j < a.connections.length; j++)
                                a.connections[j].sourceId == c ? (a.connections[j].sourceId = a.elementId,
                                        a.connections[j].source = a.element,
                                        i.sourceChanged(c, a.elementId, a.connections[j])) : a.connections[j].targetId == c && (
                                        a.connections[j].targetId = a.elementId,
                                        a.connections[j].target = a.element,
                                        i.updateOtherEndpoint(a.connections[j].sourceId, c, a.elementId, a.connections[j]))
                        },
                        this.redraw = function (a, c, d, e, f, g) {
                            if (!k.isSuspendDrawing()) {
                                var i = b[a] || [],
                                        n = h[a] || [],
                                        o = [],
                                        p = [],
                                        q = [];
                                d = d || k.timestamp(),
                                        e = e || {left: 0, top: 0},
                                c && (c = {left: c.left + e.left, top: c.top + e.top});
                                for (var r = k.updateOffset({elId: a, offset: c, recalc: !1, timestamp: d}), t = {}, v = 0; v < n.length; v++) {
                                    var w = n[v][0],
                                            x = w.sourceId,
                                            y = w.targetId,
                                            z = w.endpoints[0].anchor.isContinuous,
                                            A = w.endpoints[1].anchor.isContinuous;
                                    if (z || A) {
                                        var B = x + "_" + y,
                                                C = t[B],
                                                D = w.sourceId == a ? 1 : 0;
                                        z && !j[x] && (j[x] = {top: [], right: [], bottom: [], left: []}),
                                                A && !j[y] && (j[y] = {top: [], right: [], bottom: [], left: []}),
                                                a != y && k.updateOffset({elId: y, timestamp: d}),
                                                a != x && k.updateOffset({elId: x, timestamp: d});
                                        var E = k.getCachedData(y),
                                                F = k.getCachedData(x);
                                        y == x && (z || A) ? u(j[x],
                                                -Math.PI / 2, 0, w, !1, y, 0, !1, "top", x, o, p)
                                                : (C || (C = m(x, y, F.o, E.o, w.endpoints[0].anchor, w.endpoints[1].anchor), t[B] = C),
                                                        z && u(
                                                                j[x],
                                                                C.theta, 0, w, !1,
                                                                y, 0, !1, C.a[0],
                                                                x, o, p
                                                                ),
                                                        A && u(j[y], C.theta2, -1, w, !0, x, 1, !0, C.a[1], y, o, p)
                                                        ),
                                                z && jsPlumbUtil.addWithFunction(q, x, function (a) {
                                                    return a === x
                                                }),
                                                A && jsPlumbUtil.addWithFunction(q, y, function (a) {
                                                    return a === y
                                                }),
                                                jsPlumbUtil.addWithFunction(o, w, function (a) {
                                                    return a.id == w.id
                                                }),
                                                (z && 0 === D || A && 1 === D) && jsPlumbUtil.addWithFunction(p, w.endpoints[D], function (a) {
                                            return a.id == w.endpoints[D].id
                                        })
                                    }
                                }
                                for (v = 0; v < i.length; v++)
                                    0 === i[v].connections.length && i[v].anchor.isContinuous && (
                                            j[a] || (j[a] = {top: [], right: [], bottom: [], left: []}),
                                            u(j[a], -Math.PI / 2, 0, {
                                                endpoints: [i[v], i[v]],
                                                paint: function () {
                                                }
                                            },
                                            !1, a, 0, !1,
                                                    i[v].anchor.getDefaultFace(), a, o, p),
                                            jsPlumbUtil.addWithFunction(q, a, function (b) {
                                                return b === a
                                            }));
                                for (v = 0; v < q.length; v++)
                                    s(q[v], j[q[v]]);
                                for (v = 0; v < i.length; v++)
                                    i[v].paint({timestamp: d, offset: r, dimensions: r.s, recalc: g !== !0});
                                for (v = 0; v < p.length; v++) {
                                    var G = k.getCachedData(p[v].elementId);
                                    p[v].paint({timestamp: d, offset: G, dimensions: G.s})
                                }
                                for (v = 0; v < n.length; v++) {
                                    var H = n[v][1];
                                    if (H.anchor.constructor == jsPlumb.DynamicAnchor) {
                                        H.paint({elementWithPrecedence: a, timestamp: d}),
                                                jsPlumbUtil.addWithFunction(o, n[v][0], function (a) {
                                                    return a.id == n[v][0].id
                                                });
                                        for (var I = 0; I < H.connections.length; I++)
                                            H.connections[I] !== n[v][0] && jsPlumbUtil.addWithFunction(o, H.connections[I], function (a) {
                                                return a.id == H.connections[I].id
                                            })
                                    } else
                                        H.anchor.constructor == jsPlumb.Anchor && jsPlumbUtil.addWithFunction(o, n[v][0], function (a) {
                                            return a.id == n[v][0].id
                                        })
                                }
                                var J = l[a];
                                for (J && J.paint({timestamp:d, recalc:!1, elId:a}), v = 0; v < o.length; v++)
                                    o[v].paint({elId: a, timestamp: d, recalc: !1, clearEdits: f})
                            }
                        };
                var v = function (a) {
                    jsPlumbUtil.EventGenerator.apply(this),
                            this.type = "Continuous",
                            this.isDynamic = !0,
                            this.isContinuous = !0;
                    for (var b = a.faces || ["top", "right", "bottom", "left"],
                            f = !(a.clockwise === !1), g = {},
                            h = {top: "bottom", right: "left", left: "right", bottom: "top"},
                    i = {top: "right", right: "bottom", left: "top", bottom: "left"},
                    j = {top: "left", right: "top", left: "bottom", bottom: "right"},
                    k = f ? i : j, l = f ? j : i, m = a.cssClass || "", n = 0; n < b.length; n++)
                        g[b[n]] = !0;
                    this.getDefaultFace = function () {
                        return 0 === b.length ? "top" : b[0]
                    },
                            this.verifyEdge = function (a) {
                                return g[a] ? a : g[h[a]] ? h[a] : g[k[a]] ? k[a] : g[l[a]] ? l[a] : a
                            },
                            this.isEdgeSupported = function (a) {
                                return g[a] === !0
                            },
                            this.compute = function (a) {
                                return d[a.element.id] || c[a.element.id] || [0, 0]
                            },
                            this.getCurrentLocation = function (a) {
                                return d[a.element.id] || c[a.element.id] || [0, 0]
                            },
                            this.getOrientation = function (a) {
                                return e[a.id] || [0, 0]
                            },
                            this.clearUserDefinedLocation = function () {
                                delete d[a.elementId]
                            },
                            this.setUserDefinedLocation = function (b) {
                                d[a.elementId] = b
                            },
                            this.getCssClass = function () {
                                return m
                            },
                            this.setCssClass = function (a) {
                                m = a
                            }
                };
                k.continuousAnchorFactory = {
                    get: function (a) {
                        return new v(a)
                    },
                    clear: function (a) {
                        delete d[a],
                                delete c[a]
                    }
                }
            },
                    jsPlumb.Anchor = function (a) {
                        this.x = a.x || 0,
                                this.y = a.y || 0,
                                this.elementId = a.elementId,
                                this.cssClass = a.cssClass || "",
                                this.userDefinedLocation = null,
                                this.orientation = a.orientation || [0, 0],
                                jsPlumbUtil.EventGenerator.apply(this),
                                a.jsPlumbInstance,
                                this.lastReturnValue = null,
                                this.offsets = a.offsets || [0, 0],
                                this.timestamp = null,
                                this.compute = function (a) {
                                    var b = a.xy,
                                            c = a.wh,
                                            d = (a.element, a.timestamp);
                                    return a.clearUserDefinedLocation && (this.userDefinedLocation = null),
                                            d && d === self.timestamp ? this.lastReturnValue : (
                                                    this.lastReturnValue = null != this.userDefinedLocation ? this.userDefinedLocation : [b[0] + this.x * c[0] + this.offsets[0],
                                                        b[1] + this.y * c[1] + this.offsets[1]],
                                                    this.timestamp = d,
                                                    this.lastReturnValue
                                                    )
                                }, this.getCurrentLocation = function (a) {
                            return null == this.lastReturnValue || null != a.timestamp && this.timestamp != a.timestamp ? this.compute(a) : this.lastReturnValue
                        }
                    },
                    jsPlumbUtil.extend(jsPlumb.Anchor,
                            jsPlumbUtil.EventGenerator,
                            {
                                equals: function (a) {
                                    if (!a)
                                        return!1;
                                    var b = a.getOrientation(),
                                            c = this.getOrientation();
                                    return this.x == a.x && this.y == a.y && this.offsets[0] == a.offsets[0] && this.offsets[1] == a.offsets[1] && c[0] == b[0] && c[1] == b[1]
                                },
                                getUserDefinedLocation: function () {
                                    return this.userDefinedLocation
                                },
                                setUserDefinedLocation: function (a) {
                                    this.userDefinedLocation = a
                                },
                                clearUserDefinedLocation: function () {
                                    this.userDefinedLocation = null
                                },
                                getOrientation: function () {
                                    return this.orientation
                                },
                                getCssClass: function () {
                                    return this.cssClass
                                }
                            }),
                    jsPlumb.FloatingAnchor = function (a) {
                        jsPlumb.Anchor.apply(this, arguments);
                        var b = a.reference,
                                c = (a.jsPlumbInstance, a.referenceCanvas),
                                d = jsPlumb.getSize(c),
                                e = 0,
                                f = 0,
                                g = null,
                                h = null;
                        this.orientation = null,
                                this.x = 0,
                                this.y = 0,
                                this.isFloating = !0,
                                this.compute = function (a) {
                                    var b = a.xy, c = (a.element, [b[0] + d[0] / 2, b[1] + d[1] / 2]);
                                    return h = c, c
                                },
                                this.getOrientation = function (a) {
                                    if (g)
                                        return g;
                                    var c = b.getOrientation(a);
                                    return[-1 * Math.abs(c[0]) * e, -1 * Math.abs(c[1]) * f]
                                },
                                this.over = function (a, b) {
                                    g = a.getOrientation(b)
                                },
                                this.out = function () {
                                    g = null
                                },
                                this.getCurrentLocation = function (a) {
                                    return null == h ? this.compute(a) : h
                                }
                    },
                    jsPlumbUtil.extend(jsPlumb.FloatingAnchor, jsPlumb.Anchor);
            var a = function (a, b, c) {
                return a.constructor == jsPlumb.Anchor ? a : b.makeAnchor(a, c, b)
            };
            jsPlumb.DynamicAnchor = function (b) {
                jsPlumb.Anchor.apply(this, arguments),
                        this.isSelective = !0,
                        this.isDynamic = !0,
                        this.anchors = [],
                        this.elementId = b.elementId,
                        this.jsPlumbInstance = b.jsPlumbInstance;
                for (var c = 0; c < b.anchors.length; c++)
                    this.anchors[c] = a(b.anchors[c], this.jsPlumbInstance, this.elementId);
                this.addAnchor = function (b) {
                    this.anchors.push(a(b, this.jsPlumbInstance, this.elementId))
                },
                        this.getAnchors = function () {
                            return this.anchors
                        },
                        this.locked = !1;
                var d = this.anchors.length > 0 ? this.anchors[0] : null,
                        e = (this.anchors.length > 0 ? 0 : -1, d),
                        f = this,
                        g = function (a, b, c, d, e) {
                            var f = d[0] + a.x * e[0],
                                    g = d[1] + a.y * e[1],
                                    h = d[0] + e[0] / 2,
                                    i = d[1] + e[1] / 2;
                            return Math.sqrt(Math.pow(b - f, 2) + Math.pow(c - g, 2)) + Math.sqrt(Math.pow(h - f, 2) + Math.pow(i - g, 2))
                        },
                        h = b.selector || function (a, b, c, d, e) {
                            for (var f = c[0] + d[0] / 2, h = c[1] + d[1] / 2, i = -1, j = 1 / 0, k = 0; k < e.length; k++) {
                                var l = g(e[k], f, h, a, b);
                                j > l && (i = k + 0, j = l)
                            }
                            return e[i]
                        };
                this.compute = function (a) {
                    var b = a.xy, c = a.wh, g = a.timestamp, i = a.txy, j = a.twh;
                    this.timestamp = g;
                    var k = f.getUserDefinedLocation();
                    return null != k ? k : this.locked || null == i || null == j ? d.compute(a) : (a.timestamp = null, d = h(b, c, i, j, this.anchors), this.x = d.x, this.y = d.y, d != e && this.fire("anchorChanged", d), e = d, d.compute(a))
                },
                        this.getCurrentLocation = function (a) {
                            return this.getUserDefinedLocation() || (null != d ? d.getCurrentLocation(a) : null)
                        },
                        this.getOrientation = function (a) {
                            return null != d ? d.getOrientation(a) : [0, 0]
                        },
                        this.over = function (a, b) {
                            null != d && d.over(a, b)
                        },
                        this.out = function () {
                            null != d && d.out()
                        },
                        this.getCssClass = function () {
                            return d && d.getCssClass() || ""
                        }
            },
                    jsPlumbUtil.extend(jsPlumb.DynamicAnchor, jsPlumb.Anchor);
            var b = function (a, b, c, d, e, f) {
                jsPlumb.Anchors[e] = function (g) {
                    var h = g.jsPlumbInstance.makeAnchor(
                            [a, b, c, d, 0, 0],
                            g.elementId,
                            g.jsPlumbInstance
                            );
                    return h.type = e, f && f(h, g), h
                }
            };
            b(.5, 0, 0, -1, "TopCenter"),
                    b(.5, 1, 0, 1, "BottomCenter"),
                    b(0, .5, -1, 0, "LeftMiddle"),
                    b(1, .5, 1, 0, "RightMiddle"),
                    b(.5, 0, 0, -1, "Top"),
                    b(.5, 1, 0, 1, "Bottom"),
                    b(0, .5, -1, 0, "Left"),
                    b(1, .5, 1, 0, "Right"),
                    b(.5, .5, 0, 0, "Center"),
                    b(1, 0, 0, -1, "TopRight"),
                    b(1, 1, 0, 1, "BottomRight"),
                    b(0, 0, 0, -1, "TopLeft"),
                    b(0, 1, 0, 1, "BottomLeft"),
                    jsPlumb.Defaults.DynamicAnchors = function (a) {
                        return a.jsPlumbInstance.makeAnchors(["TopCenter", "RightMiddle", "BottomCenter", "LeftMiddle"], a.elementId, a.jsPlumbInstance)
                    },
                    jsPlumb.Anchors.AutoDefault = function (a) {
                        var b = a.jsPlumbInstance.makeDynamicAnchor(jsPlumb.Defaults.DynamicAnchors(a));
                        return b.type = "AutoDefault", b
                    };
            var c = function (a, b) {
                jsPlumb.Anchors[a] = function (c) {
                    var d = c.jsPlumbInstance.makeAnchor(["Continuous", {faces: b}], c.elementId, c.jsPlumbInstance);
                    return d.type = a, d
                }
            };
            jsPlumb.Anchors.Continuous = function (a) {
                return a.jsPlumbInstance.continuousAnchorFactory.get(a)
            },
                    c("ContinuousLeft", ["left"]),
                    c("ContinuousTop", ["top"]),
                    c("ContinuousBottom", ["bottom"]), c("ContinuousRight", ["right"]),
                    b(0, 0, 0, 0, "Assign", function (a, b) {
                        var c = b.position || "Fixed";
                        a.positionFinder = c.constructor == String ? b.jsPlumbInstance.AnchorPositionFinders[c] : c, a.constructorParams = b
                    }),
                    jsPlumbInstance.prototype.AnchorPositionFinders = {Fixed: function (a, b, c) {
                            return[(a.left - b.left) / c[0], (a.top - b.top) / c[1]]
                        },
                        Grid: function (a, b, c, d) {
                            var e = a.left - b.left,
                                    f = a.top - b.top,
                                    g = c[0] / d.grid[0],
                                    h = c[1] / d.grid[1],
                                    i = Math.floor(e / g),
                                    j = Math.floor(f / h);
                            return[(i * g + g / 2) / c[0], (j * h + h / 2) / c[1]]
                        }},
            jsPlumb.Anchors.Perimeter = function (a) {
                a = a || {};
                var b = a.anchorCount || 60,
                        c = a.shape;
                if (!c)
                    throw new Error("no shape supplied to Perimeter Anchor type");
                var d = function () {
                    for (var a = .5, c = 2 * Math.PI / b, d = 0, e = [], f = 0; b > f; f++) {
                        var g = a + a * Math.sin(d),
                                h = a + a * Math.cos(d);
                        e.push([g, h, 0, 0]), d += c
                    }
                    return e
                },
                        e = function (a) {
                            for (
                                    var c = b / a.length, d = [],
                                    e = function (a, e, f, g, h) {
                                        c = b * h;
                                        for (var i = (f - a) / c, j = (g - e) / c, k = 0; c > k; k++)
                                            d.push([a + i * k, e + j * k, 0, 0])
                                    },
                                    f = 0; f < a.length; f++
                                    )
                                e.apply(null, a[f]);
                            return d
                        },
                        f = function (a) {
                            for (var b = [], c = 0; c < a.length; c++)
                                b.push([a[c][0], a[c][1], a[c][2], a[c][3], 1 / a.length]);
                            return e(b)
                        },
                        g = function () {
                            return f([[0, 0, 1, 0], [1, 0, 1, 1], [1, 1, 0, 1], [0, 1, 0, 0]])
                        },
                        h = {
                            Circle: d, Ellipse: d, Diamond: function () {
                                return f([[.5, 0, 1, .5], [1, .5, .5, 1], [.5, 1, 0, .5], [0, .5, .5, 0]])
                            },
                            Rectangle: g, Square: g, Triangle: function () {
                                return f([[.5, 0, 1, 1], [1, 1, 0, 1], [0, 1, .5, 0]])
                            },
                            Path: function (a) {
                                for (var b = a.points, c = [], d = 0, f = 0; f < b.length - 1; f++) {
                                    var g = Math.sqrt(Math.pow(b[f][2] - b[f][0]) + Math.pow(b[f][3] - b[f][1]));
                                    d += g, c.push([b[f][0], b[f][1], b[f + 1][0], b[f + 1][1], g])
                                }
                                for (var h = 0; h < c.length; h++)
                                    c[h][4] = c[h][4] / d;
                                return e(c)
                            }},
                i = function (a, b) {
                    for (var c = [], d = b / 180 * Math.PI, e = 0; e < a.length; e++) {
                        var f = a[e][0] - .5, g = a[e][1] - .5;
                        c.push([.5 + (f * Math.cos(d) - g * Math.sin(d)), .5 + (f * Math.sin(d) + g * Math.cos(d)), a[e][2], a[e][3]])
                    }
                    return c
                };
                if (!h[c])
                    throw new Error("Shape [" + c + "] is unknown by Perimeter Anchor type");
                var j = h[c](a);
                a.rotation && (j = i(j, a.rotation));
                var k = a.jsPlumbInstance.makeDynamicAnchor(j);
                return k.type = "Perimeter", k
            }
        }(),
        function () {
            "use strict";
            jsPlumb.Segments = {
                AbstractSegment: function (a) {
                    this.params = a,
                            this.findClosestPointOnPath = function () {
                                return{d: 1 / 0, x: null, y: null, l: null}
                            },
                            this.getBounds = function () {
                                return{
                                    minX: Math.min(a.x1, a.x2),
                                    minY: Math.min(a.y1, a.y2),
                                    maxX: Math.max(a.x1, a.x2),
                                    maxY: Math.max(a.y1, a.y2)
                                }
                            }
                },
                Straight: function (a) {
                    var b, c, d, e, f, g, h, i = (
                            jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                            function () {
                                b = Math.sqrt(Math.pow(f - e, 2) + Math.pow(h - g, 2)),
                                        c = Biltong.gradient({x: e, y: g}, {x: f, y: h}),
                                        d = -1 / c
                            }
                    );
                    this.type = "Straight",
                            this.getLength = function () {
                                return b
                            },
                            this.getGradient = function () {
                                return c
                            },
                            this.getCoordinates = function () {
                                return{x1: e, y1: g, x2: f, y2: h}
                            },
                            this.setCoordinates = function (a) {
                                e = a.x1, g = a.y1, f = a.x2, h = a.y2, i()
                            },
                            this.setCoordinates({x1: a.x1, y1: a.y1, x2: a.x2, y2: a.y2}),
                            this.getBounds = function () {
                                return{
                                    minX: Math.min(e, f),
                                    minY: Math.min(g, h),
                                    maxX: Math.max(e, f),
                                    maxY: Math.max(g, h)}
                            },
                            this.pointOnPath = function (a, c) {
                                if (0 !== a || c) {
                                    if (1 != a || c) {
                                        var d = c ? a > 0 ? a : b + a : a * b;
                                        return Biltong.pointOnLine({x: e, y: g}, {x: f, y: h}, d)
                                    }
                                    return{x: f, y: h}
                                }
                                return{x: e, y: g}
                            },
                            this.gradientAtPoint = function () {
                                return c
                            },
                            this.pointAlongPathFrom = function (a, b, c) {
                                var d = this.pointOnPath(a, c), i = 0 >= b ? {x: e, y: g} : {x: f, y: h};
                                return 0 >= b && Math.abs(b) > 1 && (b *= -1), Biltong.pointOnLine(d, i, b)
                            };
                    var j = function (a, b, c) {
                        return c >= Math.min(a, b) && c <= Math.max(a, b)
                    },
                            k = function (a, b, c) {
                                return Math.abs(c - a) < Math.abs(c - b) ? a : b
                            };
                    this.findClosestPointOnPath = function (a, i) {
                        var l = {d: 1 / 0, x: null, y: null, l: null, x1: e, x2: f, y1: g, y2: h};
                        if (0 === c)
                            l.y = g, l.x = j(e, f, a) ? a : k(e, f, a);
                        else if (1 / 0 == c || c == -1 / 0)
                            l.x = e, l.y = j(g, h, i) ? i : k(g, h, i);
                        else {
                            var m = g - c * e, n = i - d * a, o = (n - m) / (c - d), p = c * o + m;
                            l.x = j(e, f, o) ? o : k(e, f, o), l.y = j(g, h, p) ? p : k(g, h, p)
                        }
                        var q = Biltong.lineLength([l.x, l.y], [e, g]);
                        return l.d = Biltong.lineLength([a, i], [l.x, l.y]), l.l = q / b, l
                    }
                },
                Arc: function (a) {
                    var b = (
                            jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                            function (b, c) {
                                return Biltong.theta([a.cx, a.cy], [b, c])
                            }
                    ),
                            c = function (a, b) {
                                if (a.anticlockwise) {
                                    var c = a.startAngle < a.endAngle ? a.startAngle + d : a.startAngle, e = Math.abs(c - a.endAngle);
                                    return c - e * b
                                }
                                var f = a.endAngle < a.startAngle ? a.endAngle + d : a.endAngle, g = Math.abs(f - a.startAngle);
                                return a.startAngle + g * b
                            },
                            d = 2 * Math.PI;
                    this.radius = a.r,
                            this.anticlockwise = a.ac,
                            this.type = "Arc",
                            a.startAngle && a.endAngle ? (
                                    this.startAngle = a.startAngle,
                                    this.endAngle = a.endAngle,
                                    this.x1 = a.cx + this.radius * Math.cos(a.startAngle),
                                    this.y1 = a.cy + this.radius * Math.sin(a.startAngle),
                                    this.x2 = a.cx + this.radius * Math.cos(a.endAngle),
                                    this.y2 = a.cy + this.radius * Math.sin(a.endAngle)
                                    ) : (this.startAngle = b(a.x1, a.y1),
                            this.endAngle = b(a.x2, a.y2),
                            this.x1 = a.x1,
                            this.y1 = a.y1,
                            this.x2 = a.x2,
                            this.y2 = a.y2),
                            this.endAngle < 0 && (this.endAngle += d),
                            this.startAngle < 0 && (this.startAngle += d),
                            this.segment = Biltong.quadrant([this.x1, this.y1], [this.x2, this.y2]);
                    var e = this.endAngle < this.startAngle ? this.endAngle + d : this.endAngle;
                    this.sweep = Math.abs(e - this.startAngle),
                            this.anticlockwise && (this.sweep = d - this.sweep);
                    var f = 2 * Math.PI * this.radius,
                            g = this.sweep / d, h = f * g;
                    this.getLength = function () {
                        return h
                    },
                            this.getBounds = function () {
                                return{minX: a.cx - a.r, maxX: a.cx + a.r, minY: a.cy - a.r, maxY: a.cy + a.r}
                            };
                    var i = 1e-10, j = function (a) {
                        var b = Math.floor(a),
                                c = Math.ceil(a);
                        return i > a - b ? b : i > c - a ? c : a
                    };
                    this.pointOnPath = function (b, d) {
                        if (0 === b)
                            return{x: this.x1, y: this.y1, theta: this.startAngle};
                        if (1 == b)
                            return{x: this.x2, y: this.y2, theta: this.endAngle};
                        d && (b /= h);
                        var e = c(this, b),
                                f = a.cx + a.r * Math.cos(e),
                                g = a.cy + a.r * Math.sin(e);
                        return{x: j(f), y: j(g), theta: e}
                    },
                            this.gradientAtPoint = function (b, c) {
                                var d = this.pointOnPath(b, c),
                                        e = Biltong.normal([a.cx, a.cy], [d.x, d.y]);
                                return this.anticlockwise || 1 / 0 != e && e != -1 / 0 || (e *= -1), e
                            },
                            this.pointAlongPathFrom = function (b, c, d) {
                                var e = this.pointOnPath(b, d),
                                        g = 2 * (c / f) * Math.PI,
                                        h = this.anticlockwise ? -1 : 1,
                                        i = e.theta + h * g,
                                        j = a.cx + this.radius * Math.cos(i),
                                        k = a.cy + this.radius * Math.sin(i);
                                return{x: j, y: k}
                            }
                },
                Bezier: function (a) {
                    this.curve = [
                        {x: a.x1, y: a.y1},
                        {x: a.cp1x, y: a.cp1y},
                        {x: a.cp2x, y: a.cp2y},
                        {x: a.x2, y: a.y2}
                    ],
                            jsPlumb.Segments.AbstractSegment.apply(this, arguments),
                            this.bounds = {
                                minX: Math.min(a.x1, a.x2, a.cp1x, a.cp2x),
                                minY: Math.min(a.y1, a.y2, a.cp1y, a.cp2y),
                                maxX: Math.max(a.x1, a.x2, a.cp1x, a.cp2x),
                                maxY: Math.max(a.y1, a.y2, a.cp1y, a.cp2y)
                            },
                    this.type = "Bezier";
                    var b = function (a, b, c) {
                        return c && (b = jsBezier.locationAlongCurveFrom(a, b > 0 ? 0 : 1, b)), b
                    };
                    this.pointOnPath = function (a, c) {
                        return a = b(this.curve, a, c), jsBezier.pointOnCurve(this.curve, a)
                    },
                            this.gradientAtPoint = function (a, c) {
                                return a = b(this.curve, a, c), jsBezier.gradientAtPoint(this.curve, a)
                            },
                            this.pointAlongPathFrom = function (a, c, d) {
                                return a = b(this.curve, a, d), jsBezier.pointAlongCurveFrom(this.curve, a, c)
                            },
                            this.getLength = function () {
                                return jsBezier.getLength(this.curve)
                            },
                            this.getBounds = function () {
                                return this.bounds
                            }
                }};
            var a = function () {
                this.resetBounds = function () {
                    this.bounds = {minX: 1 / 0, minY: 1 / 0, maxX: -1 / 0, maxY: -1 / 0}
                },
                        this.resetBounds()
            };
            jsPlumb.Connectors.AbstractConnector = function (b) {
                a.apply(this, arguments);
                var c = [],
                        d = 0,
                        e = [],
                        f = [],
                        g = b.stub || 0,
                        h = jsPlumbUtil.isArray(g) ? g[0] : g,
                        i = jsPlumbUtil.isArray(g) ? g[1] : g,
                        j = b.gap || 0,
                        k = jsPlumbUtil.isArray(j) ? j[0] : j,
                        l = jsPlumbUtil.isArray(j) ? j[1] : j,
                        m = null, n = !1,
                        o = null;
                this.getPath = function () {
                },
                        this.setPath = function () {
                        },
                        this.findSegmentForPoint = function (a, b) {
                            for (var d = {d: 1 / 0, s: null, x: null, y: null, l: null}, e = 0; e < c.length; e++) {
                                var f = c[e].findClosestPointOnPath(a, b);
                                f.d < d.d && (
                                        d.d = f.d,
                                        d.l = f.l,
                                        d.x = f.x,
                                        d.y = f.y,
                                        d.s = c[e],
                                        d.x1 = f.x1,
                                        d.x2 = f.x2, d.y1 = f.y1,
                                        d.y2 = f.y2,
                                        d.index = e
                                        )
                            }
                            return d
                        };
                var p = function () {
                    for (var a = 0, b = 0; b < c.length; b++) {
                        var g = c[b].getLength();
                        f[b] = g / d, e[b] = [a, a += g / d]
                    }
                },
                        q = function (a, b) {
                            b && (a = a > 0 ? a / d : (d + a) / d);
                            for (var g = e.length - 1, h = 1, i = 0; i < e.length; i++)
                                if (e[i][1] >= a) {
                                    g = i, h = 1 == a ? 1 : 0 === a ? 0 : (a - e[i][0]) / f[i];
                                    break
                                }
                            return{segment: c[g], proportion: h, index: g}
                        },
                        r = function (a, b, e) {
                            if (e.x1 != e.x2 || e.y1 != e.y2) {
                                var f = new jsPlumb.Segments[b](e);
                                c.push(f), d += f.getLength(), a.updateBounds(f)
                            }
                        },
                        s = function () {
                            d = c.length = e.length = f.length = 0
                        };
                this.setSegments = function (a) {
                    m = [], d = 0;
                    for (var b = 0; b < a.length; b++)
                        m.push(a[b]), d += a[b].getLength()
                };
                var t = function (a) {
                    this.lineWidth = a.lineWidth;
                    var b = Biltong.quadrant(a.sourcePos, a.targetPos),
                            c = a.targetPos[0] < a.sourcePos[0],
                            d = a.targetPos[1] < a.sourcePos[1],
                            e = a.lineWidth || 1,
                            f = a.sourceEndpoint.anchor.getOrientation(a.sourceEndpoint),
                            g = a.targetEndpoint.anchor.getOrientation(a.targetEndpoint),
                            j = c ? a.targetPos[0] : a.sourcePos[0],
                            m = d ? a.targetPos[1] : a.sourcePos[1],
                            n = Math.abs(a.targetPos[0] - a.sourcePos[0]), o = Math.abs(a.targetPos[1] - a.sourcePos[1]);
                    if (0 === f[0] && 0 === f[1] || 0 === g[0] && 0 === g[1]) {
                        var p = n > o ? 0 : 1,
                                q = [1, 0][p];
                        f = [],
                                g = [],
                                f[p] = a.sourcePos[p] > a.targetPos[p] ? -1 : 1,
                                g[p] = a.sourcePos[p] > a.targetPos[p] ? 1 : -1,
                                f[q] = 0,
                                g[q] = 0
                    }
                    var r = c ? n + k * f[0] : k * f[0], s = d ? o + k * f[1] : k * f[1],
                            t = c ? l * g[0] : n + l * g[0], u = d ? l * g[1] : o + l * g[1],
                            v = f[0] * g[0] + f[1] * g[1], w = {sx: r, sy: s, tx: t, ty: u, lw: e,
                        xSpan: Math.abs(t - r),
                        ySpan: Math.abs(u - s),
                        mx: (r + t) / 2,
                        my: (s + u) / 2,
                        so: f, to: g, x: j,
                        y: m, w: n,
                        h: o, segment: b,
                        startStubX: r + f[0] * h,
                        startStubY: s + f[1] * h,
                        endStubX: t + g[0] * i,
                        endStubY: u + g[1] * i,
                        isXGreaterThanStubTimes2: Math.abs(r - t) > h + i,
                        isYGreaterThanStubTimes2: Math.abs(s - u) > h + i,
                        opposite: -1 == v, perpendicular: 0 === v,
                        orthogonal: 1 == v,
                        sourceAxis: 0 === f[0] ? "y" : "x",
                        points: [j, m, n, o, r, s, t, u]
                    };
                    return w.anchorOrientation = w.opposite ? "opposite" : w.orthogonal ? "orthogonal" : "perpendicular", w
                };
                return this.getSegments = function () {
                    return c
                },
                        this.updateBounds = function (a) {
                            var b = a.getBounds();
                            this.bounds.minX = Math.min(this.bounds.minX, b.minX),
                                    this.bounds.maxX = Math.max(this.bounds.maxX, b.maxX),
                                    this.bounds.minY = Math.min(this.bounds.minY, b.minY),
                                    this.bounds.maxY = Math.max(this.bounds.maxY, b.maxY)
                        },
                        this.pointOnPath = function (a, b) {
                            var c = q(a, b);
                            return c.segment && c.segment.pointOnPath(c.proportion, !1) || [0, 0]
                        }, this.gradientAtPoint = function (a, b) {
                    var c = q(a, b);
                    return c.segment && c.segment.gradientAtPoint(c.proportion, !1) || 0
                }, this.pointAlongPathFrom = function (a, b, c) {
                    var d = q(a, c);
                    return d.segment && d.segment.pointAlongPathFrom(d.proportion, b, !1) || [0, 0]
                }, this.compute = function (a) {
                    n || (o = t.call(this, a)), s(),
                            this._compute(o, a),
                            this.x = o.points[0],
                            this.y = o.points[1],
                            this.w = o.points[2],
                            this.h = o.points[3],
                            this.segment = o.segment, p()
                },
                        {
                            addSegment: r, prepareCompute: t,
                            sourceStub: h, targetStub: i,
                            maxStub: Math.max(h, i), sourceGap: k,
                            targetGap: l, maxGap: Math.max(k, l)
                        }
            },
                    jsPlumbUtil.extend(jsPlumb.Connectors.AbstractConnector, a);
            var b = jsPlumb.Connectors.Straight = function () {
                this.type = "Straight";
                var a = jsPlumb.Connectors.AbstractConnector.apply(this, arguments);
                this._compute = function (b) {
                    a.addSegment(this, "Straight", {x1: b.sx, y1: b.sy, x2: b.startStubX, y2: b.startStubY}),
                            a.addSegment(this, "Straight", {x1: b.startStubX, y1: b.startStubY, x2: b.endStubX, y2: b.endStubY}),
                            a.addSegment(this, "Straight", {x1: b.endStubX, y1: b.endStubY, x2: b.tx, y2: b.ty})
                }
            };
            jsPlumbUtil.extend(
                    jsPlumb.Connectors.Straight,
                    jsPlumb.Connectors.AbstractConnector
                    ),
                    jsPlumb.registerConnectorType(b, "Straight"),
                    jsPlumb.Endpoints.AbstractEndpoint = function (b) {
                        a.apply(this, arguments);
                        var c = this.compute = function () {
                            var a = this._compute.apply(this, arguments);
                            return this.x = a[0],
                                    this.y = a[1],
                                    this.w = a[2],
                                    this.h = a[3],
                                    this.bounds.minX = this.x,
                                    this.bounds.minY = this.y,
                                    this.bounds.maxX = this.x + this.w,
                                    this.bounds.maxY = this.y + this.h,
                                    a
                        };
                        return{
                            compute: c,
                            cssClass: b.cssClass
                        }
                    },
                    jsPlumbUtil.extend(
                            jsPlumb.Endpoints.AbstractEndpoint, a
                            ),
                    jsPlumb.Endpoints.Dot = function (a) {
                        this.type = "Dot",
                                jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments),
                                a = a || {},
                                this.radius = a.radius || 10,
                                this.defaultOffset = .5 * this.radius,
                                this.defaultInnerRadius = this.radius / 3,
                                this._compute = function (a, b, c) {
                                    this.radius = c.radius || this.radius;
                                    var d = a[0] - this.radius,
                                            e = a[1] - this.radius,
                                            f = 2 * this.radius,
                                            g = 2 * this.radius;
                                    if (c.strokeStyle) {
                                        var h = c.lineWidth || 1;
                                        d -= h,
                                                e -= h,
                                                f += 2 * h,
                                                g += 2 * h
                                    }
                                    return[d, e, f, g, this.radius]
                                }
                    },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.Dot, jsPlumb.Endpoints.AbstractEndpoint),
                    jsPlumb.Endpoints.Rectangle = function (a) {
                        this.type = "Rectangle",
                                jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments),
                                a = a || {},
                                this.width = a.width || 20,
                                this.height = a.height || 20,
                                this._compute = function (a, b, c) {
                                    var d = c.width || this.width,
                                            e = c.height || this.height,
                                            f = a[0] - d / 2,
                                            g = a[1] - e / 2;
                                    return[f, g, d, e]
                                }
                    },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.Rectangle, jsPlumb.Endpoints.AbstractEndpoint);
            var c = function () {
                jsPlumb.jsPlumbUIComponent.apply(this, arguments),
                        this._jsPlumb.displayElements = []
            };
            jsPlumbUtil.extend(
                    c,
                    jsPlumb.jsPlumbUIComponent,
                    {
                        getDisplayElements: function () {
                            return this._jsPlumb.displayElements
                        }, appendDisplayElement: function (a) {
                            this._jsPlumb.displayElements.push(a)
                        }
                    }
            ),
                    jsPlumb.Endpoints.Image = function (a) {
                        this.type = "Image",
                                c.apply(this, arguments),
                                jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments);
                        var b = a.onload,
                                d = a.src || a.url,
                                e = a.cssClass ? " " + a.cssClass : "";
                        this._jsPlumb.img = new Image,
                                this._jsPlumb.ready = !1,
                                this._jsPlumb.initialized = !1,
                                this._jsPlumb.deleted = !1,
                                this._jsPlumb.widthToUse = a.width,
                                this._jsPlumb.heightToUse = a.height,
                                this._jsPlumb.endpoint = a.endpoint,
                                this._jsPlumb.img.onload = function () {
                                    null != this._jsPlumb && (
                                            this._jsPlumb.ready = !0,
                                            this._jsPlumb.widthToUse = this._jsPlumb.widthToUse || this._jsPlumb.img.width,
                                            this._jsPlumb.heightToUse = this._jsPlumb.heightToUse || this._jsPlumb.img.height,
                                            b && b(this)
                                            )
                                }.bind(this),
                                this._jsPlumb.endpoint.setImage = function (a, c) {
                                    var d = a.constructor == String ? a : a.src;
                                    b = c,
                                            this._jsPlumb.img.src = d,
                                            null != this.canvas && this.canvas.setAttribute("src", this._jsPlumb.img.src)
                                }.bind(this),
                                this._jsPlumb.endpoint.setImage(d, b),
                                this._compute = function (a) {
                                    return this.anchorPoint = a,
                                            this._jsPlumb.ready ? [a[0] - this._jsPlumb.widthToUse / 2,
                                                a[1] - this._jsPlumb.heightToUse / 2,
                                                this._jsPlumb.widthToUse,
                                                this._jsPlumb.heightToUse] : [0, 0, 0, 0]
                                },
                                this.canvas = document.createElement("img"),
                                this.canvas.style.margin = 0,
                                this.canvas.style.padding = 0,
                                this.canvas.style.outline = 0,
                                this.canvas.style.position = "absolute",
                                this.canvas.className = this._jsPlumb.instance.endpointClass + e,
                                this._jsPlumb.widthToUse && this.canvas.setAttribute("width", this._jsPlumb.widthToUse),
                                this._jsPlumb.heightToUse && this.canvas.setAttribute(
                                        "height", this._jsPlumb.heightToUse
                                        ),
                                this._jsPlumb.instance.appendElement(this.canvas),
                                this.actuallyPaint = function () {
                                    if (!this._jsPlumb.deleted) {
                                        this._jsPlumb.initialized || (
                                                this.canvas.setAttribute("src", this._jsPlumb.img.src),
                                                this.appendDisplayElement(this.canvas),
                                                this._jsPlumb.initialized = !0
                                                );
                                        var a = this.anchorPoint[0] - this._jsPlumb.widthToUse / 2,
                                                b = this.anchorPoint[1] - this._jsPlumb.heightToUse / 2;
                                        jsPlumbUtil.sizeElement(this.canvas, a, b, this._jsPlumb.widthToUse, this._jsPlumb.heightToUse)
                                    }
                                }, this.paint = function (a, b) {
                            null != this._jsPlumb && (
                                    this._jsPlumb.ready ? this.actuallyPaint(a, b) : window.setTimeout(
                                    function () {
                                        this.paint(a, b)
                                    }.bind(this), 200)
                                    )
                        }
                    },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.Image, [c, jsPlumb.Endpoints.AbstractEndpoint],
                            {
                                cleanup: function () {
                                    this._jsPlumb.deleted = !0,
                                            this.canvas && this.canvas.parentNode.removeChild(this.canvas),
                                            this.canvas = null
                                }
                            }
                    ),
                    jsPlumb.Endpoints.Blank = function (a) {
                        jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments),
                                this.type = "Blank",
                                c.apply(this, arguments),
                                this._compute = function (a) {
                                    return[a[0], a[1], 10, 0]
                                };
                        var b = a.cssClass ? " " + a.cssClass : "";
                        this.canvas = document.createElement("div"),
                                this.canvas.style.display = "block",
                                this.canvas.style.width = "1px",
                                this.canvas.style.height = "1px",
                                this.canvas.style.background = "transparent",
                                this.canvas.style.position = "absolute",
                                this.canvas.className = this._jsPlumb.instance.endpointClass + b,
                                this._jsPlumb.instance.appendElement(this.canvas),
                                this.paint = function () {
                                    jsPlumbUtil.sizeElement(this.canvas, this.x, this.y, this.w, this.h)
                                }
                    },
                    jsPlumbUtil.extend(
                            jsPlumb.Endpoints.Blank,
                            [jsPlumb.Endpoints.AbstractEndpoint, c],
                            {
                                cleanup: function () {
                                    this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas)
                                }
                            }
                    ),
                    jsPlumb.Endpoints.Triangle = function (a) {
                        this.type = "Triangle",
                                jsPlumb.Endpoints.AbstractEndpoint.apply(this, arguments),
                                a = a || {},
                                a.width = a.width || 55,
                                a.height = a.height || 55,
                                this.width = a.width,
                                this.height = a.height,
                                this._compute = function (a, b, c) {
                                    var d = c.width || self.width,
                                            e = c.height || self.height,
                                            f = a[0] - d / 2,
                                            g = a[1] - e / 2;
                                    return[f, g, d, e]
                                }
                    };
            var d = jsPlumb.Overlays.AbstractOverlay = function (a) {
                this.visible = !0,
                        this.isAppendedAtTopLevel = !0,
                        this.component = a.component,
                        this.loc = null == a.location ? .5 : a.location,
                        this.endpointLoc = null == a.endpointLocation ? [.5, .5] : a.endpointLocation
            };
            d.prototype = {
                cleanup: function () {
                    this.component = null,
                            this.canvas = null,
                            this.endpointLoc = null
                },
                setVisible: function (a) {
                    this.visible = a, this.component.repaint()
                },
                isVisible: function () {
                    return this.visible
                },
                hide: function () {
                    this.setVisible(!1)
                },
                show: function () {
                    this.setVisible(!0)
                },
                incrementLocation: function (a) {
                    this.loc += a, this.component.repaint()
                },
                setLocation: function (a) {
                    this.loc = a, this.component.repaint()
                },
                getLocation: function () {
                    return this.loc
                }},
            jsPlumb.Overlays.Arrow = function (a) {
                this.type = "Arrow",
                        d.apply(this, arguments),
                        this.isAppendedAtTopLevel = !1, a = a || {};
                var b = jsPlumbUtil,
                        c = Biltong;
                this.length = a.length || 20,
                        this.width = a.width || 20,
                        this.id = a.id;
                var e = (a.direction || 1) < 0 ? -1 : 1,
                        f = a.paintStyle || {lineWidth: 1},
                g = a.foldback || .623;
                this.computeMaxSize = function () {
                    return 1.5 * self.width
                },
                        this.draw = function (a, d) {
                            var h, i, j, k, l;
                            if (a.pointAlongPathFrom) {
                                if (b.isString(this.loc) || this.loc > 1 || this.loc < 0) {
                                    var m = parseInt(this.loc, 10),
                                            n = this.loc < 0 ? 1 : 0;
                                    h = a.pointAlongPathFrom(n, m, !1),
                                            i = a.pointAlongPathFrom(n, m - e * this.length / 2, !1),
                                            j = c.pointOnLine(h, i, this.length)
                                } else if (1 == this.loc) {
                                    if (h = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, -this.length), j = c.pointOnLine(h, i, this.length), -1 == e) {
                                        var o = j;
                                        j = h,
                                                h = o
                                    }
                                } else if (0 === this.loc) {
                                    if (j = a.pointOnPath(this.loc), i = a.pointAlongPathFrom(this.loc, this.length), h = c.pointOnLine(j, i, this.length), -1 == e) {
                                        var p = j;
                                        j = h,
                                                h = p
                                    }
                                } else
                                    h = a.pointAlongPathFrom(this.loc, e * this.length / 2),
                                            i = a.pointOnPath(this.loc),
                                            j = c.pointOnLine(h, i, this.length);
                                k = c.perpendicularLineTo(h, j, this.width),
                                        l = c.pointOnLine(h, j, g * this.length);
                                var q = {hxy: h, tail: k, cxy: l},
                                r = f.strokeStyle || d.strokeStyle,
                                        s = f.fillStyle || d.strokeStyle,
                                        t = f.lineWidth || d.lineWidth;
                                return{
                                    component: a, d: q, lineWidth: t,
                                    strokeStyle: r, fillStyle: s,
                                    minX: Math.min(h.x, k[0].x, k[1].x),
                                    maxX: Math.max(h.x, k[0].x, k[1].x),
                                    minY: Math.min(h.y, k[0].y, k[1].y),
                                    maxY: Math.max(h.y, k[0].y, k[1].y)
                                }
                            }
                            return{component: a, minX: 0, maxX: 0, minY: 0, maxY: 0}
                        }
            },
                    jsPlumbUtil.extend(jsPlumb.Overlays.Arrow, d),
                    jsPlumb.Overlays.PlainArrow = function (a) {
                        a = a || {};
                        var b = jsPlumb.extend(a, {foldback: 1});
                        jsPlumb.Overlays.Arrow.call(this, b),
                                this.type = "PlainArrow"
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.PlainArrow, jsPlumb.Overlays.Arrow),
                    jsPlumb.Overlays.Diamond = function (a) {
                        a = a || {};
                        var b = a.length || 40,
                                c = jsPlumb.extend(a, {length: b / 2, foldback: 2});
                        jsPlumb.Overlays.Arrow.call(this, c),
                                this.type = "Diamond"
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.Diamond, jsPlumb.Overlays.Arrow);
            var e = function (a, b) {
                return(null == a._jsPlumb.cachedDimensions || b) && (a._jsPlumb.cachedDimensions = a.getDimensions()), a._jsPlumb.cachedDimensions
            },
                    f = function (a) {
                        jsPlumb.jsPlumbUIComponent.apply(this, arguments),
                                d.apply(this, arguments);
                        var b = this.fire;
                        this.fire = function () {
                            b.apply(this, arguments),
                                    this.component && this.component.fire.apply(this.component, arguments)
                        },
                                this.id = a.id,
                                this._jsPlumb.div = null,
                                this._jsPlumb.initialised = !1,
                                this._jsPlumb.component = a.component,
                                this._jsPlumb.cachedDimensions = null,
                                this._jsPlumb.create = a.create,
                                this._jsPlumb.initiallyInvisible = a.visible === !1,
                                this.getElement = function () {
                                    if (null == this._jsPlumb.div) {
                                        var b = this._jsPlumb.div = jsPlumb.getDOMElement(this._jsPlumb.create(this._jsPlumb.component));
                                        b.style.position = "absolute",
                                                b.className = this._jsPlumb.instance.overlayClass + " " + (this.cssClass ? this.cssClass : a.cssClass ? a.cssClass : ""),
                                                this._jsPlumb.instance.appendElement(b),
                                                this._jsPlumb.instance.getId(b),
                                                this.canvas = b;
                                        var c = "translate(-50%, -50%)";
                                        b.style.webkitTransform = c,
                                                b.style.mozTransform = c,
                                                b.style.msTransform = c,
                                                b.style.oTransform = c,
                                                b.style.transform = c,
                                                b._jsPlumb = this,
                                                a.visible === !1 && (b.style.display = "none")
                                    }
                                    return this._jsPlumb.div
                                },
                                this.draw = function (a, b, c) {
                                    var d = e(this);
                                    if (null != d && 2 == d.length) {
                                        var f = {x: 0, y: 0};
                                        if (c)
                                            f = {x: c[0], y: c[1]};
                                        else if (a.pointOnPath) {
                                            var g = this.loc, h = !1;
                                            (jsPlumbUtil.isString(this.loc) || this.loc < 0 || this.loc > 1) && (g = parseInt(this.loc, 10), h = !0), f = a.pointOnPath(g, h)
                                        } else {
                                            var i = this.loc.constructor == Array ? this.loc : this.endpointLoc;
                                            f = {x: i[0] * a.w, y: i[1] * a.h}
                                        }
                                        var j = f.x - d[0] / 2, k = f.y - d[1] / 2;
                                        return{component: a, d: {minx: j, miny: k, td: d, cxy: f}, minX: j, maxX: j + d[0], minY: k, maxY: k + d[1]}
                                    }
                                    return{minX: 0, maxX: 0, minY: 0, maxY: 0}
                                }
                    };
            jsPlumbUtil.extend(f,
                    [jsPlumb.jsPlumbUIComponent, d],
                    {
                        getDimensions: function () {
                            return jsPlumbUtil.oldIE ? jsPlumb.getSize(this.getElement()) : [1, 1]
                        },
                        setVisible: function (a) {
                            this._jsPlumb.div.style.display = a ? "block" : "none",
                                    a && this._jsPlumb.initiallyInvisible && (
                                            e(this, !0),
                                            this.component.repaint(),
                                            this._jsPlumb.initiallyInvisible = !1
                                            )
                        },
                        clearCachedDimensions: function () {
                            this._jsPlumb.cachedDimensions = null
                        },
                        cleanup: function () {
                            null != this._jsPlumb.div && (
                                    this._jsPlumb.div._jsPlumb = null,
                                    this._jsPlumb.instance.removeElement(this._jsPlumb.div)
                                    )
                        },
                        computeMaxSize: function () {
                            var a = e(this);
                            return Math.max(a[0], a[1])
                        },
                        paint: function (a) {
                            this._jsPlumb.initialised || (
                                    this.getElement(),
                                    a.component.appendDisplayElement(this._jsPlumb.div),
                                    this._jsPlumb.initialised = !0),
                                    this._jsPlumb.div.style.left = a.component.x + a.d.minx + "px",
                                    this._jsPlumb.div.style.top = a.component.y + a.d.miny + "px"
                        }}),
                    jsPlumb.Overlays.Custom = function () {
                        this.type = "Custom",
                                f.apply(this, arguments)
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.Custom, f),
                    jsPlumb.Overlays.GuideLines = function () {
                        var a = this;
                        a.length = 50,
                                a.lineWidth = 5,
                                this.type = "GuideLines",
                                d.apply(this, arguments),
                                jsPlumb.jsPlumbUIComponent.apply(this, arguments),
                                this.draw = function (b) {
                                    var c = b.pointAlongPathFrom(a.loc, a.length / 2),
                                            d = b.pointOnPath(a.loc),
                                            e = Biltong.pointOnLine(c, d, a.length),
                                            f = Biltong.perpendicularLineTo(c, e, 40),
                                            g = Biltong.perpendicularLineTo(e, c, 20);
                                    return{
                                        connector: b, head: c, tail: e,
                                        headLine: g, tailLine: f,
                                        minX: Math.min(c.x, e.x, g[0].x, g[1].x),
                                        minY: Math.min(c.y, e.y, g[0].y, g[1].y),
                                        maxX: Math.max(c.x, e.x, g[0].x, g[1].x),
                                        maxY: Math.max(c.y, e.y, g[0].y, g[1].y)
                                    }
                                }
                    },
                    jsPlumb.Overlays.Label = function (a) {
                        this.labelStyle = a.labelStyle,
                                this.cssClass = null != this.labelStyle ? this.labelStyle.cssClass : null;
                        var b = jsPlumb.extend({
                            create: function () {
                                return document.createElement("div")
                            }
                        }, a);
                        if (jsPlumb.Overlays.Custom.call(this, b), this.type = "Label", this.label = a.label || "", this.labelText = null, this.labelStyle)
                        {
                            var c = this.getElement();
                            if (this.labelStyle.font = this.labelStyle.font || "12px sans-serif",
                                    c.style.font = this.labelStyle.font,
                                    c.style.color = this.labelStyle.color || "black",
                                    this.labelStyle.fillStyle && (c.style.background = this.labelStyle.fillStyle), this.labelStyle.borderWidth > 0) {
                                var d = this.labelStyle.borderStyle ? this.labelStyle.borderStyle : "black";
                                c.style.border = this.labelStyle.borderWidth + "px solid " + d
                            }
                            this.labelStyle.padding && (c.style.padding = this.labelStyle.padding)
                        }
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.Label,
                            jsPlumb.Overlays.Custom,
                            {
                                cleanup: function () {
                                    this.div = null,
                                            this.label = null,
                                            this.labelText = null,
                                            this.cssClass = null,
                                            this.labelStyle = null
                                },
                                getLabel: function () {
                                    return this.label
                                },
                                setLabel: function (a) {
                                    this.label = a, this.labelText = null, this.clearCachedDimensions(), this.update(), this.component.repaint()
                                },
                                getDimensions: function () {
                                    return this.update(), f.prototype.getDimensions.apply(this, arguments)
                                },
                                update: function () {
                                    if ("function" == typeof this.label) {
                                        var a = this.label(this);
                                        this.getElement().innerHTML = a.replace(/\r\n/g, "<br/>")
                                    } else
                                        null == this.labelText && (
                                                this.labelText = this.label,
                                                this.getElement().innerHTML = this.labelText.replace(/\r\n/g, "<br/>")
                                                )
                                }})
        }(),
        function () {
            "use strict";
            var a = function (a) {
                var b = a._mottle;
                return b || (b = a._mottle = new Mottle),
                        b
            };
            jsPlumb.extend(jsPlumbInstance.prototype,
                    {
                        getEventManager: function () {
                            return a(this)
                        },
                        on: function () {
                            this.getEventManager().on.apply(this, arguments)
                        },
                        off: function () {
                            this.getEventManager().off.apply(this, arguments)
                        }
                    }
            )
        }.call(this),
        function () {
            "use strict";
            var a = function (a) {
                this.type = "Flowchart",
                        a = a || {},
                        a.stub = null == a.stub ? 30 : a.stub;
                var b,
                        c = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                        d = null == a.midpoint ? .5 : a.midpoint,
                        e = [],
                        f = (a.grid, a.alwaysRespectStubs),
                        g = null,
                        h = null,
                        i = null,
                        j = null != a.cornerRadius ? a.cornerRadius : 0,
                        k = function (a) {
                            return 0 > a ? -1 : 0 === a ? 0 : 1
                        },
                        l = function (a, b, c, d) {
                            if (h != b || i != c) {
                                var e = null == h ? d.sx : h,
                                        f = null == i ? d.sy : i,
                                        g = e == b ? "v" : "h",
                                        j = k(b - e),
                                        l = k(c - f);
                                h = b,
                                        i = c,
                                        a.push([e, f, b, c, g, j, l])
                            }
                        },
                        m = function (a) {
                            return Math.sqrt(Math.pow(a[0] - a[2], 2) + Math.pow(a[1] - a[3], 2))
                        },
                        n = function (a) {
                            var b = [];
                            return b.push.apply(b, a), b
                        },
                        o = function (a, b, d) {
                            for (var e, f, g = 0; g < b.length - 1; g++) {
                                if (e = e || n(b[g]), f = n(b[g + 1]), j > 0 && e[4] != f[4]) {
                                    var h = Math.min(j, m(e), m(f));
                                    e[2] -= e[5] * h,
                                            e[3] -= e[6] * h,
                                            f[0] += f[5] * h,
                                            f[1] += f[6] * h;
                                    var i = e[6] == f[5] && 1 == f[5] || e[6] == f[5] && 0 === f[5] && e[5] != f[6] || e[6] == f[5] && -1 == f[5],
                                            k = f[1] > e[3] ? 1 : -1,
                                            l = f[0] > e[2] ? 1 : -1, o = k == l,
                                            p = o && i || !o && !i ? f[0] : e[2],
                                            q = o && i || !o && !i ? e[3] : f[1];
                                    c.addSegment(a, "Straight",
                                            {x1: e[0], y1: e[1], x2: e[2], y2: e[3]}
                                    ),
                                            c.addSegment(a, "Arc",
                                                    {r: h, x1: e[2], y1: e[3], x2: f[0], y2: f[1], cx: p, cy: q, ac: i}
                                            )
                                } else {
                                    var r = e[2] == e[0] ? 0 : e[2] > e[0] ? d.lw / 2 : -(d.lw / 2),
                                            s = e[3] == e[1] ? 0 : e[3] > e[1] ? d.lw / 2 : -(d.lw / 2);
                                    c.addSegment(a, "Straight",
                                            {x1: e[0] - r, y1: e[1] - s, x2: e[2] + r, y2: e[3] + s}
                                    )
                                }
                                e = f
                            }
                            null != f && c.addSegment(a, "Straight", {x1: f[0], y1: f[1], x2: f[2], y2: f[3]}
                            )
                        };
                this.setSegments = function (a) {
                    g = a
                },
                        this.isEditable = function () {
                            return!0
                        },
                        this.getOriginalSegments = function () {
                            return g || e
                        },
                        this._compute = function (a, j) {
                            if (j.clearEdits && (g = null), null != g)
                                return o(this, g, a), void 0;
                            e = [], h = null, i = null, b = null;
                            var k = a.startStubX + (a.endStubX - a.startStubX) * d,
                                    m = a.startStubY + (a.endStubY - a.startStubY) * d,
                                    n = {x: [0, 1], y: [1, 0]},
                            p = function () {
                                return[a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                            },
                                    q = {
                                        perpendicular: p,
                                        orthogonal: p,
                                        opposite: function (b) {
                                            var c = a,
                                                    d = "x" == b ? 0 : 1,
                                                    e = {
                                                        x: function () {
                                                            return 1 == c.so[d] && (c.startStubX > c.endStubX && c.tx > c.startStubX || c.sx > c.endStubX && c.tx > c.sx) || -1 == c.so[d] && (c.startStubX < c.endStubX && c.tx < c.startStubX || c.sx < c.endStubX && c.tx < c.sx)
                                                        },
                                                        y: function () {
                                                            return 1 == c.so[d] && (c.startStubY > c.endStubY && c.ty > c.startStubY || c.sy > c.endStubY && c.ty > c.sy) || -1 == c.so[d] && (c.startStubY < c.endStubY && c.ty < c.startStubY || c.sy < c.endStubY && c.ty < c.sy)
                                                        }};
                                            return!f && e[b]() ? {
                                                x: [(a.sx + a.tx) / 2,
                                                    a.startStubY,
                                                    (a.sx + a.tx) / 2,
                                                    a.endStubY],
                                                y: [a.startStubX,
                                                    (a.sy + a.ty) / 2,
                                                    a.endStubX,
                                                    (a.sy + a.ty) / 2]
                                            }[b] : [a.startStubX, a.startStubY, a.endStubX, a.endStubY]
                                        }
                                    },
                            r = {
                                perpendicular: function (b) {
                                    var c = a,
                                            d = {
                                                x: [
                                                    [
                                                        [1, 2, 3, 4],
                                                        null,
                                                        [2, 1, 4, 3]
                                                    ],
                                                    null,
                                                    [
                                                        [4, 3, 2, 1],
                                                        null,
                                                        [3, 4, 1, 2]
                                                    ]
                                                ],
                                                y: [
                                                    [
                                                        [3, 2, 1, 4],
                                                        null,
                                                        [2, 3, 4, 1]
                                                    ],
                                                    null,
                                                    [
                                                        [4, 1, 2, 3],
                                                        null,
                                                        [1, 4, 3, 2]
                                                    ]
                                                ]
                                            },
                                    e = {
                                        x: [
                                            [c.startStubX, c.endStubX],
                                            null,
                                            [c.endStubX, c.startStubX]
                                        ],
                                        y: [
                                            [c.startStubY, c.endStubY],
                                            null,
                                            [c.endStubY, c.startStubY]
                                        ]
                                    },
                                    f = {
                                        x: [[k, c.startStubY], [k, c.endStubY]],
                                        y: [[c.startStubX, m], [c.endStubX, m]]
                                    },
                                    g = {
                                        x: [[c.endStubX, c.startStubY]],
                                        y: [[c.startStubX, c.endStubY]]
                                    },
                                    h = {
                                        x: [[c.startStubX, c.endStubY], [c.endStubX, c.endStubY]],
                                        y: [[c.endStubX, c.startStubY], [c.endStubX, c.endStubY]]
                                    },
                                    i = {
                                        x: [[c.startStubX, m], [c.endStubX, m], [c.endStubX, c.endStubY]],
                                        y: [[k, c.startStubY], [k, c.endStubY], [c.endStubX, c.endStubY]]},
                                    j = {
                                        x: [c.startStubY, c.endStubY],
                                        y: [c.startStubX, c.endStubX]
                                    },
                                    l = n[b][0],
                                            o = n[b][1],
                                            p = c.so[l] + 1,
                                            q = c.to[o] + 1,
                                            r = -1 == c.to[o] && j[b][1] < j[b][0] || 1 == c.to[o] && j[b][1] > j[b][0],
                                            s = e[b][p][0],
                                            t = e[b][p][1],
                                            u = d[b][p][q];
                                    return c.segment == u[3] || c.segment == u[2] && r ? f[b] : c.segment == u[2] && s > t ? g[b] : c.segment == u[2] && t >= s || c.segment == u[1] && !r ? i[b] : c.segment == u[0] || c.segment == u[1] && r ? h[b] : void 0
                                },
                                orthogonal: function (b, c, d, e, f) {
                                    var g = a,
                                            h = {
                                                x: -1 == g.so[0] ? Math.min(c, e) : Math.max(c, e),
                                                y: -1 == g.so[1] ? Math.min(c, e) : Math.max(c, e)
                                            }[b];
                                    return{
                                        x: [
                                            [h, d], [h, f], [e, f]
                                        ],
                                        y: [
                                            [d, h], [f, h], [f, e]
                                        ]
                                    }
                                    [b]
                                },
                                opposite: function (b, d, e, f) {
                                    var g = a,
                                            h = {x: "y", y: "x"}
                                    [b],
                                            i = {x: "height", y: "width"}
                                    [b],
                                            l = g["is" + b.toUpperCase() + "GreaterThanStubTimes2"];
                                    if (j.sourceEndpoint.elementId == j.targetEndpoint.elementId) {
                                        var n = e + (1 - j.sourceEndpoint.anchor[h]) * j.sourceInfo[i] + c.maxStub;
                                        return{
                                            x: [
                                                [d, n], [f, n]
                                            ],
                                            y: [
                                                [n, d], [n, f]
                                            ]
                                        }
                                        [b]
                                    }
                                    return!l || 1 == g.so[t] && d > f || -1 == g.so[t] && f > d ? {
                                        x: [
                                            [d, m],
                                            [f, m]
                                        ],
                                        y: [
                                            [k, d], [k, f]
                                        ]
                                    }[b] : 1 == g.so[t] && f > d || -1 == g.so[t] && d > f ? {
                                        x: [
                                            [k, g.sy], [k, g.ty]
                                        ],
                                        y: [
                                            [g.sx, m], [g.tx, m]
                                        ]
                                    }[b] : void 0
                                }
                            },
                            s = q[a.anchorOrientation](a.sourceAxis),
                                    t = "x" == a.sourceAxis ? 0 : 1,
                                    u = "x" == a.sourceAxis ? 1 : 0,
                                    v = s[t],
                                    w = s[u],
                                    x = s[t + 2],
                                    y = s[u + 2];
                            l(e, s[0], s[1], a);
                            var z = r[a.anchorOrientation](a.sourceAxis, v, w, x, y);
                            if (z)
                                for (var A = 0; A < z.length; A++)
                                    l(e, z[A][0], z[A][1], a);
                            l(e, s[2], s[3], a),
                                    l(e, a.tx, a.ty, a),
                                    o(this, e, a)
                        },
                        this.getPath = function () {
                            for (var a = null, b = null, c = [], d = g || e, f = 0; f < d.length; f++) {
                                var h = d[f],
                                        i = h[4],
                                        j = "v" == i ? 3 : 2;
                                null != a && b === i ? a[j] = h[j] : (h[0] != h[2] || h[1] != h[3]) && (
                                        c.push({
                                            start: [h[0], h[1]],
                                            end: [h[2], h[3]]}),
                                        a = h, b = h[4]
                                        )
                            }
                            return c
                        },
                        this.setPath = function (a) {
                            g = [];
                            for (var b = 0; b < a.length; b++) {
                                var c = a[b].start[0],
                                        d = a[b].start[1],
                                        e = a[b].end[0],
                                        f = a[b].end[1],
                                        h = c == e ? "v" : "h",
                                        i = k(e - c),
                                        j = k(f - d);
                                g.push([c, d, e, f, h, i, j])
                            }
                        }
            };
            jsPlumbUtil.extend(a, jsPlumb.Connectors.AbstractConnector), jsPlumb.registerConnectorType(a, "Flowchart")
        }(),
        function () {
            "use strict";
            var a = function (a, b, c, d) {
                return c >= a && b >= d ? 1 : c >= a && d >= b ? 2 : a >= c && d >= b ? 3 : 4
            }, b = function (a, b, c, d, e, f, g, h, i) {
                return i >= h ? [a, b] : 1 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 2 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] >= 1 && e[2] <= 0 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + 1 * f, b + -1 * g] : 3 === c ? d[3] >= 1 && e[3] <= 0 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + -1 * f, b + -1 * g] : 4 === c ? d[3] <= 0 && e[3] >= 1 ? [a + (d[2] < .5 ? -1 * f : f), b] : d[2] <= 0 && e[2] >= 1 ? [a, b + (d[3] < .5 ? -1 * g : g)] : [a + 1 * f, b + -1 * g] : void 0
            }, c = function (c) {
                c = c || {},
                        this.type = "StateMachine";
                var d = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                        e = c.curviness || 10,
                        f = c.margin || 5,
                        g = c.proximityLimit || 80,
                        h = c.orientation && "clockwise" === c.orientation,
                        i = c.loopbackRadius || 25,
                        j = c.showLoopback !== !1;
                this._compute = function (c, k) {
                    var l = Math.abs(k.sourcePos[0] - k.targetPos[0]),
                            m = Math.abs(k.sourcePos[1] - k.targetPos[1]);
                    if (Math.min(k.sourcePos[0], k.targetPos[0]),
                            Math.min(k.sourcePos[1], k.targetPos[1]),
                            j && k.sourceEndpoint.elementId === k.targetEndpoint.elementId) {
                        var n = k.sourcePos[0],
                                o = (k.sourcePos[0],
                                        k.sourcePos[1] - f),
                                p = (k.sourcePos[1] - f, n),
                                q = o - i, r = 2 * i,
                                s = 2 * i,
                                t = p - i,
                                u = q - i;
                        c.points[0] = t,
                                c.points[1] = u,
                                c.points[2] = r,
                                c.points[3] = s,
                                d.addSegment(this, "Arc", {
                                    loopback: !0,
                                    x1: n - t + 4,
                                    y1: o - u,
                                    startAngle: 0,
                                    endAngle: 2 * Math.PI, r: i,
                                    ac: !h, x2: n - t - 4,
                                    y2: o - u,
                                    cx: p - t, cy: q - u
                                })
                    } else {
                        var v = k.sourcePos[0] < k.targetPos[0] ? 0 : l,
                                w = k.sourcePos[1] < k.targetPos[1] ? 0 : m,
                                x = k.sourcePos[0] < k.targetPos[0] ? l : 0,
                                y = k.sourcePos[1] < k.targetPos[1] ? m : 0;
                        0 === k.sourcePos[2] && (v -= f),
                                1 === k.sourcePos[2] && (v += f),
                                0 === k.sourcePos[3] && (w -= f),
                                1 === k.sourcePos[3] && (w += f),
                                0 === k.targetPos[2] && (x -= f),
                                1 === k.targetPos[2] && (x += f),
                                0 === k.targetPos[3] && (y -= f),
                                1 === k.targetPos[3] && (y += f);
                        var z = (v + x) / 2,
                                A = (w + y) / 2,
                                B = -1 * z / A,
                                C = Math.atan(B),
                                D = (1 / 0 == B || B == -1 / 0 ? 0 : Math.abs(e / 2 * Math.sin(C)),
                                        1 / 0 == B || B == -1 / 0 ? 0 : Math.abs(e / 2 * Math.cos(C)),
                                        a(v, w, x, y)),
                                E = Math.sqrt(Math.pow(x - v, 2) + Math.pow(y - w, 2)),
                                F = b(z, A, D, k.sourcePos, k.targetPos, e, e, E, g);
                        d.addSegment(this, "Bezier", {x1: x, y1: y, x2: v, y2: w, cp1x: F[0], cp1y: F[1], cp2x: F[0], cp2y: F[1]}
                        )
                    }
                }
            };
            jsPlumb.registerConnectorType(c, "StateMachine")
        }(),
        function () {
            var a = function (a) {
                a = a || {};
                var b = jsPlumb.Connectors.AbstractConnector.apply(this, arguments),
                        c = (a.stub || 50, a.curviness || 150),
                        d = 10;
                this.type = "Bezier",
                        this.getCurviness = function () {
                            return c
                        },
                        this._findControlPoint = function (a, b, e, f, g) {
                            var h = f.anchor.getOrientation(f), i = g.anchor.getOrientation(g), j = h[0] != i[0] || h[1] == i[1], k = [];
                            return j ? (0 === i[0] ? k.push(e[0] < b[0] ? a[0] + d : a[0] - d) : k.push(a[0] + c * i[0]), 0 === i[1] ? k.push(e[1] < b[1] ? a[1] + d : a[1] - d) : k.push(a[1] + c * h[1])) : (0 === h[0] ? k.push(b[0] < e[0] ? a[0] + d : a[0] - d) : k.push(a[0] - c * h[0]), 0 === h[1] ? k.push(b[1] < e[1] ? a[1] + d : a[1] - d) : k.push(a[1] + c * i[1])), k
                        },
                        this._compute = function (a, c) {
                            var d = c.sourcePos,
                                    e = c.targetPos,
                                    f = Math.abs(d[0] - e[0]),
                                    g = Math.abs(d[1] - e[1]),
                                    h = d[0] < e[0] ? f : 0,
                                    i = d[1] < e[1] ? g : 0,
                                    j = d[0] < e[0] ? 0 : f,
                                    k = d[1] < e[1] ? 0 : g,
                                    l = this._findControlPoint([h, i], d, e, c.sourceEndpoint, c.targetEndpoint, a.so, a.to),
                                    m = this._findControlPoint([j, k], e, d, c.targetEndpoint, c.sourceEndpoint, a.so, a.to);
                            b.addSegment(this, "Bezier", {x1: h, y1: i, x2: j, y2: k, cp1x: l[0], cp1y: l[1], cp2x: m[0], cp2y: m[1]})
                        }
            };
            jsPlumbUtil.extend(a, jsPlumb.Connectors.AbstractConnector), jsPlumb.registerConnectorType(a, "Bezier")
        }(),
        function () {
            "use strict";
            var a = {
                joinstyle: "stroke-linejoin",
                "stroke-linejoin": "stroke-linejoin",
                "stroke-dashoffset": "stroke-dashoffset",
                "stroke-linecap": "stroke-linecap"
            },
            b = "stroke-dasharray",
                    c = "dashstyle",
                    d = "linearGradient",
                    e = "radialGradient", f = "defs", g = "fill",
                    h = "stop",
                    i = "stroke", j = "stroke-width",
                    k = "style",
                    l = "none",
                    m = "jsplumb_gradient_",
                    n = "lineWidth",
                    o = {svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml"},
            p = function (a, b) {
                for (var c in b) {
                	a.setAttribute(c, "" + b[c])
                }
            },
                    q = function (a, b) {
                        var c = document.createElementNS(o.svg, a);
                        return b = b || {},
                                b.version = "1.1",
                                b.xmlns = o.xhtml,
                                p(c, b),
                                c
                    },
                    r = function (a) {
                        return"position:absolute;left:" + a[0] + "px;top:" + a[1] + "px"
                    },
                    s = function (a) {
                        for (var b = 0; b < a.childNodes.length; b++)
                            (a.childNodes[b].tagName == f || a.childNodes[b].tagName == d || a.childNodes[b].tagName == e) && a.removeChild(a.childNodes[b])
                    },
                    t = function (a, b, c, j, k) {
                        var l = m + k._jsPlumb.instance.idstamp();
                        s(a);
                        var n;
                        n = c.gradient.offset ? q(e, {id: l}) : q(d, {id: l, gradientUnits: "userSpaceOnUse"});
                        var o = q(f);
                        a.appendChild(o), o.appendChild(n);
                        for (var p = 0; p < c.gradient.stops.length; p++) {
                            var r = 1 == k.segment || 2 == k.segment ? p : c.gradient.stops.length - 1 - p,
                                    t = jsPlumbUtil.convertStyle(c.gradient.stops[r][1], !0),
                                    u = q(h, {offset: Math.floor(100 * c.gradient.stops[p][0]) + "%", "stop-color": t});
                            n.appendChild(u)
                        }
                        var v = c.strokeStyle ? i : g;
                        b.setAttribute(v, "url(#" + l + ")")
                    },
                    u = function (d, e, f, h, m) {
                        if (
                                e.setAttribute(g, f.fillStyle ? jsPlumbUtil.convertStyle(f.fillStyle, !0) : l),
                                e.setAttribute(i, f.strokeStyle ? jsPlumbUtil.convertStyle(f.strokeStyle, !0) : l),
                                f.gradient ? t(d, e, f, h, m) : (s(d), e.setAttribute(k, "")),
                                f.lineWidth && e.setAttribute(j, f.lineWidth),
                                f[c] && f[n] && !f[b]
                                ) {
                            var o = -1 == f[c].indexOf(",") ? " " : ",", p = f[c].split(o), q = "";
                            p.forEach(function (a) {
                                q += Math.floor(a * f.lineWidth) + o
                            }), e.setAttribute(b, q)
                        } else
                            f[b] && e.setAttribute(b, f[b]);
                        for (var r in a)
                            f[r] && e.setAttribute(a[r], f[r])
                    }, v = function (a, b, c) {
                a.childNodes.length > c ? a.insertBefore(b, a.childNodes[c]) : a.appendChild(b)
            };
            jsPlumbUtil.svg = {node: q, attr: p, pos: r};
            var w = function (a) {
                var b = a.pointerEventsSpec || "all", c = {};
                jsPlumb.jsPlumbUIComponent.apply(this, a.originalArgs),
                        this.canvas = null,
                        this.path = null,
                        this.svg = null,
                        this.bgCanvas = null;
                var d = a.cssClass + " " + (a.originalArgs[0].cssClass || ""),
                        e = {style: "", width: 0, height: 0, "pointer-events": b, position: "absolute"};
                this.svg = q("svg", e), a.useDivWrapper ? (
                        this.canvas = document.createElement("div"),
                        this.canvas.style.position = "absolute",
                        jsPlumbUtil.sizeElement(this.canvas, 0, 0, 1, 1),
                        this.canvas.className = d) : (p(this.svg, {"class": d}),
                        this.canvas = this.svg),
                        a._jsPlumb.appendElement(this.canvas, a.originalArgs[0].parent),
                        a.useDivWrapper && this.canvas.appendChild(this.svg);
                var f = [this.canvas];
                return this.getDisplayElements = function () {
                    return f
                },
                        this.appendDisplayElement = function (a) {
                            f.push(a)
                        },
                        this.paint = function (b, d, e) {
                            if (null != b) {
                                var f, g = [this.x, this.y], h = [this.w, this.h];
                                null != e && (e.xmin < 0 && (g[0] += e.xmin),
                                        e.ymin < 0 && (g[1] += e.ymin),
                                        h[0] = e.xmax + (e.xmin < 0 ? -e.xmin : 0),
                                        h[1] = e.ymax + (e.ymin < 0 ? -e.ymin : 0)),
                                        a.useDivWrapper ? (jsPlumbUtil.sizeElement(this.canvas, g[0],
                                                g[1], h[0], h[1]),
                                                g[0] = 0, g[1] = 0,
                                                f = r([0, 0])) : f = r([g[0], g[1]]),
                                        c.paint.apply(this, arguments),
                                        p(this.svg,
                                                {style: f, width: h[0], height: h[1]}
                                        )
                            }
                        }, {renderer: c}
            };
            jsPlumbUtil.extend(w,
                    jsPlumb.jsPlumbUIComponent, {
                        cleanup: function () {
                            this.canvas && (this.canvas._jsPlumb = null),
                                    this.svg && (this.svg._jsPlumb = null),
                                    this.bgCanvas && (this.bgCanvas._jsPlumb = null),
                                    this.canvas && this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas),
                                    this.bgCanvas && this.bgCanvas.parentNode && this.canvas.parentNode.removeChild(this.canvas),
                                    this.svg = null,
                                    this.canvas = null,
                                    this.path = null,
                                    this.group = null
                        },
                        setVisible: function (a) {
                            this.canvas && (this.canvas.style.display = a ? "block" : "none")
                        }
                    }),
                    jsPlumb.ConnectorRenderers.svg = function (a) {
                        var b = this,
                                c = w.apply(this,
                                        [{cssClass: a._jsPlumb.connectorClass,
                                                originalArgs: arguments,
                                                pointerEventsSpec: "none",
                                                _jsPlumb: a._jsPlumb
                                            }]
                                        );
                        c.renderer.paint = function (c, d, e) {
                            var f = b.getSegments(), g = "", h = [0, 0];
                            if (e.xmin < 0 && (h[0] = -e.xmin), e.ymin < 0 && (h[1] = -e.ymin), f.length > 0) {
                                for (var i = 0; i < f.length; i++)
                                    g += jsPlumb.Segments.svg.SegmentRenderer.getPath(f[i]),
                                            g += " ";
                                var j = {
                                    d: g,
                                    transform: "translate(" + h[0] + "," + h[1] + ")",
                                    "pointer-events": a["pointer-events"] || "visibleStroke"},
                                k = null, l = [b.x, b.y, b.w, b.h];
                                if (c.outlineColor) {
                                    var m = c.outlineWidth || 1, n = c.lineWidth + 2 * m;
                                    k = jsPlumb.extend({}, c),
                                            delete k.gradient,
                                            k.strokeStyle = jsPlumbUtil.convertStyle(c.outlineColor),
                                            k.lineWidth = n, null == b.bgPath ? (b.bgPath = q("path", j),
                                                    v(b.svg, b.bgPath, 0)) : p(b.bgPath, j),
                                            u(b.svg, b.bgPath, k, l, b)
                                }
                                null == b.path ? (b.path = q("path", j),
                                        v(b.svg, b.path, c.outlineColor ? 1 : 0)) : p(b.path, j),
                                        u(b.svg, b.path, c, l, b)
                            }
                        }
                    },
                    jsPlumbUtil.extend(jsPlumb.ConnectorRenderers.svg, w),
                    jsPlumb.Segments.svg = {
                        SegmentRenderer: {
                            getPath: function (a) {
                                return{Straight: function () {
                                        var b = a.getCoordinates();
                                        return"M " + b.x1 + " " + b.y1 + " L " + b.x2 + " " + b.y2
                                    }, Bezier: function () {
                                        var b = a.params;
                                        return"M " + b.x1 + " " + b.y1 + " C " + b.cp1x + " " + b.cp1y + " " + b.cp2x + " " + b.cp2y + " " + b.x2 + " " + b.y2
                                    }, Arc: function () {
                                        var b = a.params, c = a.sweep > Math.PI ? 1 : 0, d = a.anticlockwise ? 0 : 1;
                                        return"M" + a.x1 + " " + a.y1 + " A " + a.radius + " " + b.r + " 0 " + c + "," + d + " " + a.x2 + " " + a.y2
                                    }
                                }[a.type]()
                            }
                        }
                    };
            var x = window.SvgEndpoint = function (a) {
                var b = w.apply(this, [
                    {
                        cssClass: a._jsPlumb.endpointClass,
                        originalArgs: arguments,
                        pointerEventsSpec: "all",
                        useDivWrapper: !0,
                        _jsPlumb: a._jsPlumb
                    }
                ]);
                b.renderer.paint = function (a) {
                    var b = jsPlumb.extend({}, a);
                    b.outlineColor && (
                            b.strokeWidth = b.outlineWidth,
                            b.strokeStyle = jsPlumbUtil.convertStyle(b.outlineColor, !0)
                            ),
                            null == this.node ? (this.node = this.makeNode(b), this.svg.appendChild(this.node)) : null != this.updateNode && this.updateNode(this.node),
                            u(this.svg, this.node, b, [this.x, this.y, this.w, this.h], this),
                            r(this.node, [this.x, this.y])
                }.bind(this)
            };
            jsPlumbUtil.extend(x, w),
                    jsPlumb.Endpoints.svg.Dot = function () {
                        jsPlumb.Endpoints.Dot.apply(this, arguments),
                                x.apply(this, arguments),
                                this.makeNode = function () {
                                    return q("circle", {cx: this.w / 2, cy: this.h / 2, r: this.radius})
                                },
                                this.updateNode = function (a) {
                                    p(a, {cx: this.w / 2, cy: this.h / 2, r: this.radius})
                                }
                    }, jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Dot, [jsPlumb.Endpoints.Dot, x]),
                    jsPlumb.Endpoints.svg.Rectangle = function () {
                        jsPlumb.Endpoints.Rectangle.apply(this, arguments),
                                x.apply(this, arguments),
                                this.makeNode = function () {
                                    return q("rect", {width: this.w, height: this.h})
                                },
                                this.updateNode = function (a) {
                                    p(a, {width: this.w, height: this.h})
                                }
                    },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.svg.Rectangle, [jsPlumb.Endpoints.Rectangle, x]),
                    jsPlumb.Endpoints.svg.Image = jsPlumb.Endpoints.Image,
                    jsPlumb.Endpoints.svg.Blank = jsPlumb.Endpoints.Blank,
                    jsPlumb.Overlays.svg.Label = jsPlumb.Overlays.Label,
                    jsPlumb.Overlays.svg.Custom = jsPlumb.Overlays.Custom;
            var y = function (a, b) {
                a.apply(this, b),
                        jsPlumb.jsPlumbUIComponent.apply(this, b),
                        this.isAppendedAtTopLevel = !1,
                        this.path = null,
                        this.paint = function (a, d) {
                            if (a.component.svg && d) {
                                null == this.path && (this.path = q("path", {"pointer-events": "all"}),
                                        a.component.svg.appendChild(this.path),
                                        this.canvas = a.component.svg
                                        );
                                var e = b && 1 == b.length ? b[0].cssClass || "" : "",
                                        f = [0, 0];
                                d.xmin < 0 && (f[0] = -d.xmin),
                                        d.ymin < 0 && (f[1] = -d.ymin),
                                        p(
                                                this.path,
                                                {
                                                    d: c(a.d),
                                                    "class": e,
                                                    stroke: a.strokeStyle ? a.strokeStyle : null,
                                                    fill: a.fillStyle ? a.fillStyle : null,
                                                    transform: "translate(" + f[0] + "," + f[1] + ")"
                                                }
                                        )
                            }
                        };
                var c = function (a) {
                    return"M" + a.hxy.x + "," +
                            a.hxy.y + " L" + a.tail[0].x + "," +
                            a.tail[0].y + " L" + a.cxy.x + "," +
                            a.cxy.y + " L" + a.tail[1].x + "," +
                            a.tail[1].y + " L" + a.hxy.x + "," +
                            a.hxy.y
                }
            };
            jsPlumbUtil.extend(y, [jsPlumb.jsPlumbUIComponent, jsPlumb.Overlays.AbstractOverlay],
                    {
                        cleanup: function () {
                            null != this.path && this._jsPlumb.instance.removeElement(this.path)
                        },
                        setVisible: function (a) {
                            null != this.path && (this.path.style.display = a ? "block" : "none")
                        }
                    }
            ),
                    jsPlumb.Overlays.svg.Arrow = function () {
                        y.apply(this, [jsPlumb.Overlays.Arrow, arguments])
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.svg.Arrow, [jsPlumb.Overlays.Arrow, y]),
                    jsPlumb.Overlays.svg.PlainArrow = function () {
                        y.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.svg.PlainArrow, [jsPlumb.Overlays.PlainArrow, y]),
                    jsPlumb.Overlays.svg.Diamond = function () {
                        y.apply(this, [jsPlumb.Overlays.Diamond, arguments])
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.svg.Diamond, [jsPlumb.Overlays.Diamond, y]),
                    jsPlumb.Overlays.svg.GuideLines = function () {
                        var a, b, c = null, d = this;
                        jsPlumb.Overlays.GuideLines.apply(this, arguments),
                                this.paint = function (f, g) {
                                    null == c && (c = q("path"),
                                            f.connector.svg.appendChild(c),
                                            d.attachListeners(c, f.connector),
                                            d.attachListeners(c, d), a = q("path"),
                                            f.connector.svg.appendChild(a),
                                            d.attachListeners(a, f.connector), d.attachListeners(a, d), b = q("path"),
                                            f.connector.svg.appendChild(b),
                                            d.attachListeners(b, f.connector), d.attachListeners(b, d));
                                    var h = [0, 0];
                                    g.xmin < 0 && (h[0] = -g.xmin),
                                            g.ymin < 0 && (h[1] = -g.ymin),
                                            p(c,
                                                    {
                                                        d: e(f.head, f.tail),
                                                        stroke: "red",
                                                        fill: null,
                                                        transform: "translate(" + h[0] + "," + h[1] + ")"
                                                    }
                                            ),
                                            p(a,
                                                    {
                                                        d: e(f.tailLine[0], f.tailLine[1]),
                                                        stroke: "blue",
                                                        fill: null,
                                                        transform: "translate(" + h[0] + "," + h[1] + ")"
                                                    }
                                            ),
                                            p(b, {
                                                d: e(f.headLine[0], f.headLine[1]),
                                                stroke: "green",
                                                fill: null,
                                                transform: "translate(" + h[0] + "," + h[1] + ")"
                                            }
                                            )
                                };
                        var e = function (a, b) {
                            return"M " + a.x + "," +
                                    a.y + " L" + b.x + "," +
                                    b.y
                        }
                    },
                    jsPlumbUtil.extend(jsPlumb.Overlays.svg.GuideLines, jsPlumb.Overlays.GuideLines)
        }(),
        function () {
            "use strict";
            var a = {
                "stroke-linejoin": "joinstyle",
                joinstyle: "joinstyle",
                endcap: "endcap",
                miterlimit: "miterlimit"
            },
            b = null;
            if (document.createStyleSheet && document.namespaces) {
                var c = [".jsplumb_vml", "jsplumb\\:textbox", "jsplumb\\:oval", "jsplumb\\:rect", "jsplumb\\:stroke", "jsplumb\\:shape", "jsplumb\\:group"],
                        d = "behavior:url(#default#VML);position:absolute;";
                b = document.createStyleSheet();
                for (var e = 0; e < c.length; e++)
                    b.addRule(c[e], d);
                document.namespaces.add("jsplumb", "urn:schemas-microsoft-com:vml")
            }
            jsPlumb.vml = {};
            var f = 1e3, g = function (a, b) {
                for (var c in b)
                    a[c] = b[c]
            },
                    h = function (a, b, c, d, e, f) {
                        c = c || {};
                        var h = document.createElement("jsplumb:" + a);
                        return f ? e.appendElement(h, d) : d.appendChild(h),
                                h.className = (c["class"] ? c["class"] + " " : "") + "jsplumb_vml",
                                i(h, b), g(h, c), h
                    },
                    i = function (a, b, c) {
                        a.style.left = b[0] + "px",
                                a.style.top = b[1] + "px",
                                a.style.width = b[2] + "px",
                                a.style.height = b[3] + "px",
                                a.style.position = "absolute",
                                c && (a.style.zIndex = c)
                    },
                    j = jsPlumb.vml.convertValue = function (a) {
                        return Math.floor(a * f)
                    },
                    k = function (a, b, c, d) {
                        "transparent" === b ? d.setOpacity(c, "0.0") : d.setOpacity(c, "1.0")
                    },
                    l = function (a, b, c, d) {
                        var e = {};
                        if (b.strokeStyle) {
                            e.stroked = "true";
                            var f = jsPlumbUtil.convertStyle(b.strokeStyle, !0);
                            e.strokecolor = f, k(e, f, "stroke", c),
                                    e.strokeweight = b.lineWidth + "px"
                        } else
                            e.stroked = "false";
                        if (b.fillStyle) {
                            e.filled = "true";
                            var i = jsPlumbUtil.convertStyle(b.fillStyle, !0);
                            e.fillcolor = i, k(e, i, "fill", c)
                        } else
                            e.filled = "false";
                        if (b.dashstyle)
                            null == c.strokeNode ? c.strokeNode = h(
                                    "stroke", [0, 0, 0, 0], {dashstyle: b.dashstyle}, a, d
                                    ) : c.strokeNode.dashstyle = b.dashstyle;
                        else if (b["stroke-dasharray"] && b.lineWidth) {
                            for (var j = -1 == b["stroke-dasharray"].indexOf(",") ? " " : ",", l = b["stroke-dasharray"].split(j), m = "", n = 0; n < l.length; n++)
                                m += Math.floor(l[n] / b.lineWidth) + j;
                            null == c.strokeNode ? c.strokeNode = h(
                                    "stroke",
                                    [0, 0, 0, 0],
                                    {dashstyle: m},
                            a,
                                    d) : c.strokeNode.dashstyle = m
                        }
                        g(a, e)
                    },
                    m = function () {
                        var a = this;
                        jsPlumb.jsPlumbUIComponent.apply(this, arguments),
                                this.opacityNodes = {
                                    stroke: null,
                                    fill: null
                                },
                        this.initOpacityNodes = function (b) {
                            a.opacityNodes.stroke = h(
                                    "stroke",
                                    [0, 0, 1, 1],
                                    {opacity: "0.0"},
                            b,
                                    a._jsPlumb.instance
                                    ),
                                    a.opacityNodes.fill = h(
                                            "fill",
                                            [0, 0, 1, 1],
                                            {opacity: "0.0"},
                                    b,
                                            a._jsPlumb.instance
                                            )
                        },
                                this.setOpacity = function (b, c) {
                                    var d = a.opacityNodes[b];
                                    d && (d.opacity = "" + c)
                                };
                        var b = [];
                        this.getDisplayElements = function () {
                            return b
                        },
                                this.appendDisplayElement = function (c, d) {
                                    d || a.canvas.parentNode.appendChild(c), b.push(c)
                                }
                    };
            jsPlumbUtil.extend(
                    m,
                    jsPlumb.jsPlumbUIComponent, {
                        cleanup: function () {
                            this.bgCanvas && this.bgCanvas.parentNode.removeChild(this.bgCanvas),
                                    this.canvas && this.canvas.parentNode.removeChild(this.canvas)
                        }
                    }
            );
            var n = jsPlumb.ConnectorRenderers.vml = function (b, c) {
                this.strokeNode = null,
                        this.canvas = null,
                        m.apply(this, arguments);
                var d = this._jsPlumb.instance.connectorClass + (b.cssClass ? " " + b.cssClass : "");
                this.paint = function (e) {
                    if (null !== e) {
                        this.w = Math.max(this.w, 1),
                                this.h = Math.max(this.h, 1);
                        for (var j = this.getSegments(),
                                k = {path: ""},
                        m = [this.x, this.y, this.w, this.h],
                                n = 0; n < j.length; n++)
                            k.path += jsPlumb.Segments.vml.SegmentRenderer.getPath(j[n]),
                                    k.path += " ";
                        if (e.outlineColor) {
                            var o = e.outlineWidth || 1,
                                    p = e.lineWidth + 2 * o,
                                    q = {
                                        strokeStyle: jsPlumbUtil.convertStyle(e.outlineColor),
                                        lineWidth: p
                                    };
                            for (var r in a)
                                q[r] = e[r];
                            null == this.bgCanvas ? (
                                    k["class"] = d,
                                    k.coordsize = m[2] * f + "," + m[3] * f,
                                    this.bgCanvas = h(
                                            "shape",
                                            m,
                                            k,
                                            b.parent,
                                            this._jsPlumb.instance,
                                            !0
                                            ),
                                    i(this.bgCanvas, m),
                                    this.appendDisplayElement(this.bgCanvas, !0),
                                    this.initOpacityNodes(this.bgCanvas, ["stroke"]),
                                    this.bgCanvas._jsPlumb = c) : (k.coordsize = m[2] * f + "," + m[3] * f,
                                    i(this.bgCanvas, m),
                                    g(this.bgCanvas, k)
                                    ),
                                    l(this.bgCanvas, q, this)
                        }
                        null == this.canvas ? (
                                k["class"] = d,
                                k.coordsize = m[2] * f + "," + m[3] * f,
                                this.canvas = h(
                                        "shape",
                                        m,
                                        k,
                                        b.parent,
                                        this._jsPlumb.instance,
                                        !0
                                        ),
                                this.appendDisplayElement(this.canvas, !0),
                                this.initOpacityNodes(
                                        this.canvas, ["stroke"]),
                                this.canvas._jsPlumb = c) : (
                                k.coordsize = m[2] * f + "," + m[3] * f,
                                i(this.canvas, m),
                                g(this.canvas, k)
                                ),
                                l(this.canvas, e, this, this._jsPlumb.instance)
                    }
                }
            };
            jsPlumbUtil.extend(
                    n,
                    m, {
                        setVisible: function (a) {
                            this.canvas && (this.canvas.style.display = a ? "block" : "none"),
                                    this.bgCanvas && (this.bgCanvas.style.display = a ? "block" : "none")
                        }
                    }
            );
            var o = window.VmlEndpoint = function (a) {
                m.apply(this, arguments),
                        this._jsPlumb.vml = null,
                        this.canvas = document.createElement("div"),
                        this.canvas.style.position = "absolute",
                        this._jsPlumb.clazz = this._jsPlumb.instance.endpointClass + (a.cssClass ? " " + a.cssClass : ""),
                        a._jsPlumb.appendElement(this.canvas, a.parent),
                        this.paint = function (a, b) {
                            var c = {},
                                    d = this._jsPlumb.vml;
                            jsPlumbUtil.sizeElement(
                                    this.canvas,
                                    this.x,
                                    this.y,
                                    this.w,
                                    this.h
                                    ),
                                    null == this._jsPlumb.vml ? (
                                            c["class"] = this._jsPlumb.clazz,
                                            d = this._jsPlumb.vml = this.getVml(
                                                    [0, 0, this.w, this.h],
                                                    c,
                                                    b,
                                                    this.canvas,
                                                    this._jsPlumb.instance
                                                    ),
                                            this.appendDisplayElement(d, !0),
                                            this.appendDisplayElement(this.canvas, !0),
                                            this.initOpacityNodes(d, ["fill"])
                                            ) : (i(d, [0, 0, this.w, this.h]), g(d, c)
                                    ),
                                    l(d, a, this)
                        }
            };
            jsPlumbUtil.extend(o, m),
                    jsPlumb.Segments.vml = {
                        SegmentRenderer: {
                            getPath: function (a) {
                                return{
                                    Straight: function (a) {
                                        var b = a.params;
                                        return"m" + j(b.x1) + "," + j(b.y1) + " l" + j(b.x2) + "," + j(b.y2) + " e"
                                    },
                                    Bezier: function (a) {
                                        var b = a.params;
                                        return"m" + j(b.x1) + "," + j(b.y1) + " c" + j(b.cp1x) + "," + j(b.cp1y) + "," + j(b.cp2x) + "," + j(b.cp2y) + "," + j(b.x2) + "," + j(b.y2) + " e"
                                    },
                                    Arc: function (a) {
                                        var b = a.params,
                                                c = Math.min(b.x1, b.x2),
                                                d = (Math.max(b.x1, b.x2),
                                                        Math.min(b.y1, b.y2)),
                                                e = (Math.max(b.y1, b.y2),
                                                        a.anticlockwise ? 1 : 0),
                                                f = a.anticlockwise ? "at " : "wa ",
                                                g = function () {
                                                    if (b.loopback)
                                                        return"0,0," + j(2 * b.r) + "," + j(2 * b.r);
                                                    var f = [
                                                        null,
                                                        [function () {
                                                                return[c, d]
                                                            },
                                                            function () {
                                                                return[c - b.r, d - b.r]
                                                            }],
                                                        [function () {
                                                                return[c - b.r, d]
                                                            },
                                                            function () {
                                                                return[c, d - b.r]
                                                            }],
                                                        [function () {
                                                                return[c - b.r, d - b.r]
                                                            },
                                                            function () {
                                                                return[c, d]
                                                            }],
                                                        [function () {
                                                                return[c, d - b.r]
                                                            },
                                                            function () {
                                                                return[c - b.r, d]
                                                            }]
                                                    ][a.segment][e]();
                                                    return j(f[0]) + "," + j(f[1]) + "," + j(f[0] + 2 * b.r) + "," + j(f[1] + 2 * b.r)
                                                };
                                        return f + " " + g() + "," + j(b.x1) + "," + j(b.y1) + "," + j(b.x2) + "," + j(b.y2) + " e"
                                    }
                                }[a.type](a)
                            }
                        }
                    },
            jsPlumb.Endpoints.vml.Dot = function () {
                jsPlumb.Endpoints.Dot.apply(this, arguments),
                        o.apply(this, arguments),
                        this.getVml = function (a, b, c, d, e) {
                            return h("oval", a, b, d, e)
                        }
            },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Dot, o),
                    jsPlumb.Endpoints.vml.Rectangle = function () {
                        jsPlumb.Endpoints.Rectangle.apply(this, arguments),
                                o.apply(this, arguments),
                                this.getVml = function (a, b, c, d, e) {
                                    return h("rect", a, b, d, e)
                                }
                    },
                    jsPlumbUtil.extend(jsPlumb.Endpoints.vml.Rectangle, o),
                    jsPlumb.Endpoints.vml.Image = jsPlumb.Endpoints.Image,
                    jsPlumb.Endpoints.vml.Blank = jsPlumb.Endpoints.Blank,
                    jsPlumb.Overlays.vml.Label = jsPlumb.Overlays.Label,
                    jsPlumb.Overlays.vml.Custom = jsPlumb.Overlays.Custom;
            var p = function (a, b) {
                a.apply(this, b),
                        m.apply(this, b);
                var c = this;
                this.canvas = null,
                        this.isAppendedAtTopLevel = !0;
                var d = function (a) {
                    return"m " + j(a.hxy.x) + "," + j(a.hxy.y) + " l " + j(a.tail[0].x) + "," + j(a.tail[0].y) + " " + j(a.cxy.x) + "," + j(a.cxy.y) + " " + j(a.tail[1].x) + "," + j(a.tail[1].y) + " x e"
                };
                this.paint = function (a, e) {
                    if (a.component.canvas && e) {
                        var j = {}, k = a.d, l = a.component;
                        a.strokeStyle && (
                                j.stroked = "true",
                                j.strokecolor = jsPlumbUtil.convertStyle(a.strokeStyle, !0)
                                ),
                                a.lineWidth && (j.strokeweight = a.lineWidth + "px"),
                                a.fillStyle && (
                                        j.filled = "true",
                                        j.fillcolor = a.fillStyle
                                        );
                        var m = Math.min(k.hxy.x, k.tail[0].x, k.tail[1].x, k.cxy.x),
                                n = Math.min(k.hxy.y, k.tail[0].y, k.tail[1].y, k.cxy.y),
                                o = Math.max(k.hxy.x, k.tail[0].x, k.tail[1].x, k.cxy.x),
                                p = Math.max(k.hxy.y, k.tail[0].y, k.tail[1].y, k.cxy.y),
                                q = Math.abs(o - m),
                                r = Math.abs(p - n),
                                s = [m, n, q, r];
                        if (
                                j.path = d(k),
                                j.coordsize = l.w * f + "," + l.h * f,
                                s[0] = l.x,
                                s[1] = l.y,
                                s[2] = l.w,
                                s[3] = l.h,
                                null == c.canvas
                                ) {
                            var t = l._jsPlumb.overlayClass || "",
                                    u = b && 1 == b.length ? b[0].cssClass || "" : "";
                            j["class"] = u + " " + t,
                                    c.canvas = h("shape", s, j, l.canvas.parentNode, l._jsPlumb.instance, !0),
                                    l.appendDisplayElement(c.canvas, !0)
                        } else
                            i(c.canvas, s), g(c.canvas, j)
                    }
                },
                        this.cleanup = function () {
                            null != this.canvas && this._jsPlumb.instance.removeElement(this.canvas)
                        }
            };
            jsPlumbUtil.extend(
                    p,
                    [m, jsPlumb.Overlays.AbstractOverlay],
                    {
                        setVisible: function (a) {
                            this.canvas.style.display = a ? "block" : "none"
                        }
                    }
            ),
                    jsPlumb.Overlays.vml.Arrow = function () {
                        p.apply(this, [jsPlumb.Overlays.Arrow, arguments])
                    },
                    jsPlumbUtil.extend(
                            jsPlumb.Overlays.vml.Arrow,
                            [jsPlumb.Overlays.Arrow, p]
                            ),
                    jsPlumb.Overlays.vml.PlainArrow = function () {
                        p.apply(this, [jsPlumb.Overlays.PlainArrow, arguments])
                    },
                    jsPlumbUtil.extend(
                            jsPlumb.Overlays.vml.PlainArrow,
                            [jsPlumb.Overlays.PlainArrow, p]
                            ),
                    jsPlumb.Overlays.vml.Diamond = function () {
                        p.apply(this,
                                [jsPlumb.Overlays.Diamond, arguments]
                                )
                    },
                    jsPlumbUtil.extend(
                            jsPlumb.Overlays.vml.Diamond,
                            [jsPlumb.Overlays.Diamond, p]
                            )
        }(),
        function () {
            "use strict";
            var a = function (a, b) {
                b = b || "main";
                var c = "_katavorio_" + b, d = a[c], e = a.getEventManager();
                return d || (
                        d = new Katavorio(
                                {
                                    bind: e.on,
                                    unbind: e.off,
                                    getSize: jsPlumb.getSize,
                                    getPosition: function (b) {
                                        var c = jsPlumbAdapter.getOffset(b, a);
                                        return[c.left, c.top]
                                    },
                                    setPosition: function (a, b) {
                                        a.style.left = b[0] + "px", a.style.top = b[1] + "px"
                                    },
                                    addClass: jsPlumbAdapter.addClass,
                                    removeClass: jsPlumbAdapter.removeClass,
                                    intersects: Biltong.intersects,
                                    indexOf: jsPlumbUtil.indexOf,
                                    css: {
                                        noSelect: a.dragSelectClass,
                                        droppable: "jsplumb-droppable",
                                        draggable: "jsplumb-draggable",
                                        drag: "jsplumb-drag",
                                        selected: "jsplumb-drag-selected",
                                        active: "jsplumb-drag-active",
                                        hover: "jsplumb-drag-hover"
                                    }
                                }
                        ),
                        a[c] = d, a.bind("zoom", d.setZoom)
                        ),
                        d
            },
                    b = function (a, b) {
                        var c = function (c) {
                            if (b[c]) {
                                if (jsPlumbUtil.isString(b[c])) {
                                    var d = b[c].match(/-=/) ? -1 : 1, e = b[c].substring(2);
                                    return a[c] + d * e
                                }
                                return b[c]
                            }
                            return a[c]
                        };
                        return[c("left"), c("top")]
                    };
            jsPlumb.extend(
                    jsPlumbInstance.prototype,
                    {
                        scopeChange: function () {
                        },
                        getDOMElement: function (a) {
                            return null == a ? null : (a = "string" == typeof a ? a : null != a.length ? a[0] : a,
                                    "string" == typeof a ? document.getElementById(a) : a)
                        },
                        getElementObject: function (a) {
                            return a
                        },
                        removeElement: function (b) {
                            a(this).elementRemoved(b), this.getEventManager().remove(b)
                        },
                        doAnimate: function (a, c, d) {
                            d = d || {};
                            var e = jsPlumbAdapter.getOffset(a, this), f = b(e, c), g = f[0] - e.left, h = f[1] - e.top, i = d.duration || 250, j = 15, k = i / j, l = j / i * g, m = j / i * h, n = 0, o = setInterval(function () {
                                jsPlumbAdapter.setPosition(a, {left: e.left + l * (n + 1), top: e.top + m * (n + 1)}), null != d.step && d.step(), n++, n >= k && (window.clearInterval(o), null != d.complete && d.complete())
                            }, j)
                        },
                        getSelector: function (a, b) {
                            var c = null;
                            return c = 1 == arguments.length ? null != a.nodeType ? a : document.querySelectorAll(a) : a.querySelectorAll(b)
                        },
                        destroyDraggable: function (b, c) {
                            a(this, c).destroyDraggable(b)
                        },
                        destroyDroppable: function (b, c) {
                            a(this, c).destroyDroppable(b)
                        },
                        initDraggable: function (b, c, d) {
                            a(this, d).draggable(b, c)
                        },
                        initDroppable: function (b, c, d) {
                            a(this, d).droppable(b, c)
                        },
                        isAlreadyDraggable: function (a) {
                            return null != a._katavorioDrag
                        },
                        isDragSupported: function () {
                            return!0
                        },
                        isDropSupported: function () {
                            return!0
                        },
                        getDragObject: function (a) {
                            return a[0].drag.getDragElement()
                        },
                        getDragScope: function (a) {
                            return a._katavorioDrag && a._katavorioDrag.scopes.join(" ") || ""
                        },
                        getDropEvent: function (a) {
                            return a[0].e
                        },
                        getDropScope: function (a) {
                            return a._katavorioDrop && a._katavorioDrop.scopes.join(" ") || ""
                        },
                        getUIPosition: function (a) {
                            return{left: a[0].pos[0], top: a[0].pos[1]}
                        },
                        isDragFilterSupported: function () {
                            return!0
                        },
                        setDragFilter: function (a, b) {
                            a._katavorioDrag && a._katavorioDrag.setFilter(b)
                        },
                        setElementDraggable: function (a, b) {
                            a = jsPlumb.getDOMElement(a), a._katavorioDrag && a._katavorioDrag.setEnabled(b)
                        },
                        setDragScope: function (a, b) {
                            a._katavorioDrag && a._katavorioDrag.k.setDragScope(a, b)
                        },
                        dragEvents: {
                            start: "start", stop: "stop",
                            drag: "drag", step: "step",
                            over: "over", out: "out",
                            drop: "drop", complete: "complete"
                        },
                        animEvents: {step: "step", complete: "complete"},
                        stopDrag: function (a) {
                            a._katavorioDrag && a._katavorioDrag.abort()
                        },
                        addToDragSelection: function (b) {
                            a(this).select(b)
                        },
                        removeFromDragSelection: function (b) {
                            a(this).deselect(b)
                        },
                        clearDragSelection: function () {
                            a(this).deselectAll()
                        },
                        getOriginalEvent: function (a) {
                            return a
                        },
                        trigger: function (a, b, c) {
                            this.getEventManager().trigger(a, b, c)
                        }
                    }
            );
            var c = function (a) {
                var b = function () {
                    /complete|loaded|interactive/.test(document.readyState) && "undefined" != typeof document.body && null != document.body ? a() : setTimeout(b, 9)
                };
                b()
            };
            c(jsPlumb.init)
        }.call(this);
/**
 * * PrimeFaces Diagram Widget
 */ PrimeFaces.widget.Diagram = PrimeFaces.widget.DeferredWidget.extend({init: function (cfg) {
        this._super(cfg);
        this.renderDeferred();
    },
    _render: function () {
        var $this = this;
        jsPlumb.ready(function () {
            $this.canvas = jsPlumb.getInstance({
                Container: $this.jq.attr('id'),
                Connector: $this.cfg.defaultConnector,
                PaintStyle: $this.cfg.paintStyle,
                HoverPaintStyle: $this.cfg.hoverPaintStyle,
                ConnectionOverlays: $this.cfg.connectionOverlays,
                ConnectionsDetachable: ($this.cfg.connectionsDetachable === false) ? false : true,
                MaxConnections: $this.cfg.maxConnections
            });
            $this.canvas.doWhileSuspended(function () {
                $this.initEndPoints();
                $this.initConnections();
                $this.canvas.draggable($this.jq.children('.ui-diagram-draggable'), {
                    containment: true
                });
            });
            $this.bindEvents();
        });
    },
    initEndPoints: function () {
        for (var i = 0; i < this.cfg.endPoints.length; i++) {
            var endPoint = this.cfg.endPoints[i];
            this.canvas.addEndpoint(endPoint.element, endPoint);
        }
    },
    initConnections: function () {
        if (this.cfg.connections) {
            for (var i = 0; i < this.cfg.connections.length; i++) {
                this.canvas.connect(this.cfg.connections[i]);
            }
        }
    },
    bindEvents: function () {
        var $this = this;
        this.canvas.bind('connection', function (info) {
            $this.onConnect(info);
        });
        this.canvas.bind('connectionDetached', function (info) {
            if (info.targetId && info.targetId.indexOf($this.id) === 0) {
                $this.onDisconnect(info);
            }
        });
        this.canvas.bind('connectionMoved', function (info) {
            $this.onConnectionChange(info);
        });
        this.canvas.bind('click', function (connection, orignalEvent) {
            $this.onConnectionClick(connection);
        });
        this.jq.children('.ui-diagram-element').click(function () {
            var elementId = $(this).attr('id');
            $this.onElementClick(elementId);
        });
        this.jq.children('.ui-diagram-element').draggable({
            stop: function (event, ui) {
                var posleft = 0, postop = 0;
                posleft = Math.ceil(ui.position.left / 16) + "em";
                postop = Math.ceil(ui.position.top / 16) + "em";
                var elementId = $(this).attr('id');
                $this.onElementDrop(elementId, posleft, postop);
            }

        });
        $(document).bind('contextmenu', function (e) {
            if (e.target.tagName.toLowerCase() == "path") {
                e.preventDefault();
                $(".menuContext").css({
                    "left": e.pageX + "px",
                    "top": e.pageY + "px"
                }).show();
            }
        });
        this.canvas.bind('contextmenu', function (e) {
            $this.onConnect(e);
        });

    }, onConnect: function (info) {
        var options = {
            source: this.id,
            process: this.id,
            params: [
                {name: this.id + '_connect', value: true},
                {name: this.id + '_sourceId', value: info.sourceId.substring(this.id.length + 1)},
                {name: this.id + '_targetId', value: info.targetId.substring(this.id.length + 1)},
                {name: this.id + '_sourceEndPointId', value: info.sourceEndpoint.getUuid()},
                {name: this.id + '_targetEndPointId', value: info.targetEndpoint.getUuid()}
            ]
        };
        if (this.connectionChanged) {
            options.params.push({name: this.id + '_connectionChanged', value: true});
        } else {
            this.connectionChanged = false;
        }

        if (this.hasBehavior('connect')) {
            var behavior = this.cfg.behaviors['connect'];
            behavior.call(this, options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    },
    onDisconnect: function (info) {
        var options = {
            source: this.id,
            process: this.id,
            params: [
                {name: this.id + '_disconnect', value: true},
                {name: this.id + '_sourceId', value: info.sourceId.substring(this.id.length + 1)},
                {name: this.id + '_targetId', value: info.targetId.substring(this.id.length + 1)},
                {name: this.id + '_sourceEndPointId', value: info.sourceEndpoint.getUuid()},
                {name: this.id + '_targetEndPointId', value: info.targetEndpoint.getUuid()}
            ]
        };
        if (this.hasBehavior('disconnect')) {
            var behavior = this.cfg.behaviors['disconnect'];
            behavior.call(this, options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    },
    onConnectionChange: function (info) {
        this.connectionChanged = true;
        var options = {
            source: this.id, process: this.id, params: [
                {name: this.id + '_connectionChange', value: true},
                {name: this.id + '_originalSourceId', value: info.originalSourceId.substring(this.id.length + 1)},
                {name: this.id + '_newSourceId', value: info.newSourceId.substring(this.id.length + 1)},
                {name: this.id + '_originalTargetId', value: info.originalTargetId.substring(this.id.length + 1)},
                {name: this.id + '_newTargetId', value: info.newTargetId.substring(this.id.length + 1)},
                {name: this.id + '_originalSourceEndPointId', value: info.originalSourceEndpoint.getUuid()},
                {name: this.id + '_newSourceEndPointId', value: info.newSourceEndpoint.getUuid()},
                {name: this.id + '_originalTargetEndPointId', value: info.originalTargetEndpoint.getUuid()},
                {name: this.id + '_newTargetEndPointId', value: info.newTargetEndpoint.getUuid()}
            ]
        };
        if (this.hasBehavior('connectionChange')) {
            var behavior = this.cfg.behaviors['connectionChange'];
            behavior.call(this, options);
        }
        else {
            PrimeFaces.ajax.Request.handle(options);
        }
    },
    onConnectionClick: function (connection) {
        var options = {
            source: this.id,
            process: this.id,
            params: [{name: this.id + '_connectionClick', value: true},
                {name: this.id + '_sourceId', value: connection.sourceId.substring(this.id.length + 1)},
                {name: this.id + '_targetId', value: connection.targetId.substring(this.id.length + 1)}
            ]
        };
        if (this.hasBehavior('connectionClick')) {
            var behavior = this.cfg.behaviors['connectionClick'];
            behavior.call(this, options);
        }
    },
    onElementDrop: function (elementId, X, Y) {
        var options = {
            source: this.id, process: this.id,
            params: [
                {name: this.id + "_elementDrop", value: true},
                {name: this.id + "_elementId", value: elementId.substring(this.id.length + 1)},
                {name: this.id + '_left', value: X},
                {name: this.id + '_top', value: Y}
            ]
        };
        if (this.hasBehavior('elementDrop')) {
            var behavior = this.cfg.behaviors['elementDrop'];
            behavior.call(this, options);
        }
    },
    onElementClick: function (elementId) {
        var options = {
            source: this.id,
            process: this.id,
            params: [
                {name: this.id + "_elementClick", value: true},
                {name: this.id + "_elementId", value: elementId.substring(this.id.length + 1)}
            ]
        };
        if (this.hasBehavior('elementClick')) {
            var behavior = this.cfg.behaviors['elementClick'];
            behavior.call(this, options);
        }
    },
    hasBehavior: function (event) {
        if (this.cfg.behaviors) {
            return this.cfg.behaviors[event] != undefined;
        }

        return false;
    }

});

function undefinedOrNull(o) {
    return !o || o != undefined || o != null;
}
