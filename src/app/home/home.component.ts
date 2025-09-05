import { Component, HostBinding } from "@angular/core";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
})
export class HomeComponent {
  @HostBinding("attr.data-cursor") private cursor = "text";
}
