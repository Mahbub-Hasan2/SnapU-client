import React from 'react';
import PageHeader from '../components/shared/PageHeader';
import Instructors from '../components/Instructors/Instructors';

const InstructorsPage = () => {
    return (
        <div>
            <PageHeader title="Instructors Page" />
            <Instructors />
        </div>
    );
};

export default InstructorsPage;