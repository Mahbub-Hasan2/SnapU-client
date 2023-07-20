import React from 'react';
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_GATEWAY_PK);

const Payment = ({ price }) => {
    console.log(price)
    return (
        <div>
            <div className="container mx-auto md:px-10 px-2 py-10">
                {price && <p className="text-primary font-semibold font-inter">Total Price: ${price}</p>}
                <div className="pb-5">
                    <h2 className="text-primary font-semibold font-inter">Payment Page</h2>
                </div>
                <div className="max-w-md mx-auto">
                    <Elements stripe={stripePromise}>
                        <CheckoutForm price={price} />
                    </Elements>
                </div>
            </div>
        </div>
    );
};

export default Payment;