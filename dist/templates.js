var __commonJS = (cb, mod) => () => (mod || cb((mod = { exports: {} }).exports, mod), mod.exports);

// node_modules/@kitajs/html/index.js
var require_html = __commonJS((exports) => {
  var ESCAPED_REGEX = /[<"'&]/;
  var CAMEL_REGEX = /[a-z][A-Z]/;
  function isUpper(input, index) {
    const code = input.charCodeAt(index);
    return code >= 65 && code <= 90;
  }
  function toKebabCase(camel) {
    if (!CAMEL_REGEX.test(camel)) {
      return camel;
    }
    const length = camel.length;
    let start = 0, end = 0, kebab = "", prev = true, curr = isUpper(camel, 0), next;
    for (;end < length; end++) {
      next = isUpper(camel, end + 1);
      if (!prev && curr && !next) {
        kebab += camel.slice(start, end) + "-" + camel[end].toLowerCase();
        start = end + 1;
      }
      prev = curr;
      curr = next;
    }
    kebab += camel.slice(start, end);
    return kebab;
  }
  function escape(strings, ...values) {
    const stringsLength = strings.length, valuesLength = values.length;
    let index = 0, result = "";
    for (;index < stringsLength; index++) {
      result += strings[index];
      if (index < valuesLength) {
        result += values[index];
      }
    }
    return escapeHtml(result);
  }
  var escapeHtml = function(value) {
    if (typeof value !== "string") {
      value = value.toString();
    }
    if (!ESCAPED_REGEX.test(value)) {
      return value;
    }
    const length = value.length;
    let escaped = "", start = 0, end = 0;
    for (;end < length; end++) {
      switch (value[end]) {
        case "&":
          escaped += value.slice(start, end) + "&amp;";
          start = end + 1;
          continue;
        case "<":
          escaped += value.slice(start, end) + "&lt;";
          start = end + 1;
          continue;
        case '"':
          escaped += value.slice(start, end) + "&#34;";
          start = end + 1;
          continue;
        case "'":
          escaped += value.slice(start, end) + "&#39;";
          start = end + 1;
          continue;
      }
    }
    escaped += value.slice(start, end);
    return escaped;
  };
  if (typeof Bun !== "undefined")
    escapeHtml = Bun.escapeHTML;
  function isVoidElement(tag) {
    return tag === "meta" || tag === "link" || tag === "img" || tag === "br" || tag === "input" || tag === "hr" || tag === "area" || tag === "base" || tag === "col" || tag === "command" || tag === "embed" || tag === "keygen" || tag === "param" || tag === "source" || tag === "track" || tag === "wbr";
  }
  function styleToString(style) {
    if (typeof style === "string") {
      let end2 = style.indexOf('"');
      if (end2 === -1) {
        return style;
      }
      const length2 = style.length;
      let escaped = "", start2 = 0;
      for (;end2 < length2; end2++) {
        if (style[end2] === '"') {
          escaped += style.slice(start2, end2) + "&#34;";
          start2 = end2 + 1;
        }
      }
      escaped += style.slice(start2, end2);
      return escaped;
    }
    const keys = Object.keys(style), length = keys.length;
    let key, value, end, start, index = 0, result = "";
    for (;index < length; index++) {
      key = keys[index];
      value = style[key];
      if (value === null || value === undefined) {
        continue;
      }
      result += toKebabCase(key) + ":";
      if (typeof value !== "string") {
        result += value.toString() + ";";
        continue;
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += value + ";";
        continue;
      }
      const length2 = value.length;
      start = 0;
      for (;end < length2; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + ";";
    }
    return result;
  }
  function attributesToString(attributes) {
    const keys = Object.keys(attributes);
    const length = keys.length;
    let key, value, type, end, start, classItems, valueLength, result = "", index = 0;
    for (;index < length; index++) {
      key = keys[index];
      if (key === "children" || key === "safe" || key === "of") {
        continue;
      }
      value = attributes[key];
      if (value === null || value === undefined) {
        continue;
      }
      if (key === "className") {
        if (attributes.class !== undefined) {
          continue;
        }
        key = "class";
      } else if (key === "class" && Array.isArray(value)) {
        classItems = value;
        valueLength = value.length;
        value = "";
        for (let i = 0;i < valueLength; i++) {
          if (classItems[i] && classItems[i].length > 0) {
            if (value) {
              value += " " + classItems[i].trim();
            } else {
              value += classItems[i].trim();
            }
          }
        }
        if (value.length === 0) {
          continue;
        }
      } else if (key === "style") {
        result += ' style="' + styleToString(value) + '"';
        continue;
      } else if (key === "attrs") {
        if (typeof value === "string") {
          result += " " + value;
        } else {
          result += attributesToString(value);
        }
        continue;
      }
      type = typeof value;
      if (type === "boolean") {
        if (value) {
          result += " " + key;
        }
        continue;
      }
      result += " " + key;
      if (type !== "string") {
        if (type !== "object") {
          result += '="' + value.toString() + '"';
          continue;
        }
        if (value instanceof Date) {
          result += '="' + value.toISOString() + '"';
          continue;
        }
        value = value.toString();
      }
      end = value.indexOf('"');
      if (end === -1) {
        result += '="' + value + '"';
        continue;
      }
      result += '="';
      valueLength = value.length;
      start = 0;
      for (;end < valueLength; end++) {
        if (value[end] === '"') {
          result += value.slice(start, end) + "&#34;";
          start = end + 1;
        }
      }
      result += value.slice(start, end) + '"';
    }
    return result;
  }
  function contentsToString(contents, escape2) {
    let length = contents.length;
    let result = "";
    for (let index = 0;index < length; index++) {
      const content = contents[index];
      switch (typeof content) {
        case "string":
        case "number":
        case "bigint":
          result += content;
          continue;
        case "boolean":
          continue;
      }
      if (!content) {
        continue;
      }
      if (Array.isArray(content)) {
        contents.splice(index--, 1, ...content);
        length += content.length - 1;
        continue;
      }
      if (typeof content.then === "function") {
        return Promise.all(contents.slice(index)).then(function resolveContents(resolved) {
          resolved.unshift(result);
          return contentsToString(resolved, escape2);
        });
      }
      throw new Error("Objects are not valid as a KitaJSX child");
    }
    if (escape2 === true) {
      return escapeHtml(result);
    }
    return result;
  }
  function contentToString(content, safe) {
    switch (typeof content) {
      case "string":
        return safe ? escapeHtml(content) : content;
      case "number":
      case "bigint":
        return content.toString();
      case "boolean":
        return "";
    }
    if (!content) {
      return "";
    }
    if (Array.isArray(content)) {
      return contentsToString(content, safe);
    }
    if (typeof content.then === "function") {
      return content.then(function resolveContent(resolved) {
        return contentToString(resolved, safe);
      });
    }
    throw new Error("Objects are not valid as a KitaJSX child");
  }
  function createElement(name, attrs, ...children) {
    const hasAttrs = attrs !== null;
    if (typeof name === "function") {
      if (!hasAttrs) {
        return name({ children: children.length > 1 ? children : children[0] });
      }
      attrs.children = children.length > 1 ? children : children[0];
      return name(attrs);
    }
    if (hasAttrs && name === "tag") {
      name = attrs.of;
    }
    const attributes = hasAttrs ? attributesToString(attrs) : "";
    if (children.length === 0) {
      return isVoidElement(name) ? "<" + name + attributes + "/>" : "<" + name + attributes + "></" + name + ">";
    }
    const contents = contentsToString(children, hasAttrs && attrs.safe);
    if (typeof contents === "string") {
      return "<" + name + attributes + ">" + contents + "</" + name + ">";
    }
    return contents.then(function resolveContents(contents2) {
      return "<" + name + attributes + ">" + contents2 + "</" + name + ">";
    });
  }
  function Fragment(props) {
    return contentsToString([props.children]);
  }
  exports.escape = escape;
  exports.e = escape;
  exports.escapeHtml = escapeHtml;
  exports.isVoidElement = isVoidElement;
  exports.attributesToString = attributesToString;
  exports.toKebabCase = toKebabCase;
  exports.isUpper = isUpper;
  exports.styleToString = styleToString;
  exports.createElement = createElement;
  exports.h = createElement;
  exports.contentsToString = contentsToString;
  exports.contentToString = contentToString;
  exports.Fragment = Fragment;
  exports.Html = { ...exports };
});

// node_modules/@kitajs/html/jsx-runtime.js
var require_jsx_runtime = __commonJS((exports) => {
  var {
    Fragment,
    attributesToString,
    isVoidElement,
    contentsToString,
    contentToString
  } = require_html();
  function jsx(name, attrs) {
    if (typeof name === "function") {
      return name(attrs);
    }
    if (name === "tag") {
      name = attrs.of;
    }
    const attributes = attributesToString(attrs);
    if (attrs.children === undefined) {
      return isVoidElement(name) ? "<" + name + attributes + "/>" : "<" + name + attributes + "></" + name + ">";
    }
    const contents = contentToString(attrs.children, attrs.safe);
    if (contents instanceof Promise) {
      return contents.then(function resolveContents(child) {
        return "<" + name + attributes + ">" + child + "</" + name + ">";
      });
    }
    return "<" + name + attributes + ">" + contents + "</" + name + ">";
  }
  function jsxs(name, attrs) {
    if (typeof name === "function") {
      return name(attrs);
    }
    if (name === "tag") {
      name = attrs.of;
    }
    const attributes = attributesToString(attrs);
    if (attrs.children.length === 0) {
      return isVoidElement(name) ? "<" + name + attributes + "/>" : "<" + name + attributes + "></" + name + ">";
    }
    const contents = contentsToString(attrs.children, attrs.safe);
    if (contents instanceof Promise) {
      return contents.then(function resolveContents(child) {
        return "<" + name + attributes + ">" + child + "</" + name + ">";
      });
    }
    return "<" + name + attributes + ">" + contents + "</" + name + ">";
  }
  exports.jsx = jsx;
  exports.jsxs = jsxs;
  exports.Fragment = Fragment;
});

// node_modules/@kitajs/html/jsx-dev-runtime.js
var { Fragment, jsx, jsxs } = require_jsx_runtime();
var $jsxDEV = jsx;

// templates/BlogEntries.jsx
function BlogEntries({ result: posts }) {
  return /* @__PURE__ */ $jsxDEV("div", {
    style: styles.postContainer,
    children: posts.map(({ author, blog, permlink }) => /* @__PURE__ */ $jsxDEV("div", {
      style: styles.header,
      children: /* @__PURE__ */ $jsxDEV("div", {
        children: [
          /* @__PURE__ */ $jsxDEV("h3", {
            style: styles.title,
            children: permlink
          }, undefined, false, undefined, this),
          /* @__PURE__ */ $jsxDEV("p", {
            style: styles.author,
            children: [
              "by ",
              author
            ]
          }, undefined, true, undefined, this)
        ]
      }, undefined, true, undefined, this)
    }, undefined, false, undefined, this))
  }, undefined, false, undefined, this);
}
var styles = {
  postContainer: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "16px",
    maxWidth: "400px",
    margin: "16px auto",
    backgroundColor: "#fff"
  },
  header: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px"
  },
  title: {
    margin: "0 0 4px 0",
    fontSize: "18px",
    color: "#333"
  },
  author: {
    margin: 0,
    fontSize: "14px",
    color: "#777"
  },
  teaser: {
    marginTop: "12px",
    fontSize: "16px",
    color: "#555"
  }
};
export {
  BlogEntries
};
