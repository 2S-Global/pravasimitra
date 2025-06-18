// app/blogs/[id]/page.js
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import OtherBanner from "../../components/OtherBanner";
import { blogs } from "@/lib/blogsData";

export default function BlogDetails({ params }) {
  const blog = blogs.find((b) => b.id === parseInt(params.id));


  return (
    <>
      <Header />
      <OtherBanner page_title={blog.title} />
      <div className="tm-section bg-white tm-padding-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
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
           <div className="col-lg-6">
              <img
                src={blog.image}
                alt={blog.title}
                style={{ width: "100%", borderRadius: "10px", boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
