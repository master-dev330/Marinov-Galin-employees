import React from "react";
import FileUpload from "react-mui-fileuploader";
import "./index.css";
import Papa from "papaparse";
import DenseTable from "./DenseTable";


interface Idata {
  EmpID: string,
  ProjectID: string,
  DateFrom: string,
  DateTo: string
};

interface Ivalues {
  data: Idata[]
};

export default function App() {

  // State to store parsed data
  const [parseData, setParseData] = React.useState<Idata[]>([]);
  // State to store table Column name
  const [tableRows, setTableRows] = React.useState<string[]>([]);
  // State to store the values
  const [values, setValues] = React.useState<Array<Array<string>>>([]);

  const handleFileUploadError = (error: any) => {
    // Do something...
  };

  const handleFilesChange = (files: any) => {
    // Do something...
    console.log(files);

    if(files[0] !== undefined) {
      Papa.parse(files[0], {
        header: true,
        download: true,
        skipEmptyLines: true,
        delimiter: ",",
        complete: function(results: Ivalues) { console.log("results: ", results);
          let rowsArray: any[] = [];
          const valuesArray: any[] = [];
          
          rowsArray = [ ...Object.keys(results.data[0])];

          results.data.map((d: Idata) => {
            // rowsArray.push(Object.keys(d));
            valuesArray.push(Object.values(d));
          });
          console.log("rowsArray: ", valuesArray);
          // // Parsed Data Response in array format
          setParseData(results.data);
          // // Filtered Column Names
          setTableRows(rowsArray);
          // // Filtered Values
          setValues(valuesArray);
        }
      });
    }
  };

  return (
    <div>
      <FileUpload
        getBase64={false}
        multiFile={true}
        disabled={false}
        title="My awesome file uploader"
        header="[Drag to drop]"
        leftLabel="or"
        rightLabel="to select files"
        buttonLabel="click here"
        buttonRemoveLabel="Remove all"
        maxFileSize={0}
        maxUploadFiles={0}
        maxFilesContainerHeight={357}
        acceptedType={"image/*"}
        errorSizeMessage={"fill it or remove it to use the default error message"}
        //allowedExtensions={["jpg", "jpeg"]}
        onFilesChange={handleFilesChange}
        onError={handleFileUploadError}
        //imageSrc={'path/to/custom/image'}
        BannerProps={{ elevation: 0, variant: "outlined" }}
        onContextReady={(context: any) => {}}
        PlaceholderGridProps={{ md: 6 }}
        LabelsGridProps={{ md: 6 }}
        ContainerProps={{
          elevation: 0,
          variant: "outlined",
          sx: { p: 1 }
        }}
        placeholderImageDimension={{
          xs: { width: 128, height: 128 },
          sm: { width: 128, height: 128 },
          md: { width: 164, height: 164 },
          lg: { width: 256, height: 256 }
        }}
      />
      <br />
      <br />
      <DenseTable tableRows={tableRows} tableValues={values} />
    </div>
  );
}
