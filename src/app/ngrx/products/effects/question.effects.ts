import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, mergeMap, filter } from 'rxjs/operators';
import { JhiParseLinks } from 'ng-jhipster';
import { IQuestions } from '@vertical/models';
import { QuestionActions } from '../actions';
import { QuestionsService } from '@vertical/services';

@Injectable()
export class QuestionEffects {
  loadQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.loadQuestions),
      switchMap(({ query }) =>
        this.questionsService.query(query).pipe(
          filter((res: HttpResponse<IQuestions[]>) => res.ok),
          map((res: HttpResponse<IQuestions[]>) => QuestionActions.loadQuestionsSuccess({ questions: res.body })),
          catchError(error => of(QuestionActions.questionsFailure({ error })))
        )
      )
    )
  );

  askQuestions$ = createEffect(() =>
    this.actions$.pipe(
      ofType(QuestionActions.askQuestion),
      mergeMap(({ question }) =>
        this.questionsService.create(question).pipe(
          filter((res: HttpResponse<IQuestions>) => res.ok),
          mergeMap((res: HttpResponse<IQuestions>) => [
            QuestionActions.askQuestionSuccess({ question: res.body }),
            QuestionActions.loadQuestions({ query: { 'personId.equals': res.body.personId, 'productId.equals': res.body.productId } }),
          ]),
          catchError(error => of(QuestionActions.questionsFailure({ error })))
        )
      )
    )
  );

  constructor(private actions$: Actions, private questionsService: QuestionsService, protected parseLinks: JhiParseLinks) {}
}
