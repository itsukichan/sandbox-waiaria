export default class Modal {
  constructor(selectors) {
    this.selectorName = selectors.replace("js-", "");
    this.selectors = document.querySelectorAll(`.${selectors}`);
    this.init();
  }

  init() {
    this.selectors.forEach((selector, index, arr) => {
      this.addUniqueID(selector, index);
      this.open(selector);
      this.close(selector);
    });
  }

  open(selector) {
    const button = selector.querySelector('[data-modal="button-open"]');
    button.addEventListener("click", (e) => {
      // changeAriaStateでariaの値を変更
      this.changeAriaState(selector, true);

      const focusableElements = selector.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusableElements.length > 0) {
        focusableElements[0].focus();
      }

      selector.addEventListener("keydown", (e) => this.trapTabKey(selector, e));
    });
  }

  close(selector) {
    const button = selector.querySelector('[data-modal="button-close"]');
    button.addEventListener("click", (e) => {
      // changeAriaStateでariaの値を変更
      this.changeAriaState(selector, false);

      selector.removeEventListener("keydown", (e) =>
        this.trapTabKey(selector, e)
      );
    });
  }

  addUniqueID(selector, index) {
    const dialogID = `${this.selectorName}-dialog-${index}`;
    const titleID = `${this.selectorName}-title-${index}`;
    const daialog = selector.querySelector('[role="dialog"]');
    const title = selector.querySelector('[data-modal="title"]');
    // id を設定
    daialog.setAttribute("id", dialogID);
    title.setAttribute("id", titleID);
    // aria-labelledby 属性を設定
    daialog.setAttribute("aria-labelledby", titleID);
    return { title, daialog };
  }

  changeAriaState(selector) {
    // dialogのaria-modalを変更とhiddenを変更
    const dialogElement = selector.querySelector('[role="dialog"]');
    dialogElement.setAttribute(
      "aria-modal",
      dialogElement.getAttribute("aria-modal") === "true" ? "false" : "true"
    );
    // hiddenがあれば削除、なければ追加
    dialogElement.hasAttribute("hidden")
      ? dialogElement.removeAttribute("hidden")
      : dialogElement.setAttribute("hidden", "");
  }

  trapTabKey(selector, e) {
    const focusableElements = selector.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstFocusableElement = focusableElements[0];
    const lastFocusableElement =
      focusableElements[focusableElements.length - 1];

    if (e.keyCode === 9) {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusableElement) {
          e.preventDefault();
          lastFocusableElement.focus();
        }
      } else {
        if (document.activeElement === lastFocusableElement) {
          e.preventDefault();
          firstFocusableElement.focus();
        }
      }
    }

    if (e.keyCode === 27) {
      this.close(selector);
    }
  }
}
