class Baserepository {
  static async create(model, options) {
    return model.create(options);
  }

  static async findOneByField(model, options) {
    return model.findOne({ where: options, raw: true });
  }

  static async findAndUpdate(model, fields, options) {
    return model.update(fields, {
      where: options,
      returning: true,
    });
  }

  static async remove(model, options) {
    return model.destroy({
      where: { ...options },
    });
  }

  static async findAndCountAll(model, options) {
    return model.findAndCountAll({ ...options, raw: true });
  }

  static async findAll(model, options) {
    return model.findAll({ ...options, returning: true });
  }
}

export default Baserepository;
