"use client";

import { useState, useEffect } from "react";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import OtherBanner from "@/app/components/OtherBanner";
import Sidebar from "@/app/components/Sidebar";
import AlertService from "@/app/components/alertService";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const LocationSettingsPage = () => {
  const [form, setForm] = useState({
    currentCountry: "",
    currentCity: "",
    destinationCountry: "",
    destinationCity: "",
  });

  const [countries, setCountries] = useState([]);
  const [currentCities, setCurrentCities] = useState([]);
  const [destinationCities, setDestinationCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [loadingCities, setLoadingCities] = useState(false);
  const [saving, setSaving] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  const searchParams = useSearchParams();

  // ✅ Fetch countries
  const fetchCountries = async () => {
    try {
      setLoadingCountries(true);
      const res = await axios.get("/api/location/list-country");
      if (Array.isArray(res.data?.items)) {
        setCountries(res.data.items);
      }
    } catch (err) {
      console.error("Error fetching countries:", err);
      AlertService.error("Failed to load countries.");
    } finally {
      setLoadingCountries(false);
    }
  };

  // ✅ Fetch cities by country
  const fetchCities = async (countryId, type, preselectCityId = "") => {
    try {
      setLoadingCities(true);
      const res = await axios.post("/api/location/get-city", { countryId });
      if (Array.isArray(res.data?.items)) {
        if (type === "current") {
          setCurrentCities(res.data.items);
          if (preselectCityId) {
            setForm((prev) => ({ ...prev, currentCity: preselectCityId }));
          }
        }
        if (type === "destination") {
          setDestinationCities(res.data.items);
          if (preselectCityId) {
            setForm((prev) => ({ ...prev, destinationCity: preselectCityId }));
          }
        }
      }
    } catch (err) {
      console.error("Error fetching cities:", err);
      AlertService.error("Failed to load cities.");
    } finally {
      setLoadingCities(false);
    }
  };

  // ✅ Prefill user profile
  const fetchProfile = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) return;

    try {
      const res = await axios.get("/api/auth/profile", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data?.user?.location) {
        const loc = res.data.user.location;
        setForm({
          currentCountry: loc.currentCountry?._id || "",
          currentCity: loc.currentCity?._id || "",
          destinationCountry: loc.destinationCountry?._id || "",
          destinationCity: loc.destinationCity?._id || "",
        });

        const promises = [];
        if (loc.currentCountry?._id) {
          promises.push(
            fetchCities(loc.currentCountry._id, "current", loc.currentCity?._id)
          );
        }
        if (loc.destinationCountry?._id) {
          promises.push(
            fetchCities(
              loc.destinationCountry._id,
              "destination",
              loc.destinationCity?._id
            )
          );
        }
        await Promise.all(promises);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
      AlertService.error("Failed to load profile.");
    }
  };

  // ✅ Warning popup if redirected
  useEffect(() => {
    const reason = searchParams.get("reason");
    if (reason === "missingLocation") {
      AlertService.error(
        "⚠ Please update Current City, Current Country, Destination City, and Destination Country first."
      );
    }
  }, [searchParams]);

  // ✅ Load initial data
  useEffect(() => {
    const loadData = async () => {
      await fetchCountries();
      await fetchProfile();
      setInitialLoading(false);
    };
    loadData();
  }, []);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "currentCountry") {
      setForm((prev) => ({ ...prev, currentCity: "" }));
      setCurrentCities([]);
      if (value) fetchCities(value, "current");
    }

    if (name === "destinationCountry") {
      setForm((prev) => ({ ...prev, destinationCity: "" }));
      setDestinationCities([]);
      if (value) fetchCities(value, "destination");
    }
  };

  // ✅ Save form
const handleSubmit = async (e) => {
  e.preventDefault();

  // Field-wise validation
  if (!form.currentCountry) {
    AlertService.error("Current Country is required.");
    return;
  }
  if (!form.currentCity) {
    AlertService.error("Current City is required.");
    return;
  }
  if (!form.destinationCountry) {
    AlertService.error("Destination Country is required.");
    return;
  }
  if (!form.destinationCity) {
    AlertService.error("Destination City is required.");
    return;
  }

  try {
    setSaving(true);
    const res = await axios.post(
      "/api/location/save-location",
      form,
      { withCredentials: true } // send cookie
    );

    AlertService.success(
      res.data?.message || "Location settings saved successfully!"
    );
  } catch (err) {
    console.error("Error saving location:", err);
    AlertService.error(
      err.response?.data?.message || "Failed to save location settings!"
    );
  } finally {
    setSaving(false);
  }
};


  return (
    <>
      <Header />
      <OtherBanner page_title="Location Settings" />

      <div className="tm-section tm-login-register-area bg-white tm-padding-section">
        <div className="container">
          <div className="row col-md-12">
            <Sidebar />

            <div className="profile-info col-md-9">
              {initialLoading ? (
  <div
    className="d-flex justify-content-center align-items-center"
    style={{ minHeight: "400px" }}
  >
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Loading...</span>
    </div>
  </div>
) : (
              <form
                onSubmit={handleSubmit}
                className="tm-form tm-login-form tm-form-bordered form-card"
              >
                <h4
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Location Settings
                </h4>

                <div className="tm-form-inner">
                  {/* Row 1: Current Country + Current City */}
                  <div className="row col-md-12">
                    <div className="col-md-6">
                      <div className="tm-form-field">
                        <label htmlFor="currentCountry">
                          Select Current Country <span className="text-danger">*</span>
                        </label>
                        <select
                          name="currentCountry"
                          id="currentCountry"
                          className="form-control"
                          value={form.currentCountry}
                          onChange={handleChange}
                          
                          disabled={loadingCountries}
                        >
                          <option value="">-- Select Country --</option>
                          {countries.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="tm-form-field">
                        <label htmlFor="currentCity">Select Current City <span className="text-danger">*</span></label>
                        <select
                          name="currentCity"
                          id="currentCity"
                          className="form-control"
                          value={form.currentCity}
                          onChange={handleChange}
                          
                          disabled={!form.currentCountry || loadingCities}
                        >
                          <option value="">-- Select City --</option>
                          {currentCities.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Row 2: Destination Country + Destination City */}
                  <div className="row col-md-12">
                    <div className="col-md-6">
                      <div className="tm-form-field">
                        <label htmlFor="destinationCountry">
                          Select Destination Country <span className="text-danger">*</span>
                        </label>
                        <select
                          name="destinationCountry"
                          id="destinationCountry"
                          className="form-control"
                          value={form.destinationCountry}
                          onChange={handleChange}
                          
                          disabled={loadingCountries}
                        >
                          <option value="">-- Select Country --</option>
                          {countries.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="tm-form-field">
                        <label htmlFor="destinationCity">
                          Select Destination City <span className="text-danger">*</span>
                        </label>
                        <select
                          name="destinationCity"
                          id="destinationCity"
                          className="form-control"
                          value={form.destinationCity}
                          onChange={handleChange}
                          
                          disabled={!form.destinationCountry || loadingCities}
                        >
                          <option value="">-- Select City --</option>
                          {destinationCities.map((c) => (
                            <option key={c._id} value={c._id}>
                              {c.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div
                    className="tm-form-field"
                    style={{ textAlign: "center" }}
                  >
                    <div
                      className="tm-form-field text-center"
                      style={{ textAlign: "center" }}
                    >
                      <button
                        type="submit"
                        className="btn btn-danger px-4"
                        disabled={saving}
                      >
                        {saving ? "Saving..." : "Save Location Settings"}
                      </button>
                    </div>
                  </div>
                </div>
              </form>

                        )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default LocationSettingsPage;
