/**
 **  Model Class - Version 1.0.0
 **  Description: This class is a model for the localStorage of the browser and it is used to create, read, update and delete data from  the localStorage.
 **  Author: Cristian Pineda <cristianpined4.outlook.com>
 **  CopyRight: Cristian Pineda 2023
 **  License: MIT License
 **/

class Model {
  nameModel = "";
  constructor() {
    this.id = null;
    return this;
  }

  getDataFromLocalStorage() {
    const data = localStorage.getItem(this.nameModel);
    return data ? JSON.parse(data) : null;
  }

  getDataFromLocalStorageByModel(model) {
    const data = localStorage.getItem(model);
    return data ? JSON.parse(data) : null;
  }

  save() {
    if (this.id) return this.update();
    this.id = uuid.v4();
    let data = this.getDataFromLocalStorage() || [];
    for (let key in this) {
      if (this[key].trim() === "") {
        throw new Error(`The field "${key}" is required`);
      }
    }
    data.push(this);
    localStorage.setItem(this.nameModel, JSON.stringify(data));
    return this;
  }

  findById(id) {
    let data =
      this.getDataFromLocalStorage().find((record) => record.id === id) || null;
    for (let key in data) {
      this[key] = data[key];
    }
    return this.id ? this : null;
  }

  findRelated(model, key, value) {
    let data = this.getDataFromLocalStorageByModel(model) || [],
      records = data.filter((record) => record[key] === value);
    return records.map((record) => {
      let instance = new Model();
      for (let key in record) {
        instance[key] = record[key];
      }
      return instance.id ? instance : null;
    });
  }

  update() {
    let data = this.getDataFromLocalStorage() || [],
      index = data.findIndex((record) => record.id === this.id);
    if (index !== -1) {
      for (let key in this) {
        if (this[key].trim() === "") {
          throw new Error(`The field "${key}" is required`);
        }
      }
      data[index] = { ...data[index], ...this };
      localStorage.setItem(this.nameModel, JSON.stringify(data));
      return data[index];
    }
    return null;
  }

  delete(id) {
    let data = this.getDataFromLocalStorage() || [],
      index = data.findIndex((record) => record.id === id);
    if (index !== -1) {
      const deletedRecord = data[index];
      data.splice(index, 1);
      localStorage.setItem(this.nameModel, JSON.stringify(data));
      return deletedRecord;
    }
    return null;
  }

  delete() {
    let data = this.getDataFromLocalStorage() || [],
      index = data.findIndex((record) => record.id === this.id);
    if (index !== -1) {
      const deletedRecord = data[index];
      data.splice(index, 1);
      localStorage.setItem(this.nameModel, JSON.stringify(data));
      return deletedRecord;
    }
    return null;
  }

  all() {
    return this.getDataFromLocalStorage() || [];
  }
}

export default Model;
