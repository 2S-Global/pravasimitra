"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form,Row,Col } from "react-bootstrap";

const EditMarketItemModal = ({ show, onClose, itemData, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
    category:""
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (itemData) {
      setFormData({
        title: itemData.title || "",
        price: itemData.price || "",
        description: itemData.description || "",
        images: [],
        category:itemData.category
      });
      setExistingImages(itemData.images || []);
      setImagePreviews([]);
    }
  }, [itemData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "images[]") {
      const newFiles = Array.from(files);
      const updatedImages = [...formData.images, ...newFiles];

      const uniqueImages = Array.from(
        new Map(updatedImages.map((file) => [file.name, file])).values()
      );

      setFormData((prev) => ({ ...prev, images: uniqueImages }));
      setImagePreviews(uniqueImages.map((file) => URL.createObjectURL(file)));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index, isExisting = false) => {
    if (isExisting) {
      const updated = [...existingImages];
      updated.splice(index, 1);
      setExistingImages(updated);
    } else {
      const updated = [...formData.images];
      updated.splice(index, 1);
      setFormData((prev) => ({ ...prev, images: updated }));
      setImagePreviews(updated.map((file) => URL.createObjectURL(file)));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, description, images } = formData;

    if (!title || !price || !description || (images.length === 0 && existingImages.length === 0)) {
      alert("Please fill all fields and have at least one image.");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("price", price);
    data.append("description", description);
    data.append("existingImages", JSON.stringify(existingImages));
    images.forEach((img) => data.append("images[]", img));

    onSave(data);

    setFormData({ title: "", price: "", description: "", images: [] });
    setImagePreviews([]);
    setExistingImages([]);
    onClose();
  };

  const imageBoxStyle = {
    position: "relative",
    width: "100px",
    height: "100px",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
  };

  const closeBtnStyle = {
    position: "absolute",
    top: "4px",
    right: "4px",
    borderRadius: "50%",
    padding: "0px 5px",
    lineHeight: "1",
    fontSize: "14px",
    color: "#dc3545",
    backgroundColor: "#ffffff",
    border: "1px solid #dee2e6",
    boxShadow: "0 0 3px rgba(0,0,0,0.1)",
  };

  return (
    <Modal show={show} onHide={onClose} centered size="lg">
      <Modal.Header
        closeButton
        style={{ background: "#f8f9fa", borderBottom: "1px solid #dee2e6" }}
      >
        <Modal.Title className="fw-semibold text-primary">✏️ Edit Item</Modal.Title>
      </Modal.Header>

     <Modal.Body className="bg-white">
             <Form onSubmit={handleSubmit} encType="multipart/form-data" className="p-3">
               <Form.Group className="mb-3">
                 <Form.Label className="fw-semibold">Title</Form.Label>
                 <Form.Control
                   type="text"
                   name="title"
                   value={formData.title}
                   onChange={handleChange}
                   placeholder="e.g. Chicken Biryani"
                   className="rounded-3 shadow-sm"
                 />
               </Form.Group>
     
               <Row className="mb-4">
                 <Col md={6}>
                   <Form.Group>
                     <Form.Label className="fw-semibold">Category</Form.Label>
                     <Form.Select
                       name="category"
                       value={formData.category}
                       onChange={handleChange}
                       className="rounded-3 shadow-sm"
                     >
                       <option value="">Select</option>
                       <option value="Cooked Food">Cooked Food</option>
                       <option value="Package Food">Package Food</option>
                       <option value="Clothing">Clothing</option>
                       <option value="Fruites">Fruites</option>
                       <option value="Religious Items">Religious Items</option>
                       <option value="Ayurvedic and herbal products">Ayurvedic and Herbal Products</option>
                     </Form.Select>
                   </Form.Group>
                 </Col>
     
              
     
                 <Col md={6}>
                   <Form.Group>
                     <Form.Label className="fw-semibold">Price</Form.Label>
                     <Form.Control
                       type="text"
                       name="price"
                       value={formData.price}
                       onChange={handleChange}
                       placeholder="e.g. 4999"
                       className="rounded-3 shadow-sm"
                     />
                   </Form.Group>
                 </Col>
               </Row>
     
               <Form.Group className="mb-3">
                 <Form.Label className="fw-semibold">Description</Form.Label>
                 <Form.Control
                   as="textarea"
                   name="description"
                   rows={3}
                   value={formData.description}
                   onChange={handleChange}
                   placeholder="Description of the property..."
                   className="rounded-3 shadow-sm"
                 />
               </Form.Group>
     
               <Form.Group className="mb-3">
                 <Form.Label className="fw-semibold">Upload New Images</Form.Label>
                 <Form.Control
                   type="file"
                   name="images[]"
                   accept="image/*"
                   multiple
                   onChange={handleChange}
                   className="rounded-3 shadow-sm"
                 />
               </Form.Group>

          {existingImages.length > 0 && (
            <>
              <p className="fw-bold mt-3">Existing Images</p>
              <div className="d-flex gap-2 flex-wrap">
                {existingImages.map((src, idx) => (
                  <div key={idx} style={imageBoxStyle}>
                    <img
                      src={src}
                      alt={`Existing ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <Button variant="light" size="sm" style={closeBtnStyle} onClick={() => handleRemoveImage(idx, true)}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {imagePreviews.length > 0 && (
            <>
              <p className="fw-bold mt-4">🆕 New Image Previews</p>
              <div className="d-flex gap-2 flex-wrap">
                {imagePreviews.map((src, idx) => (
                  <div key={idx} style={imageBoxStyle}>
                    <img
                      src={src}
                      alt={`New Preview ${idx + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "12px",
                      }}
                    />
                    <Button variant="light" size="sm" style={closeBtnStyle} onClick={() => handleRemoveImage(idx, false)}>
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

      <div className="text-end">
  <Button
    type="submit"
    className="mt-4 px-4 py-2 fw-medium rounded-pill"
    style={{
      background: "#c12020",
      color: "#fff",
      border: "none",
    }}
  >
    Submit
  </Button>
</div>

        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditMarketItemModal;
