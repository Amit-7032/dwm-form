const Form = require('../models/formModel');

exports.createForm = async (req, res) => {
  try {
    const { type, units, value, date, dataType, validations } = req.body;
    const todayDate = new Date();
    const newEntry = new Form({
      type,
      date: date || todayDate,
      value,
      units,
      dataType,
      validations,
    });
    await newEntry.save();
    res.status(201).json({ message: 'Entry created successfully' });
  } catch (error) {
    console.error('Error creating entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.updateForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;

    // Basic validation
    if (value == null) {
      return res.status(400).json({ message: 'Value is required' });
    }

    const updatedEntry = await Form.findByIdAndUpdate(
      id,
      { value },
      { new: true, runValidators: true }
    );

    if (!updatedEntry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    res.status(200).json({ message: 'Entry updated successfully', updatedEntry });
  } catch (error) {
    console.error('Error updating entry:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const paginate = async (query, page, limit) => {
  const skip = (page - 1) * limit;
  const totalEntries = await Form.countDocuments(query);
  const entries = await Form.find(query)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  return {
    totalEntries,
    totalPages: Math.ceil(totalEntries / limit),
    currentPage: page,
    entries: entries.map(entry => entry.toDisplayFormat())
  };
};

exports.getTodaysForms = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const { page = 1, limit = 7 } = req.query;
    const paginationResult = await paginate(
      { date: { $gte: today, $lt: tomorrow } },
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginationResult);
  } catch (error) {
    console.error('Error fetching today entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getPendingForms = async (req, res) => {
  try {
    const { page = 1, limit = 7 } = req.query;
    const paginationResult = await paginate(
      { value: null },
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginationResult);
  } catch (error) {
    console.error('Error fetching pending entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

exports.getSavedForms = async (req, res) => {
  try {
    const { page = 1, limit = 7 } = req.query;
    const paginationResult = await paginate(
      { value: { $ne: null } },
      parseInt(page),
      parseInt(limit)
    );

    res.status(200).json(paginationResult);
  } catch (error) {
    console.error('Error fetching saved entries:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};