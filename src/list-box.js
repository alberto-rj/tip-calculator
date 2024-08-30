class Listbox {
  constructor (node) {
    this.node = node;
    this.currentIndex = this.getSelectedOptionIndex();
    this.registenerEvents();
    this.onSelected = (thisValue) => {};
  }
  
  registenerEvents() {
    this.node.addEventListener('keydown', event => this.handleKeydown(event));
    this.node.addEventListener('click', event => this.handleClick(event));
  }
  
  focusNext () {
    const options = this.getOptions();
    const lastIndex = options.length - 1;
    if (this.currentIndex < lastIndex) 
      this.focus(this.currentIndex + 1);
  }
  
  focusPrevious () {
    if (this.currentIndex > 0) 
      this.focus(this.currentIndex - 1);
  }

  isValidIndex (index, length) {
    return (index >= 0 && index < length);
  }
  
  focus (index) {
    const options = this.getOptions();

    if (!this.isValidIndex(index, options.length)) {
      return ;
    }

    const currentOption = this.getSelectedOption();
    if (currentOption) {
      currentOption.removeAttribute('aria-selected');
    }
    
    const newOption = options[index];
    newOption.setAttribute('aria-selected', 'true');
    this.node.setAttribute('aria-activedescendant', newOption.id);
    
    this.currentIndex = index;
    this.onSelected(this);
  }

  clearSelectedOption () {
    const selectedOption = this.getSelectedOption();
    if (selectedOption !== null) {
      selectedOption.removeAttribute('aria-selected');
      this.node.removeAttribute('aria-activedescendant');
      this.currentIndex = -1;
    }
  }
  
  getOptions () {
    const selector = '[role="option"]';
    const options = this.node.querySelectorAll(selector);
    return Array.from(options);
  }
  
  getSelectedOptionIndex () {
    const options = this.getOptions();
    return (
      options.findIndex(option => option.getAttribute('aria-selected') === 'true')
    );
  }

  getOption(index) {
    const options = this.getOptions();
    if (index < 0 || index >= options.length) {
      return null;
    }
    return options[index];
  }

  getSelectedOption() {
    return this.getOption(this.currentIndex);
  }
  
  handleClick (event) {
    const options = this.getOptions();
    const index = options.findIndex(option => option === event.target);
    if (index >= 0) 
      this.focus(index);
  }
  
  handleKeydown (event) {
    const { key } = event;
    const keyHandlers = {
      'ArrowRight' : (thisValue) => thisValue.focusNext(),
      "ArrowLeft"  : (thisValue) => thisValue.focusPrevious(),
      "Home"       : (thisValue) => thisValue.focus(0),
      "End"        : (thisValue) => thisValue.focus(thisValue.options.length - 1)
    };
    if (key in keyHandlers) {
      event.preventDefault();
      keyHandlers[event.key](this);
    } else { 
      this.tryWithKey(event);
    }
  }

  tryWithKey (event) {
    const { key } = event;
    const regex = new RegExp(`^${key}`, 'i');
    const options = this.getOptions();
    const index = options.findIndex(option => regex.test(option.textContent));
    if (index >= 0) {
      event.preventDefault();
      this.focus(index);
    }
  }
}

export default Listbox;