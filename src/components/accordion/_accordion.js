export default class Accordion {
  constructor(selectors) {
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(`.${selectors}`);
    this.init();
  }

  init() {
    this.selectors.forEach((selector, index, arr) => {
      this.toggle(selector, index, arr);
    });
  }

  toggle(selector, index, arr) {
    this.addUniqueID(selector, index);
    selector.addEventListener("click", (e) => {
      this.changeAriaState(selector, index);

      const panel = selector.querySelector('[role="tabpanel"]');
      const panelHeight = panel.scrollHeight;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = `${panelHeight}px`;
      }
    });
  }

  addUniqueID(selector, index) {
    const headerID = `${this.selectorName}-header-${index}`;
    const panelID = `${this.selectorName}-panel-${index}`;
    const header = selector.querySelector('[role="tab"]');
    const panel = selector.querySelector('[role="tabpanel"]');
    // id を設定
    header.setAttribute("id", headerID);
    panel.setAttribute("id", panelID);
    // aria-controls aria-labelledby 属性を設定
    header.setAttribute("aria-controls", panelID);
    panel.setAttribute("aria-labelledby", headerID);
    return { header, panel };
  }

  changeAriaState(selector, index) {
    const tabElement = selector.querySelector('[role="tab"]');
    const tabPanelElement = selector.querySelector('[role="tabpanel"]');
    // aria-expanded と aria-hidden の値を反転
    tabElement.setAttribute(
      "aria-expanded",
      tabElement.getAttribute("aria-expanded") === "true" ? "false" : "true"
    );
    tabPanelElement.setAttribute(
      "aria-hidden",
      tabPanelElement.getAttribute("aria-hidden") === "true" ? "false" : "true"
    );
  }
}
