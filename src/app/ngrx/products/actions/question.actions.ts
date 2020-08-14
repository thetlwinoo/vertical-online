import { createAction, props } from '@ngrx/store';
import { IQuestions } from '@vertical/models';

export const loadQuestions = createAction('[Questions/API] Load Question', props<{ query: any }>());

export const loadQuestionsSuccess = createAction('[Questions/API] Load Question Success', props<{ questions: IQuestions[] }>());

export const askQuestion = createAction('[Questions/API] Ask Question', props<{ question: IQuestions }>());

export const askQuestionSuccess = createAction('[Questions/API] Ask Question Success', props<{ question: IQuestions }>());

export const questionsFailure = createAction('[Questions/API] Questions Failure', props<{ error: any }>());
