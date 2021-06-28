import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { interval, Subscription } from 'rxjs';

export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit,OnDestroy,AfterViewInit {
  leftPalette:number=5;
  rightPalette:number=975;
  seconds = interval(34);
  buttonSubscription: Subscription=null;
  top:number=285;
  left:number=485;
  directionOfSphere:string='right'
  intervalSubscription:Subscription=null;
  leftPaletInternalPage:number=25;
  rightPaletInternalPage:number=975;
  angle=0; //0 ; 0.2617993878 ; 0.5235987756  
  level=0; //0 ; 1 ; 2
  below:boolean=true;
  over:boolean=false;
  @ViewChild('leftPalet',{static:true}) leftPalet: any;
  @ViewChild('rightPalet',{static:true}) rightPalet: any;
  constructor() { 
  }
  ngOnInit(): void {
    this.leftPalet.topMargin=250;
    this.rightPalet.topMargin=250;  
  }
  ngAfterViewInit(){
  }
  ngOnDestroy() {
    this.buttonSubscription.unsubscribe();
    if(this.intervalSubscription!==null)
      this.intervalSubscription.unsubscribe();  
  }
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
   if(event.keyCode==KEY_CODE.LEFT_ARROW)
    this.move(event);
   if(event.keyCode==KEY_CODE.RIGHT_ARROW)
    this.move(event); 
  }
  ///////////////////////////////////////////////////////
  mainLoop():void{
    let rightSideOfSphere=this.left+30;
    let middleOfSphere=this.top+15;
    if(this.directionOfSphere==='right'){
      if(rightSideOfSphere>=1000)
        return;
      if(this.top<=0){
        this.angle=-this.angle
      }
      if(this.top>=570){
        this.angle=-this.angle
      }  
      let x=Math.cos(this.angle);
      let y=(-Math.sin(this.angle));
      this.top+=y;
      this.left+=x;
      if(rightSideOfSphere>=975 && rightSideOfSphere<978 && this.rightPalet.topMargin<=middleOfSphere && (this.rightPalet.topMargin+100)>=middleOfSphere){
        this.directionOfSphere='left';
        if(middleOfSphere>=this.rightPalet.topMargin && middleOfSphere<(this.rightPalet.topMargin+20)){
          this.angle=(-0.5235987756)
        }
        if(middleOfSphere>=(this.rightPalet.topMargin+20) && middleOfSphere<(this.rightPalet.topMargin+40)){
          this.angle=(-0.2617993878)
        }
        if(middleOfSphere>=(this.rightPalet.topMargin+40) && middleOfSphere<=(this.rightPalet.topMargin+60)){
          this.angle=0;
        }
        if(middleOfSphere>(this.rightPalet.topMargin+60) && middleOfSphere<=(this.rightPalet.topMargin+80)){
          this.angle=0.2617993878;
        }6
        if(middleOfSphere>(this.rightPalet.topMargin+80) && middleOfSphere<=(this.rightPalet.topMargin+100)){
          this.angle=0.5235987756;
        }
      } 
    }
    if(this.directionOfSphere==='left'){
      if(this.left<=0)
        return;
      if(this.top<=0){
        this.angle=-this.angle
      }
      if(this.top>=570){
        this.angle=-this.angle
      }  
      let x=Math.cos(this.angle);
      let y=(-Math.sin(this.angle));
      this.top-=y;
      this.left-=x;
      if(this.left<=25 && this.left>22 && this.leftPalet.topMargin<=middleOfSphere && (this.leftPalet.topMargin+100)>=middleOfSphere){
        this.directionOfSphere='right';
        this.level=this.getRandomLevel(3);
        if((this.rightPalet.topMargin+50)>middleOfSphere){
          this.over=true;
          this.below=false;
        }
        if((this.rightPalet.topMargin+50)<middleOfSphere){
          this.over=false;
          this.below=true;
        }
        if((this.rightPalet.topMargin+50)===middleOfSphere){
          this.over=true; //for simplicity
          this.below=false;
        }
        if(middleOfSphere>=this.leftPalet.topMargin && middleOfSphere<(this.leftPalet.topMargin+20)){
          this.angle=0.5235987756
        }
        if(middleOfSphere>=(this.leftPalet.topMargin+20) && middleOfSphere<(this.leftPalet.topMargin+40)){
          this.angle=0.2617993878
        }
        if(middleOfSphere>=(this.leftPalet.topMargin+40) && middleOfSphere<=(this.leftPalet.topMargin+60)){
          this.angle=0;
        }
        if(middleOfSphere>(this.leftPalet.topMargin+60) && middleOfSphere<=(this.leftPalet.topMargin+80)){
          this.angle=(-0.2617993878);
        }
        if(middleOfSphere>(this.leftPalet.topMargin+80) && middleOfSphere<=(this.leftPalet.topMargin+100)){
          this.angle=(-0.5235987756);
        }
      }
    }
    
  }
  ////////////////////////////////////////////////////////
  click():void {
    this.angle=0; 
    this.top=285;
    this.left=485;
    this.leftPalet.topMargin=250;
    this.rightPalet.topMargin=250;
    this.directionOfSphere='right';
    this.level=1;
    if(this.intervalSubscription!==null){
      this.intervalSubscription.unsubscribe();
      this.intervalSubscription=null;
    }
    if(this.buttonSubscription!==null){
      this.buttonSubscription.unsubscribe();
      this.buttonSubscription=null;
    }
    this.buttonSubscription = this.seconds.subscribe(
      _ => {
        this.changeRightPalettePosition();
      }, 
      err => console.log(err),     
    ); 
    this.intervalSubscription=interval(7).subscribe(_=>this.mainLoop());
  }
  //////////////////////////////////////////////////////////////////////
  move(event:KeyboardEvent):void {
    if(event.keyCode===KEY_CODE.LEFT_ARROW)
      if(this.leftPalet.topMargin>=0)
        this.leftPalet.topMargin=this.leftPalet.topMargin-2;
    if(event.keyCode===KEY_CODE.RIGHT_ARROW)
    if(this.leftPalet.topMargin<=500)
      this.leftPalet.topMargin=this.leftPalet.topMargin+2;
  }
  ////////////////////////////////////////////////////////////////////////////////
  changeRightPalettePosition():void {   
    if(this.level===0 && this.directionOfSphere==='right'){  //0 degrees
      if((this.rightPalet.topMargin+45)<(this.top+15)){
        this.moveRightPaletDown();
      }
      if((this.rightPalet.topMargin+55)>(this.top+15)){
        this.moveRightPaletUp();
      }
      console.log("level 0"); 
    }
    if(this.level===1 && this.directionOfSphere==='right'){  //15 degrees
      if(this.over){
        if((this.rightPalet.topMargin+25)<(this.top+15)){
          this.moveRightPaletDown();
        }
        if((this.rightPalet.topMargin+35)>(this.top+15)){
          this.moveRightPaletUp();
        }
      }
      if(this.below){
        if((this.rightPalet.topMargin+65)<(this.top+15)){
          this.moveRightPaletDown();
        }
        if((this.rightPalet.topMargin+75)>(this.top+15)){
          this.moveRightPaletUp();
        }
      }
      console.log("level 1");
    }
    if(this.level===2 && this.directionOfSphere==='right'){  // 30 degrees
      if(this.over){
        if((this.rightPalet.topMargin+5)<(this.top+15)){
          this.moveRightPaletDown();
        }
        if((this.rightPalet.topMargin+15)>(this.top+15)){
          this.moveRightPaletUp();
        }
      }  
      if(this.below){
        if((this.rightPalet.topMargin+85)<(this.top+15)){
          this.moveRightPaletDown();
        }
        if((this.rightPalet.topMargin+95)>(this.top+15)){
          this.moveRightPaletUp();
        }
      }
      console.log("level 2");
    }
  }
  ////////////////////////////////////////////////////////////////////////////////
  moveRightPaletUp():void{
    if(this.rightPalet.topMargin>0)
      this.rightPalet.topMargin=this.rightPalet.topMargin-2;
  }
  //////////////////////////////////////////////////////////////////////////////////
  moveRightPaletDown():void{
    if(this.rightPalet.topMargin<500)
      this.rightPalet.topMargin=this.rightPalet.topMargin+2;
  }
  ///////////////////////////////////////////////////////////////////////////////////////
  getRandomLevel(max) {
    return Math.floor(Math.random() * max);
  }
}
