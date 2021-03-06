import React from 'react'
import './UserCardBlock.css'
import {DeleteTwoTone} from '@ant-design/icons'
import styled from 'styled-components'

function UserCardBlock(props) {
    const renderCartImage = images => {
        if (images.length > 0) {
            let image = images[0]
            return `http://localhost:5000/${image}`
        }
    }

    const renderItems = () =>
        props.products &&
        props.products.map((product, index) => (
            <tr key={index}>
                <td>
                    <img style={{width: '70px'}} alt="product" src={renderCartImage(product.images)} />
                </td>
                <td>{product.quantity} 개</td>
                <td>{product.price} 원</td>
                <td>
                    <button
                        onClick={() => props.removeItem(product._id)}
                        style={{fontSize: '1.5rem', border: 'none', backgroundColor: '#bbcce2', cursor: 'pointer'}}
                    >
                        <DeleteTwoTone />
                    </button>
                </td>
            </tr>
        ))

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Product Image</th>
                        <th>Product Quantity</th>
                        <th>Product Price</th>
                        <th>Remove from Cart</th>
                    </tr>
                </thead>

                <tbody>{renderItems()}</tbody>
            </table>
        </div>
    )
}

export default UserCardBlock
