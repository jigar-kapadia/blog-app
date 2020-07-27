import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule, Router } from '@angular/router';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { PostResolver } from '../core/resolvers/post.resolver';

const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'post', component: PostComponent, resolve : {data:PostResolver}  },
  { path: 'create', component: CreatePostComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BlogRoutingModule { }
