"use client";
import ClassCard from "./ClassCard";
import EssentialVocabCard from "./EssentialVocabCard";

export default function CourseCardGrid({ vocabData, classesData, orgId }) {
  console.log("CourseCardGrid - vocabData:", vocabData);
  console.log("CourseCardGrid - classesData:", classesData);

  return (
    <div className="flex-grow overflow-y-auto" style={{ overflowX: "hidden", marginLeft: "20px"}}>
      <div className="row row-cols-1 row-cols-md-3 g-4" style={{ maxHeight: "calc(100vh - 150px)" }}>
        {Array.isArray(vocabData) && vocabData.length > 0 ? (
          <div className="col-12 col-md-4">
            <EssentialVocabCard vocab={vocabData} orgId={orgId} />
          </div>
        ) : (
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-secondary" style={{ height: "100px" }}>
            No vocabulary data available
          </div>
        )}
        {Array.isArray(classesData) && classesData.length > 0 ? (
          classesData.map((cls, index) => (
            <div className="col-12 col-md-4" key={cls.id}>
              <ClassCard
                classInfo={cls}
                orgId={orgId}
                isFirstColumn={index === 0 && Array.isArray(vocabData) && vocabData.length === 0} // First ClassCard is first column only if no vocab
              />
            </div>
          ))
        ) : (
          <div className="col-12 col-md-4 d-flex align-items-center justify-content-center text-secondary" style={{ height: "100px" }}>
            No classes found.
          </div>
        )}
      </div>
    </div>
  );
}