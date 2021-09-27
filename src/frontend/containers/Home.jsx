import React from 'react';
import { connect } from 'react-redux';
import Categories from '../components/Categories';
import Header from '../components/Header';
import Search from '../components/Search';
import Carousel from '../components/Carousel';
import CarouselItem from '../components/CarouselItem';
import Footer from '../components/Footer';

const Home = ({ myList, trends, originals, history }) => {
  return (
    <>
      <Header isHome="isHome" />
      <Search />
      <Categories title="My favorites">
        <Carousel>
          {myList.map((item) => (
            <CarouselItem key={item._id} {...item} isList={true} history={history}/>
          ))}
        </Carousel>
      </Categories>
      <Categories title="Trends">
        <Carousel>
          {trends.map((item) => (
            <CarouselItem key={item._id} {...item} history={history} />
          ))}
        </Carousel>
      </Categories>
      <Categories title="Originals">
        <Carousel>
          {originals.map((item) => (
            <CarouselItem key={item._id} {...item} history={history}/>
          ))}
        </Carousel>
      </Categories>
      <Footer isHome="isHome" />
    </>
  );
};
export default connect(
  (state) => ({
    myList: state.myList,
    trends: state.searchTrends,
    originals: state.searchOriginals,
  }),
  null
)(Home);
