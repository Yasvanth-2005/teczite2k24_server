import mongoose from "mongoose";
const notificationSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now
  },
  heading: {
    type: String,
    required: [true, 'Heading is required']
  },
  info: {
    type: String,
    required: [true, 'Info is required']
  },
  picturePath: {
    type: String,
    validate: {
      validator: function(value) {
        // Validate the picturePath if needed
        return value.startsWith('http');
      },
      message: props => `${props.value} is not a valid URL for picturePath`
    }
  },
  link: {
    type: String,
    validate: {
      validator: function(value) {
        // Validate the link if needed
        return value.startsWith('http');
      },
      message: props => `${props.value} is not a valid URL for link`
    }
  }
});

notificationSchema.post('save', function(error, doc, next) {
  if (error.name === 'ValidationError') {
    const errors = {};
    for (let field in error.errors) {
      errors[field] = error.errors[field].message;
    }
    console.error('Validation Error:', errors);
    next(errors);
  } else {
    console.error('MongoDB Notification Error:', error);
    next(error);
  }
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;
