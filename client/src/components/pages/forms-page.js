import React from "react";
import matchSorter from 'match-sorter'
import TitleLine from '../template/title-line';

// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import formData from '../../../data/jcFormsSC.js'
// const test_server = "http://45.33.45.17:3000";
// const dev_server = "http://dev-eforms-viewer.ad.cc-courts.org";

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
      	<TitleLine title="Forms" />

        <ReactTable
          data={data}          
          filterable
          
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
                      <option value="Fee Waiver">Fee Waiver</option>
                    </select>
                },
                {
                  Header: "Form",
                  width: 100,
                  id: "formName",        
                  accessor: d => d.formName,
                  Cell: (d) => {return <a href={d.original.link} target="_blank">{d.original.formName}</a>},

                  filterMethod: (filter, rows) => { return matchSorter(rows, filter.value, { keys: ["formName"] })},
                  filterAll: true
                },
                {
                  Header: "Description",
                  id: "description",
                  accessor: d => d.description,
                  // filterable: false //to disable filter input box
                  filterMethod: (filter, rows) =>
                    matchSorter(rows, filter.value, { keys: ["description"] }),
                  filterAll: true
                },
                {
                  Header: "Date Revised",
                  id: "dateRevised",
                  accessor: d => d.dateRevised,
                  filterable: false //to disable filter input box 
                }, 
                // {
                //   Header: "Links",
                //   id: "links",
                //   accessor: d => d.link, 
                //   filterMethod: (filter, rows) =>
                //     matchSorter(rows, filter.value, { keys: ["link"] }),
                //   filterAll: true
                // }
              ]
            },
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          // getTdProps={(state, rowInfo, column, instance) => {
          //   return {
          //     onClick: (e) => {
          //       const formName =  rowInfo.original.formName.toLowerCase().split("-").join("");
          //       console.log("Form Name:", formName);
          //       axios.post("")
          //     }
          //   }
          // }}
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

