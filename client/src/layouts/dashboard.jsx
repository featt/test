import { useRef, useState, useEffect } from "react";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
} from "@/widgets/layout";
import routes from "@/routes";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { AgGridReact } from 'ag-grid-react'; 
import 'ag-grid-community/styles/ag-grid.css'; 
import 'ag-grid-community/styles/ag-theme-alpine.css';
import Table from "@/components/Table";
import useEdit from "@/hooks/useEdit";
import { getAllOrders, getAllUsers } from "@/queries";
import Modal from "@/components/Modal";
import useCurrRow from "@/hooks/useCurrRow";
import { useMutation } from 'react-query'
import axios from "axios";
import userStore from "@/hooks/userStore";
import orderStore from "@/hooks/orderStore";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const [open, setOpen] = useState(false)
  const { sidenavType } = controller;

  const usersQuery = getAllUsers()
  const ordersQuery = getAllOrders()

  const users = userStore(state => state.users)
  const setUsers = userStore(state => state.setUsers)
  console.log(usersQuery.data?.data);
  const editable = useEdit(state => state.edit)
  const setEdit = useEdit(state => state.setEdit)
  const row = useCurrRow(state => state.row)
  const setRow = useCurrRow(state => state.setRow)

  const userDelete = (id) => {
    const mut = useMutation(async () => {
      return await axios.delete(`http://localhost:3000/api/user/${id}`);
    }, {
      onAsyncMutate: async () => {
       await usersQuery.refetch()
      }
    });
    return mut
  }

  const userUpdate = (id) => {
    const mut = useMutation(async (user) => {
      return await axios.put(`http://localhost:3000/api/user/${id}`, user);
    }, {
      onAsyncMutate: async () => {
       await usersQuery.refetch()
      }
    });
    return mut
  }

  const orderUpdate = (id) => {
    const mut = useMutation(async (order) => {
      return await axios.put(`http://localhost:3000/api/order/${id}`, order);
    }, {
      onAsyncMutate: async () => {
       await ordersQuery.refetch()
      }
    });
    return mut
  }

  const orderDelete = (id) => {
    const mutOrder = useMutation(async () => {
      return await axios.delete(`http://localhost:3000/api/order/${id}`);
    }, {
      onAsyncMutate: async () => {
       await ordersQuery.refetch()
      }
    });
    return mutOrder
  }


  const deleteMut = () => {
    if(row.email) {
      const mut = userDelete(row.id)
      return mut   
    } 
    const mutOrder = orderDelete(row.id)
    return mutOrder
  }

  const updateMut = () => {
    if(row.email) {
      const mut = userUpdate(row.id)
      return mut
    }
    const orderMut = orderUpdate(row.id)
    return orderMut
  }

  const orders = orderStore(state => state.orders)
  const setOrders = orderStore(state => state.setOrders)

  const mut = deleteMut()
  const update = updateMut()

 
  
  useEffect(() => {
    setUsers(usersQuery.data?.data)
    usersQuery.refetch()    
  }, [mut.isSuccess, usersQuery.data?.data, update.isSuccess])

  useEffect(() => {
    setOrders(ordersQuery.data?.data)
    ordersQuery.refetch()    
  }, [mut.isSuccess, ordersQuery.data?.data, update.isSuccess])
  


  const columnDefsUser = [
    {field: 'id',editable: editable, filter: true},
    {field: 'name',editable: editable, filter: true},
    {field: 'age', editable: editable,},
    {field: 'email', editable: editable,},
    {field: 'registration_date', editable: editable,},
  ];

  const columnDefsOrder = [
    {field: 'id', editable: editable,  filter: true},
    {field: 'user_id', editable: editable, filter: true},
    {field: 'product_name', editable: editable,},
    {field: 'quantity', editable: editable,},
    {field: 'order_date', editable: editable,},
  ];

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80 ag-theme-alpine">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>        

        <div className="w-full h-full">
        <div className="flex space-x-4">          
        
        <button
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
              onClick={() => setOpen(true)}
              >
                Добавить
              </button>
              {editable ? (                
                <button
                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  setEdit()                  
                  update.mutateAsync(row)
                }}
                >
                  Сохранить
                </button>
              ) : (
                <button
                className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                onClick={() => {
                  setEdit()                  
                }}
                >
                  Изменить
                </button>
              )}
              <button
                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                onClick={() => mut.mutateAsync()}
              >
                Удалить
              </button>
            </div>
          <Table data={users} columnDefs={columnDefsUser} />
          <Table data={orders} columnDefs={columnDefsOrder} />
        </div>
        <Modal open={open} setOpen={setOpen} />
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.jsx";

export default Dashboard;
