const TASKS_URL = "http://localhost:4000/api/tasks";

async function getTasksAPI(){
    try{
        const res = await fetch(TASKS_URL)
        return res.json()

    }catch(error){
        console.log(error)
        throw error;
    }

}

async function deleteTaskAPI(id){
    try{
        const res = await fetch(TASKS_URL + `/${id}`,{
            method: "DELETE",
            headers:{
                "content-type": "application/json",
            }
        })
        return await res.json()

    }catch(error){
        console.log(error)
        throw error;
    }

}

async function createTaskAPI(title, description, priority){
    try{
        const res = await fetch(TASKS_URL ,{
            method: "POST",
            headers:{
                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                priority: priority
            })
        })
        if (!res.ok){
            const error = await res.json()
            throw error;
        }
        return await res.json()

    }catch(error){
        console.log(error)
        throw error;

    }
}


async function editTaskAPI(id, title, description, priority){
    try{
        const res = await fetch(TASKS_URL, {
            method: "PUT",
            headers:{

                "content-type": "application/json",
            },
            body: JSON.stringify({
                title: title,
                description: description,
                priority: priority
            })
        })

    }catch(error){
        console.log(error)
        throw error;
    }

}
export {getTasksAPI, deleteTaskAPI, createTaskAPI, editTaskAPI}