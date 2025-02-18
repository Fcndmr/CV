const mongoose = require("mongoose");

const ExperienceSchema = mongoose.Schema(
    {
        name : {type : String, required : true, trim : true},
        company : {type : String, required : true, trim : true},
        description : {type : String, required : true, trim : true},
        startDate : {type : String, required : true, trim : true, match: /^\d{2}\/\d{4}$/},
        endDate : {type : String, required : true, trim : true, match: /^\d{2}\/\d{4}$/} //MM/YYYY
    },
    {
        timestamps : true
    }
);

const Experience = mongoose.model("Experience", ExperienceSchema);

module.exports = Experience;