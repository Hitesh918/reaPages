import React from 'react';
import Header from '../components/Header';
import StudentSideBar from '../components/StudentSideBar';
import BASE_URL from '../config';

function Contact() {
    return (
        <div>
            <Header />

            <section className="contact">
                <div className="row">
                    <div className="image">
                        <img src="images/contact-img.svg" alt="" />
                    </div>
                    <form action="" method="post">
                        <h3>Get In Touch</h3>
                        <input type="text" placeholder="Enter your name" name="name" required maxLength="50" className="box" />
                        <input type="email" placeholder="Enter your email" name="email" required maxLength="50" className="box" />
                        <input type="number" placeholder="Enter your number" name="number" required maxLength="50" className="box" />
                        <textarea name="msg" className="box" placeholder="Enter your message" required maxLength="1000" cols="30" rows="10"></textarea>
                        <input type="submit" value="Send message" className="inline-btn" name="submit" />
                    </form>
                </div>

                <div className="box-container">
                    <div className="box">
                        <i className="fas fa-phone"></i>
                        <h3>Phone Number</h3>
                        <a href="tel:1234567890">123-456-7890</a>
                        <a href="tel:1112223333">111-222-3333</a>
                    </div>

                    <div className="box">
                        <i className="fas fa-envelope"></i>
                        <h3>Email Address</h3>
                        <a href="mailto:shaikhanas@gmail.com">rea123@gmail.com</a>
                        <a href="mailto:anasbhai@gmail.com">theREAladmin@gmail.com</a>
                    </div>

                    <div className="box">
                        <i className="fas fa-map-marker-alt"></i>
                        <h3>Office Address</h3>
                        <a href="#">Flat No. 1, A1 Building, Vijayawada, Andhra Pradesh, India - 400104</a>
                    </div>
                </div>
            </section>


        </div>
    );
}

export default Contact;
