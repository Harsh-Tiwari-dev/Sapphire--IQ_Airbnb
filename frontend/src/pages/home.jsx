function Home() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="flex flex-col items-center justify-center text-center py-24 px-6">

        <h1 className="text-5xl font-bold mb-6">
          Welcome to ShopEasy
        </h1>

        <p className="text-gray-600 text-lg mb-8 max-w-xl">
          Discover amazing products at the best prices.
        </p>

        <a
          href="/products"
          className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800"
        >
          Shop Now
        </a>

      </section>

    </main>
  )
}

export default Home