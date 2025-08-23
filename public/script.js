const deleteBtn = document.querySelectorAll('.fa-trash')


Array.from(deleteBtn).forEach(element => {
  element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const res = await fetch('/deleteItem', {
            method: 'delete',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText 
            })

        })
        const data = await res.json()
        console.log(data)
        location.reload()

    } catch(err){
       console.log(err)
    }
}



// update item

const item = document.querySelectorAll('.item span')

Array.from(item).forEach(element => {
    element.addEventListener('click', markComplete)
})

async function markComplete(){
    const itemText = this.parentNode.childNodes[1].innerText
    try{
        const res = await fetch('/markComplete', {
            method: 'put',
            headers:{'content-type': 'application/json'},
            body: JSON.stringify({
                'itemFromJS' : itemText
            })
        })
        const data = await res.json()
        console.log(data)
        location.reload()

    }catch(err){
        console.log(err)

    }
}


// update uncomplete

const itemCompleted = document.querySelectorAll('.item span.completed')

Array.from(itemCompleted).forEach(element => {
    element.addEventListener('click', markUnComplete)
})

async function markUnComplete(){
   const itemText = this.parentNode.childNodes[1].innerText
   try{

    const res = await fetch('/markUnComplete', {
        method: 'put',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
            'itemFromJS' : itemText
        })
    })
            const data = await res.json()
            console.log(data)
            location.reload()
   }catch(err){

     console.log(err)
     
   }
}