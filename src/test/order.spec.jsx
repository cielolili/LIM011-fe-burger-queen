import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import Order from '../components/order';

it('Deberia limpiar el imput al dar click al boton "Enviar a cocina"', () => {
  const { getByPlaceholderText, getByText } = render(<Order />);
  const input = getByPlaceholderText('inserte nombre');
  const button = getByText('Confirmar pedido');
  expect(input.value).toBe('');
  act(() => {
    fireEvent.change(input, { target: { value: 'Carlos' } });
  });
  expect(input.value).toBe('Carlos');
  act(() => {
    fireEvent.click(button, { preventDefault: () => {} });
  });
  expect(input.value).toBe('');
});
