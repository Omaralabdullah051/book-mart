import React from 'react';
import AboutSection from './AboutSection/AboutSection';
import Banner from './Banner/Banner';
import ChooseUs from './ChooseUs/ChooseUs';
import InventoryItems from './InventoryItems/InventoryItems';
import OurServices from './OurServices/OurServices';


const Home = () => {
    return (
        <div>
            <Banner />
            <OurServices />
            <InventoryItems />
            <AboutSection />
            <ChooseUs />
        </div>
    );
};

export default Home;