"use client";
import { useRouter } from "next/navigation";

export default function EssentialVocabCard({ vocab, orgId }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/general/dashboard/${orgId}/essential-vocab`)}
      className="col-12 col-md-4 d-flex flex-column justify-content-center"
      style={{
        width: "260px",
        height: "120px",
        backgroundColor: "#EEEFFD",
        borderRadius: "4px",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)")}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")}
    >
      <div className="d-flex align-items-center" style={{ padding: "2px 0" }}>
        <div style={{ width: "4px", height: "20px", backgroundColor: "#5437ED", marginRight: "0" }} />
        <div className="card-body flex-grow-1 d-flex justify-content-center">
          <h5
            className="card-title text-center"
            style={{ fontSize: "16px", fontWeight: "600", color: "#5437ED", margin: "0" }}
          >
            Essential Vocabulary
          </h5>
        </div>
      </div>
      <p
        className="mb-2 text-center"
        style={{ fontSize: "12px", fontWeight: "500", color: "#838799", marginTop: "15px" }}
      >
        {vocab.length} Words
      </p>
    </div>
  );
}