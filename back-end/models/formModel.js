const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  type: { type: String, required: true },
  date: { type: Date, default: Date.now },
  value: { type: Number, default: null },
  units: { type: String, required: true },
  dataType: { type: String, default: "number" },
  validations: { type: Number, default: 99 },
});

// Pre-save middleware to transform type and units to lowercase with underscores
formSchema.pre("save", function (next) {
  this.type = this.type.toLowerCase().replace(/\s+/g, "_");
  this.units = this.units.toLowerCase().replace(/\s+/g, "_");
  next();
});

// Method to convert stored format to display format
formSchema.methods.toDisplayFormat = function () {
  return {
    ...this.toObject(),
    type: this.type
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
    units: this.units
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase()),
  };
};

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
