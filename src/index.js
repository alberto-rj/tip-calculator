import Listbox from "./list-box.js";
import InputValue from "./input-value.js";
import DataStore from "./data-store.js";

const billInput = document.getElementById('bill-input');
const tipListbox = document.getElementById('tip-listbox');
const tipInput = document.getElementById('tip-input');
const nopInput = document.getElementById('nop-input');
const inputs = [
  billInput,
  tipInput,
  nopInput
];

const tipAmountHeading = document.getElementById('tip-amount-heading');
const tipAmountData = document.getElementById('tip-amount-data');
const totalHeading = document.getElementById('total-heading');
const totalData = document.getElementById('total-data');
const fadeInElements = [
  tipAmountHeading,
  tipAmountData,
  totalHeading,
  totalData
];

const resetBtn = document.getElementById('reset-btn');

const listbox = new Listbox(tipListbox);

let currentStore  = new DataStore();
currentStore.set(billInput.id, null);
currentStore.set(tipInput.id, null);
currentStore.set(nopInput.id, null);

let lastStore = new DataStore();


/* render logic */
const renderError = (input, error) => {
  console.log(error);
  const parent = input.closest('.form__field, .form__group');
  if (!parent) return;

  const formAlert = parent.querySelector('.form__alert');
  if (!formAlert) return;

  formAlert.textContent = error;
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', formAlert.id);
  setShakeEffect(input);
  addClass(parent, 'is-invalid');
};

const clearError = (input) => {
  const parent = input.closest('.form__field');
  if (!parent) return;

  const formAlert = parent.querySelector('.form__alert');
  if (!formAlert) return;

  formAlert.textContent = '';
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  removeClass(parent, 'is-invalid');
};

const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const getClassNamesClear = (classNames) => {
  const eventHandler = (event) => {
    const { target } = event;
    classNames.forEach((className) => {
      removeClass(target, className);
    });
  };
  return eventHandler;
};

const setDisabled =  (element, status) => {
  status = status === true;
  if (status) {
    element.setAttribute('disabled', status);
    element.setAttribute('aria-disabled', status);
  } else {
    element.removeAttribute('aria-disabled');
    element.removeAttribute('disabled');
  }
};

const clearInputs = () => {
  inputs.forEach((input) => input.value = '');
  listbox.focus(0);
};

const setShakeEffect = (element) => {
  const className = 'shake';
  const classNamesClear = getClassNamesClear([className]); 
  addClass(element, className);
  element.addEventListener('animationend', classNamesClear);
};

const setFadeInEffect = (elements) => {
  elements.forEach((element, index) => {
    const classNames = ['fade-in'];
    if (index > 0)
      classNames.push(`fade-in--${index}`);

    classNames.forEach((className) => {
      addClass(element, className);
    });
    
    const classNamesClear = getClassNamesClear(classNames);
    element.addEventListener('animationend', classNamesClear);
  });
};

const fadeInReverseEffect = (elements) => {
  for (let i = elements.length - 1, j = 0; i >= 0; i--, j++) {
    let element = elements[i];
    const classNames = ['fade-in'];
    if (j > 0)
      classNames.push(`fade-in--${j}`);

    classNames.forEach((className) => {
      addClass(element, className);
    });
  }
};

const toCents = (value) => value * 100;

const toValue = (value) => value / 100;

const calculateData = (bill, tip, nop) => {
  bill = toCents(bill);
  tip = toCents(tip);
  nop = toCents(nop);
  let tipAmount = toValue(bill * (tip / 100));
  const totalBillWithTip = bill + tipAmount;
  const totalPerPerson = totalBillWithTip / nop;
  const tipPerPerson = tipAmount / nop;
  const data = {};
  data[tipAmountData.id] = tipPerPerson.toFixed(2);
  data[totalData.id] = totalPerPerson.toFixed(2);
  return data;
};

const renderData = (data) => {

  const tipAmount = data[tipAmountData.id];
  tipAmountData.textContent = `$${tipAmount}`;

  const total = data[totalData.id];
  totalData.textContent = `$${total}`;
};

const writeData = () => {
  const bill = currentStore.get(billInput.id);
  const tip = currentStore.get(tipInput.id);
  const nop = currentStore.get(nopInput.id);
  const data = calculateData(bill, tip, nop);
  renderData(data);
  setFadeInEffect(fadeInElements);
  setDisabled(resetBtn, false);
}

const clearData = () => {
  const outData = {};
  outData[tipAmountData.id] = '0.00';
  outData[totalData.id] = '0.00';
  renderData(outData);
};

const hasCurrentStore = () => {
  if (currentStore.hasEmptyKey()) {
    return false;
  }
  return true;
};

const renderCurrentStore = () => {
  if (!hasCurrentStore())
    return;
  writeData();
  lastStore = currentStore.clone();
};
/* render logic */


/* input handler */

const handleInput = (input, validate) => {
  validate(input);
  renderCurrentStore();
};

const handleBillInput = (input) => {
  validateBill(input);
  renderCurrentStore();
}

const handleTipInput = (input) => {
  validateCustomTip(input);
  renderCurrentStore();
};

const handleNOPInput = (input) => {
  validateNumberOfPeople(input);
  renderCurrentStore();
};
/* input handler */

/* Validation handler */
const validateBill = (input) => {
  const { id, value } = input;
  if (input.checkValidity()) {
    currentStore.set(id, Number.parseFloat(value));
    clearError(input);
    return true;
  } else {
    currentStore.set(id, null);
    renderError(input, "Enter ≥ 0 only");
    return false;
  }
};

const validateCustomTip = (input) => {
  const {id, value } = input;
  if (input.checkValidity()) {
    currentStore.set(id, Number.parseFloat(value));
    clearError(input);
    return true;
  } else {
    currentStore.set(id, null);
    renderError(input, "Enter 0-100 only");
    return false;
  }
};

const validateNumberOfPeople = (input) => {
  const { id, value } = input;
  if (input.checkValidity()) {
    currentStore.set(id, Number.parseInt(value));
    clearError(input);
    return true;
  } else {
    currentStore.set(id, null);
    renderError(input, "Enter > 0 only");
    return false;
  }
};
/* Validation handler */

/* change */
const handleChange = (listbox) => {
  const option = listbox.getSelectedOption();
  let number = Number.parseFloat(option.dataset.value);
  if (Number.isNaN(number)) {
    number = null;
  }
  currentStore.set(tipInput.id, number);
};
/* change */


/* Click event handler for the reset button */
const handleReset = (event) => {
  clearInputs();
  clearData();
  fadeInReverseEffect(fadeInElements);
  setDisabled(event.target, true);
};
/* Click event handler for the reset button */


/* Input Event Handler for the form fields */
const inputHandlers = {};

inputHandlers[billInput.id] = (event) => handleBillInput(event.target);

inputHandlers[tipInput.id] = (event) => handleTipInput(event.target);

inputHandlers[nopInput.id] = (event) => handleNOPInput(event.target);
/* Input Event Handler for the form fields */



// Add input event listener for the "inputs"
inputs.forEach((input) => {
  input.addEventListener('input', inputHandlers[input.id]);
});
// Add click event listener for the "resetBtn"
resetBtn.addEventListener('click', handleReset);

listbox.onSelected = handleChange;