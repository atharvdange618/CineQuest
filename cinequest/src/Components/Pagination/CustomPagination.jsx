import React from 'react'
import Pagination from '@mui/material/Pagination';
import { createMuiTheme } from '@mui/material';

const darkTheme = createMuiTheme

const CustomPagination = ({ setPage, numOfPages = 10 }) => {
    const handlePageChange = (page) => {
        setPage(page)
        window.scroll(0, 0)
    }

    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Pagination
                count={numOfPages}
                onChange={(e) => handlePageChange(e.target.textContent)}
                hideNextButton
                hidePrevButton
                color='primary'
            />
        </div>
    )
}

export default CustomPagination