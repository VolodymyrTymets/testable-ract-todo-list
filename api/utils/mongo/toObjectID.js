const ToObjectID = require('mongodb').ObjectID;

const toObjectID = (str) => {
  let _id = '';
  try {
    _id = ToObjectID(str);
  } catch (e) {
    return _id;
  }
  return _id;
};

module.exports = {
  toObjectID,
};