const express = require("express");
const Experience = require("../models/Experience");
const router = express.Router();

// Create (POST)
router.post("/", async (req, res) => {
    try {
        let { name, company, description, startDate, endDate } = req.body;

        if (!name || !company || !description || !startDate || !endDate) {
            return res.status(400).json({ error: "Tüm alanları doldurun." });
        }

        name = name.trim();
        company = company.trim();
        description = description.trim();
        startDate = startDate.trim();
        endDate = endDate.trim();

        const dateRegex = /^(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
            return res.status(400).json({ error: "Tarih formatı MM/YYYY olmalıdır." });
        }

        const newExperience = new Experience({ name, company, description, startDate, endDate });
        await newExperience.save();

        res.status(201).json(newExperience);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Get All (GET)
router.get("/", async (req, res) => {
    try {
        const experiences = await Experience.find();
        res.status(200).json(experiences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Get By ID (GET)
router.get("/:id", async (req, res) => {
    try {
        const experience = await Experience.findById(req.params.id);
        if (!experience) {
            return res.status(404).json({ error: "Deneyim bulunamadı." });
        }
        res.status(200).json(experience);
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

        const updatedExperience = await Experience.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedExperience) {
            return res.status(404).json({ error: "Deneyim bulunamadı." });
        }

        res.status(200).json(updatedExperience);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

// Delete (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        const deletedExperience = await Experience.findByIdAndDelete(req.params.id);
        if (!deletedExperience) {
            return res.status(404).json({ error: "Deneyim bulunamadı." });
        }
        res.status(200).json({ message: "Deneyim başarıyla silindi." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: `Bir hata oluştu: ${error.message}` });
    }
});

module.exports = router;
