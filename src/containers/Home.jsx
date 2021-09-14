import React from 'react';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import initialState from '../utils/intitalState';
import CarouselItem from '../components/CarouselItem';

const Home = () => {
  console.log(initialState.trends);
  return (
    <>
      <Header />
      <Search />
      <Categories title="My favorites">
        <Carousel>
          {initialState.mylist.map((item) => (
            <CarouselItem key={item.id} {...item} isList={true} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Trends">
        <Carousel>
          {initialState.trends.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originals">
        <Carousel>
          {initialState.originals.map((item) => (
            <CarouselItem key={item.id} {...item} />
          ))}
        </Carousel>
      </Categories>
    </>
  );
};

export default Home;
