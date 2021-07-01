import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Card, Table, Icon } from 'antd';

import { getAllUserData } from '../Actions/userActions';

function LeaderBoard ({ leaderBoard, getAllUserData }) {
  const [data, setData] = useState([]);
  useEffect(() => {
    if (leaderBoard && leaderBoard.length) {
      const finalData = leaderBoard.filter((leaderData) => {
        if (leaderData.userName && leaderData.userName.length) {
          return leaderData;
        }
      });
      setData(finalData);
    }
  }, [leaderBoard]);

  const columns = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      align: 'center'
    },
    {
      title: 'Games Won',
      dataIndex: 'wonGames',
      align: 'center'
    },
    {
      title: 'Games Lost',
      dataIndex: 'lostGames',
      align: 'center',
    },
    {
      title: 'Games Played',
      dataIndex: 'gamesPlayed',
      align: 'center',
    },
  ]
  return (
    <div style={{background: "linear-gradient(#1f3756, #141539)", height: '821px'}}>
      <h1 align= 'center' style={{ color: 'white' }}>Leader Board</h1>
      <Link style={{ color: "white"}} to={'/play'}>
        <Icon type="left" />
          Game
      </Link>
      <Card>
        <Table columns={columns} dataSource={data}/>
      </Card>
    </div>
  )
};

const mapStateToProps = (state) => {
  return {
    leaderBoard: state.leaderBoardReducer
  }
};

const mapDispatchProps = { getAllUserData };

export default connect(mapStateToProps, mapDispatchProps)(LeaderBoard);
