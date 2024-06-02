import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TextField } from '@mui/material';
import { Button } from '@mui/base';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../Components/SingleContent/SingleContent';

const Search = () => {
    const [type, setType] = useState(0);
    const [page, setPage] = useState(1);
    const [searchText, setSearchText] = useState('');
    const [content, setContent] = useState();
    const [numOfPages, setNumOfPages] = useState();

    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=67e3ccc54bfa63bf2f38ece43af5fe80&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setContent(data.results);
            setNumOfPages(data.total_pages);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
    }, [type, page]);

    return (
        <div>

            <div style={{ display: 'flex', margin: "15px 0" }}>
                <TextField
                    style={{ flex: 1 }}
                    className="searchBox"
                    label="Search"
                    variant="filled"
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button variant='contained' style={{ marginLeft: 10, padding: '10px' }} onClick={fetchSearch}> <SearchIcon /> </Button>
            </div>

            <Tabs value={type} indicatorColor='primary' textColor='primary' onChange={(event, newValue) => {
                setType(newValue)
                setPage(1);
            }}
                style={{ paddingBottom: 5 }}
            >
                <Tab style={{ width: '50%' }} label="Search Movies" />
                <Tab style={{ width: '50%' }} label="Search TV Series" />
            </Tabs>
            <div className='trending'>
                {
                    content && content.map((ele) => <SingleContent key={ele.id} id={ele.id} poster={ele.poster_path} title={ele.title || ele.name} date={ele.first_air_date || ele.release_date} media_type={type ? "tv" : "movie"} vote_average={ele.vote_average} />)
                }
            </div>
            {
                searchText && !content && (type ? <h2>No Series Found</h2> : <h2>No Movies Found</h2>)
            }
            {
                numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)
            }
        </div>
    )
}

export default Search