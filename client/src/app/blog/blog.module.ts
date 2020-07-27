import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog.component';
import { PostComponent } from './post/post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { BlogRoutingModule } from './blog-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CoreModule } from '../core/core.module';
import { PostResolver } from '../core/resolvers/post.resolver';

@NgModule({
  declarations: [BlogComponent, PostComponent, CreatePostComponent],
  imports: [
    CommonModule,
    BlogRoutingModule,
    SharedModule,
    CoreModule
  ],
  providers: [
  ]
})
export class BlogModule { }
