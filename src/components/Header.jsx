function Header() {
    return (
      <header className="bg-white shadow">
        <nav className="container mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">Your Blog Name</h1>
            <ul className="flex space-x-4">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
              <li><a href="/about" className="hover:text-blue-600">About</a></li>
            </ul>
          </div>
        </nav>
      </header>
    )
  }
  
  export default Header