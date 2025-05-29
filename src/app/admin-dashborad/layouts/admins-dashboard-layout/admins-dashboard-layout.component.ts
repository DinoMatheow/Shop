import { AuthService } from '@/auth/services/auth.service';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admins-dashboard-layout',
  imports: [RouterOutlet, RouterLinkActive, RouterLink],
  templateUrl: './admins-dashboard-layout.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminsDashboardLayoutComponent {

authService = inject(AuthService);

user = computed(()=> this.authService.user());




}
