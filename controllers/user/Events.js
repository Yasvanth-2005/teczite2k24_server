import Competitions from "../../models/admin/Competitions.js";

export const EventRegister = async (req, res) => {
  const { eventId, studentIds } = req.body;

  try {
    const competition = await Competitions.findOne({ eveID: eventId });

    if (!competition) {
      return res.status(404).json({ message: "Competition not found" });
    }

    if (!competition.isRegistrationsOpened) {
      return res.status(400).json({ message: "Registrations are closed" });
    }

    if (studentIds.length !== competition.TeamSize) {
      return res.status(400).json({ message: "Please Check for the Team Size" });
    }
  
    // Check if any student ID does not start with "TZ2024"
    const invalidIds = studentIds.filter(id => !id.startsWith("TZ2024"));

    if (invalidIds.length > 0) {
      return res.status(400).json({ message: "Invalid TECKZITE ID found" });
    }

    // Check if any of the students are already registered in any team
    const flatRegisteredStudents = competition.RegisterStudents.flat();
    const alreadyRegistered = studentIds.some(id => flatRegisteredStudents.includes(id));

    if (alreadyRegistered) {
      return res.status(400).json({ message: "One or more students already registered" });
    }

    // Add the student IDs to the registered students array
    competition.RegisterStudents.push(studentIds);

    // Save the updated competition document
    await competition.save();

    return res.status(200).json({ message: "Students registered successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
