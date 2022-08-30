import React, { Component } from "react";
import * as XLSX from "xlsx";
import { connect } from "react-redux";

function mapStateToProps(state) {
  return {
    DataTable: state.InfoTable.table,
    DataColums: state.InfoTable.columns,
  };
}

class ImportData extends Component {
  postdata = (columns, stringda) => {
    this.props.dispatch({
      type: "POSTDATA",
      dataColums: columns,
      dataString: stringda,
      checkAddCSV: true,
    });
  };

  // process CSV data
  processData = (dataString) => {
    const dataStringLines = dataString.split(/\r\n|\n/);
    const headers = dataStringLines[0].split(",");

    const list = [];
    for (let i = 1; i < dataStringLines.length; i++) {
      const row = dataStringLines[i].split(",");
      list.push(row);
    }
    // alert("CSV is added");
    this.postdata(headers, list);
  };

  // handle file upload
  handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (evt) => {
      /* Parse data */
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      /* Get first worksheet */
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      /* Convert array of arrays */
      const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
      this.processData(data);
    };
    reader.readAsBinaryString(file);
  };
  render() {
    return (
      <div>
        <script type="text/javascript" src="js/bootstrap-filestyle.min.js"/>
        <div className="mb-3">
        <input
          style={{borderColor:"#f46f20"}}
          className="form-control form-control-lg" 
          id="formFileLg"
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={this.handleFileUpload}
        />
      </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(ImportData);
