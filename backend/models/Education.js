const mongoose = require("mongoose");

const EducationSchema = mongoose.Schema(
    {
        university : {type : String, required : true, trim : true},
        program : {type : String, required : true, trim : true},
        department : {type : String, required : true, trim : true},
        gpa : {type : Number, required : true},
        startDate : {type : String, required : true, trim : true, match: /^\d{2}\/\d{4}$/},
        endDate : {type : String, required : true, trim : true, match: /^\d{2}\/\d{4}$/} //MM/YYYY
    },
    {
        timestamps : true
    }
);

const Education = mongoose.model("Education", EducationSchema);

module.exports = Education;