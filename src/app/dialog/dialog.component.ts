import { Component, HostBinding, inject } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: "app-dialog",
  templateUrl: "./dialog.component.html",
  styleUrl: "./dialog.component.scss",
})
export class DialogComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  @HostBinding("style.display") private display = "none";

  onBackdropClick() {
    this.close();
  }

  show() {
    this.display = "grid";
  }

  close() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { dialog: null },
      queryParamsHandling: "merge",
    });

    this.display = "none";
  }
}
