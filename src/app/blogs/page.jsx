// ✅ Make this a Server Component (default in App Router)

import Header from '../components/Header';
import Footer from '../components/Footer';
import OtherBanner from '../components/OtherBanner';
import Blogs from '../components/Blogs';
import { fetchBlogs } from '@/lib/api';

export default async function BlogsList() {
  const blogs = await fetchBlogs(); // Server-side fetch

  return (
    <>
      <Header />
      <OtherBanner page_title="Blogs List" />
      <Blogs blogs={blogs} />
      <Footer />
    </>
  );
}
