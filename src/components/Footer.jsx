import React from "react";

const Footer = () => {
  return (
    <section className="footer-section">
      <div className="footer-column">
        <h4>Услуги</h4>
        <ul>
          <li><a href="#">Стрижка волос</a></li>
          <li><a href="#">Уход за волосами</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Услуги</h4>
        <ul>
          <li><a href="#">Укладка волос</a></li>
          <li><a href="#">Окрашивание волос</a></li>
        </ul>
      </div>

      <div className="footer-column">
        <h4>Телефон</h4>
        <p className="contact-info">+7 (999) 999-99-99</p>
        <p className="contact-info">+7 (888) 888-88-88</p>
      </div>

      <div className="footer-column">
        <h4>Адрес</h4>
        <p className="contact-info">Невский пр. 140</p>
      </div>
    </section>
  );
};

export default Footer;
