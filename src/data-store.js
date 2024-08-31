class DataStore {
  constructor () {
    this.map = {};
  }

  set (key, value) {
    this.map[key] = value;
  }

  get (key) {
    return this.map[key];
  }

  getAll () {
    return this.map;
  }

  isSet () {
    for (let key in this.map) {
      if (this.map[key] === null)
        return false;
    }
    return true;
  }

  hasSetKey () {
    for (let key in this.map) {
      if (this.map[key] !== null) {
        return true;
      }
    }
    return false;
  }

  hasEmptyKey () {
    for (let key in this.map) {
      if (this.map[key] === null) {
        return true;
      }
    }
    return false;
  }

  keyExists (key) {
    return key in this.map;
  }

  keySet (key) {
    if (!(key in this.map))
      return false;
    return this.map[key] !== null;
  }

  keySetCount () {
    let count = 0;
    for (let key in this.map){
      if (this.map[key] !== null)
        count++;
    }
    return count;
  }

  keyEmpty (key) {
    if (!(key in this.map)) {
      return true;
    }
    return this.map[key] === null;
  }

  isEmpty () {
    let i = 0;
    for (let key in this.map) {
      i++;
    }
    return i === 0;
  }

  size () {
    let i = 0;
    for (let key in this.map) {
      i++;
    }
    return i;
  }

  compareTo (store) {
    if (!store)
      return 0;
    if (!(store instanceof DataStore))
      return 0;
    return this.size() - store.size();
  }

  equals (store) {
    if (!(store instanceof DataStore))
      return false;
    if (this.size() !== store.size())
      return false;
    
    const thisMap = this.map;
    const storeMap = store.map;
    
    for (let thisKey in thisMap) {
      if (thisMap[thisKey] !== storeMap[thisKey])
        return false;
    }
    return true;
  }

  clone() {
    let newStore = new DataStore();
    for (let key in this.map) {
      newStore.map[key] = this.map[key];
    }
    return newStore;
  }

  reset () {
    for (let key in this.map) {
      this.map[key] = null;
    }
  }
}

export default DataStore;