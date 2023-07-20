import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import serverdomain from '../../utils/serverdomain';
import axios from 'axios';
import { AppContext } from '../../Layouts/AuthContextProvider';

const CheckoutForm = ({ price }) => {
    const stripe = useStripe();
    const elements = useElements();

    const { userInfo } = React.useContext(AppContext);

    const [clientSecret, setClientSecret] = useState('');


    useEffect(() => {
        axios.post(`${serverdomain}/create-payment-intent`, { price: price })
            .then(res => {
                setClientSecret(res.data.clientSecret)
                console.log(res)
            })
    }, [price])

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }

        // Get a reference to a mounted CardElement. Elements knows how
        // to find your CardElement because there can only ever be one of
        // each type of element.
        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(
            clientSecret,
            {
                payment_method: {
                    card: card,
                    billing_details: {
                        email: userInfo?.email ? userInfo?.email : userInfo[0]?.email,
                        name: userInfo?.name ? userInfo?.name : userInfo[0]?.name ? userInfo[0]?.name : userInfo[0]?.displayName ? userInfo[0]?.displayName : userInfo.displayName,
                    },
                },
            },
        );

        if (confirmError) {
            console.log('[error]', confirmError);
        } else {
            console.log('[PaymentIntent]', paymentIntent);
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" disabled={!stripe || !clientSecret}>
                Pay
            </button>
        </form>
    );
};

export default CheckoutForm;