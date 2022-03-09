const WilderModel = require("../models/Wilder");

module.exports = {
  create: async (req, res) => {
    const newWilder = new WilderModel(req.body);
    try {
      await newWilder.save();
      res.json({ success: true, result: newWilder });
      console.log("Wilder Added successfully");
    } catch (err) {
      res.json({ success: false, result: err });
    }
  },
  retrieve: (req, res) => {
    const data = WilderModel.find();
    data
      .then((result) => {
        res.json({ success: true, result: result });
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  update: (req, res) => {
    const id = req.body._id;
    const updatedData = req.body;
    const options = { new: true };

    const result = WilderModel.findByIdAndUpdate(id, updatedData, options);
    result
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
  delete: (req, res) => {
    const id = req.params.id;
    const data = WilderModel.findByIdAndRemove(id);

    data
      .then((result) => {
        res.send(`Document with ${data.name} has been deleted..`);
      })
      .catch((err) => {
        res.json({ success: false, result: err });
      });
  },
};
