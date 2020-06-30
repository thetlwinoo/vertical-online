import { createReducer, on } from '@ngrx/store';

import { QuestionActions } from 'app/ngrx/products/actions';
import { IQuestions } from '@eps/models';

export const questionFeatureKey = 'question';

export interface State {
  loaded: boolean;
  loading: boolean;
  ids: number[];
  questions: IQuestions[];
  count: number;
}

const initialState: State = {
  loaded: false,
  loading: false,
  ids: [],
  questions: [],
  count: 0,
};

export const reducer = createReducer(
  initialState,
  on(QuestionActions.loadQuestions, QuestionActions.askQuestion, state => ({
    ...state,
    loading: true,
  })),
  on(QuestionActions.loadQuestionsSuccess, (state, { questions }) => ({
    loaded: true,
    loading: false,
    ids: questions.map(question => question.id),
    questions,
    count: questions.length || 0,
  })),
  on(QuestionActions.askQuestionSuccess, (state, { question }) => {
    if (state.ids.includes(question.id)) {
      return state;
    }
    return {
      loaded: true,
      loading: false,
      ids: [...state.ids, question.id],
      questions: [...state.questions, question],
    };
  })
);

export const getLoaded = (state: State) => state.loaded;

export const getLoading = (state: State) => state.loading;

export const getIds = (state: State) => state.ids;

export const getQuestions = (state: State) => state.questions;

export const getCount = (state: State) => state.count;
