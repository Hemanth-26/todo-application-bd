const mongoose = require('mongoose');

let TodoSchema = new mongoose.Schema({
    list: {
        type: String,
        required: [true, "Need the List field"],
        min: 1,
    },
    updatedAt: {
        type: Date,
        default: () => new Date(),
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: () => new Date(),
    }
});

TodoSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
})

module.exports = mongoose.model('TodoList', TodoSchema);