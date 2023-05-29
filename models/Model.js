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

  save() {
    this.id = uuid.v4();
    let data = this.getDataFromLocalStorage() || [];
    data.push(this);
    localStorage.setItem(this.nameModel, JSON.stringify(data));
    return this;
  }

  findById(id) {
    this.id = id;
    let data =
      this.getDataFromLocalStorage().find((record) => record.id === id) || null;
    for (let key in data) {
      this[key] = data[key];
    }
    return this;
  }

  update() {
    let data = this.getDataFromLocalStorage() || [],
      index = data.findIndex((record) => record.id === this.id);
    if (index !== -1) {
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

export default nameModel;
