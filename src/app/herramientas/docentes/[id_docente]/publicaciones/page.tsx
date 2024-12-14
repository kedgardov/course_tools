import { getWorks, GetPapersResponse, Paper } from "@/utils/maestros/getWorks";
import { parseId } from "@/utils/parseId";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";

const PublicacionesPage = async ({
  params,
}: {
  params: {
    id_docente: string;
  };
}) => {
  const cookieStore = cookies();
  const token = cookieStore.get("authToken")?.value || "";
  if (token === "") {
    notFound();
  }

  const idDocente = parseId(params.id_docente);
  if (!idDocente) {
    notFound();
  }

  const orcidId = "0000-0001-6353-4841"; // Replace with actual ORCID ID if needed

  // Fetch the works
  const response: GetPapersResponse = await getWorks(orcidId);

  if (!response.success) {
      console.log(response);
    notFound();
  }

  // Map and sort papers by derived year
  const sortedPapers = response.papers
    .map((paper) => {
      let year: number | undefined = undefined;

      if (paper.publicationDate) {
        const yearStr = paper.publicationDate.substring(0, 4);
        const parsedYear = parseInt(yearStr, 10);
        if (!isNaN(parsedYear)) {
          year = parsedYear;
        }
      }

      return {
        ...paper,
        year, // Add derived year for sorting
      };
    })
    .sort((a, b) => (b.year || 0) - (a.year || 0)); // Sort in descending order by year

  // Group papers by year
  const papersByYear = sortedPapers.reduce<{ [key: string]: Paper[] }>((acc, paper) => {
    const yearKey = paper.year !== undefined ? String(paper.year) : "Others";

    if (!acc[yearKey]) {
      acc[yearKey] = [];
    }
    acc[yearKey].push(paper);
    return acc;
  }, {});

  // Get years in descending order
  const years = Object.keys(papersByYear)
    .filter((year) => year !== "Others")
    .map((year) => parseInt(year, 10))
    .sort((a, b) => b - a);

  return (
    <div>
      {years.map((year) => (
        <div key={year}>
          <h2 className="text-xl font-bold my-4">{year}</h2>
          {papersByYear[String(year)].map((paper, index) => (
            <div
              key={`${year}-${index}`}
              className="p-4 bg-gray-100 rounded-lg mb-4 shadow"
            >
              <h3 className="font-semibold text-lg">{paper.title}</h3>
              {paper.journalTitle && (
                <p className="text-sm italic text-gray-600">{paper.journalTitle}</p>
              )}
              <p className="text-gray-700">
                {paper.publicationDate || "Publication date not available"}
                {paper.type ? ` | ${paper.type.replace("-", " ")}` : ""}
              </p>
              {paper.doi && (
                <Link
                  className="text-blue-400 hover:underline"
                  href={`https://doi.org/${paper.doi}`}
                >
                  DOI: {paper.doi}
                </Link>
              )}
              {paper.contributors.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-gray-800">Contributors:</p>
                  {paper.contributors.map((contributor, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <p>{contributor.name}</p>
                      {contributor.orcid && (
                        <a
                          href={contributor.orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          ORCID
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ))}
      {"Others" in papersByYear && papersByYear["Others"].length > 0 && (
        <div key="others">
          <h2 className="text-xl font-bold my-4">Others</h2>
          {papersByYear["Others"].map((paper, index) => (
            <div
              key={`others-${index}`}
              className="p-4 bg-gray-100 rounded-lg mb-4 shadow"
            >
              <h3 className="font-semibold text-lg">{paper.title}</h3>
              {paper.journalTitle && (
                <p className="text-sm italic text-gray-600">{paper.journalTitle}</p>
              )}
              <p className="text-gray-700">
                {paper.publicationDate || "Publication date not available"}
                {paper.type ? ` | ${paper.type.replace("-", " ")}` : ""}
              </p>
              {paper.doi && (
                <Link
                  className="text-blue-400 hover:underline"
                  href={`https://doi.org/${paper.doi}`}
                >
                  DOI: {paper.doi}
                </Link>
              )}
              {paper.contributors.length > 0 && (
                <div className="mt-2">
                  <p className="font-semibold text-gray-800">Contributors:</p>
                  {paper.contributors.map((contributor, idx) => (
                    <div key={idx} className="flex items-center space-x-2">
                      <p>{contributor.name}</p>
                      {contributor.orcid && (
                        <a
                          href={contributor.orcid}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 hover:underline"
                        >
                          ORCID
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PublicacionesPage;
