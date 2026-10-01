function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h1 className="text-5xl font-bold mb-6">
          Welcome to Airbnb
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Discover unique places to stay and experiences to enjoy. Whether you're looking for a cozy apartment, a luxurious villa, or an adventurous getaway, Airbnb has something for everyone.
        </p>

        <a
          href="/property"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Explore Listings
        </a>

      </section>

    </main>
  )
}

export default Home