
import { getTeams, isLoading, hasError } from '../../actions';
import { bindActionCreators } from 'redux';
import { fetchTeams } from '../../apiCalls';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import TeamContainer from '../TeamContainer/TeamContainer';
import { Link } from 'react-router-dom';
import fullrink from '../../images/full-rink.jpeg'
// import paint from '../../images/paint.jpg'
import ice from '../../images/ice2.jpg';
import NavLogos from '../NavLogos/NavLogos'


const  Footer = () => {

    return(
      <section className="section-welcome">
        <div className="footer__div--links">
<Link to='/teams'className="footer__a--link"> 
  <h3>Teams</h3>
</Link>
<Link to='/standings' className="footer__a--link">
  <h3>Standings</h3>
</Link>
</div>
      </section>
    )
  }

  export default Footer