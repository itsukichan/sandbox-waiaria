export default class Accordion {
  constructor(selector) {
    this.accordions = document.querySelectorAll(selector);

    this.init();
  }

  init() {
    this.accordions.forEach((accordion, accordionIndex) => {
      const accordionHeaders = accordion.querySelectorAll(
        ".js-accordion-header"
      );

      accordionHeaders.forEach((header, headerIndex) => {
        const headerId = `header-${accordionIndex}-${headerIndex}`;
        const panelId = `panel-${accordionIndex}-${headerIndex}`;

        header.setAttribute("id", headerId);
        header.setAttribute("aria-controls", panelId);

        const panel = header.nextElementSibling;
        panel.setAttribute("id", panelId);
        panel.setAttribute("aria-labelledby", headerId);

        header.addEventListener("click", (event) => {
          event.preventDefault();
          this.toggle(header);
        });

        // Handle keyboard events
        header.addEventListener("keydown", (event) => {
          switch (event.key) {
            case "ArrowDown":
            case "ArrowRight":
              this.focusNextHeader(header);
              event.preventDefault();
              break;
            case "ArrowUp":
            case "ArrowLeft":
              this.focusPrevHeader(header);
              event.preventDefault();
              break;
            case "Enter":
            case " ":
              event.preventDefault();
              this.toggle(header);
              break;
            default:
              break;
          }
        });
      });
    });
  }

  toggle(header) {
    const currentExpanded = header.getAttribute("aria-expanded") === "true";
    const accordion = header.parentElement;
    const accordionHeaders = accordion.querySelectorAll(".js-accordion-header");

    accordionHeaders.forEach((otherHeader) => {
      otherHeader.setAttribute("aria-expanded", "false");
      const otherPanel = document.getElementById(
        otherHeader.getAttribute("aria-controls")
      );
      otherPanel.setAttribute("hidden", "");
      otherPanel.setAttribute("aria-hidden", "true");
    });

    if (!currentExpanded) {
      header.setAttribute("aria-expanded", "true");
      const panel = document.getElementById(
        header.getAttribute("aria-controls")
      );
      panel.removeAttribute("hidden");
      panel.setAttribute("aria-hidden", "false");
    }
  }

  focusNextHeader(currentHeader) {
    const accordion = currentHeader.parentElement;
    const accordionHeaders = accordion.querySelectorAll(".js-accordion-header");
    const currentIndex = Array.from(accordionHeaders).indexOf(currentHeader);

    if (currentIndex === accordionHeaders.length - 1) {
      accordionHeaders[0].focus();
    } else {
      accordionHeaders[currentIndex + 1].focus();
    }
  }

  focusPrevHeader(currentHeader) {
    const accordion = currentHeader.parentElement;
    const accordionHeaders = accordion.querySelectorAll(".js-accordion-header");
    const currentIndex = Array.from(accordionHeaders).indexOf(currentHeader);

    if (currentIndex === 0) {
      accordionHeaders[accordionHeaders.length - 1].focus();
    } else {
      accordionHeaders[currentIndex - 1].focus();
    }
  }
}
