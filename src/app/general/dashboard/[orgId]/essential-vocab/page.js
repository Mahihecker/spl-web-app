"use client";
import { useEffect, useState } from "react";
import { useSearch } from "../../../../../context/SearchContext";
import { use } from "react";
import FavoriteCard from "../../../../../components/FavoriteCard";

export default function EssentialVocab({ params }) {
  const { orgId } = use(params);
  const { searchTerm, isSearching } = useSearch();
  const [orgName, setOrgName] = useState("Organization");
  const [vocabData, setVocabData] = useState([]);
  const [filteredVocab, setFilteredVocab] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");

        // Fetch organization name
        const orgRes = await fetch(`${baseUrl}/data/organizations.json`, {
          cache: "no-store",
        });
        if (!orgRes.ok) {
          throw new Error(`Failed to fetch organizations: ${orgRes.status} ${orgRes.statusText}`);
        }
        const orgData = await orgRes.json();
        const organization = Array.isArray(orgData)
          ? orgData.find((org) => org.id === orgId || org.id.toString() === orgId)
          : null;
        setOrgName(organization?.name || "Organization");

        // Fetch vocabulary
        const vocabRes = await fetch(`${baseUrl}/data/organizations/${orgId}/essential-vocabulary.json`, {
          cache: "no-store",
        });
        if (!vocabRes.ok) {
          throw new Error(`Failed to fetch vocabulary: ${vocabRes.status} ${vocabRes.statusText}`);
        }
        const vocab = await vocabRes.json();
        const vocabArray = Array.isArray(vocab) ? vocab : [vocab];
        setVocabData(vocabArray);
        setFilteredVocab(vocabArray);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orgId]);

  // Filter vocabulary based on search term
  useEffect(() => {
    if (!isSearching || !searchTerm) {
      setFilteredVocab(vocabData);
      return;
    }

    const filtered = vocabData.filter(
      (item) =>
        item.title &&
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVocab(filtered);
    console.log("filteredVocab:", filtered);
  }, [searchTerm, isSearching, vocabData]);

  return (
    <div className="d-flex flex-column h-100 p-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4" style={{ fontSize: "20px", fontWeight: "600", listStyle: "none", padding: "0", display: "flex", alignItems: "center" }}>
          <li className="breadcrumb-item">
            <a href={`/general/dashboard/${orgId}`} className="text-primary" style={{ textDecoration: "none", color: "#5437ED", marginRight: "8px" }}>
              {orgName}
            </a>
          </li>
          <li style={{ margin: "0 8px" }}>&gt;</li> {/* Filled arrow like side panel */}
          <li className="breadcrumb-item active" aria-current="page" style={{ color: "#000", marginLeft: "8px" }}>
            Essential Vocabulary
          </li>
        </ol>
      </nav>
      {error && <div className="text-danger mb-2">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)", overflowX: "hidden" }}>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {filteredVocab.length > 0 ? (
              filteredVocab.map((item) => (
                <FavoriteCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-12 text-center py-4">
                <p>No vocabulary found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}