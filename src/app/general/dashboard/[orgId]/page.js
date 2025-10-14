'use client';
import { useParams } from 'next/navigation';
import ClassTab from '@/components/ClassTab';
import EssentialVocabTab from '@/components/EssentialVocabTab';

export default function OrgDashboard() {
  const params = useParams();
  const { orgId } = params;

  // Data fetching logic remains the same
  const classesData = require(`/public/data/organizations/${orgId}/classes.json`);
  const vocabData = require(`/public/data/organizations/${orgId}/essential-vocabulary.json`);
  const orgData = require('/public/data/organizations.json').find(
    (org) => org.id === parseInt(orgId)
  );

  // Separate the first two classes from the rest
  const firstTwoClasses = classesData.slice(0, 2);
  const remainingClasses = classesData.slice(2);

  return (
    <div
      className="p-6"
      style={{
        height: 'calc(100vh - 120px)', // between header and footer
        overflowY: 'auto', // internal scroll
      }}
    >
      <h1 className="text-2xl font-bold mb-6">{orgData.name}</h1>

      {/* REVISED GRID: Using 'grid-cols-1' by default and 'lg:grid-cols-3'
        to explicitly enforce 3 columns on larger screens (where the 1000px max-width applies).
      */}
      <div
        className="grid gap-1 justify-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
        style={{
          maxWidth: '1000px',
          margin: '0 auto',
        }}
      >
        {/* ======================= FIRST ROW (3 CARDS) ======================= */}
        
        {/* 1. Essential Vocabulary Card */}
        <EssentialVocabTab
          title="Essential Vocabulary"
          count={vocabData.length}
          description={`${vocabData.length} Words`}
        />

        {/* 2. & 3. First two Class Cards */}
        {firstTwoClasses.map((classItem) => (
          <ClassTab
            key={classItem.id}
            title={classItem.name}
            count={classItem.Subjects_total}
            description={`${classItem.Subjects_total} Subjects`}
          />
        ))}

        {/* ======================= REMAINING ROWS (3 CARDS EACH) ======================= */}
        
        {/* Remaining Class Cards (Start on the second row) */}
        {remainingClasses.map((classItem) => (
          <ClassTab
            key={classItem.id}
            title={classItem.name}
            count={classItem.Subjects_total}
            description={`${classItem.Subjects_total} Subjects`}
          />
        ))}
      </div>
    </div>
  );
}