"use client";
import SubjectsCard from "./SubjectsCard";

export default function SubjectsGrid({ subjectsData, orgId, classId }) {
  console.log("SubjectsGrid - subjectsData:", subjectsData);

  return (
    <div className="flex-grow overflow-y-auto" style={{ overflowX: "hidden", marginLeft: "20px" }}>
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ maxHeight: "calc(100vh - 150px)" }}>
        {Array.isArray(subjectsData) && subjectsData.length > 0 ? (
          subjectsData.map((subject, index) => (
            <div className="col-12 col-md-4" key={subject.id}>
              <SubjectsCard
                classInfo={subject}
                orgId={orgId}
                classId={classId}
              />
            </div>
          ))
        ) : (
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-secondary" style={{ height: "100px" }}>
            No subjects found.
          </div>
        )}
      </div>
    </div>
  );
}