import React from "react";
import { Button } from "antd";

const data = require("../../fixtures/table_data.json");

function Table() {
  console.log(data);
  return (
    <div>
      <Button>Bit</Button>
    </div>
  );
}

export default Table;
