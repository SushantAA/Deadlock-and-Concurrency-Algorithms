document.addEventListener('DOMContentLoaded', ()=>
{
    let stage = document.querySelector('#stage')
    var n = prompt("Counting Semaphore\nEnter number of processes(5-10)");
    for(let i = 0; i < n ;i++)
    {
        let process = document.createElement('div')
        process.className = "process"
        process.id = "P" + i
        process.innerHTML = `<span style="color:white;">P${i}</span>`
        process.style.animationPlayState = "paused"
        stage.appendChild(process)
    }
    let semVal = document.querySelector('#semVal')
    let slist = document.querySelector('#slist')
    let lst = document.querySelectorAll('.process')

    let semaphore = 3
    semVal.innerHTML = semaphore
    let prop = {}

    let li = document.createElement('li')
    li.innerHTML = `Number of processes: ${n}`
    slist.appendChild(li)
    document.querySelector('#strbtn').addEventListener('click', ()=>
    {
        lst.forEach((elm)=>
        {

            elm.addEventListener('webkitAnimationEnd', ()=>
            { 
                semVal.innerHTML = semaphore + 1
                let li = document.createElement('li')
                li.innerHTML = `Process ${elm.id} -> Completed`
                slist.appendChild(li)
                setTimeout(()=>
                {
                    semaphore++
                    semVal.innerHTML = semaphore
                }, 1000)
            })

            prop[elm.id] = 
            {
                atQueue: false,
                inCritical : false,
                inQueue: false
            }
            elm.style.animationPlayState = "running"

            setTimeout(()=>
            {
                elm.style.animationPlayState = "paused"
                prop[elm.id].atQueue = true
            }, 2600)

            let a = setInterval(()=>
            {
                if(semaphore > 0 && prop[elm.id].atQueue){
                    elm.style.animationPlayState = "running"
                    let li = document.createElement('li')
                    li.innerHTML = `Process ${elm.id} -> Critical State`
                    slist.appendChild(li)
                    prop[elm.id].atQueue = false
                    semaphore--
                    semVal.innerHTML = semaphore
                    setTimeout(()=>
                    {
                        elm.style.animationPlayState = "paused"
                        prop[elm.id].inCritical = true
                        let time = 0
                        switch(elm.id)
                        {
                            case "P2" : time = 2000; break;
                            case "P1" : time = 7000; break;
                            case "P0" : time = 15000; break;
                            // case "P3" : time = 2000;
                        }
                        setTimeout(()=>
                        {
                            elm.style.animationPlayState = "running"
                        }, time)
                    }, 3400)
                }
                else if(semaphore <= 0 && prop[elm.id].atQueue)
                {
                    prop[elm.id].atQueue = false
                    setTimeout(()=>
                    {
                        elm.style.animationPlayState = "running"
                        let li = document.createElement('li')
                        li.innerHTML = `Process ${elm.id} -> Queue (semaphore is 0)`
                        slist.appendChild(li)
                        setTimeout(()=>
                        {
                            elm.style.animationPlayState = "paused"
                            prop[elm.id].inQueue = true
                        }, 1600)
                    }, 3400)
                }
                else if(semaphore > 0 && prop[elm.id].inQueue)
                {
                    prop[elm.id].inQueue = false
                    elm.style.animationPlayState = "running"
                    semaphore--
                    semVal.innerHTML = semaphore
                    let li = document.createElement('li')
                    li.innerHTML = `Process ${elm.id} -> Critical State`
                    slist.appendChild(li)
                    setTimeout(()=>
                    {
                        elm.style.animationPlayState = "paused"
                        prop[elm.id].inCritical = true
                        setTimeout(()=>
                        {
                            elm.style.animationPlayState = "running"
                        }, 4000)
                    }, 1800)
                }
            }, 100)
        })
    })

})
