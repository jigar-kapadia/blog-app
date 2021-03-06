import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppNavComponent } from './components/app-nav/app-nav.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CreateCommentComponent } from './components/create-comment/create-comment.component';
import { LikecommentsharecountComponent } from './components/likecommentsharecount/likecommentsharecount.component';
import { LikeCommentBarComponent } from './components/like-comment-bar/like-comment-bar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, AppNavComponent, CreateCommentComponent, LikecommentsharecountComponent, LikeCommentBarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent, AppNavComponent,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    CreateCommentComponent,
    LikecommentsharecountComponent,
    LikeCommentBarComponent
  ]
})
export class SharedModule { }
