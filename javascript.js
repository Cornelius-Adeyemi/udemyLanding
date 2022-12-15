
import { course, category } from "./data.js";
let listItems = document.querySelectorAll("#firstSection li");
const courseHeader = document.getElementById("courseHeader");
const coursePreview = document.getElementById("coursePreview")
const courseButton = document.getElementById("courseButton")
let courseInTitle = "python";
let cartNumber = 0;
let submenuData;
const courseContainer = document.getElementById("courseCardList");
let number;

let categoryOne = document.querySelector("#categoryMenuOne");
let categoryMenu = document.getElementById("categoryMenu");

let courseInView = course.find((item)=>{
    return item.type.toLowerCase() === courseInTitle;
});

// addcourse

function  courseCard(){

    courseInView.myArray.forEach((item, index)=>{
      
        // create element
    let cardMainDiv = document.createElement("div");
    cardMainDiv.setAttribute("id", "eachCard")
    let cardImg = document.createElement("img");
    cardImg.src=item.image;
    cardMainDiv.appendChild(cardImg);
    let cardh3 = document.createElement("h3");
    cardh3.textContent = item.header.substring(0,41);
    cardMainDiv.appendChild(cardh3);
    let cardp = document .createElement("p");
    cardp.setAttribute("id", "cardName");
    cardp.textContent = item.auto;
    cardMainDiv.appendChild(cardp)
    let innerDivOne = document.createElement("div");
    innerDivOne.setAttribute("id","cardRating") 
    cardMainDiv.appendChild(innerDivOne);
    let innerSpanOne = document.createElement("span");
    innerSpanOne.classList.add("ratingSpan");
    innerSpanOne.textContent =item.star;
    innerDivOne.appendChild(innerSpanOne);
    let innerSpanImg = document.createElement("span");
    innerSpanImg.setAttribute("id", "imageSpan");
    innerDivOne.appendChild(innerSpanImg);
    let innerSpanTwo = document.createElement("span");
    innerSpanTwo.classList.add("cardPeople");
    innerSpanTwo.textContent = "("+item.people + ")";
    innerDivOne.appendChild(innerSpanTwo);
    let innerDivTwo = document.createElement("div");
    innerDivTwo.setAttribute("id","cardPrice");
    cardMainDiv.appendChild(innerDivTwo);
    let innerSpanThree = document.createElement("span");
    innerSpanThree.classList.add("actualPrice");
    innerSpanThree.textContent=item.price;
    innerDivTwo.appendChild(innerSpanThree);
    let innerSpanFour = document.createElement("span");
    innerSpanFour.classList.add("cancelPrice");
    innerSpanFour.textContent=item.slashPrice;
    innerDivTwo.appendChild(innerSpanFour);

    // append
    courseContainer.appendChild(cardMainDiv);
      
    })

}

courseCard()

let slide =0;
let cardArray = document.querySelectorAll("#eachCard");

function changeDisplay(){

    cardArray.forEach((item,index)=>{
        if(index < slide){
          item.classList.add("slideLeft");
           
        }else if(index >= slide && index < slide + number){
          item.classList.remove("slideLeft");
          item.classList.remove("slideRight");
          item.classList.remove("firstItem");
          item.classList.remove("lastItem")
          if(index ===slide){
           item.classList.add("firstItem");
          }else if(index === (slide + number - 1)){
            item.classList.add("lastItem")
          }

        }else{
          item.classList.add("slideRight");
        }
      
      
      })
      
    }

// to change the number of course in view

function screenFunction(){
    
     slide=0;
     
    if(window.innerWidth > 1150){
   
     number =5
    }else if( window.innerWidth > 920 && window.innerWidth < 1150){
    //4
  
    number =4;
    }else if( window.innerWidth > 644 && window.innerWidth < 920){
     //3
     number =3;
     
     }else if( window.innerWidth < 644 ){
         //4
         number =2;
         
     }

     changeDisplay()
    
 }

 screenFunction()

 
// coursemove function
let greater = document.getElementById("greaterThan");
let lessThan = document.getElementById("lessThan");

function increaseSlide(e){
  let element = (e)?e.currentTarget : {};
 if(element.id === "lessThan"){
    if(slide===0){

    }else if(slide>0){

        slide--
    }
 }else if(element.id==="greaterThan"){
    if(slide === cardArray.length - (number - 1)- 1){

    }else if(slide < cardArray.length - (number - 1)- 1){
        slide++
    }
 }
 if(slide===0){
    lessThan.classList.add("deactivate");
 }else if(slide > 0 && slide< cardArray.length - (number - 1)- 1 ){
    lessThan.classList.remove("deactivate");
    greater.classList.remove("deactivate");
 }else if(slide === cardArray.length - (number - 1)- 1 ){
    greater.classList.add("deactivate");
 }
 
 changeDisplay()
    
}


 // to fill in the header information 

function fillInData(){
    
    courseHeader.textContent = courseInView.header;
    coursePreview.textContent= courseInView.preview;
    courseButton.textContent= courseInView.botton;
    screenFunction();
}


fillInData();

// to add eventlistener to the list naviagetion 

listItems.forEach((item)=>{
    item.addEventListener("click", chnageCourseInTitle);
    changeFocus()
})

// change course title

