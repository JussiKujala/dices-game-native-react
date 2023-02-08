import React, { useState, useEffect, useCallback } from 'react';
import { Text, View, Pressable } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import styles from '../style/style';

let board = [];
const NBR_OF_DICES = 5;
const NBR_OF_THROWS = 5;

export default Gameboard = () => {

  const [nbrOfThrowsleft, setNbrOfThrowsleft] = useState(NBR_OF_THROWS);
  const [status, setStatus] = useState('');
  const [selectedDices, setSelectedDices] = 
    useState(new Array(NBR_OF_DICES).fill(false));

function getDiceColor(i){
  if (board.every((val, i, arr) => val === arr[0])){
    return "orange";
  }
  else{
    return selectedDices[i] ? "black" : "steelblue"
  }
}

const selectDice = (i) => {
  let dices = [...selectedDices];
  dices[i] = selectedDices[i] ? false : true;
  setSelectedDices(dices);
}



  const row = [];
  for (let i = 0; i < NBR_OF_DICES; i++) {
    row.push(
      <Pressable
      key={"row" + i}
      onPress={() => selectDice(i)}>
      <MaterialCommunityIcons 
        name={board[i]}
        key={"row" + i}
        size={50}
        color={getDiceColor(i)}
      />
      </Pressable>
    );
  }

  useEffect(() => {
    checkWinner();
    if (nbrOfThrowsleft === NBR_OF_THROWS) {
      setStatus('Game has not started');
    }
    if (nbrOfThrowsleft < 0) {
      setNbrOfThrowsleft(NBR_OF_THROWS-1);
    }
  }, [nbrOfThrowsleft]);

  const throwDices = () => {
    for (let i = 0; i < NBR_OF_DICES; i++) {
      if(!selectedDices[i]){
      let randomNumber = Math.floor(Math.random() * 6 + 1);
      board[i] = 'dice-' + randomNumber;
      }
    }
    setNbrOfThrowsleft(nbrOfThrowsleft-1);
  }

  const checkWinner = () => {
    if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsleft > 0){
      setStatus('You won');
    }
    else if (board.every((val, i, arr) => val === arr[0]) && nbrOfThrowsleft === 0){
      setStatus('You won, game over')
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else if (nbrOfThrowsleft === 0) {
      setStatus('Game over');
      setSelectedDices(new Array(NBR_OF_DICES).fill(false));
    }
    else {
      setStatus('Keep on throwing');
    }
  }

  return(
    <View style={styles.gameboard}>
      <View style={styles.flex}>{row}</View>
        <Text style={styles.gameinfo}>Throws left: {nbrOfThrowsleft}</Text>
        <Text style={styles.gameinfo}>{status}</Text>
        <Pressable style={styles.button} onPress={() => throwDices()}>
          <Text style={styles.buttonText}>Throw dices</Text>
        </Pressable>
    </View>
  )
}