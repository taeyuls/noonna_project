import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const getProductDetail = async () => {
    let url = `https://my-json-server.typicode.com/taeyulde/miniProject/products/${id}`;
    let response = await fetch(url);
    let data = await response.json();
    console.log("받아온 데이터는??", data);

    if (Array.isArray(data)) {
      setProduct(data);
    } else {
      setProduct([]);
    }
  };
  useEffect(() => {
    getProductDetail();
  }, []);

  return (
    <Container>
      <Row>
        <Col className="product-img">
          <img src={product?.img} />
        </Col>
        <Col>
          <div>{product?.title}</div>
          <div className="Detail-price">{product?.price.toLocaleString()}</div>
          <div className="Detail-choice">
            {product?.choice == true ? "Conscious choice" : ""}
          </div>
          <Form.Select>
            {product.size.map}
            <option></option>
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
          </Form.Select>
          <button className="Detail-button">추가</button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetail;
