import React from 'react'
import MaterialTable from 'material-table'
import { ThemeProvider, createTheme } from '@mui/material';
import {DataTable} from '../components';
import { HiCurrencyRupee } from '../assets/icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteAProduct, getAllProducts } from '../api';
import { setAllProducts } from '../context/actions/productActions';
import { alertNULL, alertSuccess } from '../context/actions/alertActions';


const DBItems = () => {

  const dispatch = useDispatch();
  const products = useSelector(state => state.products);
    const defaultMaterialTheme = createTheme();
  return (
    <div className='flex items-center justify-self-center gap-4 pt-6 w-full'>
      <DataTable columns={[   {
          title: 'Image',
          field: 'imageURL',
          render: (rowData) => (
            <img
              className='w-32 h-16 object-contain rounded-md'
              src={rowData.imageURL}
            />
          ),
        },

        {
          title: "Name",
          field: "product_name"
        },
        {
          title: "Category",
          field: "product_category"
        },
        {
          title: "Price",
          field: "product_price",
          render: (rowData) => (
            <p className="text-xl font-semibold text-textColor flex items-center justify-center ">
              <HiCurrencyRupee className="text-red-400" />
              {parseFloat(rowData.product_price).toFixed(2)}
            </p>
          ),
        },

        ]} data={products}
        title="List of Products"
        actions={[
          {
          icon: "edit",
          tooltip: "Edit Data",
          onClick: (event, rowData) => {
            // Do save operation
            alert("You want to edit " + rowData.product_id)
          }
        },
        {
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {
            // Do save operation

            let isExecuted = window.confirm("Are you sure, you want to perform this action?");

            if (isExecuted) {

              console.log("DELLL");
              deleteAProduct(rowData.product_id).then((res) => {
                dispatch(alertSuccess("Product Deleted "));
                setInterval(() => {
                  dispatch(alertNULL());
                }, 3000);
                getAllProducts().then((data) => {
                  dispatch(setAllProducts(data));
                });
              });

            }

          }
        }
        ]}/>
    </div>
  )
}

export default DBItems
