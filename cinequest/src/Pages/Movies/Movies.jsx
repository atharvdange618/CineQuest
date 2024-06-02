import React, { useState, useEffect } from 'react'
import axios from 'axios';
import CustomPagination from '../../Components/Pagination/CustomPagination';
import SingleContent from '../../Components/SingleContent/SingleContent';
import Genres from '../../Components/Genres/Genres';
import useGenre from '../../hooks/useGenre';

const Movies = () => {
    const [page, setPage] = useState(1);
    const [genres, setGenres] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const genreforURL = useGenre(selectedGenres);

    const fetchMovies = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );
        setContent(data.results)
        setNumOfPages(data.total_pages)
        console.log(data)
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchMovies();
    }, [page, genreforURL]);

    return (
        <div>
            <span className='pageTitle'>Movies</span>
            <Genres type="movie" selectedGenres={selectedGenres} setSelectedGenres={setSelectedGenres} genres={genres} setGenres={setGenres} setPage={setPage} />
            <div className='trending'>
                {
                    content && content.map((ele) => <SingleContent key={ele.id} id={ele.id} poster={ele.poster_path} title={ele.title || ele.name} date={ele.first_air_date || ele.release_date} media_type='movie' vote_average={ele.vote_average} />)
                }
            </div>
            {
                numOfPages > 1 && (<CustomPagination setPage={setPage} numOfPages={numOfPages} />)
            }
        </div>

    )
}

export default Movies