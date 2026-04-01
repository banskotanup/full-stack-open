const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const url = process.env.MONGODB_URI;
console.log(`Connecting to database ${url}`);
mongoose.connect(url, { family: 4 })
    .then(result => {
        console.log("connected to mongodb");
    })
    .catch (error => {
    console.log(`error connecting to mongodb ${error.message}`);
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: Number,
});

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
})

module.exports = mongoose.model("Person", phoneBookSchema);