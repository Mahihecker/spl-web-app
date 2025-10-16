"use client";
import { useEffect, useState } from "react";
import { use } from "react";
import { useSearch } from "../../../../../../context/SearchContext";
import SubjectsGrid from "../../../../../../components/SubjectsGrid";
import { useRouter } from "next/navigation";

export default function ClassSubjects({ params }) {
  const { orgId, classId } = use(params);
  const router = useRouter();
  const { searchTerm, isSearching } = useSearch();
  const [orgName, setOrgName] = useState("Organization");
  const [className, setClassName] = useState("Class");
  const [subjectsData, setSubjectsData] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch organization, class data, and subjects
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
        console.log("classId:", classId);

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
        setOrgName(typeof organization.name === "string" ? organization.name : "Organization");

        // Fetch classes to get class name
        const classesRes = await fetch(
          `${baseUrl}/data/organizations/${orgId}/classes.json`,
          { cache: "no-store" }
        );
        if (!classesRes.ok) {
          throw new Error(`Failed to fetch classes: ${classesRes.status} ${classesRes.statusText}`);
        }
        const classes = await classesRes.json();
        console.log("classesData:", classes);

        // Find class by classId
        const currentClass = Array.isArray(classes)
          ? classes.find((cls) => cls.id === classId || cls.id.toString() === classId)
          : null;
        if (!currentClass) {
          throw new Error(`Class with ID ${classId} not found in classes.json`);
        }
        setClassName(typeof currentClass.name === "string" ? currentClass.name : "Class");

        // Fetch subjects
        const subjectsRes = await fetch(
          `${baseUrl}/data/organizations/${orgId}/classes/${classId}/subjects.json`,
          { cache: "no-store" }
        );
        if (!subjectsRes.ok) {
          throw new Error(`Failed to fetch subjects: ${subjectsRes.status} ${subjectsRes.statusText}`);
        }
        const subjects = await subjectsRes.json();
        console.log("subjectsData:", subjects);

        // Set data with validation
        setSubjectsData(Array.isArray(subjects) ? subjects : []);
        setFilteredSubjects(Array.isArray(subjects) ? subjects : []);
      } catch (err) {
        setError(`Error: ${err.message}`);
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [orgId, classId]);

  // Filter subjects based on search term
  useEffect(() => {
    if (!isSearching || !searchTerm) {
      setFilteredSubjects(subjectsData);
      return;
    }

    const filtered = subjectsData.filter(
      (subject) =>
        subject.name &&
        typeof subject.name === "string" &&
        subject.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredSubjects(filtered);
    console.log("filteredSubjects:", filtered);
  }, [searchTerm, isSearching, subjectsData]);

  return (
    <div className="d-flex flex-column h-100 p-3">
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-4" style={{ 
          fontSize: "25px", 
          fontWeight: "600", 
          listStyle: "none", 
          padding: "20px 4px 0px", 
          display: "flex", 
          alignItems: "center" 
        }}>
          <li className="breadcrumb-item">
            <a 
              href={`/general/dashboard/${orgId}`} 
              style={{ 
                textDecoration: "none", 
                color: "#5437ED", 
                marginRight: "8px" 
              }}
            >
              {orgName}
            </a>
          </li>
          <li style={{ 
            margin: "0 8px", 
            color: "#808080", 
            fontSize: "20px", 
            borderRadius: "4px", 
            padding: "0 4px" 
          }}>
            &rsaquo;
          </li>
          <li className="breadcrumb-item active" aria-current="page" style={{ color: "#000", marginLeft: "8px" }}>
            {className}
          </li>
        </ol>
      </nav>
      {error && <div className="text-danger mb-2">{error}</div>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex-grow-1 overflow-y-auto" style={{ maxHeight: "calc(100vh - 180px)", overflowX: "hidden", marginLeft: "20px" }}>
          <SubjectsGrid subjectsData={filteredSubjects} orgId={orgId} classId={classId} />
        </div>
      )}
    </div>
  );
}