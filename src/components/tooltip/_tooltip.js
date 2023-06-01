export default class Tooltip {
  constructor(selectors) {
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(
      `.${selectors}[data-tooltip-text]`
    );
    this.init();
  }

  init() {
    this.selectors.forEach((selector, index) => {
      const tooltipId = `${this.selectorName}-content-${index}`;
      this.attachTooltipEvents(selector, tooltipId);
    });
  }

  attachTooltipEvents(elem, tooltipId) {
    elem.addEventListener("mouseenter", (event) => {
      this.createTooltip(elem, tooltipId);
    });

    elem.addEventListener("mouseleave", (event) => {
      this.removeTooltip(elem, tooltipId);
    });
  }

  createTooltip(elem, tooltipId) {
    const tooltipText = elem.dataset.tooltipText;
    const tooltipDiv = document.createElement("div");
    tooltipDiv.style.position = "absolute";
    tooltipDiv.setAttribute("role", "tooltip");
    tooltipDiv.setAttribute("id", tooltipId);
    tooltipDiv.innerText = tooltipText;
    elem.appendChild(tooltipDiv);
    elem.setAttribute("aria-describedby", tooltipId);
  }

  removeTooltip(elem, tooltipId) {
    elem.removeChild(elem.querySelector(`#${tooltipId}`));
    elem.removeAttribute("aria-describedby");
  }
}
