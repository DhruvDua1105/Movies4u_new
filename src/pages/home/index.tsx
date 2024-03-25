import React, { useContext, useState } from "react";
import Layout from "../../Layout";
import { Box, Paper, InputBase, InputAdornment, Typography } from "@mui/material";
import SearchIcon from "../../assets/icons/icon-search.svg"
import MovieTrendList from "../../components/movie-list/movieTrendList";
import MovieList from "../../components/movie-list/index";
import { MovieContext } from "../../context/movie-context";
import { MovieDataType } from "../../assets/data";


export default function Home() {
      const [search, setSearch] = useState('');
      const {state} = useContext(MovieContext)
      const {movies}=state;
      const [searchList,setSearchList] = useState<MovieDataType[]>([]);
      console.log(movies);
      const trendingList = movies.filter((item)=>item.isTrending===true)
      const recommendList = movies.filter((item)=>item.isTrending!==true)
      const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearch(e.target.value);
            const newList = movies.filter((movie)=>movie.title.toLowerCase().includes(search.toLowerCase()));
            setSearchList(newList);
      }
      return (
            <div>
                  <Layout>
                        <Box>
                              <Paper
                                    component="form"
                                    sx={{
                                          display: "flex",
                                          alignItems: "center",
                                          borderRadius: "default",
                                          p: 1,
                                          backgroundColor: "#10141f",
                                          border: "none",
                                          color: "white",
                                    }}
                              >
                                    <InputBase
                                          placeholder="Search for Movies or TV Series"
                                          sx={{
                                                ml: 1,
                                                flex: 1,
                                                color: "white",
                                                border: "hidden",
                                          }}
                                          value={search}
                                          onChange={handleChange}
                                          startAdornment={
                                                <InputAdornment position="start">
                                                      <img src={SearchIcon} alt="search-icon" width={20} height={20} ></img>
                                                </InputAdornment>
                                          }
                                    />
                              </Paper>
                        </Box>
                        <Box py={2} px={4}>
                              {search === "" ? (
                                    <Box width="100%">
                                          <Box width="100%">
                                                <Typography variant="h5" component="h1" my={6} fontWeight={400}>
                                                      Trending
                                                </Typography>
                                                <MovieTrendList trendingList={trendingList} />
                                          </Box>
                                          <Box width="100%">
                                                <Typography variant="h5" component="h1" my={6} fontWeight={400}>
                                                      Recommended For You
                                                </Typography>
                                                <MovieList recommendList={recommendList} />
                                          </Box>
                                    </Box>
                              ) : (
                                    <Box width="100%">
                                          <Typography>
                                                Found {searchList.length} results for "{search}"{""}
                                          </Typography>
                                          <MovieList recommendList={searchList} />
                                    </Box>
                              )}
                        </Box>

                  </Layout>
            </div>
      );
}
