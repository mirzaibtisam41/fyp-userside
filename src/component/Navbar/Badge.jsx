import React from 'react';
import Badge from '@material-ui/core/Badge';

export default function ShowZeroBadge({ cartItems }) {
    return (
        <Badge color="secondary" badgeContent={cartItems && cartItems.length} showZero>
            <i className="fa fa-shopping-cart mr-2 mt-1 text-white"></i>
        </Badge>
    );
}