import React from 'react';

const SingleProducts = ({ item }) => {
    const {category, image, name,price, recipe} = item
    
    return (
        <div className='shadow-lg p-5'>

            <img src={image} alt="" />
            <h2>{name}</h2>
            <h2>{category}</h2>
            <p>{price}</p>
            <p>{recipe}</p>

            <button className='mt-4 border py-2 px-4 text-xl font-semibold'>by now</button>

        </div>
    );
};

export default SingleProducts;