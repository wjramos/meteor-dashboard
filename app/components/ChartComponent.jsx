import React, { Component, PropTypes } from 'react';

import defaultProps from '../imports/defaultProps';

const isBrowser = typeof window !== 'undefined';
const Chart = isBrowser ? ( Chart || window.Chart || require( 'chart.js' ) ) : null;

export default class ChartComponent extends Component {
  constructor ( props, context ) {
    super( props, context );

    this.displayName = 'ChartComponent';
    this.refName     = 'chartContainer';
    this.state       = { mounted : false };
    this.refs        = {};
    this.chart;
  }

  initializeComponent ( force ) {
    if ( Chart && ( !this.chart || force ) ) {
      this.chart = new Chart(
        this.refs[ this.refName ],
        {
          type:    this.props.type,
          options: this.props.options,
          data:    {
            labels:   this.props.labels || Object.keys( this.props.data ),
            datasets: [
              {
                data: this.props.data
              }
            ]
          }
        }
      );
    }
  }

  componentDidMount ( ) {
    this.initializeComponent();
    this.state.mounted = true;
  }

  componentDidUpdate ( ) {
    this.chart.update();
  }

  componentWillReceiveProps ( ) {
    this._timer = setTimeout( ( ) => {
      this.state.mounted && this.forceUpdate();
    } );
  }

  componentWillUnmount ( ) {
    clearTimeout( this._timer );
    this.chart.destroy();
    this.state.mounted = false;
  }

  render ( ) {
    return ( <canvas ref={ this.refName } ></canvas> );
  }
}

ChartComponent.propTypes = {
  type:    PropTypes.string,
  labels:  PropTypes.array,
  data:    PropTypes.object,
  options: PropTypes.object
};

ChartComponent.defaultProps = defaultProps;
