import React, { useContext, useState, useEffect } from "react";
import ImportForm from "../forms/ImportForm";

import ItemContext from "../../../contexts/item/ItemContext";
import AuthContext from "../../../contexts/auth/AuthContext";
import BookContext from "../../../contexts/book/BookContext";
import VendorContext from "../../../contexts/vendor/VendorContext";
import ImportationContext from "../../../contexts/import/ImportationContext";

export default function CreateImport() {
  const [createImportModal, setCreateImportModal] = useState(false);

  const [details, setDetails] = useState([
    { itemId: "", price: "", quantity: "" },
  ]);
  const [data, setData] = useState({ vendor: "" });

  const authContext = useContext(AuthContext);
  const itemContext = useContext(ItemContext);
  const bookContext = useContext(BookContext);
  const vendorContext = useContext(VendorContext);
  const importationContext = useContext(ImportationContext);

  const { addImportation } = importationContext;
  const { books, getAllBook } = bookContext;
  const { vendors, getVendor } = vendorContext;
  const { items, getAllItem } = itemContext;
  const { token } = authContext;

  useEffect(() => {
    getAllItem();
    getAllBook();
    getVendor();
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
    const newState = {
      details,
      vendorId: data,
      warehouseId,
      employeeId,
    };
    console.log("details: ", details);
    console.log("values: ", newState);
    addImportation(newState);
    setCreateImportModal(false);
  };

  return (
    <div className="container">
      <button
        className="btn btn-lg btn-block btn-outline-primary  m-2 "
        variant="primary"
        onClick={() => setCreateImportModal(true)}
      >
        Create Import
      </button>
      <ImportForm
        handleAddFields={handleAddFields}
        handleRemoveFields={handleRemoveFields}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        items={items}
        books={books}
        vendors={vendors}
        details={details}
        setData={setData}
        show={createImportModal}
        onHide={() => setCreateImportModal(false)}
      />
    </div>
  );
}
