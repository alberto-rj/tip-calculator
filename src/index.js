import Listbox from "./list-box.min.js";
import DataStore from "./data-store.min.js";


/* Form fields elements */
const billInput = document.getElementById('bill-input');
const tipListbox = document.getElementById('tip-listbox');
const customTipInput = document.getElementById('custom-tip-input');
const numberOfPeopleInput = document.getElementById('number-of-people-input');
const inputs = [
  billInput,
  customTipInput,
  numberOfPeopleInput
];
/* Form fields elements */


/* Reset button */
const resetBtn = document.getElementById('reset-btn');
/* Reset button */

/* Output elements */
const tipAmountHeading = document.getElementById('tip-amount-heading');
const tipAmountData = document.getElementById('tip-amount-data');
const totalHeading = document.getElementById('total-heading');
const totalData = document.getElementById('total-data');
const fadeInElements = [
  tipAmountHeading,
  tipAmountData,
  totalHeading,
  totalData,
  resetBtn
];
/* Output elements */


/* Object for the tip selection */
const listbox = new Listbox(tipListbox);
/* Object for the tip selection */


/* Object for store the inputs values */
let inputStore  = new DataStore();

const defaultInputStore = () => {
  inputStore.set(billInput.id, null);
  inputStore.set(customTipInput.id, 15);
  inputStore.set(numberOfPeopleInput.id, null);
};

defaultInputStore();
/* Object for store the inputs values */


/* general logic */
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeClass = (element, className) => {
  element.classList.remove(className);
};

const setDisabled =  (element, status) => {
  status = status === true;
  element.disabled = status;
};

const setFadeInEffect = (elements) => {
  elements.forEach((element, index) => {
    addClass(element, `fade-in`);
    if (index > 0)
      addClass(element, `fade-in--${index}`);
  });
};

const setFadeInReverseEffect = (elements) => {
  for (let i = elements.length - 1, j = 0; i >= 0; i--, j++) {
    addClass(elements[i], `fade-in`);
    if (j > 0)
      addClass(elements[i], `fade-in--${j}`);
  }
};

const calculateData = (bill, tip, nop) => {
  let tipAmount = bill * (tip / 100);
  const totalBillWithTip = bill + tipAmount;
  const totalPerPerson = totalBillWithTip / nop;
  const tipPerPerson = tipAmount / nop;
  const data = {};
  data[tipAmountData.id] = tipPerPerson.toFixed(2);
  data[totalData.id] = totalPerPerson.toFixed(2);
  return data;
};

const renderData = (data) => {
  const tip = data[tipAmountData.id];
  tipAmountData.textContent = `$${tip}`;

  const total = data[totalData.id];
  totalData.textContent = `$${total}`;
};

const resetData = () => {
  const outData = {};
  outData[tipAmountData.id] = '0.00';
  outData[totalData.id] = '0.00';
  renderData(outData);
};

const writeData = () => {
  const bill = inputStore.get(billInput.id);
  const tip = inputStore.get(customTipInput.id);
  const nop = inputStore.get(numberOfPeopleInput.id);
  const data = calculateData(bill, tip, nop);
  renderData(data);
  setFadeInEffect(fadeInElements);
  setDisabled(resetBtn, false);
}

const tryWriteData = () => {
  if (inputStore.hasEmptyKey())
    return;
  writeData();
};
/* general logic */


/* Functions for input validation */
const setShakeEffect = (element) => {
  addClass(element, 'shake');
};

const parentOf = (input) => {
  return input.closest('.form__field, .form__group');
};

const alertOf = (parent) => {
  return parent.querySelector('.form__alert');
};

const showInputError = (input, error) => {
  const parent = parentOf(input);
  if (!parent) return;

  const formAlert = alertOf(parent);
  if (!formAlert) return;

  formAlert.textContent = error;
  input.setAttribute('aria-invalid', 'true');
  input.setAttribute('aria-describedby', formAlert.id);
  input.focus();
  setShakeEffect(input);
  addClass(parent, 'is-invalid');
};

