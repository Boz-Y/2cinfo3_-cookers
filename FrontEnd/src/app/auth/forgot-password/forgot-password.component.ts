import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { routes } from 'src/app/core/helpers/routes/routes';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public routes = routes;
  email: any;
  constructor(private authService: UserService,private router:Router) { }


  onForgotPassword() {
    this.authService.forget(this.email).subscribe(
      (response) => {
        this.router.navigate([routes.forgotpassword]);
        console.log('Password reset email sent successfully.');
        // Vous pouvez rediriger l'utilisateur vers une page de succès ou afficher un message de réussite ici.
      },
      (error) => {
        console.error(error);
        // Vérifiez le statut de la réponse HTTP
        if (error.status === 401) {
          // Gérez les erreurs d'authentification ici (mauvais mot de passe, compte bloqué, etc.)
          console.log('Authentication failed: Invalid username or password');
        } else if (error.status === 404) {
          console.log('Authentication failed: User not found');
        } else if (error.status === 500) {
          console.log('Internal server error');
        } else {
          console.log('Unknown error occurred');
        }
      }
    );
  }

  direction(){
    this.router.navigate([routes.login])
  }

  }
 
