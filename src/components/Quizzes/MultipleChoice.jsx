import { 
  Picker,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  SectionList,
  StyleSheet,
  Modal

} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Button } from "react-native-paper";
import { MaterialIcons, AntDesign } from '@expo/vector-icons';


const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


const ListHeader = (item) => {
  return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{item}</Text>

      </View>
  );
};

const correctAnsArr = []





export default function MultipleChoice() {
  
  const [quizData, setQuizData] = useState([]);

  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  
  const [questCount, setQuestCount] = useState(0) // <-- increment 'onNext'
  const [scoreCount, setScoreCount] = useState(0) // <--- inc/decrement 'onNext'
  const [currQuestion, setCurrQuestion] = useState([])
  const [currAnswer, setCurrAnswer] = useState("")
  const [correctAns, setCorrectAns] = useState("")
  const [correctAnsArr, setCorrectAnsArr ] = useState([])
  
  
  const [clickedBtn, setClickedBtn] = useState(0) // top

  const [modalOpen, setModalOpen] =useState(false)
  
  const [currOptions, setcurrOptions] = useState([])
  const [currQName, setCurrQName] = useState("")
  let formatQns = []
  let formatOptns = []
  const formatQnsArr = []
  
  function reducer(state, action){


  }
  
  
  useEffect(() => {
    async function readQuizData() {
      const docRef = doc(db, "quizData", "pSf1qAQUlGaztNDrcBjB");
      console.log("Reading quizData in Firestore...");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const questionData = docSnap.data().results;
        // console.log(questionData, '<< initial questionData')
        console.log("quizData retrieved.");
        let newObject;
        // Add the correct answer to the incorrect_answers array at a random index between 0 and 2.
        questionData.forEach((questionData) => {
          const randomIndex = generateRandomNumber(0, 2);
          questionData.incorrect_answers.splice(randomIndex, 0, questionData.correct_answer);
          newObject = [{ ...newObject, [questionData.question]: questionData.correct_answer }];
        });
        setQuizData(questionData)

        // console.log(newObject, '<< newObject arr')
        questionData.forEach((question) => {
          formatQns.push({
            title : question.question,
            data : question.incorrect_answers,
            correct_option : question.correct_answer
          })
          
        })
        console.log(questionData[questCount].incorrect_answers, '<< questCount incorrectAnswers') // change this to "current Question state" dynamic question counter later
        formatOptns.push(questionData[questCount].incorrect_answers)
        formatOptns.map( (element, index) => {return { 'option': element} })
        
        //perform map on questionData - data:['option1,'option 2'] array so that we get [{option: "option1"}, {option: 'option2'}] 
        const formattedOptns = questionData[questCount].incorrect_answers.map((element, index) => {
          return {id: index,'option': element}
          
        }) 
        
        
        setCurrQuestion(formatQnsArr)
        setcurrOptions(formattedOptns)
      
  
        formatQnsArr.push(formatQns[questCount])

        const questionTitle = [{title: formatQns[questCount].title}]
        questionTitle.title = formatQns[questCount].title
        setCurrQName(questionTitle.title)

      }
    }
    readQuizData();
    // extract options data into array
  }, [questCount]);


  
  const myRefs = React.useRef([]);
  const ItemComp = (formattedOptns) => {
    // console.log(formattedOptns, '<< ItemComp-formattedOptns New X1')
    // console.log(currQuestion[0], '<< currQuestion[0]')
    const destructured = formattedOptns

    const highlight = (itemId, event) => {

        console.log(clickedBtn, 'clickedButton before myRef')
        myRefs.current[itemId].setNativeProps({style: {backgroundColor:'blue'}});
      
    }  
  

      return (
        <TouchableOpacity onPress={() => {updateState(formattedOptns.id);highlight(formattedOptns.id)}}>
            <View style={styles.listItem} ref={el => myRefs.current[formattedOptns.id] = el}>
          <Text style={styles.listText}>{formattedOptns.option}</Text>
  
        </View>
          </TouchableOpacity>
  
        
      )
  
    }


  const updateState = async (itemId) => {
    console.log(currQuestion[0].correct_option, '<< currQuestion.correct_option')
      if(currOptions[itemId].option === currQuestion[0].correct_option){
        console.log(scoreCount, '<<< scoreCount when correct before addition')
        await setScoreCount((scoreCount) +1)
        console.log(scoreCount, '<<< scoreCount when correct AFTER addition')
        myRefs.current[itemId].setNativeProps({style: {backgroundColor:'blue'}});
        // console.log(quizData, '<<< questionData')
        // console.log(quizData.length, '<<< questionData.length')
      }

  } 

  

  const NextComp = (finalAns, currQuestion) => {

    let nextButtonTitle = 'Next Question'
    if (questCount === quizData.length){
      nextButtonTitle =' '
    }
    
    const increaseQCount = () => {

      console.log(scoreCount, '<< scoreCount CORRECT NEXTcomp')
      if (questCount < quizData.length){
        setQuestCount(questCount+1)

      } 
      
    }

    const resetQCount = () => {
      setQuestCount(0)
      console.log(scoreCount, '<< before reset ScoreCount')
      setScoreCount(0)
      console.log(scoreCount, '<< after reset ScoreCount')
      // while(correctAnsArr > 0){
      //   correctAnsArr.pop()
      // }
      // console.log(correctAnsArr, ''<)
      
    }

    return(
      <View>
        <Button onPress={increaseQCount}>{nextButtonTitle}</Button>
  
        <Button onPress={resetQCount}>{'Restart quiz'}</Button>
        {/* <Button onPress={setModalOpen(true)}>{'show score'}</Button> */}

      </View>


    )
      
  }
  
  const ResultsModal = () => {


      return (
        <View>

          <Modal visible={modalOpen} animationType='slide'>
            <View>
            <AntDesign 
            name='close'
            size={24} 
            style={styles.modalToggle} 
            onPress={() => setModalOpen(false)} 
            text='hi'
          />
            <Text>You scored {scoreCount} out of {quizData.length} questions correctly! </Text>

            </View>

          </Modal>

          <AntDesign 
        name='checkcircleo' 
        size={24} 
        style={styles.modalToggle}
        onPress={() => setModalOpen(true)} 
      />

        </View>
      )
    
    



  }

  const renderzItem = ({ item },) => (
    <ItemComp option={item.option} id={item.id}/>
  )
  
    

  const ListItem = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{item}</Text>
      </View>
    );
  };



  return (
    
    <SafeAreaView>
      <Button>{'hi'}</Button>


      
      <FlatList
      data={currOptions}
      renderItem={renderzItem}
      keyExtractor={item => item.option}
      ListHeaderComponent={ListHeader(currQName)}
      />

      <NextComp />
      <ResultsModal />
      </SafeAreaView>


  );
};

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  list: {
    width: '100%',
  },
  listText: {
    color: 'white',
  },
  listHeaderText: {
    color: 'black',
  },
  listItem: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#9575cd',
    padding: 10,
    borderRadius: 5,
  },
  listHeader: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
  },
  listModal: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 5,
  },
  modalToggle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#f2f2f2',
    padding: 10,
    borderRadius: 10,
    alignSelf: 'center',
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  }

});