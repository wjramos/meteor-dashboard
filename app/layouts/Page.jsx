import React from 'react';

import Header from '../components/Header.jsx';
import Footer from '../components/Footer.jsx';

const PageLayout = ( { Body } ) => (
    <section>
        <Header />
        { Body }
        <Footer />
    </section>
);

export default PageLayout;
