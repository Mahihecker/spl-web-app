"use client";
import { useRouter } from "next/navigation";

export default function FavoriteCard({ item }) {
  const router = useRouter();

  return (
    <div className="col d-flex" style={{ height: "160px", width: "210px" }}>
      <div className="card w-100 border-0 rounded-lg shadow-sm">
        <img src={item.thumbnail} className="card-img-top mx-auto" alt={item.title} style={{ objectFit: "cover", width: "102px", height: "102px", borderRadius: "4px", marginTop: "20px"}} />
        <div className="d-flex align-items-center" style={{ padding: "2px 0", marginTop: "4px" }}>
          <div style={{ width: "4px", height: "20px", backgroundColor: "#5437ED"}} />
          <div className="card-body flex-grow-1 d-flex justify-content-center">
            <h5 className="card-title text-center" style={{ fontSize: "14px", fontWeight: "600", color: "#5437ED", margin: "0" }}>{item.title}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}