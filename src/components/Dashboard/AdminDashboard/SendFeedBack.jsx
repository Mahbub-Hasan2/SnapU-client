import React from 'react';

const SendFeedBack = ({cls}) => {

    const handleFeedbackModalOpen = (classId) => {
        const updatedClasses = classes.map((cls) => {
            if (cls.id === classId) {
                return {
                    ...cls,
                    isFeedbackModalOpen: true,
                };
            }
            return cls;
        });

        setClasses(updatedClasses);
    };

    const handleFeedbackModalClose = (classId) => {
        const updatedClasses = classes.map((cls) => {
            if (cls.id === classId) {
                return {
                    ...cls,
                    isFeedbackModalOpen: false,
                };
            }
            return cls;
        });

        setClasses(updatedClasses);
    };

    const handleFeedbackSubmit = (classId, feedback) => {
        const updatedClasses = classes.map((cls) => {
            if (cls.id === classId) {
                return {
                    ...cls,
                    isFeedbackModalOpen: false,
                    feedback,
                };
            }
            return cls;
        });

        setClasses(updatedClasses);
    };

    return (
        <>
            <button
                onClick={() => handleFeedbackModalOpen(cls._id)}
                className="bg-blue-500 text-white py-2 px-4 rounded"
            >
                Send Feedback
            </button>
            {cls.isFeedbackModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <h3 className="text-lg font-medium mb-2">Send Feedback</h3>
                        <textarea
                            rows={4}
                            className="border p-2 mb-2 w-full"
                            placeholder="Write your feedback..."
                            onChange={(e) => handleFeedbackSubmit(cls._id, e.target.value)}
                        />
                        <button
                            onClick={() => handleFeedbackModalClose(cls._id)}
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default SendFeedBack;