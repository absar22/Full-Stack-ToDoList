const deleteBtn = document.querySelectorAll('.fa-trash')


Array.from(deleteBtn).forEach(element => {
  element.addEventListener('click', deleteItem)
})

async function deleteItem(){
    const itemText = this.parentNode.childNodes[1].innerText
    try {
        const res = await fetch('deleteItem', {
            method: 'delete',
            headers: {'content-type':'application/json'},
            body: JSON.stringify({
                'itemFromJS': itemText 
            })

        })
        const data = await res.json()
        console.log(data)
        location.reload()

    } catch{
       console.log(err)
    }
}