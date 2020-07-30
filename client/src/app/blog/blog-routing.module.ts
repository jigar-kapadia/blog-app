import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule, Router } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostResolver } from '../core/resolvers/post.resolver';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'post', component: PostComponent },
  { path: 'create', component: CreatePostComponent, canActivate : [AuthGuard] }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogRoutingModule { }
