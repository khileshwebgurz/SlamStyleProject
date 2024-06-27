import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

const FinalForm = () => {
  const [formData, setFormData] = useState({
    contactname: "",
    emailaddress: "",
    pcontact: "",
    scontact: "",
    pcalltime: "",
    postcode: "",
    uniform_number: "",
    date_uniform: "",
    comments: "",
  });

  const jerseyFrontRef = localStorage.getItem("front")
  const jerseyBackRef = localStorage.getItem("back")
  const jerseyLeftRef = localStorage.getItem("left")
  const jerseyRightRef = localStorage.getItem("right")




  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formErrors = {};

    // Regular expression for validating email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.contactname)
      formErrors.contactname = "Contact Name is required.";
    if (!formData.emailaddress) {
      formErrors.emailaddress = "Email Address is required.";
    } else if (!emailPattern.test(formData.emailaddress)) {
      formErrors.emailaddress = "Invalid Email Address format.";
    }
    if (!formData.pcontact)
      formErrors.pcontact = "Primary Contact Number is required.";
    if (!formData.pcalltime)
      formErrors.pcalltime = "Preferred time to call is required.";
    if (!formData.postcode) formErrors.postcode = "Postcode is required.";
    if (!formData.uniform_number)
      formErrors.uniform_number = "Number of uniforms required is required.";
    if (!formData.date_uniform)
      formErrors.date_uniform =
        "Date by which uniforms are required is required.";
    if (!formData.comments) formErrors.comments = "Comments are required.";

    setErrors(formErrors);

    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      generatePDF();
      
    }
  };

  const generatePDF = async() => {
    // const pdf = new jsPDF();


    const pdf = new jsPDF(); // Set the page orientation to portrait, unit to mm, and format to A4



    // i want these two in 1st page
    const refs = [
      { ref: jerseyFrontRef, x: 10, y: 110 },
      { ref: jerseyBackRef, x: 110, y: 110 },
    ];

    // and these two in 2nd page
    const refsSecondPage = [
      { ref: jerseyLeftRef, x: 10, y: 80 },
      { ref: jerseyRightRef, x: 110, y: 80 },
    ];


    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    const pageWidth = pdf.internal.pageSize.getWidth();
    const textWidth = pdf.getStringUnitWidth('Contact Information') * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    const x = (pageWidth - textWidth) / 2;
    pdf.text('Contact Information', x, 16);

    // Draw a line under the heading
    const lineX = 14;
    const lineY = 18;
    const lineWidth = pageWidth - 28;
    pdf.setLineWidth(0.5);
    pdf.line(lineX, lineY, lineX + lineWidth, lineY);

    // pdf data to be generated in the form of table 
    pdf.autoTable({
      startY: 22,
      head: [],
      body: [
        [{ content: 'Contact Name:', styles: { fontStyle: 'bold' } }, formData.contactname, { content: 'Email Address:', styles: { fontStyle: 'bold' } }, formData.emailaddress],
        [{ content: 'Primary Contact Number:', styles: { fontStyle: 'bold' } }, formData.pcontact, { content: 'Secondary Contact Number:', styles: { fontStyle: 'bold' } }, formData.scontact],
        [{ content: 'Preferred time to call:', styles: { fontStyle: 'bold' } }, formData.pcalltime, { content: 'Postcode:', styles: { fontStyle: 'bold' } }, formData.postcode],
        [{ content: 'Number of uniforms required:', styles: { fontStyle: 'bold' } }, formData.uniform_number, { content: 'Date by which uniforms are required:', styles: { fontStyle: 'bold' } }, formData.date_uniform],
        [{ content: 'Comments:', styles: { fontStyle: 'bold' } }, formData.comments, '', '']
      ],
      theme: 'plain',
      styles: { fontSize: 10 },
      headStyles: { fillColor: [255, 255, 255] },
      bodyStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 60 },
        2: { cellWidth: 50 },
        3: { cellWidth: 70 }
      },
    });

    // Add data in the first page
    for (let { ref, x, y } of refs) {
      if (ref) {
        const imageDataUrl = ref;

        pdf.addImage(imageDataUrl, "PNG", x, y);
      }
    }

    // for adding a new page to pdf
    pdf.addPage();

    // Add data in the second page
    for (let { ref, x, y } of refsSecondPage) {
      if (ref) {
        const imageDataUrl = ref;
        pdf.addImage(imageDataUrl, "PNG", x, y);
      }
    }

   
    // Adding watermark to each page
    const pages = pdf.internal.getNumberOfPages();
    for (let i = 1; i <= pages; i++) {
      pdf.setPage(i);
      pdf.setFontSize(44);
      pdf.setTextColor(200);
      const pageHeight = pdf.internal.pageSize.height;
      const watermarkText = "1300251107||Slamstyle";
      const textHeight = -404 / pdf.internal.scaleFactor;
      pdf.text(watermarkText, 40, (pageHeight - textHeight) / 2, null, 40);
    }
    // for saving the pdf with specified name
    pdf.save("jersey_design.pdf");

    

    
  };

  return (
    <div className="customize-form">
      <div className="header-sec">
        <h3>Contact Information</h3>
      </div>
      <div className="customize-form-layout">
        <form id="leadForm" onSubmit={handleSubmit}>
          <input type="hidden" name="action" value="ub_save_lead" />
          <textarea
            id="wgz_front_src"
            name="front"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_back_src"
            name="back"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_left_src"
            name="left"
            style={{ display: "none" }}
          ></textarea>
          <textarea
            id="wgz_right_src"
            name="right"
            style={{ display: "none" }}
          ></textarea>
          <div className="custom-form">
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="text"
                    name="contactname"
                    id="contactname"
                    placeholder="Contact Name*"
                    value={formData.contactname}
                    onChange={handleChange}
                  />
                  {errors.contactname && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.contactname}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="email"
                    name="emailaddress"
                    id="emailaddress"
                    placeholder="Email Address*"
                    value={formData.emailaddress}
                    onChange={handleChange}
                  />
                  {errors.emailaddress && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.emailaddress}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="tel"
                    name="pcontact"
                    id="pcontact"
                    placeholder="Primary Contact Number*"
                    value={formData.pcontact}
                    onChange={handleChange}
                  />
                  {errors.pcontact && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.pcontact}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="tel"
                    name="scontact"
                    id="scontact"
                    placeholder="Secondary Contact Number"
                    value={formData.scontact}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="pcalltime"
                    id="pcalltime"
                    placeholder="Preferred time to call"
                    value={formData.pcalltime}
                    onChange={handleChange}
                  />
                  {errors.pcalltime && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.pcalltime}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="text"
                    name="postcode"
                    id="postcode"
                    placeholder="Postcode*"
                    value={formData.postcode}
                    onChange={handleChange}
                  />
                  {errors.postcode && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.postcode}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row flex-col-2">
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="number"
                    name="uniform_number"
                    id="uniform_number"
                    placeholder="Number of uniforms required"
                    autoComplete="true"
                    value={formData.uniform_number}
                    onChange={handleChange}
                  />
                  {errors.uniform_number && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.uniform_number}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex-col">
                <div className="form-group">
                  <input
                    type="datetime-local"
                    name="date_uniform"
                    id="date_uniform"
                    placeholder="Date by which uniforms are required"
                    autoComplete="true"
                    value={formData.date_uniform}
                    onChange={handleChange}
                  />
                  {errors.date_uniform && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.date_uniform}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="flex-row">
              <div className="flex-col">
                <div className="form-group">
                  <textarea
                    name="comments"
                    id="comments"
                    cols="40"
                    rows="6"
                    placeholder="Other Comments*"
                    value={formData.comments}
                    onChange={handleChange}
                  ></textarea>
                  {errors.comments && (
                    <span
                      className="error"
                      style={{
                        float: "left",
                        fontSize: "14px",
                        padding: "10px 0px 10px 0px",
                      }}
                    >
                      {errors.comments}
                    </span>
                  )}
                </div>
              </div>
            </div>
            <input
              type="submit"
              className="btn-design"
              value="Send"
              name="saveImage"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default FinalForm;
