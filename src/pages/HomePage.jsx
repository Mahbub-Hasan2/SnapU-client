import React from 'react';
import Header from '../components/Home/Header';
import PopularClasses from '../components/Home/PopularClasses';
import PopularInstructors from '../components/Home/PopularInstructors';
import About from '../components/Home/About';

const HomePage = () => {
    return (
        <div>
            <Header />
            <About />
            <PopularClasses />
            <PopularInstructors />
            
        </div>
    );
};

export default HomePage;