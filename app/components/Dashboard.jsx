import React/*, { Component, PropTypes }*/ from 'react';
import ChartComponent from './ChartComponent.jsx';

export default Dashboard = ( { data, options } ) => (
  <main is="dashboard">
    {data}
      { data.articles.hits.map( article =>
        <ChartComponent key={article._id} type="bar" data={article} options={options} />
      ) }
  </main>
);
