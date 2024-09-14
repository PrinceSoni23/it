import React from 'react';
import '../styles/FAQ.scss'; // Import the updated SCSS file
import Header from '../components/Header2';
import Footer from '../components/GFOOTER';  
const FAQ = () => {
    return (
        <>
        <Header/>
        <div className="terms-conditions-page">
            <h1>FREQUENTLY ASKED QUESTIONS(FAQs)

            </h1>

            <section>
                <h2>Q. What should I do if I can't access the property when I arrive?


                </h2>
                <p>A. If you're awaiting a response before your arrival, please give the property owner/manager up to
                    3-5 days to reply. If you haven’t received a response within this timeframe:
                </p>
                <ul>
                    <li>Email the property owner/manager using the contact information provided in your booking
                        confirmation email from @TripItToday.com.

                    </li>
                    <li>Call any local contacts if their details were provided.

                    </li>
                </ul>
                <p>If you still face difficulties, contact us and we will assist in reaching out to the property
                    owner/manager on your behalf.
                </p>

            </section>
            <section>
                <h2>Q. How can I get in touch with the property owner/manager?


                </h2>
                <p>A. If you’ve booked online, you should have received an email from @TripItToday.com containing
                    the property owner/manager’s contact information. If this information is missing:
                </p>
                <ul>
                    <li>Check any correspondence from the owner/manager and reply to it.

                    </li>
                    <li>Look at your booking confirmation email for their phone number.
                    </li>
                    <li>Use the Book Now feature on the property’s listing to send a new inquiry.</li>
                    <li>Review your spam/junk folders for any missed emails.
                    </li>
                </ul>
                <p>If you still can’t make contact, please reach out to us for further assistance.
                </p>

                <h2>Q. How do I confirm if my booking is secured?


                </h2>
                <p>A. When you send a booking request, the property owner/manager has 24 hours to accept or
                    decline it. Your booking is confirmed only after the owner accepts your request.<br />
                    We will notify you via email once the owner responds. If the booking is accepted, you’ll need to
                    pay the booking confirmation fee to finalize it. If you’ve made an online payment, we’ll confirm
                    your booking by email, and you can view your booking details under Reservations.<br />
                    If you don’t receive an email:
                </p>
                <ul>
                    <li>Check your spam folder.

                    </li>
                    <li>Ensure you're checking the correct email account.
                    </li>
                    <li>Contact the owner/manager via the form on their listing.
                    </li>
                    <li>If you used an incorrect email address, contact us for assistance.
                    </li>
                </ul>

                <h2>Q. How can I get more information about the property or my vacation?


                </h2>
                <p>A. For specific details about the property or your vacation, contact the property owner/manager
                    directly. You can also check the property’s listing for additional information.
                </p>
                <h2>Q. How do I leave a review for a rental?
                </h2>
                <p>A. After your stay, the property owner will have the opportunity to review your experience. We will
                    send you an email or SMS with instructions on how to submit your review. Your review will be
                    visible on the property’s listing, and the owner will have the chance to respond.
                </p>
                <h2>Q. What’s the process for canceling my booking?
                </h2>
                <p>A. To cancel your booking, refer to the cancellation policy provided by the property owner.
                    Cancellation will be subject to their policy terms.
                </p>
                <h2>Q. How do I make changes to my booking?
                </h2>
                <p>A. To adjust dates, the number of guests, or other details, contact the property owner directly. If
                    your booking is canceled, look for alternative accommodations or make a new booking.
                </p>
                <h2>Q. What happens if the booking price changes?
                </h2>
                <p>A. If the price increases and you’ve already paid the full amount, you’ll need to pay the difference.<br />
                    If the price decreases, the owner will refund the difference after your stay. You’ll receive email
                    notifications for any price changes.
                </p>
                <h2>Q. How do I list my property with Trip It Today?
                </h2>
                <p>A. Visit our website, navigate to “Join Us,” and follow the steps to create an account and list your
                    property. You’ll need to provide details about the property, including location, pricing, taxes, fees,
                    booking policies, and photos. After payment and verification, your listing will be live within 24
                    hours.
                </p>
                <h2>Q. When will I receive payment?
                </h2>
                <p>A. Guests can pay you either before they arrive or at check-in.</p>
                <h2>Q. Why am I not receiving any inquiries?
                </h2>
                <p>A. Check the following:
                </p>
                <ul>
                    <li>Ensure your email address is correct.


                    </li>
                    <li>Verify that your emails are being sent to the right booking address.


                    </li>
                    <li>Make sure there is enough space in your inbox.
                    </li>
                    <li>Look in your spam/junk folder and mark @TripItToday.com as important.
                    </li>
                    <li>Be aware that email delays can sometimes occur due to internet service providers.
                    </li>

                </ul>

                <h2>Q. How do I sign in to my account?




                </h2>
                <p>A. Go to the Member Login page, enter your email address and password. If you’ve forgotten your
                    password, follow the password reset instructions by entering your email address to receive a
                    reset link.
                </p>
                <h2>Q. How do I update my password?
                </h2>
                <p>A. Log in, navigate to “Change Password,” enter your current and new passwords, and save the
                    changes. You’ll receive an email confirmation once your password is successfully updated.
                </p>
                <h2>Q. How do I modify my contact settings?
                </h2>
                <p>A. Log in to your account, select “Edit,” make the necessary changes, and save. We will send you
                    an email to confirm the changes.<br />
                    For security reasons, we cannot make changes to your contact settings on your behalf.

                </p>
                <h4>Additional Support
                </h4>
                <p>A. If you have further questions or need assistance, please reach out to our Customer Support
                    team. We’re here to help and ensure your experience is as smooth as possible.
                </p>
                <h4>Contact Us:
                </h4>

                <ul>
                    <li>Email: support@tripittoday.com



                    </li>
                    <li>Phone: 1-800-TRIP-123</li>



                </ul>
                

            </section>



            {/* Continue adding sections as needed */}
        </div>
        <Footer/>
        </>
    );
};

export default FAQ;
