import React, { useState } from 'react';
import '../App.css'; // Ensure you create this CSS file for styling


const Contact = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here (e.g., sending data to an API)
    alert('Message sent successfully!');
    console.log('Form submitted:', formData);
    
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  };

  return (
     <>
    
    <div className="contact-container">
      <h1>Contact Us</h1>
      <p>If you have any questions, feedback, or concerns, feel free to reach out to us using the form below!</p>
      
      <form className="contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Enter your name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Enter your email"
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message here"
          ></textarea>
        </div>

        <button type="submit" className="submit-button">Send Message</button>
      </form>

      <h2>Other Ways to Reach Us</h2>
      <p>
        You can also contact us via:
        <ul className="other-ways">
        <li className="other-way-item">
          Email: <a className="other-way-link" href="mailto:support@[YourWebsiteName].com">alenjames899@gmail.com</a>
        </li>
        <li className="other-way-item">
          Phone: <a className="other-way-link" href="tel:+1234567890">8921837945</a>
        </li>
        <li className="other-way-item">
          Social Media: Follow us on 
          <a className="other-way-link" href="https://twitter.com/[YourTwitterHandle]" target="_blank" rel="noopener noreferrer"> Twitter</a> and 
          <a className="other-way-link" href="https://facebook.com/[YourFacebookPage]" target="_blank" rel="noopener noreferrer"> Facebook</a>.
        </li>
      </ul>
      </p>
    </div>
    </>
  );
};

export default Contact;
