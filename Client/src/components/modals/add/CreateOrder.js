import React, { useContext, useState, Fragment, useEffect } from "react";
import OrderForm from '../forms/OrderForm'

import ItemContext from "../../../contexts/item/ItemContext";
import BookContext from "../../../contexts/book/BookContext";
import AuthContext from "../../../contexts/auth/AuthContext";
import OrderContext from "../../../contexts/order/OrderContext";

export default function CreateOrder() {
  const [createOrderModal, setCreateOrderModal] = useState(false);

  const [details, setDetails] = useState([
    { itemId: "", price: "", quantity: "" },
  ]);

  const authContext = useContext(AuthContext);
  const bookContext = useContext(BookContext);
  const itemContext = useContext(ItemContext);
  const orderContext = useContext(OrderContext);

  const { addOrder } = orderContext;
  const { books, getAllBook } = bookContext;
  const { items, getAllItem } = itemContext;
  const { token } = authContext;

  useEffect(() => {
    getAllBook();
    getAllItem ();
  }, []);

  const handleAddFields = () => {
    const values = [...details];
    values.push({ itemId: "", price: "", quantity: "" });
    setDetails(values);
  };

  const handleRemoveFields = (index) => {
    const values = [...details];
    values.splice(index, 1);
    setDetails(values);
  };

  const handleInputChange = (index, event) => {
    const values = [...details];
    if (event.target.name === "itemId") {
      values[index].itemId = event.target.value;
    }
    if (event.target.name === "price") {
      values[index].price = event.target.value;
    }
    if (event.target.name === "quantity") {
      values[index].quantity = event.target.value;
    }
    setDetails(values);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    var tokenObj = JSON.parse(token);
    const employeeId = tokenObj["id"];
    const warehouseId = tokenObj["warehouseId"];
    const agencyId = tokenObj["agencyId"];
    const newState = {
      details,
      agencyId,
      warehouseId,
      employeeId,
    };
    console.log("details: ", details);
    console.log("values: ", newState);
    addOrder(newState);
    setCreateOrderModal(false);
  };

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateOrderModal(true)}
      >
        Create Order
      </button>
      <OrderForm
        handleAddFields={handleAddFields}
        handleRemoveFields={handleRemoveFields}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        items={items}
        books={books}
        details={details}
        show={createOrderModal}
        onHide={() => setCreateOrderModal(false)}
      />
      
    </div>
  );
}
