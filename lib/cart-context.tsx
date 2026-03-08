'use client'

import React, { createContext, useContext, useReducer, useEffect } from 'react'

export interface CartItem {
  id: string
  name: string
  price: number
  size: string
  quantity: number
  image?: string
}

interface CartState {
  items: CartItem[]
  totalPrice: number
  itemCount: number
}

type CartAction = 
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> & { productId: string } }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_FROM_STORAGE'; payload: CartState }

interface CartContextType {
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  itemCount: 0,
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const { productId, ...item } = action.payload
      const existingItem = state.items.find(i => i.id === `${productId}-${item.size}`)

      if (existingItem) {
        const updatedItems = state.items.map(i =>
          i.id === existingItem.id ? { ...i, quantity: i.quantity + item.quantity } : i
        )
        return {
          items: updatedItems,
          itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
          totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }
      }

      const newItem: CartItem = {
        ...item,
        id: `${productId}-${item.size}`,
      }
      const updatedItems = [...state.items, newItem]

      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }

    case 'REMOVE_ITEM': {
      const updatedItems = state.items.filter(i => i.id !== action.payload)
      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload
      if (quantity <= 0) {
        return cartReducer(state, { type: 'REMOVE_ITEM', payload: id })
      }

      const updatedItems = state.items.map(i => i.id === id ? { ...i, quantity } : i)
      return {
        items: updatedItems,
        itemCount: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }

    case 'CLEAR_CART':
      return initialState

    case 'LOAD_FROM_STORAGE':
      return action.payload

    default:
      return state
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('unseen-cart')
    if (saved) {
      try {
        dispatch({ type: 'LOAD_FROM_STORAGE', payload: JSON.parse(saved) })
      } catch (e) {
        console.error('Failed to load cart from localStorage', e)
      }
    }
  }, [])

  // Save to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem('unseen-cart', JSON.stringify(state))
  }, [state])

  const addItem = (item: CartItem) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        productId: item.id.split('-')[0],
      },
    })
  }

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id })
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } })
  }

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' })
  }

  return (
    <CartContext.Provider value={{ state, dispatch, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within CartProvider')
  }
  return context
}
