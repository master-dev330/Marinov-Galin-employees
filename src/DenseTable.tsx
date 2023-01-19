import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {format} from 'date-fns';

export default function DenseTable({tableRows, tableValues}:{tableRows: string[], tableValues: Array<Array<string>>}) {
    console.log("tableValues: ", tableValues); console.log("tableRows: ", tableRows);
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
                {tableRows.map((row, index) => (            
                    <TableCell key={index}>{row}</TableCell>
                ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableValues.map((value, index) => (
                <TableRow
                    key={index}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                    {/* {value.map((val, i) => {
                        return <TableCell key={i}>{val.trim()}</TableCell>;
                    })} */}
                    <TableCell>{value[0].trim()}</TableCell>
                    <TableCell>{value[1].trim()}</TableCell>
                    <TableCell>{format(new Date(value[2].trim()), 'yyyy/mm/dd')}</TableCell>
                    <TableCell>{format(new Date(value[3].trim()), 'yyyy/mm/dd')}</TableCell>
                </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }