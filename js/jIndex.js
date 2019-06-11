/**
 * @author renjiefang
 * @date  2019-06-11 10:24
 */
/**
 * @author renjiefang
 * @date  2019-06-11 10:21
 */
 $(function() {

   console.log(1);
let oli = $('.nav >li')

let type = 'all'

let  content = $(".list")



let todoList = [
    {id:0, content: '任mimi的幸福生活,任小懒猪',status: true},
    {id:1, content: '姚ranran,', status: false},
    {id:2, content: '准备面试，拿下offer!', status: false},
    {id:3, content: 'oracle? oracle!!!', status: false},


]
   let str = localStorage.getItem('todoList')

      if(!str) {
           localStorage.setItem('todoList' , JSON.stringify(todoList))
            str = localStorage.getItem('todoList')
      }

        todoList = JSON.parse(str)



function  showDiff(type) {
    let arr = []
    switch (type) {
        case 'all':
            arr = todoList
            console.log("arr"+arr);
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
    return arr
}



   oli.on('click', function() {
         let _this = $(this)
            _this.addClass('li_focus').siblings('li').removeClass('li_focus')
            type = _this.attr('type')
            let data = showDiff(type)
             console.log(data);
             filterList(data)
   })

      oli.triggerHandler('click');



  content.on('click', 'li>input', function() {
       let _this = $(this)
      let pa = _this.closest('li').attr('id')
       console.log(pa);
         todoList.forEach( item => {
                if(item.id == pa) {
                    item.status = !item.status
                }
         })
      localStorage.setItem('todoList' , JSON.stringify(todoList))
      todoList = JSON.parse(localStorage.getItem('todoList'))
      let data = showDiff(type)
      filterList(data)

  })

     content.on('click', 'del', function() {
         console.log(2);
         let _this = $(this)
         let pa = _this.closest('li').attr('id')
         console.log(pa);
         todoList = todoList.filter( ele=> {
             return ele.id!= pa
         })

         localStorage.setItem('todoList' , JSON.stringify(todoList))
         todoList = JSON.parse(localStorage.getItem('todoList'))
         let data = showDiff(type)
         filterList(data)
     })




     //添加

     let forms = document.forms[0]
     let  input = forms.elements[0]
      let button = $('button')

     button.on("click", function (e) {
         e.preventDefault()

         let obj ={}
         obj = getobj()
         todoList.push(obj)
         localStorage.setItem('todoList' , JSON.stringify(todoList))
         todoList = JSON.parse(localStorage.getItem('todoList'))
         let data = showDiff(type)
         filterList(data)
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


     function  filterList(arr) {
    let html = ''
    for(let i = 0; i <arr.length; i++) {
        if(!arr[i].status) {
            html += `<li  id=${arr[i].id}><input type="checkbox" > ${arr[i].content} <del>x</del></li>`
        }else {
            html +=`<li id=${arr[i].id}><input type="checkbox" checked> ${arr[i].content}<del>x</del></li>`
        }
    }
     content.html(html)


}

 })