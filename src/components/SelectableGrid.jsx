import { useCallback } from "react";
import { useState } from "react";

const SelectableGrid = ({rows, cols}) => {

    const [isMouseDown, setIsMouseDown] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);

    const onMouseUp = () => {
        setIsMouseDown(false);
    }

    const onMouseDown = (boxIndex) => {
        setSelectedRows([boxIndex]);
        setIsMouseDown(true);
    }

    const onMouseEnter = useCallback((boxIndex) => {
        if(isMouseDown) {
            const boxStartIndex = selectedRows[0];
            const boxEndIndex = boxIndex;
            // console.log(boxStartIndex, boxEndIndex);
            const startRow = Math.floor((boxStartIndex-1)/cols);
            const startCol = (boxStartIndex-1)%cols;
            const endRow = Math.floor((boxEndIndex-1)/cols);
            const endCol = (boxEndIndex-1)%cols;
            // console.log(startCol, startRow, endCol, endRow);

            const minRow = Math.min(startRow, endRow);
            const maxRow = Math.max(startRow, endRow);
            const minCol = Math.min(startCol, endCol);
            const maxCol = Math.max(startCol, endCol);

            const selected=[];
            for(let row = minRow; row<=maxRow; row++)
            {
                for(let col = minCol; col<=maxCol; col++)
                {
                    selected.push(row * cols + col+1);
                }
            }
            console.log(selected);
            setSelectedRows(selected);
        }
    }, [isMouseDown])   

    return (
        <div className="grid" style={{gridTemplateRows : `repeat(${rows}, 35px)`, gridTemplateColumns: `repeat(${cols}, 35px)`}} onMouseUp={onMouseUp}>
            {
                [...Array(rows*cols).keys()].map((index) => {
                   return (
                    <div key={index} className={`box ${selectedRows.includes(index+1) ? "selected" : ""}`} onMouseDown={() => onMouseDown(index+1)} onMouseEnter={() => onMouseEnter(index+1)}>
                        {index+1}
                    </div>
                   )
                })
            }
        </div>
    )
}
export default SelectableGrid;