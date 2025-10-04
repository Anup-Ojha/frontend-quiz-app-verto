import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuizComponent } from './quiz/quiz.component';
import { ErrorComponent } from './error/error.component';
import { ResultComponent } from './results/results.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'quiz', component: QuizComponent },
  { path: 'result', component: ResultComponent },
  { path: 'quiz/:topic', component: QuizComponent },

  // multipurpose error
  { path: 'error', component: ErrorComponent },

  // catch-all (must be last)
  { path: '**', redirectTo: '/error?code=404&message=Page Not Found' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
