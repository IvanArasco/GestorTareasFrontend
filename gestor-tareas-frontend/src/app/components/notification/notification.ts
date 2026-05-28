import { Component, inject } from '@angular/core';
import { NotificationService } from '../../services/notification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  template: `
@if (notificationService.notification(); as n) {
<div class="notification notification--{{ n.type }}">
{{ n.message }}
</div>
}
`
})
export class NotificationComponent {
  protected notificationService = inject(NotificationService);

  
}