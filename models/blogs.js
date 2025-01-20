import mongoose from 'mongoose';

const BlogSchema = new mongoose.Schema({
    url: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mtitle: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mdiscription: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    keyword: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    author: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    date: {
        type: Date,
        default: Date.now,
        trim: true,
    },
    cardImage: {
        type: String,
        trim: true,
    },
}, {
    timestamps: true
});

// Use a consistent model name; ensure it's not being redefined elsewhere
// const Blog = models.Blog || model('Blog', BlogSchema);

// export default Blog;

// export const Blog = models.Blog || model('Blog', BlogSchema);
const Blog = mongoose.models.blogs || mongoose.model('blogs', BlogSchema);

export default Blog;
