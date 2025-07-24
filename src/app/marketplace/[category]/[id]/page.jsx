'use client'
import Header from "@/app/components/Header"
import Footer from "@/app/components/Footer"
import OtherBanner from "@/app/components/OtherBanner"
import { useParams, useRouter } from 'next/navigation'
import { useState,useMemo,useEffect } from "react"
import axios from "axios";
import AlertService from "@/app/components/alertService";



const MarketPlaceListing = () => {
 const { category, id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(id || "");
  const [allCategories, setAllCategories] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [gridLoading, setGridLoading] = useState(false);





  const fetchProducts = async (categoryId = "") => {
    try {
      setGridLoading(true);
      const productsRes = await axios.get("/api/marketplace/categorywise-list", {
        params: { id: categoryId },
      });
      setAllItems(productsRes.data.itemList || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setGridLoading(false);
    }
  };

  const currentSlug = decodeURIComponent(category || '').toLowerCase().replace(/\s+/g, '-')
  const isAll = currentSlug === '' || currentSlug === 'all'



  const handleViewDetails = () => {
    router.push('/marketplace/details')
  }

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value)
  }

    const handleClick = (categoryName, categoryId) => {
    const slug = encodeURIComponent(categoryName.toLowerCase().replace(/\s+/g, "-"));
    const scrollY = window.scrollY;

    // Update state and fetch products
    setSelectedCategory(categoryId);
    fetchProducts(categoryId);

    // Use router.replace to avoid adding to history stack
      //  router.replace(`/buy-sell/${slug}/${categoryId}`, { scroll: false });

    // Restore scroll position
    window.scrollTo(0, scrollY);
  };



    const fetchCategories = async () => {
    try {
      const catRes = await axios.get("/api/marketplace/category-list");
      const categories = catRes.data.categories || [];
      setAllCategories(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

    useEffect(() => {
    fetchCategories();
    fetchProducts(id);
  }, [id]);



    // Memoize the category buttons to prevent re-rendering
    const categoryButtons = useMemo(() => {
      return allCategories.length > 0 ? (
        allCategories.map((cat) => (
          <button
            key={cat.id}
            className={`btn btn-sm px-4 py-2 ${
              selectedCategory === cat.id ? "btn-danger" : "btn-outline-danger"
            } shadow-sm`}
            onClick={() => handleClick(cat.name, cat.id)}
          >
            {cat.name}
          </button>
        ))
      ) : (
        <button className="btn btn-sm px-4 py-2 btn-outline-danger shadow-sm" disabled>
          Loading Categories...
        </button>
      );
    }, [allCategories, selectedCategory]);
  return (
    <>
      <Header />
      <OtherBanner
        page_title={category}
        banner_image="/assets/images/bg/marketplace.png"
      />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <div className="profile-info col-md-12">

              {/* Category Filter */}
               <div className="mb-5 text-center">
                <div className="d-flex flex-wrap justify-content-center gap-2">
                  {categoryButtons}
                </div>
              </div>

              {/* Search Panel */}
       
              <div className="search-panel p-4 mb-5 mt-5 rounded shadow-sm border bg-light">
                <div className="row g-3 align-items-center">
                  <div className="col-md-10">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search items..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                  <div className="col-md-2 text-end">
                    <button
                      className="btn btn-danger w-100"
                      type="button"
                      onClick={() => setSearchTerm("")}
                    >
                      Clear
                    </button>
                  </div>
                </div>
              </div>

              {/* Listing */}
              {/* <h4 className="text-center fw-bold text-decoration-underline mb-4">
                {readableCategory}
              </h4> */}
              <div className="container my-4">
                 {gridLoading ? (
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ minHeight: "300px" }}
                  >
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading products...</span>
                    </div>
                  </div>
                ) :(
                <div className="row g-4">
                  {allItems
                    .filter(item =>
                      item.title.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <div className="card h-100 shadow-sm border-0">
                          <div style={{ position: 'relative' }}>
                            <img
                              src={item.images[0]}
                              className="card-img-top"
                              alt={item.title}
                              style={{ height: '250px', objectFit: 'cover' }}
                            />
                            {item.imagesCount && (
                              <div
                                className="badge bg-dark text-white position-absolute"
                                style={{ top: 10, left: 10, padding: "5px 10px", borderRadius: "12px" }}
                              >
                                {item.imagesCount} Photos
                              </div>
                            )}
                          </div>
                          <div className="card-body text-center">
                            <h5 className="card-title">{item.title}</h5>
                            <p className="card-text text-muted">{item.desc}</p>
                            <p className="fw-bold text-primary fs-5">${item.price}</p>
                            <button
                              className="btn btn-outline-primary btn-sm"
                              onClick={handleViewDetails}
                              style={{
                                background: '#c12020',
                                color: '#fff',
                                border: '#c12020'
                              }}
                            >
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
        
                </div>
                       )}
              </div>

              {/* Floating SOS Button */}
              <button
                className="btn btn-danger rounded-circle position-fixed"
                style={{ bottom: 20, right: 20, width: 50, height: 50 }}
              >
                <img src="/assets/images/icon-sos.png" alt="" style={{ maxWidth: 25 }} />
              </button>

            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default MarketPlaceListing
