import React, { Component } from 'react';
import TeamCard from '../TeamCard/TeamCard'
import { connect } from 'react-redux';
import RosterCard from '../RosterCard/RosterCard'
import './RosterContainer.scss'

export const RosterContainer = ({roster, getSinglePlayer, teamSchedule}) => {
  console.log('schedule in container-->', teamSchedule)
  const singleRoster = roster.map((roster) => {
    return <RosterCard {...roster}
                        getSinglePlayer = { getSinglePlayer } 
                        teamSchedule = { teamSchedule }
                        />
})

    return(
      <section className="section-rostercontainer">
        <h2>Today's Game</h2>
        <div className="roster__div--schedule">
          <div className="roster__div--home">
          <h3>Home Team: { teamSchedule.home.homeTeam }</h3>
        <h4>Wins { teamSchedule.home.homeWins }</h4>
        <h4>Losses{ teamSchedule.home.homeLosses }</h4>
        <h4>OTL: { teamSchedule.home.homeOT}</h4>
        </div>
        <div className="roster__div--away">
        <h3>Away Team: { teamSchedule.away.awayTeam }</h3>
        <h4>Wins: { teamSchedule.away.awayWins }</h4>
        <h4>Losses: { teamSchedule.away.awayLosses }</h4>
        <h4>OTL: { teamSchedule.away.awayOT}</h4>
        <h1>Roster</h1>
        </div>
        </div>
        {singleRoster}
      </section>
    )
}

export const mapStateToProps = (state) => ({
  teams: state.teams,
  roster: state.roster,
  teamSchedule: state.teamSchedule
})

export default connect(mapStateToProps)(RosterContainer);