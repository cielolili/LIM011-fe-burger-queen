import React, { useState } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import AddProducts from './addProducts';

function Order({
  data, addOperation, total, eliminar, newtotal, reset,
}) {
  console.log(total);
  const [client, setclient] = useState('');
  const recorre = () => data.map((element) => (
    <AddProducts
      data={element}
      addOperation={addOperation}
      total={total}
      eliminar={eliminar}
    />
  ));
  function NameClient(event) {
    // event.preventDefault();
    const valor = event.target.value;
    console.log(valor);
    setclient(valor);
  }
  const SendOrder = () => {
    if (client === '') {
      alert('Ingresar nombre del cliente');
    }
  };
  const SendKitchen = (obj) => {
    const newobj = {
      cliente: client,
      order: obj,
      total: newtotal,
      fecha: new Date(),
    };
    firebase.firestore()
      .collection('orders')
      .add({
        newobj,
      });
    console.log(newobj);
    setclient('');
    reset();
  };
  return (
    <div>
      <span>Nombre del cliente</span>
      <input placeholder="inserte nombre" type="text" value={client} onChange={NameClient} />
      <table className="table table-bordered table-dark">
        <thead>
          <tr>
            <th scope="col">-</th>
            <th scope="col">Cantidad</th>
            <th scope="col">+</th>
            <th scope="col">Producto</th>
            <th scope="col">Precio</th>
            <th scope="col">Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {recorre()}
          <tr>
            <th colSpan="3">Total</th>
            <th>S/ </th>
            <th colSpan="2">
              {total()}
            </th>
          </tr>
        </tbody>
      </table>
      <div className="container">

        <button
          type="submit"
          className="btn btn-primary"
          data-toggle="modal"
          data-target="#exampleModal"
          disabled={client === ''}
        >
          Confirmar pedido
        </button>

        <div className="modal fade" id="exampleModal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmar pedido</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={(event) => {
                    event.preventDefault();
                  }}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Enviar a cocina ...
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={(event) => {
                    event.preventDefault();
                    SendKitchen(data);
                  }}
                >
                  Enviar a cocina
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
Order.propTypes = {
  data: PropTypes
    .shape({
      producto: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
      cantidad: PropTypes.number.isRequired,
    }).isRequired,
  addOperation: PropTypes.func.isRequired,
  newtotal: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
  eliminar: PropTypes.func.isRequired,
};

export default Order;
