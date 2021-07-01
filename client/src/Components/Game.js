import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Layout, Row, Col, Icon, Card, message, Button } from 'antd';
import { useHistory } from "react-router-dom";

// import cards from
import { ReactComponent as Card1 } from '../Icons/BlueCard.svg';
import { setUserData } from '../Actions/userActions';

import './Game.css';

const { Header } = Layout;
function Game ({ user, setUserData }) {
  const history = useHistory();
  const [userData, setUser] = useState(null);
  const cardsArr = ['Cat', 'Defuse', 'Shuffle', 'Exploding'];
  const [currentCard, setCurrentCard] = useState('');
  const [defuseCount, setDefuseCount] = useState(0);
  const [lastCard, setLastCard] = useState(null);
  const [status, setStatus] = useState(null);
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [gamesPlayed, setGamesPlayed] = useState(0);
  const [leftSize, setLeftSize] = useState(5);
  const [isLeaderBoard, setIsLeaderBoard] = useState(false);

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      setState();
    }
  }, [userData]);

  // set data if data present for a user
  const setState = () => {
    setWinCount(userData.wonGames);
    setLoseCount(userData.lostGames);
    setGamesPlayed(userData.gamesPlayed);
    // if (userData.savedGames.defusingCards || userData.savedGames.remainingCards) {
    //   setDefuseCount(userData.savedGames.defusingCards);
    //   setLeftSize(userData.savedGames.remainingCards); 
    // }
  };

  const restartGame = () => {
    setLastCard('');
    setCurrentCard('');
    setDefuseCount(0);
    setLeftSize(5);
    setStatus(null);
  };

  const resetData = (current = currentCard) => {
    setLastCard(current);
    setCurrentCard('');
    setDefuseCount(0);
    setLeftSize(5);
    setStatus(null);
  };

  const handleFlip = () => {
    let tempLose = loseCount || 0;
    let tempWon = winCount || 0;
    let tempPlayed = gamesPlayed || 0;
    let tempRemainingCards = leftSize > 1 ? leftSize : 5;
    let tempDefuseCount = defuseCount|| 0;

    const randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
    const current = cardsArr[randomNumber];
    console.log('current', current, tempRemainingCards);
    setCurrentCard(current);
    if (tempRemainingCards > 1) {
      if (current === 'Defuse') {
        tempDefuseCount += 1;
        tempRemainingCards -= 1;
        setDefuseCount(defuseCount +1);
        setLeftSize(leftSize - 1);
      } else if (current === 'Shuffle') {
        tempDefuseCount = 0;
        tempRemainingCards = 0;
        resetData(current);
      } else if (current === 'Cat') {
        tempRemainingCards -= 1;
        setLeftSize(leftSize - 1);
      } else if (current === 'Exploding') {
        if (defuseCount > 0){
          tempDefuseCount -= 1;
          tempRemainingCards -= 1;
          setDefuseCount(defuseCount - 1);
          setLeftSize(leftSize - 1);
        } else {
          tempPlayed += 1;
          tempLose += 1;
          setStatus('Fail');
          setGamesPlayed(gamesPlayed +1);
          setLoseCount(loseCount + 1);
          restartGame();
        }
      } 
    } else {
      tempWon += 1;
      tempPlayed += 1; 
      setStatus('Won');
      setWinCount(winCount + 1);
      setGamesPlayed(gamesPlayed +1);
      message.info('Game is about to restart');
      restartGame();
    }
    setUserData({
      userName: userData.userName,
      savedGames: { remainingCards: tempRemainingCards, defusingCards: tempDefuseCount },
      wonGames: tempWon,
      lostGames: tempLose,
      gamesPlayed: tempPlayed
    });
  };

  return (
    <Layout style={{background: "linear-gradient(#1f3756, #141539)", height: '821px'}}>
      <Header>
        <Row type="flex" justify="space-between" align="end">
          <Col offset={20}span={4}>
            <Button onClick={() => setIsLeaderBoard(true)}>Leader Board</Button>
          </Col>
        </Row>
      </Header>
      
      <Row style={{marginTop: '100px'}}>
        <Col offset={8} span={10}>
        <h1 style={{color: 'white', fontSize:"50px"}}>Lets Begin</h1>
        </Col>
      </Row>
      <Row style={{marginTop: '50'}}>
        <Col offset={6}span={6}>
          <Card style={{ width: 200, height:70, backgroundColor: 'white'}}>
            <h1 style={{ marginTop: '-30px'}}>Win</h1>
            <h2>{winCount}</h2>
          </Card>
          </Col>
          <Col span={6}>
          <Card style={{ width: 200, height:70, backgroundColor: 'white'}}>
            <h1 style={{ marginTop: '-30px'}}>Lose Count</h1>
            <h2>{loseCount}</h2>
          </Card>
        </Col>
      </Row>
      <br/>
      <Row>
        <Col offset={6}span={18}>
        <Card style={{ width: 600, height: 300, backgroundColor: 'white'}}>
          <Col span={10}>
            <Icon  component={Card1} style={{ backgroundColor: 'white', fontSize: '200px', marginTop: '20px'}} onClick={handleFlip}/>
          </Col>
          <div className="verticalLine"></div>
          <Col span={14} style={{marginTop: '150px'}}>
            {<span><b>Current Card: {currentCard}</b></span>}
            <br/>
            {<span>Left: {leftSize}</span>} &ensp;&ensp; | &ensp;&ensp;
            {<span>Defuse Count: {defuseCount}</span>} | &ensp;&ensp;
            {<span>Last Card: {lastCard}</span>}
            {status && <span>Status: {status}</span>}
          </Col>
        </Card>
        </Col>
      </Row>
      { 
      isLeaderBoard &&
        history.push('/leaderboard')
      }
    </Layout>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
 };
 const mapDispatchToProps = { setUserData };

export default connect(mapStateToProps, mapDispatchToProps)(Game);
