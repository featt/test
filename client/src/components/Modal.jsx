import { getAllOrders, getAllUsers } from "@/queries";
import { useMutation } from 'react-query'
import axios from "axios";

function Modal({ open, setOpen }) {
  const users = getAllUsers()
  const orders = getAllOrders()
  const mutUser = useMutation(user => {
    return axios.post('http://localhost:3000/api/user', user)
  })

  const mutOrder = useMutation(order => {
    return axios.post('http://localhost:3000/api/order', order)
  })

  const handleSubmitUser = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const name = data.get('name')
    const age = data.get('age')
    const email = data.get('email')    
    await mutUser.mutateAsync({name, age: Number(age), email})
    await users.refetch()
    setOpen(false);
  };

  const handleSubmitOrder = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    const userId = data.get('userId')
    const productName = data.get('productName')
    const quantity = data.get('quantity')
    await mutOrder.mutateAsync({userId: Number(userId), productName, quantity: Number(quantity)})
    await orders.refetch()
    setOpen(false);
  };

  return (
    <>
      {open && (
       <div className="fixed z-10 inset-0 overflow-y-auto">
       <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
         <div className="fixed inset-0 transition-opacity" aria-hidden="true">
           <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
         </div>
     
         <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
     
         <div
           className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
           role="dialog"
           aria-modal="true"
           aria-labelledby="modal-headline"
         >
           <form onSubmit={handleSubmitUser}>
             <div className="bg-white px-6 py-8">
               <h2 className="text-xl font-bold mb-4">Добавить пользователя</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="name" className="block text-gray-700 font-bold mb-2">
                     Имя:
                   </label>
                   <input
                     type="text"
                     name="name"
                     id="name"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
                 <div>
                   <label htmlFor="age" className="block text-gray-700 font-bold mb-2">
                     Возраст:
                   </label>
                   <input
                     type="text"
                     name="age"
                     id="age"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
                 <div className="col-span-2">
                   <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
                     Email:
                   </label>
                   <input
                     type="email"
                     name="email"
                     id="email"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
               </div>
             </div>
             <div className="bg-gray-50 px-6 py-4 flex justify-end items-center">
               <button
                 type="submit"
                 className="inline-flex justify-center w-auto px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 
                >
                 Добавить
               </button>               
             </div>
           </form>

           <form onSubmit={handleSubmitOrder}>
             <div className="bg-white px-6 py-8">
               <h2 className="text-xl font-bold mb-4">Добавить заказ</h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                   <label htmlFor="id" className="block text-gray-700 font-bold mb-2">
                     Id пользователя:
                   </label>
                   <input
                     type="number"
                     name="userId"
                     id="id"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
                 <div>
                   <label htmlFor="product_name" className="block text-gray-700 font-bold mb-2">
                     Название:
                   </label>
                   <input
                     type="text"
                     name="productName"
                     id="age"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
                 <div className="col-span-2">
                   <label htmlFor="quantity" className="block text-gray-700 font-bold mb-2">
                     Кол-во:
                   </label>
                   <input
                     type="text"
                     name="quantity"
                     id="quantity"
                     className="w-full border rounded-md py-2 px-3 focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                     required
                   />
                 </div>
               </div>
             </div>
             <div className="bg-gray-50 px-6 py-4 flex justify-end items-center">
               <button
                 type="submit"
                 className="inline-flex justify-center w-auto px-4 py-2 bg-blue-500 border border-transparent rounded-md font-semibold text-white hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                 
               >
                 Добавить
               </button>
               <button
                 type="button"
                 className="ml-4 inline-flex justify-center w-auto px-4 py-2 bg-gray-300 border border-transparent rounded-md font-semibold text-gray-700 hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                 onClick={() => setOpen(false)}
               >
                 Закрыть
               </button>
             </div>
           </form>

         </div>
       </div>
     </div>
      )}
    </>
  );
}

export default Modal;
