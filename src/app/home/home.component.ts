import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuizService } from '../services/quiz.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics: string[] = [];

  constructor( private router:Router,private quizService:QuizService) {}

  ngOnInit(): void {
    this.quizService.getTopics()
      .subscribe(response => {
        this.topics = response.topics;
      });
  }

  startQuiz(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }
}

