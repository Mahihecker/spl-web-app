"use client";
import { useRouter } from "next/navigation";

export default function FavoriteCard({ item }) {
  const router = useRouter();

  return (
    <div className="col d-flex" style={{ height: "200px" }}>
      <div className="card w-100 border-0 rounded-lg shadow-sm" style={{ borderLeft: "8px solid #5437ED" }}>
        <img src={item.thumbnail} className="card-img-top" alt={item.title} style={{ objectFit: "cover", height: "120px" }} />
        <div className="card-body d-flex flex-column justify-content-center">
          <h5 className="card-title text-center text-dark" style={{ fontSize: "16px", fontWeight: "600" }}>{item.title}</h5>
        </div>
      </div>
    </div>
  );
}