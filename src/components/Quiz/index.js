import React, { Component, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Levels from "../Levels";
import ProgressBar from "../ProgressBar";
import { QuizMarvel } from "../QuizMarvel";
import QuizOver from "../QuizOver";
import { FaChevronRight } from "react-icons/fa";

class Quiz extends Component {
  constructor(props) {
    super(props);

    this.stateInitial = {
      levelNames: ["debutant", "confirme", "expert"],
      quizLevel: 0,
      maxQuestions: 10,
      storedQuestions: [],
      question: null,
      options: [],
      idQuestion: 0,
      btnDisabled: true,
      userAnswer: null,
      score: 0,
      showWelcomeMsg: false,
      quizEnd: false,
      percent: null,
    };

    this.state = this.stateInitial;
    this.storedDataRef = React.createRef();
  }

  loadQuestions = (quizz) => {
    const fetchedArrayQuiz = QuizMarvel[0].quizz[quizz];
    if (fetchedArrayQuiz.length <= this.state.maxQuestions) {
      this.storedDataRef = fetchedArrayQuiz;
      const newArray = fetchedArrayQuiz.map(({ answer, ...keepRest }) => {
        return keepRest;
      });
      this.setState({
        storedQuestions: newArray,
      });
    } else {
      console.log("pas assez de questions");
    }
  };

  showToastMsg = (pseudo) => {
    if (!this.state.showWelcomeMsg) {
      this.setState({
        showWelcomeMsg: true,
      });
      toast.info(`Bienvenue ${pseudo}, et bonne chance!`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
      });
    }
  };

  componentDidMount() {
    this.loadQuestions(this.state.levelNames[this.state.quizLevel]);
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.storedQuestions !== prevState.storedQuestions &&
      this.state.storedQuestions.length
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
      });
    }

    if (
      this.state.idQuestion !== prevState.idQuestion &&
      this.state.idQuestion
    ) {
      this.setState({
        question: this.state.storedQuestions[this.state.idQuestion].question,
        options: this.state.storedQuestions[this.state.idQuestion].options,
        userAnswer: null,
        btnDisabled: true,
      });
    }

    if (this.state.quizEnd !== prevState.quizEnd) {
      const getPercentage = (maxQuest, ourScore) => (ourScore / maxQuest) * 100;
      const gradePercentage = getPercentage(
        this.state.maxQuestions,
        this.state.score
      );
      this.gameOver(gradePercentage);
    }

    if (this.props.userData.pseudo !== prevProps.userData.pseudo) {
      this.showToastMsg(this.props.userData.pseudo);
    }
  }

  submitAnswer = (selectedAnswer) => {
    this.setState({
      userAnswer: selectedAnswer,
      btnDisabled: false,
    });
  };

  gameOver = (percent) => {
    if (percent >= 50) {
      this.setState({
        quizLevel: this.state.quizLevel + 1,
        percent: percent,
      });
    } else {
      this.setState({
        percent: percent,
      });
    }
  };

  loadLevelQuestions = (param) => {
    this.setState({ ...this.stateInitial, quizLevel: param });
    this.loadQuestions(this.state.levelNames[param]);
  };

  nextQuestion = () => {
    if (this.state.idQuestion === this.state.maxQuestions - 1) {
      this.setState({
        quizEnd: true,
      });
    } else {
      this.setState((prevState) => ({
        idQuestion: prevState.idQuestion + 1,
      }));
    }

    const goodAnswer = this.storedDataRef[this.state.idQuestion].answer;
    if (this.state.userAnswer === goodAnswer) {
      this.setState((prevState) => ({
        score: prevState.score + 1,
      }));

      toast.success("Bravo +1", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.error("Raté 0", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  render() {
    // const { pseudo } = this.props.userData;
    const displayOptions = this.state.options.map((option, index) => {
      return (
        <p
          key={index}
          onClick={() => this.submitAnswer(option)}
          className={`answerOptions ${
            this.state.userAnswer === option && "selected"
          }`}
        >
          <FaChevronRight />
          {option}
        </p>
      );
    });

    const displayNameBtn =
      this.state.idQuestion === this.state.maxQuestions - 1
        ? "Terminer"
        : "Suivant";

    return this.state.quizEnd ? (
      <>
        <ToastContainer disabled />
        <QuizOver
          ref={this.storedDataRef}
          levelNames={this.state.levelNames}
          score={this.state.score}
          maxQuestions={this.state.maxQuestions}
          quizLevel={this.state.quizLevel}
          percent={this.state.percent}
          loadLevelQuestions={this.loadLevelQuestions}
        />
      </>
    ) : (
      <Fragment>
        <ToastContainer />
        <Levels
          level={this.state.levelNames}
          quizLevel={this.state.quizLevel}
        />
        <ProgressBar
          idQuestion={this.state.idQuestion}
          maxQuestions={this.state.maxQuestions}
        />
        <h2>{this.state.question}</h2>
        {displayOptions}
        <button
          onClick={this.nextQuestion}
          className="btnSubmit"
          disabled={this.state.btnDisabled}
        >
          {displayNameBtn}
        </button>
      </Fragment>
    );
  }
}

export default Quiz;
