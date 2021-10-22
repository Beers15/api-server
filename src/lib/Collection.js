'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async get(id, options = {}) {
    try {
      let records = null;
      if(id) {
        options['where'] = { id: id };
        records = await this.model.findOne(options);
      } else {
        records = await this.model.findAll(options);
      }

      return records;
    } catch(err) {
      return err;
    }
  }

  async create(body) {
    try {
      let record = await this.model.create(body);

      return record;
    } catch(err) {
      return err;
    }
  }

  async update(id, body) {
    try {   
      let record = await this.model.findOne({ where: { id }});
      let updatedRecord = await record.update(body);

      return updatedRecord;
    } catch(err) {

      return err;
    }
  }

  async delete(id) {
    try {
      await this.model.destroy({ where: { id }});

      return null;
    } catch(err) {
      return err;
    }
  }
}

module.exports = Collection;
