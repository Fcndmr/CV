import { useEffect, useState } from "react";

function Education() {
  const [educations, setEducations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/educations")
      .then((res) => res.json())
      .then((data) => setEducations(data))
      .catch((err) => console.error("Bir hata oluştu :", err));
  }, []);

  return (
    <>
      <section className="resume-section" id="education">
        <div className="resume-section-content">
          <h2 className="mb-5">Education</h2>
          {educations.map((edu) => (
            <div key={edu._id} className="d-flex flex-column flex-md-row justify-content-between mb-5">
              <div className="flex-grow-1">
                <h3 className="mb-0">{edu.university}</h3>
                <div className="subheading mb-3">{edu.program}</div>
                <div>{edu.department}</div>
                <p>GPA: {edu.gpa}</p>
              </div>
              <div className="flex-shrink-0">
                <span className="text-primary">{edu.startDate} - {edu.endDate}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
      <hr className="m-0" />
    </>
  );
}

export default Education;
