"use client";

import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const faqs = [
  {
    question:
      "বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই হতে কোন কোন ধরনের পাসপোর্ট সেবা প্রদান করা হয়?",
    answer:
      "বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই হতে ইলেকট্রনিক পাসপোর্ট (ই-পাসপোর্ট) এবং মেশিন রিডেবল পাসপোর্ট (এমআরপি) সেবা প্রদান করা হয়...",
  },
  {
    question: "ই-পাসপোর্টের জন্য কিভাবে আবেদন করতে হয়?",
    answer:
      "www.epassport.gov.bd ওয়েবসাইটে রেজিস্ট্রেশন করে ই-পাসপোর্টের আবেদন করা যাবে...",
  },
  {
    question:
      "ই-পাসপোর্ট আবেদনের সাথে কোন কোন কাগজপত্র/দলিলাদি দাখিল করতে হয়?",
    answer:
      "জাতীয় পরিচয়পত্র এবং/বা অনলাইন জন্ম নিবন্ধন সনদ, পেশা প্রমাণপত্র, এমিরেটস আইডি ইত্যাদি জমা দিতে হয়।",
  },
  {
    question: "নবজাতকের পাসপোর্টের আবেদন করতে কী কী দলিল লাগে?",
    answer: "নবজাতকের জন্মসনদ, ছবি, এবং পিতামাতার পাসপোর্টের কপি লাগবে।",
  },
  {
    question: "ই-পাসপোর্টের আবেদন ফরম কিভাবে পূরণ করতে হয়? ই-মেইল কি দরকার?",
    answer:
      "একটি ই-মেইল ব্যবহার করে রেজিস্ট্রেশন করতে হবে এবং আবেদন ফরম অনলাইনে পূরণ করতে হবে।",
  },
];

const Faqs = () => {
  return (
    <main className="main-content">
      <Box sx={{ py: 6, backgroundColor: "#f7f7f7" }}>
        <div className="container">
          <div className="row justify-content-center mb-5">
            <div className="col-lg-8 text-center">
              <h2 style={{ fontWeight: 600, fontSize: "2rem" }}>
                Frequently Asked Questions
              </h2>
              <p style={{ color: "#666" }}>
                আমাদের প্রায়শই জিজ্ঞাসিত প্রশ্নাবলী পড়ুন
              </p>
            </div>
          </div>

          <div className="row align-items-start">
            {/* Left image */}
            <div className="col-lg-6 mb-4 mb-lg-0 pb-5">
              <Box
                component="img"
                src="/assets/images/others/faq-image.png"
                alt="faq"
                sx={{ width: "100%", borderRadius: "16px", boxShadow: 3 }}
              />
            </div>

            {/* Right accordion */}
            <div className="col-lg-6 pb-5">
              {faqs.map((faq, index) => (
                <Accordion
                  key={index}
                  defaultExpanded={index === 0}
                  sx={{
                    mb: 2,
                    borderRadius: "12px",
                    boxShadow: 2,
                    "&:before": { display: "none" },
                    backgroundColor: "#fff",
                    transition: "0.3s",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "#0d6efd" }} />}
                    sx={{
                      backgroundColor: "#f1f1f1",
                      borderRadius: "12px 12px 0 0",
                      px: 3,
                      py: 1.5,
                    }}
                  >
                    <Typography fontWeight={600}>{faq.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ px: 3, py: 2 }}>
                    <Typography sx={{ textAlign: "justify", color: "#555" }}>
                      {faq.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </div>
        </div>
      </Box>
    </main>
  );
};

export default Faqs;
