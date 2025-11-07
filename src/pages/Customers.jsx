import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";
import Table from "../components/ui/Table";

export default function Customers() {
  const { state, dispatch } = useContext(AppContext);
  const [name, setName] = useState("");

  function add() {
    if (!name.trim()) return;
    const c = { id: Date.now().toString(), name };
    dispatch({ type: "addCustomer", payload: c });
    setName("");
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Customers</h2>

      <Card>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Customer name" />
          <button onClick={add}>Add</button>
        </div>
      </Card>

      <Card>
        <Table
          columns={["name"]}
          data={state.customers}
          actions={(row) => (
            <button onClick={() => dispatch({ type: "removeCustomer", payload: row.id })}>
              Delete
            </button>
          )}
        />
      </Card>
    </div>
  );
}
