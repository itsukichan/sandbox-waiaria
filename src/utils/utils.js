// aria-expandedステートの設定
export function setAriaExpanded(element, value) {
  element.setAttribute("aria-expanded", value);
}

// aria-expandedステートの取得
export function getAriaExpanded(element) {
  return element.getAttribute("aria-expanded");
}

// aria-checkedステートの設定
export function setAriaChecked(element, value) {
  element.setAttribute("aria-checked", value);
}

// aria-checkedステートの取得
export function getAriaChecked(element) {
  return element.getAttribute("aria-checked");
}

// aria-labelledbyステートの設定
export function setAriaLabelledby(element, value) {
  element.setAttribute("aria-labelledby", value);
}

// aria-describedbyステートの設定
export function setAriaDescribedby(element, value) {
  element.setAttribute("aria-describedby", value);
}

// aria-hiddenステートの設定
export function setAriaHidden(element, value) {
  element.setAttribute("aria-hidden", value);
}
