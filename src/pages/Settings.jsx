import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import Card from "../components/ui/Card";

export default function Settings() {
  const { state } = useContext(AppContext);

  return (
    <div style={{ padding: 20 }}>
      <h2>Settings</h2>

      <Card>
        <div>Logged in as: {state.user.name}</div>
        <div>Local persistence: localStorage key "erp_state_v1"</div>
      </Card>
    </div>
  );
}
