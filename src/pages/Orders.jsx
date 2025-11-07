import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

export default function Orders() {
  const { state, dispatch } = useContext(AppContext);
  const [customerId, setCustomerId] = useState("");
  const [productId, setProductId] = useState("");

  function place() {
    if (!customerId || !productId) return;
    const product = state.products.find(p => p.id === productId);
    const order = {
      id: Date.now().toString(),
      customerId,
      productId,
      total: product ? product.price : 0,
      date: new Date().toISOString()
    };
    dispatch({ type: "addOrder", payload: order });
    setCustomerId("");
    setProductId("");
  }

  const enriched = state.orders.map(o => ({
    id: o.id,
    customer: state.customers.find(c => c.id === o.customerId)?.name ?? "-",
    product: state.products.find(p => p.id === o.productId)?.name ?? "-",
    total: o.total
  }));

  return (
    <div style={{ padding: 20 }}>
      <h2>Orders</h2>

      <Card>
        <div style={{ display: "flex", gap: 8 }}>
          <select value={customerId} onChange={(e) => setCustomerId(e.target.value)}>
            <option value="">Select customer</option>
            {state.customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>

          <select value={productId} onChange={(e) => setProductId(e.target.value)}>
            <option value="">Select product</option>
            {state.products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>

          <button onClick={place}>Place Order</button>
        </div>
      </Card>

      <Card>
        <Table columns={["customer", "product", "total"]} data={enriched} />
      </Card>
    </div>
  );
}
