import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Question {
  id: number;
  topic_name: string;
  text: string;
  options: { [key: string]: string };
}


interface QuestionResults {
  id: number;
  topic_name: string;
  text: string;
  options: { [key: string]: string };
  correctAnswer: string;
}

interface QuizResponseForResults {
  topic_name: string;
  questions: QuestionResults[];
}

interface QuizResponse {
  topic_name: string;
  questions: Question[];
}

interface Answer {
  question_id: number;
  answer_key: string;
}

interface SubmitResponse {
  message: string;
  results: {
    attempt_id: number;
    topic: string;
    score: number;
    total_questions: number;
    percentage: number;
  };
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  // Replace with your backend API URL If you have any other URL then only
  private API_URL = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  // Fetch all available topics for home page to display our quiz cards
  getTopics(): Observable<{ topics: string[] }> {
    return this.http.get<{ topics: string[] }>(`${this.API_URL}/topics`);
  }

  // Fetch quiz questions for a selected topic after selecting the quiz
  getQuiz(topic: string): Observable<QuizResponse> {
    return this.http.get<QuizResponse>(`${this.API_URL}/quizzes/start/${topic}`);
  }

  //This will return the particular topic quiz with its all answers for last our result showing window
  getQuizForResults(topic: string): Observable<QuizResponseForResults> {
    return this.http.get<QuizResponseForResults>(`${this.API_URL}/quizzes/results/${topic}`);
  }

  
  // Submit quiz answers this will submit our questions 
  submitQuiz(topic: string, answers: Answer[]): Observable<SubmitResponse> {
    return this.http.post<SubmitResponse>(`${this.API_URL}/quizzes/submit`, {
      topic_name: topic,
      answers: answers
    });
  }





}
