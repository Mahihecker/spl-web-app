"use client";
import { useRouter } from "next/navigation";

export default function EssentialVocabCard({ vocab, orgId }) {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(`/general/dashboard/${orgId}/essential-vocab`)}
      className="col-12 col-md-4 d-flex flex-column justify-content-center p-3"
      style={{ width: "260px", height: "120px", backgroundColor: "#EEEFFD", borderRadius: "4px", boxShadow: "0 2px 4px rgba(0,0,0,0.1)", cursor: "pointer", transition: "all 0.3s", position: "relative" }}
      onMouseOver={(e) => (e.currentTarget.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)")}
      onMouseOut={(e) => (e.currentTarget.style.boxShadow = "0 2px 4px rgba(0,0,0,0.1)")}
    >
      <div style={{ position: "absolute", left: "0", top: "0", bottom: "0", width: "3px", backgroundColor: "#5437ED", height: "20px" }} />
      <h2 className="mb-2 text-center" style={{ fontSize: "18px",fontWeight:'600',color:'#5437ED' }}>Essential Vocabulary</h2>
      <p className="mb-2 text-center" style={{ fontSize: "12px",fontWeight:'500',color:'#838799',marginTop: '15px'}}>{vocab.length} Words</p>
    </div>
  );
}