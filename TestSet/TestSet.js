document.addEventListener('DOMContentLoaded', ()=>
{
    let stage = document.querySelector('#stage')

    var n = prompt("Test and Set Lock.\nEnter number of processes");
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

    let lock = 0
    semVal.innerHTML = lock
    let prop = {}

    let li = document.createElement('li')
    li.innerHTML = `Number of processes: ${n}`
    slist.appendChild(li)

    document.querySelector('#start').addEventListener('click', ()=>
    {
        lst.forEach((elm)=>
        {

            elm.addEventListener('webkitAnimationEnd', ()=>
            { 
                semVal.innerHTML = lock - 1
                let li = document.createElement('li')
                li.innerHTML = `Process ${elm.id} -> Completed`
                slist.appendChild(li)
                setTimeout(()=>
                {
                    lock--
                    semVal.innerHTML = lock
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
                if(lock == 0 && prop[elm.id].atQueue)
                {
                    elm.style.animationPlayState = "running"
                    let li = document.createElement('li')
                    li.innerHTML = `Process ${elm.id} -> Critical State`
                    slist.appendChild(li)
                    prop[elm.id].atQueue = false
                    lock=1
                    semVal.innerHTML = lock
                    setTimeout(()=>
                    {
                        elm.style.animationPlayState = "paused"
                        prop[elm.id].inCritical = true
                        
                        setTimeout(()=>
                        {
                            elm.style.animationPlayState = "running"
                        }, 400)
                    }, 1000)
                }
                else if(lock == 1 && prop[elm.id].atQueue)
                {
                    prop[elm.id].atQueue = false
                    setTimeout(()=>
                    {
                        elm.style.animationPlayState = "running"
                        let li = document.createElement('li')
                        li.innerHTML = `Process ${elm.id} -> Queue (Lock is 1)`
                        slist.appendChild(li)
                        setTimeout(()=>
                        {
                            elm.style.animationPlayState = "paused"
                            prop[elm.id].inQueue = true
                        }, 1600)
                    }, 3400)
                }
                else if(lock == 0 && prop[elm.id].inQueue)
                {
                    prop[elm.id].inQueue = false
                    elm.style.animationPlayState = "running"
                    lock=1
                    semVal.innerHTML = lock
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
