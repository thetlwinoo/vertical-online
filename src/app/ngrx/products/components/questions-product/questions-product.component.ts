import { Component, OnInit, Input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { rootAnimations } from '@vertical/animations';
import { select, Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { Subscription } from 'rxjs/Subscription';
import { Account, IQuestions, Questions, IProducts, IPeople } from '@vertical/models';
import * as fromProducts from 'app/ngrx/products/reducers';
import * as fromAuth from 'app/ngrx/auth/reducers';
import { QuestionActions } from 'app/ngrx/products/actions';
import { SERVER_API_URL } from '@vertical/constants';
import { map, takeUntil } from 'rxjs/operators';
import { formatDistance } from 'date-fns';
import * as moment from 'moment';
import { AccountService, AuthService } from '@vertical/core';

@Component({
  selector: 'questions-product',
  templateUrl: './questions-product.component.html',
  styleUrls: ['./questions-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: rootAnimations,
})
export class QuestionsProductComponent implements OnInit, OnDestroy {
  @Input() product: IProducts;

  account: Account;
  questions$: Observable<IQuestions[]>;
  questions: IQuestions[] = [];
  people$: Observable<IPeople>;
  people: IPeople;
  questionLoading$: Observable<boolean>;
  submitting = false;
  question = 'assets/icons/question.svg';
  answer = 'assets/icons/answer.svg';
  inputValue = '';

  private unsubscribe$: Subject<any> = new Subject();

  constructor(
    private store: Store<fromProducts.State>,
    private authStore: Store<fromAuth.State>,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    this.accountService.identity().subscribe(account => {
      this.account = account;
    });

    this.questions$ = this.store.pipe(select(fromProducts.getQuestions));
    this.questionLoading$ = this.store.pipe(select(fromProducts.getQuestionsLoading));
    this.people$ = authStore.pipe(select(fromAuth.getPeopleFetched));
  }

  ngOnInit(): void {
    this.people$.pipe(takeUntil(this.unsubscribe$)).subscribe(item => {
      this.people = item;
      if (this.people && this.product) {
        this.store.dispatch(
          QuestionActions.loadQuestions({ query: { 'personId.equals': this.people.id, 'productId.equals': this.product.id } })
        );
      }
    });
  }

  login(): void {
    this.authService.login();
  }

  handleSubmit(): void {
    this.submitting = true;
    const content = this.inputValue;
    this.inputValue = '';

    const question = new Questions();
    question.customerQuestion = content;
    question.customerQuestionOn = moment();
    question.supplierId = this.product.supplierId;
    question.supplierName = this.product.supplierName;
    question.personId = this.people ? this.people.id : null;
    question.personFullName = this.people ? this.people.fullName : null;
    question.productId = this.product ? this.product.id : null;
    this.store.dispatch(QuestionActions.askQuestion({ question }));
  }

  getDistanceDate(date): string {
    return formatDistance(new Date(), new Date(date));
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
