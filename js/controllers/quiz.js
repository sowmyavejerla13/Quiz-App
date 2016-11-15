(function(){
    angular.module("quizApp").controller("quizCtrl",QuizController);
    QuizController.$inject = ['quizMetrics','DataServices'];

    function QuizController(quizMetrics,DataServices){

        var vm = this;

        vm.quizMetrics = quizMetrics;
        vm.DataServices  = DataServices;
        vm.activeQuestion = 0;
        vm.selectAnswer = selectAnswer;
        vm.questionAnswered = questionAnswered;
        vm.setActiveQuestion = setActiveQuestion;
        vm.finaliseAnswers = finaliseAnswers;
        var noOfAnsweresQuestions = 0 ;

        function setActiveQuestion(index) {

            if(index === undefined){
                 console.log(index);
                var breakOut = false;

                var quizLength = DataServices.quizQuestions.length - 1;

                while(!breakOut){
                    vm.activeQuestion = vm.activeQuestion < quizLength?++vm.activeQuestion:0;
                    if(vm.activeQuestion === 0){
                        vm.error = true;
                    }

                    if(DataServices.quizQuestions[vm.activeQuestion].selected === null){
                        breakOut = true;
                    }

                }
            }else{
                vm.activeQuestion = index;
            }
        }
        function questionAnswered(){

            var quizLength = DataServices.quizQuestions.length;

            if(DataServices.quizQuestions[vm.activeQuestion].selected !== null){
                noOfAnsweresQuestions ++;
                if(noOfAnsweresQuestions >= quizLength){

                    for(var i = 0; i < quizLength; i++){

                        if(DataServices.quizQuestions[i].selected === null){

                            setActiveQuestion(i);
                            return;
                        }

                    }

                    vm.error = false;
                    vm.finalise = true;
                    return;
                }
            }
            vm.setActiveQuestion();

        }
        function selectAnswer(index){

            DataServices.quizQuestions[vm.activeQuestion].selected = index;
        }

        function finaliseAnswers(){

            vm.finalise = false;
            numQuestionsAnswered = 0;
            vm.activeQuestion = 0;
            quizMetrics.markQuiz();
            quizMetrics.changeState("quiz", false);
            quizMetrics.changeState("results", true);


        }

    };
})();