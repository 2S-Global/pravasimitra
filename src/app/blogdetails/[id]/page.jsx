// app/blogs/[id]/page.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OtherBanner from "../../components/OtherBanner";
import { blogs } from "@/lib/blogsData";

export default function BlogDetails({ params }) {
  const blog = blogs.find((b) => b.id === parseInt(params.id));

  if (!blog) return <div>Blog not found</div>;

  return (
    <>
      <Header />
      <OtherBanner page_title={blog.title} />
      <div className="tm-section bg-white tm-padding-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-10 offset-lg-1">
              <h2>{blog.title}</h2>
              {/* <p><strong>Author:</strong> {blog.userId} | <strong>Date:</strong> {blog.date}</p> */}
              {blog.description.split("\n\n").map((para, index) => (
                <p
                  key={index}
                  style={{ textAlign: "justify", marginBottom: "1em" }}
                  dangerouslySetInnerHTML={{ __html: para.trim() }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
