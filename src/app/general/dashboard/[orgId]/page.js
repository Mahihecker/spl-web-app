"use client";
import { useEffect, useState } from "react";
import { useSearch } from "../../../../context/SearchContext";
import CourseCardGrid from "../../../../components/CourseCardGrid";

export default function OrgDashboard({ params }) {
  const { orgId } = params;
  const { searchTerm, isSearching } = useSearch();
  const [orgName, setOrgName] = useState("Organization");
  const [classesData, setClassesData] = useState([]);
  const [vocabData, setVocabData] = useState([]);
  const [filteredClasses, setFilteredClasses] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch organization data, classes, and vocabulary
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_URL ||
          (process.env.VERCEL_URL
            ? `https://${process.env.VERCEL_URL}`
            : "http://localhost:3000");

        console.log("baseUrl:", baseUrl);
        console.log("orgId:", orgId);

        // Fetch all organizations
        const orgRes = await fetch(`${baseUrl}/data/organizations.json`, {
          cache: "no-store",
        });
        if (!orgRes.ok) {
          throw new Error(`Failed to fetch organizations: ${orgRes.status} ${orgRes.statusText}`);
        }
        const orgData = await orgRes.json();
        console.log("orgData:", orgData);

        // Find organization by orgId
        const organization = Array.isArray(orgData)
          ? orgData.find((org) => org.id === orgId || org.id.toString() === orgId)
          : null;
        if (!organization) {
          throw new Error(`Organization with ID ${orgId} not found in organizations.json`);
        }

        // Fetch classes
        const classesRes = await fetch(
          `${baseUrl}/data/organizations/${orgId}/classes.json`,
          { cache: "no-store" }
        );
        if (!classesRes.ok) {
          throw new Error(`Failed to fetch classes: ${classesRes.status} ${classesRes.statusText}`);
        }
        const classes = await classesRes.json();
        console.log("classesData:", classes);

        // Fetch vocabulary
        const vocabRes = await fetch(
          `${baseUrl}/data/organizations/${orgId}/essential-vocabulary.json`,
          { cache: "no-store" }
        );
        if (!vocabRes.ok) {
          throw new Error(`Failed to fetch vocabulary: ${vocabRes.status} ${vocabRes.statusText}`);
        }
        const vocab = await vocabRes.json();
        console.log("vocabData:", vocab);

        // Set data with validation
        setOrgName(typeof organization.name === "string" ? organization.name : "Organization");
        setClassesData(Array.isArray(classes) ? classes : []);
        setVocabData(Array.isArray(vocab.words) ? vocab.words : Array.isArray(vocab) ? vocab : []);
        setFilteredClasses(Array.isArray(classes) ? classes : []);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orgId]);

  // Filter classes based on search term
  useEffect(() => {
    if (!isSearching || !searchTerm) {
      setFilteredClasses(classesData);
      return;
    }

    const filtered = classesData.filter(
      (cls) =>
        cls.name &&
        typeof cls.name === "string" &&
        cls.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredClasses(filtered);
    console.log("filteredClasses:", filtered);
  }, [searchTerm, isSearching, classesData]);

  return (
    <div className="p-3 d-flex flex-column" style={{ marginTop: "20px" }}>
      <h1 className="mb-4" style={{ fontSize: "20px", fontWeight: 600 }}>{orgName}</h1>
      {error && <div className="text-danger mb-2">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <CourseCardGrid vocabData={vocabData} classesData={filteredClasses} orgId={orgId} />
      )}
    </div>
  );
}