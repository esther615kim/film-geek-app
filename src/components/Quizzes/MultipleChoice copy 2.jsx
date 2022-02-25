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
import { useEffect, useState } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export default function MultipleChoice() {
  const [quizData, setQuizData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [questionsToCorrectAnswer, setQuestionsToCorrectAnswer] = useState({});
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [LISTDATA, setLISTDATA] = useState([])
  const [questAnsPair, setQuestAnsPair] = useState({})
  
  useEffect(() => {
    async function readQuizData() {
      const docRef = doc(db, "quizData", "pSf1qAQUlGaztNDrcBjB");
      // console.log("Reading quizData in Firestore...");
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const questionData = docSnap.data().results;
        // console.log("quizData retrieved.");
        let newObject;
        // Add the correct answer to the incorrect_answers array at a random index between 0 and 2.
        questionData.forEach((questionData) => {
          const randomIndex = generateRandomNumber(0, 2);
          questionData.incorrect_answers.splice(randomIndex, 0, questionData.correct_answer);
          newObject = { ...newObject, [questionData.question]: questionData.correct_answer };
        });
        setQuestAnsPair(newObject);
        const formatQns = []
        questionData.forEach((question) => {
          formatQns.push({
            title : question.question,
            data : question.incorrect_answers
          })
          
        })
        // console.log(formatQns, '<<< formatQns')
        setLISTDATA(formatQns)
        
        setQuizData(questionData);
        // console.log(questionData, '<<< questionData')
      }
  
    }
    readQuizData();
  }, []);
  // console.log(quizData, '<<< quizData')
  console.log(questAnsPair, '<< questAnsPair')


  const [selectedAns, setSelectedAns] = useState([])
    

  const ListItem = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{item}</Text>
      </View>
    );
  };

  const ListHeader = ({item}) => {
    return (
      <View style={styles.listHeader}>
        <Text style={styles.listHeaderText}>{item.title}</Text>
      </View>
    );
  };

  // const handleAnsChange = () => {
  //   useEffect(() => {
  //     if (selectedAns)
  //   })
  // }
  useEffect(() => {
    if (Object.values(questAnsPair).indexOf(selectedAns) > -1){
      console.log('correct ans')
    }

  },[selectedAns])


  const handlepress = (item) => {
    
    setSelectedAns(item)
    console.log(selectedAns, '<< selectedAns')
  
    // return console.log(item, '<< itemLog')


  }
  console.log(selectedAns, '<<, selectedAns')


  return (

    <SafeAreaView style={styles.parentView}>
      <SectionList
        style={styles.list}
        sections={LISTDATA}
        keyExtractor={(item, index) => item + index}
        // renderItem={({item}) => <ListItem item={item} />}
        renderItem={({item}) => 
        
        <TouchableOpacity onPress={() => handlepress(item)}>
          
                  <ListItem style={styles.item} item={item}></ListItem>


                </TouchableOpacity>
        }
        renderSectionHeader={({section}) =>  <ListHeader item={section}/>}
      />
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
    color: 'white',
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