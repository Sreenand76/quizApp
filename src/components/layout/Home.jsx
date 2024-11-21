import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-500 text-white ">
        <div className="container mx-auto px-6 py-16 text-center relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold leading-tight mt-10">
            Unlock Your Knowledge Potential
          </h1>
          <p className="text-lg md:text-2xl mt-6 max-w-3xl mx-auto font-thin text-gray-300">
            Build a strong foundation in Computer Science with quizzes and topics that make learning fun and effective.
          </p>
          <Link to="/quiz-step">
            <button className="mt-8 px-8 py-4 bg-white text-purple-700 rounded-full shadow-lg text-xl font-semibold hover:bg-purple-100 transition mb-16">
              Take Quiz
            </button>
          </Link>
        </div>
        <svg
          className="absolute bottom-0 left-0 w-full h-16 text-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fillOpacity="1"
            d="M0,224L48,213.3C96,203,192,181,288,154.7C384,128,480,96,576,112C672,128,768,192,864,224C960,256,1056,256,1152,229.3C1248,203,1344,149,1392,122.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </header>

      {/* Topics Section */}
      <section className="py-16 bg-gradient-to-b from-purple-50 to-purple-100">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-12">
          Explore Topics
        </h2>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 px-6">
          {[
            {
              title: "Object-Oriented Programming",
              description: "Understand the pillars of OOP with engaging examples.",
              image:
                "/images/oops.jpeg",
              url: "https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/",
            },
            {
              title: "Data Structures & Algorithms",
              description: "Solve problems effectively with optimized techniques.",
              image:
                "/images/ds.jpeg",
              url: "https://www.geeksforgeeks.org/learn-data-structures-and-algorithms-dsa-tutorial/",
            },
            {
              title: "Database Management Systems",
              description: "Master SQL, database design, and performance tuning.",
              image:
                "/images/dbms.jpeg",
              url: "https://www.geeksforgeeks.org/dbms/",
            },
            {
              title: "Operating Systems",
              description: "Dive into threads, processes, and OS architecture.",
              image:
                "/images/os1.jpeg",
              url: "https://www.geeksforgeeks.org/operating-systems/",
            },
          ].map((topic, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden group transform transition hover:-translate-y-2"
            >
              <div className="relative">
                <img
                  src={topic.image}
                  alt={topic.title}
                  className="w-full h-48 object-cover group-hover:opacity-90"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-purple-600">
                  {topic.title}
                </h3>
                <p className="text-sm text-gray-600 mb-4">{topic.description}</p>
                <a
                  href={topic.url}
                  className="px-4 py-2 text-sm text-white bg-purple-500 rounded-md hover:bg-purple-600 transition inline-block"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Explore Topic
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;



