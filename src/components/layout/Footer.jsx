import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-indigo-950 text-white py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} Quizmo. Crafted with ❤️ for
            learners.
          </p>
        </div>
      </footer>
  )
}

export default Footer
