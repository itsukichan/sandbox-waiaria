export default class Tab {
  constructor(selectors) {
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(`.${selectors}`);
    this.init();
  }

  init() {
    this.selectors.forEach((selector, index, arr) => {
      let selectorsIndex = Array.prototype.indexOf.call(arr, selector);
      this.tabChange(selector, index, arr, selectorsIndex);
    });
  }

  tabChange(selector, index, arr, selectorsIndex) {
    this.addUniqueID(selector, index, arr, selectorsIndex);
    const buttons = selector.querySelectorAll('[role="tab"]');
    buttons.forEach((button, index) => {
      const buttonIndex = Array.prototype.indexOf.call(buttons, button);
      const panels = selector.querySelectorAll('[role="tabpanel"]');
      button.addEventListener("click", (e) => {
        this.changeAriaState(button, buttonIndex, buttons, panels);
      });
    });
  }

  addUniqueID(selector, index, arr, selectorsIndex) {
    selector.querySelectorAll('[role="tab"]').forEach((button, index) => {
      const panel = selector.querySelectorAll('[role="tabpanel"]')[index];
      const buttonID = `${this.selectorName}-button-${selectorsIndex}-${index}`;
      const panelID = `${this.selectorName}-panel-${selectorsIndex}-${index}`;
      button.setAttribute("id", buttonID);
      panel.setAttribute("id", panelID);
      button.setAttribute("aria-controls", panelID);
      panel.setAttribute("aria-labelledby", buttonID);
      return { button, panel };
    });
  }

  changeAriaState(button, buttonIndex, buttons, panels) {
    // クリックされたたボタンのaria-selectedとaria-hiddenの値を変更
    // クリックされたボタン以外のボタンのaria-selectedとaria-hiddenの値を変更
    buttons.forEach((button, index) => {
      if (index === buttonIndex) {
        button.setAttribute("aria-selected", "true");
        button.setAttribute("tabindex", "-1");
        panels[index].setAttribute("aria-hidden", "false");
      } else {
        button.setAttribute("tabindex", "0");
        button.setAttribute("aria-selected", "false");
        panels[index].setAttribute("aria-hidden", "true");
      }
    });
  }
}
