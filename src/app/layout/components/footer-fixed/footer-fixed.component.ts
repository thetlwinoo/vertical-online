import { Component, OnInit } from '@angular/core';
import { AccountService, AuthService } from '@vertical/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'footer-fixed',
  templateUrl: './footer-fixed.component.html',
  styleUrls: ['./footer-fixed.component.scss'],
})
export class FooterFixedComponent implements OnInit {
  selectedNav;

  constructor(
    private accountService: AccountService,
    private authService: AuthService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {}

  isAuthenticated(): boolean {
    return this.accountService.isAuthenticated();
  }

  login(): void {
    this.authService.login();
  }

  register(): void {
    this.authService.register();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['']);
  }
}
