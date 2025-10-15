"use client";
import ClassCard from "./ClassCard";
import EssentialVocabCard from "./EssentialVocabCard";

export default function CourseCardGrid({ vocabData, classesData, orgId }) {
  // Log data to debug
  console.log("CourseCardGrid - vocabData:", vocabData);
  console.log("CourseCardGrid - classesData:", classesData);
  

  return (
    <div className="flex-grow overflow-y-auto" style={{ marginLeft: "20px", overflowX: "hidden" }}>
      <div className="row row-cols-1 row-cols-md-3 g-3" style={{ maxHeight: "calc(100vh - 150px)" ,gap: "20px"}}>
        {Array.isArray(vocabData) && vocabData.length > 0 ? (
          <EssentialVocabCard vocab={vocabData} orgId={orgId} />
        ) : (
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-secondary" style={{ height: "142px" }}>
            No vocabulary data available
          </div>
        )}
        {Array.isArray(classesData) && classesData.length > 0 ? (
          classesData.map((cls) => (
            <ClassCard key={cls.id} classInfo={cls} orgId={orgId} />
          ))
        ) : (
          <div className="col-12 text-center py-4">
            <p>No classes found.</p>
          </div>
        )}
      </div>
    </div>
  );
}