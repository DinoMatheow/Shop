import { AuthService } from '@/auth/services/auth.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register-page',
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './register-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterPageComponent {

  fb = inject(FormBuilder);
  hasError = signal(false);
  isPosting = signal(false);

  authService = inject(AuthService);
  router = inject(Router);

registerForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(10)], Validators.maxLength(30)],
  email: ['', [Validators.required, Validators.email]],
  password: ['', [Validators.required, Validators.minLength(8)]]

});


onSubmit() {
  if(this.registerForm.invalid){
    this.hasError.set(true)
    setTimeout(() =>{
      this.hasError.set(false);
    }, 3000)
    return;
  }
}




}
