import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const Footer = () => {
  return (
    <footer class="footer bg-dark text-light">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <p>&copy; 2024 Your Website Name. All rights reserved.</p>
          <p>Contact us: <a href="mailto:info@example.com" class="text-light">info@example.com</a> | 123-456-7890</p>
          <p>1234 Main St, City, State, Zip Code</p>
        </div>
        <div class="col-md-6">
          <ul class="list-inline text-right">
            <li class="list-inline-item"><a href="#" class="text-light"><i class="fab fa-facebook"></i></a></li>
            <li class="list-inline-item"><a href="#" class="text-light"><i class="fab fa-twitter"></i></a></li>
            <li class="list-inline-item"><a href="#" class="text-light"><i class="fab fa-instagram"></i></a></li>
            <li class="list-inline-item"><a href="#" class="text-light"><i class="fab fa-linkedin"></i></a></li>
          </ul>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 text-center">
          <ul class="list-inline">
            <li class="list-inline-item"><a href="#" class="text-light">About Us</a></li>
            <li class="list-inline-item"><a href="#" class="text-light">Terms of Service</a></li>
            <li class="list-inline-item"><a href="#" class="text-light">Privacy Policy</a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
  
  
  );
};

export default Footer;
