import { useEffect, useState } from "react";


function Experience() {
  const [experiences, setExperiences] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/experiences")
      .then(res => res.json())
      .then(data => setExperiences(data))
      .catch(err => console.error("Bir hata oluştu :", err));
  },[])

  return (
    <>
      <section className="resume-section" id="experience">
        <div className="resume-section-content">
          <h2 className="mb-5">Experience</h2>
          {experiences.map((exp) => (
            <div key={exp._id} className="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="flex-grow-1">
                <h3 className="mb-0">{exp.name}</h3>
                <div className="subheading mb-3">{exp.company}</div>
                <p>{exp.description}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-primary">{exp.startDate} - {exp.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="m-0" />
    </>
  );
}

export default Experience;
