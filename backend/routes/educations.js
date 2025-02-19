const express = require("express");
const Education = require("../models/Education");
const router = express.Router();

//Create (POST)
router.post("/", async (req, res) => {
    try {
        let { university, program, department, gpa, startDate, endDate} = req.body;

        if (!university || !program || !department || !gpa || !startDate || !endDate) {
            return res.status(400).json({ error: "Tüm alanları doldurun."});
        }

        university = university.trim();
        program = program.trim();
        department = department.trim();
        startDate = startDate.trim();
        endDate = endDate.trim();

        if (typeof gpa !== "number" || gpa < 0 || gpa > 4) {
            return res.status(400).json({ error: "GPA 0 ile 4 arasında olmalıdır." });
        }

        const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            return res.status(400).json({ error: "Tarih formatı MM/YYYY olmalıdır." });
        }

        const newEducation = new Education({
            university, program, department, gpa, startDate, endDate
        });
        await newEducation.save();

        res.status(201).json(newEducation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Get All (GET)
router.get("/", async (req, res) => {
    try {
        const educations = await Education.find();
        res.status(200).json(educations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Get By ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const education = await Education.findById(req.params.id);
        if (!education) {
            return res.status(404).json({ error: "Eğitim bulunamadı." });
        }
        res.status(200).json(education)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Update (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updateFields = req.body;

        const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (updateFields.startDate && !dateRegex.test(updateFields.startDate)) {
            return res.status(400).json({ error: "startDate formatı MM/YYYY olmalıdır." });
        }
        if (updateFields.endDate && !dateRegex.test(updateFields.endDate)) {
            return res.status(400).json({ error: "endDate formatı MM/YYYY olmalıdır." });
        }

        if (updateFields.gpa !== undefined) {
            const gpaValue = Number(updateFields.gpa);

            if (isNaN(gpaValue) || gpaValue < 0 || gpaValue > 4) {
                return res.status(400).json({ error: "GPA 0 ile 4 arasında bir sayı olmalıdır." });
            }

            updateFields.gpa = gpaValue; 
        }

        const updatedEducation = await Education.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedEducation) {
            return res.status(404).json({ error: "Eğitim bulunamadı." });
        }

        res.status(200).json(updatedEducation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Delete (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedEducation = await Education.findByIdAndDelete(req.params.id);
        if (!deletedEducation) {
            return res.status(404).json({ error: "Eğitim bulunamadı." });
        }
        res.status(200).json({ message: "Eğitim başarıyla silindi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

module.exports = router;