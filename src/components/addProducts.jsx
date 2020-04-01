import React from 'react';
import PropTypes from 'prop-types';

function AddProducts({
  data, addOperation, total, eliminar,
}) {
  console.log(data);
  return (
    <div>
      <tr>
        <td>
          <input
            type="image"
            src="https://img.icons8.com/ultraviolet/40/000000/minus.png"
            alt="Restar producto"
            data-testid="quitar"
            onClick={(event) => {
              event.preventDefault();
              addOperation(data, false);
              total(data);
            }}
          />
        </td>
        <td data-testid="products">{data.cantidad}</td>
        <td>
          <input
            type="image"
            src="https://img.icons8.com/ultraviolet/40/000000/add.png"
            alt="Añadir producto"
            data-testid="agregar"
            onClick={(event) => {
              event.preventDefault();
              addOperation(data, true);
              total(data);
            }}
          />
        </td>
        <td data-testid="products">{data.producto}</td>
        <td data-testid="products">{data.precio * data.cantidad}</td>
        <td>
          <input
            type="image"
            src="https://img.icons8.com/officel/40/000000/delete-sign.png"
            alt="Eliminar producto"
            data-testid="eliminar"
            onClick={(event) => {
              event.preventDefault();
              eliminar(data);
            }}
          />
        </td>

      </tr>
    </div>
  );
}

AddProducts.propTypes = {
  data: PropTypes
    .shape({
      cantidad: PropTypes.number.isRequired,
      producto: PropTypes.string.isRequired,
      precio: PropTypes.number.isRequired,
    }).isRequired,
  addOperation: PropTypes.func.isRequired,
  eliminar: PropTypes.func.isRequired,
  total: PropTypes.func.isRequired,
};
export default AddProducts;
