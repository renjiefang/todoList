/**
 * @author renjiefang
 * @date  2019-06-11 10:21
 */

let oli = document.querySelectorAll('.nav >li')
let prev = 0
let type = 'all'
oli.forEach( (item,index) => {
    item.onclick = function() {
        oli[prev].classList.remove('li_focus')
        this.classList.add('li_focus')
        prev =index

    }
})
let ooList = document.querySelector(".list")



let todoList = [
    {id:0, content: '任mimi的幸福生活,任小懒猪',status: true},
    {id:1, content: '姚ranran,', status: false},
    {id:2, content: 'oracle? oracle!!!', status: false},


]
if(!localStorage.getItem('todoList')) {

    setSave()
    todoList = JSON.parse(localStorage.getItem('todoList'))
    filterList(todoList)

}else {
    filterList(JSON.parse(localStorage.getItem('todoList')))
}

function  setSave() {
    console.log(1);
    localStorage.setItem('todoList',JSON.stringify(todoList))
}


// ooList.addEventListener("mouseenter", function () {
//     let oList = document.querySelectorAll('.list>li')
//
//     console.log(1);
//
//     for (let i = 0; i < oList.length; i++) {
//         console.log(oList);
//         oList[i].addEventListener('click', function () {
//             console.log(2);
//             for (let j = 0; j < oList.length; j++) {
//                 oList[j].id = j
//             }
//             todoList.forEach(item => {
//                 if (item.id == this.id) {
//                     item.status = !item.status
//                 }
//             })
//
//
//             this.classList.toggle("list_focus")
//             filterList(showDiff(type))
//         })
//     }
//
//
// })

ooList.addEventListener("click", function (e) {
    let target = e.target
    if(target.nodeName === 'LI') {
        console.log("LI");
        todoList.forEach(item => {
            if (item.id == target.id) {
                item.status = !item.status
            }
        })
        target.classList.toggle("list_focus")
        filterList(showDiff(type))
        setSave()

    }

})
ooList.addEventListener('click', function(e) {
    let target = e.target
    if(target.nodeName === 'DEL') {
        console.dir("1"+todoList);
        todoList = todoList.filter( (item) => {
            console.log(item);
            return item.id != target.parentNode.id
        })
        console.dir("2"+todoList);
        filterList(showDiff(type))
        setSave()
    }
})
//添加

let forms = document.forms[0]
let  input = forms.elements[0]
let  sub = forms.elements[1]

sub.addEventListener("click", function (e) {
    e.preventDefault()

    let obj ={}
    obj = getobj()
    todoList.push(obj)
    filterList(showDiff(type))
    setSave()
    forms.reset()

})

function getobj() {
    let content = input.value;
    // console.log(val);
    let id = (todoList[todoList.length-1].id)+1
    console.log(id);
    let status = false
    return {id,content,status}
}





function  showDiff(type) {
    let arr = []
    switch (type) {
        case 'all':
            arr = todoList
            break;

        case 'done' :
            arr = todoList.filter((item) => {
                return item.status
            })
            break;

        case 'doing' :
            arr = todoList.filter((item) => {
                return !item.status
            })
            break;

    }
    filterList(arr)
    return arr
}


for (let i = 0; i < todoList.length; i++) {
    oli[i].addEventListener('click', function () {
        type = oli[i].getAttribute('type')
        showDiff(type)

    })

}



function  filterList(arr) {
    let html = ''
    for(let i = 0; i <arr.length; i++) {
        if(!arr[i].status) {
            html += ` <li  id=${arr[i].id}>${arr[i].content} <del>x</del></li>`
        }else {
            html +=`<li class="list_focus" id=${arr[i].id}>${arr[i].content}<del>x</del></li>`
        }
    }
    ooList.innerHTML = html


}