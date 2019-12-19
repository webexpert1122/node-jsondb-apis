const model = require('./model');

module.exports = {
  getHealth,
  putProperty,
  getProperty,
  deleteProperty
}

function getHealth (req, res, next) {
  res.json({ success: true })
}

async function putProperty(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const propPath = req.params[0];

    const result = await model.setProperty(studentId, propPath, req.body);
    res.json({
      success: true
    });
  } catch (error) {
    console.log(error);
    next();
  }
}

async function getProperty(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const propPath = req.params[0];

    const properties = await model.getProperty(studentId, propPath);
    res.json({
      success: true,
      data: properties
    });
  } catch (error) {
    console.log(error);
    next();
  }
}

async function deleteProperty(req, res, next) {
  try {
    const studentId = req.params.studentId;
    const propPath = req.params[0];

    const result = await model.deleteProperty(studentId, propPath);
    res.json({
      success: true
    });
  } catch (error) {
    console.log(error);
    next();
  }
}
