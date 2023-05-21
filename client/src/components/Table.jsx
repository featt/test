import React, { useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import useCurrRow from "@/hooks/useCurrRow";


const Table = ({ data, columnDefs }) => {
  const ref = useRef()
  const setRow = useCurrRow(state => state.setRow)
  const handleRowClick = () => {
    const selectedNodes = ref.current.api.getSelectedNodes();
    if (selectedNodes.length > 0) {
      setRow(selectedNodes[0].data);
      console.log(selectedNodes[0].data);
    }
  };
  return (
    <div className="p-4">
      <div className="rounded-lg bg-white p-4 shadow-lg">
        <div className="ag-theme-alpine h-80 w-full">
          <AgGridReact                      
            onRowClicked={handleRowClick}
            ref={ref}
            rowSelection="single"
            rowData={data}
            columnDefs={columnDefs}
            editType="fullRow"              
            onRowEditingStopped={(event) => setRow(event.data)}         
          />
        </div>
      </div>
     
    </div>
  );
};

export default Table;
