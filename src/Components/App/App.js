import { getTeams, isLoading, hasError, getRoster, getPlayer, getTeamSchedule } from '../../actions';
import { bindActionCreators } from 'redux';
import { fetchTeams, fetchRoster, fetchPlayer, fetchPlayerStats, fetchTeamSchedule, fetchPlayerProjections } from '../../apiCalls';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import './App.css';
import TeamContainer from '../TeamContainer/TeamContainer';
import { Route } from 'react-router-dom';
import WelcomePage from '../WelcomePage/WelcomePage'
import NavLogos from '../NavLogos/NavLogos'
import RosterContainer from '../RosterContainer/RosterContainer';
import Player from '../Player/Player';
import Footer from '../Footer/Footer';
import FavoritePlayersContainer from '../FavoritePlayersContainer/FavoritePlayersContainer'


export class App extends Component {
  componentDidMount = async () => {
    const { getTeams, hasError, isLoading } = this.props;
    try {
      const teams = await fetchTeams();
      console.log('teams in app--->', teams)
      getTeams(teams);
    } catch (error) {
      console.log('error')
    }
  }

  getSingleRoster = async(id) =>{
    const { getRoster } = this.props;
    try {
      const roster = await fetchRoster(id);
      getRoster(roster)
    } catch(error) {
      console.log('error')
    }
  }


  getSinglePlayer = async(e, id) => {
    this.getSinglePlayerStats(e, id)
    const { getPlayer } = this.props;
    try {
      const player = await fetchPlayer(id);
      getPlayer(this.cleanUpPlayer(player))
    } catch(error) {
      console.log('error')
    }
  }

  getSinglePlayerStats = async(id) => {
    const { getPlayerStats } = this.props;
    try {
      const player = await fetchPlayerStats(id);
      getPlayerStats(this.cleanUpPlayerStats(player))
    } catch(error) {
      console.log('error')
    }
  }

  cleanUpPlayer = (player) => {
    return {
      id: player.id,
      fullName: player.fullName,
      active: player.active,
      captain: player.captain,
      height: player.height,
      weight: player.weight,
      birthCity: player.birthCity,
      birthStateProvince: player.birthStateProvince,
      birthCountry: player.birthCountry,
      currentAge: player.currentAge,
      rosterStatus: player.rosterStatus,
      shootsCatches: player.shootsCatches,
      
    }
  }

  handlelinkclicks = (e) => {
    e.stopPropagation()
  }

  render() {
    return(
      <section className="section-app">
        <Route exact path='/' render={() => 
          <>
          <WelcomePage key={Date.now()} getSingleRoster={this.getSingleRoster} />
       
          </>
        }/>
          
        <Route exact path='/teams' render={() => 
        <>
          <TeamContainer 
            key={Date.now()}
            getSingleRoster={this.getSingleRoster} 
            getSingleTeamSchedule={this.getSingleTeamSchedule} 
            handlelinkclicks={this.handlelinkclicks}  />
          </>} />

        <Route exact path='/roster' render={() => 
          <>
          <RosterContainer 
            key={Date.now()}
            getSinglePlayer={this.getSinglePlayer}  
            /> </>} />

        <Route exact path='/player' render={() => 
        <>
          <Player key={Date.now()} />
          </>} />
        <Route exact path='/favorites' render={() => 
          <FavoritePlayersContainer key={Date.now()} />}/>

        <Footer />
      </section>
    )
  }

}

export const mapStateToProps = (state) => ({
  teams: state.teams,
  errorMsg: state.errorMsg,
});

export const mapDispatchToProps = (dispatch) => (
  bindActionCreators({
    getTeams,
    hasError,
    isLoading,
    getRoster,
    getPlayer,
    getTeamSchedule
  }, dispatch)
)

export default connect(mapStateToProps, mapDispatchToProps)(App)
