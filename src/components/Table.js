import React, { useState } from "react";
import { Table, DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const dataSource = require("../fixtures/table_data.json");
const columns = [];
let columnVals = Object.keys(dataSource[0]);
const columnLength = columnVals.length;
for (let i = 0; i < columnLength; i++) {
  let cur = columnVals[i];
  let curtemp = cur.replace(/_/g, " ");
  let obj = {
    title: curtemp,
    dataIndex: cur,
    key: cur,
    width: 150,
  };
  if (cur.includes("amount")) {
    obj.sorter = (a, b) => a[cur] - b[cur];
  }
  if (cur === "created") {
    obj.sorter = (a, b) => moment(a[cur]).unix() - moment(b[cur]).unix();
  }
  columns.push(obj);
}

const dataSourceLength = dataSource.length;
for (let j = 0; j < dataSourceLength; j++) {
  const srcs = dataSource[j].sources[0];
  dataSource[j].sources = "id: " + srcs["id"] + ", object: " + srcs["object"];
  let unixTime = dataSource[j].created;
  unixTime = unixTime * 1000;
  const dateObject = new Date(unixTime);
  dataSource[j].created = dateObject.toLocaleString();

  //only works on the first render, second time "address is replaced successfully by the actual string"
  const addr = dataSource[j]["billing_details"]["address"];
  dataSource[j]["billing_details"] =
    addr["city"] + ", " + addr["country"] + ", " + addr["postal_code"];

  for (let i = 0; i < columnLength; i++) {
    if (dataSource[j][columnVals[i]] === null) {
      dataSource[j][columnVals[i]] = "N/A";
    } else if (dataSource[j][columnVals[i]] === false) {
      dataSource[j][columnVals[i]] = "false";
    } else if (dataSource[j][columnVals[i]] === true) {
      dataSource[j][columnVals[i]] = "true";
    }
  }
}

console.log(dataSource);
console.log(columns);

function TableContainer() {
  const [data, setData] = useState(dataSource);

  function filterDates(value) {
    console.log(value);
    console.log("in filterDates()");
    let filtered = dataSource;
    let res = [];
    let begin = value[0]._d.getTime();
    let end = value[1]._d.getTime();

    for (let i = 0; i < dataSourceLength; i++) {
      let time = Date.parse(filtered[i].created);
      if (time < begin || time > end) {
        console.log("Out of range");
      } else {
        res.push(filtered[i]);
      }
    }
    setData(res);
  }

  return (
    <div>
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        onChange={(value) => {
          filterDates(value);
        }}
      />
      <Table columns={columns} dataSource={data} />
    </div>
  );
}

export default TableContainer;
