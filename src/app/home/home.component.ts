import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import {NgxImageCompressService} from 'ngx-image-compress';
import { CreatePostComponent } from '../create-post/create-post.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  token = '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';
  postsArr : any = [];
  postInput:any;
  imgResultBeforeCompress!:string;
  imgResultAfterCompress!:string;


  constructor(    
    private httpClient: HttpClient,
    public dialog: MatDialog,
    private router : Router,
    private imageCompress: NgxImageCompressService
    ){
      router.navigate(['home'])
      // this.postsArr = [1,2,3]
  }



  openDialog() {
    this.dialog.open(CreatePostComponent, {
      data: {
        animal: 'panda',
      },
    });
  }

  makePost(){
        this.postAPI()
        .subscribe((res)=>{
            console.log(res);
            // alert("Issue Created");
            this.showPosts();
            this.postInput = '';

          },(error:any)=>{
            // alert("Failed To Create Issue");
            this.showPosts()
          })
      
    
  }

    postAPI(){
      console.log("make post");
      
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'token '+this.token,
          'Accept': 'application/vnd.github.v3+json',
        })
      }
    
      
       let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"
      let body = {
        title : 'New Post',
        body :this.postInput,
        // assignees:["lasertruf"]
        // owner: 'lasertruf',
        // repo: 'fridayGoals',
      }
            
       return this.httpClient.post(API_URL,body,httpHeaders)
            .pipe(map((res:any ) => {              
                return res;
        }));
    }

    //=====================POST=========================
    createIssue(){

      if(this.postInput.length>0){
    
        this.post_API().subscribe((res)=>{
            console.log(res);
            alert("Friday Goal Created");
          },(error:any)=>{
            alert("Failed To Create Friday Goal");
          })
      }
    
    }
    
    
    post_API() {
      // this.copyTitle(1)
      // this.copyBody(1)
    
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }
    
      
       let API_URL = "https://api.github.com/user/repos/lasertruf/buzzinga/issues"
      let body = {
        title : 'New',
        body : this.postInput,
        // labels : ["friday goal"],
        // assignees:["lasertruf"]
        // owner: 'lasertruf',
        // repo: 'fridayGoals',
      }
     
     
       
        return this.httpClient.post(API_URL,body,httpHeaders)
            .pipe(map((res:any ) => {
                return res;
        }));
    }

    //===========================================

  showPosts(){
      this.getAPI().subscribe((res)=>{
        console.log(res);
      },(error:any)=>{
      })
  
    }

    
    getAPI(){
      let httpHeaders = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization':  this.token,
          'Accept': 'application/vnd.github.v3+json'
        })
      }

      let API_URL = "https://api.github.com/repos/lasertruf/buzzinga/issues"


      return this.httpClient.get(API_URL,httpHeaders)
      .pipe(map((res:any ) => {   
        this.postsArr=res; 
        console.log(this.postsArr);
                  
          return res;
  }));
    }

  ngOnInit(): void {
    this.showPosts();
  }
  compressFile() {
  
    this.imageCompress.uploadFile().then(({image, orientation}) => {
    
      this.imgResultBeforeCompress = image;
      console.warn('Size in bytes was:', this.imageCompress.byteCount(image));
      
      this.imageCompress.compressFile(image, orientation, 80, 80).then(
        async (result) => {
          this.imgResultAfterCompress = result;
          console.log(result);
          console.warn('Size in bytes is now:', this.imageCompress.byteCount(result));
         

        }
      );
      
    });
    
  }
}
