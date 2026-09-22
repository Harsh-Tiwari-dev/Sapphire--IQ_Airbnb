import Property from "../models/Property.js";

// Create Property
export const createProperty = async (req, res) => {
  try {
    const { title, description, location, price, images } = req.body;

    const property = await Property.create({
      title,
      description,
      location,
      price,
      images,
      host: req.user._id,
    });

    res.status(201).json({
      message: "Property created successfully",
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Properties
export const getAllProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate(
      "host",
      "name email"
    );

    res.status(200).json({
      properties,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get Single Property
export const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate(
      "host",
      "name email"
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json({
      property,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Update Property
export const updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to update this property",
      });
    }

    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Delete Property
export const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (property.host.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You are not allowed to delete this property",
      });
    }

    await Property.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Property deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};