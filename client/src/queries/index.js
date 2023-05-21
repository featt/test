import axios from 'axios'
import { useMutation, useQuery } from 'react-query'

export function getAllUsers(pageNumber = 1, pageSize = 10) {
    const users = useQuery(['users', pageNumber, pageSize], async() => {
      return await axios.get('http://localhost:3000/api/users', {
        params: {
          page: pageNumber,
          size: pageSize,
        },
      })
    })
  
    return users
  }

export function getAllOrders(pageNumber = 1, pageSize = 10) {
    const orders = useQuery(['orders', pageNumber, pageSize], async() => {
        return await axios.get('http://localhost:3000/api/orders', {
            params: {
              page: pageNumber,
              size: pageSize,
            },
          })
    })
    return orders
}

export function createUser() {
    const user = useMutation(user => {
        return axios.post('http://localhost:3000/api/user', user)
    })
    return user
}

export function updateUser(id) {
    const user = useMutation(user => {
        return axios.put(`http://localhost:3000/api/user/${id}`, user)
    })
    return user.mutate
}

export function updateOrder(id) {
    const order = useMutation(order => {
        return axios.put(`http://localhost:3000/api/order/${id}`, order)
    })
    return order.mutate
}

export function deleteUser(id) {
    const user = useMutation(() => {
        return axios.delete(`http://localhost:3000/api/user/${id}`)
    })
    return user.mutate
}

