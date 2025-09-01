export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-8 text-center">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-800">
          School Directory Management
        </h1>
        <p className="mt-6 text-lg text-gray-600 max-w-xl mx-auto">
          A simple and efficient way to manage your school directory. Add new
          schools to the database or browse the existing list with ease.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="/add-school"
            className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-white bg-indigo-600 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 cursor-pointer"
          >
            Add a New School
          </a>
          <a
            href="/show-schools"
            className="w-full sm:w-auto inline-block px-8 py-4 text-lg font-semibold text-indigo-700 bg-indigo-100 rounded-lg shadow-md hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105 cursor-pointer"
          >
            View School Directory
          </a>
        </div>
      </div>
    </main>
  );
}