function chnageCourseInTitle(e){
    if(e.target.textContent.toLowerCase()===courseInTitle){
    
    }else{
 courseInTitle = e.target.textContent.toLowerCase();
 
 changeCourseInView();
 increaseSlide()
 changeFocus()
 fillInData()
 increaseSlide()
    }
}
// change course in view
function changeCourseInView(e){

    courseInView = course.find((item)=>{
        return item.type.toLowerCase() === courseInTitle;
    })

    courseContainer.innerHTML ="";
    courseCard();
    cardArray = document.querySelectorAll("#eachCard");

}


//change focus of the list 
function changeFocus(){
    listItems.forEach((item)=>{
        if(item.textContent.toLowerCase() === courseInTitle){
            
            item.style.color = "rgba(0, 0, 0,1)"
        }else{
            item.style.color = "rgba(0, 0, 0,0.6)"
        }
    })
}





window.addEventListener("resize", screenFunction)



increaseSlide()


let courseMove = document.querySelectorAll(".courseMove");

courseMove.forEach((item)=>{
    item.addEventListener("click",increaseSlide)
})


// movingMenu

let nav = document.getElementById("nav");
let moveMenu = document.getElementById("moveMenu");
let movingP = document.querySelector("#moveMenu p");
let movingButton = document.querySelector("#moveMenu button");

function movingMenu(e){
    let element = e.target; 
    let mainElement = e.currentTarget.getBoundingClientRect();
    let elementProp = e.target.getBoundingClientRect();
    if(window.innerWidth > 800){
    if(element.classList.contains("nav-text") || element.classList.contains("fa-shopping-cart") ){
        let right =parseInt(mainElement.width) - parseInt(elementProp.right);
        moveMenu.style.right = right + "px";
       moveMenu.style.display = "block";

       if(element.classList.contains("nav-text")){
        movingP.classList.remove("pmove");
        movingButton.classList.remove("buttonMove");
        movingP.textContent =element.dataset.content;
        movingButton.textContent =element.dataset.button;

   
       }else{
        movingP.classList.add("pmove");
        movingButton.classList.add("buttonMove");
         if(cartNumber ===0){
            movingP.textContent = "Your cart is empty" ;
            movingButton.textContent ="keep shopping";
         }

       }


    }else if(element.id === "moveMenu" || element.parentElement === moveMenu){

        moveMenu.style.display = "block";
       
    }else if(element.classList.contains("category")){
     let left = parseInt(elementProp.left);
     categoryMenu.style.display="flex";
     categoryMenu.style.left =left + "px";
    
    }else if(element.id==="categoryMenu" || element.id==="categoryMenuOne" || element.parentElement.id==="categoryMenuOne" || element.id==="categoryMenuTwo" || element.parentElement.id==="categoryMenuTwo" || element.classList.contains("categoryListItem") ||  element.classList.contains("spanOne") ||  element.classList.contains("spanTwo")|| element.classList.contains("fa-duotone") ){

    }else{
        moveMenu.style.display = "none";
        categoryMenu.style.display= "none";
    }

  }else{

  }


}

function movingDisplay(){
    moveMenu.style.display= "block";
   
}

function movingNone(e){
    
        moveMenu.style.display= "none";
    
}

function closeMenu(e){

   
moveMenu.style.display= "none";
categoryMenu.style.display= "none";
     
}

moveMenu.addEventListener("mouseenter",movingDisplay)
moveMenu.addEventListener("mouseleave",movingNone)

nav.addEventListener("mouseover",movingMenu);
nav.addEventListener("mouseleave",closeMenu);

//category Menu



function categoryMenuFunction(e){

    category.forEach((item)=>{
        let li = document.createElement("li");
        li.classList.add("categoryListItem");
        let spanOne = document.createElement("span");
        spanOne.classList.add("spanOne");
        let spanTwo = document.createElement("span");
        spanTwo.classList.add("spanTwo");
        let arrow = '<i class="fa-duotone fa-greater-than"></i>';
        spanOne.textContent=item.header;
        spanTwo.innerHTML =arrow;
        li.appendChild(spanOne);
        li.appendChild(spanTwo);
        categoryOne.appendChild(li);
    })
}



categoryMenuFunction()

let mainCategoryList = document.querySelectorAll("#categoryMenuOne li");
let categoryMenuTwo = document.getElementById("categoryMenuTwo");




function categorySubListFunction(){
    categoryMenuTwo.style.display ="block"
    categoryMenuTwo.innerHTML = "";
    submenuData.subMenu.forEach((item)=>{
       
        let li = document.createElement("li");
        li.classList.add("categoryListItem");
        let spanOne = document.createElement("span");
        spanOne.classList.add("spanOne");
        // let spanTwo = document.createElement("span");
        // spanTwo.classList.add("spanTwo");
        // let arrow = '<i class="fa-duotone fa-greater-than"></i>';
        spanOne.textContent=item;
        // spanTwo.innerHTML =arrow;
        li.appendChild(spanOne);
        // li.appendChild(spanTwo);
        categoryMenuTwo.appendChild(li);

    })
   
}

function highlightList(){
    mainCategoryList.forEach((item)=>{
        let firstChild = item.firstChild;
        item.style.color = "black"
        if(submenuData){
           if(firstChild.textContent === submenuData.header){
            item.style.color = "blue"
           }
        }

        
    })
}

function categoryMainListFunction(e){
     let firstChild = e.currentTarget.firstChild;
     submenuData = category.find((item)=>{
        return item.header === firstChild.textContent;
     });

     categorySubListFunction();
     highlightList()
}


mainCategoryList.forEach((item)=>{
    item.addEventListener("mouseenter", categoryMainListFunction)
})
