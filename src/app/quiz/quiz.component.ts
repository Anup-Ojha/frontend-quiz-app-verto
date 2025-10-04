import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';
import { interval, Subscription } from 'rxjs';

interface Question {
  id: number;
  topic_name: string;
  text: string;
  options: { [key: string]: string };
}

interface Answer {
  question_id: number;
  answer_key: string;
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  topicName!: string;
  questions: Question[] = [];
  currentIndex: number = 0;
  answers: Answer[] = [];
  timer: number = 30;
  timerSub!: Subscription;
  isLastQuestion: boolean = false;

  constructor(private route: ActivatedRoute, private quizService: QuizService, private router: Router) {}

  ngOnInit(): void {
    this.topicName = this.route.snapshot.paramMap.get('topic')!;
    this.loadQuestions();
  }

  loadQuestions() {
    this.quizService.getQuiz(this.topicName).subscribe(res => {
      this.questions = res.questions;
      this.startTimer();
      this.isLastQuestion = this.questions.length === 1;
    });
  }

  startTimer() {
    this.timer = 30;
    if (this.timerSub) this.timerSub.unsubscribe();

    this.timerSub = interval(1000).subscribe(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        this.timer = 0;
        this.timerSub.unsubscribe();
        this.autoNextOrSubmit();
      }
    });
  }

  // Automatically move to next question or submit quiz when time is up
  autoNextOrSubmit() {
    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.isLastQuestion = this.currentIndex === this.questions.length - 1;
      this.startTimer();
    } else {
      this.submitQuiz();
    }
  }

  selectAnswer(questionId: number, key: string) {
    const existing = this.answers.find(a => a.question_id === questionId);
    if (existing) {
      existing.answer_key = key;
    } else {
      this.answers.push({ question_id: questionId, answer_key: key });
    }
  }

  isSelected(questionId: number, key: string): boolean {
    const answer = this.answers.find(a => a.question_id === questionId);
    return answer ? answer.answer_key === key : false;
  }

  isAnswerSelected(index: number): boolean {
    const questionId = this.questions[index].id;
    return this.answers.some(a => a.question_id === questionId);
  }

  // Manual Next button click
  nextQuestion() {
    if (!this.isAnswerSelected(this.currentIndex)) return;

    if (this.currentIndex < this.questions.length - 1) {
      this.currentIndex++;
      this.isLastQuestion = this.currentIndex === this.questions.length - 1;
      this.startTimer();
    } else {
      this.submitQuiz();
    }
  }

  previousQuestion() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.isLastQuestion = this.currentIndex === this.questions.length - 1;
      this.startTimer();
    }
  }

  submitQuiz() {
    if (this.timerSub) this.timerSub.unsubscribe();

    this.quizService.submitQuiz(this.topicName, this.answers).subscribe(
      (res) => {
        const results = res.results;
        this.router.navigate(['/result'], {
          state: {
            resultData: {
              attemptId: results.attempt_id,
              topic: results.topic,
              score: results.score,
              total: results.total_questions,
              percentage: results.percentage,
              answers: this.answers
            }
          }
        });
      },
      (err) => {
        console.error("Error submitting quiz", err);
        this.router.navigate(['/error'], {
          queryParams: { code: 500, message: 'Failed to submit quiz' }
        });
      }
    );
  }
}
