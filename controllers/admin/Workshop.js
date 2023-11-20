import Workshop from "../../models/admin/Workshop.js";

export const newWorkshopUpload = async (req, res) => {
  try {
    const {
      sno,
      workshopName,
      workshopDept,
      about,
      workshopImg,
      structure,
      isRegistrationsOpened,
      contact,
      instructorName,
      instructorSpecifications,
      instructorImage,
    } = req.body;

    const newWorkshop = new Workshop({
      sno,
      workshopName,
      workshopDept,
      about,
      workshopImg,
      structure,
      isRegistrationsOpened,
      contact,
      instructorName,
      instructorSpecifications,
      instructorImage,
    });

    const savedWorkshop = await newWorkshop.save();
    res.status(201).json(savedWorkshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchAllWorkshops = async (req, res) => {
  try {
    const allWorkshops = await Workshop.find();

    if (!allWorkshops || allWorkshops.length === 0) {
      return res.status(404).json({ message: "No workshops found" });
    }

    res.status(200).json(allWorkshops);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const fetchWorkshopById = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL

    const workshop = await Workshop.findById(id);

    if (!workshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(workshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const editWorkshop = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL
    const {
      sno,
      workshopName,
      workshopDept,
      about,
      workshopImg,
      structure,
      isRegistrationsOpened,
      contact,
      instructorName,
      instructorSpecifications,
      instructorImage,
    } = req.body;

    const updatedWorkshop = await Workshop.findByIdAndUpdate(
      id,
      {
        sno,
        workshopName,
        workshopDept,
        about,
        workshopImg,
        structure,
        isRegistrationsOpened,
        contact,
        instructorName,
        instructorSpecifications,
        instructorImage,
      },
      { new: true }
    );

    if (!updatedWorkshop) {
      return res.status(404).json({ message: "Workshop not found" });
    }

    res.status(200).json(updatedWorkshop);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
