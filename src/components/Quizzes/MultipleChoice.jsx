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
import { Button } from "react-native-paper";

const generateRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};


const ItemComp = (formattedOptns) => {
  console.log(formattedOptns), '<< ItemComp-formattedOptns'
  const destructured = formattedOptns

    return (
      <View style={styles.listItem}>
        <TouchableOpacity>
        <Text style={styles.listText}>{formattedOptns.title}</Text>

        </TouchableOpacity>
      </View>

      
    )

}


export default function MultipleChoice() {
  const [quizData, setQuizData] = useState([]);
  const [selectedValue, setSelectedValue] = useState("");
  const [questionsToCorrectAnswer, setQuestionsToCorrectAnswer] = useState({});
  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);
  const [LISTDATA, setLISTDATA] = useState([])

  const [currQuestion, setCurrQuestion] = useState([])
  const [currOptions, setcurrOptions] = useState([])

  const [questAnsPair, setQuestAnsPair] = useState({})
  const [currQName, setCurrQName] = useState([])
  const formatQns = []
  const formatOptns = []
  
  useEffect(() => {
    async function readQuizData() {
      const docRef = doc(db, "quizData", "pSf1qAQUlGaztNDrcBjB");
      console.log("Reading quizData in Firestore...");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const questionData = docSnap.data().results;
        console.log(questionData, '<< initial questionData')
        console.log("quizData retrieved.");
        let newObject;
        // Add the correct answer to the incorrect_answers array at a random index between 0 and 2.
        questionData.forEach((questionData) => {
          const randomIndex = generateRandomNumber(0, 2);
          questionData.incorrect_answers.splice(randomIndex, 0, questionData.correct_answer);
          newObject = [{ ...newObject, [questionData.question]: questionData.correct_answer }];
        });

        //arr of objects for each question with key:value  'question': 'answer'
        setQuestAnsPair(newObject); 
        // console.log(newObject, '<< newObject arr')
        questionData.forEach((question) => {
          formatQns.push({
            title : question.question,
            data : question.incorrect_answers,
            correct_option : question.correct_answer
          })
          
        })
        formatOptns.push(questionData[0].incorrect_answers)
        formatOptns.map( (element) => {return {'option': element} })
        

        const formattedOptns = questionData[0].incorrect_answers.map((element) => {
          return {'option': element}
          
        }) 

        
        setcurrOptions(formattedOptns)
  

        setLISTDATA(formatQns)
        console.log(LISTDATA, '<< listDatahi')
        const formatQnsArr = []
        formatQnsArr.push(formatQns[0])
        setCurrQuestion(formatQnsArr)


        const questionTitle = [{title: 'anything'}]
        questionTitle.title = formatQns[0].title
        setCurrQName(questionTitle)


      }
  
    }
    readQuizData();
    // extract options data into array




  }, []);
  
  const renderzItem = ({ item }) => (
    <ItemComp title={item.option}/>
  )
  
  



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


  return (
    
    <SafeAreaView>
      <Button>{'hi'}</Button>


        
      <Text style={styles.listHeaderText}>{'question 1'}</Text>

      
      <FlatList
      data={currOptions}
      renderItem={renderzItem}
      keyExtractor={item => item.option}
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