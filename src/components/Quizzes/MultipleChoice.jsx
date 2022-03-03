import {
  Picker,
  View,
  Text,
  SafeAreaView,
  StatusBar,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  SectionList,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect, useState, useReducer } from "react";
import { Divider, Subheading } from "react-native-paper";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Button } from "react-native-paper";
import { MaterialIcons, AntDesign } from "@expo/vector-icons";

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

const correctAnsArr = [];

export default function MultipleChoice() {
  const [quizData, setQuizData] = useState([]);

  const [numCorrectAnswers, setNumCorrectAnswers] = useState(0);

  const [questCount, setQuestCount] = useState(1); // <-- increment 'onNext'
  const [scoreCount, setScoreCount] = useState(0); // <--- inc/decrement 'onNext'
  const [currQuestion, setCurrQuestion] = useState([]);
  const [currAnswer, setCurrAnswer] = useState("");
  const [correctAns, setCorrectAns] = useState("");
  const [correctAnsArr, setCorrectAnsArr] = useState([]);

  const [clickedBtn, setClickedBtn] = useState(0); // top

  const [modalOpen, setModalOpen] = useState(false);

  const [currOptions, setcurrOptions] = useState([]);
  const [currQName, setCurrQName] = useState("");
  let formatQns = [];
  let formatOptns = [];
  const formatQnsArr = [];

  function reducer(state, action) {}

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
        setQuizData(questionData);

        questionData.forEach((question) => {
          formatQns.push({
            title: question.question,
            data: question.incorrect_answers,
            correct_option: question.correct_answer,
          });
        });
        // change this to "current Question state" dynamic question counter later
        formatOptns.push(questionData[questCount].incorrect_answers);
        formatOptns.map((element, index) => {
          return { option: element };
        });

        //perform map on questionData - data:['option1,'option 2'] array so that we get [{option: "option1"}, {option: 'option2'}]
        const formattedOptns = questionData[questCount].incorrect_answers.map((element, index) => {
          return { id: index, option: element };
        });

        setCurrQuestion(formatQnsArr);
        setcurrOptions(formattedOptns);

        formatQnsArr.push(formatQns[questCount]);

        const questionTitle = [{ title: formatQns[questCount].title }];
        questionTitle.title = formatQns[questCount].title;
        setCurrQName(questionTitle.title);
      }
    }
    readQuizData();
    // extract options data into array
  }, [questCount]);

  const myRefs = React.useRef([]);
  const ItemComp = (formattedOptns) => {
    const destructured = formattedOptns;

    const highlight = (itemId, event) => {
      myRefs.current[itemId].setNativeProps({ style: { border: "2px solid #58e065" } });
    };

    return (
      <View style={{ backgroundColor: "#0a152b", color: "#fff" }}>
        <TouchableOpacity
          onPress={() => {
            updateState(formattedOptns.id);
            highlight(formattedOptns.id);
          }}
        >
          <View style={styles.listItem} ref={(el) => (myRefs.current[formattedOptns.id] = el)}>
            <Text style={styles.listText}>{formattedOptns.option}</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  const updateState = async (itemId) => {
    if (currOptions[itemId].option === currQuestion[0].correct_option) {
      await setScoreCount(scoreCount + 1);
      myRefs.current[itemId].setNativeProps({ style: { backgroundColor: "blue" } });
    }
  };

  const NextComp = (finalAns, currQuestion) => {
    let nextButtonTitle = "Next Question";
    if (questCount === quizData.length) {
      nextButtonTitle = " ";
    }

    const increaseQCount = () => {
      if (questCount < quizData.length) {
        setQuestCount(questCount + 1);
      }
    };

    const resetQCount = () => {
      setQuestCount(0);
      setScoreCount(0);
    };

    return (
      <ScrollView horizontal indivatorSTyle={"white"} style={{paddingTop:10,margin:20,textAlign:"center"}}>
        <TouchableOpacity
        onPress={resetQCount}

          style={{
            width: 130,
            height: 50,
            padding: 10,
            paddingLeft: 42,
            textAlign: "center",
            borderRadius: 15,
            margin: 10,
          }}
        >
          <Subheading style={{ color: "#fff", fontSize: 16 }}>RESTART</Subheading>
        </TouchableOpacity>
        <TouchableOpacity
        onPress={increaseQCount}
          style={{
            width: 130,
            height: 50,
            padding: 10,
            paddingLeft: 42,
            textAlign: "center",
            borderRadius: 20,
            margin: 10,
            backgroundColor:"#3bebe4"
          }}
        >
          <Subheading style={{ color: "#212121", fontSize: 16 }}>NEXT</Subheading>
        </TouchableOpacity>
      </ScrollView>
    );
  };

  const ResultsModal = () => {
    return (
      <View style={{ backgroundColor: "#0a152b", color: "#fff" }}>
        <Modal visible={modalOpen} animationType="slide">
          <View color={{ background: "#fff" }}>
            <AntDesign
              name="close"
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(false)}
              text="hi"
            />
            <Text>
              You scored {scoreCount} out of {quizData.length} questions correctly!{" "}
            </Text>
          </View>
        </Modal>

        <AntDesign
          name="checkcircleo"
          size={30}
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)}
        />
      </View>
    );
  };

  const renderzItem = ({ item }) => <ItemComp option={item.option} id={item.id} />;

  const ListItem = ({ item }) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listText}>{item}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#0a152b" }}>
      <Subheading
        style={{
          fontSize: 22,
          fontWeight: 600,
          color:"#dbca09",
          paddingBottom: 60,
          paddingTop: 60,
          textAlign: "center",
          paddingBottom: 5,
        }}
      >
        Question {questCount}
        <Text style={{ color: "#ccc", fontSize: 14 }}> /10</Text>
      </Subheading>
      <FlatList
        data={currOptions}
        renderItem={renderzItem}
        keyExtractor={(item) => item.option}
        ListHeaderComponent={ListHeader(currQName)}
      />

      <NextComp />
      <ResultsModal />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  parentView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  list: {
    width: "100%",
  },
  listText: {
    color: "#fff",
    fontSize: 15,
    padding: 8,
  },
  listHeaderText: {
    marginLeft:5,
    color: "#fff",
    fontSize: 20,
    minHeight: 70,
    fontWeight: 600,
  },
  listItem: {
    flex: 1,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 15,
    border: "1px solid #eee",
    padding: 8,
    borderRadius: 15,
  },
  listHeader: {
    flex: 1,
    margin: 20,
    padding: 10,
    borderRadius: 5,
  },
  listModal: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "orange",
    padding: 10,
    borderRadius: 5,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 180,
    color:"#1b6df2",
    alignSelf: "center",
  },
  modalClose: {
    marginTop: 20,
    marginBottom: 0,
  },
  modalContent: {
    flex: 1,
  },
});
