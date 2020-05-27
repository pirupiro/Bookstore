import React from "react";
import UpdateItem from "../modals/update/UpdateItem";
import UpdateBook from "../modals/update/UpdateBook";

export default function Card({ item }) {
  const { name, imageUri, listType } = item;
  return (
    <div className="container col-md-4" key={item.id}>
      <div className="card mb-4 box-shadow">
        <img
          className="card-img-top"
          src={imageUri}
          data-src="holder.js/100px225?theme=thumb&amp;bg=55595c&amp;fg=eceeef&amp;text=Thumbnail"
          alt="Thumbnail [100%x225]"
          style={{ height: "400px", width: "100%", display: "block" }}
          data-holder-rendered="true"
        />
        <h5 className="card-title">{name}</h5>
        <p className="card-text"></p>
        { listType ==="Item" ? <UpdateItem item={item} /> : <UpdateBook book={item}/> }
        
      </div>
    </div>
  );
}
