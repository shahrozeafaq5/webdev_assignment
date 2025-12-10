import mongoose from 'mongoose';

const BookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title for this book.'],
    maxlength: 60,
  },
  author: {
    type: String,
    required: [true, 'Please provide an author name.'],
    maxlength: 60,
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price.'],
  },
  description: {
    type: String,
  },
  coverImage: {
    type: String, // You can store the URL of the image here
    required: false,
  },
  category: {
    type: String,
  }
}, { timestamps: true });

// Check if the model already exists to prevent compiling it twice in dev mode
export default mongoose.models.Book || mongoose.model('Book', BookSchema);