import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  topics: string[] = [];

  constructor(private http: HttpClient, private router:Router) {}

  ngOnInit(): void {
    this.http.get<{topics: string[]}>('http://localhost:8000/topics')
      .subscribe(response => {
        this.topics = response.topics;
      });
  }

  startQuiz(topic: string) {
    this.router.navigate(['/quiz', topic]);
  }
}

