const addAnimate = (item, point) =>{
    item.classList.add('position-absolute')
    // item.classList.add('animate-todoing')
    item.classList.add('amimate-to-' + point)
}

const removeAnimate = (item, point) =>{
    item.classList.remove('position-absolute')
    // item.classList.remove('animate-todoing')
    item.classList.remove('amimate-to-' + point)
}

const generateRandomDelay = () => Math.floor( ( Math.random() * 3000 ) + 3000)

let todoWorks = [
    {
        title:"sample title 1",
        delay:generateRandomDelay()
    },{
        title:"sample title 2",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 3",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 4",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 5",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 6",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 7",
        delay:generateRandomDelay()
    },{
        title:"sample title 8",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 9",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 10",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 11",
        delay:generateRandomDelay()
    },
    {
        title:"sample title 12",
        delay:generateRandomDelay()
    }
]
document.querySelector('.todo-number').innerHTML = todoWorks.length
document.querySelector('.done-number').innerHTML = 0
document.querySelector('.doing-number').innerHTML = 0
let workersName = ['a', 'b', 'c', 'd']

let workersDomNode = document.querySelectorAll('.worker-name')

const workers = workersName.map((item,index)=>{
    return {
        name:item,
        domNode:workersDomNode[index]
    }
})

const doneConatiner = document.querySelector('.done-conatiner')

const initializeWorks = (event)=>{
    const todoWorksContainer = document.querySelector('.todos')
    for (todoWork of todoWorks){
        todoWorksContainer.innerHTML +=  `<div class="card bg-gray my-3 item" style="width: 18rem; height:200px"><div class="card-body"><h5 class="card-title">${todoWork.title}</h5><p class="card-text">time to done:<span>${todoWork.delay}</span>ms</p></div></div>`
    }
    const worksDomNode = todoWorksContainer.querySelectorAll('.card')
    todoWorks = todoWorks.map((item, index)=>{
        item.domNode = worksDomNode[index]
        return item
    })
    satrtOp()
    event.target.remove()
}
const startBtn = document.querySelector('.start-btn')

startBtn.onclick = initializeWorks

const asyncOperation = (job, worker) => new Promise( (res, rej) => setTimeout(()=>{ 
    res(job)
}, job.delay) )

const parallelWorkerCount = 4;

const satrtOp = async function () {
    const queue = todoWorks
    const queueGenerator = (function *(){
        for (const item of queue) yield item;
    })();

    workers.forEach( async (worker, workerIndex) => {
        for (const job of queueGenerator) {
            const asyncOp = asyncOperation(job, worker)
            addAnimate(job.domNode, worker.name)
            setTimeout(()=>{
                removeAnimate(job.domNode, worker.name)
                worker.innerHTML = ''
                worker.domNode.appendChild(job.domNode)
            }, 2000)
            document.querySelector('.doing-number').innerHTML = +document.querySelector('.doing-number').innerHTML + 1
            document.querySelector('.todo-number').innerHTML = +document.querySelector('.todo-number').innerHTML - 1
            const jobResult = await asyncOp
            document.querySelector('.doing-number').innerHTML = +document.querySelector('.doing-number').innerHTML - 1
            document.querySelector('.done-number').innerHTML = +document.querySelector('.done-number').innerHTML + 1
            doneConatiner.appendChild(job.domNode)
            removeAnimate(job.domNode, worker.name)
        }
    })
}