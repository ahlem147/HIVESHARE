import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { LoginComponent } from './pages/login/login.component';
import { StatisticsComponent } from './pages/dashboard/statistics/statistics.component';
import { ClientComponent } from './pages/dashboard/client/client.component';
import { EmployersComponent } from './pages/dashboard/employers/employers.component';
import { ProjectsComponent } from './pages/dashboard/projects/projects.component';
import { ListclientComponent } from './pages/dashboard/client/listclient/listclient.component';
import { AjoutclientComponent } from './pages/dashboard/client/ajoutclient/ajoutclient.component';
import { UpdateclientComponent } from './pages/dashboard/client/updateclient/updateclient.component';
import { ListempComponent } from './pages/dashboard/employers/listemp/listemp.component';
import { AjoutempComponent } from './pages/dashboard/employers/ajoutemp/ajoutemp.component';
import { UpdateempComponent } from './pages/dashboard/employers/updateemp/updateemp.component';
import { ListprojectsComponent } from './pages/dashboard/projects/listprojects/listprojects.component';
import { AddprojectComponent } from './pages/dashboard/projects/addproject/addproject.component';
import { PreviewprojectComponent } from './pages/dashboard/projects/previewproject/previewproject.component';
import { UpdateprojectComponent } from './pages/dashboard/projects/updateproject/updateproject.component';
import { dashGuard } from './core/guards/dash.guard';
import { loginGuard } from './core/guards/login.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },

    {
        path: 'dashboard', canActivate: [dashGuard],
        component: DashboardComponent,
        children: [
            {
                path: '',
                redirectTo: 'static',
                pathMatch: 'full'
            },
            {
                path: 'static', canActivate: [adminGuard],
                component: StatisticsComponent
            },
            {
                path: 'client', canActivate: [adminGuard],
                component: ClientComponent, children: [
                    {
                        path: '',
                        redirectTo: 'listclient',
                        pathMatch: 'full'
                    },
                    {
                        path: 'listclient',
                        component: ListclientComponent
                    },
                    {
                        path: 'ajoutclient',
                        component: AjoutclientComponent
                    },
                    {
                        path: 'updateclient/:id',
                        component: UpdateclientComponent
                    }
                ]
            },
            {
                path: 'employers', canActivate: [adminGuard],
                component: EmployersComponent, children: [
                    {
                        path: '',
                        redirectTo: 'listemp',
                        pathMatch: 'full'
                    },
                    {
                        path: 'listemp',
                        component: ListempComponent
                    },
                    {
                        path: 'addemp',
                        component: AjoutempComponent
                    },
                    {
                        path: 'updateemp/:id',
                        component: UpdateempComponent
                    }
                ]
            },
            {
                path: 'projects',
                component: ProjectsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'listproj',
                        pathMatch: 'full'
                    },
                    {
                        path: 'listproj',
                        component: ListprojectsComponent
                    },
                    {
                        path: 'addpro',
                        component: AddprojectComponent
                    },
                    {
                        path: 'preview/:id',
                        component: PreviewprojectComponent
                    },
                    {
                        path: 'updatepro/:id',
                        component: UpdateprojectComponent
                    }
                ]
            }
        ]
    },
    {
        path: 'login', canActivate: [loginGuard],
        component: LoginComponent
    },
    {
        path: '**',
        component: NotfoundComponent
    }
];
