const AuxTagsSchema = require("../models/AuxTag");
const generateNewTag = (tag) => {
    const promise = new Promise(async (resolve, reject) => {
        let newTag = tag;
        let auxTag = '';
        if (!tag) {
            auxTag = await AuxTagsSchema.find();
            newTag = "S-ETQ-" + auxTag[0].counter;
          }
    
        resolve({newTag, auxTag});
    })
    return promise;
}

module.exports = { generateNewTag };