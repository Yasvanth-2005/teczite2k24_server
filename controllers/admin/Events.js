import Competitions from "../../models/admin/Competitions.js";
export const newEventUpload = async (req, res) => {
  try {
    const {
      eveID,
      eveName,
      eveDepartment,
      eveImg,
      about,
      structure,
      timeline,
      rules,
      TeamSize,
      contact_info,
      isRegistrationsOpened,
    } = req.body;
    const newEvent = new Competitions({
      eveID,
      eveName,
      eveDepartment,
      eveImg,
      about,
      structure,
      timeline,
      rules,
      TeamSize,
      contact_info,
      isRegistrationsOpened,
    });
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllEvents = async (req, res) => {
  try {
    const allEvents = await Competitions.find();

    if (!allEvents || allEvents.length === 0) {
      return res.status(404).json({ message: "No events found" });
    }

    res.status(200).json(allEvents);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const fetchEventById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL

    const event = await Competitions.findById(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};

export const editEvent = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL
    const {
      eveID,
      eveName,
      eveDepartment,
      eveImg,
      about,
      structure,
      timeline,
      rules,
      TeamSize,
      contact_info,
      isRegistrationsOpened,
    } = req.body;

    const updatedEvent = await Competitions.findByIdAndUpdate(
      id,
      {
        eveID,
        eveName,
        eveDepartment,
        eveImg,
        about,
        structure,
        timeline,
        rules,
        TeamSize,
        contact_info,
        isRegistrationsOpened,
      },
      { new: true }
    );

    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Internal Server error" });
  }
};
