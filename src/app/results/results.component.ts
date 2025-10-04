import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';



interface Answer {
  question_id: number;
  answer_key: string;
}


@Component({
  selector: 'app-result',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css']
})
export class ResultComponent implements OnInit {
  topic = '';
  score = 0;
  total = 0;
  percentage = 0;
  answers: any[] = [];

  constructor(private router: Router, private quizService: QuizService) {}

  ngOnInit(): void {
    const state = history.state;
    if (state.resultData) {
      this.topic = state.resultData.topic;
      this.score = state.resultData.score;
      this.total = state.resultData.total;
      this.percentage = state.resultData.percentage;

      const userAnswers: Answer[] = state.resultData.answers || [];

      // Fetch all questions for this topic with correct answers
      this.quizService.getQuizForResults(this.topic).subscribe(res => {
        this.answers = res.questions.map(q => {
          const userAns = userAnswers.find(a => a.question_id === q.id);
          return {
            questionId: q.id,
            questionText: q.text,
            options: q.options,
            correctAnswer: q.correctAnswer,
            answer_key: userAns ? userAns.answer_key : null,
            isCorrect: userAns ? userAns.answer_key === q.correctAnswer : false
          };
        });
      });

    }
  }

  goHome() {
    this.router.navigate(['/']);
  }


}
