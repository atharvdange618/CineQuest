import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SingleContent from '../../Components/SingleContent/SingleContent';
import './Trending.css'
import CustomPagination from '../../Components/Pagination/CustomPagination';

const Trending = () => {
    const [page, setPage] = useState(1)
    const [content, setContent] = useState([]);

    const fetchTrending = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.TMDB_API_KEY}&page=${page}`
            );
            setContent(data.results);
        } catch (error) {
            console.error("Error fetching trending data:", error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
    }, [page]);

    return (
        <div>
            <span className='pageTitle'>Trending</span>
            <div className='trending'>
                {
                    content && content.map((ele) => <SingleContent key={ele.id} id={ele.id} poster={ele.poster_path} title={ele.title || ele.name} date={ele.first_air_date || ele.release_date} media_type={ele.media_type} vote_average={ele.vote_average} />)
                }
            </div>
            <CustomPagination setPage={setPage} />
        </div>
    );
}

export default Trending;
