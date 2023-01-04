import {menuArray} from '/data.js'

let orderedItems = []
render()

// CLICK LISTENER

document.addEventListener('click', function(e){
    if(e.target.dataset.add){
        handleAddingToOrder(e.target.dataset.add)
    }else if(e.target.dataset.remove){
        handleRemovingFromOrder(e.target.dataset.remove)
    }else if(e.target.id === 'button-order'){
        handleCompleteOrder()
    }
})

document.addEventListener('submit', function(e){
    e.preventDefault()
    handlePayment()
})

// CLICK HANDLERS

function handleAddingToOrder(name){
    let obj = menuArray.filter((a) => a.name === name)[0]
    let tmp = orderedItems.filter((a) => a.name === name)
    if(tmp.length == 0){
        orderedItems.push({
            name: obj.name,
            n: 1,
            price: obj.price
        })
    }else{
        tmp[0].n++
    }
    
    render();
}

function handleRemovingFromOrder(name){
    orderedItems = orderedItems.filter((a) => a.name != name)
    render();
}

function handleCompleteOrder(){
    document.getElementById('pay-modal').style.display = 'flex'
}

function handlePayment(){
    orderedItems = []
    render()
    document.getElementById('pay-modal').style.display = 'none'
    document.getElementById('thanks-div').style.display = 'flex'
    console.log(document.getElementById('thanks-div').style.display)
}

// RENDERING FUNCTIONS

function getFeedHTML(){
    let itemsToAdd = ''
    for (let el of menuArray){
        itemsToAdd += `
        <div class="menu-item-div">
            <img src="images/${el.image}">
            <div class="item-description-div">
                <h3>${el.name}</h3>
                <p>${el.ingredients.join(', ')}</p>
                <h4>$${el.price}</h4>
            </div>
            <button class="button-add-item clickable" data-add="${el.name}">+</button>
        </div>
        `
    }
    return itemsToAdd
}

function getOrderedHTML(){
    let itemsToAdd = ''
    let sum = 0
    for (let el of orderedItems){
        sum += el.n*el.price

        itemsToAdd += `
        <div class="ordered-item-div">
            <h3>${el.name}</h3>
            <a class="clickable" data-remove="${el.name}">remove</a>
            <h4>x${el.n}&nbsp;&nbsp;&nbsp;$${el.price}</h4>
        </div>
        `
    }
    return [itemsToAdd, `$${sum}`]
}

function render(){
    document.getElementById('menu-list-div').innerHTML = getFeedHTML()
    let ordered = getOrderedHTML()
    document.getElementById('ordered-items-list-div').innerHTML = ordered[0]
    document.getElementById('total-price').textContent = ordered[1]
    document.getElementById('order-div').style.display = (ordered[0].length > 0)? 'flex' : 'none'  
}