// form
const form = document.getElementById('form');
// form

/* Form fields elements */
const billInput = document.getElementById('bill-input');
const customTipInput = document.getElementById('custom-tip-input');
const numberOfPeopleInput = document.getElementById('number-of-people-input');
const inputs = [
  billInput,
  customTipInput,
  numberOfPeopleInput
];
/* Form fields elements */

// radio buttons
const radioInputs = document.querySelectorAll('.form__radio-input');
// radio buttons

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

// current tip
let currentTip = 0;
// current tip


/* general logic */
const addClass = (element, className) => {
  element.classList.add(className);
};

const removeCheckedRadioInput = () => {
  radioInputs.forEach((input) => {
    if (input.checked) {
      input.checked = false;
    }
  });
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
  const bill = Number.parseFloat(billInput.value);
  const nop = Number.parseFloat(numberOfPeopleInput.value);
  const data = calculateData(bill, currentTip, nop);
  renderData(data);
  setFadeInEffect(fadeInElements);
  setDisabled(resetBtn, false);
};

const tryWriteData = () => {
  if (form.checkValidity()) {
    writeData();
  }
};
/* general logic */


/* Functions for input validation */
const setShakeEffect = (element) => {
  addClass(element, 'shake');
};

const parentOf = (input) => {
  return input.closest('.form__field');
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
    clearInputError(input);
  } else {
    showInputError(input, 'Enter between 0 and 9999');
  }
};

const validateCustomTip = (input) => {
  const {id, value } = input;
  currentTip = Number.parseFloat(value);
  if (input.checkValidity() && !Number.isNaN(currentTip)) {
    clearInputError(input);
  } else {
    showInputError(input, 'Enter between 0 and 100');
  }
};

const validateNumberOfPeople = (input) => {
  const { id, value } = input;
  const nop = Number.parseInt(value);
  if (input.checkValidity() && !Number.isNaN(nop)) {
    clearInputError(input);
  } else {
    showInputError(input, 'Enter between 0 and 100');
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


const resetFormFields = () => {
  currentTip = 0;
  form.reset();
};
/* Function for the reset state*/


/* Click event handler for the reset button */
const resetBtnHandler = (event) => {
  setDisabled(event.target, true);
  resetData();
  setFadeInReverseEffect(fadeInElements);
  resetFormFields();
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
};

inputHandlers[customTipInput.id] = (event) => {
  removeCheckedRadioInput();
  handleInput(event.target, validateCustomTip);
};

inputHandlers[numberOfPeopleInput.id] = (event) => {
  handleInput(event.target, validateNumberOfPeople);
};
/* Input Event Handler for the form fields */


/* selectionTipHandler */
const selectionTipHandler = (event) => {
  resetInput(customTipInput);
  currentTip = Number.parseFloat(event.target.value);
  if (Number.isNaN(currentTip)) {
    currentTip = 0;
    return ;
  }
  tryWriteData();
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

// Add a call back for the radio inputs
radioInputs.forEach((input) => {
  input.addEventListener('change', selectionTipHandler);
});