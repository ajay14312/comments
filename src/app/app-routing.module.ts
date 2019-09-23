import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { CommentComponent } from './comment/comment.component';

const routes: Routes = [
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'comments', component: CommentComponent
    },
    {
        path: '', redirectTo: '/comments', pathMatch: 'full'
    },
    {
        path: '**', redirectTo: '/comments', pathMatch: 'full'
    }
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule { };