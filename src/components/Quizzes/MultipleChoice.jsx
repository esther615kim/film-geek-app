import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";

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

export default function MultipleChoice({ route }) {
  const [quizData, setQuizData] = useState([]);
  const [questCount, setQuestCount] = useState(0); // <-- increment 'onNext'
  const [scoreCount, setScoreCount] = useState(0); // <--- inc/decrement 'onNext'
  const [currQuestion, setCurrQuestion] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [currOptions, setcurrOptions] = useState([]);
  const [currQName, setCurrQName] = useState("");

  let formatQns = [];
  let formatOptns = [];
  const formatQnsArr = [];

  const { difficulty } = route.params;

  useEffect(() => {
    async function readQuizData() {
      let docRef;

      if (difficulty === "easy") {
        docRef = doc(db, "quizData", "pSf1qAQUlGaztNDrcBjB");
      } else if (difficulty === "medium") {
        docRef = doc(db, "mediumQuiz", "mediumQuiz");
      } else {
        docRef = doc(db, "hardQuiz", "hardQuiz");
      }

      console.log("Reading quiz data from Firestore...");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const questionData = docSnap.data().results;
        console.log("Quiz data retrieved.");
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
  }, [questCount, difficulty]);

  const myRefs = React.useRef([]);
  const ItemComp = (formattedOptns) => {
    const highlight = (itemId) => {
      myRefs.current[itemId].setNativeProps({ style: { backgroundColor: "blue" } });
    };

    return (
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
      <View>
        <Button onPress={increaseQCount}>{nextButtonTitle}</Button>
        <Button onPress={resetQCount}>{"Restart quiz"}</Button>
      </View>
    );
  };

  const ResultsModal = () => {
    return (
      <View>
        <Modal visible={modalOpen} animationType="slide">
          <View>
            <AntDesign
              name="close"
              size={24}
              style={styles.modalToggle}
              onPress={() => setModalOpen(false)}
            />
            <Text>
              You scored {scoreCount} out of {quizData.length} questions correctly!{" "}
            </Text>
          </View>
        </Modal>

        <AntDesign
          name="checkcircleo"
          size={24}
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
    <SafeAreaView>
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
    marginTop: 22,
  },
  list: {
    width: "100%",
  },
  listText: {
    color: "white",
  },
  listHeaderText: {
    color: "black",
  },
  listItem: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#9575cd",
    padding: 10,
    borderRadius: 5,
  },
  listHeader: {
    flex: 1,
    marginRight: 20,
    marginLeft: 20,
    marginTop: 10,
    backgroundColor: "#2196f3",
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
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
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
