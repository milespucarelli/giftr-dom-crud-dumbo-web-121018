document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been fully loaded')
  let index = 0
  let ul = document.querySelector('.gift-list')
  let form = document.getElementById('gift-form')
  let search = document.getElementById('filter-input')
  let create = document.getElementById('gift-form-button')
  let edit = document.getElementById('gift-form-edit')
  let del = document.getElementById('gift-form-delete')
  ul.children[0].remove()

  slapGiftsOnTheDom(gifts, ul)

  create.addEventListener('click', event => {
    let childz = Array.from(ul.children)
    let newId = parseInt(childz[childz.length - 1].id) + 1
    ul.innerHTML += `<li id='${newId}' class='gift-item'>${form.name.value}
      <img class="gift-item-image" src="${form.image.value}"/>
      </li>`
    let newGift = {
      id: newId,
      name: form.name.value,
      image: form.image.value
    }
    gifts.push(newGift)
    form.name.value = ''
    form.image.value = ''
    index = 0

  })

  edit.addEventListener('click', event => {
    let gifs = ul.children
    Array.from(gifs).forEach(gif => {
      if (parseInt(gif.id) === index) {
        gif.innerHTML = `${form.name.value}
        <img class="gift-item-image" src="${form.image.value}"/>`
      }
    })
    form.name.value = ''
    form.image.value = ''
    index = 0
  })

  del.addEventListener('click', event => {
    let gifs = ul.children
    Array.from(gifs).forEach(gif => {
      if (parseInt(gif.id) === index) {
        gif.remove()
      }
    })
    form.name.value = ''
    form.image.value = ''
    index = 0
  })

  ul.addEventListener('click', event => {
    if (event.target.className === 'gift-item') {
      form.name.value = event.target.innerText
      form.image.value = event.target.children[0].src
      index = parseInt(event.target.id)
    } else if (event.target.className === 'gift-item-image') {
      form.name.value = event.target.parentNode.innerText
      form.image.value = event.target.src
      index = parseInt(event.target.parentNode.id)
    }
  })

  search.addEventListener('input', event => {
    let filteredGifts = gifts.filter(gift => gift.name.includes(search.value))
    ul.innerHTML = ''
    slapGiftsOnTheDom(filteredGifts, ul)
  })

  function slapGiftsOnTheDom (gifts, ul) {
    gifts.forEach(gift => {
      ul.innerHTML += `<li id='${gift.id}' class='gift-item'>${gift.name}
        <img class="gift-item-image" src="${gift.image}"/>
        </li>`
    })
  }
})
