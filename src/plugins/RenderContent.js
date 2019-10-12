import Vue from 'vue'

export default () => {
  Vue.prototype.$renderContent = function (content) {
    let html = "";
    content.forEach(item => {
      html = html +
        `<${item.tag}>
        ${item.content}
        </${item.tag}>`;
    });
    return html;
  }
}
