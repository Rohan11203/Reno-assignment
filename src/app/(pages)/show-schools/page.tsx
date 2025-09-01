"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};
export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchools = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/getSchools");

        if (!response.ok) {
          throw new Error("Failed to fetch schools. Please try again later.");
        }

        const data: School[] = await response.json();
        setSchools(data);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchools();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-center text-gray-500">Loading schools...</p>;
    }

    if (error) {
      return <p className="text-center text-red-500">{error}</p>;
    }

    if (schools.length === 0) {
      return (
        <p className="text-center text-gray-500">
          No schools found in the directory yet.
        </p>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col group"
          >
            <div className="relative">
              <Image
                src={school.image}
                alt={`Image of ${school.name}`}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x400/eee/ccc?text=Image+Not+Found";
                }}
              />
              <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm rounded-full h-10 w-10 flex items-center justify-center cursor-pointer transform group-hover:scale-110 transition-transform duration-200">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-gray-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              </div>
            </div>
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-blue-600 font-semibold">
                {school.city}
              </p>
              <h2
                className="text-lg font-bold text-gray-900 mt-1 truncate"
                title={school.name}
              >
                {school.name}
              </h2>
              <p
                className="text-gray-500 mt-1 text-sm flex-grow"
                title={school.address}
              >
                {school.address}
              </p>
              <button className="mt-4 w-full bg-green-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors duration-300">
                Apply Now
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-10">
          School Directory
        </h1>
        {renderContent()}
      </div>
    </main>
  );
}
