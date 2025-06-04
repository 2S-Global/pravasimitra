

const Faqs= () =>{

    return(
<main className="main-content">
  {/* Faq Area */}
  <div className="tm-section faq-area bg-grey tm-padding-section">
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-10 col-12">
          <div className="tm-section-title text-center">
            <h2>Frequently Asked Questions</h2>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6">
          <div className="tm-faq-image">
            <img
              className="wow fadeInLeft"
              src="assets/images/others/faq-image.png"
              alt="faq image"
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="tm-faq-content">
            {/* Accordion */}
            <div id="tm-accordion" className="tm-accordion">
              <div className="card">
                <div className="card-header" id="headingOne">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link"
                      data-toggle="collapse"
                      data-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই হতে কোন কোন ধরনের
                      পাসপোর্ট সেবা প্রদান করা হয়?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseOne"
                  className="collapse show"
                  aria-labelledby="headingOne"
                  data-parent="#tm-accordion"
                >
                  <div className="card-body">
                    <p style={{ textAlign: "justify" }}>
                      বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই হতে ইলেকট্রনিক পাসপোর্ট
                      ই-পাসপোর্ট এবং মেশিন রিডেবল পাসপোর্ট এমআরপি সেবা প্রদান
                      করা হয়। বায়োমেট্রিক তথ্য ও চিপ সম্বলিত হওয়ায়
                      ই-পাসপোর্ট আধুনিক ও নিরাপদ। তাই, ই-পাসপোর্ট ব্যবহার করে
                      বিমানবন্দরে ই-গেট ব্যবহারসহ ইমিপ্রেশনে উন্নততর সেবা পাওয়া
                      যায়। এটি বায়োমেদ্রিক পাসপোর্ট বিধায় সেবাদানকারী দপ্তরে
                      অধিকতর সমাদৃত। তাই উন্নততর ও আধুনিক সেবা পেতে সকল
                      সেবাগ্রহীতাকে ই-পাসপোর্ট গ্রহণের পরামর্শ প্রদান করা
                      যাচ্ছে। তবে, কোন কারণে ই-পাসপোর্ট সেবা গ্রহণে অক্ষম বা
                      অনিচ্ছুক ব্যক্তিগণকে দুবাইয়ের কারামায় অবস্থিত ফশওয়া
                      গ্লোবাল (http://www.foshwaglobal.ae) নামক আউটসোর্সিং
                      কোম্পানির মাধ্যমে সীমিত পরিসরে এমআরপি সেবা প্রদান করা হয়।
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingTwo">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      ই-পাসপোর্টের জন্য কিভাবে আবেদন করতে হয়?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseTwo"
                  className="collapse"
                  aria-labelledby="headingTwo"
                  data-parent="#tm-accordion"
                >
                  <div className="card-body">
                    <p style={{ textAlign: "justify" }}>
                      www.epassport.gov.bd এ ওয়েবসাইটে রেজিস্ট্রেশন করে
                      ই-পাসপোর্টের আবেদন করা যাবে। অনলাইনে দাখিলকৃত আবেদনের
                      প্রিন্ট কপি স্বাক্ষর করে পূর্ববর্তী মূল পাসপোর্টসহ
                      কনস্যুলেটে উপস্থিত হয়ে ফি জমা দিতে হবে। ফি জমাদানের পরে
                      বায়োমেট্রিক এনরোলমেন্ট সম্পন্ন করতে হবে। এ সময়
                      পূর্ববর্তী মূল পাসপোর্ট ছাড়াও পাসপোর্টের ফটোকপি, পেশা
                      প্রমাণের জন্য নিয়োগপত্র/মেয়াদযুক্ত এমিরেটস আইডি, জাতীয়
                      পরিচয়পত্র এব/বা জন্মনিবন্ধন (ইংরেজি) সনদের অনুলিপি জমা
                      দিতে হবে। মনে রাখবেন, ই-পাসপোর্টের আবেদন/চাহিত তথ্যের সাথে
                      জাতীয় পরিচয়পত্র এবং/বা অনলাইন জন্ম নিবন্ধন সনদ (ইংরেজি)
                      এর তথ্যের অবশ্যই মিল থাকতে হবে। এছাড়া, পাসপোর্টের তথ্য
                      সংশোধন, স্পাউসের তথ্য পরিবর্তন ইত্যাদি অতিরিক্ত কাজের জন্য
                      অতিরিক্ত কাগজপত্র/দলিলাদি (বিস্তারিত জানতে সংশ্লিষ্ট
                      প্রশ্ন দেখুন) জমা দিতে হবে।
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingThree">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      ই-পাসপোর্ট আবেদনের সাথে কোন কোন কাগজপত্র/দলিলাদি
                      (ডকুমেন্ট) দাখিল করতে হয়?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseThree"
                  className="collapse"
                  aria-labelledby="headingThree"
                  data-parent="#tm-accordion"
                >
                  <div className="card-body">
                    <p style={{ textAlign: "justify" }}>
                      জাতীয় পরিচয়পত্র এবং/বা অনলাইন জন্ম নিবন্ধন সনদ (ইংরেজি)
                      ব্যবহার করে চচাহিত তথ্যের সাথে হুবহু মিল থাকতে হবে)
                      বিদেশস্থ বাংলাদেশ মিশনে ই-পাসপোর্টের আবেদন করা যায়। আপনি
                      জেনে আনন্দিত হবেন যে, বাংলাদেশ কনস্যুলেট জেনারেল, দুবাই ও
                      উত্তর আমিরাত হতে জাতীয় পরিচয়পত্র এবং অনলাইন এবং/বা
                      জন্মনিবন্ধন সনদ, পেশা প্রমাণের জন্য নিয়োগপত্র,
                      মেয়াদযুক্ত এমিরেটস আইডি/ভিসা অবশ্যই প্রয়োজন হবে। এছাড়া,
                      স্পাউসের নাম সংযোজন/বিয়োজন/সংশোধনের জন্য ক্ষেত্র অনুযায়ী
                      বিবাহ সনদ, বিবাহ-বিচ্ছেদ সনদ এবং ক্ষেত্রবিশেষে স্পাউসের
                      এনআইডি/বিআরসি প্রয়োজন হবে।
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingFour">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      নবজাতকের পাসপোর্টের আবেদন করতে কী কী দলিল (ডকুমেন্ট) লাগে?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFour"
                  className="collapse"
                  aria-labelledby="headingFour"
                  data-parent="#tm-accordion"
                >
                  <div className="card-body">
                    <p style={{ textAlign: "justify" }}>
                      বাংলাদেশ কনস্যুলেট জেনারেল দুই বছর বয়স পর্যন্ত নবজাতকদের
                      পাসপোর্টের আবেদন গ্রহণ করতে পারে। নবজাতকের বয়স কমপক্ষে এক
                      বছর না হলে নিম্নোক্ত কাগজপত্র/দলিলাদিসহ নবজাতকের মাতা/পিতা
                      কনস্যুলেটে এসে আবেদন দাখিল করবেন (নবজাতককে আনার দরকার
                      নেই)। যথাযথভাবে পুরণকৃত ই- পাসপোর্ট আবেদন ফরমের সাথে ১)
                      বাংলাদেশ সরকার কর্তৃক ইস্যুকৃত নবজাতকের জন্মনিবন্ধন সনদ,
                      ২) ইউএই সরকার কর্তৃক ইস্যুকৃত নবজাতকের জন্ম নিবন্ধন সনদের
                      মূলপ্রস্থ (original/master copy) এবং (৩) নবজাতকের আট ইঞ্চি
                      স্‌ দশ ইঞ্চি আকারের এক কপি রঙিন ছবি দাখিল করতে হবে।
                      এছাড়া, আবেদনকালে মাতাপিতার মুল পাসপোর্ট সাথে রাখতে হবে।
                      নবজাতকের ছবি অবশ্যই রঙিন হতে হবে। এছাড়া, শিশুর পরিহিত
                      কাপড়ের রঙ গাড়/উজ্জল বর্ণের হতে হবে। ছবির ব্যাকগ্রাউন্ড
                      হালকা ধুসর বর্ণের হতে হবে।
                    </p>
                  </div>
                </div>
              </div>
              <div className="card">
                <div className="card-header" id="headingFive">
                  <h5 className="mb-0">
                    <button
                      className="btn btn-link collapsed"
                      data-toggle="collapse"
                      data-target="#collapseFive"
                      aria-expanded="false"
                      aria-controls="collapseFive"
                    >
                      ই-পাসপোর্টের আবেদন ফরম কিভাবে পূরণ করতে হয়? এজন্য কি
                      ই-মেইল লাগবে? ই-পাসপোর্টের আবেদনের নিয়ম কী?
                    </button>
                  </h5>
                </div>
                <div
                  id="collapseFive"
                  className="collapse"
                  aria-labelledby="headingFive"
                  data-parent="#tm-accordion"
                >
                  <div className="card-body">
                    <p style={{ textAlign: "justify" }}>
                      www.epassport.gov.bd ওয়েবসাইটে রেজিন্ট্রেশন করে
                      ই-পাসপোর্টের আবেদন করা যাবে। একটি ই-মেইল ব্যবহার করে
                      একবারই রেজিস্ট্রেশন করা যাবে এবং একটি রেজিস্ট্রেশন ব্যবহার
                      করে ছয় মাসে সর্বোচ্চ ছয়টি আবেদন করা যাবে। এ সম্বন্ধে আরও
                      জানতে এবং ই-পাসপোর্টের ফরম পূরণের টিউটোরিয়াল দেখতে এখানে
                      ক্লিক করুন।
                    </p>
                  </div>
                </div>
              </div>
            </div>
            {/*// Accordion */}
          </div>
        </div>
      </div>
    </div>
  </div>
  {/*// Faq Area */}
  {/* Pricing Area */}
  {/*// Pricing Area */}
</main>



    )


}


export default Faqs;