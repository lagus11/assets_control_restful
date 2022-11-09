const AuxTagsSchema = require("../models/AuxTag");
const incrementCounter = (tag, auxTag) => {
  const promise = new Promise(async (resolve, reject) => {
    if (!tag) {
      await AuxTagsSchema.findByIdAndUpdate(auxTag[0]._id, {
        counter: parseInt(auxTag[0].counter + 1),
      });
    }
    resolve();
  });
  return promise;
};

module.exports = { incrementCounter };
