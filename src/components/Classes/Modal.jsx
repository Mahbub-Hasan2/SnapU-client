import React, { useState } from 'react';
import Payment from '../Payments/Payment';

const Modal = ({ children }) => {
    const [showModal, setShowModal] = useState(false);

    return (
        <div>

            {/* <!-- Modal toggle --> */}
            <button onClick={() => setShowModal(!showModal)} className={`${showModal ? "hidden" : "block"} bg-green-500 text-white py-2 px-4 rounded`} type="button">
                Pay
            </button>

            {/* <!-- Main modal --> */}
            <div className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-center ${showModal ? "block" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full bg-gray-900 bg-opacity-40`}>
                <div className="relative w-full max-w-xl max-h-full">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <button onClick={() => setShowModal(!showModal)} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal">
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Modal;