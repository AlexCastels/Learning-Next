import { addPost, deletePost} from "../../../server/action"

function ServerAction(){

    
    //importante in una action collegata ad un input mai dimenticare attrb name, questo serve per puntare direttamente all'input
    //e poter recuperare il suo valore
    return (
        <>
            <form action={addPost}>
                <input type="text" placeholder="title" name="title"/>
                <input type="text" placeholder="desc" name="desc"/>
                <input type="text" placeholder="slug" name="slug"/>
                <input type="text" placeholder="id" name="id"/>
                <button>Send post</button>
            </form>
            <form action={deletePost}>
                <input type="text" name="id" placeholder="postID" />
                <button>Delete</button>
            </form>
        </>
    )
}

export default ServerAction
