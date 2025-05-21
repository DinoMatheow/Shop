import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "../../components/navbar/navbar.component";

@Component({
  selector: 'app-store-front-layouts',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './store-front-layouts.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StoreFrontLayoutsComponent { }