const clearInputError = (input) => {
  const parent = parentOf(input);
  if (!parent) return;

  const formAlert = alertOf(parent);
  if (!formAlert) return;

  formAlert.textContent = '';
  input.removeAttribute('aria-invalid');
  input.removeAttribute('aria-describedby');
  removeClass(parent, 'is-invalid');
};

const validateBill = (input) => {
  const { id, value } = input;
  const billValue = Number.parseFloat(value);
  if (input.checkValidity() && !Number.isNaN(billValue)) {
    inputStore.set(id, billValue);
    clearInputError(input);
  } else {
    inputStore.set(id, null);
    showInputError(input, 'Enter between 0 and 9999 only');
  }
};

const validateCustomTip = (input) => {
  const {id, value } = input;
  const customValue = Number.parseFloat(value);
  if (input.checkValidity() && !Number.isNaN(customValue)) {
    inputStore.set(id, customValue);
    clearInputError(input);
  } else {
    inputStore.set(id, null);
    showInputError(input, 'Enter between 0 and 100 only');
  }
};

const validateNumberOfPeople = (input) => {
  const { id, value } = input;
  const nop = Number.parseInt(value);
  if (input.checkValidity() && !Number.isNaN(nop)) {
    inputStore.set(id, nop);
    clearInputError(input);
  } else {
    inputStore.set(id, null);
    showInputError(input, 'Enter between 0 and 100 only');
  }
};
/* Functions for input validation */


/* Function for the reset state*/
const resetInput = (input) => {
  clearInputError(input);
  input.value = '';
};

const resetInputs = () => {
  inputs.forEach(resetInput);
};

const resetListbox = () => {
  listbox.focus(2);
};

const resetFormFields = () => {
  resetInputs();
  resetListbox();
};
/* Function for the reset state*/


/* Click event handler for the reset button */
const resetBtnHandler = (event) => {
  setDisabled(event.target, true);
  resetData();
  setFadeInReverseEffect(fadeInElements);
  resetFormFields();
  defaultInputStore();
};
/* Click event handler for the reset button */


/* Animationend handler */
const shakeAnimationendHandler = (event) => {
  removeClass(event.target, 'shake');
};

const fadeInAnimationendHandler = (event) => {
  removeClass(event.target, 'fade-in');
  for (let i = 1; i < fadeInElements.length; i++) {
    removeClass(event.target, `fade-in--${i}`);
  }
};
/* Animationend handler */


/* Input event handler for the "inputs" */
const handleInput = (input, validate) => {
  validate(input);
  tryWriteData();
};

const inputHandlers = {};

inputHandlers[billInput.id] = (event) => {
  handleInput(event.target, validateBill);
}

inputHandlers[customTipInput.id] = (event) => {
  listbox.clearSelectedOption();
  handleInput(event.target, validateCustomTip);
}

inputHandlers[numberOfPeopleInput.id] = (event) => {
  handleInput(event.target, validateNumberOfPeople);
}
/* Input Event Handler for the form fields */


/* selectionTipHandler */
const selectionTipHandler = (option) => {
  resetInput(customTipInput);
  let number = Number.parseFloat(option.dataset.value);
  if (Number.isNaN(number)) {
    inputStore.set(customTipInput.id, null);
  } else {
    inputStore.set(customTipInput.id, number);
    tryWriteData();
  }
};
/* selectionTipHandler */


// Add event listeners for the "inputs"
inputs.forEach((input) => {
  input.addEventListener('input', inputHandlers[input.id]);
  input.addEventListener('animationend', shakeAnimationendHandler);
});

// Add event listener for the "fadeInElments"
fadeInElements.forEach((element) => {
  element.addEventListener('animationend', fadeInAnimationendHandler);
});

// Add event listener for the "resetBtn"
resetBtn.addEventListener('click', resetBtnHandler);

// Add a call back for the "lisbox"
listbox.onSelected = selectionTipHandler;