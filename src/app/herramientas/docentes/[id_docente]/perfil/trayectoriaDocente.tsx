import React from 'react';
import { getBiography } from '@/utils/maestros/getBiography';
import { getEducations } from '@/utils/maestros/getEducations';
import { getEmployments } from '@/utils/maestros/getEmployments';

const TrayectoriaDocente: React.FC = async () => {
  const orcidId = '0000-0003-1562-795X';

  // Fetch data from each endpoint
  const [biographyResponse, employmentsResponse, educationsResponse] = await Promise.all([
    getBiography(orcidId),
    getEmployments(orcidId),
    getEducations(orcidId),
  ]);

  if (!biographyResponse.success || !employmentsResponse.success || !educationsResponse.success) {
    return <div>Error fetching data.</div>;
  }

  const biographyContent = biographyResponse.biography?.biography?.content;

  // Extract employment summaries
  const employmentSummaries = extractEmploymentSummaries(employmentsResponse.employments);

  // Extract education summaries
  const educationSummaries = extractEducationSummaries(educationsResponse.educations);

  return (
    <div className="space-y-6">
      {/* Biography */}
      {biographyContent && (
        <div className="p-4 border rounded bg-gray-100 shadow">
          <h2 className="text-2xl font-bold mb-2">Biography</h2>
          <p className="text-gray-800">{biographyContent}</p>
        </div>
      )}

      {/* Employments */}
      {employmentSummaries.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Employments</h2>
          {employmentSummaries.map((employment, index) => (
            <div key={index} className="border rounded shadow p-4 mb-4 bg-white">
              <p className="font-bold text-gray-800">
                {employment.organization?.name} - {employment.organization?.address?.city}, {employment.organization?.address?.region}, {employment.organization?.address?.country}
              </p>
              <p className="text-gray-600 mb-2">
                {formatDateRange(employment['start-date'], employment['end-date'])} | {employment['role-title']} ({employment['department-name']})
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Educations */}
      {educationSummaries.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-2">Educations</h2>
          {educationSummaries.map((education, index) => (
            <div key={index} className="border rounded shadow p-4 mb-4 bg-white">
              <p className="font-bold text-gray-800">
                {education.organization?.name} - {education.organization?.address?.city}, {education.organization?.address?.region}, {education.organization?.address?.country}
              </p>
              <p className="text-gray-600 mb-2">
                {formatDateRange(education['start-date'], education['end-date'])} | {education['role-title']} ({education['department-name']})
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TrayectoriaDocente;

// Helper function to extract summaries
function extractEmploymentSummaries(employments: any): any[] {
  let employmentSummaries: any[] = [];
  const affiliationGroups = employments?.employments?.['affiliation-group'];

  if (affiliationGroups) {
    const groups = Array.isArray(affiliationGroups) ? affiliationGroups : [affiliationGroups];

    groups.forEach((group) => {
      const summaries = group['employment-summary'];
      if (summaries) {
        if (Array.isArray(summaries)) {
          employmentSummaries.push(...summaries);
        } else {
          employmentSummaries.push(summaries);
        }
      }
    });
  }

  return employmentSummaries;
}

function extractEducationSummaries(educations: any): any[] {
  let educationSummaries: any[] = [];
  const affiliationGroups = educations?.educations?.['affiliation-group'];

  if (affiliationGroups) {
    const groups = Array.isArray(affiliationGroups) ? affiliationGroups : [affiliationGroups];

    groups.forEach((group) => {
      const summaries = group['education-summary'];
      if (summaries) {
        if (Array.isArray(summaries)) {
          educationSummaries.push(...summaries);
        } else {
          educationSummaries.push(summaries);
        }
      }
    });
  }

  return educationSummaries;
}

// Helper function to format date ranges
function formatDateRange(startDate: any, endDate: any): string {
  const start = `${startDate?.year}-${startDate?.month?.padStart(2, '0')}-${startDate?.day?.padStart(2, '0')}`;
  const end = endDate
    ? `${endDate.year}-${endDate.month?.padStart(2, '0')}-${endDate.day?.padStart(2, '0')}`
    : 'Present';
  return `${start} to ${end}`;
}
