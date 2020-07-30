
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { BlogService } from 'src/app/blog/blog.service';


@Injectable()
export class PostResolver implements Resolve<any> {

    constructor(private blogService: BlogService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        //console.log(route.queryParams.id);
        const postId = route.queryParams.id;
        const post = this.blogService.getPostById(postId);
        const comments = this.blogService.getCommentsByPost(postId);
        const likes = this.blogService.getLikesByPost(postId);
        return forkJoin([post, comments, likes]);
    }
}