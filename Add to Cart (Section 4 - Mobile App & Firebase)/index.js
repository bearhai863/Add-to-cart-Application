import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const firebaseConfig = {
    databaseURL: "https://playground-f9905-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const firebaseApp = initializeApp(firebaseConfig)
const database = getDatabase(firebaseApp)
const shoppingListInDB = ref(database, "shoppingList")

const addBtn = document.querySelector("#add-btn")
const inputEl = document.querySelector("#input-el")
const shoppingListUl = document.querySelector("#shopping-list")


//this function is to update the data of specific file/category in database realtime
onValue(shoppingListInDB, function(snapshot){
    if(snapshot.exists()){
        let shoppingListArr = Object.entries(snapshot.val())
        clearShoppingList() //clear DOM before render 
        
        //passing each array into function() to render
        for(let i = 0 ; i < shoppingListArr.length; i++){
            renderShoppingList(shoppingListArr[i])
        }
        
    }else{
        shoppingListUl.textContent = "you only live once, go waste your money...."
    }
})


addBtn.addEventListener("click", function(){
    let inputValue = inputEl.value
    push(shoppingListInDB, inputValue)
    clearInputValue()
    // renderShoppingList(inputValue)
})


function clearShoppingList(){
    shoppingListUl.innerHTML = ""
}

function clearInputValue(){
    inputEl.value = ""
}


function renderShoppingList(listArray){
    
    //extract id and value for render and remove
    let listId = listArray[0]
    let listValue = listArray[1]
    
    const listEl = document.createElement("li")
    listEl.textContent = listValue
    shoppingListUl.append(listEl)
    
    listEl.addEventListener("click", function(){
        let exactLocationInDB = ref(database, `shoppingList/${listId}`)
        remove(exactLocationInDB)
    })

}
