"use client";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import axios from "axios";
const EditItemModal = ({ show, onClose, itemData, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    images: [],
    category: "",
    city: "",
    state: "",
  });

  const [existingImages, setExistingImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categories, setCategories] = useState([]);



  useEffect(() => {
    const fetchAndSet = async () => {
      try {
        const res = await axios.get("/api/product/category-list");
        const cats = res.data.categories || [];
        setCategories(cats);

        if (itemData) {
          const selectedCategory =
            typeof itemData.category === "object"
              ? itemData.category._id || itemData.category.id
              : itemData.category || "";

          setFormData({
            title: itemData.title || "",
            price: itemData.price || "",
            description: itemData.description || "",
            category: selectedCategory,
            city: itemData.city || "",
            state: itemData.state || "",
            shortDesc: itemData.shortDesc || "",
            images: [],
          });

          const gallery = itemData.gallery || [];
          setExistingImages(gallery);
          setImagePreviews(
            gallery.map((url) => ({
              url,
              isExisting: true,
            }))
          );
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    if (itemData) {
      fetchAndSet();
    }
  }, [itemData]);

  console.log("Selected category:", formData.category);
console.log("Categories:", categories);
  const Required = () => <span className="text-danger">*</span>;

const handleChange = (e) => {
  const { name, value, files } = e.target;

  if (name === "images" && files.length > 0) {
    const newFiles = Array.from(files);

    // Filter out duplicates by name
    const existingFileNames = new Set(formData.images.map((f) => f.name));
    const filteredNewFiles = newFiles.filter(
      (file) => !existingFileNames.has(file.name)
    );

    const updatedImages = [...formData.images, ...filteredNewFiles];
    setFormData((prev) => ({ ...prev, images: updatedImages }));

    setImagePreviews((prev) => [
      ...prev,
      ...filteredNewFiles.map((file) => ({
        url: URL.createObjectURL(file),
        isExisting: false,
        file,
      })),
    ]);
  } else {
    // ✅ For category, title, etc.
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

const handleRemoveImage = (index, isExisting = false) => {
  if (isExisting) {
    const updated = [...existingImages];
    updated.splice(index, 1);
    setExistingImages(updated);

    // Remove corresponding existing preview
    let existingIndex = -1;
    let count = -1;
    setImagePreviews((prev) =>
      prev.filter((img) => {
        if (img.isExisting) {
          count++;
          if (count === index) {
            existingIndex = count;
            return false;
          }
        }
        return true;
      })
    );
  } else {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData((prev) => ({ ...prev, images: updated }));

    // Remove corresponding new preview
    let newIndex = -1;
    let count = -1;
    setImagePreviews((prev) =>
      prev.filter((img) => {
        if (!img.isExisting) {
          count++;
          if (count === index) {
            newIndex = count;
            return false;
          }
        }
        return true;
      })
    );
  }
};

  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, price, description, images } = formData;

    if (
      !title ||
      !price ||
      !description ||
      (images.length === 0 && existingImages.length === 0)
    ) {
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
        <Modal.Title className="fw-semibold text-primary">
          ✏️ Edit Item
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit} encType="multipart/form-data">
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              {" "}
              Title <Required />
            </Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Wooden Study Table"
            />
          </Form.Group>
          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Category <Required />
                </Form.Label>
                <Form.Select
      name="category"
      value={formData.category}
      onChange={handleChange}
      className="rounded-3 shadow-sm"
    >
      <option value="">Select</option>
      {categories.map((cat) => (
        <option key={cat._id} value={cat.id}>
          {cat.name}
        </option>
      ))}
    </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  Price ($) <Required />
                </Form.Label>
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

          <Row className="mb-4">
            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  City <Required />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="e.g. Houston"
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group>
                <Form.Label className="fw-semibold">
                  State <Required />
                </Form.Label>
                <Form.Control
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="e.g. New Jersey"
                  className="rounded-3 shadow-sm"
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="mb-4">
            <Form.Label className="fw-semibold">Short Description</Form.Label>
            <Form.Control
              as="textarea"
              name="shortDesc"
              rows={2}
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="Short description about the item..."
              className="rounded-3 shadow-sm"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Description</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter item description"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">
              Upload New Images <Required />
            </Form.Label>
            <Form.Control
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={handleChange}
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
                    <Button
                      variant="light"
                      size="sm"
                      style={closeBtnStyle}
                      onClick={() => handleRemoveImage(idx, true)}
                    >
                      ×
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

          {imagePreviews.filter((img) => !img.isExisting).length > 0 && (
            <>
              <p className="fw-bold mt-4">🆕 New Image Previews</p>
              <div className="d-flex gap-2 flex-wrap">
                {imagePreviews
                  .filter((img) => !img.isExisting)
                  .map((img, idx) => (
                    <div key={idx} style={imageBoxStyle}>
                      <img
                        src={img.url}
                        alt={`New Preview ${idx + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "12px",
                        }}
                      />
                      <Button
                        variant="light"
                        size="sm"
                        style={closeBtnStyle}
                        onClick={() => handleRemoveImage(idx, false)}
                      >
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

export default EditItemModal;
