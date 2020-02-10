import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Schema named Issue
let Issue = new Schema({            // accepts an object
    title: {
        type: String
    },
    responsible: {
        type: String
    },
    description: {
        type: String
    },
    severity: {
        type: String
    },
    status: {
        type: String,
        default: 'Open'
    },
});

export default mongoose.model('Issue', Issue);