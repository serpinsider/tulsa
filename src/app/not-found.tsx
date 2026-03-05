import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 px-4">
      <div className="text-center max-w-lg">
        <h1 className="text-8xl font-serif font-bold bg-gradient-to-r from-[#dfbd69] to-[#b8956d] bg-clip-text text-transparent mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white mb-4">
          Page Not Found
        </h2>
        <p className="text-white/70 mb-8 text-lg">
          Sorry, we couldn't find the page you're looking for.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-slate-900 transition-all duration-200 hover:scale-105" style={{ background: 'linear-gradient(135deg, #dfbd69 0%, #b8956d 100%)' }}>
            Back to Home
          </Link>
          <Link href="/quote" className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-semibold text-white border border-[#dfbd69] hover:bg-[#dfbd69]/10 transition-all duration-200">
            Get a Quote
          </Link>
        </div>
      </div>
    </main>
  );
}
