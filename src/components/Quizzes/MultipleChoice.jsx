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
} from "react-native";
import React, { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Button } from "react-native-paper";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


  // highlight Function start -------------
  
  const highlight1 = (itemId) => {
    const myRefs = React.useRef([]); 

    let clickedBtn = 1
    console.log(itemId,'<<< highlight props itemId') 

      myRefs.current[itemId].setNativeProps({style: {backgroundColor:'green'}});

    console.log(clickedBtn,'<<< itemId') 

    const resetColors = () => {
        myRefs.current.forEach(ref => 
            ref.setNativeProps({style:{backgroundColor:'transparent'}})
        );
      }
  }
  
// highlight Function end --------------

const ListHeader = (item) => {
  console.log(item, '<<< ListHeader item')
  return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{item}</Text>

      </View>
  );
};

const correctAnsArr = []



export default function MultipleChoice() {
  const [quizData, setQuizData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [questionsToCorrectAnswer, setQuestionsToCorrectAnswer] = useState({});
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [LISTDATA, setLISTDATA] = useState([])

  const [questCount, setQuestCount] = useState(0) // <-- increment 'onNext'
  const [scoreCount, setScoreCount] = useState(0) // <--- inc/decrement 'onNext'
  const [currQuestion, setCurrQuestion] = useState([])
  const [currAnswer, setCurrAnswer] = useState("")
  const [correctAns, setCorrectAns] = useState("")



  const [currOptions, setcurrOptions] = useState([])
  const [questAnsPair, setQuestAnsPair] = useState({})
  const [currQName, setCurrQName] = useState("")
  let formatQns = []
  let formatOptns = []

  //button-click
  const [clickedBtn, setClickedBtn] = useState([]) // top
  // const myRefs = React.useRef([]); // <<--- myRefs not found when rendered outside
  
  // -----------------------
  
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
        //arr of objects for each question with key:value  'question': 'answer'
        setQuestAnsPair(newObject); // << may remove
        
        // console.log(newObject, '<< newObject arr')
        questionData.forEach((question) => {
          formatQns.push({
            title : question.question,
            data : question.incorrect_answers,
            correct_option : question.correct_answer
          })
          
        })
        console.log(questionData[questCount].incorrect_answers, '<< questCount incorrectAnswers') // change this to "current Question state" dynamic question counter later
        // const [questionCounter, setQuestionCounter] = useState(0)..then rewrite below as..
        //formatOptns.push(questionData[questionCounter].incorrect_answers)
        formatOptns.push(questionData[questCount].incorrect_answers)
        formatOptns.map( (element, index) => {return { 'option': element} })
        
        //perform map on questionData - data:['option1,'option 2'] array so that we get [{option: "option1"}, {option: 'option2'}] 
        const formattedOptns = questionData[questCount].incorrect_answers.map((element, index) => {
          return {id: index,'option': element}
          
        }) 

        

        // console.log(formatOptnsObj, '<< formatOptnsObj')
        console.log(formatOptns, '<< formatOptns postMarrrch1')
        // console.log(formattedOptns, '<< formattedOptns X1')
        await setcurrOptions(formattedOptns)
        console.log(currOptions, '<< currOptions pls')
  

        // console.log(formatQns, '<<< formatQns 58')
        setLISTDATA(formatQns)
        console.log(LISTDATA, '<< listDatahi')
        const formatQnsArr = []
        formatQnsArr.push(formatQns[questCount])
        setCurrQuestion(formatQnsArr)
        
        console.log(currQuestion[questCount].correct_option, '<< currQuestion.correct_option ')
        setCorrectAns(currQuestion[questCount].correct_option)
        console.log(correctAns, '<< correctAns state') 

        // console.log(formatOptns, '<<formatOptns')
        console.log(setcurrOptions, '<<< setcurrOptions')

        const questionTitle = [{title: formatQns[questCount].title}]
        questionTitle.title = formatQns[questCount].title
        setCurrQName(questionTitle.title)
        console.log(currQName, '<<< currQName')
        console.log(questionTitle, '<<questionTitle')
      }
    }
    readQuizData();
    // extract options data into array
  }, [questCount]);
  

  const resetColors = () => {
    myRefs.current.forEach(ref => 
        ref.setNativeProps({style:{backgroundColor:'transparent'}})
    );
  }
  
  const myRefs = React.useRef([]);
  const ItemComp = (formattedOptns) => {
    console.log(formattedOptns, '<< ItemComp-formattedOptns New X1')
  
    // const [clickedBtn, setClickedBtn] = useState([])
    const destructured = formattedOptns
    // console.log(formattedOptns.id, '<< formattedOptnsi1')
    
    const highlight = (itemId) => {
      //-------****next: Look at how to integrate the changed state function

      console.log(clickedBtn, '<< clickedBtn before')
      console.log(itemId,'<<< highlight props itemId') 
      if (clickedBtn === itemId){
  
        setClickedBtn(itemId)
        myRefs.current[clickedBtn].setNativeProps({style: {backgroundColor:'green'}});
        console.log(clickedBtn, '<< clickedBtn afterClick with sameId')
        console.log(currOptions[clickedBtn].option, '<< formattedOptns.title')
        setCurrAnswer(currOptions[clickedBtn].option)
        console.log(currAnswer, '<<< currAnswer after setCurrAnswer')
      } 
      else{
        setClickedBtn(itemId)
        console.log(clickedBtn, 'clickedButton before myRef')
          myRefs.current[itemId].setNativeProps({style: {backgroundColor:'transparent'}});
      //     myRefs.current[itemId].setNativeProps({style: {backgroundColor:'green'}});
          console.log(clickedBtn, '<< clickedBtn afterClick with DIFFERENCT Id')

      } 
    }  
      return (
        <TouchableOpacity onPress={() => highlight(formattedOptns.id)}>
            <View style={styles.listItem} ref={el => myRefs.current[formattedOptns.id] = el}>
          <Text style={styles.listText}>{formattedOptns.option}</Text>
  
        </View>
          </TouchableOpacity>
  
        
      )
  
    }
    
  
  const NextComp = (finalAns, currQuestion) => {
    const finalAnswer = 'hi'
    console.log(questAnsPair, '<< questAnsPair NextComp')
    console.log(currAnswer, '<< NextComp currAnswer')


    // useEffect(() => {
      if (currAnswer == correctAns){
        console.log('correctly answered')
        correctAnsArr.push(currAnswer)
        console.log(correctAnsArr.length, '<< correctAnsArr.length')

        console.log(scoreCount, 'scoreCount before addition')
        
        console.log(scoreCount, '<<< scoreCount increased')

      }
      
    
    const increaseQCount = () => {
      setQuestCount(questCount+1)
    }

    const resetQCount = () => {
      setQuestCount(0)
      
    }

    return(
      <View>
        <Button onPress={increaseQCount}>{'Next Question'}</Button>
  
        <Button onPress={resetQCount}>{'Restart quiz'}</Button>

      </View>

    )
      
  }
  

  const renderzItem = ({ item },) => (
    <ItemComp option={item.option} id={item.id}/>
  )
  

  const [selectedAns, setSelectedAns] = useState([])
    

  const ListItem = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{item}</Text>
      </View>
    );
  };



  

  // const handleAnsChange = () => {
  //   useEffect(() => {
  //     if (selectedAns)
  //   })
  // }
  // useEffect(() => {
  //   if (Object.values(questAnsPair).indexOf(selectedAns) > -1){
  //     console.log('correct ans')
  //   }

  // },[questCount])

  

  const handlepress = (item) => {
    
    setSelectedAns(item)
    console.log(selectedAns, '<< selectedAns')
  
    // return console.log(item, '<< itemLog')


  }
  console.log(selectedAns, '<<, selectedAns')
  console.log(currQName, '<< currQName')


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
});