export default class Actions {
  static addData = (model, data, permit) =>
    model.create(data, { fields: permit });

  static findData = async (model, clause, attributes = null) => {
    return attributes
      ? await model.findOne({
        where: clause,
        attributes
      })
      : await model.findOne({ where: clause });
  }
}
