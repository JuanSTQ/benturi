import React from 'react';
import { connect } from 'react-redux';
import { searchAction } from '../actions';
import '../assets/styles/components/Search.scss';

const Search = ({searchAction}) => {
  const onHandleChange = (e)=>{
    searchAction({value: e.target.value})
  }
  return (
    <section className="main">
      <h2 className="main__title">¿Qué quieres ver hoy?</h2>
      <input type="text" className="input" name="search" onChange={onHandleChange} placeholder="Buscar..." />
    </section>
  );
};

export default connect(null, {searchAction})(Search);
