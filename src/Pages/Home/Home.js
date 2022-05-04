import React from 'react';
import Banner from './Banner/Banner';
import InventoryItems from './InventoryItems/InventoryItems';
import OurServices from './OurServices/OurServices';


const Home = () => {
    return (
        <div>
            <Banner />
            <OurServices />
            <InventoryItems />
        </div>
    );
};

export default Home;