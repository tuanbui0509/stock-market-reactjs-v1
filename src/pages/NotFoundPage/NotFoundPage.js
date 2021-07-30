import React from 'react';
import './NotFound.css'
import Header from '../../components/Common/Header'
import Footer from '../../components/Common/Footer'
import PageNotFound from '../../components/NotFoundPage/NotFoundPage'
const NotFoundPage = () => {
    return (
        <div>
            <Header />
            {/* Begin Main */}
            <PageNotFound/>
            {/* End Main */}
            <Footer />
        </div>
    );
}

export default NotFoundPage;
