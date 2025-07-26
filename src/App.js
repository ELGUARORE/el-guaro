import React, { useState, useEffect } from 'react';
import './App.css';

const productos = [
  { nombre: 'Cerveza Águila 330ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza Águila LIGT 330ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza POKER 330ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza COSTEÑA 330ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza CORONITA 210ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza CLUB COLOMBIA DORADA 330ml', mesa: 4000, llevar: 3500 },
  { nombre: 'Cerveza REDS 269ml', mesa: 4000, llevar: 3500 },
  { nombre: 'GATORADE 500ml', mesa: 4500, llevar: 4000 },
  { nombre: 'ELECTROLIT 625ml', mesa: 9500, llevar: 9000 },
  { nombre: 'AGUA 500ml', mesa: 3000, llevar: 2500 },
  { nombre: 'AGUA 250ml', mesa: 2000, llevar: 1500 },
  { nombre: 'CIGARRILLO', mesa: 1000, llevar: 1000 },
];

const mesas = Array.from({ length: 10 }, (_, i) => i + 1);

function App() {
  const [mesaSeleccionada, setMesaSeleccionada] = useState(1);
  const [tipoConsumo, setTipoConsumo] = useState('mesa');
  const [pedidos, setPedidos] = useState({});
  const [historial, setHistorial] = useState([]);
  const [contabilidad, setContabilidad] = useState(() => {
    return JSON.parse(localStorage.getItem('contabilidad')) || [];
  });
  const [vista, setVista] = useState('pedidos');

  useEffect(() => {
    const guardados = JSON.parse(localStorage.getItem('historialPedidos')) || [];
    setHistorial(guardados);
  }, []);

  const agregarPedido = (producto) => {
    const comentario = prompt("Comentario para este producto (opcional):") || "";
    const key = `mesa${mesaSeleccionada}`;
    const precio = tipoConsumo === 'mesa' ? producto.mesa : producto.llevar;
    const item = { nombre: producto.nombre, precio, comentario };

    setPedidos((prev) => {
      const prevMesa = prev[key] || [];
      return {
        ...prev,
        [key]: [...prevMesa, item],
      };
    });
  };

  const eliminarPedido = (index) => {
    const key = `mesa${mesaSeleccionada}`;
    const nuevos = [...(pedidos[key] || [])];
    nuevos.splice(index, 1);
    setPedidos((prev) => ({
      ...prev,
      [key]: nuevos,
    }));
  };

  const calcularTotal = () => {
    const key = `mesa${mesaSeleccionada}`;
    return (pedidos[key] || []).reduce((sum, item) => sum + item.precio, 0);
  };

  const guardarPedido = () => {
    const key = `mesa${mesaSeleccionada}`;
    const pedido = pedidos[key] || [];
    if (pedido.length === 0) return;

    const total = calcularTotal();
    const nuevoRegistro = {
      mesa: mesaSeleccionada,
      pedido,
      total,
      fecha: new Date().toLocaleString(),
    };

    const nuevoHistorial = [...historial, nuevoRegistro];
    setHistorial(nuevoHistorial);
    localStorage.setItem('historialPedidos', JSON.stringify(nuevoHistorial));

    setPedidos((prev) => ({ ...prev, [key]: [] }));
    alert('Pedido guardado correctamente');
  };

  const finalizarDia = () => {
    if (historial.length === 0) return alert('No hay pedidos para finalizar.');

    const resumenProductos = {};
    let totalVendido = 0;

    historial.forEach(pedido => {
      pedido.pedido.forEach(item => {
        resumenProductos[item.nombre] = (resumenProductos[item.nombre] || 0) + 1;
        totalVendido += item.precio;
      });
    });

    const resumenDia = {
      fecha: new Date().toLocaleDateString(),
      productos: resumenProductos,
      total: totalVendido,
    };

    const nuevaContabilidad = [...contabilidad, resumenDia];
    setContabilidad(nuevaContabilidad);
    localStorage.setItem('contabilidad', JSON.stringify(nuevaContabilidad));

    setHistorial([]);
    localStorage.removeItem('historialPedidos');
    alert('Día finalizado. Resumen guardado en Contabilidad.');
  };

  return (
    <div className="App">
      <h1>Sistema El Guaro</h1>
      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ width: '200px' }}>
          <button onClick={() => setVista('pedidos')}>Pedidos</button>
          <button onClick={() => setVista('finalizados')}>Pedidos Finalizados</button>
          <button onClick={() => setVista('contabilidad')}>Contabilidad</button>
        </div>

        <div style={{ flex: 1 }}>
          {vista === 'pedidos' && (
            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ flex: 1 }}>
                <label>
                  Mesa:
                  <select
                    value={mesaSeleccionada}
                    onChange={(e) => setMesaSeleccionada(Number(e.target.value))}
                  >
                    {mesas.map((mesa) => (
                      <option key={mesa} value={mesa}>Mesa {mesa}</option>
                    ))}
                  </select>
                </label>
                <label style={{ marginLeft: '10px' }}>
                  Tipo:
                  <select
                    value={tipoConsumo}
                    onChange={(e) => setTipoConsumo(e.target.value)}
                  >
                    <option value="mesa">Mesa</option>
                    <option value="llevar">Para llevar</option>
                  </select>
                </label>

                <h3>Productos</h3>
                <ul>
                  {productos.map((prod) => (
                    <li key={prod.nombre}>
                      {prod.nombre} - ${tipoConsumo === 'mesa' ? prod.mesa : prod.llevar}
                      <button onClick={() => agregarPedido(prod)} style={{ marginLeft: 10 }}>Agregar</button>
                    </li>
                  ))}
                </ul>
              </div>

              <div style={{ flex: 1 }}>
                <h3>Pedido Mesa {mesaSeleccionada}</h3>
                <ul>
                  {(pedidos[`mesa${mesaSeleccionada}`] || []).map((item, index) => (
                    <li key={index}>
                      {item.nombre} - ${item.precio}
                      {item.comentario && <em> (Comentario: {item.comentario})</em>}
                      <button onClick={() => eliminarPedido(index)} style={{ color: 'red', marginLeft: 10 }}>Eliminar</button>
                    </li>
                  ))}
                </ul>
                <h4>Total: ${calcularTotal()}</h4>
                <button onClick={guardarPedido}>Finalizar y Guardar Pedido</button>
              </div>
            </div>
          )}

          {vista === 'finalizados' && (
            <div>
              <h2>Pedidos Finalizados</h2>
              <ul>
                {historial.map((registro, index) => (
                  <li key={index} style={{ marginBottom: 10 }}>
                    <strong>Mesa {registro.mesa}</strong> - {registro.fecha} - Total: ${registro.total}
                    <ul>
                      {registro.pedido.map((item, i) => (
                        <li key={i}>{item.nombre} - ${item.precio} {item.comentario && <em>(Comentario: {item.comentario})</em>}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
              <button onClick={finalizarDia} style={{ marginTop: 20, backgroundColor: 'orange' }}>Finalizar Día</button>
            </div>
          )}

          {vista === 'contabilidad' && (
            <div>
              <h2>Contabilidad</h2>
              <ul>
                {contabilidad.map((dia, index) => (
                  <li key={index} style={{ marginBottom: '15px' }}>
                    <strong>Fecha:</strong> {dia.fecha}<br />
                    <strong>Total Vendido:</strong> ${dia.total}<br />
                    <strong>Productos Vendidos:</strong>
                    <ul>
                      {Object.entries(dia.productos).map(([producto, cantidad], i) => (
                        <li key={i}>{producto}: {cantidad}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
