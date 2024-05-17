import * as React from "react"
import axios from "axios"
import CollectionItem from "./CollectionItem"
import { UserContext } from "../../Contexts/UserContext"
import { useNavigate } from "react-router-dom"
import { Container, Row, Form } from "react-bootstrap"
import { UserContextInterface } from "../../Interfaces/UserContextInterface"
import { getAllItems } from "../../FrontendAPI/api"
// TODO uncomment import and use proper ItemInterface
// import { ItemInterface } from "../../Interfaces/ItemInterface"



/***** TODO REMOVE MOCK DATA AREA BELOW ****************************/
interface ItemDTOInterface {
    id: number,
    name: string,
    despcription?: string,
    producerId?: number,
    image: string,
    rating: number
}

// create list of mock items
const item: ItemDTOInterface = {
    id: 9,
    name: "Book",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'",
    rating: 2.5
}

const itemNames = ["Book", "Laptop", "Phone", "Tablet", "Headphones", "Keyboard", "Mouse"]

const mockCollection: ItemDTOInterface[] = [];
for(let i = 0; i < 7; i++) {
    mockCollection.push({
        id: item.id + i, 
        image: item.image,
        name: itemNames[i],
        rating: item.rating + i*0.3
    })
}

// create mock user
const currentUser = {
    id: 1,
    // role: "admin"
    role: "user",
    token: "token"
}
/***** TODO REMOVE MOCK DATA AREA ABOVE ****************************/



/*
    This componenet will display a list items aka collection
    If the role of user logged in is a user it will display the items of the user
    If the role of user logged in is an admin it will display all items
*/
const Collection: React.FC<{}> = () => {

    // state to store collection
    const [ collection, setCollection ] = React.useState([] as ItemDTOInterface[])
    // state to store input entered into select items by name
    const [ nameFilter, setNameFilter ] = React.useState("")

    const navigate = useNavigate();

 
    //  TODO UNCOMMENT BELOW
    // get current user from UserContext
    // const currentUser = React.useContext(UserContext))

    // if a user is not logged in navigate to home page
    // if (!currentUser) {
    //     navigate("/");
    // }

    // get role of current user
    // const userRole = currentUser?.role

    const handleDeleteItem = (itemId: number) => {
        // create new collection with the deleted item removed
        const updatedCollection = collection.filter(item => item.id != itemId)
        // update collection state
        setCollection(updatedCollection)

        // TODO update Database
    }


    // get collection on component rendering
    React.useEffect((): void => {

        // function to get collection of user
        const getCollection = async () => {

            const collection: unknown = currentUser.role == "user"
                // TODO change function to getAllItemsByUser
                // if the role is user only get the items of the current user
                ? await getAllItems(currentUser.token)
                // if the role is admin get all items
                : await getAllItems(currentUser.token)

            // set collection state
            setCollection(collection as ItemDTOInterface[])
        }

        
//         // TODO uncomment invoking getCollection()
//         // invoke getCollection function
//         // getCollection()

        // TODO REMOVE line below
        setCollection(mockCollection)

    }, [])


    // function to handle change in name filter input
    const handleNameFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNameFilter(e.target.value)
    }

    return (
        <>
             <Container className="mt-4 r-flex">
                <Row className="">
                    <Form.Label htmlFor="nameFilter"> Filter By Item Name: {  }
                        <Form.Control 
                        type="text"
                        id="nameFilter"
                        value={nameFilter}
                        onChange={handleNameFilterChange}
                    />
                    </Form.Label>

                </Row>
                 <Row className="justify-content-evenly" >
                     {/* display collection items */}
                     {collection
                         // filter items based on nameFilter
                         .filter(item => item.name.toLowerCase().indexOf(nameFilter.toLowerCase())> -1)
                         .map(item => {
                         return (
                             <CollectionItem 
                                 key = { item.id }
                                 item = { item } 
                                 handleDeleteItem= { handleDeleteItem }
                             />
                        )
                     })}
                 </Row>
             </Container> 
        </>
    )
}

export default Collection
