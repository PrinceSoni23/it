import React from 'react';
import '../styles/CancellationPolicies.scss'; // Import the updated SCSS file
import Header from '../components/Header2';
import Footer from '../components/GFOOTER';
const CancellationPolicies = () => {
    return (
        <>
        <Header/>
        <div className="terms-conditions-page">
            <h1 className="!mt-[2%]">CANCELLATION POLICIES

            </h1>
            <p>At Trip It Today, each property comes with a specific cancellation policy that applies to bookings.<br />
                The policies outline the terms under which cancellations are accepted and refunds are issued.<br />
                Good news: We now include our service fees in the total booking refund amount. This means
                that if you are eligible for a full refund, our service fee is also refunded in full. If you are entitled
                to a partial refund, we will also refund a proportionate part of our service fee.
            </p>
            <section>
                <h2>Flexible Policy

                </h2>
                <ul>
                    <li>Full Refund: Guests are eligible for a full refund of the entire booking amount, including our
                        service fee, if they cancel at least 24 hours prior to the local check-in time specified in the
                        booking confirmation email.
                    </li>
                    <li>No Refund: Cancellations made within 24 hours of the local check-in time are not eligible for a
                        refund.
                    </li>
                </ul>

            </section>
            <section>
                <h2>Standard Policy

                </h2>
                <ul>
                    <li>Full Refund: Guests can receive a full refund of the total booking amount, including our service
                        fee, if they cancel at least 5 days before the local check-in time specified in the booking
                        confirmation email.
                    </li>
                    <li>No Refund: Cancellations made within 5 days of the local check-in time will not be refunded.
                    </li>
                </ul>

                <h2>Standard 30 Days Policy

                </h2>
                <ul>
                    <li>Full Refund: Guests are eligible for a full refund of the total booking amount, including our
                        service fee, if they cancel at least 30 days before the local check-in time specified in the booking
                        confirmation email.
                    </li>
                    <li>No Refund: Cancellations within 30 days of the local check-in time are not eligible for a refund.
                    </li>
                </ul>

                <h2>Standard 60 Days Policy

                </h2>
                <ul>
                    <li>Full Refund: Guests can receive a full refund of the total booking amount, including our service
                        fee, if they cancel at least 60 days before the local check-in time specified in the booking
                        confirmation email.

                    </li>
                    <li>No Refund: Cancellations made within 60 days of the local check-in time are not eligible for a
                        refund.

                    </li>

                </ul>

                <h2>Moderate Policy


                </h2>
                <ul>
                    <li>Full Refund: Guests are eligible for a full refund of the total booking amount, including our
                        service fee, if they cancel at least 30 days before the local check-in time specified in the booking
                        confirmation email.


                    </li>
                    <li>Partial Refund: Guests can receive a 50% refund of the total booking amount, including 50% of
                        our service fee, if they cancel at least 7 days before the local check-in time.


                    </li>
                    <li>No Refund: Cancellations made within 7 days of the local check-in time will not be refunded.
                    </li>

                </ul>
                <h2>Strict Policy
                </h2>
                <ul>
                    <li>Partial Refund: Guests are eligible for a 50% refund of the total booking amount, including
                        50% of our service fee, if they cancel at least 7 days before the local check-in time specified in
                        the booking confirmation email.
                    </li>
                    <li>No Refund: Cancellations made within 7 days of the local check-in time are not eligible for a
                        refund.
                    </li>
                </ul>
                <h2>Super Strict Policy
                </h2>
                <ul>
                    <li>Partial Refund: Guests can receive a 50% refund of the total booking amount, including 50% of
                        our service fee, if they cancel at least 14 days before the local check-in time specified in the
                        booking confirmation email.

                    </li>
                    <li>No Refund: Cancellations made within 14 days of the local check-in time will not be refunded.
                    </li>
                </ul>
                <h2>Super Strict 30 Days Policy
                </h2>
                <ul>
                    <li>Partial Refund: Guests are eligible for a 50% refund of the total booking amount, including
                        50% of our service fee, if they cancel at least 30 days before the local check-in time specified in
                        the booking confirmation email.

                    </li>
                    <li>No Refund: Cancellations made within 30 days of the local check-in time are not eligible for a
                        refund.

                    </li>
                </ul>
                <h2>Super Strict 60 Days Policy
                </h2>
                <ul>
                    <li>Partial Refund: Guests can receive a 50% refund of the total booking amount, including 50% of
                        our service fee, if they cancel at least 60 days before the local check-in time specified in the
                        booking confirmation email.</li>
                    <li>No Refund: Cancellations made within 60 days of the local check-in time are not eligible for a
                        refund.
                    </li>
                </ul>

                <p>Feel free to use or adapt these policies as needed for Trip It Today!</p>

            </section>


            
            {/* Continue adding sections as needed */}
        </div>
        <Footer/>
        </>
    );
};

export default CancellationPolicies;
