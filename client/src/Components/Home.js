import React, { useState } from 'react';
import { Layout, Button, Row, Col, Input, Modal } from 'antd';
import { connect } from 'react-redux';
import { useHistory } from "react-router-dom";
import { getUser } from '../Actions/userActions';
import Game from './Game';


function Home({ user, getUser }) {
  const history = useHistory();
  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState('');
  const [isPlay, setIsPlay] = useState(false);

  const handleOk = async () => {
    const isComplete = await getUser(name, history);
    setIsVisible(false);
    if (isComplete) {
      setIsPlay(true);
    }
  };


  return (
    <Layout style={{background: "linear-gradient(#1f3756, #141539)", height: '821px'}}>
      <Row style={{marginTop: '300px'}}>
        <Col offset={8} span={10}>
        <h1 style={{color: 'white', fontSize:"50px"}}>Exploding Kitten Game</h1>
        </Col>
       
      </Row>
      <br/>
      <br/>
      <Row>
        <Button
        style={{ marginLeft: '650px'}}
        onClick={() => setIsVisible(true)}
        type="primary">
          Let's Play
        </Button>
      </Row>

      <Modal
        visible={isVisible}
        onOk={handleOk}
        onCancel={() => setIsVisible(false)}
      >
        <Row>
          <label required>Enter name</label>
        </Row>
        <Row>
          <Input 
            type="text"
            placeholder="Enter your name"
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
        </Row>
      </Modal>
      { isPlay && <Game />}
    </Layout>
  )
};

const mapStateToProps = (state) => {
  return {
    user: state.userReducer
  }
 };

 const mapDispatchToProps = { getUser };

export default connect(mapStateToProps, mapDispatchToProps)(Home);