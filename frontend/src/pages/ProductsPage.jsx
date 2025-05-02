import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Container from "react-bootstrap/Container";
import {Carousel, Image,Col,Row} from "react-bootstrap";
import { Link } from 'react-router-dom';
import Product from "../components/Product";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";

function ProductsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [total, setTotal] = useState(0);
  const [limit, setLimit] = useState(0);
  const [skip, setSkip] = useState(0);
  const { search } = useSelector(state => state.search);
  const [products, setProducts] = useState([]);
  

  const { data, isLoading, error } = useGetProductsQuery({
    limit,
    skip,
    search,
  });

  console.log("data",data)


  useEffect(() => {
    if(data){
        setProducts(data?.products)
        setSkip((currentPage - 1) * limit);
        setLimit(data.maxLimit);
        setTotal(data.total)
        setTotalPage(Math.ceil(data.total / data.maxLimit));
    }
  }, [currentPage,data,limit,total,search]);


  console.log("currentPage: " + currentPage)

  const pageHandler = pageNum => {
    console.log("pageNum: " + pageNum)
    if(pageNum>=1 && pageNum<=totalPage && pageNum!==currentPage){
        console.log("pageNum: " + pageNum)
        setCurrentPage(pageNum)
    }else{
      console.log("failed paghandle")
    }
  }


  return (
    <Container>
      {/* <h1>Products</h1> */}
      {isLoading ? (
        <Loader/>
      ) : (
            <Row>
            {data.products?.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))}
          </Row>
      )}
      {totalPage>1 && !search && (
        <Paginate currentPage={currentPage} totalPage={totalPage} pageHandler={pageHandler}/>
      )}
    </Container>
  );
}

export default ProductsPage;
