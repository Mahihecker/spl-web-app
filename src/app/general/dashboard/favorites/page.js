"use client";
import { useEffect, useState } from "react";
import { useSearch } from "../../../../context/SearchContext";
import FavoriteCard from "../../../../components/FavoriteCard";
import { use } from "react";

export default function Favorites({ params }) {
  const { orgId } = use(params);
  const { searchTerm, isSearching } = useSearch();
  const [activeTab, setActiveTab] = useState("Vocabulary");
  const [vocabData, setVocabData] = useState([]);
  const [topicsData, setTopicsData] = useState([]);
  const [filteredVocab, setFilteredVocab] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]);
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

        // Fetch vocabulary
        const vocabRes = await fetch(`${baseUrl}/data/allvocabulary.json`, {
          cache: "no-store",
        });
        if (!vocabRes.ok) {
          throw new Error(`Failed to fetch vocabulary: ${vocabRes.status} ${vocabRes.statusText}`);
        }
        const vocab = await vocabRes.json();
        setVocabData(Array.isArray(vocab) ? vocab.filter(item => item.favorite) : []);
        setFilteredVocab(Array.isArray(vocab) ? vocab.filter(item => item.favorite) : []);

        // Fetch topics
        const topicsRes = await fetch(`${baseUrl}/data/alltopics.json`, {
          cache: "no-store",
        });
        if (!topicsRes.ok) {
          throw new Error(`Failed to fetch topics: ${topicsRes.status} ${topicsRes.statusText}`);
        }
        const topics = await topicsRes.json();
        setTopicsData(Array.isArray(topics) ? topics.filter(item => item.favorite) : []);
        setFilteredTopics(Array.isArray(topics) ? topics.filter(item => item.favorite) : []);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orgId]);

  // Filter data based on search term
  useEffect(() => {
    if (!isSearching || !searchTerm) {
      setFilteredVocab(vocabData);
      setFilteredTopics(topicsData);
      return;
    }

    const filteredVocabList = vocabData.filter(
      (item) =>
        item.title &&
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    const filteredTopicsList = topicsData.filter(
      (item) =>
        item.title &&
        typeof item.title === "string" &&
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredVocab(filteredVocabList);
    setFilteredTopics(filteredTopicsList);
    console.log("filteredVocab:", filteredVocabList);
    console.log("filteredTopics:", filteredTopicsList);
  }, [searchTerm, isSearching, vocabData, topicsData]);

  const dataToShow = activeTab === "Vocabulary" ? filteredVocab : filteredTopics;

  return (
    <div className="d-flex flex-column h-100 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 style={{ fontSize: "20px", fontWeight: 600 }}>Favourites</h1>
        <div>
          <button
            className={`btn ${activeTab === "Vocabulary" ? "btn-primary" : "btn-outline-primary"} rounded me-2`}
            style={{ backgroundColor: activeTab === "Vocabulary" ? "#5437ED" : "", color: activeTab === "Vocabulary" ? "#FFFFFF" : "#5437ED" }}
            onClick={() => setActiveTab("Vocabulary")}
          >
            Vocabulary
          </button>
          <button
            className={`btn ${activeTab === "Tutorial" ? "btn-primary" : "btn-outline-primary"} rounded`}
            style={{ backgroundColor: activeTab === "Tutorial" ? "#5437ED" : "", color: activeTab === "Tutorial" ? "#FFFFFF" : "#5437ED" }}
            onClick={() => setActiveTab("Tutorial")}
          >
            Tutorial
          </button>
        </div>
      </div>
      {error && <div className="text-danger mb-2">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 150px)", overflowX: "hidden" }}>
          <div className="row row-cols-1 row-cols-md-4 g-4">
            {dataToShow.length > 0 ? (
              dataToShow.map((item) => (
                <FavoriteCard key={item.id} item={item} />
              ))
            ) : (
              <div className="col-12 text-center py-4">
                <p>No favorite {activeTab.toLowerCase()} found.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}