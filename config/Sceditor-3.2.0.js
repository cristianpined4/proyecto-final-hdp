/* SCEditor v3.2.0 | (C) 2017, Sam Clarke | sceditor.com/license */
!(function () {
  "use strict";
  function i(e, t) {
    return typeof t === e;
  }
  var ve = i.bind(null, "string"),
    Ke = i.bind(null, "undefined"),
    Xe = i.bind(null, "function"),
    a = i.bind(null, "number");
  function l(e) {
    return !Object.keys(e).length;
  }
  function be(e, t) {
    var n = e === !!e,
      o = n ? 2 : 1,
      r = n ? t : e,
      i = n && e;
    function a(e) {
      return (
        null !== e &&
        "object" == typeof e &&
        Object.getPrototypeOf(e) === Object.prototype
      );
    }
    for (; o < arguments.length; o++) {
      var l,
        c = arguments[o];
      for (l in c) {
        var s,
          u,
          d = r[l],
          f = c[l];
        Ke(f) ||
          ("__proto__" !== l &&
            "constructor" !== l &&
            ((u = a(f)),
            (s = Array.isArray(f)),
            i && (u || s)
              ? ((u = a(d) === u && Array.isArray(d) === s),
                (r[l] = be(!0, u ? d : s ? [] : {}, f)))
              : (r[l] = f)));
      }
    }
    return r;
  }
  function Ze(e, t) {
    t = e.indexOf(t);
    -1 < t && e.splice(t, 1);
  }
  function we(t, n) {
    if (Array.isArray(t) || ("length" in t && a(t.length)))
      for (var e = 0; e < t.length; e++) n(e, t[e]);
    else
      Object.keys(t).forEach(function (e) {
        n(e, t[e]);
      });
  }
  var c = {},
    xe = 1,
    Te = 3,
    s = 8;
  function r(e) {
    return (e = parseFloat(e)), isFinite(e) ? e : 0;
  }
  function Ce(e, t, n) {
    var o = (n || document).createElement(e);
    return (
      we(t || {}, function (e, t) {
        "style" === e
          ? (o.style.cssText = t)
          : e in o
          ? (o[e] = t)
          : o.setAttribute(e, t);
      }),
      o
    );
  }
  function Je(e, t) {
    for (var n = e || {}; (n = n.parentNode) && !/(9|11)/.test(n.nodeType); )
      if (!t || _e(n, t)) return n;
  }
  function Ee(e, t) {
    return _e(e, t) ? e : Je(e, t);
  }
  function Se(e) {
    e.parentNode && e.parentNode.removeChild(e);
  }
  function Ne(e, t) {
    e.appendChild(t);
  }
  function ke(e, t) {
    return e.querySelectorAll(t);
  }
  function De(n, e, o, r, i) {
    e.split(" ").forEach(function (e) {
      var t;
      ve(o)
        ? ((t =
            r["_sce-event-" + e + o] ||
            function (e) {
              for (var t = e.target; t && t !== n; ) {
                if (_e(t, o)) return void r.call(t, e);
                t = t.parentNode;
              }
            }),
          (r["_sce-event-" + e + o] = t))
        : ((t = o), (i = r)),
        n.addEventListener(e, t, i || !1);
    });
  }
  function Me(n, e, o, r, i) {
    e.split(" ").forEach(function (e) {
      var t;
      ve(o) ? (t = r["_sce-event-" + e + o]) : ((t = o), (i = r)),
        n.removeEventListener(e, t, i || !1);
    });
  }
  function Ae(e, t, n) {
    if (arguments.length < 3) return e.getAttribute(t);
    null == n ? Qe(e, t) : e.setAttribute(t, n);
  }
  function Qe(e, t) {
    e.removeAttribute(t);
  }
  function et(e) {
    Re(e, "display", "none");
  }
  function tt(e) {
    Re(e, "display", "");
  }
  function nt(e) {
    (ct(e) ? et : tt)(e);
  }
  function Re(n, e, t) {
    if (arguments.length < 3) {
      if (ve(e)) return 1 === n.nodeType ? getComputedStyle(n)[e] : null;
      we(e, function (e, t) {
        Re(n, e, t);
      });
    } else {
      var o = (t || 0 === t) && !isNaN(t);
      n.style[e] = o ? t + "px" : t;
    }
  }
  function ot(e, t, n) {
    var o = arguments.length,
      r = {};
    if (e.nodeType === xe)
      return 1 === o
        ? (we(e.attributes, function (e, t) {
            /^data\-/i.test(t.name) && (r[t.name.substr(5)] = t.value);
          }),
          r)
        : 2 === o
        ? Ae(e, "data-" + t)
        : void Ae(e, "data-" + t, String(n));
  }
  function _e(e, t) {
    var n = !1;
    return (n =
      e && e.nodeType === xe
        ? (e.matches || e.msMatchesSelector || e.webkitMatchesSelector).call(
            e,
            t
          )
        : n);
  }
  function Oe(e, t) {
    t.parentNode.insertBefore(e, t);
  }
  function u(e) {
    return e.className.trim().split(/\s+/);
  }
  function rt(e, t) {
    return _e(e, "." + t);
  }
  function Fe(e, t) {
    var n = u(e);
    n.indexOf(t) < 0 && n.push(t), (e.className = n.join(" "));
  }
  function it(e, t) {
    var n = u(e);
    Ze(n, t), (e.className = n.join(" "));
  }
  function He(e, t, n) {
    ((n = Ke(n) ? !rt(e, t) : n) ? Fe : it)(e, t);
  }
  function at(e, t) {
    var n, o;
    if (Ke(t))
      return (
        (n = r((o = getComputedStyle(e)).paddingLeft) + r(o.paddingRight)),
        (o = r(o.borderLeftWidth) + r(o.borderRightWidth)),
        e.offsetWidth - n - o
      );
    Re(e, "width", t);
  }
  function Le(e, t) {
    var n, o;
    if (Ke(t))
      return (
        (n = r((o = getComputedStyle(e)).paddingTop) + r(o.paddingBottom)),
        (o = r(o.borderTopWidth) + r(o.borderBottomWidth)),
        e.offsetHeight - n - o
      );
    Re(e, "height", t);
  }
  function lt(e, t, n) {
    var o;
    Xe(window.CustomEvent)
      ? (o = new CustomEvent(t, { bubbles: !0, cancelable: !0, detail: n }))
      : (o = e.ownerDocument.createEvent("CustomEvent")).initCustomEvent(
          t,
          !0,
          !0,
          n
        ),
      e.dispatchEvent(o);
  }
  function ct(e) {
    return e.getClientRects().length;
  }
  function d(e, t, n, o, r) {
    for (e = r ? e.lastChild : e.firstChild; e; ) {
      var i = r ? e.previousSibling : e.nextSibling;
      if (
        (!n && !1 === t(e)) ||
        (!o && !1 === d(e, t, n, o, r)) ||
        (n && !1 === t(e))
      )
        return !1;
      e = i;
    }
  }
  function st(e, t, n, o) {
    d(e, t, n, o, !0);
  }
  function ut(e, t) {
    var n = (t = t || document).createDocumentFragment(),
      o = Ce("div", {}, t);
    for (o.innerHTML = e; o.firstChild; ) Ne(n, o.firstChild);
    return n;
  }
  function dt(e) {
    return e && (!_e(e, "p,div") || e.className || Ae(e, "style") || !l(ot(e)));
  }
  function ft(e, t) {
    var n = Ce(t, {}, e.ownerDocument);
    for (
      we(e.attributes, function (e, t) {
        try {
          Ae(n, t.name, t.value);
        } catch (e) {}
      });
      e.firstChild;

    )
      Ne(n, e.firstChild);
    return e.parentNode.replaceChild(n, e), n;
  }
  var f =
    "|body|hr|p|div|h1|h2|h3|h4|h5|h6|address|pre|form|table|tbody|thead|tfoot|th|tr|td|li|ol|ul|blockquote|center|details|section|article|aside|nav|main|header|hgroup|footer|fieldset|dl|dt|dd|figure|figcaption|";
  function pt(e) {
    return (
      !!/11?|9/.test(e.nodeType) &&
      "|iframe|area|base|basefont|br|col|frame|hr|img|input|wbr|isindex|link|meta|param|command|embed|keygen|source|track|object|".indexOf(
        "|" + e.nodeName.toLowerCase() + "|"
      ) < 0
    );
  }
  function Ie(e, t) {
    var n = (e || {}).nodeType || Te;
    return n !== xe
      ? n === Te
      : "code" === (n = e.tagName.toLowerCase())
      ? !t
      : f.indexOf("|" + n + "|") < 0;
  }
  function p(e) {
    return (
      e.lastChild && p(e.lastChild) && Se(e.lastChild),
      3 === e.nodeType ? !e.nodeValue : pt(e) && !e.childNodes.length
    );
  }
  function mt(e) {
    d(e, function (e) {
      var t = !Ie(e, !0) && e.nodeType !== s,
        n = e.parentNode;
      if (t && (Ie(n, !0) || "P" === n.tagName)) {
        for (var o = e; Ie(o.parentNode, !0) || "P" === o.parentNode.tagName; )
          o = o.parentNode;
        for (var r = h(o, e), i = e; n && Ie(n, !0); ) {
          if (n.nodeType === xe) {
            for (var a = n.cloneNode(); i.firstChild; ) Ne(a, i.firstChild);
            Ne(i, a);
          }
          n = n.parentNode;
        }
        Oe(i, o), p(r) || Oe(r, i), p(o) && Se(o);
      }
      t &&
        _e(e, "ul,ol") &&
        _e(e.parentNode, "ul,ol") &&
        ((r = "li"),
        (t = (t = e).previousElementSibling),
        (t = !r || !t || _e(t, r) ? t : null) || Oe((t = Ce("li")), e),
        Ne(t, e));
    });
  }
  function m(e, t) {
    return e
      ? (t ? e.previousSibling : e.nextSibling) || m(e.parentNode, t)
      : null;
  }
  function ht(e) {
    var t,
      n,
      o,
      r,
      i,
      a,
      l = Re(e, "whiteSpace"),
      c = /line$/i.test(l),
      s = e.firstChild;
    if (!/pre(\-wrap)?$/i.test(l))
      for (; s; ) {
        if (
          ((i = s.nextSibling),
          (t = s.nodeValue),
          (n = s.nodeType) === xe && s.firstChild && ht(s),
          n === Te)
        ) {
          for (n = m(s), o = m(s, !0), a = !1; rt(o, "sceditor-ignore"); )
            o = m(o, !0);
          if (Ie(s) && o) {
            for (r = o; r.lastChild; )
              for (r = r.lastChild; rt(r, "sceditor-ignore"); ) r = m(r, !0);
            a = r.nodeType === Te ? /[\t\n\r ]$/.test(r.nodeValue) : !Ie(r);
          }
          (t = t.replace(/\u200B/g, "")),
            (o && Ie(o) && !a) ||
              (t = t.replace(c ? /^[\t ]+/ : /^[\t\n\r ]+/, "")),
            (t = n && Ie(n) ? t : t.replace(c ? /[\t ]+$/ : /[\t\n\r ]+$/, ""))
              .length
              ? (s.nodeValue = t.replace(c ? /[\t ]+/g : /[\t\n\r ]+/g, " "))
              : Se(s);
        }
        s = i;
      }
  }
  function h(e, t) {
    var n = e.ownerDocument.createRange();
    return n.setStartBefore(e), n.setEndAfter(t), n.extractContents();
  }
  function gt(e) {
    for (var t = 0, n = 0; e; )
      (t += e.offsetLeft), (n += e.offsetTop), (e = e.offsetParent);
    return { left: t, top: n };
  }
  function g(e, t) {
    var n = e.style;
    return (
      c[t] ||
        (c[t] = t.replace(/^-ms-/, "ms-").replace(/-(\w)/g, function (e, t) {
          return t.toUpperCase();
        })),
      (n = n[(t = c[t])]),
      "textAlign" === t &&
      ((n = n || Re(e, t)),
      Re(e.parentNode, t) === n ||
        "block" !== Re(e, "display") ||
        _e(e, "hr,th"))
        ? ""
        : n
    );
  }
  function yt(e, t) {
    var n = e.attributes.length;
    if (n === t.attributes.length) {
      for (; n--; ) {
        var o = e.attributes[n];
        if (
          "style" === o.name
            ? !(function (e, t) {
                var n = e.style.length;
                if (n === t.style.length) {
                  for (; n--; ) {
                    var o = e.style[n];
                    if (e.style[o] !== t.style[o]) return;
                  }
                  return 1;
                }
              })(e, t)
            : o.value !== Ae(t, o.name)
        )
          return;
      }
      return 1;
    }
  }
  function vt(e) {
    for (; e.firstChild; ) Oe(e.firstChild, e);
    Se(e);
  }
  var bt = {
      toolbar:
        "bold,italic,underline,strike,subscript,superscript|left,center,right,justify|font,size,color,removeformat|cut,copy,pastetext|bulletlist,orderedlist,indent,outdent|table|code,quote|horizontalrule,image,email,link,unlink|emoticon,youtube,date,time|ltr,rtl|print,maximize,source",
      toolbarExclude: null,
      style: "jquery.sceditor.default.css",
      fonts:
        "Arial,Arial Black,Comic Sans MS,Courier New,Georgia,Impact,Sans-serif,Serif,Times New Roman,Trebuchet MS,Verdana",
      colors:
        "#000000,#44B8FF,#1E92F7,#0074D9,#005DC2,#00369B,#b3d5f4|#444444,#C3FFFF,#9DF9FF,#7FDBFF,#68C4E8,#419DC1,#d9f4ff|#666666,#72FF84,#4CEA5E,#2ECC40,#17B529,#008E02,#c0f0c6|#888888,#FFFF44,#FFFA1E,#FFDC00,#E8C500,#C19E00,#fff5b3|#aaaaaa,#FFC95F,#FFA339,#FF851B,#E86E04,#C14700,#ffdbbb|#cccccc,#FF857A,#FF5F54,#FF4136,#E82A1F,#C10300,#ffc6c3|#eeeeee,#FF56FF,#FF30DC,#F012BE,#D900A7,#B20080,#fbb8ec|#ffffff,#F551FF,#CF2BE7,#B10DC9,#9A00B2,#9A00B2,#e8b6ef",
      locale: Ae(document.documentElement, "lang") || "en",
      charset: "utf-8",
      emoticonsCompat: !1,
      emoticonsEnabled: !0,
      emoticonsRoot: "",
      emoticons: {
        dropdown: {
          ":)": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/smile.png",
          ":angel:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/angel.png",
          ":angry:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/angry.png",
          "8-)":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/cool.png",
          ":'(":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/cwy.png",
          ":ermm:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/ermm.png",
          ":D": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/grin.png",
          "<3": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/heart.png",
          ":(": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/sad.png",
          ":O": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/shocked.png",
          ":P": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/tongue.png",
          ";)": "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/wink.png",
        },
        more: {
          ":alien:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/alien.png",
          ":blink:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/blink.png",
          ":blush:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/blush.png",
          ":cheerful:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/cheerful.png",
          ":devil:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/devil.png",
          ":dizzy:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/dizzy.png",
          ":getlost:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/getlost.png",
          ":happy:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/happy.png",
          ":kissing:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/kissing.png",
          ":ninja:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/ninja.png",
          ":pinch:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/pinch.png",
          ":pouty:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/pouty.png",
          ":sick:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/sick.png",
          ":sideways:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/sideways.png",
          ":silly:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/silly.png",
          ":sleeping:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/sleeping.png",
          ":unsure:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/unsure.png",
          ":woot:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/w00t.png",
          ":wassat:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/wassat.png",
        },
        hidden: {
          ":whistling:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/whistling.png",
          ":love:":
            "https://cdn.jsdelivr.net/npm/sceditor@3.2.0/emoticons/wub.png",
        },
      },
      width: null,
      height: null,
      resizeEnabled: !0,
      resizeMinWidth: null,
      resizeMinHeight: null,
      resizeMaxHeight: null,
      resizeMaxWidth: null,
      resizeHeight: !0,
      resizeWidth: !0,
      dateFormat: "year-month-day",
      toolbarContainer: null,
      enablePasteFiltering: !1,
      disablePasting: !1,
      readOnly: !1,
      rtl: !1,
      autofocus: !1,
      autofocusEnd: !0,
      autoExpand: !1,
      autoUpdate: !1,
      spellcheck: !0,
      runWithoutWysiwygSupport: !1,
      startInSourceMode: !1,
      id: null,
      plugins: "",
      zIndex: null,
      bbcodeTrim: !1,
      disableBlockRemove: !1,
      allowedIframeUrls: [],
      parserOptions: {},
      dropDownCss: {},
      allowedTags: [],
      allowedAttributes: [],
    },
    y =
      /^(https?|s?ftp|mailto|spotify|skype|ssh|teamspeak|tel):|(\/\/)|data:image\/(png|bmp|gif|p?jpe?g);/i;
  function wt(e) {
    return e.replace(/([\-.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  }
  function ze(e, t) {
    var n;
    return (
      e &&
        (!(n = {
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          "  ": "&nbsp; ",
          "\r\n": "<br />",
          "\r": "<br />",
          "\n": "<br />",
        }) !== t &&
          ((n['"'] = "&#34;"), (n["'"] = "&#39;"), (n["`"] = "&#96;")),
        (e = e.replace(/ {2}|\r\n|[&<>\r\n'"`]/g, function (e) {
          return n[e] || e;
        }))),
      e
    );
  }
  var v = {
    html: '<!DOCTYPE html><html{attrs}><head><meta http-equiv="Content-Type" content="text/html;charset={charset}" /><link rel="stylesheet" type="text/css" href="{style}" /></head><body contenteditable="true" {spellcheck}><p></p></body></html>',
    toolbarButton:
      '<a class="sceditor-button sceditor-button-{name}" data-sceditor-command="{name}" unselectable="on"><div unselectable="on">{dispName}</div></a>',
    emoticon:
      '<img src="{url}" data-sceditor-emoticon="{key}" alt="{key}" title="{tooltip}" />',
    fontOpt:
      '<a class="sceditor-font-option" href="#" data-font="{font}"><font face="{font}">{font}</font></a>',
    sizeOpt:
      '<a class="sceditor-fontsize-option" data-size="{size}" href="#"><font size="{size}">{size}</font></a>',
    pastetext:
      '<div><label for="txt">{label}</label> <textarea cols="20" rows="7" id="txt"></textarea></div><div><input type="button" class="button" value="{insert}" /></div>',
    table:
      '<div><label for="rows">{rows}</label><input type="text" id="rows" value="2" /></div><div><label for="cols">{cols}</label><input type="text" id="cols" value="2" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    image:
      '<div><label for="image">{url}</label> <input type="text" id="image" dir="ltr" placeholder="https://" /></div><div><label for="width">{width}</label> <input type="text" id="width" size="2" dir="ltr" /></div><div><label for="height">{height}</label> <input type="text" id="height" size="2" dir="ltr" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    email:
      '<div><label for="email">{label}</label> <input type="text" id="email" dir="ltr" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    link: '<div><label for="link">{url}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><label for="des">{desc}</label> <input type="text" id="des" /></div><div><input type="button" class="button" value="{ins}" /></div>',
    youtubeMenu:
      '<div><label for="link">{label}</label> <input type="text" id="link" dir="ltr" placeholder="https://" /></div><div><input type="button" class="button" value="{insert}" /></div>',
    youtube:
      '<iframe width="560" height="315" frameborder="0" allowfullscreen src="https://www.youtube-nocookie.com/embed/{id}?wmode=opaque&start={time}" data-youtube-id="{id}"></iframe>',
  };
  function Be(e, t, n) {
    var o = v[e];
    return (
      Object.keys(t).forEach(function (e) {
        o = o.replace(new RegExp(wt("{" + e + "}"), "g"), t[e]);
      }),
      (o = n ? ut(o) : o)
    );
  }
  function b(e) {
    if ("mozHidden" in document)
      for (var t, n = e.getBody(); n; ) {
        if ((t = n).firstChild) t = t.firstChild;
        else {
          for (; t && !t.nextSibling; ) t = t.parentNode;
          t = t && t.nextSibling;
        }
        3 !== n.nodeType ||
          !/[\n\r\t]+/.test(n.nodeValue) ||
          /^pre/.test(Re(n.parentNode, "whiteSpace")) ||
          Se(n),
          (n = t);
      }
  }
  var Pe = {
      bold: { exec: "bold", tooltip: "Bold", shortcut: "Ctrl+B" },
      italic: { exec: "italic", tooltip: "Italic", shortcut: "Ctrl+I" },
      underline: {
        exec: "underline",
        tooltip: "Underline",
        shortcut: "Ctrl+U",
      },
      strike: { exec: "strikethrough", tooltip: "Strikethrough" },
      subscript: { exec: "subscript", tooltip: "Subscript" },
      superscript: { exec: "superscript", tooltip: "Superscript" },
      left: {
        state: function (e) {
          var t;
          if ((e = e && 3 === e.nodeType ? e.parentNode : e))
            return (
              (t = "ltr" === Re(e, "direction")),
              (e = Re(e, "textAlign")),
              /left/.test(e) || e === (t ? "start" : "end")
            );
        },
        exec: "justifyleft",
        tooltip: "Align left",
      },
      center: { exec: "justifycenter", tooltip: "Center" },
      right: {
        state: function (e) {
          var t;
          if ((e = e && 3 === e.nodeType ? e.parentNode : e))
            return (
              (t = "ltr" === Re(e, "direction")),
              (e = Re(e, "textAlign")),
              /right/.test(e) || e === (t ? "end" : "start")
            );
        },
        exec: "justifyright",
        tooltip: "Align right",
      },
      justify: { exec: "justifyfull", tooltip: "Justify" },
      font: {
        _dropDown: function (t, e, n) {
          var o = Ce("div");
          De(o, "click", "a", function (e) {
            n(ot(this, "font")), t.closeDropDown(!0), e.preventDefault();
          }),
            t.opts.fonts.split(",").forEach(function (e) {
              Ne(o, Be("fontOpt", { font: e }, !0));
            }),
            t.createDropDown(e, "font-picker", o);
        },
        exec: function (e) {
          var t = this;
          Pe.font._dropDown(t, e, function (e) {
            t.execCommand("fontname", e);
          });
        },
        tooltip: "Font Name",
      },
      size: {
        _dropDown: function (t, e, n) {
          var o = Ce("div");
          De(o, "click", "a", function (e) {
            n(ot(this, "size")), t.closeDropDown(!0), e.preventDefault();
          });
          for (var r = 1; r <= 7; r++) Ne(o, Be("sizeOpt", { size: r }, !0));
          t.createDropDown(e, "fontsize-picker", o);
        },
        exec: function (e) {
          var t = this;
          Pe.size._dropDown(t, e, function (e) {
            t.execCommand("fontsize", e);
          });
        },
        tooltip: "Font Size",
      },
      color: {
        _dropDown: function (t, e, n) {
          var o = Ce("div"),
            r = "",
            i = Pe.color;
          i._htmlCache ||
            (t.opts.colors.split("|").forEach(function (e) {
              (r += '<div class="sceditor-color-column">'),
                e.split(",").forEach(function (e) {
                  r +=
                    '<a href="#" class="sceditor-color-option" style="background-color: ' +
                    e +
                    '" data-color="' +
                    e +
                    '"></a>';
                }),
                (r += "</div>");
            }),
            (i._htmlCache = r)),
            Ne(o, ut(i._htmlCache)),
            De(o, "click", "a", function (e) {
              n(ot(this, "color")), t.closeDropDown(!0), e.preventDefault();
            }),
            t.createDropDown(e, "color-picker", o);
        },
        exec: function (e) {
          var t = this;
          Pe.color._dropDown(t, e, function (e) {
            t.execCommand("forecolor", e);
          });
        },
        tooltip: "Font Color",
      },
      removeformat: { exec: "removeformat", tooltip: "Remove Formatting" },
      cut: {
        exec: "cut",
        tooltip: "Cut",
        errorMessage:
          "Your browser does not allow the cut command. Please use the keyboard shortcut Ctrl/Cmd-X",
      },
      copy: {
        exec: "copy",
        tooltip: "Copy",
        errorMessage:
          "Your browser does not allow the copy command. Please use the keyboard shortcut Ctrl/Cmd-C",
      },
      paste: {
        exec: "paste",
        tooltip: "Paste",
        errorMessage:
          "Your browser does not allow the paste command. Please use the keyboard shortcut Ctrl/Cmd-V",
      },
      pastetext: {
        exec: function (e) {
          var t,
            n = Ce("div"),
            o = this;
          Ne(
            n,
            Be(
              "pastetext",
              {
                label: o._("Paste your text inside the following box:"),
                insert: o._("Insert"),
              },
              !0
            )
          ),
            De(n, "click", ".button", function (e) {
              (t = ke(n, "#txt")[0].value) && o.wysiwygEditorInsertText(t),
                o.closeDropDown(!0),
                e.preventDefault();
            }),
            o.createDropDown(e, "pastetext", n);
        },
        tooltip: "Paste Text",
      },
      bulletlist: {
        exec: function () {
          b(this), this.execCommand("insertunorderedlist");
        },
        tooltip: "Bullet list",
      },
      orderedlist: {
        exec: function () {
          b(this), this.execCommand("insertorderedlist");
        },
        tooltip: "Numbered list",
      },
      indent: {
        state: function (e, t) {
          var n;
          return _e(t, "li") ||
            (_e(t, "ul,ol,menu") &&
              ((n = (t = this.getRangeHelper().selectedRange()).startContainer
                .parentNode),
              (t = t.endContainer.parentNode),
              n !== n.parentNode.firstElementChild ||
                (_e(t, "li") && t !== t.parentNode.lastElementChild)))
            ? 0
            : -1;
        },
        exec: function () {
          var e = this.getRangeHelper().getFirstBlockParent();
          this.focus(), Ee(e, "ul,ol,menu") && this.execCommand("indent");
        },
        tooltip: "Add indent",
      },
      outdent: {
        state: function (e, t) {
          return Ee(t, "ul,ol,menu") ? 0 : -1;
        },
        exec: function () {
          Ee(this.getRangeHelper().getFirstBlockParent(), "ul,ol,menu") &&
            this.execCommand("outdent");
        },
        tooltip: "Remove one indent",
      },
      table: {
        exec: function (e) {
          var r = this,
            i = Ce("div");
          Ne(
            i,
            Be(
              "table",
              { rows: r._("Rows:"), cols: r._("Cols:"), insert: r._("Insert") },
              !0
            )
          ),
            De(i, "click", ".button", function (e) {
              var t = Number(ke(i, "#rows")[0].value),
                n = Number(ke(i, "#cols")[0].value),
                o = "<table>";
              0 < t &&
                0 < n &&
                ((o += Array(t + 1).join(
                  "<tr>" + Array(n + 1).join("<td><br /></td>") + "</tr>"
                )),
                r.wysiwygEditorInsertHtml((o += "</table>")),
                r.closeDropDown(!0),
                e.preventDefault());
            }),
            r.createDropDown(e, "inserttable", i);
        },
        tooltip: "Insert a table",
      },
      horizontalrule: {
        exec: "inserthorizontalrule",
        tooltip: "Insert a horizontal rule",
      },
      code: {
        exec: function () {
          this.wysiwygEditorInsertHtml("<code>", "<br /></code>");
        },
        tooltip: "Code",
      },
      image: {
        _dropDown: function (t, e, n, o) {
          var r = Ce("div"),
            i =
              (Ne(
                r,
                Be(
                  "image",
                  {
                    url: t._("URL:"),
                    width: t._("Width (optional):"),
                    height: t._("Height (optional):"),
                    insert: t._("Insert"),
                  },
                  !0
                )
              ),
              ke(r, "#image")[0]);
          (i.value = n),
            De(r, "click", ".button", function (e) {
              i.value &&
                o(i.value, ke(r, "#width")[0].value, ke(r, "#height")[0].value),
                t.closeDropDown(!0),
                e.preventDefault();
            }),
            t.createDropDown(e, "insertimage", r);
        },
        exec: function (e) {
          var r = this;
          Pe.image._dropDown(r, e, "", function (e, t, n) {
            var o = "";
            t && (o += ' width="' + parseInt(t, 10) + '"'),
              n && (o += ' height="' + parseInt(n, 10) + '"'),
              (o += ' src="' + ze(e) + '"'),
              r.wysiwygEditorInsertHtml("<img" + o + " />");
          });
        },
        tooltip: "Insert an image",
      },
      email: {
        _dropDown: function (n, e, o) {
          var r = Ce("div");
          Ne(
            r,
            Be(
              "email",
              {
                label: n._("E-mail:"),
                desc: n._("Description (optional):"),
                insert: n._("Insert"),
              },
              !0
            )
          ),
            De(r, "click", ".button", function (e) {
              var t = ke(r, "#email")[0].value;
              t && o(t, ke(r, "#des")[0].value),
                n.closeDropDown(!0),
                e.preventDefault();
            }),
            n.createDropDown(e, "insertemail", r);
        },
        exec: function (e) {
          var n = this;
          Pe.email._dropDown(n, e, function (e, t) {
            !n.getRangeHelper().selectedHtml() || t
              ? n.wysiwygEditorInsertHtml(
                  '<a href="mailto:' + ze(e) + '">' + ze(t || e) + "</a>"
                )
              : n.execCommand("createlink", "mailto:" + e);
          });
        },
        tooltip: "Insert an email",
      },
      link: {
        _dropDown: function (t, e, n) {
          var o = Ce("div"),
            r =
              (Ne(
                o,
                Be(
                  "link",
                  {
                    url: t._("URL:"),
                    desc: t._("Description (optional):"),
                    ins: t._("Insert"),
                  },
                  !0
                )
              ),
              ke(o, "#link")[0]);
          function i(e) {
            r.value && n(r.value, ke(o, "#des")[0].value),
              t.closeDropDown(!0),
              e.preventDefault();
          }
          De(o, "click", ".button", i),
            De(
              o,
              "keypress",
              function (e) {
                13 === e.which && r.value && i(e);
              },
              !0
            ),
            t.createDropDown(e, "insertlink", o);
        },
        exec: function (e) {
          var n = this;
          Pe.link._dropDown(n, e, function (e, t) {
            t || !n.getRangeHelper().selectedHtml()
              ? n.wysiwygEditorInsertHtml(
                  '<a href="' + ze(e) + '">' + ze(t || e) + "</a>"
                )
              : n.execCommand("createlink", e);
          });
        },
        tooltip: "Insert a link",
      },
      unlink: {
        state: function () {
          return Ee(this.currentNode(), "a") ? 0 : -1;
        },
        exec: function () {
          var e = Ee(this.currentNode(), "a");
          if (e) {
            for (; e.firstChild; ) Oe(e.firstChild, e);
            Se(e);
          }
        },
        tooltip: "Unlink",
      },
      quote: {
        exec: function (e, t, n) {
          var o = "<blockquote>",
            r = "</blockquote>";
          t
            ? ((o = o + (n = n ? "<cite>" + ze(n) + "</cite>" : "") + t + r),
              (r = null))
            : "" === this.getRangeHelper().selectedHtml() && (r = "<br />" + r),
            this.wysiwygEditorInsertHtml(o, r);
        },
        tooltip: "Insert a Quote",
      },
      emoticon: {
        exec: function (u) {
          function d(e) {
            var n,
              t = f.opts,
              o = t.emoticonsRoot || "",
              r = t.emoticonsCompat,
              i = f.getRangeHelper(),
              a = r && " " !== i.getOuterText(!0, 1) ? " " : "",
              l = r && " " !== i.getOuterText(!1, 1) ? " " : "",
              c = Ce("div"),
              s = Ce("div"),
              r = be({}, t.emoticons.dropdown, e ? t.emoticons.more : {});
            return (
              Ne(c, s),
              (n = Math.sqrt(Object.keys(r).length)),
              De(c, "click", "img", function (e) {
                f.insert(a + Ae(this, "alt") + l, null, !1).closeDropDown(!0),
                  e.preventDefault();
              }),
              we(r, function (e, t) {
                Ne(
                  s,
                  Ce("img", {
                    src: o + (t.url || t),
                    alt: e,
                    title: t.tooltip || e,
                  })
                ),
                  s.children.length >= n && ((s = Ce("div")), Ne(c, s));
              }),
              !e &&
                t.emoticons.more &&
                (Ne(
                  (i = Ce("a", { className: "sceditor-more" })),
                  document.createTextNode(f._("More"))
                ),
                De(i, "click", function (e) {
                  f.createDropDown(u, "more-emoticons", d(!0)),
                    e.preventDefault();
                }),
                Ne(c, i)),
              c
            );
          }
          var f = this;
          f.createDropDown(u, "emoticons", d(!1));
        },
        txtExec: function (e) {
          Pe.emoticon.exec.call(this, e);
        },
        tooltip: "Insert an emoticon",
      },
      youtube: {
        _dropDown: function (r, e, i) {
          var a = Ce("div");
          Ne(
            a,
            Be(
              "youtubeMenu",
              { label: r._("Video URL:"), insert: r._("Insert") },
              !0
            )
          ),
            De(a, "click", ".button", function (e) {
              var t = ke(a, "#link")[0].value,
                n = t.match(
                  /(?:v=|v\/|embed\/|youtu.be\/)?([a-zA-Z0-9_-]{11})/
                ),
                t = t.match(/[&|?](?:star)?t=((\d+[hms]?){1,3})/),
                o = 0;
              t &&
                we(t[1].split(/[hms]/), function (e, t) {
                  "" !== t && (o = 60 * o + Number(t));
                }),
                n && /^[a-zA-Z0-9_\-]{11}$/.test(n[1]) && i(n[1], o),
                r.closeDropDown(!0),
                e.preventDefault();
            }),
            r.createDropDown(e, "insertlink", a);
        },
        exec: function (e) {
          var n = this;
          Pe.youtube._dropDown(n, e, function (e, t) {
            n.wysiwygEditorInsertHtml(Be("youtube", { id: e, time: t }));
          });
        },
        tooltip: "Insert a YouTube video",
      },
      date: {
        _date: function (e) {
          var t = new Date(),
            n = t.getYear(),
            o = t.getMonth() + 1,
            t = t.getDate();
          return (
            o < 10 && (o = "0" + o),
            t < 10 && (t = "0" + t),
            e.opts.dateFormat
              .replace(/year/i, (n = n < 2e3 ? 1900 + n : n))
              .replace(/month/i, o)
              .replace(/day/i, t)
          );
        },
        exec: function () {
          this.insertText(Pe.date._date(this));
        },
        txtExec: function () {
          this.insertText(Pe.date._date(this));
        },
        tooltip: "Insert current date",
      },
      time: {
        _time: function () {
          var e = new Date(),
            t = e.getHours(),
            n = e.getMinutes(),
            e = e.getSeconds();
          return (
            (t = t < 10 ? "0" + t : t) +
            ":" +
            (n = n < 10 ? "0" + n : n) +
            ":" +
            (e = e < 10 ? "0" + e : e)
          );
        },
        exec: function () {
          this.insertText(Pe.time._time());
        },
        txtExec: function () {
          this.insertText(Pe.time._time());
        },
        tooltip: "Insert current time",
      },
      ltr: {
        state: function (e, t) {
          return t && "ltr" === t.style.direction;
        },
        exec: function () {
          var e = this.getRangeHelper(),
            t = e.getFirstBlockParent();
          this.focus(),
            ((t && !_e(t, "body")) ||
              (this.execCommand("formatBlock", "p"),
              (t = e.getFirstBlockParent()) && !_e(t, "body"))) &&
              ((e = "ltr" === Re(t, "direction") ? "" : "ltr"),
              Re(t, "direction", e));
        },
        tooltip: "Left-to-Right",
      },
      rtl: {
        state: function (e, t) {
          return t && "rtl" === t.style.direction;
        },
        exec: function () {
          var e = this.getRangeHelper(),
            t = e.getFirstBlockParent();
          this.focus(),
            ((t && !_e(t, "body")) ||
              (this.execCommand("formatBlock", "p"),
              (t = e.getFirstBlockParent()) && !_e(t, "body"))) &&
              ((e = "rtl" === Re(t, "direction") ? "" : "rtl"),
              Re(t, "direction", e));
        },
        tooltip: "Right-to-Left",
      },
      print: { exec: "print", tooltip: "Print" },
      maximize: {
        state: function () {
          return this.maximize();
        },
        exec: function () {
          this.maximize(!this.maximize()), this.focus();
        },
        txtExec: function () {
          this.maximize(!this.maximize()), this.focus();
        },
        tooltip: "Maximize",
        shortcut: "Ctrl+Shift+M",
      },
      source: {
        state: function () {
          return this.sourceMode();
        },
        exec: function () {
          this.toggleSourceMode(), this.focus();
        },
        txtExec: function () {
          this.toggleSourceMode(), this.focus();
        },
        tooltip: "View source",
        shortcut: "Ctrl+Shift+S",
      },
      ignore: {},
    },
    w = {};
  function xt(i) {
    function a(e) {
      return "signal" + e.charAt(0).toUpperCase() + e.slice(1);
    }
    function e(e, t) {
      e = [].slice.call(e);
      for (var n, o = a(e.shift()), r = 0; r < l.length; r++)
        if (o in l[r] && ((n = l[r][o].apply(i, e)), t)) return n;
    }
    var r = this,
      l = [];
    (r.call = function () {
      e(arguments, !1);
    }),
      (r.callOnlyFirst = function () {
        return e(arguments, !0);
      }),
      (r.hasHandler = function (e) {
        var t = l.length;
        for (e = a(e); t--; ) if (e in l[t]) return !0;
        return !1;
      }),
      (r.exists = function (e) {
        return (
          e in w &&
          "function" == typeof (e = w[e]) &&
          "object" == typeof e.prototype
        );
      }),
      (r.isRegistered = function (e) {
        if (r.exists(e))
          for (var t = l.length; t--; ) if (l[t] instanceof w[e]) return !0;
        return !1;
      }),
      (r.register = function (e) {
        return (
          !(!r.exists(e) || r.isRegistered(e)) &&
          ((e = new w[e]()), l.push(e), "init" in e && e.init.call(i), !0)
        );
      }),
      (r.deregister = function (e) {
        var t,
          n = l.length,
          o = !1;
        if (r.isRegistered(e))
          for (; n--; )
            l[n] instanceof w[e] &&
              ((o = !0),
              "destroy" in (t = l.splice(n, 1)[0]) && t.destroy.call(i));
        return o;
      }),
      (r.destroy = function () {
        for (var e = l.length; e--; ) "destroy" in l[e] && l[e].destroy.call(i);
        (l = []), (i = null);
      });
  }
  xt.plugins = w;
  var x = function (e, t, n) {
    var o,
      r,
      i,
      a,
      l,
      c = "",
      s = e.startContainer,
      u = e.startOffset;
    for (
      s && 3 !== s.nodeType && ((s = s.childNodes[u]), (u = 0)), i = a = u;
      n > c.length && s && 3 === s.nodeType;

    )
      (o = s.nodeValue),
        (r = n - c.length),
        l && ((a = o.length), (i = 0)),
        (l = s),
        (s = t
          ? ((u = i = Math.max(a - r, 0)),
            (c = o.substr(i, a - i) + c),
            l.previousSibling)
          : ((u = i + (a = Math.min(r, o.length))),
            (c += o.substr(i, a)),
            l.nextSibling));
    return { node: l || s, offset: u, text: c };
  };
  function Tt(r, e, i) {
    var a,
      l,
      c = e || r.contentDocument || r.document,
      s = "sceditor-start-marker",
      u = "sceditor-end-marker",
      g = this;
    (g.insertHTML = function (e, t) {
      var n, o;
      if (!g.selectedRange()) return !1;
      for (
        t && (e += g.selectedHtml() + t),
          o = Ce("p", {}, c),
          n = c.createDocumentFragment(),
          o.innerHTML = i(e);
        o.firstChild;

      )
        Ne(n, o.firstChild);
      g.insertNode(n);
    }),
      (l = function (e, t, n) {
        var o,
          r = c.createDocumentFragment();
        if (
          ("string" == typeof e
            ? (t && (e += g.selectedHtml() + t), (r = ut(e)))
            : (Ne(r, e),
              t && (Ne(r, g.selectedRange().extractContents()), Ne(r, t))),
          (o = r.lastChild))
        ) {
          for (; !Ie(o.lastChild, !0); ) o = o.lastChild;
          return (
            pt(o)
              ? o.lastChild || Ne(o, document.createTextNode("​"))
              : (o = r),
            g.removeMarkers(),
            Ne(o, a(s)),
            Ne(o, a(u)),
            n ? (Ne((e = Ce("div")), r), e.innerHTML) : r
          );
        }
      }),
      (g.insertNode = function (e, t) {
        var n,
          o,
          e = l(e, t),
          t = g.selectedRange(),
          r = t.commonAncestorContainer,
          i = [];
        if (!e) return !1;
        function a(e) {
          e && p(e) && i.indexOf(e) < 0 && Se(e);
        }
        t.startContainer !== t.endContainer &&
          (we(r.childNodes, function (e, t) {
            p(t) && i.push(t);
          }),
          (n = e.firstChild),
          (o = e.lastChild)),
          t.deleteContents(),
          r && 3 !== r.nodeType && !pt(r)
            ? Oe(e, r)
            : (t.insertNode(e),
              a(n && n.previousSibling),
              a(o && o.nextSibling)),
          g.restoreRange();
      }),
      (g.cloneSelected = function () {
        var e = g.selectedRange();
        if (e) return e.cloneRange();
      }),
      (g.selectedRange = function () {
        var e,
          t,
          n = r.getSelection();
        if (n) {
          if (n.rangeCount <= 0) {
            for (t = c.body; t.firstChild; ) t = t.firstChild;
            (e = c.createRange()).setStartBefore(t), n.addRange(e);
          }
          return (e = 0 < n.rangeCount ? n.getRangeAt(0) : e);
        }
      }),
      (g.hasSelection = function () {
        var e = r.getSelection();
        return e && 0 < e.rangeCount;
      }),
      (g.selectedHtml = function () {
        var e,
          t = g.selectedRange();
        return t
          ? (Ne((e = Ce("p", {}, c)), t.cloneContents()), e.innerHTML)
          : "";
      }),
      (g.parentNode = function () {
        var e = g.selectedRange();
        if (e) return e.commonAncestorContainer;
      }),
      (g.getFirstBlockParent = function (e) {
        var t = function (e) {
          return Ie(e, !0) ? (e = e ? e.parentNode : null) && t(e) : e;
        };
        return t(e || g.parentNode());
      }),
      (g.insertNodeAt = function (e, t) {
        var n = g.selectedRange(),
          o = g.cloneSelected();
        if (!o) return !1;
        o.collapse(e), o.insertNode(t), g.selectRange(n);
      }),
      (a = function (e) {
        g.removeMarker(e);
        e = Ce(
          "span",
          {
            id: e,
            className: "sceditor-selection sceditor-ignore",
            style: "display:none;line-height:0",
          },
          c
        );
        return (e.innerHTML = " "), e;
      }),
      (g.insertMarkers = function () {
        var e = g.selectedRange(),
          t = a(s);
        g.removeMarkers(),
          g.insertNodeAt(!0, t),
          e && e.collapsed
            ? t.parentNode.insertBefore(a(u), t.nextSibling)
            : g.insertNodeAt(!1, a(u));
      }),
      (g.getMarker = function (e) {
        return c.getElementById(e);
      }),
      (g.removeMarker = function (e) {
        e = g.getMarker(e);
        e && Se(e);
      }),
      (g.removeMarkers = function () {
        g.removeMarker(s), g.removeMarker(u);
      }),
      (g.saveRange = function () {
        g.insertMarkers();
      }),
      (g.selectRange = function (e) {
        var t,
          n = r.getSelection(),
          o = e.endContainer;
        if (e.collapsed && o && !Ie(o, !0)) {
          for (t = o.lastChild; t && _e(t, ".sceditor-ignore"); )
            t = t.previousSibling;
          _e(t, "br") &&
            ((o = c.createRange()).setEndAfter(t),
            o.collapse(!1),
            g.compare(e, o) && (e.setStartBefore(t), e.collapse(!0)));
        }
        n && (g.clear(), n.addRange(e));
      }),
      (g.restoreRange = function () {
        var e,
          t = g.selectedRange(),
          n = g.getMarker(s),
          o = g.getMarker(u);
        if (!n || !o || !t) return !1;
        (e = n.nextSibling === o),
          (t = c.createRange()).setStartBefore(n),
          t.setEndAfter(o),
          e && t.collapse(!0),
          g.selectRange(t),
          g.removeMarkers();
      }),
      (g.selectOuterText = function (e, t) {
        var n = g.cloneSelected();
        if (!n) return !1;
        n.collapse(!1),
          (e = x(n, !0, e)),
          (t = x(n, !1, t)),
          n.setStart(e.node, e.offset),
          n.setEnd(t.node, t.offset),
          g.selectRange(n);
      }),
      (g.getOuterText = function (e, t) {
        var n = g.cloneSelected();
        return n ? (n.collapse(!e), x(n, e, t).text) : "";
      }),
      (g.replaceKeyword = function (e, t, n, o, r, i) {
        n ||
          e.sort(function (e, t) {
            return e[0].length - t[0].length;
          });
        var a,
          l,
          c,
          s,
          u,
          d,
          f,
          p = "(^|[\\s    ])",
          m = e.length,
          h = r ? 1 : 0,
          n = o || e[m - 1][0].length;
        for (
          r && n++,
            i = i || "",
            s = (a = g.getOuterText(!0, n)).length,
            a += i,
            t && (a += g.getOuterText(!1, n));
          m--;

        )
          if (
            ((f = (d = e[m][0]).length),
            (c = Math.max(0, s - f - h)),
            (l = -1),
            r
              ? (u = a.substr(c).match(new RegExp(p + wt(d) + p))) &&
                (l = u.index + c + u[1].length)
              : (l = a.indexOf(d, c)),
            -1 < l && l <= s && s <= l + f + h)
          )
            return (
              g.selectOuterText((u = s - l), f - u - (/^\S/.test(i) ? 1 : 0)),
              g.insertHTML(e[m][1]),
              !0
            );
        return !1;
      }),
      (g.compare = function (e, t) {
        return (
          (t = t || g.selectedRange()),
          e && t
            ? 0 === e.compareBoundaryPoints(Range.END_TO_END, t) &&
              0 === e.compareBoundaryPoints(Range.START_TO_START, t)
            : !e && !t
        );
      }),
      (g.clear = function () {
        var e = r.getSelection();
        e && (e.removeAllRanges ? e.removeAllRanges() : e.empty && e.empty());
      });
  }
  var T,
    C,
    e,
    t = navigator.userAgent,
    Ct = /iPhone|iPod|iPad| wosbrowser\//i.test(t),
    Et =
      ((T = !!window.document.documentMode),
      (C = "-ms-ime-align" in document.documentElement.style),
      ((e = document.createElement("div")).contentEditable = !0),
      "contentEditable" in document.documentElement &&
        "true" === e.contentEditable &&
        ((e = /Opera Mobi|Opera Mini/i.test(t)),
        /Android/i.test(t) &&
          ((e = !0),
          /Safari/.test(t) &&
            (e = !(n = /Safari\/(\d+)/.exec(t)) || !n[1] || n[1] < 534)),
        / Silk\//i.test(t) &&
          (e = !(n = /AppleWebKit\/(\d+)/.exec(t)) || !n[1] || n[1] < 534),
        Ct && (e = /OS [0-4](_\d)+ like Mac/i.test(t)),
        /Firefox/i.test(t) && (e = !1),
        /OneBrowser/i.test(t) && (e = !1),
        "UCWEB" === navigator.vendor && (e = !1),
        !(e = T || C ? !0 : e)));
  function St(e) {
    return (St =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (e) {
            return typeof e;
          }
        : function (e) {
            return e &&
              "function" == typeof Symbol &&
              e.constructor === Symbol &&
              e !== Symbol.prototype
              ? "symbol"
              : typeof e;
          })(e);
  }
  function E(e, t) {
    return (E =
      Object.setPrototypeOf ||
      function (e, t) {
        return (e.__proto__ = t), e;
      })(e, t);
  }
  function S(e, t, n) {
    return (S = (function () {
      if (
        "undefined" != typeof Reflect &&
        Reflect.construct &&
        !Reflect.construct.sham
      ) {
        if ("function" == typeof Proxy) return 1;
        try {
          return (
            Boolean.prototype.valueOf.call(
              Reflect.construct(Boolean, [], function () {})
            ),
            1
          );
        } catch (e) {}
      }
    })()
      ? Reflect.construct
      : function (e, t, n) {
          var o = [null];
          o.push.apply(o, t);
          t = new (Function.bind.apply(e, o))();
          return n && E(t, n.prototype), t;
        }).apply(null, arguments);
  }
  function Ue(e) {
    return (
      (function (e) {
        if (Array.isArray(e)) return N(e);
      })(e) ||
      (function (e) {
        if (
          ("undefined" != typeof Symbol && null != e[Symbol.iterator]) ||
          null != e["@@iterator"]
        )
          return Array.from(e);
      })(e) ||
      (function (e, t) {
        var n;
        if (e)
          return "string" == typeof e
            ? N(e, t)
            : "Map" ===
                (n =
                  "Object" ===
                    (n = Object.prototype.toString.call(e).slice(8, -1)) &&
                  e.constructor
                    ? e.constructor.name
                    : n) || "Set" === n
            ? Array.from(e)
            : "Arguments" === n ||
              /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)
            ? N(e, t)
            : void 0;
      })(e) ||
      (function () {
        throw new TypeError(
          "Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
        );
      })()
    );
  }
  function N(e, t) {
    (null == t || t > e.length) && (t = e.length);
    for (var n = 0, o = new Array(t); n < t; n++) o[n] = e[n];
    return o;
  }
  var k,
    D = Object.hasOwnProperty,
    M = Object.setPrototypeOf,
    A = Object.isFrozen,
    R = Object.getPrototypeOf,
    _ = Object.getOwnPropertyDescriptor,
    je = Object.freeze,
    n = Object.seal,
    O = Object.create,
    t = "undefined" != typeof Reflect && Reflect,
    F =
      (F = t.apply) ||
      function (e, t, n) {
        return e.apply(t, n);
      },
    je =
      je ||
      function (e) {
        return e;
      },
    n =
      n ||
      function (e) {
        return e;
      },
    H =
      (H = t.construct) ||
      function (e, t) {
        return S(e, Ue(t));
      },
    Nt = o(Array.prototype.forEach),
    kt = o(Array.prototype.pop),
    Dt = o(Array.prototype.push),
    Mt = o(String.prototype.toLowerCase),
    At = o(String.prototype.toString),
    Rt = o(String.prototype.match),
    We = o(String.prototype.replace),
    _t = o(String.prototype.indexOf),
    Ot = o(String.prototype.trim),
    Ve = o(RegExp.prototype.test),
    Ft =
      ((k = TypeError),
      function () {
        for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
          t[n] = arguments[n];
        return H(k, t);
      });
  function o(r) {
    return function (e) {
      for (
        var t = arguments.length, n = new Array(1 < t ? t - 1 : 0), o = 1;
        o < t;
        o++
      )
        n[o - 1] = arguments[o];
      return F(r, e, n);
    };
  }
  function Ge(e, t, n) {
    (n = n || Mt), M && M(e, null);
    for (var o = t.length; o--; ) {
      var r,
        i = t[o];
      "string" != typeof i ||
        ((r = n(i)) !== i && (A(t) || (t[o] = r), (i = r))),
        (e[i] = !0);
    }
    return e;
  }
  function Ht(e) {
    var t,
      n = O(null);
    for (t in e) !0 === F(D, e, [t]) && (n[t] = e[t]);
    return n;
  }
  function Lt(e, t) {
    for (; null !== e; ) {
      var n = _(e, t);
      if (n) {
        if (n.get) return o(n.get);
        if ("function" == typeof n.value) return o(n.value);
      }
      e = R(e);
    }
    return function (e) {
      return console.warn("fallback value for", e), null;
    };
  }
  var It = je([
      "a",
      "abbr",
      "acronym",
      "address",
      "area",
      "article",
      "aside",
      "audio",
      "b",
      "bdi",
      "bdo",
      "big",
      "blink",
      "blockquote",
      "body",
      "br",
      "button",
      "canvas",
      "caption",
      "center",
      "cite",
      "code",
      "col",
      "colgroup",
      "content",
      "data",
      "datalist",
      "dd",
      "decorator",
      "del",
      "details",
      "dfn",
      "dialog",
      "dir",
      "div",
      "dl",
      "dt",
      "element",
      "em",
      "fieldset",
      "figcaption",
      "figure",
      "font",
      "footer",
      "form",
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "head",
      "header",
      "hgroup",
      "hr",
      "html",
      "i",
      "img",
      "input",
      "ins",
      "kbd",
      "label",
      "legend",
      "li",
      "main",
      "map",
      "mark",
      "marquee",
      "menu",
      "menuitem",
      "meter",
      "nav",
      "nobr",
      "ol",
      "optgroup",
      "option",
      "output",
      "p",
      "picture",
      "pre",
      "progress",
      "q",
      "rp",
      "rt",
      "ruby",
      "s",
      "samp",
      "section",
      "select",
      "shadow",
      "small",
      "source",
      "spacer",
      "span",
      "strike",
      "strong",
      "style",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "template",
      "textarea",
      "tfoot",
      "th",
      "thead",
      "time",
      "tr",
      "track",
      "tt",
      "u",
      "ul",
      "var",
      "video",
      "wbr",
    ]),
    zt = je([
      "svg",
      "a",
      "altglyph",
      "altglyphdef",
      "altglyphitem",
      "animatecolor",
      "animatemotion",
      "animatetransform",
      "circle",
      "clippath",
      "defs",
      "desc",
      "ellipse",
      "filter",
      "font",
      "g",
      "glyph",
      "glyphref",
      "hkern",
      "image",
      "line",
      "lineargradient",
      "marker",
      "mask",
      "metadata",
      "mpath",
      "path",
      "pattern",
      "polygon",
      "polyline",
      "radialgradient",
      "rect",
      "stop",
      "style",
      "switch",
      "symbol",
      "text",
      "textpath",
      "title",
      "tref",
      "tspan",
      "view",
      "vkern",
    ]),
    Bt = je([
      "feBlend",
      "feColorMatrix",
      "feComponentTransfer",
      "feComposite",
      "feConvolveMatrix",
      "feDiffuseLighting",
      "feDisplacementMap",
      "feDistantLight",
      "feFlood",
      "feFuncA",
      "feFuncB",
      "feFuncG",
      "feFuncR",
      "feGaussianBlur",
      "feImage",
      "feMerge",
      "feMergeNode",
      "feMorphology",
      "feOffset",
      "fePointLight",
      "feSpecularLighting",
      "feSpotLight",
      "feTile",
      "feTurbulence",
    ]),
    Pt = je([
      "animate",
      "color-profile",
      "cursor",
      "discard",
      "fedropshadow",
      "font-face",
      "font-face-format",
      "font-face-name",
      "font-face-src",
      "font-face-uri",
      "foreignobject",
      "hatch",
      "hatchpath",
      "mesh",
      "meshgradient",
      "meshpatch",
      "meshrow",
      "missing-glyph",
      "script",
      "set",
      "solidcolor",
      "unknown",
      "use",
    ]),
    Ut = je([
      "math",
      "menclose",
      "merror",
      "mfenced",
      "mfrac",
      "mglyph",
      "mi",
      "mlabeledtr",
      "mmultiscripts",
      "mn",
      "mo",
      "mover",
      "mpadded",
      "mphantom",
      "mroot",
      "mrow",
      "ms",
      "mspace",
      "msqrt",
      "mstyle",
      "msub",
      "msup",
      "msubsup",
      "mtable",
      "mtd",
      "mtext",
      "mtr",
      "munder",
      "munderover",
    ]),
    jt = je([
      "maction",
      "maligngroup",
      "malignmark",
      "mlongdiv",
      "mscarries",
      "mscarry",
      "msgroup",
      "mstack",
      "msline",
      "msrow",
      "semantics",
      "annotation",
      "annotation-xml",
      "mprescripts",
      "none",
    ]),
    Wt = je(["#text"]),
    Vt = je([
      "accept",
      "action",
      "align",
      "alt",
      "autocapitalize",
      "autocomplete",
      "autopictureinpicture",
      "autoplay",
      "background",
      "bgcolor",
      "border",
      "capture",
      "cellpadding",
      "cellspacing",
      "checked",
      "cite",
      "class",
      "clear",
      "color",
      "cols",
      "colspan",
      "controls",
      "controlslist",
      "coords",
      "crossorigin",
      "datetime",
      "decoding",
      "default",
      "dir",
      "disabled",
      "disablepictureinpicture",
      "disableremoteplayback",
      "download",
      "draggable",
      "enctype",
      "enterkeyhint",
      "face",
      "for",
      "headers",
      "height",
      "hidden",
      "high",
      "href",
      "hreflang",
      "id",
      "inputmode",
      "integrity",
      "ismap",
      "kind",
      "label",
      "lang",
      "list",
      "loading",
      "loop",
      "low",
      "max",
      "maxlength",
      "media",
      "method",
      "min",
      "minlength",
      "multiple",
      "muted",
      "name",
      "nonce",
      "noshade",
      "novalidate",
      "nowrap",
      "open",
      "optimum",
      "pattern",
      "placeholder",
      "playsinline",
      "poster",
      "preload",
      "pubdate",
      "radiogroup",
      "readonly",
      "rel",
      "required",
      "rev",
      "reversed",
      "role",
      "rows",
      "rowspan",
      "spellcheck",
      "scope",
      "selected",
      "shape",
      "size",
      "sizes",
      "span",
      "srclang",
      "start",
      "src",
      "srcset",
      "step",
      "style",
      "summary",
      "tabindex",
      "title",
      "translate",
      "type",
      "usemap",
      "valign",
      "value",
      "width",
      "xmlns",
      "slot",
    ]),
    Gt = je([
      "accent-height",
      "accumulate",
      "additive",
      "alignment-baseline",
      "ascent",
      "attributename",
      "attributetype",
      "azimuth",
      "basefrequency",
      "baseline-shift",
      "begin",
      "bias",
      "by",
      "class",
      "clip",
      "clippathunits",
      "clip-path",
      "clip-rule",
      "color",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "cx",
      "cy",
      "d",
      "dx",
      "dy",
      "diffuseconstant",
      "direction",
      "display",
      "divisor",
      "dur",
      "edgemode",
      "elevation",
      "end",
      "fill",
      "fill-opacity",
      "fill-rule",
      "filter",
      "filterunits",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "fx",
      "fy",
      "g1",
      "g2",
      "glyph-name",
      "glyphref",
      "gradientunits",
      "gradienttransform",
      "height",
      "href",
      "id",
      "image-rendering",
      "in",
      "in2",
      "k",
      "k1",
      "k2",
      "k3",
      "k4",
      "kerning",
      "keypoints",
      "keysplines",
      "keytimes",
      "lang",
      "lengthadjust",
      "letter-spacing",
      "kernelmatrix",
      "kernelunitlength",
      "lighting-color",
      "local",
      "marker-end",
      "marker-mid",
      "marker-start",
      "markerheight",
      "markerunits",
      "markerwidth",
      "maskcontentunits",
      "maskunits",
      "max",
      "mask",
      "media",
      "method",
      "mode",
      "min",
      "name",
      "numoctaves",
      "offset",
      "operator",
      "opacity",
      "order",
      "orient",
      "orientation",
      "origin",
      "overflow",
      "paint-order",
      "path",
      "pathlength",
      "patterncontentunits",
      "patterntransform",
      "patternunits",
      "points",
      "preservealpha",
      "preserveaspectratio",
      "primitiveunits",
      "r",
      "rx",
      "ry",
      "radius",
      "refx",
      "refy",
      "repeatcount",
      "repeatdur",
      "restart",
      "result",
      "rotate",
      "scale",
      "seed",
      "shape-rendering",
      "specularconstant",
      "specularexponent",
      "spreadmethod",
      "startoffset",
      "stddeviation",
      "stitchtiles",
      "stop-color",
      "stop-opacity",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke",
      "stroke-width",
      "style",
      "surfacescale",
      "systemlanguage",
      "tabindex",
      "targetx",
      "targety",
      "transform",
      "transform-origin",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "textlength",
      "type",
      "u1",
      "u2",
      "unicode",
      "values",
      "viewbox",
      "visibility",
      "version",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "width",
      "word-spacing",
      "wrap",
      "writing-mode",
      "xchannelselector",
      "ychannelselector",
      "x",
      "x1",
      "x2",
      "xmlns",
      "y",
      "y1",
      "y2",
      "z",
      "zoomandpan",
    ]),
    qt = je([
      "accent",
      "accentunder",
      "align",
      "bevelled",
      "close",
      "columnsalign",
      "columnlines",
      "columnspan",
      "denomalign",
      "depth",
      "dir",
      "display",
      "displaystyle",
      "encoding",
      "fence",
      "frame",
      "height",
      "href",
      "id",
      "largeop",
      "length",
      "linethickness",
      "lspace",
      "lquote",
      "mathbackground",
      "mathcolor",
      "mathsize",
      "mathvariant",
      "maxsize",
      "minsize",
      "movablelimits",
      "notation",
      "numalign",
      "open",
      "rowalign",
      "rowlines",
      "rowspacing",
      "rowspan",
      "rspace",
      "rquote",
      "scriptlevel",
      "scriptminsize",
      "scriptsizemultiplier",
      "selection",
      "separator",
      "separators",
      "stretchy",
      "subscriptshift",
      "supscriptshift",
      "symmetric",
      "voffset",
      "width",
      "xmlns",
    ]),
    $t = je([
      "xlink:href",
      "xml:id",
      "xlink:title",
      "xml:space",
      "xmlns:xlink",
    ]),
    Yt = n(/\{\{[\w\W]*|[\w\W]*\}\}/gm),
    Kt = n(/<%[\w\W]*|[\w\W]*%>/gm),
    Xt = n(/\${[\w\W]*}/gm),
    Zt = n(/^data-[\-\w.\u00B7-\uFFFF]/),
    Jt = n(/^aria-[\-\w]+$/),
    Qt = n(
      /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i
    ),
    en = n(/^(?:\w+script|data):/i),
    tn = n(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),
    nn = n(/^html$/i);
  var on = (function L(e) {
      var l =
          0 < arguments.length && void 0 !== e
            ? e
            : "undefined" == typeof window
            ? null
            : window,
        s = function (e) {
          return L(e);
        };
      if (
        ((s.version = "2.4.3"),
        (s.removed = []),
        l && l.document && 9 === l.document.nodeType)
      ) {
        var c = l.document,
          r = l.document,
          I = l.DocumentFragment,
          e = l.HTMLTemplateElement,
          u = l.Node,
          z = l.Element,
          t = l.NodeFilter,
          B =
            void 0 === (n = l.NamedNodeMap)
              ? l.NamedNodeMap || l.MozNamedAttrMap
              : n,
          P = l.HTMLFormElement,
          U = l.DOMParser,
          d = l.trustedTypes,
          j = Lt((n = z.prototype), "cloneNode"),
          W = Lt(n, "nextSibling"),
          V = Lt(n, "childNodes"),
          f = Lt(n, "parentNode"),
          p =
            ("function" == typeof e &&
              (n = r.createElement("template")).content &&
              n.content.ownerDocument &&
              (r = n.content.ownerDocument),
            (function (e, t) {
              if ("object" !== St(e) || "function" != typeof e.createPolicy)
                return null;
              var n = null,
                o = "data-tt-policy-suffix",
                t =
                  "dompurify" +
                  ((n =
                    t.currentScript && t.currentScript.hasAttribute(o)
                      ? t.currentScript.getAttribute(o)
                      : n)
                    ? "#" + n
                    : "");
              try {
                return e.createPolicy(t, {
                  createHTML: function (e) {
                    return e;
                  },
                  createScriptURL: function (e) {
                    return e;
                  },
                });
              } catch (e) {
                return (
                  console.warn(
                    "TrustedTypes policy " + t + " could not be created."
                  ),
                  null
                );
              }
            })(d, c)),
          m = p ? p.createHTML("") : "",
          e = r,
          G = e.implementation,
          q = e.createNodeIterator,
          $ = e.createDocumentFragment,
          Y = e.getElementsByTagName,
          K = c.importNode,
          n = {};
        try {
          n = Ht(r).documentMode ? r.documentMode : {};
        } catch (e) {}
        var X,
          h,
          g,
          o = {},
          Z =
            ((s.isSupported =
              "function" == typeof f &&
              G &&
              void 0 !== G.createHTMLDocument &&
              9 !== n),
            Yt),
          J = Kt,
          Q = Xt,
          ee = Zt,
          te = Jt,
          ne = en,
          oe = tn,
          re = Qt,
          y = null,
          ie = Ge({}, [].concat(Ue(It), Ue(zt), Ue(Bt), Ue(Ut), Ue(Wt))),
          v = null,
          ae = Ge({}, [].concat(Ue(Vt), Ue(Gt), Ue(qt), Ue($t))),
          b = Object.seal(
            Object.create(null, {
              tagNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null,
              },
              attributeNameCheck: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: null,
              },
              allowCustomizedBuiltInElements: {
                writable: !0,
                configurable: !1,
                enumerable: !0,
                value: !1,
              },
            })
          ),
          w = null,
          le = null,
          ce = !0,
          se = !0,
          ue = !1,
          x = !1,
          T = !1,
          de = !1,
          fe = !1,
          C = !1,
          E = !1,
          S = !1,
          pe = !0,
          me = !1,
          he = "user-content-",
          ge = !0,
          N = !1,
          i = {},
          k = null,
          ye = Ge({}, [
            "annotation-xml",
            "audio",
            "colgroup",
            "desc",
            "foreignobject",
            "head",
            "iframe",
            "math",
            "mi",
            "mn",
            "mo",
            "ms",
            "mtext",
            "noembed",
            "noframes",
            "noscript",
            "plaintext",
            "script",
            "style",
            "svg",
            "template",
            "thead",
            "title",
            "video",
            "xmp",
          ]),
          ve = null,
          be = Ge({}, ["audio", "video", "img", "source", "image", "track"]),
          we = null,
          xe = Ge({}, [
            "alt",
            "class",
            "for",
            "id",
            "label",
            "name",
            "pattern",
            "placeholder",
            "role",
            "summary",
            "title",
            "value",
            "style",
            "xmlns",
          ]),
          D = "http://www.w3.org/1998/Math/MathML",
          M = "http://www.w3.org/2000/svg",
          A = "http://www.w3.org/1999/xhtml",
          R = A,
          Te = null,
          Ce = Ge({}, [D, M, A], At),
          Ee = ["application/xhtml+xml", "text/html"],
          a = null,
          Se = r.createElement("form"),
          Ne = function (e) {
            return e instanceof RegExp || e instanceof Function;
          },
          ke = function (e) {
            (a && a === e) ||
              ((e = Ht((e = e && "object" === St(e) ? e : {}))),
              (h = h =
                -1 === Ee.indexOf(e.PARSER_MEDIA_TYPE)
                  ? "text/html"
                  : e.PARSER_MEDIA_TYPE),
              (g = "application/xhtml+xml" === h ? At : Mt),
              (y = "ALLOWED_TAGS" in e ? Ge({}, e.ALLOWED_TAGS, g) : ie),
              (v = "ALLOWED_ATTR" in e ? Ge({}, e.ALLOWED_ATTR, g) : ae),
              (Te =
                "ALLOWED_NAMESPACES" in e
                  ? Ge({}, e.ALLOWED_NAMESPACES, At)
                  : Ce),
              (we =
                "ADD_URI_SAFE_ATTR" in e
                  ? Ge(Ht(xe), e.ADD_URI_SAFE_ATTR, g)
                  : xe),
              (ve =
                "ADD_DATA_URI_TAGS" in e
                  ? Ge(Ht(be), e.ADD_DATA_URI_TAGS, g)
                  : be),
              (k = "FORBID_CONTENTS" in e ? Ge({}, e.FORBID_CONTENTS, g) : ye),
              (w = "FORBID_TAGS" in e ? Ge({}, e.FORBID_TAGS, g) : {}),
              (le = "FORBID_ATTR" in e ? Ge({}, e.FORBID_ATTR, g) : {}),
              (i = "USE_PROFILES" in e && e.USE_PROFILES),
              (ce = !1 !== e.ALLOW_ARIA_ATTR),
              (se = !1 !== e.ALLOW_DATA_ATTR),
              (ue = e.ALLOW_UNKNOWN_PROTOCOLS || !1),
              (x = e.SAFE_FOR_TEMPLATES || !1),
              (T = e.WHOLE_DOCUMENT || !1),
              (C = e.RETURN_DOM || !1),
              (E = e.RETURN_DOM_FRAGMENT || !1),
              (S = e.RETURN_TRUSTED_TYPE || !1),
              (fe = e.FORCE_BODY || !1),
              (pe = !1 !== e.SANITIZE_DOM),
              (me = e.SANITIZE_NAMED_PROPS || !1),
              (ge = !1 !== e.KEEP_CONTENT),
              (N = e.IN_PLACE || !1),
              (re = e.ALLOWED_URI_REGEXP || re),
              (R = e.NAMESPACE || A),
              e.CUSTOM_ELEMENT_HANDLING &&
                Ne(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck) &&
                (b.tagNameCheck = e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),
              e.CUSTOM_ELEMENT_HANDLING &&
                Ne(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck) &&
                (b.attributeNameCheck =
                  e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),
              e.CUSTOM_ELEMENT_HANDLING &&
                "boolean" ==
                  typeof e.CUSTOM_ELEMENT_HANDLING
                    .allowCustomizedBuiltInElements &&
                (b.allowCustomizedBuiltInElements =
                  e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),
              x && (se = !1),
              E && (C = !0),
              i &&
                ((y = Ge({}, Ue(Wt))),
                (v = []),
                !0 === i.html && (Ge(y, It), Ge(v, Vt)),
                !0 === i.svg && (Ge(y, zt), Ge(v, Gt), Ge(v, $t)),
                !0 === i.svgFilters && (Ge(y, Bt), Ge(v, Gt), Ge(v, $t)),
                !0 === i.mathMl && (Ge(y, Ut), Ge(v, qt), Ge(v, $t))),
              e.ADD_TAGS && Ge((y = y === ie ? Ht(y) : y), e.ADD_TAGS, g),
              e.ADD_ATTR && Ge((v = v === ae ? Ht(v) : v), e.ADD_ATTR, g),
              e.ADD_URI_SAFE_ATTR && Ge(we, e.ADD_URI_SAFE_ATTR, g),
              e.FORBID_CONTENTS &&
                Ge((k = k === ye ? Ht(k) : k), e.FORBID_CONTENTS, g),
              ge && (y["#text"] = !0),
              T && Ge(y, ["html", "head", "body"]),
              y.table && (Ge(y, ["tbody"]), delete w.tbody),
              je && je(e),
              (a = e));
          },
          De = Ge({}, ["mi", "mo", "mn", "ms", "mtext"]),
          Me = Ge({}, ["foreignobject", "desc", "title", "annotation-xml"]),
          Ae = Ge({}, ["title", "style", "font", "a", "script"]),
          _ = Ge({}, zt),
          Re = (Ge(_, Bt), Ge(_, Pt), Ge({}, Ut)),
          O =
            (Ge(Re, jt),
            function (t) {
              Dt(s.removed, { element: t });
              try {
                t.parentNode.removeChild(t);
              } catch (e) {
                try {
                  t.outerHTML = m;
                } catch (e) {
                  t.remove();
                }
              }
            }),
          _e = function (e, t) {
            try {
              Dt(s.removed, { attribute: t.getAttributeNode(e), from: t });
            } catch (e) {
              Dt(s.removed, { attribute: null, from: t });
            }
            if ((t.removeAttribute(e), "is" === e && !v[e]))
              if (C || E)
                try {
                  O(t);
                } catch (e) {}
              else
                try {
                  t.setAttribute(e, "");
                } catch (e) {}
          },
          Oe = function (e) {
            fe
              ? (e = "<remove></remove>" + e)
              : (n = (n = Rt(e, /^[\r\n\t ]+/)) && n[0]),
              "application/xhtml+xml" === h &&
                R === A &&
                (e =
                  '<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>' +
                  e +
                  "</body></html>");
            var t,
              n,
              o = p ? p.createHTML(e) : e;
            if (R === A)
              try {
                t = new U().parseFromString(o, h);
              } catch (e) {}
            if (!t || !t.documentElement) {
              t = G.createDocument(R, "template", null);
              try {
                t.documentElement.innerHTML = X ? m : o;
              } catch (e) {}
            }
            return (
              (o = t.body || t.documentElement),
              e &&
                n &&
                o.insertBefore(r.createTextNode(n), o.childNodes[0] || null),
              R === A
                ? Y.call(t, T ? "html" : "body")[0]
                : T
                ? t.documentElement
                : o
            );
          },
          Fe = function (e) {
            return q.call(
              e.ownerDocument || e,
              e,
              t.SHOW_ELEMENT | t.SHOW_COMMENT | t.SHOW_TEXT,
              null,
              !1
            );
          },
          F = function (e) {
            return "object" === St(u)
              ? e instanceof u
              : e &&
                  "object" === St(e) &&
                  "number" == typeof e.nodeType &&
                  "string" == typeof e.nodeName;
          },
          H = function (e, t, n) {
            o[e] &&
              Nt(o[e], function (e) {
                e.call(s, t, n, a);
              });
          },
          He = function (e) {
            if (
              (H("beforeSanitizeElements", e, null),
              (!((i = e) instanceof P) ||
                ("string" == typeof i.nodeName &&
                  "string" == typeof i.textContent &&
                  "function" == typeof i.removeChild &&
                  i.attributes instanceof B &&
                  "function" == typeof i.removeAttribute &&
                  "function" == typeof i.setAttribute &&
                  "string" == typeof i.namespaceURI &&
                  "function" == typeof i.insertBefore &&
                  "function" == typeof i.hasChildNodes)) &&
                !Ve(/[\u0080-\uFFFF]/, e.nodeName))
            ) {
              var t,
                n,
                o,
                r,
                i = g(e.nodeName);
              if (
                (H("uponSanitizeElement", e, { tagName: i, allowedTags: y }),
                (!e.hasChildNodes() ||
                  F(e.firstElementChild) ||
                  (F(e.content) && F(e.content.firstElementChild)) ||
                  !Ve(/<[/\w]/g, e.innerHTML) ||
                  !Ve(/<[/\w]/g, e.textContent)) &&
                  ("select" !== i || !Ve(/<template/i, e.innerHTML)))
              ) {
                if (y[i] && !w[i])
                  return (e instanceof z &&
                    (((n = f((t = e))) && n.tagName) ||
                      (n = { namespaceURI: R, tagName: "template" }),
                    (o = Mt(t.tagName)),
                    (r = Mt(n.tagName)),
                    !Te[t.namespaceURI] ||
                      (t.namespaceURI === M
                        ? n.namespaceURI === A
                          ? "svg" !== o
                          : n.namespaceURI === D
                          ? "svg" !== o || ("annotation-xml" !== r && !De[r])
                          : !Boolean(_[o])
                        : t.namespaceURI === D
                        ? n.namespaceURI === A
                          ? "math" !== o
                          : n.namespaceURI === M
                          ? "math" !== o || !Me[r]
                          : !Boolean(Re[o])
                        : t.namespaceURI === A
                        ? (n.namespaceURI === M && !Me[r]) ||
                          (n.namespaceURI === D && !De[r]) ||
                          Re[o] ||
                          (!Ae[o] && _[o])
                        : "application/xhtml+xml" !== h ||
                          !Te[t.namespaceURI]))) ||
                    (("noscript" === i || "noembed" === i) &&
                      Ve(/<\/no(script|embed)/i, e.innerHTML))
                    ? (O(e), !0)
                    : (x &&
                        3 === e.nodeType &&
                        ((n = e.textContent),
                        (n = We(n, Z, " ")),
                        (n = We(n, J, " ")),
                        (n = We(n, Q, " ")),
                        e.textContent !== n &&
                          (Dt(s.removed, { element: e.cloneNode() }),
                          (e.textContent = n))),
                      H("afterSanitizeElements", e, null),
                      !1);
                if (!w[i] && Ie(i)) {
                  if (b.tagNameCheck instanceof RegExp && Ve(b.tagNameCheck, i))
                    return !1;
                  if (b.tagNameCheck instanceof Function && b.tagNameCheck(i))
                    return !1;
                }
                if (ge && !k[i]) {
                  var a = f(e) || e.parentNode,
                    l = V(e) || e.childNodes;
                  if (l && a)
                    for (var c = l.length - 1; 0 <= c; --c)
                      a.insertBefore(j(l[c], !0), W(e));
                }
              }
            }
            return O(e), !0;
          },
          Le = function (e, t, n) {
            if (pe && ("id" === t || "name" === t) && (n in r || n in Se))
              return !1;
            if ((!se || le[t] || !Ve(ee, t)) && (!ce || !Ve(te, t)))
              if (!v[t] || le[t]) {
                if (
                  !(
                    (Ie(e) &&
                      ((b.tagNameCheck instanceof RegExp &&
                        Ve(b.tagNameCheck, e)) ||
                        (b.tagNameCheck instanceof Function &&
                          b.tagNameCheck(e))) &&
                      ((b.attributeNameCheck instanceof RegExp &&
                        Ve(b.attributeNameCheck, t)) ||
                        (b.attributeNameCheck instanceof Function &&
                          b.attributeNameCheck(t)))) ||
                    ("is" === t &&
                      b.allowCustomizedBuiltInElements &&
                      ((b.tagNameCheck instanceof RegExp &&
                        Ve(b.tagNameCheck, n)) ||
                        (b.tagNameCheck instanceof Function &&
                          b.tagNameCheck(n))))
                  )
                )
                  return !1;
              } else if (
                !we[t] &&
                !Ve(re, We(n, oe, "")) &&
                (("src" !== t && "xlink:href" !== t && "href" !== t) ||
                  "script" === e ||
                  0 !== _t(n, "data:") ||
                  !ve[e]) &&
                (!ue || Ve(ne, We(n, oe, ""))) &&
                n
              )
                return !1;
            return !0;
          },
          Ie = function (e) {
            return 0 < e.indexOf("-");
          },
          ze = function (e) {
            H("beforeSanitizeAttributes", e, null);
            var t = e.attributes;
            if (t) {
              for (
                var n = {
                    attrName: "",
                    attrValue: "",
                    keepAttr: !0,
                    allowedAttributes: v,
                  },
                  o = t.length;
                o--;

              ) {
                var r = (l = t[o]).name,
                  i = l.namespaceURI,
                  a = "value" === r ? l.value : Ot(l.value),
                  l = g(r);
                if (
                  ((n.attrName = l),
                  (n.attrValue = a),
                  (n.keepAttr = !0),
                  (n.forceKeepAttr = void 0),
                  H("uponSanitizeAttribute", e, n),
                  (a = n.attrValue),
                  !n.forceKeepAttr && (_e(r, e), n.keepAttr))
                )
                  if (Ve(/\/>/i, a)) _e(r, e);
                  else {
                    x &&
                      ((a = We(a, Z, " ")),
                      (a = We(a, J, " ")),
                      (a = We(a, Q, " ")));
                    var c = g(e.nodeName);
                    if (Le(c, l, a)) {
                      if (
                        (!me ||
                          ("id" !== l && "name" !== l) ||
                          (_e(r, e), (a = he + a)),
                        p &&
                          "object" === St(d) &&
                          "function" == typeof d.getAttributeType &&
                          !i)
                      )
                        switch (d.getAttributeType(c, l)) {
                          case "TrustedHTML":
                            a = p.createHTML(a);
                            break;
                          case "TrustedScriptURL":
                            a = p.createScriptURL(a);
                        }
                      try {
                        i ? e.setAttributeNS(i, r, a) : e.setAttribute(r, a),
                          kt(s.removed);
                      } catch (e) {}
                    }
                  }
              }
              H("afterSanitizeAttributes", e, null);
            }
          },
          Be = function e(t) {
            var n,
              o = Fe(t);
            for (H("beforeSanitizeShadowDOM", t, null); (n = o.nextNode()); )
              H("uponSanitizeShadowNode", n, null),
                He(n) || (n.content instanceof I && e(n.content), ze(n));
            H("afterSanitizeShadowDOM", t, null);
          };
        (s.sanitize = function (e) {
          var t,
            n,
            o,
            r,
            i =
              1 < arguments.length && void 0 !== arguments[1]
                ? arguments[1]
                : {};
          if ("string" != typeof (e = (X = !e) ? "\x3c!--\x3e" : e) && !F(e)) {
            if ("function" != typeof e.toString)
              throw Ft("toString is not a function");
            if ("string" != typeof (e = e.toString()))
              throw Ft("dirty is not a string, aborting");
          }
          if (!s.isSupported) {
            if (
              "object" === St(l.toStaticHTML) ||
              "function" == typeof l.toStaticHTML
            ) {
              if ("string" == typeof e) return l.toStaticHTML(e);
              if (F(e)) return l.toStaticHTML(e.outerHTML);
            }
            return e;
          }
          if (
            (de || ke(i), (s.removed = []), (N = "string" != typeof e && N))
          ) {
            if (e.nodeName) {
              i = g(e.nodeName);
              if (!y[i] || w[i])
                throw Ft(
                  "root node is forbidden and cannot be sanitized in-place"
                );
            }
          } else if (e instanceof u)
            (1 ===
              (i = (t = Oe("\x3c!----\x3e")).ownerDocument.importNode(e, !0))
                .nodeType &&
              "BODY" === i.nodeName) ||
            "HTML" === i.nodeName
              ? (t = i)
              : t.appendChild(i);
          else {
            if (!C && !x && !T && -1 === e.indexOf("<"))
              return p && S ? p.createHTML(e) : e;
            if (!(t = Oe(e))) return C ? null : S ? m : "";
          }
          t && fe && O(t.firstChild);
          for (var a = Fe(N ? e : t); (n = a.nextNode()); )
            (3 === n.nodeType && n === o) ||
              He(n) ||
              (n.content instanceof I && Be(n.content), ze(n), (o = n));
          if (((o = null), N)) return e;
          if (C) {
            if (E)
              for (r = $.call(t.ownerDocument); t.firstChild; )
                r.appendChild(t.firstChild);
            else r = t;
            return (r = v.shadowroot ? K.call(c, r, !0) : r);
          }
          return (
            (i = T ? t.outerHTML : t.innerHTML),
            T &&
              y["!doctype"] &&
              t.ownerDocument &&
              t.ownerDocument.doctype &&
              t.ownerDocument.doctype.name &&
              Ve(nn, t.ownerDocument.doctype.name) &&
              (i = "<!DOCTYPE " + t.ownerDocument.doctype.name + ">\n" + i),
            x &&
              ((i = We(i, Z, " ")), (i = We(i, J, " ")), (i = We(i, Q, " "))),
            p && S ? p.createHTML(i) : i
          );
        }),
          (s.setConfig = function (e) {
            ke(e), (de = !0);
          }),
          (s.clearConfig = function () {
            (a = null), (de = !1);
          }),
          (s.isValidAttribute = function (e, t, n) {
            return a || ke({}), (e = g(e)), (t = g(t)), Le(e, t, n);
          }),
          (s.addHook = function (e, t) {
            "function" == typeof t && ((o[e] = o[e] || []), Dt(o[e], t));
          }),
          (s.removeHook = function (e) {
            if (o[e]) return kt(o[e]);
          }),
          (s.removeHooks = function (e) {
            o[e] && (o[e] = []);
          }),
          (s.removeAllHooks = function () {
            o = {};
          });
      } else s.isSupported = !1;
      return s;
    })(),
    qe = window,
    $e = document,
    rn = /^image\/(p?jpe?g|gif|png|bmp)$/i;
  function an(e, t) {
    var n;
    d(
      e,
      function (e) {
        Ie(e, !0)
          ? (n || e.nodeType === Te
              ? /\S/.test(e.nodeValue)
              : !_e(e, ".sceditor-ignore")) &&
            (n || Oe((n = Ce("p", {}, t)), e), Ne(n, e))
          : (n = null);
      },
      !1,
      !0
    );
  }
  function Ye(r, e) {
    var a,
      w,
      u,
      i,
      o,
      f,
      d,
      l,
      c,
      s,
      p,
      t,
      m,
      h,
      g,
      y,
      v,
      L,
      I,
      n,
      b,
      z,
      B,
      x,
      T,
      P,
      U,
      j,
      W,
      V,
      G,
      q,
      $,
      Y,
      K,
      X,
      Z,
      J,
      Q,
      ee,
      C,
      te,
      ne,
      oe,
      re,
      ie,
      E,
      ae,
      S,
      le,
      ce,
      se,
      ue,
      de,
      fe,
      N,
      pe,
      k,
      me,
      D,
      M = this,
      A = {},
      he = [],
      R = [],
      _ = {},
      ge = {},
      O = {},
      F =
        ((M.commands = be(!0, {}, e.commands || Pe)),
        (M.opts = be(!0, {}, bt, e))),
      ye =
        ((M.opts.emoticons = e.emoticons || bt.emoticons),
        Array.isArray(F.allowedIframeUrls) || (F.allowedIframeUrls = []),
        F.allowedIframeUrls.push("https://www.youtube-nocookie.com/embed/"),
        on());
    function H(e) {
      var t = ["iframe"].concat(F.allowedTags),
        n = ["allowfullscreen", "frameborder", "target"].concat(
          F.allowedAttributes
        );
      return ye.sanitize(e, { ADD_TAGS: t, ADD_ATTR: n });
    }
    ye.addHook("uponSanitizeElement", function (e, t) {
      var n = F.allowedIframeUrls;
      if ("iframe" === t.tagName) {
        for (var o = Ae(e, "src") || "", r = 0; r < n.length; r++) {
          var i = n[r];
          if (ve(i) && o.substr(0, i.length) === i) return;
          if (i.test && i.test(o)) return;
        }
        Se(e);
      }
    }),
      ye.addHook("afterSanitizeAttributes", function (e) {
        "target" in e && Ae(e, "data-sce-target", Ae(e, "target")),
          Qe(e, "target");
      }),
      (e = function () {
        (r._sceditor = M),
          F.locale && "en" !== F.locale && W(),
          Oe((w = Ce("div", { className: "sceditor-container" })), r),
          Re(w, "z-index", F.zIndex),
          (I = r.required),
          (r.required = !1);
        function e() {
          Me(qe, "load", e),
            F.autofocus && se(!!F.autofocusEnd),
            D(),
            S(),
            h.call("ready"),
            "onReady" in a && a.onReady.call(M);
        }
        var t = Ye.formats[F.format];
        (a = t ? new t() : {}),
          (h = new xt(M)),
          (F.plugins || "").split(",").forEach(function (e) {
            h.register(e.trim());
          }),
          "init" in a && a.init.call(M),
          Y(),
          V(),
          j(),
          G(),
          q(),
          Et || M.toggleSourceMode(),
          E();
        De(qe, "load", e), "complete" === $e.readyState && e();
      }),
      (W = function () {
        var e;
        (t = Ye.locale[F.locale]) ||
          ((e = F.locale.split("-")), (t = Ye.locale[e[0]])),
          t && t.dateFormat && (F.dateFormat = t.dateFormat);
      }),
      (j = function () {
        (l = Ce("textarea")),
          (i = Ce("iframe", { frameborder: 0, allowfullscreen: !0 })),
          F.startInSourceMode
            ? (Fe(w, "sourceMode"), et(i))
            : (Fe(w, "wysiwygMode"), et(l)),
          F.spellcheck || Ae(w, "spellcheck", "false"),
          "https:" === qe.location.protocol && Ae(i, "src", "about:blank"),
          Ne(w, i),
          Ne(w, l),
          M.dimensions(F.width || at(r), F.height || Le(r));
        var e = Ct ? " ios" : "",
          e =
            ((d = i.contentDocument).open(),
            d.write(
              Be("html", {
                attrs: ' class="' + e + '"',
                spellcheck: F.spellcheck ? "" : 'spellcheck="false"',
                charset: F.charset,
                style: F.style,
              })
            ),
            d.close(),
            (f = d.body),
            (o = i.contentWindow),
            M.readOnly(!!F.readOnly),
            Ct && (Le(f, "100%"), De(f, "touchend", M.focus)),
            Ae(r, "tabindex")),
          e =
            (Ae(l, "tabindex", e),
            Ae(i, "tabindex", e),
            (m = new Tt(o, null, H)),
            et(r),
            M.val(r.value),
            F.placeholder || Ae(r, "placeholder"));
        e && ((l.placeholder = e), Ae(f, "placeholder", e));
      }),
      (G = function () {
        F.autoUpdate && (De(f, "blur", me), De(l, "blur", me)),
          null === F.rtl && (F.rtl = "rtl" === Re(l, "direction")),
          M.rtl(!!F.rtl),
          F.autoExpand && (De(f, "load", D, !0), De(f, "input keyup", D)),
          F.resizeEnabled && $(),
          Ae(w, "id", F.id),
          M.emoticons(F.emoticonsEnabled);
      }),
      (q = function () {
        var e = r.form,
          t = "compositionstart compositionend",
          n = "keydown keyup keypress focus blur contextmenu input",
          o =
            "onselectionchange" in d
              ? "selectionchange"
              : "keyup focus blur contextmenu mouseup touchend click";
        De($e, "click", re),
          e && (De(e, "reset", C), De(e, "submit", M.updateOriginal, !0)),
          De(window, "pagehide", M.updateOriginal),
          De(window, "pageshow", C),
          De(f, "keypress", ee),
          De(f, "keydown", J),
          De(f, "keydown", Q),
          De(f, "keyup", S),
          De(f, "blur", pe),
          De(f, "keyup", k),
          De(f, "paste", K),
          De(f, "cut copy", X),
          De(f, t, ne),
          De(f, o, le),
          De(f, n, oe),
          F.emoticonsCompat && qe.getSelection && De(f, "keyup", de),
          De(f, "blur", function () {
            M.val() || Fe(f, "placeholder");
          }),
          De(f, "focus", function () {
            it(f, "placeholder");
          }),
          De(l, "blur", pe),
          De(l, "keyup", k),
          De(l, "keydown", J),
          De(l, t, ne),
          De(l, n, oe),
          De(d, "mousedown", te),
          De(d, o, le),
          De(d, "keyup", S),
          De(w, "selectionchanged", ce),
          De(w, "selectionchanged", E),
          De(w, "selectionchanged valuechanged nodechanged pasteraw paste", oe);
      }),
      (V = function () {
        var i,
          a = M.commands,
          l = (F.toolbarExclude || "").split(","),
          e = F.toolbar.split("|");
        (u = Ce("div", { className: "sceditor-toolbar", unselectable: "on" })),
          F.icons in Ye.icons && (T = new Ye.icons[F.icons]()),
          we(e, function (e, t) {
            (i = Ce("div", { className: "sceditor-group" })),
              we(t.split(","), function (e, t) {
                var n,
                  o,
                  r = a[t];
                !r ||
                  -1 < l.indexOf(t) ||
                  ((n = r.shortcut),
                  (o = Be(
                    "toolbarButton",
                    { name: t, dispName: M._(r.name || r.tooltip || t) },
                    !0
                  ).firstChild),
                  T &&
                    T.create &&
                    T.create(t) &&
                    (Oe(T.create(t), o.firstChild), Fe(o, "has-icon")),
                  (o._sceTxtMode = !!r.txtExec),
                  (o._sceWysiwygMode = !!r.exec),
                  He(o, "disabled", !r.exec),
                  De(o, "click", function (e) {
                    rt(o, "disabled") || U(o, r), E(), e.preventDefault();
                  }),
                  De(o, "mousedown", function (e) {
                    M.closeDropDown(), e.preventDefault();
                  }),
                  r.tooltip &&
                    Ae(o, "title", M._(r.tooltip) + (n ? " (" + n + ")" : "")),
                  n && M.addShortcut(n, t),
                  r.state
                    ? R.push({ name: t, state: r.state })
                    : ve(r.exec) && R.push({ name: t, state: r.exec }),
                  Ne(i, o),
                  (ge[t] = o));
              }),
              i.firstChild && Ne(u, i);
          }),
          Ne(F.toolbarContainer || w, u);
      }),
      ($ = function () {
        var e = Ce("div", { className: "sceditor-grip" }),
          t = Ce("div", { className: "sceditor-resize-cover" }),
          n = "touchmove mousemove",
          o = "touchcancel touchend mouseup",
          r = 0,
          i = 0,
          a = 0,
          l = 0,
          c = 0,
          s = 0,
          u = at(w),
          d = Le(w),
          f = !1,
          p = M.rtl(),
          m = F.resizeMinHeight || d / 1.5,
          h = F.resizeMaxHeight || 2.5 * d,
          g = F.resizeMinWidth || u / 1.25,
          y = F.resizeMaxWidth || 1.25 * u,
          v = function (e) {
            l = (
              "touchmove" === e.type
                ? ((e = qe.event),
                  (a = e.changedTouches[0].pageX),
                  e.changedTouches[0])
                : ((a = e.pageX), e)
            ).pageY;
            var t = s + (l - i),
              n = p ? c - (a - r) : c + (a - r);
            0 < y && y < n && (n = y),
              0 < g && n < g && (n = g),
              F.resizeWidth || (n = !1),
              0 < h && h < t && (t = h),
              0 < m && t < m && (t = m),
              F.resizeHeight || (t = !1),
              (n || t) && M.dimensions(n, t),
              e.preventDefault();
          },
          b = function (e) {
            f &&
              ((f = !1),
              et(t),
              it(w, "resizing"),
              Me($e, n, v),
              Me($e, o, b),
              e.preventDefault());
          };
        T &&
          T.create &&
          (d = T.create("grip")) &&
          (Ne(e, d), Fe(e, "has-icon")),
          Ne(w, e),
          Ne(w, t),
          et(t),
          De(e, "touchstart mousedown", function (e) {
            (i = (
              "touchstart" === e.type
                ? ((e = qe.event), (r = e.touches[0].pageX), e.touches[0])
                : ((r = e.pageX), e)
            ).pageY),
              (c = at(w)),
              (s = Le(w)),
              (f = !0),
              Fe(w, "resizing"),
              tt(t),
              De($e, n, v),
              De($e, o, b),
              e.preventDefault();
          });
      }),
      (Y = function () {
        var e = F.emoticons,
          n = F.emoticonsRoot || "";
        we((O = e ? be({}, e.more, e.dropdown, e.hidden) : O), function (e, t) {
          (O[e] = Be("emoticon", {
            key: e,
            url: n + (t.url || t),
            tooltip: t.tooltip || e,
          })),
            F.emoticonsEnabled && he.push(Ce("img", { src: n + (t.url || t) }));
        });
      }),
      (se = function (e) {
        var t,
          n = f.firstChild;
        if (ct(w))
          if (M.sourceMode())
            (t = e ? l.value.length : 0), l.setSelectionRange(t, t);
          else {
            if ((ht(f), e))
              for (
                (n = f.lastChild) || ((n = Ce("p", {}, d)), Ne(f, n));
                n.lastChild;

              )
                _e((n = n.lastChild), "br") &&
                  n.previousSibling &&
                  (n = n.previousSibling);
            (t = d.createRange()),
              pt(n)
                ? t.selectNodeContents(n)
                : (t.setStartBefore(n), e && t.setStartAfter(n)),
              t.collapse(!e),
              m.selectRange(t),
              (v = t),
              e && (f.scrollTop = f.scrollHeight),
              M.focus();
          }
      }),
      (M.readOnly = function (e) {
        return "boolean" != typeof e
          ? !l.readonly
          : ((f.contentEditable = !e), (l.readonly = !e), ie(e), M);
      }),
      (M.rtl = function (e) {
        var t = e ? "rtl" : "ltr";
        return "boolean" != typeof e
          ? "rtl" === Ae(l, "dir")
          : (Ae(f, "dir", t),
            Ae(l, "dir", t),
            it(w, "rtl"),
            it(w, "ltr"),
            Fe(w, t),
            T && T.rtl && T.rtl(e),
            M);
      }),
      (ie = function (n) {
        var o = M.inSourceMode() ? "_sceTxtMode" : "_sceWysiwygMode";
        we(ge, function (e, t) {
          He(t, "disabled", n || !t[o]);
        });
      }),
      (M.width = function (e, t) {
        return e || 0 === e ? (M.dimensions(e, null, t), M) : at(w);
      }),
      (M.dimensions = function (e, t, n) {
        return (
          (t = !(!t && 0 !== t) && t),
          !1 === (e = !(!e && 0 !== e) && e) && !1 === t
            ? { width: M.width(), height: M.height() }
            : (!1 !== e && (!1 !== n && (F.width = e), at(w, e)),
              !1 !== t && (!1 !== n && (F.height = t), Le(w, t)),
              M)
        );
      }),
      (M.height = function (e, t) {
        return e || 0 === e ? (M.dimensions(null, e, t), M) : Le(w);
      }),
      (M.maximize = function (e) {
        var t = "sceditor-maximize";
        return Ke(e)
          ? rt(w, t)
          : ((e = !!e) && (B = qe.pageYOffset),
            He($e.documentElement, t, e),
            He($e.body, t, e),
            He(w, t, e),
            M.width(e ? "100%" : F.width, !1),
            M.height(e ? "100%" : F.height, !1),
            e || qe.scrollTo(0, B),
            D(),
            M);
      }),
      (D = function () {
        F.autoExpand && !z && (z = setTimeout(M.expandToContent, 200));
      }),
      (M.expandToContent = function (e) {
        var t, n;
        M.maximize() ||
          (clearTimeout(z),
          (z = !1),
          b ||
            ((n = F.resizeMinHeight || F.height || Le(r)),
            (b = { min: n, max: F.resizeMaxHeight || 2 * n })),
          (n = $e.createRange()).selectNodeContents(f),
          (n = n.getBoundingClientRect()),
          (t = d.documentElement.clientHeight - 1),
          (n = n.bottom - n.top),
          (n = M.height() + 1 + (n - t)),
          e || -1 === b.max || (n = Math.min(n, b.max)),
          M.height(Math.ceil(Math.max(n, b.min))));
      }),
      (M.destroy = function () {
        var e;
        h &&
          (h.destroy(),
          (h = m = null),
          c && Se(c),
          Me($e, "click", re),
          (e = r.form) &&
            (Me(e, "reset", C), Me(e, "submit", M.updateOriginal, !0)),
          Me(window, "pagehide", M.updateOriginal),
          Me(window, "pageshow", C),
          Se(l),
          Se(u),
          Se(w),
          delete r._sceditor,
          tt(r),
          (r.required = I));
      }),
      (M.createDropDown = function (e, t, n) {
        var t = "sceditor-" + t;
        M.closeDropDown(),
          (c && rt(c, t)) ||
            ((e = be(
              {
                top: e.offsetTop,
                left: e.offsetLeft,
                marginTop: e.clientHeight,
              },
              F.dropDownCss
            )),
            Re((c = Ce("div", { className: "sceditor-dropdown " + t })), e),
            Ne(c, n),
            Ne(w, c),
            De(c, "click focusin", function (e) {
              e.stopPropagation();
            }),
            c && (t = ke(c, "input,textarea")[0]) && t.focus());
      }),
      (re = function (e) {
        3 !== e.which && c && !e.defaultPrevented && (me(), M.closeDropDown());
      }),
      (X = function (e) {
        var t = m.selectedRange();
        if (t) {
          for (
            var n, o, r = Ce("div", {}, d), i = t.commonAncestorContainer;
            i && Ie(i, !0);

          )
            i.nodeType === xe &&
              ((o = i.cloneNode()),
              r.firstChild && Ne(o, r.firstChild),
              Ne(r, o),
              (n = n || o)),
              (i = i.parentNode);
          Ne(n || r, t.cloneContents()),
            ht(r),
            e.clipboardData.setData("text/html", r.innerHTML),
            we(ke(r, "p"), function (e, t) {
              ft(t, "div");
            }),
            we(ke(r, "br"), function (e, t) {
              (t.nextSibling && Ie(t.nextSibling, !0)) || Se(t);
            }),
            Ne(f, r),
            e.clipboardData.setData("text/plain", r.innerText),
            Se(r),
            "cut" === e.type && t.deleteContents(),
            e.preventDefault();
        }
      }),
      (K = function (e) {
        var t,
          n,
          o = f,
          r = e.clipboardData;
        if (r) {
          var i = {},
            a = r.types,
            l = r.items;
          e.preventDefault();
          for (var c = 0; c < a.length; c++) {
            if (
              a.indexOf("text/html") < 0 &&
              qe.FileReader &&
              l &&
              rn.test(l[c].type)
            )
              return (
                (t = r.items[c].getAsFile()),
                (n = void 0),
                ((n = new FileReader()).onload = function (e) {
                  Z({ html: '<img src="' + e.target.result + '" />' });
                }),
                void n.readAsDataURL(t)
              );
            i[a[c]] = r.getData(a[c]);
          }
          (i.text = i["text/plain"]), (i.html = H(i["text/html"])), Z(i);
        } else if (!x) {
          var s = o.scrollTop;
          for (m.saveRange(), x = $e.createDocumentFragment(); o.firstChild; )
            Ne(x, o.firstChild);
          setTimeout(function () {
            var e = o.innerHTML;
            (o.innerHTML = ""),
              Ne(o, x),
              (o.scrollTop = s),
              (x = !1),
              m.restoreRange(),
              Z({ html: H(e) });
          }, 0);
        }
      }),
      (Z = function (e) {
        var t = Ce("div", {}, d),
          e =
            (h.call("pasteRaw", e),
            lt(w, "pasteraw", e),
            e.html
              ? ((t.innerHTML = H(e.html)), mt(t))
              : (t.innerHTML = ze(e.text || "")),
            { val: t.innerHTML }),
          t =
            ("fragmentToSource" in a &&
              (e.val = a.fragmentToSource(e.val, d, g)),
            h.call("paste", e),
            lt(w, "paste", e),
            "fragmentToHtml" in a && (e.val = a.fragmentToHtml(e.val, g)),
            h.call("pasteHtml", e),
            m.getFirstBlockParent());
        M.wysiwygEditorInsertHtml(e.val, null, !0),
          (function e(t) {
            if (t.nodeType === xe) {
              for (
                var n = t.parentNode, o = t.tagName, r = t.childNodes.length;
                r--;

              )
                e(t.childNodes[r]);
              if (Ie(t) && "BR" !== o) {
                for (r = t.style.length; r--; ) {
                  var i = t.style[r];
                  Re(n, i) === Re(t, i) && t.style.removeProperty(i);
                }
                if (!t.style.length)
                  if (
                    (Qe(t, "style"),
                    "FONT" === o &&
                      (Re(t, "fontFamily").toLowerCase() ===
                        Re(n, "fontFamily").toLowerCase() && Qe(t, "face"),
                      Re(t, "color") === Re(n, "color") && Qe(t, "color"),
                      Re(t, "fontSize") === Re(n, "fontSize") && Qe(t, "size")),
                    !t.attributes.length && /SPAN|FONT/.test(o))
                  )
                    vt(t);
                  else if (/B|STRONG|EM|SPAN|FONT/.test(o))
                    for (
                      var a = /B|STRONG/.test(o), l = "EM" === o;
                      n &&
                      Ie(n) &&
                      (!a || /bold|700/i.test(Re(n, "fontWeight"))) &&
                      (!l || "italic" === Re(n, "fontStyle"));

                    ) {
                      if (
                        (n.tagName === o ||
                          (a && /B|STRONG/.test(n.tagName))) &&
                        yt(n, t)
                      ) {
                        vt(t);
                        break;
                      }
                      n = n.parentNode;
                    }
                var c = t.nextSibling;
                c && c.tagName === o && yt(c, t) && (Ne(t, c), vt(c));
              }
            }
          })(t);
      }),
      (M.closeDropDown = function (e) {
        c && (Se(c), (c = null)), !0 === e && M.focus();
      }),
      (M.wysiwygEditorInsertHtml = function (e, t, n) {
        var o = Le(i);
        M.focus(),
          (!n && Ee(y, "code")) ||
            (m.insertHTML(e, t),
            m.saveRange(),
            P(),
            mt(f),
            an(f, d),
            tt((n = ke(f, "#sceditor-end-marker")[0])),
            (e = f.scrollTop),
            (t = gt(n).top + 1.5 * n.offsetHeight - o),
            et(n),
            (e < t || t + o < e) && (f.scrollTop = t),
            N(!1),
            m.restoreRange(),
            S());
      }),
      (M.wysiwygEditorInsertText = function (e, t) {
        M.wysiwygEditorInsertHtml(ze(e), ze(t));
      }),
      (M.insertText = function (e, t) {
        return (
          M.inSourceMode()
            ? M.sourceEditorInsertText(e, t)
            : M.wysiwygEditorInsertText(e, t),
          M
        );
      }),
      (M.sourceEditorInsertText = function (e, t) {
        var n,
          o = l.selectionStart,
          r = l.selectionEnd,
          i = l.scrollTop;
        l.focus(),
          (n = l.value),
          t && (e += n.substring(o, r) + t),
          (l.value = n.substring(0, o) + e + n.substring(r, n.length)),
          (l.selectionStart = o + e.length - (t ? t.length : 0)),
          (l.selectionEnd = l.selectionStart),
          (l.scrollTop = i),
          l.focus(),
          N();
      }),
      (M.getRangeHelper = function () {
        return m;
      }),
      (M.sourceEditorCaret = function (e) {
        return (
          l.focus(),
          e
            ? ((l.selectionStart = e.start), (l.selectionEnd = e.end), this)
            : { start: l.selectionStart, end: l.selectionEnd }
        );
      }),
      (M.val = function (e, t) {
        return ve(e)
          ? (M.inSourceMode()
              ? M.setSourceEditorValue(e)
              : (!1 !== t && "toHtml" in a && (e = a.toHtml(e)),
                M.setWysiwygEditorValue(e)),
            M)
          : M.inSourceMode()
          ? M.getSourceEditorValue(!1)
          : M.getWysiwygEditorValue(t);
      }),
      (M.insert = function (e, t, n, o, r) {
        var i;
        return (
          M.inSourceMode()
            ? M.sourceEditorInsertText(e, t)
            : (t &&
                ((i = m.selectedHtml()),
                (e +=
                  (i =
                    !1 !== n && "fragmentToSource" in a
                      ? a.fragmentToSource(i, d, g)
                      : i) + t)),
              !1 !== n && "fragmentToHtml" in a && (e = a.fragmentToHtml(e, g)),
              !1 !== n &&
                !0 === r &&
                (e = e
                  .replace(/&lt;/g, "<")
                  .replace(/&gt;/g, ">")
                  .replace(/&amp;/g, "&")),
              M.wysiwygEditorInsertHtml(e)),
          M
        );
      }),
      (M.getWysiwygEditorValue = function (e) {
        for (
          var t, n = Ce("div", {}, d), o = f.childNodes, r = 0;
          r < o.length;
          r++
        )
          Ne(n, o[r].cloneNode(!0));
        return (
          Ne(f, n),
          mt(n),
          Se(n),
          (t = n.innerHTML),
          (t = !1 !== e && a.hasOwnProperty("toSource") ? a.toSource(t, d) : t)
        );
      }),
      (M.getBody = function () {
        return f;
      }),
      (M.getContentAreaContainer = function () {
        return i;
      }),
      (M.getSourceEditorValue = function (e) {
        var t = l.value;
        return (t = !1 !== e && "toHtml" in a ? a.toHtml(t) : t);
      }),
      (M.setWysiwygEditorValue = function (e) {
        (f.innerHTML = H((e = e || "<p><br /></p>"))), P(), S(), N(), D();
      }),
      (M.setSourceEditorValue = function (e) {
        (l.value = e), N();
      }),
      (M.updateOriginal = function () {
        r.value = M.val();
      }),
      (P = function () {
        var e, l, c, s, t, u, d;
        F.emoticonsEnabled &&
          ((e = f),
          (l = O),
          (c = F.emoticonsCompat),
          (s = e.ownerDocument),
          (t = "(^|\\s| | | | |$)"),
          (u = []),
          (d = {}),
          Je(e, "code") ||
            (we(l, function (e) {
              (d[e] = new RegExp(t + wt(e) + t)), u.push(e);
            }),
            u.sort(function (e, t) {
              return t.length - e.length;
            }),
            (function e(t) {
              for (t = t.firstChild; t; ) {
                if (
                  (t.nodeType !== xe || _e(t, "code") || e(t),
                  t.nodeType === Te)
                )
                  for (var n = 0; n < u.length; n++) {
                    var o,
                      r = t.nodeValue,
                      i = u[n],
                      a = c ? r.search(d[i]) : r.indexOf(i);
                    -1 < a &&
                      ((a = r.indexOf(i, a)),
                      (o = ut(l[i], s)),
                      (i = r.substr(a + i.length)),
                      o.appendChild(s.createTextNode(i)),
                      (t.nodeValue = r.substr(0, a)),
                      t.parentNode.insertBefore(o, t.nextSibling));
                  }
                t = t.nextSibling;
              }
            })(e)));
      }),
      (M.inSourceMode = function () {
        return rt(w, "sourceMode");
      }),
      (M.sourceMode = function (e) {
        var t = M.inSourceMode();
        return "boolean" != typeof e
          ? t
          : (((t && !e) || (!t && e)) && M.toggleSourceMode(), M);
      }),
      (M.toggleSourceMode = function () {
        var e = M.inSourceMode();
        (!Et && e) ||
          (e || (m.saveRange(), m.clear()),
          (v = null),
          M.blur(),
          e
            ? M.setWysiwygEditorValue(M.getSourceEditorValue())
            : M.setSourceEditorValue(M.getWysiwygEditorValue()),
          nt(l),
          nt(i),
          He(w, "wysiwygMode", e),
          He(w, "sourceMode", !e),
          ie(),
          E());
      }),
      (ae = function () {
        return l.focus(), l.value.substring(l.selectionStart, l.selectionEnd);
      }),
      (U = function (e, t) {
        M.inSourceMode()
          ? t.txtExec &&
            (Array.isArray(t.txtExec)
              ? M.sourceEditorInsertText.apply(M, t.txtExec)
              : t.txtExec.call(M, e, ae()))
          : t.exec &&
            (Xe(t.exec)
              ? t.exec.call(M, e)
              : M.execCommand(
                  t.exec,
                  t.hasOwnProperty("execParam") ? t.execParam : null
                ));
      }),
      (M.execCommand = function (e, t) {
        var n = !1,
          o = M.commands[e];
        if ((M.focus(), !Ee(m.parentNode(), "code"))) {
          try {
            n = d.execCommand(e, !1, t);
          } catch (e) {}
          !n && o && o.errorMessage && alert(M._(o.errorMessage)), E();
        }
      }),
      (le = function () {
        function e() {
          if (o.getSelection() && o.getSelection().rangeCount <= 0) v = null;
          else if (m && !m.compare(v)) {
            if ((v = m.cloneSelected()) && v.collapsed) {
              var e = v.startContainer,
                t = v.startOffset;
              for (
                t && e.nodeType !== Te && (e = e.childNodes[t]);
                e && e.parentNode !== f;

              )
                e = e.parentNode;
              e && Ie(e, !0) && (m.saveRange(), an(f, d), m.restoreRange());
            }
            lt(w, "selectionchanged");
          }
          L = !1;
        }
        L || ((L = !0), "onselectionchange" in d ? e() : setTimeout(e, 100));
      }),
      (ce = function () {
        var e,
          t = m.parentNode();
        g !== t &&
          ((e = g),
          (g = t),
          (y = m.getFirstBlockParent(t)),
          lt(w, "nodechanged", { oldNode: e, newNode: g }));
      }),
      (M.currentNode = function () {
        return g;
      }),
      (M.currentBlockNode = function () {
        return y;
      }),
      (E = function () {
        var e,
          t,
          n = "active",
          o = d,
          r = M.sourceMode();
        if (M.readOnly())
          we(ke(u, n), function (e, t) {
            it(t, n);
          });
        else {
          r || ((t = m.parentNode()), (e = m.getFirstBlockParent(t)));
          for (var i = 0; i < R.length; i++) {
            var a = 0,
              l = ge[R[i].name],
              c = R[i].state,
              s = (r && !l._sceTxtMode) || (!r && !l._sceWysiwygMode);
            if (ve(c)) {
              if (!r)
                try {
                  -1 < (a = o.queryCommandEnabled(c) ? 0 : -1) &&
                    (a = o.queryCommandState(c) ? 1 : 0);
                } catch (e) {}
            } else s || (a = c.call(M, t, e));
            He(l, "disabled", s || a < 0), He(l, n, 0 < a);
          }
          T && T.update && T.update(r, t, e);
        }
      }),
      (ee = function (e) {
        var t, n, o;
        e.defaultPrevented ||
          (M.closeDropDown(),
          13 === e.which &&
            !_e(y, "li,ul,ol") &&
            dt(y) &&
            ((t = Ce("br", {}, d)),
            m.insertNode(t),
            (o = (n = t.parentNode).lastChild) &&
              o.nodeType === Te &&
              "" === o.nodeValue &&
              (Se(o), (o = n.lastChild)),
            !Ie(n, !0) &&
              o === t &&
              Ie(t.previousSibling) &&
              m.insertHTML("<br>"),
            e.preventDefault()));
      }),
      (S = function () {
        st(f, function (e) {
          var t;
          if (
            e.nodeType === xe &&
            !/inline/.test(Re(e, "display")) &&
            !_e(e, ".sceditor-nlf") &&
            dt(e)
          )
            return (
              ((t = Ce("p", {}, d)).className = "sceditor-nlf"),
              (t.innerHTML = "<br />"),
              Ne(f, t),
              !1
            );
          if ((3 === e.nodeType && !/^\s*$/.test(e.nodeValue)) || _e(e, "br"))
            return !1;
        });
      }),
      (C = function () {
        M.val(r.value);
      }),
      (te = function () {
        M.closeDropDown();
      }),
      (M._ = function () {
        var n = arguments;
        return (
          t && t[n[0]] && (n[0] = t[n[0]]),
          n[0].replace(/\{(\d+)\}/g, function (e, t) {
            return void 0 !== n[+t + 1] ? n[+t + 1] : "{" + t + "}";
          })
        );
      }),
      (oe = function (t) {
        h && h.call(t.type + "Event", t, M);
        var e = (t.target === l ? "scesrc" : "scewys") + t.type;
        A[e] &&
          A[e].forEach(function (e) {
            e.call(M, t);
          });
      }),
      (M.bind = function (e, t, n, o) {
        for (var r, i, a = (e = e.split(" ")).length; a--; )
          Xe(t) &&
            ((r = "scewys" + e[a]),
            (i = "scesrc" + e[a]),
            n || ((A[r] = A[r] || []), A[r].push(t)),
            o || ((A[i] = A[i] || []), A[i].push(t)),
            "valuechanged" === e[a] && (N.hasHandler = !0));
        return M;
      }),
      (M.unbind = function (e, t, n, o) {
        for (var r = (e = e.split(" ")).length; r--; )
          Xe(t) &&
            (n || Ze(A["scewys" + e[r]] || [], t),
            o || Ze(A["scesrc" + e[r]] || [], t));
        return M;
      }),
      (M.blur = function (e, t, n) {
        return (
          Xe(e) ? M.bind("blur", e, t, n) : (M.sourceMode() ? l : f).blur(), M
        );
      }),
      (M.focus = function (e, t, n) {
        if (Xe(e)) M.bind("focus", e, t, n);
        else if (M.inSourceMode()) l.focus();
        else {
          if (ke(d, ":focus").length) return;
          e = m.selectedRange();
          v || se(!0),
            e &&
              1 === e.endOffset &&
              e.collapsed &&
              (t = e.endContainer) &&
              1 === t.childNodes.length &&
              _e(t.firstChild, "br") &&
              (e.setStartBefore(t.firstChild),
              e.collapse(!0),
              m.selectRange(e)),
            o.focus(),
            f.focus();
        }
        return E(), M;
      }),
      (M.keyDown = function (e, t, n) {
        return M.bind("keydown", e, t, n);
      }),
      (M.keyPress = function (e, t, n) {
        return M.bind("keypress", e, t, n);
      }),
      (M.keyUp = function (e, t, n) {
        return M.bind("keyup", e, t, n);
      }),
      (M.nodeChanged = function (e) {
        return M.bind("nodechanged", e, !1, !0);
      }),
      (M.selectionChanged = function (e) {
        return M.bind("selectionchanged", e, !1, !0);
      }),
      (M.valueChanged = function (e, t, n) {
        return M.bind("valuechanged", e, t, n);
      }),
      (ue = function (e) {
        var n = 0,
          o = M.emoticonsCache,
          t = String.fromCharCode(e.which);
        Ee(y, "code") ||
          (o ||
            ((o = []),
            we(O, function (e, t) {
              o[n++] = [e, t];
            }),
            o.sort(function (e, t) {
              return e[0].length - t[0].length;
            }),
            (M.emoticonsCache = o),
            (M.longestEmoticonCode = o[o.length - 1][0].length)),
          !m.replaceKeyword(
            M.emoticonsCache,
            !0,
            !0,
            M.longestEmoticonCode,
            F.emoticonsCompat,
            t
          ) ||
            (F.emoticonsCompat && /^\s$/.test(t)) ||
            e.preventDefault());
      }),
      (de = function () {
        var e = y,
          t = m,
          n = /[^\s\xA0\u2002\u2003\u2009]+/,
          o = e && ke(e, "img[data-sceditor-emoticon]");
        if (e && o.length)
          for (var r = 0; r < o.length; r++) {
            var i,
              a,
              l,
              c,
              s = o[r],
              u = s.parentNode,
              d = s.previousSibling,
              f = s.nextSibling;
            ((d && n.test(d.nodeValue.slice(-1))) ||
              (f && n.test((f.nodeValue || "")[0]))) &&
              ((a = -1),
              (l = (i = t.cloneSelected()).startContainer),
              (c = d.nodeValue || ""),
              (c += ot(s, "sceditor-emoticon")),
              l === f && (a = c.length + i.startOffset),
              l === e && e.childNodes[i.startOffset] === f && (a = c.length),
              l === d && (a = i.startOffset),
              (f =
                f && f.nodeType === Te
                  ? f
                  : u.insertBefore(
                      u.ownerDocument.createTextNode(""),
                      f
                    )).insertData(0, c),
              Se(d),
              Se(s),
              -1 < a && (i.setStart(f, a), i.collapse(!0), t.selectRange(i)));
          }
      }),
      (M.emoticons = function (e) {
        return e || !1 === e
          ? ((F.emoticonsEnabled = e)
              ? (De(f, "keypress", ue),
                M.sourceMode() || (m.saveRange(), P(), N(!1), m.restoreRange()))
              : (we(ke(f, "img[data-sceditor-emoticon]"), function (e, t) {
                  var n = ot(t, "sceditor-emoticon"),
                    n = d.createTextNode(n);
                  t.parentNode.replaceChild(n, t);
                }),
                Me(f, "keypress", ue),
                N()),
            M)
          : F.emoticonsEnabled;
      }),
      (M.css = function (e) {
        return (
          n || ((n = Ce("style", { id: "inline" }, d)), Ne(d.head, n)),
          ve(e)
            ? (n.styleSheet ? (n.styleSheet.cssText = e) : (n.innerHTML = e), M)
            : n.styleSheet
            ? n.styleSheet.cssText
            : n.innerHTML
        );
      }),
      (J = function (e) {
        var t = [],
          n = {
            "`": "~",
            1: "!",
            2: "@",
            3: "#",
            4: "$",
            5: "%",
            6: "^",
            7: "&",
            8: "*",
            9: "(",
            0: ")",
            "-": "_",
            "=": "+",
            ";": ": ",
            "'": '"',
            ",": "<",
            ".": ">",
            "/": "?",
            "\\": "|",
            "[": "{",
            "]": "}",
          },
          o = {
            109: "-",
            110: "del",
            111: "/",
            96: "0",
            97: "1",
            98: "2",
            99: "3",
            100: "4",
            101: "5",
            102: "6",
            103: "7",
            104: "8",
            105: "9",
          },
          r = e.which,
          i =
            {
              8: "backspace",
              9: "tab",
              13: "enter",
              19: "pause",
              20: "capslock",
              27: "esc",
              32: "space",
              33: "pageup",
              34: "pagedown",
              35: "end",
              36: "home",
              37: "left",
              38: "up",
              39: "right",
              40: "down",
              45: "insert",
              46: "del",
              91: "win",
              92: "win",
              93: "select",
              96: "0",
              97: "1",
              98: "2",
              99: "3",
              100: "4",
              101: "5",
              102: "6",
              103: "7",
              104: "8",
              105: "9",
              106: "*",
              107: "+",
              109: "-",
              110: ".",
              111: "/",
              112: "f1",
              113: "f2",
              114: "f3",
              115: "f4",
              116: "f5",
              117: "f6",
              118: "f7",
              119: "f8",
              120: "f9",
              121: "f10",
              122: "f11",
              123: "f12",
              144: "numlock",
              145: "scrolllock",
              186: ";",
              187: "=",
              188: ",",
              189: "-",
              190: ".",
              191: "/",
              192: "`",
              219: "[",
              220: "\\",
              221: "]",
              222: "'",
            }[r] || String.fromCharCode(r).toLowerCase();
        (e.ctrlKey || e.metaKey) && t.push("ctrl"),
          e.altKey && t.push("alt"),
          e.shiftKey &&
            (t.push("shift"), o[r] ? (i = o[r]) : n[i] && (i = n[i])),
          i && (r < 16 || 18 < r) && t.push(i),
          (t = t.join("+")),
          _[t] &&
            !1 === _[t].call(M) &&
            (e.stopPropagation(), e.preventDefault());
      }),
      (M.addShortcut = function (e, t) {
        return (
          (e = e.toLowerCase()),
          ve(t)
            ? (_[e] = function () {
                return U(ge[t], M.commands[t]), !1;
              })
            : (_[e] = t),
          M
        );
      }),
      (M.removeShortcut = function (e) {
        return delete _[e.toLowerCase()], M;
      }),
      (Q = function (e) {
        var t, n, o;
        if (
          !F.disableBlockRemove &&
          8 === e.which &&
          (n = m.selectedRange()) &&
          ((t = n.startContainer),
          0 === n.startOffset && (o = fe()) && !_e(o, "body"))
        ) {
          for (; t !== o; ) {
            for (; t.previousSibling; )
              if ((t = t.previousSibling).nodeType !== Te || t.nodeValue)
                return;
            if (!(t = t.parentNode)) return;
          }
          M.clearBlockFormatting(o), e.preventDefault();
        }
      }),
      (fe = function () {
        for (var e = y; !dt(e) || Ie(e, !0); )
          if (!(e = e.parentNode) || _e(e, "body")) return;
        return e;
      }),
      (M.clearBlockFormatting = function (e) {
        return (
          (e = e || fe()) &&
            !_e(e, "body") &&
            (m.saveRange(),
            (e.className = ""),
            Ae(e, "style", ""),
            _e(e, "p,div,td") || ft(e, "p"),
            m.restoreRange()),
          M
        );
      }),
      (N = function (e) {
        var t, n, o;
        h &&
          (h.hasHandler("valuechangedEvent") || N.hasHandler) &&
          ((o = !(n = M.sourceMode()) && m.hasSelection()),
          (e = (s = !1) !== e && !d.getElementById("sceditor-start-marker")),
          p && (clearTimeout(p), (p = !1)),
          o && e && m.saveRange(),
          (t = n ? l.value : f.innerHTML) !== N.lastVal &&
            ((N.lastVal = t),
            lt(w, "valuechanged", { rawValue: n ? M.val() : t })),
          o && e && m.removeMarkers());
      }),
      (pe = function () {
        p && N();
      }),
      (k = function (e) {
        var e = e.which,
          t = k.lastChar,
          n = 13 === t || 32 === t,
          t = 8 === t || 46 === t;
        (k.lastChar = e),
          s ||
            (13 === e || 32 === e
              ? n
                ? (k.triggerNext = !0)
                : N()
              : 8 === e || 46 === e
              ? t
                ? (k.triggerNext = !0)
                : N()
              : k.triggerNext && (N(), (k.triggerNext = !1)),
            clearTimeout(p),
            (p = setTimeout(function () {
              s || N();
            }, 1500)));
      }),
      (ne = function (e) {
        (s = /start/i.test(e.type)) || N();
      }),
      (me = function () {
        M.updateOriginal();
      }),
      e();
  }
  (Ye.locale = {}),
    (Ye.formats = {}),
    (Ye.icons = {}),
    (Ye.command = {
      get: function (e) {
        return Pe[e] || null;
      },
      set: function (e, t) {
        return (
          !(!e || !t) &&
          (((t = be(Pe[e] || {}, t)).remove = function () {
            Ye.command.remove(e);
          }),
          (Pe[e] = t),
          this)
        );
      },
      remove: function (e) {
        return Pe[e] && delete Pe[e], this;
      },
    }),
    (window.sceditor = {
      command: Ye.command,
      commands: Pe,
      defaultOptions: bt,
      ios: Ct,
      isWysiwygSupported: Et,
      regexEscape: wt,
      escapeEntities: ze,
      escapeUriScheme: function (e) {
        var t,
          n = window.location;
        return e && /^[^\/]*:/i.test(e) && !y.test(e)
          ? ((t = n.pathname.split("/")).pop(),
            n.protocol + "//" + n.host + t.join("/") + "/" + e)
          : e;
      },
      dom: {
        css: Re,
        attr: Ae,
        removeAttr: Qe,
        is: _e,
        closest: Ee,
        width: at,
        height: Le,
        traverse: d,
        rTraverse: st,
        parseHTML: ut,
        hasStyling: dt,
        convertElement: ft,
        blockLevelList: f,
        canHaveChildren: pt,
        isInline: Ie,
        copyCSS: function (e, t) {
          t.style &&
            e.style &&
            (t.style.cssText = e.style.cssText + t.style.cssText);
        },
        fixNesting: mt,
        findCommonAncestor: function (e, t) {
          for (; (e = e.parentNode); )
            if ((n = e) !== (o = t) && n.contains && n.contains(o)) return e;
          var n, o;
        },
        getSibling: m,
        removeWhiteSpace: ht,
        extractContents: h,
        getOffset: gt,
        getStyle: g,
        hasStyle: function (e, t, n) {
          return (
            !!(e = g(e, t)) &&
            (!n || e === n || (Array.isArray(n) && -1 < n.indexOf(e)))
          );
        },
      },
      locale: Ye.locale,
      icons: Ye.icons,
      utils: { each: we, isEmptyObject: l, extend: be },
      plugins: xt.plugins,
      formats: Ye.formats,
      create: function (e, t) {
        (t = t || {}),
          Je(e, ".sceditor-container") ||
            ((t.runWithoutWysiwygSupport || Et) && new Ye(e, t));
      },
      instance: function (e) {
        return e._sceditor;
      },
    });
})();
