import Notification from '../../models/admin/Notification.js'

export const NewNotify = async (req, res) => {
  try {
    const { heading, info, picturePath, link } = req.body;

    const newNotification = new Notification({
      heading,
      info,
      picturePath,
      link
    });

    const savedNotification = await newNotification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const EditNotify = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL
    const { heading, info, picturePath, link } = req.body;

    const updatedNotification = await Notification.findByIdAndUpdate(
      id,
      { heading, info, picturePath, link },
      { new: true }
    );

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res.status(200).json(updatedNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteNotify = async (req, res) => {
  try {
    const { id } = req.params; // Assuming you're passing the ID in the URL

    const deletedNotification = await Notification.findByIdAndDelete(id);

    if (!deletedNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    res
      .status(200)
      .json({ message: "Notification deleted successfully", deletedNotification });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const DisplayNotify = async (req, res) => {
  try {
    const allNotifications = await Notification.find()
      .sort({ date: -1 }); // Sort by the 'date' field in descending order

    if (!allNotifications || allNotifications.length === 0) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(allNotifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const DisplaySingleNotify = async (req, res) => {
  try {
    const latestNotification = await Notification.findOne()
      .sort({ date: -1 }); // Sort by the 'date' field in descending order

    if (!latestNotification) {
      return res.status(404).json({ message: "No notifications found" });
    }

    res.status(200).json(latestNotification);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
