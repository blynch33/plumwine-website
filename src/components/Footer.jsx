function Footer() {
    return (
      <footer className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center">© {new Date().getFullYear()} Your Blog. All rights reserved.</p>
        </div>
      </footer>
    )
  }
  
  export default Footer