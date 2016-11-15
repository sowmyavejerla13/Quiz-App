/**
 * Created by sowmya on 24/10/16.
 */

(function() {
    angular
        .module("quizApp")
        .factory("quizMetrics", QuizMetrics);
    QuizMetrics.$inject = ['DataServices'];
    function QuizMetrics(DataServices) {

        var quizObj = {
            quizActive: false,
            resultsActive:false,
            changeState: changeState,
            correctAnswers: [],
            markQuiz: markQuiz,
            numCorrect: 0

        };

        return quizObj;

        function changeState(metric, state){
            if(metric === "quiz"){
                quizObj.quizActive = state;
            }else if(metric === "results"){
                quizObj.resultsActive = state;
            }else{
                return false;
            }
        }

        function markQuiz(){

            quizObj.correctAnswers = DataServices.correctAnswers;

            for(var i = 0; i < DataServices.quizQuestions.length; i++){
                if(DataServices.quizQuestions[i].selected === DataServices.correctAnswers[i]){
                    DataServices.quizQuestions[i].correct = true;
                    quizObj.numCorrect++;
                }else{
                    DataServices.quizQuestions[i].correct = false;
                }
            }

        }

    };
})();

