import table from "../models/table.js"

const createTable = async (req, res) => {
    try {
      const newTable = new table(req.body);
      const savedTable = await newTable.save();
      res.json(savedTable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const getAllTables = async (req, res) => {
    try {
      const tables = await table.find();
      res.json(tables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
const getSpecificTable = async (req, res) => {
    try {
      const { id } = req.params;
      const specificTable = await table.findById(id);
      if (!specificTable) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      res.json(specificTable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateTable = async (req, res) => {
    try {
      const { id } = req.params;
      const updatedTable = await table.findByIdAndUpdate(id, req.body, {
        new: true,
      });
  
      if (!updatedTable) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      res.json(updatedTable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateSubject = async (req, res) => {
    try {
      const { id, day, subjectId } = req.params;
      const {subject,teacher} = req.body;
  
      // Find the timetable by ID
      const updatedTable = await table.findByIdAndUpdate(
        id,
        {
            $set: {
                [`timetable.${day}.$[elem].subject`]: subject,
                [`timetable.${day}.$[elem].teacher`]: teacher
            }
        },
        {
            new: true, // Return the modified document
            arrayFilters: [{ 'elem._id': subjectId }]
        }
    );
  
      if (!updatedTable) {
        return res.status(404).json({ message: "Subject not found" });
      }
  
      res.json(updatedTable);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const deleteTable = async (req, res) => {
    try {
      const { id } = req.params;
      const deleteTable = await table.findByIdAndDelete(id);
  
      if (!deleteTable) {
        return res.status(404).json({ message: "Table not found" });
      }
  
      res.json({ message: "Table Deleted Successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  
  
  export {
    createTable,
    getAllTables,
    getSpecificTable,
    updateTable,
    updateSubject,
    deleteTable
}