import React, { useState } from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { Link } from 'react-router-dom';
import firebase from '../conexion/firebase';
import AddNotes from './addNotes';
import './OrderKitchen.css';

const OrderKitchen = () => {
  const [kitchen, setKitchen] = useState([]);
  const [value, loading, error] = useCollectionData(
    firebase.firestore().collection('orders').orderBy('newobj.fecha', 'asc'),
  );
  const dataOrder = () => {
    const filterData = value.filter((ele) => ele.estado === '');
    const dataKitchen = filterData.map((element) => {
      const date = element.newobj.fecha.toDate().toString();
      const obj = {
        ID: element.ID,
        cliente: element.newobj.cliente,
        fecha: date.substring(0, date.indexOf('GMT')),
        order: element.newobj.order.map((elemt) => {
          const detalle = {
            cantidad: elemt.cantidad,
            producto: elemt.producto,
          };
          return detalle;
        }),
      };
      return obj;
    });
    setKitchen(dataKitchen);
    console.log(JSON.stringify(kitchen));
  };
  function ListNotes() {
    if (loading) {
      return 'Cargando...';
    }
    if (error) {
      return 'Hubo un error';
    }
    return kitchen
      .map((element) => <AddNotes key={element.id} objeto={element} />);
  }
  return (
    <section className="view">
      <header className="text-center  d-flex justify-content-center">
        <h2 className="title-viewKitchen"> Órdenes en espera... </h2>
        <button
          type="button"
          className="btn btn-dark"
          onClick={(event) => {
            event.preventDefault();
            dataOrder();
          }}
        >
          Orden
        </button>
        <Link to="/WaiterView">
          <img alt="return" src="https://img.icons8.com/ios/50/000000/left2.png" />
        </Link>
      </header>
      <div className="row">
        <div className="row">
          <div className="col-sm-12">
            <div className="card-columns">
              <ul>
                {ListNotes()}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default OrderKitchen;