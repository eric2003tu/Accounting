import Link from 'next/link';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/10 bg-gray-500">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 text-sm text-zinc-600 sm:flex-row sm:px-6 lg:px-8">
        <p className='text-white'>© {year} Accounting. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <Link href="/privacy" className="transition-colors hover:text-black text-white">
            Privacy
          </Link>
          <Link href="/terms" className="transition-colors hover:text-black text-white">
            Terms
          </Link>
          <Link href="/contact" className="transition-colors hover:text-black text-white">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
