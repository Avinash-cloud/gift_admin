import mongoose from 'mongoose';

const AdminSchema = new mongoose.Schema({
   
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    
}, {
    timestamps: true
});

// Use a consistent model name; ensure it's not being redefined elsewhere
// const Blog = models.Blog || model('Blog', BlogSchema);

// export default Blog;

// export const Blog = models.Blog || model('Blog', BlogSchema);
const Admin = mongoose.models.admins || mongoose.model('admins', AdminSchema);

export default Admin;