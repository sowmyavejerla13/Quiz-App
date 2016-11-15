/**
 * Created by sowmya on 26/10/16.
 */

(function(){

    angular
        .module("quizApp")
        .controller("resultsCtrl", ResultsController);

    function ResultsController(quizMetrics, DataServices){
        var vm = this;
        vm.quizMetrics = quizMetrics; // binding the object from factory to vm
        vm.DataServices = DataServices;

        vm.activeQuestion = 0;
        vm.getAnswerClass = getAnswerClass;

        function getAnswerClass(index){

            if(index === quizMetrics.correctAnswers[vm.activeQuestion]){
                return "bg-success";
            }else if(index === DataServices.quizQuestions[vm.activeQuestion].selected){
                return "bg-danger";
            }

        }

        vm.setActiveQuestion = setActiveQuestion;

        function setActiveQuestion(index){

            vm.activeQuestion = index;

        }

        vm.calculatePerc = calculatePerc;

        function calculatePerc(){

            return quizMetrics.numCorrect / DataServices.quizQuestions.length * 100;

        }
        vm.reset = reset;
        function reset(){
            quizMetrics.changeState("results", false);
            quizMetrics.numCorrect = 0;

            for(var i = 0; i < DataServices.quizQuestions.length; i++){
                var data = DataServices.quizQuestions[i]; //binding the current question to data to keep code clean

                data.selected = null;
                data.correct = null;
            }
        }


    }

})();