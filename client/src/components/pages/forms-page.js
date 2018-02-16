import React from "react";
import matchSorter from 'match-sorter'

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";

const formData = [
	{
		formName: "SC-100", 
		category: "Small Claims",
		dateRevised: "Jan. 1, 2017",
		description: "Plaintiff’s Claim and Order to Go to Small Claims Court" 
	}, 
	{
		formName: "SC-100-INFO", 
		category: "Small Claims",
		dateRevised: "Jan. 1, 2017",
		description: "Information for the Small Claims Plaintiff" 
	},
	{
		formName: "SC-100A", 
		category: "Small Claims",
		dateRevised: "Jan. 1, 2017",
		description: "Other Plaintiffs or Defendants (Small Claims)" 
	},
	{
		formName: "E-Test", 
		category: "Eviction",
		dateRevised: "Jan. 1, 2017",
		description: "Eviction test" 
	}
]


export default class FormsHome extends React.Component {
  constructor() {
    super();
    this.state = {
      data: formData
    };
  }
  render() {
    const { data } = this.state;
    return (
      <div className="Forms-home">
      	<div className="mainpage-title">
          <hr className="mainpage-title-line" />
          <h1>Forms</h1>
          <hr className="mainpage-title-line"/>
        </div>

        <ReactTable
          data={data}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          columns={[
            {
              columns: [
                {
                  Header: "Category",
                  accessor: "category",
                  id: "category",
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show All</option>
                      <option value="Small Claims">Small Claims</option>
                      <option value="Eviction">Eviction</option>
                      <option value="Guardianship">Guardianship</option>
                      <option value="Family">Family Law</option>
                      <option value="Domestic Violence">Domestic Violence</option>
                      <option value="Traffic">Traffic</option>
                    </select>
                },
                {
                  Header: "Form",
                  width: 100,
                  id: "formName",
                  accessor: d => d.formName,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["formName"] }),
                  filterAll: true
                },
                {
                  Header: "Description",
                  id: "description",
                  accessor: d => d.description,
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["description"] }),
                  filterAll: true
                },
                {
                  Header: "Date Revised",
                  accessor: "dateRevised" //how to disable input box? 
                }
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
        />
        <br />
      </div>
    );
  }
}



// const Tips = () =>
//   <div style={{ textAlign: "center" }}>
//     <em>Tip: Hold shift when sorting to multi-sort!</em>
//   </div>;

// import namor from "namor";

// const range = len => {
//   const arr = [];
//   for (let i = 0; i < len; i++) {
//     arr.push(i);
//   }
//   return arr;
// };

// const newPerson = () => {
//   const statusChance = Math.random();
//   return {
//     firstName: namor.generate({ words: 1, numbers: 0 }),
//     lastName: namor.generate({ words: 1, numbers: 0 }),
//     age: Math.floor(Math.random() * 30),
//     visits: Math.floor(Math.random() * 100),
//     progress: Math.floor(Math.random() * 100),
//     status:
//       statusChance > 0.66
//         ? "relationship"
//         : statusChance > 0.33 ? "complicated" : "single"
//   };
// };

// export function makeData(len = 5553) {
//   return range(len).map(d => {
//     return {
//       ...newPerson(),
//       children: range(10).map(newPerson)
//     };
//   });
// }

/* 
Cell: ({ value }) => (value >= 21 ? "Yes" : "No"),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "true") {
                      return row[filter.id] >= 21;
                    }
                    return row[filter.id] < 21;
                  },

                  */

