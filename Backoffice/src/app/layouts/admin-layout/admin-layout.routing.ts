import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { EvenementComponent } from '../../evenement/evenement.component';
import { EvenementAddComponent } from '../../evenement/evenement-add/evenement-add.component';
import { EvenementUpdateComponent } from 'app/evenement/evenement-update/evenement-update.component';
import { LoginComponent } from 'app/login/login.component';
import { RegisterComponent } from 'app/register/register.component';
import { UsersComponent } from 'app/users/users.component';
import { PlatListComponent } from 'app/plat-list/plat-list.component';

export const AdminLayoutRoutes: Routes = [
   
    { path: 'login',      component: LoginComponent },
    { path: 'register',      component: RegisterComponent },
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'Users',      component: UsersComponent},
    { path: 'evenement',      component: EvenementComponent},
    { path: 'evenement-add',      component: EvenementAddComponent},
    { path: 'evenement-update', component: EvenementUpdateComponent},
    { path: 'plat', component: PlatListComponent},

];
