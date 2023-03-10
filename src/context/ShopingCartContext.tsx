import {createContext, ReactNode, useContext, useState} from "react";

type shoppingCartProvider = {
    children: ReactNode
}

type ShoppingCartContext = {
    openCart:()=>void
    closeCart:()=>void
    getItemQuantity: (id: number) => number
    increaseCartQuantity: (id: number) => void
    decreaseCartQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity:number
    cartItems:CartItem[]
}
type CartItem = {
    id: number
    quantity: number
}
const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => useContext(ShoppingCartContext)

export const ShoppingCartProvider = ({children}: shoppingCartProvider) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([])
    const [isOpen, setIsOpen] = useState(false)
   const openCart = ()=>setIsOpen(true)
   const closeCart = ()=>setIsOpen(false)
    const getItemQuantity = (id: number) => {
        return cartItems.find(item => item.id === id)?.quantity || 0
    }
const increaseCartQuantity = (id:number)=>{
        setCartItems(items=>{
            if (items.find(item => item.id === id)==null){
                return [...items,{id,quantity:1}]
            }else {
                return items.map(item=>{
                    if (item.id === id){
                        return {...item,quantity:item.quantity+1}
                    }else {
                        return item
                    }
                })
            }
        })
}
    const decreaseCartQuantity = (id:number)=>{
        setCartItems(items=>{
            if (items.find(item => item.id === id)==null){
                return items.filter(item=>item.id !== id)
            }else {
                return items.map(item=>{
                    if (item.id === id){
                        return {...item,quantity:item.quantity-1}
                    }else {
                        return item
                    }
                })
            }
        })
    }
    const removeFromCart=(id:number)=>{
        setCartItems(items=> items.filter(item=>item.id !== id))
    }
    const cartQuantity =  cartItems.reduce((quantity,item)=>item.quantity + quantity,0)
    return <ShoppingCartContext.Provider value={
        {getItemQuantity,increaseCartQuantity,decreaseCartQuantity,removeFromCart,cartQuantity,openCart,closeCart,cartItems}}>
        {children}
    </ShoppingCartContext.Provider>
}