import React, {useState} from 'react'
import {Form, Input} from 'antd'
import FileUpload from '../../utils/FileUpload'
import Axios from 'axios'
import ShopBar from '../ShopBar/NavBar'

import styled from 'styled-components'

const Grid = styled.div`
    height: 100vh;
    display: grid;
    grid-template-areas: 'sidebar main';
    grid-template-columns: 150px 1fr;

    background: #b5cae6;
`

const Button = styled.button`
    padding: 2px 5px;
    width: 80px;
    background-color: #fff;
    outline: none;
    border: none;
    border-radius: 10px;
    color: #4187f6;
    transition: all 100ms;
    &:hover {
        cursor: pointer;
        border: 3px solid #4187f6;
    }
`

const {TextArea} = Input

const Continents = [
    {key: 1, value: '전공도서'},
    {key: 2, value: '교양도서'},
    {key: 3, value: '전자기기'},
    {key: 4, value: '생활용품'},
    {key: 5, value: '기타'},
    {key: 6, value: '무료나눔'},
    {key: 7, value: '주인을 찾아요'},
]

function UploadProductPage(props) {
    const [Title, setTitle] = useState('')
    const [Description, setDescription] = useState('')
    const [Price, setPrice] = useState(null)
    const [Continent, setContinent] = useState(1)
    const [Images, setImages] = useState([])

    const titleChangeHandler = event => {
        setTitle(event.currentTarget.value)
    }

    const descriptionChangeHandler = event => {
        setDescription(event.currentTarget.value)
    }

    const priceChangeHandler = event => {
        setPrice(event.currentTarget.value)
    }

    const continentChangeHandler = event => {
        setContinent(event.currentTarget.value)
    }

    const updateImages = newImages => {
        setImages(newImages)
    }

    const submitHandler = event => {
        event.preventDefault()

        if (!Title || !Description || !Price || !Continent || Images.length === 0) {
            return alert(' 모든 값을 넣어주셔야 합니다.')
        }

        //서버에 채운 값들을 request로 보낸다.

        const body = {
            //로그인 된 사람의 ID
            writer: props.user.userData._id,
            title: Title,
            description: Description,
            price: Price,
            images: Images,
            continents: Continent,
        }

        Axios.post('/api/product', body).then(response => {
            if (response.data.success) {
                alert('상품 업로드에 성공 했습니다.')
                props.history.push('/shop')
            } else {
                alert('상품 업로드에 실패 했습니다.')
            }
        })
    }

    return (
        <Grid>
            <ShopBar />
            <div style={{maxWidth: '700px', margin: '3rem auto'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                    <h2> 상품 업로드</h2>
                </div>

                <Form onSubmit={submitHandler}>
                    {/* DropZone */}
                    <FileUpload refreshFunction={updateImages} />

                    <br />
                    <br />
                    <label>이름</label>
                    <Input onChange={titleChangeHandler} value={Title} />
                    <br />
                    <br />
                    <label>설명</label>
                    <TextArea onChange={descriptionChangeHandler} value={Description} />
                    <br />
                    <br />
                    <label>가격(원)</label>
                    <Input type="number" onChange={priceChangeHandler} value={Price} />
                    <br />
                    <br />
                    <select
                        onChange={continentChangeHandler}
                        value={Continent}
                        style={{
                            width: '150px',
                            height: '25px',
                            borderRadius: '10px',
                            fontSize: '.8rem',
                            cursor: 'pointer',
                            outline: 'none',
                            border: 'none',
                        }}
                    >
                        {Continents.map(item => (
                            <option key={item.key} value={item.key}>
                                {item.value}
                            </option>
                        ))}
                    </select>
                    <br />
                    <br />
                    <Button type="submit">확인</Button>
                </Form>
            </div>
        </Grid>
    )
}

export default UploadProductPage
