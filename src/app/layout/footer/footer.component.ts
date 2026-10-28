import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "app-footer",
  imports: [],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: "./footer.component.html",
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
}
