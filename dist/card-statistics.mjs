(function(){"use strict";try{if(typeof document!="undefined"){var t=document.createElement("style");t.appendChild(document.createTextNode(".cdx-card-statistics{margin:1em auto;background-color:#f8f8f8;color:#000;border-radius:8px;padding:20px}.cdx-card-statistics__value{font-size:54px;margin-bottom:10px;outline:none!important}.cdx-card-statistics__title{font-size:18px;margin-bottom:20px;outline:none!important}.cdx-card-statistics__description{font-size:14px;color:#333;outline:none!important}.cdx-card-statistics--left{text-align:left}.cdx-card-statistics--center{text-align:center}.cdx-card-statistics--right{text-align:right}")),document.head.appendChild(t)}}catch(e){console.error("vite-plugin-css-injected-by-js",e)}})();
var r = Object.defineProperty;
var d = (l, e, t) => e in l ? r(l, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : l[e] = t;
var s = (l, e, t) => (d(l, typeof e != "symbol" ? e + "" : e, t), t);
class c {
  constructor({ data: e, config: t, api: i, block: a, readOnly: n }) {
    s(this, "api");
    s(this, "block");
    s(this, "readOnly");
    s(this, "_data");
    s(this, "config");
    s(this, "nodes");
    s(this, "valuePlaceholder");
    s(this, "titlePlaceholder");
    s(this, "descriptionPlaceholder");
    s(this, "aligns", [
      {
        name: "left",
        title: "Align left",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M85.282 500.778c3.357 3.32 7.207 5.222 11.997 5.222H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86-3.357-3.32-7.207-5.223-11.997-5.223H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.541 5.282 11.86Zm0-101.549c3.357 3.32 7.207 5.222 11.997 5.222h342.71c4.812 0 8.64-1.902 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.86v-33.702c0-4.757-1.925-8.542-5.282-11.861-3.357-3.32-7.185-5.223-11.997-5.223H97.28c-4.79 0-8.64 1.903-11.997 5.223-3.357 3.319-5.282 7.104-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861Zm0-102.035c3.357 3.32 7.207 5.223 11.997 5.223h411.355c4.79 0 8.64-1.903 11.997-5.223 3.357-3.319 5.282-7.125 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861-3.358-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.902-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861Zm0-101.57c3.357 3.341 7.207 5.223 11.997 5.223h308.645c4.32 0 8.639-1.882 11.996-5.222 3.358-3.32 4.79-7.104 4.79-11.861v-33.68c0-4.758-1.432-8.542-4.79-11.862-3.357-3.34-7.677-5.222-11.996-5.222H97.279c-4.79 0-8.64 1.882-11.997 5.222-3.357 3.32-5.282 7.104-5.282 11.861v33.68c0 4.758 1.925 8.542 5.282 11.862Z"/></svg>'
      },
      {
        name: "center",
        title: "Align center",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M554.718 138.222c-3.357-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.542 5.282 11.86 3.357 3.32 7.207 5.223 11.997 5.223H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86Zm-51 101c-3.357-3.32-7.207-5.222-11.997-5.222h-342.71c-4.812 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.757 1.925 8.542 5.282 11.86 3.357 3.32 7.185 5.223 11.997 5.223h342.71c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86ZM525.721 336H114.366c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.542 5.282 11.86 3.358 3.32 7.207 5.223 11.997 5.223H525.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86-3.357-3.32-7.207-5.223-11.997-5.223Zm-52 102.021H165.076c-4.32 0-8.639 1.882-11.996 5.222-3.358 3.32-4.79 7.104-4.79 11.862v33.68c0 4.757 1.432 8.542 4.79 11.86 3.357 3.341 7.677 5.223 11.996 5.223h308.645c4.79 0 8.64-1.882 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.68c0-4.758-1.925-8.542-5.282-11.862-3.357-3.34-7.207-5.222-11.997-5.222Z"/></svg>'
      },
      {
        name: "right",
        title: "Align right",
        icon: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#000000" fill-rule="nonzero" d="M554.718 138.222c-3.357-3.32-7.207-5.222-11.997-5.222H97.28c-4.79 0-8.64 1.903-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.861v33.702c0 4.736 1.925 8.541 5.282 11.86 3.357 3.32 7.207 5.223 11.997 5.223H542.72c4.79 0 8.64-1.903 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.861v-33.702c0-4.736-1.925-8.541-5.282-11.86Zm0 101.549c-3.357-3.32-7.207-5.222-11.997-5.222h-342.71c-4.812 0-8.64 1.902-11.997 5.222-3.357 3.32-5.282 7.125-5.282 11.86v33.702c0 4.757 1.925 8.542 5.282 11.861 3.357 3.32 7.185 5.223 11.997 5.223h342.71c4.79 0 8.64-1.903 11.997-5.223 3.357-3.319 5.282-7.104 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861Zm0 102.035c-3.357-3.32-7.207-5.223-11.997-5.223H131.366c-4.79 0-8.64 1.903-11.997 5.223-3.357 3.319-5.282 7.125-5.282 11.86v33.702c0 4.736 1.925 8.542 5.282 11.861 3.358 3.32 7.207 5.222 11.997 5.222H542.72c4.79 0 8.64-1.902 11.997-5.222 3.357-3.32 5.282-7.125 5.282-11.86v-33.702c0-4.736-1.925-8.542-5.282-11.861Zm0 101.57c-3.357-3.341-7.207-5.223-11.997-5.223H234.076c-4.32 0-8.639 1.882-11.996 5.222-3.358 3.32-4.79 7.104-4.79 11.861v33.68c0 4.758 1.432 8.542 4.79 11.862 3.357 3.34 7.677 5.222 11.996 5.222h308.645c4.79 0 8.64-1.882 11.997-5.222 3.357-3.32 5.282-7.104 5.282-11.861v-33.68c0-4.758-1.925-8.542-5.282-11.862Z"/></svg>'
      }
    ]);
    this.config = t, this.api = i, this.block = a, this.readOnly = n, this.valuePlaceholder = t.valuePlaceholder || "Add statistics value", this.titlePlaceholder = t.titlePlaceholder || "Add title", this.descriptionPlaceholder = t.descriptionPlaceholder || "Add description", this.data = e, this.nodes = {
      wrapper: null,
      value: null,
      title: null,
      description: null
    };
  }
  static get DEFAULT_ALIGN_TYPE() {
    return "left";
  }
  get classes() {
    return {
      wrapper: "cdx-card-statistics",
      value: "cdx-card-statistics__value",
      title: "cdx-card-statistics__title",
      description: "cdx-card-statistics__description",
      wrapperForAlignType: (e) => `cdx-card-statistics--${e}`
    };
  }
  set data(e) {
    this._data = Object.assign({}, {
      value: e.value || "",
      title: e.title || "",
      description: e.description || "",
      align: e.align || c.DEFAULT_ALIGN_TYPE
    });
  }
  get data() {
    return this._data;
  }
  render() {
    return this.nodes.wrapper = this.make("div", this.classes.wrapper), this.nodes.value = this.make("div", this.classes.value, {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this._data.value || ""
    }), this.nodes.value.dataset.placeholder = this.valuePlaceholder, this.nodes.wrapper.appendChild(this.nodes.value), this.nodes.title = this.make("div", this.classes.title, {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this._data.title || ""
    }), this.nodes.title.dataset.placeholder = this.titlePlaceholder, this.nodes.wrapper.appendChild(this.nodes.title), this.nodes.description = this.make("div", this.classes.description, {
      contentEditable: this.readOnly ? "false" : "true",
      innerHTML: this._data.description || ""
    }), this.nodes.description.dataset.placeholder = this.descriptionPlaceholder, this.nodes.wrapper.appendChild(this.nodes.description), this.updateAlign(this._data.align || c.DEFAULT_ALIGN_TYPE), this.nodes.wrapper;
  }
  save() {
    var e, t, i;
    return {
      value: ((e = this.nodes.value) == null ? void 0 : e.innerHTML) || "",
      title: ((t = this.nodes.title) == null ? void 0 : t.innerHTML) || "",
      description: ((i = this.nodes.description) == null ? void 0 : i.innerHTML) || "",
      align: this._data.align
    };
  }
  validate(e) {
    var t, i;
    return !!(((t = e.value) == null ? void 0 : t.trim()) || ((i = e.title) == null ? void 0 : i.trim()));
  }
  renderSettings() {
    return this.aligns.map((t) => ({
      icon: t.icon,
      name: `align-${t.name}`,
      label: t.title,
      toggle: "align",
      isActive: this._data.align === t.name,
      onActivate: () => {
        this.updateAlign(t.name);
      }
    }));
  }
  static get sanitize() {
    return {
      value: !0,
      title: !0,
      description: !0,
      align: !1
    };
  }
  static get toolbox() {
    return {
      title: "Statistics card",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32Zm0,176H48V48H208V208ZM140,80v96a8,8,0,0,1-16,0V95l-11.56,7.71a8,8,0,1,1-8.88-13.32l24-16A8,8,0,0,1,140,80Z"></path></svg>'
    };
  }
  static get enableLineBreaks() {
    return !0;
  }
  static get isReadOnlySupported() {
    return !0;
  }
  updateAlign(e) {
    var t;
    this._data.align === e && ((t = this.nodes.wrapper) == null ? void 0 : t.classList.contains(this.classes.wrapperForAlignType(e))) || (this._data.align = e, this.aligns.forEach((i) => {
      var a;
      (a = this.nodes.wrapper) == null || a.classList.toggle(this.classes.wrapperForAlignType(i.name), this._data.align === i.name);
    }));
  }
  make(e, t = [], i = {}) {
    const a = document.createElement(e);
    Array.isArray(t) ? a.classList.add(...t) : t && a.classList.add(t);
    for (const n in i)
      a[n] = i[n];
    return a;
  }
}
export {
  c as default
};
