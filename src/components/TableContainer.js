import React, { useState } from "react";
import { Table, DatePicker } from "antd";
import moment from "moment";
const { RangePicker } = DatePicker;
const dataSource = require("../fixtures/table_data.json");
const dataSourceLength = dataSource.length;
const columns = [];
const columnVals = Object.keys(dataSource[0]);
const columnLength = columnVals.length;
const hiddenColumns = [
  "object",
  "calculated_statement_descriptor",
  "balance_transaction",
  "amount_refunded",
  "captured",
  "currency",
  "customer",
  "refunded",
  "description",
  "sources",
];

// generating appropriate column values
for (let i = 0; i < columnLength; i++) {
  let cur = columnVals[i];
  let obj = {
    key: cur,
    title: cur.replace(/_/g, " "),
    dataIndex: cur,
  };

  if (cur.includes("amount")) {
    obj.sorter = (a, b) => a[cur] - b[cur];
  }

  if (cur === "created") {
    obj.sorter = (a, b) => moment(a[cur]).unix() - moment(b[cur]).unix();
  }

  if (cur === "billing_details") {
    obj.sorter = (a, b) => a[cur].localeCompare(b[cur]);
  }

  if (cur === "status") {
    obj.filters = [
      { text: "succeeded", value: "succeeded" },
      { text: "failed", value: "failed" },
    ];
    obj.onFilter = (value, record) => record[cur].indexOf(value) === 0;
  }

  if (!hiddenColumns.includes(cur)) {
    columns.push(obj);
  }
}

// processing imported table_data
for (let j = 0; j < dataSourceLength; j++) {
  dataSource[j]["key"] = j;
  const srcs = dataSource[j].sources[0];
  dataSource[j].sourcesId = srcs["id"];
  dataSource[j].sourcesObject = srcs["object"];
  dataSource[j].sources = null;

  let unixTime = dataSource[j].created;
  unixTime = unixTime * 1000;
  const dateObject = new Date(unixTime);
  dataSource[j].created = dateObject.toLocaleString();

  const addr = dataSource[j]["billing_details"]["address"];
  dataSource[j]["billing_details"] =
    addr["city"] + ", " + addr["country"] + ", " + addr["postal_code"];

  for (let i = 0; i < columnLength; i++) {
    if (dataSource[j][columnVals[i]] === null) {
      dataSource[j][columnVals[i]] = "null";
    } else if (dataSource[j][columnVals[i]] === false) {
      dataSource[j][columnVals[i]] = "false";
    } else if (dataSource[j][columnVals[i]] === true) {
      dataSource[j][columnVals[i]] = "true";
    }
  }
}

function TableContainer() {
  const [data, setData] = useState(dataSource);

  function filterDates(value) {
    let res = [];
    let begin = value ? value[0]._d.getTime() : 0;
    let end = value ? value[1]._d.getTime() : Number.MAX_VALUE;
    for (let i = 0; i < dataSourceLength; i++) {
      let time = Date.parse(dataSource[i].created);
      if (time >= begin && time <= end) {
        res.push(dataSource[i]);
      }
    }
    setData(res);
  }

  return (
    <div className="App">
      <h3>Filter results according to 'created' timestamp:</h3>
      <RangePicker
        showTime={{ format: "HH:mm" }}
        format="YYYY-MM-DD HH:mm"
        onChange={(value) => {
          filterDates(value);
        }}
        style={{ padding: "10px", marginBottom: "20px" }}
      />
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender: (record) => (
            <div>
              <p>
                <b>object:</b> {record.object}
                &ensp;&ensp;|&ensp;&ensp;
                <b>amount refunded:</b> {record.amount_refunded}
                &ensp;&ensp;|&ensp;&ensp;
                <b>balance transaction:</b> {record.balance_transaction}
                &ensp;&ensp;|&ensp;&ensp;
                <b>calculated statement descriptor: </b>
                {record.calculated_statement_descriptor}
              </p>
              <p>
                <b>captured: </b>
                {record.captured}
                &ensp;&ensp;|&ensp;&ensp;
                <b>currency: </b>
                {record.currency}
                &ensp;&ensp;|&ensp;&ensp;
                <b>customer: </b>
                {record.customer}
                &ensp;&ensp;|&ensp;&ensp;
                <b>description: </b>
                {record.description}
                &ensp;&ensp;|&ensp;&ensp;
                <b>refunded: </b>
                {record.refunded}
              </p>
              <p>
                <b>sources ID: </b>
                {record.sourcesId}
                &ensp;&ensp;|&ensp;&ensp;
                <b>sources object: </b>
                {record.sourcesObject}
              </p>
            </div>
          ),
        }}
      />
    </div>
  );
}

export default TableContainer;
