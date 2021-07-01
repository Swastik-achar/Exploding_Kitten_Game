import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Card, Table, Row, Col, Icon } from 'antd';

import { getAllUserData } from '../Actions/userActions';

function LeaderBoard ({ leaderBoard, getAllUserData }) {
  const [data, setData] = useState([]);
  const history = useHistory();
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
      {/* <Button style={{ borderRadius: '10px', border: 'none', boxShadow: '6px 6px 30px #d0d3d630' }}
        onClick ={() => history.push('/play')}>
        <Row type="flex" justify="start" >
          <Col span={5} style={{ fontSize: '10px' }}>
            <Tooltip placement='bottom' >
              <Icon type="left" />
            </Tooltip>
          </Col>  
        </Row>
      </Button> */}
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
