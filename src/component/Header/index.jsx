import React from 'react';
import HeaderContext from './HeaderContext';
import Header from './Header';

const Index = () => {
    return (
        <HeaderContext>
            <Header />
        </HeaderContext>
    )
}

export default Index;
