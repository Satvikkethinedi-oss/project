import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

export default function Products() {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  function add() {
    if (!name.trim() || !price) return;
    const p = { id: Date.now().toString(), name, price: parseFloat(price).toFixed(2) };
    dispatch({ type: "addProduct", payload: p });
    setName("");
    setPrice("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Products</h2>

      <Card>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="Product name" />
          <input value={price} onChange={e => setPrice(e.target.value)} placeholder="Price" type="number" />
          <button onClick={add}>Add</button>
        </div>
      </Card>

      <Card>
        <Table columns={["name", "price"]} data={state.products} />
      </Card>
    </div>
  );
}
