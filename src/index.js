import "./style.scss";
import Accordion from "./components/accordion/_accordion.js";
import Tab from "./components/tab/_tab.js";
import Modal from "./components/modal/_modal.js";
import Tooltip from "./components/tooltip/_tooltip.js";

new Accordion("js-accordion");
new Accordion("js-uniqueAccordion");
new Tab("js-tab");
new Tab("js-uniqueTab");
new Modal("js-modal");
new Modal("js-uniqueModal");
new Tooltip("js-tooltip");
new Tooltip("js-uniqueTooltip");
