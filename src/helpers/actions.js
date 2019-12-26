export default class Actions {
  static addData = (model, data, permit) =>
    model.create(data, { fields: permit });

  static findData = async (model, clause, attributes = null) => {
    return attributes
      ? await model.findOne({
          where: clause,
          attributes,
        })
      : await model.findOne({ where: clause });
  };

  static updateData = async (
    model,
    data,
    permit,
    clause,
    attributes = null,
    returning = true,
  ) => {
    return attributes
      ? await model.update(data, {
          fields: permit,
          returning,
          where: clause,
          attributes,
        })
      : await model.update(data, { fields: permit, returning, where: clause });
  };
}
