import { Routes } from '@angular/router';
import { AnalyseComponent } from './components/analyse/analyse.component';

export const routes: Routes = [
    {
        path : '',
        redirectTo : 'analyse',
        pathMatch : 'full'
    },
    {
        path : 'analyse',
        component : AnalyseComponent,
    }

];
